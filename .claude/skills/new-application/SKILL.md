---
name: new-application
description: Use when the user wants to draft CV and cover letter for a new job application. Triggers on phrases like "apply to X", "new application", "draft a cover letter for", "I'm applying for". Scaffolds an application folder in ~/personal/kyleshepherd-applications, drafts notes from the JD, tailors the CV, drafts a role-specific cover letter, and renders both to PDF.
---

# New Job Application

End-to-end workflow for drafting a tailored CV and cover letter from a job description. Driven from this repo (`kyleshepherd.co.uk`); writes output into the separate private applications repo at `~/personal/kyleshepherd-applications`.

## Inputs to gather

In one batched question, ask for:

1. **Company name** — required.
2. **Role title** — exact title from the JD.
3. **Job description** — paste, file path, or URL. If URL, fetch the page text with WebFetch.
4. **Deadline** — optional, capture if mentioned.

Do not proceed without the JD; the whole point is to ground the materials in real context.

## Steps

### 1. Scaffold the application folder

Derive a slug: `YYYY-MM-<company-slug>-<role-keyword>`. Examples: `2026-05-stripe-expansion`, `2026-06-anthropic-frontend`.

```sh
pnpm cv:new ~/personal/kyleshepherd-applications/<slug>
```

This copies `cv.md` and `cover-letter.md` from `cv/templates/`. The script refuses to overwrite existing files, so if the folder already exists, ask the user how to proceed.

### 2. Draft `notes.md` in the new folder

Create `~/personal/kyleshepherd-applications/<slug>/notes.md` with this structure:

```markdown
# <Company> — <Role>

- **Source:** <URL or "pasted">
- **Applied:** <today's date YYYY-MM-DD>
- **Deadline:** <if known, else "—">

## Job description (verbatim)

<full JD text — paste exactly>

## Key hooks

- **<Hook 1 from JD>** → maps to <Kyle's experience: project, role, or skill>
- **<Hook 2>** → maps to <…>
- …

## What I emphasized

- <The 2–4 hooks the cover letter draws on, for interview prep.>
```

Capture the JD verbatim so link rotting doesn't matter later.

### 3. Tailor `cv.md`

Light touch. The CV is mostly stable across applications. Make these edits only:

- Update `role:` frontmatter to match the company's title for the position (e.g. "Senior Fullstack Engineer" for Stripe, "Senior Software Engineer" elsewhere). Only change if the JD uses a different phrasing than the default.
- Optionally reorder `skills` to lead with the most relevant 3–4 for this role.
- Do **not** touch experience, education, achievements, hobbies, or socials.

### 4. Draft `cover-letter.md`

Replace the body with a role-specific letter. Use these guidelines:

- **Voice:** match Kyle's existing cover letter style — concrete, calm, slightly informal. Look at the master template for structure and reference past committed applications in `~/personal/kyleshepherd-applications/*/cover-letter.md` if any exist.
- **Structure:** 5–7 paragraphs.
  - **Paragraph 1**: opening — excited to apply, brief positioning.
  - **Paragraph 2**: experience summary (clients, tech).
  - **Paragraph 3**: current role at Kitt, framed to map to the JD.
  - **Paragraphs 4–5**: tailored — pull 2–3 hooks from `notes.md` and connect them to specific experience. Reference projects from `src/content/projects/*.md` for concrete evidence when relevant.
  - **Penultimate**: a side project paragraph (Checkpnt is the default; swap in Tarkov TK or Planning Poker tools if more relevant to the role).
  - **Closing**: why this company specifically, what you'd love to contribute, polite sign-off.
- **Frontmatter:** update `recipient`, `salutation` (e.g. "Dear Stripe Hiring Team,"), and `role` (the company's title).

### 5. Show drafts for review

Before rendering, present three things to the user:

1. The drafted `notes.md` (full content).
2. The diff against the master `cv.md` (what changed and why).
3. The full new `cover-letter.md` body.

Ask whether to render or revise. Do not render without explicit approval.

### 6. Render

On approval, run:

```sh
pnpm cv:render --in ~/personal/kyleshepherd-applications/<slug>/cv.md
pnpm cv:render --in ~/personal/kyleshepherd-applications/<slug>/cover-letter.md
```

Confirm both PDFs were produced and report their paths.

### 7. Optional commit

Ask whether to commit in the applications repo:

```sh
cd ~/personal/kyleshepherd-applications && git add <slug>/ && git commit -m "feat: add <Company> <Role> application"
```

Do not auto-commit — wait for explicit user approval each time. Do not push without explicit approval either.

## What this skill does NOT do

- Does not push to GitHub (user does that manually when comfortable).
- Does not auto-submit applications.
- Does not modify `cv/templates/*` in this repo — those are the master templates and changes there belong in their own commit/conversation.
- Does not invent claims about Kyle's experience. If a JD hook has no honest match in his real work, say so rather than inventing.
