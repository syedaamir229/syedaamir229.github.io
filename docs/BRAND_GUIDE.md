# Brand Guide

Personal portfolio and AI consulting brand for Syed Aamir, Data & AI Solutions Engineer, Dubai UAE.

**Status**: Approved 2026-05-15 (Phase 2B complete)
**Applies to**: Portfolio site (syedaamir229.github.io) and future AI consulting/course site
**Company name**: TBD — held for a separate naming session. Logo/wordmark blocked until then.

---

## 1. Brand Positioning

**What this brand is:**
Premium AI automation and data architecture consulting. Sells frameworks, implementations, and thinking — not dashboards, not generic AI tooling.

**What it is not:**
- A white-coated SaaS product site
- A generic dark-mode developer portfolio
- An editorial/literary brand

**The differentiator:**
Most AI/data brands default to cold navy or electric blue on white. This brand uses warm near-black backgrounds and copper accents — signals precision engineering (copper circuit traces, machined metal) rather than template dark mode.

**Positioning line examples:**
- "Your business, *run by AI.*"
- "Stop hiring to scale. Start wiring."
- "Intelligence by design."

---

## 2. Colour System

### Palette

| Token | Hex | Role |
|---|---|---|
| `--carbon-950` | `#0F0E0B` | Page background |
| `--carbon-900` | `#1A1714` | Card / section backgrounds |
| `--carbon-800` | `#241F1B` | Elevated surfaces |
| `--carbon-700` | `#2E2823` | Borders / dividers |
| `--carbon-600` | `#3D3229` | Subtle borders |
| `--copper-500` | `#C87533` | Primary accent — CTAs, key words, highlights |
| `--copper-400` | `#D98F4E` | Hover states, italic heading accents |
| `--copper-300` | `#E8AC72` | Gradient endpoints, decorative |
| `--copper-200` | `#F2CAAA` | Very light copper, rare use |
| `--sage-500` | `#8FAF8B` | Secondary accent — tags, badges, secondary eyebrows |
| `--sage-400` | `#A8C4A4` | Lighter sage |
| `--cream-100` | `#F0EDE8` | Primary body text |
| `--cream-200` | `#D9D4CC` | Secondary text |
| `--muted-500` | `#9C9189` | Captions, metadata, placeholder text |
| `--muted-600` | `#6B5F57` | Disabled states |

### Colour rules

- **Background temperature**: Always warm near-black (`--carbon-950`). Never cold blue-black or pure `#000000`.
- **Primary accent**: Copper (`--copper-500`) on interactive elements, key headline words, CTA buttons. One dominant accent per section.
- **Secondary accent**: Sage (`--sage-500`) for secondary labels only — never compete with copper in the same visual hierarchy level.
- **Text**: `--cream-100` for headings and primary body. `--muted-500` for supporting text, never below that for running copy.
- **No white**: `#ffffff` is not in the palette. The lightest surface is `--cream-100` for text only.

---

## 3. Typography

### Type stack

| Role | Family | Weights | Fallback |
|---|---|---|---|
| Headings | Space Grotesk | 500, 700 | `system-ui, sans-serif` |
| Body | DM Sans | 300, 400, 500 | `system-ui, sans-serif` |
| Mono / code | JetBrains Mono | 400, 500 | `monospace` |

### Google Fonts import

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### CSS variables

```css
--font-heading: 'Space Grotesk', system-ui, sans-serif;
--font-body:    'DM Sans', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', monospace;
```

### Scale

| Level | Size | Weight | Use |
|---|---|---|---|
| Display | `clamp(56px, 8.5vw, 114px)` | 700 | Hero heading |
| H1 | `clamp(36px, 5vw, 64px)` | 700 | Page titles |
| H2 | `clamp(28px, 3.5vw, 44px)` | 600 | Section titles |
| H3 | `24px` | 500 | Card titles, subheadings |
| Body large | `18px` | 400 | Lead paragraphs |
| Body | `16px` | 400 | Running copy |
| Small | `14px` | 400 | Supporting text |
| Eyebrow | `11px` | 500 | Section labels (uppercase, 0.18em tracking) |
| Mono | `14px` | 400 | Code, technical strings |

### Typography rules

