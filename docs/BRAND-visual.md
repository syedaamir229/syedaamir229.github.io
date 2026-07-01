# Brand: Visual

The visual half of the brand identity: color, typography, surface and texture, logo, diagrams, and the visual anti-patterns. The tonal half (voice, words, hard rules) lives in [BRAND-voice.md](BRAND-voice.md); positioning and the index live in [BRAND.md](BRAND.md).

Section numbers below are preserved from the original single BRAND.md so existing anchor links (for example `#7-diagrams`) keep resolving.

---

## 2. Color system

The palette is defined in `src/styles/global.css` as Tailwind v4 `@theme` tokens. The names are value-based (navy, cyan, cream, muted) because the brand stays on this hue. If a future palette shift swaps hues, also rename the tokens at the same time so the names stay accurate.

| Token | Hex | Role |
|---|---|---|
| `--color-navy-950` | `#050B14` | Page background |
| `--color-navy-900` | `#0A1220` | Card / section background |
| `--color-navy-800` | `#122033` | Elevated surface |
| `--color-navy-700` | `#1E3148` | Border on elevated surfaces |
| `--color-navy-600` | `#2A4561` | Subtle border |
| `--color-cyan-500` | `#06B6D4` | Primary accent: CTAs, key words, eyebrows |
| `--color-cyan-400` | `#22D3EE` | Hover state, links |
| `--color-cyan-300` | `#67E8F9` | Gradient endpoints |
| `--color-cyan-200` | `#A5F3FC` | Light decorative, rare use |
| `--color-cream-100` | `#E2E8F0` | Primary body text and headings |
| `--color-cream-200` | `#CBD5E1` | Secondary text |
| `--color-muted-500` | `#94A3B8` | Captions, metadata, lede paragraphs |
| `--color-muted-600` | `#64748B` | Disabled, very low-emphasis |

### Color rules

- **Background**: always navy-950. Never pure `#000000`, never warm-brown.
- **Primary accent**: cyan-500 for CTAs, key words, eyebrows. One dominant accent per visual hierarchy level.
- **No white**: `#ffffff` is not in the palette. The lightest surface is `cream-100` for text only.
- **Borders**: always navy-tinted (`cream-100/5` opacity, or `navy-700`). Never cold neutral gray, never warm brown.
- **muted-600** (`#64748B`): borders and decorative separators only, never text. At 4.1:1 on navy-950 it is below WCAG AA for body text. `muted-500` is the floor for anything a reader reads.

---

## 3. Typography

The type stack is defined in `src/styles/global.css`. Heading and body share the same family for a clean engineered look; mono carries technical labels.

| Role | Family | Fallback |
|---|---|---|
| Headings (`h1`-`h6`) | Inter | `system-ui, sans-serif` |
| Body | Inter | `system-ui, sans-serif` |
| Mono / eyebrows / code | JetBrains Mono | `monospace` |

### Typography rules

- **Eyebrows**: always JetBrains Mono, uppercase, `0.18em` tracking. Use the `<Eyebrow>` primitive (sm = 11px, xs = 10px). Cyan tone by default; muted tone for low-emphasis labels ("On this page", "Earlier", "Active").
- **Heading family is auto-applied** to `h1`-`h6` via the `@layer base` rule in `global.css`. Do not add `class="font-heading"` or `style="font-family: var(--font-heading)"` to headings; it is redundant.
- **Line height**: headings 1.0 to 1.2 (set in base layer); body 1.7 (set on `body`).
- **Letter spacing**: headings `-0.025em` (set in base layer); body 0; eyebrows `+0.18em`.
- **No serifs** anywhere: no Fraunces, no Playfair, no Garamond.

---

## 4. Surface and texture

### Grain overlay

A low-opacity SVG noise overlay sits above every surface. This is load-bearing for the visual identity: it prevents flat digital feel and signals "not a template". The rule lives in `src/styles/global.css`. Opacity range: 0.03 (subtle) to 0.05 (current 0.045). Do not exceed 0.06.

### Borders and elevation

- Borders: `1px solid color-mix(in srgb, var(--color-cream-100) 5%, transparent)` is the default subtle border. `var(--color-navy-700)` for stronger.
- Card background: `--color-navy-900` or `--color-navy-800` with subtle border.
- Elevated (sticky nav uses `.glass`): `color-mix(in srgb, var(--color-navy-950) 70%, transparent)` plus `backdrop-filter: blur(16px)`.
- No cold-tinted box shadows. If a shadow is needed: `0 8px 32px color-mix(in srgb, var(--color-cyan-500) 12%, transparent)`.

### Auto-applied section borders

