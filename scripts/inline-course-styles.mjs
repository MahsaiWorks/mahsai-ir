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
  const urls = [
    ...css.matchAll(/\burl\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/giu),
  ];
  assert(
    urls.length === (css.match(/\burl\(/giu) ?? []).length,
    'Unsupported stylesheet URL syntax',
  );
  for (const match of urls) {
    const url = (match[1] ?? match[2] ?? match[3]).trim();
    assert(
      ((url.startsWith('/') && !url.startsWith('//')) ||
        /^data:/iu.test(url)) &&
        !/[\u0000-\u001f\u007f]/u.test(url),
      'Relative or external stylesheet URL is not supported',
    );
  }
  return css;
}

const before = await readInsideDist(target);
const html = before.toString('utf8');
assert(Buffer.from(html, 'utf8').equals(before), 'Course HTML must be UTF-8');
const replacements = [];
for (const match of html.matchAll(/<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/giu)) {
  const tag = match[0];
  const rel = tag.match(/\srel\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/iu);
  if (
    !(rel?.[1] ?? rel?.[2] ?? rel?.[3] ?? '')
      .toLowerCase()
      .split(/\s+/u)
      .includes('stylesheet')
  ) {
    continue;
  }
  const exact =
    /^<link rel="stylesheet" href="(\/_astro\/[A-Za-z0-9_-][A-Za-z0-9._-]*\.css)"\s*\/?>$/u.exec(
      tag,
    );
  assert(
    exact,
    'Unsupported course stylesheet tag; preserve its semantics explicitly',
  );
  const css = safeStylesheet(await readInsideDist(exact[1].slice(1)));
  replacements.push({ start: match.index, end: match.index + tag.length, css });
}
assert(replacements.length > 0, 'No generated course stylesheets found');
let output = html;
for (const replacement of replacements.toReversed()) {
  output =
    output.slice(0, replacement.start) +
    `<style>${replacement.css}</style>` +
    output.slice(replacement.end);
}
assert(
  (await readInsideDist(target)).equals(before),
  'Course HTML changed during transform',
);
await writeFile(path.join(dist, target), output, 'utf8');
console.log(
  JSON.stringify({
    courseStylesheetsInlined: replacements.length,
    htmlBeforeBytes: before.length,
    htmlAfterBytes: Buffer.byteLength(output, 'utf8'),
  }),
);
