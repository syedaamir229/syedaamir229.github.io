---
title: "From BI to AI: The Four-Layer Compounding Stack"
date: 2026-06-24
description: "Most teams treat BI, analytics, data science, and AI as separate careers. The ones that compound treat them as one stack, where each layer builds on the last."
og_title: "AI Just Raised the Price of Bad Data"
categories: ["Data Engineering", "AI & Automation"]
draft: false
---

For a long time I thought the interesting work was always one desk over. I spent my early career building the part of data nobody gets excited about: the trustworthy tables and definitions that sit under a dashboard and make its numbers mean something. It felt like the boring part. The exciting work, the machine learning, the AI, seemed to live somewhere else, with people who had different titles. Then I worked on a machine learning project that turned out to be running on foundations I had built three years earlier, and it changed how I think about the whole thing. It taught me that a data team is either compounding everything it builds, or quietly starting over every couple of years.

It was a model that filled in a customer detail we were missing for most of our customers, by learning from how people behave. The textbook way to start something like that is from raw event data: you design the features from scratch as if nothing useful exists yet. But I wasn't starting from scratch. The features were already there, built and governed years earlier as part of a data model: account lifecycle, usage patterns, preferences, device patterns. And because those same tables already fed dashboards, the analytical work was done too. I didn't have to sit and figure out what each feature meant or how it behaved. I could already see it. I still had to shape the data so the model could use it properly, but I started from understanding, not from raw events.

The model shipped a few months later. A detail we could only act on for a fraction of customers became one we could use across nearly all of them. None of that was an AI breakthrough. It was a dividend on foundation work already done, back when it still felt like the boring part.

That is the whole idea in one line: a data team is either compounding its stack or starting over at every layer. When you start over, every new AI project spends months rebuilding the foundation underneath it, usually badly, and everything built on top inherits the mess. When you compound, the same foundation carries the dashboard, then the model, then the automation, and each new layer builds on what is already there instead of fighting it. You don't get there by hiring an AI team or buying another tool. You get there by treating these as one connected stack, where each layer builds on the one below.

## Why this matters now

This argument is sharper today than it would have been a few years ago. Back then, a shaky foundation gave you a wrong number on a dashboard. Annoying, but someone usually caught it before it mattered. Now that same shaky foundation feeds an AI that acts on the wrong number, at scale and with full confidence, and often nobody catches it until the damage is done. The foundation always mattered. **AI just raised the price of getting it wrong.**

On the ground, the AI that actually ships is sitting on a well-governed data foundation. Everyone else is busy giving their models more context, when the most useful context you can hand one is a business whose own numbers already agree. That is not a prompt or a model choice. That is the foundation.

## The four floors

So what does a compounding stack actually look like? I think of it as a building. You don't build the top floor first, however good it looks from the street.

### Floor 1: the tables everyone trusts

This is the layer everything else trusts: the core tables the whole business agrees are the truth, with their structure and history set right the first time. The part of the job nobody brags about.

Everything above it is a consumer. The dashboards read these tables. The models read the same tables. The automation reads them too. Get the foundation right and everything above it is far cheaper to build. Get it wrong and each consumer quietly rebuilds it, slightly differently, and now every team has its own version of the truth and a meeting to decide which one is real. **That meeting, the one where a model says 15,000 and a dashboard says 12,000 and nobody can say which to trust, is what a missing foundation feels like.**

### Floor 2: the definitions everyone shares

On top of the foundation sit the agreed definitions: what each number actually means, owned by the teams who know each part of the business best. This is where "revenue" or "active customer" stops meaning something different in every report.

It is also the layer AI quietly leans on. **If nobody can agree what "high-value customer" means, a model trained to predict it is solving a different problem for every team that asks, and getting all of them slightly wrong.** You won't see the drift until it ships. The clearest sign this layer is healthy is when a project a year later goes looking for the numbers it needs and finds them already defined, waiting.

### Floor 3: the models that reuse it all

This is where the dividend actually gets paid. The predictive models read the same tables as the dashboards. The work you did to shape the data for reporting is the work the model needs. Fix something in one place and it carries to the other. Add something for one and the other gets it for free.

The failure here is quiet and common: a separate model pipeline that rebuilds everything from raw data. It feels faster on day one. Then its numbers drift from the ones the business already uses, and a year later the model's answers can't be explained from the dashboards people rely on. **When the model's numbers stop matching the dashboards everyone already uses, the model is the one that gets quietly dropped.**

### Floor 4: the systems that act

The top floor: systems that act, not just report. A system that decides which customers should hear from you and reaches out on its own. A system that reads everything customers are saying across channels and answers questions about it in plain language.

Everyone wants to start here, because it is the part that looks impressive in a demo. The work underneath it never gets the same attention. But the hard part of automation was never the clever model at the end. **It is the trustworthy data and agreed numbers behind it.** When the floors below are solid, the automation on top is thin and almost boring. When they are not, it is a shortcut sitting on top of a mess: it works in the demo, and then one day it acts on its own, gets something visibly wrong.

## Where I would start

If you are starting fresh, every instinct will tell you to skip to the top floor. Resist it. The teams that skip find the bill a few months in, when the AI is giving confident answers that don't match a single dashboard, because nothing under it is agreed or governed.

**Build the foundation first.** In practice that means agreeing on the handful of tables the whole business will treat as the truth, getting their structure right, and keeping their history so you can always see how things changed. Add the agreed definitions the moment two or three painful numbers need one answer everyone accepts. The data science layer is where you go next, and if the first two floors are solid, most of the hard part is already behind you: the data a model needs is the data the dashboards already run on.

Automation goes on top, but only once the layers it leans on are actually there. If it just acts on the agreed numbers, it can sit straight on the foundation. The moment it acts on a prediction, it needs the data science layer underneath too. The one thing it can never sit on is data nobody has agreed on.

## One note from experience

I have built both kinds of stack, and the difference rarely came down to talent or budget. It came down to whether someone took the foundation seriously, years before anyone needed it to pay off. That is the part I didn't understand early on, when I thought the foundation was just the boring part. The teams living in the scramble are not worse engineers. They are just paying, over and over, for a foundation nobody had time to lay. Once I had seen the calm version up close, I stopped thinking of the foundation as the slow part you get through before the real work. It is the real work. Everything I have shipped that mattered was sitting on top of it.

## Is your stack compounding?

Or are you restarting every two years? The restarting teams have a tell: new tool, new vendor, new AI strategy every cycle, each one shipping a demo and stalling in production. The compounding teams are quieter about it. They take the foundation seriously, they let each layer build on the one below, and they keep the people who built the first floor close to the ones above it. The payoff takes years to show up, and when it does, you can't miss it. And if you spent those years thinking you were just doing the boring part, that is the day you find out the boring part was the foundation the whole building rose on.
