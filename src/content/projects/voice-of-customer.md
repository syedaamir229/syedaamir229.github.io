---
title: "Voice-of-Customer Intelligence Platform"
description: "Feedback from four social sources unified into one searchable layer that anyone can question in plain language, turning hours of analyst work into seconds."
category: "AI & Automation"
tags: ["Databricks", "Vector Search", "LangGraph", "Genie"]
featured: true
metrics:
  - label: "Social Sources Unified"
    value: "4"
  - label: "Sentiment Access Time"
    value: "Hours to seconds"
  - label: "Languages Supported"
    value: "Multilingual"
  - label: "Self-Service Query"
    value: "Natural language"
order: 3
---

## Challenge

Someone in leadership wants to know what customers are saying about a new feature, and the honest answer is "give an analyst a day." The comments exist, thousands of them, scattered across four social platforms in a language half the room cannot read. By the time the collection, translation, and tagging finish, the question has moved on.

For a large subscription-based consumer business, audience sentiment is the early-warning system, and a day of latency dulls it. The data was there, but it was trapped: four incompatible schemas, mostly non-English text, and a small team manually stitching it together every time a question came up. On top of that, a data-governance rule pinned every component, including all LLM inference, inside the cloud tenant, so anything off-the-shelf and external was out.

- Comments arrived from four platforms with incompatible schemas and no shared identifier to join on.
- Most content was in a non-English language, which put it out of reach for part of the leadership team.
- Collection, translation, and tagging were done by hand, ad hoc, and did not scale as volume grew.
- Any audience question routed through an analyst, so business users waited on a queue for what should be a self-service answer.

## Approach

Two calls carried the rest of the work.

The first was retrieval. We could have stood up a self-managed vector index in object storage, with custom indexing, serving, and auth, but for a small team that is a standing operational tax, and it would have meant bolting a separate identity layer onto the governance-restricted tenant. We chose managed retrieval inside the same governance boundary instead. It handles scaling, authentication, and lineage natively, and every retrieval call stays inside the tenant where the data already lives. The point was to keep us writing analysis, not babysitting an index.

The second was the natural-language query surface. Two very different schemas had to be answerable in plain English: engagement metrics on one side, comment semantics like text, sentiment, and topics on the other. A single text-to-SQL surface spanning both would have to disambiguate intent on every question, and that is exactly where LLM-to-SQL reliability falls apart fastest. So rather than one generalist surface, we built two specialized ones, each scoped to a single coherent schema, with a routing agent above them deciding where a question belongs. Narrowing the schema and examples the model sees per question lifts SQL accuracy and kills hallucinated joins; the intent problem moves up to the router, which is a cleaner place to solve it than inside the SQL layer.

Around those two decisions sat the build:

- A three-stage medallion pipeline (Bronze raw, Silver NLP enrichment, Gold semantic) that normalized all four social sources into standardized schemas.
- A five-stage NLP enrichment step: non-English-to-English translation, sentiment scoring, profanity detection, URL extraction-to-item tagging, and platform normalization.
- Two natural-language query spaces, one for engagement and one for comments, each tuned to its own schema and query intent.
- A supervisor agent orchestrating the quantitative path (the query spaces), the qualitative path (semantic retrieval), and the routing between them.
- A delivered web application with three query modes (Topic Chat, General Chat, and Custom Post Research) over a single interface.
- End-to-end productionization through CI/CD: scheduled jobs, secrets management, and model-serving endpoints.

## Results & Impact

- Audience-insight questions that used to take hours of analyst time now resolve in seconds through plain-language query, on demand for any non-technical stakeholder.
- A stakeholder can ask "what are customers saying about this topic?" and get a structured sentiment breakdown across platforms and languages, with no data request and no wait.
- For the first time, comment volume, sentiment, and engagement trends could be compared across all four platforms in one interface, spanning long-form social, short-form video, and an owned community surface.
- Ad hoc requests for audience sentiment dropped sharply, which gave analysts their time back for the deeper investigations that still need a human in the loop.

## Architecture

![Voice-of-customer architecture: feedback from four social sources flows through Bronze, Silver NLP enrichment, and Gold semantic layers into a comments query space, an engagement query space, and a retrieval agent, all orchestrated by a supervisor agent inside a single web application.](/assets/projects/voice-of-customer.svg)

Feedback from the four social sources flows through a three-layer pipeline (Bronze to Silver NLP to Gold semantic) into three query interfaces: a comments query space, an engagement query space, and a retrieval agent. A supervisor agent routes each question to the right interface, and everything is accessed through a single web application.

## Tech Stack

- **Orchestration**: Databricks Jobs, CI/CD
- **Processing**: PySpark, Python, Delta Lake (Bronze/Silver/Gold)
- **NLP**: Translation models, sentiment classifiers, profanity detection
- **Retrieval**: Databricks Vector Search index in Unity Catalog
- **Natural language query**: Databricks Genie (engagement and comments spaces)
- **Agents**: LangGraph supervisor agent
- **Application**: Databricks Apps (React + FastAPI), Model Serving endpoints

## My Role

This was a three-person build, the three of us splitting the medallion and NLP pipelines, the retrieval and query-space design, the supervisor agent, and the application between us. The pattern transfers to any organization sitting on high-volume, multi-source, unstructured feedback that non-technical teams need to question directly. It earns the full Bronze-to-Gold stack only when source schemas diverge sharply and daily freshness at scale matters; below a few thousand records a day, a single query space or one retrieval endpoint over existing tables will do the job for far less.
