---
title: "The Five Rules of a Compounding Data Model"
date: 2026-02-09
description: "Most data models are scoped like projects that end. The ones that compound are designed like infrastructure. Five rules from the enterprise model that became the foundation for every BI, ML, and AI build that came after."
categories: ["Data Engineering"]
draft: false
---

The leadership review at MBC Shahid (MBC Group), early 2022. The slide deck opened with active-subscribers for the quarter. The subscriptions team had one number on it. The content team had reproduced the same metric independently and had a slightly higher one. None of the two numbers were technically wrong. Each had been computed against a different filter assumption.

Twenty minutes of the meeting were spent deciding which number to use as the headline for the quarter. None of it was spent on the decision the room had walked in to make.

This is the scene that gets every enterprise-data-model project funded. It is also the scene that gets it scoped wrong. The word used in the kickoff is "project." The word that should be used is "infrastructure."

**Most data teams treat the data model as a one-time project. The teams that compound treat it as infrastructure.** Four years later, the enterprise model we built at MBC Shahid that quarter is still the foundation under the semantic layer, the ML feature store, the CRM automation platform, and the voice-of-customer agent. None of those layers needed to rebuild it. That is what compounding looks like.

## Why this matters now

Data-model investment quietly loses budget every year because it does not photograph well. Nobody points at a Silver-layer star schema and asks for a demo. Then the AI workload arrives and the team that skipped the model spends six months of every AI initiative rebuilding it badly.

The [dbt 2025 State of Analytics Engineering Report](https://www.getdbt.com/resources/state-of-analytics-engineering-2025) makes the picture explicit: 80% of data practitioners now use AI in some form, and data quality is the most critical challenge they report. The teams shipping AI in production are the ones whose data foundation can carry it.

The rules that produce a compounding model are not new. They are five disciplines that most teams apply two or three at a time, then wonder why the model does not survive its third use case.

![The Five Rules of a Compounding Data Model: 1) start with the grain, 2) movement tracking, 3) surrogate keys, 4) feature tables in the model, 5) build for the next consumer. Rule 1 is the load-bearing foundation.](/assets/blog/scalable-data-model-five-rules.svg)

*Each rule is independent. Together they turn a data-model build from a one-time project into a foundation that survives every downstream use case.*

## The Five Rules

### Rule 1: Start with the grain, not the dashboard

The standard scoping move is to start with "what reports do we need?" and work backwards. This produces a model shaped like the current dashboard, not like the underlying business. The first time the dashboard changes, the model loses meaning.

The compounding move is to start with the grain of each fact table. What is the lowest-level event the business actually generates? For viewing data at MBC Shahid, the grain is a single play event, a unique view with subscriber, content, device, address, and subscription identifiers attached. For subscriptions, it is a single subscription record with lifecycle state. For ad operations, it is a single inventory or impression event.

The grain is the rock you build on. A fact table with a clear grain produces every aggregate the business will ever ask for. A fact table with a fuzzy grain ("one row per session, sort of") produces aggregates that disagree with each other for reasons no one can explain.

What goes wrong without it: the team ships a model that matches the launch dashboard. The first replatform of the dashboard, or the first new consumer (the ML feature store, the AI agent), requires rebuilding the model from raw events. Every downstream consumer pays the same cost again.

### Rule 2: Movement tracking is worth the complexity

Most data models record state. The compounding ones record transitions.

At  MBC Shahid the highest-leverage modelling decision was treating subscriber transitions as a first-class fact: who became a subscriber today, who churned, who reactivated, who upgraded, who downgraded. The `daily_movement` fact table records these transitions at a daily grain, with explicit flags like `is_acquisition`, `is_reconnect`, `is_winback` on each subscription record. Movement queries that used to be hours of window-function SQL became a `WHERE` clause.

The complexity cost is real. Movement tables require careful idempotency, careful late-arrival handling, and careful reconciliation between billing-system reality and the platform's observed state. The payoff is that every churn, retention, and lifecycle question across BI, ML, and AI runs against the same governed source. Different teams stop producing different churn numbers because there is no other churn number to produce.

