// One-off: LinkedIn Featured card thumbnail for the GitHub link (1200x630),
// in the brand system. Mirrors the banner/OG-card aesthetic.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = resolve(__dirname, '..', 'public', 'fonts', 'inter');
const OUT = process.argv[2] || resolve(__dirname, 'featured-github.png');

const W = 1200;
const H = 630;

const C = {
  bg: '#050B14', panel: '#0A1220',
  cyan500: '#06B6D4', cyan400: '#22D3EE', cyan300: '#67E8F9',
  cream: '#E2E8F0', muted: '#94A3B8',
};

const [boldBuf, semiBuf, regBuf] = await Promise.all([
  readFile(resolve(FONT_DIR, 'Inter-Bold.ttf')),
  readFile(resolve(FONT_DIR, 'Inter-SemiBold.ttf')),
  readFile(resolve(FONT_DIR, 'Inter-Regular.ttf')),
]);
const fonts = { bold: boldBuf.toString('base64'), semi: semiBuf.toString('base64'), reg: regBuf.toString('base64') };
const esc = (s) => String(s).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));

const fontCss = `<style>
  @font-face { font-family:'Inter'; font-weight:400; src:url(data:font/ttf;base64,${fonts.reg}) format('truetype'); }
  @font-face { font-family:'Inter'; font-weight:600; src:url(data:font/ttf;base64,${fonts.semi}) format('truetype'); }
  @font-face { font-family:'Inter'; font-weight:700; src:url(data:font/ttf;base64,${fonts.bold}) format('truetype'); }
</style>`;

const defs = `<defs>
  <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${C.bg}"/><stop offset="15%" stop-color="${C.cyan500}" stop-opacity="0.5"/>
    <stop offset="50%" stop-color="${C.cyan400}"/><stop offset="85%" stop-color="${C.cyan500}" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="${C.bg}"/>
  </linearGradient>
  <radialGradient id="vig" cx="58%" cy="40%" r="72%">
    <stop offset="0%" stop-color="${C.panel}" stop-opacity="0.55"/><stop offset="100%" stop-color="${C.bg}" stop-opacity="0"/>
  </radialGradient>
</defs>`;

const constellation = `
<g stroke="${C.cyan500}" stroke-width="1.6" stroke-opacity="0.40" fill="none">
  <line x1="1090" y1="150" x2="990" y2="225"/>
  <line x1="990" y1="225" x2="1095" y2="280"/>
  <line x1="990" y1="225" x2="905" y2="190"/>
  <line x1="990" y1="225" x2="955" y2="320"/>
  <line x1="955" y1="320" x2="1055" y2="360"/>
</g>
<g filter="url(#glow)">
  <circle cx="1090" cy="150" r="16" fill="${C.cyan300}"/>
  <circle cx="990"  cy="225" r="15" fill="${C.cyan400}" fill-opacity="0.9"/>
  <circle cx="1095" cy="280" r="12" fill="${C.cyan400}" fill-opacity="0.8"/>
  <circle cx="905"  cy="190" r="11" fill="${C.cyan500}" fill-opacity="0.7"/>
  <circle cx="955"  cy="320" r="13" fill="${C.cyan400}" fill-opacity="0.8"/>
  <circle cx="1055" cy="360" r="11" fill="${C.cyan500}" fill-opacity="0.6"/>
</g>`;

const eyebrow = 'GITHUB';
const chipW = Math.ceil(eyebrow.length * 14) + 60;
const chip = `<g transform="translate(80, 232)">
  <rect x="0" y="0" width="${chipW}" height="48" rx="24" fill="${C.cyan500}" fill-opacity="0.10" stroke="${C.cyan500}" stroke-opacity="0.35"/>
  <text x="${chipW / 2}" y="32" font-family="Inter, sans-serif" font-size="19" font-weight="600" letter-spacing="3" fill="${C.cyan400}" text-anchor="middle">${esc(eyebrow)}</text>
</g>`;

const text = `
<text x="80" y="385" font-family="Inter, sans-serif" font-size="84" font-weight="700" fill="${C.cream}" letter-spacing="-2">Code &amp; Projects</text>
<text x="82" y="445" font-family="Inter, sans-serif" font-size="26" font-weight="400" letter-spacing="0.3" fill="${C.muted}">github.com/syedaamir229</text>`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${fontCss}${defs}
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  ${constellation}${chip}${text}
  <rect x="0" y="${H - 4}" width="${W}" height="4" fill="url(#rule)"/>
</svg>`;

await writeFile(OUT, await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer());
console.log(`Wrote ${OUT} (${W}x${H})`);
