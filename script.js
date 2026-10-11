// Ano no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Borda do header ao rolar
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  })
);

// Filtro da coleção
const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product');

function applyFilter(cat) {
  filters.forEach(f => f.classList.toggle('is-active', f.dataset.filter === cat));
  products.forEach(p => {
    p.classList.toggle('is-hidden', cat !== 'todos' && p.dataset.cat !== cat);
  });
}

filters.forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));

// Clicar numa categoria já filtra a coleção
document.querySelectorAll('.category').forEach(card =>
  card.addEventListener('click', () => applyFilter(card.dataset.filter))
);

// Animação de entrada
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
