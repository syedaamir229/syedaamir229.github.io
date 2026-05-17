# Site

Voice and copy rules for landing surfaces: the home page, capability cards, project listing card descriptions, section headers, CTAs, and the experience page header.

Tone and brand-voice principles live in [BRAND.md](BRAND.md). This file is the short, surface-specific spec for everything that is *not* a blog post or a project case study.

For long-form blog voice, see [BLOG.md](BLOG.md). For project case-study voice, see [PROJECTS.md](PROJECTS.md).

---

## 1. The one rule

**Lead with what changed for the business. The engineering verb moves to the detail page, not the landing surface.**

A reader scanning the home page or a project list should see, in plain language, what is now true that was not true before. Past-tense CV phrasing ("built", "designed", "stood up", "contributed to", "delivered") belongs inside the case study, not on the card that links to it.

---

## 2. What this looks like in practice

### Headlines (already good, keep)

- "Data that works as hard as your business does."
- "End KPI disputes and make reporting self-serve."
- "Turning scattered data into decisions your business can trust."

Headlines speak to a buyer in their language. Keep them direct, present-tense, outcome-shaped.

### Bullets on capability cards

Two-tier: a short label (2 to 3 words) and one sentence in plain business language under it.

**Good:**
> **Unified data model.** Every system that runs the business stitched into a single picture.

**Bad (CV voice):**
> Design unified data models from multiple source systems.

### Project descriptions (the one-line summary on cards)

Present-tense outcome, not past-tense delivery. Same facts, different center of gravity.

**Good:**
> "Standardized reporting across departments so leadership stopped reconciling spreadsheets."

**Bad (CV voice):**
> "Contributed to a multi-department BI rollout that standardized reporting across business units."

### Section subheadings and frame lines

Avoid quietly resume-style framing. The reader is not buying a person; they are buying an outcome.

**Good:**
> "Where this approach has paid off, across data platforms, analytics, and AI."

**Bad:**
> "Selected projects from 10 years of delivery across data platforms, analytics, and AI automation."

---

## 3. Vocabulary

For the full lists of words to use and avoid, see [BRAND.md section 5](BRAND.md#5-voice-and-tone-applies-to-every-surface). Landing-surface-specific reminders:

- **Avoid CV verbs on landing copy**: built, designed, developed, delivered, implemented, deployed, stood up, contributed to, led, drove, owned, championed. These belong in case-study bodies, not on the home page.
- **Avoid free-floating adjectives**: "leveraging", "utilizing", "comprehensive", "robust", "scalable" (as adjectives without a specific number behind them).
- **Prefer concrete business nouns**: revenue, churn, campaigns, dashboards, reports, customers, segments, profiles, episodes, content, sessions.
- **Prefer adverbs of place**: "in one place", "in one click", "without breaking", "before anyone touches it".

---

## 4. Vertical agnosticism

Capability cards, hero, and section subheads are pitched to any buyer: media, banking, retail, government, B2B SaaS. Pull vertical-specific vocabulary out of landing copy. Put it in the case studies, where it earns its keep as proof.

Specifically:

- **Subscription/SaaS-flavored**: subscribers, viewers, episodes, churn, retention, MRR, ARR.
- **Region-flavored**: Arabic, MENA, Dubai, UAE. The experience timeline already establishes the location; cards do not need to repeat it.
- **Tool-flavored**: Databricks, Power BI, Tableau, CleverTap. Named tools belong in project tags and detail bodies.

Use universal entities instead: customers, transactions, operations, finance, marketing, sales, risk, intent, records, content, accounts.

The Pipeline section on the home page ("How I Work") is the model for tone here — it already does vertical-agnostic well. Read it before editing other landing copy.

**Project case studies and blog posts are the opposite**: vertical-specific is the brand. They are evidence, not pitch.

---

## 5. Mechanical rules (inherited from BRAND.md)

- No em-dashes. Use colons, periods, or restructure.
- No emoji.
- No exclamation marks.
- No AI attribution in commits or PR bodies.
- Domain-relevant examples where natural in non-landing surfaces.

---

## 6. When in doubt

Read the line out loud as if you were sitting across from a finance director who has fifteen minutes. If it sounds like a resume, rewrite it. If it sounds like a person explaining what now works, ship it.

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND.md](BRAND.md) section 5.
- **Where landing copy lives in code**:
  - Hero copy: [src/components/home/Hero.astro](../src/components/home/Hero.astro).
  - Capability cards: [src/data/capabilities.ts](../src/data/capabilities.ts).
  - Pipeline copy: [src/data/pipeline.ts](../src/data/pipeline.ts).
  - About page facts strip: [src/components/about/AboutHeader.astro](../src/components/about/AboutHeader.astro).
  - Section headings: passed as props to [src/components/ui/PageHeader.astro](../src/components/ui/PageHeader.astro) and [SectionHeader.astro](../src/components/ui/SectionHeader.astro).
