---
title: "Behavior-Based Attribute Inference"
description: "Missing profile attributes filled in from behavior, so audience analysis stops being blocked by signup gaps."
category: "Data Science"
tags: ["XGBoost", "scikit-learn", "MLflow", "Databricks"]
featured: false
metrics:
  - label: "Coverage Grain"
    value: "~4x"
  - label: "Profiles Scored"
    value: "Millions"
order: 9
---

## Challenge

Declared profile fields were sparse and unreliable in shared-account scenarios, yet inferred attributes had to be activatable in existing targeting workflows without being mistaken for ground truth by downstream consumers.

- **Missing profile fields**: Key attributes were incomplete for many users
- **Data quality variance**: Declared values were not always reliable in shared-account scenarios
- **Planning limitations**: Content and marketing teams needed broader audience context
- **Activation requirement**: Inferred signals had to be usable in existing targeting workflows

## Key Decisions

### Decision 1: Train on a self-labeled clean subset rather than label at scale

**Problem:** Full-population labeling is expensive and noisy. In shared-account scenarios, declared values for the target attribute are unreliable on most accounts, so labeling the broad population would teach the model the wrong thing.

**Options considered:**

- Hand-label a sample (expensive, slow, hard to refresh)
- Weak-label from external signals (cheap, but introduces a second source of error)
- Use accounts with a single adult profile and a self-reported value as a naturally clean training set

**Chosen:** Single-adult-profile accounts with a self-reported label as the training subset.

**Why:** On accounts with a single adult profile, the self-reported value is as reliable as declared data gets: there is no household ambiguity. The subset is large enough to train on and refresh routinely, and it sidesteps the labeling cost entirely. The model learns from the cleanest slice of the existing data rather than a more diluted one.

### Decision 2: Publish predictions to a separate feature surface, not into the declared-attribute table

**Problem:** If predictions land in the same column as self-reported values, every downstream consumer treats them as ground truth, and reporting quietly drifts from declared data.

**Options considered:**

- Overwrite declared values with predictions where available (highest coverage, lowest auditability)
- Write to the same table with a confidence column (auditable, but trust depends on every consumer reading the confidence)
- Publish predictions to a separate feature surface with usage guidance

**Chosen:** A separate feature surface, kept distinct from the declared-attribute table.

**Why:** Isolating predictions keeps the inference layer auditable, lets downstream consumers decide whether to trust the predictions for their use case, and prevents reporting from quietly drifting from declared data. The cost is a second read for consumers that want both signals; the benefit is that nothing downstream silently inherits model output as fact.

## Approach

- Engineered behavioral features from profile activity and content interaction patterns
- Trained and compared classification models using validated training subsets
- Evaluated model behavior across segments to ensure practical consistency
- Published inferred attributes as controlled downstream features for analytics and targeting use

## Architecture Overview

![Behavior-based attribute inference pipeline: a self-labeled training subset feeds XGBoost training; the model is registered via MLflow in Unity Catalog and scores millions of adult profiles into a separate feature surface with usage guidance for downstream consumers.](/assets/projects/attribute-inference.svg)

Training data comes from accounts with a single adult profile and a self-reported label: a validation subset clean enough to learn from. XGBoost trains on behavioural features (protagonist gender exposure, audience affinity, sub-genre preferences) and the model gets registered through MLflow in Unity Catalog. At scoring time it covers millions of adult profiles. Predictions land in a separate feature surface with usage guidance, so downstream consumers can decide whether to trust them.

## Results & Impact

- **What changed in audience analysis**: Coverage of the target attribute expanded across the active profile base, so analysis no longer stalled on declared-data gaps
- **What changed in planning**: Content and marketing teams gained a behavioral lens on segments where declared signals were too sparse to act on
- **Activation surface**: Behavioral signals became a controlled enrichment layer with explicit usage guidance, kept separate from declared values so downstream consumers could choose when to use them
- **Foundation for downstream work**: Inferred attributes plugged into clustering and other audience modeling workflows without contaminating the declared-data source

## Reusable Pattern

This enrichment pattern is relevant when customer profiles are incomplete:

- **E-commerce**: Attribute enrichment for personalization and targeting
- **Fintech**: Behavior-based profile completion for segmentation support
- **Advertising**: Audience enrichment for campaign planning
- **Telecom**: Behavioral enrichment for plan recommendations and retention modeling

**When this pattern is NOT appropriate**: Don't infer attributes that downstream consumers will treat as ground truth. If your reporting layer can't distinguish a self-reported value from a model prediction, the inference adds risk without uplift. Same applies if your declared coverage is already above 80%: the marginal lift from inference rarely justifies the model maintenance burden.

## Tech Stack

- **Modeling**: XGBoost (binary classification) with scikit-learn for CV splits, metrics, and threshold selection
- **Platform**: Databricks on Delta Lake
- **Model registry**: MLflow in Unity Catalog (lineage, versioning, model approval)
- **Output**: Delta table with usage-guidance metadata (kept separate from declared values)
- **Sources**: Profile-level feature store + declared attributes (validation subset only)
