---
name: case-study-copywriter
description: >-
  Write or edit portfolio case studies, project writeups, and the flagship
  Customer Intelligence writeup for Aamir's data/AI freelance portfolio (this
  Astro repo, files in src/content/projects/). Use this skill whenever drafting,
  rewriting, consolidating, anonymizing, or polishing any project case study,
  project description, metrics row, or the flagship demo writeup, even when the
  request is phrased as "clean up this project page", "make this read better",
  "merge these projects", or "scrub this for discretion". It encodes the
  copywriting craft (results-first, outcomes over technology), the brand voice,
  the PROJECTS.md case-study structure, and the discretion scrub that keeps the
  work unattributable to Aamir's employer.
---

# Case Study Copywriter

This skill writes case studies that do one job: make a prospect on a sales call
think "he has solved a problem like mine before." It is not a CV and not a
vendor briefing. The reader skims, so the value has to land in the first few
seconds and survive a skim.

Three layers stack here, in priority order when they conflict:

1. **Discretion** (non-negotiable, overrides everything below)
2. **Voice and structure** (how every case study reads and is shaped)
3. **Copywriting craft** (what makes it persuasive)

Read in that order. A beautifully written case study that leaks the employer is
a failure, not a near-miss.

---

## 1. Discretion (the override layer)

Aamir works at an OTT streaming platform (MBC Shahid) and must never be
identifiable as freelancing, nor the work traceable to that employer. The
portfolio is shown to **prospects**, not to a hiring manager who already knows
where he works. That single fact makes the freelance discretion bar **stricter
than the portfolio repo's own `docs/PROJECTS.md` section 9.**

**Where this skill overrides PROJECTS.md:** that doc allows identifying vendor
names in `Tech Stack` and `tags`, reasoning the fingerprint is "contained" to
one surface. For a freelance audience that is not safe. The vendor *combination*
is the fingerprint, and Tech Stack is a screenshot-able surface. So:

### Blocklist — never appears on any surface (body, Tech Stack, tags, diagram, frontmatter)

