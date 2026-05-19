---
title: "Enterprise Data Model for Streaming Analytics"
description: "One trusted data model across five source systems and three downstream surfaces, ending data silos and accelerating BI, ML, and AI delivery."
category: "Data Engineering"
tags: ["Databricks", "Delta Lake", "AWS S3", "PySpark"]
featured: true
metrics:
  - label: "Source Systems Unified"
    value: "5"
  - label: "Faster Data Retrieval"
    value: "30%"
  - label: "Downstream Consumers"
    value: "BI + ML + AI"
  - label: "Data Volume Scale"
    value: "5x"
order: 2
---

## Challenge

Source schemas diverged across four vendor systems (viewing, subscriptions, content, ads), data volumes were growing fast enough that ad hoc queries against raw tables were destabilizing, and the model had to serve both BI and data science consumers without forking into separate ETL workstreams.

- **Disconnected source systems**: Subscription, viewing, content, and ad data lived in separate vendor platforms with incompatible schemas
- **Conflicting reporting logic**: Each team wrote their own queries against raw tables, producing inconsistent KPIs for the same business question
- **Slow cross-team analysis**: Any cross-domain analysis (e.g., content performance by subscription type) required manual join work before results could be trusted
- **Growth pressure**: Rising data volumes were making ad hoc queries against raw source tables increasingly unstable and slow

## Key Decisions

### Decision 1: Adopt a medallion architecture (Bronze, Silver, Gold) rather than a flatter pipeline

**Problem:** Five source systems with diverging schemas and growing data volumes needed a model that could absorb schema drift, support replay from source, and serve very different downstream workloads (BI dashboards, ML feature pipelines, AI consumers) without forking into separate ETLs.

**Options considered:**

- Two-stage pipeline: land in S3, transform once into a unified consumption layer
- Three-stage medallion: Bronze (raw, immutable), Silver (cleaned and conformed fact and dim), Gold (curated for consumers)

**Chosen:** Three-stage medallion architecture. Bronze as the immutable raw landing zone on S3, Silver as Delta tables for normalized facts and dimensions, Gold as Delta tables for the feature store.

**Why:** Each stage has one well-defined job. Bronze decouples ingestion from modeling, so schema changes and modeling bugs can be replayed without re-extracting from vendor APIs. Silver applies cleaning, conformance, and joins once so every downstream consumer starts from the same trusted facts and dimensions. Gold is shaped for specific consumers. A flatter pipeline collapses these jobs into one, which forces brittle tradeoffs: either schema changes break the model, or the consumption layer carries both join logic and feature engineering and ends up slow for everyone.

### Decision 2: Shape Gold as a feature store rather than aggregate marts

**Problem:** Within the Gold layer, BI workloads need normalized, join-ready tables for dashboards, while ML and data science workloads need pre-aggregated, feature-engineered tables with behavioral signals already computed.

**Options considered:**

- Gold as aggregate marts (pre-summarized tables sized for BI dashboards)
- Gold as a feature store (user-level and user-content features for ML and AI consumers)

**Chosen:** Gold as a feature store. BI consumes Silver directly via the semantic layer; ML, personalization, and downstream platforms consume Gold.

**Why:** Aggregate marts duplicate work the semantic layer is already doing on top of Silver, while leaving ML teams to compute features at query time. Shaping Gold as a feature store puts the heavy feature engineering in one governed place that both ML pipelines and downstream AI consumers can share. This proved load-bearing as downstream workloads expanded: a downstream CRM automation platform and a downstream voice-of-customer platform consume Gold features; the semantic layer and dashboards consume Silver tables.

## Approach

- Designed three-stage medallion architecture with clear Bronze, Silver, and Gold responsibilities and table ownership standards
- Landed raw source payloads in Bronze on S3 as the immutable system of record, preserving full source fidelity for replay and audit
- Built Silver fact tables for core business events: viewing sessions and subscriptions
- Built Silver dimension tables for all core entities: user, content (episode/season/show hierarchy), package, device, partner, address, promotion
- Implemented `daily_movement` table in Silver for subscriber lifecycle tracking: new, churned, upgraded, downgraded, reactivated events, enabling cohort and churn analysis
- Built user-level and user-content feature store tables (`user_features`, `user_content_features`) as the Gold layer for ML and personalization consumers
- Aligned model requirements with analytics and data science teams before build, ensuring downstream use cases remained consistent and no rework was required

## Architecture Overview

![Enterprise data model architecture: specialised source systems (video-analytics, subscription-management, programmatic ad-serving, content-metadata) land in a Bronze layer on S3, flow into Silver fact and dimension tables and a Gold feature store, consumed by BI, ML, and AI workloads.](/assets/projects/enterprise-data-model.svg)

Specialised source systems (a video-analytics platform, a subscription-management platform, a programmatic ad-serving platform, a content-metadata system) land in Bronze on S3, flow into Silver fact and dimension tables and Gold feature store tables, and are consumed by downstream BI, ML, and AI workloads.

## Results & Impact

- **What changed in operations**: Teams stopped maintaining parallel query logic. One shared model replaced the fragmented per-team SQL workbooks that had been the source of metric disputes
- **What changed in decisions**: Cross-domain analysis (content performance by subscription type, ad revenue by viewer segment) became reproducible and fast, instead of requiring custom joins and reconciliation each time
- **Foundation leverage**: Every subsequent project built on this model. The Semantic Layer, Ad Inventory & Revenue Pipeline, downstream CRM automation, and a downstream voice-of-customer platform all depend on it directly. The ROI of the data model compounds with each downstream use case.
- **Scalability**: Delta Lake on S3 with ACID transactions enabled reliable incremental processing at growing data volumes, replacing the ad hoc query instability that had emerged before the model

## Reusable Pattern

This medallion architecture pattern (Bronze for immutable raw landing, Silver for normalized fact/dim, Gold as a feature store) applies to any organization with siloed source systems and growing analytics/ML ambitions:

- **Retail and e-commerce**: Customer, order, product, and campaign data unified for both BI reporting and recommendation model features
- **Fintech**: Customer, transaction, and risk data structured for both compliance reporting and fraud detection models
- **Telecom**: Subscriber, usage, package, and billing data consolidated into one layer shared by both BI dashboards and churn prediction models
- **Healthcare**: Patient, provider, and operational data integrated once and consumed by both reporting and clinical ML use cases

**When this pattern is NOT appropriate**: If your data fits in a single database and your analytics team is small (1-3 people running exploratory work), the infrastructure overhead of a layered model is not justified. The layered architecture pays off when you have multiple downstream consumers (BI + ML + AI), when source system schemas diverge significantly, or when data volumes make ad hoc queries against raw tables unreliable.

## Tech Stack

- **Platform**: Databricks (PySpark + Spark SQL)
- **Storage**: AWS S3, Delta Lake (ACID transactions)
- **Sources**: Youbora, Evergent, Google Analytics/Mediagenix, Google Ad Manager
- **Architecture**: Medallion (Bronze raw → Silver fact/dim → Gold feature store)
