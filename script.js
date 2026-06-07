// subtle parallax on blobs
const blobs = document.querySelectorAll('.blob');
let ticking = false;
window.addEventListener('mousemove', (e) => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    blobs.forEach((b, i) => {
      const f = (i + 1) * 0.6;
      b.style.translate = `${x * f}px ${y * f}px`;
    });
    ticking = false;
  });
});

// fade-in on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .ch-card, .cover-card, .behind-grid, .section-head').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});
