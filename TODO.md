# Portfolio TODO

Living scratchpad. Active work goes under Current; everything else lives under Future enhancements. Delete items as they ship. Prune Future occasionally so it stays a real backlog.

## Current

Nothing active.

## Future enhancements

- **Blog post: what I stopped reading.** Opinion or war-story archetype, first person, no external source needed. The long-form version of the `disposable-code-verifies` standalone LinkedIn post (drafted in the content hub). Thesis: reading every line you ship was the right habit when writing code was the expensive part, and it stopped being right when generating code got cheap. The scarce resource is attention, not code, and spending all of it reading line by line is spending it in the one place that does not scale. The shift is to spend it building the checks instead: disposable scripts that run the thing and report when the output is wrong. What the LinkedIn version could not fit and the blog must answer: (1) where the line falls between disposable checks and the ones worth keeping, (2) what actually replaces line-by-line reading in practice, so the post does not read as "I stopped verifying", and (3) the honest cost, that this trades a habit you trust for tooling you have to build first. Must NOT reuse the harness motif or the "shown me, not told me" rule, both owned by [agent-is-model-plus-harness](src/content/blog/agent-is-model-plus-harness.md). Sibling to [rag-verification-layer](src/content/blog/rag-verification-layer.md). Next free bi-weekly Thursday slot is 2026-08-20. Seeded 2026-07-28.

- **Per-project OG card.** Blog posts now get per-post OG cards via `scripts/build-blog-og-cards.mjs` and the shared renderer at `scripts/lib/og-card.mjs`. Same pattern can extend to project case studies: add `scripts/build-project-og-cards.mjs` that iterates `src/content/projects/` and writes to `public/og/projects/<slug>.png`, then update `Project.astro` to pass `ogImage={`/og/projects/${project.id}.png`}` to `BaseLayout`. The category eyebrow can use the existing `project.data.category` field. Trivial once the blog pattern is established.
