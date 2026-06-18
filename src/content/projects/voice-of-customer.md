---
title: "Voice-of-Customer Intelligence Platform"
description: "Multilingual social feedback from four platforms in one searchable layer that teams can question in plain language."
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

The build had to handle mixed-language, dialect-heavy text under data-governance rules that kept all LLM inference inside the cloud tenant, while still being something non-technical teams could question in plain language.

- **Fragmented inputs**: Comments arrived from 4 platforms with incompatible schemas and no unified identifier
- **Language barrier**: The majority of content was in a non-English language, limiting analysis for part of the leadership team
- **Manual analysis overhead**: Collection, translation, and tagging were performed ad hoc, not scalable as content volume grew
- **No self-service**: Business users had to wait on analysts for any audience insight question

## Key Decisions

### Decision 1: Managed retrieval over a self-managed vector index

**Problem:** Semantic search had to run over a continuously refreshing multilingual corpus while keeping operational overhead low for a small team and respecting data-governance rules that pinned every component to the same tenant.

**Options considered:**

- Self-managed vector index sitting in Unity Catalog Volumes, with custom indexing, serving, and auth
- Managed retrieval service inside the same governance boundary

**Chosen:** Managed retrieval via Databricks Vector Search.

**Why:** Managed retrieval handles scaling, authentication, and lineage natively through Unity Catalog, which removes the operational tax of a self-managed index. Staying inside the same governance boundary also kept all retrieval traffic inside the governance-restricted tenant without bolting on a separate identity and auth layer.

### Decision 2: Split the natural language query surface by domain rather than one generalist surface

**Problem:** Two very different schemas had to be queryable in plain language: engagement KPIs (views, active time, items engaged) and comment semantics (text, sentiment, topics). A single text-to-SQL surface covering both would have to disambiguate intent on every question, which is exactly where LLM-to-SQL reliability degrades fastest.

**Options considered:**

- One generalist text-to-SQL surface covering all tables
- Two specialized surfaces, each scoped to a single coherent schema and query intent, with an upstream router

**Chosen:** Two specialized surfaces (Engagement and Comments) routed by an upstream Supervisor Agent, implemented as Databricks Genie spaces.

**Why:** Narrowing the schema and example set the LLM sees per question improves SQL accuracy and reduces hallucinated joins. The intent-disambiguation problem moves up a layer to the routing agent, which is a cleaner abstraction than asking the text-to-SQL layer to handle both schema reasoning and query routing.

## Approach

- Built a three-stage medallion pipeline (Bronze raw, Silver NLP enrichment, Gold semantic) for all 4 social sources with standardized schemas
- Implemented 5-stage NLP enrichment pipeline: non-English-to-English translation, sentiment scoring, profanity detection, URL extraction-to-item tagging, platform normalization
- Created two Genie spaces (Engagement and Comments) for reliable LLM-to-SQL across different query intents
- Built a LangGraph Supervisor Agent orchestrating quantitative (Genie), qualitative (RAG retrieval), and routing tools
- Delivered a Databricks App (React + FastAPI) with three query modes: Topic Chat, General Chat, and Custom Post Research
- Productionized end-to-end via GitLab CI/CD with scheduled jobs, secrets management, and model serving endpoints

## Architecture Overview

![Voice-of-customer architecture: 4 social sources flow through Bronze, Silver NLP, and Gold semantic layers into Comments Genie, Engagement Genie, and a Retrieval Agent, orchestrated by a Supervisor Agent inside a Databricks App.](/assets/projects/voice-of-customer.svg)

Social comments flow through a 3-layer pipeline (Bronze to Silver NLP to Gold Semantic) into three query interfaces (Comments Genie, Engagement Genie, Retrieval Agent) orchestrated by a Supervisor Agent and accessed via a unified Databricks App.

## Results & Impact

- **What changed in operations**: Audience insight workflows that previously took hours of analyst time now execute in seconds via natural language query, on demand for any non-technical stakeholder
- **What changed in decisions**: Non-technical stakeholders can now ask "what are customers saying about [topic]?" and get structured sentiment breakdowns across platforms and languages, without a data request
- **Cross-source analysis unlocked**: For the first time, comment volume, sentiment, and engagement trends could be compared across all four platforms in a single interface, covering long-form social, short-form video, and an owned community surface
- **Analyst time reclaimed**: Ad hoc query requests for audience sentiment and engagement dropped, freeing analyst capacity for the deeper investigations that still need a human in the loop

## Reusable Pattern

This platform pattern (multi-source ingestion to NLP enrichment to unified semantic layer to natural language query) is transferable to any organization with high-volume unstructured feedback:

- **Retail**: Product and brand sentiment across review platforms and social channels
- **Hospitality**: Multi-channel service feedback monitoring with multilingual support
- **Financial services**: Customer perception and complaint intelligence from social and community forums
- **Healthcare**: Patient and community feedback analysis across platforms

**When this pattern is NOT appropriate**: If your feedback volume is low (< a few thousand records/day) or your team already has a structured NLP pipeline, a simpler approach (direct Genie space over existing tables, or a single RAG endpoint) will suffice. The full Bronze-to-Gold stack adds meaningful value only when source schemas diverge significantly and daily freshness at scale is required.

## Tech Stack

- **Orchestration**: Databricks Jobs, GitLab CI/CD
- **Processing**: PySpark, Python, Delta Lake (Bronze/Silver/Gold)
- **NLP**: Translation models, sentiment classifiers, profanity detection
- **Retrieval**: Databricks Vector Search index in Unity Catalog
- **Natural language query**: Databricks Genie (Engagement and Comments spaces)
- **Agents**: LangGraph Supervisor Agent
- **Application**: Databricks Apps (React + FastAPI), Model Serving endpoints
