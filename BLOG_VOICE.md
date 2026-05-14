# Blog Voice and Structure

Voice, structure, and image rules for the Syed Aamir blog. Replaces `BLOG_GUIDELINES.md` (preserved as `BLOG_GUIDELINES.legacy.md`).

This document is the spec for every post — human-written or agent-written. It is also the rubric the audit in `BLOG_AUDIT.md` was scored against.

---

## 1. Voice (one voice across every post)

All posts use one voice: **thought leadership with delivery receipts**. Not memoir, not tutorial, not documentation. The voice is the same whether a post is 1,400 words on positioning or 3,200 words on architecture.

### What the voice sounds like

- **Authoritative but grounded.** Every claim is anchored in something you built, broke, or watched fail.
- **Specific.** Real tools (CleverTap, Databricks, FAISS, SSAS), real numbers (9.5M profiles, 35% maintenance reduction, 22.7% to 100% coverage), real moments (the Slack thread, the reconciliation meeting, the missed-day incident).
- **Opinionated.** A thesis someone could disagree with. Not "many teams struggle" — say who, why, and what they should do instead.
- **Business-impact framing.** Not "this is how the system works" but "this is what the system unlocked, and what it cost to get there."
- **Conversational but not casual.** No filler. No "in this blog post I will discuss." No "feel free to reach out."

### What the voice never does

- Tutorial step-by-step framing as the spine of a post ("Step 1: Open Databricks").
- Documentation-mode capability tables and parameter exhaustion.
- Safe hedging: "might," "could potentially," "perhaps."
- Marketing words: "cutting-edge," "revolutionary," "game-changing," "next-generation."
- Em-dashes (real or substitute). No `—`. No `--`. Use colons, periods, or restructure.
- Emoji.
- Closing CTAs like "hope you found this useful" or "feel free to reach out."

---

## 2. Two depth tiers (same voice, different shape)

Every post declares its tier in frontmatter. The tier dictates length, structure, and how heavy the technical content gets — never the voice.

### Tier A: Flagship Strategic

- **Length**: 1,200 – 1,800 words.
- **Purpose**: LinkedIn-shareable brand-defining pieces. State an opinion, defend it with one named framework, end with a question.
- **Technical content**: Avoid code blocks. Brand-aligned conceptual or architecture images are welcome (one per post max).
- **Audience**: Recruiter scanning. Consulting prospect on LinkedIn. Senior practitioner deciding whether to read more.
- **Cadence target**: One per month.

### Tier B: Technical Deep Dive

- **Length**: 2,500 – 3,500 words.
- **Purpose**: Companion pieces that prove a strategic claim with implementation detail.
- **Technical content**: SQL, DAX, Python, schema, refresh logic — but always inside a named framework component, never as the spine.
- **Audience**: Peer engineer. Architect evaluating. Someone considering the same architecture choice.
- **Cadence target**: One or two per quarter.

A Technical Deep Dive still opens with a vivid hook, still states a thesis, still names its framework, still closes with a question. The voice never switches.

---

## 3. Post structure (mandatory)

Every post follows this seven-part structure. The labels are not section headings the reader sees — they are scaffolding.

### 1. Hook (first 3 paragraphs)
Open with a specific scene the reader has lived. Not an abstract problem statement.

**Good — drawn from `bi-to-data-science-bridge-patterns`:**
> "At Shahid (MBC Group), the conflict showed up clearly during a quarterly review. A churn prediction model flagged roughly 15,000 subscribers as at-risk for the upcoming period. The churn dashboard, which the business team had relied on for months, showed about 12,000."

**Weak — drawn from `semantic-layer-02-architecture-and-data-flow`:**
> "A semantic layer only works if architecture boundaries are clear. Many implementations fail because they mix data engineering responsibilities, metric engineering responsibilities, and report development responsibilities in one place."

The first is a scene with people, numbers, and a moment. The second is a statement of generic principle. Always write the first.

### 2. Bold thesis (paragraph 4)
A standalone paragraph that states an opinion with teeth. Someone could disagree.

**Good — drawn from `scalable-data-model`:**
> "The fix was not a dashboard or a new tool. It was a shared, governed data layer that every downstream consumer could trust."

**Weak — drawn from `semantic-layer-04-governance-and-deployment`:**
> "A semantic layer can still fail after launch if governance and deployment are weak."

The first commits to a position. The second states a generic possibility.

### 3. Context: why this matters now
One or two paragraphs on the industry trend, technology shift, or market force that makes this topic urgent. Name specific tools, companies, market movements. This is where web-grounded external claims live — see Rewrite Workflow in `BLOG_STRATEGY.md`.

