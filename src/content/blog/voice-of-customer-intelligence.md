---
title: "Voice-of-Customer for Multilingual Streaming: The Five-Layer Stack"
date: 2026-09-16
description: "A five-layer stack turns scattered Arabic-language feedback into a system that answers content-team questions in seconds, on one architectural decision."
og_title: "Voice-of-Customer in Five Layers"
categories: ["AI & Automation", "Data Science"]
draft: true
---

On the morning of a tentpole launch, a product manager filed a request for sentiment on the previous night's premiere. The answer arrived three days later, after exports had been pulled by hand from four platforms, sample-translated from Arabic, sentiment-tagged, aggregated, and assembled into a slide deck. By then the content team had already moved on to the next release. The cycle repeated with the next finale, and the next.

The data was sitting in Twitter, Facebook, YouTube, and the platform's own short-form video surface, mostly in Arabic, in four different schemas, with no shared link back to a title. The answer existed before the question was asked. The pipeline that surfaces it did not.

Every voice-of-customer system either solves that refusal or pretends to. The pretending usually looks like a sentiment dashboard with cross-platform volume charts that nobody opens. The dashboard tells you that volume spiked. It does not tell you what people actually said.

**A voice-of-customer system is either an asset content teams can query or a queue analysts work down. Once it becomes a queue, every release ships with stale feedback and the queue only grows; once it becomes an asset, the answer to "what did people say about Title X last night" arrives in seconds, in the same interface the leadership team is already in.** The way you get there is not a sentiment dashboard or another analyst. It is a five-layer stack with one non-obvious architectural split inside it.

## Why this matters now

The structural problem under every voice-of-customer system is the same: post-level identifiers do not naturally align across platforms. Each social source numbers its content differently, attaches metadata in its own shape, and exposes a different API contract. Without a stack that resolves them to a common identifier, every analyst query against "comments on Title X" is a custom join, and the cost shows up as multi-day turnaround on questions that are structurally simple.

MENA streaming sharpens the problem on two axes. Arabic-language comments arrive in a script half the leadership team cannot skim, household profile-sharing means a single account hides several viewers with different preferences, and release-calendar structure compresses launches into windows that punish slow feedback loops. The cost of a multi-day turnaround is concrete: a content lead green-lights a follow-up the audience did not actually want, or pulls a winner that was performing.

So the projects get scoped. They start. And then most of them get stuck inside the raw ingestion layer, with a beautiful pipeline and no usable consumption interface. Or they ship a sentiment dashboard and never get to natural-language query. Or they wire up one natural-language SQL agent, watch it hallucinate on mixed schemas, and quietly retreat.

The stack below is the shape that holds up. Five layers, each independent, with one non-obvious architectural split inside Layer 4 that decides whether the rest of the system works.

![Architecture diagram of the Voice-of-Customer Stack: four social sources feed raw ingestion, five-stage NLP enrichment in a curated layer, a semantic model with post and comment tables, then two specialized natural-language SQL agents (Comments and Engagement) plus a managed vector index, all routed by a supervisor agent and exposed through a workspace UI.](/assets/blog/voice-of-customer-stack.svg)

*The Voice-of-Customer Stack. Five layers, two specialized natural-language SQL agents, and a managed vector index, all routed by a thin supervisor agent. The two-agent split is the architectural decision that makes the rest of the system work.*

## The Voice-of-Customer Stack

### Layer 1: Raw multi-source ingestion

**What it is.** A raw, versioned data table per source, with minimal schema enforcement, landing daily before an early-morning operational window. Four sources: Twitter posts and threaded replies, Facebook posts and comments (via a marketing-data integration platform that normalises exports from many ad and social channels into one schema), YouTube video comments, and comments on the platform's own short-form video surface. Each table is the audit trail and the reprocessing source. Idempotency is enforced via a composite key of source platform, external identifier, and ingestion timestamp.

**Why it matters.** This is the layer where you make peace with the fact that every platform's API is different. One source returns thread-shape JSON with parent-child relationships. Another ships flattened CSV-style exports with timestamp formats that change by tenant. A third rate-limits aggressively and forces paginated reads. A fourth delivers comments from internal tables on a multi-hour cadence. Trying to standardise these at ingestion is how teams burn three months and ship nothing.

**What goes wrong without it.** Without a raw, versioned ingestion layer, every downstream enrichment job depends on a fragile direct-from-API path. One API change and the whole pipeline breaks. The raw table is what lets you reprocess a missed day without re-hitting the source API, and it is the audit copy when a comment shows up in an executive screenshot weeks later.

