---
title: "Customer Intelligence Copilot"
description: "Plain-language answers and sentiment from a corpus of customer reviews, with every answer traceable to the exact reviews it came from."
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
DRAFT: written ahead of the build (Week 3, L18). `draft: true` keeps this off the live site.
The design-stable sections (Challenge, Approach, Architecture, Tech Stack, My Role) are written in
final voice. The Results & Impact section, the metrics row, and the demo video / screenshots are
placeholders, to be trued up against the real build before flipping `draft: false`. Do not publish
until the build exists and the placeholders are filled.
-->

## Challenge

Open a product's review feed and the answer you need is in there somewhere, buried in a few thousand lines of inconsistent free text. The question is simple, "what are people actually saying about X?", and answering it is not. Nobody can read all of it, and a hand-written summary that drops the original quote is just an opinion with better grammar.

Feedback at that volume is only useful if you can ask it questions directly and trust what comes back. Without that, every insight waits on an analyst, and every claim is unverifiable.

- Thousands of reviews sit in free text with no way to ask a direct question across them.
- Reading and tagging tone by hand does not scale past a few hundred records.
- Every "what are people saying about X?" question waits on someone to pull, read, and summarize first.
- Summaries drop the original quote, so no one can check whether a claim is actually backed by what customers wrote.

## Approach

Two calls shaped the build.

The first was where to put the vectors. I could stand up a dedicated vector database built for similarity search, or keep documents and embeddings together in managed Postgres with the pgvector extension. I chose Supabase Postgres with pgvector. A purpose-built vector store is a second system to run, sync, and secure; keeping documents and their embeddings in one Postgres instance means semantic search and ordinary SQL filters run in a single query, it is free to start, and it mirrors how a small client would actually run this without buying specialized infrastructure. The pattern scales far enough for the volumes this targets.

The second was how the model answers. A free-form general model is fluent but ungrounded, and it will happily invent sentiment; a fine-tuned classifier is accurate on tone but rigid and no good for open questions. I went with retrieval-augmented generation where every answer cites the specific reviews it drew from. Grounding each answer in retrieved reviews keeps it honest and checkable, needs no training run, and reflects new reviews the moment they land. The whole thing lives or dies on "show me the quote," so retrieval-grounding is the point, not an optimization.

Around those two calls sat the build itself:

- Ingested a public customer-reviews dataset, split each review into chunks, and generated embeddings for semantic search.
- Stored documents and vectors together in Supabase Postgres with pgvector, so semantic search and SQL filters run in one query.
- Built a retrieval step that pulls the most relevant reviews per question and passes them to the model with a grounding instruction, then returns an answer that cites the reviews behind it.
- Scored sentiment per review and rolled it up, so the app shows tone alongside the answer.
- Wrapped the flow in a web app where anyone can ask a question in plain language and see the answer, the sentiment, and the underlying reviews side by side.

## Results & Impact

<!--
PLACEHOLDER: fill from the real build before un-drafting. No fabricated impact here.
This is a demo over public data, so results stay descriptive (what the system demonstrably does),
not commercial. Capture once built:
  - question to sourced answer in seconds, with no analyst in the loop
  - every answer carries the reviews it came from, so claims are checkable
  - sentiment rolled up per topic alongside the answer
  - the demo-scale proof of the production Customer Intelligence pattern
Also wire in the 5-10 min demo video (Tella / Loom / Descript) and 2-3 UI screenshots here.
-->

## Architecture

![Customer Intelligence Copilot architecture: a public reviews corpus is chunked and embedded into a Supabase pgvector store, each question retrieves the most relevant reviews, a language model answers from them with citations, a sentiment pass rolls up tone, and both surface in a single web app.](/assets/projects/customer-intelligence-copilot.svg)

A public reviews corpus is chunked and embedded into Supabase pgvector. Each question retrieves the most relevant reviews, the language model answers from those reviews with citations, and a sentiment pass rolls up tone, all surfaced in one web app where the answer, the sentiment, and the source reviews sit side by side.

## Tech Stack

- **Storage**: Supabase (Postgres with pgvector for documents and embeddings)
- **Embeddings & Generation**: OpenAI (text embeddings and answer synthesis)
- **Processing**: Python (ingestion, chunking, retrieval API)
- **Application**: Web app (plain-language Q&A and sentiment view)
- **Sources**: Public customer-reviews dataset

## My Role

I built this end to end as a working demo of the Customer Intelligence pattern: the ingestion and chunking, the pgvector store, the retrieval-grounded answer flow with citations, the sentiment roll-up, and the web app around it. The pattern transfers anywhere a team is drowning in free-text feedback it cannot query, from product reviews to support tickets to guest or patient comments. It is the wrong tool when the feedback is already structured (numeric ratings, fixed survey fields) or low-volume enough to read directly: RAG earns its keep only when the answer lives in unstructured text and the volume is past what a person will sit and read.
