import { SLUG_TO_CATEGORY } from '../data/categories';

const BTN_SELECTOR = '.category-filter-btn';
const ITEM_SELECTOR = '[data-categories]';
const ACTIVE_CLASS = 'active';
const ACTIVE_STATE = ['border-cyan-500/40', 'text-cyan-400', 'bg-cyan-500/10'];
const INACTIVE_STATE = ['border-cream-100/10', 'text-muted-500'];

function parseCategories(el: HTMLElement): string[] {
  const raw = el.dataset.categories;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return [raw];
  }
}

function applyFilter(category: string) {
  document.querySelectorAll<HTMLElement>(ITEM_SELECTOR).forEach((el) => {
    const cats = parseCategories(el);
    el.style.display = category === 'all' || cats.includes(category) ? '' : 'none';
  });
}

function activateButton(category: string) {
  document.querySelectorAll<HTMLElement>(BTN_SELECTOR).forEach((b) => {
    b.classList.remove(ACTIVE_CLASS, ...ACTIVE_STATE);
    b.classList.add(...INACTIVE_STATE);
  });
  const target = document.querySelector<HTMLElement>(
    `${BTN_SELECTOR}[data-category="${category}"]`,
  );
  if (target) {
    target.classList.add(ACTIVE_CLASS, ...ACTIVE_STATE);
    target.classList.remove(...INACTIVE_STATE);
  }
}

document.querySelectorAll<HTMLElement>(BTN_SELECTOR).forEach((btn) => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.category ?? 'all';
    activateButton(cat);
    applyFilter(cat);
  });
});

function applyHashFilter() {
  const slug = window.location.hash.replace(/^#/, '').toLowerCase();
  const cat = SLUG_TO_CATEGORY[slug];
  if (!cat) return;
  activateButton(cat);
  applyFilter(cat);
}

applyHashFilter();
window.addEventListener('hashchange', applyHashFilter);
