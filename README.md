# Portfolio

Source for [syedaamir.com](https://syedaamir.com), the personal site of Syed Aamir, a Data & AI Solutions Architect based in Dubai.

![Portfolio preview](public/assets/og-card.jpg)

## Stack

- [Astro](https://astro.build) v6 with Content Collections for blog posts and project case studies
- [Tailwind CSS](https://tailwindcss.com) v4 (config-free, CSS-first)
- TypeScript
- Deployed to GitHub Pages via GitHub Actions on push to `main`

## Run locally

```sh
npm install
npm run dev      # dev server at http://localhost:4321
npm run build    # production build to dist/
npm run preview  # preview the build locally
```

Requires Node 24+ (matches CI). Node is managed via `nvm` (standalone install at `~/.nvm`); if `npm` is not on PATH in a fresh shell, source nvm first:

```sh
source ~/.nvm/nvm.sh && nvm use 24
```

## Working on this repo with Claude Code

The repo is self-contained: the Claude tooling it relies on travels with a fresh clone, no machine-local setup required.

- **Project skills live in [.claude/skills/](.claude/skills/)** and load automatically in Claude Code. Two custom skills ship here:
  - `blog-writeup`: the blog factory (drafting, re-voicing, and discretion-scrubbing posts plus their LinkedIn companions).
  - `case-study-copywriter`: the project case-study writer.

  Both read their rules only from in-repo specs in [docs/](docs/) (BRAND.md, BLOG.md, PROJECTS.md), so they work identically on any clone.
- **`deep-research`** is an optional built-in Claude Code skill the blog factory uses for research at intake. It ships with the CLI, not this repo; if it is unavailable in a given environment, the factory falls back to WebSearch.
- **Settings.** [.claude/settings.json](.claude/settings.json) is committed and carries a couple of harmless read-only command allows. `.claude/settings.local.json` is intentionally **not** committed (machine-local convenience permissions); a clone can re-add its own without affecting anyone else.

## Authoring utilities

```sh
npm run og:blog         # generate per-post OG cards into public/og/blog/
npm run og:home         # rebuild the homepage OG card
npm run verify:diagram  # render a diagram SVG to PNG and report dimensions
npm run screenshots     # capture page screenshots at 4 widths (needs dev server)
```

OG cards must be committed alongside each new blog post. See [src/CLAUDE.md](src/CLAUDE.md) for the post-creation workflow.

## Repo layout

```
.
├── src/
│   ├── pages/          # routes (.astro)
│   ├── components/     # reusable UI (ui/, layout/, and per-page sections)
│   ├── layouts/        # page shells
│   ├── content/        # blog posts and project case studies (Content Collections)
│   ├── data/           # structured site data
│   ├── lib/            # shared utilities
│   ├── scripts/        # client-side TypeScript bundled by Astro
│   └── styles/         # Tailwind tokens (@theme) and base layer
├── public/             # static assets, served as-is
├── docs/               # brand and content specs (voice, tone, strategy)
└── scripts/            # developer utilities: OG card builders, diagram verifier, logo builder, screenshot tool
```

Several folders carry a nested `CLAUDE.md` documenting the conventions that apply there: [src/](src/CLAUDE.md), [src/content/](src/content/CLAUDE.md), and [docs/](docs/CLAUDE.md).

## Notable choices

- **Tailwind v4 with no config file.** Design tokens live in CSS via `@theme` declarations in [src/styles/](src/styles/).
- **Content Collections over a CMS.** Blog posts and project case studies are Markdown files in [src/content/](src/content/), schema-validated at build time.
- **Voice and brand specs in [docs/](docs/).** Single source of truth for visual identity, tone, and per-surface voice guidelines. Consumed by the in-repo `blog-writeup` and `case-study-copywriter` skills in [.claude/skills/](.claude/skills/).

## License

Code is licensed under the [MIT License](LICENSE). Written content (blog posts, project case studies) and brand assets in `docs/` and `src/content/` are © Syed Aamir and not licensed for reuse without permission.
