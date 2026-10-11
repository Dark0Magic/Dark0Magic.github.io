// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// Появление блоков при прокрутке
const reveals = document.querySelectorAll('.reveal');
if (!('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('visible'));
} else {
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  observer.observe(el);
});
}

// Анимированные счётчики
document.querySelectorAll('[data-count]').forEach(el => {
  const target = +el.dataset.count;
  let current = 0;
  const step = () => {
    current += Math.max(1, Math.ceil(target / 40));
    el.textContent = Math.min(current, target);
    if (current < target) requestAnimationFrame(step);
  };
  setTimeout(step, 600);
});

// Лёгкий 3D-наклон карточки
const card = document.querySelector('.hero-card');
if (card && matchMedia('(hover: hover)').matches) {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
}
