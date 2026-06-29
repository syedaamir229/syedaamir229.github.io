---
title: "What Your AI Leans On: The Data & AI Maturity Ladder"
date: 2026-07-01
description: "Your real AI maturity isn't the highest rung you can reach, it's the highest rung your data can hold. A five-rung ladder, and the wall it leans on."
og_title: "Your AI's Ceiling Is Your Data"
categories: ["AI & Automation", "Data Engineering"]
draft: false
---

More than once I have watched the same kind of AI project win the room in a demo and quietly disappear a few months later. The demo is clean. Someone asks a question, the system answers, the room cheers, the budget gets approved. Then the thing meets real work, the answers stop being trustworthy, and one day someone just switches it off. My first instinct was that the gap was a modeling problem, that the demo version just needed a better prompt or a stronger model to hold up in production.

It isn't. The model was rarely the part that failed.

A while back I came across Dan Martell's [AI Adoption Ladder](https://x.com/danmartell/status/2027111498691043335), and it lined up almost exactly with what I keep running into in my own work. His point is that the difference between businesses is not who has access to AI, since everyone does now, but how deeply they have woven it into how they actually work. He lays it out as five levels, from the occasional chat at the bottom to custom systems running the business at the top. It is a clean way to see the climb, and it changed how I judge where a business actually is.

But the more I sat with it, the more I noticed what the ladder doesn't show you. A ladder on its own does not stand. It leans on something. And every rung of an AI climb leans on the same thing the picture leaves out: your data. That is the part I keep running into.

Your real AI maturity isn't the highest rung you can reach. It's the highest rung your data can hold.

## Why this matters now

A ladder reaches only as high as the wall it leans on. Prop one against a tall wall and you can climb all the way up. Prop the same ladder against a wall half its height and the top half has nothing behind it, so the moment you climb past where the wall stops, you fall. The wall is your data. The height you are reaching for is the AI. Most of the falls I have seen were not people reaching too high. They were people reaching past where their wall stopped.

This used to be a slower, quieter problem. Weak data gave you a wrong number in a report, and usually someone caught it before it mattered. Now that same weak data feeds an AI that acts on the wrong number, at speed and with total confidence, and the demo that looked flawless turns into a system nobody trusts. The AI I have watched fail in production was almost always sitting on data that could not hold it up. **AI did not remove the need for solid data. It raised the price of not having it.**

One reason people give for AI stalling is that the systems do not really learn. They answer once and never get better. That is true of most of them. But underneath it is a simpler problem: a system can only learn from data that is actually there. The reason so much AI cannot improve is not just the cleverness of the model. It is that there is nothing solid enough behind it to learn from. The learning problem leans on a data problem.

## The Data & AI Maturity Ladder

So here is the ladder with the wall behind it: five rungs, and the data each one needs to hold your weight. This is one project at a time, not the whole company. The same business can have a wall tall enough for a scoring model on clean transaction data and far too short for an assistant over a pile of messy documents. You don't get one wall. You get one for everything you try to build.

### Rung 1: chatting, and keeping nothing

You have crossed onto the first rung the moment you use AI for the occasional one-off task. You paste a spreadsheet into a chat window and ask it to summarize the quarter, or to draft an email, or to clean up a list. It is genuinely useful, and most businesses are right here.

There is no wall to speak of at this rung, because you are carrying the data in by hand every time. Nothing is connected, nothing is kept, and nothing gets easier next week. **Rung 1 is real work, but none of it carries over.** Every answer starts from zero, and the moment you close the window, the value is gone.

### Rung 2: the first thing that runs without you

You step onto the second rung when the same task starts running without you starting it. A job that summarizes last week's customer feedback every Monday. A step that tags incoming support tickets by topic before anyone reads them. It is small, but it is the first time AI is doing repeatable work on its own.

This is where the wall first appears, and it is a modest one. Not a grand architecture, just one source that stays put, keeps the same shape, and is there every time the job runs. **The first wall you ever need is one source you can count on.** Get that, and the work runs whether you are looking or not.

### Rung 3: the tool people stop double-checking

