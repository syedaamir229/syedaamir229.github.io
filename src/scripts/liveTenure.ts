// Progressive enhancement for the ongoing role's tenure. The build writes a
// correct-as-of-last-build value into the HTML (so no-JS visitors and crawlers
// see real text); on load we recompute against the visitor's current date so
// the figure is exact without needing a rebuild. Reuses the same pure helper
// the build uses, so the math is identical on both sides.
import { formatDuration } from '../lib/tenure';

for (const el of document.querySelectorAll<HTMLElement>('[data-live-tenure]')) {
  const start = el.dataset.start;
  const employment = el.dataset.employment ?? '';
  if (!start) continue;
  const end = el.dataset.end ?? null; // absent = ongoing
  el.textContent = `${employment}, ${formatDuration(start, end)}`;
}
