# Blog

Operational spec for adding a blog post. Posts are written in plain markdown with a small structured frontmatter block on top. No JSX, no components, no imports inside the body.

Tone and voice principles live in [BRAND.md](BRAND.md). This file owns *how to write the post*: frontmatter, body structure, framework H3 format, diagram conventions, checklist.

---

## 1. TL;DR

1. Create `src/content/blog/<slug>.md`.
2. Fill the frontmatter (4 required fields, 3 optional).
3. Write the body in your first-person narrative voice (see BRAND.md "Long-form and first-person voice"). Default spine: opening hook (a lived moment or a claim), the either-or thesis once it is earned, "Why this matters now", the named framework H2 with argument-subhead sections, optional auxiliary H2, "Where I would start", a short "One note from experience" reflection, "Closing". Each framework section carries one bolded payoff line, not a three-bold label stack.
4. Drop the diagram SVG at `public/assets/blog/<slug>-<name>.svg` and reference it under the "Why this matters now" section (recommended for framework posts).
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
description: "A five-layer stack turns scattered Arabic-language feedback into a system that answers content-team questions in seconds, on one architectural decision."
og_title: "Voice-of-Customer in Five Layers"
categories: ["AI & Automation", "Data Science"]
draft: false

# Optional, only for posts in a series:
series: semantic-layer
series_part: 1
---
```

### Required fields

`title`, `date`, `description`, `categories`, `og_title`.

### Optional fields

`draft`, `series`, `series_part`.

### Field guide

- **title**: name the framework in the title where possible. "Voice-of-Customer for Multilingual Streaming: The Five-Layer Stack" works because it names both the topic and the framework. "Thoughts on Voice of Customer" does not. Opinionated, specific, framework-shaped. 50 to 65 characters fits a SERP heading cleanly.
- **date**: publication date in `YYYY-MM-DD` format. Coerced to a `Date` via `z.coerce.date()` in [src/content.config.ts](../src/content.config.ts).
- **description**: one sentence shown on the listing card, at the top of the detail page, in the SERP snippet, and as the social-card description. Lead with the change, not the technology. Earn the click with specifics: a number, the scope, the mechanism. Aim for 140 to 160 characters so it does not truncate in Google results.
- **og_title**: the headline on the social card (LinkedIn, X, Slack unfurls). This is a different arena from the page title: the reader is scrolling a feed, has zero search intent, and gives the card about a second. Lead with the hook, not the topic. The card already shows the brand, so it does not need to repeat the subject noun. The schema enforces 8 to 42 characters; aim for 28 to 40. Use one of these three patterns:
  - **Tension or dichotomy.** "Inferred Data: Asset or Liability?", "When the Semantic Layer Stops Helping".
  - **Specific number.** "Four Guardrails for Inferred User Data", "Five Layers, One Architectural Decision".
  - **Counter-intuitive claim.** "Most Dashboards Are Lying to You", "The Refresh Job Is Not the Bottleneck".

  Avoid: vague verbs ("exploring", "thoughts on"), colon-stacked subtitles (those are page-title moves, not feed moves), and chapter-heading phrasing.
- **categories**: enforced at build time via `z.enum(BLOG_CATEGORIES)`. Allowed values defined in [src/data/categories.ts](../src/data/categories.ts) and currently: Data Engineering, BI & Analytics, Data Science, AI & Automation, Data Governance, Data Modeling, Career. Most posts have one or two. Typos fail the build.
- **draft**: default false. Drafts are excluded from listings and RSS in production builds.
- **series**: kebab-case slug for posts that are part of a multi-part exploration. The slug must be registered in [src/data/series.ts](../src/data/series.ts).
- **series_part**: ordinal position in the series (1, 2, 3, ...). Required when `series` is set.

Decisions, tech, and any narrative live in the markdown body. Org and timeline do not appear at all. The header is intentionally light: category kicker, title, date, description, reading time.

---

## 4. Body structure

A spine, not a fixed checklist. The framework archetype follows the beats below in roughly this order, written in first person throughout (see BRAND.md "Long-form and first-person voice"). The labels are scaffolding for the writer, not headings the reader sees (only the H2 beats carry headings). Beats can flex: the thesis can be woven into the opening rather than stand alone, and the diagram is recommended, not mandatory. What does not flex is the voice (first person, plain-then-precise, one motif) and the spine (hook, why-now, framework, where-to-start, closing).

When phrasing or density is in question, mirror [bi-to-ai-journey.md](../src/content/blog/bi-to-ai-journey.md). It is the canonical anchor for the voice and the structure.

````markdown
[1. Opening hook. 1 to 2 paragraphs, first person. A lived moment
("For a long time I thought the interesting work was always one desk
over...") or a claim that earns attention. Plain language first, the
precise term second. Introduce the running motif here. No section heading.]

[2. The either-or thesis. State it once, flatly, in your own voice, after
the opening has earned it. Pattern: "a [X] team is either [right thing],
or [wrong thing]." It can sit in its own short paragraph or close the
opening. The inverse must be defensible, or the thesis has no teeth.]

## Why this matters now

[3. Why the argument is sharper today than a few years ago. 1 to 3
paragraphs. Stakes, not citations: cite a source only if it is
load-bearing, never the generic stat every post on the topic uses.
End on one sentence that hands off to the framework. Carries one
bolded payoff line.]

![Alt text describing the framework concretely.](/assets/blog/<slug>-<name>.svg)

*[Italic caption: one sentence tying the diagram to the framework's main
claim. Recommended for framework posts; omit on narrative or opinion posts.]*

## The Named Framework

[4. Framework H2 with 3 to 6 sections. Subheads are arguments, not labels:
"Floor 1: the tables everyone trusts", not "Layer 1: Data Foundations".
A reader skimming only the subheads gets the argument. Each section is
flowing first-person prose carrying exactly one bolded payoff line: the
single sentence you would want quoted back. No three-bold label stack
(see section 5).]

### Floor 1: the argument this section makes

[Flowing prose. The plain version first, the precise term second. One
bolded payoff line: **the single takeaway, the sentence worth quoting.**]

### Floor 2: the argument this section makes
...

## [Optional auxiliary H2]

[5. A single discipline or observation that holds the framework together
and does not fit inside any one section. Allowed between the framework and
"Where I would start". Omit when not load-bearing.]

## Where I would start

[6. Sequenced prioritization, first person. 2 to 4 paragraphs. "Build the
foundation first" then what that means in practice, in order. Carries one
bolded payoff line.]

## One note from experience

[7. A short, personal reflection that lands the motif: what you understand
now that you did not early on. First person, no internal disclosure, no
regional tells. This replaces the old mandatory MENA note.]

## Closing

[8. A leading question (often the binary from the thesis), then a short
answer contrasting the two outcomes. Land the motif from the opening in
the final line.]
````

### Beat notes

- **Opening hook (beat 1)**: 1 to 2 paragraphs, first person. A lived moment ("For a long time I thought the interesting work was always one desk over") or a claim that earns attention. Plain language first, the precise term second. Introduce the running motif here. Vary the opening device across the catalog: a scene, a claim, or a question all work, so the blog does not read as one reused template. What matters is a concrete, personal entry, not an abstract problem statement.
- **Either-or thesis (beat 2)**: state it once, flatly, in your own voice, after the opening has earned it. It can stand in a short paragraph or close the opening. Someone could disagree: "a data team is either compounding everything it builds, or quietly starting over every couple of years." If the inverse is not also defensible, the thesis has no teeth. Not bolded by default; the bold budget is one payoff per section.
- **Why this matters now (beat 3)**: why the argument is sharper today than a few years ago. Stakes, not citations. Cite a source only when it is load-bearing; drop the generic stat every post on the topic uses. End on one sentence that hands off to the framework so the diagram does not arrive cold. One bolded payoff line.
- **Diagram + caption**: recommended for framework posts, not mandatory. A framework with a genuine shape earns one; a narrative or opinion post does not need one. See section 6 for conventions.
- **Named framework (beat 4)**: H2 with a name that has weight. "The Four-Layer Compounding Stack", "The Voice-of-Customer Stack", "The Three-Phase Migration Sequence". Not "Approach" or "Methodology". 3 to 6 sections; the framework can be whatever size it actually has. Subheads are arguments, not labels. Each section is flowing first-person prose with exactly one bolded payoff line (see section 5).
- **Auxiliary H2 (beat 5)**: optional. Use when one discipline or observation holds the framework together and does not fit inside any single section. Sits between the framework and "Where I would start".
- **Where I would start (beat 6)**: incremental ordering of how to ship the framework. Dictated by trust, not roadmap. First person. One bolded payoff line ("**Build the foundation first.**").
- **One note from experience (beat 7)**: a short, personal reflection that lands the motif: what you understand now that you did not early on. First person, no internal disclosure, no regional tells. Replaces the old mandatory MENA note.
- **Closing (beat 8)**: a leading question that challenges the reader's current approach (often the binary from the thesis), then a short answer contrasting the two outcomes. Land the opening motif in the final line.

### Closing questions to aim for

- "Is your data model a project that ended, or infrastructure that compounds?"
- "Is your Ad Operations team acting on signals, or chasing make-goods?"
- "Are your model numbers explainable from your dashboard, or are they a parallel reality?"
- "Is your stack compounding, or restarting every two years?"
- "When the next finale airs tonight, will your product manager have an answer by morning, or by the end of next week?"

### Post length

Standalone posts run long here, roughly 2,000 to 4,000 words. Series companion parts run 1,500 to 2,500 words each. The length is deliberate: depth is the credibility lever for a personal brand, and the current catalog sits in this band. Length follows the argument. Do not pad to reach a number, and do not cut a load-bearing beat (the framework, the "One note from experience", the closing) to look shorter. If one post sprawls past roughly 4,500 words and carries more than one framework, that is the signal it wanted to be a series.

---

## 5. The framework H3 format

### Default: argument subhead + one bolded payoff

This is the standard for every framework post. Each H3 under the named framework is flowing first-person prose, not a label stack. Two rules:

- **The subhead is an argument, not a label.** "Floor 1: the tables everyone trusts", not "Layer 1: Data Foundations". "Floor 3: the models that reuse it all", not "Layer 3: Data Science". A reader who skims only the subheads should come away with the argument. The label belongs in documentation; the argument belongs in a blog.
- **Exactly one bolded payoff line per section.** The section builds in plain prose toward a single bolded sentence: the one takeaway you would want quoted back. One bold, not two, not zero. More than one and none of them lands.

````markdown
### Floor N: the argument this section makes

Flowing prose, first person. Open with the plain version of the idea,
then the precise term. Build the case in two or three short paragraphs.
Land it on one bolded line: **the single sentence worth quoting back.**
````

Load-bearing technical detail (cadence, partition strategy, keys) is welcome inside the prose when it explains the idea. No code blocks unless the code *is* the subject (a DAX measure on a DAX post, a SQL snippet on a query-engine post).

### When the subheads form a set, read them as a group

When a framework's subheads are a numbered sequence (five rungs, four floors, three phases), readers skim them as a set, so the set has to cohere. Punch comes from brevity and a shared silhouette, not from forced parallelism. Rigid sameness (every heading bent into the identical grammatical mould) reads flat, the same way identical opening lines do. Aim for a common shape, then allow a warm outlier: in the maturity-ladder post the rung headings mostly take a "the [thing] that [tell]" form ("the tool people stop double-checking", "the AI no one opens an app for"), while the first is left looser ("chatting, and keeping nothing") on purpose.

Two failures to check for across a set:

- **Odd structure.** One heading in a different grammatical form ("when AI runs and no one opens an app" sitting among noun phrases) is what makes a set feel off. Fix the one outlier rather than regimenting all of them.
- **Odd axis.** Every heading should sit on the same axis: name what the section *is*, not a different dimension. "the rung almost nobody reaches" describes rarity while its siblings describe behaviour; re-aim it to the behaviour ("the system that learns on its own") and let the section body carry the rarity.

### Optional: the three-bold reference format

For genuinely reference-style or troubleshooting posts where scannability beats narrative, the older three-bold-inline format is still available. It is no longer the default, because in aggregate it reads mechanical. Use it deliberately, not by habit, and one variant per post.

- **Solution-component variant.** `**What it is.** / **Why it matters.** / **What goes wrong without it.**` Use when the H3s name parts of a system that work together.
- **Failure-mode variant.** `**What it looks like.** / **Why it kills the program.** / **What to do instead.**` Use when the H3s name failure modes the framework prevents (for example, "The Four Traps of Semantic Layer Programs"), where "what goes wrong without it" does not apply because the trap *is* the failure mode.

No fourth beat in either variant. No `**Implementation note.**`, no `**Examples.**`. Implementation detail lives in the prose or in the corresponding [project case study](../src/content/projects/).

---

## 6. Diagrams

A framework post with a genuine shape (layers, a loop, a pipeline) should ship one architecture or framework diagram. It is strongly recommended, not mandatory: a framework whose value is visual is incomplete without one, but a narrative or opinion post, or a framework that does not draw cleanly, can stand on prose alone. Do not manufacture a diagram to satisfy a checklist.

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

- **Person**: first person throughout. This is the default that makes a post read like Aamir and not like a brand. Write "I built", "I would start", "what I understand now". See BRAND.md "Long-form and first-person voice" for the full register.
- **Tense**: past tense for the lived opening, present tense for the framework and the analysis. The subject is your experience and the system, never the current employer.
- **Posture**: stated opinions someone could disagree with. The either-or thesis is the test: if the inverse is not also defensible, the thesis has no teeth.
- **The differentiator is lived delivery, abstracted**: the credibility no generic consultant can fake is that you have built and broken these systems. Surface that through concrete, abstracted experience (the "One note from experience" beat), not through regional or employer tells. Do not lean on MENA / Arabic-OTT / Ramadan as the anchor: under your own name it points straight at the current employer, which the discretion rule forbids (see section 10).

### Fact ledger and external citations

Posts make two kinds of claims, handled differently.

- **Fact ledger.** Before writing, list every number, tool name, architecture detail, date, role, and decision the post will rely on. Pull from authoritative sources: the project case study, internal docs, the original PDF documenting the work. The draft does not invent numbers.
- **External claims.** Any claim beyond personal delivery (industry adoption stats, vendor benchmarks, recent thinking from named practitioners) needs a citation. Run a targeted web search and link inline to authoritative sources: vendor docs, named analysts, recent benchmark reports. Every citation should be load-bearing. Do not bulk-cite. Citations are optional, not required; a strong why-now can stand on the structural problem alone.

### No regional anchoring

Under Aamir's own name, an Arabic-OTT / Ramadan / subscriber anchor points straight at the current employer, which the discretion rule forbids (see section 10 and the hub's CLAUDE.md Hard rules). The differentiator is lived delivery experience, abstracted to a generic vertical: scrub regional and employer tells rather than leaning on them, and use universal entities (customers, accounts, content, records, operations) the way landing copy does.

---

## 9. Pre-publication checklist

Mechanical rules (no em-dashes, no emoji, no exclamation marks, no AI attribution, frontmatter schema, build pass) are covered by [BRAND.md](BRAND.md) and the build process. This checklist is structural judgment only.

- [ ] Confidentiality pass per section 10 complete: current employer is not the subject of any sentence, no internal codenames in body or diagram, no regional / Arabic-OTT / seasonal tells, vendor names abstracted to category descriptors throughout the body and the diagram labels.
- [ ] Written in first person throughout (not third-person about "teams" or "systems"). Reads like Aamir, not like a brand.
- [ ] The spine is present: opening hook, why-now, named framework, "Where I would start", "One note from experience", closing. No mandatory diagram or regional note.
- [ ] Opening hook is a specific, personal entry (a lived moment or a sharp claim), not an abstract problem statement. The running motif is introduced here and lands in the closing line.
- [ ] The either-or thesis is stated once, someone could disagree with it, and the inverse is defensible.
- [ ] Framework has a name with weight (not "Approach" or "Methodology"), 3 to 6 sections, with argument subheads (not label subheads).
- [ ] Each framework section carries exactly one bolded payoff line (no three-bold label stack, unless the post deliberately uses the optional reference format from section 5).
- [ ] "Where I would start" is explicit about which part earns the next, in first person.
- [ ] Closing question challenges the reader's current approach.
- [ ] Fact ledger built before drafting. External citations are load-bearing and link to authoritative sources, or the post stands without one.
- [ ] If the post has a diagram: it references a real SVG at `public/assets/blog/<slug>-<name>.svg` with descriptive alt text and an italic caption, and the labels use category descriptors. (Diagrams are recommended for framework posts, not mandatory.)
- [ ] `og_title` set, follows one of the three section 3 patterns (tension, specific number, counter-intuitive claim), reads as a feed hook rather than a chapter heading, and is 28 to 42 characters.
- [ ] `description` is 140 to 160 characters, leads with the change, and earns the click with a specific number, scope, or mechanism.
- [ ] `/blog/<slug>/` renders correctly at desktop and mobile widths.

---

## 10. Confidentiality

The blog is written while the author is employed. Posts that describe current-employer work follow one structural rule:

**The company is on the CV and the LinkedIn experience section. It does not appear as the subject of any sentence in a blog post.**

The post's subject is one of:

- **The author's craft.** First-person framing in the "Where I would start" section: "If you can only do one of these first, do X."
- **The artifact.** System-anchored framing: "The Voice-of-Customer stack is a five-layer pipeline..."
- **The industry pattern.** Trend-anchored framing in a generic vertical: "Subscription businesses face a seasonal-cycle problem..." Not regional, not OTT-specific.

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
- Named seasonal cycles (Ramadan, Eid, World Cup, regional sports finals), in any role. Always abstract to "a seasonal cycle", "a predictable recurring window", "calendar-driven shifts every industry handles differently": a named regional cycle under Aamir's own name points at the current employer.

### What does appear

- Public industry patterns (medallion architecture, semantic layer, feature store, RAG, supervisor-agent topology, star schema, Kimball dimensions).
- Past employers in factual career-history references. Career-narrative posts can and should name them.
- Relative outcomes ("X% improvement", "from roughly a quarter to near-full coverage", "hours to seconds").
- Composite anecdotes that draw on multiple incidents to surface a pattern.
- Generic, vertical-agnostic structural patterns that stand in for the real context: a seasonal demand cycle, multilingual text processing, shared household accounts, content licensing windows. State the structural mechanic without the regional label (see section 8).

### Named seasonal cycles always abstract

There is no two-role test. Specific seasonal cycles (Ramadan, Eid, World Cup, regional sports finals) always abstract to a generic equivalent: "a predictable recurring window where demand shifts", "a seasonal cycle the system handles by date", "calendar-driven shifts every industry handles differently". The structural lesson (you need declarative seasonal overrides; a generic month filter aggregates across structurally different periods) carries fully without the regional name. Keep the mechanic, drop the label.

---

## 11. Publishing cadence and distribution

Posts publish bi-weekly, on Wednesdays, one every two weeks. Bi-weekly is the sustainable starting cadence around a full-time job: it protects the rewrite-and-scrub plus review cycle each post needs. Pick up the pace to weekly only once the factory is fast and a buffer of finished posts exists. Decouple writing from publishing: rewrite in batches when there is time, publish on the steady bi-weekly drumbeat. A missed slot is invisible. A thin post is not. If a slot has nothing ready, skip it rather than ship filler.

Scheduling is date-driven, not draft-driven. Set each post's `date` to its intended publish day. `getPublishedPosts()` in [../src/lib/blog.ts](../src/lib/blog.ts) hides any post whose `date` is still in the future, so a finished post can sit in the repo, dated ahead, and stay invisible until its day arrives. A daily `schedule:` cron in [../.github/workflows/deploy.yml](../.github/workflows/deploy.yml) rebuilds the site every morning (06:00 UTC), so each due post self-publishes on its date with no manual step. To force an immediate rebuild before the next daily run, push any commit or run the deploy workflow manually (`workflow_dispatch`).

Ordering is engagement-first, not chronological-by-topic. Lead with the most accessible, human, or contrarian posts; run a multi-part series as a mid-launch block; close on the strongest showcases. A logical topic arc is a fallback, not the default.

Distribution. Every post ships with a LinkedIn companion (section 13). The blog post is the long-form credibility play; the LinkedIn post is the reach play. Publishing one without the other leaves most of the value on the table. Share the companion on Wednesday, early-to-mid afternoon Gulf time, a window that overlaps a live Gulf afternoon, European midday, and a US-East morning. Put the canonical post URL near the end of the copy, not the first line.

---

## 12. Post archetypes

The spine in section 4 is the framework archetype. It is the default, not the only shape. Running every post through the same skeleton reads as formulaic in aggregate, and that risk grows at weekly cadence. All three archetypes are first person; what changes is the scaffold:

- **Framework post** (section 4, default). For systems, architectures, and sequences. The full spine: hook, why-now, named framework with 3 to 6 argument-subhead sections, recommended diagram, "Where I would start", "One note from experience", closing.
- **War-story / narrative post.** Story-spine: a problem arose, attempts failed, a fix held, here is the lesson. Lighter scaffold, no diagram, fewer beats. Use when the lesson lives in the sequence of events, not in a static framework.
- **Opinion / contrarian essay.** Leads with a debated take and defends it with receipts. No framework or diagram required. The highest-reach format, and the one to reach for when the value is the position itself rather than a how-to.

Pick the archetype before drafting. First person, the either-or thesis, the running motif, and the discretion scrub carry across all three; the full framework spine applies only to the framework archetype.

---

## 13. LinkedIn companion

Every post has a companion LinkedIn draft, written at publish-planning time and stored as a sidecar at `social/linkedin/<slug>.md`. The `<slug>` is the same one the post file uses, which is also the OG card filename (`public/og/blog/<slug>.png`) and the URL path (`/blog/<slug>/`), so the post, its card, and its companion all stay in sync from one identifier. The sidecar lives outside `src/`, so it is never built or schema-validated.

**Length and the fold.** Keep the whole post under 800 characters. LinkedIn truncates the feed preview with a "see more" link after roughly 140 to 210 characters, so the first line or two must carry the hook on their own: the part above the fold is the whole ad for the rest. Do not open with the link or a throat-clearing line. The reference companions are the bi-to-ai sidecar and the data-ai-maturity-ladder sidecar.

Each draft holds:

- A scroll-stopping first line, the hook rather than the title, written to land above the "see more" fold.
- The post's core tension and named framework, in a few short paragraphs.
- One or two concrete specifics lifted from the post.
- A plain-language takeaway.
- The canonical post URL `https://syedaamir.com/blog/<slug>/` on its own line near the end. LinkedIn scrapes that URL to render the OG card, and deprioritises links placed in the first line.
- Two or three relevant hashtags. More than that reads as marketing.

