# CV & Cover Letter PDF Pipeline

## Overview

Replace Canva-based CV and cover letter with markdown source-of-truth in this repo, plus a small render pipeline that produces PDFs styled to match kyleshepherd.co.uk. Role-specific applications live in a separate private repo (`kyleshepherd-applications`) and call into this repo's render script. A local Claude skill (`new-application`) automates scaffolding and drafting new applications from a job description.

## Goals

- **Single source of truth in markdown** — both templates editable in any text editor, version-controlled, diffable
- **Brand-consistent PDFs** — same dark palette and typography as the website (PPEditorialOld / PPNeueMontreal / PPMondwest, `oklch(0.2002 0 0)` background, `oklch(0.899 0.0133 82.4)` foreground)
- **Easy per-application tailoring** — clear schema, fields obviously editable, predictable rendering
- **Cross-repo workflow** — tooling lives here, applications live in a separate private repo, no duplicated machinery
- **Conversational application drafting** — Claude skill scaffolds folder, tailors CV, drafts cover letter and notes from a JD

## Non-goals

- **No light/print-friendly variant** — dark theme only. A `--theme=light` flag can be added later as a one-line change if a specific application requires it.
- **No web rendering of the CV** — CV is not published as a page on kyleshepherd.co.uk. PDF only.
- **No Tailwind for the CV** — keeps the pipeline independent of the site build and avoids preflight/utility runtime in the PDF.
- **No ATS-specialised second variant** — modern ATS extracts text fine from styled PDFs; we won't maintain a separate "ATS-friendly" output.
- **Not part of the public site build** — `cv/` is excluded from Astro's content collections.

## Stack

| Tool | Purpose |
|------|---------|
| `gray-matter` | Frontmatter parsing |
| `markdown-it` | Markdown → HTML for prose chunks |
| `playwright` | Headless Chromium for print-to-PDF |
| `tsx` | Run TypeScript directly, no build step |
| Plain CSS | Styling (no framework) |

All added as `devDependencies`. No runtime impact on the Astro site build.

## Folder Structure

```
cv/
├── templates/
│   ├── cv.md             ← master CV
│   └── cover-letter.md   ← master cover letter
├── styles/
│   └── cv.css            ← single hand-written stylesheet
├── template-cv.ts        ← function: (data) => html string
├── template-cover.ts     ← function: (data, body) => html string
├── render.ts             ← CLI entry: parse → template → playwright → PDF
├── scaffold.ts           ← CLI: copies templates into a target dir
└── README.md             ← schema reference + workflow

.claude/skills/new-application/
└── SKILL.md              ← local Claude skill for drafting applications
```

`cv/` sits at the repo root, sibling to `src/`. Excluded from Astro builds.

## Schema

### CV (`type: cv`)

Fully structured YAML frontmatter; markdown body is unused (or used only for editorial comments).

```yaml
---
type: cv
name: Kyle Shepherd
role: Senior Software Engineer        # editable per application
contact:
  email: kyleshepherddev@gmail.com
  location: London, UK
  website: www.kyleshepherd.co.uk
  phone: +44 7951 979 162

summary: >
  Senior Software Engineer with over 7 years of experience…

experience:
  - company: Kitt
    roles:
      - { title: Senior Software Engineer, dates: May 2026 – Present }
      - { title: Software Engineer,         dates: Aug 2025 – May 2026 }
    bullets:
      - Built new greenfield microservices and frontends using Next.js…

  - company: SOON_
    roles:
      - { title: Senior Software Engineer, dates: Nov 2022 – June 2025 }
      - { title: Frontend Engineer,         dates: Mar 2021 – Nov 2022 }
    highlights:                              # bolded-name client bullets
      - { name: Tom Dixon,  description: Building pages and functionality for SvelteKit-based e-commerce site… }
      - { name: White Cube, description: Contributed to their custom inventory project… }
    bullets:
      - Translated designs into performant, accessible web applications…

education:
  - institution: Falmouth University
    qualification: Bachelor of Arts in Game Development (Programming)
    dates: 2016 – 2019
    bullets:
      - Graduated with Upper Second Class.
      - Created a variety of games using **Unity** and **C#** in self-driven teams.

achievements: [ … ]
skills:       [ … ]
hobbies:      [ … ]
socials:
  - { label: GitHub,   handle: '@kyleshepherd' }
  - { label: LinkedIn, handle: '@kyleshepherddev' }
---
```

