# `docs/` Conventions

Four files. Each owns one thing. Loads cleanly because of the access-pattern split: identity is in one place, per-surface operational specs are in one place each.

## The four files

| File | What it owns | When you open it |
|---|---|---|
| [BRAND.md](BRAND.md) | Visual identity (palette, type, surface, texture) and tone principles. Source of truth for both. | When changing colors, fonts, voice, or anything brand-defining. Every other spec inherits from this. |
| [SITE.md](SITE.md) | Landing-surface copy rules (home, capability cards, hero, section heads, CTAs). | When editing home-page copy or any non-blog, non-project copy. |
| [BLOG.md](BLOG.md) | Per-post writing spec: frontmatter, first-person body spine, H3 format, diagrams, checklist, confidentiality. | Every time you write a blog post. |
| [PROJECTS.md](PROJECTS.md) | Per-project case-study spec: frontmatter, body structure, diagram conventions, checklist, confidentiality. | Every time you add a project case study. |

## Dependency graph

```
BRAND.md
   ↑
   │ (inherits tone)
   │
   ├── SITE.md          (landing voice + structural rules)
   ├── BLOG.md          (per-post operational spec)
   └── PROJECTS.md      (per-project operational spec)
```

Every per-surface doc references back up to `BRAND.md` for tone and never restates the rules. If you find tone rules being duplicated in two files, fix the drift.

## Why the split is what it is

- **Identity in one place** (`BRAND.md`). A brand evolves; voice principles evolve; if they were scattered across three voice files they would drift.
- **Per-surface operational specs separated from identity.** You write blog posts more often than you change brand tone. Mixing them means scrolling past 100 lines of voice rules every time you need a structural rule.
- **`SITE.md` is small on purpose.** The landing surface is mostly locked once shipped. The spec captures the "vertical-agnostic, present-tense, no CV verbs" pattern and gets out of the way.

## What is *not* in `docs/`

- **Code conventions, primitives, layer architecture** → [../src/CLAUDE.md](../src/CLAUDE.md).
- **Content frontmatter schemas** → [../src/content.config.ts](../src/content.config.ts) (enforced; not documented separately).
- **Single source of truth for categories** → [../src/data/categories.ts](../src/data/categories.ts) (enforced via Zod enum).
- **Roadmap / phases / pending work** → [../TODO.md](../TODO.md) at the repo root.
- **Blog positioning rationale** (formerly in BLOG_STRATEGY.md, deleted 2026-05-19). Git history has it if needed.

## Adding or renaming a doc

If you find yourself wanting to add a fifth doc, ask first whether it is a *new surface* (e.g., a course landing page, a newsletter spec) or a *new layer in an existing surface*. New surfaces deserve their own doc; new layers usually fold into an existing one.

If you rename one of the four, update:

- Cross-references in the other three docs.
- Cross-references in [../CLAUDE.md](../CLAUDE.md) and the nested CLAUDE.md files.
