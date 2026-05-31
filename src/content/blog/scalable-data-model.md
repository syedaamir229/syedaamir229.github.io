---
title: "The Five Rules of a Compounding Data Model"
date: 2026-06-17
description: "Most data models are scoped like projects that end. The ones that compound are designed like infrastructure. Here are five rules that hold over years."
og_title: "Most Data Models Are Scoped to Die"
categories: ["Data Engineering"]
draft: false
---

Most data models are built to match the launch dashboard. They do it well, and then the second consumer arrives, a churn model or a CRM audience, and the model has to be rebuilt from raw events because it was shaped around a report instead of the business.

That rebuild is the tax a team pays for scoping a model like a project. It comes due again at the third consumer, and the fourth.

The word used in the kickoff is "project." The word that should be used is "infrastructure."

**A data team is either building a model or building infrastructure. Once it starts building a model, every new consumer rebuilds the foundation underneath it, badly, in a way that introduces drift the layer above pays for; once it starts building infrastructure, the same foundation carries the semantic layer, the feature store, the CRM automation, and the AI agent without rebuilding what is underneath.** The way you get there is not a bigger schema or a longer requirements phase. It is five disciplines applied together, the way most teams apply two or three at a time and then wonder why the model does not survive its third use case.

## Why this matters now

Data-model investment quietly loses budget every year because it does not photograph well. Nobody points at a curated star schema and asks for a demo. Then the AI workload arrives and the team that skipped the model spends six months of every AI initiative rebuilding it badly.

The [dbt 2025 State of Analytics Engineering Report](https://www.getdbt.com/resources/state-of-analytics-engineering-2025) makes the picture explicit: 80% of data practitioners now use AI in some form, and data quality is the most critical challenge they report. The teams shipping AI in production are the ones whose data foundation can carry it.

The rules below are not new. They are well-documented disciplines that most teams know. The reason this post exists is that knowing them and applying all five together at design time are different things, and only the second produces a model that compounds.

![The Five Rules of a Compounding Data Model: 1) start with the grain, 2) movement tracking, 3) surrogate keys, 4) feature tables in the model, 5) build for the next consumer. Rule 1 is the load-bearing foundation.](/assets/blog/scalable-data-model-five-rules.svg)

*Each rule is independent. Together they turn a data-model build from a one-time project into a foundation that survives every downstream use case.*

## The Five Rules

### Rule 1: Start with the grain, not the dashboard

**What it is.** Start with the grain of each fact table. What is the lowest-level event the business actually generates? For viewing data on a streaming platform, the grain is a single play event, a unique view with subscriber, content, device, address, and subscription identifiers attached. For subscriptions, it is a single subscription record with lifecycle state. For ad operations, it is a single inventory or impression event.

**Why it matters.** The grain is the rock you build on. A fact table with a clear grain produces every aggregate the business will ever ask for. A fact table with a fuzzy grain ("one row per session, sort of") produces aggregates that disagree with each other for reasons no one can explain. The alternative scoping move (starting with "what reports do we need?" and working backwards) produces a model shaped like the current dashboard, not like the underlying business; the first time the dashboard changes, the model loses meaning.

**What goes wrong without it.** The team ships a model that matches the launch dashboard. The first replatform of the dashboard, or the first new consumer (the ML feature store, the AI agent), requires rebuilding the model from raw events. Every downstream consumer pays the same cost again.

### Rule 2: Movement tracking is worth the complexity

**What it is.** Treating subscriber transitions as a first-class fact: who became a subscriber today, who churned, who reactivated, who upgraded, who downgraded. The `daily_movement` fact table records these transitions at a daily grain, with explicit flags like `is_acquisition`, `is_reconnect`, `is_winback` on each subscription record. Movement queries that used to be hours of window-function SQL become a `WHERE` clause.

**Why it matters.** Most data models record state. The compounding ones record transitions. The complexity cost is real: movement tables require careful idempotency, careful late-arrival handling, and careful reconciliation between billing-system reality and the platform's observed state. The payoff is that every churn, retention, and lifecycle question across BI, ML, and AI runs against the same governed source. Different teams stop producing different churn numbers because there is no other churn number to produce.

**What goes wrong without it.** Every team writes its own churn definition. The churn dashboard, the churn ML model, and the CRM winback campaign all run on slightly different logic. Leadership stops trusting any of them, and the data team gets blamed for an organisational failure that was actually a modelling failure.

### Rule 3: Surrogate keys everywhere

**What it is.** Every entity in the model gets a generated surrogate key. Source-system IDs are preserved on the row but never used as join keys. Joins go through the generated `subscriber_id` or `content_id`, so any source-system change becomes a single mapping update in the dimension table rather than a fan-out of breaking changes.

