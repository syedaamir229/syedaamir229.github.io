---
name: blog-writeup
description: >-
  Write or rewrite blog posts (and their LinkedIn companions) for Aamir's
  data/AI personal-brand site, this Astro repo (posts in src/content/blog/,
  companions in social/linkedin/). This is the blog "factory": use it whenever
  drafting a new post, rewriting an old post into Aamir's first-person voice,
  scrubbing a post for employer discretion, or producing the matching LinkedIn
  companion, even when phrased as "write up the X post", "make this read like
  me", "re-voice this blog", or "do the next one from the backlog". It encodes
  the first-person long-form voice, the BLOG.md structure, the multi-persona
  review cycle, and the discretion scrub that keeps the work unattributable to
  Aamir's employer. It runs with a checkpoint at each stage and writes drafts
  straight into the portfolio repo as draft:true (never deploys, never flips
  draft:false on its own).
---

# Blog Write-up (the factory)

This skill produces blog posts that read like Aamir wrote them, carry real
delivery weight, and never leak his employer. A post that is beautifully written
but sounds like a brand, or leaks the employer, is a failure, not a near-miss.

Three layers stack here, in priority order when they conflict:

1. **Discretion** (non-negotiable, overrides everything below)
2. **Voice and structure** (how every post reads and is shaped)
3. **Craft and review** (what makes it land, and how it is verified)

Sources of truth in the repo (read them, do not just trust this file):
- Voice: `docs/BRAND.md` section 5, especially "Long-form and first-person voice".
- Structure and confidentiality: `docs/BLOG.md` (spine in section 4, H3 format in
  section 5, confidentiality in section 10, LinkedIn in section 13).
- The work queue: `docs/BLOG-BACKLOG.md` (slugs, reach, scrub notes, source case study).
- The reference implementations (voice + structure): `src/content/blog/bi-to-ai-journey.md`
  (the canonical anchor), and `src/content/blog/data-ai-maturity-ladder.md` (a second
  Framework-archetype exemplar: the wall/ladder motif, freshly re-voiced line by line).
- Source material: `src/content/projects/*.md` (the case studies that anchor each post).

---

## How this skill runs: checkpoint at each stage

Run the stages in order. **Stop at each checkpoint and wait for Aamir before
continuing.** Do not race to a finished post. Advance one stage, check in, then
continue. This matches how the pilot was built.

### Stage 0 — Intake
Take a backlog slug or a fresh topic.
- Read: BRAND.md long-form voice, BLOG.md, the BLOG-BACKLOG.md row, the source
  case study named there, and the existing old post if this is a rewrite.
- Identify the archetype (framework / war-story-narrative / opinion-contrarian),
  the central either-or thesis, the running motif, and the specific discretion
  tells in the old post that must go.
- **Ground it in research BEFORE proposing an angle, when the topic is
  externally-seeded or makes claims beyond Aamir's own delivery.** If the post
  builds on an article, framework, or trend he came across, map the landscape
  first: use the `deep-research` skill for a thorough cited sweep, or a focused
  set of WebSearches for lighter topics. (`deep-research` is a built-in Claude
  Code skill that ships with the CLI, so it travels with any clone; if it is
  unavailable in a given environment, fall back to WebSearch.) Find what already
  exists, what is overdone (so the post is not a rehash), and the honest
  whitespace; confirm any external facts and the accurate source to credit.
  Present the findings to Aamir before designing the framework. Inventing a POV
  and backfilling research is what caused the most rework on past posts. Do not
  do it.
