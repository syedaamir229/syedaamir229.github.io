---
title: "AI-Powered CRM Automation: The Six-Layer CRM Operating System"
date: 2025-05-19
description: "How a scenario-based CRM operating system at Shahid replaced manual analyst handoffs, gave CRM operators direct targeting power, and closed the loop from data to activation to measurement."
categories: ["AI & Automation", "Data Engineering"]
tags: ["CRM", "CleverTap", "Automation", "Personalization", "Scenario Engine"]
featured: false
draft: false
depth: flagship
pillar: applied-ai
linkedin_excerpt: |
  Monday morning Slack thread, MENA streaming CRM team. "Can we send the Ramadan Episodes-Remaining audience tonight? The Demon Slayer one." Analyst's reply: "I'll have the query ready by Wednesday."

  This is the bottleneck every CRM team in streaming hits. They know exactly which audience they want. They wait days for someone to build it.

  We replaced this loop at Shahid with a scenario engine: a six-layer CRM Operating System where targeting logic is encoded into reusable scenarios the CRM team configures directly, with closed-loop performance back into the data layer.

  The CRM team stopped filing audience tickets. The data team stopped writing SQL for every campaign. Both sides ended up doing higher-value work.

  Full piece on the blog ↓
  [link]
---

A Monday morning Slack thread at Shahid (MBC Group). The CRM lead asked the data team: "Can we send out an Episodes-Remaining audience tonight for the Demon Slayer Ramadan finale? Profiles that watched more than two episodes but did not finish, kids-content excluded, last 30 days." The analyst's reply: "I will have the query ready by Wednesday."

Wednesday. For a campaign that needed to ship Monday. For a query that, structurally, was the same query the CRM team had asked for fourteen times that month under different titles. By the time the audience was built, the Demon Slayer finale was over. The Ramadan window was over too. The campaign never ran.

This is the bottleneck every CRM team in streaming hits. They know exactly which audience they want. They have to wait days for someone with SQL access to build it. Most data teams accept this as a fact of life and add capacity. The compounding move is to delete the loop.

**A CRM team is either configuring scenarios or filing tickets. Once it starts filing tickets, every campaign is a negotiation; once it starts configuring scenarios, the data team gets to build infrastructure instead.** The way you get there is not a self-service UI in front of the warehouse. It is a structured operating system that encodes business logic into reusable, composable rules and ships activation as a first-class output.

## Why this matters now

CRM in MENA streaming is high-cadence, high-cycle. Ramadan release windows, regional finales, AVOD ad-supported launches: the team is shipping multiple campaigns a week, each variant of a scenario the team has run before. Manual analyst handoff is structurally incompatible with that cadence. Either the data team owns the bottleneck and the CRM team waits, or the CRM team owns the bottleneck and the data team shrinks to an audience-building service.

