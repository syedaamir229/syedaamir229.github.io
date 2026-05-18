---
title: "Behavior-Based Attribute Inference"
description: "Missing profile attributes filled in from behavior, so audience analysis stops being blocked by signup gaps."
category: "Data Science"
tags: ["XGBoost", "scikit-learn", "MLflow"]
featured: false
metrics:
  - label: "Coverage Expansion"
    value: "From a quarter to near-full"
  - label: "Profiles Newly Inferred"
    value: "The majority of the cohort"
  - label: "Profiles Scored"
    value: "Millions"
order: 9
---

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

![Behavior-based attribute inference pipeline: a self-labeled training subset feeds XGBoost training; the model is registered via MLflow in Unity Catalog and scores millions of adult profiles into a separate feature surface with usage guidance for downstream consumers.](/assets/projects/attribute-inference.svg)

Training data comes from accounts with a single adult profile and a self-reported label: a validation subset clean enough to learn from. XGBoost trains on behavioural features (protagonist gender exposure, audience affinity, sub-genre preferences) and the model gets registered through MLflow in Unity Catalog. At scoring time it covers millions of adult profiles. Predictions land in a separate feature surface with usage guidance, so downstream consumers can decide whether to trust them.

## Results & Impact

- Audience analysis became more complete where declared attributes were sparse
- Teams gained additional context for planning and campaign design
- Behavioral signals were converted into a practical enrichment layer
- Outputs complemented clustering and other audience modeling workflows

## Reusable Pattern

This enrichment pattern is relevant when customer profiles are incomplete:

- **E-commerce**: Attribute enrichment for personalization and targeting
- **Fintech**: Behavior-based profile completion for segmentation support
- **Advertising**: Audience enrichment for campaign planning
- **Healthcare engagement**: Behavioral enrichment for communication strategies

**When this pattern is NOT appropriate**: Don't infer attributes that downstream consumers will treat as ground truth. If your reporting layer can't distinguish a self-reported value from a model prediction, the inference adds risk without uplift. Same applies if your declared coverage is already above 80%: the marginal lift from inference rarely justifies the model maintenance burden.

## Tech Stack

- **Modeling**: XGBoost (binary classification) on a self-labeled training subset
- **Feature engineering**: PySpark on behavioral signals (protagonist exposure, audience affinity, sub-genre preferences)
- **Platform**: Databricks on Delta Lake
- **Model registry**: MLflow in Unity Catalog (lineage, versioning, model approval)
- **Output surface**: Separate feature table with usage-guidance metadata so consumers can distinguish predictions from declared values
- **Sources**: Profile-level feature store + declared attributes (validation subset only)