Two choices decide whether the companion earns the click, and both are easy to get wrong:

- **Close on a reader challenge, not a description of the article.** The last line before the URL should make the reader self-diagnose, not summarise the contents. "So which rung are you really on: the one your demos can reach, or the one your data can hold?" pulls far harder than "The five rungs, and the wall each one needs:". The post's own closing question (section 4, beat 8) is usually the best CTA already written. Vary the actual question per post; never reuse one phrasing.
- **If you include a proof beat, make it the strongest on-thesis receipt, not a niche tangent.** A specific one-rung project detail ("I built a document assistant that...") narrows a whole-argument post right before the ask. A decade-in-data line carries more authority and reinforces the thesis instead of detouring from it. One receipt, the biggest one, doing double duty as credibility and CTA setup.

Same hard rules as the post: no em-dashes, no emoji, no exclamation marks, no "feel free to reach out" sign-off, and the employer is never the subject. No markdown bold or headings: LinkedIn strips them, so the draft is plain text. Vary hooks and closers across companions, and match each one to its post's archetype, so the feed does not read as a template either. A lighter, human register (contractions, a plain aside) is welcome here; it is what keeps the companion from reading as machine-generated.

### OG card and link handling

Posting the blog link is what renders the rich preview card (the OG card) in the feed, pulling `og_title`, the description, and the OG image from the live page. That card is the credibility and click-through anchor, so the default is link-in-post, not link-in-first-comment. The reach trade-off (LinkedIn slightly favours link-free posts) is outweighed at this stage by the card and the click to an owned property.

- **Keep the URL near the end** of the copy, never the first line (LinkedIn penalises a first-line link hardest, and it competes with the hook).
- **Clean-card trick:** when composing in LinkedIn, paste the URL, wait for the card to render below, then delete the raw URL text from the post. The card stays and the copy reads clean. The card itself is the clickable link.
- **Port before sharing:** the card reads from the live page, so the post must be published on syedaamir.com first. Sharing before porting renders the old version's card.
- **First-comment alternative:** only if maximising raw reach matters more than the card for a given post. Then the card does not render on the post, so rely on the hook alone and drop the link in the first comment.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Category enum (source of truth)**: [src/data/categories.ts](../src/data/categories.ts).
- **Content schema**: [src/content.config.ts](../src/content.config.ts).
- **Series registry**: [src/data/series.ts](../src/data/series.ts).
- **Layout that wraps the markdown body**: [src/layouts/BlogPost.astro](../src/layouts/BlogPost.astro).
- **Canonical anchor for the voice and structure**: [src/content/blog/bi-to-ai-journey.md](../src/content/blog/bi-to-ai-journey.md).
