# Portfolio Project

Personal portfolio for Syed Aamir, Data & AI Solutions Engineer based in Dubai, UAE.

## Tech Stack

- **Framework**: Astro v6 with TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: Markdown files in Astro content collections
- **Deployment**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Package manager**: npm

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

## Project Structure

```
src/
├── config.ts              # SITE identity (name, title, email, avatar, ogImage), SOCIAL links, NAV_LINKS
├── content.config.ts      # Content collection schemas (blog + projects)
├── content/
│   ├── blog/              # Blog posts as .md files
│   └── projects/          # Project case studies as .md files
├── data/                  # Page-scoped content (typed TS modules; not markdown)
│   ├── capabilities.ts    # Home page capability cards
│   ├── categories.ts      # PRACTICE_AREAS + BLOG_CATEGORIES + SLUG_TO_CATEGORY (single source of truth)
│   ├── certifications.ts  # About page: active + past certifications
│   ├── experience.ts      # About page: companies/roles timeline (+ CURRENT_ROLE derived)
│   ├── personSchema.ts    # JSON-LD extras (alumniOf, knowsAbout)
│   ├── pipeline.ts        # Home page pipeline stages
│   ├── series.ts          # Blog series metadata (label per series slug)
│   └── skills.ts          # About page: skill groups
├── lib/                   # Pure helper functions (no markup)
│   ├── blog.ts            # getPublishedPosts()
│   ├── personSchema.ts    # getPersonSchema() — composes SITE + SOCIAL + data/personSchema
│   ├── projects.ts        # getPublishedProjects({ featuredOnly, limit })
│   ├── readingTime.ts     # readingTime(body): number
│   └── series.ts          # getSeriesInfo() + SeriesInfo type
├── scripts/               # Client-side TS imported by Astro <script> tags
│   ├── categoryFilter.ts  # Generic filter over [data-categories]
│   ├── mobileMenu.ts      # Nav mobile menu (toggle, close on link, escape)
│   ├── projectToc.ts      # Auto-build TOC + scroll-spy for project case studies
│   └── scrollReveal.ts    # IntersectionObserver for .reveal (respects prefers-reduced-motion)
├── layouts/
│   ├── BaseLayout.astro   # HTML shell, fonts, meta, JSON-LD, Nav, Footer, scroll-reveal
│   ├── BlogPost.astro     # Blog post layout (consumes PostHeader + SeriesNav)
│   └── Project.astro      # Project case-study layout (consumes ProjectTOC)
├── pages/
│   ├── index.astro        # Landing page (Hero, Pipeline, Capabilities, FeaturedProjects)
│   ├── experience.astro   # About page (AboutHeader, ExperienceTimeline, SkillsGrid, Certifications)
│   ├── contact.astro      # Contact page
│   ├── 404.astro          # 404 page
│   ├── blog/
│   │   ├── index.astro    # Blog listing
│   │   └── [...slug].astro
│   ├── projects/
│   │   ├── index.astro    # Project listing
│   │   └── [...slug].astro
│   └── rss.xml.ts         # RSS feed
├── components/
│   ├── ui/                # Reusable primitives, no page knowledge
│   │   ├── Button.astro          # variants: primary | outline | pill
│   │   ├── Card.astro
│   │   ├── CategoryFilter.astro  # Buttons + script; targets [data-categories]
│   │   ├── Eyebrow.astro         # Mono uppercase label (size: sm | xs, tone: accent | muted)
│   │   ├── FilterChip.astro
│   │   ├── Icon.astro            # name: email | linkedin | github | tableau | arrow-* | menu | close | database | chart | brain | robot
│   │   ├── PageHeader.astro      # Page-level eyebrow + h1 + lede + optional slot
│   │   ├── SectionHeader.astro   # Section-level eyebrow + h2 + lede
│   │   └── Tag.astro             # variants: category | tag | series
│   ├── layout/                   # Chrome (used by BaseLayout)
│   │   ├── Footer.astro
│   │   └── Nav.astro
│   ├── home/
│   │   ├── Capabilities.astro    # Grid container
│   │   ├── CapabilityCard.astro  # One card
│   │   ├── FeaturedProjects.astro
│   │   ├── Hero.astro
│   │   ├── Pipeline.astro        # Pipeline container
│   │   └── PipelineStage.astro   # One stage
│   ├── about/
│   │   ├── AboutHeader.astro
│   │   ├── Certifications.astro
│   │   ├── ExperienceTimeline.astro
│   │   └── SkillsGrid.astro
│   ├── blog/
│   │   ├── PostCard.astro
│   │   ├── PostGrid.astro
│   │   ├── PostHeader.astro
│   │   └── SeriesNav.astro
│   └── projects/
│       ├── ProjectCard.astro
│       ├── ProjectGrid.astro
│       └── ProjectTOC.astro
└── styles/
    └── global.css         # Tailwind @theme tokens + base layer + .prose / .prose-project
public/
└── assets/                # Images, diagrams, logos, resume PDF, favicon
```

