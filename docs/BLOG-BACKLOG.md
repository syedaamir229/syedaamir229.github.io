# Blog backlog

The rewrite queue for the blog catalog. Every post here was written in the old voice (third-person, rigid template, MENA/OTT tells) and needs re-voicing to the new first-person standard plus a discretion scrub before it goes live. This file is the factory's work queue.

See [BRAND-voice.md](BRAND-voice.md) "Long-form and first-person voice" for the voice, [BLOG.md](BLOG.md) for structure and the section 10 confidentiality scrub, and `social/linkedin/<slug>.md` for each post's companion.

## How the queue works

- **Nothing leaks.** Every un-rewritten post is `draft: true`, so it stays hidden no matter its date. The only publishable post is the one most recently finished.
- **Finish, then publish.** When a rewrite passes the voice + discretion + review pass, flip it to `draft: false` and stamp its `date` with the next open slot. Until then it stays drafted.
- **Cadence: bi-weekly Wednesdays.** Decouple writing from publishing: rewrite in batches, publish on the drumbeat. Pick up to weekly once a buffer exists. Dates below are tentative planning aids; the real date is assigned at publish time.
- **Each post ships with its LinkedIn companion** (`social/linkedin/<slug>.md`), rewritten in the same pass. Under 800 chars, hook above the fold, link near the end. See [LINKEDIN.md](LINKEDIN.md).

## Queue (ordered by reach/impact, scrub effort and runway as tie-breakers)

| # | Slug | Reach | Discretion to scrub | Effort | Source case study | Status | Target slot (tentative) |
|---|------|-------|---------------------|--------|-------------------|--------|-------------------------|
| 1 | bi-to-ai-journey | High | done (clean) | done | data-foundation, segmentation-inference | **Done: live #1** | 2026-06-24 |
| 2 | ai-strategy-is-data-modeling | High | MENA note + 1 inference example | Light | data-foundation | Queued | 2026-07-08 |
| 3 | why-most-semantic-layers-fail | High | abstract KPIs, kill Ramadan note | Medium | data-foundation | Queued | 2026-07-22 |
| 4 | scalable-data-model | High | swap streaming examples, kill OTT note | Medium | data-foundation | Queued | 2026-08-05 |
| 5 | bi-migration-three-phase-sequence | High | kill MENA note, one KPI swap | Light | data-foundation | Queued | 2026-08-19 |
| 6 | bi-to-data-science-bridge-patterns | Medium | abstract dim_subscriber + watch metrics | Medium | data-foundation, segmentation-inference | Queued | 2026-09-02 |
| 7 | attribute-inference-in-practice | Medium | SEVERE: topic is gender-on-viewers; reframe to generic inferred attribute | Heavy | segmentation-inference | Queued | 2026-09-16 |
| 8 | ai-crm-automation | Medium | SEVERE: OTT-saturated body, retitle scenario examples | Heavy | crm-automation | Queued | 2026-09-30 |
| 9 | semantic-layer-01-why-governed-metrics | Medium | swap KPIs, delete Ramadan note | Mechanical | data-foundation | Queued | 2026-10-14 |
| 10 | voice-of-customer-intelligence | Low-Med | SEVERE: retitle off "Multilingual Streaming", abstract throughout | Heavy | voice-of-customer, document-copilot | Queued | 2026-10-28 |
| 11 | semantic-layer-02-architecture-and-data-flow | Low | swap fact table names, delete Ramadan note | Mechanical | data-foundation | Queued | 2026-11-11 |
| 12 | semantic-layer-03-kpi-engineering-with-dax | Low | swap KPIs, delete Ramadan note | Mechanical | data-foundation | Queued | 2026-11-25 |
| 13 | semantic-layer-04-governance-and-deployment | Low | delete Ramadan freeze-window note | Mechanical | data-foundation | Queued | 2026-12-09 |
| 14 | semantic-layer-05-refresh-and-troubleshooting | Low | abstract ad-attribution, delete Ramadan note | Mechanical | data-foundation | Queued | 2026-12-23 |
| 15 | semantic-layer-06-performance-monitoring | Low | delete Ramadan baseline note | Mechanical | data-foundation | Queued | 2027-01-06 |

The semantic-layer series (parts 1-6) is one Low-reach block with one higher-reach entry point (part 1). Its scrub is the most mechanical in the catalog: swap streaming KPI examples for generic ones, delete the per-post Ramadan note. Consider rewriting the six as a single batch even though they publish across separate slots.

