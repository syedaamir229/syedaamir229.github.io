---
title: "Building a Voice-of-Customer Stack for Multilingual Streaming"
date: 2026-04-13
description: "How we turned scattered, Arabic-language audience feedback from four platforms into a system that answers content-team questions in seconds, and why the non-obvious move was splitting the Genie spaces in two."
categories: ["AI & Automation", "Data Science"]
draft: false
---

I have watched product managers wait days for sentiment answers that already live in the data. On the morning of a tentpole launch, a three-day turnaround is a refusal.

The data is sitting in Twitter, Facebook, YouTube, and the platform's own short-form video surface, mostly in Arabic, in four different schemas, with no shared link back to a title. Pulling exports by hand, sample-translating, tagging sentiment, aggregating, and assembling a slide deck takes the kind of time content windows do not have. By the time the answer arrives, the content team has moved on to the next release. The cycle repeats with the next finale, and the next.

This is the scene every voice-of-customer system either solves or pretends to solve. The pretending usually looks like a sentiment dashboard with cross-platform volume charts that nobody opens. The dashboard tells you that volume spiked. It does not tell you what people actually said.

**Voice of customer is solved when product managers stop filing data requests, not when sentiment dashboards exist.** The path from "the volume spiked" to "here is the actual feedback, here is the sentiment, here is the title-level breakdown, here is the platform comparison" used to require an analyst between the question and the answer.

## Why this matters now

The pressure on audience-feedback systems is going up, not down. In Arabic-OTT specifically, content windows are tighter (finale episodes, Ramadan release cycles, AVOD ad slots that move weekly), and the cost of a slow feedback loop is concrete: a content lead green-lights a follow-up the audience did not actually want, or pulls a winner that was performing.

