# Portfolio Roadmap

Phased work plan for the portfolio ecosystem. Each phase is designed for one focused Claude Code session.

## Phase 1: Deploy & Quick Polish

**Status**: Not started
**Depends on**: Nothing
**Goal**: Get the new portfolio live at syedaamir229.github.io

- [ ] Review site in browser, fix any obvious visual/formatting issues
- [ ] Rename existing GitHub repo `syedaamir229.github.io` to `mkdocs-website-archive`
- [ ] Archive the renamed repo on GitHub
- [ ] Create new `syedaamir229.github.io` repo
- [ ] `git init` in /portfolio, push to new repo
- [ ] Verify GitHub Pages deployment works
- [ ] Quick responsive check at 375px, 768px, 1024px, 1440px
- [ ] Verify RSS feed and sitemap are accessible

## Phase 2: Branding & Design System

**Status**: Not started
**Depends on**: Nothing (can run parallel to Phase 1)
**Goal**: Establish brand identity that works across portfolio and future AI business site

- [ ] Brainstorm company name for AI consulting/course venture
- [ ] Define brand positioning: personal brand vs company brand
- [ ] Finalize color palette (refine current navy/teal or evolve)
- [ ] Confirm typography choices (Outfit / DM Sans / JetBrains Mono)
- [ ] Logo concept (even if just a wordmark)
- [ ] Create shared design tokens document for cross-project consistency
- [ ] Output: brand guide markdown that future sessions reference

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

## Phase 5: Apply Brand Refinements

**Status**: Not started
**Depends on**: Phase 2 (brand decisions must be made first)
**Goal**: Apply brand identity across the portfolio

- [ ] Update design tokens in global.css based on brand guide
- [ ] Update fonts if changed in Phase 2
- [ ] Polish animations and hover effects
- [ ] Add logo/wordmark to nav if created
- [ ] Run Lighthouse audit (target: >90 on all categories)
- [ ] Final cross-browser and responsive testing

## Phase 6: AI Business Site

**Status**: Not started
**Depends on**: Phase 2 (branding) + user completing AIF Academy course
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
