---
title: "What Ships a RAG System: The Four-Check Verification Layer"
date: 2026-07-01
description: "Building a RAG system is the demo. What ships it is the verification layer: four checks that decide whether to trust each answer when no one is watching."
og_title: "The Checks Every RAG Demo Skips"
categories: ["AI & Automation", "Data Engineering"]
draft: false
---

The first time my document assistant answered a real question and showed the exact passage behind it, I thought the hard part was behind me. You ask in plain English, you get an answer, you see the source it came from. That is the whole promise of retrieval-augmented generation, and on a clean demo it lands every time. The model reads your documents instead of guessing from memory, and the answer arrives with a citation you can open and check. It looks done.

Then I read how [DoorDash built the RAG system](https://careersatdoordash.com/blog/large-language-modules-based-dasher-support-automation/) behind their support automation, and it changed what I thought I had finished. The retrieval and the answer, the part I had been calling the system, was really only the first draft. Everything that made it safe to put in front of a real customer came after it: reading the answer back, catching what was wrong in it, and deciding whether it could be trusted at all. That was the harder half of the job, and I had been treating it as an afterthought.

Standing up a RAG pipeline is easy now. A vector database, an embedding model, a decent language model and you have something that answers. The part nobody hands you is what happens after: the check that decides whether to trust the answer when no one is reading it. That is most of the work, and it is the part the demos skip. A production RAG system is either one you have to watch, or one you can trust to answer when you have stopped checking.

## The editor you just deleted

Retrieval is sold as the fix for hallucination. It is a reduction, not a cure. The model can still ignore the passage you handed it and answer from training-data memory instead, with exactly the same confidence whether it read your document or invented the line. Grounding the model in real sources narrows the distance between confident and correct. It never fully closes it. Retrieval keeps getting better at narrowing it: the newer systems match on exact words and on meaning at once (hybrid search), and let the model run its own retrieval in a loop when the first pass falls short (agentic RAG). But more retrieval steps mean more places to go wrong, and at the end of every one the model still hands back a single answer that either holds up against its sources or not.

While you are building it, you are the editor. You read the answers it gives, you catch the ones that are wrong, and you fix them before anyone else sees them. That only works because you are reading every answer. The moment the system goes live and answers customers on its own, nobody is reading, and the wrong answer you would have caught in testing goes straight to the customer instead, thousands of times a day. **The day you let it answer on its own is the day you removed the last person who read the answer before a customer did.**

## The Verification Layer

The Verification Layer is four layers deep, and each of those runs at different moments, each answering a narrower question than the one before. That is the shape DoorDash landed on, and these are the difference between a demo that answers and a system you can leave alone.

![Diagram of the Verification Layer that follows a RAG generation step: every answer passes a cheap real-time grounding gate, the answers it is unsure about escalate to a slower second-opinion check, a sampled offline judge rereads past conversations to catch drift, and a pre-deploy simulation rehearses many synthetic conversations before a release ships.](/assets/blog/rag-verification-layer-checks.svg)

*The model's answer is only the first draft: four checks, each running at a different time, are what make a RAG system safe to ship.*

### The cheap gate every answer passes through

The first check runs on every single answer, in real time, and it has to be cheap enough that it can. Before the answer reaches the customer, something fast checks each claim against the passages that were actually retrieved and flags the ones with nothing behind them, the places where the model wandered off the source and started making things up. It stays cheap by never asking whether the answer is right, only whether the passages in hand support it.

Of the four, this is the one I have actually built, in Document Copilot, a document assistant I made over a public set of financial filings. There the support check is a rule in the code itself. An answer that leans on a passage the system never retrieved is refused rather than smoothed over. What I had not understood until I saw the DoorDash article is that this gate is the first check of four, not the finish line. **A refusal is the system catching its own bad line before the reader ever sees it.**

### The second opinion the doubtful answers get

A cheap gate is fast and a little dumb. It catches the obvious misses, waves through the obvious passes, and leaves a pile of answers in the middle that it is not sure about. Run your most thorough check on every one of those and the cost is brutal, because the thorough check is a full model call reasoning over the whole exchange.

So the good systems don't. They escalate. The cheap gate handles the volume, and only the answers it flags as doubtful get the slow, expensive second read that weighs grounding, coherence, and whether the answer broke a policy. You spend the expensive judgment where the cheap one hesitated, and nowhere else. **At real volume you cannot afford to read every answer twice, so you build something cheap to decide which answers earn the second read.**

### The editor who rereads what already shipped

The first two checks live in the moment, deciding one answer at a time while the customer waits. They are blind to the thing that kills these systems slowly: drift. An answer can clear every real-time gate and still be part of a pattern that is quietly getting worse, the language sliding, a whole category of question that the system has started handling badly.

The third check runs offline, after the fact, on a sample of conversations that already happened. A separate model rereads yesterday's exchanges and scores them across a handful of dimensions: was the right thing retrieved, was the answer accurate, did it stay on topic, did it hold together. Nobody is waiting on the result. The single bad answer in flight was the real-time gate's job. This check is looking for the trend before it becomes the norm. **A check that reads one answer at a time can pass every one of them and still miss the system slowly getting worse.**

### The read-through before it goes out

The first three checks all read answers the system has already given. The fourth refuses to wait for real customers to surface the problems. Before a change ships, the new version runs against [hundreds of simulated conversations](https://careersatdoordash.com/blog/doordash-simulation-evaluation-flywheel-to-develop-llm-chatbots-at-scale/), with another model standing in for the reader: asking, pushing back, getting confused, escalating the way real people do. DoorDash built a dedicated simulator for exactly this, spinning those conversations out of past transcripts so a new release meets a crowd of synthetic customers before it meets a real one.

You are using hundreds of synthetic conversations to surface the few ways the new version got better or worse before a single real user asks a question. It is the full read-through before the piece goes out, the last chance to catch what every line edit missed. **The conversation that breaks the system is the one nobody thinks to put in a demo, and the simulation is there to find it before a real customer does.**

## The verifier answers an easier question

It is easy to look at four checks stacked on top of the model and assume verification has to be more sophisticated than generation. It is the opposite.

Writing the answer is the hard, open-ended task. It has to read the question, search the documents, and compose something useful from what comes back. Checking it is narrower. The cheap gate does not need to know the right answer, only whether this one is supported by the passages in hand. The escalation does not write a better reply, it judges the reply already written. None of the verifiers has to solve the generator's whole problem. Each one only has to answer a smaller question than the one the model just answered, which is what makes it affordable even at scale.

**An editor does not have to be a better writer than the author to catch the sentence that is wrong.** It is a lower bar and a lower cost, and it is what lets you put a check on every answer.

## Where I would start

If you are adding verification to a RAG system that has none, do not start by buying an evaluation platform or wiring up a judge for every dimension you can name. Start with the cheap gate, because it is the one you can build this week and the one that changes the system's character the most. The moment an answer can be refused for lack of support instead of waved through, **you have gone from a system that always says something to a system that only says what it can back up.**

Add the offline judge once you have real traffic because that is when drift becomes the risk and you finally have a sample of real conversations worth reading. The escalation tier earns its place when the cheap gate is flagging too many borderline answers to ignore and too many to check by hand. The simulation comes last, when a wrong answer costs enough that you need to catch the regressions in QA instead of in production.

The order is not arbitrary. Build the check that runs on every answer first, then the ones that run on some answers, then the one that runs before any answer is real. Each step buys you a kind of trust the last one could not, and you add it in the order the risk actually arrives.

## Can you trust your system's answer?

Anyone can build the part that answers now. The model writes a clean answer on the first afternoon, and in a demo that is the whole show. The harder question is the one you only face later, when an answer is wrong and nobody is reading it. What catches it before it reaches the customer? That checking is what separates a demo from a system you can leave running without any human in the loop.
