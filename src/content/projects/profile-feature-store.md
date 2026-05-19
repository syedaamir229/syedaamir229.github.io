---
title: "Profile-Level Feature Store"
description: "Profile-level behavior features that sharpen targeting and give ML and personalization teams a shared starting point."
category: "Data Engineering"
tags: ["Databricks", "PySpark", "Spark SQL", "Delta Lake"]
featured: false
metrics:
  - label: "Features Per Profile"
    value: "45+"
  - label: "Feature Categories"
    value: "6"
  - label: "Refresh Cadence"
    value: "Daily"
order: 7
---

## Challenge

Behavioral features had to be computed at the individual profile grain across millions of profiles, refreshed daily without full recomputation, and serve a stable shared contract for CRM targeting, recommendation logic, and downstream ML.

- **Granularity gap**: Existing features represented accounts, not individual profiles
- **Targeting limitations**: Campaign logic could not isolate profile-level behavior
- **Modeling constraints**: ML teams needed consistent profile features, not raw event tables
- **Scale requirement**: Feature refresh had to support millions of active profiles

## Key Decisions

### Decision 1: One shared profile-level feature table, not per-consumer feature tables

**Problem:** CRM, recommendations, and ML each wanted their own behavioral features, and absent a shared layer each team built the same aggregations from raw event data. The duplicated logic guarantees drift the moment any one team updates a definition.

**Options considered:**

- Per-consumer feature tables (team autonomy, but duplicated logic and silent drift)
- One shared feature table that every consumer reads from
- One shared raw layer plus per-consumer derived layers (compromise, but adds a second hop without removing duplication)

**Chosen:** One shared feature table partitioned by date, consumed directly by CRM, ML, and reporting.

**Why:** The moment the same behavioral aggregation lives in two places, the two definitions diverge. A single shared table forces alignment and gives every consumer the same starting point. The threshold for centralization (three or more downstream consumers reading the same logic) was already met by CRM, ML, and reporting, so the build paid for itself across multiple teams from day one.

### Decision 2: Incremental refresh keyed on recent event windows, not full recomputation

**Problem:** Full daily recomputation across millions of profiles and 45+ features is wasteful when most features change only for profiles with recent activity. The cost scales with the wrong dimension: total profile count rather than active behavior.

**Options considered:**

- Full recomputation each day (simplest, but cost grows with the profile base)
- Event-driven streaming refresh (lowest latency, highest operational cost)
- Incremental batch refresh over recent event windows with in-pipeline validation

**Chosen:** Incremental batch refresh bounded by recent activity windows, with in-pipeline feature quality checks before publish.

**Why:** A daily refresh cadence does not justify streaming infrastructure, and full recomputation costs scale with total profile count rather than activity volume. Incremental refresh keeps cost bounded by recent activity, so the pipeline stays flat in cost even as the profile base grows. The in-pipeline quality checks catch silent feature-quality regressions before they propagate to downstream consumers.

## Approach

- Designed a feature pipeline to transform event data into profile-level signals
- Built feature groups across watch behavior, engagement, affinity, and lifecycle indicators
- Implemented incremental updates to avoid full recomputation overhead
- Added validation checks to maintain stable feature quality over time
- Published feature outputs for CRM targeting, recommendation inputs, and data science workflows

## Architecture Overview

![Profile-level feature store architecture: viewing events and Gold-layer signals flow into an incremental feature pipeline producing 45+ features per profile, written to a single Delta table for CRM, ML, and reporting consumers.](/assets/projects/profile-feature-store.svg)

Viewing events and account-level signals from the Gold layer flow into an incremental feature pipeline that emits 45+ features across 6 categories. Household-share derivations sit alongside content consumption and engagement quality, all written to a single Delta table. CRM, ML, and reporting consumers read from there.

## Results & Impact

- **What changed in targeting**: Campaign and personalization logic became operational at the profile grain rather than the account grain, so household members stopped being treated as one undifferentiated user
- **What changed in modeling**: Downstream clustering and prediction projects started from a shared, validated feature set rather than rebuilding features per project
- **What changed in operations**: One reusable feature layer replaced duplicated feature code across CRM, ML, and reporting workstreams, so a definition change propagates in one place
- **Foundation for downstream work**: Audience segmentation, attribute inference, and CRM automation all read from this layer rather than from raw events

## Reusable Pattern

The same pattern applies anywhere precision at entity level matters:

- **E-commerce**: Shopper-level behavior features for recommendations and retention
- **Fintech**: Customer-level risk and engagement features for scoring workflows
- **Gaming**: Player-level progression and activity features for lifecycle actions
- **SaaS**: User-level product adoption features for growth and churn programs

**When this pattern is NOT appropriate**: A shared feature layer needs three or more downstream consumers to justify its build cost. With one consumer, you're building infrastructure for an audience of one. Wait until you can see the duplicated feature logic showing up across two or three teams before centralising it.

## Tech Stack

- **Platform**: Databricks (PySpark + Spark SQL)
- **Storage**: Delta Lake (single feature table, date-partitioned)
- **Sources**: Gold-layer viewing events and account-level signals
- **Processing**: Incremental refresh job avoiding full recomputation
- **Validation**: In-pipeline feature quality checks before publish
- **Output**: Single Delta table (consumed by CRM, ML, BI)
