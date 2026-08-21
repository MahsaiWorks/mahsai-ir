import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright-core';

const baseUrl = process.env.MAHSAI_AUDIT_URL ?? 'http://127.0.0.1:4321';
const accessibilityRoutes = [
  '/',
  '/apps/',
  '/apps/metrazh/',
  '/apps/metrazh/changelog/',
  '/real-estate-software/',
  '/guides/',
  '/guides/property-files/',
  '/academy/',
  '/academy/first-organized-property-file/',
  '/articles/',
  '/articles/topics/files/',
  '/articles/complete-property-file/',
  '/articles/name-property-files/',
  '/resources/real-estate-checklists/',
  '/about/',
  '/support/',
];

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
        '/usr/bin/chromium-browser',
      ];
const executablePath = browserCandidates.find(
  (candidate) => candidate && fs.existsSync(candidate),
);

if (!executablePath) {
  console.error(
    'مرورگر Chrome/Chromium پیدا نشد. مسیر را در MAHSAI_BROWSER_PATH تنظیم کنید.',
  );
  process.exit(1);
}

const profiles = [
  { name: 'desktop', viewport: { width: 1440, height: 1000 } },
  { name: 'reflow-400', viewport: { width: 320, height: 800 } },
];
const failures = [];
const report = [];
const seoReport = [];
const browser = await chromium.launch({ executablePath, headless: true });

