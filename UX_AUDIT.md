# UX & Content Architecture Audit
**Phase 2A — Decision Document**
**Date**: 2026-05-14
**Status**: Final. Input for Phase 2B (branding) and Phase 5 (implementation).

This is a decisions record, not a specification. It states what to do and why. All code implementation is deferred to Phase 5. All brand identity decisions (colors, fonts, logo) are deferred to Phase 2B.

---

## Contents

1. [Personas](#1-personas)
2. [Reference Audit](#2-reference-audit)
3. [Key Decisions](#3-key-decisions)
4. [Page-by-Page Walkthrough](#4-page-by-page-walkthrough)
5. [Component Redesign Briefs](#5-component-redesign-briefs)
6. [Imagery Strategy](#6-imagery-strategy)
7. [Trust Signals](#7-trust-signals)
8. [CTA Strategy](#8-cta-strategy)
9. [Mobile-First Re-evaluation](#9-mobile-first-re-evaluation)
10. [Punch List](#10-punch-list)
11. [Open Questions](#11-open-questions)
12. [Deferred to Later Phases](#12-deferred-to-later-phases)

---

## 1. Personas

### Persona A: The Recruiter (10-second scan)

**Who**: Talent acquisition, headhunter, or hiring manager at a media, tech, or consulting firm in the UAE or wider GCC. Reviewing 20+ profiles in a session.

**What they need in 10 seconds:**
- Name and role at a glance
- Seniority signal: years of experience, current employer, level
- Location (Dubai-based is relevant for GCC roles)
- A clear path to contact or CV download

**What the current site gives them:**
- "Data & AI Solutions Engineer" eyebrow in the hero. Good.
- "10+ years · Analytics, Data Engineering, Data Science & AI Automation · Dubai, UAE" line. Good, but it sits below three bullet points and is easy to miss on a fast scan.
- Current employer (Shahid / MBC Group) does not appear above the fold. It only shows in the Timeline section, which requires scrolling.
- No resume download link anywhere in the hero or nav.

**Gap**: Current employer and level are invisible above the fold. A recruiter scanning fast will not scroll to Timeline.

**Verdict**: Add "Currently: Assistant Analytics Manager, Shahid (MBC Group)" as a compact one-liner in the hero, below the headline or beside the years/location line. Add a tertiary resume download link (text-link style) alongside the primary CTA.

---

### Persona B: The Peer Engineer (deep dive)

**Who**: Fellow data engineer, analytics architect, or ML practitioner. May be a potential collaborator, referral source, or someone validating credentials before recommending Syed to a client.

**What they need:**
- Technical depth: what stack, what patterns, what scale
- Evidence of real problem-solving, not just descriptions of what was built
- The "how": architecture decisions, tradeoffs, tools chosen and why

**What the current site gives them:**
- Pipeline: 7 stage labels in a horizontal chip row. No tools, no descriptions, no scale.
- FeaturedProjects: outcome-focused descriptions with tech tags (Databricks, PySpark, SSAS, DAX). Gives tool signals.
- The blog has potential but needs a content quality pass (Phase 3).

**Gap**: The Pipeline section is the weakest element for this persona. It shows stage names but nothing about what Syed actually does within each stage, at what scale, or with which tools. Peer engineers need this, and they leave the page without it.

**Verdict**: Pipeline redesign is the single highest-leverage improvement for this persona. Each stage card should show: eyebrow label, icon, title, 1-line description, tool list. This transforms a decorative strip into a genuine capability signal.

---

### Persona C: The Consulting / Advisory Prospect

**Who**: CTO, VP of Data, or Head of Analytics at a media, retail, or enterprise company in the MENA region. Looking for someone to lead or advise on a data platform or AI initiative. Likely came via LinkedIn.

**What they need in the first scroll:**
- "Can I trust this person with a real budget?"
- Named employers and recognizable companies
- Quantified outcomes (cost saved, time reduced, scale reached)
- A low-friction path to start a conversation

**What the current site gives them:**
- MetricsStrip: 10+ years, 14 projects, 5 certs, 4 industries. Present but abstract.
- FeaturedProjects: outcome-focused descriptions with named companies (Shahid). Strong.
- CTA section: "Let's work together" with email and LinkedIn links. Good placement.
- Two equal-weight buttons in the hero ("Let's Talk" and "View Case Studies") which creates decision paralysis.
- No named employer visible above the fold. No social proof anywhere.

**Verdict**: Single primary CTA ("Let's Talk") in the hero. Add an employer logo strip below the hero. Surface named employers earlier. Testimonials (when sourced) go above the bottom CTA section.

---

## 2. Reference Audit

### Gerrit Bosua (gerritbosua.github.io)

Closest reference to Syed's positioning. Data platform consultant, MENA-adjacent, similar audience.

**What it does:**
- No profile photo. Pure text-based brand.
- Hero leads with "Source to Outcome" pipeline metaphor, immediately followed by two CTAs: "Get in Touch" (primary) and "View Capabilities" (secondary).
- Trust signals are entirely quantified metrics, not logos or testimonials: "Billions Events Processed," "300GB In-Memory Semantic Layer," "Millions Subscriber Accounts." These appear as a visual grid immediately after the hero.
- Zero client logos. Zero testimonials. Credibility comes entirely from quantified impact and project specifics.
- Section order: Nav / Hero / Metrics grid / Capabilities / Portfolio / Career history / Education / Contact.

**Adopt**: Two-CTA pattern (contact primary, view work secondary). Quantified impact metrics prominently after hero. Pipeline as a credibility section, not decoration. Named scale metrics over vanity metrics.

**Reject**: No photo. Research shows faces increase trust for consultants where the client is hiring a person, not a product. Bosua can afford to omit the photo because his credibility signals are unusually strong elsewhere. For Syed at this stage, the photo stays.

---

### Chip Huyen (huyenchip.com)

Author, ML practitioner, sought-after lecturer.

**What it does:**
- Profile photo (circle) near the top. Authority signals: two books (one Amazon No. 1), Stanford credential, named employers (NVIDIA NeMo, Netflix, Snorkel AI).
- No hard hire-me CTA above fold. Contact CTA appears near the bottom.
- Content-first. Blog drives trust over time.

**Adopt**: Named employer history as the primary trust signal. Approachable but authoritative framing.

**Reject**: No explicit consulting funnel. Works for her authority level. Not applicable for an active inbound consulting goal.

---

### Vicki Boykis (vickiboykis.com)

Staff ML engineer and prolific writer.

**What it does:**
- No photo. No hire-me CTA. Content-first site. Credibility via a decade of output and conference presence.

**Adopt**: Confidence in a minimal, text-driven design. The site does not over-explain.

**Reject**: No consulting funnel at all. Not a model for converting visitors into project inquiries.

---

### Simon Späti (ssp.sh)

Data engineer turned knowledge creator. Hybrid consultant / content site.

**What it does:**
- No hero photo. Photo appears only in bio at footer. Hero leads with tagline and role description.
- Primary CTA: newsletter signup. Secondary: articles, book project.
- Trust via publications, 20+ years stated experience, multiple platforms.

**Adopt**: Hybrid expert/content positioning builds long-term trust. Newsletter as a lower-commitment entry point than direct email is worth considering for a future phase.

**Reject**: Newsletter model requires consistent output. Not suitable as a primary CTA for project inquiries at this stage.

---

### Pattern Summary

| Pattern | Evidence | Decision |
|---|---|---|
| Contact as primary CTA | Bosua, conversion research: contact-first CTA outperforms "see work" for consultants | Adopt |
| Quantified, impact-driven metrics grid | Bosua, research | Adopt |
| Named employers + logos as trust signals | Research: logos can lift conversion 70% when placed in first scroll | Adopt |
| Face photo in hero | LinkedIn data: profiles with photo get 21x more views. UX consensus: faces trigger trust faster | Keep photo |
| Two-CTA pattern (primary filled + secondary ghost) | Bosua, conversion research | Adopt |
| Testimonials from LinkedIn recommendations | Research: screenshots/text from LinkedIn add authenticity, specific outcome quotes convert | SHOULD, future action |
| Content / blog as long-term trust layer | Huyen, Boykis, Späti | Long-term: Phase 3/4 |

---

## 3. Key Decisions

### 3.1 Primary CTA

**Decision**: "Let's Talk" is the single primary CTA in the hero. "View Case Studies" becomes a ghost secondary button.

**Rationale**: Research is consistent that contact-oriented CTAs outperform content CTAs as the primary action on a consultant portfolio. "See my work" functions as proof; the CTA converts. The dual equal-weight button pattern currently in the hero creates unnecessary choice. The bottom CTA section already has a second entry point, so no conversion path is lost.

---

### 3.2 Profile Photo

**Decision**: Keep the photo. Adjust treatment: change from portrait crop (`w-64 h-80`) to square (`w-56 h-56`) with a tighter face-and-shoulders crop. Move from "passport photo" feel to "professional headshot" feel.

**Rationale**: Research on B2B consulting sites is clear: faces increase trust and reduce the perceived risk of hiring an unknown person. The data consultants who omit photos successfully (Bosua, Boykis) have unusually strong credibility elsewhere. Removing the photo would be a net negative here. The current photo itself is fine; the aspect ratio and crop are what need adjustment.

---

### 3.3 Employer Logos

**Decision**: Add a "Worked with" employer logo strip on the home page, placed between the hero and the MetricsStrip.

**Rationale**: Research shows client/employer logo strips can increase conversion by up to 70% when positioned in the first scroll. Named, recognizable brands do the most work: MBC Group is the BBC of the Arab world; Al-Futtaim is a major regional conglomerate; JLR is globally recognized. These signals matter most to Persona C (consulting prospect) who needs to quickly validate that Syed has worked with credible organizations.

**Brands to show**: MBC Group (parent brand), Shahid (operating brand of current role), Al-Futtaim, JLR, HHRC, Adani. Confirm with user which are publicly nameable before implementation (see Open Questions).

**Visual treatment**: Grayscale logos at 60% opacity, teal tint on hover. Compact strip with a small "Worked with" label.

---

### 3.4 Testimonials

**Decision**: SHOULD-level goal. Not blocking Phase 5. Source 3-5 outcome-specific testimonials from LinkedIn. Place above the bottom CTA section when ready.

**Rationale**: Research shows B2B buyers require peer reviews before making decisions. Specific testimonials (name, title, company, one concrete outcome) lift consulting conversions measurably. LinkedIn recommendations are credible because they are publicly verifiable. The format: screenshot or text block, with name, title, company, and a specific outcome sentence. Generic praise has near-zero conversion value.

**Action for user (before Phase 5)**: Identify 3-5 past managers or project sponsors on LinkedIn. Reach out requesting a short recommendation (2-3 sentences) with this brief: "Could you mention one specific outcome: a number hit, a deadline met, or a problem resolved?"

---

## 4. Page-by-Page Walkthrough

### 4.1 Home Page

**Current section order**: Hero / Pipeline / MetricsStrip / CapabilityCard / FeaturedProjects / Timeline / Certifications / CTA

**Proposed section order**: Hero / Logo Strip (new) / MetricsStrip / Pipeline / CapabilityCard / FeaturedProjects / Timeline / Certifications / (Testimonials — future) / CTA

The Pipeline moves lower because it is dense and rewards the peer engineer who is already engaged. The Logo Strip moves higher to hit the consulting prospect within the first scroll.

| Section | What Stays | What Changes | What Cuts |
|---|---|---|---|
| Hero | Headline, photo, bullet points, location/years line | "Let's Talk" as sole primary CTA. Add current employer one-liner. Add resume download as tertiary text-link. | "View Case Studies" demoted to ghost secondary. |
| Logo Strip (new) | n/a | NEW: Compact "Worked with" row with employer logos | Nothing |
| MetricsStrip | 4-metric grid layout | Replace 2 weak metrics with impact-driven ones (see Section 5.3) | Nothing structural |
| Pipeline | Stage labels as concepts | MAJOR REDESIGN: Vertical card layout per reference image (see Section 5.1) | Horizontal chip row entirely |
| CapabilityCard | 4 capability cards, icon, description | Rename section title from "What I Do" to "Where I Work" | Nothing |
| FeaturedProjects | 4 project cards, 2-col grid | Add 1-sentence section intro. Keep 4 cards. Keep "View all" link. | Nothing structural |
| Timeline | 4 companies, vertical layout | Rename "Experience" to "Career Path" (avoids duplication with nav). Add brief role-context line. | Nothing structural |
| Certifications | 5 badge images, flex-wrap | Add subtitle: "Verified credentials, click to verify." | Nothing |
| Testimonials (future) | n/a | Placeholder slot for 1-2 testimonials, above CTA | Nothing |
| CTA | "Let's work together" block, email + LinkedIn | No structural change | Nothing |

**Mobile at 375px:**

- Hero: `pt-32` top padding (128px) is high on mobile. Propose `pt-24 md:pt-32`.
- Logo Strip: 5+ logos need 2-row grid or `overflow-x: auto` scroll at 375px.
- MetricsStrip: 2x2 grid already. Fine.
- Pipeline (new vertical): Single-column vertical by design. No issues at 375px.
- CapabilityCard: Single column below sm (640px). Fine.
- FeaturedProjects: Single column on mobile. Fine.
- Timeline: Already vertical. Fine.
- Certifications: flex-wrap 80px badges. Fine.
- CTA: Single centered block. Fine.

---

### 4.2 Projects Index (/projects)

**Purpose**: Portfolio browser for deep-dive personas. Decision support for prospects verifying breadth and depth.

| Section | What Stays | What Changes | What Cuts |
|---|---|---|---|
| Page header | H1, description | No change | Nothing |
| Category filters | Filter buttons, active state | Add "Featured" as first filter option so the 4 highest-signal projects are one click away | Nothing |
| Project grid | 3-col desktop, card layout | Add visual differentiation for `featured: true` cards: a thin teal border or a "Featured" eyebrow label | Nothing structural |
| Project cards | Category badge, title, description, metrics, tags | Consider adding a "company + period" context line per card (e.g., "Shahid, 2022-24"). Gives context without requiring a click-through. | Nothing |

**Mobile at 375px**: Single column. Category filters wrap to multiple rows. Apply `overflow-x: auto` with `flex-nowrap` for horizontal scroll at 375px, same as blog.

---

### 4.3 Project Detail (/projects/[slug])

**Purpose**: The case study. Depth reading for a peer engineer or consulting prospect evaluating the work. Most traffic will arrive via the projects index or a direct share.

| Section | What Stays | What Changes | What Cuts |
|---|---|---|---|
| Frontmatter display | Title, description, tags, metrics | Add a prominent "company + period" context line. Make metrics visually prominent (large value + small label, highlighted row). | Nothing |
| Body content | Markdown | Phase 4 content audit scope. No structural changes in Phase 5. | Nothing |
| Navigation | None currently | ADD: "Back to Projects" breadcrumb at top. "Next project / Previous project" nav at the bottom. Dead ends kill engagement. | Nothing |
| Footer CTA | None currently | ADD: "Let's Talk" CTA (compact, 2 lines) at end of each project. Peer engineers who just read a full case study are the warmest audience on the site. | Nothing |

**Mobile at 375px**: Long-form markdown. Ensure body is `text-base` (16px), line-height 1.6+. Code blocks and tables must be `overflow-x: auto` not clipping.

---

### 4.4 Blog Index (/blog)

**Purpose**: Content credibility layer. Shows Syed thinks and writes about these topics, not just executes.

| Section | What Stays | What Changes | What Cuts |
|---|---|---|---|
| Page header | H1, description | No change | Nothing |
| Category filters | Filter buttons | Same horizontal-scroll fix as /projects | Nothing |
| Post list | Single-column list, cards | Consider "featured" visual treatment for top 1-2 posts: slightly larger card or a distinct background tint | Nothing structural |
| Post cards | Category badge, reading time, title, description, date | Cards are clean and well-structured. No changes. | Nothing |

**Mobile at 375px**: Single column, reads well. Category filter wrapping is the same issue as /projects.

---

### 4.5 Blog Post (/blog/[slug])

**Purpose**: Thought leadership delivery. Gets shared on LinkedIn, indexed by search. Often the first page a new visitor sees.

| Section | What Stays | What Changes | What Cuts |
|---|---|---|---|
| Post header | Title, date, categories, reading time | ADD: "Written by Syed Aamir" with a small headshot thumbnail + link to home. When a post gets shared standalone, the author connection is broken. | Nothing |
| Body content | Markdown | Phase 3 content rewrite scope. No structural changes. | Nothing |
| Footer | None currently | ADD: Compact "About the author" block (2 sentences + role + link to home) followed by a "Let's Talk" CTA. Prevents dead ends for readers who want to engage after reading. | Nothing |

**Mobile at 375px**: Body readability is critical here. Ensure code blocks have `overflow-x: auto`. Check heading hierarchy h1/h2/h3 for visual clarity at 375px.

---

### 4.6 Experience (/experience)

**Purpose**: Deep background check for a recruiter or prospect who wants the full career narrative. This page is likely the second or third page a serious visitor opens.

| Section | What Stays | What Changes | What Cuts |
|---|---|---|---|
| Page header | H1, intro summary lines | No change. The three summary lines (Current / Scope / Industries) are well-done. | Nothing |
| Skills grid | 6 category cards | Fine as-is. | Nothing |
| Experience timeline | Company > role cards with bullets | Consider adding 24px company logo thumbnails next to company name headings. Same grayscale treatment as the home Logo Strip. Makes the timeline visually scannable. | Nothing |
| Certifications | Active badges + past list | Fine as-is. | Nothing |
| Education | BITS Pilani block | Fine as-is. | Nothing |
| CTA | "Want to work together?" block | Fine as-is. | Nothing |

**Mobile at 375px**: Role cards with bullets are appropriately dense for a detail page. `pl-12` (48px) left indent for timeline may feel heavy at 375px. Consider reducing to `pl-8 md:pl-12`.

---

### 4.7 404 Page

**Purpose**: Graceful recovery from old MkDocs URLs and mistyped paths.

The current 404 is already well-done. The description explicitly mentions the previous version of the site, which directly addresses the most likely cause of 404 hits. Three CTAs (Home / Browse Projects / Read Blog) cover all recovery paths.

**No structural changes recommended.**

---

## 5. Component Redesign Briefs

### 5.1 Pipeline: Replace Horizontal Chip Row with Vertical Cards

**Current problem**: A horizontal row of 7 gradient-colored chips connected by thin dividers, with the caption "Source to Outcome." Communicates that Syed works across a full data pipeline but nothing more. No tools. No descriptions. No scale. Looks like a progress indicator or a navigation tab row, not a capability section.

**Reference**: `docs/inspiration/pipeline-reference.png` shows the target design: a vertical stack of cards, each with a colored uppercase eyebrow label, an icon tile, a bold main title, a short description, and a tool/tech line. An active stage has a highlighted border.

**Decision**: Adopt the vertical card layout in full. Rename the section "How I Work" with a one-line intro sentence. The section title gives context that the current "Source to Outcome" caption does not.

**Content for each stage:**

| Eyebrow | Title | Description | Tools |
|---|---|---|---|
| SOURCE SYSTEMS | Data Ingestion | APIs, event streams, app stores, CRM exports, and subscription platforms | REST APIs, Kafka, App Stores, CRM |
| INGESTION & STORAGE | Pipelines & Lakehouses | Batch and streaming ingestion into governed lakehouses with full lineage | Databricks, Delta Lake, AWS S3, SSIS |
| DATA MODELING | Enterprise Data Models | Medallion architecture, star schema, and governed models at subscriber scale | PySpark, Delta Lake, Star Schema |
| SEMANTIC LAYER | SSAS / VertiPaq Engine | 300GB+ in-memory semantic layer with governed DAX measures | SSAS Tabular, DAX, Databricks |
| ANALYTICS & BI | Dashboards & Reporting | Self-serve reporting for finance, marketing, and operations teams | Power BI Premium, Tableau, DAX |
| DATA SCIENCE & ML | Models & Feature Stores | Behavioral segmentation, attribute inference, and profile feature stores | MLflow, scikit-learn, Python, Databricks |
| AI & AUTOMATION | Intelligent Systems | GenAI platforms, CRM automation, and multilingual NLP for Arabic and English | GenAI, RAG, Databricks Genie, OpenAI |

**Desktop layout sketch (max-w-2xl or similar narrow container, centered):**

```
  How I Work
  From raw data to production-grade AI.

  ┌───────────────────────────────────────────────┐
  │  SOURCE SYSTEMS              [icon]           │
  │  Data Ingestion                               │
  │  APIs, event streams, app stores,             │
  │  CRM exports, subscription platforms          │
  │  REST APIs · Kafka · App Stores · CRM         │
  └───────────────────────────────────────────────┘
               │
               │  (connector line, faint)
               │
  ┌───────────────────────────────────────────────┐  <- active stage: teal border
  │  INGESTION & STORAGE         [icon]           │
  │  Pipelines & Lakehouses                       │
  │  Batch and streaming ingestion into governed  │
  │  lakehouses with full lineage                 │
  │  Databricks · Delta Lake · AWS S3 · SSIS      │
  └───────────────────────────────────────────────┘
               │
               │
  ┌───────────────────────────────────────────────┐
  │  DATA MODELING               [icon]           │
  │  Enterprise Data Models                       │
  │  Medallion architecture, star schema,         │
  │  governed models at subscriber scale          │
  │  PySpark · Delta Lake · Star Schema           │
  └───────────────────────────────────────────────┘
               │
               │
  ┌───────────────────────────────────────────────┐
  │  SEMANTIC LAYER              [icon]           │
  │  SSAS / VertiPaq Engine                       │
  │  300GB+ in-memory semantic layer with         │
  │  governed DAX measures                        │
  │  SSAS Tabular · DAX · Databricks              │
  └───────────────────────────────────────────────┘
               │
               │
  ┌───────────────────────────────────────────────┐
  │  ANALYTICS & BI              [icon]           │
  │  Dashboards & Reporting                       │
  │  Self-serve reporting for finance,            │
  │  marketing, and operations                    │
  │  Power BI Premium · Tableau · DAX             │
  └───────────────────────────────────────────────┘
               │
               │
  ┌───────────────────────────────────────────────┐
  │  DATA SCIENCE & ML           [icon]           │
  │  Models & Feature Stores                      │
  │  Behavioral segmentation, attribute           │
  │  inference, and profile feature stores        │
  │  MLflow · scikit-learn · Python · Databricks  │
  └───────────────────────────────────────────────┘
               │
               │
  ┌───────────────────────────────────────────────┐
  │  AI & AUTOMATION             [icon]           │
  │  Intelligent Systems                          │
  │  GenAI platforms, CRM automation,             │
  │  multilingual NLP for Arabic and English      │
  │  GenAI · RAG · Databricks Genie · OpenAI      │
  └───────────────────────────────────────────────┘
```

**Mobile at 375px**: Identical layout. Vertical stack is the natural mobile format. Full-width cards, icon moves to top-left of card. Tool list wraps to two lines if needed. No structural change between desktop and mobile.

**Active stage**: Highlight one stage statically (e.g., AI & Automation as the outcome layer, or Data Modeling as the foundational layer) with a teal border. This adds visual hierarchy without requiring JavaScript. Implementation decision for Phase 5.

**Section placement**: Move Pipeline lower on the home page (after MetricsStrip) because it rewards engaged visitors. The Logo Strip and MetricsStrip should hit first for the consulting prospect; the Pipeline detail is for the peer engineer who is already scrolling.

---

### 5.2 Hero: Profile Photo Treatment

**Current**: Portrait photo `w-64 h-80` (256x320px), `object-cover`, `rounded-2xl`. Positioned to the right of text on desktop, stacked below on mobile. Gradient glow behind.

**Decision**: Keep the photo. Change treatment:
- Adjust to `w-56 h-56` (224x224px), square aspect ratio.
- Tighten the crop to face and upper shoulders.
- Add a subtle teal border: `border-2 border-teal-500/30` (complements the existing gradient glow).
- The glow, rounding, and border/shadow treatments stay.

**Result**: Moves from "passport photo" feel to "professional headshot" feel. Still human, still approachable.

**What does not change**: The `lg:grid-cols-[1.4fr_1fr]` layout, the gradient glow element, the text column, mobile stacking behavior.

**If the photo quality is poor at 224px**: A retake or professional retouch before Phase 5 is worth the time. Quality at display size needs to be reviewed before Phase 5 begins. If the JPEG looks soft or too casual, the imagery brief in Section 6.2 includes a reference direction.

---

### 5.3 MetricsStrip: Upgrade Metrics

**Current**: Four metrics: "10+ Years Experience", "14 Projects Delivered", "5 Certifications", "4 Industries."

**Problem**: "14 Projects Delivered" is underwhelming for 10 years of work (feels like a low number). "4 Industries" is abstract and means nothing to a consulting prospect.

**Decision**: Replace the two weaker metrics with impact-driven ones drawn from actual project outcomes.

| Current | Problem | Replace with |
|---|---|---|
| 10+ Years Experience | Generic but recognizable. Keep. | (keep) |
| 14 Projects Delivered | Sounds low. | "100+ Governed KPIs" or "10M+ Subscriber Profiles" |
| 5 Certifications | Fine. Three Databricks certs in 2024-26 is notable. Keep. | (keep) |
| 4 Industries | Vague. | "4 Countries" or "MENA Focus" or a scale metric like "300GB Semantic Layer" |

**Preferred replacement set:**

```
10+ Years   |   10M+ Subscriber Profiles   |   3x Databricks Certified   |   100+ Governed KPIs
```

This reads as a credibility row with a mix of time, scale, verification, and outcome. Each number is real and verifiable from project case studies.

---

### 5.4 FeaturedProjects: Evaluate

**Current**: 4 project cards in a 2x2 grid. Each has: metric badge (teal monospace chip), title, description, tech tags.

**Verdict**: This is one of the strongest sections on the home page. Outcome-focused descriptions, named companies, and real metrics are exactly right.

**Two small changes:**

1. **Add a section intro sentence.** Current: just the heading "Featured Work." Proposed: "Featured Work" followed by one line: "Selected projects from 10 years of delivery across data platforms, analytics, and AI automation." This helps scanning visitors understand scope before reading individual cards.

2. **Keep 4 projects.** The 4 projects already cover all 4 capability categories (Data Engineering, BI, Data Science, AI Automation). This is the right editorial selection. A 2x2 grid is cleaner than 3 + 1 staggered.

No structural changes to card layout.

---

### 5.5 Timeline (Home Teaser): Rename and Lighten

**Current**: Section heading "Experience" with 4 company entries showing company name, role, period, location, and a "Full timeline" link.

**Changes:**

1. **Rename heading from "Experience" to "Career Path".** The nav already has an "Experience" link to the full page. Identical labels create redundancy on the page.

2. **Add a role-context line per company.** Instead of only the role title, add a brief context phrase: "AI automation and platform leadership at Shahid." This helps both recruiters (quick scan of career arc) and prospects (understanding progression).

3. **Consider inline logo thumbnails.** If logos are sourced for the Logo Strip, reuse 24px versions here next to company names. The visual scan becomes much faster.

**Mobile at 375px**: Already vertical. No changes needed.

---

### 5.6 Certifications (Home): Minor Addition

**Current**: 5 badge images (80x80px) in a centered flex-wrap row. All link to verified credential URLs.

**Decision**: No structural changes. This section is compact and functional.

**One addition**: A small subtitle beneath the section heading: "Verified credentials, click any badge to verify." This explicitly tells a consulting prospect that these are publicly verifiable, not decorative.

---

## 6. Imagery Strategy

### 6.1 What We Need

| Image | Purpose | Status | Priority |
|---|---|---|---|
| 1200x630 OG social card | Replaces the portrait JPEG currently used as og:image. Appears in LinkedIn / Slack / WhatsApp link previews. Portrait crops awkwardly. | Missing | MUST |
| Employer logos (MBC Group, Shahid, Al-Futtaim, JLR, HHRC, Adani) | Logo Strip on home, inline in Experience timeline | Missing | MUST (if Logo Strip is built) |
| Profile photo upgrade | Current JPEG quality is unreviewed. If soft or too casual at 224px, needs a retake or retouch. | Evaluate in Phase 5 | SHOULD |
| Hero illustration | Abstract data/pipeline visual for right column of hero. Only relevant if photo is removed. Since photo stays, skip. | Out of scope | SKIP |
| Section accent gradients | Background visual interest for section breaks. | Handled by CSS tokens | SKIP |

### 6.2 Gemini Image Generation Prompts

Run these in Phase 5 once `.env` contains a Gemini API key. The image generation capability uses Gemini 2.5 Flash Image via curl as documented in memory (reference_image_generation.md).

---

**Prompt 1: OG Social Card (1200x630)**

```
A professional social media preview card for a data and AI engineer portfolio.

Background: dark navy, hex #060b18, solid fill, no gradients in background.

Left half (approx 560px wide): Large bold white sans-serif text "Syed Aamir" at approximately 72pt weight. Directly below: "Data & AI Solutions Engineer" in teal color hex #0f9b8e, approximately 36pt. Below that: "Dubai, UAE" in light gray hex #94a3b8, approximately 22pt.

Right half (approx 560px wide): An abstract, minimal data flow visualization. Seven glowing circular nodes arranged vertically, connected by smooth bezier-curve lines flowing downward. Node colors transition from orange-amber at top to teal-emerald at bottom. The lines between nodes should glow faintly. No labels or text on nodes. Dark background behind the nodes.

Bottom edge: a thin horizontal teal accent line, 2px, full width, hex #0f9b8e.

Overall style: clean, dark-themed, professional. No faces. No logos. No photographs.
Exact dimensions: 1200x630 pixels. No extra padding or margin around the image.
```

---

**Prompt 2: Profile Photo Reference Direction (only if retake is needed)**

This is a reference direction for a new professional headshot, not a generate-a-person prompt. Use as a brief when arranging or retouching a real photo.

```
A professional corporate headshot photograph. Male subject, early thirties,
South Asian, confident and approachable expression, direct gaze toward camera.
Clean neutral dark background, well-lit face with soft key light from front-left.
Smart casual attire: dark solid collared shirt or subtle print.
Square crop, tightly framed from upper chest to top of head.
No background clutter. Studio-quality lighting. No artificial filters.
600x600 pixels.
```

---

**Prompt 3: Hero Illustration (NICE-TO-HAVE, only if profile photo is removed in future)**

Not needed for Phase 5. Written here for reference if the design direction changes.

```
Abstract vector-style data pipeline illustration for placement in a website hero section,
dark-themed.

A flowing network of interconnected circular nodes and bezier-curve lines. Data flows
from left (source nodes, amber/orange glow) through middle processing nodes (purple,
blue) to right outcome nodes (bright teal, emerald).

Dark navy background hex #060b18. Node sizes vary: source nodes small, outcome nodes
slightly larger. Line thickness 2px, lines glow faintly. 7 to 10 nodes total.
No text. No labels. Minimal, elegant, not cluttered.

Suitable for placement in a 580x460 area. The visual should feel like it belongs in
a high-quality dark-themed SaaS or consultancy website.
```

---

## 7. Trust Signals

### 7.1 Employer Logo Strip (Home)

**Decision**: Add a "Worked with" section immediately below the hero, above MetricsStrip.

**Section layout sketch:**

```
  ┌────────────────────────────────────────────────┐
  │  Worked with                                   │
  │                                                │
  │  [MBC Group]  [Shahid]  [Al-Futtaim]  [JLR]   │
  │               [HHRC]   [Adani]                 │
  │                                                │
  │  All logos: grayscale, 60% opacity             │
  │  Hover: teal tint, 100% opacity                │
  └────────────────────────────────────────────────┘
```

**Implementation notes for Phase 5:**
- Source logos as SVG or high-res PNG from official brand press kits or company pages.
- Do not screenshot logos from other sites.
- Confirm with user which companies can be publicly named (see Open Questions).
- At 375px: reduce logo height to ~36px. Use flex-wrap with justify-center so they form 2 clean rows.

### 7.2 Testimonials (Future)

**Decision**: SHOULD. Not blocking Phase 5. When sourced, place 1-2 testimonials above the bottom CTA section.

**Card format:**

```
  ┌──────────────────────────────────────────────────────┐
  │  "Syed reduced our pipeline rebuild timeline from    │
  │   six months to eight weeks. The data model he built │
  │   is still the single source of truth we use today." │
  │                                                      │
  │   Name, Title, Company                               │
  └──────────────────────────────────────────────────────┘
```

Quality bar: each testimonial must include name, title, company, and at least one specific outcome (a number, a system name, or a time saved). Generic praise ("great to work with") has near-zero conversion value and should not be published.

---

## 8. CTA Strategy

**Decision**: "Let's Talk" is the single primary CTA across the entire site. It links to `mailto:saamir259@gmail.com?subject=Let%27s%20talk`.

| Location | Primary CTA | Secondary CTA | Tertiary |
|---|---|---|---|
| Hero | "Let's Talk" (filled teal button) | "View Case Studies" (ghost button) | "Download CV" (text link) |
| Bottom home CTA section | "Let's Talk" (filled teal button) | "Connect on LinkedIn" (ghost button) | Nothing |
| /experience page CTA | "Let's Talk" | "LinkedIn" | Nothing |
| Blog post footer (new) | "Let's Talk" | Nothing | Nothing |
| Project detail footer (new) | "Let's Talk" | Nothing | Nothing |

**Resume download**: Add as a tertiary text-link in the hero ("or download my CV") and optionally in the nav dropdown or footer. Serves Persona A (recruiter) without competing with the primary CTA visually.

**Future consideration**: In Phase 6, replace the email `mailto:` link with a Calendly booking link when the consulting site launches and inbound volume justifies a scheduling layer. Keep email for now.

---

## 9. Mobile-First Re-evaluation Summary

Walk every section at 375px first.

| Section | 375px Status | Action |
|---|---|---|
| Hero | `pt-32` (128px) top padding is heavy. Text and photo stack correctly. CTAs wrap naturally. | Reduce to `pt-24 md:pt-32`. |
| Logo Strip (new) | 5-6 logos need 2-row grid or horizontal scroll. Single-row will overflow. | Use `flex-wrap justify-center` with 36px logo height at mobile. |
| MetricsStrip | `grid-cols-2` already. 2x2 at mobile. Fine. | No change. |
| Pipeline (new vertical) | Vertical stack by design. Ideal at 375px. | No issues expected. |
| CapabilityCard | Single column at mobile (below sm). 4 stacked cards. Fine. | No change. |
| FeaturedProjects | Single column at mobile. Fine. | No change. |
| Timeline | Vertical already. Fine. | No change. |
| Certifications | flex-wrap badges at 80px. Fine at 375px (fits 4 per row). | No change. |
| CTA | Single centered block. Fine. | No change. |
| Category filters (/blog, /projects) | Multi-row wrapping at 375px. Visually messy. | `overflow-x: auto` + `flex-nowrap` for horizontal scroll at mobile. |
| /experience timeline | `pl-12` (48px) indent is heavy at 375px but readable. | Consider `pl-8 md:pl-12` for mobile. |
| Blog post body | Long-form. Code blocks and tables must be scrollable. | Ensure `overflow-x: auto` on `pre`, `table`. |
| Project detail body | Same as blog post. | Same. |

---

## 10. Punch List

### MUST (below professional bar without these)

1. **Pipeline redesign.** Replace horizontal chip row with vertical cards per Section 5.1. This is the single biggest gap between the current site and "senior consultant" positioning. Every persona leaves the current section empty-handed.

2. **Single primary CTA in hero.** "Let's Talk" primary (filled teal). "View Case Studies" demoted to ghost secondary.

3. **OG card image.** Replace portrait JPEG as `og:image` with the generated 1200x630 card. Run Prompt 1 from Section 6.2 in Phase 5.

4. **Current employer in hero.** Add "Currently: Assistant Analytics Manager, Shahid (MBC Group)" as a one-liner in the hero. Persona A (recruiter) needs this without scrolling.

5. **MetricsStrip upgrade.** Replace "14 Projects Delivered" and "4 Industries" with "10M+ Subscriber Profiles" and "100+ Governed KPIs" (or the equivalent impact metrics per Section 5.3).

6. **Resume download link.** Add a tertiary text-link in the hero. Required for Persona A.

### SHOULD (materially improves trust and conversion)

7. **Employer logo strip.** "Worked with" compact section below hero. Source SVG/PNG logos. Confirm nameable companies with user before publishing.

8. **Hero photo treatment.** Change from portrait `w-64 h-80` to square `w-56 h-56`. Tighter face-and-shoulders crop. Add `border-2 border-teal-500/30`. Review JPEG quality before implementing.

9. **Category filter horizontal scroll.** Apply `overflow-x: auto` to filter rows on /blog and /projects at mobile, preventing multi-row wrapping.

10. **Timeline rename.** Change home page "Experience" heading to "Career Path."

11. **Blog post footer CTA.** Add compact "About the author" + "Let's Talk" block at the bottom of every blog post.

12. **Project detail navigation.** Add "Back to Projects" breadcrumb at top and "Next / Previous project" nav at bottom.

13. **Testimonials.** Source 3-5 LinkedIn recommendations with specific outcomes. Embed above bottom CTA section. (Gated on user outreach effort, not Phase 5 build.)

### NICE-TO-HAVE (polish, not blocking)

14. **FeaturedProjects intro sentence.** Add one-line context below section heading.

15. **Certifications subtitle.** "Verified credentials, click any badge to verify."

16. **Company logos in /experience timeline.** Small 24px thumbnails next to company name headings, same grayscale treatment as home logo strip.

17. **"Featured" filter on /projects.** Surface the 4 featured project case studies with a dedicated filter button.

18. **Nav order.** Consider Projects / Experience / Blog order (current: Projects / Blog / Experience). Experience before Blog is a more natural consulting funnel.

19. **Pipeline active-stage highlight.** One stage (AI & Automation as the outcome layer) highlighted with teal border, statically. Adds hierarchy without JavaScript.

20. **CapabilityCard title.** "Where I Work" is stronger framing than "What I Do."

---

## 11. Open Questions

1. **Employer logo rights.** Is it acceptable to show MBC Group/Shahid, Al-Futtaim, Adani, JLR, and HHRC logos publicly on a personal portfolio? These are former employers, not contracted clients, which generally permits this. Confirm company by company before publishing. If any are off-limits, use the company name as text instead.

2. **Resume PDF.** Is the current PDF at `/assets/` up to date and ready to link? The project notes mention it exists but it is not linked anywhere in the current site. Review before adding the hero download link.

3. **Consulting vs. job search framing.** Is the portfolio primarily aimed at consulting/advisory prospects, or also at job opportunities? This changes the weight of "Let's Talk" (consulting) vs "Download CV" (job search). Current site reads as consulting-first. If both audiences are equally important, both CTAs need more visual parity.

4. **Profile photo quality.** The current `syedaamir.jpeg` needs review at 224x224px display size before Phase 5 commits to it. If it looks soft, low-res, or too casual, a retake is worthwhile before implementation. A poor photo at the adjusted size is worse than the current larger portrait.

5. **Tableau profile.** Listed in `SOCIAL` config but not linked anywhere in nav or footer. Is the Tableau Public portfolio worth linking from the site? If the vizzes are polished and represent strong BI work, a link from the /projects page or /experience page adds credibility for BI-focused visitors.

---

## 12. Deferred to Later Phases

| Item | Phase |
|---|---|
| Brand identity: colors, fonts, logo, wordmark | Phase 2B |
| Content rewrites for individual blog posts | Phase 3 |
| Content quality audit: existing 15 blog posts | Phase 3 |
| Content rewrites for individual project case studies | Phase 4 |
| Architecture diagrams review | Phase 4 |
| All code implementation from this punch list | Phase 5 |
| Run OG card and illustration prompts via Gemini API | Phase 5 |
| Lighthouse audit (target: >90 all categories) | Phase 5 |
| Playwright responsive re-check after implementation | Phase 5 |
| GitHub Actions Node 24 upgrade | Phase 5 |
| Calendly integration | Phase 6 |
| AI business site (separate repo) | Phase 6 |
