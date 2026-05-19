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

- **Granularity gap**: Existing features represented accounts, not individual profiles
- **Targeting limitations**: Campaign logic could not isolate profile-level behavior
- **Modeling constraints**: ML teams needed consistent profile features, not raw event tables
- **Scale requirement**: Feature refresh had to support millions of active profiles

## Approach

- Designed a feature pipeline to transform event data into profile-level signals
- Built feature groups across watch behavior, engagement, affinity, and lifecycle indicators
- Implemented incremental updates to avoid full recomputation overhead
- Added validation checks to maintain stable feature quality over time
- Published feature outputs for CRM targeting, recommendation inputs, and data science workflows

## Architecture Overview

![Profile-level feature store architecture: viewing events and Gold-layer signals flow into an incremental feature pipeline producing 45+ features per profile, written to a single Delta table for CRM, ML, and reporting consumers.](/assets/projects/profile-features.svg)

Viewing events and account-level signals from the Gold layer flow into an incremental feature pipeline that emits 45+ features across 6 categories. Household-share derivations sit alongside content consumption and engagement quality, all written to a single Delta table. CRM, ML, and reporting consumers read from there.

## Results & Impact

- Profile-level targeting became operational for campaign and personalization use cases
- Audience segmentation quality improved with finer behavioral context
- Downstream clustering and prediction projects gained higher-quality model inputs
- Teams adopted one reusable feature layer instead of building duplicate feature logic

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