### Layer 2: NLP enrichment

**What it is.** A five-stage enrichment pipeline that turns raw comment text into structured, queryable signal. The five stages, in order:

1. **Arabic-to-English translation.** All comment text is translated to English in addition to the original, through a managed LLM endpoint with a domain-specific system prompt that instructs the model to translate OTT terminology directly and return null for gibberish or untranslatable input. Translated text is what the vector index and the natural-language SQL agents run on. Original text is preserved on the row.
2. **Sentiment scoring.** Each comment is classified as positive, neutral, or negative. The score is per-comment, not per-thread.
3. **Profanity detection.** Comments are flagged for moderation workflows. Required for any internal UI that will display real audience comments to product managers.
4. **URL extraction and title mapping.** Comments often contain URLs that point back to an internal title page. Each URL is parsed and resolved to an internal title identifier, the same identifier used by the BI semantic layer. This is the most important enrichment in the entire pipeline, because it is the join key that makes the rest of the system possible.
5. **Platform normalisation.** Field names, timestamp formats, and source labels are standardised across all four platforms. After this layer, a downstream consumer cannot tell which platform a comment came from without reading the source-platform column.

**Why it matters.** This is the layer that pays the dividend on the whole project. The translation stage means a non-Arabic-speaking executive can ask the system a question and get an answer. The URL-to-title mapping is what makes "comments about Title X" a one-column filter instead of a five-table join. The platform normalisation is what makes "comments across all sources" a single query.

**What goes wrong without it.** Without translation, half the data is unreachable. Without URL-to-title mapping, every title-level query is a custom SQL join against a URL parser. Without platform normalisation, every cross-source analysis is a UNION ALL of incompatible schemas. Teams that skip this layer ship a raw-to-agent shortcut and end up with an agent that hallucinates titles because it never had a clean join key.

### Layer 3: Semantic model

**What it is.** Two core tables and one LLM-specific enrichment, partitioned by the date the comment was created, refreshed on a rolling window after Layer 2 completes. A post dimension table with title identifier, title name, season number, episode number, source platform, posted-at timestamp, and original post text. A comment fact table with sentiment, profanity flag, translated text, original text, parent post foreign key, and the resolved title identifier. A third enriched table carries LLM-specific metadata: short summaries of comment clusters, theme tags, and engagement signal aggregations. This is what the comments agent reads from.

**Why it matters.** This is the consumption interface. Every downstream component (the two natural-language SQL agents, the managed vector index, the supervisor agent, the workspace UI APIs) reads from these tables. No downstream component reads from the raw or enrichment layers. This is the discipline that keeps the system simple.

**What goes wrong without it.** Without a clean semantic layer, the natural-language SQL agents have to navigate enrichment-stage schemas with intermediate columns. Agent-to-SQL accuracy collapses because the model cannot reason about which columns to use. The vector index ingests inconsistent enrichment depths across sources. The workspace UI APIs hit the enrichment layer and inherit every intermediate artifact.

### Layer 4: Two specialised natural-language SQL agents, not one

This is the non-obvious move. It is also the architectural decision that makes the rest of the system work.

**What it is.** Two natural-language SQL agents, each scoped to one query domain. The comments agent runs SQL over the enriched comment fact table, with curated sample prompts, field-level metadata, allowed filter clauses, and an explicit "always filter on date greater than or equal to 2025" instruction that scopes it to active content cycles. It answers questions like "how many comments did the finale of Title X get on Twitter last week?", "what is the sentiment distribution across platforms for the last 30 days?", "what percentage of YouTube comments on Title Y were flagged for profanity?". The engagement agent runs SQL over a star schema with a fact-engagement table and dimension tables for address, content, device, package, and demographics. It answers questions like "what are playtime trends for Title X by demographic over the last quarter?", "how does first-watch behaviour differ across devices for the latest tentpole release?". Each agent is configured with table descriptions, field-level comments, allowed filters, sample prompts, and explicit instructions; sample prompts are the single highest-leverage knob.

**Why it matters.** Natural-language-to-SQL reliability is brittle in a specific way: it degrades sharply when a single agent covers divergent schemas and divergent query intents. A question about "sentiment on Title X" and a question about "playtime trends for Title X" hit completely different tables, with completely different join patterns, with completely different filter conventions. A single agent presented with both has to choose at runtime which schema to traverse, and the choice gets wrong often enough to break trust. Splitting the agents lets each ship with a curated set of instructions, sample prompts, and join conventions for one schema. Accuracy goes up. Hallucination goes down. The supervisor agent (next layer) picks the right one at routing time, so the user never has to know which to pick.