The third rung is the one that matters most, and it is where the wall starts to hold real weight. You are on it when people open something every day and act on what it tells them without quietly re-checking it first. A dashboard the team actually trusts. An assistant that answers questions over your own documents.

The wall this rung needs is a real one. A governed, defined, queryable source the tool reads from. I built one of these myself, a document assistant that answers questions over a set of public financial filings and shows the exact passage behind every answer, and refuses when the documents do not actually support a claim. Two things keep it honest, and it is worth not mixing them up. The refusal is a rule written in code: a validator checks that every answer is backed by a passage the system actually retrieved, and when it cannot ground a claim it says so instead of inventing one. That part lives in the application, not the data.

What that rule cannot do is make the tool useful. Whether it can answer the question that matters is decided upstream, in the documents themselves: how they were parsed, split, and indexed, and whether a table was kept whole or shredded into loose words on the way in. Break the table going in and the figure someone needs never comes back, the validator refuses exactly as designed, and the tool is still useless for that question. The validator held. The data didn't.

**Code can keep a tool from lying. Only the data can let it answer.**

### Rung 4: the AI no one opens an app for

By the fourth rung, nobody is opening an app at all. The AI is inside the systems, acting on things before a human sees them. Every new account is scored for churn risk and routed by a model on its own, so the work is done before a human looks at it.

The wall here is no longer one feed. It is clean, connected pipelines across more than one system, definitions everyone agrees on, and a trusted place for the AI's own output to live so the next system can rely on it. If your billing system still counts a subscriber as active while your product data has already given up on them, every automation on top inherits the disagreement. The win-back message goes to someone who never left. **By rung 4 nobody is checking, so a disagreement between two systems becomes a wrong move, made automatically.**

### Rung 5: the system that learns on its own

The top rung is the one everybody points at and almost nobody reaches. Here the AI is not just acting, it is learning, making decisions on the edge that only you have and getting sharper from how those decisions turn out. Picture a system that decides on its own which customers to reach and how, and gets sharper with every pass from who actually stayed. The edge it works on is the data and outcomes a competitor cannot simply go and buy.

A handful of companies are genuinely here. Most that think they are, are not, and that is the point. The wall this rung needs is the tallest of all: not just clean pipelines, but a kept record of what happened and a working loop that feeds real outcomes back as something the system can learn from. You cannot learn from outcomes you never kept. The reason rung 5 is so rare is not that the models are not ready. **Rung 5 is rare because almost no one's wall is tall enough to hold it.**

## The rung you can actually stand on

Once you see both, the real question is simple. It is not how high a business is aiming. Plenty of companies aim at rung 4 with a rung-2 wall. On paper it looks advanced. In practice it is a long way to fall.

That gap, between the rung a business wants and the rung its data can hold, is where the real work lives. And the payoff is bigger than it looks: **climbing one rung on a wall that holds is the difference between the tool everyone abandons after a week and the one the team cannot work without.**

## Where I would start

If I were starting fresh, I would resist the urge to climb. The instinct is always to reach for the top rung, because that is the one that looks impressive in a demo. The teams I have seen do well went the other way. They found the highest rung their data could already hold, which is usually lower than they hoped, and they raised the wall first, then climbed one rung.

In practice that means picking a single thing you want AI to do, being honest about the rung it really needs, and asking whether the data behind it can hold that weight. If it cannot, the project is not an AI project yet. It is a data project, and pretending otherwise is how you end up with another flawless demo and another quiet shutdown. **Build the wall to the next rung before you climb to it.** The climb is cheap once the wall is there. It is the wall that takes the time, and the wall is the part that lasts.

## The part I am most sure of

The decade I have behind me is in data, not in AI. AI is the recent part, and it is what brought the point into focus. Up close, the model is rarely where things break. The systems that work were leaning on a wall someone had already built tall and kept standing, often long before there was an AI reason to. The AI did not earn that wall. It inherited it.

## So which rung are you really on?

The one your demos can reach, or the one your data can hold? They are rarely the same rung. The businesses that climb keep the two honest: raise the wall first, reach only as high as it holds, and what they build stays up. A demo can reach anywhere. A production build reaches only as high as the wall it leans on.