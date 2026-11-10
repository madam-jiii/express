document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ once: true, duration: 900, easing: 'ease-out-cubic' });

  const heartsBg = document.getElementById('heartsBg');
  const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '🌸', '💝'];
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (6 + Math.random() * 8) + 's';
    heart.style.animationDelay = (Math.random() * 8) + 's';
    heart.style.fontSize = (16 + Math.random() * 22) + 'px';
    heartsBg.appendChild(heart);
  }

  const gifs = [
    'gifs/gif1.gif',
    'gifs/gif2.gif',
    'gifs/gif3.gif',
    'gifs/gif4.gif',
    'gifs/gif5.gif'
  ];

  const yesSizes = [
    { padding: '14px 36px', font: '1.2rem' },
    { padding: '16px 44px', font: '1.35rem' },
    { padding: '19px 54px', font: '1.55rem' },
    { padding: '23px 66px', font: '1.8rem' },
    { padding: '28px 80px', font: '2.1rem' }
  ];

  const proposalGif = document.getElementById('proposalGif');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const celebrationModal = document.getElementById('celebrationModal');
  const countdownEl = document.getElementById('countdown');
  const confettiContainer = document.getElementById('confettiContainer');

  const song = new Audio('assets/song.mp3');
  song.loop = false;
  song.preload = 'auto';

  let noClickCount = 0;
  let yesClicked = false;
  let countdownInterval = null;

  const changeGif = (src) => {
    proposalGif.classList.add('fade-out');
    setTimeout(() => {
      proposalGif.src = src;
      proposalGif.onload = () => proposalGif.classList.remove('fade-out');
      if (proposalGif.complete) proposalGif.classList.remove('fade-out');
    }, 250);
  };

  const applyYesSize = (index) => {
    const size = yesSizes[index];
    yesBtn.style.padding = size.padding;
    yesBtn.style.fontSize = size.font;
    yesBtn.classList.add('glow');
  };

  noBtn.addEventListener('click', () => {
    if (yesClicked) return;
    if (noClickCount >= 4) return;

    noClickCount++;

    if (noClickCount === 1) {
      changeGif(gifs[1]);
      applyYesSize(1);
    } else if (noClickCount === 2) {
      changeGif(gifs[2]);
      applyYesSize(2);
    } else if (noClickCount === 3) {
      changeGif(gifs[3]);
      applyYesSize(3);
    } else if (noClickCount === 4) {
      changeGif(gifs[4]);
      applyYesSize(4);
      noBtn.classList.add('hidden');
    }
  });

  const createConfetti = () => {
    const colors = ['#ff4d94', '#ff1a75', '#ff99cc', '#ffcc00', '#ff66b2', '#ffffff', '#ff80bf'];
    for (let i = 0; i < 80; i++) {
      const conf = document.createElement('div');
      conf.className = 'confetti';
      conf.style.left = Math.random() * 100 + '%';
      conf.style.background = colors[Math.floor(Math.random() * colors.length)];
      conf.style.animationDuration = (1.5 + Math.random() * 2.5) + 's';
      conf.style.animationDelay = (Math.random() * 1) + 's';
      conf.style.width = (6 + Math.random() * 8) + 'px';
      conf.style.height = (6 + Math.random() * 8) + 'px';
      conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confettiContainer.appendChild(conf);
    }
  };

  const stopSong = () => {
    try {
      song.pause();
      song.currentTime = 0;
    } catch (err) {
      // ignore
    }
  };

  yesBtn.addEventListener('click', () => {
    if (yesClicked) return;
    yesClicked = true;
    yesBtn.disabled = true;
    noBtn.disabled = true;

    const playPromise = song.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }

    changeGif('gifs/gif6.gif');
    celebrationModal.classList.add('active');
    createConfetti();

    let remaining = 5;
    countdownEl.textContent = remaining;

    countdownInterval = setInterval(() => {
      remaining--;
      countdownEl.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        stopSong();
        window.location.href = 'memories.html';
      }
    }, 1000);
  });

  window.addEventListener('pagehide', stopSong);
  window.addEventListener('beforeunload', stopSong);
});