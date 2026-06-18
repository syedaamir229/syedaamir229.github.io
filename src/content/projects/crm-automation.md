---
title: "CRM Campaign Automation Platform"
description: "Daily CRM campaigns that build and target themselves across millions of profiles, replacing multi-day audience handoffs with hands-off execution."
category: "AI & Automation"
tags: ["Power BI", "Databricks", "PySpark"]
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

A recurring campaign should not need a human in the loop, yet every send started the same way: a CRM team raised a data request, an analyst wrote a query, and the audience came back a day or two later, often too late for the send window. The cadence was capped by how fast people could pass files between each other.

For a large subscription-based consumer business sending daily, that gap compounds. The targeting platform could only address an account, but the people inside a shared account behaved differently, so everyone on the account got the same message regardless of who was actually active. And when content priorities shifted on a calendar, somebody had to redeploy logic to match.

- Audience builds were a manual analyst bottleneck, so campaign cadence was set by query turnaround rather than by what the data could support.
- Targeting stopped at the account level and ignored the multi-profile structure underneath, flattening the per-person signal that makes a recommendation feel relevant.
- Scheduling, deduplication, and delivery were handled ad hoc, with no systematic record of who had already been sent what.
- Setup logic and outcome analysis lived in separate workflows, so there was no loop connecting targeting decisions back to performance.

## Approach

Two calls carried the rest of the work.

The first was the grain. I could have processed at the account level, which is simple and matches what the delivery platform accepts, but it throws away the per-person behavior that makes a recommendation worth sending. So I processed at the profile level and rolled up to the account only at delivery, picking one primary profile per account. The rollup method stayed configurable (primary, dominant, or last-active) so the same engine could serve different campaign intents without a rewrite, while still landing inside the platform's account-level constraint.

The second was how a winner gets chosen. Each account was usually eligible for several recommendation scenarios on the same day, but a single send delivers one message, so the system needed a deterministic tiebreaker. A fixed calendar rotation was predictable but blind to behavior, so I made behavior-based prioritization the default and kept calendar rotation as a fallback. The rule keys off recency: someone active in the last week is best served by re-engagement, someone quiet for a few weeks by trending discovery, someone dormant longer by cluster-based discovery. Matching the scenario to where a profile sits on the recency curve beats sending whatever the calendar happened to surface.

Around those two decisions sat the build:

- A three-stage shared data prep layer: catalog metadata rollup from item to group to category, profile-to-region mapping across regional segments, and a filter down to eligible active profiles.
- Four parallel recommendation scenarios, each a nine-step pipeline: load, filter, join eligible profiles, apply item and category filters, exclude already-seen items, exclude recently sent, rank the top five per profile, write, and validate.
- An account rollup that unions every scenario output, selects one profile per account, and attaches the delivery identifier the platform expects.
- A scenario selector that runs RFM-based segmentation into a subscription versus ad-supported treatment split, then applies the recency-based prioritization to pick one item per account.
- A temporal configuration system where seasonal overrides activate and deactivate by date on their own, turning a content-priority shift into a config change rather than a release.
- A delivery phase that writes the payload with multi-week deduplication tracking, so a profile does not get the same recommendation twice inside the lookback window.

## Results & Impact

- Audience creation moved from multi-day analyst handoffs to hands-off daily execution, and the recurring data requests that used to gate every send stopped entirely.
- Targeting shifted from undifferentiated blasts to behavior-segmented scenarios, with recency routing, regional trending, and cluster-based discovery all driven by configuration rather than code, so CRM teams now own scenario logic without touching the pipeline.
- Predictable recurring windows where content priorities shift now activate by date through temporal configuration, removing the emergency deployments and manual overrides that used to land during peak periods.
- Multi-week deduplication per profile holds notification fatigue down: the same item will not reach the same profile inside the window, no matter which scenario generated it.

## Architecture

![CRM automation architecture: a shared data-prep layer feeds four parallel scenario generators that roll up to account level, pass through behavior-based scenario selection, and deliver to a customer-engagement platform with a multi-week deduplication window.](/assets/projects/crm-automation.svg)

The daily pipeline runs in five phases. Shared data prep feeds four parallel scenario generators (cluster-based discovery, re-engagement, trending discovery, and an ad-supported-tier scenario), which roll up to the account level, pass through behavior-based scenario selection, and deliver to a customer-engagement platform with a multi-week deduplication window wrapping the whole flow.

## Tech Stack

- **Platform**: Databricks on AWS (PySpark + Spark SQL)
- **Storage**: Delta Lake (S3) with ACID transactions on scenario output and infra tables
- **Orchestration**: Databricks Jobs (daily batch scheduler)
- **Delivery**: Customer-engagement platform (push notification targeting)
- **Reporting**: Power BI (campaign performance tracking)
- **Environments**: Development to Production promotion via Databricks workspace environments

## My Role

I owned this end to end: the profile-level grain and rollup, the four scenario pipelines, the behavior-based selector, the temporal override system, and the deduplication tracking that keeps it honest at scale. I built it to run unattended on a daily schedule and to be driven by configuration so the teams downstream could change targeting without coming back to me. The pattern transfers to any subscription or engagement-driven product where a delivery platform targets coarser than the behavior signal warrants and recurring sends still depend on manual audience builds. It earns its keep at volume; below a few thousand users, or where the delivery platform already does behavioral segmentation natively, the scenario layer is overhead rather than leverage.
