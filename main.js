document.addEventListener('DOMContentLoaded', () => {

  /* ── Footer year ─────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Mobile menu ─────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!open));
      mobileMenu.hidden = open;
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }

  /* ── Scroll reveal ───────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -56px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ── FAQ accordion ───────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.hidden = true;
        }
      });

      btn.setAttribute('aria-expanded', String(!expanded));
      answer.hidden = expanded;
    });
  });

  /* ── Contact form ────────────────────────────────────── */
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form && status) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const name    = form.querySelector('#name').value.trim();
      const email   = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        showStatus('error', 'Please fill in all required fields.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus('error', 'Please enter a valid email address.');
        return;
      }

      const btn = form.querySelector('[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      /* Replace the line below with your actual form endpoint / API call */
      await new Promise(r => setTimeout(r, 1200));

      btn.textContent = orig;
      btn.disabled = false;
      form.reset();
      showStatus('success', '✓ Message sent! We\'ll be in touch within one business day.');
    });
  }

  function showStatus(type, msg) {
    if (!status) return;
    status.className = `form-status ${type}`;
    status.textContent = msg;
    status.hidden = false;
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { status.hidden = true; }, 7000);
  }

});