### 4. The named framework (body)
A model with 3-6 components, given a memorable name. Each component gets:
- **What it is** (1-2 sentences).
- **Why it matters** (business impact).
- **What goes wrong without it** (concrete failure mode, ideally one you have lived).
- **Optional**: specific tools or patterns. In Technical Deep Dives, code blocks or schema live here.

**Good framework names — to follow:**
- "The Voice-of-Customer Stack" (for the Enigma rewrite)
- "The Compounding Stack" (for the BI-to-AI journey rewrite)
- "The Five Rules of a Compounding Data Model" (for the scalable-data-model rewrite)
- "The Three-Layer DAX Stack" (semantic-layer-03)
- "The Three-Phase Migration Sequence" (bi-modernization-lessons)

**Weak — what to avoid:**
- "Approach" or "Methodology" as a section heading with no framework name.
- Numbered lists of practices with no container concept.
- "Lessons learned" with no overarching name.

### 5. Prioritization: "What I'd actually do first"
After the framework, tell the reader where to start and why. This is the section that gets bookmarked and screenshot-ed. One paragraph minimum.

### 6. Domain anchor (at least one component)
At least one framework component, hook example, or stake should anchor in MENA / Arabic-OTT / Shahid. The brand differentiator is that you have delivery experience in a niche no generic consultant can fake. Surface that. Examples: Ramadan-flavored release cycles, Arabic NLP edge cases, MENA streaming household-sharing dynamics, AVOD market shifts in the region.

For posts where the domain is genuinely incidental (pure career narrative, pure technical pattern), one MENA-flavored sentence is enough. For posts about delivered work, MENA context should be structural.

### 7. Closing question
End with a question that challenges the reader's current approach. Not a CTA. Not "hope this helped." A question they cannot answer without thinking.

**Good closing questions — write to this bar:**
- "Is your data model a project that ended, or infrastructure that compounds?"
- "Your feedback data is either an asset you can query or a queue your analysts work down. Which one is yours?"
- "Is your stack compounding, or restarting every two years?"
- "Are your model numbers explainable from your dashboard, or are they a parallel reality?"

**Weak closes — to remove from existing posts:**
- "Hope this helped."
- "For the full case study, see..."
- "Reach out if you want to talk through your stack." (This belongs in the author bio block below — not the post body.)

---

## 4. Frontmatter schema (updated)

```yaml
---
title: "Clear, specific, opinionated title"
date: YYYY-MM-DD
description: "One-sentence summary that works as a LinkedIn preview."
categories: ["One Category"]
tags: ["Tag1", "Tag2", "Tag3"]
depth: flagship          # flagship | deep-dive
pillar: governed-data    # governed-data | applied-ai | bi-to-ai (see BLOG_STRATEGY.md)
featured: false
draft: false

series: semantic-layer   # optional, only for posts in a series
series_part: 1           # optional, only for posts in a series

linkedin_excerpt: |
  Three short paragraphs ready to paste into a LinkedIn post.
  First paragraph = the hook scene.
  Second paragraph = the thesis or named framework headline.
  Third paragraph = a one-line preview of the prioritization, ending with "Full piece on the blog ↓"
---
```

**Categories** (pick one):
Data Engineering · BI & Analytics · Data Science · AI & Automation · Data Governance · Career

**Pillars** (pick one — see `BLOG_STRATEGY.md` for definitions):
`governed-data` · `applied-ai` · `bi-to-ai`

**Tags**: free-form. Use specific technologies and concepts: Databricks, Power BI, Semantic Layer, DAX, NLP, CRM Automation, GenAI, Arabic NLP, Delta Lake, FAISS, LangGraph.

---

## 5. The author bio + soft CTA block (every post)

Every post ends with this block, immediately after the closing question. The block is a consistent markdown snippet — Phase 5 may convert it to a reusable Astro component, but the source-of-truth is this markdown shape so the agent (and human authors) can copy-paste it.

```markdown
---

**Syed Aamir** is a Data & AI Solutions Engineer based in Dubai, building data foundations and applied AI for OTT streaming in the MENA region. Currently at Shahid (MBC Group). Previously delivered enterprise BI across automotive, retail, and financial services with Beinex, Al-Futtaim Technologies, and Scan Technology.

If your team is working through a similar problem, [start a conversation](https://mail.google.com/mail/?view=cm&fs=1&to=saamir259@gmail.com&su=Project%20inquiry) or [connect on LinkedIn](https://www.linkedin.com/in/syedaamiruddin/).
```

