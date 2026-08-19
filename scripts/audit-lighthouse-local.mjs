import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { basename, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import process from 'node:process';
import lighthouse from 'lighthouse';

const require = createRequire(import.meta.url);
const config = require('../lighthouserc.cjs');
const assertions = config.ci.assert.assertions;
const baseUrl = new URL(
  process.env.MAHSAI_AUDIT_URL || 'http://127.0.0.1:4321',
);
const outputDirectory = resolve('outputs/lighthouse-local');

const browserCandidates =
  process.platform === 'win32'
    ? [
        process.env.CHROME_PATH,
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      ]
    : [
        process.env.CHROME_PATH,
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium',
      ];
const browserPath = browserCandidates.find(
  (candidate) => candidate && existsSync(candidate),
);

if (!browserPath) {
  throw new Error(
    'Chrome/Edge was not found. Set CHROME_PATH to a Chromium-based browser.',
  );
}

function getFreePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.unref();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        server.close();
        reject(new Error('Could not allocate a debugging port.'));
        return;
      }
      server.close(() => resolvePort(address.port));
    });
  });
}

async function waitForBrowser(port) {
  const endpoint = `http://127.0.0.1:${port}/json/version`;
  const deadline = Date.now() + 20_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) return;
    } catch {
      // The browser is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 200));
  }

  throw new Error(`Browser debugging endpoint did not open: ${endpoint}`);
}

function assertionValue(lhr, assertionId, options) {
  if (assertionId.startsWith('categories:')) {
    const category = assertionId.split(':')[1];
    return lhr.categories[category]?.score;
  }

  if (assertionId.startsWith('resource-summary:')) {
    const [, resourceType, metric] = assertionId.split(':');
    const item = lhr.audits['resource-summary']?.details?.items?.find(
      (entry) => entry.resourceType === resourceType,
    );
    return metric === 'size' ? item?.transferSize : item?.requestCount;
  }

  const audit = lhr.audits[assertionId];
  if (Object.hasOwn(options, 'maxLength')) return audit?.details?.items?.length;
  if (
    Object.hasOwn(options, 'maxNumericValue') ||
    Object.hasOwn(options, 'minNumericValue')
  ) {
    return audit?.numericValue;
  }
  return audit?.score;
}

function checkAssertion(value, options) {
  if (value === undefined || value === null) return false;
  if (options.minScore !== undefined && value < options.minScore) return false;
  if (options.maxScore !== undefined && value > options.maxScore) return false;
  if (
    options.maxNumericValue !== undefined &&
    value > options.maxNumericValue
  ) {
    return false;
  }
  if (
    options.minNumericValue !== undefined &&
    value < options.minNumericValue
  ) {
    return false;
  }
  if (options.maxLength !== undefined && value > options.maxLength)
    return false;
  if (options.minLength !== undefined && value < options.minLength)
    return false;
  return true;
}

function describeLimit(options) {
  const entry = Object.entries(options)[0];
  return entry ? `${entry[0]}=${entry[1]}` : 'configured threshold';
}

async function closeBrowser(browser, userDataDirectory) {
  if (browser.exitCode === null) {
    if (process.platform === 'win32') {
      spawnSync('taskkill', ['/PID', String(browser.pid), '/T', '/F'], {
        stdio: 'ignore',
        windowsHide: true,
      });
    } else {
      browser.kill('SIGTERM');
    }
  }

  const safePrefix = 'mahsai-lighthouse-';
  if (
    basename(userDataDirectory).startsWith(safePrefix) &&
    resolve(userDataDirectory).startsWith(resolve(tmpdir()))
  ) {
    await rm(userDataDirectory, {
      recursive: true,
      force: true,
      maxRetries: 5,
    });
  }
}

const port = await getFreePort();
const userDataDirectory = await mkdtemp(join(tmpdir(), 'mahsai-lighthouse-'));
const browser = spawn(
  browserPath,
  [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--remote-debugging-address=127.0.0.1',
    `--user-data-dir=${userDataDirectory}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-background-networking',
    '--disable-component-update',
    'about:blank',
  ],
  { stdio: 'ignore', windowsHide: true },
);

let failed = false;
const rows = [];

try {
  await waitForBrowser(port);
  await mkdir(outputDirectory, { recursive: true });

  for (const configuredUrl of config.ci.collect.url) {
    const pathname = new URL(configuredUrl).pathname;
    const targetUrl = new URL(pathname, baseUrl).toString();
    process.stdout.write(`Lighthouse: ${targetUrl}\n`);

    const result = await lighthouse(targetUrl, {
      port,
      output: 'json',
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      maxWaitForLoad: 90_000,
    });

    if (!result)
      throw new Error(`Lighthouse returned no result for ${targetUrl}`);
    const slug =
      pathname === '/'
        ? 'home'
        : pathname.replaceAll('/', '-').replace(/^-|-$/g, '');
    await writeFile(
      join(outputDirectory, `${slug}.json`),
      JSON.stringify(result.lhr, null, 2),
      'utf8',
    );

    for (const [assertionId, assertionConfig] of Object.entries(assertions)) {
      const [severity, options = {}] = assertionConfig;
      const value = assertionValue(result.lhr, assertionId, options);
      const passed = checkAssertion(value, options);
      rows.push({ page: pathname, assertion: assertionId, value, passed });
      if (!passed && severity === 'error') failed = true;
    }

    const categoryScores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([id, category]) => [
        id,
        Math.round((category.score ?? 0) * 100),
      ]),
    );
    process.stdout.write(
      `  score P${categoryScores.performance} A${categoryScores.accessibility} B${categoryScores['best-practices']} S${categoryScores.seo}; LCP ${Math.round(result.lhr.audits['largest-contentful-paint'].numericValue)} ms\n`,
    );
  }
} finally {
  await closeBrowser(browser, userDataDirectory);
}

const failures = rows.filter((row) => !row.passed);
if (failures.length > 0) {
  process.stderr.write('\nFailed Lighthouse budgets:\n');
  for (const row of failures) {
    const [, options = {}] = assertions[row.assertion];
    process.stderr.write(
      `- ${row.page} ${row.assertion}: ${String(row.value)} (${describeLimit(options)})\n`,
    );
  }
}

if (failed) process.exitCode = 1;
else
  process.stdout.write(
    `Lighthouse budgets passed for ${config.ci.collect.url.length} routes.\n`,
  );
