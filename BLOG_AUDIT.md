# Blog Audit

**Phase 3 — Strict per-post audit of the 15 migrated blog posts**
**Date**: 2026-05-15
**Status**: Final. Feeds Phase 3 rewrite execution (Phase 3.5 onward).

This is the strict re-audit referenced in Phase 3. It supersedes informal scoring from earlier in the session. Each post is scored against the rubric in `BLOG_VOICE.md` (which itself supersedes `BLOG_GUIDELINES.md`).

---

## 1. Rubric

Each post is scored 1-5 on six dimensions:

| Dimension | What earns 5 | What earns 1 |
|---|---|---|
| **Hook** | A vivid scene the reader has lived. Specific people, specific moment. | Abstract problem statement, "many teams struggle with..." |
| **Thesis** | A standalone paragraph stating an opinion with teeth that someone could disagree with. | No stated opinion. Descriptive only. |
| **Named framework** | Memorable name (e.g., "The Four-Layer Automation Architecture"), 3-6 components, each with what / why / failure mode. | Numbered list of steps with no named container. |
| **Prioritization** | "What I'd actually do first" section that tells the reader where to start and why. | None. Or buried in a takeaways list. |
| **Closing question** | A provocative question that challenges the reader's current approach. | Generic call-to-action ("hope this helped"), or a summary takeaway. |
| **Domain integration** | OTT / MENA / Arabic-OTT context is structural — examples, framing, stakes are anchored in the niche. | Examples could apply to any vertical; Shahid is only an employer tag. |

**Composite verdict** (not an average — qualitative):
- **Rewrite** — major reshaping needed; voice and structure require a top-down redo.
- **Refresh** — bones are sound; needs hook, thesis paragraph, framework naming, closing question, em-dash cleanup.
- **Keep as-is** — meets the bar; only minor copy edits.

Cross-source verification points to: `~/Repositories/Personal/mkdocs-website/docs/blog/posts/` (migration source) and `~/Repositories/Personal/mkdocs-website/sources/` (authoritative internal PDFs).

---

## 2. Summary Table

| # | Post | Hook | Thesis | Frwk | Prio | Close | Domain | Verdict |
|---|---|:-:|:-:|:-:|:-:|:-:|:-:|---|
| 1 | `ai-crm-automation` | 2 | 3 | 4 | 2 | 1 | 4 | Refresh |
| 2 | `avod-revenue-pipeline-and-alerting` | 2 | 3 | 3 | 2 | 1 | 3 | Refresh |
| 3 | `bi-modernization-lessons` | 2 | 4 | 3 | 3 | 1 | 2 | Refresh |
| 4 | `bi-to-ai-journey` | 3 | 4 | 3 | 4 | 2 | 3 | **Rewrite to flagship** |
| 5 | `bi-to-data-science-bridge-patterns` | 4 | 4 | 4 | 2 | 1 | 3 | Refresh |
| 6 | `bi-to-data-science-transition-story` | 3 | 3 | 2 | 3 | 1 | 3 | Refresh |
| 7 | `enigma-voice-of-customer-intelligence` | 3 | 4 | 4 | 2 | 1 | 5 | **Rewrite to flagship** |
| 8 | `gender-prediction-model-in-practice` | 2 | 3 | 2 | 2 | 1 | 4 | Refresh |
| 9 | `scalable-data-model` | 3 | 4 | 4 | 4 | 2 | 3 | **Rewrite to flagship** |
| 10 | `semantic-layer-01-why-governed-metrics` | 2 | 3 | 3 | 3 | 1 | 3 | Refresh (anchor of new flagship intro) |
| 11 | `semantic-layer-02-architecture-and-data-flow` | 2 | 3 | 3 | 2 | 1 | 2 | Refresh |
| 12 | `semantic-layer-03-kpi-engineering-with-dax` | 2 | 3 | 4 | 3 | 1 | 1 | Refresh |
| 13 | `semantic-layer-04-governance-and-deployment` | 2 | 3 | 3 | 3 | 1 | 1 | Refresh |
| 14 | `semantic-layer-05-refresh-and-troubleshooting` | 2 | 3 | 3 | 3 | 1 | 1 | Refresh |
| 15 | `semantic-layer-06-performance-monitoring` | 2 | 3 | 3 | 2 | 1 | 1 | Refresh |

