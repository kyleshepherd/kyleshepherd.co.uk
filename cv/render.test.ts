import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtempSync, rmSync, statSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderFile } from './render';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
    const head = readFileSync(out).subarray(0, 4).toString();
    expect(head).toBe('%PDF');
  }, 30000);
});
