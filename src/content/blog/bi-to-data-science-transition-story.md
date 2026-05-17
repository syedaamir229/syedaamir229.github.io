---
title: "BI to Data Science: The Three Ways the Transition Dies"
date: 2025-03-17
description: "A first-person account of the six-month overlap between BI ownership and data science delivery, and the three failure patterns that kill most transitions before they compound."
categories: ["Career", "Data Science"]
draft: false
---

A Friday afternoon Slack channel during my BI-to-DS overlap period at Shahid (MBC Group). Two messages within an hour. The first: "the AVOD engagement dashboard is showing zero for last week." The second: "the gender prediction model is returning nulls for half the active profiles."

Same channel. Same engineer. Same governed tables underneath. Two different stakeholders, both waiting on me, both with reasonable expectations about turnaround. The afternoon turned into a forced ranking: which side gets the next two hours of attention, and which side gets a Monday-morning apology.

This is the moment most BI-to-DS transitions die. The temptation is to declare one side legacy and one side current, drop one, focus on the other. The data team becomes a DS team that lost its dashboards, or a BI team that wishes it was doing ML. Neither outcome is the one you wanted when you started the transition.

**A transition is not a handoff. It is a six-month overlap where both responsibilities have to stay healthy.** Drop either side and you do not get a better team; you get a team with one capability and a credibility gap.

## The overlap period

For roughly six months, my weeks had a predictable split. Mornings were BI: fielding dashboard requests, fixing broken refreshes, reviewing metric definitions with stakeholders. Afternoons shifted toward feature engineering, writing transformation logic against the same subscriber tables I already knew, but now shaping them for model inputs instead of report filters.

The dual-role tension was real but manageable. BI had established processes and stakeholder expectations. DS was exploratory and less predictable. Some weeks the balance tipped toward BI when a critical reporting cycle hit. Other weeks I could spend full days on feature pipelines. The discipline was that neither side could go neglected long enough to lose trust.

Working at Shahid meant the data volumes and business urgency were high on both fronts. Dashboards powered weekly executive reviews. Models were expected to drive subscriber retention and personalisation. There was no luxury of pausing one to focus on the other.

## What changed

Deliverables shifted from dashboards to models and features. The first ML deliverable was a behaviour-based gender inference model: predicting subscriber gender from viewing patterns when demographic data was missing. The classification problem was the easy part. The harder work was building the behavioural features that made it useful. After that came viewing cluster models for content personalisation, and eventually the profile-level feature store that enriched subscriber records across multiple downstream systems.

Evaluation moved from visual validation to model diagnostics and segment behaviour. Instead of checking whether a chart looked right, I was evaluating precision-recall trade-offs, checking whether predictions held across subscriber segments, and validating that inferred attributes aligned with known ground-truth samples.

Success criteria expanded from reporting speed to decision impact. A good dashboard loaded fast, showed accurate numbers, answered the business question. A good model had to do all of that and also change a downstream decision: trigger a CRM campaign, adjust a content recommendation, or flag an at-risk subscriber for intervention.

## What did not change

Data-model discipline stayed central. Stakeholder translation stayed critical. Metric trust stayed non-negotiable.

The biggest misconception in this transition is that BI skills become irrelevant in DS work. In practice they reduce failure risk. Knowing how to build governed dimension tables, how to define lifecycle logic consistently, and how to communicate metric limitations to business stakeholders are exactly the skills that prevent ML projects from producing outputs nobody trusts.

## The Three Ways BI-to-DS Transitions Die

### 1. Building a parallel ML data model

This is the most common failure. The data-science workstream creates its own subscriber table with slightly different lifecycle definitions, different date cutoffs, or a different way of handling trial accounts. The model works fine in isolation, but its numbers disagree with the BI dashboards. Stakeholders notice. Trust erodes silently. By month four, the data team is in reconciliation meetings instead of building.

The fix is to enforce shared entity definitions from day one. Same `dim_subscriber`, same lifecycle flags, same date spine for both dashboards and models. The 15,000-versus-12,000 churn count gap that ends transitions starts here.

### 2. Dropping BI responsibilities too early

If dashboards stop being maintained or metric definitions drift while attention shifts to ML, business teams lose confidence in the data function overall. They will not trust model outputs from someone whose dashboards started breaking on their watch. The overlap period exists for a reason: it builds credibility for the new work by preserving trust in the existing work.

This is the failure mode that feels productive while it is happening. The DS work feels new and ambitious. The BI work feels routine. Dropping the routine to focus on the ambitious looks like prioritisation. It is actually a credibility transfer in the wrong direction.

### 3. Treating model accuracy as the only success metric

A model can have strong accuracy on a holdout set and still fail in production because the output format does not match the consuming system, or because the predictions are not actionable at the business cadence. Validating operational fit matters as much as validating statistical performance. The classifier that scores 0.81 AUC and cannot be ingested by the CRM tool is a project that did not ship.

## What I would do first in the overlap

If you can do one thing in your overlap period to make the transition durable, share entity definitions from week one.

Every model the DS workstream builds should consume the same governed dimension tables the BI dashboards read. Not "a subscriber table." The subscriber table. When stakeholders ask why the model says one thing and the dashboard says another, the answer should trace to the same row, the same column, the same definition. The trust that compounds in BI for years is the same trust that lets a model output land in a leadership review without being challenged on first principles.

## The turning point

The transition became durable once feature engineering and inference workflows started sharing the same governed entities as BI. The clearest example was subscriber-level features powering both the churn dashboard and the churn prediction model. Same `dim_subscriber` table, with lifecycle status, subscription start date, and plan history, as the input on both sides. When a stakeholder asked "why does the model say this subscriber is at risk?" the answer pointed to fields they already saw in the dashboard. That traceability made the model's outputs credible to teams that were used to dashboard-level clarity.

## One MENA-flavored note

The credibility transfer matters more in MENA, not because the technical work is different but because the trust networks are smaller and the same stakeholders see both sides of the data function. The executive who reviews dashboards in the Monday meeting is often the same one who hears the ML pitch on Wednesday. If the Monday dashboard was broken, Wednesday's pitch starts at a deficit. Keeping both sides healthy through the overlap is not optional in markets where the audience for both is the same room.

## Closing

Are you transitioning, or are you abandoning?

A transition is six months of overlap, two sides of the work alive at once, both stakeholders kept whole. Abandonment is dropping the BI work to chase ML and discovering eight months in that nobody trusts the model because the dashboards stopped being maintained. The transition pattern requires more discipline. It also produces the only outcome you actually wanted when you started: a team that can deliver both, on a foundation that compounds.
