# Blog Strategy

Operating document for the Syed Aamir blog. Covers brand positioning, content pillars, editorial cadence, distribution, packaging, the rewrite workflow, and the planned blog writing agent.

Pairs with:
- `BLOG_VOICE.md` — voice, structure, image rules, pre-publication checklist.
- `BLOG_AUDIT.md` — strict per-post audit and top 5 rewrite priorities.
- `BRAND_GUIDE.md` — visual identity (warm carbon, copper accents, Space Grotesk, DM Sans).
- `UX_AUDIT.md` — three personas (recruiter, peer engineer, advisory prospect) the site serves.

---

## 1. Brand positioning for the blog

> **Primary aim**: Build personal authority that converts to AI-consulting inbound, with LinkedIn as the primary engagement channel and the MENA / Arabic-OTT niche as the defensible positioning angle.

**Why this over alternatives:**

- Recruiter signals come free from strong thought leadership. No separate strategy required.
- Pure "authority without commercial endpoint" produces nice essays that feed nothing. The planned AI consulting / course business (Phase 6) needs a top-of-funnel.
- Pure "lead gen without a niche" forces competition against every Databricks consultant on Earth. MENA / Arabic-OTT data and AI is a niche where delivery experience is defensible.
- LinkedIn over SEO because B2B AI consulting in MENA happens through warm intros and trust, not Google search.

**Practical implications baked into the rest of this document:**

- Every post ships with a LinkedIn excerpt (`linkedin_excerpt` in frontmatter, per `BLOG_VOICE.md` section 6).
- Every post ends with the standard author bio + soft consulting CTA block.
- MENA / Arabic-OTT framing is structural in posts about delivered work — not background colour.
- Content pillars (section 2) map cleanly to future consulting service lines.

---

## 2. Content pillars

Three pillars. Every post is tagged with exactly one via the `pillar` frontmatter field. The pillars are deliberately tied to consulting service lines that the future AI business site will offer.

### Pillar 1: `governed-data` — Governed Data Foundations
**Theme**: The infrastructure layer that makes AI possible. Semantic layers, KPI governance, data modeling, BI modernization, refresh and reliability operations.
**Why this is a pillar**: It is the most defensible work on the resume (35% maintenance reduction, 40% adoption lift, 100+ shared measures, zero disruption) and the layer most teams skip on their way to "AI." It is also where consulting engagements typically start — nobody hires you for AI if your data layer is on fire.
**Current post coverage**: 8 posts (scalable-data-model, all six semantic-layer parts, avod-revenue-pipeline-and-alerting, bi-modernization-lessons).
**Future service line**: Data foundation diagnostics, semantic-layer build-outs, governance design, refresh-and-reliability engineering.

### Pillar 2: `applied-ai` — Applied AI at Platform Scale
**Theme**: Production AI that ships. Voice-of-customer NLP, CRM automation, audience enrichment, GenAI / RAG / agent workflows running daily on a real platform.
**Why this is a pillar**: This is the differentiator from generic BI consultants — proof that the data foundation is wired into AI workflows that actually move metrics. Enigma (Genie spaces + LangGraph + FAISS) is current; that is uncommon enough to lead with.
**Current post coverage**: 3 posts (enigma-voice-of-customer-intelligence, ai-crm-automation, gender-prediction-model-in-practice).
**Future service line**: Production GenAI architecture, voice-of-customer platforms, scenario-engine CRM automation, model-to-activation pipelines.

### Pillar 3: `bi-to-ai` — From BI to AI (career / org-maturity perspective)
**Theme**: How analytics organizations actually evolve. Personal career arc, BI-to-DS transitions, role evolution, organizational data maturity, leadership perspective on team design.
**Why this is a pillar**: This is the LinkedIn-engagement pillar. Personal narrative pieces and "what changed for me" reflections are the most-shared content on LinkedIn for individual practitioners. They are also where prospects form a first impression of judgment, not just delivery.
**Current post coverage**: 3 posts (bi-to-ai-journey, bi-to-data-science-transition-story, bi-to-data-science-bridge-patterns).
**Future service line**: Advisory, fractional engagements, course content for the AI business site, speaking and writing engagements.

### Pillar balance check

After the top 5 rewrites in `BLOG_AUDIT.md`:
- governed-data: 9 posts (including the new flagship intro)
- applied-ai: 3 posts
- bi-to-ai: 3 posts

The `applied-ai` pillar is the thinnest relative to its strategic importance. Future posts should weight toward this pillar — see editorial calendar shape below.

---

## 3. Editorial calendar shape

Not a fixed schedule. A pattern.

- **One Flagship Strategic post per month** — rotating across pillars, with `applied-ai` getting two of every four slots to build that pillar up.
- **One or two Technical Deep Dives per quarter** — typically the next semantic-series refresh, or a new platform post (e.g., the rumored Profile Features deep dive in the source PDFs).
- **No mandatory cadence on `bi-to-ai`** — these post when there is a genuine reflection to surface, not on a calendar.

