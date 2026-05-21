/* ════════════════════════════════════════
   PORTFOLIO – script.js
   Gabriel Nova I
════════════════════════════════════════ */

// ── Navbar scroll shrink ──────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

// ── Mobile hamburger ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

// ── Active nav link highlight on scroll ───────────
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ── Smooth scroll for all anchor links ───────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Intersection Observer – Scroll Reveal ─────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Progress Bar Animation ────────────────────────
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const target = bar.dataset.width;
        // small delay so the scroll reveal plays first
        setTimeout(() => {
          bar.style.width = target + '%';
        }, 300);
      });
    }
  });
}, { threshold: 0.25 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ── Typing Effect ─────────────────────────────────
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Web Developer based in Tengaran, Indonesia',
  'Freelance Designer & Web Developer',
  'Creating beautiful digital experiences'
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingDelay = 100;

function typeWriter() {
  if (!typedEl) return;

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingDelay = 2000; // pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingDelay = 500;
  }

  setTimeout(typeWriter, typingDelay);
}

// Start typing after a brief delay
setTimeout(typeWriter, 800);

// ── Portfolio card – open project page ────────────
// Cards are linked directly via <a href="project-xxx.html"> in the HTML.
// The following adds a subtle ripple effect on click for polish.

document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.willChange = 'transform, box-shadow';
  });
  card.addEventListener('mouseleave', () => {
    card.style.willChange = '';
  });
});

// ── Contact form – basic validation & feedback ────
const form = document.querySelector('.contact-form');
if (form) {
  const submitBtn = form.querySelector('.btn-submit');
  submitBtn.addEventListener('click', () => {
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = '#EF4444';
        input.addEventListener('input', function restore() {
          this.style.borderColor = '';
          this.removeEventListener('input', restore);
        });
      }
    });

    if (!valid) {
      shakeBtn(submitBtn);
      return;
    }

    // Success state
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
    submitBtn.style.background = '#10B981';
    submitBtn.style.boxShadow  = '0 4px 18px rgba(16,185,129,0.35)';
    inputs.forEach(i => i.value = '');

    setTimeout(() => {
      submitBtn.innerHTML = 'Submit <i class="fa-solid fa-paper-plane"></i>';
      submitBtn.style.background = '';
      submitBtn.style.boxShadow  = '';
    }, 3000);
  });
}

function shakeBtn(el) {
  el.style.animation = 'shake 0.4s ease';
  el.addEventListener('animationend', () => el.style.animation = '', { once: true });
}

// Inject shake keyframes once
if (!document.getElementById('shake-style')) {
  const style = document.createElement('style');
  style.id = 'shake-style';
  style.textContent = `
    @keyframes shake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-6px)}
      40%{transform:translateX(6px)}
      60%{transform:translateX(-4px)}
      80%{transform:translateX(4px)}
    }
  `;
  document.head.appendChild(style);
}

// ── Stagger children on section reveal ───────────
// Adds incremental delays to siblings inside parent .reveal containers
document.querySelectorAll('.portfolio-grid, .skill-grid, .services-right').forEach(parent => {
  const cards = parent.querySelectorAll('.portfolio-card, .skill-card, .service-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });
});

(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const PURPLE    = '#7C3AED';
  const PURPLE_LT = '#9D65F5';

  const SYMBOLS = [
    '</>', '{}', '()', '=>', '[]',
    'fn()', '01', '/*', '*/',
    '#!', '&&', '||', '+=',
    '<div>', 'css', 'js',
    '~~', '::', '??'
  ];

  function resize() {
    const r  = canvas.parentElement.getBoundingClientRect();
    canvas.width  = r.width  * devicePixelRatio;
    canvas.height = r.height * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  function makeParticle() {
    const W = canvas.width  / devicePixelRatio;
    const H = canvas.height / devicePixelRatio;
    const size = 11 + Math.random() * 9;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size,
      alpha: 0.18 + Math.random() * 0.55,
      pulse: Math.random() * Math.PI * 2,
      col: Math.random() < 0.6 ? PURPLE : PURPLE_LT,
      orbitR: 8 + Math.random() * 18,
      orbitSpd: 0.004 + Math.random() * 0.008,
      orbitPhase: Math.random() * Math.PI * 2,
    };
  }

  let particles = [];
  const COUNT = 28;

  function initParticles() {
    particles = Array.from({ length: COUNT }, makeParticle);
  }
  initParticles();

  const CONNECT_DIST = 110;

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT_DIST) {
          const opacity = (1 - d / CONNECT_DIST) * 0.45;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(124,58,237,${opacity})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function drawDot(p, t) {
    const pulse = 0.5 + 0.5 * Math.sin(t * 0.002 + p.pulse);
    const r = 2.5 + pulse * 1.5;
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.5);
    grd.addColorStop(0, `rgba(124,58,237,${0.6 * pulse + 0.2})`);
    grd.addColorStop(1, 'rgba(124,58,237,0)');
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = p.col;
    ctx.globalAlpha = 0.9;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  let animId;
  function draw(t) {
    animId = requestAnimationFrame(draw);

    const W = canvas.width  / devicePixelRatio;
    const H = canvas.height / devicePixelRatio;

    ctx.clearRect(0, 0, W, H);

    const amb = ctx.createRadialGradient(W * 0.55, H * 0.48, 0, W * 0.55, H * 0.48, W * 0.52);
    amb.addColorStop(0, 'rgba(124,58,237,0.07)');
    amb.addColorStop(1, 'rgba(124,58,237,0)');
    ctx.fillStyle = amb;
    ctx.fillRect(0, 0, W, H);

    drawConnections();

    particles.forEach(p => {
      p.orbitPhase += p.orbitSpd;
      const ox = Math.cos(p.orbitPhase) * p.orbitR;
      const oy = Math.sin(p.orbitPhase * 1.7) * p.orbitR * 0.6;

      p.x += p.vx + ox * 0.01;
      p.y += p.vy + oy * 0.01;

      if (p.x < 0)  { p.x = 0;  p.vx *= -1; }
      if (p.x > W)  { p.x = W;  p.vx *= -1; }
      if (p.y < 0)  { p.y = 0;  p.vy *= -1; }
      if (p.y > H)  { p.y = H;  p.vy *= -1; }

      const alphaMod   = 0.5 + 0.5 * Math.sin(t * 0.0015 + p.pulse);
      const finalAlpha = p.alpha * (0.65 + 0.35 * alphaMod);

      drawDot(p, t);

      ctx.save();
      ctx.globalAlpha = finalAlpha;
      ctx.font        = `700 ${p.size}px 'Courier New', monospace`;
      ctx.fillStyle   = p.col;
      ctx.shadowColor = PURPLE;
      ctx.shadowBlur  = 8 * alphaMod;
      ctx.fillText(p.sym, p.x - ctx.measureText(p.sym).width / 2, p.y + p.size * 0.36);
      ctx.restore();
    });
  }

  draw(0);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw(performance.now());
  });

})();