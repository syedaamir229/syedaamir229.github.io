import { chromium } from 'playwright';
import { resolve, basename } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const svgPath = process.argv[2];

if (!svgPath || !svgPath.endsWith('.svg')) {
  console.error('Usage: npm run verify:diagram <path-to-svg>');
  console.error('Example: npm run verify:diagram public/assets/blog/foo.svg');
  process.exit(1);
}

const absSvg = resolve(svgPath);

if (!existsSync(absSvg)) {
  console.error(`File not found: ${absSvg}`);
  process.exit(1);
}

const outDir = resolve('screenshots/diagrams');
await mkdir(outDir, { recursive: true });
const outPath = resolve(outDir, basename(svgPath).replace(/\.svg$/, '.png'));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1200 } });
await page.goto(`file://${absSvg}`);

const svg = page.locator('svg').first();
await svg.screenshot({ path: outPath, omitBackground: false });
await browser.close();

console.log(`Saved ${outPath}`);
