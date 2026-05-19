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
