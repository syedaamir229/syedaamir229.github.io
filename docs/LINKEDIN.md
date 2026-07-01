# LinkedIn

Operational spec for the LinkedIn companion that ships with every blog post. Each post has one companion draft, stored as a sidecar at `social/linkedin/<slug>.md` (outside `src/`, so it is never built or schema-validated).

Tone and hard rules live in [BRAND-voice.md](BRAND-voice.md); the blog post itself is specified in [BLOG.md](BLOG.md). This file owns the companion structure, the visual-format decision matrix, and the 2026 feed-ranking playbook. The `linkedin-post` skill (`.claude/skills/linkedin-post/`) is the authoritative workflow; this is its source of truth. The feed image is built by the `linkedin-portrait` skill.

---

## 1. The companion draft

Every post has a companion LinkedIn draft, written at publish-planning time and stored as a sidecar at `social/linkedin/<slug>.md`. The `<slug>` is the same one the post file uses, which is also the OG card filename (`public/og/blog/<slug>.png`) and the URL path (`/blog/<slug>/`), so the post, its card, and its companion all stay in sync from one identifier.

**Length and the fold.** Keep the whole post under 800 characters. LinkedIn truncates the feed preview with a "see more" link after roughly 140 to 210 characters, so the first line or two must carry the hook on their own: the part above the fold is the whole ad for the rest. Do not open with the link or a throat-clearing line. The reference companions are the bi-to-ai sidecar and the data-ai-maturity-ladder sidecar.

Each draft holds:

- A scroll-stopping first line, the hook rather than the title, written to land above the "see more" fold.
- The post's core tension and named framework, in a few short paragraphs.
- One or two concrete specifics lifted from the post.
- A plain-language takeaway.
- The canonical post URL `https://syedaamir.com/blog/<slug>/`. Where it goes depends on the post format (see the decision matrix below): by default it lives in the **first comment**, not the caption, and never in the first line.
- Two or three relevant hashtags. More than that reads as marketing.

Two choices decide whether the companion earns the click, and both are easy to get wrong:

- **Close on a reader challenge, not a description of the article.** The last line before the URL should make the reader self-diagnose, not summarise the contents. "So which rung are you really on: the one your demos can reach, or the one your data can hold?" pulls far harder than "The five rungs, and the wall each one needs:". The post's own closing question ([BLOG.md](BLOG.md) section 4, beat 8) is usually the best CTA already written. Vary the actual question per post; never reuse one phrasing.
- **If you include a proof beat, make it the strongest on-thesis receipt, not a niche tangent.** A specific one-rung project detail ("I built a document assistant that...") narrows a whole-argument post right before the ask. A decade-in-data line carries more authority and reinforces the thesis instead of detouring from it. One receipt, the biggest one, doing double duty as credibility and CTA setup. Better still, when the post credits an external source (an engineering writeup you built on), let that source carry the authority and keep the caption free of "I built X" flexes: a repeated self-highlight reads as a humblebrag and travels worse than a useful idea. If a credibility beat is still worth having, put it in a first-comment reply to your own closing question ("I would start with the cheap gate, the one I have actually shipped"), where it reads as helpful rather than as a flex.

Same hard rules as the post: no em-dashes, no emoji, no exclamation marks, no "feel free to reach out" sign-off, and the employer is never the subject (see [BLOG.md](BLOG.md) section 10 and [BRAND-voice.md](BRAND-voice.md) for the hard rules). No markdown bold or headings: LinkedIn strips them, so the draft is plain text. Vary hooks and closers across companions, and match each one to its post's archetype, so the feed does not read as a template either. A lighter, human register (contractions, a plain aside) is welcome here; it is what keeps the companion from reading as machine-generated.

## 2. Pick the visual first: the post-format decision matrix

A blog-companion post travels on a visual. A bare link post is reach-taxed hard (see "What the 2026 feed rewards" below), so almost every post ships as a native visual with the write-up link in the first comment. Choose the format before writing the caption:

