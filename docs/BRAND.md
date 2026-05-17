# Brand

The single source of truth for identity across every surface: portfolio, future AI consulting site, blog, project case studies, social posts.

Identity has two layers: **visual** (colors, type, surface, texture) and **tonal** (voice, sentence patterns, words to use and avoid). This document owns both. Surface-specific operational specs (BLOG.md, PROJECTS.md, SITE.md) refer up here for tone and inherit it; they only describe what is unique to that surface.

---

## 1. Positioning

**What this brand is:** Premium AI automation and data architecture consulting. Sells frameworks, implementations, and judgment. Not dashboards-as-a-service, not generic AI tooling.

**What it is not:**
- A white-coat SaaS product brand.
- A generic dark-mode developer portfolio.
- An editorial or literary brand.

**The differentiator:** Most AI and data brands default to electric blue on white. This one uses warm-leaning deep navy with cyan accents, monospace eyebrows, and a film-grain overlay. Reads as engineering precision rather than template-dark-mode or marketing chrome.

**Positioning lines that work:**
- "Data that works as hard as your business does."
- "End KPI disputes and make reporting self-serve."
- "Turning scattered data into decisions your business can trust."

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
- **Heading family is auto-applied** to `h1`-`h6` via the `@layer base` rule in `global.css`. Do not add `class="font-heading"` or `style="font-family: var(--font-heading)"` to headings — it is redundant.
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

## 5. Voice and tone (applies to every surface)

These principles apply identically to landing copy, blog posts, project case studies, social excerpts, and ad copy. Surface-specific specs add *structural* rules on top; tone is consistent.

### Principles

- **Direct and declarative.** No hedging: never "might", "could potentially", "perhaps", "in some cases".
- **Specific over abstract.** Numbers, named tools, real moments. "10M+ subscriber profiles governed", not "large-scale data work". "Tuesday morning Slack thread", not "a recent conversation".
- **Opinionated.** Every public claim is a position someone could disagree with. Audit it: if the opposite is unsayable, the line is filler.
- **The reader is smart.** Do not explain what AI is. Do not introduce semantic layers from first principles in a post titled "Why most semantic layers fail."
- **Confident without arrogance.** Show, do not tell. "Saved 15 hours per week" beats "delivered significant efficiency gains".
- **Business outcome over engineering verb.** On landing surfaces, lead with what changed for the business. The engineering verb belongs in the case-study body.

### Sentence patterns that work

- **Imperative declaration**: "Stop hiring to scale. Start wiring."
- **Concrete before abstract**: lead with the result, follow with the mechanism.
- **Short headline + longer supporting line**: never bury the lead.
- **One italic accent per major heading**: a single `<em>` phrase rendered with the italic-accent style. Use sparingly. Once per hero, once per major statement section. Not on every heading.

### Words to use

Words a finance director, COO, or product VP would say out loud.

- Verbs: agree on, trust, see, act on, stop, no longer, instead of, ship, govern, surface
- Nouns: revenue, churn, campaigns, dashboards, reports, customers, segments, profiles, episodes, content, sessions
- Adverbs of place: in one place, in one click, without breaking, before anyone touches it

### Words to avoid

These words drag tone backward toward CV mode or marketing mode.

- CV verbs on landing copy: built, designed, developed, delivered, implemented, deployed, stood up, contributed to, led, drove, owned, championed. These belong in case-study bodies.
- Marketing fillers: cutting-edge, state-of-the-art, next-generation, revolutionary, game-changing, robust, scalable (as a free-floating adjective), comprehensive, leveraging, utilizing.
- Hedges: might, could potentially, perhaps, in some cases, generally.
- Closing-CTA cliches: "hope this helped", "feel free to reach out", "let's connect".

### Hard rules

- **No em-dashes** anywhere in human-written or agent-written prose: no `—`, no `--` substitute. Use colons, periods, or restructure the sentence. (SQL `--` comments inside fenced code blocks are exempt.)
- **No emoji** in any content surface, page, component, or commit message.
- **No exclamation marks** outside quoted speech.
- **No passive voice in headlines.** Active subject doing the verb.
- **No AI attribution** in git commits, PR bodies, or content (no "Generated with", no "Co-Authored-By: Claude").

### Vertical agnosticism on landing surfaces

Landing-surface copy (home page, capability cards, section subheads, hero, CTAs) is pitched to any buyer: media, banking, retail, government, B2B SaaS. Pull vertical-specific vocabulary out:

- Subscription/SaaS-flavored: subscribers, viewers, episodes, churn, retention, MRR, ARR
- Region-flavored: Arabic, MENA, Dubai, UAE (the experience timeline already establishes the location)
- Tool-flavored: Databricks, Power BI, Tableau (named tools belong in project tags and case-study bodies)

Use universal entities: customers, transactions, operations, finance, marketing, sales, risk, intent, records, content, accounts.

**Project case studies and blog posts are the opposite**: stay vertical-specific. They are evidence, not pitch. MENA / OTT / Shahid context is the brand's defensible differentiator and should be structural in posts about delivered work.

---

## 6. Logo and wordmark

**Status: TBD.** Company name decision held for a separate naming session. Logo work is blocked until the name lands. Today the personal-brand wordmark ("Syed Aamir" in Inter 700, cream-100 on navy-950) carries every surface. When the consulting brand is named, the wordmark should follow:

- Inter 600 or 700, fixed size.
- No icon required at launch. Clean wordmark is sufficient.
- Color: `cream-100` on dark backgrounds. `navy-950` on light (rare use).
- Replace the `Syed Aamir` wordmark in Nav and Footer at the same time as the rest of the brand swap.

---

## 7. What not to do

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
- **Voice in practice for blog posts**: see [BLOG.md](BLOG.md). It inherits tone from this doc; structure is its own concern.
- **Voice in practice for landing copy**: see [SITE.md](SITE.md).
- **Voice in practice for project case studies**: see [PROJECTS.md](PROJECTS.md).
- **Brand strategy for the blog** (pillars, distribution, cadence): see [BLOG_STRATEGY.md](BLOG_STRATEGY.md).
