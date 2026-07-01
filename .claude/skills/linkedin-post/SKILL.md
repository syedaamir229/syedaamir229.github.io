---
name: linkedin-post
description: >-
  Write the LinkedIn companion post (caption + first comment) for a blog post
  on Aamir's portfolio site. Use this skill whenever the task is to write,
  rewrite, or virality-pass a LinkedIn companion — even when phrased as "write
  the LinkedIn caption", "do the LinkedIn post for X", "write the companion for
  this post", "virality pass the LinkedIn copy", or "improve the hook". Runs
  after blog-writeup lands the blog post. Produces social/linkedin/<slug>.md and
  hands off to linkedin-portrait for the feed image.
---

# LinkedIn Companion Writer

This skill writes the LinkedIn caption and first comment for a blog post. A
companion that re-lists the framework the image already shows is a failure. One
that earns a save and makes someone reply with their rung number is the goal.

Source of truth: `docs/LINKEDIN.md`. This skill encodes the mechanics so
you can run it cold, but when anything here conflicts with LINKEDIN.md,
LINKEDIN.md wins.

---

## What to read first

Before writing anything:
1. `src/content/blog/<slug>.md` — the full post. Find: the bolded thesis, the
   most quotable line that is NOT already the image headline, and the closing
   question.
2. `social/linkedin/<slug>-feed-portrait.png` — Read the image (use the Read
   tool; Claude renders it inline). What does the diagram already show? The
   caption must not repeat it.
3. `docs/LINKEDIN.md` — the full companion spec.

If the feed portrait does not exist yet, note what diagram or framework the post
describes and work from that.

---

## Step 1 — Choose the format

| Format | When to use | Link placement |
|---|---|---|
| **Single feed image (default)** | Post has a diagram or framework | First comment |
| **Carousel (exception)** | Genuinely sequential ideas that benefit from a swipe | First comment |
| **Link-only (rare)** | Deliberate reach trade-off; no visual adds value | Caption body |

A bare link post is reach-taxed by the feed algorithm. Default to a native
visual unless there is a specific reason not to.

Note the chosen format in the header block above the `---`.

---

## Step 2 — Write the caption

### The above-fold zone

LinkedIn shows roughly 140-210 characters before "see more". Everything in that
window must create a curiosity gap that makes scrolling feel involuntary.

Anatomy of a strong above-fold block:
1. **Ironic or deflating first line.** State the expected outcome, then cut to
   the real one. Staccato rhythm beats flowing prose here.
2. **The deflation.** One line, one fact, one punch. A time marker ("six months
   later") paired with a quiet anti-climax ("someone quietly switches it off")
   creates maximum contrast.
3. **Bridge.** One line that answers "why?" before the fold ends.

The word count is tight: aim for 2-3 short lines that are complete thoughts, not
fragments. Check the character count. If the bridge falls after the fold, the
hook is not doing its job.

One word doing emotional work ("quietly", "already", "still") is worth three
adjectives. Find it.

### The body (below the fold)

- **External source credit.** When the post builds on someone else's framework,
  credit it as an addition ("Add X and it sticks"), not as a gap ("What it
  doesn't show"). Note any @mention to make at post time in the header block.
- **Save-worthy nugget.** One counterintuitive line worth screenshotting. It
  must add information the image does not already show. If the bolded thesis is
  the image headline, pick a different line from the post body.
- **Comment-bait close.** Low-effort self-diagnostic question. Best format: a
  binary or forced-choice ("which one are you: X or Y?") where the natural reply
  is a number, a letter, or a three-word take. Open-ended "what do you think?"
  questions are easy to scroll past.

### Format rules

- Plain text only. LinkedIn strips markdown bold, so no `**word**`.
- Two to three hashtags at the end, in order of reach.
- No em-dashes. Use colons, periods, or restructure.
- No emoji.
- Caption stays link-free (for a native visual post). URL goes in the first
  comment only.
- Under roughly 800 characters total. Aim under 700 to leave buffer.

---

## Step 3 — Draft the first comment

For a native visual post, one sentence of context then the URL:

```
[One sentence introducing the post]
https://syedaamir.com/blog/<slug>/
```

No hashtags in the comment. Keep it plain.

---

## Step 4 — Self-review before showing Aamir

Check the draft against these before presenting it:

- [ ] Above-fold check: does the hook + deflation + bridge fit within ~180 chars?
      Paste the first three lines into a char counter.
- [ ] Save-worthy nugget: does it add something not shown in the image? If the
      image headline and the nugget say the same thing, find a different line.
- [ ] Comment-bait: can someone answer with a number or a three-word take? If the
      question requires a paragraph, it is the wrong question.
- [ ] No repeated content: caption never re-lists what the diagram already shows.
- [ ] Plain text: no markdown formatting, no em-dashes, no emoji.
- [ ] Link-free caption: URL only in the first comment.
- [ ] @mention note: if the post credits an external person or framework, is
      there a post-time note in the header block to mention them?
- [ ] Discretion: no employer tell, OTT vocabulary, regional anchor, or vendor
      name anywhere in the caption or comment.

---

## Virality pass (when Aamir asks)

Run each line against:

1. **Above-fold grab.** Is the first line an ironic reversal or a deflation, or
   is it a description? Descriptions scroll past; reversals stop thumbs.
2. **Rhythm.** Staccato short sentences beat long flowing ones in a feed. Three
   short punches then a longer payoff is a reliable pattern.
3. **Dwell-time signal.** Does the post give someone something to do: count,
   classify, diagnose? The 2026 feed ranking signal is dwell time, not likes.
4. **The quiet word.** One word doing emotional work is worth three adjectives.
   Find it, or add it.

---

## Review panel (spawn as subagents)

Run these on the drafted caption before landing:

1. **Hook tester.** Does the above-fold block create a curiosity gap that demands
   a scroll? Score 1-10; quote what stops them before "see more" and what does not.
2. **Voice checker.** Does this sound like a human practitioner or like a content
   tool? Flag AI-ish cadence: em-dashes, filler transitions ("I wanted to share"),
   overuse of "this", anything that reads as a template.
3. **Discretion officer.** Any employer tell, OTT vocabulary, regional anchor, or
   vendor name? This persona blocks release on its own.
4. **LinkedIn mechanic.** Caption under 800 chars? Link in first comment, not
   caption? No markdown formatting? @mention note present if credit is owed?

Score and fix format: 1-10, specific quoted fixes. Re-run any persona below 8.

---

## Land it

Write the companion to `social/linkedin/<slug>.md` using this header convention:

```
Title: [Post title]
Post URL: https://syedaamir.com/blog/<slug>/
Publish date: [YYYY-MM-DD (day of week)]
Archetype: [Framework / War-story / Opinion]
Note: [Format: e.g. "native image post (feed portrait)". Post-time reminders:
@mention targets, first-comment reminder, reply-within-30-min note.]

---

[Caption body — plain text, no markdown]

#Hashtag1 #Hashtag2 #Hashtag3

---

First comment:
[One-sentence lead-in]
[URL]
```

---

## Next in the chain

When the companion is written, hand off to the **linkedin-portrait** skill to
build the feed image:
- Pass the slug.
- The companion header block has the format note and any post-time reminders.
- If the feed portrait already exists and no redesign was requested, this step
  is optional.

## After this run

If this run required more than two correction cycles, or the output missed the mark significantly, invoke the **skill-retrospective** skill. Pass it: which skill was used, what the expected output was, what actually came out, and which correction cycles were needed. It will diagnose the gap and propose specific edits to this SKILL.md.
