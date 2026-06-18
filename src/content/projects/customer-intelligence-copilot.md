---
title: "Customer Intelligence Copilot"
description: "A working demo that turns a public corpus of customer reviews into plain-language answers and sentiment, with every answer backed by the reviews it came from."
category: "AI & Automation"
tags: ["Supabase", "pgvector", "OpenAI", "RAG"]
featured: true
draft: true
kind: "personal"
metrics:
  # TODO: true up against the real build before un-drafting. Provisional descriptors only.
  - label: "Question to Answer"
    value: "Seconds"
  - label: "Every Answer"
    value: "Source-cited"
  - label: "Sentiment"
    value: "Auto-scored"
order: 1
---

<!--
DRAFT — written ahead of the build (Week 3, L18). `draft: true` keeps this off the live site.
The design-stable sections (Challenge, Key Decisions, Approach, Architecture Overview, Reusable
Pattern, Tech Stack) are written in final voice. The Results & Impact section, the metrics row, and
the demo video / screenshots are placeholders, to be trued up against the real build before flipping
`draft: false`. Do not publish until the build exists and the placeholders are filled.
-->

## Challenge

Customer reviews pile up faster than anyone can read them, and the signal a team needs sits buried in unstructured, inconsistent free text.

- **Unsearchable feedback**: Thousands of reviews sit in free text with no way to ask a direct question across them
- **Sentiment by hand**: Reading and tagging tone manually does not scale past a few hundred records
- **Answers wait on an analyst**: Every "what are people saying about X?" question needs someone to pull, read, and summarize first
- **No source of truth**: Summaries drop the original quote, so no one can check whether a claim is actually backed by what customers wrote

## Key Decisions

### Decision 1: Managed Postgres with pgvector over a dedicated vector database

**Problem:** The system needs semantic search over the review corpus, but a demo that a small team could realistically run should not depend on standing up and operating specialized vector infrastructure.

**Options considered:**

- Dedicated vector database (purpose-built for similarity search, but a second system to run, sync, and secure)
- Managed Postgres with a vector extension (one store for documents and vectors, slightly less specialized at very large scale)

**Chosen:** Supabase Postgres with the pgvector extension.

**Why:** Keeping documents and their embeddings in one Postgres instance means semantic search and ordinary SQL filters run in a single query, with no separate vector service to operate or keep in sync. It is free to start, and it mirrors how a small client would actually run this without buying specialized infrastructure. The pattern scales far enough for the volumes this system targets.

### Decision 2: Retrieval-grounded answers with mandatory source quotes over a tuned or free-form model

**Problem:** The answer has to be trustworthy. A confident summary that no one can trace back to a real review is worse than no answer, because it launders an opinion as evidence.

**Options considered:**

- Free-form generation from a general model (fluent, but ungrounded and prone to inventing sentiment)
- A fine-tuned classifier (accurate on sentiment, but rigid, slow to update, and no good for open questions)
- Retrieval-augmented generation with required citations (grounded and current, at the cost of a retrieval step)

**Chosen:** Retrieval-augmented generation where every answer cites the specific reviews it draws from.

**Why:** Grounding each answer in retrieved reviews keeps it honest and checkable, needs no training run, and reflects new reviews the moment they land. The credibility of the whole demo rests on "show me the quote," so retrieval-grounding is the point, not an optimization.

## Approach

- Ingested a public customer-reviews dataset, split each review into chunks, and generated embeddings for semantic search
- Stored documents and vectors together in Supabase Postgres with pgvector, so semantic search and SQL filters run in one query
- Built a retrieval step that pulls the most relevant reviews for each question and passes them to the language model with a grounding instruction
- Generated answers that cite the specific reviews behind them, so every claim links back to a source quote
- Scored sentiment per review and rolled it up, so the app shows tone alongside the answer
- Wrapped the flow in a web app where anyone can ask a question in plain language and see the answer, the sentiment, and the underlying reviews

## Architecture Overview

![Customer Intelligence Copilot architecture: a public reviews corpus is chunked and embedded into a Supabase pgvector store, each question retrieves the most relevant reviews, a language model answers from them with citations, a sentiment pass rolls up tone, and both surface in a single web app.](/assets/projects/customer-intelligence-copilot.svg)

A public reviews corpus is chunked and embedded into Supabase pgvector. Each question retrieves the most relevant reviews, the language model answers from those reviews with citations, and a sentiment pass rolls up tone, all surfaced in one web app where the answer, the sentiment, and the source reviews sit side by side.

## Results & Impact

<!--
PLACEHOLDER — fill from the real build before un-drafting. No fabricated impact here.
This is a demo over public data, so results stay descriptive (what the system demonstrably does),
not commercial. Capture once built:
  - What changed in access: question to sourced answer in seconds, no analyst in the loop
  - What stays honest: every answer carries the reviews it came from, so claims are checkable
  - What sentiment adds: tone rolled up per topic alongside the answer
  - Foundation for client work: the demo-scale proof of the production Customer Intelligence pattern
Also wire in the 5-10 min demo video (Tella / Loom / Descript) and 2-3 UI screenshots here.
-->

## Reusable Pattern

This pattern (ingest unstructured feedback to embeddings to retrieval-grounded answers with sentiment) applies anywhere a team is drowning in free-text feedback it cannot query:

- **E-commerce**: Product reviews and return reasons, asked in plain language with sentiment by product line
- **SaaS**: Support tickets and churn surveys turned into answerable, sourced themes
- **Hospitality**: Guest reviews across booking sites monitored for tone and recurring complaints
- **Healthcare**: Patient feedback surfaced with the exact comments behind each summary

**When this pattern is NOT appropriate**: If your feedback is already structured (numeric ratings, fixed survey fields) or low-volume enough to read directly, a dashboard or a spreadsheet beats a retrieval system. RAG earns its keep only when the answer lives in unstructured text and the volume is past what a person will sit and read.

## Tech Stack

- **Storage**: Supabase (Postgres with pgvector for documents and embeddings)
- **Embeddings & Generation**: OpenAI (text embeddings and answer synthesis)
- **Processing**: Python (ingestion, chunking, retrieval API)
- **Application**: Web app (plain-language Q&A and sentiment view)
- **Sources**: Public customer-reviews dataset
