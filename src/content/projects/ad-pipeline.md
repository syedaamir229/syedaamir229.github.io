---
title: "Ad Inventory & Revenue Pipeline"
description: "Pacing shortfalls and inventory pressure surface during the campaign, in time to act, instead of reconciling make-goods after it ends."
category: "Data Engineering"
tags: ["Databricks", "Google Ad Manager", "S3", "Power BI"]
featured: true
metrics:
  - label: "Pacing Visibility"
    value: "Same-day"
  - label: "Settlement Refresh"
    value: "Multi-week"
  - label: "Operating Signals"
    value: "4"
order: 5
---

## Challenge

The reporting API enforced rate limits that constrained ingestion scheduling, programmatic impressions settled over a multi-week window for late-arriving attribution, and three downstream teams reading the same data needed one shared definition rather than rebuilding it three ways.

- **Pacing shortfalls visible too late**: Delivery against booked commitments was tracked in a hand-rebuilt spreadsheet, so under-pacing surfaced at end-of-flight when the only remaining lever was the make-good
- **Late-arriving attribution eroded trust**: Programmatic impressions settle over a multi-week window, so a daily-only view drifted from final figures and finance kept a side spreadsheet against the dashboard
- **Inventory blind at the content level**: Sellable slots were known in aggregate but not by title, so soft windows where new AVOD-eligible content would clear stayed invisible to Content Operations
- **VAST errors hidden inside aggregate impressions**: Revenue looked healthy on the dashboard while specific error categories silently eroded effective fill rate, surfacing weeks later in finance reconciliation

## Key Decisions

### Decision 1: Daily refresh plus a multi-week historical sweep

**Problem:** Programmatic impressions settle over a multi-week window for late-arriving attribution. A daily-only pipeline is always slightly wrong, and the errors compound over a reporting week.

**Options considered:**

- Daily-only ingestion (simplest, but provisional numbers drift from final figures)
- One-shot historical backfill on demand (catches settlement, but reactive and bursty)
- Daily operational refresh plus a periodic sweep over the recent multi-week window

**Chosen:** Daily refresh in an early-morning window for same-day decisions, plus a periodic historical sweep that re-pulls the recent multi-week window.

**Why:** Weekly revenue reports have to reflect final settled figures, not provisional daily numbers. The moment finance keeps a side spreadsheet against the dashboard, the pipeline stops being the source of truth. Splitting schedules separates the use cases cleanly: daily for same-day decisions, periodic for reporting-grade accuracy.

### Decision 2: Centralize derivation logic at the staging layer

**Problem:** Four downstream pipelines (Inventory, Impressions, Delivery Pacing, VAST Errors) all need the same derived fields. Repeating the derivation in each pipeline guarantees drift the first time the logic changes.

**Options considered:**

- Derive per pipeline (simplest, but every change has to land in four places)
- Derive in the BI semantic layer (one place, but every downstream consumer pays the cost again, and Slack alerts cannot use it)
- Derive once at the staging layer and let every consumer read the same prepared fields

**Chosen:** Apply derivation logic once at staging, then let every operating signal and Slack alert read the same prepared fields.

**Why:** Three teams reading the same data needed one shared definition rather than rebuilding it three ways. Centralizing derivation at staging makes the staging layer the contract: reporting, alerting, and ad-hoc queries all share it without each consumer re-implementing media ID regex or device-group rollups. The fix lives in one file, not four.

## Approach

- Built ingestion from the ad-serving platform's reporting API into S3 raw storage and a Databricks staging layer
- Implemented the four operating signals as parallel pipelines: Inventory (sellable slots by content, country, format), Impressions (delivered ads and revenue), Delivery Pacing (actual vs. booked), VAST Errors (trended over time)
- Applied derivation logic once at staging: ad format, ad type, device category group, content media ID via regex
- Configured a daily operational refresh plus a periodic historical sweep over the recent multi-week settlement window
- Wired Slack alerts to business-impact thresholds defined by Ad Operations: pacing fires when a flight is on track to miss its commitment, error alerts fire on sustained category shifts rather than transient spikes
- Delivered Power BI dashboards on the staging layer, shared across Ad Operations, Content Operations, and finance

## Architecture Overview

![Ad inventory and revenue pipeline architecture: a programmatic ad-serving platform's reporting API to S3 raw storage to Databricks staging, branching into Inventory, Impressions, VAST Errors, and Delivery Pacing pipelines that output to Power BI dashboards and Slack alerts.](/assets/projects/ad-pipeline.svg)

The reporting API feeds S3 raw storage and a Databricks staging layer where derivation is applied once. Four downstream pipelines implement the operating signals, feeding shared Power BI dashboards and Slack alerts for pacing and error events that need same-day intervention.

## Results & Impact

- **What changed in operations**: Three teams stopped reconciling parallel spreadsheets and started working from one shared, settled view of supply and demand
- **What changed in decisions**: Pacing alerts fire during the campaign rather than after, leaving room to redistribute inventory or escalate to Content Operations before a shortfall hardens into a make-good
- **Cross-team escalation**: Content-level inventory gave Ad Operations a vocabulary to point Content Operations at specific titles where new AVOD-eligible content would actually clear
- **Reporting-grade accuracy**: The multi-week historical sweep corrected late-arriving attribution, so revenue reports reflected final settled figures and finance retired the side spreadsheet

## Reusable Pattern

A four-signal operating loop with business-impact alerts applies wherever one team reads the signals and a different team holds the lever that has to move:

- **E-commerce**: SKU inventory + conversion + funnel pacing against committed sell-through + checkout errors
- **Logistics**: Capacity + delivered + on-time against commitment + exception categories
- **SaaS**: Seat inventory + active usage + renewal pacing against commitment + integration errors
- **Telecom**: Network capacity + activations + service-level commitment + outage categories

**When this pattern is NOT appropriate**: When manual daily review is feasible, or when a native vendor dashboard already surfaces the signals against business-impact thresholds. The custom pipeline earns its overhead when you need cross-source attribution, derived business logic native reporting does not support, or shared definitions across teams whose totals must reconcile.

## Tech Stack

- **Ingestion**: Google Ad Manager API, Python
- **Storage**: AWS S3 (raw), Databricks Delta Lake (staging)
- **Processing**: PySpark, SQL
- **Alerting**: Slack (pacing and error alerts)
- **Reporting**: Power BI
- **Orchestration**: Databricks Jobs (daily + periodic schedules)