Schema notes:
- `roles` is an array per company → renders stacked titles (handles Kitt promotion and SOON_ promotion patterns).
- `highlights` (optional) renders bolded-name client bullets, distinct from general role bullets.
- `bullets` markdown supports `**bold**` and *italic* via markdown-it.

### Cover letter (`type: cover-letter`)

Frontmatter for the header and recipient; body for prose paragraphs.

```yaml
---
type: cover-letter
name: Kyle Shepherd
role: Senior Fullstack Engineer        # editable per application
contact: { … }
recipient: Stripe Hiring Team
salutation: Dear Stripe Hiring Team,
sign_off: Best regards,
---

I'm excited to apply for the Full Stack Engineer position…

I'm a Senior Fullstack Engineer with experience…
```

## Render Tooling

`cv/render.ts` is a single TypeScript entry. Invoked via:

```sh
pnpm cv:render --in cv/templates/cv.md
pnpm cv:render --in cv/templates/cover-letter.md --out cover-letter.pdf
pnpm cv:render --in ~/personal/kyleshepherd-applications/2026-05-stripe/cv.md
```

Behaviour:
1. Parse `--in` with `gray-matter` → `{ data, content }`
2. Switch on `data.type` (`cv` | `cover-letter`) → call `template-cv.ts` or `template-cover.ts`
3. Pass prose chunks (cover letter body, CV bullets/highlights) through `markdown-it`
4. Templates return a complete HTML string with inline `<style>` referencing `cv/styles/cv.css` (loaded via `fs.readFileSync` at runtime)
5. Launch Playwright Chromium, `page.setContent(html, { waitUntil: 'networkidle' })`
6. `page.pdf({ format: 'A4', printBackground: true, margin: undefined })` — `@page` rules in the CSS control margins
7. Write PDF to `--out`, defaulting to `<input-dir>/<input-basename>.pdf`

Fonts: loaded via `@font-face` with `file://` URIs pointing at `public/fonts/`. Playwright resolves these reliably when HTML is loaded with `setContent`.

pnpm scripts:
```json
"cv:render":    "tsx cv/render.ts",
"cv:templates": "tsx cv/render.ts --in cv/templates/cv.md && tsx cv/render.ts --in cv/templates/cover-letter.md",
"cv:new":       "tsx cv/scaffold.ts"
```

## Styling

`cv/styles/cv.css` — hand-written, no Tailwind. ~150–200 lines.

Tokens mirrored from `src/styles/app.css`:
```css
:root {
  --color-bg:   oklch(0.2002 0 0);
  --color-fg:   oklch(0.899 0.0133 82.4);
  --color-rule: oklch(0.899 0.0133 82.4 / 0.5);
  --font-serif: "PPEditorialOld", serif;
  --font-sans:  "PPNeueMontreal", sans-serif;
  --font-mono:  "PPMondwest", monospace;
}
```

Page:
```css
@page { size: A4; margin: 14mm 14mm 16mm 14mm; }
```

Header: typography-only (no avatar/monogram). Flex row — large PPEditorialOld serif name + smaller PPNeueMontreal role beneath on the left; two-line contact block right-aligned. Optionally inline the site's `HandIcon` before the name if visual balance needs it.

Layout primitives:
| Region | Treatment |
|--------|-----------|
| Section heading | Uppercase serif, horizontal rule above (`--color-rule`) |
| Experience entry | Serif role title, sans company chip, italic dates |
| Stacked roles | Smaller secondary row below primary |
| Highlights | `<strong>` name + em-dash + description |
| Education / Skills | CSS Grid 2-column |
| Socials | Label/handle grid |

Print specifics:
- `print-color-adjust: exact` — dark background renders in PDF
- `page-break-inside: avoid` on experience entries
- `widows: 3; orphans: 3` for paragraph control

## Cross-repo Workflow

### Applications repo bootstrap (one-time, manual)

```sh
mkdir ~/personal/kyleshepherd-applications && cd $_
git init
# add README.md describing workflow + .gitignore (node_modules, .DS_Store, *.swp)
gh repo create kyleshepherd-applications --private --source=. --remote=origin --push
```

### Per-application workflow

Either manually:
1. `pnpm cv:new ~/personal/kyleshepherd-applications/2026-05-stripe-expansion` (from this repo)
2. Edit `cv.md` and `cover-letter.md` in the new folder
3. `pnpm cv:render --in <path>/cv.md` and same for cover letter
4. Commit in the applications repo