**Calibration note**: A 3 means "competent professional writing that misses the thought-leadership rubric." It is not a failing grade; it is a fair description of what migrated from MkDocs. No post is below 3 on thesis because the user already writes with clear opinions. The systematic gaps are hook, named framework, and closing question.

---

## 3. Cross-Cutting Findings

### 3.1 The em-dash substitute problem

Seven posts contain double-hyphen `--` characters embedded in prose. These are clearly em-dashes that survived migration (likely auto-converted by a markdown processor in MkDocs and copy-pasted forward). They violate the user's explicit "no em-dashes" rule:

| Post | Occurrences |
|---|---:|
| `enigma-voice-of-customer-intelligence` | 22 |
| `bi-modernization-lessons` | 14 |
| `avod-revenue-pipeline-and-alerting` | 13 |
| `bi-to-data-science-transition-story` | 9 |
| `bi-to-data-science-bridge-patterns` | 8 |
| `ai-crm-automation` | 1 |
| `semantic-layer-04-governance-and-deployment` | 1 |

**Action**: Every rewrite or refresh pass must replace these with colons, periods, or sentence restructuring. The replacement is not always a colon — read each in context.

### 3.2 Closing questions are uniformly weak

Of 15 posts, **zero** end with a provocative question per the rubric. Closing patterns observed:
- "Key Takeaway" summary box (most semantic-series posts)
- Generic "Let's Talk" CTA box (`ai-crm-automation`, `enigma`, `bi-modernization`, `scalable-data-model`, `bi-to-ai-journey`)
- "For the full case study, see..." link only (`gender-prediction`, `bi-to-data-science-bridge-patterns`)

**Action**: Every post — even those marked Refresh — gets a closing question added.

### 3.3 Frameworks are present but unnamed

Most posts present a 3-6 component model in the body (the "Four Pipelines, One System" structure in AVOD; the "Three-Layer Bronze/Silver/Gold" structure in Enigma; the "Five Lessons Learned" structure in scalable-data-model). The components are explained, but the framework itself is rarely given a memorable name that a reader could carry into their next conversation.

**Action**: During refresh, give each framework a name with weight (e.g., "The AVOD Operating Loop," "The Voice-of-Customer Stack," "The Five Rules of a Compounding Data Model"). Names are the artefact that gets shared, screenshotted, and quoted.

### 3.4 MENA / Arabic-OTT integration is uneven

Only `enigma` (5/5), `ai-crm-automation` (4/5), and `gender-prediction` (4/5) make MENA-specific context structural. Others (especially the semantic-layer series and `bi-modernization-lessons`) treat the OTT context as background — they happen at Shahid but could be set anywhere.

**Action**: For posts being rewritten to flagship status, MENA integration is mandatory in the hook or one framework component. For Refresh-tier posts in the semantic series, a single MENA-flavored example in the body is enough.

### 3.5 Frontmatter is clean

Every post has complete frontmatter (title, date, description, categories, tags, featured, draft). No leftover MkDocs syntax (`!!! note`, `{: .class}`, attribute lists) anywhere. This is the one part of migration that landed perfectly.

**Action**: When `BLOG_VOICE.md` introduces new frontmatter fields (`depth`, `pillar`, `linkedin_excerpt`, optional `series`/`series_part`), they get added during each rewrite/refresh, not in a separate sweep.

### 3.6 Internal images already exist for the semantic series

The semantic-layer series has six SVG diagrams at `public/assets/diagrams/semantic-series-0[1-6]-*.svg`. These are referenced inline and presumably render. No new images required for that series during the refresh pass.

**Action**: For the rewrites of `enigma`, `scalable-data-model`, `bi-to-ai-journey`, and the new "Why Most Semantic Layers Fail" flagship, plan to generate 1 architecture / concept image each via Gemini, following the brand-aligned image rules in `BLOG_VOICE.md`. Verify existing diagrams render before reusing.

