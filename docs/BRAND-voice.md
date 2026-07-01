# Brand: Voice

The tonal half of the brand identity. This document owns voice, sentence patterns, the long-form first-person register, words to use and avoid, and the hard mechanical rules. The visual half (palette, type, surface, diagrams) lives in [BRAND-visual.md](BRAND-visual.md); positioning and the index live in [BRAND.md](BRAND.md).

The **DNA** below (direct, specific, opinionated, no hedging) is constant across landing copy, blog posts, project case studies, social excerpts, and ad copy. The **register** shifts: landing and case-study surfaces are impersonal and declarative; long-form and personal writing (blog, LinkedIn, essays) is first-person and reflective. The "Long-form and first-person voice" subsection below defines that second register. Surface-specific specs add *structural* rules on top.

---

## Principles

- **Direct and declarative.** No hedging: never "might", "could potentially", "perhaps", "in some cases".
- **Specific over abstract.** Numbers, named tools, real moments. "10M+ subscriber profiles governed", not "large-scale data work". "Tuesday morning Slack thread", not "a recent conversation".
- **Opinionated.** Every public claim is a position someone could disagree with. Audit it: if the opposite is unsayable, the line is filler.
- **The reader is smart.** Do not explain what AI is. Do not introduce semantic layers from first principles in a post titled "Why most semantic layers fail."
- **Confident without arrogance.** Show, do not tell. "Saved 15 hours per week" beats "delivered significant efficiency gains".
- **Business outcome over engineering verb.** On landing surfaces, lead with what changed for the business. The engineering verb belongs in the case-study body.

## Sentence patterns that work

- **Imperative declaration**: "Stop hiring to scale. Start wiring."
- **Concrete before abstract**: lead with the result, follow with the mechanism.
- **Short headline + longer supporting line**: never bury the lead.
- **One italic accent per major heading**: a single `<em>` phrase rendered with the italic-accent style. Use sparingly. Once per hero, once per major statement section. Not on every heading.

## Long-form and first-person voice (blog posts, personal essays, LinkedIn)

Landing copy is impersonal and imperative ("Stop hiring to scale. Start wiring."). Long-form is the opposite register: Aamir, in first person, telling you what he learned from doing the work. Same DNA, different delivery. The rules below are what make a piece read like him and not like a brand or an AI. The reference implementation is the bi-to-ai blog post.

