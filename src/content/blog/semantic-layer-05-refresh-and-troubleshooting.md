---
title: "Semantic Layer Series Part 5 of 6: The Six-Stage Refresh Loop"
date: 2026-08-05
description: "How a missed overnight refresh stops being a leadership incident: a six-stage loop and a five-step backfill, run from a written runbook."
og_title: "When the Overnight Refresh Fails"
categories: ["Data Engineering", "BI & Analytics"]
draft: false
series: semantic-layer
series_part: 5
---

An unmonitored refresh that fails overnight is the kind of outage that leadership sees before the data team does. The Monday standup opens the executive KPI dashboard. Yesterday's row is blank, and the row before it is partial. The overnight refresh failed. Nobody saw the alert. The leadership review in the afternoon is now operating on stale numbers, and the data team is improvising a backfill in front of an audience.

Failures like this one end more programs than modelling mistakes do. The model is correct. The dashboards are configured. The refresh broke, and the recovery path lived in one engineer's head.

**A semantic-layer team is either operating the refresh as a documented loop or operating it as one engineer's tribal knowledge. Once it lives in someone's head, the next failed refresh produces a missed Monday and a leadership team reporting on numbers that did not refresh; once it lives in a procedure, the same incident becomes a one-shift recovery that the on-call engineer runs from a written runbook.** The way you get there is not more monitoring. It is The Six-Stage Refresh Loop and the Five-Step Backfill that pairs with it, both written down explicitly so the model recovers without a leadership escalation.

## Why this matters now

Semantic-layer reliability is decided in the refresh window, not in the build pipeline. A model that compiles cleanly, validates correctly, and ships smoothly can still be the model that produces an empty dashboard at 9 AM on a Monday because last night's refresh failed silently at 3 AM. The Monday standup opens the executive dashboard and discovers that yesterday's row is blank, the row before is partial, and the leadership review in the afternoon is now operating on stale numbers.

The fix is not better monitoring after the fact. It is a refresh discipline named explicitly: a stable sequence to run nightly, a partition strategy that matches the data behaviour, and a recovery procedure any engineer on the team can run without escalating. Without those three, the model's reliability lives in one engineer's head, and the program is one absence away from a stale-data incident.

![Refresh Pipeline and Recovery Workflow: Normal Daily Refresh Path runs Upstream Data Jobs, Load Staging, Create Partitions, Model Refresh, Partition Merge. Missed-Day Recovery Path below walks nine deterministic steps from confirming upstream completeness to resuming the standard schedule.](/assets/blog/semantic-series-05-refresh-recovery.svg)

*Reliable refresh operations require both a stable daily path and a tested missed-day recovery path.*

## The Six-Stage Refresh Loop and the Five-Step Backfill

### Stage ordering: the Six-Stage sequence

**What it is.** A stable nightly sequence that runs in fixed order:

1. Upstream curated data jobs complete and emit success flags.
2. Staging support tables are refreshed.
3. Dimension tables are refreshed.
4. Fact partitions are created or extended.
5. Semantic model processing runs.
6. Partition merge and cleanup runs.

**Why it matters.** Most apparent KPI anomalies in production turn out to be stage-ordering violations, not logic issues. A fact partition created before its dimensions are refreshed produces a measure that joins to last week's dimension state and returns numbers nobody can explain. Sequencing the six stages explicitly is what keeps the dimension state and the fact state in sync, and what keeps the morning dashboard answering the same question two days in a row.

**What goes wrong without it.** Stages run in parallel or out of order. A fact refresh kicks off before its source dimensions have completed, the model joins against a partial dimension table, and the morning dashboard reports numbers that disagree with yesterday's by a few percent for reasons the team cannot explain in five minutes.

### Partition strategy: per-fact cadence

**What it is.** Different fact families need different refresh windows. Short-lag facts overwrite the recent 1 day. Medium-lag facts overwrite the recent 5 days. Longer-lag facts overwrite a multi-week window. The cadence is set per fact, not globally.

**Why it matters.** Late-arriving data is real in some domains (programmatic ad attribution settles over weeks) and irrelevant in others (subscriber events finalise the day they happen). A global refresh window either wastes compute on facts that do not need it or misses late-arriving corrections on facts that do. Per-fact cadence is what makes the refresh budget match the data behaviour, which is what keeps the loop fast enough to run in the overnight window and complete enough to cover settled corrections.

**What goes wrong without it.** Either every fact runs a multi-week refresh (which is expensive and slow) or every fact runs a one-day refresh (which misses late-arriving corrections and produces numbers that shift after the fact). The team starts running ad-hoc reprocesses for the facts the global window does not fit, and the refresh becomes a set of exceptions instead of a discipline.

### Recovery: the Five-Step Backfill

**What it is.** A deterministic five-step procedure that recovers a missed day without a full reload:

1. Validate upstream completeness. Do not start model recovery before source dependencies are complete.
2. Backfill staging and curated ranges. Load missing dates in controlled ranges and verify row counts against the same range from the previous week before proceeding.
3. Reset partition pointers safely. Update partition metadata so partition creation resumes from the correct date boundary.
4. Reprocess only impacted slices. Targeted partition recreation, not full refresh.
5. Validate downstream numbers. Compare high-value KPI outputs against baseline slices before reopening dashboards to users.

**Why it matters.** A documented procedure means any engineer on the team can recover a missed day without escalating to the model owner. The five steps also prevent the most common backfill mistake: a full reprocess "to be safe" that adds eight hours of compute to a four-hour incident. Targeted partition recreation is what makes recovery a one-shift operation instead of a one-day operation.

**What goes wrong without it.** Recovery depends on tribal knowledge. The engineer who built the model has to run the backfill personally; anyone else escalates. Recovery times stretch into days, leadership reports on stale numbers, and the trust the model loses during the recovery window takes a quarter to rebuild.

## Where I would start

If you can only document one of the three disciplines this quarter, document the recovery procedure. Stage ordering and partition strategy protect against drift and stale data, both of which the team can work around for a while. The recovery procedure protects against the catastrophic failure mode where the model is offline and leadership is asking for numbers. The cost of one undocumented recovery during a real incident exceeds the cost of writing the other two procedures together.

Stage ordering ships next, because the ordering rules are the input contract that lets the recovery procedure know which steps it can safely re-run. Partition strategy comes last because it is the discipline that gets refined over time as the team learns which facts settle late; the initial cadence can be wrong and still produce a working loop.

## One MENA-flavored note

Refresh windows in Arabic-OTT need to absorb the Ramadan late-night viewing pattern. Engagement traffic shifts toward iftar-to-suhoor windows, which means the operational window where data lands and the model has to refresh narrows: the same overnight slot that comfortably runs the full Six-Stage Refresh Loop the rest of the year is competing with peak playback traffic during Ramadan. The practical implication is a Ramadan-mode schedule that pre-stages dimension refreshes earlier in the night and tightens partition windows on the engagement fact, so the model is ready before the morning content meeting opens the dashboards. The cycle awareness lives in the orchestration, not in the model logic.

## Closing

Is your refresh a process, or a person?

When the answer is a person, the program is one absence away from a stale-data incident. When the answer is a process, any engineer on the team can run the Six-Stage Refresh Loop or the Five-Step Backfill from a written runbook, and the model recovers without a leadership escalation. The model is the part that gets attention. The refresh loop is the part that decides whether the model is reliable enough to be trusted.
