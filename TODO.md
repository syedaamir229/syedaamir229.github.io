# Portfolio Roadmap

Phased work plan for the portfolio ecosystem. Each phase is designed for one focused Claude Code session.

## Phase 1: Deploy & Quick Polish

**Status**: Done (2026-05-14)
**Depends on**: Nothing
**Goal**: Get the new portfolio live at syedaamir229.github.io

- [x] Review site in browser, fix any obvious visual/formatting issues (Playwright screenshots at 4 viewports + interaction checks)
- [x] Fix Pipeline component overflowing at 768px and 1024px (bumped no-wrap breakpoint from `md:` to `xl:`)
- [x] Add branded 404 page, robots.txt, og:image and twitter:image metadata
- [x] Switch Pages source from legacy gh-pages branch to GitHub Actions
- [x] `git init` in /portfolio, force-push to existing `syedaamir229.github.io` repo (old MkDocs backed up locally on user laptop)
- [x] Verify GitHub Pages deployment works (workflow green, all routes 200, 404 page served correctly)
- [x] Verify RSS feed and sitemap are accessible

**Deferred to later phases:**
- Proper 1200x630 OG card image (current uses portrait profile photo, cropped in social previews) — Phase 5
- Archive old MkDocs source as `mkdocs-website-archive` repo if desired (user has local backup) — opportunistic
- Delete the leftover `gh-pages` branch on remote — opportunistic cleanup
- Bump GitHub Actions versions to Node 24 compatible (deprecation warning) — Phase 5
- Lighthouse audit — Phase 5

## Phase 2A: UX & Content Architecture Audit

**Status**: Done (2026-05-14)
**Depends on**: Phase 1 (site must be live to audit)
**Goal**: Holistic UX, IA, and content-flow review before any brand or implementation work. Output is a decision doc, not code.

