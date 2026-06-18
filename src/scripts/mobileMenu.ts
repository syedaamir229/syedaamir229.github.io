const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const openIcon = document.querySelector<SVGElement>('.menu-icon-open');
const closeIcon = document.querySelector<SVGElement>('.menu-icon-close');

function setOpen(open: boolean) {
  if (!menu) return;
  menu.classList.toggle('hidden', !open);
  openIcon?.classList.toggle('hidden', open);
  closeIcon?.classList.toggle('hidden', !open);
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
