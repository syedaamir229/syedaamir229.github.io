function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildToc() {
  const list = document.getElementById('project-toc-list');
  const body = document.querySelector('.prose-project');
  if (!list || !body) return;

  const headings = Array.from(body.querySelectorAll('h2')) as HTMLHeadingElement[];
  if (headings.length < 2) {
    const aside = list.closest('aside');
    if (aside) (aside as HTMLElement).style.display = 'none';
    return;
  }

  const usedIds = new Set<string>();
  headings.forEach((h) => {
    let id = h.id || slugify(h.textContent || '');
    if (!id) return;
    let candidate = id;
    let suffix = 2;
    while (usedIds.has(candidate)) candidate = `${id}-${suffix++}`;
    id = candidate;
    usedIds.add(id);
    h.id = id;

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = h.textContent || '';
    a.dataset.tocLink = id;
    a.className =
      'block py-0.5 text-muted-500 hover:text-cyan-400 transition-colors leading-snug';
    li.appendChild(a);
    list.appendChild(li);
  });

  const links = new Map<string, HTMLAnchorElement>();
  list.querySelectorAll<HTMLAnchorElement>('a[data-toc-link]').forEach((a) => {
    const key = a.dataset.tocLink;
    if (key) links.set(key, a);
  });

  const setActive = (id: string | null) => {
    links.forEach((a, key) => {
      if (key === id) {
        a.classList.remove('text-muted-500');
        a.classList.add('text-cyan-400', 'font-medium');
      } else {
        a.classList.add('text-muted-500');
        a.classList.remove('text-cyan-400', 'font-medium');
      }
    });
  };

  const visible = new Set<string>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) visible.add(id);
        else visible.delete(id);
      });
      const topmost = headings.find((h) => visible.has(h.id));
      setActive(topmost ? topmost.id : null);
    },
    { rootMargin: '-96px 0px -60% 0px', threshold: 0 },
  );

  headings.forEach((h) => observer.observe(h));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildToc);
} else {
  buildToc();
}
