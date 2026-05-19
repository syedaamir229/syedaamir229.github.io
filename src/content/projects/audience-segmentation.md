---
title: "Viewing Behavior Clustering"
description: "Viewers grouped by how they actually watch, giving content and marketing teams audiences they can act on."
category: "Data Science"
tags: ["scikit-learn", "PySpark", "MLflow", "Power BI"]
featured: false
metrics:
  - label: "Behavioral Segments"
    value: "Labeled and governed"
  - label: "Profiles Scored"
    value: "Millions"
  - label: "Validation"
    value: "Multi-run stability"
order: 8
---

## Challenge

Existing demographic segments lacked behavioral fidelity and could not be activated directly, so clustering had to produce groups that were both statistically stable across runs and immediately interpretable to content and marketing teams.

- **Low segmentation fidelity**: Existing groups did not reflect viewing behavior
- **Limited activation value**: Broad segments were difficult to convert into campaign actions
- **Content planning blind spots**: Teams lacked behavior-led audience profiles
- **Validation need**: Segments had to make business sense, not just statistical sense

## Key Decisions

### Decision 1: Combine a behavior matrix with semantic content embeddings, not behavior alone

**Problem:** Viewing-hours-by-genre captures what users watch but misses why content groups together. Pure behavior matrices produce clusters that statisticians like but content teams cannot describe.

**Options considered:**

- Behavior matrix only (operational, but clusters are hard to label and explain)
- Content embeddings only (semantically rich, but disconnected from actual viewing patterns)
- Combine the behavior matrix with semantic embeddings of content synopses in a shared space

**Chosen:** Combined behavior matrix and semantic embeddings of synopses as the feature space for K-means.

**Why:** Semantic embeddings give content teams a vocabulary for each cluster (dialect-leaning drama watchers, sub-genre affinity groups) that pure behavioral clusters lack, while the behavior matrix keeps the segmentation tied to what users actually watched. The combined space produces clusters that are both statistically coherent and describable to a non-technical stakeholder.

### Decision 2: Validate via multi-run stability checks, not single-run silhouette scores

**Problem:** Clustering on changing behavioral data can produce different segments each run. The moment segment membership shifts unpredictably, trust erodes and campaign targeting cannot rely on the segments.

**Options considered:**

- Pick the single best run by an internal metric (fast, but no guarantee of stability over time)
- Accept silhouette score as the validation metric (statistically rigorous, but does not measure run-to-run consistency)
- Require segments to be stable across multiple runs before they enter the semantic layer

**Chosen:** Multi-run stability checks with business-friendly labels applied before publish.

**Why:** Stability across runs is what makes a segment operationally usable. A cluster that shifts every week cannot be the basis for recurring campaigns or content planning conversations. Combining stability validation with explicit labels turns clusters into a published reference rather than a model artifact, which is what makes the output activatable rather than purely analytical.

## Approach

- Selected and prepared profile-level behavioral features from the shared feature store
- Applied unsupervised clustering and evaluated cluster quality across multiple runs
- Refined feature inputs and segment definitions until clusters were stable and interpretable
- Mapped clusters into business-friendly segment profiles for activation
- Published segment outputs for campaign targeting and content strategy use

## Architecture Overview

![Viewing behavior clustering pipeline: a behavior matrix of viewing hours plus semantic embeddings from content synopses feed K-means, producing roughly a dozen audience segments validated for stability and published to the semantic layer.](/assets/projects/audience-segmentation.svg)

Two signals feed the model: a behaviour matrix of viewing hours by mood, sub-genre, and dialect; and semantic embeddings from content synopses. K-means runs on the combined space. Roughly a dozen behavioral segments emerge from the combined space, checked for stability across runs and labelled with business-friendly names before being written back into the Semantic Layer.

## Results & Impact

- **What changed in activation**: Campaign audiences shifted from broad demographic blasts to behavior-anchored segments that targeting could act on directly
- **What changed in planning**: Content planning discussions referenced audience profiles by behavioral shape rather than by demographic shorthand, giving programming and marketing a shared vocabulary
- **What changed in governance**: Segment definitions lived in one published table with business-friendly names, so different teams meant the same thing when they referenced a segment
- **Foundation for downstream work**: Stable, labeled segments fed personalization and analytics workflows as a shared reference rather than a per-team rebuild

## Reusable Pattern

Behavior-first clustering is relevant across many domains:

- **E-commerce**: Browsing and purchase behavior segments
- **Fintech**: Transaction pattern segments for product fit and risk review
- **Gaming**: Player archetypes for retention and progression strategies
- **SaaS**: Product usage segments for onboarding and expansion motions

**When this pattern is NOT appropriate**: Skip clustering if your audience is small enough to manage with hand-defined segments (under ~100k users), or if your activation channels can't act on cluster-level differences. The maintenance cost of stable, interpretable clusters at scale is real, and it only pays back when behavioral signals are genuinely richer than demographic ones.

## Tech Stack

- **Modeling**: Python (scikit-learn K-means, pandas, numpy)
- **Platform**: Databricks (PySpark, Spark ML)
- **Inputs**: Profile-level feature store (behavior matrix) + sentence-transformer embeddings of content synopses
- **Validation**: Multi-run stability checks, business-friendly cluster labels
- **Output**: Segment table written back to the Semantic Layer
- **Reporting**: Power BI for segment exploration and content strategy review
