import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import prettier from 'prettier';

const appPath = resolve('src/content/apps/metrazh.json');
const apply = process.argv.includes('--apply');
const app = JSON.parse(await readFile(appPath, 'utf8'));
const storeUrl = app.storeLinks.find((link) =>
  link.url.includes('cafebazaar.ir'),
)?.url;

if (!storeUrl) throw new Error('CafeBazaar URL is missing from Metrazh data.');

const response = await fetch(storeUrl, {
  headers: {
    'user-agent':
      'MAHSAI-Site-Metadata-Check/1.0 (+https://mahsai.ir/support/)',
  },
  signal: AbortSignal.timeout(30_000),
});
if (!response.ok) {
  throw new Error(`CafeBazaar returned HTTP ${response.status}.`);
}

const html = await response.text();
const scriptPattern =
  /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
const candidates = [];
for (const match of html.matchAll(scriptPattern)) {
  try {
    const parsed = JSON.parse(match[1]);
    candidates.push(...(Array.isArray(parsed) ? parsed : [parsed]));
  } catch {
    // Ignore unrelated invalid JSON-LD blocks and keep looking.
  }
}

const flatten = (value) => {
  if (!value || typeof value !== 'object') return [];
  return [value, ...(Array.isArray(value['@graph']) ? value['@graph'] : [])];
};
const software = candidates.flatMap(flatten).find((entry) => {
  const types = Array.isArray(entry['@type'])
    ? entry['@type']
    : [entry['@type']];
  return types.some((type) =>
    ['SoftwareApplication', 'MobileApplication'].includes(type),
  );
});

if (!software?.softwareVersion || !software?.dateModified) {
  throw new Error('CafeBazaar softwareVersion/dateModified was not found.');
}

const remoteVersion = String(software.softwareVersion).trim();
const remoteUpdatedAt = new Date(software.dateModified)
  .toISOString()
  .slice(0, 10);
if (remoteVersion !== app.version) {
  throw new Error(
    `CafeBazaar has version ${remoteVersion}, but the site has ${app.version}. Run the product release evidence review before changing public claims.`,
  );
}
if (remoteUpdatedAt !== app.storeUpdatedAt) {
  throw new Error(
    `CafeBazaar date is ${remoteUpdatedAt}, but the site has ${app.storeUpdatedAt}. Review the store release before applying.`,
  );
}

const checkedAt = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Tehran',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

if (apply && app.storeCheckedAt !== checkedAt) {
  app.storeCheckedAt = checkedAt;
  const formatted = await prettier.format(JSON.stringify(app), {
    parser: 'json',
  });
  await writeFile(appPath, formatted, 'utf8');
  console.log(`Updated verified store check date to ${checkedAt}.`);
} else {
  console.log(
    `CafeBazaar matches Metrazh ${remoteVersion}, updated ${remoteUpdatedAt}; checked ${checkedAt}.`,
  );
}
