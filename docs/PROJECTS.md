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
- **metrics**: 3 to 4 entries. Keep `value` short (`"50%"`, `"15"`, `"100+"`, `"Hours to seconds"`). The header reads noisily past 4. Prefer relative deltas, order-of-magnitude descriptors, and qualitative pivots ("Hours to seconds", "Millions"). Avoid exact subscriber, profile, or revenue figures, even where they exist. If an exact count is the headline of the project, present it as a magnitude (`"Millions"`) and reserve the precise count for verbal conversations.

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

- **Key Decisions**: each decision is an H3 (`### Decision N: Title`) followed by the four bold-label paragraphs (`**Problem**` optional, `**Options considered**`, `**Chosen**`, `**Why**`). Skip the whole section if there are no decisions worth documenting.
- **Approach**: 4 to 6 bullets of what was built. No decisions here; those live in Key Decisions above.
- **Architecture Overview**: one image + one caption paragraph. Use a self-explanatory alt text that does not depend on outside context.
- **Results & Impact**: outcomes from the user/business perspective. What changed, not what was built.
- **Reusable Pattern**: this separates a case study from a war story. Show the reader how to apply the pattern in their own context, then disqualify cases where it does not fit.
- **Tech Stack**: bulleted label-value list. Last section in the body.

**No lead paragraph above `## Challenge`.** The header (title + description + metrics) sets enough context. A lead paragraph that references other projects or external systems just confuses direct visitors.

---

## 5. Architecture diagrams

Every case study has exactly one Architecture Overview diagram in the H2 slot of the same name. No exceptions: a case study without a diagram is incomplete.

- **File path**: `public/assets/projects/<slug>.svg`.
- **Markdown reference**: `![Alt text covering the flow shown in the diagram.](/assets/projects/<slug>.svg)`.
- **Caption**: one prose paragraph directly below the image, explaining the flow in words for readers who skim the diagram.

For how to build the SVG and verify the rendered output, see [BRAND.md section 7](BRAND.md#7-diagrams). Same workflow as blog diagrams: hand-coded SVG XML, brand palette baked in, verified via `npm run verify:diagram <path>` and reading the resulting PNG.

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
- **Quantitative where possible.** "Saved 15 hours per week" beats "saved significant time". Quantitative where the quantification is *relative* (percentages, time savings, throughput multipliers). Quantification turns into a confidentiality issue when it becomes commercial or operational (absolute revenue, ARPU, profile or subscriber counts, model accuracy with exact AUC). The case study should let a hiring manager evaluate craft without letting a competitor reconstruct an internal benchmark.
- **MENA / OTT context is on-brand.** Use vertical-specific vocabulary (episodes, series, subscriptions, playback, dialectal Arabic). Project case studies are evidence, not pitch, so they stay vertical-specific. Contrast with landing copy (see [SITE.md](SITE.md)) which is vertical-agnostic.
- **CV verbs are welcome here.** "Built", "designed", "stood up", "delivered" all work inside the case-study body. They do not work on the listing card description (where the change-for-the-business framing wins).

---

## 8. Pre-publication checklist

- [ ] Confidentiality pass (section 9) complete: company is not the subject of any sentence in the body; no internal codenames in body or diagram; no uniquely identifying vendor combinations across `tags` and Tech Stack.
- [ ] Header `metrics` are relative or magnitude-based. No exact subscriber, profile, or revenue counts.
- [ ] No vendor-specific operational quantity paired with a named vendor in body or Tech Stack.
- [ ] No named seasonal cycle as the canonical example for a generalizable system. Generic seasonal framing used instead.
- [ ] Architecture diagram has no internal codenames in labels (re-export the SVG if so).
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

## 9. Confidentiality

Project case studies are written while the author is employed. Same posture as blog posts: the company is on the CV and LinkedIn, not the subject of any sentence in the case study body. Case studies are *artifact-anchored* by default ("the platform", "the system", "the pipeline"), which already satisfies the rule structurally. Cross-reference: [BLOG.md section 10](BLOG.md#10-confidentiality).

Project-specific rules:

- **Frontmatter `metrics`**: prefer relative figures (`"50%"`, `"60-70% reduction"`, `"Hours to seconds"`) and order-of-magnitude descriptors (`"Millions"`, `"Daily"`, `"A dozen"`, `"4 sources"`). Avoid exact profile, subscriber, or revenue figures in the header row, since the metric row is the most-screenshot-ed surface on the page.
- **Frontmatter `tags`**: vendor tags are fine individually. If three or more vendors that, combined, uniquely identify the employer would appear across `tags` and Tech Stack, drop one or pair with a peer.
- **No vendor-specific operational quantity paired with a named vendor.** "GAM with a 14-day attribution window" pairs a vendor name with a vendor-specific cadence and uniquely fingerprints the deployment. Either name the vendor without the quantity, or describe the operational behavior ("late-arriving attribution requires a multi-week historical refresh") without naming the vendor.
- **No named seasonal cycle as the canonical operational example.** Naming Ramadan, Eid, World Cup, or a regional sports final as the headline use case for a generalizable system (especially in the Reusable Pattern section) ties the pattern to one industry. Abstract to "a predictable recurring window" or "a seasonal cycle the override system activates automatically by date". Cultural-anchor framing is different and still allowed (see [BLOG.md section 10](BLOG.md#10-confidentiality) for the test).
- **Architecture diagram**: same rule. The diagram shows the pattern. Strip internal codenames and internal column-name conventions (e.g. a `dwh_` prefix) from box labels and arrow captions. Use conventional equivalents (`subscriber_id`, `content_id`, `title_id`) instead. Re-export the SVG if any codename or in-house naming convention slipped in.
- **Internal column-name conventions**: column and table names with an in-house prefix that fingerprints the warehouse (e.g. `dwh_user_id`, `dwh_content_id`) get renamed to conventional equivalents in body and diagrams. Public API field names and Kimball star-schema patterns (`dim_*`, `fact_*`) stay. Cross-reference: [BLOG.md section 10](BLOG.md#10-confidentiality).
- **Body sections**: the system is the subject, not the company. Use "the platform", "the pipeline", "the model" as referents. Past employers can be named in passing only when load-bearing for a Reusable Pattern example.
- **`description`**: lead with the change, not the company. The description is the listing-card line and shows up everywhere on the site.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Category enum (source of truth)**: [src/data/categories.ts](../src/data/categories.ts).
- **Content schema**: [src/content.config.ts](../src/content.config.ts).
- **Layout that wraps the markdown body**: [src/layouts/Project.astro](../src/layouts/Project.astro).
