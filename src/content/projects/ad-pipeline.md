---
title: "Ad Inventory & Revenue Pipeline"
description: "Ad revenue pacing surfaced in Slack the same day, instead of the following week through a spreadsheet review."
category: "Data Engineering"
tags: ["Databricks", "GAM API", "AWS S3", "Power BI"]
featured: true
metrics:
  - label: "Production Pipelines"
    value: "4"
  - label: "Teams Unified"
    value: "3"
  - label: "Processing Time Reduction"
    value: "25%"
  - label: "Alert Delivery"
    value: "Same-day"
order: 5
---

## Challenge

A programmatic ad-serving platform's reporting API enforced rate limits that constrained ingestion scheduling, ad impressions settled over a multi-week window for late-arriving attribution requiring periodic historical refreshes on top of daily runs, and three downstream teams with different views into the same pipeline needed shared underlying data without each rebuilding its own ingestion path.

- **No production pipeline**: Critical ad inventory and revenue data was entirely manual, high effort, error-prone, and not scalable
- **Limited observability**: Requests, impressions, bookings, and errors were not connected end-to-end in a single view
- **Late issue detection**: Pacing shortfalls and VAST error spikes were discovered in post-campaign reviews rather than in time to act
- **Low analytical flexibility**: Country, region, format, and content-level slicing required custom query work each time

## Key Decisions

### Decision: Unified staging layer with derived measures rather than per-team pipelines

**Problem:** Three downstream teams needed the same underlying ingest data but with different slicing and business logic applied.

**Options considered:**

- Build separate pipelines per team (independent, but duplicates ingest pulls and derivation logic)
- Build a shared raw + staging layer with derived fields applied once

**Chosen:** Shared raw to staging architecture with derived measures (ad format, ad type, VOD model, device group, content ID via regex) applied once at the staging layer.

**Why:** Reporting-API rate limits make it wasteful to pull the same data multiple times. Centralizing derivation logic ensures all teams calculate the same totals, especially important for revenue figures where discrepancies between teams were a previous source of friction.

## Approach

- Built ingestion from the ad-serving platform's reporting API into S3 raw storage and a Databricks staging pipeline with schema normalization
- Implemented 4 parallel pipelines: Inventory (sell-able ad slots), Impressions (delivered ads + revenue), VAST Errors (error categorization by type), Delivery Pacing (actual vs. booked delivery rate)
- Applied business derivation logic at staging: Ad Format, Ad Type (programmatic/direct), VOD Model (SVOD/AVOD), Device Category Group, Content Media ID via regex
- Configured a daily operational refresh plus a periodic historical-data sweep to capture late-arriving impression and revenue attribution
- Added Slack alerting for pacing shortfalls and VAST error spikes, triggered from pipeline outputs with configurable thresholds
- Delivered Power BI dashboards connected to staging layer for multi-dimensional slicing (country, region, format, content)

## Architecture Overview

![Ad inventory and revenue pipeline architecture: a programmatic ad-serving platform's reporting API to S3 raw storage to Databricks staging, branching into Inventory, Impressions, VAST Errors, and Delivery Pacing pipelines that output to Power BI dashboards and Slack alerts.](/assets/projects/ad-pipeline.svg)

A programmatic ad-serving platform's reporting API feeds into four processing pipelines (Inventory, Impressions, VAST Errors, Delivery Pacing) via S3 raw storage and Databricks staging, with outputs to Power BI dashboards and Slack alerts.

## Results & Impact

- **What changed in operations**: Three downstream teams now work from a shared, automated data layer with no more parallel spreadsheet maintenance or manual data reconciliation between teams
- **What changed in decisions**: Pacing issues and VAST error spikes surface same-day via Slack, allowing the operations team to intervene within the same business day rather than discovering issues post-campaign
- **Content-level revenue visibility**: For the first time, revenue could be attributed to specific content (via Media ID derived from content name), enabling content-performance and monetization analysis
- **Reliable historical data**: the periodic historical-data sweep corrects late-arriving attribution, ensuring weekly revenue reports reflect final settled figures rather than provisional daily numbers

## Reusable Pattern

This Detect-Alert-Act pipeline pattern (daily ingestion to derived measure standardization to threshold-based alerting) is applicable beyond ad operations:

- **E-commerce**: Promotion and conversion funnel observability with revenue pacing alerts
- **Logistics**: Delivery commitment tracking with same-day anomaly notifications
- **SaaS**: Product usage to revenue conversion monitoring with churn-signal alerts
- **Any SLA-driven function**: Event monitoring tied to business impact thresholds and action loops

**When this pattern is NOT appropriate**: If your ad operation is small enough that manual daily review is feasible, or if your analytics platform (e.g., a hosted dashboarding tool connected directly to your ad server) already provides adequate visibility, a full custom pipeline adds overhead rather than value. The custom pipeline becomes essential when you need cross-source attribution (content + ad + subscription), derived business logic not available in native ad-server reporting, or multi-team data sharing.

## Tech Stack

- **Ingestion**: Google Ad Manager API, Python
- **Storage**: AWS S3 (raw), Databricks Delta Lake (staging)
- **Processing**: PySpark, SQL
- **Alerting**: Slack (pacing and error alerts)
- **Reporting**: Power BI
- **Orchestration**: Databricks Jobs (daily + weekly schedules)