Or via the `new-application` Claude skill (see next section).

The applications repo holds no rendering tooling, no styles, no scripts. Just markdown and PDFs.

## Claude Skill: `new-application`

Location: `.claude/skills/new-application/SKILL.md` in this repo (local skill, scoped to this project).

Frontmatter:
```yaml
---
name: new-application
description: Use when the user wants to draft CV and cover letter for a new job application. Triggers on phrases like "apply to X", "new application", "draft a cover letter for...", "I'm applying for...". Scaffolds the application folder, tailors the materials to the role JD, drafts notes, and renders PDFs.
---
```

Skill instructions (what the SKILL.md body tells the model to do):

1. **Gather inputs** — ask for company, role title, and the job description (paste, file path, or URL — fetch the URL if given). If a deadline is mentioned, capture it.
2. **Derive slug** — `YYYY-MM-company-keyword` (e.g. `2026-05-stripe-expansion`).
3. **Scaffold** — run `pnpm cv:new ~/personal/kyleshepherd-applications/<slug>` to create the folder and copy templates.
4. **Draft `notes.md`** in the new folder:
   - Header: company, role, JD source (URL or "pasted"), application date, deadline if known
   - Full JD text captured verbatim
   - **Key hooks** — extracted from the JD: team mission, specific responsibilities, tech stack mentions, values/phrases the company emphasises. Bullets, each mapping to a piece of Kyle's experience.
   - **What I emphasized** — short list of which hooks the cover letter draws on, for interview prep.
5. **Tailor `cv.md`** (light touch — the CV doesn't change much per role):
   - Update `role:` frontmatter to match the company's title for the position
   - Optionally reorder `skills` to put the most relevant ones first
   - Leave experience and education untouched
6. **Draft `cover-letter.md`**:
   - Fill `recipient` and `salutation` from the JD
   - Draft body paragraphs using the existing letter's voice; weave in concrete hooks from `notes.md`; reference projects from `src/content/projects/*.md` for evidence
7. **Stop for review** — show drafts to the user before rendering.
8. **Render** — `pnpm cv:render --in <path>/cv.md` and same for cover letter, on user approval.
9. **Commit** — ask whether to `git add` + commit in the applications repo (e.g. `feat: add Stripe Expansion application`).

The skill is local (not global) because it references this repo's specific scripts (`pnpm cv:new`, `pnpm cv:render`), schema, and template files. Lives with the code that backs it.

## Implementation Phases

### Phase 1: Pipeline scaffolding
- Add `cv/` directory and dependencies
- `render.ts`, `template-cv.ts`, `template-cover.ts`, `scaffold.ts` (minimal, no styling yet)
- `cv/styles/cv.css` with tokens + page setup + basic layout
- `cv/README.md` with schema reference
- pnpm scripts in `package.json`

### Phase 2: Content migration + styling iteration
- Port current Canva CV into `cv/templates/cv.md`
- Port Stripe cover letter (or a generic version) into `cv/templates/cover-letter.md`
- Iterate on `cv.css` until the rendered PDFs match the spirit of the Canva versions, scaled to fit the new schema

### Phase 3: Applications repo + skill
- Bootstrap `~/personal/kyleshepherd-applications` and push to GitHub as private
- Write `.claude/skills/new-application/SKILL.md`
- Walk through a real application end-to-end with the skill to validate the flow

## Open Questions / Things to Revisit Later

- **Two-column experience layout?** Current Canva CV is single-column with stacked roles per company. We'll start single-column; revisit if pagination becomes a problem.
- **Photo on CV?** No, by default. Modern UK convention + ATS-friendlier. Can add later if a specific application needs it.
- **Multi-page handling for cover letters** — Canva version is 2 pages with repeated header. We'll repeat the contact header on subsequent pages via `@page :nth(n)` or a printed-page-header pattern; details during implementation.

## File List (will be created)

- `cv/templates/cv.md`
- `cv/templates/cover-letter.md`
- `cv/styles/cv.css`
- `cv/template-cv.ts`
- `cv/template-cover.ts`
- `cv/render.ts`
- `cv/scaffold.ts`
- `cv/README.md`
- `.claude/skills/new-application/SKILL.md`
- Modifications to `package.json` (deps + scripts)
- No changes to `astro.config.mjs` expected — Astro only picks up files under `src/`, so `cv/` is naturally excluded from the site build.
