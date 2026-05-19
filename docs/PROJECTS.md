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
- **tags**: 3 to 4 filter chips. Use vendor or product names (`"Databricks"`, `"Power BI"`, `"LangGraph"`, `"Vector Search"`) rather than concept categories (`"NLP"`, `"RAG"`). The conceptual signal already lives in `category`; tags answer "what tools" while category answers "what kind of work". Pick tags shared with other projects where possible (high filter utility), with at most one project-unique tag for distinctiveness. No API suffixes (`"Google Ad Manager"`, not `"GAM API"`); no environment qualifiers (`"Databricks"`, not `"Databricks Workspace"`). Tags listed here can also appear in Tech Stack; the surface-by-surface vendor-name rule is in section 9.

That is it for frontmatter. Decisions, tech stack, and any narrative live in the markdown body. Org and timeline do not appear at all. The header is intentionally light: kicker, title, description, three to four metric numbers.

---

## 4. Body structure

Seven H2 sections in fixed order. No lead paragraph above `## Challenge`; the header already sets context.

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

A bulleted list of what was actually built. Implementation, not narrative. 4 to 6 bullets.

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

- **Key Decisions**: each decision is an H3 (`### Decision N: Title`) followed by the four bold-label paragraphs. Skip the whole section if there are no decisions worth documenting (see "Two variants" below).
- **Architecture Overview**: one image + one caption paragraph. Use self-explanatory alt text that does not depend on outside context.
- **Results & Impact**: outcomes from the user/business perspective. What changed, not what was built.
- **Reusable Pattern**: this separates a case study from a war story. Show how to apply the pattern in a different context, then disqualify cases where it does not fit.
- **Tech Stack**: bulleted label-value list. Last section in the body. 4 to 6 bullets. Values are inventory shape (tool and product names, optional short parenthetical), not prose sentences. Pick labels from the canonical set where possible: **Platform**, **Storage**, **Processing**, **Modeling**, **Reporting**, **Orchestration**, **Sources**, **Delivery**, **Application**. Project-specific labels (**Alerting**, **Monitoring**, **Validation**, **Output**, **Agents**, **Model registry**, **Semantic layer**, **KPI definitions**, **Access management**) are welcome where the category is genuinely distinct. Use **Sources** (not "Source systems") and **Orchestration** (not "Automation") for the shared concepts.

### Two variants by project type

| Variant | When to use | Differences from the full form |
|---|---|---|
| **Full** | Featured architectural or system-level projects with documented decisions. `featured: true` is the default trigger. | All seven sections present; Challenge has the one-sentence prelude; Key Decisions has at least one decision; Results & Impact bullets use bold-label prefixes. |
| **Lean** | Non-featured component projects that exist primarily as evidence of an applied capability, with no architectural decisions worth documenting. | Skip the Challenge prelude. Skip the Key Decisions section entirely. Results & Impact bullets are plain (no bold prefixes). Diagram captions tend to carry more narrative weight to compensate. |

Pick the lean variant only when forcing Key Decisions would invent a decision that was not actually made. Pick the full variant whenever there is at least one decision with options, a chosen path, and a rationale worth recording.

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

