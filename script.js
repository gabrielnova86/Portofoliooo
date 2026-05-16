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
