---
title: "Most AI Strategy Is a Data-Modeling Problem in Disguise"
date: 2026-06-10
description: "Most AI initiatives stall on the data model, not the model. The unglamorous foundation work is the real strategy, and naming it that decides where the budget goes."
og_title: "AI Strategy Is Data Modeling in Disguise"
categories: ["AI & Automation", "Data Engineering"]
draft: false
---

Most AI strategy is a data-modeling problem wearing a costume.

The costume is convincing. It has a demo, a vendor, a slide that says "GenAI roadmap," and a budget line with the word "AI" in it. Underneath, the thing that decides whether any of it ships is almost never the model. It is whether the business has a governed answer to "what is a customer, what is churn, what is an active subscriber," and whether that answer lives in one place every system can read. That is data modeling. It does not demo well, and it is where the work actually is.

Walk into most AI initiatives and the strategy is a list of capabilities: a chatbot over the docs, a propensity model, an agent that answers questions in natural language. The roadmap is organised around the models. The budget is organised around the models. The org chart grows an "AI engineer" and a "GenAI lead." What none of it is organised around is the layer every one of those capabilities reads from.

## Two initiatives, opposite outcomes, same cause

Take two AI projects off the same stack that ended in opposite places.

The first was a behaviour-based inference model, the kind that predicts a demographic attribute from viewing patterns. The textbook version starts from raw events and engineers features from scratch, and it takes most of a year. This one shipped in about four months, and the reason had nothing to do with the model. A governed subscriber feature table already existed, built years earlier for dashboards: lifecycle, watch behaviour, content affinity, device patterns, all already shaped and already trusted. The feature engineering, the genuinely hard part, was mostly done before the project opened. The model was a thin layer on top of a data model that had been quietly compounding for years.

The second was an agent that answers business questions in natural language. The demo is magic. The failure is quiet. Ask it how many active subscribers there were last month and it returns a number, confidently, and the number is wrong, because "active subscriber" was never governed and the agent reached for one of the four definitions floating around the warehouse. The model did its job. The data model had not done its job, so the agent shipped a wrong answer to an executive in a chat window, which is worse than no answer because it carries the model's confidence.

In both cases the model was interchangeable. The data underneath was destiny. That is the pattern under almost every AI initiative I have watched succeed or stall. The success was a data-modeling success wearing an AI badge. The failure was a data-modeling failure the AI got blamed for.

## Why the costume sells

The costume persists for reasons that are easy to sympathise with. Foundation work does not photograph. Nobody asks for a demo of a star schema or a governed metric. An AI demo, by contrast, sells itself in thirty seconds in a boardroom. So the budget follows the demo, the titles follow the budget, and the layer that decides everything stays underfunded and unstaffed, named last and cut first.

The market reinforces it. The postings say "AI engineer" and "GenAI architect," not "the person who will finally make active subscriber mean one thing." The incentive everywhere points at the costume and away from the body wearing it. A team that proposes a quarter of metric governance before the first model gets asked why it is moving slowly. A team that ships a flashy pilot on ungoverned data gets congratulated, right up until the pilot has to become a product and the foundation that was skipped has to be built anyway, later, under more pressure, by people now also defending why the AI does not work.

There is a tell that separates a real strategy from a costume, and it is cheap to check. Ask what happens to the plan if the model is swapped for a different vendor's model next year. If the strategy survives that swap untouched, it was never about the model, and the people who know it are usually the data team. If the strategy collapses, the model was load-bearing, and that is rare outside actual research. Most organisations are not doing research. They are trying to get a reliable answer to a business question into a system that acts on it. For them the frontier is not the model. It is the definitions.

**An organisation funding AI is either funding a data model or funding a demo. Once it funds the demo, every initiative spends its first two quarters rediscovering that the foundation is not there, and the AI takes the blame for a gap it inherited. Once it funds the data model, the same governed layer carries the propensity model, the agent, and the next three capabilities nobody has scoped yet, and the AI looks effortless because the hard part was paid for upfront.** The way you get there is not a better model or a larger vendor contract. It is treating the AI budget as a data-modeling budget with a more fundable name.

## Where the AI money should actually go

If I had an AI budget and one quarter to not waste it, I would spend most of it before touching a model.

I would pick the two or three entities every future capability will need, a customer, a transaction, an engagement event, and get their grain right. I would take the metrics that cause the most arguments in leadership reviews and give each one a single governed definition with a named owner. I would put the features the first model will want into the model itself, not into a notebook that only the data scientist can run. None of that is AI work. All of it is what decides whether the AI works.

Then the first use case is a few weeks of thin work on a foundation that already holds, instead of six months of rebuilding that foundation badly under a deadline that assumed it was already there. The unglamorous quarter is the AI strategy. The model is the part you can almost outsource.

This is not an argument that AI is easy or that models do not matter. It is an argument about where the difficulty actually lives for most organisations, and therefore where the money and the attention should go. Spend against the difficulty, not against the demo.

## One MENA-flavored note

The clearest version of this I have seen is in Arabic-language streaming. A voice-of-customer system that answers content teams' questions about social feedback looks like an AI product: natural-language queries, sentiment, an agent routing between them. The actual work is structural and entirely upstream. Half the comments are in Arabic, so translation is not a feature, it is a load-bearing stage the whole system stands on. Feedback arrives on four platforms in four schemas with no shared link back to a title, so the join that maps a comment to the content it is about is the thing everything else depends on. And engagement has to carry the region's release rhythm, the pre-Ramadan, in-Ramadan, and post-Ramadan windows that make a flat monthly average meaningless, or the agent answers correctly against a number that means nothing.

Strip the AI off the top of that system and what remains is a data model that took real work. Strip the data model out from under the AI and what remains is a confident liar.

## Closing

Before the next AI roadmap, one question is worth asking out loud in the room: if we deleted the word "AI" from this plan, what would be left?

If the answer is a serious, funded, owned data-modeling program, the strategy is real, and the AI will look easy when it arrives, because the hard part will already be done. If the answer is a demo and a vendor, the costume is the strategy. The data model will get built anyway. It will just get built later, in a panic, by the team currently being asked why the AI does not work.