- **First person, reflective.** Write as "I". Lead with lived experience, not a thesis statement. The pilot opens "For a long time I thought the interesting work was always one desk over," not "Data teams must compound their stack." The thesis arrives after the story has earned it.
- **Plain language first, then the precise term.** Name the human version before the technical one: "the part of data nobody gets excited about: the trustworthy tables and definitions that sit under a dashboard." Never lead with jargon and define it after. If a finance director would not say the word out loud, it is not the opening word.
- **One running motif, paid off at the end.** A piece carries a single thread ("the boring part") that opens it, recurs once or twice, and lands in the closing line. One motif, not a pile. No mixed metaphors, no cliché load-bearing image (the rejected "plumbing holding up the whole building" is the anti-pattern). Keep the motif's verbs consistent, not just its noun: if the image is a wall, the load it takes is one verb throughout (it *holds*), and a synonym swap (it *holds* in four places, then *bears* in a fifth) quietly breaks the thread.
- **Conviction without the clipped cadence.** State the thesis flatly and once ("a data team is either compounding everything it builds, or quietly starting over every couple of years"), then let the prose breathe. Long-form is warm and conversational between its hard claims; it does not stack imperatives like a landing page.
- **Subheads are arguments, not labels.** "Floor 1: the tables everyone trusts," not "Layer 1: Data Foundations." A reader skimming only the subheads should get the argument. Labels are for documentation, not persuasion.
- **One bolded payoff per section.** Each section earns exactly one bold line: its single takeaway. More than one and none of them lands. The bold is the sentence you would want quoted back.
- **Cite only load-bearing sources; reserve the signature number.** Drop any borrowed stat that every post on the topic already uses (the generic "80% of teams use AI" line was cut from the pilot). If the argument stands on your own observation, let it. Reserve one concrete number as the framework's signature (the "15,000 vs 12,000" meeting) and spend it where it hits hardest.
- **Examples are lived, then abstracted.** Real moments from real work, scrubbed of employer tells per BLOG.md confidentiality. A specific scene beats a hypothetical, but the scene must never be traceable.
- **Cut the flourish you would not say out loud.** The voice rejects writerly phrases that are not yours: "plumbing," "cash a cheque," "heuristic," "does not photograph well," "live-tweets," "job board." Test every line against "would I say this in a meeting?" If it is a writer performing, cut it.
- **Ground claims in your own experience, never borrowed authority.** First-person observation, not "analysts say," "people are saying," or "there is a popular explanation going around." If an outside source is used at all, it is one load-bearing link, not a vague crowd.
- **No literary self-narration, no staged strawman, no soft hedges.** Not "it gave me language for X" or "something I had half-understood for years." Do not set up "people think X" before the point; go straight to the claim. Drop "I also think" and "reframed how I think about."
- **Time-honesty.** A decade in data, the recent stretch in AI. Never imply long AI tenure ("for a long time I assumed..." about AI). The long experience is in data; AI just made the lesson sharp.
- **Each post is its own piece.** Do not reuse a previous post's signature phrasing or motif (the pilot owns "the boring part"). A fresh image per post.
- **The one bold per section is the most quotable line, not a restatement of the sentence before it.** If a section makes its point twice, promote the vivid version to the bold and cut the other.
- **When a line resists two or three good rewrites, cut it.** It usually has an existence problem, not a wording one, and the surrounding sentences often already carry the point.
- **Watch the machine-cadence tics that survive a spell-check.** Each reads fine once and as an algorithm in bulk, so give each a once-or-twice budget, not a habit. Drawn from the `blader/humanizer` anti-AI-writing catalog, kept only where they do not fight house style:
  - *Negative parallelism.* The "not X, it is Y" flip (and "not only... but") is fine once or twice; past that it becomes a detectable spine. Convert some to plain positive assertions.
  - *Aphorism formulas.* The bolded payoff states a concrete, arguable claim ("symmetric layouts feel more predictable"), never an abstract maxim ("symmetry is the language of trust"). Keep the payoff device, cut the abstraction.
  - *Persuasive-authority tropes.* Drop "the real question is", "at its core", "what really matters"; state the claim.
  - *Staccato runs.* One clipped sentence lands emphasis. A run of three or more short fragments in a row reads engineered. This sharpens, and never overrides, the one-bold-per-section rule: a single crafted payoff is not a staccato run.
  - *Forced triples.* Use the item count the point actually has; a rule-of-three whose third item is padding is a tell.
  - *Copula avoidance.* "serves as", "stands as", "boasts", "represents" are dressed-up ways to say "is" or "has". Use the plain verb.
  - *Filler phrases.* "in order to" is "to"; "due to the fact that" is "because"; "has the ability to" is "can".

## Reframes in practice

The rules above say *what* to cut; these are the *moves* that do it, drawn from real re-voicing passes. When a line reads like a copywriter wrote it, the fix is almost always a plainer, more concrete verb and a human subject, not more words. Use these as the pattern, not a closed list.

| Reads like a copywriter | Reads like Aamir | The move |
|---|---|---|
| and it named something I keep running into | and it lined up almost exactly with what I keep running into | swap the literary verb ("named") for a plain, concrete one |
| one day it is switched off without ceremony | one day someone just switches it off | drop the flourish; put a human in the sentence |
| a stronger model to survive contact with production | a stronger model to hold up in production | cut the borrowed idiom (the military "no plan survives contact") |
| it is also the surface of a simpler problem | but underneath it is a simpler problem | replace an abstract construction with a plain, spatial one |
| a single feed the job can trust | one source that stays put, keeps its shape, and is there every run | make an abstract noun concrete by naming what it does |

