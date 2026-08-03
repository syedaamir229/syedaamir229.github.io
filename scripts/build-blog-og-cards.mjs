import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import yaml from 'js-yaml';
import { renderBlogCard } from './lib/og-card.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const BLOG_DIR = resolve(REPO_ROOT, 'src', 'content', 'blog');
const OUT_DIR = resolve(REPO_ROOT, 'public', 'og', 'blog');
const SERIES_FILE = resolve(REPO_ROOT, 'src', 'data', 'series.ts');

function parseFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  return yaml.load(m[1]);
}

async function loadSeriesLabels() {
  const src = await readFile(SERIES_FILE, 'utf8');
  const labels = new Map();
  const re = /['"]([\w-]+)['"]\s*:\s*\{\s*label\s*:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    // Strip a trailing " Series" since the OG card already prefixes the
    // "PART N / M" suffix; "Semantic Layer · Part 2 / 6" reads cleaner
    // than "Semantic Layer Series · Part 2 / 6".
    labels.set(m[1], m[2].replace(/\s+Series$/, ''));
  }
  return labels;
}

await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md'));
const seriesLabels = await loadSeriesLabels();

const parsed = [];
const seriesCounts = new Map();
let skipped = 0;

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const src = await readFile(join(BLOG_DIR, file), 'utf8');
  const fm = parseFrontmatter(src);

  if (!fm || fm.draft) {
    skipped++;
    continue;
  }

  parsed.push({ slug, fm });

  if (fm.series) {
    seriesCounts.set(fm.series, (seriesCounts.get(fm.series) || 0) + 1);
  }
}

let generated = 0;
const missingOgTitle = [];

for (const { slug, fm } of parsed) {
  if (!fm.og_title) {
    missingOgTitle.push(slug);
    continue;
  }

  const category = Array.isArray(fm.categories) && fm.categories.length > 0 ? fm.categories[0] : null;

  let series = null;
  if (fm.series && fm.series_part) {
    series = {
      label: seriesLabels.get(fm.series) ?? fm.series,
      part: fm.series_part,
      total: seriesCounts.get(fm.series),
    };
  }

  const { png, lines } = await renderBlogCard({ title: fm.og_title, category, series });
  await writeFile(join(OUT_DIR, `${slug}.png`), png);

  console.log(`  ${slug}.png  (${lines.length} line${lines.length === 1 ? '' : 's'})`);
  generated++;
}

console.log(`\nGenerated ${generated} cards, skipped ${skipped} draft(s).`);

if (missingOgTitle.length > 0) {
  console.error(`\nERROR: ${missingOgTitle.length} post(s) missing required og_title frontmatter:`);
  for (const slug of missingOgTitle) console.error(`  - ${slug}`);
  console.error(`\nAdd og_title to each post (8 to 42 chars, hook-shaped per docs/BLOG.md section 3).`);
  process.exit(1);
}
