import fs from 'node:fs';
import path from 'node:path';

const distRoot = path.resolve('dist');
const failures = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(entryPath);
    return entryPath.endsWith('.html') ? [entryPath] : [];
  });
}

if (!fs.existsSync(distRoot)) {
  console.error('پوشه dist پیدا نشد؛ ابتدا سایت را build کنید.');
  process.exit(1);
}

const links = new Set();
for (const file of walk(distRoot)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(
    /<a\b[^>]*href=["'](https?:\/\/[^"']+)["']/gi,
  )) {
    links.add(match[1].replaceAll('&amp;', '&'));
  }
}

async function checkLink(url) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; MAHSAI-LinkAudit/1.0; +https://mahsai.ir/)',
        range: 'bytes=0-0',
      },
    });
    const reachable =
      (response.status >= 200 && response.status < 400) ||
      [401, 403, 405, 429].includes(response.status);
    if (!reachable) failures.push(`${response.status} ${url}`);
    return { url, status: response.status, reachable };
  } catch (error) {
    failures.push(`${error.name}: ${url}`);
    return { url, status: error.name, reachable: false };
  }
}

const queue = [...links];
const results = [];
const workers = Array.from({ length: Math.min(5, queue.length) }, async () => {
  while (queue.length > 0) {
    const url = queue.shift();
    if (url) results.push(await checkLink(url));
  }
});
await Promise.all(workers);

const outputDirectory = path.resolve('outputs');
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(
  path.join(outputDirectory, 'external-links.json'),
  `${JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2)}\n`,
);

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`External link audit passed: ${results.length} unique links.`);
