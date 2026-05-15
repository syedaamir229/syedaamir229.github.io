---
title: "Voice-of-Customer Intelligence Platform"
description: "Unified multilingual social feedback from 4 platforms into a searchable intelligence layer with NLP enrichment, semantic retrieval, and natural-language query interfaces."
category: "AI & Automation"
tags: ["Databricks", "PySpark", "Delta Lake", "NLP", "RAG", "FAISS", "LangGraph", "React", "FastAPI"]
featured: true
metrics:
  - label: "Social Sources Unified"
    value: "4"
  - label: "Sentiment Access Time"
    value: "Hours to seconds"
  - label: "NLP Enrichments"
    value: "5"
  - label: "Genie Spaces + Agent"
    value: "2 + 1"
order: 3
---

# Voice-of-Customer Intelligence Platform

> **Outcome:** Time to access audience sentiment reduced from hours of manual analysis to seconds via natural language query, with 4 social sources unified into a single intelligence platform.

*From fragmented social noise to structured, searchable audience intelligence with natural language Q&A.*

**Organization**: Shahid (MBC Group)
**Role**: AI Automation & Advanced Analytics
**Timeline**: 2024-2025
**Industry**: Media & Entertainment -- AI / NLP
**Ownership**: Key contributor to system design and implementation; contributed to ingestion pipelines, Genie space configuration, and agent routing logic

**Constraints**: Multilingual content (Arabic/English) with no off-the-shelf translation pipeline; confidentiality requirements prevented use of third-party LLM APIs for raw comment data; tight SLA requirement (insights available by 12PM daily) driven by content team's morning review cycle.

Social feedback existed at scale but remained difficult to analyze consistently: scattered across platforms, mostly in Arabic, and requiring analyst effort to surface any pattern.

## Challenge

- **Fragmented inputs**: Comments arrived from 4 platforms with incompatible schemas and no unified identifier
- **Language barrier**: The majority of content was in Arabic, limiting analysis for part of the leadership team
- **Manual analysis overhead**: Collection, translation, and tagging were performed ad hoc, not scalable as content volume grew
- **No self-service**: Business users had to wait on analysts for any audience insight question

## Approach

**Key decisions made along the way:**

> **Decision 1: FAISS over managed vector DB**
> *Options*: Databricks Vector Search (managed), FAISS index in Unity Catalog Volumes (self-managed).
> *Chosen*: FAISS in Unity Catalog Volumes.
> *Why*: Managed vector search added cost and latency overhead not justified by query volume. FAISS on a daily rebuild cycle met the SLA at significantly lower cost, with Unity Catalog providing lineage and access control.

> **Decision 2: Two specialized Genie spaces over one general space**
> *Options*: Single Genie space covering all domains; separate Engagement and Comments spaces.
> *Chosen*: Two specialized Genie spaces.
> *Why*: LLM-to-SQL reliability degrades significantly when a single space covers divergent schemas and query intent. Splitting by domain (engagement KPIs vs. comment semantics) improved query accuracy and reduced hallucination risk.

- Built Bronze to Silver to Semantic (Gold) ingestion pipelines for all 4 social sources with standardized schemas
- Implemented 5-stage NLP enrichment pipeline: Arabic-to-English translation, sentiment scoring, profanity detection, URL extraction-to-content title tagging, platform normalization
- Created two Genie spaces (Engagement and Comments) for reliable LLM-to-SQL across different query intents
- Built a LangGraph Supervisor Agent orchestrating quantitative (Genie), qualitative (RAG retrieval), and routing tools
- Delivered a Databricks App (React + FastAPI) with three query modes: Title Chat, General Chat, and Custom Post Research
- Productionized end-to-end via GitLab CI/CD with scheduled jobs, secrets management, and model serving endpoints

## Architecture Overview

![Voice-of-Customer Platform architecture: social sources flow through Bronze/Silver/Gold layers with NLP enrichment, feeding into Genie spaces, a FAISS vector index, and a LangGraph Supervisor Agent accessible via a React+FastAPI Databricks App](/assets/diagrams/enigma.svg)

Social comments flow through a 3-layer pipeline (Bronze to Silver NLP to Gold Semantic) into three query interfaces (Comments Genie, Engagement Genie, Retrieval Agent) orchestrated by a Supervisor Agent and accessed via a unified Databricks App.

## Results & Impact

- **What changed in operations**: Audience insight workflows that previously took hours of analyst time now execute in seconds via natural language query, available daily before the content team's morning review
- **What changed in decisions**: Product and content teams can now ask "what are audiences saying about [title]?" and get structured sentiment breakdowns across platforms and languages, without a data request
- **Cross-source analysis unlocked**: For the first time, comment volume, sentiment, and engagement trends could be compared across Twitter, Facebook, YouTube, and Shorts in a single interface
- **Reduced SQL dependency**: Two Genie spaces (Engagement + Comments) provide self-service analytics for non-technical stakeholders, reducing ad hoc analyst query requests

## Tech Stack

- **Orchestration**: Databricks Jobs, GitLab CI/CD
- **Processing**: PySpark, Python, Delta Lake (Bronze/Silver/Gold)
- **NLP**: Translation models, sentiment classifiers, profanity detection
- **Retrieval**: FAISS vector index in Unity Catalog Volumes
- **Agents**: Databricks Genie (x2), LangGraph Supervisor Agent
- **Application**: Databricks Apps (React + FastAPI), Model Serving endpoints

## Reusable Pattern

This platform pattern (multi-source ingestion to NLP enrichment to unified semantic layer to natural language query) is transferable to any organization with high-volume unstructured feedback:

- **Retail**: Product and brand sentiment across review platforms and social channels
- **Hospitality**: Multi-channel service feedback monitoring with multilingual support
- **Financial services**: Customer perception and complaint intelligence from social and community forums
- **Healthcare**: Patient and community feedback analysis across platforms

**When this pattern is NOT appropriate**: If your feedback volume is low (< a few thousand records/day) or your team already has a structured NLP pipeline, a simpler approach (direct Genie space over existing tables, or a single RAG endpoint) will suffice. The full Bronze-to-Gold stack adds meaningful value only when source schemas diverge significantly and daily freshness at scale is required.

---

## Related Projects

[CRM Campaign Automation Platform](/projects/jarvis/) | [Enterprise Data Model](/projects/data-model/)

## Related Posts

[Enigma: Voice-of-Customer Intelligence](/blog/enigma-voice-of-customer-intelligence/)
