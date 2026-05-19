const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const icon = document.getElementById('menu-icon');

const HAMBURGER = 'M4 6h16M4 12h16M4 18h16';
const CLOSE = 'M6 18L18 6M6 6l12 12';

function setOpen(open: boolean) {
  if (!menu || !icon) return;
  menu.classList.toggle('hidden', !open);
  icon.setAttribute('d', open ? CLOSE : HAMBURGER);
  btn?.setAttribute('aria-expanded', String(open));
}

btn?.addEventListener('click', () => {
  const isOpen = !menu?.classList.contains('hidden');
  setOpen(!isOpen);
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setOpen(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu && !menu.classList.contains('hidden')) {
    setOpen(false);
  }
});
