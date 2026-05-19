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
