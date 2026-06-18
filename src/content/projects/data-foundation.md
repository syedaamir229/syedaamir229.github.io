---
title: "Enterprise Data Foundation"
description: "One trusted data model, feature store, and governed semantic layer across five source systems, so BI, ML, and AI build on the same numbers instead of fighting over them."
category: "Data Engineering"
tags: ["Databricks", "Delta Lake", "SSAS", "Power BI"]
featured: true
metrics:
  - label: "Source Systems Unified"
    value: "5"
  - label: "Governed Measures"
    value: "100+"
  - label: "Report Build Time"
    value: "60-70% Faster"
  - label: "Migration Downtime"
    value: "Zero"
order: 1
---

## Challenge

A large subscription-based consumer business ran its analytics on five source systems with diverging schemas and no shared model underneath. Every team wrote its own SQL against raw tables, so the same KPI returned different numbers depending on who asked. Data volumes were growing fast enough that ad hoc queries against raw tables were going unstable. And the reporting estate that sat on top, legacy dashboards plus report-level metric logic copied from file to file, had to be modernized onto the new foundation without ever going dark for leadership.

- **Disconnected source systems**: Engagement, subscription and billing, catalog, and ad-delivery data lived in separate vendor platforms with incompatible schemas
- **Conflicting reporting logic**: Each team wrote its own queries against raw tables, producing inconsistent KPIs for the same business question
- **Growth pressure**: Rising data volumes were making ad hoc queries against raw source tables increasingly unstable and slow
- **Modernization under load**: The legacy reporting stack and the duplicated metric logic inside individual report files had to move onto the new model in parallel with live reporting, with no freeze and no downtime

## Key Decisions

### Decision 1: A medallion architecture, with Gold shaped as a shared feature store

**Problem:** Five source systems with diverging schemas and growing volumes had to serve very different downstream workloads (BI dashboards, ML feature pipelines, AI consumers) without forking into separate ETLs. Within the curated layer, BI needs normalized join-ready tables while ML needs pre-aggregated, feature-engineered tables.

**Options considered:**

- A flat two-stage pipeline: land raw, transform once into a single consumption layer
- A three-stage medallion with Gold as aggregate marts sized for BI
- A three-stage medallion with Gold shaped as a feature store shared by ML and AI consumers

**Chosen:** Three-stage medallion (Bronze immutable raw on S3, Silver conformed fact and dimension tables, Gold as a feature store), with BI consuming Silver through the semantic layer and ML, personalization, and downstream AI consuming Gold.

**Why:** Each stage gets one job. Bronze decouples ingestion from modeling, so schema changes replay without re-extracting from source. Silver applies cleaning and conformance once, so every consumer starts from the same trusted facts. Shaping Gold as a feature store puts the heavy feature engineering in one governed place instead of leaving every ML team to recompute it at query time. This proved load-bearing as downstream work expanded: segmentation, attribute inference, CRM automation, and a voice-of-customer platform all read from this layer rather than rebuilding from raw events.

### Decision 2: Govern every KPI in a semantic layer on top of Gold, not in source connections

**Problem:** Heterogeneous sources with inconsistent latency fed the model. The semantic layer could either reach back to source systems and rebuild the join and cleaning logic itself, or sit on the conformed layer and inherit it. Each domain also settled at a different rate: ad attribution over a multi-week window, account changes over several days, engagement within a day.

**Options considered:**

- Build the semantic model directly on source-system connections
- Build on the conformed Gold/Silver layer with a single uniform refresh
- Build on the conformed layer with tiered, domain-specific refresh cadences

**Chosen:** An SSAS Tabular semantic layer on the conformed layer, with 100+ governed DAX measures and tiered incremental refresh by domain (engagement 1-day, base movement 5-day, ad attribution a multi-week window).

**Why:** The conformed layer already resolves joins and normalizes grain, so building on it keeps the semantic model focused on business definitions, not data plumbing. A single uniform refresh cadence would either under-refresh late-arriving ad data or waste compute reprocessing engagement data that had already settled. Tiering it by domain matches refresh cost to how each domain actually behaves.

### Decision 3: Migrate the BI estate in phases with parallel-run equivalence gates, not a hard cutover

**Problem:** The reporting stack had to move tool, data layer, and metric logic onto the new foundation while reporting stayed live. A hard cutover would force a freeze and concentrate all risk into one switchover with no rollback path.

**Options considered:**

