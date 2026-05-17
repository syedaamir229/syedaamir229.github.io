---
title: "From BI to AI: My Ten-Year Compounding Stack"
date: 2026-05-18
description: "Ten years from Tableau dashboards in a Dubai consulting firm to NLP platforms running on multilingual streaming feedback. The progression is not four careers. It is one stack that compounded."
categories: ["Career"]
draft: false
---

Early 2025. I sat down to build a behaviour-based gender prediction model for MBC Shahid (MBC Group). The textbook approach to attribute inference starts with raw event data, designs features from scratch, and pretends none of that work already exists in the organisation.

What sat in front of me on day one was a Gold-layer subscriber feature table that had been built three years earlier as part of the enterprise data model. Profile lifecycle, watch behaviour, content preferences, device patterns: all already shaped, all already governed, all already wired into Power BI dashboards. The hardest part of any ML pipeline, the feature engineering, was 90% done before the project started.

The model shipped four months later. 9.5M profiles scored. 75% accuracy, 0.81 AUC, net new gender attribute coverage rising from 22% of profiles to 100%. None of that was an ML breakthrough. It was a compounding-stack dividend, paid by work I had done as a BI engineer in 2022.

**AI is not a separate career. It is the fourth floor of a building you have been laying foundations for since the day you opened your first BI tool.** Most people in data treat the four phases (Data Foundations, Analytics Maturity, Data Science, AI Automation) as discrete jobs that require different skills, different teams, different employers. The teams that compound treat them as one stack where each layer earns the right to the next.

## Why this matters now

The shape of this argument is sharper in 2026 than it was when I started in 2016. The job market is full of "AI engineer" postings, "MLOps lead" requirements, "GenAI architect" roles. The implicit signal is that AI is a destination you transfer to. The reality on the ground is the opposite: the most effective AI work I have seen, my own and other people's, is built on a well-governed data foundation that the same person or team also designed.

