---
title: "Semantic Layer Series Part 2 of 6: The Three Ownership Layers"
date: 2023-07-10
description: "The architecture decision that decides whether a semantic layer scales: drawing clean ownership boundaries between data engineering, metric engineering, and report engineering before the first measure ships."
categories: ["BI & Analytics", "Data Engineering"]
draft: false
series: semantic-layer
series_part: 2
---

A Friday-evening deploy of a semantic-model release at Shahid. The deployment script ran. The retain-partitions-and-roles flag in the wizard had not been checked. Saturday morning every fact table was empty. Sunday was restore-from-backup. Monday's dashboards were wrong, and Monday's leadership meeting happened anyway.

That incident did not happen because the script was wrong or the model was wrong. It happened because data engineering, metric engineering, and report engineering had been three responsibilities living on two people, and the release that touched all three layers ran without anyone watching the one most likely to break.

**Most semantic-layer failures look like deployment failures and turn out to be ownership-boundary failures.** A semantic layer only works when ownership is split into three clean layers, each with a named owner, a defined release path, and a contract with the layers above and below. Mixing the three roles is where teams accumulate the operating risk that eventually surfaces as an outage.

![Semantic Layer Technical Architecture: Databricks Gold tables feed a Model Build Layer (Tabular project, DAX measures, validation, deployment artifact), then a Semantic Model with KPI definitions, role security, incremental partitions, which serves dashboards and ad-hoc analysis.](/assets/blog/semantic-series-02-architecture-flow.svg)

*Clear boundaries between data preparation, semantic model build, and report consumption keep ownership and quality controls simple.*

## The Three Ownership Layers

### Layer 1: Data engineering owns curated tables

This layer contains conformed fact and dimension tables plus the staging helpers needed for model efficiency. At Shahid the relevant table families are lifecycle facts (`fact_subscriptions`, the daily movement table), engagement facts (`fact_engagement`), ad facts (`fact_ad_impressions`, `fact_ad_inventory`), and conformed dimensions (`dim_subscriber`, `dim_content`, `dim_device`, `dim_date` with explicit Ramadan flags).

The semantic layer does not correct broken upstream pipelines. It consumes governed inputs. Crossing this boundary (writing measure logic that compensates for a broken Silver-layer join, for example) is how the semantic layer absorbs every upstream problem and becomes unmaintainable.

### Layer 2: Metric engineering owns the semantic model

This is where metrics become reusable products: the tabular project definition, relationships and hierarchies, base and business measures, role-based access, partition strategy. Build outputs are packaged as deployment artifacts so releases are controlled and reproducible.

The discipline here is that no measure logic crosses into Layer 1 (no upstream data fixes) or Layer 3 (no report-local copies of a measure). The owner of this layer is the only person authorising measure changes.

### Layer 3: Report engineering owns consumption

Report developers connect live to the model and focus on layout, narrative, and decision support. KPI logic stays in the semantic model. The report consumes measures by name and adds zero local DAX.

The boundary that fails most often is the one between Layer 2 and Layer 3. When report developers re-author measures locally, the semantic model loses its single-source-of-truth status, and Layer 2's owner inherits a maintenance burden that does not show up in their backlog.

## End-to-End Data Flow

The flow used in this project:

1. Upstream jobs produce refreshed curated tables.
2. Semantic model build process updates structures and measures in development.
3. Validation checks pass before deployment.
4. Deployment artifact promotes changes while preserving critical objects.
5. Refresh process updates partitions and processes the model.
6. Reports consume updated measures without local reimplementation.

This sounds straightforward, but only works reliably when change control and refresh control are treated as first-class engineering concerns.

## Design Decisions That Reduced Failure Modes

### Keep helper transformations outside report files

Certain mapping and compression logic belongs in data preparation or model tables, not in individual reports.

### Preserve partition and role continuity during deployment

Replacing a model without preserving partition and role state creates avoidable operational risk.

### Separate model engineering from report engineering

Model engineering focuses on correctness, reuse, and performance. Report engineering focuses on usability and narrative. Blending both in each report slows everything.

## Minimal Architecture Checklist

Before scaling a semantic layer, confirm these controls are in place:

- curated table inputs have stable grain and keys
- measure ownership and review path are documented
- deployment process preserves partitions and roles
- refresh dependency order is explicit
- report teams consume shared measures by default

## What This Enables

Once architecture is stable, adding metrics becomes safer and faster because:

- measure logic is reusable
- dashboard delivery time drops
- KPI changes are governed and auditable
- quality checks become repeatable

This is the point where semantic layers stop being a BI improvement and become an analytics operating model.

## Build Walkthrough: From Curated Tables to Live Model

### Prerequisites

- curated fact and dimension tables with stable keys
- semantic model project (SSDT or equivalent tabular project)
- DAX authoring and model validation tooling
- deployment process that preserves roles and partitions

### Step 1: Validate source-table contracts

Before modeling, validate grain and key health with SQL baselines.

```sql
-- Example: verify one row per subscriber per day in movement fact
SELECT
  event_date,
  COUNT(*) AS rows_in_day,
  COUNT(DISTINCT subscriber_id) AS subscribers_in_day
FROM fact_subscriptions
GROUP BY event_date
ORDER BY event_date DESC;
```

If grain is unstable, stop and fix upstream. Do not encode data corrections inside report logic.

### Step 2: Build model objects in this order

1. add dimensions (`dim_subscriber`, `dim_content`, `dim_device`, `dim_date`)
2. add facts (`fact_subscriptions`, `fact_engagement`, `fact_ad_impressions`, `fact_ad_inventory`)
3. define relationships and cardinality explicitly
4. mark date table and time hierarchy
5. add base measures only

### Step 3: Add governance objects

1. create role definitions for access scope
2. group measures by domain folders
3. add descriptions for business-critical fields and measures
4. run model best-practice checks before deployment

### Step 4: Configure refresh and partitions

1. define partitioning by date for large fact tables
2. set processing order: dimensions first, then facts
3. configure incremental ranges per fact family
4. validate partition counts after processing

### Step 5: Publish to report consumers

1. deploy model to target semantic server
2. publish BI dataset with live connection
3. migrate pilot reports to semantic measures only
4. validate report outputs against baseline checks

### Done Criteria

- all pilot dashboards run on semantic measures only
- KPI deltas are explained and documented
- no local KPI formulas remain in pilot reports
- refresh pipeline completes within agreed SLA

## Closing

Where does your semantic-layer ownership stop, and where does it leak?

When the answer is "the team owns everything from staging to report layout," the layer is not ownership-clean and the next outage is already on the schedule. When the boundaries are explicit and a named owner sits at each layer, the deployment script can run on a Friday evening and the dashboards still come up on Monday morning.

The next post in the series, [Part 3: The Three-Layer DAX Stack](/blog/semantic-layer-03-kpi-engineering-with-dax/), walks through how measure logic is engineered once the ownership boundary at Layer 2 is enforced.
