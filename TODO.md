# Portfolio TODO

Living scratchpad. Active work goes under Current; everything else lives under Future enhancements. Delete items as they ship. Prune Future occasionally so it stays a real backlog.

## Current

_(empty)_

## Future enhancements

- **Per-post OG card auto-generation.** Today every page shares the single static `public/assets/og-card.jpg` (built by `scripts/build-og-card.mjs`). MkDocs Material did per-page social cards out of the box; Astro doesn't. To match that behavior, add a build-time route like `src/pages/og/[slug].png.ts` using `@vercel/og` or `satori` that renders a unique card per blog post with the post's title and pillar baked in, then update `BlogPost.astro` to pass `image={`/og/${slug}.png`}` to `BaseLayout`. Same pattern can extend to project case studies. ~30 min setup, then automatic for every new post. Worth doing once blog volume grows or once a specific post needs its own LinkedIn-ready preview.
- **LinkedIn share + OG image generation flow.** When this lands, decide how the LinkedIn excerpt is produced (frontmatter field, derived first-paragraph, or written by the blog agent) and revive the `linkedin_excerpt` schema slot if appropriate. The slot was dropped from `content.config.ts` during the 2026-05-17 cleanup because nothing read or wrote it; bringing it back is a one-line schema change once a real consumer exists. Pair this with the per-post OG card item above so the image generation and copy generation ship together.