The [dbt 2025 State of Analytics Engineering Report](https://www.getdbt.com/resources/state-of-analytics-engineering-2025) is blunt about this. 80% of data practitioners now use AI in some form. Data quality remains the most critical challenge for data teams to solve. Translation: teams are skipping the foundation work, and the AI built on top is failing because of it. The ones that ship are the ones that compounded.

![The Compounding Stack: Data Foundations at the base, then Analytics Maturity, Data Science, and AI Automation stacked above it, with up-arrows showing each layer enables the next.](/assets/blog/bi-to-ai-journey-compounding-stack.svg)

*Each layer is owned, governed, and reused by the layer above it. Skipping a floor does not save time. It introduces drift that the floors above pay for.*

## The Compounding Stack

### Layer 1: Data Foundations

**What it is.** Modelled, governed, source-of-truth data layers. Fact and dimension tables with the grain set correctly the first time. Surrogate keys, slowly changing dimensions, lifecycle tracking. The unglamorous part of the work.

**Why it compounds.** Everything above this layer is a consumer. A semantic layer consumes Gold tables. A feature store consumes the same Gold tables. An AI agent eventually queries those tables through one of those interfaces. When the foundation is right, each consumer is cheap to build. When it is wrong, each consumer rebuilds the foundation itself, and they all rebuild it differently.

**What goes wrong without it.** Teams skip straight to ML, build features from raw event data, and produce models whose predictions cannot be reconciled with dashboards. The 15,000-versus-12,000 churn-count problem is the textbook failure: a churn model says one thing, a churn dashboard says another, and the leadership team cannot tell which to trust.

This was the 2016 to 2022 phase of my own work: Tableau dashboards at Scan Technology, multi-department BI at Al-Futtaim, enterprise BI architecture for HHRC at Beinex. At the time it felt like "just BI." It was not. It was the foundation that made every later phase possible.

### Layer 2: Analytics Maturity

**What it is.** A semantic layer on top of the data foundation. Governed KPIs, owned per domain, consumed via live connections. A metric vocabulary the whole organisation shares.

**Why it compounds.** This is the layer that turns "data" into "decisions." Every meeting, every leadership conversation, every campaign post-mortem runs on the metrics defined here. When the semantic layer is healthy, the organisation has a shared definition of success.

**What goes wrong without it.** Without a metric vocabulary, AI is optimising toward unmeasurable goals. You can train a propensity model, but if "high-value subscriber" means four different things in four different reports, the model is solving the wrong problem. The metric drift is invisible until it is shipped.

The MBC Shahid semantic-layer build (Power BI Premium model in 2023, migrated to SSAS Tabular in 2024) was this phase for me. 100+ governed DAX measures across subscriber base movement, engagement, title performance, and ad operations. By the time the gender prediction model was scoped in 2025, every feature it needed had a governed definition.

### Layer 3: Data Science

**What it is.** Models that consume the same feature tables as BI. The profile-level feature store at MBC Shahid is the artefact of this layer: subscriber-level features that power both the engagement dashboard and the gender prediction model.

**Why it compounds.** This is where the dividend from layers 1 and 2 actually gets paid. The feature engineering you did for the BI dashboard is the feature engineering for the ML model. Bug fixes in the dashboard propagate to the model. New features added for one consumer are available to the other.

**What goes wrong without it.** Parallel ML pipelines that recompute features from raw events create the BI/ML mismatch. The model is trained on features that drift from the BI definitions, and over time the model's predictions become uninterpretable from the dashboards that the business uses to act on them.

This phase was the gender prediction model, the viewing behaviour clustering work, and the profile feature store. Each one consumed the Gold-layer tables and the semantic-layer definitions. None of them needed to rebuild the foundation.

### Layer 4: AI Automation

**What it is.** Systems that act on data. Scenario engines that push audiences to CleverTap. Voice-of-customer platforms that ingest Arabic-language social comments and answer business questions in natural language through Genie spaces and a supervisor agent.

**Why it compounds.** Automation closes the loop from insight to action. The hard part is not the LLM call, it is the structured data and governed metrics behind the LLM call. When the lower three layers are in place, automation is a thin top layer. When they are not, automation is a heuristic plastered over chaos.

**What goes wrong without it.** Without the lower three layers, AI automation is buggy heuristics. A scenario engine pushes the wrong audience because the audience definition disagrees with the dashboard. A voice-of-customer agent answers the wrong question because the underlying engagement table is not governed. The failure is not the automation. The failure is what it sits on.

The CRM automation platform and The voice-of-customer platform are the artefacts of this layer at MBC Shahid. Both are thin compared to the work underneath them.

## What I would tell my earlier self

**Each layer earns the right to the next.** I did not realise this in 2016. I thought BI was the starting line. It is the foundation. The compounding only works if you build the floors in order.

**The stack does not matter as much as you think.** Tableau, Power BI, Qlik, Alteryx, SSIS, Databricks, PySpark, scikit-learn, LangGraph. The tool changes; the modelling thinking does not. Learn to model data well, and the tool is interchangeable.

**Own the problem, not the ticket.** Every career jump in this stack came from owning a capability, not a task. Building a report is a task. Owning a client's BI architecture is a capability. Building a feature is a task. Owning a feature store is a capability. The capability-owners get to build the next floor.

**Skipping floors costs more than building them.** Every time I have seen a team try to start at Layer 3 or 4, they spend the first six months rebuilding Layers 1 and 2, badly, in a way that will not survive their second use case.

## One MENA-flavored note

The MENA AVOD context made the compounding extra visible. When ad pipelines, subscriber base movement, and engagement all sit on the same semantic foundation, a Ramadan-campaign scenario in Jarvis goes from a one-month custom build to a one-week configuration. The Voice-of-Customer Stack inside Enigma answers questions about Arabic-language comments because the underlying engagement table already has Arabic content metadata. The niche does not change the principles. It makes the dividends arrive faster, because every consumer hits the same governed surface.

## Closing

Is your stack compounding, or restarting every two years?

The teams that restart have a familiar shape. New tool, new vendor, new "AI strategy," every cycle. Each cycle ships a demo and stalls in production. The teams that compound do something quieter: they take the foundation seriously, they make each layer earn the right to the next, and they let the same people who built Layer 1 stay close to Layers 2, 3, and 4. The dividend takes years to arrive. When it arrives, it is unmistakable.
