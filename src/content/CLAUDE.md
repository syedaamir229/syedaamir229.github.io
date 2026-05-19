# `src/content/` Conventions

This folder holds authored markdown for the two content collections defined in [../content.config.ts](../content.config.ts): `blog` and `projects`.

Do not write spec content here. The specs live in `docs/`. This file is a thin pointer so the next session knows where to look.

## When you are writing a blog post

Read [../../docs/BLOG.md](../../docs/BLOG.md) and follow it end to end. Highlights:

- File path: `src/content/blog/<slug>.md`. Always `.md`, never `.mdx`.
- Frontmatter `categories` must be values from `BLOG_CATEGORIES` in [../data/categories.ts](../data/categories.ts). Build fails on typos.
- Seven-part structure: hook, thesis, context, named framework, prioritization, domain anchor, closing question.
- Posts end at the closing question. No author bio block, no "related posts" links, no CTA box. Inbound is handled by the contact page.

## When you are writing a project case study

Read [../../docs/PROJECTS.md](../../docs/PROJECTS.md). Highlights:

- File path: `src/content/projects/<slug>.md`.
- Frontmatter `category` must be one of the four `PRACTICE_AREA_NAMES` in [../data/categories.ts](../data/categories.ts).
- Seven H2 sections in fixed order: Challenge, Key Decisions, Approach, Architecture Overview, Results & Impact, Reusable Pattern, Tech Stack.
- Architecture diagram lives at `public/assets/projects/<slug>.svg`.

## Voice for both

Tone principles are inherited from [../../docs/BRAND.md](../../docs/BRAND.md) section 5. Hard rules apply across both collections:

- No em-dashes.
- No emoji.
- No exclamation marks.
- No AI attribution.
- Current employer is implicit through the CV, not the subject of any blog post or project body. See [BLOG.md section 9](../../docs/BLOG.md#9-confidentiality) and [PROJECTS.md section 9](../../docs/PROJECTS.md#9-confidentiality).

## How the build sees this folder

[../content.config.ts](../content.config.ts) globs `*.md` here, runs Zod-validated frontmatter against the schemas, and exposes typed `CollectionEntry<'blog'>` / `CollectionEntry<'projects'>` to layouts and helpers. If you change the schema there, content with mismatched frontmatter fails the build immediately. That is the design.
