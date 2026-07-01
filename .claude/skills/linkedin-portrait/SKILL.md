---
name: linkedin-portrait
description: >-
  Build or redesign a LinkedIn feed portrait image for a blog post in this
  portfolio. Use this skill whenever the task involves creating, rebuilding, or
  tweaking a *-feed-portrait.png — even if phrased as "build the portrait",
  "create the feed image", "make the LinkedIn graphic", "redesign the image",
  "add a visual for the X post", or "update the portrait". Every blog post that
  has a diagram or framework needs one of these. Always use this skill rather
  than improvising the approach from scratch.
---

# LinkedIn Feed Portrait Builder

This skill is the third step in the post chain: blog-writeup writes the post,
linkedin-post writes the companion, this skill builds the image. Read
`social/linkedin/<slug>.md` for the eyebrow, heading hook, and format note
before writing any geometry.

One Playwright script per post renders a 1080×1350 SVG to PNG at 2x device
scale (2160×2700 output). The shared frame (background, glow, eyebrow, two-line
heading, constellation accent, footer rule, byline, and the Playwright render)
lives in `scripts/lib/portrait.mjs` and is called via `renderPortrait(...)`. A
per-post script owns **only** its bespoke diagram plus the heading copy — do not
re-copy the boilerplate.

- Shared lib: `scripts/lib/portrait.mjs` (exports `renderPortrait`, `C`, `esc`, `W`, `H`)
- Script: `scripts/build-<slug>-portrait.mjs`
- Output: `social/linkedin/<slug>-feed-portrait.png`
- Reference implementation: `scripts/build-maturity-ladder-portrait.mjs`

**Run and preview:**
```bash
source ~/.nvm/nvm.sh && nvm use 24
node scripts/build-<slug>-portrait.mjs
```
Then `Read` the PNG — Claude renders it inline. Preview after every stage.

---

## Build in four stages — always

Work incrementally. Preview after each stage before moving on. Combining stages
wastes tokens on geometry bugs a 30-second preview would have caught.

1. **Shapes only.** Walls, rails, boxes, polygons — no text. Confirm
   proportions, overlaps, and any crossing points that carry meaning (e.g. the
   ladder rail crossing the wall's cyan top edge).
2. **Badges / nodes.** Numbered circles or markers on key points. Confirm fill
   colours (filled vs outlined) correctly signal the two states.
3. **Text labels.** Rung names, sub-labels, annotations. Confirm nothing clips
   the canvas edge or collides with a structural element.
4. **Full branding.** Eyebrow, two-line heading, constellation accent, footer
   rule, byline. Adjust `TOP_Y` if the diagram top overlaps the heading.

---

## Brand palette (imported from the lib — do not redefine)

`renderPortrait` and the palette come from `scripts/lib/portrait.mjs`:
`import { renderPortrait, C, esc } from './lib/portrait.mjs';`. The palette is
listed here for reference when picking diagram colours; the lib is the source of
truth (it matches build-carousel.mjs).

```js
const C = {
  bg:      '#050B14',
  panel:   '#0A1220',
  panel2:  '#122033',
  border:  '#1E3148',
  border2: '#2A4561',
  cyan500: '#06B6D4',
  cyan400: '#22D3EE',
  cyan300: '#67E8F9',
  cream:   '#E2E8F0',
  cream2:  '#CBD5E1',
  muted:   '#94A3B8',
  dim:     '#475569',
};
```

---

## Layout zones

```
y=0    ┌──────────────────────────────────────────┐
       │  bg (#050B14) + radial top glow          │
y=70   │  constellation accent (x=762, 240×240)   │
y=106  │  eyebrow  (23px, cyan400, letter-spacing)│
y=185  │  heading line 1  (78px bold, cream)      │
y=271  │  heading line 2  (78px bold, cyan300)    │
       │                                          │
y=310  │  ── diagram top ──────────────────────── │
       │                                          │
       │  diagram: y ≈ 310 – 1120                 │
       │                                          │
y=1120 │  ── diagram bottom ───────────────────── │
       │                                          │
y=1268 │  footer gradient rule                    │
y=1310 │  byline                                  │
y=1350 └──────────────────────────────────────────┘
```

**Heading baseline y=271 is the hard ceiling** for diagram elements. If the
diagram's topmost element would sit above y=310, shift `TOP_Y` down (e.g. to
360) so the diagram clears it.

**Constellation occupies x=762–1002, y=70–310.** Header text starting at x=92
must not exceed x≈760. At 78px Inter Bold, ~13 characters is the safe maximum
per heading line.

---

## Heading copy rules

The two-line headline is the only thing visible before anyone reads the
caption. It must work as a standalone hook.

- **Line 1 (cream, y=185):** sets up the topic or tension. Keep short (≤12
  chars). If the subject (AI, data, etc.) is not obvious from the diagram,
  name it here in the big cream type — do not bury it in the small eyebrow.
