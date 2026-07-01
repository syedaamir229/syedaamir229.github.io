# Brand

The single source of truth for identity across every surface: portfolio, blog, project case studies, social posts.

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

## 5. Voice and tone (applies to every surface)

The **DNA** below (direct, specific, opinionated, no hedging) is constant across landing copy, blog posts, project case studies, social excerpts, and ad copy. The **register** shifts: landing and case-study surfaces are impersonal and declarative; long-form and personal writing (blog, LinkedIn, essays) is first-person and reflective. The "Long-form and first-person voice" subsection below defines that second register. Surface-specific specs add *structural* rules on top.

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

### Long-form and first-person voice (blog posts, personal essays, LinkedIn)

Landing copy is impersonal and imperative ("Stop hiring to scale. Start wiring."). Long-form is the opposite register: Aamir, in first person, telling you what he learned from doing the work. Same DNA, different delivery. The rules below are what make a piece read like him and not like a brand or an AI. The reference implementation is the bi-to-ai blog post.

- **First person, reflective.** Write as "I". Lead with lived experience, not a thesis statement. The pilot opens "For a long time I thought the interesting work was always one desk over," not "Data teams must compound their stack." The thesis arrives after the story has earned it.
- **Plain language first, then the precise term.** Name the human version before the technical one: "the part of data nobody gets excited about: the trustworthy tables and definitions that sit under a dashboard." Never lead with jargon and define it after. If a finance director would not say the word out loud, it is not the opening word.
- **One running motif, paid off at the end.** A piece carries a single thread ("the boring part") that opens it, recurs once or twice, and lands in the closing line. One motif, not a pile. No mixed metaphors, no cliché load-bearing image (the rejected "plumbing holding up the whole building" is the anti-pattern). Keep the motif's verbs consistent, not just its noun: if the image is a wall, the load it takes is one verb throughout (it *holds*), and a synonym swap (it *holds* in four places, then *bears* in a fifth) quietly breaks the thread.
- **Conviction without the clipped cadence.** State the thesis flatly and once ("a data team is either compounding everything it builds, or quietly starting over every couple of years"), then let the prose breathe. Long-form is warm and conversational between its hard claims; it does not stack imperatives like a landing page.
- **Subheads are arguments, not labels.** "Floor 1: the tables everyone trusts," not "Layer 1: Data Foundations." A reader skimming only the subheads should get the argument. Labels are for documentation, not persuasion.
- **One bolded payoff per section.** Each section earns exactly one bold line: its single takeaway. More than one and none of them lands. The bold is the sentence you would want quoted back.
- **Cite only load-bearing sources; reserve the signature number.** Drop any borrowed stat that every post on the topic already uses (the generic "80% of teams use AI" line was cut from the pilot). If the argument stands on your own observation, let it. Reserve one concrete number as the framework's signature (the "15,000 vs 12,000" meeting) and spend it where it hits hardest.
- **Examples are lived, then abstracted.** Real moments from real work, scrubbed of employer tells per BLOG.md confidentiality. A specific scene beats a hypothetical, but the scene must never be traceable.
- **Cut the flourish you would not say out loud.** The voice rejects writerly phrases that are not yours: "plumbing," "cash a cheque," "heuristic," "does not photograph well," "live-tweets," "job board." Test every line against "would I say this in a meeting?" If it is a writer performing, cut it.
- **Ground claims in your own experience, never borrowed authority.** First-person observation, not "analysts say," "people are saying," or "there is a popular explanation going around." If an outside source is used at all, it is one load-bearing link, not a vague crowd.
- **No literary self-narration, no staged strawman, no soft hedges.** Not "it gave me language for X" or "something I had half-understood for years." Do not set up "people think X" before the point; go straight to the claim. Drop "I also think" and "reframed how I think about."
- **Time-honesty.** A decade in data, the recent stretch in AI. Never imply long AI tenure ("for a long time I assumed..." about AI). The long experience is in data; AI just made the lesson sharp.
- **Each post is its own piece.** Do not reuse a previous post's signature phrasing or motif (the pilot owns "the boring part"). A fresh image per post.
- **The one bold per section is the most quotable line, not a restatement of the sentence before it.** If a section makes its point twice, promote the vivid version to the bold and cut the other.
- **When a line resists two or three good rewrites, cut it.** It usually has an existence problem, not a wording one, and the surrounding sentences often already carry the point.
- **Watch the machine-cadence tics that survive a spell-check.** Each reads fine once and as an algorithm in bulk, so give each a once-or-twice budget, not a habit. Drawn from the `blader/humanizer` anti-AI-writing catalog, kept only where they do not fight house style:
  - *Negative parallelism.* The "not X, it is Y" flip (and "not only... but") is fine once or twice; past that it becomes a detectable spine. Convert some to plain positive assertions.
  - *Aphorism formulas.* The bolded payoff states a concrete, arguable claim ("symmetric layouts feel more predictable"), never an abstract maxim ("symmetry is the language of trust"). Keep the payoff device, cut the abstraction.
  - *Persuasive-authority tropes.* Drop "the real question is", "at its core", "what really matters"; state the claim.
  - *Staccato runs.* One clipped sentence lands emphasis. A run of three or more short fragments in a row reads engineered. This sharpens, and never overrides, the one-bold-per-section rule: a single crafted payoff is not a staccato run.
  - *Forced triples.* Use the item count the point actually has; a rule-of-three whose third item is padding is a tell.
  - *Copula avoidance.* "serves as", "stands as", "boasts", "represents" are dressed-up ways to say "is" or "has". Use the plain verb.
  - *Filler phrases.* "in order to" is "to"; "due to the fact that" is "because"; "has the ability to" is "can".