The blog is a flywheel, not a publication. Quality over cadence. A single strong Flagship Strategic post per month, posted on LinkedIn with a credible excerpt, will outperform four mediocre posts published weekly.

---

## 4. Cross-posting plan

**LinkedIn = primary**. **Medium = secondary**. **Dev.to = deferred**.

### LinkedIn (primary)

- **Format**: post the `linkedin_excerpt` from frontmatter directly as a LinkedIn long-form post.
- **Link placement**: the canonical blog URL goes at the bottom of the post (LinkedIn deprioritizes external links in the body; bottom placement gets better reach).
- **Hashtags**: 3-5 max, in a comment below the post or at the very bottom. Examples per pillar:
  - `governed-data`: `#DataEngineering #SemanticLayer #DataGovernance #PowerBI #MENATech`
  - `applied-ai`: `#GenAI #LLMOps #Databricks #NLP #MENATech`
  - `bi-to-ai`: `#DataScience #AnalyticsEngineering #CareerInTech #MENATech`
- **Engagement comment**: pin one comment with a one-line summary of the closing question from the post body. This pulls discussion into the thread rather than evaporating it on the blog.
- **Timing**: Tuesday or Wednesday morning Dubai time (best B2B reach in MENA + Europe overlap).
- **Audience tagging**: do not tag-bomb. Tag at most one or two specific people if the post directly engages with their published work.

### Medium (secondary)

- **Format**: full repost of the blog content (not an excerpt). Use Medium's import-from-URL feature where possible.
- **Canonical URL**: always set the canonical to the blog URL on syedaamir229.github.io. Medium honors `rel=canonical` for SEO.
- **Cadence**: Medium reposts are slower than LinkedIn. Do not block on Medium — repost within a week, not the same day.
- **Publications**: target one Medium publication per pillar where appropriate (e.g., *Towards Data Science* for `applied-ai`, *Better Programming* for `governed-data`). Submission is best-effort; do not delay original publication on the blog.

### Dev.to (deferred)

Skip until at least Phase 6 (AI business site launch). The audience overlap with the consulting target is weak, and the cross-posting toll is real.

### LinkedIn excerpt format

See `BLOG_VOICE.md` section 6 for the full template and an example. Every post's `linkedin_excerpt` frontmatter field must be paste-ready — no further editing needed before publication.

---

## 5. Semantic Layer Series packaging

The six-part semantic-layer series is currently scattered. Packaging it as a flagship asset is the single highest-leverage move for the `governed-data` pillar.

### Plan

