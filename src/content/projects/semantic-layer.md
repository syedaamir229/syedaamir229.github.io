---
title: "Enterprise Semantic Layer & KPI Framework"
description: "One governed definition of every KPI across three data sources and four business domains, ending metric disputes and shrinking report build time."
category: "BI & Analytics"
tags: ["SSAS", "DAX", "Power BI", "SSIS"]
featured: true
metrics:
  - label: "Query Performance Improvement"
    value: "50%"
  - label: "Weekly Hours Saved"
    value: "15"
  - label: "Governed DAX Measures"
    value: "100+"
  - label: "Report Build Time Reduction"
    value: "60-70%"
order: 1
---

## Challenge

Three heterogeneous data sources had to be unified under one model that served both Power BI PPU and SSAS live-connection users simultaneously, all without disrupting existing reports during migration.

- **Metric inconsistency**: The same KPI had conflicting definitions across teams. Subscriber counts, engagement rates, and ad fill rates all calculated differently per department
- **Slow report builds**: Every new dashboard required rebuilding core KPI logic from scratch against raw tables
- **Manual reconciliation overhead**: Analysts spent significant time validating conflicting numbers before any business decision could be trusted
- **Governance gap**: No central place existed for approved, documented KPI definitions. Logic lived inside individual report files

## Key Decisions

### Decision 1: Semantic layer on top of Gold tables, not directly on source systems

**Options considered:**

- Build the semantic model directly on source system connections (a subscription-management platform, a video-analytics platform, a programmatic ad-serving platform)
- Build on top of the enterprise data model's Gold layer

**Chosen:** Build on Gold layer tables from the enterprise data model.

**Why:** Source systems have heterogeneous schemas and inconsistent latency. The Gold layer already resolves joins, normalizes grain, and applies business rules. Using it as the semantic foundation avoids duplicating transformation logic and keeps the semantic model focused on business definitions, not data plumbing.

### Decision 2: Domain-specific partition refresh cadences

**Options considered:**

- Full daily refresh of all tables
- Incremental refresh with a uniform lookback window for all domains

**Chosen:** Tiered incremental refresh by domain (Engagement: 1-day, Base Movement: 5-day, Ad Impressions: a multi-week window for late-arriving attribution).

**Why:** Ad impression data settles over a multi-week window due to late-arriving attribution; subscriber base movement requires a 5-day lookback for accurate churn/retention calculations; engagement data is final within 1 day. Applying a uniform cadence to all domains either under-refreshes ad data or over-processes engagement data unnecessarily.

## Approach

- Built SSAS Tabular semantic model on top of Gold layer tables from the enterprise data model
- Integrated 3 external data pipelines into the semantic layer job: ad-impression and inventory data, a subscriber-domain dataset, and reference data from a lightweight collaborative source
- Implemented 4-notebook automated refresh pipeline: Staging to Dimension tables to Fact tables to SSAS model refresh (with dependency sequencing)
- Defined 100+ DAX measures across 4 business domains with documented definitions in a published measure-definition reference
- Connected Power BI reports via live dataset connection, eliminating the need for local data imports in report files
- Built performance monitoring solution: Windows Performance Monitor, Extended Events query statistics, Dynamic Management Views, and a dedicated SSAS performance monitoring dataset

## Architecture Overview

![Enterprise semantic layer architecture: Gold layer tables, ad-impression and inventory data, a subscriber-domain dataset, and a lightweight reference-data source feeding an SSAS Tabular semantic model that serves Power BI via live connection.](/assets/projects/semantic-layer.svg)

Upstream Gold layer tables, feed into the SSAS Tabular semantic model via an automated 4-stage refresh job, serving Power BI reports via live connection.

## Results & Impact

- **What changed in operations**: Report teams stopped rebuilding KPI logic per file. All new dashboards now use shared, governed measures from the semantic layer as their starting point
- **What changed in decisions**: Metric disputes dropped significantly; when a number was questioned, the answer was "check the measure-definition reference" rather than "ask which calculation each team used"
- **Report development velocity**: New dashboards built on top of shared measures are estimated 60-70% faster to develop than the previous approach of building directly against source tables
- **Governance foundation**: The semantic layer became the authoritative reference for KPI definitions across the organisation, referenced in data documentation, onboarding materials, and stakeholder discussions

## Reusable Pattern

This pattern (governed semantic layer with domain-specific refresh cadences and documented measure definitions) applies to any organization where teams report different numbers for the same KPI:

- **SaaS**: Product, revenue, and customer health metrics defined once and shared across product, finance, and CS teams
- **Retail**: Conversion, margin, and inventory measures shared across merchandising, finance, and operations
- **Financial services**: Consistent portfolio, risk, and compliance metrics with a documented, auditable definition layer
- **Healthcare**: Standard operational and financial KPIs across facilities, removing reconciliation overhead in board reporting

**When this pattern is NOT appropriate**: If your organization has fewer than 3-5 teams actively building reports, or if your data volume is small enough that a single Power BI file with imported data covers your needs, a full SSAS semantic model is over-engineering. A simpler approach (shared Power BI dataset with a few certified measures) will cover the governance need without the infrastructure overhead.

## Tech Stack

- **Semantic model**: SSAS Tabular (SQL Server Analysis Services)
- **KPI definitions**: DAX (Data Analysis Expressions)
- **Reporting**: Power BI (live connection to SSAS model)
- **Source integration**: SQL Server, Databricks (Gold layer tables)
- **Automation**: SQL Server Integration Services (SSIS), Databricks Jobs
- **Monitoring**: Windows Performance Monitor, SQL Server Extended Events, DMVs
