const REVEAL_SELECTOR = '.reveal';
const VISIBLE_CLASS = 'visible';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add(VISIBLE_CLASS));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add(VISIBLE_CLASS);
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observer.observe(el));
}
