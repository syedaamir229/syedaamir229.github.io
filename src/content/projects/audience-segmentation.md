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
order: 8
---

## Challenge

- **Low segmentation fidelity**: Existing groups did not reflect viewing behavior
- **Limited activation value**: Broad segments were difficult to convert into campaign actions
- **Content planning blind spots**: Teams lacked behavior-led audience profiles
- **Validation need**: Segments had to make business sense, not just statistical sense

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

- Teams gained behavior-based segments that were practical for day-to-day decisions
- Campaign audiences became more targeted and less generic
- Content planning discussions used clearer audience profiles
- Segmentation outputs fed downstream personalization and analytics workflows

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
- **Validation**: Multi-run stability checks and business-friendly cluster labelling
- **Output surface**: Segment table written back to the Semantic Layer
- **Reporting**: Power BI for segment exploration and content strategy review