---

## 4. Per-Post Briefs

### 1. `ai-crm-automation.md` — Refresh
**Why**: Strong framework bones (6-layer scenario engine), clear domain integration (Demon Slayer + Shahid + Ramadan overrides). Weak hook ("Most CRM teams run into the same bottleneck" is abstract), no thesis paragraph, "Key Takeaway" close instead of a question.
**Refresh moves**:
- Open with the actual Slack-thread scene from the user's own experience (specific person, specific request, specific morning).
- Name the framework: "The Scenario Engine Pattern" or "The Six-Layer CRM Operating System."
- Add a "What I'd build first" section before the close.
- Replace closing CTA box with a question, e.g., "Your CRM team is either configuring scenarios or filing tickets. Which one is yours?"
- Domain integration is already strong; preserve.
**Source verification**: `~/Repositories/Personal/mkdocs-website/sources/Jarvis/Jarvis Architecture.pdf`, `Jarvis Scenarios Guide.pdf`, `New Scenario Creation Guide.pdf`, `Clevertap Campaigns Dashboard.pdf`.
**Web grounding**: Industry data on CRM-team-to-data-analyst handoff time. Customer.io / Braze / CleverTap benchmark adoption stats in MENA. Recent posts on "self-serve audience" patterns from companies like Segment.

### 2. `avod-revenue-pipeline-and-alerting.md` — Refresh
**Why**: 13 em-dash substitutes. Hook is abstract ("AVOD reporting becomes fragile..."). Framework is there ("Four Pipelines, One System") but not named with weight. Close trails off into "Why this was a transition block" rather than a question. MENA context absent — could be any AVOD platform on Earth.
**Refresh moves**:
- Open with a specific scene: the Monday morning where three teams produce three different revenue totals from the same GAM data.
- Rename the framework: "The Four-Signal AVOD Operating Loop" (Inventory, Impressions, VAST Errors, Pacing).
- Add explicit "Where to start if your team has zero pipeline today" prioritization section.
- Replace the "transition block" close with a question that ties pipeline trust to revenue: "Is your revenue number a measurement or an estimate?"
- Add one MENA-specific note (Ramadan / regional flight delivery windows).
- Strip all `--` substitutes.
**Source verification**: `~/Repositories/Personal/mkdocs-website/sources/AVOD Pipeline.pdf`.
**Web grounding**: VAST error taxonomy industry references (IAB). GAM late-attribution behavior documentation. MENA AVOD market shift narratives (post-2022 ad-supported tier launches).

### 3. `bi-modernization-lessons.md` — Refresh
**Why**: 14 em-dash substitutes — the worst offender after Enigma. Solid three-phase sequencing argument, clear outcomes (35%/40%/100+/0). Hook is abstract. No named framework (just three phases). Close is a flat takeaway. Domain integration weak (could be any BI estate).
**Refresh moves**:
- Open with the moment migration risk became real: the executive asking "are we sure these numbers are the same?" mid-cutover.
- Name the framework: "The Three-Phase Migration Sequence" — Tool → Data Layer → Metric Logic.
- The "What Teams Usually Underestimate" section already serves as prioritization in spirit; rename it "What I'd never skip again."
- Close with a question: "If your migration broke today, which layer would you point at first?"
- Strip all `--`.
- Light MENA flavor: one example anchored in operating across content / subscriptions / ad ops teams at Shahid.
**Source verification**: `~/Repositories/Personal/mkdocs-website/sources/Data Model 2.0.pdf`, `Semantic Layer.pdf`.
**Web grounding**: Tableau-to-Power BI migration industry benchmarks. Gartner data on average BI modernization timeline. Comparable case studies from Microsoft customer stories.

