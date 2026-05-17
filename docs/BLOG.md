# Blog

Operational spec for writing a blog post. Open this file every time you write or refresh a post.

Tone and brand-voice principles live in [BRAND.md](BRAND.md). Positioning and content pillars live in [BLOG_STRATEGY.md](BLOG_STRATEGY.md). This file owns *how to write the post itself*: post shape, structure, frontmatter, images, checklist.

---

## 1. The voice (in one line)

**Thought leadership with delivery receipts.** Every claim anchored in something you built, broke, or watched fail. Specific tools, specific numbers, specific moments.

For the full voice rules, sentence patterns, and forbidden words: read [BRAND.md section 5](BRAND.md#5-voice-and-tone-applies-to-every-surface). This document treats those rules as inherited and does not repeat them.

Things specific to blog voice that are *not* covered in BRAND.md:

- **Conversational but not casual.** No "in this blog post I will discuss." No "feel free to reach out." No "hope this helped."
- **No tutorial framing** as the spine of a post. Step-by-step "1. Open Databricks. 2. Click Compute." is documentation, not thought leadership. Steps may live *inside* a named framework component, but never carry the post.
- **No documentation-mode capability tables** or parameter exhaustion.

---

## 2. Two post shapes

Every post is one of two shapes. Both share the same voice and the same seven-part structure (section 3). They differ only in length expectation and whether they stand alone or belong to a series. The classification is derived from existing frontmatter; there is no separate tier field.

### Standalone

- **Length**: 1,200 to 1,800 words.
- **Purpose**: state an opinion, defend it with one named framework, end with a question. The default shape.
- **Frontmatter**: no `series` field.

### Series companion

- **Length**: 1,000 to 1,500 words per part. The framework is distributed across the series, so individual parts run shorter.
- **Purpose**: a sequenced multi-part exploration of one topic. Each part still opens with a vivid hook, states a sub-thesis, and closes with a question.
- **Frontmatter**: `series: <slug>` and `series_part: <number>`.
- **Before writing**: register the series in [../src/data/series.ts](../src/data/series.ts) with a human-readable label. If the slug is not registered, the series nav falls back to rendering the raw slug.

Length is a target, not a hard rule. If a topic routinely runs past 2,500 words, it probably wanted to be a series.

---

## 3. Post structure (mandatory seven parts)

The labels below are scaffolding, not section headings the reader sees. Some are unmarked transitions in prose.

### 1. Hook (first 3 paragraphs)

Open with a specific scene the reader has lived. Not an abstract problem statement.

**Good:**
> "At MBC Shahid (MBC Group), the conflict showed up clearly during a quarterly review. A churn prediction model flagged roughly 15,000 subscribers as at-risk for the upcoming period. The churn dashboard, which the business team had relied on for months, showed about 12,000."

**Weak:**
> "A semantic layer only works if architecture boundaries are clear. Many implementations fail because they mix data engineering responsibilities, metric engineering responsibilities, and report development responsibilities in one place."

The first is a scene with people, numbers, and a moment. The second is a statement of generic principle. Always write the first.

### 2. Bold thesis (paragraph 4)

A standalone paragraph that states an opinion with teeth. Someone could disagree.

**Good:**
> "The fix was not a dashboard or a new tool. It was a shared, governed data layer that every downstream consumer could trust."

**Weak:**
> "A semantic layer can still fail after launch if governance and deployment are weak."

### 3. Context: why this matters now

One or two paragraphs on the industry trend, technology shift, or market force that makes this topic urgent. Name specific tools, companies, market movements. This is where web-grounded external claims live (cite them per section 4 below).

### 4. The named framework (body of the post)

A model with 3 to 6 components, given a memorable name. Each component gets:

- **What it is** (1 to 2 sentences)
- **Why it matters** (business impact)
- **What goes wrong without it** (concrete failure mode, ideally one you have lived)
- **Optional**: specific tools or patterns. Code blocks or schema live here, inside the relevant framework component, never as the spine of the post.

**Good framework names** (set the bar to these):
- "The Voice-of-Customer Stack"
- "The Compounding Stack"
- "The Five Rules of a Compounding Data Model"
- "The Three-Layer DAX Stack"
- "The Three-Phase Migration Sequence"

**Avoid:**
- "Approach" or "Methodology" as a section heading with no framework name.
- Numbered lists of practices with no container concept.
- "Lessons learned" with no overarching name.

### 5. Prioritization: "What I'd actually do first"

After the framework, tell the reader where to start and why. This is the section that gets bookmarked and screenshot-ed. One paragraph minimum.

### 6. Domain anchor (at least one component)

At least one framework component, hook example, or stake should anchor in MENA / OTT / MBC Shahid. The defensible differentiator is delivery experience in a niche no generic consultant can fake. Surface it.

Examples: Ramadan-flavored release cycles, Arabic-language UX edge cases, MENA streaming household-sharing dynamics, AVOD market shifts in the region.

For posts where the domain is genuinely incidental (pure career narrative, pure technical pattern), one MENA-flavored sentence is enough. For posts about delivered work, MENA context should be structural.

### 7. Closing question

End with a question that challenges the reader's current approach. Not a CTA. Not "hope this helped." A question they cannot answer without thinking.

**Good closing questions** (write to this bar):
- "Is your data model a project that ended, or infrastructure that compounds?"
- "Your feedback data is either an asset you can query or a queue your analysts work down. Which one is yours?"
- "Is your stack compounding, or restarting every two years?"
- "Are your model numbers explainable from your dashboard, or are they a parallel reality?"

**Avoid:**
- "Hope this helped."
- "For the full case study, see..."
- "Reach out if you want to talk through your stack." (Belongs on the contact page, not the post.)

---

## 4. Sourcing facts and citations

Posts make two kinds of claims, and each one needs different handling before the draft is written.

### Fact ledger

Before writing, list every number, tool name, architecture detail, date, role, and decision the post will rely on. Pull these from authoritative sources: the project case study, internal docs, the original PDF documenting the work. This list is the source of truth for the draft. The draft does not invent numbers.

### External claims

Any claim that goes beyond personal delivery (industry adoption stats, vendor benchmarks, market size, comparisons to other companies' approaches, recent thinking from named practitioners) needs a citation. For each such claim, run a targeted web search. Cite inline using markdown links to authoritative sources: vendor docs, named analysts, recent benchmark reports. Every citation should be load-bearing. Do not bulk-cite.

---

## 5. Frontmatter

```yaml
---
title: "Clear, specific, opinionated title"
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

## 6. LinkedIn excerpt

The blog post is the canonical destination. A LinkedIn excerpt is the surface that drives traffic to it.

There is no excerpt workflow in this repo today. The `linkedin_excerpt` schema slot was dropped on 2026-05-17 because nothing read or wrote it. The template and rules below are reference material for when an excerpt workflow lands (see the LinkedIn entry in [../TODO.md](../TODO.md) Future enhancements). Until then, posts ship without an excerpt and the post is its own canonical artifact.

### Template

```
[Hook scene: 2 to 3 short paragraphs. Specific people, specific numbers, specific moment. Stop before the thesis.]

[One-line thesis or framework headline. Make it screenshot-able.]

[One-line preview of the prioritization or the named framework's first component.]

Full piece on the blog ↓
[link]
```

### Format rules

- 8 to 12 short lines, one idea per line.
- No hashtags in the excerpt itself. Add them in the first comment below the post if you want them.
- No emoji. The downward arrow `↓` is acceptable as the only non-text character because it does meaningful work pointing at the link.
- No em-dashes.
- The hook scene is ~70% of the excerpt. The framework headline and prioritization preview stay tight.

### Example

```
The Tuesday morning a content lead asked "what is the audience saying about the Ramadan finale?", the analyst said: give me three days.

Three days. For a question whose answer was already sitting in Twitter, Facebook, YouTube, and our own Shorts comments, mostly in Arabic, in four different schemas, with no link back to a title.

We built a platform that answers questions like that in seconds. The non-obvious move was not LLMs or vector search.

It was splitting Genie spaces in two. One for quantitative questions ("how many comments did Title X get?"). One for engagement metrics ("playtime trends for Title X?"). A supervisor agent routes between them.

Most teams try to build one Genie space that does everything. That is where they hit a wall.

Full piece on the blog ↓
[link]
```

---

## 7. Images

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

### How to build and verify the SVG

See [BRAND.md section 7](BRAND.md#7-diagrams). Same workflow as project case-study diagrams: hand-coded SVG XML, brand palette baked in, verified via `npm run verify:diagram <path>` and reading the resulting PNG.

---

## 8. Domain anchoring

The defensible differentiator is delivery experience in MENA / Arabic-OTT that no generic consultant can fake. This section's job is to make that surfacing concrete, not decorative.

### Structural vs decorative

A MENA reference is **structural** if removing it would leave the framework component incomplete. **Decorative** if removing it leaves the post intact.

- Structural: "The dim-date table at Shahid carries explicit Ramadan flags (minus-90 days, in-Ramadan, plus-90 days) so every time-grain measure stays consistent across the cycle." Load-bearing for the architecture argument.
- Decorative: "Like most MENA streaming platforms, we serve a diverse audience." Could be deleted without losing anything.

A post about delivered work should have at least one structural anchor.

### Anchors worth reaching for

When illustrating a framework component, reach for one of these before reaching for a generic example.

- **Ramadan release cycles**: pre-Ramadan, in-Ramadan, post-Ramadan windows shift content launches, subscription patterns, ad inventory, completion rates. Use as a stress test for any time-grain decision, dim-date design, KPI normalization, or refresh-cadence example.
- **Eid windows and regional sports finals**: shorter, sharper versions of the Ramadan cycle. Use for campaign-pacing or seasonal-override examples.
- **Arabic-language UX**: RTL layout, mixed-script content, transliteration, Arabic search and entity-resolution. Use for tagging, search, comment-mining, or any text-pipeline example.
- **MENA household-sharing dynamics**: multi-profile accounts, family-tier economics, shared-watchlist behavior. Use for churn modeling, profile attribution, or audience-segmentation examples.
- **Regional content licensing**: territory windows, Arabic-original investment, regional vs global content. Use for content-strategy or recommendation examples.

### Stack signals

Specific tools shipped on signal credibility, but only when anchored to a decision or a failure mode, never in the hook. Examples: Databricks, Delta Lake, Power BI, CleverTap, FAISS, LangGraph, Genie spaces, SSAS Tabular. Bronze / Silver / Gold layering fits here too.

A tool name without an associated decision or failure mode is name-dropping. Cut it.

### Transferable Pattern carve-out

One paragraph at most where the post explicitly steps back: "this pattern also fits retail, fintech, SaaS subscription, etc." Keep it tight. Signal applicability without diluting the niche positioning.

Generic OTT terms (subscriber, churn, ARPU, AVOD impressions) are table stakes. Use them naturally without thinking. They do not signal niche.

---

## 9. Pre-publication checklist

Before any post ships (rewrite, refresh, or new), it must pass:

- [ ] Hook is a specific scene with people, numbers, or a moment (not an abstract statement).
- [ ] Standalone thesis paragraph appears at or near paragraph 4.
- [ ] Framework has a name with weight (not "Approach" or "Methodology").
- [ ] Each framework component has *what / why / failure-mode* coverage.
- [ ] Prioritization section ("What I'd actually do first") is explicit.
- [ ] Closing question challenges the reader's current approach.
- [ ] For posts about delivered work, at least one structural anchor (section 8) is present. The structural vs decorative test: removing it should leave the framework component incomplete.
- [ ] Fact ledger built before drafting (section 4). External claims have load-bearing citations to authoritative sources.
- [ ] Zero em-dashes (`—`) and zero double-hyphen substitutes (`--`) in prose. Code-block `--` SQL comments are exempt.
- [ ] No emoji.
- [ ] No filler words: "basically", "essentially", "it's worth noting that".
- [ ] Frontmatter complete: title, date, description, categories, draft. Series fields if applicable; series slug registered in `src/data/series.ts`.
- [ ] Word count matches the declared shape (1,200 to 1,800 for standalone, 1,000 to 1,500 per series-companion part). Length is a target, not a hard rule.
- [ ] If an image is included, it is brand-aligned, has an italic caption, and has information-content alt text.
- [ ] `npm run build` passes.
- [ ] `/blog/<slug>/` renders correctly at desktop and mobile widths.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Positioning and content pillars**: [BLOG_STRATEGY.md](BLOG_STRATEGY.md).
- **Category enum (source of truth)**: [src/data/categories.ts](../src/data/categories.ts).
- **Content schema**: [src/content.config.ts](../src/content.config.ts).
