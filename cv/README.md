# CV & Cover Letter Pipeline

Markdown templates → branded PDFs, styled to match kyleshepherd.co.uk.

## Commands

```sh
# Render a template or application
pnpm cv:render --in cv/templates/cv.md
pnpm cv:render --in cv/templates/cover-letter.md --out cover.pdf
pnpm cv:render --in ~/personal/kyleshepherd-applications/2026-05-stripe/cv.md

# Render both master templates (for styling iteration)
pnpm cv:templates

# Scaffold a new application directory (copies templates)
pnpm cv:new ~/personal/kyleshepherd-applications/2026-05-stripe-expansion
```

`--out` is optional; defaults to `<input-basename>.pdf` next to the input.

## CV schema

`type: cv` frontmatter; markdown body unused.

```yaml
---
type: cv
name: Kyle Shepherd
role: Senior Software Engineer        # editable per application
contact:
  email: kyleshepherddev@gmail.com
  location: London, UK
  website: www.kyleshepherd.co.uk
  phone: "+44 7951 979 162"

summary: >
  ~3 sentence positioning paragraph.

experience:
  - company: Kitt
    roles:                              # array → renders stacked titles
      - { title: Senior Software Engineer, dates: May 2026 – Present }
      - { title: Software Engineer,         dates: Aug 2025 – May 2026 }
    bullets: [ ... ]                    # general role bullets
    highlights:                          # optional: bolded-name client bullets
      - { name: Tom Dixon, description: ... }

education:
  - institution: Falmouth University
    qualification: Bachelor of Arts in Game Development (Programming)
    dates: 2016 – 2019
    bullets: [ ... ]

achievements: [ ... ]
skills:       [ ... ]
hobbies:      [ ... ]
socials:
  - { label: GitHub,   handle: '@kyleshepherd' }
---
```

Inline markdown supported in bullets, summary, and highlight descriptions: `**bold**`, `*italic*`, links.

## Cover letter schema

`type: cover-letter` frontmatter; markdown body becomes the letter prose (paragraph-per-blank-line).

```yaml
---
type: cover-letter
name: Kyle Shepherd
role: Senior Fullstack Engineer        # editable per application
contact: { ... }
recipient: Stripe Hiring Team
salutation: Dear Stripe Hiring Team,
sign_off: Best regards,
---

First paragraph…

Second paragraph…
```

## Per-application workflow

Role-specific applications live in a separate private repo (`~/personal/kyleshepherd-applications`). This repo holds only the master templates and the rendering tooling.

1. Scaffold a new folder from this repo:
   ```sh
   pnpm cv:new ~/personal/kyleshepherd-applications/2026-05-stripe-expansion
   ```
2. Edit the copied `cv.md` and `cover-letter.md`.
3. Render PDFs:
   ```sh
   pnpm cv:render --in ~/personal/kyleshepherd-applications/2026-05-stripe-expansion/cv.md
   pnpm cv:render --in ~/personal/kyleshepherd-applications/2026-05-stripe-expansion/cover-letter.md
   ```
4. Commit in the applications repo.

Or invoke the `new-application` Claude skill from any conversation in this repo — it scaffolds, drafts `notes.md` with hooks from the JD, tailors the CV, and drafts the cover letter end-to-end.

## Architecture

- `template-cv.ts`, `template-cover.ts` — pure functions, data → HTML string. Inline `@font-face` referencing `public/fonts/*.otf` so fonts work in headless Chromium.
- `render.ts` — CLI; parses markdown + frontmatter, dispatches to the right template, writes HTML to a temp file, drives Playwright Chromium to produce a PDF.
- `scaffold.ts` — copies templates into a target directory; refuses to overwrite existing files.
- `styles/cv.css` — single hand-written stylesheet, mirrors site design tokens. `@page margin: 0` + `box-decoration-break: clone` on body for edge-to-edge dark with per-page padding.

## Tests

```sh
pnpm test
```

Vitest unit tests for both template functions, the scaffold function, and a render smoke test that produces a real PDF from a fixture.
