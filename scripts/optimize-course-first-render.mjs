import assert from 'node:assert/strict';
import { lstat, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const target = 'academy/courses/ai-content-real-estate/index.html';

async function readInsideDist(relative) {
  const absolute = path.resolve(dist, relative);
  const contained = path.relative(dist, absolute);
  assert(
    contained &&
      contained !== '..' &&
      !contained.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(contained),
    'Course stylesheet path escapes dist',
  );
  const base = await lstat(dist);
  assert(base.isDirectory() && !base.isSymbolicLink(), 'Unsafe dist directory');
  let current = dist;
  const parts = contained.split(path.sep);
  for (let index = 0; index < parts.length; index++) {
    current = path.join(current, parts[index]);
    const item = await lstat(current);
    assert(!item.isSymbolicLink(), 'Linked build output is not supported');
    assert(
      index === parts.length - 1 ? item.isFile() : item.isDirectory(),
      'Unexpected build output type',
    );
  }
  return readFile(absolute);
}

function safeStylesheet(bytes) {
  const css = bytes.toString('utf8');
  assert(Buffer.from(css, 'utf8').equals(bytes), 'Stylesheet must be UTF-8');
  assert(
    !/\\|@import\b|@charset\b|<\/style/iu.test(css),
    'Unsafe stylesheet import, escape, charset or style closing tag',
  );
  return css;
}

const before = await readInsideDist(target);
const html = before.toString('utf8');
assert(Buffer.from(html, 'utf8').equals(before), 'Course HTML must be UTF-8');

const replacements = [];
let inlinedCourseStyles = 0;
let deferredSharedStyles = 0;
for (const match of html.matchAll(/<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/giu)) {
  const tag = match[0];
  const exact =
    /^<link rel="stylesheet" href="(\/_astro\/[A-Za-z0-9_-][A-Za-z0-9._-]*\.css)"\s*\/?>$/u.exec(
      tag,
    );
  if (!exact) continue;

  const href = exact[1];
  if (href.includes('/ai-content-real-estate.')) {
    const css = safeStylesheet(await readInsideDist(href.slice(1)));
    replacements.push({
      start: match.index,
      end: match.index + tag.length,
      replacement: `<style>${css}</style>`,
    });
    inlinedCourseStyles += 1;
    continue;
  }

  replacements.push({
    start: match.index,
    end: match.index + tag.length,
    replacement: `<link rel="preload" as="style" href="${href}" data-course-deferred-style><noscript><link rel="stylesheet" href="${href}"></noscript>`,
  });
  deferredSharedStyles += 1;
}

assert(inlinedCourseStyles === 1, 'Expected one generated course stylesheet');
assert(deferredSharedStyles > 0, 'Expected at least one shared stylesheet');

let output = html;
for (const replacement of replacements.toReversed()) {
  output =
    output.slice(0, replacement.start) +
    replacement.replacement +
    output.slice(replacement.end);
}

const activation = `<script>(()=>{for(const link of document.querySelectorAll('link[data-course-deferred-style]')){const activate=()=>{link.removeAttribute('as');link.removeAttribute('data-course-deferred-style');link.rel='stylesheet'};link.addEventListener('load',activate,{once:true});link.addEventListener('error',()=>link.remove(),{once:true})}})();</script>`;
assert(output.includes('</head>'), 'Course document head is missing');
output = output.replace('</head>', `${activation}</head>`);

assert(
  (await readInsideDist(target)).equals(before),
  'Course HTML changed during transform',
);
await writeFile(path.join(dist, target), output, 'utf8');

console.log(
  JSON.stringify({
    inlinedCourseStyles,
    deferredSharedStyles,
    htmlBeforeBytes: before.length,
    htmlAfterBytes: Buffer.byteLength(output, 'utf8'),
  }),
);
