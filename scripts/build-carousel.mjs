// Build a LinkedIn document/carousel from a per-post slide spec.
//
//   Usage:  node scripts/build-carousel.mjs <slug>
//   Reads:  social/linkedin/carousel/<slug>.json   (the slide spec)
//   Writes: social/linkedin/carousel/<slug>/slide-N.png  +  <slug>-carousel.pdf
//
// Brand-styled slides (navy/cyan, Inter), rendered via Playwright with the
// repo's embedded Inter fonts. The PDF is the LinkedIn "document" upload; the
// PNGs are a visual check and an image fallback.
//
// NOTE: reserve carousels for posts whose ideas are genuinely sequential. A
// single framework diagram often carries MORE in one frame (it shows the whole
// shape at once), so prefer the post's diagram unless the steps truly want to
// be swiped one at a time. See docs/BLOG.md section 13 on link/asset handling.
import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/build-carousel.mjs <slug>');
  console.error('Reads the slide spec at social/linkedin/carousel/<slug>.json');
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, '..');
const FONT_DIR = resolve(REPO, 'public', 'fonts', 'inter');
const CAROUSEL_DIR = resolve(REPO, 'social', 'linkedin', 'carousel');
const SPEC_PATH = resolve(CAROUSEL_DIR, `${slug}.json`);
const OUT_DIR = resolve(CAROUSEL_DIR, slug);

const spec = JSON.parse(await readFile(SPEC_PATH, 'utf8'));
const slides = spec.slides ?? [];
if (!slides.length) {
  console.error(`No slides in ${SPEC_PATH}`);
  process.exit(1);
}
const byline = spec.byline ?? 'Syed Aamir';
const role = spec.role ?? 'Data & AI Solutions Architect';
const site = spec.site ?? 'syedaamir.com';
const TOTAL = slides.length;

const W = 1080, H = 1350;

const C = {
  bg: '#050B14', panel: '#0A1220', panel2: '#122033',
  border: '#1E3148', cyan500: '#06B6D4', cyan400: '#22D3EE', cyan300: '#67E8F9',
  cream: '#E2E8F0', cream2: '#CBD5E1', muted: '#94A3B8',
};