try {
  for (const profile of profiles) {
    const context = await browser.newContext({
      locale: 'fa-IR',
      viewport: profile.viewport,
      reducedMotion: 'reduce',
    });

    for (const route of accessibilityRoutes) {
      const page = await context.newPage();
      const url = new URL(route, baseUrl).toString();
      const response = await page.goto(url, { waitUntil: 'networkidle' });

      if (!response?.ok()) {
        failures.push(`${profile.name} ${route}: پاسخ HTTP معتبر نیست.`);
        await page.close();
        continue;
      }

      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      for (const violation of axe.violations) {
        for (const node of violation.nodes) {
          failures.push(
            `${profile.name} ${route}: ${violation.id} در ${node.target.join(' ')} — ${node.failureSummary ?? violation.help}`,
          );
        }
      }

      const layout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
      }));
      if (layout.scrollWidth > layout.clientWidth + 1) {
        failures.push(
          `${profile.name} ${route}: پهنای صفحه ${layout.scrollWidth}px از نمای ${layout.clientWidth}px بیشتر است.`,
        );
      }
      if (layout.lang !== 'fa-IR' || layout.dir !== 'rtl') {
        failures.push(`${profile.name} ${route}: زبان یا جهت سند فارسی نیست.`);
      }

      await page.keyboard.press('Tab');
      const skipLinkFocused = await page.evaluate(
        () => document.activeElement?.classList.contains('skip-link') ?? false,
      );
      if (!skipLinkFocused) {
        failures.push(
          `${profile.name} ${route}: نخستین توقف صفحه‌کلید روی پیوند پرش نیست.`,
        );
      }

      if (route === '/articles/name-property-files/') {
        await page.locator('select[name="transaction"]').selectOption('فروش');
        await page.locator('input[name="neighborhood"]').fill('جنت‌آباد جنوبی');
        await page
          .locator('select[name="propertyType"]')
          .selectOption('آپارتمان');
        await page.locator('input[name="clue"]').fill('۲خواب، طبقهٔ ۳');

        const builderState = await page.evaluate(() => ({
          output:
            document
              .querySelector('[data-file-name-output]')
              ?.textContent?.trim() ?? '',
          copyDisabled:
            document.querySelector('[data-file-name-copy]')?.disabled ?? true,
        }));
        const expectedTitle =
          'فروش | جنت‌آباد جنوبی | آپارتمان | ۲خواب، طبقهٔ ۳';
        if (
          builderState.output !== expectedTitle ||
          builderState.copyDisabled
        ) {
          failures.push(
            `${profile.name} ${route}: عنوان‌ساز خروجی کامل و قابل کپی نساخت.`,
          );
        }

        await page.locator('.builder-reset').click();
        await page.waitForTimeout(0);
        const resetDisabled = await page
          .locator('[data-file-name-copy]')
          .isDisabled();
        if (!resetDisabled) {
          failures.push(
            `${profile.name} ${route}: پاک‌کردن فرم، کپی عنوان ناقص را غیرفعال نکرد.`,
          );
        }
      }

      if (route === '/apps/metrazh/' && profile.name === 'reflow-400') {
        const heroActions = await page
          .locator('.metrazh-product-hero .hero-actions a')
          .evaluateAll((links) =>
            links.map((link) => ({
              href: link.getAttribute('href') ?? '',
              text: link.textContent?.replace(/\s+/g, ' ').trim() ?? '',
            })),
          );
        if (
          heroActions.length !== 2 ||
          !heroActions.some((action) =>
            action.href.includes('cafebazaar.ir'),
          ) ||
          !heroActions.some((action) => action.href === '#inside-metrazh')
        ) {
          failures.push(
            `${profile.name} ${route}: قهرمان صفحه باید فقط اقدام بازار و دیدن روش کار را داشته باشد.`,
          );
        }

        const dock = page.locator('.mobile-install-dock');
        const dockStartsHidden = await dock.evaluate(
          (element) =>
            element.hasAttribute('hidden') &&
            element.getAttribute('data-visible') === 'false',
        );
        if (!dockStartsHidden) {
          failures.push(
            `${profile.name} ${route}: دکمهٔ نصب چسبان پیش از شاهد محصول پنهان نیست.`,
          );
        }

        await page
          .locator('[data-install-dock-trigger]')
          .scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
        const dockRevealed = await dock.evaluate(
          (element) =>
            !element.hasAttribute('hidden') &&
            element.getAttribute('data-visible') === 'true',
        );
        if (!dockRevealed) {
          failures.push(
            `${profile.name} ${route}: دکمهٔ نصب پس از دیده‌شدن شاهد محصول ظاهر نشد.`,
          );
        }
      }

      report.push({
        profile: profile.name,
        route,
        violations: axe.violations.length,
        passes: axe.passes.length,
        layout,
      });
      await page.close();
    }

    await context.close();
  }

  const sitemapIndexResponse = await fetch(
    new URL('/sitemap-index.xml', baseUrl),
  );
  if (!sitemapIndexResponse.ok) {
    failures.push(
      'نقشهٔ سایت برای ممیزی پیش‌نمایش نتیجهٔ جست‌وجو در دسترس نیست.',
    );
  } else {
    const sitemapIndex = await sitemapIndexResponse.text();
    const sitemapLocations = [
      ...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g),
    ].map((match) => match[1]);
    const seoRoutes = new Set();

    for (const location of sitemapLocations) {
      const localSitemap = new URL(new URL(location).pathname, baseUrl);
      const response = await fetch(localSitemap);
      if (!response.ok) {
        failures.push(`نقشهٔ فرعی در دسترس نیست: ${localSitemap.pathname}`);
        continue;
      }
      const sitemap = await response.text();
      for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        seoRoutes.add(new URL(match[1]).pathname);
      }
    }

    const context = await browser.newContext({
      locale: 'fa-IR',
      viewport: { width: 1440, height: 1000 },
    });
    const titles = new Map();
    const descriptions = new Map();

    for (const route of seoRoutes) {
      const page = await context.newPage();
      const response = await page.goto(new URL(route, baseUrl).toString(), {
        waitUntil: 'networkidle',
      });
      if (!response?.ok()) {
        failures.push(`seo ${route}: پاسخ HTTP معتبر نیست.`);
        await page.close();
        continue;
      }

      const snippet = await page.evaluate(async () => {
        const title = document.title.trim();
        const description =
          document
            .querySelector('meta[name="description"]')
            ?.getAttribute('content')
            ?.trim() ?? '';
        const fontFamily = getComputedStyle(document.body).fontFamily;
        await Promise.all([
          document.fonts.load(`600 20px ${fontFamily}`, title),
          document.fonts.load(`400 14px ${fontFamily}`, description),
        ]);
        await document.fonts.ready;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          return { title, description, titleWidth: 0, descriptionWidth: 0 };
        }
        context.font = `600 20px ${fontFamily}`;
        const titleWidth = Math.round(context.measureText(title).width);
        context.font = `400 14px ${fontFamily}`;
        const descriptionWidth = Math.round(
          context.measureText(description).width,
        );
        return { title, description, titleWidth, descriptionWidth };
      });

      if (!snippet.title || !snippet.description) {
        failures.push(`seo ${route}: عنوان یا توضیح نتیجهٔ جست‌وجو خالی است.`);
      }
      if (snippet.titleWidth > 640) {
        failures.push(
          `seo ${route}: عرض تقریبی عنوان ${snippet.titleWidth}px و بیشتر از بودجهٔ 640px است.`,
        );
      }
      if (snippet.descriptionWidth > 920) {
        failures.push(
          `seo ${route}: عرض تقریبی توضیح ${snippet.descriptionWidth}px و بیشتر از بودجهٔ 920px است.`,
        );
      }

      if (titles.has(snippet.title)) {
        failures.push(
          `seo ${route}: عنوان با ${titles.get(snippet.title)} تکراری است.`,
        );
      } else {
        titles.set(snippet.title, route);
      }
      if (descriptions.has(snippet.description)) {
        failures.push(
          `seo ${route}: توضیح با ${descriptions.get(snippet.description)} تکراری است.`,
        );
      } else {
        descriptions.set(snippet.description, route);
      }

      seoReport.push({ route, ...snippet });
      await page.close();
    }

    await context.close();
  }
} finally {
  await browser.close();
}

const outputDirectory = path.join(process.cwd(), 'outputs');
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(
  path.join(outputDirectory, 'accessibility-audit.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), report, seoReport, failures }, null, 2)}\n`,
);

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(
  `Browser audit passed: ${report.length} accessibility checks and ${seoReport.length} pixel-budget SEO previews.`,
);
