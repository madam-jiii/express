document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ once: true, duration: 900, easing: 'ease-out-cubic' });

  const bgMusic = document.getElementById('bgMusic');
  const introModal = document.getElementById('introModal');
  const continueBtn = document.getElementById('continueBtn');

  bgMusic.volume = 0.5;

  continueBtn.addEventListener('click', () => {
    bgMusic.play().catch(() => {});
    introModal.classList.remove('active');
  });

  const heartsBg = document.getElementById('heartsBg');
  const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '🌸', '💝'];
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (7 + Math.random() * 9) + 's';
    heart.style.animationDelay = (Math.random() * 8) + 's';
    heart.style.fontSize = (16 + Math.random() * 22) + 'px';
    heartsBg.appendChild(heart);
  }

  const cards = Array.from(document.querySelectorAll('.memory-card'));
  const completionModal = document.getElementById('completionModal');
  const restartBtn = document.getElementById('restartBtn');
  const confettiContainer = document.getElementById('confettiContainer');
  const completionHearts = document.getElementById('completionHearts');

  let currentIndex = 0;
  let isAnimating = false;
  let completionShown = false;

  const updateStack = () => {
    cards.forEach((card, i) => {
      card.classList.remove('is-active', 'is-next', 'is-hidden');
      if (i === currentIndex) {
        card.classList.add('is-active');
        card.setAttribute('tabindex', '0');
      } else {
        card.setAttribute('tabindex', '-1');
      }
      if (i === currentIndex + 1) {
        card.classList.add('is-next');
      } else if (i < currentIndex) {
        card.classList.add('is-hidden');
      }
    });
  };

  const createConfetti = () => {
    const colors = ['#ff4d94', '#ff1a75', '#ff99cc', '#ffcc00', '#ff66b2', '#ffffff', '#ff80bf'];
    for (let i = 0; i < 90; i++) {
      const conf = document.createElement('div');
      conf.className = 'confetti';
      conf.style.left = Math.random() * 100 + '%';
      conf.style.background = colors[Math.floor(Math.random() * colors.length)];
      conf.style.animationDuration = (1.5 + Math.random() * 2.5) + 's';
      conf.style.animationDelay = (Math.random() * 1.2) + 's';
      conf.style.width = (6 + Math.random() * 8) + 'px';
      conf.style.height = (6 + Math.random() * 8) + 'px';
      conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confettiContainer.appendChild(conf);
    }
  };

  const createFloatingHearts = () => {
    const emojis = ['❤️', '💕', '💖', '💗', '💝'];
    for (let i = 0; i < 14; i++) {
      const h = document.createElement('div');
      h.className = 'completion-heart';
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.left = Math.random() * 100 + '%';
      h.style.animationDuration = (3 + Math.random() * 3) + 's';
      h.style.animationDelay = (Math.random() * 2) + 's';
      h.style.fontSize = (18 + Math.random() * 20) + 'px';
      completionHearts.appendChild(h);
    }
  };

  const showCompletion = () => {
    if (completionShown) return;
    completionShown = true;
    completionModal.classList.add('active');
    createConfetti();
    createFloatingHearts();
  };

  const exitCard = (card) => {
    const direction = card.dataset.exit || 'left';
    card.classList.add('is-exiting', 'exit-' + direction);
    isAnimating = true;

    setTimeout(() => {
      card.classList.remove('is-exiting', 'exit-' + direction);
      card.classList.remove('is-active', 'is-flipped');
      card.classList.add('is-hidden');
      currentIndex++;
      updateStack();
      isAnimating = false;

      if (currentIndex >= cards.length) {
        setTimeout(showCompletion, 500);
      }
    }, 750);
  };

  const handleCardClick = (card) => {
    if (isAnimating) return;
    if (card !== cards[currentIndex]) return;

    if (!card.classList.contains('is-flipped')) {
      card.classList.add('is-flipped');
    } else {
      exitCard(card);
    }
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => handleCardClick(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(card);
      }
    });
    card.setAttribute('role', 'button');
  });

  updateStack();

  restartBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});