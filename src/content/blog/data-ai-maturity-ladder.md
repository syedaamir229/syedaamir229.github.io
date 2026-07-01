---
title: "What Your AI Leans On: The Data & AI Maturity Ladder"
date: 2026-07-22
description: "Your real AI maturity isn't the highest rung you can reach, it's the highest rung your data can hold. A five-rung ladder, and the wall it leans on."
og_title: "Your AI's Ceiling Is Your Data"
categories: ["AI & Automation", "Data Engineering"]
draft: true
---

More than once I have watched the same kind of AI project win the room in a demo. Someone asks a question, the system answers, the room cheers, the budget gets approved. Then it meets the real world, the answers stop being trustworthy, and one day someone just switches it off. My first instinct was that the gap was a modeling problem, that the demo version just needed a better prompt or a stronger model to hold up in production. The model was rarely the part that failed.

A while back I came across Dan Martell's [AI Adoption Ladder](https://x.com/danmartell/status/2027111498691043335), and it lined up almost exactly with what I keep running into in my own work. His point is that the difference between businesses is not who has access to AI, since everyone does now, but how deeply they have woven it into how they actually work. He lays it out as five levels, from the occasional chat at the bottom to custom systems running the business at the top. It is a clean way to see the climb, and it changed how I judge where a business actually is.

But the more I sat with it, the more I noticed what the ladder doesn't show you. A ladder on its own does not stand. It leans on something. And every rung of an AI climb leans on the same thing the picture leaves out: your data. That is what I was actually running into, every time I first assumed the problem was the model.

Your real AI maturity isn't the highest rung you can reach. It's the highest rung your data can hold.

## What got easier, and what didn't

A ladder reaches only as high as the wall it leans on. Prop one against a tall wall and you can climb all the way up. Prop the same ladder against a wall half its height and the top rungs have nothing behind them. The wall is your data. The height you are reaching for is the AI. Most of the falls I have seen were not people reaching too high. They were people reaching past where their wall stopped.

What changed recently is not the wall. It is how close the top of the ladder suddenly looks. A few years ago, anything on the upper rungs took a team and the better part of a year, so few people attempted it on a wall that could not hold them. Now a weekend with the right tools puts a convincing version of rung 4 in front of anyone, leaning on a wall that was never built for it. A demo asks almost nothing of the wall. Production asks for all of it, and that is where the gap shows: not as a wrong answer someone catches in time, but as a system that quietly loses trust. **The top of the ladder has never looked closer but the wall behind it did not get any taller.**

## The Data & AI Maturity Ladder

Here is the ladder with the wall behind it: five rungs, and the data each one needs to hold your weight. It can be evaluated one project at a time instead of doing it for the whole company because the same business can have a wall tall enough for a scoring model on clean transaction data and far too short for an assistant over a pile of messy documents. You get a separate wall for everything you try to build.

### Rung 1: one-off questions, nothing kept

You have crossed onto the first rung the moment you use AI for the occasional one-off task. You paste a spreadsheet into a chat window and ask it to summarize the quarter, or to draft an email, or to clean up a list. It is genuinely useful, and most businesses are right here.

There is no wall to speak of at this rung, because you are carrying the data in by hand every time. Nothing is connected, nothing is kept, and nothing gets easier next week. Rung 1 is real work, but none of it carries over. Every answer starts from zero, and the moment you close the window, the value is gone.

### Rung 2: the first thing that runs without you

You step onto the second rung when the same task starts running without you starting it: a job that summarizes last week's customer feedback every Monday, or a step that tags incoming support tickets by topic before anyone reads them. It is small, but it is the first time AI is doing repeatable work on its own.

This is where the wall first appears, and it is a modest one. Not a grand architecture, just one source that stays put, keeps the same shape, and is there every time the job runs. The first wall you ever need is one source you can count on. Get that, and the work runs whether you are looking or not.

### Rung 3: the tool people stop double-checking

The third rung is where the wall starts to hold real weight. You are on it when people open something every day and act on what it tells them without quietly re-checking it first: an assistant that answers questions over your own documents.

The wall this rung needs is a real one: a governed, defined, queryable source the tool reads from.

This rung is also where two problems start to look like one. You can write rules in code that keep a tool honest: a validator that refuses to answer unless it can point to where the answer came from. That part is engineering, and it holds. What it cannot do is make the source good enough to answer. Whether the tool can respond to the questions that actually matter was decided earlier, in how the data was prepared: whether documents were parsed cleanly, whether tables were kept intact or shredded into loose pieces on the way in. A validator with nothing solid to read refuses everything. The tool is honest and useless at the same time.

### Rung 4: the AI no one opens an app for

By the fourth rung, nobody is opening an app at all. The AI is inside the systems, acting on things before a human sees them. Every account is scored for churn risk and routed by a model on its own, so the work is done before a human looks at it.

The wall here is no longer one feed. It is clean, connected pipelines across more than one system, definitions everyone agrees on, and a trusted place for the AI's own output to live so the next system can rely on it. If your billing system still counts a subscriber as active while your product data has already given up on them, every automation on top inherits the disagreement. The win-back message goes to someone who never left. By rung 4 nobody is checking, so a disagreement between two systems becomes a wrong move, made automatically.

### Rung 5: the system that learns on its own

The top rung is the one everybody points at and almost nobody reaches. Here the AI is not just acting, it is learning. Picture a system that makes a call your best people used to make, on its own, sees how it turned out, and does a little better next time. What it learns from is data and outcomes a competitor cannot simply go and buy.

A handful of companies are genuinely there but most that claim to be are not. The wall this rung needs is the tallest of all: not just clean pipelines, but a kept record of what happened and a working loop that feeds real outcomes back as something the system can learn from. You cannot learn from outcomes you never kept. Rung 5 is rare because almost no one's wall is tall enough to hold it.

## The rung you can actually stand on

Once you see both, the mistake is easy to spot. It is never how high a business is aiming. Plenty of companies aim at rung 4 with a rung-2 wall. On paper it looks advanced. In practice it is a long way to fall.

That gap, between the rung a business wants and the rung its data can hold, is where the real work lives. And the payoff is bigger than it looks: climbing one rung on a wall that holds is the difference between the tool everyone abandons after a week and the one the team cannot work without.

## How I would climb it

If I were starting fresh, I would resist the urge to climb. The instinct is always to reach for the top rung, because that is the one that gets the budget approved. The teams I have seen do well went the other way. They found the highest rung their data could already hold, which is usually lower than they hoped, and they raised the wall first, then climbed one rung at a time.

In practice that means picking a single thing you want AI to do, being honest about the rung it really needs, and asking whether the data behind it can hold that weight. If it cannot, the project is not an AI project yet. It is a data project, and pretending otherwise is how you end up with another flawless demo and another quiet shutdown. Before you reach for a higher rung, find out which one your data can already hold. The climb is cheap once the wall is there. Building it is the slow part, and it is the part that lasts.

## The wall was there first

Up close, the model is rarely where things break. The systems that work were leaning on a wall someone had already built tall and kept standing, often long before there was an AI reason to. The AI did not earn that wall. It inherited it.

## Which rung are you really on?

The one your demos can reach, or the one your data can hold? They are rarely the same rung, and the distance between them is the most honest number you have about your own AI. Most people never measure it, because the demo rung feels so much better to report. A demo can reach any rung. A production system reaches only what your wall can hold today. The wall is yours to raise.