**What goes wrong without it.** Teams that ship a single general-purpose agent watch it hallucinate column names on mixed-intent questions, then add more instructions to compensate, then watch the instructions interact, then quietly retreat to writing SQL by hand. This is the most common architectural mistake in voice-of-customer projects.

### Layer 5: Supervisor agent and routing

**What it is.** A supervisor agent that sits in front of the two natural-language SQL agents and a managed vector index, classifies each incoming query, and routes it to the right tool. Three routing decisions. Quantitative ("how many comments did Title X get last week?") routes to the appropriate natural-language SQL agent. Qualitative ("what are people actually saying about the ending of Season 2?") routes to the vector index, which runs semantic retrieval over the translated comment embeddings. Hybrid ("how many comments did Title X get and what are the dominant themes?") triggers both, with results synthesised in the response. The vector index sits in the governed catalog, refreshed over translated comment embeddings on a daily cadence aligned to the early-morning operational window; lineage and access control come from the catalog natively.

**Why it matters.** Routing removes the cognitive overhead of knowing which interface to use. A content lead asks a mixed question and gets back both the structured KPI answer and the narrative summary, without understanding the underlying architecture. The agent also enforces a fallback contract: if the vector index returns no matches, the agent says so explicitly instead of hallucinating a narrative. If the SQL agent returns an empty result set, the agent says so instead of returning a fabricated SQL answer.

**What goes wrong without it.** Without the supervisor, users have to choose between SQL-style questions and free-text questions every time. Adoption falls off a cliff because the interface itself is a barrier. The advantage of the multi-tool architecture is lost.

## The workspace UI: three modes, one supervisor

On top of the stack sits a workspace UI with three modes.

- **Title Chat.** A title-focused workspace where a user picks a show or season from a dropdown and sees sentiment distribution, comment clusters, and engagement KPIs at a glance. A chat panel below the dashboard accepts follow-up questions, routed by the supervisor agent.
- **General Chat.** Free-form conversational interface for cross-platform exploration without title constraint.
- **Custom Post Research.** Built in direct response to a recurring leadership request: paste a post URL or identifier, the system fetches all replies, runs them through the supervisor agent and vector index, returns top themes, sentiment interpretation, and evidence-backed narrative. A multi-day manual analysis becomes a one-minute click-through.

The UI is intentionally minimal. Charts for structure, markdown for narrative responses, session state preserved so the user does not lose context between questions.

## Where I would start

If you have raw social comments landing in a table today, the highest-leverage next move is not the agent. It is the URL-to-title mapping in the enrichment layer.

That is where the dividend compounds. Once every comment carries a title identifier, every downstream question becomes a one-column filter. Title-level sentiment is a GROUP BY. Cross-platform comparison is a UNION ALL. The natural-language SQL agents become tractable. The vector index becomes filterable. Without this enrichment, the rest of the stack is a kit of expensive parts that do not snap together.

Second move: split the natural-language SQL agents by query intent before the first stakeholder asks a mixed question. Splitting after the fact is harder than starting split, because the instructions and sample prompts accumulate around the single-agent assumption.

Third move: build the supervisor agent thin. The agent is a router, not a reasoner. Every line of logic added to the agent is a line you will debug at midnight when a leadership query returns the wrong answer.

## One MENA-flavored note

Arabic-OTT made two parts of this stack non-negotiable. Translation is non-optional because half the comments are Arabic and half the leadership team is not Arabic-first. The date dimension carries explicit Ramadan-window flags (pre-Ramadan, in-Ramadan, post-Ramadan) so that a query about "last month" does not silently average across structurally different release periods. Both of these are easy to retrofit, and both are easier to bake in from day one. Teams building voice-of-customer in a single-language single-cycle market often discover this when they try to extend into MENA later.

## Closing

When the next finale airs tonight, will your product manager have an answer by morning, or by the end of next week?

The teams whose answer is "end of next week" ship dashboards, hire more analysts, and watch the queue grow. The teams whose answer is "by morning" build the stack: raw ingestion that survives API changes, enrichment with title mapping as the load-bearing join, a clean semantic model, two specialised natural-language SQL agents, and a thin supervisor agent that routes by intent. The architectural decision that makes the morning answer possible is the split into two agents. Most teams skip it and end up with a single agent that hallucinates SQL on mixed-intent queries. The work is in the split.
