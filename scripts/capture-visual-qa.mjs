import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const baseUrl = process.env.MAHSAI_AUDIT_URL ?? 'http://127.0.0.1:4321';
const outputRoot = path.join(process.cwd(), 'outputs', 'visual-qa');
const browserCandidates =
  process.platform === 'win32'
    ? [
        process.env.MAHSAI_BROWSER_PATH,
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      ]
    : [
        process.env.MAHSAI_BROWSER_PATH,
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium',
      ];
const executablePath = browserCandidates.find(
  (candidate) => candidate && fs.existsSync(candidate),
);

if (!executablePath) {
  throw new Error('Chrome/Chromium برای ثبت شاهد تصویری پیدا نشد.');
}

const cases = [
  {
    slug: 'home',
    route: '/',
    selectors: ['.mahsai-hero', '.latest-site-updates'],
  },
  {
    slug: 'metrazh',
    route: '/apps/metrazh/',
    selectors: ['.metrazh-product-hero', '.metrazh-site-story'],
  },
  {
    slug: 'tools',
    route: '/tools/',
    selectors: ['.tool-index-hero', '.tool-practical-shelf'],
  },
  {
    slug: 'follow-up-tool',
    route: '/tools/follow-up-message/',
    selectors: ['.practical-tool-hero', '.practical-tool'],
  },
  {
    slug: 'article',
    route: '/articles/complete-property-file/',
    selectors: ['.article-stage', '.article-practical-kit'],
  },
  {
    slug: 'academy',
    route: '/academy/',
    selectors: ['.academy-hero', '.academy-vote-card'],
  },
];
const profiles = [
  { name: 'desktop-1440', viewport: { width: 1440, height: 1000 } },
  { name: 'mobile-390', viewport: { width: 390, height: 844 } },
];

fs.mkdirSync(outputRoot, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });
const manifest = [];

try {
  for (const profile of profiles) {
    const context = await browser.newContext({
      locale: 'fa-IR',
      viewport: profile.viewport,
      reducedMotion: 'reduce',
      deviceScaleFactor: 1,
    });

    for (const item of cases) {
      const page = await context.newPage();
      const response = await page.goto(
        new URL(item.route, baseUrl).toString(),
        {
          waitUntil: 'networkidle',
        },
      );
      if (!response?.ok()) {
        throw new Error(`${item.route} پاسخ معتبر نداد.`);
      }

      for (const [index, selector] of item.selectors.entries()) {
        const target = page.locator(selector).first();
        await target.scrollIntoViewIfNeeded();
        await page.evaluate(() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        });
        const filename = `${profile.name}__${item.slug}__${index + 1}.jpg`;
        const outputPath = path.join(outputRoot, filename);
        await target.screenshot({
          path: outputPath,
          type: 'jpeg',
          quality: 78,
          animations: 'disabled',
        });
        manifest.push({
          profile: profile.name,
          route: item.route,
          selector,
          file: path.relative(process.cwd(), outputPath).replaceAll('\\', '/'),
        });
      }

      await page.close();
    }

    await context.close();
  }
} finally {
  await browser.close();
}

fs.writeFileSync(
  path.join(outputRoot, 'manifest.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), manifest }, null, 2)}\n`,
);

console.log(`Visual QA captured: ${manifest.length} focused screenshots.`);