Keep crafted payoff lines (the one bold per section) doing their job: scrub a borrowed or clichéd *word* inside one, but do not flatten the balanced punchline into plain prose. The dial is plain-but-sharp, not plain-and-flat.

## Words to use

Words a finance director, COO, or product VP would say out loud.

- Verbs: agree on, trust, see, act on, stop, no longer, instead of, ship, govern, surface
- Nouns: revenue, churn, campaigns, dashboards, reports, customers, segments, profiles, episodes, content, sessions
- Adverbs of place: in one place, in one click, without breaking, before anyone touches it

## Words to avoid

These words drag tone backward toward CV mode or marketing mode.

- CV verbs on landing copy: built, designed, developed, delivered, implemented, deployed, stood up, contributed to, led, drove, owned, championed. These belong in case-study bodies.
- Marketing fillers: cutting-edge, state-of-the-art, next-generation, revolutionary, game-changing, robust, scalable (as a free-floating adjective), comprehensive, leveraging, utilizing.
- AI-tell vocabulary (the post-2023 cluster): delve, landscape, tapestry, testament, underscore, showcase, seamless, garner, intricate, interplay, pivotal, vibrant, realm, nuanced, multifaceted, foster, elevate. Reads as machine-generated in clusters; prefer the plain synonym.
- Hedges: might, could potentially, perhaps, in some cases, generally.
- Closing-CTA cliches: "hope this helped", "feel free to reach out", "let's connect".

## Hard rules

- **No em-dashes** anywhere in human-written or agent-written prose: no `—`, no `--` substitute. Use colons, periods, or restructure the sentence, and rotate between the three. Do not let the colon become the default em-dash replacement: the `statement: elaboration` colon turns into a tic in bulk, and a long-form piece should not lean on it a dozen times. When one paragraph stacks two colons, or several sections open with the same `X is Y: Z` frame, convert some to periods or restructure. The fix for too many colons is a period or a rewrite, never a comma (a comma in those spots only creates a splice). (SQL `--` comments inside fenced code blocks are exempt.)
- **No emoji** in any content surface, page, component, or commit message.
- **No exclamation marks** outside quoted speech.
- **No passive voice in headlines.** Active subject doing the verb.
- **No AI attribution** in git commits, PR bodies, or content (no "Generated with", no "Co-Authored-By: Claude").

## Vertical agnosticism on landing surfaces

Landing-surface copy (home page, capability cards, section subheads, hero, CTAs) is pitched to any buyer: media, banking, retail, government, B2B SaaS. Pull vertical-specific vocabulary out:

- Subscription/SaaS-flavored: subscribers, viewers, episodes, churn, retention, MRR, ARR
- Region-flavored: Arabic, MENA, Dubai, UAE (the experience timeline already establishes the location)
- Tool-flavored: Databricks, Power BI, Tableau (named tools belong in project tags and case-study bodies)

Use universal entities: customers, transactions, operations, finance, marketing, sales, risk, intent, records, content, accounts.

**Project case studies and blog posts are the opposite**: stay concrete and specific about the delivered work. They are evidence, not pitch. But they must NOT lean into MENA / OTT / MBC Shahid: scrub all OTT/streaming vocabulary, reframe to a generic vertical, and never let MBC be inferable. Show delivery depth through abstracted specifics, not regional or employer tells. Authoritative rules: the `case-study-copywriter` and `blog-writeup` skills, vendored in this repo under `.claude/skills/`.

---

## Cross-references

- **Visual identity** (palette, type, surface, logo, diagrams): [BRAND-visual.md](BRAND-visual.md).
- **Positioning and the brand index**: [BRAND.md](BRAND.md).
- **Voice in practice for blog posts**: [BLOG.md](BLOG.md). It inherits tone from this doc; structure is its own concern.
- **Voice in practice for landing copy**: [SITE.md](SITE.md).
- **Voice in practice for project case studies**: [PROJECTS.md](PROJECTS.md).
- **Voice in practice for LinkedIn companions**: [LINKEDIN.md](LINKEDIN.md).
