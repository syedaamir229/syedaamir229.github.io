# Projects

Operational spec for adding a project case study. Project case studies are written in plain markdown with a small structured frontmatter block on top. No JSX, no components, no imports inside the body.

Tone and voice principles live in [BRAND.md](BRAND.md). This file owns *how to write the case study*: frontmatter, body structure, diagram conventions, checklist.

---

## 1. TL;DR

1. Create `src/content/projects/<slug>.md`.
2. Fill the frontmatter (4 required fields, 4 optional).
3. Write seven markdown H2 sections in this order: Challenge, Key Decisions, Approach, Architecture Overview, Results & Impact, Reusable Pattern, Tech Stack.
4. Drop the diagram SVG at `public/assets/projects/<slug>.svg` and reference it with `![alt](/assets/projects/<slug>.svg)` under Architecture Overview.
5. Run `npm run dev` and check `/projects/<slug>/`.

---

## 2. File format

- **Path**: `src/content/projects/<slug>.md`
- **Format**: plain markdown. No `.mdx`, no imports, no JSX.
- **Slug**: lowercase kebab-case (`semantic-layer`, `ad-pipeline`, `bi-migration`, `voice-of-customer`).

---

## 3. Frontmatter

```yaml
---
title: "Enterprise Semantic Layer & KPI Framework"
description: "One governed definition of every KPI across three data sources and four business domains, ending metric disputes and shrinking report build time."
category: "BI & Analytics"          # one of the four PRACTICE_AREAS
tags: ["SSAS", "DAX", "Power BI"]   # filter chips on the listing page
featured: true
order: 1                            # lower numbers appear first
metrics:                            # 3-4 quantitative outcomes; rendered as the colored row in the header
  - label: "Query Performance Improvement"
    value: "50%"
  - label: "Weekly Hours Saved"
    value: "15"
---
```

### Required fields

`title`, `description`, `category`, `metrics`.

### Optional fields

`tags`, `featured`, `order`, `draft`.

### Field guide

- **description**: one sentence shown on the listing card and at the top of the detail page. Lead with the change, not the technology.
- **category**: enforced at build time via `z.enum(PRACTICE_AREA_NAMES)` in [src/content.config.ts](../src/content.config.ts). Allowed values: Data Engineering, BI & Analytics, Data Science, AI & Automation. Typos fail the build.
- **metrics**: 3 to 4 entries. Keep `value` short (`"50%"`, `"15"`, `"100+"`, `"Hours to seconds"`). The header reads noisily past 4.

That is it for frontmatter. Anything else (decisions, tech stack, organization, timeline) lives in the markdown body or, in the case of org/timeline, does not appear at all. The header is intentionally light: kicker, title, description, three to four metric numbers.

---

## 4. Body structure

Seven H2 sections in fixed order:

````markdown
## Challenge

A one-sentence prelude capturing the constraints (data sources, SLAs, regulatory
limits, no-disruption rules). Then 3 to 5 bulleted problems.

- **Problem name**: explanation
- **Problem name**: explanation

## Key Decisions

One block per decision, h3-titled:

### Decision 1: Title of the decision

**Problem:** (optional) what made this a decision worth thinking about.

**Options considered:**

- Option A
- Option B

**Chosen:** what you picked, in one sentence.

**Why:** the rationale. One paragraph.

### Decision 2: ...

(more decisions follow the same shape)

## Approach

A bulleted list of what you actually built. Implementation, not narrative.

- Built X using Y...
- Implemented Z with...

## Architecture Overview

![Descriptive alt text covering the flow shown in the diagram.](/assets/projects/<slug>.svg)

One paragraph explaining the flow in words for readers who skim the diagram.

## Results & Impact

3 to 5 bulleted outcomes from the user/business perspective. Lead each with a
category like **What changed in operations**, **What changed in decisions**,
**Maintenance overhead**, **Foundation for future work**.

## Reusable Pattern

One paragraph framing where this pattern applies, then 3 to 4 industry-anchored
bullets showing how it transfers. Close with a **When this pattern is NOT
appropriate** paragraph so readers can self-disqualify.

## Tech Stack

- **Category**: Tool / system used
- **Category**: Tool / system used
````

### Section notes

- **Challenge prelude**: fold what used to be a separate "Constraints" field into the opening sentence. Constraints and Challenge answer the same question; they share one heading.
- **Key Decisions**: each decision is an H3 (`### Decision N: Title`) followed by the four bold-label paragraphs (`**Problem**` optional, `**Options considered**`, `**Chosen**`, `**Why**`). Skip the whole section if there are no decisions worth documenting.
- **Approach**: 4 to 6 bullets of what was built. No decisions here — those live in Key Decisions above.
- **Architecture Overview**: one image + one caption paragraph. Use a self-explanatory alt text that does not depend on outside context.
- **Results & Impact**: outcomes from the user/business perspective. What changed, not what was built.
- **Reusable Pattern**: this separates a case study from a war story. Show the reader how to apply the pattern in their own context, then disqualify cases where it does not fit.
- **Tech Stack**: bulleted label-value list. Last section in the body.

