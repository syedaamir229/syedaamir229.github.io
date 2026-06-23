---
title: "Document Copilot: Grounded Document Intelligence"
description: "Ask a set of documents a question in plain English and get an answer grounded in the exact passages it cites, or an honest refusal when the documents do not support it."
category: "AI & Automation"
tags: ["FastAPI", "React", "Supabase", "OpenAI"]
featured: false
draft: false
kind: "personal"
metrics:
  - label: "Documents Ingested"
    value: "25"
  - label: "Indexed Passages"
    value: "19,826"
  - label: "Uncited Claims"
    value: "Zero"
  - label: "Question to Cited Answer"
    value: "Under a minute"
order: 6
---

## Challenge

Almost every team loses hours to reading before it can act. Contracts before a renewal call, policies before a compliance sign-off, research and reports before a recommendation. The reading is necessary, you cannot act on what you have not read, but it slows down every decision that follows.

I built Document Copilot to take that out of the way: point it at a set of documents, ask a question in plain English, and get an answer that shows the exact passage it came from. The hard part is not answering, it is answering in a way someone will act on. Pasting the documents into a general-purpose chatbot like ChatGPT looks easier, but two things break. The documents stop being yours to control: they get uploaded into someone else's product and sit in a chat history you do not own. And the answer comes from the model's general memory, not your documents, so it guesses confidently when it does not know. A confident wrong answer is worse than no answer.

- The reading does not scale: more documents and wider coverage just means more hours, and adding people only buys more of the same manual scan.
- The numbers people most want usually live in tables, and standard chunking shreds a table into disconnected fragments, so an assistant that cannot read a table cannot answer the questions that matter.
- "Trust" had to be concrete: every claim tied to a source passage, visible in one click, and an explicit refusal whenever the documents could not support the answer.

To prove it on something real and public, I loaded it with SEC annual reports from five large companies, but the same system works on any documents you give it.

## Demo

<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/fqIJTqflDAA?rel=0&modestbranding=1"
    title="Document Copilot demo video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

A short walkthrough of asking a question, opening the cited source passage, and seeing the assistant refuse an unsupported claim.

## Approach

Three calls carried the rest of the work.

The first was grounding: making sure every answer is backed by the documents it cites, not the model's memory. The cheap version is to tell the model to always cite and hope it complies, but a tool people act on cannot ship "usually grounded." So I made grounding a rule enforced in code, not a request in a prompt. The agent returns its answer as structured data: the text, the citations, and the passages each citation points at. A validator then checks that every citation maps to a passage that was actually retrieved for that request. If a citation points at anything that was not retrieved, the answer is rejected and the system tries again; if it still cannot ground the answer, it says the documents do not contain enough evidence instead of smoothing over the gap. The refusal is the feature. It is the line between a tool people trust and one they re-check by hand.

The second was retrieval. Pure semantic search is the default, but real documents are full of exact strings: defined terms, clause labels, product names, specific figures. Embeddings alone miss the person who types the precise term they are hunting for. So I ran hybrid retrieval: a vector search by meaning and a full-text search by keyword over the same passages, fused with reciprocal rank fusion. The database does the ranked retrieval it is good at, and the fusion policy stays in code where I can test it.

The third was ingestion, and tables were why it was hard. The number a person actually wants usually lives in a table, and splitting a document naively dissolves that table into a row of fragments that retrieve badly and read worse. So I pulled tables out as first-class objects during ingestion: each one is extracted, kept as structured data alongside its text, and stored in its own table so a citation that lands on a table row can show the whole table back, not a shattered piece of it.

Around those three decisions sat the build:

- An ingestion pipeline that parses each document into normalized text, splits it into passages, extracts tables as first-class structured rows, and embeds: a corpus of 25 documents became 19,826 retrieval-ready passages.
- An agent that can only retrieve through a fixed set of tools (PydanticAI), so it pulls from your documents instead of inventing its own queries.
- A streaming chat API that shows live progress (analyzing, searching, reading, verifying) and streams the answer with one citation event per source.
- Citation details saved onto each stored message, so a past conversation still shows the document, date, and page when you reopen it.
- A React app where each inline citation opens a source panel with the underlying passage, so verification is one click, not a new tab.
- Email sign-in, per-user chat history, and row-level scoping on every record, deployed end to end. The documents stay in their own system, and the trust layer is the foundation everything else is built on.

