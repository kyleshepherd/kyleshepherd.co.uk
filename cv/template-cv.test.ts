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
    expect(html).not.toContain('>Achievements / Side Projects<');
    expect(html).not.toContain('>Hobbies / Interests<');
    expect(html).not.toContain('>Socials<');
  });
});
