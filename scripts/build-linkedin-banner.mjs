// One-off: LinkedIn banner (1584x396) in the brand system.
// Reuses the OG-card aesthetic (navy bg, cyan-only constellation, Inter type)
// adapted to LinkedIn's wide format + bottom-left avatar safe zone.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const FONT_DIR = resolve(REPO_ROOT, 'public', 'fonts', 'inter');

const OUT = process.argv[2] || resolve(__dirname, 'linkedin-banner.png');

const W = 1584;
const H = 396;

const C = {
  bg: '#050B14',
  panel: '#0A1220',
  cyan500: '#06B6D4',
  cyan400: '#22D3EE',
  cyan300: '#67E8F9',
  cream: '#E2E8F0',
  muted: '#94A3B8',
};

const [boldBuf, semiBuf, regBuf] = await Promise.all([
  readFile(resolve(FONT_DIR, 'Inter-Bold.ttf')),
  readFile(resolve(FONT_DIR, 'Inter-SemiBold.ttf')),
  readFile(resolve(FONT_DIR, 'Inter-Regular.ttf')),
]);
const fonts = {
  bold: boldBuf.toString('base64'),
  semi: semiBuf.toString('base64'),
  reg: regBuf.toString('base64'),
};

const esc = (s) =>
  String(s).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));

const fontCss = `<style>
  @font-face { font-family:'Inter'; font-weight:400; src:url(data:font/ttf;base64,${fonts.reg}) format('truetype'); }
  @font-face { font-family:'Inter'; font-weight:600; src:url(data:font/ttf;base64,${fonts.semi}) format('truetype'); }
  @font-face { font-family:'Inter'; font-weight:700; src:url(data:font/ttf;base64,${fonts.bold}) format('truetype'); }
</style>`;

const defs = `<defs>
  <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="5" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${C.bg}"/>
    <stop offset="15%" stop-color="${C.cyan500}" stop-opacity="0.5"/>
    <stop offset="50%" stop-color="${C.cyan400}"/>
    <stop offset="85%" stop-color="${C.cyan500}" stop-opacity="0.5"/>
    <stop offset="100%" stop-color="${C.bg}"/>
  </linearGradient>
  <radialGradient id="vig" cx="62%" cy="42%" r="70%">
    <stop offset="0%" stop-color="${C.panel}" stop-opacity="0.55"/>
    <stop offset="100%" stop-color="${C.bg}" stop-opacity="0"/>
  </radialGradient>
</defs>`;

const LX = 640; // left edge of text block: clear gap from the bottom-left avatar, crop-safe

// Cyan-only constellation on the far right (pulled in from the edge so the
// mobile crop does not clip it), plus a faint echo in the top-left corner
// above the avatar to fill that empty navy. The bottom-left stays empty for
// the avatar.
const constellation = `
<g stroke="${C.cyan500}" stroke-width="1.5" stroke-opacity="0.40" fill="none">
  <line x1="1492" y1="76"  x2="1410" y2="142"/>
  <line x1="1410" y1="142" x2="1498" y2="188"/>
  <line x1="1410" y1="142" x2="1332" y2="112"/>
  <line x1="1410" y1="142" x2="1378" y2="222"/>
  <line x1="1378" y1="222" x2="1462" y2="256"/>
</g>
<g filter="url(#glow)">
  <circle cx="1492" cy="76"  r="14" fill="${C.cyan300}"/>
  <circle cx="1410" cy="142" r="13" fill="${C.cyan400}" fill-opacity="0.9"/>
  <circle cx="1498" cy="188" r="11" fill="${C.cyan400}" fill-opacity="0.8"/>
  <circle cx="1332" cy="112" r="10" fill="${C.cyan500}" fill-opacity="0.7"/>
  <circle cx="1378" cy="222" r="12" fill="${C.cyan400}" fill-opacity="0.8"/>
  <circle cx="1462" cy="256" r="10" fill="${C.cyan500}" fill-opacity="0.6"/>
</g>
<g stroke="${C.cyan500}" stroke-width="1.5" stroke-opacity="0.20" fill="none">
  <line x1="104" y1="56" x2="206" y2="98"/>
  <line x1="206" y1="98" x2="312" y2="64"/>
  <line x1="206" y1="98" x2="150" y2="150"/>
</g>
<g filter="url(#glow)">
  <circle cx="104" cy="56"  r="9" fill="${C.cyan500}" fill-opacity="0.42"/>
  <circle cx="206" cy="98"  r="8" fill="${C.cyan400}" fill-opacity="0.40"/>
  <circle cx="312" cy="64"  r="7" fill="${C.cyan500}" fill-opacity="0.32"/>
  <circle cx="150" cy="150" r="6" fill="${C.cyan500}" fill-opacity="0.26"/>
</g>`;

// Eyebrow chip (Inter + wide tracking, matching the OG-card convention), left-aligned.
const eyebrow = 'DATA PLATFORMS · BI · AI AUTOMATION';
const chipW = Math.ceil(eyebrow.length * 12.2) + 56;
const chip = `<g transform="translate(${LX}, 92)">
  <rect x="0" y="0" width="${chipW}" height="44" rx="22" fill="${C.cyan500}" fill-opacity="0.10" stroke="${C.cyan500}" stroke-opacity="0.35"/>
  <text x="${chipW / 2}" y="29" font-family="Inter, sans-serif" font-size="17" font-weight="600" letter-spacing="3" fill="${C.cyan400}" text-anchor="middle">${esc(eyebrow)}</text>
</g>`;

// Tagline (brand line), two balanced lines, left-aligned in the middle-right band.
const tagline1 = 'Data that works as hard';
const tagline2 = 'as your business does.';
const text = `
<text x="${LX}" y="214" font-family="Inter, sans-serif" font-size="50" font-weight="700" fill="${C.cream}" letter-spacing="-1.5">${esc(tagline1)}</text>
<text x="${LX}" y="270" font-family="Inter, sans-serif" font-size="50" font-weight="700" fill="${C.cream}" letter-spacing="-1.5">${esc(tagline2)}</text>
<text x="${LX + 2}" y="318" font-family="Inter, sans-serif" font-size="20" font-weight="400" letter-spacing="0.5" fill="${C.muted}">Dubai, UAE  ·  syedaamir.com</text>`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${fontCss}
  ${defs}
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  ${constellation}
  ${chip}
  ${text}
  <rect x="0" y="${H - 3}" width="${W}" height="3" fill="url(#rule)"/>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(OUT, png);
console.log(`Wrote ${OUT} (${W}x${H}), ${png.length} bytes`);
