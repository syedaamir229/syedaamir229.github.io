// Shared chrome for LinkedIn feed portraits (1080×1350 @ 2x → 2160×2700).
//
// Every post's portrait shares the same frame: dark background + top glow,
// eyebrow, two-line heading, constellation accent, footer rule, and byline.
// The only bespoke part is the diagram itself, so per-post scripts stay thin:
// they import { C, esc } from here, build their diagram SVG, and hand it to
// renderPortrait() with the heading copy.
//
//   import { renderPortrait, C, esc } from './lib/portrait.mjs';
//   await renderPortrait({
//     slug: 'my-post',
//     eyebrow: 'TOPIC CATEGORY',
//     heading: ['Line one', 'line two'],
//     diagram: buildDiagram(),   // an SVG string
//   });
//
// See scripts/build-maturity-ladder-portrait.mjs for a worked example, and
// the linkedin-portrait skill for layout zones and authoring rules.

import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO     = resolve(__dirname, '..', '..');
const FONT_DIR = resolve(REPO, 'public', 'fonts', 'inter');

export const W = 1080, H = 1350;

// Brand palette — matches build-carousel.mjs. Copy exactly.
export const C = {
  bg:      '#050B14',
  panel:   '#0A1220',
  panel2:  '#122033',
  border:  '#1E3148',
  border2: '#2A4561',
  cyan500: '#06B6D4',
  cyan400: '#22D3EE',
  cyan300: '#67E8F9',
  cream:   '#E2E8F0',
  cream2:  '#CBD5E1',
  muted:   '#94A3B8',
  dim:     '#475569',
};

// Escape for SVG text/attributes. Use for any data-driven string.
export const esc = (s) => String(s).replace(/[<>&"]/g, c =>
  ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

// Constellation accent (top-right corner, x=762–1002, y=70–310).
function constellation() {
  return `<g transform="translate(762,70)" fill="none" aria-hidden="true">
  <g stroke="${C.cyan500}" stroke-width="1.5" stroke-opacity="0.4">
    <line x1="196" y1="34" x2="128" y2="120"/>
    <line x1="150" y1="86" x2="128" y2="196"/>
    <line x1="196" y1="70" x2="196" y2="130"/>
  </g>
  <circle cx="196" cy="34" r="11" fill="${C.cyan300}"/>
  <circle cx="150" cy="86" r="9" fill="${C.cyan400}" fill-opacity="0.9"/>
  <circle cx="196" cy="70" r="8" fill="${C.cyan400}" fill-opacity="0.8"/>
  <circle cx="128" cy="120" r="8" fill="${C.cyan500}" fill-opacity="0.7"/>
  <circle cx="150" cy="132" r="7" fill="${C.cyan400}" fill-opacity="0.8"/>
  <circle cx="196" cy="130" r="7" fill="${C.cyan500}" fill-opacity="0.7"/>
  <circle cx="128" cy="196" r="7" fill="${C.cyan500}" fill-opacity="0.55"/>
</g>`;
}

/**
 * Render a portrait PNG.
 *
 * @param {object}   opts
 * @param {string}   opts.slug     Post slug; output → social/linkedin/<slug>-feed-portrait.png
 * @param {string}   opts.eyebrow  Uppercase topic label (y=106, cyan400)
 * @param {string[]} opts.heading  [line1 (cream), line2 (cyan300)] display heading
 * @param {string}   opts.diagram  The bespoke diagram SVG (a string of SVG elements)
 * @param {string}  [opts.byline]  Left byline name (default 'Syed Aamir')
 * @param {string}  [opts.role]    Byline role/site tail (default the standard tagline)
 * @returns {Promise<string>} the absolute output path
 */
export async function renderPortrait({ slug, eyebrow, heading, diagram, byline, role }) {
  if (!slug) throw new Error('renderPortrait: slug is required');
  const [line1, line2] = heading ?? [];
  const OUT_DIR = resolve(REPO, 'social', 'linkedin');
  const OUT     = resolve(OUT_DIR, `${slug}-feed-portrait.png`);
  const name    = byline ?? 'Syed Aamir';
  const tail    = role ?? 'Data & AI Solutions Architect · syedaamir.com';

  const [reg, semi, bold] = await Promise.all([
    readFile(resolve(FONT_DIR, 'Inter-Regular.ttf')),
    readFile(resolve(FONT_DIR, 'Inter-SemiBold.ttf')),
    readFile(resolve(FONT_DIR, 'Inter-Bold.ttf')),
  ]);
  const b64 = (buf) => buf.toString('base64');

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family:'Inter'; font-weight:400; src:url(data:font/ttf;base64,${b64(reg)}) format('truetype'); }
  @font-face { font-family:'Inter'; font-weight:600; src:url(data:font/ttf;base64,${b64(semi)}) format('truetype'); }
  @font-face { font-family:'Inter'; font-weight:700; src:url(data:font/ttf;base64,${b64(bold)}) format('truetype'); }
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:${W}px; height:${H}px; background:${C.bg}; overflow:hidden; }
</style></head><body>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
  xmlns="http://www.w3.org/2000/svg" font-family="Inter,system-ui,sans-serif">

  <defs>
    <!-- Subtle top radial glow (darkens the header area slightly) -->
    <radialGradient id="topGlow" cx="50%" cy="10%" r="75%" gradientUnits="objectBoundingBox">
      <stop offset="0%"   stop-color="#0A1828" stop-opacity="0.85"/>
      <stop offset="65%"  stop-color="${C.bg}"  stop-opacity="0"/>
    </radialGradient>
    <!-- Gradient rule line for footer -->
    <linearGradient id="footRule" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${C.cyan400}" stop-opacity="0"/>
      <stop offset="50%"  stop-color="${C.cyan400}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${C.cyan400}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#topGlow)"/>

  <!-- Constellation accent (top-right) -->
  ${constellation()}

  <!-- Eyebrow -->
  <text x="92" y="106"
    fill="${C.cyan400}" font-size="23" font-weight="600" letter-spacing="4">${esc(eyebrow)}</text>

  <!-- Two-line heading -->
  <text x="92" y="185"
    fill="${C.cream}"   font-size="78" font-weight="700" letter-spacing="-2">${esc(line1)}</text>
  <text x="92" y="271"
    fill="${C.cyan300}" font-size="78" font-weight="700" letter-spacing="-2">${esc(line2)}</text>

  <!-- Diagram -->
  ${diagram}

  <!-- Footer rule -->
  <line x1="92" y1="1268" x2="988" y2="1268" stroke="url(#footRule)" stroke-width="2"/>

  <!-- Byline -->
  <text x="92" y="1310" font-size="24">
    <tspan fill="${C.cream2}" font-weight="600">${esc(name)}</tspan><tspan
    fill="${C.muted}"> · ${esc(tail)}</tspan>
  </text>

</svg>
</body></html>`;

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport:{width:W,height:H}, deviceScaleFactor:2 });
  const page = await ctx.newPage();
  await page.setContent(html, { waitUntil:'networkidle' });
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
  await page.screenshot({ path:OUT, fullPage:false });
  await browser.close();
  console.log(`Wrote ${OUT}`);
  return OUT;
}
