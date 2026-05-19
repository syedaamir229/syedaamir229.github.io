# Blog

Operational spec for writing a blog post. Open this every time you write or refresh a post.

Tone and brand-voice principles live in [BRAND.md](BRAND.md). This file owns *how to write the post itself*: post shape, structure, frontmatter, images, checklist.

---

## 1. Voice (one line)

**Thought leadership with delivery receipts.** Every claim is anchored in something the author built, broke, or watched fail. Specifics are patterns, decisions, and relative outcomes, not company names or absolute scale figures.

For sentence patterns, words to use and avoid, and hard rules: see [BRAND.md section 5](BRAND.md#5-voice-and-tone-applies-to-every-surface). This document treats those rules as inherited.

---

## 2. Two post shapes

| Shape | Length | Frontmatter | Use when |
|---|---|---|---|
| Standalone | 1,200 to 1,800 words | no `series` field | Default. State an opinion, defend it with one named framework, end with a question. |
| Series companion | 1,000 to 1,500 words per part | `series: <slug>` + `series_part: <n>` | Multi-part exploration of one topic. Register the slug in [../src/data/series.ts](../src/data/series.ts) before writing. |

Length is a target, not a hard rule. A topic that routinely runs past 2,500 words probably wanted to be a series.

---

## 3. Post structure

Every post has seven parts in this order. The labels below are scaffolding for the writer, not headings the reader sees. The canonical worked example is [src/content/blog/avod-revenue-pipeline-and-alerting.md](../src/content/blog/avod-revenue-pipeline-and-alerting.md); read it once to anchor what each part looks like in practice.

| # | Part | What it is | Avoid |
|---|---|---|---|
| 1 | Hook | A specific scene the reader has lived. Past tense, third-person about teams or systems. 1 to 2 paragraphs. | Abstract problem statements. "Many implementations fail because..." |
| 2 | Diagnosis | "That kind of miss is the shape of X." Names the failure pattern in one paragraph. | Restating the hook in different words. |
| 3 | Bold thesis | A standalone bolded paragraph in the "A team is either X or Y" pattern, plus the framework name. Someone could disagree. | "A semantic layer can still fail after launch if governance is weak." (No teeth.) |
| 4 | Why this matters now | One or two paragraphs of industry context: vendors, citations, structural notes. This is where external links live. | Generic "AI is everywhere" preamble. |
| 5 | Named framework | The body. 3 to 6 components, each with *what it is*, *the non-obvious part*, *what goes wrong without it*. Tools, schema, and code blocks live inside relevant components. | "Approach" or "Methodology" as the section name. Numbered lists with no container concept. |
| 6 | Where I would start | Incremental ordering of how to ship the framework, dictated by trust not roadmap. 3 to 4 paragraphs. The one section where first-person ("I would") is welcome. | Generic "first steps" advice. |
| 7 | Closing question | A question that challenges the reader's current approach. Often the binary from the thesis ("Is your X this, or that?"). | "Hope this helped." "Reach out if you want to talk." |

### Closing questions worth aiming for

- "Is your data model a project that ended, or infrastructure that compounds?"
- "Is your Ad Operations team acting on signals, or chasing make-goods?"
- "Are your model numbers explainable from your dashboard, or are they a parallel reality?"
- "Is your stack compounding, or restarting every two years?"

### Optional sections (sometimes present)

A short *design decision* section between parts 5 and 6 names the single call that makes the framework work ("Alert thresholds: business impact, not technical anomaly"; "Parameter design: every recurring ask is a knob"). A *One MENA-flavored note* section between parts 6 and 7 ties the framework to regional context. Both are demonstrated in the AVOD post.

---

## 4. Sourcing facts and citations

Posts make two kinds of claims, handled differently.

**Fact ledger.** Before writing, list every number, tool name, architecture detail, date, role, and decision the post will rely on. Pull from authoritative sources: the project case study, internal docs, the original PDF documenting the work. The draft does not invent numbers.

**External claims.** Any claim beyond personal delivery (industry adoption stats, vendor benchmarks, recent thinking from named practitioners) needs a citation. Run a targeted web search and link inline to authoritative sources: vendor docs, named analysts, recent benchmark reports. Every citation should be load-bearing. Do not bulk-cite.

---

## 5. Frontmatter

```yaml
---
title: "Clear, specific, opinionated title that names the framework"
date: YYYY-MM-DD
description: "One-sentence summary that works as a LinkedIn preview."
categories: ["One Category"]
draft: false

# Optional, only for posts in a series:
series: semantic-layer
series_part: 1
---
```

The schema is enforced at build time by [src/content.config.ts](../src/content.config.ts). Typos in `categories` fail the build.

**Categories** (must match one of these, defined in [src/data/categories.ts](../src/data/categories.ts)):
Data Engineering · BI & Analytics · Data Science · AI & Automation · Data Governance · Data Modeling · Career

A post can have more than one category. Most have one.

---

## 6. Images

Images are not decorative. Every image earns its place. Default position: no image.

### When to include one

- **Always**: one architecture or framework diagram per standalone post that introduces a new named framework. Position: between hook+thesis and the framework section.
- **Sometimes**: one architecture diagram per series companion when the system has 4+ moving parts.
- **Never**: stock photography, AI-generated humans, decorative banners, generic icons-grid layouts.

### Naming, captions, alt text

- **File path**: `public/assets/blog/<post-slug>-<image-name>.svg`.
- **Markdown reference**: `![Alt text describing the framework concretely](/assets/blog/<post-slug>-<image-name>.svg)`.
- **Italic caption directly below**: `*One-sentence caption tying the image to the framework's main claim.*`
- **Alt text**: describe the image's information content, not its appearance. "Architecture diagram showing the four-signal AVOD operating loop with inventory, impressions, VAST errors, and pacing pipelines feeding a shared semantic layer." Not "diagram with boxes and arrows."

### How to build and verify

See [BRAND.md section 7](BRAND.md#7-diagrams). Hand-coded SVG XML, brand palette baked in, verified via `npm run verify:diagram <path>` and reading the resulting PNG.

---

## 7. MENA anchoring

The defensible differentiator is delivery experience in MENA / Arabic-OTT that no generic consultant can fake. Surface it as structural pattern, not decorative reference.

A MENA reference is **structural** if removing it would leave the framework component incomplete. It is **decorative** if removing it leaves the post intact. A post about delivered work needs at least one structural anchor. The "One MENA-flavored note" section in the canonical AVOD post is the worked example.

Specific seasonal cycles (Ramadan, Eid, World Cup, regional sports finals) are handled by the cultural-vs-operational test in section 9. The default is to abstract the named cycle to "a predictable recurring window"; the exception is when the named cycle is the structural anchor.

---

## 8. Pre-publication checklist

Mechanical rules (no em-dashes, no emoji, no exclamation marks, no AI attribution, no filler words, frontmatter schema, build pass) are covered by [BRAND.md](BRAND.md) and the build process. This checklist is structural judgment only.

- [ ] Confidentiality pass per section 9 complete.
- [ ] Hook is a specific scene with people, numbers, or a moment (not an abstract statement).
- [ ] Standalone bolded thesis appears at or near paragraph 4, in the "A team is either X or Y" pattern.
- [ ] Framework has a name with weight (not "Approach" or "Methodology"), and each component covers *what it is / the non-obvious part / what goes wrong without it*.
- [ ] "Where I would start" section is explicit about which component earns the next.
- [ ] For posts about delivered work, at least one structural MENA anchor present (section 7's structural-vs-decorative test).
- [ ] Closing question challenges the reader's current approach.
- [ ] Fact ledger built before drafting (section 4). External claims have load-bearing citations to authoritative sources.
- [ ] `/blog/<slug>/` renders correctly at desktop and mobile widths.

---

## 9. Confidentiality

The blog is written while the author is employed. Posts that describe current-employer work follow one structural rule:

**The company is on the CV and the LinkedIn experience section. It does not appear as the subject of any sentence in a blog post.**

The post's subject is one of:

- **The author's craft.** First-person framing in the "Where I would start" section: "If you can only do one of these first, do X."
- **The artifact.** System-anchored framing: "The Voice-of-Customer stack is a five-layer pipeline..."
- **The industry pattern.** Trend-anchored framing: "Arabic-content OTT platforms face a Ramadan-cycle problem..."

Anonymization-as-descriptor ("a major MENA streaming platform") is the wrong move. It sounds hedged, conflicts with the brand voice, and does not actually anonymize given the LinkedIn experience section. Don't use it. Reframe instead.

### What does not appear in a published post

- The current employer's name as a sentence subject.
- Internal codenames for products, platforms, datasets, or scenarios.
- Internal column-name or table-name conventions that fingerprint the warehouse (e.g. a `dwh_` prefix used by the current employer's data model). Replace with conventional equivalents (`subscriber_id`, `content_id`, `title_id`, `parent_title_id`) that keep the conceptual point without exposing the in-house convention. Public API field names (`tweet_id`, `video_id`) and Kimball star-schema patterns (`dim_*`, `fact_*`) stay.
- Vendor combinations that uniquely identify the employer. Blog posts have no Tech Stack section; the body is the only surface, and the body should use generic category descriptors throughout ("a video-analytics platform", "a customer-engagement platform"). Industry citations with hyperlinks (e.g. linking out to CleverTap's site to anchor an industry observation) are fine because they are not self-attribution. Project case studies handle vendors differently: explicit names in Tech Stack, abstraction in body / diagram / description. See [PROJECTS.md section 9](PROJECTS.md#9-confidentiality).
- Vendor-specific operational quantities paired with the named vendor (e.g., "GAM with a 14-day attribution window", specific platform rate limits). Either name the vendor without the quantity, or describe the operational behavior without naming the vendor. Never both together.
- Exact scale figures tied to current-employer operations (profile counts, subscriber counts, revenue, ARPU, model-accuracy figures). Use relative deltas ("from roughly a quarter to near-full coverage") or order-of-magnitude descriptors ("millions of profiles"). When softening a count, prefer neutral descriptors ("across regional segments", "millions of profiles", "the majority of the cohort", "a small set") over words that read as belittling ("a handful of segments", "just a few", "merely"). The point is to remove the exact figure, not to make the work sound smaller than it was.
- Dated incidents that reference a specific weekday + named team + recognizable internal moment.
- Quoted Slack messages or quoted statements attributed to a specific internal role.
- Specific show or title names tied to operational anecdotes.
- Specific batch-window times or named SLAs ("7 AM Dubai daily run", "10 AM SLA").
- Named seasonal cycles (Ramadan, Eid, World Cup, regional sports finals) used as the *canonical operational example* for a generalizable system. Abstract to "a seasonal cycle", "a predictable recurring window", "calendar-driven shifts every industry handles differently". The exception is cultural-anchor framing (see "what does appear" below).

### What does appear

- Public industry patterns (medallion architecture, semantic layer, feature store, RAG, supervisor-agent topology).
- Past employers in factual career-history references. Career-narrative posts can and should name them.
- Vendor names without a paired vendor-specific operational quantity (e.g., "Power BI" or "Databricks" as a tool, not "GAM with a 14-day attribution window").
- Relative outcomes ("X% improvement", "from roughly a quarter to near-full coverage", "hours to seconds").
- Composite anecdotes that draw on multiple incidents to surface a pattern.
- MENA / Arabic-OTT structural cultural context: Ramadan release cycles as a *cultural pattern* that explains real industry dynamics, RTL UX, household profile sharing, dialectal Arabic in NLP, regional content licensing. The cultural anchor is the niche differentiator; surface it when the framework component genuinely depends on it.

### The cultural-vs-operational test for named seasonal cycles

Specific seasonal cycles (Ramadan, Eid, World Cup, regional sports finals) appear in two roles. They are handled differently:

- **Cultural-pattern anchor.** Naming a cycle to surface MENA / Arabic-OTT niche depth, as a structural pattern that explains real cultural-and-operational reality not present in Western streaming. **Keep** in posts where the cycle is the structural anchor and removing it would lose niche depth that the post depends on.
- **Canonical operational example.** Naming a cycle as the headline use case for a generalizable system. **Abstract** to "a predictable recurring window where content priorities shift" or "a seasonal cycle the override system activates automatically by date".

The test is whether removing the named cycle leaves the framework component complete. If the lesson is *"you need declarative seasonal overrides"* and Ramadan is the canonical example, the named cycle is operational and should abstract. If the lesson is *"MENA streaming has compressed-launch dynamics that Western models miss"* and Ramadan is the structural anchor, the named cycle is cultural and stays.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Category enum (source of truth)**: [src/data/categories.ts](../src/data/categories.ts).
- **Content schema**: [src/content.config.ts](../src/content.config.ts).
