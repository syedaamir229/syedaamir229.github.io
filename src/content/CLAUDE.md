# `src/content/` Conventions

This folder holds authored markdown for the two content collections defined in [../content.config.ts](../content.config.ts): `blog` and `projects`.

Do not write spec content here. The specs live in `docs/`. This file is a thin pointer so the next session knows where to look.

## When you are writing a blog post

Read [../../docs/BLOG.md](../../docs/BLOG.md) and follow it end to end. Highlights:

- File path: `src/content/blog/<slug>.md`. Always `.md`, never `.mdx`.
- Frontmatter `categories` must be values from `BLOG_CATEGORIES` in [../data/categories.ts](../data/categories.ts). Build fails on typos.
- Pick a post archetype first per [BLOG.md section 12](../../docs/BLOG.md#12-post-archetypes): framework (the full body spine in [section 4](../../docs/BLOG.md#4-body-structure)), war-story, or opinion. The full spine applies only to the framework archetype, and even there the diagram is recommended, not required.
- Set `date` to a scheduled future Wednesday so the post drips on cadence; it stays hidden until that day. See [BLOG.md section 11](../../docs/BLOG.md#11-publishing-cadence-and-distribution).
- Every post gets a LinkedIn companion at `social/linkedin/<slug>.md`. See [BLOG.md section 13](../../docs/BLOG.md#13-linkedin-companion).
- No author bio block, no "related posts" links, no CTA box. Inbound is handled by the contact page.

## When you are writing a project case study

Read [../../docs/PROJECTS.md](../../docs/PROJECTS.md). Highlights:

- File path: `src/content/projects/<slug>.md`.
- Frontmatter `category` must be one of the four `PRACTICE_AREA_NAMES` in [../data/categories.ts](../data/categories.ts).
- Six H2 sections in fixed order: Challenge, Approach, Results & Impact, Architecture, Tech Stack, My Role. See [../../docs/PROJECTS.md section 4](../../docs/PROJECTS.md#4-body-structure) for the canonical structure.
- Architecture diagram lives at `public/assets/projects/<slug>.svg`.

## Voice for both

Tone principles and the hard rules (no em-dashes, no emoji, no exclamation marks, no AI attribution) are inherited from [../../docs/BRAND.md](../../docs/BRAND.md) section 5. One content-specific rule on top:

- Current employer is implicit through the CV, not the subject of any blog post or project body. See [BLOG.md section 10](../../docs/BLOG.md#10-confidentiality) and [PROJECTS.md section 9](../../docs/PROJECTS.md#9-confidentiality).

## How the build sees this folder

[../content.config.ts](../content.config.ts) globs `*.md` here, runs Zod-validated frontmatter against the schemas, and exposes typed `CollectionEntry<'blog'>` / `CollectionEntry<'projects'>` to layouts and helpers. If you change the schema there, content with mismatched frontmatter fails the build immediately. That is the design.
