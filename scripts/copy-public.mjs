import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const publicDir = 'public';
const distDir = 'dist';

if (existsSync(publicDir)) {
  mkdirSync(distDir, { recursive: true });

  for (const entry of readdirSync(publicDir)) {
    cpSync(join(publicDir, entry), join(distDir, entry), {
      recursive: true,
    });
  }
}