### 4. `bi-to-ai-journey.md` — **Rewrite to flagship**
**Why**: Already featured. This is the highest-leverage LinkedIn-shareable piece you have. Current version is solid memoir but lacks the framework that makes it screenshot-able. Hook is decent ("I started in 2016...") but generic. Thesis ("AI is not a separate career") is excellent but buried at the bottom. Close is a CTA box.
**Rewrite spec**:
- Tier: **Flagship Strategic**, 1,400-1,600 words (tighter than current).
- Open with the *exact* moment of crossover: the day you realized BI knowledge made the ML work better, not worse. Concrete scene.
- Move the "AI is not a separate career" thesis to paragraph 4. Make it the spine.
- Name the framework: "The Compounding Stack" — four phases (Data Foundation → Analytics Maturity → Data Science → AI Automation) each enabling the next. Make this the central diagram (Gemini-generated, brand-aligned).
- Cut the "What changed / What stayed" sections in their current form. Fold them into the framework components.
- "What I'd tell my earlier self" is the prioritization — keep it, tighten it to 4 punchy lines.
- Close with: "Is your stack compounding, or restarting every two years?"
- Strong LinkedIn excerpt that previews the framework with one screenshot-able sentence.
**Source verification**: `~/Repositories/Personal/mkdocs-website/sources/career-timeline.md`, `Syed Aamir_CV.pdf`, `SYED AAMIR.pdf`.
**Web grounding**: Recent data on the BI-to-ML career path (LinkedIn talent insights, dbt's "state of analytics engineering" report). Trends in "AI engineer" job description evolution 2023-2026.

### 5. `bi-to-data-science-bridge-patterns.md` — Refresh
**Why**: Strong hook ("15K vs 12K"), four well-named patterns ("Shared Business Entities," "Promote Metrics to Features Carefully," "Validate for Use, Not Just Score," "Evolve Roles, Not Just Tools"). This is one of two posts where the framework actually has names. Missing: explicit prioritization, closing question.
**Refresh moves**:
- Strengthen the hook with the meeting timestamp + the executive's exact question.
- Add explicit prioritization: "If you have to pick one of these four to fix first, pick Pattern 1."
- Close with: "Are your model numbers explainable from your dashboard, or are they a parallel reality?"
- Strip 8 `--` instances.
**Source verification**: `sources/Data Model 2.0.pdf`, `Profile Features/Profile Features Pipeline - Technical Documentation.pdf`.
**Web grounding**: Comparable "BI-to-ML reconciliation failure" patterns from companies like Stitch Fix, Shopify, Spotify. Recent thinking from analytics-engineering thought leaders (Tristan Handy, Benn Stancil) on feature/metric unification.

### 6. `bi-to-data-science-transition-story.md` — Refresh
**Why**: Companion to `bi-to-ai-journey` but narrower (6-month overlap period). Good narrative honesty. No named framework. Three numbered anti-patterns are useful but unnamed as a set. Close trails off.
**Refresh moves**:
- Hook: open with one Friday afternoon during the overlap — the dashboard bug and the model bug arriving in the same Slack channel.
- Name the anti-patterns set: "The Three Ways BI-to-DS Transitions Die."
- Add a prioritization paragraph: "If you can do one thing in your overlap period, do this."
- Closing question: "Are you transitioning, or are you abandoning?"
- Strip 9 `--` instances.
- Decide whether to merge with `bridge-patterns` — recommend keeping separate, this one is the narrative companion, `bridge-patterns` is the technical companion.
**Source verification**: same as #5 plus `career-timeline.md`.
**Web grounding**: light — this is a personal narrative, less external grounding needed. Maybe one reference to the broader "analytics-engineer-as-bridge-role" discourse.

### 7. `enigma-voice-of-customer-intelligence.md` — **Rewrite to flagship**
**Why**: Already featured. The single strongest AI-credibility post you have. Domain integration is 5/5 (Arabic-OTT, four social platforms, MENA-specific stakes). But: 22 em-dash substitutes (the worst). Hook is abstract. Framework is detailed but unnamed. No closing question. The Genie / FAISS / LangGraph stack is current and impressive — the post fails to flag that explicitly enough.
**Rewrite spec**:
- Tier: **Technical Deep Dive**, 2,800-3,200 words (current is ~2,400; expand slightly to cover the agent routing and the FAISS cost-efficiency decision more deeply).
- Open with the scene the post hints at: the morning a content lead needed sentiment on "Ramadan finale episode X" and the analyst said "give me three days." Make the stakes concrete.
- State a thesis: "Voice of customer is solved when product managers stop filing data requests."
- Name the architecture: "The Voice-of-Customer Stack" — Bronze ingestion / Silver NLP enrichment / Gold semantic model / Two specialized Genie spaces / Supervisor Agent. Four named components plus an explicit routing layer.
- Make the **two-Genie-space decision** a centerpiece — that is the original insight worth screenshot-able framing. Most reader teams will default to one Genie space and fail; this is your differentiator.
- Generate one Gemini-built architecture image. Brand-aligned (warm carbon, copper accents). Replaces or augments any existing inline image.
- Strip all 22 `--` instances.
- Close: "Your feedback data is either an asset you can query or a queue your analysts work down. Which one is yours?"
- LinkedIn excerpt focused on the "two Genie spaces" insight.
**Source verification**: `~/Repositories/Personal/mkdocs-website/sources/Enigma/Enigma Overview.pdf`, `Comments Genie.pdf`, `Engagement Genie.pdf`, `Ingestion & Source Pipelines.pdf`, `Databricks Apps.pdf`.
**Web grounding**: Databricks Genie space launch posts and case studies (Databricks blog 2024-2025). LangGraph supervisor pattern references. Comparable voice-of-customer architectures (Notion's, Linear's, Intercom's). MENA streaming social-feedback volume references.

### 8. `gender-prediction-model-in-practice.md` — Refresh
**Why**: Strong domain integration (MENA streaming, Ramadan, shared households). Useful technical detail (XGBoost, 75% accuracy, 9.5M scored, 5.8M net new). Weak hook ("Declared profile attributes are often incomplete."). Framework is the four-step "Approach" list but unnamed. Guardrails section is the most opinionated part. Close trails off.
**Refresh moves**:
- Open with the moment a content planner asked "what does our female audience over 25 watch?" and the answer was "we only know that about 22% of profiles."
- Name the framework: "Inference With Receipts" — four components: behavioral feature design / validation that doesn't pretend / explicit-label downstream contracts / drift monitoring with cultural context.
- Make the cultural-context point (Western baselines don't transfer) more prominent. This is genuine domain expertise.
- Add "What I'd watch first" prioritization: drift monitoring beats accuracy for enrichment models.
- Close: "Is your inferred data marked, or is it pretending to be ground truth?"
**Source verification**: `~/Repositories/Personal/mkdocs-website/sources/Data Science/Gender Prediction Model.pdf`, `Profile Features/Profile Features - Business Guide.pdf`, `Profile Features Pipeline - Technical Documentation.pdf`.
**Web grounding**: Industry approach to attribute inference vs declared data (Meta / Google ad-targeting policies post-iOS-14). MENA-specific data on profile-completion rates in streaming. Recent thinking on inferred-attribute governance from privacy-engineering literature.

### 9. `scalable-data-model.md` — **Rewrite to flagship**
**Why**: Already featured. Anchor piece for the "Governed Data Foundations" pillar. Good thesis ("the fix was not a dashboard or a new tool"). Five lessons are useful but unnamed as a set. Close drifts into a generic takeaway. Hook is abstract.
**Rewrite spec**:
- Tier: **Flagship Strategic**, 1,500-1,700 words.
- Open with a specific leadership-meeting reconciliation moment — the kind described abstractly in paragraph 2. Make it concrete.
- Thesis: "Most data teams treat data models as one-time projects. The teams that compound treat them as infrastructure." Move this to paragraph 4.
- Name the framework: "The Five Rules of a Compounding Data Model" — Start with Grain / Movement Tracking / Surrogate Keys Everywhere / Feature Tables in the Model / Build for the Next Consumer.
- Trim the architecture description in section 2 — strategic flagships avoid heavy code/schema. The current Bronze/Silver/Gold detail is more appropriate for a Technical Deep Dive companion (which the semantic series already provides).
- Replace the multi-vertical comparison table with a tighter MENA-streaming-specific framing followed by one line on generalization.
- Generate one architecture conceptual image via Gemini.
- Close: "Is your data model a project that ended, or infrastructure that compounds?"
**Source verification**: `~/Repositories/Personal/mkdocs-website/sources/Data Model 2.0.pdf`.
**Web grounding**: Kimball / Inmon framing in modern lakehouse context. dbt analytics-engineering best practices on entity modeling. Recent thinking on "the data model as a product" (Chad Sanderson, Zhamak Dehghani).

### 10. `semantic-layer-01-why-governed-metrics.md` — Refresh (anchor of new flagship intro)
**Why**: First of six. Currently reads as a documentation-flavored introduction. Hook is good ("Most teams do not decide to build a semantic layer on day one. They get pushed there.") — strongest hook of the series. Framework is present but unnamed. Close is generic.
**Refresh moves**:
- Sharpen the hook with the specific reconciliation conflict that triggered the project at Shahid.
- Name the rollout pattern: "The Four-Move Adoption Sequence" or "The Conflict-First Rollout."
- Add explicit prioritization: "If you can only do one of these four moves, do step 1 — find the 20 KPIs that hurt the most."
- Closing question: "Is your semantic layer a strategic asset or a maintenance liability?" (already in `BLOG_GUIDELINES.md` as an example — earn it here).
**Note**: This post should also be the **funnel target** for a new Flagship Strategic intro post — "Why Most Semantic Layers Fail" — that lives at the front of the series landing page. See `BLOG_STRATEGY.md` for the series packaging plan.
**Source verification**: `~/Repositories/Personal/mkdocs-website/sources/Semantic Layer.pdf`.
**Web grounding**: dbt Semantic Layer launch and adoption data. Cube.dev / AtScale / Looker LookML adoption discussions. Industry data on "metric drift" cost (Atlan, Castor analytics-engineering surveys).

### 11. `semantic-layer-02-architecture-and-data-flow.md` — Refresh
**Why**: Heavy on architecture clarity, light on hook and close. Step-by-step build walkthrough at the bottom is correct for Technical Deep Dive tier but feels disconnected from the strategic argument. Domain integration is weakest of the series.
**Refresh moves**:
- Tighten hook around the specific deployment that broke partitions and reset roles — the kind of thing the post mentions abstractly.
- Name the boundary structure: "The Three Ownership Layers" — Data Engineering owns curated tables, Metric Engineering owns the semantic model, Report Engineering owns consumption.
- Add a MENA / streaming-flavored example for the engagement fact table or the partition strategy.
- Close: "Where does your semantic-layer ownership stop, and where does it leak?"
**Source verification**: `Semantic Layer.pdf`.

### 12. `semantic-layer-03-kpi-engineering-with-dax.md` — Refresh
**Why**: Strong technical content (layered measure pattern is well-explained). Hook abstract. Domain integration almost non-existent. Code blocks for DAX are appropriate for the Technical Deep Dive tier.
**Refresh moves**:
- Open with the moment a single dashboard owner discovered their `churn_rate` formula was three different things in three places.
- Name the pattern explicitly: "The Three-Layer DAX Stack" (Base → Business → Consumption).
- Add a streaming-specific measure example throughout (e.g., AVOD impressions, plays, watch-hour ARPU).
- Closing question: "Are your DAX measures a library or a graveyard?"
**Source verification**: `Semantic Layer.pdf`.

### 13. `semantic-layer-04-governance-and-deployment.md` — Refresh
**Why**: Strong governance content but reads as a runbook. Hook abstract. Release-discipline argument is the implicit thesis but never stated head-on. 1 `--` to clean.
**Refresh moves**:
- Hook: an incident where a deployment reset partitions and reports went stale overnight.
- Thesis: "Most post-launch semantic-layer failures are governance failures, not modeling failures."
- Name the controls: "The Three Release Gates" (Owner Approval / Validation / Rollback).
- Domain integration: the Power BI Premium → SSAS migration discussion is solid; lean into the capacity story.
- Closing question: "If your model deployed today and broke production, would you know how to roll back?"
**Source verification**: `Semantic Layer.pdf`.

### 14. `semantic-layer-05-refresh-and-troubleshooting.md` — Refresh
**Why**: Strongest operations content in the series. Hook abstract. Naming opportunity missed (the staging → dimensions → facts → process sequence deserves a name).
**Refresh moves**:
- Hook: the missed-day failure that turned a Monday morning into an incident.
- Name the sequence: "The Six-Stage Refresh Loop."
- Tighten the recovery procedure under a memorable name: "The Five-Step Backfill."
- Closing question: "Is your refresh a process, or a person?"
**Source verification**: `Semantic Layer.pdf`.

### 15. `semantic-layer-06-performance-monitoring.md` — Refresh
**Why**: Solid monitoring framework but generic. Hook abstract. Series-closer needs to do double duty — close the post AND close the series. Currently does neither well.
**Refresh moves**:
- Hook: the moment a query that took two seconds last quarter takes thirty seconds today, and nobody knows why.
- Name the loop: "The Weekly Optimization Cycle" — already partly named, sharpen it.
- This post should explicitly close out the series with a question that lands the entire arc, e.g., "You have spent six posts on the semantic layer. Has yours moved from project to product?"
- Add a footer that links to the (planned) series landing page.
**Source verification**: `Semantic Layer.pdf`.

---

## 5. Top 5 Rewrite Priorities

In execution order for Phase 3.5:

1. **NEW: "Why Most Semantic Layers Fail" (Flagship Strategic)** — Write from scratch as the front door to the semantic series. This is the highest-leverage single piece of content you can ship because it creates a funnel into six existing posts and a project page. Estimated 1,400 words. Pillar: Governed Data Foundations. Closes with funnel into Part 1.
2. **`bi-to-ai-journey.md` rewrite (Flagship Strategic)** — Already featured. Highest LinkedIn shareability. The "Compounding Stack" framework becomes a screenshot-able artefact. Pillar: From BI to AI.
3. **`enigma-voice-of-customer-intelligence.md` rewrite (Technical Deep Dive)** — Already featured. Strongest AI / GenAI proof point. The "two Genie spaces" insight is original and screenshot-able. 22 em-dash substitutes to clean. Pillar: Applied AI at Platform Scale.
4. **`scalable-data-model.md` rewrite (Flagship Strategic)** — Already featured. Anchor for Governed Data Foundations. The "Five Rules of a Compounding Data Model" framework becomes a quotable artefact. Pillar: Governed Data Foundations.
5. **`semantic-layer-01-why-governed-metrics.md` refresh + reposition as series-entry** — After the new flagship intro is shipped, refresh Part 1 to land cleanly as Part 1 of a packaged series rather than a standalone. Pillar: Governed Data Foundations.

**Posts 6-10 (Phase 3.6 if scoped)**:
6. `ai-crm-automation.md` refresh — Pillar: Applied AI at Platform Scale.
7. `bi-to-data-science-bridge-patterns.md` refresh — Pillar: From BI to AI.
8. `gender-prediction-model-in-practice.md` refresh — Pillar: Applied AI at Platform Scale.
9. `avod-revenue-pipeline-and-alerting.md` refresh — Pillar: Governed Data Foundations.
10. `bi-modernization-lessons.md` refresh — Pillar: Governed Data Foundations.

**Posts 11-15 (batch as a series-refresh session)**: Semantic Layer Parts 2-6 — refresh in one focused session since they share voice patterns and source PDFs.

---

## 6. What This Audit Does Not Cover

- No rewrites executed. Every brief above is a spec for a future session.
- No new content beyond the one new flagship intro for the semantic series.
- No edits to existing post files in this session — copy-edits happen during each post's rewrite/refresh.
- No project case-study audit — that is Phase 4.
- No component changes (author bio module, series landing page) — those are Phase 5.

See `BLOG_VOICE.md` for the voice rubric used here. See `BLOG_STRATEGY.md` for the Rewrite Workflow that each future session follows, plus content pillars, cross-posting, and the blog writing agent plan.
