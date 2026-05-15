---
title: "Semantic Layer Series Part 1 of 6: Why Governed Metrics Become Non-Negotiable"
date: 2023-05-12
description: "The first six weeks of a semantic-layer program are not a tooling decision. They are a conflict-mapping exercise. Part 1 of the series walks through The Conflict-First Rollout."
categories: ["BI & Analytics", "Data Governance"]
tags: ["Semantic Layer", "KPI Governance", "Power BI", "DAX", "Conflict-First Rollout"]
featured: false
draft: false
depth: flagship
pillar: governed-data
series: semantic-layer
series_part: 1
linkedin_excerpt: |
  Most teams do not decide to build a semantic layer on day one. They get pushed there.

  At Shahid (MBC Group), the push was a leadership review where three teams produced three different "active subscribers" numbers from the same source data. Twenty minutes of the meeting were spent reconciling.

  The semantic-layer project that came out of that meeting did not start with a tool selection. It started with a conflict map: which twenty KPIs hurt the most, who owned each one, what was the canonical definition.

  Part 1 of the Semantic Layer Series walks through The Conflict-First Rollout: four moves that take a semantic-layer program from "we should build one" to a pilot dataset in production in six weeks.

  Full piece on the blog ↓
  [link]
---

> Series companion: [Why Most Semantic Layers Fail](/blog/why-most-semantic-layers-fail/) frames the four-trap pattern this post is the antidote to.

Most teams do not decide to build a semantic layer on day one. They get pushed there. The push usually arrives in a leadership review where two dashboards show different numbers for the same KPI and nobody can explain the gap in five minutes.

At Shahid (MBC Group), the trigger was specific. A quarterly review with the subscriptions team, the engagement team, and the ad-ops team each running their own "active subscribers" number off the same source data. Three slightly different definitions: trial users in or out, internal accounts in or out, profile-level or account-level. Twenty minutes of the meeting were spent reconciling. The actual decision the room had walked in to make went unspoken.

The fix that came out of that meeting was not a tool selection or a new dashboard. It was a governed semantic layer that every downstream consumer could trust. But the failure mode hiding in that sentence is the assumption that "build the semantic layer" means "pick the platform and start modelling." It does not.

**A semantic-layer program is not a modelling project. It is a conflict-mapping exercise that ends in a modelling project.** The first six weeks decide whether the next six months are spent buying back trust or shipping disconnected metrics nobody uses.

![Before and after KPI governance pattern](/assets/diagrams/semantic-series-01-kpi-trust-gap.svg)

*When KPI logic is duplicated across report files, drift is unavoidable. A semantic layer consolidates logic into one governed source.*

## What breaks without a semantic layer

The symptoms are consistent across organisations:

- **Metric drift**: one KPI, multiple formulas.
- **Slow delivery**: every new report rebuilds measure logic.
- **Repeated reconciliation**: analysts spend time proving numbers instead of analysing them.
- **Low confidence**: business users stop trusting dashboards.

The biggest cost is hidden. Decision latency increases because every leadership conversation starts with "which number is correct?" instead of "what should we do next?" By the second quarter that is happening, every analyst on the team is doing reconciliation work, and no one is doing analysis work.

## What the semantic layer fixes

A semantic layer centralises business logic in one model that every report consumes. In the Shahid build, the initial v1 was Power BI Premium hosting governed measures on top of Gold-layer tables from the enterprise data model. Reports consumed measures via live connections instead of authoring formulas locally. A year later v2 migrated the model to SSAS Tabular for memory-pressure reasons, but the dashboards never changed: same measures, same names, same definitions, just a backend pointer change.

The core behaviour changes:

- KPI definitions are authored once.
- Time logic is standardised once.
- Lifecycle filters are reusable across reports.
- Role-based access is managed centrally.

This shifts effort from repeated report authoring to model stewardship, which is the precondition for any AI workflow that needs to consume governed metrics later.

## The Conflict-First Rollout

A semantic-layer rollout fails when it is treated as only a technical migration. The rollout that worked at Shahid had four moves, in order. Each one is unglamorous. Skipping any of them undoes the rest.

### Move 1: Start with high-conflict KPIs

Do not migrate every measure immediately. Start with the 20 to 30 KPIs that trigger the most reconciliation effort. At Shahid these clustered across four domains: subscriber base movement (churn rate, net adds, active base), engagement (playtime, completion rate, watch hours), monetisation (ad fill rate, ARPU, AVOD impressions), and content performance.

The discipline here is honesty. The most painful KPIs are usually the ones the most political teams own. Migrating them first is not a comfortable conversation. It is the conversation that proves the program is real.

### Move 2: Define ownership per KPI domain

Assign explicit owners for metric families. Subscriber lifecycle gets an owner. Engagement gets an owner. Ad operations gets an owner. Content performance gets an owner.