- Full-stack swap in one phase (fast, high-risk, hard to roll back)
- Three sequential phases with a hard cutover at the end of each
- Three sequential phases with parallel running and report-by-report equivalence validation before retiring any legacy asset

**Chosen:** Three sequential phases (tool migration, data-layer alignment, metric governance), each with both versions live until report-by-report equivalence was confirmed.

**Why:** Separating the three change axes contained the blast radius to one layer at a time, and parallel running kept reporting continuous through every cutover. A report that failed equivalence rolled back to legacy without business disruption, and the overlap gave report owners time to adapt rather than absorbing three simultaneous changes.

## Approach

- Designed a three-stage medallion architecture with clear Bronze, Silver, and Gold responsibilities and table-ownership standards
- Landed raw source payloads in Bronze on S3 as the immutable system of record, preserving full fidelity for replay and audit
- Built Silver fact tables for core business events (engagement and subscriptions) and dimension tables for every core entity (customer, catalog, package, device, partner, promotion), plus a `daily_movement` table tracking new, churned, upgraded, downgraded, and reactivated events for cohort and churn analysis
- Built the Gold feature store at the individual-user grain across millions of customer profiles: 45+ features across six categories, refreshed incrementally over recent activity windows with in-pipeline quality checks before publish
- Built an SSAS Tabular semantic layer on the conformed layer with 100+ documented DAX measures across four business domains, served to Power BI over live connection so report files stopped importing their own data
- Ran a three-phase BI modernization: legacy reports to Power BI, repointed onto the new model, then report-level DAX consolidated into shared governed measures, validating equivalence at each phase gate

## Architecture Overview

![Enterprise data foundation architecture: five source systems land in a Bronze layer on S3, flow into Silver conformed fact and dimension tables and a Gold feature store, with a governed SSAS semantic layer on top serving Power BI, and ML and AI consumers reading Gold directly.](/assets/projects/data-foundation.svg)

Five source systems land in Bronze on S3, flow into Silver conformed fact and dimension tables and a Gold feature store. BI consumes Silver through a governed SSAS Tabular semantic layer served to Power BI over live connection; ML, personalization, and downstream AI consumers read Gold feature tables directly.

## Results & Impact

- **What changed in operations**: Teams stopped maintaining parallel query logic and rebuilding KPI definitions per file. One shared model and one governed measure set replaced the fragmented per-team SQL that had been the source of metric disputes
- **What changed in decisions**: Cross-domain analysis that used to require custom joins and reconciliation each time became reproducible and fast, and questioned numbers resolved to "check the measure-definition reference" instead of "ask which team's calculation"
- **What changed in delivery**: New dashboards built on shared measures run an estimated 60-70% faster to develop, and the full reporting estate moved through three architectural changes with zero downtime
- **Foundation leverage**: Every subsequent project builds on this layer. Segmentation, attribute inference, CRM automation, and the voice-of-customer platform all depend on it directly, so the foundation's ROI compounds with each downstream use case

## Reusable Pattern

This pattern (a medallion model with Gold shaped as a feature store, a governed semantic layer on top, and a phased parallel-run migration onto it) applies to any organization with siloed sources and growing analytics, ML, and AI ambitions:

- **Retail and e-commerce**: Customer, order, product, and campaign data unified for both BI reporting and recommendation features
- **Fintech**: Customer, transaction, and risk data structured for both compliance reporting and fraud models
- **Telecom**: Subscriber, usage, package, and billing data consolidated into one layer shared by BI and churn prediction
- **SaaS**: Account, product-usage, and billing data modeled once and consumed by finance, CS, and growth teams

**When this pattern is NOT appropriate**: If your data fits in a single database and your analytics team is small (1-3 people running exploratory work), a layered model is overhead you do not need. It pays off when you have multiple downstream consumers (BI + ML + AI), when source schemas diverge significantly, or when data volumes make ad hoc queries against raw tables unreliable.

## Tech Stack

- **Platform**: Databricks (PySpark, Spark SQL)
- **Storage**: AWS S3, Delta Lake (ACID transactions)
- **Semantic layer**: SSAS Tabular, DAX
- **Reporting**: Power BI (live connection), Tableau (legacy, migrated)
- **Orchestration**: SQL Server Integration Services (SSIS), Databricks Jobs
- **Access management**: Azure Active Directory
- **Architecture**: Medallion (Bronze raw → Silver fact/dim → Gold feature store)