Adjacent `<section>` elements inside `<main>` get a 1px cream-tinted top border automatically via `@layer base`. Do not add `border-t` to sections manually.

---

## 6. Logo and wordmark

Two marks, both from the same identity. Source assets live in `public/assets/logo/` and the full set (marks plus site icons) is regenerated with `npm run logo` (`scripts/build-logo.mjs`). Both render in true Inter via embedded fonts, so letterforms are locked and identical everywhere.

- **Wordmark (primary):** "Syed Aamir", Inter 700, `cream-100` on `navy-950`, with the cyan node-graph accent to its left. Use anywhere with horizontal room: nav, footer, documents, proposals, email signature. A light variant (navy ink on white) exists for light backgrounds such as printed contracts.
- **SA monogram (compact mark):** "SA" in Inter 700, `cyan-400` on a `navy-800` rounded square. Use only where a square or tiny space cannot fit the name: favicon, social avatar, app icon.

The node-graph accent is the brand's decorative motif (it also appears on the OG card and in diagrams). The wordmark carries the identity; the monogram carries it into square slots.

Site icons (`favicon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`) are generated from the SA mark. `favicon.svg` is a lightweight vector with an Inter-first font stack; `favicon.ico` remains the legacy 16/32px version (the difference is imperceptible at that size).

When a separate consulting-brand name lands from a future naming session, replace the wordmark in Nav and Footer in one pass and regenerate the marks; keep Inter 600 or 700.

---

## 7. Diagrams

Blog post and project case-study diagrams are **hand-coded SVGs**, written directly as XML and checked into the repo. There is no design-tool export pipeline. The same workflow applies whether a human or Claude writes the markup.

### Where they live

| Surface | Path | Naming |
|---|---|---|
| Blog | `public/assets/blog/<post-slug>-<image-name>.svg` | One or more per post when a diagram earns its place |
| Project case study | `public/assets/projects/<slug>.svg` | Exactly one per case study (the Architecture Overview diagram) |

### Diagram palette

Subset of section 2 that diagrams typically need. Colors are baked into the SVG, not theme-driven. If the site palette changes, regenerate or hand-edit the files.

| Use | Hex | Token |
|---|---|---|
| Background (first `<rect>` filling the viewBox) | `#050B14` | `--color-navy-950` |
| Card surfaces | `#0A1220`, `#122033` | `--color-navy-900`, `--color-navy-800` |
| Borders / strokes | `#2A4561` | `--color-navy-600` |
| Accent stroke / fill | `#06B6D4` | `--color-cyan-500` |
| Soft accent fill | `rgba(6,182,212,0.06)` | cyan-500 at 6% |
| Primary text | `#E2E8F0` | `--color-cream-100` |
| Secondary text | `#94A3B8` | `--color-muted-500` |
| Arrowheads, low-emphasis strokes | `#94A3B8` | `--color-muted-500` |

### SVG conventions

- First child is a `<rect>` covering the viewBox with `fill="#050B14"` (the navy background). Diagrams render correctly when opened standalone, not just when embedded in a page.
- Set `font-family="Inter, system-ui, sans-serif"` on the root `<svg>` element.
- Use `viewBox` with explicit dimensions; do not set fixed `width` / `height`.
- Aspect ratio: 16:9 for architecture flows, 4:3 or 1:1 for concept illustrations.

### Verify the rendered output

After writing or editing any SVG, run:

```bash
npm run verify:diagram public/assets/blog/<file>.svg
```

The script opens the SVG in headless Chromium via Playwright, screenshots the rendered output, and saves a PNG to `screenshots/diagrams/<file>.png` (gitignored). Read that PNG back and confirm:

- Navy background, cyan accents, palette matches the tokens above.
- No label overflow, no misalignment, no clipped elements.
- Every label legible at rendered size.

This step is mandatory because reading the SVG markup is not the same as seeing it render. Broken diagrams have shipped before when only the XML was reviewed.

---

## 8. What not to do

- No electric blue, purple, magenta, or neon accents.
- No white backgrounds. No light-mode variant (not in scope for either site).
- No icon-grid layouts (rows of identical feature icons with captions). Use card layouts with hierarchy instead.
- No gradient meshes or glassmorphism blur effects as primary surface treatments (the `.glass` nav is the exception, deliberately constrained).
- No AI-generated hero illustrations. Photography or pure typography preferred.
- No serif typefaces.
- No stock photography of generic teams pointing at screens.

---

## Cross-references

- **Visual implementation** lives in [src/styles/global.css](../src/styles/global.css). Token names map directly to the table in section 2.
- **Voice and tone**: [BRAND-voice.md](BRAND-voice.md).
- **Positioning and the brand index**: [BRAND.md](BRAND.md).