**No lead paragraph above `## Challenge`.** The header (title + description + metrics) sets enough context. A lead paragraph that references other projects or external systems just confuses direct visitors.

---

## 5. Architecture diagrams

Diagrams live at `public/assets/projects/<slug>.svg`. They are standalone SVG files with palette colors baked in (not theme-driven).

### Adding a new diagram

1. Build the SVG in your tool of choice (Figma, Inkscape, Excalidraw, hand-written).
2. Export as SVG, save to `public/assets/projects/<slug>.svg`.
3. Use the brand palette so the diagram matches the page. Full palette in [BRAND.md section 2](BRAND.md#2-color-system). The colors most diagrams need:

   | Use | Hex | Token |
   |---|---|---|
   | Background | `#050B14` | `--color-navy-950` |
   | Card surfaces | `#0A1220`, `#122033` | `--color-navy-900`, `--color-navy-800` |
   | Borders / strokes | `#2A4561` | `--color-navy-600` |
   | Accent stroke / fill | `#06B6D4` | `--color-cyan-500` |
   | Soft accent fill | `rgba(6,182,212,0.06)` | cyan-500 at 6% |
   | Primary text | `#E2E8F0` | `--color-cream-100` |
   | Secondary text | `#94A3B8` | `--color-muted-500` |

4. Reference it from the markdown body: `![alt text](/assets/projects/<slug>.svg)`

If you change the site palette later, regenerate or hand-edit the SVG files. Colors are baked in, not theme-driven.

### Verify the diagram visually

After saving or modifying any project SVG:

1. Keep `npm run dev` running across iterations.
2. Take a **focused screenshot of the SVG region**, not a full-page thumbnail. Compressed thumbnails hide label overflow, broken alignment, and palette drift.
3. Confirm visually: no label overflow, palette matches brand tokens above, every label legible at the rendered size.
4. Only move on once the focused screenshot looks right.

This step is mandatory because broken diagrams have shipped in the past when only the full-page thumbnail was checked.

---

## 6. What the layout renders automatically

You write only the body and frontmatter. The layout at [src/layouts/Project.astro](../src/layouts/Project.astro) adds:

- **Header chrome**: category kicker (Eyebrow), title, description, metrics row.
- **Right-rail sticky TOC**, auto-extracted from your body's H2s.
- **Breadcrumb** "← All projects" link at the top.

Do not duplicate any of these in the body.

---

## 7. Voice

Tone and word choice follow [BRAND.md section 5](BRAND.md#5-voice-and-tone-applies-to-every-surface) exactly. Project-specific notes:

- **Concise.** Bullets should be readable in ~2 seconds each.
- **Quantitative where possible.** "Saved 15 hours per week" beats "saved significant time".
- **MENA / OTT context is on-brand.** Use vertical-specific vocabulary (episodes, series, subscriptions, playback, dialectal Arabic) — project case studies are evidence, not pitch, so they stay vertical-specific. Contrast with landing copy (see [SITE.md](SITE.md)) which is vertical-agnostic.
- **CV verbs are welcome here.** "Built", "designed", "stood up", "delivered" all work inside the case-study body. They do not work on the listing card description (where the change-for-the-business framing wins).

---

## 8. Pre-publication checklist

- [ ] File is `.md`, not `.mdx`.
- [ ] No `import` lines, no JSX tags anywhere in the body.
- [ ] Frontmatter has all required fields filled.
- [ ] `category` is one of the four PRACTICE_AREAS (build will fail otherwise).
- [ ] `metrics` has 3 to 4 entries with short values.
- [ ] Body has the seven sections in order (Challenge, Key Decisions, Approach, Architecture Overview, Results & Impact, Reusable Pattern, Tech Stack).
- [ ] No lead paragraph above `## Challenge`.
- [ ] Architecture Overview references a real SVG at `/assets/projects/<slug>.svg`.
- [ ] Caption text under the diagram is self-explanatory (no internal jargon or cross-project references).
- [ ] No em-dashes in body or frontmatter.
- [ ] `npm run build` passes.
- [ ] `/projects/<slug>/` looks right at desktop and mobile widths.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Category enum (source of truth)**: [src/data/categories.ts](../src/data/categories.ts).
- **Content schema**: [src/content.config.ts](../src/content.config.ts).
- **Layout that wraps the markdown body**: [src/layouts/Project.astro](../src/layouts/Project.astro).
