# `src/` Conventions

Code-side guide. This file loads automatically when working anywhere inside `src/`.

## Architecture (layered)

```
src/
├── config.ts              # SITE identity (name, title, avatar, ogImage), SOCIAL links, NAV_LINKS
├── content.config.ts      # Astro content collection schemas (blog + projects), category enums
├── content/               # Authored markdown (blog posts, project case studies)
├── data/                  # Page-scoped typed data (capabilities, categories, experience, ...)
├── lib/                   # Pure helper functions (getPublishedPosts, readingTime, ...)
├── scripts/               # Client-side TS imported by Astro <script> tags
├── layouts/               # Astro page layouts (BaseLayout, BlogPost, Project)
├── pages/                 # File-based routes (index, experience, contact, 404, blog/, projects/)
├── components/
│   ├── ui/                # Reusable primitives, no page knowledge (props in, markup out)
│   ├── layout/            # Cross-page chrome (Nav, Footer)
│   ├── home/              # Home-page sections
│   ├── about/             # About / experience sections
│   ├── blog/              # Blog listing + post components
│   └── projects/          # Project listing + case-study components
└── styles/
    └── global.css         # Tailwind @theme tokens + base layer + .prose / .prose-project
```

## Where does this go? (decision flowchart)

| The thing | Goes in |
|---|---|
| Site identity (name, URL, social handles, avatar path) | `config.ts` |
| Routing (nav links) | `config.ts` |
| Content used by one page (timeline, skills, capabilities) | `data/` |
| Multi-place data (categories, single source of truth) | `data/` |
| A pure helper (`getPublishedPosts`, `readingTime`) | `lib/` |
| Client-side script imported by a `<script>` tag | `scripts/` |
| Markup reused across pages with props only | `components/ui/` |
| Section component scoped to one page | `components/<page>/` |
| Nav, Footer, or anything in `BaseLayout` | `components/layout/` |
| Authored markdown (blog post or case study) | `content/blog/` or `content/projects/` |

If your change is a new identity field referenced by many components, put it in `config.ts`. If it is a list of things shaped by editorial decisions (categories, capabilities, skills), it goes in `data/`. Rule of thumb: `config.ts` is for the few things every page needs; `data/` is for things one or two pages need.

## Patterns to follow

**Use the primitives.** They exist precisely to keep markup consistent and prevent drift.

| Want to render | Use |
|---|---|
| Mono uppercase eyebrow label | `<Eyebrow>` (see [components/ui/Eyebrow.astro](components/ui/Eyebrow.astro)) |
| Section header (eyebrow + h2 + lede) | `<SectionHeader>` |
| Page header (eyebrow + h1 + lede, optional support slot) | `<PageHeader>` |
| Category/tag pill | `<Tag>` (variants: `category`, `tag`, `series`) |
| Filter-bar chip with active state | `<FilterChip>` |
| Category-filter bar wired to `[data-categories]` | `<CategoryFilter>` |
| Action button | `<Button variant="primary" \| "outline" \| "pill">` |
| Inline icon | `<Icon name="email" \| "linkedin" \| "github" \| "tableau" \| "arrow-right" \| "arrow-left" \| "menu" \| "close" \| "database" \| "chart" \| "brain" \| "robot">` |
| Card chrome (rounded-xl + border + bg) | `<Card>` |

**Use the helpers.** Do not re-write the query inline.

```ts
import { getPublishedPosts } from '../lib/blog';
import { getPublishedProjects } from '../lib/projects';
import { readingTime } from '../lib/readingTime';
import { getSeriesInfo } from '../lib/series';
import { getPersonSchema } from '../lib/personSchema';
```

**Layouts accept `CollectionEntry`, not flat props.** When you write a new layout for a content collection, define `interface Props { entry: CollectionEntry<'collectionName'> }` so schema changes propagate without layout signature edits.

## Anti-patterns to avoid

- **Inline SVGs.** Use `<Icon name="...">`. If the icon does not exist yet, add it to [components/ui/Icon.astro](components/ui/Icon.astro) once, then reuse.
- **Inline `style="font-family: var(--font-heading)"` on `<h1>`-`<h6>`.** The base layer applies it automatically. Same goes for the `font-heading` class on headings — it is redundant on heading tags.
- **Hand-rolled mono uppercase eyebrows.** No `text-[11px] font-mono uppercase tracking-[0.18em]` strings. Use `<Eyebrow>`.
- **Hand-rolled pill or button class strings.** No `inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 ...`. Use `<Button>` with a variant.
- **`border-t` on adjacent `<section>` elements.** A 1px cream-tinted top border is auto-applied to adjacent sections inside `<main>` via the `@layer base` rule in `global.css`. Adding one manually doubles up.
- **Free strings for category fields.** Both `blog.categories` and `projects.category` are enforced as `z.enum()` backed by [data/categories.ts](data/categories.ts). Typos fail the build.
- **Hard-coded site facts.** Author name, email, LinkedIn URL, avatar path, OG image, page-title separator: pull from `config.ts`, never type the literal.
- **New top-level folders.** If a file does not fit one of the layers above, the layering is wrong; revisit the design before adding `src/utils/` or `src/shared/`.