Industry-wide, the same pattern shows up. [CleverTap, Braze, and similar customer engagement platforms](https://clevertap.com/) have spent the last five years moving toward composable audience builders, but most teams' actual workflows still depend on analyst-built CSV uploads. The gap is not the activation tool. The gap is the operating system above it that translates the data foundation into reusable scenarios.

The fix that worked at Shahid was a six-layer architecture. Each layer is independent. Skipping a layer collapses the next one.

## The Six-Layer CRM Operating System

### Layer 1: Data foundation

The platform sits on top of the enterprise data model with Gold-layer feature tables: subscriber tenure, churn risk, content preferences, engagement cohorts, cluster assignments from prior viewing-behaviour work, recent activity signals, and subscription lifecycle movement (new, churned, reactivated, upgraded).

This is the layer that decides whether the rest of the system is cheap or expensive. The scenario engine does not need its own data pipeline. It consumes what is already clean and governed by the BI and ML workflows. Teams that try to build CRM automation without this layer end up reverse-engineering a feature store inside their CRM tool, which is the wrong place for it.

### Layer 2: Scenario engine

The core of the system is a set of reusable scenarios, each targeting a different user behaviour. Four scenarios run in parallel at Shahid:

- **Clustered Top Titles.** Recommends popular shows among subscribers in the same behaviour cluster, matched by viewing cluster, predicted gender, and region. Collaborative filtering with explicit cluster boundaries.
- **Episodes Remaining.** Re-engages subscribers who started a series but did not finish: profiles that watched more than two episodes with episodes remaining, within a configurable recency window.
- **Ranked Up Titles.** Surfaces content climbing in regional popularity week-over-week. Targets the "what is everyone watching right now" impulse by highlighting titles that moved up in rank but are not yet in the top five.
- **AVOD Top Titles.** Promotes the most popular ad-supported content per region for non-paying users, ranked by unique viewers with meaningful watch time.

Each scenario applies standard filters at runtime: deduplication (already-watched content excluded, anything sent in the last 60 days excluded), content guards (kids content, sports content, inactive catalog excluded), eligibility checks (only adult, active profiles processed).

Scenarios are composable. The CRM team adjusts parameters (recency windows, engagement thresholds, candidate pool sizes) without writing SQL. The system handles the filtering and ranking.

### Layer 3: Profile-to-account resolution

The delivery channel (CleverTap) targets at the account level. A single household at Shahid can have multiple viewing profiles. Recommending content based on the account level averages those profiles into noise.

The system processes recommendations at profile level for accuracy, then selects one profile per account for delivery. The selection method is configurable: default is the primary profile (highest watch hours), but it can be switched to most recent activity or dominant profile depending on campaign goal. This is the MENA-specific layer; multi-profile households are not an edge case in this market, they are the default.

### Layer 4: Behaviour-based prioritisation

When an account has recommendations from multiple scenarios, the system picks one. The default mode is recency-aware:

- Subscribers active in the last 7 days get Episodes Remaining (re-engagement works when the habit is fresh).
- Subscribers active 8 to 30 days ago get Ranked Up Titles (trending content to reignite interest).
- Subscribers inactive for more than 30 days get Clustered Top Titles (discovery via similar profiles).
- Non-paying users always get AVOD Top Titles.

Behaviour-based prioritisation replaced fixed rotation logic. Targeting relevance improved without any additional manual configuration.

### Layer 5: CRM integration

Scenario outputs push directly to CleverTap via API on schedule. CRM managers configure activation timing inside CleverTap. Push, email, and SMS channels are all supported through the same audience push. A temporal configuration system handles seasonal overrides (Ramadan content filters, regional priority lists) with auto-activation dates, requiring no code changes for routine seasonal shifts.

### Layer 6: Closed-loop performance

Campaign results flow back from CleverTap into the analytics layer. This is the layer most teams skip. With the loop closed, the team can compare engagement rates across scenario configurations, identify which targeting rules drive the best outcomes, and refine scenarios over time based on actual performance. The sent-content tracking also feeds back into deduplication, ensuring the same subscriber does not receive the same recommendation twice within the lookback window.

## What I would build first

If you have one quarter to ship this, do not start with the scenario engine.

Start with Layer 1 and Layer 6. The feature foundation and the closed-loop tracking are the layers that decide whether the next four are buildable. Get the Gold-layer feature tables in place and the CleverTap result feed wired into the analytics layer. Then build one scenario, end-to-end. Episodes Remaining is the right first scenario because it has the highest CRM team demand, the simplest filter logic, and the cleanest evaluation criteria.

Once one scenario is in production with the closed loop working, the next three scenarios are configuration, not engineering. The CRM team starts configuring instead of filing tickets.

## One MENA-flavored note

The seasonal-override layer pays for itself the first Ramadan after launch. Content priorities shift inside Ramadan: family content, regional originals, and specific scheduling windows take precedence. Without a declarative override system, every Ramadan turns into a four-week scramble of one-off SQL adjustments. With one, the CRM team activates a Ramadan profile in CleverTap and the scenario engine respects it automatically. Same applies to Eid windows, regional sports finals, and any other recurring content cycle in the calendar.

## Closing

Is your CRM team configuring scenarios or filing tickets?

A team filing tickets is a team that pays the cost of every campaign upfront, in analyst time, then again on the back-end, in campaign delay. A team configuring scenarios is a team where the data layer earned the right to be infrastructure. The system above turns the data foundation into a CRM operating system that the operators can actually operate. The engineering work is real. The compounding is realer.

---

> Related case study: [CRM Campaign Automation Platform](/projects/jarvis/)

**Syed Aamir** is a Data & AI Solutions Engineer based in Dubai, building data foundations and applied AI for OTT streaming in the MENA region. Currently at Shahid (MBC Group). Previously delivered enterprise BI across automotive, retail, and financial services with Beinex, Al-Futtaim Technologies, and Scan Technology.

If your team is working through a similar problem, [start a conversation](https://mail.google.com/mail/?view=cm&fs=1&to=saamir259@gmail.com&su=Project%20inquiry) or [connect on LinkedIn](https://www.linkedin.com/in/syedaamiruddin/).
