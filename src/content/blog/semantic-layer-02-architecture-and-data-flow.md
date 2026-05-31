---
title: "Semantic Layer Series Part 2 of 6: The Three Ownership Layers"
date: 2026-07-15
description: "Draw clean ownership boundaries between data, metric, and report engineering before the first measure ships. This is what decides whether the layer scales."
og_title: "Three Owners of the Semantic Layer"
categories: ["BI & Analytics", "Data Engineering"]
draft: false
series: semantic-layer
series_part: 2
---

A deployment that deletes partitions and resets user roles is the kind of failure that reveals an ownership boundary. The script is correct. The model is correct. The release that touches data engineering, metric engineering, and report engineering runs without anyone watching the one most likely to break, because the three responsibilities were living on two people. The full scene is told in [Part 4 of this series](/blog/semantic-layer-04-governance-and-deployment/); here it sets up the architectural question this post is for.

It looks operational. It is structural. The release scripts ran cleanly; the layout was the problem. When the same engineer owns the curated tables, the semantic model, and the consumption layer, every release reaches across boundaries that were never named, and the next deployment surfaces it.

**A semantic-layer team is either splitting ownership across three clean layers or accumulating risk on the boundary between two of them. Once the boundaries collapse, the deployment that took thirty seconds to write takes a quarter to recover from; once they hold, the same script can run on Friday evening and the dashboards still come up on Monday morning.** The way you get there is not better deployment tooling. It is The Three Ownership Layers, each with a named owner, a defined release path, and a contract with the layers above and below.

## Why this matters now

Semantic layers fail in production for one of two reasons: the model is wrong, or the release is wrong. The model failure mode gets most of the attention because it shows up as bad numbers in a dashboard. The release failure mode shows up as an empty dashboard on Monday morning, a Saturday spent restoring partitions, and a leadership team that read stale numbers in front of the board. The release failure is more catastrophic and almost always traces back to ownership: the engineer who built the model was also the one who deployed it and also the one who maintained the report consumers, and any one of those three responsibilities can leak into the next without anyone noticing until it breaks something.

The fix is structural, not procedural. A defined release path and a thorough runbook can compensate for unclear ownership for a year or two, but the day one of the three responsibilities lands on a different person, the unspoken contract evaporates and the next deployment surfaces the gap. Splitting ownership into three clean layers up front is what makes the program survive a team change.

![Semantic Layer Technical Architecture: governed upstream tables feed a Model Build Layer (tabular project, DAX measures, validation, deployment artifact), then a Semantic Model with KPI definitions, role security, incremental partitions, which serves dashboards and ad-hoc analysis.](/assets/blog/semantic-series-02-architecture-flow.svg)

*Clear boundaries between data preparation, semantic model build, and report consumption keep ownership and quality controls simple.*

## The Three Ownership Layers

### Layer 1: Data engineering owns curated tables

**What it is.** Conformed fact and dimension tables plus the staging helpers needed for model efficiency. The relevant table families are lifecycle facts (`fact_subscriptions`, the daily movement table), engagement facts (`fact_engagement`), ad facts (`fact_ad_impressions`, `fact_ad_inventory`), and conformed dimensions (`dim_subscriber`, `dim_content`, `dim_device`, `dim_date` with explicit Ramadan flags).

**Why it matters.** This layer is the input contract for the semantic model. Owning it explicitly means owning the upstream pipelines, the grain, and the keys; the semantic layer above consumes these as governed inputs and does not correct broken ones. The discipline is that the semantic layer never absorbs an upstream problem: if a fact is wrong, the fix lives in the data layer, not in the measure.

**What goes wrong without it.** The semantic layer absorbs every upstream problem. Measure logic gets written to compensate for a broken upstream join, the model becomes a patchwork of corrections, and the team that owns the model spends its time debugging data quality instead of governing metrics.

### Layer 2: Metric engineering owns the semantic model

**What it is.** The tabular project definition, relationships and hierarchies, base and business measures, role-based access, partition strategy. Build outputs are packaged as deployment artefacts so releases are controlled and reproducible.

**Why it matters.** This is where metrics become reusable products. The owner of this layer is the only person authorising measure changes, which means change requests have one queue, one reviewer, and one published trail. Without a named single owner, measure changes happen everywhere at once and the model drifts before its first quarterly review.

**What goes wrong without it.** Measure logic leaks across the boundary in both directions. Some lives in the upstream pipeline (as a data-quality patch), some lives in the report file (as a local override), and the model loses its single-source-of-truth status. The owner of Layer 2 inherits a maintenance burden that does not show up in their backlog.

### Layer 3: Report engineering owns consumption

**What it is.** Report developers connect live to the model and focus on layout, narrative, and decision support. KPI logic stays in the semantic model; the report consumes measures by name and adds zero local DAX.

**Why it matters.** This is the boundary that fails most often. Report-local DAX is the form of leak that is hardest to police because every analyst can write it in three minutes, and every report-local measure that ships starts a small clone of the model in the report file. Holding the boundary at this layer is what keeps the semantic model the single source of truth, not just nominally.

**What goes wrong without it.** Report developers re-author measures locally, the semantic model loses its single-source-of-truth status, and Layer 2's owner inherits a maintenance burden that does not show up in their backlog. The drift compounds quietly until a senior stakeholder compares the same KPI across two reports and finds the gap.

## Where I would start

If you can only name one ownership boundary before the next release, name the one between Layer 2 and Layer 3. This is the boundary that fails most often, and the one whose failure is hardest to detect: report-local DAX looks like just another report-file change until the same KPI starts producing different numbers across reports.

Layer 1 ownership is usually clear from the start because data engineering already exists as a team. Layer 2 ownership is the one teams routinely under-staff, treating it as "the data engineer who also models"; staffing it explicitly is the second move. Layer 3 ownership formalises the consumption discipline that already lives in the report-developer team. The order is dictated by which leak costs the most: report-local DAX in week one is a maintenance liability for years.

## One MENA-flavored note

The ownership boundary that fails first in Arabic-OTT is the one between Layer 2 (metric engineering) and Layer 3 (report engineering) during Ramadan, when content launches compress and dashboard requests spike. Report developers under deadline pressure rebuild measures locally because asking for a model change takes a release cycle they do not have. By Eid the model is the source of truth on paper and the report files have absorbed three weeks of drift. The remedy is to staff Layer 2 with extra release-cycle bandwidth heading into Ramadan, not to relax the boundary; the boundary is what makes the layer trustworthy the rest of the year.

## Closing

Where does your semantic-layer ownership stop, and where does it leak?

When the answer is "the team owns everything from staging to report layout," the layer is not ownership-clean and the next outage is already on the schedule. When the boundaries are explicit and a named owner sits at each layer, the deployment script can run on a Friday evening and the dashboards still come up on Monday morning.
