---
title: "Context Engineering Is Data Modeling"
date: 2026-07-23
description: "Everyone says working with AI needs a new skill. It is really data modeling, pointed at a model instead of a dashboard. If you know data, you are not behind."
og_title: "The Prompt Was Never the Problem"
categories: ["Data Engineering", "AI & Automation"]
draft: false
---

Databricks lets you build apps. For someone who lives on the Python and data side, this is a real shift as you can put a proper interface on your work instead of handing people a notebook or a dashboard. I could have kept it simple with Streamlit, but I wanted it to look polished, so I reached for React, which is not something I am comfortable with. So I did what a lot of people are now doing. I "vibe coded" it.

That is where the problem showed up. The agent kept rebuilding pieces the project already had instead of using what was there. I could not fix the code myself, so I kept rewording the prompt, and it took me nowhere. It looked like the agent was ignoring every instruction I was giving it. But in reality, it just could not see the pieces I was pointing at, so it filled the gap on its own.

What fixed it was writing down a set of rules for the agent to follow, and putting them where it would read them before it started. The next time I asked it for something, it just did it. The model hadn't changed. It finally had the context for what I was trying to build.

It works the same way with a new hire. You would not just tell them to use what's already there. You would show them where things live on day one. A model needs the same thing from us.

This is what [context engineering](https://addyosmani.com/blog/new-sdlc-vibe-coding/) means. What an AI builds depends less on how cleverly you prompt it, and more on the quality of the context you hand it. It is a good and honest frame, and it describes something data people have been doing all along, just under a different name.

That different name is data modeling, but pointed at a model instead of a dashboard. If you already know how to model data, you are not behind on this. You are early.

## Everyone is fixing the wrong thing

It was not just me. Right now the whole conversation is pointed at the prompt. There are threads, courses, and job posts built around wording, the perfect phrasing that gets the model to behave. When an answer comes back wrong, the reflex is to reword the prompt or reach for a newer model. Both are the same reflex. You are sharpening the instruction when the problem is what the model is allowed to see.

**A model with the wrong context will not be saved by better wording, any more than a new hire pointed at the wrong folder is saved by a firmer email.** The context is where it is won or lost, and context is a modeling problem. Deciding what an AI should have in front of it, from where, and in how much detail, is the same work as deciding what goes into a data model and what gets left to look up later. Same questions. Different consumer.

## What it sees on day one, and what it looks up later

Context splits two ways. Static context is always loaded, the rules and definitions that hold every time. Dynamic context is what gets pulled in on demand for the task at hand. That split is a real engineering decision, something you version and review like any other rule you rely on.

That decision is the oldest one in data modeling. You are always choosing what to materialize and govern up front, against what to leave derived and compute when a question needs it. Put too much in the always-there layer and it goes stale and bloated, and every query drags it around. Put too little and every consumer rebuilds the same thing five slightly different ways. **"What does it need up front, and what can it fetch when the moment comes" is the question that decides whether a data model ages well or rots.** The AI just gave that question a new place to live.

## The contradiction is yours, not the model's

Hand a model context from two places that contradict each other and you get confident nonsense, delivered in a way that is hard to trace back. A data person has met this many times, just without a model on the end of it: two systems that never agreed on the same number, and every answer built on top only as good as whichever one it read. You do not fix that by arguing harder. You fix it by agreeing on one source of truth and making everything read from it.

Context works the same way. If your agent is reading a stale doc next to a fresh one, or two definitions of the same term, that is not the model being dumb. You handed it a contradiction and asked it to sound certain. **When an agent reads two sources that disagree, the problem is not the prompt. It is governance, and data teams are the ones who already know how to fix it.**

## Most of the answer is decided before you type

A lot of what a model can answer is settled long before anyone types a prompt, in how the context was prepared. When I built a document assistant (a RAG system), the questions people cared about were about numbers, and the numbers lived in tables. Split a document the naive way and a table comes apart into rows that mean nothing on their own, so the assistant could not answer the questions that mattered most. The fix was done upstream, to keep each table together as one object, so when the model reaches for it, the whole thing comes back. The prompt on top was almost an afterthought. Whether it could answer at all was decided in the prep.

The same care goes into deciding how much to hand it at once. Give an agent one giant instruction file and you often get a worse result, not a better one. A model drowns in context the same way a person does. Hand it everything and the part that matters gets buried; hand it too little and it guesses. So you keep it scoped: the notes for one kind of work sit with that work, and the agent picks up only what the task in front of it needs. **Deciding what the agent sees at each step is a judgment call, the same one that separates a data model people trust from a spreadsheet nobody governs.**

## Build the context, not the prompt

If I were setting up an AI to do real work, I would treat the context like something you design and keep, the way you would a data model, not a prompt you tweak until it behaves. Name the one source of truth it reads from. Decide what it always sees and what it fetches on demand. Prepare the material so what it needs is actually reachable. **Every one of those is data work you already know how to do, and not one of them is a prompt.**

## The skill was never new

What I keep coming back to is how little of this is actually new. When I first started using coding agents seriously, I assumed the thing I was missing was some knack for prompting, a way of talking to the model that people who were good at this had worked out. It turned out I was chasing the wrong skill. **They were better at deciding what the model should see.** That is a data skill. It is the same instinct as knowing what belongs in a table and what does not, what a consumer needs in front of them and what they can go and find for themselves.

The word I keep reaching for is onboarding. There are no magic words. You are working out what a new team member would need to know to do the job, and how to put it in front of them so they can actually use it.

## Prompting, or onboarding?

So here is the question worth sitting with. When your AI gets something wrong, do you reach for a better prompt, or do you ask what it was allowed to see? One of those is you sharpening a sentence at a machine that cannot read your mind. The other is the job you may already know how to do: deciding what belongs in front of it, and where the truth lives. **You are not prompting the model. You are onboarding it.** You are doing it the same way you would onboard anyone you needed to trust with real work. And if you have ever built a data model that outlived the project it was made for, you have written that onboarding doc before.
