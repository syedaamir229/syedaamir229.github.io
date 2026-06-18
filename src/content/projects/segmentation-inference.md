---
title: "Behavioral Segmentation & Attribute Inference"
description: "Raw behavior turned into governed, activatable segments and inferred profile attributes, so marketing and planning act on behavior instead of sparse signup data."
category: "Data Science"
tags: ["scikit-learn", "XGBoost", "MLflow", "Databricks"]
featured: false
metrics:
  - label: "Profiles Scored"
    value: "Millions"
  - label: "Attribute Coverage"
    value: "~4x"
  - label: "Segment Validation"
    value: "Multi-run stability"
order: 7
---

## Challenge

Behavioral signals had to become stable, interpretable segments and audit-safe inferred attributes, activatable in existing targeting workflows without being mistaken for declared ground truth.

- **Low segmentation fidelity**: Existing demographic groups did not reflect how customers actually behaved
- **Sparse profile data**: Key attributes were missing or unreliable, especially on shared accounts where declared values cannot be trusted
- **Activation gap**: Broad segments and missing fields were hard to convert into campaign actions
- **Trust boundary**: Inferred values had to stay distinct from declared data so downstream reporting did not quietly drift

## Key Decisions

### Decision 1: Combine behavioral signals with semantic embeddings, not behavior alone

**Problem:** An activity matrix captures what customers do but misses why catalog items group together. Pure behavior matrices produce clusters that statisticians like but content and marketing teams cannot describe or act on.

**Options considered:**

- Behavior matrix only (operational, but clusters are hard to label and explain)
- Semantic embeddings only (rich vocabulary, but disconnected from actual behavior)
- Combine the behavior matrix with semantic embeddings of catalog item descriptions in a shared space

**Chosen:** A combined feature space of the behavior matrix and semantic embeddings, clustered with K-means.

**Why:** Semantic embeddings give business teams a vocabulary for each segment (affinity-based groups they can name) that pure behavioral clusters lack, while the behavior matrix keeps the segmentation tied to what customers actually did. The combined space produces segments that are both statistically coherent and describable to a non-technical stakeholder, which is what makes them activatable rather than purely analytical.

### Decision 2: Publish inferred attributes to a separate surface, not into the declared-attribute table

**Problem:** If predictions land in the same column as self-reported values, every downstream consumer treats them as ground truth, and reporting quietly drifts from declared data.

**Options considered:**

- Overwrite declared values with predictions where available (highest coverage, lowest auditability)
- Write to the same table with a confidence column (auditable, but trust depends on every consumer reading the confidence)
- Publish predictions to a separate feature surface with usage guidance

**Chosen:** A separate enrichment surface, kept distinct from the declared-attribute table.

**Why:** Isolating predictions keeps the inference layer auditable, lets each downstream consumer decide whether to trust it for their use case, and prevents reporting from silently inheriting model output as fact. The cost is a second read for consumers that want both signals; the benefit is that nothing downstream mistakes an inference for a declared value.

## Approach

- Prepared profile-level behavioral features from the shared feature store as the common input for both workstreams
- Built a combined feature space (behavior matrix plus semantic embeddings of catalog item descriptions), ran K-means, and validated segments across multiple runs for stability before publishing
- Mapped segments into business-friendly profiles with explicit labels and wrote them back to the semantic layer for campaign and planning use
- Trained an attribute classifier on a naturally clean self-labeled subset (accounts with a single identifiable user), sidestepping large-scale labeling and its noise
- Registered the model in MLflow on Unity Catalog and scored millions of customer profiles into a separate enrichment surface with usage guidance

## Architecture Overview

![Behavioral segmentation and attribute inference pipeline: a shared profile-level feature store feeds two branches. A behavior matrix plus semantic embeddings feed K-means, producing stability-validated labeled segments written to the semantic layer. A clean self-labeled subset trains an XGBoost classifier, registered via MLflow, scoring millions of profiles into a separate enrichment surface.](/assets/projects/segmentation-inference.svg)

A shared profile-level feature store feeds two branches. In the segmentation branch, a behavior matrix and semantic embeddings of catalog descriptions feed K-means; segments are validated for run-to-run stability, labeled, and written back to the semantic layer. In the inference branch, a clean self-labeled subset trains an XGBoost classifier registered through MLflow on Unity Catalog, which scores millions of customer profiles into a separate enrichment surface with usage guidance.

## Results & Impact

- **What changed in activation**: Campaign audiences shifted from broad demographic blasts to behavior-anchored segments that targeting could act on directly
- **What changed in planning**: Teams gained a behavioral lens on segments where declared signals were too sparse to act on, and a shared vocabulary for audiences by behavioral shape rather than demographic shorthand
- **What changed in governance**: Segments and inferred attributes lived in published, governed surfaces kept distinct from declared data, so different teams meant the same thing and nothing downstream inherited model output as fact
- **Foundation for downstream work**: Stable segments and inferred attributes fed personalization and analytics workflows as shared references rather than per-team rebuilds

## Reusable Pattern

Behavior-first segmentation and audit-safe enrichment apply anywhere customer profiles are incomplete and demographics are weaker signals than behavior:

- **E-commerce**: Browsing and purchase segments, plus attribute enrichment for personalization
- **Fintech**: Transaction-pattern segments and behavior-based profile completion for product fit
- **Gaming**: Player archetypes and behavioral enrichment for retention and progression
- **SaaS**: Product-usage segments and inferred firmographics for onboarding and expansion

**When this pattern is NOT appropriate**: Skip clustering if your audience is small enough to manage with hand-defined segments (under ~100k customers) or if your activation channels cannot act on segment-level differences. Skip inference if your reporting layer cannot distinguish a prediction from a declared value, or if declared coverage is already above 80%, where the marginal lift rarely justifies the model maintenance.

## Tech Stack

- **Modeling**: Python (scikit-learn K-means, XGBoost), Spark ML
- **Platform**: Databricks, Delta Lake
- **Embeddings**: Sentence-transformer embeddings of catalog item descriptions
- **Model registry**: MLflow on Unity Catalog (lineage, versioning, approval)
- **Validation**: Multi-run stability checks; separate enrichment surface with usage guidance
- **Reporting**: Power BI
