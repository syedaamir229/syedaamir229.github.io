# Portfolio Project

Personal portfolio for Syed Aamir, Data & AI Solutions Engineer based in Dubai, UAE. Astro v6 + Tailwind v4, deployed to GitHub Pages.

## Commands

```bash
npm run dev      # Dev server at http://localhost:4321
npm run build    # Production build to dist/
npm run preview  # Preview the build locally
```

Requires Node 24+ (matches CI). Node is managed via `nvm` (Homebrew formula). If `npm` is not on PATH in a fresh shell, source nvm first:

```bash
source /opt/homebrew/opt/nvm/nvm.sh && nvm use 24
```

After a major Node upgrade (for example the Homebrew `node` formula moving 25 to 26), if `npm run build` or `npm run dev` acts up, run `rm -rf node_modules && npm install` to recompile native modules against the new ABI. Nothing in this repo uses APIs removed in Node 26 (stream internals, `http.Server.writeHeader()`), so a clean reinstall is the only step needed.

## Top-level layout

```
.
├── src/                # Application code (see src/CLAUDE.md)
├── public/             # Static assets, served as-is
├── docs/               # Brand and content specs (see docs/CLAUDE.md)
├── scripts/            # Developer utilities (.mjs): OG card builders, diagram verifier
├── social/             # LinkedIn companion drafts per post (social/linkedin/<slug>.md), not built
├── astro.config.mjs    # Astro build config
├── tsconfig.json       # TypeScript compiler config
└── package.json        # Dependencies and `scripts` commands
```

Nested `CLAUDE.md` files give you the conventions that apply when working in a specific area:

- **[src/CLAUDE.md](src/CLAUDE.md)**: code architecture, decision flowchart, recipes, anti-patterns, verify workflow.
- **[src/content/CLAUDE.md](src/content/CLAUDE.md)**: authoring blog posts and project case studies (pointers to the specs in `docs/`).
- **[docs/CLAUDE.md](docs/CLAUDE.md)**: the brand and content spec system: what each file owns and how they reference each other.

Decisions, preferences, and project context live in this CLAUDE.md tree and in [docs/](docs/), not in a separate memory store. When something durable comes up, capture it in the right CLAUDE.md or spec file so it's visible in the repo and reviewable in PRs.

## Project-wide conventions

- **No em-dashes** in any written content (commits, PR bodies, docs, blog posts, code comments). Use colons, periods, or restructure. SQL `--` comments inside fenced code blocks are exempt.
- **No emoji** in files unless explicitly requested.
- **No AI attribution** in git commits or PR bodies. No `Co-Authored-By: Claude`, no "Generated with Claude Code" footer.
- **Concrete examples from the actual work.** In blog posts and project case studies, use real domain details from the work being described, not generic placeholders. Show depth in one domain rather than fake breadth across all of them. The current employer is implicit through your CV and LinkedIn experience section; it should not appear as the subject of any sentence in a published post or project case study. Posture lives in [docs/BLOG.md section 9](docs/BLOG.md#9-confidentiality) and [docs/PROJECTS.md section 9](docs/PROJECTS.md#9-confidentiality). Landing surfaces stay vertical-agnostic, see [docs/SITE.md](docs/SITE.md).

## Identity, brand, and voice

- **Brand source of truth**: [docs/BRAND.md](docs/BRAND.md). Owns both visual identity (palette, type, surface) and tone principles. Every other voice spec references it.
- **Per-surface voice specs**: [docs/SITE.md](docs/SITE.md) (landing), [docs/BLOG.md](docs/BLOG.md) (per blog post), [docs/PROJECTS.md](docs/PROJECTS.md) (per project case study).

## Working in this repo

- **One focused task per session.** [TODO.md](TODO.md) is the living scratchpad: a "current" section for what's actively being worked on, a "future" section for things to do later. Pick from current, finish it, commit, push, then delete the done items. If you discover something out of scope mid-session, file it under future and stay on the current task. Prune the future section occasionally so it stays a real backlog, not a wishlist graveyard.
- **Verify visually before declaring UI work done.** Build success is necessary but not sufficient. For any change that affects rendering, run `npm run dev` and confirm the affected page in the browser at desktop and mobile widths. Type checks and tests verify correctness of code, not of features.
- **CLAUDE.md is split across folders for progressive loading.** If you grow it past one screen, split into a nested CLAUDE.md at the natural folder boundary rather than expanding the root file. The root is for orientation; nested files own the conventions that apply only when working in that area.

## Collaboration notes

- **Background**: BI professional, comfortable with Python, no prior frontend or React experience. Frame web/Astro/TypeScript explanations against Python analogies (`pyproject.toml`, `uv`, FastAPI, Pydantic, `.venv`) rather than assuming JS/TS fluency.
- **Tutor mode for learning sessions.** When the user asks to understand a part of the codebase ("help me understand", "I'm new to this", "explain this to me"), default to tutor mode: one concept at a time, build on what they already know, avoid frontend jargon without unpacking it, and ask whether they want to move on before continuing. Switch out of tutor mode when they signal they want to move faster.
- **Diagrams are hand-coded SVGs.** Written directly as XML, checked into `public/assets/blog/` and `public/assets/projects/`. After writing or editing, verify the rendered output with `npm run verify:diagram <path>` and read the resulting PNG. Full conventions in [docs/BRAND.md section 7](docs/BRAND.md#7-diagrams).

## Deployment

The site deploys to GitHub Pages via GitHub Actions on push to `main`. Workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
