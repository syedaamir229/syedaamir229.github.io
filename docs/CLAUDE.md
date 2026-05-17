# `docs/` Conventions

Five files. Each owns one thing. Loads cleanly because of the access-pattern split: identity is in one place, per-surface operational specs are in one place each, strategy lives separately so you do not page through it every time you write.

## The five files

| File | What it owns | When you open it |
|---|---|---|
| [BRAND.md](BRAND.md) | Visual identity (palette, type, surface, texture) and tone principles. Source of truth for both. | When changing colors, fonts, voice, or anything brand-defining. Every other spec inherits from this. |
| [SITE.md](SITE.md) | Landing-surface copy rules (home, capability cards, hero, section heads, CTAs). | When editing home-page copy or any non-blog, non-project copy. |
| [BLOG.md](BLOG.md) | Per-post writing spec: two post shapes, seven-part structure, frontmatter, image rules, checklist. | Every time you write a blog post. |
| [BLOG_STRATEGY.md](BLOG_STRATEGY.md) | Positioning and content pillars. | When deciding what to write next or where a post lands in the topic mix. Rare. |
| [PROJECTS.md](PROJECTS.md) | Per-project case-study spec: frontmatter, body structure, diagram conventions, checklist. | Every time you add a project case study. |

## Dependency graph

```
BRAND.md
   ↑
   │ (inherits tone)
   │
   ├── SITE.md          (landing voice + structural rules)
   ├── BLOG.md          (per-post operational spec)
   │     ↑
   │     │ (referenced for "how" by)
   │     │
   │     └── BLOG_STRATEGY.md  (strategic "what" and "when")
   │
   └── PROJECTS.md       (per-project operational spec)
```

Every per-surface doc references back up to `BRAND.md` for tone and never restates the rules. If you find tone rules being duplicated in two files, fix the drift.

## Why the split is what it is

- **Identity in one place** (`BRAND.md`). A brand evolves; voice principles evolve; if they were scattered across three voice files they would drift.
- **Per-surface operational specs separated from strategy.** You write blog posts more often than you change blog strategy. Mixing them means scrolling past 100 lines of strategy every time you need a voice rule. Same applies to projects, though projects are slower-moving.
- **`SITE.md` is small on purpose.** The landing surface is mostly locked once shipped. The spec captures the "vertical-agnostic, present-tense, no CV verbs" pattern and gets out of the way.

## What is *not* in `docs/`

- **Code conventions, primitives, layer architecture** → [../src/CLAUDE.md](../src/CLAUDE.md).
- **Content frontmatter schemas** → [../src/content.config.ts](../src/content.config.ts) (enforced; not documented separately).
- **Single source of truth for categories** → [../src/data/categories.ts](../src/data/categories.ts) (enforced via Zod enum).
- **Roadmap / phases / pending work** → [../TODO.md](../TODO.md) at the repo root.

## Adding or renaming a doc

If you find yourself wanting to add a sixth doc, ask first whether it is a *new surface* (e.g., a course landing page, a newsletter spec) or a *new layer in an existing surface*. New surfaces deserve their own doc; new layers usually fold into an existing one.

If you rename one of the five, update:

- Cross-references in the other four docs.
- Cross-references in [../CLAUDE.md](../CLAUDE.md) and the nested CLAUDE.md files.