- [x] Define 3 personas (recruiter scanning in 10s / peer engineer doing deep dive / AI-advisory prospect looking for trust signals) and what each needs from the home page
- [x] Reference audit: pull 3-5 strong personal portfolios in the data/AI consulting space, identify patterns to adopt or reject (Gerrit Bosua's site is one starting reference)
- [x] Page-by-page walkthrough: home, projects index, project detail, blog index, blog post, experience, 404. For each: purpose, section ordering, what stays/cuts/changes
- [x] Component redesign briefs:
  - Pipeline (replace simple chip-row with richer vertical layout per `docs/inspiration/pipeline-reference.png`)
  - Hero (profile-photo decision: keep/remove/change treatment)
  - MetricsStrip, FeaturedProjects, Timeline (evaluate each)
- [x] Imagery strategy: which images to generate via Gemini nano banana, with concrete prompts written into the audit doc. Includes 1200x630 OG card, optional hero illustration, optional section accents
- [x] Trust signals: decide on client/employer logos (MBC, Shahid, Adani, Al-Futtaim, JLR), testimonials, placement
- [x] CTAs: pick ONE primary CTA for home (currently split between "Let's Talk" and "View Case Studies")
- [x] Mobile-first re-evaluation: walk every section at 375px before 1440px
- [x] Output: `UX_AUDIT.md` committed to repo root with personas, reference findings, per-page decisions, component briefs, imagery brief, and MUST/SHOULD/NICE punch list

**Out of scope for this phase:**
- Brand identity decisions (colors, fonts, logo) — that's Phase 2B
- Any code changes — Phase 5 implements the punch list
- Content rewrites of individual blogs/projects — that's Phase 3/4

## Phase 2B: Branding & Design System

**Status**: Done (2026-05-15)
**Depends on**: Phase 2A (UX decisions inform brand choices)
**Goal**: Establish brand identity that works across portfolio and future AI business site

- [x] Define brand positioning: personal brand vs company brand
- [x] Finalize color palette (warm carbon + copper, away from navy/teal)
- [x] Confirm typography choices (Space Grotesk headings / DM Sans body / JetBrains Mono)
- [x] Create shared design tokens document for cross-project consistency
- [x] Output: `BRAND_GUIDE.md` that Phase 5 and the AI business site reference
- [ ] Company name for AI consulting/course venture — deferred, blocks logo/wordmark only
- [ ] Logo concept (wordmark) — blocked until company name decided

## Phase 3: Content Quality - Blogs (Audit & Plan)

**Status**: Done (2026-05-15)
**Depends on**: Phase 1 (site live for context)
**Goal**: Audit migrated blog content, refine voice spec, plan rewrites
**Outputs**: `BLOG_AUDIT.md`, `BLOG_VOICE.md`, `BLOG_STRATEGY.md`. `BLOG_GUIDELINES.md` preserved as `BLOG_GUIDELINES.legacy.md` with a redirect note.

- [x] Audit all 15 blog posts (frontmatter clean across the board; `--` em-dash substitutes flagged in 7 posts)
- [x] Score each post on thought-leadership alignment (strict rubric in `BLOG_AUDIT.md`; most posts score 3 against the rubric, not 4-5)
- [x] Identify top 5 posts to rewrite — see `BLOG_AUDIT.md` section 5
- [x] Replace `BLOG_GUIDELINES.md` with `BLOG_VOICE.md` (two depth tiers, image generation rules, LinkedIn excerpt block, author bio CTA, pre-publication checklist)
- [x] Plan the blog writing agent project — sketch in `BLOG_STRATEGY.md` section 9; actual repo kicks off Phase 4+
- [x] Cross-posting strategy — LinkedIn primary, Medium secondary, Dev.to deferred (`BLOG_STRATEGY.md` section 4)
- [x] Define three content pillars mapping to consulting service lines (`governed-data`, `applied-ai`, `bi-to-ai`)
- [x] Decide on newsletter — deferred to Phase 6 alongside the AI business site
- [x] Plan Semantic Layer Series packaging (new flagship intro + landing page; implementation in Phase 5)

## Phase 3.5: Top 5 Blog Rewrites (Execution)

**Status**: Done (2026-05-15)
**Depends on**: Phase 3 (audit + voice spec)
**Goal**: Execute the top 5 priorities from `BLOG_AUDIT.md` — one focused session per Flagship Strategic rewrite, one batched session for any short refreshes.

- [x] **Rewrite 1**: New flagship intro post "Why Most Semantic Layers Fail" (1,698 words, `governed-data` pillar, funnels into Semantic Layer Series Part 1; Gemini four-trap diagram; new optional frontmatter fields added to content schema)
- [x] **Rewrite 2**: `bi-to-ai-journey.md` rewritten as Flagship Strategic with the Compounding Stack framework (1,695 words, `bi-to-ai` pillar, Gemini stack diagram)
- [x] **Rewrite 3**: `enigma-voice-of-customer-intelligence.md` rewritten as Technical Deep Dive centred on the Voice-of-Customer Stack and the two-Genie-space decision (2,823 words, `applied-ai` pillar, Gemini architecture diagram, all 25 `--` stripped)
- [x] **Rewrite 4**: `scalable-data-model.md` rewritten as Flagship Strategic with the Five Rules of a Compounding Data Model (1,806 words, `governed-data` pillar, Gemini five-rules diagram)
- [x] **Rewrite 5**: `semantic-layer-01-why-governed-metrics.md` refreshed and repositioned as Series Part 1 with the Conflict-First Rollout (1,498 words, series + series_part frontmatter wired)

## Phase 3.6: Remaining Refreshes (Batched)

**Status**: Done (2026-05-15)
**Depends on**: Phase 3.5
**Goal**: Refresh the remaining 10 posts in shape-matched batches.

- [x] Session A — Applied AI batch: `ai-crm-automation.md` (named The Six-Layer CRM Operating System) and `gender-prediction-model-in-practice.md` (named Inference With Receipts)
- [x] Session B — BI-to-AI batch: `bi-to-data-science-bridge-patterns.md` (four named patterns reframed around the leadership-review conflict) and `bi-to-data-science-transition-story.md` (named The Three Ways BI-to-DS Transitions Die)
- [x] Session C — Governed Data batch: `avod-revenue-pipeline-and-alerting.md` (named The Four-Signal AVOD Operating Loop, 13 `--` stripped) and `bi-modernization-lessons.md` (named The Three-Phase Migration Sequence, 14 `--` stripped)
- [x] Session D — Semantic Series batch: Parts 2-6 refreshed with named frameworks (Three Ownership Layers / Three-Layer DAX Stack / Three Release Gates / Six-Stage Refresh Loop + Five-Step Backfill / Weekly Optimization Cycle), series frontmatter wired, Part 6 closes out the series arc

All sessions stripped `--` em-dash substitutes and added the author bio + CTA block per `BLOG_VOICE.md` section 5. New optional frontmatter fields (`depth`, `pillar`, `linkedin_excerpt`, `series`, `series_part`) are now wired across the full blog estate.

## Phase 4: Content Quality - Projects

**Status**: Done (2026-05-15)
**Depends on**: Phase 1
**Goal**: Polish project case studies, improve structure

- [x] Audit all project case studies for formatting (no MkDocs leftovers, frontmatter clean)
- [x] Verify existing 6 architecture diagrams render correctly; brand repaint + 4 new diagrams deferred to Phase 5
- [x] Project page hero polish: eyebrow uppercase + tracking on Project.astro
- [x] Add Outcome blockquote standard across all projects
- [x] Add "When NOT appropriate" reflection blocks to clustering, gender-prediction, profile-features, enterprise-bi-suite
- [x] Reorder projects: enigma promoted to position 3, earlier consulting moved to order 20-23 for index tiering
- [x] Delete ml-contributions.md (footnote-tier entry diluting page quality), patterns.md (duplicate of per-project Reusable Pattern sections; pattern-thinking belongs in Phase 3.5 flagship blog rewrites), and orphan content/projects/index.md
- [x] Add Related Projects footers to 5 projects missing them
- [x] Refactor FeaturedProjects.astro to query content collection (eliminated hardcoded drift from frontmatter)
- [x] Tier projects/index.astro into "Recent Work" + "Earlier Consulting" sections with category filter working across both

**Output**: All project content edits + tiered index. Plan at `~/.claude/plans/i-need-your-help-reflective-bunny.md`.

## Phase 5: Apply Refinements & Implement Audit Punch List

**Status**: In progress (5A done 2026-05-16)
**Depends on**: Phase 2A (UX punch list) + Phase 2B (brand tokens)
**Goal**: Implement the audit decisions and apply brand identity across the portfolio

Split into sub-sessions to keep each one scoped:

### Phase 5A: Brand token swap (Done 2026-05-16)

- [x] Replace `@theme` block in `src/styles/global.css` with copper/carbon palette from `BRAND_GUIDE.md`
- [x] Swap font import from Outfit to Space Grotesk; bump grain opacity 0.03 → 0.045
- [x] Update base body/heading colours, link colours, glass/gradient-text/card-hover/prose styles to new tokens
- [x] Mechanical rename across 16 component/page files: navy-* → carbon-*, teal-* → copper-*, slate-{200,300} → cream-{100,200}, slate-{400,500} → muted-500, slate-600 → muted-600
- [x] Replace `text-white` → `text-cream-100` and `border-white/N` → `border-cream-100/N` per "no white" brand rule
- [x] Verify production build passes; Playwright responsive check (4 viewports × 7 routes) reports no overflow

**Known follow-ups (out of scope for 5A):** Pipeline chip gradients still use original cyan/violet — handled by 5B redesign. Hero italic accent and gradient-text are global brand changes that look correct.

### Phase 5B: Component redesigns (UX punch list) (Done 2026-05-16)

- [x] Pipeline rebuilt as vertical card stack per UX_AUDIT 5.1: 7 stages with eyebrow + title + description + tools, copper-bordered active stage on AI & Automation, mobile=desktop layout
- [x] Hero: demote View Case Studies to ghost text link, promote Let's Talk as the only primary CTA. Add Currently: Assistant Analytics Manager, Shahid (MBC Group) one-liner
- [x] Hero photo: w-64 h-80 → w-56 h-56 square, object-top crop, border-2 border-copper-500/30 replacing the cream-100/10 border
- [x] Remove MetricsStrip from `src/pages/index.astro` (component file left in place but unwired)
- [x] Timeline section heading on home: Experience → Career Path
- [x] FeaturedProjects: add intro sentence under Featured Work heading; keep View all link
- [x] Certifications: add Verified credentials. Click any badge to verify. subtitle
- [x] CapabilityCard section title: What I Do → Where I Work
- [x] Nav reorder via `NAV_LINKS` in config.ts: Projects / Experience / Blog
- [x] Category filter rows on /blog and /projects: horizontal scroll at mobile, wrap at md+
- [x] Project detail: Back to Projects breadcrumb at top + Previous / Next project nav at bottom (driven by `order` field in `[...slug].astro`)
- [x] Blog post footer CTA satisfied at markdown level by Phase 3 author bio block at the end of every post; no layout-level repeat

**Out of scope for 5B (gated on assets or external work):**
- Employer logo strip (needs sourced logos)
- Testimonials block (gated on outreach)
- Photo retake (only worth doing if user wants higher-fidelity headshot at 224px)

### Phase 5C: Imagery via Gemini
- [ ] 1200x630 OG card (replaces current portrait profile photo as og:image default)
- [ ] Any hero illustration / section accents decided in `UX_AUDIT.md`

### Phase 5D: Architecture diagrams
- [ ] Repaint 6 existing SVGs (ad-pipeline, bi-migration, data-model, enigma, jarvis, semantic-layer) into copper/carbon brand palette (carbon-950 bg, copper-500 accents, sage-500 secondary, Space Grotesk + JetBrains Mono per `BRAND_GUIDE.md`)
- [ ] Author 4 new SVGs for profile-features, clustering, gender-prediction, enterprise-bi-suite (grep `<!-- DIAGRAM PENDING -->` in `src/content/projects/` for wired image paths and alt text)

### Phase 5E: Polish & audit
- [ ] Add logo/wordmark to nav if created (blocked on Phase 2B company name)
- [ ] Polish animations and hover effects
- [ ] Bump GitHub Actions versions in `.github/workflows/deploy.yml` to Node 24 compatible
- [ ] Run Lighthouse audit (target: >90 on all categories)
- [ ] Re-run Playwright responsive checks (script at `scripts/screenshot.mjs`, gitignored)
- [ ] Optional cleanup: delete dormant `gh-pages` branch on remote, push local MkDocs backup to `mkdocs-website-archive` repo

## Phase 6: AI Business Site

**Status**: Not started
**Depends on**: Phase 2B (branding) + user completing AIF Academy course
**Goal**: Launch consulting/course landing page on separate domain

- [ ] Choose domain name (from Phase 2 brainstorming)
- [ ] Scaffold separate Astro + Tailwind project in new repo
- [ ] Import shared design tokens from brand guide
- [ ] Build all landing page sections (Hero, Problem, Methodology, Before/After, Deliverables, Case Studies, About, Pricing, FAQ, CTA)
- [ ] Integrate Calendly for booking
- [ ] Set up Google Analytics 4
- [ ] Deploy to Vercel with custom domain
- [ ] Cross-link with portfolio
- [ ] Add course/product tier when ready (Phase 2 of business model)