- **Voice-calibrate before drafting. This is the single biggest reducer of
  revision rounds.** The brand docs *describe* Aamir's voice; his actual writing
  *is* it. Calibrate from his published, path-stable writing first:
  - His live posts in `src/content/blog/`, especially the two exemplars
    (`bi-to-ai-journey.md`, `data-ai-maturity-ladder.md`).
  - The durable voice rules in `docs/BRAND.md` ("Long-form and first-person
    voice") and its "Reframes in practice" table — treat this as the source of
    truth. It travels with the repo and loads when you are working inside the
    portfolio project.
  - **Do not sweep the chat transcripts by default.** BRAND.md plus the two
    exemplars above are enough to calibrate the voice. A full mine of raw session
    transcripts is slow, burns a lot of context, and mostly re-derives what
    BRAND.md already states. Reach for raw chat only as a narrow last resort, when
    a specific voice question is genuinely unanswered by the docs and the
    exemplars, and even then read a targeted slice. His *raw chat* voice is also
    looser than his *published* voice, so treat it as signal about instincts,
    never as a model for blog prose.

  Hold these in front of you while drafting. The first draft should already obey
  the rules, not discover them through Aamir's edits.

**CHECKPOINT 1 — the plan.** Present, briefly: the research findings and the
honest whitespace (if research was run); then the angle and one-line thesis, the
archetype, the running motif, which source material anchors it, the external
source to credit, and the list of tells to scrub. **Surface the highest-leverage
forks as explicit choices here, before any drafting:** the angle/POV, the motif,
the framing (e.g. constructive build-on vs contrarian), and how proof is handled.
Deciding these up front, not mid-draft, is what keeps the draft from being
rebuilt. Wait for approval or redirection before writing anything.

### Stage 1 — Fact ledger
List every number, tool, architecture detail, and real moment the post will lean
on, pulled from the case study or the old post. Mark each as usable or not:
- No invented numbers, ever. If the source lacks a number, the post does without.
- Metrics stay relative or magnitude-based ("from a fraction to nearly all",
  "hours to seconds", "millions"), never exact employer figures.
- Flag any fact that is itself a tell (it goes through the reframe table below).

**CHECKPOINT 2 — ledger + spine.** Show the fact ledger, the locked either-or
thesis, and the running motif. Wait for approval.

### Stage 2 — Draft
Write the post body per the voice and structure layer below, plus the LinkedIn
companion per BLOG.md section 13. Output both as working drafts.

Before showing anything, run the draft once yourself against the "Anti-patterns
that cause rewrite loops" list below and the BRAND.md "Long-form and first-person
voice" rules, and fix what you find. The draft Aamir first sees should already be
voice-clean, so his attention goes to substance, not to catching the same tics
every round.

**CHECKPOINT 3 — the draft.** Show the full post and the companion. Wait for
Aamir's reactions and edits. Iterate here until he is happy with the shape.

### Stage 3 — Multi-persona review
Run the review panel below (spawn the personas as subagents, each returns a score
and specific fixes). Apply the fixes. Re-run if any persona scored low.

**CHECKPOINT 4 — review results.** Show the scores, what each persona caught, and
the revised draft. Wait for approval.

### Stage 4 — Discretion scrub
Hard pass against the discretion layer. Read every line asking: "If someone saw
only this, could they tell it was an OTT/streaming platform or the employer?" Fix
anything that fingerprints. This is a required pass even if Stage 3 looked clean.

### Stage 5 — Land it
- Write the post to `src/content/blog/<slug>.md` with `draft: true` and a
  **placeholder `date: 2099-01-01`**. The content schema requires a `date`, so
  `npx astro sync` fails outright without one, but the real publish slot is not
  chosen yet. A far-future placeholder keeps the post hidden by *both* `draft:
  true` and the future-date gate in `getPublishedPosts()`, so it cannot publish
  by accident if the draft flag is ever flipped before its date is set. (Do not
  use today's or a past date as the placeholder: that would auto-publish the
  moment `draft` flips.)
- Write the companion to `social/linkedin/<slug>.md` (header convention: title,
  Post URL, Publish date, Archetype, then `---`, then the plain-text copy).
- Run `npx astro sync` to confirm the schema validates.
- Update the post's row in `docs/BLOG-BACKLOG.md` to Done.
- **Do not deploy. Do not flip `draft: false`. Do not set a real publish date.**
  Tell Aamir it is staged, and that to publish he flips `draft: false`, replaces
  the placeholder with the next bi-weekly Wednesday `date`, commits, and deploys.

### Re-voice mode (a surgical pass, not a full factory run)

Sometimes the task is not drafting a new post but fixing the voice of one that
already exists: an AI-ish draft, or an older post Aamir wants to read like him.
Do not run the full five-stage factory for this. Use a lighter pass.

1. **Set the register dial first, with Aamir.** His *raw chat* voice is looser
   than his *published* voice; the target is the plain-but-sharp register in
   between (cut the copywriter flourishes, keep the crafted payoffs). Lock that
   calibration on one real line before touching the rest, so the whole pass aims
   at one register.
2. **Go section by section.** For each, show only the lines that do not read like
   him, as before -> after with a one-line "why this wasn't him". Apply on
   approval, then move on.
3. **Do not manufacture changes.** Leave the lines that already read like him, and
   say so. Inventing edits to look busy is its own failure; a clean section is a
   valid result.
4. **Keep the payoffs, scrub the words.** The one bolded payoff per section stays a
   punchline; only fix a borrowed or clichéd *word* inside it. Apply the BRAND.md
   "Reframes in practice" moves and the BLOG.md heading-set rules.
5. **Calibrate from BRAND.md and the two exemplars, not a transcript sweep** (see
   Stage 0).

Checkpoint the same way: one section at a time, wait for Aamir. This is the mode
the maturity-ladder re-voice used.

---

## 1. Discretion (the override layer)

Aamir works at an OTT streaming platform (MBC Shahid) and must never be
identifiable as freelancing, nor the work traceable to that employer. Blog posts
go out under his own name, so the bar is the same strict one the
`case-study-copywriter` skill uses. The vendor *combination* and the OTT
vocabulary *cluster* are the fingerprint, not any single generic word.

### Blocklist — never appears in body, frontmatter, diagram, alt text, or companion

- **Identifying vendor names:** Youbora, Evergent, Mediagenix (OTT analytics,
  subscription billing, broadcast scheduling). Also keep media-tied delivery
  vendors out of prose: CleverTap, Braze, Conviva, Google Ad Manager. Replace
  with a generic category referent or omit.
- **OTT / streaming vocabulary:** viewing sessions, watch behavior, viewer,
  episode / season / show hierarchy, household (shared streaming profiles),
  AVOD, SVOD, VAST, tentpole, content titles in a streaming sense.
- **Regional fingerprint:** MENA, Arabic, Dubai, UAE, Shahid, MBC, and named
  seasonal cycles (Ramadan, Eid, World Cup). Under Aamir's own name these point
  straight at the employer. There is no "cultural anchor" exception for blogs.
- **The old "One MENA-flavored note":** deleted in every rewrite. Replace with a
  "One note from experience" reflection that carries no regional tell.
- **Sensitive topic framing:** any inferred attribute on people reframes to a
  generic inferred attribute on customers; the lesson (guardrails for inferred
  data) carries without the OTT specifics.

### Reframings (shared with case-study-copywriter)

| Streaming tell | Generic reframe |
|---|---|
| streaming / OTT platform | a large subscription-based consumer business |
| viewing sessions, watch behavior | engagement events, usage behavior |
| viewer, subscriber profile | customer, customer profile |
| episode / season / show | catalog, product/content catalog |
| household (shared profiles) | account grain vs individual-user grain |
| Ramadan / Eid / a named cycle | a predictable recurring window where demand shifts |
| an inferred attribute on viewers | an inferred attribute on customers |
| Youbora / Evergent / Mediagenix | a behavioral-analytics / subscription-billing / content-metadata system |

"Subscriber" and "subscription" alone are fine (telecom, SaaS, news, retail use
them). The tell is the cluster, not the single word.

### Discretion rules that always apply

- The company is never the subject of a sentence. The system or Aamir is.
- No exact employer figures. Relative or magnitude only; if softening makes the
  work sound smaller, drop the number.
- No internal codenames or column fingerprints (`dwh_*`); use conventional
  equivalents (`customer_id`, `content_id`).
- Kimball-pattern table names (`dim_*`, `fact_*`) and public-domain field names
  are fine; abstract anything streaming-specific (`fact_ad_impressions`).

---

## 2. Voice and structure

Full spec in BRAND.md "Long-form and first-person voice" and BLOG.md sections 4,
5, 12. The essentials so this skill stands alone:

### Voice (what makes it read like Aamir)

- **First person, reflective.** "I built", "I would start", "what I understand
  now". Lead with lived experience or a sharp claim, not a thesis statement.
- **Plain language first, the precise term second.** Name the human version
  before the jargon. If a finance director would not say the word, it is not the
  opening word.
- **One running motif, paid off at the end.** A single thread (the pilot's "the
  boring part") that opens, recurs once or twice, and lands in the closing line.
  No mixed metaphors, no clichéd load-bearing image.
- **Conviction without the clipped landing-page cadence.** State the thesis once,
  flatly, then let the prose breathe. Warm and conversational between the hard
  claims.
- **Cut any flourish Aamir would not say out loud.** Test every line against
  "would I say this in a meeting?" Known non-Aamir words to avoid: plumbing,
  cash a cheque, heuristic, does not photograph well, live-tweets, job board.

### Anti-patterns that cause rewrite loops (kill these in the FIRST draft)

Hard-won from real review rounds. Each of these triggered multiple back-and-forth
edits on past posts; avoiding them up front is where the time is saved.

- **Vague / borrowed authority.** Never "analysts say", "people are saying",
  "there is a popular explanation going around". Ground every claim in what Aamir
  did or saw. First-person observation, not a crowd.
- **Literary self-narration.** No "it gave me language for", "something I had
  half-understood for years". State what he learned as a plain fact.
- **Staged strawman.** Don't set up "people think X" before the real point. Go
  straight to the claim.
- **Soft hedges / essay-speak.** No "I also think", "reframed how I think about".
- **Time-tenure overclaim.** Aamir is roughly 1.5 years into AI and 10+ years in
  data. Never imply long AI experience ("for a long time I assumed..." about AI).
  The long experience is in data; AI recently made the lesson sharp.
- **Echoing a prior post.** Do not reuse signature phrases from an existing post
  (e.g. bi-to-ai's "the boring part", "everything I shipped that mattered", the
  wistful "what I understand now"). Each post needs fresh phrasing and its own motif.
- **Flat or duplicate bold.** The one bold per section must be the most quotable
  line, not a restatement of the sentence before it. If the section says the idea
  twice, promote the vivid version to the bold and cut the other.
- **Generic-label headings.** Headings are arguments or questions ("So which rung
  are you on?"), never "Closing", "Conclusion", or "One note before the close".
- **Mixed metaphor.** One motif, one coherent physical image. If the motif is a
  wall, no floor-words ("standing on", "built on", "foundation" as the noun).
- **Over-claimed or repeated proof.** Name his public project (Document Copilot)
  once, lightly; abstract employer work; don't open multiple sections with "I built".

**Heuristic for stuck lines:** if a sentence resists two or three good-faith
rewrites, it usually has an existence problem, not a wording problem. Cut it; the
surrounding sentences often already carry the point. (This and the rules above are
codified in `docs/BRAND.md` "Long-form and first-person voice", the source of truth
this section traces back to.)

### Structure (the spine, not a rigid checklist)

Default framework-post spine, first person throughout:
1. Opening hook (lived moment or claim); introduce the motif. No heading.
2. The either-or thesis, stated once, after the opening earns it.
3. `## Why this matters now` — stakes, not citations. One bolded payoff line.
4. Optional diagram (recommended for framework posts, not mandatory).
5. `## The Named Framework` — 3 to 6 sections with **argument subheads, not
   labels** ("Floor 1: the tables everyone trusts", not "Layer 1: Data
   Foundations"). Each section is flowing prose with **exactly one bolded payoff
   line**. No three-bold label stack (that is the demoted optional format).
6. Optional auxiliary H2.
7. `## Where I would start` — first person, sequenced. One bolded payoff line.
8. `## One note from experience` — short personal reflection landing the motif.
9. `## Closing` — a leading question (often the binary from the thesis), then a
   short answer; land the motif in the final line.

War-story and opinion archetypes use a lighter scaffold (no required framework or
diagram) but the same first person, thesis, motif, and discretion scrub.

### Hard rules (mechanical, non-negotiable)

- No em-dashes (`—` or `--`); use colons, periods, or restructure. SQL `--` in
  fenced code is exempt.
- No emoji. No exclamation marks outside quoted speech. No hedges (might, could
  potentially, perhaps). No marketing filler (cutting-edge, robust, leveraging).
- No AI attribution anywhere (no "Generated with", no "Co-Authored-By").

### Frontmatter

```yaml
---
title: "..."                 # name the framework where possible
date: 2099-01-01             # placeholder while draft:true (schema requires a date). Replace with the bi-weekly Wednesday at publish time.
description: "..."           # 140-160 chars, leads with the change
og_title: "..."              # 28-42 chars, feed hook (tension / number / counter-claim)
categories: ["Data Engineering", "AI & Automation"]   # from src/data/categories.ts enum
draft: true                  # always true when this skill writes it
---
```

### LinkedIn companion (section 13)

Plain text, under 800 characters, no markdown bold. First line is the hook and
must land above the "see more" fold (~140-210 chars). Canonical post URL on its
own line near the end (never the first line). Two or three hashtags. Header block
above the `---`: title, Post URL, Publish date, Archetype.

---

## 3. The multi-persona review (Stage 3)

Spawn each persona as a subagent (general-purpose), give it the draft plus the
relevant source-of-truth doc, and have it return a 1-10 score and a short list of
specific, quoted fixes. Apply fixes, re-run any persona that scored below 8.

### Blog panel (5 personas)

1. **Skeptical senior data engineer.** Does it ring true? Any hand-waving,
   overclaim, or thing a practitioner would call BS on? Are the technical points
   correct and load-bearing?
2. **The business reader (the buyer).** A finance/product leader. Is it relevant
   and clear without jargon? Does the value land on a skim of the subheads and
   bold lines alone?
3. **Brand-voice guardian.** Against BRAND.md "Long-form and first-person voice":
   does it sound like Aamir, first person, one motif, one bold per section,
   argument subheads? Flag any AI-slop, cliché, or flourish he would not say.
4. **Discretion officer.** Against the discretion layer: any employer tell, OTT
   vocabulary, regional anchor, vendor leak, or exact figure? This persona can
   block release on its own.
5. **Editor.** Structure, flow, motif discipline (introduced and paid off),
   one-bold-per-section, the closing landing the opening. Cuts the saggy lines.

### LinkedIn panel (4 personas)

Hook strength above the fold; under-800 and no-bold compliance; voice (human,
not machine, matches the post); discretion. Same scoring and fix format.

---

## Quick checklist before landing

- [ ] Discretion: no blocklist term anywhere; no cluster that fingerprints an
      OTT/MENA platform; no exact employer figure; company never the subject; no
      MENA note; sensitive topics reframed.
- [ ] Voice: first person throughout; one motif introduced and paid off; one
      bolded payoff per section; argument subheads not labels; no non-Aamir
      flourishes.
- [ ] Hard rules: no em-dashes, no emoji, no exclamation marks, no hedges, no
      filler, no AI attribution.
- [ ] Structure: the spine is present; frontmatter complete and valid; `draft:
      true`; placeholder `date: 2099-01-01` (schema requires a date, real slot set
      at publish); `npx astro sync` passes.
- [ ] Companion: under 800 chars, hook above the fold, URL near the end, plain
      text, header block present.
- [ ] Review: all five blog personas at 8+; discretion officer cleared it.
- [ ] Landed as draft, backlog row updated, NOT deployed, NOT flipped to
      draft:false. Aamir told how to publish.
- [ ] Skim test: read only the title, subheads, and bold lines. Does the argument
      land, and does it sound like Aamir?