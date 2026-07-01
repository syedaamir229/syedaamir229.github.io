# `docs/` Conventions

Identity plus per-surface specs, plus one work queue. Each file owns one thing and loads cleanly because of the access-pattern split: identity is split into a voice half and a visual half, and each surface has its own operational spec. [BLOG-BACKLOG.md](BLOG-BACKLOG.md) is not a spec; it is the blog rewrite queue (which old posts still need re-voicing and a discretion scrub), kept here because it is blog-factory state, not roadmap.

## Identity

`BRAND.md` is a thin hub: shared positioning plus an index into the two halves. A surface loads only the half it needs.

| File | What it owns | When you open it |
|---|---|---|
| [BRAND.md](BRAND.md) | Positioning and the index to the two halves below. The source-of-truth anchor. | When you need the brand's positioning, or to find which half a rule lives in. |
| [BRAND-voice.md](BRAND-voice.md) | Voice and tone: principles, sentence patterns, the long-form first-person register, words to use and avoid, hard mechanical rules. | When writing or re-voicing any prose, or checking a mechanical rule. |
| [BRAND-visual.md](BRAND-visual.md) | Visual identity: palette, type, surface and texture, logo, diagram conventions, visual anti-patterns. | When changing colors, fonts, surfaces, or building a diagram. |

## Per-surface specs

Each references up to `BRAND-voice.md` for tone and never restates it.

| File | What it owns | When you open it |
|---|---|---|
| [SITE.md](SITE.md) | Landing-surface copy rules (home, capability cards, hero, section heads, CTAs). | When editing home-page copy or any non-blog, non-project copy. |
| [BLOG.md](BLOG.md) | Per-post writing spec: frontmatter, first-person body spine, H3 format, diagrams, checklist, confidentiality. | Every time you write a blog post. |
| [PROJECTS.md](PROJECTS.md) | Per-project case-study spec: frontmatter, body structure, diagram conventions, checklist, confidentiality. | Every time you add a project case study. |
| [LINKEDIN.md](LINKEDIN.md) | LinkedIn companion spec: draft structure, the visual-format decision matrix, the 2026 feed-ranking playbook. | Every time you write the LinkedIn companion for a post. |

## Dependency graph

```
BRAND.md  (hub: positioning + index)
   ├── BRAND-voice.md   (tone, words, hard rules)
   └── BRAND-visual.md  (palette, type, surface, diagrams)
          ↑
          │ (inherit tone from BRAND-voice.md)
          │
   ├── SITE.md          (landing voice + structural rules)
   ├── BLOG.md          (per-post operational spec)
   ├── PROJECTS.md      (per-project operational spec)
   └── LINKEDIN.md      (per-post companion spec; also refs BLOG.md)
```

Every per-surface doc references back up to `BRAND-voice.md` for tone and never restates the rules. If you find tone rules being duplicated in two files, fix the drift.

## Why the split is what it is

- **Identity split by access pattern** (`BRAND-voice.md` vs `BRAND-visual.md`). A writer re-voicing a post needs the voice rules, not 180 lines of color tokens and SVG conventions; someone building a diagram needs the visual half, not the long-form register. Splitting them means each load carries only what the task needs. `BRAND.md` stays as a thin hub so the "source of truth" anchor and generic references still resolve.
- **Per-surface operational specs separated from identity.** You write blog posts more often than you change brand tone. Mixing them means scrolling past voice rules every time you need a structural rule.
- **`LINKEDIN.md` is its own surface.** The companion spec is owned by the `linkedin-post` skill, not the blog spec, so it lives on its own instead of riding inside `BLOG.md`.
- **`SITE.md` is small on purpose.** The landing surface is mostly locked once shipped. The spec captures the "vertical-agnostic, present-tense, no CV verbs" pattern and gets out of the way.

## What is *not* in `docs/`

- **Code conventions, primitives, layer architecture** → [../src/CLAUDE.md](../src/CLAUDE.md).
- **Content frontmatter schemas** → [../src/content.config.ts](../src/content.config.ts) (enforced; not documented separately).
- **Single source of truth for categories** → [../src/data/categories.ts](../src/data/categories.ts) (enforced via Zod enum).
- **Roadmap / phases / pending work** → [../TODO.md](../TODO.md) at the repo root.
- **Blog positioning rationale** (formerly in BLOG_STRATEGY.md, deleted 2026-05-19). Git history has it if needed.

## Adding or renaming a doc

If you find yourself wanting to add another surface doc, ask first whether it is a *new surface* (e.g., a course landing page, a newsletter spec) or a *new layer in an existing surface*. New surfaces deserve their own doc; new layers usually fold into an existing one.

If you rename one of these files, update:

- Cross-references in the other docs.
- Cross-references in [../CLAUDE.md](../CLAUDE.md), the nested CLAUDE.md files, [../README.md](../README.md), and the vendored skills under [../.claude/skills/](../.claude/skills/).