Across the broader industry the same picture holds. [Atlan's recent write-up on semantic layers](https://atlan.com/know/semantic-layer/) makes the point cleanly: "every BI tool, every notebook, and every AI agent maintains its own translation logic, and when those translations drift, data teams spend days reconciling reports instead of building new ones." For voice of customer the failure is sharper, because there is no central translation logic to begin with. Twitter's `tweet_id` and YouTube's `video_id` and an internal `parent_title_id` do not naturally align. Without a stack that resolves them, every analyst query is a custom join.

So the projects get scoped. They start. And then most of them get stuck inside Bronze, with a beautiful raw-ingestion pipeline and no usable consumption layer. Or they ship a sentiment dashboard and never get to natural-language query. Or they wire up one Genie space, watch it hallucinate SQL on mixed schemas, and quietly retreat.

The pattern that earned its keep was a five-layer stack with one non-obvious split inside it. The split is the part most teams skip.

![Architecture diagram of the Voice-of-Customer Stack: four social sources feed Bronze ingestion, five-stage NLP enrichment in Silver, a Gold semantic model with dim_post and fact_comment, then two specialized Genie spaces (Comments and Engagement) plus a Databricks Vector Search index, all routed by a LangGraph Supervisor Agent and exposed through a Databricks App](/assets/blog/enigma-voice-of-customer-stack.svg)

*The Voice-of-Customer Stack. Five layers, two specialized Genie spaces, and a managed Databricks Vector Search index, all routed by a LangGraph supervisor agent. The two-Genie split is the architectural decision that makes the rest of the system work.*

## The Voice-of-Customer Stack

### Layer 1: Bronze multi-source ingestion

**What it is.** A raw Delta table per source, with minimal schema enforcement, landing daily before an early-morning operational window. Four sources: Twitter posts and threaded replies, Facebook posts and comments (via a marketing-data integration platform that normalises exports from many ad and social channels into one schema), YouTube video comments, and comments on the platform's own short-form video surface. Each table is the audit trail and the reprocessing source.

**Why it matters.** Bronze is the layer where you make peace with the fact that every platform's API is different. Twitter returns thread-shape JSON with parent-child relationships. Facebook via the integration platform ships flattened CSV-style exports with timestamp formats that change by tenant. YouTube's Data API rate-limits aggressively and forces paginated reads. The short-form video surface delivers comments from internal Delta tables on a multi-hour cadence. Trying to standardise these at ingestion is how teams burn three months and ship nothing.

**What goes wrong without it.** Without a raw-Delta layer, every downstream enrichment job depends on a fragile direct-from-API path. One API change and the whole pipeline breaks. The Bronze table is what lets you reprocess a missed day without re-hitting the source API.

**Implementation note.** Each Bronze table writes through a Databricks job scheduled per source. Idempotency is enforced via a composite key of `source_platform`, `external_id`, and `ingested_at`. Retention on Bronze is open-ended: this is the audit copy.

### Layer 2: Silver NLP enrichment

**What it is.** A five-stage enrichment pipeline that turns raw comment text into structured, queryable signal. The five stages, in order:

1. **Arabic-to-English translation.** All comment text is translated to English in addition to the original. Translated text is what the vector index and the Genie SQL run on. Original text is preserved on the row.
2. **Sentiment scoring.** Each comment is classified as positive, neutral, or negative. The score is per-comment, not per-thread.
3. **Profanity detection.** Comments are flagged for moderation workflows. This is required for any internal UI that will display real audience comments to product managers.
4. **URL extraction and title mapping.** Comments often contain URLs that point back to an internal title page. Each URL is parsed and resolved to an internal `parent_title_id`, the same identifier used by the BI semantic layer. This is the most important enrichment in the entire pipeline, because it is the join key that makes the rest of the system possible.
5. **Platform normalisation.** Field names, timestamp formats, and source labels are standardised across all four platforms. After Silver, a downstream consumer cannot tell which platform a comment came from without reading the `source_platform` column.

**Why it matters.** This is the layer that pays the dividend on the whole project. The translation stage means a non-Arabic-speaking executive can ask a Genie space a question and get an answer. The URL-to-title mapping is what makes "comments about Title X" a one-column filter instead of a five-table join. The platform normalisation is what makes "comments across all sources" a single query.

**What goes wrong without it.** Without translation, half the data is unreachable. Without URL-to-title mapping, every title-level query is a custom SQL join against a URL parser. Without platform normalisation, every cross-source analysis is a UNION ALL of incompatible schemas. Teams that skip this layer ship a Bronze-to-Genie shortcut and end up with a Genie space that hallucinates titles because it never had a clean join key.

**Implementation note.** Translation runs through Azure OpenAI's deployment, called from a PySpark UDF with a domain-specific system prompt that instructs the model to translate OTT content terminology directly and return `null` for gibberish or untranslatable input. Sentiment and profanity run as PySpark UDFs on the same job. URL extraction uses a Python parser with platform-specific URL patterns. Each enrichment writes back to a per-source Silver table; consolidation happens in Gold.

### Layer 3: Gold semantic model

**What it is.** Two core tables and one LLM-specific enrichment.

- `dim_post`: post-level dimension table with `parent_title_id`, `title_name`, `season_number`, `episode_number`, `source_platform`, `posted_at`, and original post text.
- `fact_comment`: fully enriched comment-level fact table with sentiment, profanity flag, translated text, original text, parent post foreign key, and the resolved `parent_title_id`.
- A third enriched table carries LLM-specific metadata: short summaries of comment clusters, theme tags, and engagement signal aggregations. This is what the Comments Genie reads from.

**Why it matters.** Gold is the consumption interface. Every downstream component (the two Genie spaces, the Databricks Vector Search index, the Supervisor Agent, the Databricks App APIs) reads from these tables. No downstream component reads from Bronze or Silver. This is the discipline that keeps the system simple.

**What goes wrong without it.** Without a clean Gold layer, the Genie spaces have to navigate enrichment-stage schemas with intermediate columns. LLM-to-SQL accuracy collapses because the model cannot reason about which columns to use. The vector index ingests inconsistent enrichment depths across sources. The app APIs hit Silver and inherit every enrichment artifact.

**Implementation note.** Gold tables are partitioned by `data_date`, the date the comment was created. Retention is rolling. Refresh runs after Silver completes, before the early-morning operational window, giving the content team a full freshness pass by their morning review cycle.

### Layer 4: Two specialised Genie spaces, not one

This is the non-obvious move. It is also the architectural decision that makes the rest of the system work.

**What it is.** Two Databricks Genie spaces, each scoped to one query domain:

- **Comments Genie.** LLM-to-SQL over the enriched comment fact table. Answers questions like "how many comments did the finale of Title X get on Twitter last week?", "what is the sentiment distribution across platforms for the last 30 days?", "what percentage of YouTube comments on Title Y were flagged for profanity?". Configured with curated sample prompts, field-level metadata, allowed filter clauses, and an explicit "always filter on date greater than or equal to 2025" instruction that scopes the Genie to active content cycles.

- **Engagement Genie.** LLM-to-SQL over a star schema with a fact-engagement table and dimension tables for address, content, device, package, and demographics. Answers questions like "what are playtime trends for Title X by demographic over the last quarter?", "how does first-watch behaviour differ across devices for the latest tentpole release?".

**Why it matters.** LLM-to-SQL reliability is brittle in a specific way: it degrades sharply when a single Genie space covers divergent schemas and divergent query intents. A question about "sentiment on Title X" and a question about "playtime trends for Title X" hit completely different tables, with completely different join patterns, with completely different filter conventions. A single Genie space presented with both has to choose at runtime which schema to traverse, and the choice gets wrong often enough to break trust.

Splitting the spaces lets each Genie ship with a curated set of instructions, sample prompts, and join conventions for one schema. Accuracy goes up. Hallucination goes down. The supervisor agent (next layer) picks the right space at routing time, so the user never has to know which to pick.

**What goes wrong without it.** Teams that ship a single general-purpose Genie space watch it hallucinate column names on mixed-intent questions, then add more instructions to the space to compensate, then watch the instructions interact, then quietly retreat to writing SQL by hand. This is the most common architectural mistake in voice-of-customer projects I have seen.

**Implementation note.** Each Genie is configured with table descriptions, field-level comments, allowed filters, sample prompts, and explicit instructions. Sample prompts are the single highest-leverage knob: curated examples increase LLM-to-SQL accuracy more than any metadata tweak. Both Genies are consumed by the Supervisor Agent and are also available directly to analysts who want structured answers without writing SQL themselves.

### Layer 5: Supervisor Agent and routing layer

**What it is.** A LangGraph Supervisor Agent that sits in front of the two Genie spaces and the Databricks Vector Search index, classifies each incoming query, and routes it to the right tool. Three routing decisions:

- **Quantitative** ("how many comments did Title X get last week?") routes to the appropriate Genie space.
- **Qualitative** ("what are people actually saying about the ending of Season 2?") routes to the Databricks Vector Search index, which runs semantic retrieval over the translated comment embeddings.
- **Hybrid** ("how many comments did Title X get and what are the dominant themes?") triggers both, with results synthesised in the response.

**Why it matters.** Routing removes the cognitive overhead of knowing which interface to use. A content lead asks a mixed question and gets back both the structured KPI answer and the narrative summary, without understanding the underlying architecture. The agent also enforces a fallback contract: if the vector index returns no matches, the agent says so explicitly instead of hallucinating a narrative. If the Genie space returns an empty result set, the agent says so instead of returning a fabricated SQL answer.

**What goes wrong without it.** Without the supervisor, users have to choose between SQL-style questions and free-text questions every time. Adoption falls off a cliff because the interface itself is a barrier. The advantage of the multi-tool architecture is lost.

**Implementation note.** The vector index is a Databricks Vector Search index in Unity Catalog, queried via the managed API. The index is refreshed over the translated comment embeddings on a daily cadence aligned to the early-morning operational window. Unity Catalog provides lineage and access control natively, and the managed service handles scaling and authentication without bespoke setup.

## The Databricks App: three modes, one supervisor

On top of the stack sits a Databricks App built with React on the frontend and FastAPI on the backend, deployed through GitLab CI/CD. Three modes:

- **Title Chat.** A title-focused workspace where a user picks a show or season from a dropdown and sees sentiment distribution, comment clusters, and engagement KPIs at a glance. A chat panel below the dashboard accepts follow-up questions, routed by the Supervisor Agent.
- **General Chat.** Free-form conversational interface for cross-platform exploration without title constraint.
- **Custom Post Research.** Built in direct response to a recurring leadership request: paste a Twitter URL or post ID, the system fetches all replies, runs them through the supervisor agent and vector index, returns top themes, sentiment interpretation, and evidence-backed narrative. A multi-day manual analysis becomes a one-minute click-through.

The UI is intentionally minimal. Plotly for charts. Markdown for structured responses. Session state preserved so the user does not lose context between questions.

## What I would build first

If you have raw social comments landing in a Delta table today, the highest-leverage next move is not LLMs. It is the URL-to-title mapping in the Silver layer.

That is where the dividend compounds. Once every comment carries a `parent_title_id`, every downstream question becomes a one-column filter. Title-level sentiment is a `GROUP BY`. Cross-platform comparison is a `UNION ALL`. The Genie spaces become tractable. The vector index becomes filterable. Without this enrichment, the rest of the stack is a kit of expensive parts that do not snap together.

Second move: split the Genie spaces by query intent before the first stakeholder asks a mixed question. Splitting after the fact is harder than starting split, because the instructions and sample prompts accumulate around the single-space assumption.

Third move: build the supervisor agent thin. The agent is a router, not a reasoner. Every line of logic added to the agent is a line you will debug at midnight when a leadership query returns the wrong answer.

## One MENA-flavored note

Arabic-OTT made two parts of this stack non-negotiable. Translation is non-optional because half the comments are Arabic and half the leadership team is not Arabic-first. The dim-date and content-cycle filters had to recognise Ramadan content windows because content release patterns shift inside the cycle and a generic time-grain filter would aggregate across structurally different periods. Both of these are easy to retrofit, and both are easier to bake in from day one. Teams building voice-of-customer in a single-language single-cycle market often discover this when they try to extend into MENA later.

## Closing

Your feedback data is either an asset you can query or a queue your analysts work down. Which one is yours?

The teams that treat it as a queue ship dashboards, hire more analysts, and watch the queue grow. The teams that treat it as an asset build the stack: Bronze ingestion that survives API changes, Silver enrichment with title mapping as the load-bearing join, a clean Gold semantic model, two specialised Genie spaces, and a thin supervisor agent that routes by intent. The architectural decision that makes the asset version work is the split into two Genie spaces. Most teams skip it and end up with a single space that hallucinates SQL on mixed-intent queries. The work is in the split.
