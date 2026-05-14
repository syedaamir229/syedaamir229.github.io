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

**Status**: Not started
**Depends on**: Phase 2A (UX decisions inform brand choices)
**Goal**: Establish brand identity that works across portfolio and future AI business site

- [ ] Brainstorm company name for AI consulting/course venture
- [ ] Define brand positioning: personal brand vs company brand
- [ ] Finalize color palette (refine current navy/teal or evolve, informed by component redesigns from 2A)
- [ ] Confirm typography choices (Outfit / DM Sans / JetBrains Mono)
- [ ] Logo concept (even if just a wordmark)
- [ ] Create shared design tokens document for cross-project consistency
- [ ] Output: `BRAND_GUIDE.md` that Phase 5 and the AI business site reference

## Phase 3: Content Quality - Blogs

**Status**: Not started
**Depends on**: Phase 1 (site should be live for context)
**Goal**: Audit migrated blog content, plan rewrites

- [ ] Audit all 15 blog posts for formatting issues (broken images, bad links, leftover mkdocs syntax)
- [ ] Score each post on thought-leadership alignment (1-5 scale)
- [ ] Identify top 3-5 posts to rewrite in the new voice
- [ ] Review and refine BLOG_GUIDELINES.md based on actual content review
- [ ] Plan the blog writing agent project (separate repo, goals, architecture)
- [ ] Consider cross-posting strategy (LinkedIn, Medium, Dev.to)

## Phase 4: Content Quality - Projects

**Status**: Not started
**Depends on**: Phase 1
**Goal**: Polish project case studies, improve structure

- [ ] Audit all 14 project case studies for formatting issues
- [ ] Verify all architecture diagrams render correctly (SVGs in /assets/diagrams/)
- [ ] Improve project page structure: better hero sections, clearer metrics display
- [ ] Consider adding "lessons learned" or "what I'd do differently" sections
- [ ] Review project ordering and featured flags
- [ ] Ensure cross-links between related projects work

## Phase 5: Apply Refinements & Implement Audit Punch List

**Status**: Not started
**Depends on**: Phase 2A (UX punch list) + Phase 2B (brand tokens)
**Goal**: Implement the audit decisions and apply brand identity across the portfolio

- [ ] Implement component redesigns from Phase 2A punch list (Pipeline first, then any others)
- [ ] Update design tokens in global.css based on `BRAND_GUIDE.md`
- [ ] Update fonts if changed in Phase 2B
- [ ] Apply imagery: generate assets via Gemini API (key in .env), commit PNGs to `public/assets/`
  - Proper 1200x630 OG card (replaces current portrait profile photo as og:image default)
  - Any hero illustration or section accents decided in 2A
- [ ] Add logo/wordmark to nav if created
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
