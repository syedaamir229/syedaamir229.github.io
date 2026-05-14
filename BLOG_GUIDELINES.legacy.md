# Blog Guidelines (Legacy)

> **This document is superseded by [`BLOG_VOICE.md`](./BLOG_VOICE.md) as of Phase 3 (2026-05-15).**
>
> The current spec for voice, structure, image generation, frontmatter, LinkedIn excerpts, and the pre-publication checklist lives in `BLOG_VOICE.md`. The strict audit of all 15 migrated posts against the new voice doc lives in `BLOG_AUDIT.md`. The content pillars, distribution plan, rewrite workflow, and blog agent plan live in `BLOG_STRATEGY.md`.
>
> This file is retained as historical context only. Do not use it as the spec for new posts.

---

Voice and structure guidelines for the Syed Aamir portfolio blog. These guidelines are designed for both human and agent-driven content creation.

## Voice: Thought Leadership

All posts use one consistent voice: thought-leadership framing with varying technical depth. No separate "tutorial" and "opinion" categories. The difference between a lighter and deeper post is how far into architecture details it goes, not the voice.

### What this voice sounds like

- Authoritative but grounded: you've built this, you know where it breaks
- Specific: real tools, real companies (anonymized if needed), real numbers
- Opinionated: bold claims backed by delivery experience
- Business-impact framing: why it matters to the org, not just how it works
- Conversational but not casual: no filler, no hedging, no "in this blog post I will discuss"

### What this voice does NOT sound like

- Tutorial: "Step 1: Open Databricks. Step 2: Create a notebook."
- Documentation: tables of config options, exhaustive parameter lists
- Safe: "many teams struggle with this" (say WHO and WHY instead)
- Marketing: "revolutionary," "game-changing," "cutting-edge"

## Post Structure

Every post follows this template:

### 1. Hook (first 3 paragraphs)
Open with a vivid, relatable scenario. Not an abstract problem statement. Paint a scene the reader has lived.

**Good:** "Last quarter, a CRM manager showed me her Slack thread. Fourteen messages. Four people tagged. All to answer one question: 'Can we re-target subscribers who started Demon Slayer but dropped off after episode 3?'"

**Bad:** "Many organizations face challenges when it comes to CRM audience targeting."

### 2. Bold Thesis (paragraph 4)
State your actual opinion. A claim with teeth that someone could disagree with.

**Good:** "The CRM automation demo is the easy 5%. The other 95% is the data model nobody wants to build."

**Bad:** "CRM automation can be very beneficial when implemented correctly."

### 3. Context: "Why this matters now"
Industry trends, market forces, technology shifts that make this topic urgent. Name specific tools, companies, or movements.

### 4. Framework (body)
Present a named model with 3-6 components. Not a step-by-step tutorial, but an architecture or decision framework.

Give the framework a memorable name: "The Governed Metrics Stack," "The Four-Layer Automation Architecture," "The Six-Phase Data Maturity Curve."

Each component gets:
- What it is (1-2 sentences)
- Why it matters (business impact)
- What goes wrong without it (concrete failure mode)
- Optionally: specific tools or patterns

### 5. Prioritization: "What I'd actually do first"
After presenting the framework, tell the reader where to start and why. This is the section that gets bookmarked.

### 6. Close: Provocative Question
End with a question that invites engagement. Not "thanks for reading" but something that challenges the reader's current approach.

**Good:** "Your semantic layer is either a strategic asset or a maintenance liability. Which one is yours?"

**Bad:** "I hope you found this useful. Feel free to reach out with questions."

## Frontmatter Schema

```yaml
---
title: "Clear, specific, opinionated title"
date: YYYY-MM-DD
description: "One-sentence summary that would work as a LinkedIn preview"
categories: ["One Category"]
tags: ["Tag1", "Tag2", "Tag3"]
featured: false
draft: false
---
```

### Categories (pick one)
- Data Engineering
- BI & Analytics
- Data Science
- AI & Automation
- Data Governance
- Career

### Tags
Free-form. Use specific technologies, concepts, or themes. Examples: Databricks, Power BI, Semantic Layer, DAX, NLP, CRM Automation, GenAI, Arabic NLP, Delta Lake.

## Depth Levels

The same topic can be written at two depths within the thought-leadership voice:

**Strategic depth:** "Why most semantic layers fail, and the architecture that doesn't." Names the problem, presents a framework, gives prioritization advice. ~1,500 words.

**Technical depth:** Same framing, but includes specific DAX patterns, medallion layer decisions, refresh orchestration details within the framework sections. ~2,500-3,500 words.

Both are thought leadership. Both open with a hook and close with a question. The difference is granularity, not voice.

## Domain Context

The author works at an OTT streaming platform focused on Arabic content. When examples or scenarios are needed, prefer domain-relevant contexts: episodes, series, subtitles, subscriptions, playback, content metadata, viewing behavior, ad delivery, MENA market dynamics.

## Style Rules

- No em-dashes. Use colons, periods, or restructure the sentence.
- No filler words: "basically," "essentially," "it's worth noting that"
- Short paragraphs (2-4 sentences max)
- Use italics for emphasis on key terms
- Bold for framework component names and key claims
- No emoji
