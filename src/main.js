import { mountHeader, mountFooter, bindMobileNav, bindHeaderScroll } from './components.js';
import { bindImages } from './images.js';

function bindReveal() {
  const nodes = document.querySelectorAll('[data-reveal]');
  if (!nodes.length) return;

  if (!('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('is-visible'));
    return;
  }

  const viewportH = window.innerHeight || document.documentElement.clientHeight;
  nodes.forEach((n) => {
    const r = n.getBoundingClientRect();
    if (r.top < viewportH && r.bottom > 0) n.classList.add('is-visible');
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  nodes.forEach((n) => {
    if (!n.classList.contains('is-visible')) io.observe(n);
  });
}

function bindContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const success = form.querySelector('.form-success');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    form.querySelectorAll('input, textarea, select, button').forEach((el) => (el.disabled = true));

    // Simulated submission – replace with a real endpoint when available.
    window.setTimeout(() => {
      form.reset();
      form.querySelectorAll('input, textarea, select, button').forEach((el) => (el.disabled = false));
      if (success) {
        success.classList.add('is-shown');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.setTimeout(() => success.classList.remove('is-shown'), 6000);
      }
    }, 600);
  });
}

function bindSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function init() {
  bindImages();
  mountHeader();
  mountFooter();
  bindMobileNav();
  bindHeaderScroll();
  bindReveal();
  bindContactForm();
  bindSmoothAnchors();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