What goes wrong without it: every team writes its own churn definition. The churn dashboard, the churn ML model, and the CRM winback campaign all run on slightly different logic. Leadership stops trusting any of them, and the data team gets blamed for an organisational failure that was actually a modelling failure.

### Rule 3: Surrogate keys everywhere

Every entity in the model gets a generated surrogate key. Source-system IDs are preserved on the row but never used as join keys. This sounds like dogma. It is actually insurance.

The billing platform at MBC Shahid migrated subscriber IDs twice over the lifetime of the model. The catalog system changed content identifiers when a new metadata vendor took over. Each of these would have broken every downstream query that joined on the source ID directly. None of them did, because every join was on the generated `dwh_user_id` or `dwh_content_id`, and the model absorbed the source-system change as a single mapping update in the dimension table.

The cost is one column per dimension. The benefit is that source-system reality can change without breaking consumer queries. Over a multi-year horizon that benefit pays back every time a source platform migrates, replatforms, or gets replaced.

What goes wrong without it: the model becomes brittle in a way that is invisible until a source-system change happens. Then it breaks everywhere at once, and the recovery work expands to touch every downstream consumer.

### Rule 4: Feature tables belong in the model

Feature engineering usually lives in notebooks. ML teams build their own feature store, BI teams build their own measure layer, and the two diverge over time. By year two, the same subscriber's "engagement cohort" means one thing on a Power BI dashboard and a slightly different thing in a clustering model, and nobody can explain the gap.

The compounding move is to promote feature tables to first-class Gold-layer objects. At MBC Shahid the user-level feature table and the user-content feature table sit alongside the fact tables and the dimension tables, on the same refresh cadence, with the same governance. The "engagement cohort" column the dashboard reads is the same column the gender prediction model reads. The Voice-of-Customer agent and the CRM scenario engine both query it. Drift is structurally impossible because there is only one source.

What goes wrong without it: the BI/ML mismatch. The dashboard says 12,000 at-risk subscribers, the model flags 15,000, the leadership team treats both as unreliable, the data team spends two quarters reconciling and three quarters rebuilding. Solved by putting the feature table in the model from day one, not from year three.

### Rule 5: Build for the next consumer, not the current report

The launch dashboard is the worst possible target to optimise for. It is the first consumer, not the only one. The compounding move is to shape the model around business entities (a subscriber, a play event, a subscription transition) rather than the current report's filter logic.

The MBC Shahid model was scoped for reporting in 2022. It went on to power the semantic layer in 2023, the ML feature store in 2024, the CRM automation platform in 2025, and a voice-of-customer agent in 2025-2026. None of those were predicted at scoping time. The model survived all of them because it was shaped around the business, not the launch dashboard.

What goes wrong without it: each new use case spawns a parallel model. The data team ends up maintaining three or four overlapping models, each with subtly different definitions, each producing slightly different numbers. Maintenance grows linearly with use cases.

## What I would actually build first

Start with the two highest-pain fact tables. At MBC Shahid those were play events and subscription transitions. Get the grain right, get the surrogate keys in, ship them. Do not build a hundred-table model in week one.

Then add the movement table. Movement tracking is the highest-leverage modelling decision and the one most teams defer to year two. Build it first.

Then promote one feature table to Gold. Pick the one the most consumers will share (at MBC Shahid, the user-level feature table). Get BI and ML consuming the same column on day one. The drift that would have appeared in year two never appears.

## One MENA-flavored note

One entity in particular pays back the modelling investment in Arabic-OTT: the household. MENA streaming households share profiles aggressively, and the same account can carry two or three distinct consumption patterns. Teams that model only the account spend year two explaining why "household engagement" is a hard query. Teams that promote the profile to a first-class dimension on day one have it ready as a `GROUP BY`. The foundation choice on day one is the choice every consumer inherits.

## Closing

Is your data model a project that ended, or infrastructure that compounds?

The teams whose models are projects ship a beautiful Silver-layer schema, declare victory, and watch every new use case rebuild the foundation. The teams whose models are infrastructure stack the semantic layer, the feature store, the CRM automation, and the AI agent on the same foundation, in sequence, without rebuilding what is underneath. The five rules above are the difference. Each one is well known. Applying all five together is what most teams do not do.
