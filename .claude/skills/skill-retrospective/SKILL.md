---
name: skill-retrospective
description: >-
  Diagnose why a skill run went badly and propose a concrete edit to that
  skill's SKILL.md. Use this whenever a run of another skill (blog-writeup,
  case-study-copywriter, linkedin-post, linkedin-portrait, or any other) needed
  more than two correction cycles or missed the mark, whether the user asks
  directly ("run a retrospective on that", "why did that skill keep needing
  fixes", "that came out wrong, diagnose the skill") or a skill's own "After
  this run" closing hook invokes it. It classifies the failure, decides whether
  the skill is actually at fault, and if so proposes one exact old-text to
  new-text diff with the reasoning, then asks before writing.
---

# Skill retrospective

A skill that improves other skills. When a run took too many correction cycles or the output missed the mark, this diagnoses whether the fault is in the SKILL.md (and not in the request or a one-off) and proposes a single, concrete fix.

The bar is high on purpose. Most rough runs do not warrant a skill edit. A skill that grows a new special-case line after every bad run bloats, contradicts itself, and overfits to situations that will not recur. Your default posture is skeptical: prove the skill is at fault before you touch it.

## Inputs you need

Collect these before diagnosing. Harvest what you can from the conversation already in front of you (the run and its corrections are often right there); ask only for the gaps:

1. **Which skill** was used (the SKILL.md to inspect).
2. **Expected output**: what the run was supposed to produce.
3. **Actual output**: what it produced instead.
4. **Correction cycles**: what the user had to correct, in order, and how many rounds it took.

## Process

1. **Re-read the target SKILL.md in full.** You cannot diagnose an instruction you have not just read. Note its length against the 500-line ceiling; if it is near it, an additive fix is almost certainly the wrong one.

2. **Classify the failure** into exactly one primary cause:
   - **Wrong instruction**: the skill said to do something, the run did it, and that was the problem.
   - **Missing context**: the run needed a fact, constraint, or file pointer the skill never gave.
   - **Ambiguous step**: the instruction admitted two readings and the run picked the wrong one.
   - **Absent example**: the rule was stated but not shown, so the run got the letter and missed the intent.

3. **Apply the fault test before proposing anything.** A skill edit is warranted only when the failure is a repeatable gap in the skill. It is NOT warranted, and you should say so and stop, when:
   - the request itself was underspecified or the user changed direction mid-run,
   - the correction was a matter of taste that the skill could not have predicted,
   - the run ignored an instruction the skill already states clearly and prominently. Caveat: if that instruction is buried, duplicated inconsistently, or contradicted by a louder nearby rule, the skill IS at fault. The fix is to promote or de-conflict the existing line, not to add a new one,
   - a single run is too little signal to generalize from.
   When the test fails, report "no edit recommended" and why. That is a successful retrospective, not a failed one. When you decline specifically for thin evidence, ask whether this same failure has happened before: recurrence across runs is exactly the signal that flips a decline into a warranted fix.

4. **Prefer the smallest fix that generalizes.** In order of preference: tighten or disambiguate an existing line; add a short example to an existing rule; only as a last resort, add a new instruction. Never fix a one-off with a rule that will fire on every future run. If the near-ceiling length forces a choice, the fix must replace, not append.

5. **Propose one diff.** Exactly one change, presented as:
   - the target section and heading,
   - the exact current text (old),
   - the exact replacement text (new),
   - one or two sentences on why this specific change would have prevented the failure, tied to the correction cycles you were given.
   If you genuinely cannot fix the failure without two separate changes, say so and present them as a ranked set, strongest first, but resist this: two changes usually means the diagnosis is not sharp yet.

6. **Confirm before writing.** Never edit the SKILL.md until the user approves the diff. Apply it only on their go-ahead, then confirm what changed in one line.

## Output shape

```
Skill: <name>  (<current line count> / 500)
Failure class: <wrong instruction | missing context | ambiguous step | absent example>
Fault test: <PASS, skill is at fault | FAIL, not a skill defect because ...>

Proposed edit  (section: "<heading>")
  OLD: <exact current text>
  NEW: <exact replacement text>
  Why: <how this prevents the observed failure>

Awaiting confirmation before writing.
```

When the fault test fails, drop the edit block and give the one-paragraph reason no change is warranted.

## Guardrails

- **One run is thin evidence.** Weight a fix by whether the same gap would recur, not by how annoying this run was.
- **Do not touch voice or house-style rules** (no em-dashes, no emoji, confidentiality scrub) as "fixes"; those are deliberate and live in the docs specs, not up for retrospective revision.
- **Stay inside the named skill.** If the real gap is in a shared spec the skill references (for the portfolio skills that means docs/BRAND-voice.md, docs/BLOG.md, and the like), say so and point there rather than duplicating the rule into the skill.
- **You are not the editor of record.** You propose; the user disposes. No silent writes, ever.
