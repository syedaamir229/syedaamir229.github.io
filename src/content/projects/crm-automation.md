---
title: "CRM Campaign Automation Platform"
description: "CRM campaigns that build themselves across millions of profiles a day, replacing multi-day audience handoffs with daily automated execution."
category: "AI & Automation"
tags: ["CleverTap", "Power BI", "Databricks", "PySpark"]
featured: true
metrics:
  - label: "Profiles Processed Daily"
    value: "Millions"
  - label: "Recommendation Scenarios"
    value: "4"
  - label: "Deduplication Window"
    value: "Multi-week"
order: 4
---

## Challenge

Daily campaigns had to be personalized at a finer grain than the CRM platform could target, land before send windows, and adapt content rules on a calendar schedule without redeploying.

- **Manual setup bottleneck**: Every audience build required a data request and query turnaround, slowing campaign cadence
- **No profile-level personalization**: CRM targeting was account-level, ignoring the multi-profile structure of subscriber households
- **Execution fragmentation**: Scheduling, deduplication, and delivery were handled ad hoc with no systematic tracking
- **No feedback loop**: Campaign setup and outcome analysis lived in separate workflows with no connection between targeting logic and performance results

## Key Decisions

### Decision 1: Profile-level processing with account-level rollup

**Problem:** The CRM platform can only target at the account level, but processing at account level loses the per-user behavior signal that drives personalization quality.

**Options considered:**

- Process at account level (simple but imprecise)
- Process at profile level and roll up to account at delivery time (complex but accurate)

**Chosen:** Profile-level processing with configurable account-level rollup (primary profile = profile with highest watch hours).

**Why:** Preserves per-profile viewing behavior for recommendation logic while meeting the delivery platform's account-level constraint. The rollup method is configurable (primary, dominant, last-active) to adapt to campaign intent.

### Decision 2: Behavior-based scenario prioritization over calendar rotation

**Problem:** Each account is eligible for recommendations from multiple scenarios on the same day, but a single CRM send delivers only one. The system needs a deterministic rule for which scenario wins.

**Options considered:**

- Fixed calendar rotation (predictable but ignores user behavior)
- Behavior-based prioritization by recency of activity

**Chosen:** Behavior-based mode as default (calendar rotation available as fallback).

**Why:** Users active in the last 7 days are best served by the re-engagement scenario; users inactive 8-30 days by trending discovery; users inactive 30+ days by cluster-based discovery. Matching scenario to recency segment produces more relevant recommendations than arbitrary rotation.

## Approach

- Built 3-stage shared data preparation: content metadata rollup (episode to season to show), profile-to-region mapping across regional segments, eligible profile filtering (adult + active only)
- Implemented 4 parallel recommendation scenarios, each following a 9-step pipeline: load, filter, join eligible profiles, apply content/category filters, exclude watched, exclude recently sent, rank (top 5 per profile), write, validate
- Built account rollup: union all scenario outputs, select one profile per account, add CRM delivery identifier
- Implemented scenario selector (phase 4): RFM-based segmentation drives an SVOD/AVOD treatment split, then behavior-based prioritization by days-since-last-play picks one title per account
- Built temporal configuration system: seasonal overrides activate and deactivate automatically by date, turning content-priority shifts into a configuration change rather than a release
- Integrated CRM payload phase with deduplication tracking: a multi-week lookback prevents repeat recommendations

## Architecture Overview

![CRM automation architecture: shared data prep feeds 4 parallel scenario generators that roll up to account level, pass through scenario selection, and deliver to the customer-engagement platform with multi-week deduplication.](/assets/projects/crm-automation.svg)

5-phase daily pipeline: shared data prep feeds 4 parallel scenario generators (a cluster-based discovery scenario, a re-engagement scenario, a trending-discovery scenario, and an AVOD-tier scenario), which roll up to account level, pass through scenario selection, and deliver to the customer-engagement platform with a multi-week deduplication window.

## Results & Impact

- **What changed in operations**: Campaign audience creation moved from multi-day analyst handoff cycles to daily automated execution. CRM teams no longer raise data requests to run recurring campaigns
- **What changed in decisions**: Targeting shifted from undifferentiated blasts to behavior-segmented scenarios (recency-based routing, regional trending, cluster-based discovery), giving CRM teams control over scenario logic through configuration rather than code
- **Operational reliability**: Temporal configuration handles predictable recurring windows where content priorities shift automatically, with no emergency deployments or manual overrides needed during peak content periods
- **Deduplication at scale**: Multi-week content tracking per profile prevents notification fatigue. The same title will not be recommended to the same profile within the deduplication window, regardless of which scenario generates it

## Reusable Pattern

This decision-driven recommendation-to-activation pattern (profile segmentation to scenario generation to account rollup to behavior-based selection to CRM delivery with deduplication) applies to any subscription or engagement-driven product:

- **E-commerce**: Personalized promotions, cart recovery, and lifecycle messaging with purchase-recency segmentation
- **SaaS**: Onboarding nudges, feature adoption, and retention campaigns based on product usage signals
- **Fintech**: Product nudges, payment reminders, and risk communications with eligibility-based routing
- **Telecom**: Subscriber lifecycle campaigns and upgrade recommendations with regional variation

**When this pattern is NOT appropriate**: If your user base is small enough that campaigns can be configured manually without bottleneck (under 10k users, infrequent sends), the infrastructure overhead is not justified. Similarly, if your CRM platform natively supports behavioral segmentation logic, building a separate scenario layer duplicates capability rather than filling a gap.

## Tech Stack

- **Platform**: Databricks on AWS (PySpark + Spark SQL)
- **Storage**: Delta Lake (S3) with ACID transactions on scenario output and infra tables
- **Orchestration**: Databricks Jobs (daily batch scheduler)
- **Delivery**: CleverTap API (push notification targeting)
- **Reporting**: Power BI (campaign performance tracking)
- **Environments**: Development to Production promotion via Databricks workspace environments
