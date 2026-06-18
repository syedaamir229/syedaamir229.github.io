# Projects

Operational spec for adding a project case study. Project case studies are written in plain markdown with a small structured frontmatter block on top. No JSX, no components, no imports inside the body.

Tone and voice principles live in [BRAND.md](BRAND.md). This file owns *how to write the case study*: frontmatter, body structure, diagram conventions, checklist.

---

## 1. TL;DR

1. Create `src/content/projects/<slug>.md`.
2. Fill the frontmatter (4 required fields, 4 optional).
3. Write six markdown H2 sections in this order: Challenge, Approach, Results & Impact, Architecture, Tech Stack, My Role.
4. Drop the diagram SVG at `public/assets/projects/<slug>.svg` and reference it with `![alt](/assets/projects/<slug>.svg)` under Architecture.
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

Six H2 sections in fixed order. Every case study uses this structure regardless of the `featured` flag. The flag controls home-page selection, not body shape. No lead paragraph above `## Challenge`; the header already sets context.

The structure follows the data-freelancer portfolio framework: lead with the outcome, fold the technical decisions into a first-person narrative, and keep it concise enough to survive a skim. The rigid four-part "Key Decisions" grid and the four-industry "Reusable Pattern" block were dropped on 2026-06-18 because their uniform cadence read as machine-generated; decisions now live in the Approach narrative and transfer lives in one honest sentence in My Role. When phrasing or density is in question, mirror [semantic-layer.md](../src/content/projects/semantic-layer.md): it is the reference for the pattern.

````markdown
## Challenge

Open with the sharp version of the problem: a concrete scene, a question that
returned four different answers, the moment it started costing something. Then
one short paragraph of industry context and why it matters. Then 2 to 4 bullets
that each agitate a distinct facet of the pain. The bullets do not need to be
mechanically parallel; vary them so they read like a person wrote them.

## Approach

