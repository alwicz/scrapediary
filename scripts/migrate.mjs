import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename } from 'path';
import https from 'https';
import http from 'http';

const INPUT_DIR = join(import.meta.dirname, '..', 'ghost-to-md-output');
const POSTS_DIR = join(import.meta.dirname, '..', 'src', 'content', 'posts');
const PAGES_DIR = join(import.meta.dirname, '..', 'src', 'content', 'pages');
const IMAGES_DIR = join(import.meta.dirname, '..', 'public', 'images');

const GHOST_URL = 'https://www.scrapediary.com';

// Slugs that are static pages, not blog posts
const PAGE_SLUGS = new Set([
  'about', 'hire', 'tools', 'email-extractor', 'youtube-thumbnail-downloader',
  'tripadvisor-crawler-code', 'videos', 'videos-2',
  'code-library', 'code-library-2',
  'apify-code-examples', 'apify-code-examples-2',
  'google-place-api-helpers', 'google-place-api-helpers-2',
]);

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatter = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    frontmatter[key] = value;
  }
  return { frontmatter, body: match[2] };
}

function parseTags(tagStr) {
  if (!tagStr) return [];
  return tagStr
    .split(',')
    .map(t => t.trim())
    .filter(t => !t.startsWith('#') && t !== 'Getting Started' && t.length > 0);
}

function sanitizeImageFilename(url) {
  // Extract the filename from the URL path
  const parts = url.split('/');
  const filename = parts.pop();
  // Build a flat path: year-month-filename
  const year = parts.find((_, i) => parts[i - 1] === 'images') || '';
  const month = parts[parts.indexOf(year) + 1] || '';
  const prefix = year && month ? `${year}-${month}-` : '';
  return prefix + decodeURIComponent(filename).replace(/[^a-zA-Z0-9._-]/g, '-');
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (existsSync(dest)) { resolve(); return; }
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => writeFile(dest, Buffer.concat(chunks)).then(resolve).catch(reject));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function processFile(filename, content) {
  const parsed = parseFrontmatter(content);
  if (!parsed) {
    console.warn(`  Skipping ${filename}: no frontmatter`);
    return null;
  }

  const { frontmatter, body } = parsed;

  // Skip drafts
  if (frontmatter.draft === 'true') {
    return null;
  }

  const slug = frontmatter.slug;
  if (!slug) {
    console.warn(`  Skipping ${filename}: no slug`);
    return null;
  }

  const isPage = PAGE_SLUGS.has(slug);
  const tags = parseTags(frontmatter.tags);
  const date = frontmatter.date_published || '1970-01-01T00:00:00.000Z';
  const updatedDate = frontmatter.date_updated || '';

  // Assign author based on date: 2020 posts are by Bryce Davies, newer by Oliver Lompart
  const year = new Date(date).getFullYear();
  const author = year <= 2020 ? 'Bryce Davies' : 'Oliver Lompart';

  // Find and download all Ghost images
  const ghostImageRegex = /__GHOST_URL__\/content\/images\/[^ )\n"']*/g;
  const imageMatches = [...new Set(body.match(ghostImageRegex) || [])];
  const imageMap = new Map();

  for (const ghostPath of imageMatches) {
    const realUrl = ghostPath.replace('__GHOST_URL__', GHOST_URL);
    const localFilename = sanitizeImageFilename(ghostPath);
    const localPath = join(IMAGES_DIR, localFilename);
    try {
      await downloadFile(realUrl, localPath);
      imageMap.set(ghostPath, `/images/${localFilename}`);
    } catch (err) {
      console.warn(`  Failed to download image: ${realUrl} - ${err.message}`);
      imageMap.set(ghostPath, realUrl);
    }
  }

  // Replace image URLs in body
  let processedBody = body;
  for (const [ghostPath, localPath] of imageMap) {
    processedBody = processedBody.replaceAll(ghostPath, localPath);
  }

  // Replace all remaining __GHOST_URL__ references (internal links)
  processedBody = processedBody.replaceAll('__GHOST_URL__/', '/');

  // Convert image + caption pattern to <figure>/<figcaption> HTML
  // Pattern: ![alt](src)Caption text on same line
  processedBody = processedBody.replace(
    /!\[([^\]]*)\]\(([^)]+)\)([^\n]+)/g,
    (match, alt, src, caption) => {
      const trimmed = caption.trim();
      if (!trimmed) {
        return `\n<figure class="kg-card kg-image-card"><img class="kg-image" src="${src}" alt="${alt}" loading="lazy"></figure>\n`;
      }
      return `\n<figure class="kg-card kg-image-card kg-card-hascaption"><img class="kg-image" src="${src}" alt="${alt}" loading="lazy"><figcaption>${trimmed}</figcaption></figure>\n`;
    }
  );
  // Also handle images on their own line (no caption)
  processedBody = processedBody.replace(
    /^!\[([^\]]*)\]\(([^)]+)\)$/gm,
    '\n<figure class="kg-card kg-image-card"><img class="kg-image" src="$2" alt="$1" loading="lazy"></figure>\n'
  );

  // Build new frontmatter
  const newFrontmatter = [
    '---',
    `title: ${JSON.stringify(frontmatter.title)}`,
    `slug: "${slug}"`,
    `date: "${date}"`,
    `author: "${author}"`,
  ];
  if (updatedDate) {
    newFrontmatter.push(`updatedDate: "${updatedDate}"`);
  }
  if (tags.length > 0) {
    newFrontmatter.push(`tags: [${tags.map(t => JSON.stringify(t)).join(', ')}]`);
  }
  newFrontmatter.push('---');

  const outputContent = newFrontmatter.join('\n') + '\n' + processedBody;
  const outputDir = isPage ? PAGES_DIR : POSTS_DIR;
  const outputFile = join(outputDir, `${slug}.md`);

  await writeFile(outputFile, outputContent, 'utf-8');
  return { slug, isPage, imageCount: imageMatches.length };
}

async function main() {
  await mkdir(POSTS_DIR, { recursive: true });
  await mkdir(PAGES_DIR, { recursive: true });
  await mkdir(IMAGES_DIR, { recursive: true });

  const files = (await readdir(INPUT_DIR)).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} markdown files`);

  let postCount = 0;
  let pageCount = 0;
  let skippedCount = 0;
  let totalImages = 0;

  for (const file of files) {
    const content = await readFile(join(INPUT_DIR, file), 'utf-8');
    const result = await processFile(file, content);
    if (result) {
      if (result.isPage) pageCount++;
      else postCount++;
      totalImages += result.imageCount;
      console.log(`  ✓ ${result.isPage ? 'PAGE' : 'POST'}: ${result.slug} (${result.imageCount} images)`);
    } else {
      skippedCount++;
    }
  }

  console.log(`\nDone! ${postCount} posts, ${pageCount} pages, ${skippedCount} skipped, ${totalImages} images processed`);
}

main().catch(console.error);
