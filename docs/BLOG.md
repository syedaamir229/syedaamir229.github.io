# Blog

Operational spec for adding a blog post. Posts are written in plain markdown with a small structured frontmatter block on top. No JSX, no components, no imports inside the body.

Tone and voice principles live in [BRAND.md](BRAND.md). This file owns *how to write the post*: frontmatter, body structure, framework H3 micro-format, diagram conventions, checklist.

---

## 1. TL;DR

1. Create `src/content/blog/<slug>.md`.
2. Fill the frontmatter (4 required fields, 3 optional).
3. Write the ten-beat framework-led body in this order: opening anecdote, scene framing, bolded either-or thesis, "Why this matters now", diagram + caption, named framework H2 with three-beat H3 components, optional auxiliary H2, "Where I would start", "One MENA-flavored note", "Closing".
4. Drop the diagram SVG at `public/assets/blog/<slug>-<name>.svg` and reference it under the "Why this matters now" section.
5. Run `npm run dev` and check `/blog/<slug>/`.

---

## 2. File format

- **Path**: `src/content/blog/<slug>.md`
- **Format**: plain markdown. No `.mdx`, no imports, no JSX.
- **Slug**: lowercase kebab-case (`voice-of-customer-intelligence`, `bi-to-ai-journey`, `semantic-layer-01-why-governed-metrics`).

---

## 3. Frontmatter

```yaml
---
title: "Voice-of-Customer for Multilingual Streaming: The Five-Layer Stack"
date: 2026-04-13
description: "How a five-layer Voice-of-Customer Stack turned scattered, Arabic-language audience feedback into a system that answers content-team questions in seconds, with the one architectural decision that decides whether the rest of the system works."
categories: ["AI & Automation", "Data Science"]
draft: false

# Optional, only for posts in a series:
series: semantic-layer
series_part: 1
---
```

### Required fields

`title`, `date`, `description`, `categories`.

### Optional fields

`draft`, `series`, `series_part`.

### Field guide

- **title**: name the framework in the title where possible. "Voice-of-Customer for Multilingual Streaming: The Five-Layer Stack" works because it names both the topic and the framework. "Thoughts on Voice of Customer" does not. Opinionated, specific, framework-shaped.
- **date**: publication date in `YYYY-MM-DD` format. Coerced to a `Date` via `z.coerce.date()` in [src/content.config.ts](../src/content.config.ts).
- **description**: one sentence shown on the listing card and at the top of the detail page. Works as the LinkedIn preview. Lead with the change, not the technology.
- **categories**: enforced at build time via `z.enum(BLOG_CATEGORIES)`. Allowed values defined in [src/data/categories.ts](../src/data/categories.ts) and currently: Data Engineering, BI & Analytics, Data Science, AI & Automation, Data Governance, Data Modeling, Career. Most posts have one or two. Typos fail the build.
- **draft**: default false. Drafts are excluded from listings and RSS in production builds.
- **series**: kebab-case slug for posts that are part of a multi-part exploration. The slug must be registered in [src/data/series.ts](../src/data/series.ts).
- **series_part**: ordinal position in the series (1, 2, 3, ...). Required when `series` is set.

Decisions, tech, and any narrative live in the markdown body. Org and timeline do not appear at all. The header is intentionally light: category kicker, title, date, description, reading time.

---

## 4. Body structure

Ten beats, in fixed order. Every framework-led post uses this structure. The labels below are scaffolding for the writer, not section headings the reader sees (only beats 4 onward have H2 headings).

When phrasing or density is in question, mirror [voice-of-customer-intelligence.md](../src/content/blog/voice-of-customer-intelligence.md). It is the canonical anchor for the pattern.

````markdown
[1. Opening anecdote. 1 to 2 paragraphs, past tense, one concrete scene
that names the failure mode. No section heading.]

[2. Scene framing paragraph. Abstracts the anecdote to the pattern it
represents. Usually opens with "That kind of X is the shape of..." or
"That kind of X is the scene that...". No section heading.]

