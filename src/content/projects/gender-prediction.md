---
title: "Behavior-Based Attribute Inference"
description: "Built a behavioral inference model to enrich incomplete profile attributes and improve downstream audience analysis."
category: "Data Science"
tags: ["XGBoost", "scikit-learn", "PySpark", "Databricks", "Delta Lake", "MLflow"]
featured: false
metrics:
  - label: "Model Accuracy"
    value: "75%"
  - label: "AUC Score"
    value: "0.81"
  - label: "Profiles Scored"
    value: "9.5M"
  - label: "New Predictions"
    value: "5.8M"
order: 9
---

# Behavior-Based Attribute Inference

> **Outcome:** Demographic coverage expanded from 22.7% (self-reported) to 100% of engaged adult profiles (5.8M new predictions) at 75% accuracy and 0.81 AUC, unlocking audience analysis where declared attributes were sparse.

**Organization**: Shahid (MBC Group)
**Role**: Data Science & Advanced Analytics
**Timeline**: July -- October 2025
**Industry**: Media & Entertainment (Data Science)
**Ownership**: End-to-end owner of feature engineering, model training, validation, and deployment handoff

Declared profile attributes were incomplete for a meaningful portion of users. A behavior-based inference workflow was needed to improve usable audience context.

## Challenge

- **Missing profile fields**: Key attributes were incomplete for many users
- **Data quality variance**: Declared values were not always reliable in shared-account scenarios
- **Planning limitations**: Content and marketing teams needed broader audience context
- **Activation requirement**: Inferred signals had to be usable in existing targeting workflows

## Approach

- Engineered behavioral features from profile activity and content interaction patterns
- Trained and compared classification models using validated training subsets
- Evaluated model behavior across segments to ensure practical consistency
- Published inferred attributes as controlled downstream features for analytics and targeting use

## Architecture Overview

<!-- DIAGRAM PENDING: Phase 5 SVG authoring -->

![Behavior-Based Attribute Inference: behavioral features (protagonist gender, audience affinity, sub-genre preferences) from the profile feature store feed an XGBoost training and validation loop tracked in MLflow, with the registered model producing 5.8M new predictions written back as controlled features for analytics and targeting](/assets/diagrams/gender-prediction.svg)

Training data comes from accounts with a single adult profile and a self-reported label: a validation subset clean enough to learn from. XGBoost trains on behavioural features (protagonist gender exposure, audience affinity, sub-genre preferences) and the model gets registered through MLflow in Unity Catalog. At scoring time it covers all 9.5M adult profiles. Predictions land in a separate feature surface with usage guidance, so downstream consumers can decide whether to trust them.

## Results & Impact

- Audience analysis became more complete where declared attributes were sparse
- Teams gained additional context for planning and campaign design
- Behavioral signals were converted into a practical enrichment layer
- Outputs complemented clustering and other audience modeling workflows

## Tech Stack

- XGBoost, scikit-learn
- PySpark
- Databricks, Delta Lake
- MLflow (Unity Catalog model registry)
- SQL

## Reusable Pattern

This enrichment pattern is relevant when customer profiles are incomplete:

- **E-commerce**: Attribute enrichment for personalization and targeting
- **Fintech**: Behavior-based profile completion for segmentation support
- **Advertising**: Audience enrichment for campaign planning
- **Healthcare engagement**: Behavioral enrichment for communication strategies

**When this pattern is NOT appropriate**: Don't infer attributes that downstream consumers will treat as ground truth. If your reporting layer can't distinguish a self-reported value from a model prediction, the inference adds risk without uplift. Same applies if your declared coverage is already above 80% — the marginal lift from inference rarely justifies the model maintenance burden.

---

## Related Projects

[Profile-Level Feature Store](/projects/profile-features/) | [Viewing Behavior Clustering](/projects/clustering/) | [CRM Campaign Automation Platform](/projects/jarvis/) | [Enterprise Data Model](/projects/data-model/)
