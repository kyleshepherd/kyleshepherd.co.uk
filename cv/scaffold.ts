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
