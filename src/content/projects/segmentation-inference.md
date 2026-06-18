---
title: "Behavioral Segmentation & Attribute Inference"
description: "Raw behavior turned into governed, activatable segments and inferred attributes, so marketing and planning act on what customers do instead of sparse signup data."
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

Marketing wanted to target customers by what they actually did, but the only thing it could segment on was the demographic box people ticked at signup, when they bothered to tick it at all. So campaigns went out to broad age-and-region buckets that bore no resemblance to behavior, and the planning team had no shared way to talk about who their audiences really were.

For a large subscription-based consumer business, behavior is the richest signal you own and declared profile data is the thinnest. The hard part is turning raw activity into segments a non-technical stakeholder can name and act on, and filling in missing attributes without anyone downstream mistaking a model's guess for a fact the customer told you.

- Demographic groups did not reflect how customers actually behaved, so segmentation steered campaigns by a signal that barely correlated with intent.
- Key profile attributes were missing or unreliable, and on shared accounts declared values cannot be trusted in the first place.
- Broad segments and empty fields were hard to convert into anything targeting could action.
- Any inferred value had to stay visibly distinct from declared data, or reporting would quietly start treating predictions as ground truth.

## Approach

Two calls shaped the work.

The first was what to cluster on. Pure behavior was the obvious choice and it captures what customers do, but it misses why catalog items group together, and the clusters it produces are ones statisticians like and business teams cannot describe. I rejected behavior-only for that reason, and embeddings-only for the opposite one: rich vocabulary, no tie to actual activity. I built a combined feature space instead, a behavior matrix joined with semantic embeddings of catalog item descriptions, then clustered with K-means. The embeddings gave each segment a vocabulary teams could name it by, while the behavior matrix kept it anchored to what people actually did. That combination is what made the segments activatable rather than purely analytical.

The second was where the inferred attributes landed. The tempting option was to backfill predictions straight into the declared-attribute table for maximum coverage, but then every downstream consumer treats a guess as ground truth and reporting drifts off declared data without anyone noticing. Writing to the same table with a confidence column was auditable only if every consumer remembered to read the confidence. I published predictions to a separate enrichment surface with explicit usage guidance instead. The cost is a second read for anyone who wants both signals; the benefit is that nothing downstream can mistake an inference for something the customer declared.

- Prepared profile-level behavioral features from the shared feature store as the common input for both the segmentation and inference workstreams.
- Ran K-means over the combined behavior-plus-embedding space and validated segments across multiple runs for stability before publishing anything.
- Mapped each segment to a business-friendly profile with explicit labels and wrote them back to the semantic layer for campaign and planning use.
- Trained the attribute classifier on a naturally clean self-labeled subset, accounts with a single identifiable user, which sidestepped large-scale labeling and its noise.
- Registered the model in MLflow on Unity Catalog and scored millions of customer profiles into the separate enrichment surface.

## Results & Impact

- Campaign audiences moved off broad demographic blasts onto behavior-anchored segments that targeting could action directly.
- Planning gained a behavioral lens on cohorts where declared signals were too sparse to act on, plus a shared vocabulary for describing audiences by behavioral shape.
- Attribute coverage roughly quadrupled by filling missing fields from inference, with predictions kept on a published surface distinct from declared data so nothing downstream inherited model output as fact.
- The stable segments and inferred attributes became shared references for personalization and analytics workflows instead of something each team rebuilt on its own.

## Architecture

![Behavioral segmentation and attribute inference pipeline: a shared profile-level feature store feeds two branches. A behavior matrix plus semantic embeddings feed K-means, producing stability-validated labeled segments written to the semantic layer. A clean self-labeled subset trains an XGBoost classifier, registered via MLflow, scoring millions of profiles into a separate enrichment surface.](/assets/projects/segmentation-inference.svg)

A shared profile-level feature store feeds two branches. In the segmentation branch, a behavior matrix and semantic embeddings of catalog descriptions feed K-means; the resulting segments are validated for run-to-run stability, labeled, and written back to the semantic layer. In the inference branch, a clean self-labeled subset trains an XGBoost classifier registered through MLflow on Unity Catalog, which scores millions of customer profiles into a separate enrichment surface with usage guidance.

## Tech Stack

- **Modeling**: Python (scikit-learn K-means, XGBoost), Spark ML
- **Platform**: Databricks, Delta Lake
- **Embeddings**: Sentence-transformer embeddings of catalog item descriptions
- **Model registry**: MLflow on Unity Catalog (lineage, versioning, approval)
- **Validation**: Multi-run stability checks; separate enrichment surface with usage guidance
- **Reporting**: Power BI

## My Role

I owned both workstreams end to end: the feature engineering, the combined-space segmentation, the classifier trained on the clean self-labeled subset, and the governance decision to keep inferred values on their own surface. I also wrote the segment labels and usage guidance that let marketing and planning pick the work up without me in the room. The pattern transfers anywhere customer profiles are incomplete and behavior is a stronger signal than demographics. It earns its keep less cleanly when the audience is small enough to hand-define, when activation channels cannot act on segment-level differences, or when declared coverage is already high enough that inference adds little a team would maintain.
