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
- **Slug**: lowercase kebab-case (`semantic-layer`, `ad-revenue-pipeline`, `bi-migration`, `voice-of-customer`).

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
  - label: "Governed DAX Measures"
    value: "100+"
  - label: "Report Build Time Reduction"
    value: "Hours to seconds"
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

Seven H2 sections in fixed order. Every case study uses this structure regardless of the `featured` flag. The flag controls home-page selection, not body shape. No lead paragraph above `## Challenge`; the header already sets context.

When phrasing or density is in question, mirror [crm-automation.md](../src/content/projects/crm-automation.md), [enterprise-data-model.md](../src/content/projects/enterprise-data-model.md), [semantic-layer.md](../src/content/projects/semantic-layer.md), or [voice-of-customer.md](../src/content/projects/voice-of-customer.md). These four are the anchor for the pattern.

````markdown
## Challenge

One required prelude sentence (16 to 25 words) naming the binding constraints:
data sources, SLAs, regulatory limits, no-disruption rules, scale requirements.
Then 3 to 5 bulleted problems.

- **Problem name**: explanation
- **Problem name**: explanation

## Key Decisions

Target 2 decisions. Each decision is an H3 followed by the four bold-label paragraphs:

### Decision 1: Title of the decision

**Problem:** What made this a decision worth thinking about.

**Options considered:**

- Option A (parenthetical on the tradeoff)
- Option B (parenthetical on the tradeoff)
- Option C (parenthetical on the tradeoff)

**Chosen:** What you picked, in one sentence.

**Why:** The rationale. One paragraph.

### Decision 2: ...

(same shape)

## Approach

Target 6 implementation bullets (4 to 6 acceptable). Past tense, system as the
subject. What was built, not narrative.

- Built X using Y...
- Implemented Z with...

## Architecture Overview

![Descriptive alt text covering the full flow shown in the diagram.](/assets/projects/<slug>.svg)

One paragraph explaining the flow in words for readers who skim the diagram.

## Results & Impact

Target 4 bullets. Each leads with a bold category label, then the outcome from
the user or business perspective. What changed, not what was built.

- **What changed in operations**: ...
- **What changed in decisions**: ...
- **Foundation for future work**: ...
- **<Category label>**: ...

## Reusable Pattern

One intro paragraph framing where this pattern applies, then 4
industry-anchored bullets showing how it transfers. Close with a **When this
pattern is NOT appropriate** paragraph so readers can self-disqualify.

- **E-commerce**: ...
- **Fintech**: ...
- **SaaS**: ...
- **Telecom**: ...

**When this pattern is NOT appropriate**: ...

## Tech Stack

- **Category**: Tool / system used
- **Category**: Tool / system used
````

### Section notes

- **Challenge prelude**: required. One sentence, 16 to 25 words. Lead with the binding constraints, not the goal. The prelude is what tells the reader "this is what made the problem hard"; the bullets enumerate the symptoms.
- **Key Decisions**: target 2 decisions. One is acceptable only when the project genuinely had a single architectural choice worth documenting; never invent a second to hit the count. Each decision is an H3 (`### Decision N: Title`) followed by the four bold-label paragraphs (`**Problem:**`, `**Options considered:**` as bullets, `**Chosen:**` as one sentence, `**Why:**` as one paragraph). Options bullets should carry a short parenthetical on the tradeoff so the reader sees the comparison without reading further.
- **Approach**: target 6 bullets, 4 to 6 acceptable. Implementation, not narrative. Past tense, system as the subject. Each bullet is a concrete thing built, not a process description.
- **Architecture Overview**: one image + one caption paragraph. The alt text is a single sentence (roughly 30 to 45 words) naming the major components and how they connect, so it stands alone for screen readers and search indexers. The caption paragraph names the same flow in words for readers who skim the diagram. See the four reference files for the alt-text shape: name the sources, the intermediate layers, and the consumers in order of flow.
- **Results & Impact**: target 4 bullets. Each leads with a bold category label, then the outcome from the user or business perspective. Canonical labels: **What changed in operations**, **What changed in decisions**, **What changed in governance**, **What changed in activation**, **What changed in planning**, **What changed in targeting**, **What changed in modeling**, **Maintenance overhead**, **Operational reliability**, **Cross-team escalation**, **Reporting-grade accuracy**, **Activation surface**, **Foundation for future work**, **Foundation for downstream work**. Pick from this set or coin a similar one. The bold label is required: it is what makes the section scannable.
- **Reusable Pattern**: this separates a case study from a war story. Show how to apply the pattern in a different context, then disqualify cases where it does not fit. The 4 industry bullets are drawn from a canonical set (E-commerce, Fintech, SaaS, Telecom, Logistics, Gaming, Advertising); pick the four that best fit the pattern. The "When this pattern is NOT appropriate" paragraph is what lets a reader recognize their own situation as outside scope, and it is required.
- **Tech Stack**: bulleted label-value list. Last section in the body. 4 to 6 bullets. Values are inventory shape (tool and product names, optional short parenthetical), not prose sentences. Pick labels from the canonical set where possible: **Platform**, **Storage**, **Processing**, **Modeling**, **Reporting**, **Orchestration**, **Sources**, **Delivery**, **Application**. Project-specific labels (**Alerting**, **Monitoring**, **Validation**, **Output**, **Agents**, **Model registry**, **Semantic layer**, **KPI definitions**, **Access management**) are welcome where the category is genuinely distinct. Use **Sources** (not "Source systems") and **Orchestration** (not "Automation") for the shared concepts.

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

