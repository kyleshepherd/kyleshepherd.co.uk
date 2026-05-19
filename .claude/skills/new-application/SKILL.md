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

### 2.5. Ask clarifying questions before drafting

This is a **required gate**. Before writing any cover letter prose or modifying the CV, look at the hooks captured in `notes.md` and ask the user about anything where:

- A hook from the JD has no obvious match in Kyle's CV / `src/content/projects/*.md`, and inventing detail would be the alternative.
- A hook has a *plausible but vague* match where you don't know the specifics (e.g. JD says "real-time collaborative editor"; Kyle has WebSocket Planning Poker — but you don't know if he wants to draw a parallel to editor work specifically, or stay general).
- The JD highlights a company/team detail (mission, recent launch, named team) you want to reference but don't know Kyle's actual feelings about.
- There's a specific story, metric, or example that would strengthen a paragraph but isn't on record anywhere.

Ask via AskUserQuestion when the choice is small/discrete (3–4 options); ask in plain text when open-ended (e.g. "Tell me about any Linear-API integrations you've shipped beyond the Planning Poker bot — features, scale, who used it"). Batch related questions so you ask once, not in a drip.

Do **not** proceed to drafting until the user has answered or explicitly said "skip — use what's on file." Anything left unanswered should be flagged in the draft (e.g. `[Kyle: confirm specifics]`) rather than invented.

### 3. Tailor `cv.md`

Light touch. The CV is mostly stable across applications. Make these edits only:

- Update `role:` frontmatter to match the company's title for the position (e.g. "Senior Fullstack Engineer" for Stripe, "Senior Software Engineer" elsewhere). Only change if the JD uses a different phrasing than the default.
- Optionally reorder `skills` to lead with the most relevant 3–4 for this role.
- Do **not** touch experience, education, achievements, hobbies, or socials.

### 4. Brief Kyle for the cover letter — do NOT draft prose

**Do not write the cover letter body.** Kyle writes his own cover letters; AI-drafted prose comes out generic and hollow even with good hooks (see [[cover-letters-human-authored]] in user memory). Instead, produce a structured *advisory brief* alongside the existing `cover-letter.md` so Kyle can write the prose himself with the relevant material in front of him.

Update `cover-letter.md` so:

- **Frontmatter is filled in correctly:** `recipient`, `salutation` (e.g. "Dear Linear Hiring Team,"), and `role` (Kyle's positioning, usually unchanged — only update if there's an obvious better match).
- **The body is replaced with a structured brief**, paragraph-by-paragraph. For each paragraph, give:
  - The *intent* of the paragraph (what it should communicate)
  - Specific *material* to consider weaving in — JD hooks, concrete experience to reference, the projects/companies that fit
  - Anything to avoid (e.g. "don't lean on X unless Kyle has a specific story")

Suggested brief structure (Kyle can rearrange):
1. **Opening** — what to communicate (excitement, positioning angle); any specific tie-in to the company worth mentioning up front.
2. **Experience summary** — which clients/tech to lead with given this role's tilt.
3. **Current role at Kitt** — which Kitt details map to the JD (specific feature, scope, scale).
4. **Tailored hooks** — for each of 2–3 strongest hooks from `notes.md`, the specific experience that backs it (project, role, story Kyle confirmed in clarifying questions).
5. **Side project** — which project (Checkpnt / Tarkov TK / Planning Poker / etc.) makes most sense and why.
6. **Closing** — what about this company specifically is worth saying genuinely; flag things *not* to say (e.g. avoid empty "real privilege" register).

Format the brief as markdown headings + bullets, not finished prose. Kyle writes the actual paragraphs.

### 5. Show research output, then hand over

Present three things to Kyle:

1. The drafted `notes.md` (full content) — JD verbatim, hooks, mapping.
2. The diff against the master `cv.md` — what changed and why (usually just `skills` reorder).
3. The cover letter **brief** (the structured advisory in `cover-letter.md`) — not prose, but the material Kyle has to work with.

Then stop and hand over. Kyle writes the cover letter prose himself. Do not draft it unless he explicitly asks.

### 6. Render (after Kyle writes the cover letter)

Once Kyle has written `cover-letter.md` and confirmed he's happy with both files, run:

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
