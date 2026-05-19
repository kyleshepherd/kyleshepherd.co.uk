import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, existsSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scaffold } from './scaffold';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = resolve(__dirname, 'templates');

describe('scaffold', () => {
  let scratch: string;

  beforeEach(() => {
    scratch = mkdtempSync(join(tmpdir(), 'cv-scaffold-'));
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
