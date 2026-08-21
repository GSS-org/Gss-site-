// Reveal-on-scroll for elements with .reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Mark the current page's nav link as active
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navlinks a').forEach((link) => {
  const target = link.getAttribute('href');
  if (target === here) link.classList.add('active');
});
