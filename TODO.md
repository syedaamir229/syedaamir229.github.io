# Portfolio TODO

Living scratchpad. Active work goes under Current; everything else lives under Future enhancements. Delete items as they ship. Prune Future occasionally so it stays a real backlog.

## Current

- **Git repo cleanup + history purge (whole repo, not just blog).** The public repo's history still contains the old un-scrubbed drafts and earlier employer tells even after the [_drafts move](src/content/blog/) cleaned HEAD. Do a deliberate pass: (1) audit full history for employer/OTT/vendor tells (`git log -p`, or scan with `gitleaks`/`trufflehog`), (2) purge with `git filter-repo` (remove the old blog drafts, their SVGs/OG cards, any other identifying artifacts from every commit), (3) force-push and re-verify the GitHub mirror. Note the cost: rewriting history changes every commit SHA and breaks existing clones. Do it as one focused session when ready, not piecemeal. Also fold in general housekeeping while in there: drop any other unused assets and confirm nothing in `public/` is an orphan.

## Future enhancements

- **Per-project OG card.** Blog posts now get per-post OG cards via `scripts/build-blog-og-cards.mjs` and the shared renderer at `scripts/lib/og-card.mjs`. Same pattern can extend to project case studies: add `scripts/build-project-og-cards.mjs` that iterates `src/content/projects/` and writes to `public/og/projects/<slug>.png`, then update `Project.astro` to pass `ogImage={`/og/projects/${project.id}.png`}` to `BaseLayout`. The category eyebrow can use the existing `project.data.category` field. Trivial once the blog pattern is established.
