# Portfolio

Source for [syedaamir229.github.io](https://syedaamir229.github.io), the personal site of Syed Aamir, a Data & AI Engineer based in Dubai.

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

Requires Node 22.12+.

## Repo layout

```
.
├── src/
│   ├── pages/          # routes (.astro)
│   ├── components/     # reusable UI
│   ├── layouts/        # page shells
│   ├── content/        # blog posts and project case studies (Content Collections)
│   ├── data/           # structured site data
│   ├── lib/            # shared utilities
│   ├── styles/         # Tailwind layer customizations
│   └── ui/             # design tokens and primitives
├── public/             # static assets, served as-is
├── docs/               # brand and content specs (voice, tone, strategy)
└── scripts/            # local developer utilities (gitignored)
```

Each major folder has a nested `CLAUDE.md` documenting the conventions that apply there.

## Notable choices

- **Tailwind v4 with no config file.** Design tokens live in CSS via `@theme` declarations in [src/styles/](src/styles/).
- **Content Collections over a CMS.** Blog posts and project case studies are MDX files in [src/content/](src/content/), schema-validated at build time.
- **Voice and brand specs in [docs/](docs/).** Single source of truth for visual identity, tone, and per-surface voice guidelines. Used by a separate blog-writing agent.

## License

Code is licensed under the [MIT License](LICENSE). Written content (blog posts, project case studies) and brand assets in `docs/` and `src/content/` are © Syed Aamir and not licensed for reuse without permission.
