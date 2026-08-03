import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..', '..');
const FONT_DIR = resolve(REPO_ROOT, 'public', 'fonts', 'inter');

export const WIDTH = 1200;
export const HEIGHT = 630;

export const COLORS = {
  bg: '#050B14',
  panel: '#0A1220',
  cyan500: '#06B6D4',
  cyan400: '#22D3EE',
  cyan300: '#67E8F9',
  cream: '#E2E8F0',
  muted: '#94A3B8',
};

let fontCache = null;

async function loadFonts() {
  if (fontCache) return fontCache;
  const [boldBuf, semiBuf, regBuf] = await Promise.all([
    readFile(resolve(FONT_DIR, 'Inter-Bold.ttf')),
    readFile(resolve(FONT_DIR, 'Inter-SemiBold.ttf')),
    readFile(resolve(FONT_DIR, 'Inter-Regular.ttf')),
  ]);
  fontCache = {
    boldBase64: boldBuf.toString('base64'),
    semiboldBase64: semiBuf.toString('base64'),
    regularBase64: regBuf.toString('base64'),
  };
  return fontCache;
}

export function escapeXml(s) {
  return String(s).replace(/[<>&"']/g, (c) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  }[c]));
}

// og_title is schema-bounded to 8-42 chars. At 72px Inter Bold, that's at most
// two lines inside the 820 px title zone. Choose the word boundary closest to
// the middle so the two lines look balanced.
function wrapTitle(text) {
  const SINGLE_LINE_MAX = 20;
  if (text.length <= SINGLE_LINE_MAX) return [text];

  const words = text.split(/\s+/);
  if (words.length === 1) return [text];

  let best = null;
  for (let i = 1; i < words.length; i++) {
    const line1 = words.slice(0, i).join(' ');
    const line2 = words.slice(i).join(' ');
    const diff = Math.abs(line1.length - line2.length);
    const longest = Math.max(line1.length, line2.length);
    if (best === null || diff < best.diff || (diff === best.diff && longest < best.longest)) {
      best = { line1, line2, diff, longest };
    }
  }
  return [best.line1, best.line2];
}

function fontFaceCss(fonts) {
  return `<style>
    @font-face { font-family: 'Inter'; font-weight: 400; font-style: normal; src: url(data:font/ttf;base64,${fonts.regularBase64}) format('truetype'); }
    @font-face { font-family: 'Inter'; font-weight: 600; font-style: normal; src: url(data:font/ttf;base64,${fonts.semiboldBase64}) format('truetype'); }
    @font-face { font-family: 'Inter'; font-weight: 700; font-style: normal; src: url(data:font/ttf;base64,${fonts.boldBase64}) format('truetype'); }
  </style>`;
}

function defsBlock() {
  return `<defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${COLORS.bg}"/>
      <stop offset="15%" stop-color="${COLORS.cyan500}" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="${COLORS.cyan400}"/>
      <stop offset="85%" stop-color="${COLORS.cyan500}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${COLORS.bg}"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="${COLORS.panel}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="${COLORS.bg}" stop-opacity="0"/>
    </radialGradient>
  </defs>`;
}

function backgroundBlock() {
  return `<rect width="${WIDTH}" height="${HEIGHT}" fill="${COLORS.bg}"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)"/>`;
}

function constellationBlock() {
  return `<g stroke="${COLORS.cyan500}" stroke-width="1.5" stroke-opacity="0.45" fill="none">
    <line x1="1080" y1="150" x2="940" y2="310"/>
    <line x1="1010" y1="230" x2="940" y2="490"/>
    <line x1="1080" y1="255" x2="1080" y2="360"/>
  </g>
  <g filter="url(#glow)">
    <circle cx="1080" cy="150" r="18" fill="${COLORS.cyan300}"/>
    <circle cx="1010" cy="230" r="16" fill="${COLORS.cyan400}" fill-opacity="0.9"/>
    <circle cx="1080" cy="255" r="14" fill="${COLORS.cyan400}" fill-opacity="0.8"/>
    <circle cx="940"  cy="310" r="13" fill="${COLORS.cyan500}" fill-opacity="0.7"/>
    <circle cx="1010" cy="335" r="13" fill="${COLORS.cyan400}" fill-opacity="0.8"/>
    <circle cx="1080" cy="360" r="12" fill="${COLORS.cyan500}" fill-opacity="0.7"/>
    <circle cx="940"  cy="410" r="12" fill="${COLORS.cyan500}" fill-opacity="0.7"/>
    <circle cx="1010" cy="435" r="11" fill="${COLORS.cyan500}" fill-opacity="0.6"/>
    <circle cx="940"  cy="490" r="11" fill="${COLORS.cyan500}" fill-opacity="0.5"/>
  </g>`;
}

function bottomRuleBlock() {
  return `<rect x="0" y="600" width="${WIDTH}" height="2" fill="url(#rule)"/>`;
}

async function svgToPng(svg) {
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}

async function svgToJpg(svg, quality = 90) {
  return sharp(Buffer.from(svg)).jpeg({ quality, mozjpeg: true }).toBuffer();
}

export async function renderBlogCard({
  title,
  series,
  byline = 'Syed Aamir · Data & AI Solutions Architect',
}) {
  const fonts = await loadFonts();

  const FONT_SIZE = 72;
  const LINE_HEIGHT = FONT_SIZE * 1.15;
  const TITLE_BLOCK_TOP = 240;

  const lines = wrapTitle(title);
  const firstBaseline = TITLE_BLOCK_TOP + FONT_SIZE * 0.82;

  const titleTspans = lines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : LINE_HEIGHT}">${escapeXml(l)}</tspan>`)
    .join('');

  // The category eyebrow was deliberately dropped from blog cards: in the feed
  // the title hook carries the card, and a category pill above it reads as
  // clutter. The series "PART N / M" line (navigation, not a category tag) stays.
  let seriesFragment = '';
  if (series && series.label && series.part && series.total) {
    const seriesText = `${series.label.toUpperCase()} · PART ${series.part} / ${series.total}`;
    seriesFragment = `<text x="80" y="205" font-family="Inter, sans-serif" font-size="15" font-weight="600" letter-spacing="2.5" fill="${COLORS.muted}">${escapeXml(seriesText)}</text>`;
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  ${fontFaceCss(fonts)}
  ${defsBlock()}
  ${backgroundBlock()}
  ${constellationBlock()}
  ${seriesFragment}
  <text x="80" y="${firstBaseline}" font-family="Inter, sans-serif" font-size="${FONT_SIZE}" font-weight="700" fill="${COLORS.cream}" letter-spacing="-1.5">${titleTspans}</text>
  <text x="80" y="540" font-family="Inter, sans-serif" font-size="22" font-weight="400" fill="${COLORS.muted}">${escapeXml(byline)}</text>
  ${bottomRuleBlock()}
</svg>`;

  return { png: await svgToPng(svg), lines };
}

export async function renderHomepageCard({
  name = 'Syed Aamir',
  tagline = 'Data that works as hard as your business does.',
  location = 'Dubai, UAE',
  eyebrow = 'DATA & AI SOLUTIONS ARCHITECT',
} = {}) {
  const fonts = await loadFonts();

  // Approximate chip width: each char ~13px at 19/600 with 3px letter-spacing.
  const approxChipWidth = Math.ceil(eyebrow.length * 13) + 60;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  ${fontFaceCss(fonts)}
  ${defsBlock()}
  ${backgroundBlock()}
  ${constellationBlock()}
  <g transform="translate(80, 215)">
    <rect x="0" y="0" width="${approxChipWidth}" height="48" rx="24" fill="${COLORS.cyan500}" fill-opacity="0.10" stroke="${COLORS.cyan500}" stroke-opacity="0.35"/>
    <text x="${approxChipWidth / 2}" y="32" font-family="Inter, sans-serif" font-size="19" font-weight="600" letter-spacing="3" fill="${COLORS.cyan400}" text-anchor="middle">${escapeXml(eyebrow)}</text>
  </g>
  <text x="80" y="380" font-family="Inter, sans-serif" font-size="112" font-weight="700" fill="${COLORS.cream}" letter-spacing="-2">${escapeXml(name)}</text>
  <text x="80" y="450" font-family="Inter, sans-serif" font-size="32" font-weight="400" fill="${COLORS.cream}" opacity="0.85">${escapeXml(tagline)}</text>
  <text x="80" y="500" font-family="Inter, sans-serif" font-size="22" font-weight="400" fill="${COLORS.muted}">${escapeXml(location)}</text>
  ${bottomRuleBlock()}
</svg>`;

  return svgToJpg(svg);
}