[3. Bolded either-or thesis. Standalone bolded paragraph. Pattern:
**A [X] team is either [right thing] or [wrong thing]. Once it starts
[wrong]...; once it starts [right]...** The way you get there is not
[naive fix]. It is [the named framework].]

## Why this matters now

[4. Industry context, optional external citation, MENA sharpening.
1 to 3 paragraphs. End with a single transitional sentence that hands
off to the framework.]

![Alt text describing the framework concretely.](/assets/blog/<slug>-<name>.svg)

*[5. Italic caption: one sentence tying the diagram to the framework's
main claim.]*

## The Named Framework

[6. Framework H2 with 3 to 6 H3 components. Each H3 uses the three
bold-inline beats locked in section 5: **What it is.**, **Why it
matters.**, **What goes wrong without it.**]

### Component 1: Title

**What it is.** ...

**Why it matters.** ...

**What goes wrong without it.** ...

### Component 2: Title
...

## [Optional auxiliary H2]

[7. A single design discipline or extension surface that holds the
framework together ("Parameter design: every recurring ask is a knob";
"What you cannot retrofit"; "The workspace UI: three modes, one
supervisor"). Allowed between the framework and "Where I would start".
Omit when not load-bearing.]

## Where I would start

[8. Sequenced prioritization. 3 to 4 paragraphs. The one section where
first-person ("I would") is welcome. Format: "If you can only do one
of N, do X" or "First deliverable... Second deliverable...".]

## One MENA-flavored note

[9. A single tight paragraph anchoring the framework to MENA / Arabic-OTT
structural context. Pass the structural-vs-decorative test in section 8.]

## Closing

[10. Leading rhetorical question, then a one or two paragraph answer
contrasting the two outcomes from the bolded thesis. Often the binary
from the thesis ("Is your X this, or that?").]
````

### Beat notes

- **Opening anecdote (beat 1)**: 1 to 2 paragraphs, past tense, third-person about teams or systems. Specific scene with people, numbers, or a moment. Not an abstract problem statement. "Many implementations fail because..." is not an anecdote.
- **Scene framing (beat 2)**: one paragraph. Names the failure pattern. Distinct from the anecdote: the anecdote is the moment, the framing is the pattern the moment represents.
- **Bolded thesis (beat 3)**: one bolded paragraph followed by one un-bolded sentence. Someone could disagree. "A semantic layer can still fail after launch if governance is weak" is too weak: who would disagree? The either-or framing forces the disagreement to exist.
- **Why this matters now (beat 4)**: industry context. External citations are optional, not required. When citing, every citation should be load-bearing; do not bulk-cite. End the section with one sentence that bridges into the framework so the diagram does not arrive cold.
- **Diagram + caption (beat 5)**: required for every framework-led post. See section 5 for the H3 micro-format and section 6 for diagram conventions.
- **Named framework (beat 6)**: H2 with a name that has weight. "The Four-Signal Operating Loop", "The Six-Layer System", "The Voice-of-Customer Stack", "The Three-Phase Migration Sequence". Not "Approach" or "Methodology". 3 to 6 H3 components; the framework can be whatever size it actually has. Each H3 follows the locked micro-format in section 5.
- **Auxiliary H2 (beat 7)**: optional. Use when one design discipline or extension surface holds the framework together and does not naturally fit inside any single H3. The auxiliary H2 sits between the framework and "Where I would start".
- **Where I would start (beat 8)**: incremental ordering of how to ship the framework. Dictated by trust, not roadmap. First-person allowed.
- **MENA-flavored note (beat 9)**: one paragraph, not a section with sub-headings. Pass the structural-vs-decorative test in section 8.
- **Closing (beat 10)**: rhetorical question that challenges the reader's current approach, then one or two paragraphs answering it. The answer contrasts the two outcomes from the bolded thesis; collapsing the contrast into one tight paragraph is fine when the rhythm calls for it.

### Closing questions to aim for

- "Is your data model a project that ended, or infrastructure that compounds?"
- "Is your Ad Operations team acting on signals, or chasing make-goods?"
- "Are your model numbers explainable from your dashboard, or are they a parallel reality?"
- "Is your stack compounding, or restarting every two years?"
- "When the next finale airs tonight, will your product manager have an answer by morning, or by the end of next week?"

### Post length

Standalone posts: 1,200 to 1,800 words. Series companion posts: 1,000 to 1,500 words per part. Length is a target, not a hard rule. A topic that routinely runs past 2,500 words probably wanted to be a series.

---

## 5. The framework H3 micro-format

Locked. Three bold-inline beats per H3 under the named framework. Two variants, depending on whether the framework names solution components or failure modes. A post uses one variant throughout; mixing variants inside the same post is out.

### Solution-component variant (default)

Use when the H3s name parts of the system that work together: layers, signals, rules, patterns, guardrails. The three beats describe what the component is, why it matters, and the failure mode it prevents.

````markdown
### Component N: Title

**What it is.** One short paragraph describing the component. Include
load-bearing technical detail (cadence, idempotency keys, partition
strategy) here when it explains *what* the component does. No code
blocks unless the code is the component (a DAX measure on a DAX-stack
post, a SQL snippet on a query-engine post).

**Why it matters.** One paragraph on what the component does for the
system as a whole. The rhetorical center of the H3. This is where the
reader learns why this layer earns its place.

**What goes wrong without it.** One paragraph on the failure mode the
component prevents. The closing beat of every H3. Concrete: name the
symptom the team would notice if the layer were missing.
````

### Failure-mode variant

Use when the H3s name failure modes the framework prevents (for example, "The Four Traps of Semantic Layer Programs"). The "What goes wrong without it" beat does not work here, because the trap *is* the failure mode. The three beats describe the trap, why it is fatal, and the corrective discipline that breaks it.

````markdown
### Trap N: Title

**What it looks like.** One short paragraph describing the trap.
Concrete symptoms a reader can recognise in their own program.

**Why it kills the program.** One paragraph on why this trap is fatal,
not just annoying. The rhetorical center of the H3.

**What to do instead.** One paragraph naming the corrective discipline
that breaks the trap. Short enough that the full corrective architecture
lives in "Where I would start", not duplicated inside every H3.
````

### Shared rules

- **Bold-inline format required.** `**Label.**` followed by inline prose. Plain prose labels (`What it tracks: ...`) are out. The bold-inline format is what makes the framework H3s scannable across 4 to 6 components.
- **No fourth beat.** No `**Implementation note.**`, no `**Examples.**`, no `**Edge cases.**`. Technical implementation detail belongs inside the first beat or in the corresponding [project case study](../src/content/projects/), not in a separate inline note.
- **One variant per post.** Pick the right variant for the framework. Solution-component variant is the default; reach for the failure-mode variant only when the framework's H3s genuinely name failure modes rather than solution components.

---

## 6. Diagrams

Every framework-led post ships with one architecture or framework diagram. No exceptions: a framework-led post without a diagram is incomplete.

- **File path**: `public/assets/blog/<slug>-<name>.svg`.
- **Markdown reference**: `![Alt text describing the framework concretely](/assets/blog/<slug>-<name>.svg)`.
- **Italic caption** directly below the image: `*One-sentence caption tying the image to the framework's main claim.*`
- **Position**: between the "Why this matters now" section and the named framework H2. The diagram closes the why-now and opens the framework.

### Alt text

Describe the image's information content, not its appearance. Name the major components and how they connect, in order of flow. Roughly 30 to 50 words.

Good: "Architecture diagram of the Voice-of-Customer Stack: four social sources feed raw ingestion, five-stage NLP enrichment in a curated layer, a semantic model with post and comment tables, then two specialized natural-language SQL agents plus a managed vector index, all routed by a supervisor agent and exposed through a workspace UI."

Bad: "Diagram with boxes and arrows."

### Caption

One italic sentence below the image, tying the diagram to the framework's main claim. The caption is what the reader reads if they only scan the diagram and skip the prose.

### Diagram labels

Same vendor-abstraction rule as the body prose (see section 10). Diagram labels use category descriptors ("Workspace UI", "Supervisor Agent", "Managed Vector Index"). Kimball-pattern table names (`dim_post`, `fact_comment`) and public-domain field names (`subscriber_id`, `title_id`) stay. The data origins at the bottom of an ingestion-shape diagram (Twitter / Facebook / YouTube / the platform's own surface) stay because they are sources, not stack choices.

### How to build and verify

See [BRAND.md section 7](BRAND.md#7-diagrams). Hand-coded SVG XML, brand palette baked in, verified via `npm run verify:diagram <path>` and reading the resulting PNG. Same workflow as project diagrams.

---

## 7. What the layout renders automatically

You write only the body and frontmatter. The layout at [src/layouts/BlogPost.astro](../src/layouts/BlogPost.astro) adds:

- **Header chrome**: category kicker (Eyebrow), title, date, description, reading time.
- **Series badge**: "Part N of M" pill and prev/next series navigation, for posts with a `series` field. Driven by [src/components/blog/SeriesNav.astro](../src/components/blog/SeriesNav.astro).
- **Right-rail sticky TOC**, auto-extracted from your body's H2s.
- **Breadcrumb** "← All posts" link at the top.

Do not duplicate any of these in the body. No author bio, no "related posts" links, no CTA box. Inbound is handled by the contact page.

---

## 8. Voice

Tone and word choice follow [BRAND.md section 5](BRAND.md#5-voice-and-tone-applies-to-every-surface). One-line summary: **thought leadership with delivery receipts.** Every claim is anchored in something the author built, broke, or watched fail.

Blog-specific anchors:

- **Tense and subject**: past tense for the opening anecdote, present tense for the framework and the analysis. The system or the team is the subject, not the company.
- **Person**: third-person throughout, except in "Where I would start" where first-person ("If you can only do one, I would do X") is welcome.
- **Posture**: stated opinions someone could disagree with. The bolded either-or thesis is the test: if the inverse is not also defensible, the thesis has no teeth.
- **MENA anchoring**: the defensible differentiator is delivery experience in MENA / Arabic-OTT that no generic consultant can fake. Surface it as structural pattern (one paragraph, late in the post), not as decorative reference.

### Fact ledger and external citations

Posts make two kinds of claims, handled differently.

- **Fact ledger.** Before writing, list every number, tool name, architecture detail, date, role, and decision the post will rely on. Pull from authoritative sources: the project case study, internal docs, the original PDF documenting the work. The draft does not invent numbers.
- **External claims.** Any claim beyond personal delivery (industry adoption stats, vendor benchmarks, recent thinking from named practitioners) needs a citation. Run a targeted web search and link inline to authoritative sources: vendor docs, named analysts, recent benchmark reports. Every citation should be load-bearing. Do not bulk-cite. Citations are optional, not required; a strong why-now can stand on the structural problem alone.

### MENA anchoring: structural vs decorative

A MENA reference is **structural** if removing it would leave the framework component incomplete. It is **decorative** if removing it leaves the post intact. A post about delivered work needs at least one structural anchor. The "One MENA-flavored note" section in [voice-of-customer-intelligence.md](../src/content/blog/voice-of-customer-intelligence.md) is the worked example: translation is non-optional because half the comments are Arabic, and the date dimension carries Ramadan-window flags because a generic month filter would aggregate across structurally different release periods. Both are structural; removing them would break specific framework components.

Specific seasonal cycles (Ramadan, Eid, World Cup, regional sports finals) follow the cultural-vs-operational test in section 10.

---

## 9. Pre-publication checklist

Mechanical rules (no em-dashes, no emoji, no exclamation marks, no AI attribution, frontmatter schema, build pass) are covered by [BRAND.md](BRAND.md) and the build process. This checklist is structural judgment only.

- [ ] Confidentiality pass per section 10 complete: current employer is not the subject of any sentence, no internal codenames in body or diagram, vendor names abstracted to category descriptors throughout the body and the diagram labels.
- [ ] All ten beats present in order. No missing diagram. No missing MENA note. No missing closing.
- [ ] Opening anecdote is a specific scene with people, numbers, or a moment (not an abstract statement).
- [ ] Bolded thesis appears at or near paragraph 4, follows the "A team is either X or Y. Once it starts X...; once it starts Y... The way you get there is not A. It is B." template.
- [ ] Framework has a name with weight (not "Approach" or "Methodology"), 3 to 6 H3 components.
- [ ] Every framework H3 follows the section 5 micro-format: three bold-inline beats in order. Solution-component variant uses `**What it is.** / **Why it matters.** / **What goes wrong without it.**`; failure-mode variant uses `**What it looks like.** / **Why it kills the program.** / **What to do instead.**`. One variant per post. No fourth beat (no `**Implementation note.**`) left over from earlier drafts.
- [ ] "Where I would start" section is explicit about which component earns the next.
- [ ] At least one structural MENA anchor present (section 8's structural-vs-decorative test).
- [ ] Closing question challenges the reader's current approach.
- [ ] Fact ledger built before drafting. External citations are load-bearing and link to authoritative sources, or the post stands without one.
- [ ] Diagram references a real SVG at `public/assets/blog/<slug>-<name>.svg` with descriptive alt text and an italic caption. Diagram labels use category descriptors.
- [ ] `/blog/<slug>/` renders correctly at desktop and mobile widths.

---

## 10. Confidentiality

The blog is written while the author is employed. Posts that describe current-employer work follow one structural rule:

**The company is on the CV and the LinkedIn experience section. It does not appear as the subject of any sentence in a blog post.**

The post's subject is one of:

- **The author's craft.** First-person framing in the "Where I would start" section: "If you can only do one of these first, do X."
- **The artifact.** System-anchored framing: "The Voice-of-Customer stack is a five-layer pipeline..."
- **The industry pattern.** Trend-anchored framing: "Arabic-content OTT platforms face a Ramadan-cycle problem..."

Anonymization-as-descriptor ("a major MENA streaming platform") is the wrong move. It sounds hedged, conflicts with the brand voice, and does not actually anonymize given the LinkedIn experience section. Don't use it. Reframe instead.

### Vendor names: where they appear

Blog posts have no Tech Stack section. The body is the only surface, and the body uses category descriptors throughout. Vendor names appear in two narrowly-scoped places:

- **Inside quoted external citations.** A linked quote from a vendor blog or a named analyst can carry vendor-specific language, because that is the source's voice, not self-attribution.
- **Frontmatter `categories`.** Enforced by the enum schema, not editorial choice.

Everywhere else in the body and in diagram labels, use category descriptors:

- A natural-language SQL agent (not Genie space, Cortex Analyst)
- A managed vector index (not Databricks Vector Search, Pinecone Index)
- A supervisor agent (not LangGraph Supervisor Agent)
- A customer-engagement platform (not CleverTap, Braze)
- A video-analytics platform (not Youbora, Conviva)
- A programmatic ad-serving platform (not Google Ad Manager)
- A subscription-management platform (not Evergent, Recurly)
- A marketing-data integration platform (not Funnel, Supermetrics)
- A content-metadata system (not Mediagenix)
- A semantic-modeling platform (not SSAS Tabular, Cube, AtScale, dbt Semantic Layer)
- A workspace UI (not Databricks App)
- A managed LLM endpoint (not Azure OpenAI, Vertex AI, Bedrock)
- The governed catalog (not Unity Catalog)
- A BI tool (not Power BI, Tableau, Qlik)

Data origins (the source platforms whose data is being ingested) stay named. Twitter, Facebook, YouTube, and the platform's own short-form surface are sources of data, not stack choices. Same call applies to bottom-of-diagram source boxes.

Kimball-pattern table names (`dim_*`, `fact_*`) and public-domain field names (`subscriber_id`, `content_id`, `title_id`, `parent_title_id`) stay. Public API field names (`tweet_id`, `videoId`, etc.) abstract to category descriptors in the body: "a post-level identifier", "a video identifier", "the platform's content identifier". The exception is when a quoted external citation carries the field name, in which case it stays as part of the source's voice.

### What does not appear in a published post

- The current employer's name as a sentence subject.
- Internal codenames for products, platforms, datasets, or scenarios.
- Internal column-name or table-name conventions that fingerprint the warehouse (e.g. a `dwh_` prefix). Replace with conventional equivalents.
- Vendor-specific operational quantities paired with the named vendor (e.g., "GAM with a 14-day attribution window", specific platform rate limits). The body abstracts vendor names by default, so this rule mostly bites in quoted citations and frontmatter.
- Exact scale figures tied to current-employer operations (profile counts, subscriber counts, revenue, ARPU, model-accuracy figures). Use relative deltas ("from roughly a quarter to near-full coverage") or order-of-magnitude descriptors ("millions of profiles"). When softening a count, prefer neutral descriptors ("across regional segments", "millions of profiles", "the majority of the cohort") over words that read as belittling ("a handful", "just a few", "merely"). The point is to remove the exact figure, not to make the work sound smaller than it was.
- Dated incidents that reference a specific weekday + named team + recognizable internal moment.
- Quoted Slack messages or quoted statements attributed to a specific internal role.
- Specific show or title names tied to operational anecdotes.
- Specific batch-window times or named SLAs ("7 AM Dubai daily run", "10 AM SLA").
- Named seasonal cycles (Ramadan, Eid, World Cup, regional sports finals) used as the *canonical operational example* for a generalizable system. Abstract to "a seasonal cycle", "a predictable recurring window", "calendar-driven shifts every industry handles differently". The exception is cultural-anchor framing (see "what does appear" below).

### What does appear

- Public industry patterns (medallion architecture, semantic layer, feature store, RAG, supervisor-agent topology, star schema, Kimball dimensions).
- Past employers in factual career-history references. Career-narrative posts can and should name them.
- Relative outcomes ("X% improvement", "from roughly a quarter to near-full coverage", "hours to seconds").
- Composite anecdotes that draw on multiple incidents to surface a pattern.
- MENA / Arabic-OTT structural cultural context: Ramadan release cycles as a *cultural pattern* that explains real industry dynamics, RTL UX, household profile sharing, dialectal Arabic in NLP, regional content licensing. The cultural anchor is the niche differentiator; surface it when the framework component genuinely depends on it.

### The cultural-vs-operational test for named seasonal cycles

Specific seasonal cycles (Ramadan, Eid, World Cup, regional sports finals) appear in two roles. They are handled differently:

- **Cultural-pattern anchor.** Naming a cycle to surface MENA / Arabic-OTT niche depth, as a structural pattern that explains real cultural-and-operational reality not present in Western streaming. **Keep** in posts where the cycle is the structural anchor and removing it would lose niche depth the post depends on.
- **Canonical operational example.** Naming a cycle as the headline use case for a generalizable system. **Abstract** to "a predictable recurring window where content priorities shift" or "a seasonal cycle the override system activates automatically by date".

The test is whether removing the named cycle leaves the framework component complete. If the lesson is *"you need declarative seasonal overrides"* and Ramadan is the canonical example, the named cycle is operational and should abstract. If the lesson is *"MENA streaming has compressed-launch dynamics that Western models miss"* and Ramadan is the structural anchor, the named cycle is cultural and stays.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Category enum (source of truth)**: [src/data/categories.ts](../src/data/categories.ts).
- **Content schema**: [src/content.config.ts](../src/content.config.ts).
- **Series registry**: [src/data/series.ts](../src/data/series.ts).
- **Layout that wraps the markdown body**: [src/layouts/BlogPost.astro](../src/layouts/BlogPost.astro).
- **Canonical anchor for the pattern**: [src/content/blog/voice-of-customer-intelligence.md](../src/content/blog/voice-of-customer-intelligence.md).
