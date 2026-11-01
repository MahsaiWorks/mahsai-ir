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
const deferredStylesheetHrefs = [
  ...html.matchAll(
    /<link rel="preload" as="style" href="([^"]+)" data-course-deferred-style>/gu,
  ),
].map((match) => match[1]);
const inlineStyleCount = (html.match(/<style>/gu) ?? []).length;

assert(
  htmlBytes.byteLength <= 65_000,
  `Course document exceeds the first-render budget: ${htmlBytes.byteLength} bytes`,
);
assert(
  inlineStyleCount === 1,
  'Only the compact course-critical stylesheet may be inlined.',
);
assert(
  deferredStylesheetHrefs.length > 0,
  'Course shared stylesheet must be preloaded without blocking first paint.',
);
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
    deferredStylesheetCount: deferredStylesheetHrefs.length,
    inlineStyleCount,
    posterBytes: posterSize,
  }),
);
