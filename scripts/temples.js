// Set current year and last modified (same behavior as site-level script)
document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lm = document.getElementById('lastModified');
  if (lm) lm.textContent = 'Last Modified: ' + document.lastModified;

  // Hamburger toggle for mobile nav
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.textContent = isOpen ? '✕' : '☰';
    });
  }
});
