# LinkedIn companion: Semantic Layer Part 2 of 6: The Three Ownership Layers

- Post: https://syedaamir.com/blog/semantic-layer-02-architecture-and-data-flow/
- Publish: 2026-07-15 (Wed)
- Archetype: framework (series)

---

One deploy emptied every fact table and reset every user role. The script was fine. The model was fine.

What broke was an ownership boundary. The release crossed data engineering, metric engineering, and report engineering, and nobody was watching the part most likely to fail, because three jobs were sitting on two people.

Before the first measure ships, those boundaries have to be drawn. Who owns the curated tables, who owns the semantic model, who owns consumption. A name and a release path for each, so no deploy runs into a blind spot.

Part 2 of the semantic-layer series.

https://syedaamir.com/blog/semantic-layer-02-architecture-and-data-flow/

#DataEngineering #SemanticLayer
