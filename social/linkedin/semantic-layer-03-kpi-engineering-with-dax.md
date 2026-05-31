# LinkedIn companion: Semantic Layer Part 3 of 6: The Three-Layer DAX Stack

- Post: https://syedaamir.com/blog/semantic-layer-03-kpi-engineering-with-dax/
- Publish: 2026-07-22 (Wed)
- Archetype: framework (series)

---

I once audited churn_rate across the three most-used reports in a governed model. Three different formulas, and none of them agreed.

One used DIVIDE with a zero default. One had no fallback at all. One swapped behaviour at quarter-end inside an IF. Same KPI, three shapes, all in production.

That happens when measure logic is built flat. The fix is to build it in layers: pure aggregations at the base, the actual KPI ratios above that, and the time-window and lifecycle logic on top. The hierarchy is what stops one number from quietly turning into three.

Part 3, with the DIVIDE pattern I default to.

https://syedaamir.com/blog/semantic-layer-03-kpi-engineering-with-dax/

#PowerBI #DAX
