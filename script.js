/* ============================================
   BIRTHDAY WEBSITE — script.js
   Animations: petals, stars, confetti, lightbox, candles, scroll-reveal
   ============================================ */

/* ---- Floating Petals ---- */
const PETALS = ['🌸', '🌷', '💜', '💙', '✨', '🥀'];

function createPetal() {
  const el = document.createElement('div');
  el.className = 'petal';
  el.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (Math.random() * 14 + 12) + 'px';
  el.style.animationDuration = (Math.random() * 8 + 7) + 's';
  el.style.animationDelay = (Math.random() * 5) + 's';
  el.style.opacity = (Math.random() * 0.5 + 0.4).toString();
  document.getElementById('petals').appendChild(el);
  setTimeout(() => el.remove(), 16000);
}

// Start petals
setInterval(createPetal, 700);
for (let i = 0; i < 10; i++) setTimeout(createPetal, i * 200);


/* ---- Twinkling Stars ---- */
function createStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.8;
    star.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 3 + 2}s;
      animation-delay:${Math.random() * 4}s;
    `;
    container.appendChild(star);
  }
}
createStars();


/* ---- Confetti Burst (on load) ---- */
const CONFETTI_COLORS = ['#C8A8E9', '#A78BCC', '#4A6FA5', '#F2C4E3', '#F5D08A', '#7B5AB8', '#FFFFFF'];

function launchConfetti(count = 60) {
  const container = document.getElementById('confetti');
  for (let i = 0; i < count; i++) {
    const pc = document.createElement('div');
    pc.className = 'confetti-piece';
    pc.style.cssText = `
      left:${Math.random() * 100}vw;
      background:${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      width:${Math.random() * 8 + 6}px;
      height:${Math.random() * 8 + 6}px;
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration:${Math.random() * 3 + 3}s;
      animation-delay:${Math.random() * 2}s;
      transform:rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(pc);
    setTimeout(() => pc.remove(), 6000);
  }
}

// Launch confetti on page load
window.addEventListener('load', () => {
  launchConfetti(70);
  // A second burst after a short delay
  setTimeout(() => launchConfetti(40), 2500);
});


/* ---- Hero Background Video Cycling ---- */
const heroVideos = document.querySelectorAll('.hero-bg-video');
let currentVideoIndex = 0;

function cycleHeroVideo() {
  heroVideos[currentVideoIndex].classList.remove('active');
  currentVideoIndex = (currentVideoIndex + 1) % heroVideos.length;
  heroVideos[currentVideoIndex].classList.add('active');
}

if (heroVideos.length > 1) {
  setInterval(cycleHeroVideo, 6000);
}


/* ---- Scroll Reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Add reveal class to section titles and cards
document.querySelectorAll('.section-title, .section-subtitle, .wish-card, .flower-card, .collage-item, .envelope-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});


/* ---- Collage Photo Lightbox ---- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

// Attach click to all collage items
document.querySelectorAll('.collage-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Prevent click on image itself from closing
lightboxImg.addEventListener('click', e => e.stopPropagation());


/* ---- Cake — Blow Out Candles ---- */
let candlesBlown = false;

function blowCandles() {
  if (candlesBlown) return;
  candlesBlown = true;

  // Blow out each flame with a slight stagger
  ['f1', 'f2', 'f3'].forEach((id, i) => {
    setTimeout(() => {
      const flame = document.getElementById(id);
      if (flame) flame.classList.add('blown');
    }, i * 180);
  });

  // Show wish text
  setTimeout(() => {
    const wishText = document.getElementById('wishText');
    wishText.classList.add('visible');
  }, 600);

  // Launch extra confetti!
  setTimeout(() => launchConfetti(80), 700);

  // Re-light after 6 seconds so it can be done again
  setTimeout(() => {
    ['f1', 'f2', 'f3'].forEach(id => {
      const flame = document.getElementById(id);
      if (flame) flame.classList.remove('blown');
    });
    const wishText = document.getElementById('wishText');
    wishText.classList.remove('visible');
    candlesBlown = false;
  }, 6000);
}


/* ---- Smooth anchor clicks ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
