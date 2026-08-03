import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { renderHomepageCard } from './lib/og-card.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '..', 'public', 'assets', 'og-card.jpg');

const jpg = await renderHomepageCard();
await writeFile(OUT_PATH, jpg);

console.log(`Wrote ${OUT_PATH}`);
