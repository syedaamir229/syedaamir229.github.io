# Brand

The single source of truth for identity across every surface: portfolio, blog, project case studies, social posts.

Identity has two layers, each in its own file so a surface loads only the half it needs. This hub holds the shared positioning and points to both.

| Half | File | What it owns |
|---|---|---|
| **Voice** | [BRAND-voice.md](BRAND-voice.md) | Tone principles, sentence patterns, the long-form first-person register, words to use and avoid, hard mechanical rules (no em-dashes, no emoji, no AI attribution). |
| **Visual** | [BRAND-visual.md](BRAND-visual.md) | Palette, typography, surface and texture, logo and wordmark, diagram conventions, visual anti-patterns. |

Surface-specific operational specs ([SITE.md](SITE.md), [BLOG.md](BLOG.md), [PROJECTS.md](PROJECTS.md), [LINKEDIN.md](LINKEDIN.md)) refer up here for tone and inherit it; they only describe what is unique to that surface. If you find tone rules being duplicated in two files, fix the drift.

---

## 1. Positioning

**What this brand is:** Premium AI automation and data architecture consulting. Sells frameworks, implementations, and judgment. Not dashboards-as-a-service, not generic AI tooling.

**What it is not:**
- A white-coat SaaS product brand.
- A generic dark-mode developer portfolio.
- An editorial or literary brand.

**The differentiator:** Most AI and data brands default to electric blue on white. This one uses warm-leaning deep navy with cyan accents, monospace eyebrows, and a film-grain overlay (see [BRAND-visual.md](BRAND-visual.md)). Reads as engineering precision rather than template-dark-mode or marketing chrome.

**Positioning lines that work:**
- "Data that works as hard as your business does."
- "End KPI disputes and make reporting self-serve."
- "Turning scattered data into decisions your business can trust."

---

## Cross-references

- **Voice, words to use and avoid, hard rules**: [BRAND-voice.md](BRAND-voice.md).
- **Palette, type, surface, diagrams**: [BRAND-visual.md](BRAND-visual.md).
- **Visual implementation**: [src/styles/global.css](../src/styles/global.css).
- **Voice in practice per surface**: [SITE.md](SITE.md) (landing), [BLOG.md](BLOG.md) (blog posts), [PROJECTS.md](PROJECTS.md) (case studies), [LINKEDIN.md](LINKEDIN.md) (companions).