const [reg, semi, bold] = await Promise.all([
  readFile(resolve(FONT_DIR, 'Inter-Regular.ttf')),
  readFile(resolve(FONT_DIR, 'Inter-SemiBold.ttf')),
  readFile(resolve(FONT_DIR, 'Inter-Bold.ttf')),
]);
const b64 = (buf) => buf.toString('base64');
const esc = (s) => String(s ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

// Small brand constellation (node-graph), top-right corner accent.
const constellation = `
  <svg class="nodes" width="240" height="240" viewBox="0 0 240 240" fill="none" aria-hidden="true">
    <g stroke="${C.cyan500}" stroke-width="1.5" stroke-opacity="0.4">
      <line x1="196" y1="34" x2="128" y2="120"/>
      <line x1="150" y1="86" x2="128" y2="196"/>
      <line x1="196" y1="70" x2="196" y2="130"/>
    </g>
    <g>
      <circle cx="196" cy="34" r="11" fill="${C.cyan300}"/>
      <circle cx="150" cy="86" r="9" fill="${C.cyan400}" fill-opacity="0.9"/>
      <circle cx="196" cy="70" r="8" fill="${C.cyan400}" fill-opacity="0.8"/>
      <circle cx="128" cy="120" r="8" fill="${C.cyan500}" fill-opacity="0.7"/>
      <circle cx="150" cy="132" r="7" fill="${C.cyan400}" fill-opacity="0.8"/>
      <circle cx="196" cy="130" r="7" fill="${C.cyan500}" fill-opacity="0.7"/>
      <circle cx="128" cy="196" r="7" fill="${C.cyan500}" fill-opacity="0.55"/>
    </g>
  </svg>`;

// A flow of pill "chips" with arrows, and an optional emphasized final chip
// (kept attached to its arrow so the pair wraps together, not orphaned).
function flowRow(items, endLabel) {
  const chips = items.map((t) => `<span class="chip">${esc(t)}</span>`).join('<span class="arrow">&rarr;</span>');
  const end = endLabel
    ? `<span class="pairnowrap"><span class="arrow">&rarr;</span><span class="chip chip-strong">${esc(endLabel)}</span></span>`
    : '';
  return `<div class="flow">${chips}${end}</div>`;
}

function slideHtml(s, i) {
  const page = `${i + 1} / ${TOTAL}`;
  const badge = s.kind === 'check' && s.num ? `<div class="badge">${esc(s.num)}</div>` : '';
  const flow = s.flow ? flowRow(s.flow, s.flowEnd) : '';
  const cta = s.cta ? `<div class="ctaline">${esc(s.cta)}</div>` : '';
  const headingClass = s.kind === 'title' ? 'heading heading-xl' : 'heading';
  const footer = s.kind === 'cta'
    ? `<div class="footer"><span class="foot-name">${esc(byline)}</span><span class="foot-role">${esc(role)}</span></div>`
    : `<div class="footer"><span class="foot-name">${esc(byline)} <span class="dot">&middot;</span> ${esc(site)}</span><span class="page">${page}</span></div>`;
  return `
  <section class="slide ${esc(s.kind)}">
    ${constellation}
    <div class="top">
      ${badge}
      <div class="eyebrow">${esc(s.eyebrow)}</div>
    </div>
    <div class="mid">
      <h1 class="${headingClass}">${esc(s.heading)}</h1>
      ${s.body ? `<p class="body">${esc(s.body)}</p>` : ''}
      ${flow}
      ${cta}
    </div>
    <div class="rule"></div>
    ${footer}
  </section>`;
}

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family:'Inter'; font-weight:400; src:url(data:font/ttf;base64,${b64(reg)}) format('truetype'); }
  @font-face { font-family:'Inter'; font-weight:600; src:url(data:font/ttf;base64,${b64(semi)}) format('truetype'); }
  @font-face { font-family:'Inter'; font-weight:700; src:url(data:font/ttf;base64,${b64(bold)}) format('truetype'); }
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { background:${C.bg}; }
  @page { size:${W}px ${H}px; margin:0; }
  .slide {
    position:relative; width:${W}px; height:${H}px; background:${C.bg};
    background-image: radial-gradient(120% 80% at 50% 12%, rgba(10,18,32,0.85) 0%, rgba(5,11,20,0) 60%);
    color:${C.cream}; font-family:'Inter',system-ui,sans-serif; overflow:hidden;
    padding:104px 92px 84px; display:flex; flex-direction:column;
    page-break-after:always;
  }
  .slide:last-child { page-break-after:auto; }
  .nodes { position:absolute; top:70px; right:78px; }
  .top { display:flex; align-items:center; gap:28px; min-height:96px; }
  .badge {
    width:92px; height:92px; border-radius:50%; background:${C.cyan500};
    color:${C.bg}; font-weight:700; font-size:50px; display:flex;
    align-items:center; justify-content:center; box-shadow:0 0 34px rgba(6,182,212,0.45);
  }
  .eyebrow {
    font-weight:600; font-size:23px; letter-spacing:4px; text-transform:uppercase;
    color:${C.cyan400};
  }
  .mid { flex:1; display:flex; flex-direction:column; justify-content:center; }
  .heading { font-weight:700; font-size:78px; line-height:1.04; letter-spacing:-2px; color:${C.cream}; }
  .heading-xl { font-size:96px; }
  .body { margin-top:40px; font-weight:400; font-size:37px; line-height:1.45; color:${C.cream2}; max-width:900px; }
  .flow { margin-top:52px; display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
  .chip {
    border:1px solid ${C.border}; background:${C.panel}; color:${C.cream2};
    font-size:27px; font-weight:600; padding:14px 26px; border-radius:14px;
  }
  .chip-strong { border-color:${C.cyan500}; color:${C.cyan300}; background:rgba(6,182,212,0.08); }
  .pairnowrap { display:inline-flex; align-items:center; gap:18px; }
  .arrow { color:${C.muted}; font-size:30px; }
  .ctaline {
    margin-top:52px; display:inline-block; align-self:flex-start; font-size:30px; font-weight:600;
    color:${C.cyan300}; border:1px solid ${C.cyan500}; background:rgba(6,182,212,0.08);
    padding:20px 30px; border-radius:16px;
  }
  .rule { height:2px; margin-bottom:34px;
    background:linear-gradient(90deg, rgba(6,182,212,0) 0%, rgba(34,211,238,0.9) 50%, rgba(6,182,212,0) 100%); }
  .footer { display:flex; align-items:baseline; justify-content:space-between; }
  .foot-name { font-size:26px; font-weight:600; color:${C.cream2}; }
  .foot-role { font-size:24px; color:${C.muted}; }
  .dot { color:${C.muted}; }
  .page { font-size:24px; color:${C.muted}; font-weight:600; letter-spacing:1px; }
  .cta .foot-name { font-size:30px; color:${C.cream}; }
  .cta .foot-role { font-size:26px; color:${C.cyan400}; margin-left:14px; }
</style></head><body>
  ${slides.map(slideHtml).join('\n')}
</body></html>`;

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
const page = await context.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(async () => { if (document.fonts && document.fonts.ready) await document.fonts.ready; });

// Per-slide PNGs (2x for crispness).
const els = await page.locator('.slide').all();
for (let i = 0; i < els.length; i++) {
  await els[i].screenshot({ path: resolve(OUT_DIR, `slide-${i + 1}.png`) });
}

// Single multi-page PDF for LinkedIn document upload.
const pdf = await page.pdf({ width: `${W}px`, height: `${H}px`, printBackground: true, pageRanges: '1-' + TOTAL });
await writeFile(resolve(OUT_DIR, `${slug}-carousel.pdf`), pdf);

await browser.close();
console.log(`Wrote ${TOTAL} slides + ${slug}-carousel.pdf to ${OUT_DIR}`);