- **Identifying vendor names:** Youbora, Evergent, Mediagenix. These three name
  OTT video analytics, OTT subscription billing, and broadcast scheduling. Any
  one hints at media; together they fingerprint a streaming platform. Drop them
  entirely. Do not replace with a near-synonym vendor; replace with a generic
  category referent ("a behavioral-analytics platform", "a subscription and
  billing system", "a content-metadata system") or omit from Tech Stack.
- **OTT / streaming vocabulary:** viewing sessions, watch behavior, viewer,
  episode / season / show hierarchy, household (as in shared streaming
  profiles), AVOD, SVOD, VAST, content titles (in an ad-serving sense).
- **Regional fingerprint as the headline:** MENA, Arabic, Dubai, UAE, Shahid,
  MBC, and named seasonal cycles used as the canonical example (Ramadan, Eid,
  World Cup). Cultural framing in passing is different; a named cycle as *the*
  operational example ties the system to one industry.

### Reframings (use these generic referents)

| Streaming tell | Generic reframe |
|---|---|
| streaming / OTT platform | a large subscription-based consumer business |
| viewing sessions, watch behavior | engagement events, usage behavior |
| viewer, subscriber profile | customer, customer profile |
| episode / season / show | catalog, product/content catalog |
| household (shared profiles) | account grain vs individual-user grain |
| Youbora | a behavioral-analytics platform |
| Evergent | a subscription and billing platform |
| Mediagenix | a content-metadata system |

"Subscriber" and "subscription" themselves are fine: telecom, SaaS, news, and
retail all use them. The tell is the *cluster* (viewing + episode + household +
those vendors), not any single generic word.

### Ad / GAM projects: re-costume, do not drop

The ad-revenue project is real and strong; only its wardrobe leaks. Keep the
engineering and the (generic) stack. Swap streaming-ad vocabulary for
**GAM/ad-ops-generic** terms any digital publisher uses:

- Use: ad requests, impressions, fill rate, line items, ad units, eCPM,
  discrepancy reconciliation, programmatic, delivery pacing.
- Drop / reframe: VAST → "ad-serving error categories"; AVOD → "ad-supported
  inventory"; content titles → "ad units / placements"; streaming platform →
  "ad-supported digital publisher".
- Generic stack stays: Databricks, Delta Lake, AWS S3, Power BI, Google Ad
  Manager is borderline (it is used by every publisher, so it is acceptable in
  Tech Stack *alone*, but never paired with a vendor-specific cadence per the
  rule below).

### Discretion rules that still apply from PROJECTS.md

- **Metrics stay relative or magnitude-based.** No exact subscriber, profile, or
  revenue counts in the header row (most screenshot-ed surface). Use "Millions",
  "5 sources", "60-70% faster", "Zero", "Hours to seconds". If softening makes
  the work sound smaller, drop the metric instead.
- **The company is never the subject of a sentence.** The system is: "the
  platform processed", "the pipeline ran", "the model produced".
- **No vendor name paired with a vendor-specific operational quantity** (e.g.
  "GAM with a 14-day window"). Name the vendor without the quantity, or describe
  the behavior without the vendor.
- **Strip internal column/codename fingerprints** (`dwh_*`) to conventional
  equivalents (`customer_id`, `content_id`).

When in doubt, ask: "If a prospect screenshotted only this surface, could they
tell it was an Arabic OTT platform?" If yes, it is not scrubbed.

---

## 2. Voice and structure

Tone source of truth: `docs/BRAND.md` section 5. Structure source of truth:
`docs/PROJECTS.md`. The essentials, so this skill stands alone:

### Voice

- **Direct and declarative.** No hedging: no "might", "could potentially",
  "perhaps", "in some cases", "generally".
- **Specific over abstract.** Numbers, named (generic) systems, real moments.
  "Saved 15 hours per week", not "delivered significant efficiency gains".
- **Confident, not arrogant. Show, do not tell.**
- **The reader is smart.** Do not explain what AI or a semantic layer is.
- **First person for judgment, system for action.** "I migrated", "I chose",
  "I owned" carry the decisions and the role; the system is the subject for what
  it does ("the pipeline ran", "the model produced"). The company is never the
  subject and is never named. First person is what makes the study read like the
  author instead of a template, and it matches the blog voice. Past tense for the
  work throughout.

### Words to avoid

- Marketing filler: cutting-edge, state-of-the-art, next-generation,
  revolutionary, game-changing, robust, scalable (as a free adjective),
  comprehensive, leveraging, utilizing.
- Hedges (list above).

### AI cadence tells (kill these in the first draft)

Case studies attract a specific set of machine-writing patterns. They look
professional at a glance but signal a template to any reader who slows down.

- **AI vocabulary.** "Testament", "landscape", "pivotal", "crucial", "delve",
  "notable", "showcasing", "it's worth noting." Replace with the plain version:
  "is" not "serves as a testament to"; "matters" not "plays a crucial role".
- **Significance inflation.** "This project marked a significant milestone in
  the organisation's data journey." State the result; let the reader decide if it
  matters.
- **Copula overreach.** "Serves as a foundation for", "boasts the ability to",
  "features robust pipelines." Use "is" and "has". If the sentence weakens on
  the simpler verb, the claim was weak to begin with.
- **Aphorism formulas in My Role.** "Data without context is just noise",
  "Speed without accuracy is just fast failure." Replace the formula with the
  honest one-sentence transfer claim the role section asks for.
- **Challenge openers.** "In today's data-driven world..." or "As organisations
  increasingly rely on AI..." These are the generic setups. Start with the
  concrete problem: the number nobody agreed on, the call that returned four
  different answers, the report that took a day to build.

### Hard rules (mechanical, non-negotiable)

- **No em-dashes.** Not `—`, not `--`. Use colons, periods, or restructure. (SQL
  `--` inside fenced code is exempt.)
- **No emoji. No exclamation marks** outside quoted speech.
- **No AI attribution** anywhere (no "Generated with", no "Co-Authored-By").
- **No passive voice in headlines.**

### Case study structure (six H2 sections, fixed order)

Plain markdown in `src/content/projects/<slug>.md`. No MDX, no imports. No lead
paragraph above `## Challenge` (the header renders from frontmatter). This
structure follows the data-freelancer portfolio framework: outcome-led, decisions
folded into a first-person narrative, concise enough to survive a skim. The rigid
four-part "Key Decisions" grid and the four-industry "Reusable Pattern" block
were dropped (2026-06-18) because their uniform cadence read as machine-generated.
The reference exemplar is `src/content/projects/semantic-layer.md`.

1. **Challenge** — open with the sharp, concrete version of the problem (a real
   scene, a question that returned four different answers, the moment it started
   costing something). Then one short paragraph of context and why it matters.
   Then 2-4 bullets that agitate distinct facets. Do not make the bullets
   mechanically parallel.
2. **Approach** — first person, past tense for the work. Lead with the one or two
   decisions that carried the project, told as reasoning ("Two calls carried the
   rest of the work. The first was..."), naming the rejected option and the
   reason in a sentence. NOT a Problem/Options/Chosen/Why grid. A real anecdote
   earns its place when it shows judgment. Close with 3-6 operational bullets for
   what was built.
3. **Results & Impact** — 4 bullets, each led by a business outcome and a
   checkable number, before/after where possible. A bold category label is
   optional; do not force a uniform label cadence onto every bullet.
4. **Architecture** — one SVG `![alt](/assets/projects/<slug>.svg)` + one caption
   paragraph. Alt text names sources → layers → consumers in flow. This skill
   writes the copy, not the diagram. For the SVG itself (hand-coded, brand
   palette, abstract referents not vendor icons, verified with
   `npm run verify:diagram`), follow `docs/BRAND.md` section 7 and
   `docs/PROJECTS.md` section 5. A deliberate labeled diagram is not "AI slop";
   the slop rule is about generic decorative AI images, not technical diagrams.
5. **Tech Stack** — 4-6 `**Label**: value` bullets. Canonical labels: Platform,
   Storage, Processing, Modeling, Reporting, Orchestration, Sources, Delivery,
   Application, Semantic model, Access management.
6. **My Role** — first person. One short paragraph naming what you specifically
   owned and did (your role, not the team's), then one or two sentences on where
   the pattern transfers and when it does not. This replaces the Reusable Pattern:
   one honest sentence about transfer beats four templated industry bullets.

### Frontmatter

```yaml
---
title: "..."
description: "One sentence, leads with the change not the technology."
category: "Data Engineering"   # or BI & Analytics, Data Science, AI & Automation
tags: ["Databricks", "Delta Lake", "SSAS", "Power BI"]   # generic tools only
featured: true
metrics:                       # 3-4, relative/magnitude only
  - label: "Source Systems Unified"
    value: "5"
order: 1
---
```

When density or phrasing is in question, mirror `semantic-layer.md`, the
reference exemplar for the first-person structure. The other case studies are
being brought into line with it; do not mirror any case study still written in
the old third-person, seven-section shape.

---

## 3. Copywriting craft (what makes it persuasive)

The structure is the skeleton; this is what makes a skimmer stop.

- **Lead with the outcome.** Busy readers decide whether to keep reading in the
  first line. The `description` and the `metrics` row render at the very top, so
  they carry the result before the body's Challenge section. Make the
  `description` the payoff, not the setup: "One trusted model so BI, ML, and AI
  build on the same numbers instead of fighting over them", not "A project to
  unify five source systems."
- **Before / After / Bridge.** The Challenge is the painful *before* (numbers
  nobody trusts, teams exporting to spreadsheets). Results & Impact is the
  *after*. The Approach narrative is the *bridge*. Make the before genuinely
  uncomfortable and specific so the after has somewhere to travel from. A vague
  before makes the whole study flat.
- **Problem-Agitate-Solve inside the Challenge.** The opening states the problem;
  the bullets agitate it (each one a distinct way it hurt). Do not rush to the
  solution inside the Challenge section.
- **Specific numbers beat adjectives.** "60-70% faster report builds" and "Zero
  downtime" do more than "dramatically improved" ever can. Every claim should be
  one a skeptic could check.
- **Outcomes over technology.** The reader buys the result, not the stack. The
  stack proves you can deliver it; it is evidence, not the headline. Lead each
  Results bullet with what changed for the business, not what was built.
- **Write for the skim.** Every bullet legible in about two seconds. One idea per
  bullet. Clarity over cleverness: if a sentence is doing something clever, check
  it is also doing something clear.
- **Opinionated.** The My Role close, with one honest line on where the pattern
  transfers and when it does not, reads as someone who has actually done this,
  not a generalist. A real anecdote in the Approach (the deploy that broke, the
  audit that found three formulas) does the same: specifics are what separate
  lived work from a template.

---

## Quick checklist before finishing

- [ ] Discretion: no blocklist term on any surface; vendor combination cannot
      fingerprint an OTT/MENA platform; metrics are relative/magnitude; company
      is never the subject.
- [ ] Voice: no em-dashes, no emoji, no exclamation marks, no hedges, no
      marketing filler, no AI attribution. First person for judgment and role,
      system as subject for what it does, company never the subject.
- [ ] Structure: six H2 sections in order (Challenge, Approach, Results & Impact,
      Architecture, Tech Stack, My Role); frontmatter complete; 3-4 relative
      metrics; one SVG referenced. No Key Decisions grid, no Reusable Pattern.
- [ ] Craft: description leads with the outcome; Challenge opens on a concrete
      scene; Approach folds the decisions into first-person narrative with the
      rejected option named; Results bullets lead with business change and a
      checkable number; My Role closes in first person.
- [ ] Skim test: read only the title, description, metrics, and the first line of
      each section. Does the value still land?
