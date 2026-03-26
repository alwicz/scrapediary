// Post-build script: prefix all internal absolute URLs with the base path
// This catches raw HTML in markdown that rehype plugins can't reach

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DIST = join(import.meta.dirname, '..', 'dist');
const BASE = '/scrapediary/';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await walk(DIST);
  let fixedCount = 0;

  for (const file of files) {
    let html = await readFile(file, 'utf-8');
    const original = html;

    // Fix src="/images/..." and src="/content/..." (not already prefixed)
    html = html.replace(/src="\/(?!scrapediary\/|\/|https?:)/g, `src="${BASE}`);
    // Fix href="/<slug>/" internal links (not already prefixed, not external)
    html = html.replace(/href="\/(?!scrapediary\/|\/|https?:|#|mailto:)/g, `href="${BASE}`);

    if (html !== original) {
      await writeFile(file, html, 'utf-8');
      fixedCount++;
    }
  }

  console.log(`Fixed base URLs in ${fixedCount} of ${files.length} HTML files`);
}

main().catch(console.error);
