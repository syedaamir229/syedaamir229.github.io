---
title: "Enterprise Data Model for Streaming Analytics"
description: "Five source systems consolidated into one trusted data model that BI, ML, and AI now share across a MENA OTT platform."
category: "Data Engineering"
tags: ["Databricks", "Delta Lake", "AWS S3", "PySpark"]
featured: true
metrics:
  - label: "Source Systems Unified"
    value: "5"
  - label: "Faster Data Retrieval"
    value: "30%"
  - label: "Data Accuracy"
    value: "99%"
  - label: "Data Volume Scale"
    value: "5x"
order: 2
---

## Challenge

Source schemas diverged across vendors (a video-analytics platform for viewing, a subscription-management platform for subscriptions, a content-metadata system for content, a programmatic ad-serving platform for ads). Data volumes were growing fast enough that ad hoc queries were destabilizing, and the model had to serve both BI and data science consumers without forking into separate ETL workstreams.

- **Disconnected source systems**: Subscription, viewing, content, and ad data lived in separate vendor platforms with incompatible schemas
- **Conflicting reporting logic**: Each team wrote their own queries against raw tables, producing inconsistent KPIs for the same business question
- **Slow cross-team analysis**: Any cross-domain analysis (e.g., content performance by subscription type) required manual join work before results could be trusted
- **Growth pressure**: Rising data volumes were making ad hoc queries against raw source tables increasingly unstable and slow

## Key Decisions

### Decision: Separate Silver (fact/dim) and Gold (feature store) layers rather than a single flat model

**Problem:** BI workloads need normalized, join-ready tables for dashboards; ML/data science workloads need pre-aggregated, feature-engineered tables with behavioral signals.

**Options considered:**

- Single unified layer (simpler, but mixes grain across consumers)
- Silver + Gold separation (more structure, but serves both consumers cleanly)

**Chosen:** Two-layer architecture. Silver for normalized fact and dimension tables, Gold for derived feature store.

**Why:** A single layer forces trade-offs: either BI queries are slower (if the layer is feature-store-shaped) or ML features have to be computed at query time (if the layer is BI-shaped). Separating the layers allows each consumer to operate at its natural grain. This proved essential as downstream workloads expanded: a downstream CRM automation platform and a downstream voice-of-customer platform consume Gold features; the semantic layer and dashboards consume Silver tables.

## Approach

- Designed layered architecture with clear Silver and Gold responsibilities and table ownership standards
- Built fact tables for core business events: viewing sessions and subscriptions 
- Built dimension tables for all core entities: user, content (episode/season/show hierarchy), package, device, partner, address, promotion
- Implemented `daily_movement` table for subscriber lifecycle tracking: new, churned, upgraded, downgraded, reactivated events, enabling cohort and churn analysis
- Built user-level and user-content feature store tables (`user_features`, `user_content_features`) as the Gold layer for ML and personalization consumers
- Aligned model requirements with analytics and data science teams before build, ensuring downstream use cases remained consistent and no rework was required

## Architecture Overview

![Enterprise data model architecture: specialised source systems (video-analytics, subscription-management, programmatic ad-serving, content-metadata) flow through S3 raw storage into Silver fact and dimension tables and a Gold feature store, consumed by BI, ML, and AI workloads.](/assets/projects/data-model.svg)

Specialised source systems (a video-analytics platform, a subscription-management platform, a programmatic ad-serving platform, a content-metadata system) flow through S3 raw storage into Silver fact/dimension tables and Gold feature store tables, consumed by downstream BI, ML, and AI workloads.

## Results & Impact

- **What changed in operations**: Teams stopped maintaining parallel query logic. One shared model replaced the fragmented per-team SQL workbooks that had been the source of metric disputes
- **What changed in decisions**: Cross-domain analysis (content performance by subscription type, ad revenue by viewer segment) became reproducible and fast, instead of requiring custom joins and reconciliation each time
- **Foundation leverage**: Every subsequent project built on this model. The Semantic Layer, Ad Inventory & Revenue Pipeline, downstream CRM automation, and a downstream voice-of-customer platform all depend on it directly. The ROI of the data model compounds with each downstream use case.
- **Scalability**: Delta Lake on S3 with ACID transactions enabled reliable incremental processing at growing data volumes, replacing the ad hoc query instability that had emerged before the model

## Reusable Pattern

This Silver/Gold layered architecture pattern (normalized fact/dim tables for BI, derived feature store for ML/AI) applies to any organization with siloed source systems and growing analytics/ML ambitions:

- **Retail and e-commerce**: Customer, order, product, and campaign data unified for both BI reporting and recommendation model features
- **Fintech**: Customer, transaction, and risk data structured for both compliance reporting and fraud detection models
- **Telecom**: Subscriber, usage, package, and billing data consolidated into one layer shared by both BI dashboards and churn prediction models
- **Healthcare**: Patient, provider, and operational data integrated once and consumed by both reporting and clinical ML use cases

**When this pattern is NOT appropriate**: If your data fits in a single database and your analytics team is small (1-3 people running exploratory work), the infrastructure overhead of a layered model is not justified. The layered architecture pays off when you have multiple downstream consumers (BI + ML + AI), when source system schemas diverge significantly, or when data volumes make ad hoc queries against raw tables unreliable.

## Tech Stack

- **Platform**: Databricks (PySpark + Spark SQL)
- **Storage**: AWS S3, Delta Lake (ACID transactions)
- **Sources**: Youbora, Evergent, Google Analytics/Mediagenix, Google Ad Manager
- **Architecture**: Bronze (raw) to Silver (fact/dim) to Gold (feature store)
