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