- **New flagship intro post** (Phase 3.5 priority #1, see `BLOG_AUDIT.md`): "Why Most Semantic Layers Fail" — Flagship Strategic tier, 1,400 words, opinionated argument for why semantic-layer projects collapse and a named framework for the rollout pattern. Funnels readers into Part 1.
- **Series landing page** (Phase 5 implementation): `/blog/series/semantic-layer/` showing:
  - Hero block summarizing the series with a one-line abstract per part.
  - Sequential "Read in order" navigation.
  - Down-the-page TOC linking to each part.
  - A single closing CTA: "Get the full PDF" (eventual lead magnet, deferred to Phase 6 when newsletter exists).
- **Sequential navigation in each post body** (Phase 5): "Previous / Next" footer linking the six parts.
- **Frontmatter wiring** (each post during refresh): add `series: semantic-layer` and `series_part: 1-6` per `BLOG_VOICE.md` section 4.

### Why this packaging matters

Six standalone posts are six search results. One packaged series with a landing page is one flagship resource that signals depth, ownership, and the kind of thinking a senior practitioner produces. For consulting positioning, the packaging is the differentiator.

---

## 6. Author bio + soft CTA placement

- **Where**: bottom of every post, immediately after the closing question.
- **Format**: see `BLOG_VOICE.md` section 5 for the canonical markdown snippet.
- **Phase 3.5**: every rewrite/refresh adds the markdown block as-is. Existing closing CTA boxes (the "Let's Talk" admonition boxes in `ai-crm-automation`, `enigma`, `bi-modernization`, `scalable-data-model`, `bi-to-ai-journey`) get replaced, not stacked on top of.
- **Phase 5**: optionally promote the markdown snippet to an `<AuthorBio />` Astro component so it renders consistently and can be updated centrally. The component must produce the same visible output as the markdown so that LinkedIn / Medium reposts render correctly even when components are not available.

The bio paragraph is a credibility block: named employers, niche positioning, role. The CTA is one short sentence. Do not over-engineer this — it works because it is short.

---

## 7. Newsletter decision

**Defer to Phase 6.** Do not stand up a newsletter on the portfolio.

**Reasoning:**
- An empty list is worse than no list. The first 50-100 subscribers come from already-engaged LinkedIn followers; until that following exists, a signup form converts at near zero.
- Newsletter infrastructure (Buttondown, Substack, ConvertKit, Beehiiv) introduces a third surface to maintain alongside the blog and LinkedIn.
- The AI business site (Phase 6) is the natural home for an owned email list. Migrating engaged readers from LinkedIn → blog → business-site newsletter is a cleaner funnel than tying it to the personal portfolio.

**What to do instead until Phase 6**:
- Build the LinkedIn following. Every post drives connections, every closing question drives DM conversations.
- Use the consulting-inquiry CTA at the bottom of each post as the de-facto subscription mechanism — people who actually want to hear from you will email.

**Trigger to revisit**: at the same time the AI business site launches, migrate engaged readers via a one-time LinkedIn announcement + portfolio-blog banner pointing to the new newsletter on the business site.

---

## 8. Rewrite workflow (every future post follows this)

Eight steps. Whether a human or the agent executes the workflow, the steps and their order do not change.

### Step 1: Read all source material
- The current portfolio version at `src/content/blog/<slug>.md`.
- The MkDocs migration source at `~/Repositories/Personal/mkdocs-website/docs/blog/posts/<slug>.md`.
- The matching authoritative PDFs at `~/Repositories/Personal/mkdocs-website/sources/`:
  - AVOD posts → `AVOD Pipeline.pdf`
  - Semantic-layer posts → `Semantic Layer.pdf`
  - Enigma post → `Enigma/` folder (5 PDFs)
  - CRM-automation post → `Jarvis/` folder (5 PDFs)
  - Gender-prediction post → `Data Science/Gender Prediction Model.pdf`, `Profile Features/Profile Features - Business Guide.pdf`, `Profile Features Pipeline - Technical Documentation.pdf`
  - Data-model post → `Data Model 2.0.pdf`
  - Career posts → `career-timeline.md`, `SYED AAMIR.pdf`, `Syed Aamir_CV.pdf`

### Step 2: Build a fact ledger
A short bulleted list extracted from the sources: every number, tool name, architecture detail, date, role, decision. Keep this in the working notes — it is the source of truth for the rewrite.

### Step 3: Identify external claims
Mark any claim in the planned rewrite that goes beyond personal delivery. Examples: industry adoption stats, vendor benchmarks, market size, comparisons to other companies' approaches, recent thinking from named practitioners. These are the claims that need step 4.

### Step 4: Web-search and cite
For each external claim, run a targeted web search. Cite inline using markdown links to authoritative sources (vendor docs, named analysts, recent benchmark reports). Do not bulk-cite — every citation should be load-bearing.

**Search direction by post (already specced in `BLOG_AUDIT.md`)**:
- `bi-to-ai-journey` → BI-to-ML career arc reports, dbt analytics-engineering surveys, "AI engineer" job description evolution.
- `enigma` → Databricks Genie space launch case studies, LangGraph supervisor patterns, comparable voice-of-customer platforms.
- `scalable-data-model` → Kimball/Inmon framing in lakehouse era, dbt entity-modeling best practices, "data model as product" thinking.
- `ai-crm-automation` → CRM-team-to-analyst handoff benchmarks, CleverTap/Braze MENA adoption, self-serve audience patterns.
- Semantic-layer series → dbt Semantic Layer adoption, Cube.dev/AtScale benchmarks, metric-drift cost data from Atlan/Castor.
- `gender-prediction` → Attribute inference vs declared data (post-iOS-14 ad-targeting policy shifts), MENA profile-completion benchmarks, inferred-attribute governance literature.
- `avod-revenue-pipeline-and-alerting` → IAB VAST error taxonomy, GAM late-attribution behavior, MENA AVOD market post-2022 shifts.
- `bi-modernization-lessons` → Tableau-to-Power BI migration benchmarks, Gartner BI-modernization timeline data.

### Step 5: Draft against the voice doc
Open `BLOG_VOICE.md`. Pick the depth tier. Write the post following the seven-part structure (hook, thesis, context, named framework, prioritization, domain anchor, closing question). Use the fact ledger from step 2 for every numeric claim. Use the citations from step 4 for every external claim.

### Step 6: Generate images (if needed)
If the post is Flagship Strategic and introduces a new named framework — generate one architecture or conceptual image via the Gemini pattern in `BLOG_VOICE.md` section 7. Save to `public/assets/blog/<slug>-<name>.png`. Iterate 5-10 generations. Commit only the final selection. Reuse existing SVGs in `public/assets/diagrams/` when applicable (e.g., semantic-series posts).

### Step 7: Produce cross-post versions
- Fill in `linkedin_excerpt` in the frontmatter following the template in `BLOG_VOICE.md` section 6.
- (Optional, Medium-priority posts only) Note any tweaks needed for Medium import — usually none, the post should be Medium-ready as-is with a canonical-URL tag.

### Step 8: Run the pre-publication checklist
Walk through every item in `BLOG_VOICE.md` section 8. Do not ship until every box is checked. Catching gaps at this stage is the difference between a post that earns engagement and a post that feels generic.

---

## 9. Blog writing agent (planning sketch)

The blog writing agent is a separate project, in its own repository, to be built after Phase 3.5 / 3.6 establishes patterns through human-executed rewrites. **This document is the planning sketch; implementation is a future session.**

### Goal

A thin agent that reads `BLOG_VOICE.md` + a brief, then drafts a Flagship Strategic or Technical Deep Dive post following the rewrite workflow above. Outputs a PR against the portfolio repo with a complete post (frontmatter + body + image + linkedin_excerpt).

### Why thin, not autonomous

The voice is the product. The agent should follow the voice doc as a spec, not reinterpret it. Autonomy in voice produces drift; autonomy in execution (fact-checking, image generation, cross-post formatting) produces leverage.

### Inputs to the agent

- **Brief**: title (or topic), pillar (`governed-data` | `applied-ai` | `bi-to-ai`), depth tier (`flagship` | `deep-dive`), target word count, source material pointers (project case-study path, internal PDF path, external articles).
- **Voice spec**: `BLOG_VOICE.md` (this is the prompt-context anchor).
- **Audit context**: `BLOG_AUDIT.md` (so the agent can learn from the calibration).
- **Brand context**: `BRAND_GUIDE.md` (for image generation style).

### Architecture sketch

```
agent loop:
  1. read brief + BLOG_VOICE.md
  2. read source materials (markdown + PDFs)
  3. build fact ledger (step 2 of workflow)
  4. identify external claims (step 3)
  5. for each external claim: run web search, pick best source
  6. draft post following 7-part structure
  7. self-check against pre-publication checklist
  8. if checklist fails: iterate
  9. generate image via Gemini if required
  10. fill linkedin_excerpt
  11. emit markdown file + image + open PR
```

### Out of scope for the agent (at least at v1)

- Choosing topics. The brief is human-supplied.
- Reinterpreting voice. The voice doc is the spec; deviation is a bug.
- Publishing. Output is a PR; merge is human.
- Cross-posting execution. The agent ships the excerpt; the human posts to LinkedIn.

### Tools the agent needs

- Read access to the portfolio repo and the mkdocs-website source repo.
- PDF text extraction for the `sources/` folder.
- Web search (with citation extraction).
- Gemini API access for image generation (key in `.env`).
- GitHub PR creation (gh CLI or API).

### Sequencing

- **Phase 3.5/3.6**: human-executed rewrites of the top 5-10 posts establish the pattern.
- **Phase 4 or later**: agent project starts in a separate repo, trained against the patterns from Phase 3.5/3.6.
- **Phase 6+**: agent becomes part of the AI business site's content engine.

### Tracking the work

Open a separate `BLOG_AGENT_PLAN.md` in the (future) agent repo at the time of kickoff. This section is the seed — not the full spec.

---

## 10. What this strategy does not commit to

- **Specific publication dates** for the top 5 rewrites — those are scheduled per Phase 3.5 session, not here.
- **A newsletter platform pick** — deferred to Phase 6.
- **A specific Medium publication submission strategy** — best-effort.
- **A specific LinkedIn posting cadence beyond "after each rewrite ships"** — the rewrite cadence drives the LinkedIn cadence, not a separate calendar.
- **Implementation of the series landing page or `<AuthorBio />` component** — Phase 5.

---

## 11. Open decisions

These will need user input before Phase 3.5 execution sessions start:

- **Phase 3.5 scope per session**: one post per session, or batch 2-3 short refreshes per session? *Recommended: one Flagship Strategic post per session (top 4 priorities); batch the semantic-series parts 2-6 in one session since they share voice patterns and source PDFs.*
- **"Why Most Semantic Layers Fail" angle**: is the thesis "most semantic layers fail because they are treated as a technical project not a governance product" or something else? *To be decided when that session starts; the audit identifies the gap, not the specific thesis.*
- **Featured-post rotation**: currently 3 posts are featured (`bi-to-ai-journey`, `enigma`, `scalable-data-model`). After rewrites, should `ai-crm-automation` join? Should the new flagship semantic-series intro? *Recommended yes to both, capping at 4-5 featured at any time.*

---

*See `BLOG_VOICE.md` for the voice spec referenced throughout. See `BLOG_AUDIT.md` for the strict per-post audit and prioritized rewrite list. See `BRAND_GUIDE.md` and `UX_AUDIT.md` for the surrounding brand and UX context.*