- **Single feed image (the default).** A feed-optimized version of the post's diagram: retitled with the feed hook, given an attribution + link footer, and reflowed to portrait (roughly 4:5) so it fills a phone screen instead of sitting as a wide strip. Use this whenever the framework fits in one frame, which is most framework posts. The in-post diagram is landscape and dense, so do not just re-crop it: build a portrait variant, stored in `social/linkedin/<slug>-feed-portrait.png`. Never repoint `og:image` at an SVG (LinkedIn only renders raster for previews).
- **Carousel / document (the exception).** A multi-page PDF, one idea per slide. It earns the most dwell of any format, but only build one when the ideas are genuinely sequential or do not fit a single frame. A single framework diagram usually carries MORE than a carousel, because it shows the whole shape at once (the flow and the timeline in one view); a carousel spreads that across slides and loses the synthesis. Reserve carousels for step-by-step or countdown posts, not for a framework that already draws cleanly. Generator: `npm run carousel -- <slug>`, which reads a slide spec at `social/linkedin/carousel/<slug>.json` (see the `scripts/build-carousel.mjs` header). The generated output is gitignored; commit the JSON spec, not the PDF/PNGs.
- **Link-only post (rare).** Paste the blog URL as the post with no image, so the OG card renders and the click path is one tap. This maximizes click-through at the cost of reach. Use it only when you deliberately do not want an image and getting people to the article matters more than being seen.

**Link placement follows the format.** For a native visual (image or carousel), the write-up link goes in the FIRST COMMENT, not the caption, and never in the first line. For a link-only post, the link is the post. Default to first-comment unless a specific post says otherwise.

## 3. When the post carries a visual, the caption complements it and never repeats it

The image or carousel already shows *what* the framework is. The caption's job is everything the visual cannot do, so do not re-list what the reader can already see: if the diagram lays out four checks, the caption does not bullet the four checks. Structure:

- **A contrarian hook** above the ~140 to 210 character fold: a curiosity gap or a sharp claim, not a description of the article.
- **The reframe and the stakes**, in a few short lines with whitespace between them. Short lines and air raise dwell on mobile.
- **One save-worthy nugget:** the single counterintuitive line worth screenshotting ("none of the four has to be smarter than the model"). Saves and shares are what the feed rewards.
- **A comment-bait close:** a low-effort, self-diagnostic question the reader can answer with a hot take ("Which of these four do you actually have today?"). Comments are the strongest dwell signal, so the closing question matters more than the link.
- Credibility comes from the external source you credit, not from an "I built X" flex in the caption (see the proof-beat note above). Time-honesty still applies here: no line implying long AI tenure, since RAG and its neighbours are barely eighteen months old as a practice.

## 4. What the 2026 feed rewards

The ranking signal is dwell time (LinkedIn's "depth score"), not reactions. That reorders everything:

- **Native visual > text > link post.** A post with an external link gets roughly 60% less reach. A link in the first comment is now also mildly penalised (the feed detects the "post exists to funnel you to a comment link" pattern), but it stays the standard because it keeps the post itself native.
- **Carousel/document posts earn 2 to 3x the dwell of a single image, and a lone single image can underperform plain text.** So the visual has to earn its place: a carousel only when the ideas are sequential, an image only when it teaches something in one frame.
- **Behavioural, at post time:** reply to the first comments within the first 30 to 60 minutes. Early comment velocity is a large ranking input, and each reply also doubles the comment count. If a strong comment lands, ask it a follow-up; threads are dwell.

## 5. Porting and the clean-card trick (link-only posts)

For a link-only post the OG card reads from the live page, so publish on syedaamir.com first, then share. Clean-card trick: paste the URL, wait for the card to render below, then delete the raw URL text; the card stays and the copy reads clean. (For native-visual posts the OG card does not render, so this does not apply: the uploaded image is the visual and the link sits in the first comment.)

---

## Cross-references

- **Tone, words to use and avoid, hard rules**: [BRAND-voice.md](BRAND-voice.md).
- **The blog post the companion ships with** (spine, closing question, confidentiality): [BLOG.md](BLOG.md), especially section 4 (beat 8, the closing question) and section 10 (confidentiality).
- **Publishing cadence and the Wednesday distribution window**: [BLOG.md](BLOG.md) section 11.
- **The feed image**: built by the `linkedin-portrait` skill at `.claude/skills/linkedin-portrait/`.
- **Reference companions**: `social/linkedin/bi-to-ai-journey.md` and `social/linkedin/data-ai-maturity-ladder.md`.
