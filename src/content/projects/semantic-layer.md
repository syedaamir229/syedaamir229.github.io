---
title: "Enterprise Semantic Layer & KPI Framework"
description: "One governed definition of every KPI, moved onto a dedicated tabular engine that removed the capacity ceiling, so teams stopped arguing over numbers and started building on shared measures."
category: "BI & Analytics"
tags: ["SSAS", "DAX", "Power BI", "SSIS"]
featured: false
metrics:
  - label: "Query Performance"
    value: "50% Faster"
  - label: "Governed Measures"
    value: "100+"
  - label: "Report Build Time"
    value: "60-70% Faster"
  - label: "Migration Downtime"
    value: "Zero"
order: 2
---

## Challenge

A governed KPI layer was hitting the memory ceiling of an in-tool capacity model as data volumes grew, while the same KPI still returned different numbers depending on which team you asked.

- **Metric inconsistency**: The same KPI carried conflicting definitions across teams. "Active" meant trials included to one team and excluded to another, an account to one and an individual profile to the next. Every reconciliation meeting ran long and settled nothing
- **Capacity ceiling**: The governed model ran on a premium-capacity reporting tier and pushed against its memory limits as volumes climbed. Refreshes lengthened and queries degraded, and buying more capacity only moved the same ceiling further out
- **Report-local logic drift**: Every new dashboard rebuilt KPI logic inside its own file. The same measure took three shapes across the estate, and nothing in the build pipeline caught the drift
- **Reconciliation overhead**: Analysts spent their time proving numbers instead of analysing them, and every leadership conversation opened with "which number is correct?" instead of "what do we do next?"
- **No governed definition layer**: There was no central place for approved, documented KPI definitions. The logic lived inside individual report files and in the heads of the people who wrote them

## Key Decisions

### Decision 1: Migrate the engine to SSAS Tabular, not buy more in-tool capacity

**Problem:** The governed model had outgrown the memory headroom of its premium-capacity reporting tier. The model could stay where it was and absorb a larger capacity tier, or move to a dedicated tabular engine with explicit partition and memory control. Each path had different consequences for recurring cost, refresh control, and how long the headroom would last.

**Options considered:**

- Scale up the premium-capacity tier (fast, but a recurring cost that returns the same ceiling at the next volume step)
- Optimise the existing in-tool model (buys months of headroom, not a structural fix)
- Migrate the model to SSAS Tabular, served to the reporting tool over live connection (dedicated memory and partition control, at the cost of a migration)

**Chosen:** Migrate the governed model to SSAS Tabular and serve it to Power BI over live connection.

**Why:** A dedicated tabular engine gave explicit partition control and memory headroom that scaling the in-tool capacity tier could not, and it stopped the recurring capacity bill from climbing while the same ceiling returned. The live connection also decoupled the model lifecycle from the reporting tool: report files stopped importing their own data and started consuming governed measures by name, which is what made the model the single source of truth rather than one copy among many.

### Decision 2: Govern every KPI in a three-layer DAX stack with published contracts

**Problem:** KPI logic lived in report files and drifted. An audit of one high-traffic KPI returned three different formulas across three reports, none producing the same number for the same period. A model alone does not fix this: without a measure-engineering discipline above it, the same KPI keeps taking new shapes every time a report is built.

**Options considered:**

- A certified shared dataset with a handful of blessed measures (light to stand up, but governance stops at the dataset boundary and report-local DAX continues)
- Per-report measures with a published style guide (no enforcement, so drift continues unchecked)
- A layered measure model with a published contract per measure and a named owner per KPI domain

**Chosen:** A three-layer DAX stack (base aggregations, business measures, consumption logic) with a published contract for every governed measure and an explicit owner per domain.

**Why:** Layering keeps base measures as pure aggregations, business measures referencing base measures only, and consumption measures referencing business measures only, so a change in one layer propagates cleanly to the layer above instead of forking into spaghetti. The per-measure contract (business meaning, expression, data grain, included and excluded segments, validation query, last approved date) turns a measure from a dataset entry into a product the next consumer can adopt without a phone call, and gives change requests a published definition to review against instead of tribal knowledge.

## Approach