- **Eyebrows**: Always `JetBrains Mono`, uppercase, `0.18em` letter-spacing, `--copper-500` or `--sage-500` colour. Never DM Sans for eyebrows.
- **Italic copper accent**: The signature pattern — a heading has one `<em>` phrase rendered in `font-style: italic; color: var(--copper-400)`. Use sparingly: once per hero, once per major statement section. Not on every heading.
- **Line height**: Headings `1.0–1.1`. Body `1.65`. Never tight body copy.
- **Letter spacing**: Headings `-0.025em`. Body `0`. Eyebrows `+0.18em`.
- **Space Grotesk character note**: The typeface has distinctive `a`, `e`, and `y` letterforms at display sizes — this is intentional and is part of the brand's visual fingerprint.

---

## 4. Texture and Surface

### Grain overlay

A low-opacity film grain overlay sits above all surfaces. This is critical to the visual identity — it prevents flat digital feel and distinguishes the brand from AI-generated or template outputs.

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}
```

Grain opacity range: `0.03` (subtle) to `0.05` (current). Do not exceed `0.06`.

### Borders and elevation

- Borders: `1px solid var(--carbon-700)` — always warm-tinted, never cold grey
- Card background: `--carbon-900`
- Elevated (modal, dropdown): `--carbon-800`
- No box shadows with cold colour casts. If a shadow is needed: `0 4px 24px rgba(0,0,0,0.4)`.

---

## 5. Voice and Tone

**Principles:**
- Direct and declarative. No hedging ("might", "could potentially", "perhaps").
- Specific outcomes over vague capability claims. "10M+ subscriber profiles governed" not "large-scale data work".
- The reader is smart. No explaining what AI is.
- Confident without being arrogant. Show, don't tell.

**Sentence patterns that work:**
- Imperative declaration: "Stop hiring to scale. Start wiring."
- Concrete before abstract: lead with the result, follow with the mechanism
- Short headline + longer supporting line. Never bury the lead.

**Patterns to avoid:**
- "Cutting-edge", "state-of-the-art", "next-generation"
- Em-dashes (use colons, periods, or restructure)
- Exclamation marks
- Passive voice in headlines

---

## 6. Logo and Wordmark

**Status: TBD.** Company name not yet decided — this section is blocked until the naming session.

When the name is decided, the wordmark should follow these constraints:
- Space Grotesk 600 or 700, set at a fixed size
- No icon required at launch — a clean wordmark is sufficient
- Colour: `--cream-100` on dark backgrounds. `--carbon-950` on light (rare use).
- The `[CompanyName]` placeholder in the portfolio nav will be replaced at that point.

---

## 7. Design Tokens for Phase 5

Drop-in replacement block for `src/styles/global.css`. Replace the current `@theme` colour and font entries with:

```css
@theme {
  /* Backgrounds */
  --color-carbon-950: #0F0E0B;
  --color-carbon-900: #1A1714;
  --color-carbon-800: #241F1B;
  --color-carbon-700: #2E2823;
  --color-carbon-600: #3D3229;

  /* Primary accent */
  --color-copper-500: #C87533;
  --color-copper-400: #D98F4E;
  --color-copper-300: #E8AC72;
  --color-copper-200: #F2CAAA;

  /* Secondary accent */
  --color-sage-500: #8FAF8B;
  --color-sage-400: #A8C4A4;

  /* Text */
  --color-cream-100: #F0EDE8;
  --color-cream-200: #D9D4CC;
  --color-muted-500: #9C9189;
  --color-muted-600: #6B5F57;

  /* Fonts */
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

**Note for Phase 5:** The existing portfolio uses `navy-*` and `teal-*` token names. A find-and-replace pass across all component files will be needed when swapping tokens. The current grain overlay in `global.css` is already present at `0.03` opacity — raise to `0.045` to match this guide.

---

## 8. What Not to Do

- No electric blue, purple, or neon accent colours
- No white backgrounds or light-mode variants (not in scope for either site)
- No icon-grid layouts (rows of identical feature icons with captions) — use card layouts with hierarchy instead
- No gradient meshes or glassmorphism blur effects as primary surface treatments
- No AI-generated hero illustrations — photography or pure typography preferred
- No serif typefaces (Fraunces, Playfair, Garamond etc.) — Space Grotesk only for headings