- **Line 2 (cyan300, y=271):** lands the reframe or constraint. Can be longer.
- **Eyebrow (y=106):** `TOPIC CATEGORY` in uppercase with `letter-spacing="4"`.

**Example (maturity-ladder post):**
- Eyebrow: `DATA & AI MATURITY`
- Line 1: `The AI rung`
- Line 2: `your data can hold`

The full phrase "The AI rung your data can hold" reads as one sentence across
both lines — this two-line split pattern works well for 5–7 word hooks.

---

## Boilerplate template

The shared frame lives in `scripts/lib/portrait.mjs`. A per-post script imports
`renderPortrait`, `C`, and `esc`, defines its diagram-specific constants and a
`buildDiagram()` that returns an SVG string, then calls `renderPortrait(...)`
with the heading copy. That is the whole file — no fonts, no HTML shell, no
Playwright, no constellation to copy.

```js
import { renderPortrait, C, esc } from './lib/portrait.mjs';

// ── diagram-specific constants ────────────────────────────────────────────────
// e.g. wall/rail geometry, rung data, helper functions

function buildDiagram() {
  const out = [];
  // Draw walls/backgrounds first, then rails, badges, labels (document order).
  // Use C.* for colours and esc() for any data-driven text.
  // Math.round() all computed float coordinates.
  out.push(`<rect x="..." y="..." .../>`);
  return out.join('\n');
}

await renderPortrait({
  slug:    '<slug>',              // → social/linkedin/<slug>-feed-portrait.png
  eyebrow: 'TOPIC CATEGORY',      // y=106, cyan400, uppercase
  heading: ['Line one', 'line two'],  // [cream @ y=185, cyan300 @ y=271]
  diagram: buildDiagram(),        // your bespoke SVG string
});
```

`renderPortrait` owns fonts, the `topGlow`/`footRule` defs, the background,
constellation accent, eyebrow, two-line heading, footer rule, byline, and the
2x Playwright render. It escapes the eyebrow/heading for you; escape data inside
your diagram with `esc()`. `W` and `H` (1080×1350) are also exported if a
constant needs them. See `scripts/build-maturity-ladder-portrait.mjs` for a full
worked diagram.

---

## SVG authoring rules

- No em-dashes. Use colons, periods, or restructure.
- Escape `&` as `&amp;` in SVG text and attributes. Use the `esc()` helper for
  any data-driven strings.
- `font-weight` must be numeric (`600`, `700`) — not named (`semibold`).
- `letter-spacing` is in SVG user units (px): `"4"` for uppercase labels,
  `"-2"` for tight display headings.
- Prefer a flat `<g transform="translate(x,y)">` over a nested `<svg>` for
  reusable blocks like the constellation.
- `Math.round()` all computed float coordinates before writing to attributes.
- Draw walls and backgrounds **before** foreground elements. SVG paints in
  document order.

---

## Pitfalls table

| Symptom | Root cause | Fix |
|---|---|---|
| Ladder and wall look disconnected | `BOT_RX` doesn't land at `WALL_LEFT` | Set `BOT_RX = WALL_LEFT` |
| Rail ends at the outermost rung | No extension beyond rung span | Add `RAIL_TOP_Y` / `RAIL_BOT_Y`; draw rails between those |
| 2.5D slab depth goes left (wrong) | `SLAB_DX = -18` | Use `SLAB_DX = +18` (viewer is to the left of wall) |
| Wall reads as a floating box | `WALL_RIGHT` too narrow | Extend `WALL_RIGHT` to ~1062 to fill canvas right half |
| Diagram overlaps heading | `TOP_Y` too high | Shift `TOP_Y` down (e.g. 310→360); use `RAIL_TOP_Y = TOP_Y - 50` |
| Wall label unreadable | Used `dim` on `panel2` background | Use `muted` for any text on the wall face |
| "AI" buried in small eyebrow | Topic not in heading | Put the subject in heading line 1 (cream, 78px) |
| Open negative space feels wrong | Over-annotating the diagram | Leave it — emptiness signals "unsupported"; annotations kill it |

---

## Diagram patterns

For the **leaning ladder** pattern (the most complex type), read
`references/ladder-geometry.md` before writing any geometry code. It contains
the full constants, helper functions, wall slab SVG, badge coloring logic, and
label placement — copy from there rather than re-deriving.

For simpler diagrams (flow/pipeline, layered stack, quadrant matrix), the
pattern is straightforward: `<rect>` + `<line>` + `<text>` elements with the
brand palette. No reference file needed; use the pitfalls table and layout
zones above.

## After this run

If this run required more than two correction cycles, or the output missed the mark significantly, invoke the **skill-retrospective** skill. Pass it: which skill was used, what the expected output was, what actually came out, and which correction cycles were needed. It will diagnose the gap and propose specific edits to this SKILL.md.
