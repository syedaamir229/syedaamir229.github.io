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
├── config.ts              # Site metadata, nav links, social links, capabilities, metrics
├── content.config.ts      # Content collection schemas (blog + projects)
├── content/
│   ├── blog/              # Blog posts as .md files
│   └── projects/          # Project case studies as .md files
├── layouts/
│   ├── BaseLayout.astro   # HTML shell, fonts, meta tags, nav, footer, scroll-reveal
│   ├── BlogPost.astro     # Individual blog post layout
│   └── Project.astro      # Individual project layout
├── pages/
│   ├── index.astro        # Landing page (hero, pipeline, metrics, capabilities, projects, timeline, certs, CTA)
│   ├── blog/
│   │   ├── index.astro    # Blog listing with category filtering
│   │   └── [...slug].astro
│   ├── projects/
│   │   ├── index.astro    # Project listing with category filtering
│   │   └── [...slug].astro
│   ├── experience.astro   # Full career timeline, skills, certs, education
│   └── rss.xml.ts         # RSS feed
├── components/            # Hero, Pipeline, MetricsStrip, CapabilityCard, FeaturedProjects, Timeline, Certifications, CTA, Nav, Footer
└── styles/
    └── global.css         # Tailwind base + design tokens + utilities
public/
└── assets/                # Images, diagrams, logos, resume PDF, favicon
```

## Design Tokens

```
Colors:
  navy-950: #060b18    (page background)
  navy-900: #0a0e17    (card backgrounds)
  navy-800: #111827    (elevated surfaces)
  teal-500: #0f9b8e    (primary accent)
  teal-400: #16c2b0    (links, highlights)
  teal-300: #5eead4    (gradient endpoints)
  slate-400: #94a3b8   (secondary text)
  slate-200: #e2e8f0   (body text)

Fonts:
  Headings: Outfit
  Body: DM Sans
  Code: JetBrains Mono
```

## Adding Content

### New blog post

Create `src/content/blog/my-post.md`:

```yaml
---
title: "Post Title"
date: 2026-05-14
description: "One-sentence summary."
categories: ["AI & Automation"]
tags: ["GenAI", "Databricks"]
featured: false
draft: false
---

Post content here.
```

**Categories** (pick one): Data Engineering, BI & Analytics, Data Science, AI & Automation, Data Governance, Career

**Blog voice**: All posts use thought-leadership framing. See `BLOG_GUIDELINES.md` for the full style guide.

### New project

Create `src/content/projects/my-project.md`:

```yaml
---
title: "Project Title"
description: "One-line summary."
category: "Data Engineering"
tags: ["Databricks", "PySpark"]
featured: false
metrics:
  - label: "KPIs Governed"
    value: "100+"
order: 15
---

Project content here.
```

## Related Projects

- **mkdocs-website-archive**: The original MkDocs Material portfolio (to be archived on GitHub)
- **AI business site**: Separate Astro + Tailwind project (not yet created). Will share design tokens with this portfolio. See `TODO.md` for roadmap.
- **Blog writing agent**: Separate project for agent-driven blog creation and cross-posting. References `BLOG_GUIDELINES.md` in this repo.

## Deployment

The site deploys to GitHub Pages via GitHub Actions on push to `main`. The workflow is at `.github/workflows/deploy.yml`.

To set up from scratch:
1. On GitHub: rename existing `syedaamir229.github.io` repo to `mkdocs-website-archive`, then archive it
2. Create new empty repo named `syedaamir229.github.io`
3. `git init && git add . && git commit -m "Initial commit"`
4. `git remote add origin git@github.com:syedaamir229/syedaamir229.github.io.git`
5. `git push -u origin main`
6. On GitHub: Settings > Pages > Source: GitHub Actions

## Conventions

- No em-dashes in any written content. Use colons, periods, or restructure.
- No emoji in files unless explicitly requested.
- No AI attribution in git commits or PR bodies.
- Blog posts follow thought-leadership voice (see BLOG_GUIDELINES.md).
- Domain-relevant examples when possible: episodes, series, subscriptions, playback, Arabic content, MENA market.
