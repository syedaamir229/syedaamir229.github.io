# Portfolio Project

Personal portfolio for Syed Aamir, Data & AI Solutions Engineer based in Dubai, UAE. Astro v6 + Tailwind v4, deployed to GitHub Pages.

## Commands

```bash
npm run dev      # Dev server at http://localhost:4321
npm run build    # Production build to dist/
npm run preview  # Preview the build locally
```

## Top-level layout

```
.
├── src/                # Application code (see src/CLAUDE.md)
├── public/             # Static assets, served as-is
├── docs/               # Brand and content specs (see docs/CLAUDE.md)
├── scripts/            # Local developer utilities (.mjs), gitignored
├── astro.config.mjs    # Astro build config
├── tsconfig.json       # TypeScript compiler config
└── package.json        # Dependencies and `scripts` commands
```

Nested `CLAUDE.md` files give you the conventions that apply when working in a specific area:

- **[src/CLAUDE.md](src/CLAUDE.md)** — code architecture, decision flowchart, recipes, anti-patterns, verify workflow.
- **[src/content/CLAUDE.md](src/content/CLAUDE.md)** — authoring blog posts and project case studies (pointers to the specs in `docs/`).
- **[docs/CLAUDE.md](docs/CLAUDE.md)** — the brand and content spec system: what each file owns and how they reference each other.

Memory store: `~/.claude/projects/-Users-syedaamir-Repositories-Personal-portfolio/memory/` — decisions, preferences, and project state carried across sessions. Always loaded.

## Project-wide conventions

- **No em-dashes** in any written content (commits, PR bodies, docs, blog posts, code comments). Use colons, periods, or restructure. SQL `--` comments inside fenced code blocks are exempt.
- **No emoji** in files unless explicitly requested.
- **No AI attribution** in git commits or PR bodies. No `Co-Authored-By: Claude`, no "Generated with Claude Code" footer.
- **Domain-relevant examples** where natural in non-landing surfaces: episodes, series, subscriptions, playback, Arabic content, MENA market. Landing surfaces stay vertical-agnostic — see [docs/SITE.md](docs/SITE.md).

## Identity, brand, and voice

- **Brand source of truth**: [docs/BRAND.md](docs/BRAND.md). Owns both visual identity (palette, type, surface) and tone principles. Every other voice spec references it.
- **Per-surface voice specs**: [docs/SITE.md](docs/SITE.md) (landing), [docs/BLOG.md](docs/BLOG.md) (per blog post), [docs/PROJECTS.md](docs/PROJECTS.md) (per project case study).
- **Blog strategy** (pillars, cadence, distribution): [docs/BLOG_STRATEGY.md](docs/BLOG_STRATEGY.md).

## Working in this repo

- **One phase per session.** [TODO.md](TODO.md) lists work in named phases; the repo grew through 5+ of them. Pick one phase, finish it, commit, push. Scope creep into other phases produces context bloat and incomplete commits. If you discover something out-of-phase that matters, log it as a separate task and stay in the current phase.
- **Verify visually before declaring UI work done.** Build success is necessary but not sufficient. For any change that affects rendering, run `npm run dev` and confirm the affected page in the browser at desktop and mobile widths. Type checks and tests verify correctness of code, not of features.
- **CLAUDE.md is split across folders for progressive loading.** If you grow it past one screen, split into a nested CLAUDE.md at the natural folder boundary rather than expanding the root file. The root is for orientation; nested files own the conventions that apply only when working in that area.

## Deployment

The site deploys to GitHub Pages via GitHub Actions on push to `main`. Workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## Related projects

- **mkdocs-website-archive**: the original MkDocs Material portfolio (archived).
- **AI business site**: separate Astro + Tailwind project, not yet created. Will share design tokens with this portfolio.
- **Blog writing agent**: separate project for agent-driven blog creation and cross-posting. References `docs/BLOG.md`.
