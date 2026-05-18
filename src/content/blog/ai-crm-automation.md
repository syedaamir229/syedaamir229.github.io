---
title: "AI-Powered CRM Automation: The Six-Layer CRM Operating System"
date: 2025-11-10
description: "How a scenario-based CRM operating system replaced manual analyst handoffs, gave CRM operators direct targeting power, and closed the loop from data to activation to measurement."
categories: ["AI & Automation", "Data Engineering"]
draft: false
---

I have watched the same scene more than once: the CRM lead asks for a same-day re-engagement audience tied to a tentpole finale, the analyst quotes a multi-day turnaround, the campaign needed it by morning. The request is structurally the same query the team has filed a dozen times that month under different titles. By the time the audience is built, the window has closed. The campaign does not run.

This is the bottleneck every CRM team in streaming hits. They know exactly which audience they want. They have to wait days for someone with SQL access to build it. Most data teams accept this as a fact of life and add capacity. The compounding move is to delete the loop.

**A CRM team is either configuring scenarios or filing tickets. Once it starts filing tickets, every campaign is a negotiation; once it starts configuring scenarios, the data team gets to build infrastructure instead.** The way you get there is not a self-service UI in front of the warehouse. It is a structured operating system that encodes business logic into reusable, composable rules and ships activation as a first-class output.

## Why this matters now

CRM in MENA streaming is high-cadence, high-cycle. Predictable seasonal windows where content priorities shift, regional finales, AVOD ad-supported launches: the team is shipping multiple campaigns a week, each variant of a scenario the team has run before. Manual analyst handoff is structurally incompatible with that cadence. Either the data team owns the bottleneck and the CRM team waits, or the CRM team owns the bottleneck and the data team shrinks to an audience-building service.

Industry-wide, the same pattern shows up. [CleverTap, Braze, and similar customer engagement platforms](https://clevertap.com/) have spent the last five years moving toward composable audience builders, but most teams' actual workflows still depend on analyst-built CSV uploads. The gap is not the activation tool. The gap is the operating system above it that translates the data foundation into reusable scenarios.

The fix that worked was a six-layer architecture. Each layer is independent. Skipping a layer collapses the next one.

## The Six-Layer CRM Operating System

### Layer 1: Data foundation

The platform sits on top of the enterprise data model with Gold-layer feature tables: subscriber tenure, churn risk, content preferences, engagement cohorts, cluster assignments from prior viewing-behaviour work, recent activity signals, and subscription lifecycle movement (new, churned, reactivated, upgraded).

This is the layer that decides whether the rest of the system is cheap or expensive. The scenario engine does not need its own data pipeline. It consumes what is already clean and governed by the BI and ML workflows. Teams that try to build CRM automation without this layer end up reverse-engineering a feature store inside their CRM tool, which is the wrong place for it.

### Layer 2: Scenario engine

The core of the system is a set of reusable scenarios, each targeting a different user behaviour. Four scenarios run in parallel:

- **Cluster-based discovery scenario.** Recommends popular shows among subscribers in the same behaviour cluster, matched by viewing cluster, predicted gender, and region. Collaborative filtering with explicit cluster boundaries.
- **Re-engagement scenario.** Reaches subscribers who started a series but did not finish: profiles that watched more than two episodes with episodes remaining, within a configurable recency window.
- **Trending-discovery scenario.** Surfaces content climbing in regional popularity week-over-week. Targets the "what is everyone watching right now" impulse by highlighting titles that moved up in rank but are not yet in the top five.
- **AVOD-tier scenario.** Promotes the most popular ad-supported content per region for non-paying users, ranked by unique viewers with meaningful watch time.

Each scenario applies standard filters at runtime: deduplication (already-watched content excluded, anything sent within a multi-week deduplication window excluded), content guards (kids content, sports content, inactive catalog excluded), eligibility checks (only adult, active profiles processed).

Scenarios are composable. The CRM team adjusts parameters (recency windows, engagement thresholds, candidate pool sizes) without writing SQL. The system handles the filtering and ranking.

### Layer 3: Profile-to-account resolution

The delivery channel (a customer-engagement platform like CleverTap or Braze) targets at the account level. A single household in this market can have multiple viewing profiles. Recommending content based on the account level averages those profiles into noise.

The system processes recommendations at profile level for accuracy, then selects one profile per account for delivery. The selection method is configurable: default is the primary profile (highest watch hours), but it can be switched to most recent activity or dominant profile depending on campaign goal. This is the MENA-specific layer; multi-profile households are not an edge case in this market, they are the default.

### Layer 4: Behaviour-based prioritisation

When an account has recommendations from multiple scenarios, the system picks one. The default mode is recency-aware:

- Subscribers active in the last 7 days get the re-engagement scenario (re-engagement works when the habit is fresh).
- Subscribers active 8 to 30 days ago get the trending-discovery scenario (trending content to reignite interest).
- Subscribers inactive for more than 30 days get the cluster-based discovery scenario (discovery via similar profiles).
- Non-paying users always get the AVOD-tier scenario.

Behaviour-based prioritisation replaced fixed rotation logic. Targeting relevance improved without any additional manual configuration.

### Layer 5: CRM integration

Scenario outputs push directly to the customer-engagement platform (CleverTap or Braze) via API on schedule. CRM managers configure activation timing inside that platform. Push, email, and SMS channels are all supported through the same audience push. A temporal configuration system handles seasonal overrides (predictable recurring windows where content priorities shift, regional priority lists) with auto-activation dates, requiring no code changes for routine seasonal shifts.

### Layer 6: Closed-loop performance

Campaign results flow back from the customer-engagement platform into the analytics layer. This is the layer most teams skip. With the loop closed, the team can compare engagement rates across scenario configurations, identify which targeting rules drive the best outcomes, and refine scenarios over time based on actual performance. The sent-content tracking also feeds back into deduplication, ensuring the same subscriber does not receive the same recommendation twice within the lookback window.

## What I would build first

If you have one quarter to ship this, do not start with the scenario engine.

Start with Layer 1 and Layer 6. The feature foundation and the closed-loop tracking are the layers that decide whether the next four are buildable. Get the Gold-layer feature tables in place and the engagement-platform result feed wired into the analytics layer. Then build one scenario, end-to-end. The re-engagement scenario is the right first scenario because it has the highest CRM team demand, the simplest filter logic, and the cleanest evaluation criteria.

Once one scenario is in production with the closed loop working, the next three scenarios are configuration, not engineering. The CRM team starts configuring instead of filing tickets.

## One MENA-flavored note

The seasonal-override layer pays for itself the first predictable recurring window after launch. Content priorities shift inside the season: family content, regional originals, and specific scheduling windows take precedence. Without a declarative override system, every cycle turns into a multi-week scramble of one-off SQL adjustments. With one, the CRM team activates a seasonal profile inside the customer-engagement platform and the scenario engine respects it automatically by date. The same applies to any other recurring content cycle in the calendar.

## Closing

Is your CRM team configuring scenarios or filing tickets?

A team filing tickets is a team that pays the cost of every campaign upfront, in analyst time, then again on the back-end, in campaign delay. A team configuring scenarios is a team where the data layer earned the right to be infrastructure. The system above turns the data foundation into a CRM operating system that the operators can actually operate. The engineering work is real. The compounding is realer.
