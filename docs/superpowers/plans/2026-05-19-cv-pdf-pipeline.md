# CV & Cover Letter PDF Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a markdown → PDF pipeline for CV and cover letter, styled to match kyleshepherd.co.uk's design, with a CLI for rendering, a CLI for scaffolding new applications, and a local Claude skill that drafts new applications from a job description.

**Architecture:** Two template functions (`renderCv`, `renderCoverLetter`) generate HTML from typed data objects. A `render.ts` CLI parses markdown + frontmatter, dispatches to the right template, then drives headless Playwright Chromium to produce a PDF. A `scaffold.ts` CLI copies templates into a target directory. A Claude skill orchestrates the per-application workflow (scaffold, draft, render, optionally commit). The site's existing fonts (`public/fonts/*.otf`) are reused via inline `@font-face` declarations with absolute `file://` URIs; the HTML is loaded via a temp file so Chromium permits local font access.

**Tech Stack:** Node 24, TypeScript via `tsx`, `gray-matter` (frontmatter), `markdown-it` (inline markdown), Playwright (Chromium print-to-PDF), `vitest` (tests). No Tailwind — single hand-written CSS file.

---

## File Structure

```
cv/
├── templates/
│   ├── cv.md             # master CV (Kyle's data)
│   └── cover-letter.md   # master cover letter (generic)
├── styles/
│   └── cv.css            # all styles except @font-face
├── template-cv.ts        # renderCv(data) → HTML string
├── template-cv.test.ts   # vitest unit tests
├── template-cover.ts     # renderCoverLetter(data, bodyHtml) → HTML string
├── template-cover.test.ts
├── render.ts             # CLI entry
├── render.test.ts        # smoke test
├── scaffold.ts           # CLI: copies templates into target dir
├── scaffold.test.ts
└── README.md             # workflow + schema docs

.claude/skills/new-application/
└── SKILL.md

# modifications
package.json              # devDependencies + pnpm scripts
.gitignore                # cv/**/*.pdf
```

Each file has one clear responsibility. Templates are pure functions (data in, HTML out — easy to test). The render and scaffold scripts are thin CLIs over those pure functions plus Playwright/fs.

---

## Task 1: Install dependencies, add pnpm scripts, set up vitest

**Files:**
- Modify: `package.json`
- Create: `.gitignore` entry

- [ ] **Step 1: Edit `package.json` to add devDependencies and scripts**

Add these to `devDependencies` (alongside existing entries):
```json
"@types/markdown-it": "^14.1.2",
"gray-matter": "^4.0.3",
"markdown-it": "^14.1.0",
"playwright": "^1.49.0",
"tsx": "^4.20.0",
"vitest": "^2.1.0"
```

Add to `scripts`:
```json
"cv:render": "tsx cv/render.ts",
"cv:templates": "tsx cv/render.ts --in cv/templates/cv.md && tsx cv/render.ts --in cv/templates/cover-letter.md",
"cv:new": "tsx cv/scaffold.ts",
"test": "vitest run"
```

- [ ] **Step 2: Run install**

```bash
pnpm install
```

Expected: deps installed, no errors.

- [ ] **Step 3: Install Playwright Chromium**

```bash
pnpm exec playwright install chromium
```

Expected: "chromium ... downloaded" then "All browsers downloaded".

- [ ] **Step 4: Add `cv/**/*.pdf` to `.gitignore`**