**Why it matters.** This sounds like dogma. It is actually insurance. The billing system was replaced twice over the lifetime of the model, and the content management system was replaced once when a new metadata vendor took over. Each of these would have broken every downstream query that joined on a source-system ID directly. None of them did. The cost is one column per dimension. The benefit is that source-system reality can change without breaking consumer queries. Over a multi-year horizon that benefit pays back every time a source platform migrates, replatforms, or gets replaced.

**What goes wrong without it.** The model becomes brittle in a way that is invisible until a source-system change happens. Then it breaks everywhere at once, and the recovery work expands to touch every downstream consumer.

### Rule 4: Feature tables belong in the model

**What it is.** Promote feature tables to first-class governed objects. The user-level feature table and the user-content feature table sit alongside the fact tables and the dimension tables, on the same refresh cadence, with the same governance. The "engagement cohort" column the dashboard reads is the same column the gender prediction model reads. The Voice-of-Customer agent and the CRM scenario engine both query it.

**Why it matters.** Feature engineering usually lives in notebooks. ML teams build their own feature store, BI teams build their own measure layer, and the two diverge over time. By year two, the same subscriber's "engagement cohort" means one thing on a BI dashboard and a slightly different thing in a clustering model, and nobody can explain the gap. Putting the feature table in the model collapses that gap structurally: there is only one source, so drift is impossible.

**What goes wrong without it.** The BI/ML mismatch. The dashboard says 12,000 at-risk subscribers, the model flags 15,000, the leadership team treats both as unreliable, the data team spends two quarters reconciling and three quarters rebuilding. Solved by putting the feature table in the model from day one, not from year three.

### Rule 5: Build for the next consumer, not the current report

**What it is.** Shape the model around business entities (a subscriber, a play event, a subscription transition) rather than the current report's filter logic.

**Why it matters.** The launch dashboard is the worst possible target to optimise for. It is the first consumer, not the only one. The model was scoped for reporting. It went on to power the semantic layer, the ML feature store, the CRM automation platform, and a voice-of-customer agent. None of those were predicted at scoping time. The model survived all of them because it was shaped around the business, not the launch dashboard.

**What goes wrong without it.** Each new use case spawns a parallel model. The data team ends up maintaining three or four overlapping models, each with subtly different definitions, each producing slightly different numbers. Maintenance grows linearly with use cases.

## What you cannot retrofit

The five rules are not equal in cost. Three of them decide the model's shape at design time and cannot be added back cheaply once consumers are reading from it: grain, movement tracking, and feature tables in the model. Two of them are disciplines that survive being applied unevenly and can be tightened later: surrogate keys and next-consumer thinking.

The practical implication is which rules ship in v1. Grain (Rule 1), movement (Rule 2), and feature tables (Rule 4) are not deferrable. The team that defers them is shipping a model that will be retrofitted under pressure during its second use case, which is the failure mode this list exists to prevent. The other two can ship as conventions and tighten as the model matures. The decision that separates project from infrastructure is which rules go in on day one, not which rules go in eventually.

## Where I would start

Start with the two highest-pain fact tables. On a streaming platform those are play events and subscription transitions. Get the grain right, get the surrogate keys in, ship them. Do not build a hundred-table model in week one.

Then add the movement table. Movement tracking is the highest-leverage modelling decision and the one most teams defer to year two. Build it first. The cost of building movement on day one is one extra fact table; the cost of building it in year two is rebuilding every churn definition that has since been written against the absence of one.

Then promote one feature table to Gold. Pick the one the most consumers will share, often the user-level feature table. Get BI and ML consuming the same column on day one. The drift that would have appeared in year two never appears, because there was never a parallel column to drift against.

## One MENA-flavored note

One entity in particular pays back the modelling investment in Arabic-OTT: the household. MENA streaming households share profiles aggressively, and the same account can carry two or three distinct consumption patterns. Teams that model only the account spend year two explaining why "household engagement" is a hard query. Teams that promote the profile to a first-class dimension on day one have it ready as a `GROUP BY`. The foundation choice on day one is the choice every consumer inherits.

## Closing

Is your data model a project that ended, or infrastructure that compounds?

The teams whose models are projects ship a beautiful curated schema, declare victory, and watch every new use case rebuild the foundation. The teams whose models are infrastructure stack the semantic layer, the feature store, the CRM automation, and the AI agent on the same foundation, in sequence, without rebuilding what is underneath. The five rules above are the difference. Each one is well known. Applying all five together is what most teams do not do.