The bio paragraph is intentionally a credibility block — named employers, niche positioning, role. The CTA is one short sentence: "If your team is working through a similar problem." No "let's talk." No exclamation marks.

Where a post has a related project case study, add one more line *above* the bio block:
```markdown
> Related case study: [Title](/projects/slug/)
```

Replace, do not stack on top of, existing closing CTA boxes in current posts.

---

## 6. LinkedIn excerpt block

Every post ships with a LinkedIn excerpt baked into frontmatter (see section 4). This is what gets pasted as a LinkedIn post when the blog goes live. The blog post itself is the canonical destination.

### LinkedIn excerpt template

```
[Hook scene — 2-3 short paragraphs. Specific people, specific numbers, specific moment. Stop before the thesis.]

[One-line thesis or framework headline. Make it screenshot-able.]

[One-line preview of the prioritization or the named framework's first component.]

Full piece on the blog ↓
[link]
```

**Format rules for the LinkedIn excerpt:**
- 8-12 short lines total, one idea per line.
- No hashtags in the excerpt itself (LinkedIn pulls hashtags poorly when reposting; add them below the link if you want).
- No emoji. The downward arrow `↓` is acceptable as the only non-text character because it does meaningful work pointing at the link.
- No em-dashes.
- The "scene" portion should be ~70% of the excerpt. The framework headline and prioritization preview should be tight.

### Excerpt example (for the planned rewrite of `enigma-voice-of-customer-intelligence`)

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

## 7. Image generation rules

Images are not decorative. Every image earns its place. Default position: no image. Add one only when it carries weight.

### When to generate an image

- **Always**: one architecture or framework diagram per Flagship Strategic post that introduces a new named framework. Goes between hook+thesis and the framework section.
- **Sometimes**: one architecture diagram per Technical Deep Dive when the system has 4+ moving parts. The semantic-series posts already have working SVG diagrams at `public/assets/diagrams/semantic-series-0[1-6]-*.svg` — reuse, do not regenerate.
- **Never**: stock photography, AI-generated humans, decorative banners, generic icons-grid layouts.

### Brand-aligned image style (from `BRAND_GUIDE.md`)

| Constraint | Value |
|---|---|
| Background | Warm carbon (`#0F0E0B` to `#1A1714`). Never blue-black, never `#000000`. |
| Primary accent | Copper (`#C87533`). One dominant accent per image. |
| Secondary accent | Sage (`#8FAF8B`) sparingly, never competing with copper at the same hierarchy level. |
| Text in image | Space Grotesk (or close equivalent). Cream (`#F0EDE8`). |
| Texture | Subtle. Avoid flat digital feel. Architectural / schematic / blueprint aesthetic. |
| Forbidden | Glassmorphism, gradient meshes as primary surface, electric blue / neon, white backgrounds, serif typefaces, photorealistic humans. |

### Aspect ratios

| Use case | Aspect | Resolution |
|---|---|---|
| Inline architecture diagram | 16:9 | 1920×1080 |
| Hero / OG card (per-post) | 1.91:1 | 1200×630 |
| Inline concept illustration | 4:3 or 1:1 | 1600×1200 or 1200×1200 |

### Gemini nano banana generation pattern

The API key is stored as `GEMINI_API_KEY` in `.env` at the portfolio repo root (gitignored). Generation pattern (run from repo root, requires `jq` and `python3` for base64 decoding):

```bash
# 1. Load the key
source .env

# 2. Send the prompt
curl -s \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent" \
  -d @prompt.json \
  -o response.json

# 3. Decode the base64-encoded image into a PNG
python3 -c "
import json, base64
data = json.load(open('response.json'))
img = data['candidates'][0]['content']['parts'][0]['inlineData']['data']
open('public/assets/blog/<slug>-<image-name>.png', 'wb').write(base64.b64decode(img))
"
```

Where `prompt.json` looks like:

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

### Prompt template (for inline architecture diagrams)

```
A schematic architecture diagram on a warm carbon background (#0F0E0B), showing [N] horizontally arranged components labeled [Component A, Component B, Component C, ...].

Each component is a softly outlined card with a faint copper border (#C87533) and a copper-accent label in a sans-serif typeface (Space Grotesk or similar). Connections between components are thin copper lines with arrowheads, indicating data flow from left to right.

Subtle film-grain texture across the background. No glassmorphism, no gradient meshes, no neon, no white, no humans, no serif type. 16:9 aspect ratio. Schematic and architectural in feel, like a precision-engineering blueprint, not a marketing illustration.

Specific labels:
- [Component A]: [one-line caption]
- [Component B]: [one-line caption]
- ...
```

