# Blog Strategy

Strategic spine of the blog. Covers positioning, content pillars, editorial cadence, distribution, packaging, the rewrite workflow, and the planned blog writing agent.

You do not open this file every time you write a post. You open it when you are deciding *what* to write next, *where* a post should land, or *how* the blog connects to the rest of the brand.

Per-post operational spec lives in [BLOG.md](BLOG.md). Brand identity and voice principles live in [BRAND.md](BRAND.md).

---

## 1. Brand positioning for the blog

> **Primary aim**: build personal authority that converts to AI-consulting inbound, with LinkedIn as the primary engagement channel and the MENA / Arabic-OTT niche as the defensible positioning angle.

**Why this over alternatives:**

- Recruiter signals come free from strong thought leadership. No separate strategy required.
- Pure "authority without commercial endpoint" produces nice essays that feed nothing. The planned AI consulting / course business needs a top-of-funnel.
- Pure "lead-gen without a niche" forces competition against every Databricks consultant on Earth. MENA / Arabic-OTT data and AI is a niche where delivery experience is defensible.
- LinkedIn over SEO because B2B AI consulting in MENA happens through warm intros and trust, not Google search.

**Practical implications baked into the rest of this document:**

- Every flagship post ships with a LinkedIn excerpt (see [BLOG.md section 6](BLOG.md#6-linkedin-excerpt)).
- Every post ends with the standard author bio + soft consulting CTA block.
- MENA / Arabic-OTT framing is structural in posts about delivered work, not background colour.
- Content pillars below map cleanly to future consulting service lines.

---

## 2. Content pillars

Three pillars. Every post should map to exactly one. Pillars are deliberately tied to consulting service lines that the future AI business site will offer.

### Pillar 1: `governed-data` — Governed Data Foundations

- **Theme**: the infrastructure layer that makes AI possible. Semantic layers, KPI governance, data modeling, BI modernization, refresh and reliability operations.
- **Why it is a pillar**: the most defensible work on the resume (35% maintenance reduction, 40% adoption lift, 100+ shared measures, zero disruption) and the layer most teams skip on their way to "AI." It is also where consulting engagements typically start — nobody hires you for AI if their data layer is on fire.
- **Future service line**: data foundation diagnostics, semantic-layer build-outs, governance design, refresh-and-reliability engineering.

### Pillar 2: `applied-ai` — Applied AI at Platform Scale

- **Theme**: production AI that ships. Voice-of-customer NLP, CRM automation, audience enrichment, GenAI / RAG / agent workflows running daily on a real platform.
- **Why it is a pillar**: the differentiator from generic BI consultants — proof that the data foundation is wired into AI workflows that actually move metrics. Voice-of-Customer (Genie spaces + LangGraph + FAISS) is current; that is uncommon enough to lead with.
- **Future service line**: production GenAI architecture, voice-of-customer platforms, scenario-engine CRM automation, model-to-activation pipelines.

### Pillar 3: `bi-to-ai` — From BI to AI (career / org-maturity perspective)

- **Theme**: how analytics organizations actually evolve. Personal career arc, BI-to-DS transitions, role evolution, organizational data maturity, leadership perspective on team design.
- **Why it is a pillar**: the LinkedIn-engagement pillar. Personal narrative pieces and "what changed for me" reflections are the most-shared content on LinkedIn for individual practitioners. They are also where prospects form a first impression of judgment, not just delivery.
- **Future service line**: advisory, fractional engagements, course content for the AI business site, speaking and writing engagements.

### Pillar balance over time

The `applied-ai` pillar is the thinnest relative to its strategic importance. Future posts should weight toward this pillar — see editorial calendar shape below.

---

## 3. Editorial calendar shape

Not a fixed schedule. A pattern.

- **One Flagship Strategic post per month**, rotating across pillars, with `applied-ai` getting two of every four slots until the pillar reaches parity.
- **One or two Technical Deep Dives per quarter**, typically a series refresh or a new platform post.
- **No mandatory cadence on `bi-to-ai`**: these post when there is a genuine reflection to surface, not on a calendar.

The blog is a flywheel, not a publication. Quality over cadence. A single strong Flagship Strategic post per month, posted on LinkedIn with a credible excerpt, will outperform four mediocre posts published weekly.

---

## 4. Cross-posting plan

**LinkedIn = primary. Medium = secondary. Dev.to = deferred.**

### LinkedIn (primary)

- **Format**: post the LinkedIn excerpt from working notes directly as a LinkedIn long-form post.
- **Link placement**: the canonical blog URL goes at the bottom of the post. LinkedIn deprioritizes external links in the body; bottom placement gets better reach.
- **Hashtags**: 3 to 5 max, in a comment below the post or at the very bottom. Examples per pillar:
  - `governed-data`: `#DataEngineering #SemanticLayer #DataGovernance #PowerBI #MENATech`
  - `applied-ai`: `#GenAI #LLMOps #Databricks #NLP #MENATech`
  - `bi-to-ai`: `#DataScience #AnalyticsEngineering #CareerInTech #MENATech`
- **Engagement comment**: pin one comment with a one-line summary of the closing question from the post body. Pulls discussion into the thread rather than evaporating it on the blog.
- **Timing**: Tuesday or Wednesday morning Dubai time (best B2B reach in MENA + Europe overlap).
- **Audience tagging**: no tag-bombing. Tag at most one or two specific people if the post directly engages with their published work.

### Medium (secondary)

- **Format**: full repost of the blog content. Use Medium's import-from-URL feature where possible.
- **Canonical URL**: always set canonical to the blog URL on syedaamir229.github.io. Medium honors `rel=canonical` for SEO.
- **Cadence**: Medium reposts are slower than LinkedIn. Do not block on Medium — repost within a week, not the same day.
- **Publications**: target one Medium publication per pillar where appropriate (e.g., *Towards Data Science* for `applied-ai`, *Better Programming* for `governed-data`). Submission is best-effort; do not delay original publication on the blog.

### Dev.to (deferred)

Skip until at least the AI business site launches. Audience overlap with the consulting target is weak; cross-posting toll is real.

---

## 5. Semantic Layer Series packaging

The six-part semantic-layer series is the highest-leverage `governed-data` asset. Packaging it as a flagship resource (instead of six standalone search results) signals depth, ownership, and senior-practitioner thinking.

Today: each part lives at `src/content/blog/semantic-layer-0[1-6]-*.md` and uses the `series` and `series_part` frontmatter fields. The post layout shows a "Part N of M" badge and prev/next navigation automatically (see [src/components/blog/SeriesNav.astro](../src/components/blog/SeriesNav.astro)).

Future packaging work (when blog volume justifies it):

- **Series landing page** at `/blog/series/semantic-layer/` showing:
  - Hero block summarizing the series with a one-line abstract per part.
  - "Read in order" sequential navigation.
  - Down-the-page TOC linking to each part.
  - A single closing CTA: "Get the full PDF" (deferred to AI business site / newsletter launch).
- **Frontmatter wiring**: already in place for all six parts.

---

## 6. Author bio + soft CTA placement

The shape and copy of the bio block is the source of truth in [BLOG.md section 5](BLOG.md#5-author-bio--soft-cta-every-post). Where:

- **Position**: bottom of every post, immediately after the closing question.
- **Promotion to a component**: optional. If [src/components/blog/AuthorBio.astro](../src/components/blog/) is created later, the markdown shape stays the source of truth so LinkedIn and Medium reposts render correctly.

---

## 7. Newsletter decision

**Defer until the AI business site launches.** Do not stand up a newsletter on the portfolio.

**Reasoning:**

- An empty list is worse than no list. The first 50 to 100 subscribers come from already-engaged LinkedIn followers; until that following exists, a signup form converts at near zero.
- Newsletter infrastructure (Buttondown, Substack, ConvertKit, Beehiiv) introduces a third surface to maintain alongside the blog and LinkedIn.
- The AI business site is the natural home for an owned email list. Migrating engaged readers from LinkedIn → blog → business-site newsletter is a cleaner funnel than tying it to the personal portfolio.

**What to do instead until then:**

- Build the LinkedIn following. Every post drives connections, every closing question drives DM conversations.
- Use the consulting-inquiry CTA at the bottom of each post as the de-facto subscription mechanism. People who actually want to hear from you will email.

**Trigger to revisit**: at the same time the AI business site launches, migrate engaged readers via a one-time LinkedIn announcement + portfolio-blog banner pointing to the new newsletter on the business site.

---

## 8. Rewrite workflow

Eight steps. Whether a human or the future agent executes the workflow, the steps and their order do not change.

### Step 1: Read all source material

- The current portfolio version at `src/content/blog/<slug>.md`.
- The MkDocs migration source at `~/Repositories/Personal/mkdocs-website/docs/blog/posts/<slug>.md`.
- The matching authoritative PDFs at `~/Repositories/Personal/mkdocs-website/sources/`:
  - AVOD posts → `AVOD Pipeline.pdf`
  - Semantic-layer posts → `Semantic Layer.pdf`
  - Voice-of-Customer post → `Enigma/` folder (5 PDFs)
  - CRM-automation post → `Jarvis/` folder (5 PDFs)
  - Attribute-inference post → `Data Science/Gender Prediction Model.pdf`, `Profile Features/Profile Features - Business Guide.pdf`, `Profile Features Pipeline - Technical Documentation.pdf`
  - Data-model post → `Data Model 2.0.pdf`
  - Career posts → `career-timeline.md`, `SYED AAMIR.pdf`, `Syed Aamir_CV.pdf`

### Step 2: Build a fact ledger

A short bulleted list extracted from the sources: every number, tool name, architecture detail, date, role, decision. Keep this in working notes — it is the source of truth for the rewrite.

### Step 3: Identify external claims

Mark any claim in the planned rewrite that goes beyond personal delivery: industry adoption stats, vendor benchmarks, market size, comparisons to other companies' approaches, recent thinking from named practitioners. These are the claims that need step 4.

### Step 4: Web-search and cite

For each external claim, run a targeted web search. Cite inline using markdown links to authoritative sources (vendor docs, named analysts, recent benchmark reports). Do not bulk-cite — every citation should be load-bearing.

**Search directions by post topic:**

- `bi-to-ai-journey` → BI-to-ML career arc reports, dbt analytics-engineering surveys, "AI engineer" job description evolution.
- `voice-of-customer-intelligence` → Databricks Genie space launch case studies, LangGraph supervisor patterns, comparable voice-of-customer platforms.
- `scalable-data-model` → Kimball/Inmon framing in lakehouse era, dbt entity-modeling best practices, "data model as product" thinking.
- `ai-crm-automation` → CRM-team-to-analyst handoff benchmarks, CleverTap/Braze MENA adoption, self-serve audience patterns.
- Semantic-layer series → dbt Semantic Layer adoption, Cube.dev/AtScale benchmarks, metric-drift cost data from Atlan/Castor.
- `gender-prediction-model-in-practice` → attribute inference vs declared data (post-iOS-14 ad-targeting policy shifts), MENA profile-completion benchmarks, inferred-attribute governance literature.
- `avod-revenue-pipeline-and-alerting` → IAB VAST error taxonomy, GAM late-attribution behavior, MENA AVOD market post-2022 shifts.
- `bi-modernization-lessons` → Tableau-to-Power BI migration benchmarks, Gartner BI-modernization timeline data.

### Step 5: Draft against the voice doc

Open [BLOG.md](BLOG.md). Pick the depth tier. Write the post following the seven-part structure (hook, thesis, context, named framework, prioritization, domain anchor, closing question). Use the fact ledger from step 2 for every numeric claim. Use the citations from step 4 for every external claim.

### Step 6: Generate images (if needed)

If the post is Flagship Strategic and introduces a new named framework, generate one architecture or conceptual image via the Gemini pattern in [BLOG.md section 7](BLOG.md#7-images). Save to `public/assets/blog/<slug>-<name>.svg` (preferred) or `.png`. Iterate 5 to 10 generations. Commit only the final selection. Reuse existing SVGs at `public/assets/blog/semantic-series-0[1-6]-*.svg` for the semantic-series posts.

### Step 7: Produce cross-post versions

- Draft the LinkedIn excerpt following the template in [BLOG.md section 6](BLOG.md#6-linkedin-excerpt).
- (Optional) Note any tweaks needed for Medium import. Usually none; the post should be Medium-ready as-is with a canonical-URL tag.

### Step 8: Run the pre-publication checklist

Walk through every item in [BLOG.md section 9](BLOG.md#9-pre-publication-checklist). Do not ship until every box is checked.

---

## 9. Blog writing agent (planning sketch)

The blog writing agent is a separate project, in its own repository, to be built once the rewrite workflow above is well-understood from a few human-executed posts. **This section is the planning sketch; implementation is a future session.**

### Goal

A thin agent that reads [BLOG.md](BLOG.md) + a brief, then drafts a Flagship Strategic or Technical Deep Dive post following the rewrite workflow above. Outputs a PR against the portfolio repo with a complete post (frontmatter + body + image + LinkedIn excerpt).

### Why thin, not autonomous

The voice is the product. The agent should follow the voice doc as a spec, not reinterpret it. Autonomy in voice produces drift; autonomy in execution (fact-checking, image generation, cross-post formatting) produces leverage.

### Inputs

- **Brief**: title (or topic), pillar (`governed-data` | `applied-ai` | `bi-to-ai`), depth tier (`flagship` | `deep-dive`), target word count, source-material pointers (project case-study path, internal PDF path, external articles).
- **Voice spec**: [BLOG.md](BLOG.md) (this is the prompt-context anchor).
- **Brand context**: [BRAND.md](BRAND.md) (for image generation style and tone rules).

### Architecture sketch

```
agent loop:
  1. read brief + BLOG.md + BRAND.md
  2. read source materials (markdown + PDFs)
  3. build fact ledger (step 2 of workflow)
  4. identify external claims (step 3)
  5. for each external claim: web-search, pick best source
  6. draft post following 7-part structure
  7. self-check against pre-publication checklist
  8. if checklist fails: iterate
  9. generate image via Gemini if required
 10. draft LinkedIn excerpt
 11. emit markdown file + image + open PR
```

### Out of scope for v1

- Choosing topics. The brief is human-supplied.
- Reinterpreting voice. The voice doc is the spec; deviation is a bug.
- Publishing. Output is a PR; merge is human.
- Cross-posting execution. The agent ships the excerpt; the human posts to LinkedIn.

### Tools needed

- Read access to the portfolio repo and the mkdocs-website source repo.
- PDF text extraction for the `sources/` folder.
- Web search with citation extraction.
- Gemini API access for image generation (key in `.env`).
- GitHub PR creation (gh CLI or API).

### Tracking the work

Open a separate `BLOG_AGENT_PLAN.md` in the (future) agent repo at the time of kickoff. This section is the seed, not the full spec.

---

## 10. What this strategy does not commit to

- Specific publication dates for upcoming posts. Cadence is a pattern, not a calendar.
- A specific newsletter platform. Deferred.
- A specific Medium publication submission strategy. Best-effort.
- A LinkedIn posting cadence beyond "after each rewrite ships." The rewrite cadence drives the LinkedIn cadence.
- Implementation of the series landing page or an `<AuthorBio />` component. Both are nice-to-have when the blog volume justifies them.

---

## Cross-references

- **Per-post writing spec**: [BLOG.md](BLOG.md).
- **Identity and voice principles**: [BRAND.md](BRAND.md).
- **Site-wide landing copy spec**: [SITE.md](SITE.md).
- **Project case study spec**: [PROJECTS.md](PROJECTS.md).