- Migrated the governed KPI layer from the premium-capacity reporting tier to SSAS Tabular, served to Power BI over live connection so report files stopped importing their own data
- Built measures in a three-layer DAX stack: base aggregations (event counts, active base, impressions), business KPIs (net adds, churn rate, ARPU, retention, engagement) composed from base measures with `DIVIDE` and explicit fallbacks, and a consumption layer for time-intelligence windows and segment cuts
- Defined 100+ governed DAX measures across four business domains, each with a published contract covering meaning, grain, inclusions, exclusions, a validation query, and a named owner
- Implemented tiered incremental partition refresh by domain (engagement one-day, base movement five-day, ad attribution a multi-week window) sequenced through a staging to dimension to fact to model-process loop with dependency ordering
- Routed every KPI change through three release gates: owner approval against a published change summary, a measure regression suite run against pre-release baselines, and a documented rollback path before any deploy
- Built a performance-monitoring loop over query statistics, Extended Events, and Dynamic Management Views, with a weekly triage that traced each slow query to its cause layer (model, refresh, or report) and assigned an owner and a close date

## Architecture Overview

![Governed semantic layer architecture: conformed fact and dimension tables feed an SSAS Tabular model migrated off a premium-capacity tier, where measures are layered as base, business, and consumption, secured by role and refreshed by incremental partition, then served to Power BI over live connection and to ad-hoc analysis, with release gates and weekly monitoring around the model.](/assets/projects/semantic-layer.svg)

Conformed fact and dimension tables feed an SSAS Tabular model migrated off the premium-capacity tier. Inside the model, measures are layered base to business to consumption, secured by role, and refreshed by domain-specific incremental partitions. Power BI consumes governed measures by name over live connection, and the same model serves ad-hoc analysis. Release gates and a weekly monitoring loop wrap the model so changes deploy safely and slow queries are caught before they reach a leadership review.

## Results & Impact

- **What changed in operations**: Report teams stopped rebuilding KPI logic per file. Every new dashboard now starts from shared, governed measures consumed by name, and report development runs an estimated 60-70% faster than building directly against raw tables
- **What changed in decisions**: Metric disputes resolved to "check the measure contract" instead of "ask which team's calculation", and leadership conversations started on what to do next rather than on which number was correct
- **What changed in capacity**: Moving to a dedicated tabular engine removed the memory ceiling the in-tool model kept hitting and improved query performance by roughly 50%, and the full estate migrated with zero reporting downtime through parallel running and report-by-report equivalence checks
- **Foundation for downstream work**: The governed measure set became the authoritative KPI reference cited in data documentation, onboarding, and stakeholder reviews, and the same trusted numbers now feed downstream ML and AI consumers rather than each team recomputing its own

## Reusable Pattern

This pattern (a governed semantic layer with layered measures, published contracts, and a dedicated tabular engine when the model outgrows in-tool capacity) applies to any organisation where teams report different numbers for the same KPI and the governed model has started straining its reporting tier:

- **SaaS**: Product, revenue, and customer-health metrics defined once and shared across product, finance, and customer success, with the model sized for a dedicated engine once self-serve query volume climbs
- **Fintech**: Portfolio, risk, and compliance metrics with an auditable, documented definition layer, where the contract per measure doubles as the audit artefact
- **Telecom**: Subscriber, usage, and billing KPIs consolidated into one governed model shared by finance, marketing, and operations instead of per-team spreadsheets
- **E-commerce**: Conversion, margin, and inventory measures governed once and reused across merchandising, finance, and operations, with incremental partitions matched to how each domain settles

**When this pattern is NOT appropriate**: If fewer than three or four teams build reports, or the data fits comfortably in a single imported model, a dedicated tabular engine is over-engineering. A certified shared dataset with a few blessed measures covers the governance need without the infrastructure overhead. The tabular migration earns its cost only once the governed model hits the capacity ceiling of its reporting tier and partition-level refresh control becomes the constraint.

## Tech Stack

- **Semantic model**: SSAS Tabular (SQL Server Analysis Services)
- **KPI definitions**: DAX (three-layer measure stack with per-measure contracts)
- **Reporting**: Power BI (live connection to the tabular model)
- **Sources**: SQL Server, Databricks (conformed Gold tables)
- **Orchestration**: SQL Server Integration Services (SSIS), Databricks Jobs
- **Monitoring**: SQL Server Extended Events, Dynamic Management Views, query statistics
