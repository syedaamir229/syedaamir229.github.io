# Blog

Operational spec for writing a blog post. Open this file every time you write or refresh a post.

Tone and brand-voice principles live in [BRAND.md](BRAND.md). Strategy (pillars, cadence, distribution, agent plan) lives in [BLOG_STRATEGY.md](BLOG_STRATEGY.md). This file owns *how to write the post itself*: depth tiers, structure, frontmatter, images, checklist.

---

## 1. The voice (in one line)

**Thought leadership with delivery receipts.** Every claim anchored in something you built, broke, or watched fail. Specific tools, specific numbers, specific moments.

For the full voice rules, sentence patterns, and forbidden words: read [BRAND.md section 5](BRAND.md#5-voice-and-tone-applies-to-every-surface). This document treats those rules as inherited and does not repeat them.

Things specific to blog voice that are *not* covered in BRAND.md:

- **Conversational but not casual.** No "in this blog post I will discuss." No "feel free to reach out." No "hope this helped."
- **No tutorial framing** as the spine of a post. Step-by-step "1. Open Databricks. 2. Click Compute." is documentation, not thought leadership. Steps may live *inside* a named framework component, but never carry the post.
- **No documentation-mode capability tables** or parameter exhaustion.

---

## 2. Two depth tiers

Every post declares its tier in frontmatter. The tier dictates length, structure depth, and how heavy the technical content gets. The voice never switches.

### Tier A: Flagship Strategic

| Field | Value |
|---|---|
| Length | 1,200 to 1,800 words |
| Purpose | LinkedIn-shareable brand-defining piece. State an opinion, defend it with one named framework, end with a question. |
| Technical content | Avoid code blocks. One conceptual or architecture image is welcome. |
| Audience | Recruiter scanning, consulting prospect on LinkedIn, senior practitioner deciding whether to read further. |
| Cadence target | ~1 per month |

### Tier B: Technical Deep Dive

| Field | Value |
|---|---|
| Length | 2,500 to 3,500 words |
| Purpose | Companion piece that proves a strategic claim with implementation detail. |
| Technical content | SQL, DAX, Python, schema, refresh logic, code blocks all welcome — but always inside a named framework component, never as the spine. |
| Audience | Peer engineer, architect evaluating an approach, someone considering the same architecture choice. |
| Cadence target | 1 to 2 per quarter |

A Technical Deep Dive still opens with a vivid hook, still states a thesis, still names its framework, still closes with a question. The voice never switches.

---

## 3. Post structure (mandatory seven parts)

The labels below are scaffolding, not section headings the reader sees. Some are unmarked transitions in prose.

### 1. Hook (first 3 paragraphs)

Open with a specific scene the reader has lived. Not an abstract problem statement.

**Good:**
> "At Shahid (MBC Group), the conflict showed up clearly during a quarterly review. A churn prediction model flagged roughly 15,000 subscribers as at-risk for the upcoming period. The churn dashboard, which the business team had relied on for months, showed about 12,000."

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

One or two paragraphs on the industry trend, technology shift, or market force that makes this topic urgent. Name specific tools, companies, market movements. This is where web-grounded external claims live (cite them per the Rewrite Workflow in `BLOG_STRATEGY.md`).

### 4. The named framework (body of the post)

A model with 3 to 6 components, given a memorable name. Each component gets:

- **What it is** (1 to 2 sentences)
- **Why it matters** (business impact)
- **What goes wrong without it** (concrete failure mode, ideally one you have lived)
- **Optional**: specific tools or patterns. In Technical Deep Dives, code blocks or schema live here.

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

At least one framework component, hook example, or stake should anchor in MENA / Arabic-OTT / Shahid. The defensible differentiator is delivery experience in a niche no generic consultant can fake. Surface it.

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
- "Reach out if you want to talk through your stack." (Belongs in the author bio block at the bottom of the post.)

---

## 4. Frontmatter

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

**Categories** (must match one of these — defined in [src/data/categories.ts](../src/data/categories.ts)):
Data Engineering · BI & Analytics · Data Science · AI & Automation · Data Governance · Data Modeling · Career

A post can have more than one category. Most have one.

**Pillar tagging**: not enforced in frontmatter today. Strategic pillar mapping lives in [BLOG_STRATEGY.md](BLOG_STRATEGY.md) (governed-data, applied-ai, bi-to-ai). When the agent project ships and needs pillar metadata, add a `pillar` field via [src/content.config.ts](../src/content.config.ts).

---

## 5. Author bio + soft CTA (every post)

Every post ends with this block, immediately after the closing question. Source-of-truth is markdown so the block survives copy-paste to LinkedIn and Medium.

```markdown
---

**Syed Aamir** is a Data & AI Solutions Engineer based in Dubai, building data foundations and applied AI for OTT streaming in the MENA region. Currently at Shahid (MBC Group). Previously delivered enterprise BI across automotive, retail, and financial services with Beinex, Al-Futtaim Technologies, and Scan Technology.

If your team is working through a similar problem, [start a conversation](https://mail.google.com/mail/?view=cm&fs=1&to=saamir259@gmail.com&su=Project%20inquiry) or [connect on LinkedIn](https://www.linkedin.com/in/syedaamiruddin/).
```

The bio paragraph is a credibility block: named employers, niche positioning, role. The CTA is one short sentence. No "let's talk." No exclamation marks. No emoji.

Where a post has a related project case study, add one more line *above* the bio block:

```markdown
> Related case study: [Title](/projects/slug/)
```

If you are refreshing an older post that has a "Let's Talk" admonition box at the bottom, replace it — do not stack on top of it.

---

## 6. LinkedIn excerpt

Every flagship post ships with a LinkedIn excerpt baked into a working note (one day this will be a frontmatter field; today it lives alongside the post in the author's workflow). The blog post is the canonical destination; the excerpt is the surface that drives traffic.

### Template

```
[Hook scene — 2 to 3 short paragraphs. Specific people, specific numbers, specific moment. Stop before the thesis.]

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

### When to generate

- **Always**: one architecture or framework diagram per Flagship Strategic post that introduces a new named framework. Position: between hook+thesis and the framework section.
- **Sometimes**: one architecture diagram per Technical Deep Dive when the system has 4+ moving parts. The semantic-series posts already have working SVG diagrams at `public/assets/blog/semantic-series-0[1-6]-*.svg` — reuse, do not regenerate.
- **Never**: stock photography, AI-generated humans, decorative banners, generic icons-grid layouts.

### Brand-aligned image style

For the full palette and rules, refer to [BRAND.md](BRAND.md). Short version:

| Constraint | Value |
|---|---|
| Background | navy-950 (`#050B14`). Never `#000000`, never warm-brown, never white. |
| Primary accent | cyan-500 (`#06B6D4`). One dominant accent per image. |
| Text in image | Inter or close equivalent. cream-100 (`#E2E8F0`). |
| Texture | Subtle. Schematic / architectural / blueprint feel. |
| Forbidden | Glassmorphism, gradient meshes as primary surface, neon, white backgrounds, serif typefaces, photorealistic humans. |

### Aspect ratios

| Use case | Aspect | Resolution |
|---|---|---|
| Inline architecture diagram | 16:9 | 1920×1080 |
| Hero / OG card (per-post) | 1.91:1 | 1200×630 |
| Inline concept illustration | 4:3 or 1:1 | 1600×1200 or 1200×1200 |

### Generation via Gemini

Key stored as `GEMINI_API_KEY` in `.env` at the portfolio repo root (gitignored). Generation pattern:

```bash
source .env

curl -s \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent" \
  -d @prompt.json \
  -o response.json

python3 -c "
import json, base64
data = json.load(open('response.json'))
img = data['candidates'][0]['content']['parts'][0]['inlineData']['data']
open('public/assets/blog/<slug>-<image-name>.png', 'wb').write(base64.b64decode(img))
"
```

`prompt.json`:

```json
{
  "contents": [{
    "parts": [{
      "text": "<your prompt here>"
    }]
  }],
  "generationConfig": {
    "responseModalities": ["IMAGE"]
  }
}
```

### Prompt template (architecture diagrams)

```
A schematic architecture diagram on a deep navy background (#050B14), showing [N] horizontally arranged components labeled [Component A, Component B, ...].

Each component is a softly outlined card with a faint cyan border (#06B6D4) and a cyan-accent label in a sans-serif typeface (Inter or similar). Connections between components are thin cyan lines with arrowheads, indicating data flow from left to right.

Subtle film-grain texture across the background. No glassmorphism, no gradient meshes, no neon, no white, no humans, no serif type. 16:9 aspect ratio. Schematic and architectural in feel, like a precision-engineering blueprint, not a marketing illustration.

Specific labels:
- [Component A]: [one-line caption]
- [Component B]: [one-line caption]
- ...
```

Iteration budget: 5 to 10 generations per polished asset. Cost is fractions of a cent each; the friction is selection and iteration, not API spend.

### Saving and referencing

- File location: `public/assets/blog/<post-slug>-<image-name>.svg` (preferred) or `.png` (acceptable if the generator only produces raster).
- Markdown reference: `![Alt text describing the framework concretely](/assets/blog/<post-slug>-<image-name>.svg)`
- Italic caption directly below: `*One-sentence caption tying the image to the framework's main claim.*`

### Alt text

Describe the image's information content, not its appearance. "Architecture diagram showing the four-signal AVOD operating loop with inventory, impressions, VAST errors, and pacing pipelines feeding a shared semantic layer." Not "diagram with boxes and arrows."

---

## 8. Domain vocabulary

Default to MENA / Arabic-OTT / streaming examples when picking concrete illustrations:

- **Subscription**: subscriber, account, profile, trial, churn, reactivation, winback, plan tier, household
- **Content**: title, series, season, episode, movie, Shorts, content cluster, content hierarchy
- **Behavior**: viewing session, completion rate, playtime, watch hours, binge pattern, weekly trend, peak-hour ratio
- **Monetization**: AVOD impressions, SVOD revenue, ARPU, ad fill rate, VAST error categories, programmatic vs direct
- **Regional**: Ramadan release cycles, Arabic-language UX edge cases, MENA family-sharing norms, regional content licensing
- **Internal**: Bronze/Silver/Gold layers, Databricks, Delta Lake, SSAS Tabular, Power BI, CleverTap, FAISS, LangGraph, Genie spaces

Generic verticals (retail, fintech, SaaS) are acceptable for **"The Transferable Pattern"** sections — one paragraph at most — to signal applicability without diluting the niche positioning.

---

## 9. Pre-publication checklist

Before any post ships (rewrite, refresh, or new), it must pass:

- [ ] Hook is a specific scene with people, numbers, or a moment (not an abstract statement).
- [ ] Standalone thesis paragraph appears at or near paragraph 4.
- [ ] Framework has a name with weight (not "Approach" or "Methodology").
- [ ] Each framework component has *what / why / failure-mode* coverage.
- [ ] Prioritization section ("What I'd actually do first") is explicit.
- [ ] Closing question challenges the reader's current approach.
- [ ] At least one MENA / Arabic-OTT / Shahid-anchored example in the body.
- [ ] Zero em-dashes (`—`) and zero double-hyphen substitutes (`--`) in prose. Code-block `--` SQL comments are exempt.
- [ ] No emoji.
- [ ] No filler words: "basically", "essentially", "it's worth noting that".
- [ ] Frontmatter complete: title, date, description, categories, draft. Series fields if applicable.
- [ ] Author bio + CTA block at the bottom (see section 5).
- [ ] LinkedIn excerpt drafted in working notes if Flagship Strategic.
- [ ] If an image is included, it is brand-aligned, has an italic caption, and has information-content alt text.
- [ ] Word count matches the declared depth tier (1,200 to 1,800 for flagship, 2,500 to 3,500 for deep-dive).
- [ ] `npm run build` passes.
- [ ] `/blog/<slug>/` renders correctly at desktop and mobile widths.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Pillars, cadence, distribution, agent plan**: [BLOG_STRATEGY.md](BLOG_STRATEGY.md).
- **Category enum (source of truth)**: [src/data/categories.ts](../src/data/categories.ts).
- **Content schema**: [src/content.config.ts](../src/content.config.ts).