### Reframes in practice

The rules above say *what* to cut; these are the *moves* that do it, drawn from real re-voicing passes. When a line reads like a copywriter wrote it, the fix is almost always a plainer, more concrete verb and a human subject, not more words. Use these as the pattern, not a closed list.

| Reads like a copywriter | Reads like Aamir | The move |
|---|---|---|
| and it named something I keep running into | and it lined up almost exactly with what I keep running into | swap the literary verb ("named") for a plain, concrete one |
| one day it is switched off without ceremony | one day someone just switches it off | drop the flourish; put a human in the sentence |
| a stronger model to survive contact with production | a stronger model to hold up in production | cut the borrowed idiom (the military "no plan survives contact") |
| it is also the surface of a simpler problem | but underneath it is a simpler problem | replace an abstract construction with a plain, spatial one |
| a single feed the job can trust | one source that stays put, keeps its shape, and is there every run | make an abstract noun concrete by naming what it does |

Keep crafted payoff lines (the one bold per section) doing their job: scrub a borrowed or clichéd *word* inside one, but do not flatten the balanced punchline into plain prose. The dial is plain-but-sharp, not plain-and-flat.

### Words to use

Words a finance director, COO, or product VP would say out loud.

- Verbs: agree on, trust, see, act on, stop, no longer, instead of, ship, govern, surface
- Nouns: revenue, churn, campaigns, dashboards, reports, customers, segments, profiles, episodes, content, sessions
- Adverbs of place: in one place, in one click, without breaking, before anyone touches it

### Words to avoid

These words drag tone backward toward CV mode or marketing mode.

- CV verbs on landing copy: built, designed, developed, delivered, implemented, deployed, stood up, contributed to, led, drove, owned, championed. These belong in case-study bodies.
- Marketing fillers: cutting-edge, state-of-the-art, next-generation, revolutionary, game-changing, robust, scalable (as a free-floating adjective), comprehensive, leveraging, utilizing.
- AI-tell vocabulary (the post-2023 cluster): delve, landscape, tapestry, testament, underscore, showcase, seamless, garner, intricate, interplay, pivotal, vibrant, realm, nuanced, multifaceted, foster, elevate. Reads as machine-generated in clusters; prefer the plain synonym.
- Hedges: might, could potentially, perhaps, in some cases, generally.
- Closing-CTA cliches: "hope this helped", "feel free to reach out", "let's connect".

### Hard rules

- **No em-dashes** anywhere in human-written or agent-written prose: no `—`, no `--` substitute. Use colons, periods, or restructure the sentence, and rotate between the three. Do not let the colon become the default em-dash replacement: the `statement: elaboration` colon turns into a tic in bulk, and a long-form piece should not lean on it a dozen times. When one paragraph stacks two colons, or several sections open with the same `X is Y: Z` frame, convert some to periods or restructure. The fix for too many colons is a period or a rewrite, never a comma (a comma in those spots only creates a splice). (SQL `--` comments inside fenced code blocks are exempt.)
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

**Project case studies and blog posts are the opposite**: stay concrete and specific about the delivered work. They are evidence, not pitch. But they must NOT lean into MENA / OTT / MBC Shahid: scrub all OTT/streaming vocabulary, reframe to a generic vertical, and never let MBC be inferable. Show delivery depth through abstracted specifics, not regional or employer tells. Authoritative rules: the `case-study-copywriter` and `blog-writeup` skills, vendored in this repo under `.claude/skills/`.

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
- **Voice in practice for blog posts**: see [BLOG.md](BLOG.md). It inherits tone from this doc; structure is its own concern.
- **Voice in practice for landing copy**: see [SITE.md](SITE.md).
- **Voice in practice for project case studies**: see [PROJECTS.md](PROJECTS.md).