Tone and word choice follow [BRAND.md section 5](BRAND.md#5-voice-and-tone-applies-to-every-surface). Three project-specific anchors:

- **Tense and subject**: past tense throughout. The system is the subject of the body ("the platform processed", "the pipeline ran", "the model produced"), not the company and not the author. Use "the platform", "the pipeline", "the system", "the model" as the referent.
- **Vendor abstraction**: vendor names appear only in Tech Stack and in frontmatter `tags`. Body prose, Architecture Overview captions, and diagram labels use category descriptors ("a video-analytics platform", "a customer-engagement platform", "a programmatic ad-serving platform"). This is the rule that keeps the body reading as the work rather than as a vendor briefing. The full reasoning lives in section 9.
- **Bullets and prose**: Challenge, Approach, Results & Impact, Reusable Pattern, and Tech Stack are bullet-led. Key Decisions and Architecture Overview are prose. Bullets are readable in ~2 seconds each. Quantification stays relative (percentages, throughput multipliers, "Hours to seconds", "Multi-week") rather than commercial. MENA / OTT vocabulary is on-brand because case studies are evidence, not pitch. CV verbs ("built", "designed", "delivered") are welcome inside the body but not on the listing card description.

---

## 8. Pre-publication checklist

Mechanical rules (no em-dashes, no emoji, `.md` not `.mdx`, no `import` lines, frontmatter schema, build pass) are covered by [BRAND.md](BRAND.md) and the build process. This checklist is structural judgment only.

- [ ] Confidentiality pass per section 9 complete: company is not the subject of any sentence in the body, no internal codenames in body or diagram, no uniquely identifying vendor combinations across `tags` and Tech Stack.
- [ ] Header `metrics` are relative or magnitude-based. No exact subscriber, profile, or revenue counts.
- [ ] No vendor-specific operational quantity paired with a named vendor in body, diagram, or Tech Stack.
- [ ] Architecture diagram labels strip internal codenames and the warehouse fingerprint (`dwh_*` prefixes etc.).
- [ ] Body has the seven sections in order; no lead paragraph above `## Challenge`.
- [ ] Challenge prelude leads with the binding constraints, not the goal, in one sentence (16 to 25 words). Then 3 to 5 bulleted problems with bold names.
- [ ] Key Decisions has 2 decisions, each with `**Problem:**`, `**Options considered:**` bullets, `**Chosen:**`, `**Why:**`.
- [ ] Approach has 4 to 6 implementation bullets, past tense, system as the subject.
- [ ] Architecture Overview references a real SVG at `/assets/projects/<slug>.svg` with self-explanatory alt text + one caption paragraph.
- [ ] Results & Impact has 4 bullets, each leading with a bold category label.
- [ ] Reusable Pattern has an intro paragraph + 4 industry bullets + a *When this pattern is NOT appropriate* paragraph.
- [ ] Tech Stack has 4 to 6 `**Label**: value` bullets, labels from the canonical set.
- [ ] Body prose and diagrams use category descriptors, not vendor names.
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
