---
title: "Viewing Behavior Clustering"
description: "Built behavior-first user segmentation that enabled actionable audience groups for content strategy and targeted campaigns."
category: "Data Science"
tags: ["Python", "scikit-learn", "K-means", "Databricks", "PySpark", "Power BI"]
featured: false
metrics:
  - label: "Audience Segments"
    value: "12"
  - label: "Profiles Scored"
    value: "7.5M"
order: 8
---

# Viewing Behavior Clustering

> **Outcome:** 12 behavior-based audience segments derived from 7.5M scored profiles, replacing demographic and plan-type segmentation with activation-ready cluster definitions used by content strategy and CRM automation.

**Organization**: Shahid (MBC Group)
**Role**: Data Science & Advanced Analytics
**Timeline**: 2024
**Industry**: Media & Entertainment (Data Science)
**Ownership**: Key contributor to feature selection, clustering workflow design, validation, and activation

Audience segmentation was broad before this work. Teams relied on simple dimensions such as plan type or geography, which did not capture real user behavior patterns.

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


![Viewing Behavior Clustering: profile features and content semantic embeddings feed a K-means clustering job that emits 12 audience segments, written back to the Semantic Layer and consumed by Jarvis CRM automation and Power BI content-strategy dashboards](/assets/diagrams/clustering.svg)

Two signals feed the model: a behaviour matrix of viewing hours by mood, sub-genre, and dialect; and semantic embeddings from content synopses. K-means runs on the combined space. The 12 resulting segments are checked for stability across runs and labelled with business-friendly names before being written back into the Semantic Layer.

## Results & Impact

- Teams gained behavior-based segments that were practical for day-to-day decisions
- Campaign audiences became more targeted and less generic
- Content planning discussions used clearer audience profiles
- Segmentation outputs fed downstream personalization and analytics workflows

## Tech Stack

- Python (scikit-learn, pandas, numpy)
- Databricks
- PySpark
- Power BI

## Reusable Pattern

Behavior-first clustering is relevant across many domains:

- **E-commerce**: Browsing and purchase behavior segments
- **Fintech**: Transaction pattern segments for product fit and risk review
- **Gaming**: Player archetypes for retention and progression strategies
- **SaaS**: Product usage segments for onboarding and expansion motions

**When this pattern is NOT appropriate**: Skip clustering if your audience is small enough to manage with hand-defined segments (under ~100k users), or if your activation channels can't act on cluster-level differences. The maintenance cost of stable, interpretable clusters at scale is real, and it only pays back when behavioral signals are genuinely richer than demographic ones.

---

## Related Projects

[Profile-Level Feature Store](/projects/profile-features/) | [CRM Campaign Automation Platform](/projects/jarvis/) | [Behavior-Based Attribute Inference](/projects/gender-prediction/) | [Enterprise Data Model](/projects/data-model/)