## Hidden defaults (auto-applied by global.css)

- All `h1`-`h6` get `font-heading` (Inter) + tight tracking via `@layer base`.
- Adjacent `<section>` elements inside `<main>` get a hairline cream-tinted top border.
- `.reveal` elements fade in on viewport entry via an IntersectionObserver in [scripts/scrollReveal.ts](scripts/scrollReveal.ts). Add `class="reveal"` to opt in; respects `prefers-reduced-motion`.
- `body::before` paints a low-opacity grain overlay across every page. Load-bearing for the brand — do not remove.

## Common tasks

### Add a blog post

1. Create `src/content/blog/<slug>.md`.
2. Fill frontmatter per [docs/BLOG.md section 4](../docs/BLOG.md#4-frontmatter). `categories` must be in [data/categories.ts](data/categories.ts) `BLOG_CATEGORIES`.
3. Write per [docs/BLOG.md section 3](../docs/BLOG.md#3-post-structure-mandatory-seven-parts).
4. Run `npm run build` and `npm run dev`, check `/blog/<slug>/`.

### Add a project case study

1. Create `src/content/projects/<slug>.md`.
2. Fill frontmatter per [docs/PROJECTS.md section 3](../docs/PROJECTS.md#3-frontmatter). `category` must be in `PRACTICE_AREA_NAMES`.
3. Write the seven-section body per [docs/PROJECTS.md section 4](../docs/PROJECTS.md#4-body-structure).
4. Drop the diagram SVG at `public/assets/projects/<slug>.svg`.
5. Run `npm run build` and `npm run dev`, check `/projects/<slug>/`.

### Add a new page

1. Create `src/pages/<route>.astro` (or `src/pages/<area>/<route>.astro`).
2. Wrap content in `<BaseLayout title="..." description="...">`.
3. For a header section: use `<PageHeader eyebrow="..." title="..." description="...">`. Custom strip below goes in the slot.
4. Build a content section as either inline markup or a new component under `src/components/<area>/`.
5. If the new page surface needs its own components folder, create `src/components/<area>/` and put section components there.

### Add a UI primitive

1. File: `src/components/ui/<Name>.astro`.
2. Props-only. No `getCollection`, no `SITE`, no `data/`, no `lib/` imports. The whole point is that primitives are decoupled from data.
3. Astro's `class:list` and CSS variables are your friends. Variants via a `variant: 'a' | 'b' | 'c'` prop and a lookup map.
4. Add it to the **"Use the primitives"** table in this file so the next session knows it exists.

### Add a data module

1. File: `src/data/<name>.ts`.
2. Export typed interfaces alongside the data.
3. If the data is referenced in more than one place, make it the single source of truth — never duplicate the values.

### Add a client script

1. File: `src/scripts/<name>.ts`.
2. Plain TypeScript at the top level (no `export default`, no IIFE). Astro bundles it.
3. Import from the consuming `.astro` file inside a `<script>` block:
   ```astro
   <script>
     import '../../scripts/<name>';
   </script>
   ```
4. Always check `prefers-reduced-motion` at the top if the script animates.

### Add a helper

1. File: `src/lib/<name>.ts`.
2. Pure functions only. No DOM. Allowed Astro deps: `astro:content` for `getCollection` and `CollectionEntry` types.
3. Export a single function or a small named-export group.

## Verify workflow

After any structural change to `src/`, run:

```bash
npm run build
```

Build must complete with 31 pages (the current page count). New routes increase the count by one. Failed schema validation, broken imports, and TypeScript errors all surface as build errors.

For UI-affecting changes, also run `npm run dev` and check the affected page in the browser. Specifically:

- Visual rendering matches design intent.
- No console errors.
- Hover and focus states work.
- Mobile and desktop viewports both render correctly (use the browser device toolbar).

Type checks verify code correctness, not feature correctness. If you cannot test the UI visually, say so explicitly rather than claiming success.

### SVG diagrams: extra verification step

After editing or generating any SVG diagram (in `public/assets/projects/` or `public/assets/blog/`):

1. Keep the dev server running across iterations. Killing and restarting between every edit is slow and breaks flow.
2. Take a **focused screenshot of the SVG region**, not a full-page thumbnail. Full-page screenshots are too compressed to spot label overflow, broken alignment, or wrong palette.
3. Read the screenshot back and visually confirm: no label overflow, palette matches the brand tokens, every element legible.
4. Only move on once the focused screenshot looks right.

This step is mandatory because compressed thumbnails have shipped broken diagrams in the past.

## Memory store

Cross-session preferences and project decisions live in `~/.claude/projects/-Users-syedaamir-Repositories-Personal-portfolio/memory/`. The index file (`MEMORY.md`) is always loaded into context. Read entries you have not seen recently before making decisions about workflow or scope.
