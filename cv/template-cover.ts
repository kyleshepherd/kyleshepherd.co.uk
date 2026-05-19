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