First person, past tense for the work. Lead with the one or two decisions that
carried the project, told as reasoning ("Two calls carried the rest of the
work. The first was..."), not as a Problem / Options / Chosen / Why grid. Name
the option you rejected and why in a sentence, inside the prose. A real anecdote
earns its place when it shows judgment. Then a short set of operational bullets
for what was actually built.

- Built X that did Y...
- Routed Z through...

## Results & Impact

Target 4 bullets. Lead each with the business outcome and a checkable number,
before/after where possible. A bold category label is optional, not required;
do not force the same label cadence onto every bullet.

- Report teams stopped rebuilding KPI logic per file, and build time dropped 60-70%.
- ...

## Architecture

![Descriptive alt text covering the full flow shown in the diagram.](/assets/projects/<slug>.svg)

One paragraph explaining the flow in words for readers who skim the diagram.

## Tech Stack

- **Category**: Tool / system used
- **Category**: Tool / system used

## My Role

First person. One short paragraph naming what you owned and did on this project
(your specific role, not the team's). Close with one or two sentences on where
the pattern transfers and when it does not, so a reader can place their own
situation. One honest sentence about transfer beats four templated industry
bullets.
````

### Section notes

- **Challenge**: open with the sharp, concrete version of the problem (a real scene or a one-line stake), not a generic prelude. Follow with one short paragraph of industry context and why it matters, then 2 to 4 bullets that agitate distinct facets. First person is allowed; vivid framing is the point. Do not rush to the solution here.
- **Approach**: first person, past tense for the work. Fold the key technical decisions into the narrative rather than a labeled grid: name the call, name the option you rejected, give the reason in a sentence. A real anecdote (the deploy that broke, the audit that found three formulas) earns its place when it shows judgment. Follow the narrative with a short set of operational bullets (3 to 6) for what was built. The system still does things; the judgment is yours.
- **Results & Impact**: target 4 bullets, each led by a business outcome and a checkable number. Before/after beats adjectives. A bold category label is optional; uniform label cadence across every bullet is the AI-tell to avoid, so vary the openings.
- **Architecture**: one image + one caption paragraph. The alt text is a single sentence (roughly 30 to 45 words) naming the major components and how they connect, so it stands alone for screen readers and search indexers. The caption paragraph names the same flow in words for readers who skim the diagram: name the sources, the intermediate layers, and the consumers in order of flow.
- **Tech Stack**: bulleted label-value list. 4 to 6 bullets. Values are inventory shape (tool and product names, optional short parenthetical), not prose sentences. Pick labels from the canonical set where possible: **Platform**, **Storage**, **Processing**, **Modeling**, **Reporting**, **Orchestration**, **Sources**, **Delivery**, **Application**. Project-specific labels (**Alerting**, **Monitoring**, **Validation**, **Output**, **Agents**, **Model registry**, **Semantic model**, **KPI definitions**, **Access management**) are welcome where the category is genuinely distinct. Use **Sources** (not "Source systems") and **Orchestration** (not "Automation") for the shared concepts.
- **My Role**: last section in the body. First person, one short paragraph on what you specifically owned and did (your role, not the team's), then one or two sentences on where the pattern transfers and when it does not. This is where the data-freelancer framework's "your specific role" and the old Reusable Pattern collapse into one honest, non-templated close. One real sentence about transfer beats a four-industry list.

---

## 5. Architecture diagrams

Every case study has exactly one Architecture diagram in the H2 slot of the same name. No exceptions: a case study without a diagram is incomplete.

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

- **Tense and subject**: first person for judgment, past tense for the work. You are the subject when describing decisions and ownership ("I migrated", "I chose", "I owned"); the system is the subject when describing what it does ("the pipeline ran", "the model produced"). The company is never the subject. First person is what makes the case study read like the author rather than a template, and it matches the voice of the blog.
- **Vendor abstraction**: vendor names appear only in Tech Stack and in frontmatter `tags`. Body prose, Architecture captions, and diagram labels use category descriptors ("a video-analytics platform", "a customer-engagement platform", "a programmatic ad-serving platform"). This is the rule that keeps the body reading as the work rather than as a vendor briefing. The full reasoning lives in section 9.
- **Bullets and prose**: Approach opens in prose then closes with bullets; Challenge, Results & Impact, and Tech Stack are bullet-led with prose framing; Architecture and My Role are prose. Bullets are readable in ~2 seconds each. Quantification stays relative (percentages, throughput multipliers, "Hours to seconds", "Multi-week") rather than commercial. CV verbs ("built", "designed", "delivered") are welcome inside the body but not on the listing card description.

> **Discretion:** case-study bodies and diagrams are scrubbed to a generic vertical, with OTT/streaming vocabulary removed and MBC never inferable. Full rules in section 9 and the `case-study-copywriter` skill.

---

## 8. Pre-publication checklist

Mechanical rules (no em-dashes, no emoji, `.md` not `.mdx`, no `import` lines, frontmatter schema, build pass) are covered by [BRAND.md](BRAND.md) and the build process. This checklist is structural judgment only.

- [ ] Confidentiality pass per section 9 complete: company is not the subject of any sentence in the body (first person about your own role is fine; the employer is never named), no internal codenames in body or diagram, no uniquely identifying vendor combinations across `tags` and Tech Stack.
- [ ] Header `metrics` are relative or magnitude-based. No exact subscriber, profile, or revenue counts.
- [ ] No vendor-specific operational quantity paired with a named vendor in body, diagram, or Tech Stack.
- [ ] Architecture diagram labels strip internal codenames and the warehouse fingerprint (`dwh_*` prefixes etc.).
- [ ] Body has the six sections in order (Challenge, Approach, Results & Impact, Architecture, Tech Stack, My Role); no lead paragraph above `## Challenge`.
- [ ] Challenge opens with the sharp, concrete version of the problem, then context and why it matters, then 2 to 4 bullets that agitate distinct facets.
- [ ] Approach is first person, leads with the decisions as narrative (not a Problem/Options/Chosen/Why grid, names the rejected option in a sentence), and closes with 3 to 6 operational bullets.
- [ ] Architecture references a real SVG at `/assets/projects/<slug>.svg` with self-explanatory alt text + one caption paragraph.
- [ ] Results & Impact has ~4 bullets, each led by a business outcome and a checkable number; openings are varied, not a uniform bold-label cadence.
- [ ] My Role is first person: what you owned, then one or two sentences on transfer and limits.
- [ ] Tech Stack has 4 to 6 `**Label**: value` bullets, labels from the canonical set.
- [ ] Body prose and diagrams use category descriptors, not vendor names.
- [ ] `/projects/<slug>/` renders correctly at desktop and mobile widths.

---

## 9. Confidentiality

> **Freelance-portfolio override (2026-06-12):** This section was written for a "written while employed" posture, where MBC is on the CV and the vendor fingerprint is merely *contained* to Tech Stack. The freelance portfolio is stricter: it is shown to prospects, not hiring managers, so MBC must never be inferable. Two changes apply over everything below:
> 1. **Identifying vendor names are dropped from every surface, including Tech Stack and `tags`** (not just abstracted in the body). The OTT-specific cluster Youbora + Evergent + Mediagenix is the fingerprint; remove it entirely. Keep only generic, cross-industry tooling (Databricks, Power BI, Delta Lake, SSAS, etc.).
> 2. **No MENA / OTT / streaming framing anywhere.** Reframe to a generic vertical ("a large subscription-based consumer business"). Scrub viewing/watch/episode/household/AVOD/VAST/Arabic-residency vocabulary.
>
> Authoritative rules: `~/.claude/skills/case-study-copywriter/SKILL.md` and the freelancer hub's CLAUDE.md Hard rules.

Project case studies are written while the author is employed. Same posture as blog posts: the company is on the CV and LinkedIn, not the subject of any sentence in the case study body. Case studies are *artifact-anchored* by default ("the platform", "the system", "the pipeline"), which already satisfies the rule structurally. Cross-reference: [BLOG.md section 10](BLOG.md#10-confidentiality).

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
- **No named seasonal cycle as the canonical operational example.** Naming Ramadan, Eid, World Cup, or a regional sports final as the headline use case for a generalizable system (especially in the My Role transfer note) ties the pattern to one industry. Abstract to "a predictable recurring window" or "a seasonal cycle the override system activates automatically by date". Cultural-anchor framing is different and still allowed (see [BLOG.md section 10](BLOG.md#10-confidentiality) for the test).
- **Internal column-name conventions**: column and table names with an in-house prefix that fingerprints the warehouse (e.g. `dwh_user_id`, `dwh_content_id`) get renamed to conventional equivalents in body and diagrams. Public API field names and Kimball star-schema patterns (`dim_*`, `fact_*`) stay. Cross-reference: [BLOG.md section 10](BLOG.md#10-confidentiality).
- **Body sections**: first person for your own judgment and role ("I migrated", "I owned"); the system is the subject for what it does ("the pipeline ran"). The company is never the subject and is never named. Past employers can be named in passing only when load-bearing for a My Role transfer example.
- **`description`**: lead with the change, not the company. The description is the listing-card line and shows up everywhere on the site.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Category enum (source of truth)**: [src/data/categories.ts](../src/data/categories.ts).
- **Content schema**: [src/content.config.ts](../src/content.config.ts).
- **Layout that wraps the markdown body**: [src/layouts/Project.astro](../src/layouts/Project.astro).