![The assistant's empty state: a sign-in-gated chat that opens with example questions over the loaded corpus.](/assets/projects/document-copilot-empty-state.png)

## Results & Impact

- Reading that used to mean opening a document and hunting for the relevant section compresses to a sourced answer in under a minute.
- Every answer carries a citation to the specific document and page, and every citation resolves to a passage the reader opens in one click. No claim stands without its source.
- When the documents cannot support a question, the system refuses and says so, instead of producing a confident, unverifiable answer.
- The full corpus is queryable in plain English across documents and years, it stays in a database you control, and swapping it re-points the same engine at a different domain.

![A cited answer with the source panel open: inline citation markers in the answer link to the panel on the right, which shows the exact extracted table the citation points to. Shown on the public SEC demo corpus.](/assets/projects/document-copilot-cited-answer.png)

A cited answer with the source panel open. Each marker resolves to its underlying passage, and when a citation lands on a table the whole extracted table comes back, not a fragment. Shown on the public SEC demo corpus the system was tested against.

![The assistant declining to over-claim: asked whether generative AI, then weather, drove Apple's margin gains, it answers no and grounds the refusal in what the filings actually say, with citations, rather than guessing.](/assets/projects/document-copilot-refusal.png)

The trust contract in action. Pushed to attribute Apple's margin gains to generative AI, and then to weather, the assistant declines to infer beyond the filings: it answers no and points to what the documents actually say, with citations, rather than guessing.

## Architecture

![Document Copilot shown as a numbered live sequence: a plain-English question is retrieved against an indexed store using hybrid meaning and keyword search, a language model drafts an answer from the best passages, and a grounding validator gates the result into either a cited answer or a refusal when the answer cannot be grounded; below, an ingestion pipeline parses, splits, embeds, and stores documents into the same indexed store the retrieval step reads from.](/assets/projects/document-copilot.svg)

The live path reads left to right. A question goes to the backend's agent, which runs hybrid retrieval, searching by meaning and by keyword and fusing the two rankings, against the indexed store. It hands the best passages to the language model to draft an answer, then puts that draft through the grounding validator. The validator is the gate: if every citation maps to a retrieved passage, the cited answer streams back; if not, it refuses rather than guess. Below, a one-time ingestion pipeline parses, splits, embeds, and stores documents into the same indexed store the retrieval step reads from, extracting tables as structured rows so a citation can show a whole table rather than a fragment.

<!-- DEMO VIDEO PLACEHOLDER (add after recording): a short walkthrough of asking a question, reading the cited answer, opening a source passage, and seeing the refusal.
     Paste the final URL here and surface it in the body or link it from the Architecture caption: https://... -->

## Tech Stack

- **Application**: React + TypeScript SPA (Vite), FastAPI backend, deployed end to end on Railway
- **Retrieval**: Supabase Postgres with pgvector (meaning) and full-text search (keyword), fused with reciprocal rank fusion
- **Agent**: PydanticAI agent with bounded retrieval tools and a code-level grounding check that refuses rather than guess
- **Storage & schema**: Supabase Postgres, SQLAlchemy models, Alembic migrations; tables extracted to their own structured store
- **Access management**: Supabase Auth (email), per-user chat history with row-level scoping
- **Model provider**: OpenAI (answer generation and embeddings)

## My Role

I built this end to end: the ingestion pipeline, the hybrid retriever and its fusion logic, the agent and its grounding validator, the streaming chat API, and the React client with click-to-verify source panels. I designed it from first principles, so the documents stay in their own system and the trust contract is enforced in code, not hoped for in a prompt. The demo corpus is public SEC filings, but nothing in the system is finance-specific. The pattern transfers to any team that answers questions from a fixed, authoritative set of documents and cannot afford an invented answer: legal, compliance, policy, support, internal knowledge bases. It earns its keep where citations and refusal matter more than fluency. Where the corpus is small or a wrong answer costs little, a simpler prompt-and-retrieve setup is enough and the grounding machinery is overhead.