Tone and word choice follow [BRAND.md section 5](BRAND.md#5-voice-and-tone-applies-to-every-surface). Project-specific notes: bullets should be readable in ~2 seconds each, quantification should be relative (percentages, time savings, throughput multipliers) rather than commercial (revenue, ARPU, exact counts), MENA / OTT vocabulary is on-brand because case studies are evidence not pitch, and CV verbs ("built", "designed", "delivered") are welcome inside the body but not on the listing card description.

---

## 8. Pre-publication checklist

Mechanical rules (no em-dashes, no emoji, `.md` not `.mdx`, no `import` lines, frontmatter schema, build pass) are covered by [BRAND.md](BRAND.md) and the build process. This checklist is structural judgment only.

- [ ] Confidentiality pass per section 9 complete: company is not the subject of any sentence in the body, no internal codenames in body or diagram, no uniquely identifying vendor combinations across `tags` and Tech Stack.
- [ ] Header `metrics` are relative or magnitude-based. No exact subscriber, profile, or revenue counts.
- [ ] No vendor-specific operational quantity paired with a named vendor in body, diagram, or Tech Stack.
- [ ] Architecture diagram labels strip internal codenames and the warehouse fingerprint (`dwh_*` prefixes etc.).
- [ ] Body has the seven sections in order; no lead paragraph above `## Challenge`.
- [ ] Architecture Overview references a real SVG at `/assets/projects/<slug>.svg` with self-explanatory alt text.
- [ ] Reusable Pattern includes a *When this pattern is NOT appropriate* paragraph.
- [ ] `/projects/<slug>/` renders correctly at desktop and mobile widths.

---

## 9. Confidentiality

Project case studies are written while the author is employed. Same posture as blog posts: the company is on the CV and LinkedIn, not the subject of any sentence in the case study body. Case studies are *artifact-anchored* by default ("the platform", "the system", "the pipeline"), which already satisfies the rule structurally. Cross-reference: [BLOG.md section 9](BLOG.md#9-confidentiality).

Project-specific rules:

- **Frontmatter `metrics`**: prefer relative figures (`"50%"`, `"60-70% reduction"`, `"Hours to seconds"`) and order-of-magnitude descriptors (`"Millions"`, `"Daily"`, `"A dozen"`, `"4 sources"`). Avoid exact profile, subscriber, or revenue figures in the header row, since the metric row is the most-screenshot-ed surface on the page. When softening a count, prefer neutral magnitudes ("Millions", "The majority of the cohort") over words that read as belittling ("A handful", "Just a few"). The point is to remove the exact figure, not to make the work sound smaller than it was. If a softened version reads diminutively, drop the metric entirely instead.
- **Frontmatter `tags`**: vendor tags are fine individually. Listing the same vendors that appear in Tech Stack is fine (the fingerprint is already contained there, see "Vendor names: where they appear" below).
- **Vendor names: where they appear**. Project case studies have one bounded surface for explicit vendor names (the Tech Stack section) and abstraction everywhere else. The split:
  - **Tech Stack: explicit.** Actual vendor names (Youbora, Evergent, Google Ad Manager, CleverTap, Mediagenix, Funnel, Power BI, Databricks, etc.) belong here. This is the surface a hiring manager scans for "what tools has this person actually shipped against?" Generic referents drain that signal entirely. The combination of vendors in Tech Stack is the fingerprint; the rule contains the fingerprint to one place rather than draining the surface or distributing it across body, diagrams, and prose.
  - **Body prose: abstract.** Use category descriptors ("a video-analytics platform", "a subscription-management platform", "a programmatic ad-serving platform", "a customer-engagement platform", "a content-metadata system", "a marketing-data integration platform"). The body reads as the work, not as a vendor briefing. Body prose should not name the vendors that appear in Tech Stack.
  - **Architecture diagram (SVG): abstract.** Same as body. Diagrams are the most-screenshot-ed surface on the portfolio; keeping them abstract means screenshots travel without the vendor fingerprint. Strip internal codenames, internal column-name conventions (`dwh_*`), and vendor names from box labels and arrow captions. Use conventional equivalents (`subscriber_id`, `content_id`, `title_id`).
  - **Frontmatter `description`: abstract.** Listing-card surface, shows up everywhere on the site. Generic referents only.
  - **Frontmatter `metrics`: abstract.** Magnitude / relative descriptors only, no exact figures (see rule above).
  - **Frontmatter `tags`: explicit.** Vendor tags fine individually (they sit alongside Tech Stack as the same surface).
- **No vendor-specific operational quantity paired with a named vendor.** Even in Tech Stack. "GAM with a 14-day attribution window" pairs a vendor name with a vendor-specific cadence and uniquely fingerprints the deployment. Either name the vendor without the quantity, or describe the operational behavior ("late-arriving attribution requires a multi-week historical refresh") without naming the vendor.
- **No named seasonal cycle as the canonical operational example.** Naming Ramadan, Eid, World Cup, or a regional sports final as the headline use case for a generalizable system (especially in the Reusable Pattern section) ties the pattern to one industry. Abstract to "a predictable recurring window" or "a seasonal cycle the override system activates automatically by date". Cultural-anchor framing is different and still allowed (see [BLOG.md section 9](BLOG.md#9-confidentiality) for the test).
- **Internal column-name conventions**: column and table names with an in-house prefix that fingerprints the warehouse (e.g. `dwh_user_id`, `dwh_content_id`) get renamed to conventional equivalents in body and diagrams. Public API field names and Kimball star-schema patterns (`dim_*`, `fact_*`) stay. Cross-reference: [BLOG.md section 9](BLOG.md#9-confidentiality).
- **Body sections**: the system is the subject, not the company. Use "the platform", "the pipeline", "the model" as referents. Past employers can be named in passing only when load-bearing for a Reusable Pattern example.
- **`description`**: lead with the change, not the company. The description is the listing-card line and shows up everywhere on the site.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Category enum (source of truth)**: [src/data/categories.ts](../src/data/categories.ts).
- **Content schema**: [src/content.config.ts](../src/content.config.ts).
- **Layout that wraps the markdown body**: [src/layouts/Project.astro](../src/layouts/Project.astro).
