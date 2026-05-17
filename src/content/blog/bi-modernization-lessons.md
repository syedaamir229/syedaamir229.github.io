---
title: "BI Modernization: The Three-Phase Migration Sequence That Did Not Break Trust"
date: 2024-08-12
description: "A Tableau-to-Power BI-to-SSAS modernization at Shahid in three sequential phases (tool, data layer, metric logic), with zero reporting disruption, 35% maintenance reduction, 40% adoption lift, and 100+ governed measures."
categories: ["BI & Analytics", "Data Engineering"]
draft: false
---

Mid-cutover, third quarter of a phased BI modernization at Shahid. The executive sponsor sitting in on a validation review asked the question every modernization eventually faces: "Are we sure these numbers are the same as last quarter?"

The honest answer most teams have to give is "we think so, but we are changing three things at once and we can isolate maybe one of them." That answer ends programs. It ends them because the executive who asked the question now has to defend whichever number ships in next week's leadership review, and they cannot do that without certainty.

The migration at Shahid did not have to give that answer. It was deliberately sequenced into three phases (tool, then data layer, then metric logic) so that each phase could be independently validated against the previous one. When the executive asked, we could point to the layer that had changed, show the validation runs, and confirm that the number on the slide reflected the same definition as the quarter before.

**Most post-launch BI modernization failures are sequencing failures, not modelling failures.** Migrating tool, data layer, and metric logic at the same time introduces compounding failure modes. If something breaks during a simultaneous swap, you cannot isolate whether the issue is the new BI tool, the new data architecture, or the new metric definitions. The phased sequence is what lets the program survive its first hard question.

## Why this matters now

Tableau-to-Power BI migrations are now routine, but the structural failure mode has not changed: organisations attempt single-step migrations and then spend two years rebuilding trust. [Industry analysis of BI platform migrations](https://www.gartner.com/) consistently reports timelines that double the original estimate, and the root cause is almost always compounding change across layers that should have been migrated separately.

At Shahid the work ran from August 2022 through March 2023 for the first two phases, with the third phase running through mid-2024. Phased timing was a deliberate trade-off. A big-bang migration might have been faster on paper. The risk of cascading failures and stakeholder fatigue made the phased approach the better bet for an estate of this size and visibility.

## The starting estate

Before the migration kicked off, the platform's reporting was built entirely on Tableau, connected to a mix of legacy data sources: SQL Server tables and direct connections to source systems like Youbora (video analytics), Evergent (subscriber management), and Google Ad Manager. Reports had been built over time by different teams and individuals, each with their own conventions for metric definitions, naming, and source connections. KPI logic lived inside individual report files; the same metric could be calculated slightly differently depending on who built the report and when.

The reporting estate served content, subscriptions, ad operations, and finance. Reports were actively used for operational and executive decision-making. Any disruption during migration would have been immediately visible.

## The Three-Phase Migration Sequence

### Phase 1: Tool (Tableau to Power BI)

Move report consumers to the target BI tool with continuity against legacy data sources. Reports rebuilt in Power BI, still pointing at the same Tableau-era legacy data. Nothing changes about the data layer or metric definitions yet.

What this phase solves: usability risk. Report consumers learn the new tool while the data and metrics behind their reports are still exactly what they were. The questions that arise are formatting, navigation, and minor behavioural differences between Tableau and Power BI, not "why is this number different from last week."

What goes wrong if you skip it: the team migrates tool, data, and metric simultaneously. A report-owner says "this number looks wrong." Nobody can tell whether the new tool rendered it differently, the new data layer returned a different value, or the migrated measure has a slightly different definition. Every reconciliation is a three-variable problem.

### Phase 2: Data layer (legacy sources to Databricks Gold)

Repoint reports to governed shared data assets. Reports continue running in Power BI; the underlying data source switches from a legacy table to a Gold-layer table from the enterprise data model. Metric logic still lives in the report file, unchanged from Phase 1.

What this phase solves: data consistency risk. Now every report is consuming the same governed, modelled data. Filters, dimensions, and grain are aligned across the estate. The "why does Subscriber Count differ between the Content report and the Subscriptions report?" conversations stop being unanswerable.

What goes wrong if you skip it: report owners author measures against legacy sources or against the new model inconsistently, and the estate ends up half-governed and half-not. Two years later the maintenance cost of the legacy half is the same as it was before the migration.

### Phase 3: Metric logic (report-level DAX to shared SSAS measures)

Centralise KPI logic in a semantic model. Measures move out of individual report files into shared SSAS Tabular measures consumed via live connection. Report owners shift from authoring measures to selecting them.

What this phase solves: metric drift risk. KPI definitions live in one place instead of being scattered across individual report files. The 100+ shared measures that came out of this phase replaced an unknown but larger number of slightly different versions of the same logic that had accumulated over years.

What goes wrong if you skip it: the semantic-layer governance benefit never materialises. Reports stay individually authored, drift continues, and the modernization program has spent its political budget on a tool change and a data-layer migration without delivering the durable trust improvement that justified the work.

## What I would never skip again

**Cutover runbooks.** Every major cutover had a written runbook: the sequence of steps, the validation checks to run before and after, the rollback procedure, and the communication plan for affected stakeholders. The runbook removes ambiguity during the most fragile moments of each phase. The first time something does not behave as expected during cutover, the team is grateful for the runbook.

**Pilot dashboards before broad rollout.** Migrating two or three representative dashboards first, validating with primary stakeholders, then proceeding to the broader rollout. This catches data-source mismatches, formatting differences, and performance regressions before they affect the full estate.

**Explicit deprecation of report-local KPI logic.** In Phase 3 it was not enough to ship the semantic layer and hope teams adopted it. Local DAX in report files was removed as the corresponding shared measure went live. Without explicit deprecation, both the old and new approaches coexist indefinitely and the governance benefit erodes.

**Named owner per phase.** Each phase had a single named owner responsible for delivery, communication, and issue resolution. Migration is the worst possible activity to manage with shared accountability.

## Where I would start

If you have one quarter and the political budget for one phase, do Phase 1.

Phase 1 produces visible progress (every report runs in the new tool) without risking the layer that backs every leadership conversation (the data and the metrics). Stakeholders feel the change. Trust survives. The political budget for Phase 2 is earned, not assumed.

## One MENA-flavored note

The Shahid migration intersected the Ramadan content cycle once. The deliberate decision was that no cutover would happen mid-Ramadan, because dashboards used during Ramadan release reviews are the highest-visibility reports of the year. Cutover windows were aligned to the cycle, not the calendar. Modernization programs in MENA streaming that ignore the content cycle ship the wrong phase at the wrong week and burn trust that takes a year to rebuild. The cycle awareness is operational, not seasonal flavour.

## Outcomes

By the end of the three phases:

- **35% reduction in report maintenance costs.** Updates to KPI definitions required changes in one place rather than across every report file, and automation replaced manual refresh and distribution workflows.
- **40% increase in report adoption** among business users. Tailored departmental dashboards on the new platform made reporting more accessible to non-technical stakeholders.
- **100+ shared measures** consolidated into the semantic layer. Duplicated metric definitions that had accumulated over years collapsed into one source.
- **Zero reporting disruption** across all three phases. The phased sequence delivered its core promise of maintaining business continuity throughout the transformation.

## Closing

If your migration broke today, which layer would you point at first?

The answer is the test for whether the program is recoverable. A team that can point to a layer can fix the layer. A team that swapped tool, data, and metrics simultaneously cannot point at anything; they can only roll back the whole migration or absorb the cost. The Three-Phase Migration Sequence above exists so the answer is always available, and so the answer is always a fix and not a retreat.