Append to `.gitignore` (create the file if it doesn't exist):
```
cv/**/*.pdf
```

- [ ] **Step 5: Verify vitest runs**

```bash
pnpm test
```

Expected: "No test files found" (we have none yet) — confirms vitest is invocable.

- [ ] **Step 6: Verify Playwright is invocable**

```bash
pnpm exec node -e "require('playwright').chromium.launch({ headless: true }).then(b => b.close().then(() => console.log('ok')))"
```

Expected: prints `ok`.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml .gitignore
git commit -m "chore: add CV pipeline deps and pnpm scripts"
```

---

## Task 2: Create base CSS file (`cv/styles/cv.css`)

**Files:**
- Create: `cv/styles/cv.css`

This file holds all CV/cover-letter styling except `@font-face`, which is inlined into HTML by the templates so absolute `file://` font paths work reliably.

- [ ] **Step 1: Create `cv/styles/cv.css`**

```css
:root {
  --color-bg:   oklch(0.2002 0 0);
  --color-fg:   oklch(0.899 0.0133 82.4);
  --color-rule: oklch(0.899 0.0133 82.4 / 0.5);
  --font-serif: "PPEditorialOld", serif;
  --font-sans:  "PPNeueMontreal", sans-serif;
  --font-mono:  "PPMondwest", monospace;
}

@page {
  size: A4;
  margin: 14mm 14mm 16mm 14mm;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-sans);
  font-size: 10.5pt;
  line-height: 1.45;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

p { margin: 0 0 0.5em; }
ul { margin: 0; padding-left: 1.1em; }
li { margin-bottom: 0.25em; }
strong { font-weight: 700; }
em { font-style: italic; }

/* --- Header --- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16mm;
  margin-bottom: 6mm;
}
.identity .name {
  font-family: var(--font-serif);
  font-size: 30pt;
  line-height: 1;
  margin: 0 0 2mm;
}
.identity .role {
  font-family: var(--font-sans);
  font-size: 12pt;
  margin: 0;
}
.contact {
  text-align: right;
  font-size: 9.5pt;
}
.contact p { margin: 0; }

/* --- Summary --- */
.summary {
  font-size: 10.5pt;
  margin-bottom: 4mm;
}

/* --- Section heading --- */
.section { margin-top: 6mm; }
.section-heading {
  font-family: var(--font-serif);
  font-size: 14pt;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 0 0 3mm;
  padding-top: 3mm;
  border-top: 1px solid var(--color-rule);
}

/* --- Experience --- */
.exp-entry { margin-bottom: 5mm; page-break-inside: avoid; }
.exp-header { margin-bottom: 1.5mm; }
.exp-title {
  font-family: var(--font-serif);
  font-size: 13pt;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2mm;
  align-items: baseline;
}
.exp-company {
  font-family: var(--font-sans);
  font-size: 10.5pt;
  font-weight: 700;
}
.exp-dates {
  font-family: var(--font-sans);
  font-style: italic;
  font-size: 10pt;
  margin-left: auto;
}
.exp-prior-role {
  font-size: 9.5pt;
  margin: 0.5mm 0 0;
  display: flex;
  gap: 2mm;
  align-items: baseline;
}
.exp-prior-role .exp-dates { font-size: 9.5pt; }
.exp-highlights, .exp-bullets { margin-top: 1.5mm; }

/* --- Education --- */
.edu-entry {
  display: grid;
  grid-template-columns: 38mm 1fr;
  gap: 4mm;
  margin-bottom: 4mm;
  page-break-inside: avoid;
}
.edu-institution {
  font-family: var(--font-serif);
  font-size: 12pt;
  margin: 0 0 1mm;
}
.edu-qualification { font-size: 9.5pt; margin: 0 0 1mm; }
.edu-dates { font-size: 9.5pt; font-style: italic; margin: 0; }
.edu-bullets { margin: 0; }

/* --- Skills (2-column list) --- */
.skills-list {
  list-style: disc;
  columns: 2;
  column-gap: 8mm;
}

/* --- Socials --- */
.socials-list {
  display: grid;
  grid-template-columns: 30mm 1fr;
  gap: 1mm 4mm;
  margin: 0;
}
.socials-list dt { font-weight: 700; }
.socials-list dd { margin: 0; }

/* --- Cover letter --- */
.cover-body { margin-top: 4mm; font-size: 10.5pt; }
.cover-body p { margin: 0 0 0.7em; }
.cover-salutation { font-size: 10.5pt; margin: 4mm 0 3mm; }
.cover-signoff { margin-top: 4mm; }
.cover-signoff p { margin: 0; }

p > a { color: inherit; text-decoration: underline; }
```

- [ ] **Step 2: Commit**

```bash
git add cv/styles/cv.css
git commit -m "feat(cv): add base stylesheet with brand tokens"
```

---

## Task 3: Build CV template function (TDD)

**Files:**
- Create: `cv/template-cv.ts`
- Create: `cv/template-cv.test.ts`

The template function takes a typed data object and returns an HTML string. Pure function, no I/O dependencies except for reading the CSS file. Side-effect-free apart from that file read.

- [ ] **Step 1: Write the failing test (`cv/template-cv.test.ts`)**

```typescript
import { describe, it, expect } from 'vitest';
import { renderCv, type CvData } from './template-cv';

const baseData: CvData = {
  type: 'cv',
  name: 'Kyle Shepherd',
  role: 'Senior Software Engineer',
  contact: {
    email: 'kyle@example.com',
    location: 'London, UK',
    website: 'kyleshepherd.co.uk',
    phone: '+44 7951 979 162',
  },
  summary: 'Test summary.',
  experience: [
    {
      company: 'Kitt',
      roles: [
        { title: 'Senior Software Engineer', dates: 'May 2026 – Present' },
        { title: 'Software Engineer', dates: 'Aug 2025 – May 2026' },
      ],
      bullets: ['Built **greenfield** microservices'],
    },
  ],
  education: [
    {
      institution: 'Falmouth University',
      qualification: 'BA Game Development',
      dates: '2016 – 2019',
      bullets: ['Upper Second Class'],
    },
  ],
  achievements: ['Created Tarkov TK'],
  skills: ['TypeScript', 'Go'],
  hobbies: ['Video games'],
  socials: [{ label: 'GitHub', handle: '@kyleshepherd' }],
};

describe('renderCv', () => {
  it('produces a complete HTML document', () => {
    const html = renderCv(baseData);
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain('</html>');
  });

  it('renders name and role in the header', () => {
    const html = renderCv(baseData);
    expect(html).toContain('Kyle Shepherd');
    expect(html).toContain('Senior Software Engineer');
  });

  it('renders contact info', () => {
    const html = renderCv(baseData);
    expect(html).toContain('kyle@example.com');
    expect(html).toContain('London, UK');
    expect(html).toContain('+44 7951 979 162');
  });

  it('renders the summary as inline markdown', () => {
    const html = renderCv({ ...baseData, summary: 'I work in **TypeScript**' });
    expect(html).toContain('<strong>TypeScript</strong>');
  });

  it('renders experience entries with stacked roles', () => {
    const html = renderCv(baseData);
    expect(html).toContain('Kitt');
    expect(html).toContain('May 2026 – Present');
    expect(html).toContain('Aug 2025 – May 2026');
  });

  it('renders bullets with inline markdown bold', () => {
    const html = renderCv(baseData);
    expect(html).toContain('<strong>greenfield</strong>');
  });

  it('renders highlights with bolded names', () => {
    const html = renderCv({
      ...baseData,
      experience: [{
        company: 'SOON_',
        roles: [{ title: 'Senior Software Engineer', dates: 'Nov 2022 – June 2025' }],
        highlights: [{ name: 'Tom Dixon', description: 'SvelteKit work' }],
        bullets: [],
      }],
    });
    expect(html).toContain('<strong>Tom Dixon</strong>');
    expect(html).toContain('SvelteKit work');
  });

  it('renders education with institution + qualification + dates', () => {
    const html = renderCv(baseData);
    expect(html).toContain('Falmouth University');
    expect(html).toContain('BA Game Development');
    expect(html).toContain('2016 – 2019');
    expect(html).toContain('Upper Second Class');
  });

  it('renders achievements, skills, hobbies, socials', () => {
    const html = renderCv(baseData);
    expect(html).toContain('Created Tarkov TK');
    expect(html).toContain('TypeScript');
    expect(html).toContain('Video games');
    expect(html).toContain('GitHub');
    expect(html).toContain('@kyleshepherd');
  });

  it('inlines @font-face declarations referencing public/fonts', () => {
    const html = renderCv(baseData);
    expect(html).toContain('@font-face');
    expect(html).toContain('PPEditorialOld');
    expect(html).toContain('PPNeueMontreal');
    expect(html).toContain('public/fonts');
  });

  it('inlines the cv.css contents', () => {
    const html = renderCv(baseData);
    expect(html).toContain('--color-bg');
    expect(html).toContain('.section-heading');
  });

  it('omits empty sections', () => {
    const html = renderCv({
      ...baseData,
      achievements: [],
      hobbies: [],
      socials: [],
    });
    expect(html).not.toContain('Achievements');
    expect(html).not.toContain('Hobbies');
    expect(html).not.toContain('Socials');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
pnpm test cv/template-cv.test.ts
```

Expected: FAIL with "Failed to resolve import './template-cv'".

- [ ] **Step 3: Implement `cv/template-cv.ts`**

```typescript
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import MarkdownIt from 'markdown-it';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const md = new MarkdownIt({ html: false, linkify: true });
const inline = (s: string) => md.renderInline(s);

const CSS_PATH = resolve(__dirname, 'styles/cv.css');
const FONTS_DIR = resolve(__dirname, '..', 'public', 'fonts');

export interface Contact {
  email: string;
  location: string;
  website: string;
  phone: string;
}
export interface Role { title: string; dates: string; }
export interface Highlight { name: string; description: string; }
export interface Experience {
  company: string;
  roles: Role[];
  bullets?: string[];
  highlights?: Highlight[];
}
export interface Education {
  institution: string;
  qualification?: string;
  dates: string;
  bullets: string[];
}
export interface Social { label: string; handle: string; }

export interface CvData {
  type: 'cv';
  name: string;
  role: string;
  contact: Contact;
  summary: string;
  experience: Experience[];
  education: Education[];
  achievements: string[];
  skills: string[];
  hobbies: string[];
  socials: Social[];
}

const FONT_FACES: Array<[string, string, number, 'normal' | 'italic']> = [
  ['PPEditorialOld', 'PPEditorialOld-Regular.otf', 400, 'normal'],
  ['PPEditorialOld', 'PPEditorialOld-Italic.otf', 400, 'italic'],
  ['PPEditorialOld', 'PPEditorialOld-Ultralight.otf', 300, 'normal'],
  ['PPEditorialOld', 'PPEditorialOld-UltralightItalic.otf', 300, 'italic'],
  ['PPNeueMontreal', 'PPNeueMontreal-Book.otf', 400, 'normal'],
  ['PPNeueMontreal', 'PPNeueMontreal-Italic.otf', 400, 'italic'],
  ['PPNeueMontreal', 'PPNeueMontreal-Bold.otf', 700, 'normal'],
  ['PPMondwest', 'PPMondwest-Regular.otf', 400, 'normal'],
];

export function fontFaceBlock(): string {
  return FONT_FACES.map(([family, file, weight, style]) =>
    `@font-face { font-family: "${family}"; src: url("file://${FONTS_DIR}/${file}") format("opentype"); font-weight: ${weight}; font-style: ${style}; }`
  ).join('\n');
}

export function loadCss(): string {
  return readFileSync(CSS_PATH, 'utf8');
}

function renderExperienceEntry(entry: Experience): string {
  const [primary, ...rest] = entry.roles;
  return `
    <article class="exp-entry">
      <header class="exp-header">
        <h3 class="exp-title">${primary.title} <span class="exp-company">${entry.company}</span> <span class="exp-dates">${primary.dates}</span></h3>
        ${rest.map(r => `<p class="exp-prior-role">${r.title} <span class="exp-dates">${r.dates}</span></p>`).join('')}
      </header>
      ${entry.highlights?.length ? `<ul class="exp-highlights">${entry.highlights.map(h => `<li><strong>${h.name}</strong> — ${inline(h.description)}</li>`).join('')}</ul>` : ''}
      ${entry.bullets?.length ? `<ul class="exp-bullets">${entry.bullets.map(b => `<li>${inline(b)}</li>`).join('')}</ul>` : ''}
    </article>`;
}

function renderEducationEntry(entry: Education): string {
  return `
    <article class="edu-entry">
      <div class="edu-meta">
        <h3 class="edu-institution">${entry.institution}</h3>
        ${entry.qualification ? `<p class="edu-qualification">${entry.qualification}</p>` : ''}
        <p class="edu-dates">${entry.dates}</p>
      </div>
      <ul class="edu-bullets">${entry.bullets.map(b => `<li>${inline(b)}</li>`).join('')}</ul>
    </article>`;
}

export function renderCv(data: CvData): string {
  const sections: string[] = [];

  sections.push(`
    <section class="section experience">
      <h2 class="section-heading">Experience</h2>
      ${data.experience.map(renderExperienceEntry).join('')}
    </section>`);

  if (data.education.length) {
    sections.push(`
      <section class="section education">
        <h2 class="section-heading">Education</h2>
        ${data.education.map(renderEducationEntry).join('')}
      </section>`);
  }

  if (data.achievements.length) {
    sections.push(`
      <section class="section achievements">
        <h2 class="section-heading">Achievements / Side Projects</h2>
        <ul>${data.achievements.map(a => `<li>${inline(a)}</li>`).join('')}</ul>
      </section>`);
  }

  if (data.skills.length) {
    sections.push(`
      <section class="section skills">
        <h2 class="section-heading">Skills</h2>
        <ul class="skills-list">${data.skills.map(s => `<li>${inline(s)}</li>`).join('')}</ul>
      </section>`);
  }

  if (data.hobbies.length) {
    sections.push(`
      <section class="section hobbies">
        <h2 class="section-heading">Hobbies / Interests</h2>
        <ul>${data.hobbies.map(h => `<li>${inline(h)}</li>`).join('')}</ul>
      </section>`);
  }

  if (data.socials.length) {
    sections.push(`
      <section class="section socials">
        <h2 class="section-heading">Socials</h2>
        <dl class="socials-list">
          ${data.socials.map(s => `<dt>${s.label}</dt><dd>${s.handle}</dd>`).join('')}
        </dl>
      </section>`);
  }

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${data.name} — ${data.role}</title>
  <style>${fontFaceBlock()}\n${loadCss()}</style>
</head>
<body class="cv">
  <header class="header">
    <div class="identity">
      <h1 class="name">${data.name}</h1>
      <p class="role">${data.role}</p>
    </div>
    <div class="contact">
      <p>${data.contact.email} / ${data.contact.location}</p>
      <p>${data.contact.website} / ${data.contact.phone}</p>
    </div>
  </header>

  <section class="summary">
    <p>${inline(data.summary)}</p>
  </section>

  ${sections.join('')}
</body>
</html>`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
pnpm test cv/template-cv.test.ts
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add cv/template-cv.ts cv/template-cv.test.ts
git commit -m "feat(cv): add renderCv template function"
```

---

## Task 4: Build cover letter template function (TDD)

**Files:**
- Create: `cv/template-cover.ts`
- Create: `cv/template-cover.test.ts`

The cover letter template takes the same contact/identity data as the CV plus recipient/salutation/sign-off, and a body HTML string (the markdown body of the cover letter rendered to HTML by the caller).

- [ ] **Step 1: Write the failing test (`cv/template-cover.test.ts`)**

```typescript
import { describe, it, expect } from 'vitest';
import { renderCoverLetter, type CoverLetterData } from './template-cover';

const baseData: CoverLetterData = {
  type: 'cover-letter',
  name: 'Kyle Shepherd',
  role: 'Senior Fullstack Engineer',
  contact: {
    email: 'kyle@example.com',
    location: 'London, UK',
    website: 'kyleshepherd.co.uk',
    phone: '+44 7951 979 162',
  },
  recipient: 'Stripe Hiring Team',
  salutation: 'Dear Stripe Hiring Team,',
  sign_off: 'Best regards,',
};

const bodyHtml = '<p>First paragraph.</p><p>Second paragraph.</p>';

describe('renderCoverLetter', () => {
  it('produces a complete HTML document', () => {
    const html = renderCoverLetter(baseData, bodyHtml);
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain('</html>');
  });

  it('renders name and role in the header', () => {
    const html = renderCoverLetter(baseData, bodyHtml);
    expect(html).toContain('Kyle Shepherd');
    expect(html).toContain('Senior Fullstack Engineer');
  });

  it('renders the salutation', () => {
    const html = renderCoverLetter(baseData, bodyHtml);
    expect(html).toContain('Dear Stripe Hiring Team,');
  });

  it('embeds the body HTML', () => {
    const html = renderCoverLetter(baseData, bodyHtml);
    expect(html).toContain('First paragraph');
    expect(html).toContain('Second paragraph');
  });

  it('renders the sign-off and the name underneath', () => {
    const html = renderCoverLetter(baseData, bodyHtml);
    expect(html).toContain('Best regards,');
    const signoffIndex = html.indexOf('Best regards,');
    const nameAfterSignoff = html.indexOf('Kyle Shepherd', signoffIndex);
    expect(nameAfterSignoff).toBeGreaterThan(signoffIndex);
  });

  it('inlines fonts and css', () => {
    const html = renderCoverLetter(baseData, bodyHtml);
    expect(html).toContain('@font-face');
    expect(html).toContain('--color-bg');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
pnpm test cv/template-cover.test.ts
```

Expected: FAIL with "Failed to resolve import './template-cover'".

- [ ] **Step 3: Implement `cv/template-cover.ts`**

```typescript
import type { Contact } from './template-cv';
import { fontFaceBlock, loadCss } from './template-cv';

export interface CoverLetterData {
  type: 'cover-letter';
  name: string;
  role: string;
  contact: Contact;
  recipient: string;
  salutation: string;
  sign_off: string;
}

export function renderCoverLetter(data: CoverLetterData, bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${data.name} — ${data.role} — Cover Letter</title>
  <style>${fontFaceBlock()}\n${loadCss()}</style>
</head>
<body class="cover-letter">
  <header class="header">
    <div class="identity">
      <h1 class="name">${data.name}</h1>
      <p class="role">${data.role}</p>
    </div>
    <div class="contact">
      <p>${data.contact.email} / ${data.contact.location}</p>
      <p>${data.contact.website} / ${data.contact.phone}</p>
    </div>
  </header>

  <p class="cover-salutation">${data.salutation}</p>

  <div class="cover-body">
    ${bodyHtml}
  </div>

  <div class="cover-signoff">
    <p>${data.sign_off}</p>
    <p>${data.name}</p>
  </div>
</body>
</html>`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
pnpm test cv/template-cover.test.ts
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add cv/template-cover.ts cv/template-cover.test.ts
git commit -m "feat(cv): add renderCoverLetter template function"
```

---

## Task 5: Build render CLI with smoke test

**Files:**
- Create: `cv/render.ts`
- Create: `cv/render.test.ts`
- Create: `cv/fixtures/minimal-cv.md` (test fixture)

The render CLI is the entry point. It parses CLI args (`--in`, `--out`), reads the markdown, dispatches to the right template, writes HTML to a temp file (so Chromium permits local font access), loads it via Playwright, and produces the PDF.

- [ ] **Step 1: Create test fixture `cv/fixtures/minimal-cv.md`**

```markdown
---
type: cv
name: Kyle Shepherd
role: Senior Software Engineer
contact:
  email: kyle@example.com
  location: London, UK
  website: kyleshepherd.co.uk
  phone: '+44 7951 979 162'
summary: Test summary.
experience:
  - company: Kitt
    roles:
      - { title: Senior Software Engineer, dates: May 2026 – Present }
    bullets:
      - Built greenfield microservices.
education: []
achievements: []
skills: []
hobbies: []
socials: []
---
```

- [ ] **Step 2: Write the failing smoke test (`cv/render.test.ts`)**

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtempSync, rmSync, statSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { renderFile } from './render';

const FIXTURE = resolve(__dirname, 'fixtures/minimal-cv.md');

describe('renderFile', () => {
  let outDir: string;

  beforeAll(() => {
    outDir = mkdtempSync(join(tmpdir(), 'cv-render-'));
  });

  afterAll(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it('produces a non-empty PDF at the requested output path', async () => {
    const out = join(outDir, 'out.pdf');
    await renderFile(FIXTURE, out);
    const stat = statSync(out);
    expect(stat.size).toBeGreaterThan(5000);
    // PDF magic bytes: %PDF
    const head = readFileSync(out).subarray(0, 4).toString();
    expect(head).toBe('%PDF');
  }, 30000);
});
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
pnpm test cv/render.test.ts
```

Expected: FAIL with "Failed to resolve import './render'".

- [ ] **Step 4: Implement `cv/render.ts`**

```typescript
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { chromium } from 'playwright';
import { renderCv, type CvData } from './template-cv';
import { renderCoverLetter, type CoverLetterData } from './template-cover';

const md = new MarkdownIt({ html: false, linkify: true });

export async function renderFile(inputPath: string, outputPath: string): Promise<void> {
  const raw = readFileSync(inputPath, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data as { type?: string } & Record<string, unknown>;

  let html: string;
  if (data.type === 'cv') {
    html = renderCv(data as unknown as CvData);
  } else if (data.type === 'cover-letter') {
    const bodyHtml = md.render(parsed.content);
    html = renderCoverLetter(data as unknown as CoverLetterData, bodyHtml);
  } else {
    throw new Error(`Unknown type in frontmatter: ${data.type}. Expected 'cv' or 'cover-letter'.`);
  }

  // Write HTML to a temp file so Chromium loads it via file:// and resolves font URLs
  const tmp = mkdtempSync(join(tmpdir(), 'cv-render-'));
  const tmpHtml = join(tmp, 'doc.html');
  writeFileSync(tmpHtml, html, 'utf8');

  try {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle' });
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
      });
    } finally {
      await browser.close();
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function parseArgs(argv: string[]): { in: string; out: string } {
  let inPath: string | undefined;
  let outPath: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--in') inPath = argv[++i];
    else if (argv[i] === '--out') outPath = argv[++i];
  }
  if (!inPath) {
    throw new Error('Missing required --in <path>. Example: pnpm cv:render --in cv/templates/cv.md');
  }
  const resolvedIn = resolve(inPath);
  const resolvedOut = outPath
    ? resolve(outPath)
    : join(dirname(resolvedIn), basename(resolvedIn, extname(resolvedIn)) + '.pdf');
  return { in: resolvedIn, out: resolvedOut };
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const args = parseArgs(process.argv.slice(2));
  renderFile(args.in, args.out).then(
    () => {
      console.log(`Rendered ${args.in} → ${args.out}`);
    },
    (err) => {
      console.error(err);
      process.exit(1);
    }
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
pnpm test cv/render.test.ts
```

Expected: PASS. Test takes ~5–15 seconds (Playwright launch is the bottleneck).

- [ ] **Step 6: Smoke-test the CLI manually**

```bash
pnpm cv:render --in cv/fixtures/minimal-cv.md --out /tmp/smoke.pdf && ls -l /tmp/smoke.pdf
```

Expected: prints `Rendered ... → /tmp/smoke.pdf` and shows a non-empty file.

- [ ] **Step 7: Commit**

```bash
git add cv/render.ts cv/render.test.ts cv/fixtures/minimal-cv.md
git commit -m "feat(cv): add render CLI for markdown → PDF"
```

---

## Task 6: Build scaffold CLI (TDD)

**Files:**
- Create: `cv/scaffold.ts`
- Create: `cv/scaffold.test.ts`

`pnpm cv:new <target-dir>` creates the target directory if missing and copies `cv/templates/cv.md` + `cv/templates/cover-letter.md` into it. If the target files already exist, the script refuses to overwrite (safer default).

- [ ] **Step 1: Write the failing test (`cv/scaffold.test.ts`)**

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, existsSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { scaffold } from './scaffold';

const TEMPLATES_DIR = resolve(__dirname, 'templates');

describe('scaffold', () => {
  let scratch: string;

  beforeEach(() => {
    scratch = mkdtempSync(join(tmpdir(), 'cv-scaffold-'));
    // Ensure templates exist for the test (real ones may not yet — write placeholders)
    if (!existsSync(join(TEMPLATES_DIR, 'cv.md'))) {
      mkdirSync(TEMPLATES_DIR, { recursive: true });
      writeFileSync(join(TEMPLATES_DIR, 'cv.md'), '---\ntype: cv\n---\n');
      writeFileSync(join(TEMPLATES_DIR, 'cover-letter.md'), '---\ntype: cover-letter\n---\n');
    }
  });

  afterEach(() => {
    rmSync(scratch, { recursive: true, force: true });
  });

  it('creates the target directory and copies both templates', () => {
    const target = join(scratch, '2026-05-test-role');
    scaffold(target);
    expect(existsSync(join(target, 'cv.md'))).toBe(true);
    expect(existsSync(join(target, 'cover-letter.md'))).toBe(true);
  });

  it('preserves template content', () => {
    const target = join(scratch, '2026-05-test-role');
    scaffold(target);
    const cv = readFileSync(join(target, 'cv.md'), 'utf8');
    expect(cv).toContain('type: cv');
  });

  it('refuses to overwrite existing files', () => {
    const target = join(scratch, '2026-05-test-role');
    scaffold(target);
    expect(() => scaffold(target)).toThrowError(/exists/i);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
pnpm test cv/scaffold.test.ts
```

Expected: FAIL with "Failed to resolve import './scaffold'".

- [ ] **Step 3: Implement `cv/scaffold.ts`**

```typescript
import { mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TEMPLATES_DIR = resolve(__dirname, 'templates');
const FILES = ['cv.md', 'cover-letter.md'];

export function scaffold(targetDir: string): void {
  const target = resolve(targetDir);
  mkdirSync(target, { recursive: true });

  for (const file of FILES) {
    const dest = join(target, file);
    if (existsSync(dest)) {
      throw new Error(`${dest} exists; refusing to overwrite.`);
    }
  }

  for (const file of FILES) {
    copyFileSync(join(TEMPLATES_DIR, file), join(target, file));
  }
}

if (process.argv[1] === __filename) {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: pnpm cv:new <target-directory>');
    process.exit(1);
  }
  try {
    scaffold(target);
    console.log(`Scaffolded application at ${resolve(target)}`);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
pnpm test cv/scaffold.test.ts
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add cv/scaffold.ts cv/scaffold.test.ts
git commit -m "feat(cv): add scaffold CLI for new applications"
```

---

## Task 7: Populate master CV template with Kyle's content

**Files:**
- Create: `cv/templates/cv.md`

This is data entry — transcribing from the existing Canva CV PDF into the schema. No tests; the template-cv tests already validate the rendering pipeline.

- [ ] **Step 1: Create `cv/templates/cv.md`**

```markdown
---
type: cv
name: Kyle Shepherd
role: Senior Software Engineer
contact:
  email: kyleshepherddev@gmail.com
  location: London, UK
  website: www.kyleshepherd.co.uk
  phone: "+44 7951 979 162"

summary: >
  Senior Software Engineer with over 7 years of experience building products and developer tools.
  I work primarily in TypeScript and React, with deep experience in GraphQL, Node.js and Go on the backend.
  I've built real-time features using WebSockets, internal tooling that integrates with Linear and Slack,
  and have deployed to GCP using Kubernetes and Terraform. I care about crafting interfaces that feel
  fast and polished.

experience:
  - company: Kitt
    roles:
      - { title: Senior Software Engineer, dates: May 2026 – Present }
      - { title: Software Engineer,         dates: Aug 2025 – May 2026 }
    bullets:
      - Built new greenfield microservices and frontends using Next.js, TypeScript, and Go.
      - Added features to existing React/Next.js frontends and Go microservices.
      - Created and implemented new database schemas using SQL and GORM.
      - Used Protocol Buffers and GraphQL for service contracts and APIs.
      - Conducted code reviews and spotlight demos to share knowledge and mentor more junior members of the team.
      - Led technical development of greenfield projects.

  - company: SOON_
    roles:
      - { title: Senior Software Engineer, dates: Nov 2022 – June 2025 }
      - { title: Frontend Engineer,         dates: Mar 2021 – Nov 2022 }
    highlights:
      - name: Tom Dixon
        description: Building pages and functionality for SvelteKit-based e-commerce site, updating in-house Shopify GraphQL library in Go, built functionality for CMS users to add Promo Blocks to any PDP to allow better content curation. Site went on to win 4 w3 Awards.
      - name: White Cube
        description: Contributed to their custom inventory project, fixing bugs and adding new functionality in React.js frontend, adding to and maintaining the Node.js backend, led development of suite of image tools written in Node.js and utilising AWS products such as Lambda, SQS and ECS.
      - name: Belstaff
        description: Part of frontend team that built 2021 e-commerce site, built pages and components in Svelte + Sapper, integrating web app with Shopify and our in house CMS.
      - name: SOON_CMS
        description: Worked across the stack, building new functionality in the React/TypeScript + MUI based CMS, creating and implementing new gRPC methods via Protocol Buffers and Go, building and maintaining GraphQL API, leading full-stack development on projects such as Asset Manager and Image Uploader Focal Points, both from feature design to deployment.
    bullets:
      - Translated designs into performant, accessible web applications with a focus on UI polish and responsive layouts.
      - Built and maintained a suite of in-house services written in Go, including a custom CMS and image processing tools.
      - Full-stack responsibilities spanning frontend UI, backend APIs, and infrastructure.
      - Deployed applications to Google Cloud Platform using Helm, Terraform, and Kubernetes.
      - Conducting peer reviews via merge requests and 1-to-1 meetings.

  - company: Built By Cactus
    roles:
      - { title: Midweight Web Developer, dates: Feb 2020 – Mar 2021 }
    bullets:
      - Translated designs and wireframes into fully responsive websites and web apps using WordPress, Laravel, and React.
      - Built visually polished and accessible user interfaces with CSS and modern CSS frameworks (e.g. Tailwind, Bootstrap).

  - company: Eight Wire
    roles:
      - { title: Web Developer, dates: Jan 2019 – Feb 2020 }
    bullets:
      - Built and maintained bespoke WordPress themes using HTML, CSS, and PHP to meet specific design and functionality requirements.

education:
  - institution: Falmouth University
    qualification: Bachelor of Arts in Game Development (Programming)
    dates: 2016 – 2019
    bullets:
      - Graduated with Upper Second Class.
      - Created a variety of games using **Unity** and **C#** in self-driven, multi-disciplinary teams.

  - institution: The Long Eaton School Sixth Form
    dates: 2012 – 2014
    bullets:
      - A-Levels achieved in Maths, Computing, Physics.

achievements:
  - Created Tarkov TK, a Discord bot written in Go that has amassed over 1000 server installs in 5 years.
  - Built two real-time Planning Poker tools integrating with Linear for story point estimation. A Slack bot at SOON_, and a web app using Next.js and WebSockets at Kitt. Used by engineering teams at both companies.
  - Created Checkpnt (checkpnt.app), a social game review platform built with SvelteKit, oRPC, PostgreSQL and Meilisearch.
  - Awarded Unity student scholarship to attend GDC 2018 in San Francisco.

skills:
  - TypeScript/React
  - Node.js
  - GraphQL
  - MySQL/PostgreSQL
  - Go
  - styled-components/CSS-in-JS
  - TailwindCSS
  - Svelte
  - Kubernetes/Terraform
  - GCP/AWS

hobbies:
  - Video games
  - Music (playing drums & guitar)
  - Photography
  - Model building
  - Football

socials:
  - { label: GitHub,   handle: "@kyleshepherd" }
  - { label: LinkedIn, handle: "@kyleshepherddev" }
---
```

- [ ] **Step 2: Render and visually inspect**

```bash
pnpm cv:render --in cv/templates/cv.md
open cv/templates/cv.pdf
```

Expected: a PDF opens. Review against the Canva PDF in `~/Downloads/Kyle Shepherd - Senior Software Engineer CV.pdf`. Note any specific issues for Task 9 (styling iteration).

- [ ] **Step 3: Commit**

```bash
git add cv/templates/cv.md
git commit -m "feat(cv): populate master CV template"
```

---

## Task 8: Create master cover letter template

**Files:**
- Create: `cv/templates/cover-letter.md`

The master cover letter is intentionally generic — it's a starting skeleton with placeholders the `new-application` skill (or you) will rewrite per application. It demonstrates the schema and gives the skill a structural reference.

- [ ] **Step 1: Create `cv/templates/cover-letter.md`**

```markdown
---
type: cover-letter
name: Kyle Shepherd
role: Senior Software Engineer
contact:
  email: kyleshepherddev@gmail.com
  location: London, UK
  website: www.kyleshepherd.co.uk
  phone: "+44 7951 979 162"
recipient: Hiring Team
salutation: Dear Hiring Team,
sign_off: Best regards,
---

I'm excited to apply for the [Role Title] position on the [Team Name] team at [Company]. With over 7 years of experience building performant, user-facing web experiences, I'm eager to bring my skills to [Company].

I'm a Senior Software Engineer with experience building websites and products for global clients such as Belstaff, White Cube, Tom Dixon and Faber & Faber. In this time I have worked with a variety of frontend technologies such as React, Svelte and TypeScript, whilst also working across the full-stack; building APIs and services with Go and Node.js, and handling deployments with Kubernetes and Terraform.

I am currently working at Kitt, a tech-powered managed office company, as a Senior Software Engineer. In this role, I build and add new features to our suite of 60+ microservices and frontends (Go + Next.js) which power services like desk bookings, door access and compliance subscriptions. This involves integrating across multiple internal services and third-party platforms.

[Paragraph tailoring to the company/team — what specifically excites you about this role, and why your experience maps to it.]

[Optional: a concrete example of impact, drawn from a specific project that resonates with the JD.]

Outside of work, I built Checkpnt (checkpnt.app) — a full-stack social game reviewing platform using SvelteKit, oRPC, PostgreSQL and Meilisearch. Building it end-to-end gave me hands-on experience with search integration, social features and designing an engaging user experience from scratch.

[Closing paragraph — why this company specifically, what you'd love to contribute.]

Thank you for taking the time to review my application. I'd love to discuss how I can contribute to your team, and would be happy to provide any more details or examples of work.
```

- [ ] **Step 2: Render and visually inspect**

```bash
pnpm cv:render --in cv/templates/cover-letter.md
open cv/templates/cover-letter.pdf
```

Expected: a multi-paragraph cover letter PDF.

- [ ] **Step 3: Commit**

```bash
git add cv/templates/cover-letter.md
git commit -m "feat(cv): add master cover letter template skeleton"
```

---

## Task 9: Iterate styling to match Canva fidelity

**Files:**
- Modify: `cv/styles/cv.css`

This task is loose by design — visual fidelity to the Canva original requires eyeballing the output. Compare side-by-side to the existing PDFs in `~/Downloads/`. Expected issues to look for:

- Header spacing: name baseline alignment with contact block
- Section heading rule visibility and spacing above
- Experience entry: company chip styling, dates alignment to the right edge
- Stacked role indentation
- Highlights: bolded name + em-dash spacing
- Education two-column proportions
- Skills two-column flow
- Cover letter line-height and paragraph spacing

- [ ] **Step 1: Render both templates**

```bash
pnpm cv:templates
open cv/templates/cv.pdf cv/templates/cover-letter.pdf
```

- [ ] **Step 2: Open Canva originals for comparison**

```bash
open "$HOME/Downloads/Kyle Shepherd - Senior Software Engineer CV.pdf"
open "$HOME/Downloads/Kyle Shepherd - Senior Software Engineer Cover Letter.pdf"
```

- [ ] **Step 3: Iterate**

Note specific deltas, adjust `cv/styles/cv.css`, re-run `pnpm cv:templates`, repeat. Commit each meaningful styling improvement as its own commit (e.g. `style(cv): tighten section heading spacing`).

- [ ] **Step 4: Final commit**

When the rendered output feels right, ensure the final state is committed:
```bash
git status
# if uncommitted CSS changes:
git add cv/styles/cv.css
git commit -m "style(cv): final styling tuning to match Canva fidelity"
```

---

## Task 10: Write `cv/README.md`

**Files:**
- Create: `cv/README.md`

The README documents the schema, commands, and cross-repo workflow so anyone (including future you) can understand the system without reading source.

- [ ] **Step 1: Create `cv/README.md`**

````markdown
# CV & Cover Letter Pipeline

Markdown templates → branded PDFs, matching kyleshepherd.co.uk's design.

## Commands

```sh
# Render a template/application
pnpm cv:render --in cv/templates/cv.md
pnpm cv:render --in cv/templates/cover-letter.md --out cover.pdf
pnpm cv:render --in ~/personal/kyleshepherd-applications/2026-05-stripe/cv.md

# Render both master templates (for styling iteration)
pnpm cv:templates

# Scaffold a new application directory (copies templates)
pnpm cv:new ~/personal/kyleshepherd-applications/2026-05-stripe-expansion
```

## CV schema

`type: cv` frontmatter, body unused.

```yaml
---
type: cv
name: Kyle Shepherd
role: Senior Software Engineer        # editable per application
contact: { email, location, website, phone }

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
    qualification: ...
    dates: 2016 – 2019
    bullets: [ ... ]

achievements: [ ... ]
skills:       [ ... ]
hobbies:      [ ... ]
socials:
  - { label: GitHub,   handle: '@kyleshepherd' }
---
```

Inline markdown supported in bullets, summary, highlight descriptions: `**bold**`, `*italic*`, links.

## Cover letter schema

`type: cover-letter` frontmatter; markdown body becomes the letter prose.

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

First paragraph...

Second paragraph...
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

Or use the `new-application` Claude skill to do all of this conversationally from a job description.

## Architecture

- `template-cv.ts`, `template-cover.ts` — pure functions, data → HTML string. Inline `@font-face` referencing `public/fonts/*.otf` so fonts work in Playwright.
- `render.ts` — CLI; parses markdown, dispatches to template, writes HTML to a temp file, drives Playwright Chromium to produce PDF.
- `scaffold.ts` — copies templates into a target directory.
- `styles/cv.css` — single hand-written stylesheet, mirrors site design tokens.

## Tests

```sh
pnpm test
```

Vitest unit tests on the templates, scaffold, and a render smoke test.
````

- [ ] **Step 2: Commit**

```bash
git add cv/README.md
git commit -m "docs(cv): add pipeline README"
```

---

## Task 11: Write the `new-application` Claude skill

**Files:**
- Create: `.claude/skills/new-application/SKILL.md`

The skill is a local skill (lives in `.claude/skills/` in this repo) because it references this repo's specific scripts and templates. When the user mentions applying for a job, this skill is invoked.

- [ ] **Step 1: Create the skill file**

````markdown
---
name: new-application
description: Use when the user wants to draft CV and cover letter for a new job application. Triggers on phrases like "apply to X", "new application", "draft a cover letter for", "I'm applying for". Scaffolds an application folder in ~/personal/kyleshepherd-applications, drafts notes from the JD, tailors the CV, drafts a role-specific cover letter, and renders both to PDF.
---

# New Job Application

End-to-end workflow for drafting a tailored CV and cover letter from a job description. Driven from this repo (`kyleshepherd.co.uk`); writes output into the separate private applications repo at `~/personal/kyleshepherd-applications`.

## Inputs to gather

1. **Company name** — required.
2. **Role title** — exact title from the JD.
3. **Job description** — paste, file path, or URL. If URL, fetch the page text with WebFetch.
4. **Deadline** — optional, capture if mentioned.

Ask in one batched question. Do not proceed without the JD; the whole point is to ground the materials in real context.

## Steps

### 1. Scaffold the application folder

Derive a slug: `YYYY-MM-<company-slug>-<role-keyword>`. Examples: `2026-05-stripe-expansion`, `2026-06-anthropic-frontend`.

```sh
pnpm cv:new ~/personal/kyleshepherd-applications/<slug>
```

This copies `cv.md` and `cover-letter.md` from `cv/templates/`.

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
- **<Hook 2>** → maps to <...>
- ...

## What I emphasized

- <The 2–4 hooks the cover letter draws on, for interview prep.>
```

Capture the JD verbatim so the link rotting doesn't matter later.

### 3. Tailor `cv.md`

Light touch. The CV is mostly stable across applications. Make these edits only:

- Update `role:` frontmatter to match the company's title for the position (e.g. "Senior Fullstack Engineer" for Stripe, "Senior Software Engineer" elsewhere). Only change if the JD uses a different phrasing than your default.
- Optionally reorder `skills` to lead with the most relevant 3–4 for this role.
- Do **not** touch experience, education, achievements, hobbies, or socials.

### 4. Draft `cover-letter.md`

Replace the body with a role-specific letter. Use these guidelines:

- **Voice:** match Kyle's existing cover letter style (concrete, calm, slightly informal). Reference `~/Downloads/Kyle Shepherd - Senior Software Engineer Cover Letter.pdf` if it's still on disk, otherwise use the master template structure.
- **Structure:** 5–7 paragraphs.
  - Paragraph 1: opening — excited to apply, brief positioning.
  - Paragraph 2: experience summary (clients, tech).
  - Paragraph 3: current role at Kitt, framed to map to the JD.
  - Paragraph 4–5: tailored — pull 2–3 hooks from `notes.md` and connect them to specific experience. Reference projects from `src/content/projects/*.md` for concrete evidence when relevant.
  - Penultimate: a side project paragraph (Checkpnt is the default).
  - Closing: why this company specifically, what you'd love to contribute, polite sign-off.
- **Frontmatter:** update `recipient`, `salutation` (e.g. "Dear Stripe Hiring Team,"), and `role` (the company's title).

### 5. Show drafts for review

Before rendering, present `notes.md`, the diff against `cv.md`, and the full new `cover-letter.md` body to the user. Ask whether to render or revise.

### 6. Render

On approval:

```sh
pnpm cv:render --in ~/personal/kyleshepherd-applications/<slug>/cv.md
pnpm cv:render --in ~/personal/kyleshepherd-applications/<slug>/cover-letter.md
```

### 7. Optional commit

Ask whether to commit in the applications repo:

```sh
cd ~/personal/kyleshepherd-applications && git add <slug>/ && git commit -m "feat: add <Company> <Role> application"
```

Do not auto-commit — wait for explicit user approval each time.

## What this skill does NOT do

- Does not push to GitHub (user does that manually when comfortable).
- Does not auto-submit applications.
- Does not modify `cv/templates/*` in the source repo — those are the master templates.
````

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/new-application/SKILL.md
git commit -m "feat: add new-application Claude skill"
```

---

## Task 12: Bootstrap the applications repo (manual, one-time)

This task is performed once and lives outside this repo. Execute these steps; nothing here is committed in `kyleshepherd.co.uk`.

- [ ] **Step 1: Create directory and init git**

```bash
mkdir -p ~/personal/kyleshepherd-applications
cd ~/personal/kyleshepherd-applications
git init
```

- [ ] **Step 2: Add a README**

Create `~/personal/kyleshepherd-applications/README.md`:

```markdown
# Job Applications

Private archive of role-specific CV and cover letter materials. Each application lives in `YYYY-MM-<company>-<role-keyword>/`.

Templates and rendering tooling live in [`kyleshepherd.co.uk`](https://github.com/kyleshepherd/kyleshepherd.co.uk). To create a new application:

```sh
cd ~/personal/kyleshepherd.co.uk
pnpm cv:new ~/personal/kyleshepherd-applications/<slug>
```

Or invoke the `new-application` Claude skill from any conversation in the `kyleshepherd.co.uk` repo.
```

- [ ] **Step 3: Add a `.gitignore`**

```
.DS_Store
node_modules/
*.swp
```

- [ ] **Step 4: Create the GitHub private repo and push**

```bash
gh repo create kyleshepherd-applications --private --source=. --remote=origin --push
```

Expected: prints the GitHub URL for the new private repo.

- [ ] **Step 5: Initial commit**

```bash
git add README.md .gitignore
git commit -m "chore: initial repo setup"
git push -u origin master
```

---

## Task 13: End-to-end validation

Walk through the `new-application` skill from cold to verify the whole pipeline.

- [ ] **Step 1: From this repo, in a Claude Code conversation, say:**

> "I'm applying for the Software Engineer role at Anthropic. Here's the JD: [paste any real or sample JD]."

- [ ] **Step 2: Verify the skill activates and gathers inputs**

The model should announce it's using the `new-application` skill, then ask clarifying questions (or proceed if all inputs are provided).

- [ ] **Step 3: Verify scaffolding runs**

The model should run `pnpm cv:new ~/personal/kyleshepherd-applications/<slug>` and confirm the folder exists with `cv.md` and `cover-letter.md`.

- [ ] **Step 4: Verify drafts are presented before rendering**

The model should show the drafted `notes.md`, the `cv.md` changes, and the new `cover-letter.md` body. Render should not run without your approval.

- [ ] **Step 5: Verify PDFs are produced**

```bash
ls -la ~/personal/kyleshepherd-applications/<slug>/
```

Expected: `cv.md`, `cv.pdf`, `cover-letter.md`, `cover-letter.pdf`, `notes.md`.

- [ ] **Step 6: Spot-check the PDFs**

Open them. Confirm they're brand-consistent, readable, and well-paginated.

- [ ] **Step 7: Verify the optional commit step**

Confirm the model asks before committing in the applications repo.

---

## Self-Review

**Spec coverage check** (against `docs/superpowers/specs/2026-05-19-cv-pdf-pipeline-design.md`):

| Spec section | Plan task |
|---|---|
| Folder structure | Task 1 (deps), Tasks 2–6 (file creation) |
| Schema (CV) | Task 3 (template), Task 7 (master template) |
| Schema (cover letter) | Task 4 (template), Task 8 (master template) |
| Render tooling | Task 5 |
| Styling | Task 2 (base), Task 9 (iteration) |
| Cross-repo workflow | Task 10 (README), Task 12 (repo bootstrap) |
| Claude skill | Task 11 |
| Implementation phases | Tasks 1–6 (Phase 1), Tasks 7–10 (Phase 2), Tasks 11–13 (Phase 3) |
| Open questions | Deferred per spec — no plan task |

All spec sections have a corresponding task. No gaps.

**Placeholder check:** No `TBD`, `TODO`, or "implement later" in any step. The cover letter master template has bracketed placeholders by design (`[Role Title]`, `[Company]`) — those are intentional template variables, not plan placeholders. The skill SKILL.md has placeholder text in the notes.md / cover letter scaffolds (`<Hook 1 from JD>` etc.) which are part of the skill's output structure, not unfinished plan content.

**Type consistency:** `Contact`, `Role`, `Highlight`, `Experience`, `Education`, `Social`, `CvData`, `CoverLetterData` defined in Task 3 and reused (imported) in Task 4. `fontFaceBlock()` and `loadCss()` exported from `template-cv.ts` and imported in `template-cover.ts`. Consistent.

**Scope:** Plan covers one cohesive feature (CV pipeline) split into setup → unit tests for pure functions → CLIs → content → polish → automation. Reasonable single-plan scope.
