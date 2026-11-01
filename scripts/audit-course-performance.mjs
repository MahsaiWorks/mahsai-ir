import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const courseDocument = path.join(
  root,
  'dist',
  'academy',
  'courses',
  'ai-content-real-estate',
  'index.html',
);
const poster = path.join(
  root,
  'dist',
  'assets',
  'academy',
  'abr-moshaver',
  'course-introduction-poster-v2.webp',
);

const htmlBytes = await readFile(courseDocument);
const html = htmlBytes.toString('utf8');
const stylesheetHrefs = [
  ...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/gu),
].map((match) => match[1]);

assert(
  htmlBytes.byteLength <= 40_000,
  `Course document exceeds the first-render budget: ${htmlBytes.byteLength} bytes`,
);
assert(
  !/<style\b/iu.test(html),
  'Course styles must remain cacheable stylesheets instead of blocking HTML parsing.',
);
assert(stylesheetHrefs.length > 0, 'Course stylesheet is missing.');
assert(
  html.includes(
    'rel="preload" as="image" href="/assets/academy/abr-moshaver/course-hero-banner-20261031.webp" fetchpriority="high"',
  ),
  'Course hero image must be preloaded at high priority.',
);
assert(
  html.includes(
    'poster="/assets/academy/abr-moshaver/course-introduction-poster-v2.webp"',
  ),
  'Course preview must reference its optimized WebP poster.',
);
assert(
  !html.includes('course-introduction-poster-v2.png'),
  'Course preview must not request the legacy multi-megabyte PNG poster.',
);

const posterSize = (await stat(poster)).size;
assert(
  posterSize <= 150 * 1024,
  `Course video poster exceeds its transfer budget: ${posterSize} bytes`,
);

console.log(
  JSON.stringify({
    courseDocumentBytes: htmlBytes.byteLength,
    stylesheetCount: stylesheetHrefs.length,
    posterBytes: posterSize,
  }),
);