This avoids the orphan-KPI problem the new flagship companion piece describes in detail: without per-domain ownership, unreviewed measure edits drift back in within three months, and trust degrades silently as the model ages.

### Move 3: Publish definitions with implementation notes

Business definitions alone are not enough. Each KPI needs a published contract with seven fields:

- Business meaning.
- DAX expression.
- Data grain (daily, hourly, event).
- Included segments.
- Excluded segments.
- Validation query (the SQL the team uses to baseline the measure).
- Last approved date.

The contract is what turns a measure from a dataset entry into a product. A measure with a contract is one the next consumer can pick up without asking. A measure without one is a phone call.

### Move 4: Move report teams to consumption mode

Report developers should consume the model instead of recreating logic locally. This is where the delivery-speed gain shows up. It is also where the political work happens. Report developers have been authoring measures locally for years. The switch to consumption mode is a behaviour change, not a tool change.

The enforcement mechanism that worked at Shahid was simple. The semantic layer was the only authorised source for KPI logic. Local measures in report files were not a violation in the policy sense; they were a tradeoff teams could make. But governance, validation, and refresh support stopped at the model boundary. Local measures were on their own.

## Step-by-step rollout plan (first 6 weeks)

If you are implementing this from scratch, this is the sequence that works.

1. **Inventory KPI conflicts**: pull the top 20 KPIs from existing reports and document all formula variants.
2. **Create a conflict matrix**: map each KPI to current formula, owner, source table, and filter assumptions.
3. **Pick a pilot scope**: choose 2 to 3 high-usage dashboards and migrate only those first.
4. **Author canonical measures**: create one governed formula per KPI in the semantic model.
5. **Document KPI contracts**: publish definitions with formula, grain, inclusions, exclusions, validation query.
6. **Run dual reporting for 1 to 2 cycles**: compare legacy report numbers against semantic-layer numbers.
7. **Cut over and lock**: switch dashboards to live semantic measures, stop accepting new local KPI logic.

### KPI contract template (copy and use)

| Field | Example |
|---|---|
| KPI Name | `churn_rate` |
| Business Definition | Percent of opening base that churned in period |
| DAX Formula | `DIVIDE([churned_subscribers], [opening_base])` |
| Data Grain | Daily |
| Included Segments | Paid subscribers |
| Excluded Segments | Trial, internal accounts |
| Owner | Analytics Governance |
| Validation Query | SQL baseline ID + expected range |
| Last Approved On | YYYY-MM-DD |

## What I would prioritise

If you can only do one of the four moves in your first month, do Move 1. The conflict matrix produces every downstream decision: which domains need owners, which contracts to publish first, which dashboards become the pilot. Without the matrix the other three moves are speculation. With it, the rest of the program is execution.

## One MENA-flavored note

The Ramadan content cycle makes Move 3 (publish definitions with implementation notes) non-negotiable in Arabic-OTT. "Active subscribers in Ramadan" and "active subscribers across Ramadan" mean two different things depending on how the contract is written. Without an explicit grain and filter contract per KPI, every team writes its own Ramadan logic, and the post-Ramadan retrospective becomes a reconciliation meeting instead of a learning meeting.

## What we learned early

**The semantic layer is a product, not a one-time project.** Once teams depend on it, you need versioning, release notes, and support expectations.

**Stakeholder trust is built by consistency, not by complexity.** Even simple measures create large value when they are consistently used across reports.

**Technical quality and communication quality both matter.** If teams do not understand what changed, they will reintroduce local logic the next time a deadline is tight.

## Closing

Which of the twenty KPIs in your business are the ones nobody trusts?

If the list comes to mind in under a minute, you have your conflict-matrix scope. The rest of the program is a sequence of decisions that follows from that scope. The next post in the series, [Part 2: Architecture and Data Flow](/blog/semantic-layer-02-architecture-and-data-flow/), walks through what the model looks like once the conflict map is in place: how Gold tables feed the semantic model, where partition cadences come from, and how ownership boundaries are drawn between data engineering, metric engineering, and report engineering.

---

> Related case study: [Enterprise Semantic Layer & KPI Framework](/projects/semantic-layer/)

**Syed Aamir** is a Data & AI Solutions Engineer based in Dubai, building data foundations and applied AI for OTT streaming in the MENA region. Currently at Shahid (MBC Group). Previously delivered enterprise BI across automotive, retail, and financial services with Beinex, Al-Futtaim Technologies, and Scan Technology.

If your team is working through a similar problem, [start a conversation](https://mail.google.com/mail/?view=cm&fs=1&to=saamir259@gmail.com&su=Project%20inquiry) or [connect on LinkedIn](https://www.linkedin.com/in/syedaamiruddin/).
