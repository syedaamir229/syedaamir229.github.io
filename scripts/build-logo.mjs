// Brand logo + icon generator.
// Produces the SA compact mark, the Syed Aamir wordmark (dark + light), and the
// site icon set (favicon.png, apple-touch-icon, manifest icons), all in true
// Inter via embedded fonts so letterforms are locked and identical everywhere.
//
// Run: npm run logo
//
// Outputs:
//   public/assets/logo/   -> reusable brand assets (mark + wordmark, png + svg)
//   public/               -> favicon.png, apple-touch-icon.png, icon-192/512.png
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const FONT_DIR = resolve(ROOT, 'public', 'fonts', 'inter');
const PUBLIC = resolve(ROOT, 'public');
const LOGO_DIR = resolve(PUBLIC, 'assets', 'logo');

const C = {
  bg: '#050B14',     // navy-950
  panel: '#0A1220',  // navy-900
  tile: '#122033',   // navy-800
  cyan500: '#06B6D4',
  cyan400: '#22D3EE',
  cyan300: '#67E8F9',
  cream: '#E2E8F0',
  muted: '#94A3B8',
  navyInk: '#0A1220',
};

const [boldBuf, semiBuf, regBuf] = await Promise.all([
  readFile(resolve(FONT_DIR, 'Inter-Bold.ttf')),
  readFile(resolve(FONT_DIR, 'Inter-SemiBold.ttf')),
  readFile(resolve(FONT_DIR, 'Inter-Regular.ttf')),
]);
const F = {
  bold: boldBuf.toString('base64'),
  semi: semiBuf.toString('base64'),
  reg: regBuf.toString('base64'),
};

const fontFace = `<style>
  @font-face { font-family: 'Inter'; font-weight: 400; src: url(data:font/ttf;base64,${F.reg}) format('truetype'); }
  @font-face { font-family: 'Inter'; font-weight: 600; src: url(data:font/ttf;base64,${F.semi}) format('truetype'); }
  @font-face { font-family: 'Inter'; font-weight: 700; src: url(data:font/ttf;base64,${F.bold}) format('truetype'); }
</style>`;

const glow = `<filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
  <feGaussianBlur stdDeviation="5" result="b"/>
  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>`;

// ---- SA compact mark ----
// rounded=true gives a navy rounded tile with margin (logo + favicon use).
// rounded=false fills the whole canvas (app/home-screen icons; the OS masks corners).
function saMark({ size = 1024, rounded = true, transparent = false } = {}) {
  const pad = rounded ? size * 0.085 : 0;
  const tileW = size - pad * 2;
  const radius = rounded ? size * 0.22 : 0;
  const fontSize = size * 0.40;
  const bg = transparent
    ? ''
    : `<rect x="${pad}" y="${pad}" width="${tileW}" height="${tileW}" rx="${radius}" fill="${C.tile}"/>
       <rect x="${pad}" y="${pad}" width="${tileW}" height="${tileW}" rx="${radius}" fill="none" stroke="${C.cyan500}" stroke-opacity="0.25" stroke-width="${size * 0.004}"/>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${fontFace}
  ${bg}
  <text x="${size / 2}" y="${size / 2 + fontSize * 0.35}" font-family="Inter" font-weight="700" font-size="${fontSize}" letter-spacing="${-fontSize * 0.05}" fill="${C.cyan400}" text-anchor="middle">SA</text>
</svg>`;
}

// Lightweight favicon.svg: true vector, Inter-first stack (tiny tab use).
function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="${C.tile}"/>
  <text x="64" y="86" text-anchor="middle"
        font-family="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        font-weight="700" font-size="56" fill="${C.cyan400}" letter-spacing="-3">SA</text>
</svg>`;
}

// ---- Wordmark lockup ----
function wordmark({ light = false, transparent = false } = {}) {
  const W = 1400, H = 460;
  const ink = light ? C.navyInk : C.cream;
  const bg = light ? '#ffffff' : C.bg;
  const mark = `<g transform="translate(110,170)" filter="url(#glow)">
    <g stroke="${C.cyan500}" stroke-width="4" stroke-opacity="0.55">
      <line x1="70" y1="0" x2="0" y2="70"/>
      <line x1="70" y1="0" x2="110" y2="64"/>
      <line x1="0" y1="70" x2="58" y2="140"/>
    </g>
    <circle cx="70" cy="0" r="18" fill="${C.cyan300}"/>
    <circle cx="0" cy="70" r="14" fill="${C.cyan400}"/>
    <circle cx="110" cy="64" r="13" fill="${C.cyan500}"/>
    <circle cx="58" cy="140" r="12" fill="${C.cyan500}"/>
  </g>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${fontFace}
  <defs>${glow}</defs>
  ${transparent ? '' : `<rect width="${W}" height="${H}" fill="${bg}"/>`}
  ${mark}
  <text x="320" y="205" font-family="Inter" font-weight="600" font-size="28" letter-spacing="6.5" fill="${C.cyan400}">DATA &amp; AI SOLUTIONS ENGINEER</text>
  <text x="318" y="310" font-family="Inter" font-weight="700" font-size="112" letter-spacing="-4.5" fill="${ink}">Syed Aamir</text>
</svg>`;
}

async function toPng(svg, out, { flatten } = {}) {
  let img = sharp(Buffer.from(svg));
  if (flatten) img = img.flatten({ background: flatten });
  await img.png({ compressionLevel: 9 }).toBuffer().then((b) => writeFile(out, b));
  console.log('wrote', out.replace(ROOT + '/', ''));
}

async function writeText(out, text) {
  await writeFile(out, text);
  console.log('wrote', out.replace(ROOT + '/', ''));
}

await mkdir(LOGO_DIR, { recursive: true });

// --- Brand assets (public/assets/logo) ---
await writeText(resolve(LOGO_DIR, 'sa-mark.svg'), saMark({ size: 512, rounded: true }));
await toPng(saMark({ size: 1024, rounded: true }), resolve(LOGO_DIR, 'sa-mark.png'));
await toPng(saMark({ size: 1024, rounded: true, transparent: true }), resolve(LOGO_DIR, 'sa-mark-transparent.png'));

await writeText(resolve(LOGO_DIR, 'wordmark-dark.svg'), wordmark({ light: false }));
await writeText(resolve(LOGO_DIR, 'wordmark-light.svg'), wordmark({ light: true }));
await toPng(wordmark({ light: false }), resolve(LOGO_DIR, 'wordmark-dark.png'));
await toPng(wordmark({ light: true }), resolve(LOGO_DIR, 'wordmark-light.png'));
await toPng(wordmark({ light: false, transparent: true }), resolve(LOGO_DIR, 'wordmark-dark-transparent.png'));
await toPng(wordmark({ light: true, transparent: true }), resolve(LOGO_DIR, 'wordmark-light-transparent.png'));

// --- Site icons (public/) ---
await writeText(resolve(PUBLIC, 'favicon.svg'), faviconSvg());
await toPng(saMark({ size: 128, rounded: true }), resolve(PUBLIC, 'favicon.png'));
await toPng(saMark({ size: 180, rounded: false }), resolve(PUBLIC, 'apple-touch-icon.png'), { flatten: C.tile });
await toPng(saMark({ size: 192, rounded: false }), resolve(PUBLIC, 'icon-192.png'), { flatten: C.tile });
await toPng(saMark({ size: 512, rounded: false }), resolve(PUBLIC, 'icon-512.png'), { flatten: C.tile });

console.log('logo build complete');