### Layer conventions

- `src/config.ts`: site identity, routing.
- `src/data/`: page-scoped content as typed TS (not markdown). Single source of truth for things referenced in multiple places (e.g., categories).
- `src/content/`: authored markdown collections (many similar items).
- `src/lib/`: pure helper functions with no markup or Astro deps beyond `astro:content`.
- `src/scripts/`: client-side TS imported by `<script>` blocks inside `.astro` files.
- `src/components/ui/`: reusable primitives with no page or data knowledge — props in, markup out.
- `src/components/<page>/`: section components specific to one page.
- `src/components/layout/`: cross-page chrome used by `BaseLayout`.

## Design Tokens

Defined in `src/styles/global.css` via Tailwind v4 `@theme` block.

```
Colors (CSS variables):
  navy-950, navy-900, navy-800, navy-700, navy-600   (backgrounds, surfaces)
  cyan-500, cyan-400, cyan-300, cyan-200             (accent)
  cream-100, cream-200                               (body text)
  muted-500, muted-600                               (secondary text)

Type scale extensions:
  text-xxs   (0.625rem / 10px)   — for the tiniest mono labels (e.g. Eyebrow size="xs")
  text-tiny  (0.6875rem / 11px)  — default Eyebrow size

Fonts:
  --font-heading: 'Inter', system-ui, sans-serif    (auto-applied to h1-h6 via @layer base)
  --font-mono:    'JetBrains Mono', monospace
```

### Hidden defaults to know about

- Every `h1`-`h6` automatically gets `font-heading` + tight tracking via `@layer base`. **Don't add `class="font-heading"` or `style="font-family: var(--font-heading)"` to headings** — it's redundant. For non-heading elements that need heading typography (logo, stylized links), use `class="font-heading"`.
- Adjacent top-level `<section>` elements inside `<main>` get an auto-applied 1px hairline border-top. **Don't add `border-t` to sections** unless you want a double rule.
- `.reveal` elements fade in on viewport entry (IntersectionObserver in `scripts/scrollReveal.ts`). Add `class="reveal"` to a section to opt in. Respects `prefers-reduced-motion`.

## Adding Content

### New blog post

Create `src/content/blog/my-post.md`:

```yaml
---
title: "Post Title"
date: 2026-05-14
description: "One-sentence summary."
categories: ["AI & Automation"]
draft: false
series: "semantic-layer"     # optional
series_part: 3               # optional
---

Post content here.
```

**Categories** (must match `BLOG_CATEGORIES` in `src/data/categories.ts`): Data Engineering, BI & Analytics, Data Science, AI & Automation, Data Governance, Data Modeling, Career.

Categories are enforced at build time via Zod `z.enum`. Typos fail the build.

**Blog voice**: All posts use thought-leadership framing. See `docs/BLOG_VOICE.md` for the full style guide.

### New project

Create `src/content/projects/my-project.md`:

```yaml
---
title: "Project Title"
description: "One-line summary."
category: "Data Engineering"   # must be one of the 4 PRACTICE_AREAS
tags: ["Databricks", "PySpark"]
featured: false
metrics:
  - label: "KPIs Governed"
    value: "100+"
order: 15
---

Project content here.
```

**Categories** (must match `PRACTICE_AREA_NAMES` in `src/data/categories.ts`): Data Engineering, BI & Analytics, Data Science, AI & Automation.

## Related Projects

- **mkdocs-website-archive**: The original MkDocs Material portfolio (to be archived on GitHub)
- **AI business site**: Separate Astro + Tailwind project (not yet created). Will share design tokens with this portfolio. See `TODO.md` for roadmap.
- **Blog writing agent**: Separate project for agent-driven blog creation and cross-posting. References `docs/BLOG_VOICE.md` in this repo.

## Deployment

The site deploys to GitHub Pages via GitHub Actions on push to `main`. The workflow is at `.github/workflows/deploy.yml`.

## Conventions

- No em-dashes in any written content. Use colons, periods, or restructure.
- No emoji in files unless explicitly requested.
- No AI attribution in git commits or PR bodies.
- Blog posts follow thought-leadership voice (see docs/BLOG_VOICE.md).
- Domain-relevant examples when possible: episodes, series, subscriptions, playback, Arabic content, MENA market.
