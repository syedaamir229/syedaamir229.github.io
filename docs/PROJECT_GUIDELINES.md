# Project Authoring Guide

This guide describes how to add a new project to the portfolio. Project case studies are written in plain markdown with a small structured frontmatter block on top. No JSX, no components, no imports inside the body.

## TL;DR

1. Create `src/content/projects/<slug>.md`
2. Fill the frontmatter (~7 fields, all short)
3. Write seven markdown H2 sections in this order: Challenge, Key Decisions, Approach, Architecture Overview, Results & Impact, Reusable Pattern, Tech Stack
4. Drop the diagram SVG at `public/assets/projects/<slug>.svg` and reference it with `![alt](/assets/projects/<slug>.svg)` under Architecture Overview
5. Run `npm run dev` and check `/projects/<slug>/`

## File format

- Path: `src/content/projects/<slug>.md`
- Format: plain markdown. No `.mdx`, no imports, no JSX
- Slug: lowercase kebab-case (`semantic-layer`, `ad-pipeline`, `bi-migration`)

## Frontmatter

```yaml
---
title: "Enterprise Semantic Layer & KPI Framework"
description: "One governed definition of every KPI across three data sources and four business domains, ending metric disputes and shrinking report build time."
category: "BI & Analytics"          # Data Engineering | BI & Analytics | Data Science | AI & Automation
tags: ["SSAS", "DAX", "Power BI"]   # filter chips on the listing page
featured: true
order: 1                            # lower numbers appear first
metrics:                            # 3-4 quantitative outcomes shown as the colored row in the header
  - label: "Query Performance Improvement"
    value: "50%"
  - label: "Weekly Hours Saved"
    value: "15"
---
```

### Required

`title`, `description`, `category`, `metrics`.

### Optional

`tags`, `featured`, `order`, `draft`.

### Field guide

- **description**: One sentence shown on the listing card and at the top of the detail page. Lead with the change, not the technology.
- **metrics**: 3-4 entries. Keep `value` short (`"50%"`, `"15"`, `"100+"`, `"Hours to seconds"`). The header reads noisily past 4.

That's it for frontmatter. Anything else (decisions, tech stack, organization, timeline, etc.) lives in the markdown body or, in the case of org/timeline, doesn't appear at all. The header is intentionally light: kicker, title, description, four metric numbers.

## Body structure

Seven H2 sections in fixed order:

```markdown
## Challenge

A one-sentence prelude capturing the constraints (data sources, SLAs, regulatory
limits, no-disruption rules). Then 3-5 bulleted problems.

- **Problem name**: explanation
- **Problem name**: explanation

## Key Decisions

One block per decision, h3-titled:

### Decision 1: Title of the decision

**Problem:** (optional) What made this a decision worth thinking about.

**Options considered:**

- Option A
- Option B

**Chosen:** What you picked, in one sentence.

**Why:** The rationale. One paragraph.

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

3-5 bulleted outcomes from the user/business perspective. Lead each with a
category like **What changed in operations**, **What changed in decisions**,
**Maintenance overhead**, **Foundation for future work**.

## Reusable Pattern

One paragraph framing where this pattern applies, then 3-4 industry-anchored
bullets showing how it transfers. Close with a **When this pattern is NOT
appropriate** paragraph so readers can self-disqualify.

## Tech Stack

- **Category**: Tool / system used
- **Category**: Tool / system used
```

### Section notes

- **Challenge prelude**: Fold what used to be a separate "Constraints" field into the opening sentence of this section. Constraints and Challenge answer the same question (what made this hard), so they share one heading.
- **Key Decisions**: Each decision is an H3 (`### Decision N: Title`) followed by the four bold-label paragraphs (`**Problem**` optional, `**Options considered**`, `**Chosen**`, `**Why**`). The H3 spacing gives natural visual separation between decisions. Skip the whole section if there are no decisions worth documenting.
- **Approach**: 4-6 bullets of what was built. No decisions here — those live in Key Decisions above.
- **Architecture Overview**: One image + one caption paragraph. Use a self-explanatory alt that doesn't depend on outside context (avoid internal version numbers, code names, "the X model from the other project").
- **Results & Impact**: Outcomes from the user/business perspective. What changed, not what was built.
- **Reusable Pattern**: This separates a case study from a war story. Show the reader how to apply this pattern in their own context, then disqualify cases where it doesn't fit.
- **Tech Stack**: Bulleted label-value list. Last section in the body.

No lead paragraph above `## Challenge`. The header (title + description + metrics) already sets enough context. A lead paragraph that references other projects or external systems just confuses direct visitors.

## Architecture diagrams

Diagrams live in `public/assets/projects/<slug>.svg`. They are standalone SVG files with palette colors baked in.

### Adding a new diagram

1. Build the SVG in your tool of choice (Figma, Inkscape, Excalidraw, or hand-written)
2. Export as SVG, save to `public/assets/projects/<slug>.svg`
3. Use the project palette so the diagram matches the page:
   - Background: `#050B14` (carbon-950)
   - Card surfaces: `#0A1220` (carbon-900), `#122033` (carbon-800)
   - Borders/strokes: `#2A4561` (carbon-600), `#06B6D4` (copper-500 accent)
   - Text: `#E2E8F0` (cream-100), `#94A3B8` (muted-500)
   - Accent fill: `#06B6D4`; soft accent: `rgba(6,182,212,0.06)`
4. Reference it from the markdown body: `![alt text](/assets/projects/<slug>.svg)`

If you change the site palette later, regenerate or hand-edit the SVG files; the colors are now baked in, not theme-driven.

## What the layout renders automatically

You write only the body and frontmatter. The layout ([src/layouts/Project.astro](src/layouts/Project.astro)) adds:

- Header chrome: category kicker, title, description, metrics row
- Right-rail sticky TOC, auto-extracted from your body's H2s
- Breadcrumb "← All projects" link at the top

Do not duplicate any of these in the body.

## Voice

- No em-dashes. Use colons, periods, or restructure the sentence.
- Concise. Bullets should be readable in ~2 seconds each.
- Quantitative where possible. "Saved 15 hours per week" beats "saved significant time".
- MENA / OTT context is on-brand for examples (episodes, series, subscriptions, playback, dialectal Arabic).
- No AI attribution in commits or PRs.

## Checklist before publishing

- [ ] File is `.md`, not `.mdx`
- [ ] No `import` lines, no JSX tags anywhere in the body
- [ ] Frontmatter has all required fields filled
- [ ] `metrics` has 3-4 entries, short values
- [ ] Body has the seven sections in order (Challenge, Key Decisions, Approach, Architecture Overview, Results & Impact, Reusable Pattern, Tech Stack)
- [ ] No lead paragraph above `## Challenge`
- [ ] Architecture Overview references a real SVG at `/assets/projects/<slug>.svg`
- [ ] Caption text under the diagram is self-explanatory (no internal jargon or cross-project references)
- [ ] `npm run build` passes
- [ ] `/projects/<slug>/` looks right at desktop and mobile widths