**Iteration budget**: 5-10 generations per polished asset. Cost is fractions of a cent each; the friction is selection and iteration, not API spend.

### Saving and referencing images

- File location: `public/assets/blog/<post-slug>-<image-name>.png`
- Markdown reference: `![Alt text describing the framework concretely](/assets/blog/<post-slug>-<image-name>.png)`
- Italic caption directly below in the markdown: `*One-sentence caption tying the image to the framework's main claim.*`

### Alt-text rules

Alt text describes the image's information content, not its appearance. "Architecture diagram showing the four-signal AVOD operating loop with inventory, impressions, VAST errors, and pacing pipelines feeding a shared semantic layer." — not "diagram with boxes and arrows."

---

## 8. Pre-publication checklist

Before any post is shipped (rewrite, refresh, or new), it must pass:

- [ ] Hook is a specific scene with people, numbers, or a moment (not an abstract statement).
- [ ] Standalone thesis paragraph appears at or near paragraph 4.
- [ ] Framework has a name with weight (not "Approach" or "Methodology").
- [ ] Each framework component has what / why / failure-mode coverage.
- [ ] Prioritization section ("What I'd do first") is explicit.
- [ ] Closing question challenges the reader's current approach.
- [ ] At least one MENA / Arabic-OTT / Shahid-anchored example in the body.
- [ ] Zero em-dashes (`—`) and zero double-hyphen substitutes (`--`) in prose. (Code blocks may contain `--` SQL comments; that is fine.)
- [ ] No emoji.
- [ ] No filler words: "basically," "essentially," "it's worth noting that."
- [ ] Frontmatter complete: title, date, description, categories, tags, depth, pillar, featured, draft, linkedin_excerpt, optional series/series_part.
- [ ] LinkedIn excerpt present in frontmatter, follows the 8-12-line shape.
- [ ] Author bio + CTA block at the bottom (see section 5).
- [ ] If an image is included, it is brand-aligned, has italic caption, and has information-content alt text.
- [ ] Word count matches the declared depth tier (1,200-1,800 for flagship, 2,500-3,500 for deep-dive).

---

## 9. Domain context (for examples and scenarios)

Default to MENA / Arabic-OTT / streaming examples when picking concrete illustrations:

- **Subscription**: subscriber, account, profile, trial, churn, reactivation, winback, plan tier, household
- **Content**: title, series, season, episode, movie, Shorts, content cluster, content hierarchy
- **Behavior**: viewing session, completion rate, playtime, watch hours, binge pattern, weekly trend, peak-hour ratio
- **Monetization**: AVOD impressions, SVOD revenue, ARPU, ad fill rate, VAST error categories, programmatic vs direct
- **Regional**: Ramadan release cycles, Arabic-language UX edge cases, MENA family-sharing norms, regional content licensing
- **Internal**: Bronze/Silver/Gold layers, Databricks, Delta Lake, SSAS Tabular, Power BI, CleverTap, FAISS, LangGraph, Genie spaces

Generic verticals (retail, fintech, SaaS) are acceptable for **The Transferable Pattern** sections — one paragraph at most — to signal applicability without diluting the niche positioning.

---

## 10. What changed from `BLOG_GUIDELINES.md`

| Change | Why |
|---|---|
| Two depth tiers formalized | Decision in `BLOG_STRATEGY.md`: one voice, two shapes. Was implicit before; now declarable in frontmatter and budgetable by tier. |
| Closing question is mandatory, not optional | Audit found zero of 15 posts had one. Rule has to be enforceable. |
| Framework must be named | Audit found unnamed step-lists everywhere. Named frameworks are what gets shared. |
| Domain anchor mandatory in body | The MENA / Arabic-OTT niche is the brand's defensible position; posts that ignore it dilute positioning. |
| Image generation rules added | Was unspecified before. Brand-aligned images are part of voice. |
| LinkedIn excerpt block added to frontmatter | Distribution channel is now LinkedIn-primary; every post ships with a ready excerpt. |
| Author bio + CTA block specified | Was inconsistent across migrated posts; now a single markdown shape. |
| Pre-publication checklist added | Audit will be run against this checklist for every future post. |
| `BLOG_GUIDELINES.md` preserved as `.legacy.md` | Historical context retained; the legacy file has a redirect note pointing here. |

---

*See `BLOG_AUDIT.md` for the strict audit of the existing 15 posts against this voice doc. See `BLOG_STRATEGY.md` for content pillars, editorial cadence, distribution plan, and the blog writing agent plan.*