## Net-new posts (not rewrites)

Original posts written fresh in the current voice, outside the rewrite queue.

| Slug | Status | Notes |
|------|--------|-------|
| data-ai-maturity-ladder | **Done, held as draft:true (was date-gated to 2026-07-22); flip draft:false when ready to publish** | Net-new framework post building on Dan Martell's AI Adoption Ladder, adding the data-foundation ("wall") dimension. Voice-calibrated against Aamir's own corpus; passed the blog and LinkedIn persona panels and the discretion scrub. Diagram skipped deliberately (concept-illustration risk). Re-voiced line by line in a later pass (Plain-recognition dial); the companion close was reworked to a reader-challenge CTA and the proof line swapped to the decade-in-data receipt. Companion at `social/linkedin/data-ai-maturity-ladder.md`. Pushed off 2026-07-01 to 2026-07-22 to break up a three-post data-foundation run (bi-to-ai → ladder → ai-strategy-is-data-modeling); rag-verification-layer slots in ahead of it. Companion de-duped against bi-to-ai-journey: dropped the "hard part / takes years" twin and the decade credential for a "data sets your rung" ceiling line, reworked the CTA off the shared "I wrote up..." skeleton, swapped #AIstrategy for #AIadoption (companion now 772 chars). Body de-duped too: reframed the "AI raised the price of bad data" paragraph (bi-to-ai's headline) into "## What AI actually changed", renamed the duplicate "Where I would start" heading to "## How I would climb it", reworked the Rung 5 customer-outreach example, retitled the closing reflection to "## The wall was there first", plus engineer truth-fixes (validator "cites" not "backed by", generalized the churn example, softened the ladder-physics line). Then a light differentiation pass moved the takeaway off the shared "build the foundation/wall first" close onto a diagnostic frame: maturity = the gap you could walk away from. Panel re-run after edits: buyer 7 to 9, editor seam fixed, discretion 10 CLEARED both panels. Goes live on the daily rebuild on its date. |
| rag-verification-layer | **Published 2026-07-01 (draft:false, live)** | Net-new framework post building on Paolo Perrone's writeup of how DoorDash built their RAG system (plus DoorDash's two public engineering posts). Angle: building RAG is the easy part, the verification layer is what ships it. Framework = four checks ordered by when they run (cheap real-time gate / escalation second opinion / offline LLM judge / pre-deploy simulation). Motif: draft-and-editing (generation = first draft; verification = the editing before it reaches the reader). Proof: Document Copilot named once as the cheap gate, honest that the other three are unbuilt. Percentage-free. Diagram included (`public/assets/blog/rag-verification-layer-checks.svg`). Passed the blog panel (engineer 9, buyer 8, brand-voice 8.5, editor 8.5, discretion 10 CLEAR) and the LinkedIn panel (9). Companion at `social/linkedin/rag-verification-layer.md` (797 chars). Polished in a later pass: a humanizer-lens diagnostic plus a multi-persona re-review, Document Copilot narration de-duped against the ladder's Rung 3, og_title set to "The Checks Every RAG Demo Skips", OG card generated. Published 2026-07-01 (draft:false, date-stamped, deployed). |

## Cut from the catalog

| Slug | Why cut |
|------|---------|
| bi-to-data-science-transition-story | Overlapped with bi-to-ai-journey (same first-person career arc) and carried a SEVERE live tell (AVOD dashboard + gender-prediction opener). Deleted 2026-06-18. |
| avod-ad-operations-four-signal-loop | Low reach + SEVERE title-level tell ("AVOD") + heavy scrub. Not worth a slot. Deleted 2026-06-18. |

## Source material (what anchors a rewrite)

- **data-foundation** (case study): richest anchor. Medallion + feature store, semantic layer, tiered refresh, three-phase parallel-run migration. Anchors most posts. Already discretion-scrubbed.
- **segmentation-inference**: clustering + attribute classifier, separate enrichment surface, ~4x coverage. Anchors inference and bridge posts. Softened to "attribute".
- **voice-of-customer**: NLP enrichment, two NL-SQL agents + supervisor, RAG. Anchors the VoC post. Softened to "non-English".
- **crm-automation**: scenario engine, behavior-based prioritization, multi-week dedup. Anchors the CRM post.
- **ad-revenue-pipeline**: four operating signals, settlement sweep, business-impact alerts.
- **document-copilot** (`draft: false`, personal): fully clean RAG demo over public SEC filings. The safest reusable substance for any RAG rewrite without re-introducing tells.
