import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');
const errors = [];

const requiredOutputs = [
  'index.html',
  '404.html',
  'apps/index.html',
  'apps/metrazh/index.html',
  'apps/metrazh/status/index.html',
  'apps/metrazh/changelog/index.html',
  'real-estate-software/index.html',
  'academy/index.html',
  'academy/first-organized-property-file/index.html',
  'articles/index.html',
  'articles/topics/files/index.html',
  'articles/topics/clients/index.html',
  'articles/topics/marketing/index.html',
  'articles/topics/legal/index.html',
  'articles/rss.xml',
  'resources/real-estate-checklists/index.html',
  'about/index.html',
  'support/index.html',
  'privacy/index.html',
  'terms/index.html',
  'robots.txt',
  '.well-known/security.txt',
  'images/campaigns/metrazh-instagram-qr.png',
  'og.jpg',
];

function walk(directory, extension) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walk(entryPath, extension);
    }

    return entryPath.endsWith(extension) ? [entryPath] : [];
  });
}

function publicTargetExists(rawUrl) {
  if (
    !rawUrl.startsWith('/') ||
    rawUrl.startsWith('//') ||
    rawUrl.startsWith('/#')
  ) {
    return true;
  }

  const pathname = rawUrl.split(/[?#]/, 1)[0];
  if (!pathname || pathname === '/') {
    return fs.existsSync(path.join(distRoot, 'index.html'));
  }

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname).replace(/^\/+/, '');
  } catch {
    errors.push(`نشانی داخلی قابل‌خواندن نیست: ${rawUrl}`);
    return true;
  }

  const directTarget = path.join(distRoot, decodedPath);
  if (fs.existsSync(directTarget) && fs.statSync(directTarget).isFile()) {
    return true;
  }

  return fs.existsSync(path.join(directTarget, 'index.html'));
}

if (!fs.existsSync(distRoot)) {
  console.error('پوشه dist پیدا نشد؛ ابتدا سایت را build کنید.');
  process.exit(1);
}

for (const output of requiredOutputs) {
  if (!fs.existsSync(path.join(distRoot, output))) {
    errors.push(`خروجی ضروری وجود ندارد: ${output}`);
  }
}

const htmlFiles = walk(distRoot, '.html');
let imageCount = 0;
let internalReferenceCount = 0;
const titles = new Map();
const descriptions = new Map();
let metrazhStructuredData;

for (const file of htmlFiles) {
  const relativeFile = path.relative(distRoot, file).replaceAll('\\', '/');
  const html = fs.readFileSync(file, 'utf8');
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const isLegacyRedirect = relativeFile.startsWith('ai/');

  if (!isLegacyRedirect && h1Count !== 1) {
    errors.push(
      `${relativeFile}: تعداد h1 باید دقیقاً یک باشد؛ فعلاً ${h1Count} است.`,
    );
  }

  if (!isLegacyRedirect) {
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
    const description = html
      .match(
        /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i,
      )?.[1]
      ?.trim();
    const canonical = html.match(
      /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i,
    )?.[1];

    if (!title || !description || !canonical) {
      errors.push(`${relativeFile}: عنوان، توضیح یا canonical کامل نیست.`);
    }
    if (title) {
      if (titles.has(title)) {
        errors.push(
          `${relativeFile}: عنوان با ${titles.get(title)} تکراری است.`,
        );
      } else {
        titles.set(title, relativeFile);
      }
    }
    if (description) {
      if (descriptions.has(description)) {
        errors.push(
          `${relativeFile}: توضیح با ${descriptions.get(description)} تکراری است.`,
        );
      } else {
        descriptions.set(description, relativeFile);
      }
    }
  }

  for (const match of html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const data = JSON.parse(match[1]);
      if (
        relativeFile === 'apps/metrazh/index.html' &&
        data['@type'] === 'SoftwareApplication'
      ) {
        metrazhStructuredData = data;
      }
    } catch (error) {
      errors.push(
        `${relativeFile}: دادهٔ ساختاریافته JSON معتبر نیست: ${error.message}`,
      );
    }
  }

  for (const match of html.matchAll(
    /<(?:a|link|script|img)\b[^>]*?(?:href|src)=["']([^"']+)["'][^>]*>/gi,
  )) {
    const reference = match[1];
    if (!reference.startsWith('/')) continue;
    internalReferenceCount += 1;
    if (!publicTargetExists(reference)) {
      errors.push(`${relativeFile}: مقصد داخلی پیدا نشد: ${reference}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    imageCount += 1;
    const tag = match[0];
    if (!/\balt(?:\s|=|>)/i.test(tag)) {
      errors.push(`${relativeFile}: تصویر بدون alt پیدا شد.`);
    }
    if (
      (/\balt(?=\s|>)/i.test(tag) || /\balt=["']["']/i.test(tag)) &&
      !/\baria-hidden=["']true["']/i.test(tag) &&
      !/\brole=["'](?:presentation|none)["']/i.test(tag)
    ) {
      errors.push(
        `${relativeFile}: تصویر با alt خالی باید صریحاً تزئینی علامت‌گذاری شود.`,
      );
    }
    if (
      !/\bwidth=["']\d+["']/i.test(tag) ||
      !/\bheight=["']\d+["']/i.test(tag)
    ) {
      errors.push(`${relativeFile}: تصویر بدون width و height صریح پیدا شد.`);
    }
    const source = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    const width = Number(tag.match(/\bwidth=["'](\d+)["']/i)?.[1]);
    if (
      source?.startsWith('/images/') &&
      width >= 320 &&
      !/\bsrcset=["'][^"']+["']/i.test(tag)
    ) {
      errors.push(`${relativeFile}: تصویر بزرگ بدون srcset پیدا شد: ${source}`);
    }
  }

  for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    const candidates = match[1]
      .split(',')
      .map((candidate) => candidate.trim().split(/\s+/, 1)[0]);
    for (const candidate of candidates) {
      internalReferenceCount += 1;
      if (!publicTargetExists(candidate)) {
        errors.push(
          `${relativeFile}: نسخهٔ responsive تصویر پیدا نشد: ${candidate}`,
        );
      }
    }
  }

  for (const forbidden of ['هوش مصنوعی', 'Meyar', 'MEYAR', 'رادار']) {
    if (html.includes(forbidden)) {
      errors.push(`${relativeFile}: عبارت ممنوع عمومی پیدا شد: ${forbidden}`);
    }
  }
}

for (const property of [
  'name',
  'applicationCategory',
  'operatingSystem',
  'softwareVersion',
  'description',
  'url',
  'image',
  'downloadUrl',
  'author',
]) {
  if (!metrazhStructuredData?.[property]) {
    errors.push(
      `دادهٔ SoftwareApplication متراژ ویژگی ضروری داخلی را ندارد: ${property}`,
    );
  }
}

const sitemapFiles = walk(distRoot, '.xml').filter((file) =>
  path.basename(file).startsWith('sitemap'),
);
const sitemapText = sitemapFiles
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n');

if (!sitemapFiles.length) {
  errors.push('نقشه سایت ساخته نشده است.');
}

if (/mahsai\.ir\/ai(?:\/|<)/i.test(sitemapText)) {
  errors.push('مسیر قدیمی /ai/ هنوز در نقشه سایت دیده می‌شود.');
}

if (/mahsai\.ir\/go(?:\/|<)/i.test(sitemapText)) {
  errors.push('مسیر کمپین /go/ نباید در نقشه سایت دیده شود.');
}

const securityText = fs.readFileSync(
  path.join(distRoot, '.well-known', 'security.txt'),
  'utf8',
);
for (const field of [
  'Contact:',
  'Canonical:',
  'Preferred-Languages:',
  'Expires:',
]) {
  if (!securityText.includes(field)) {
    errors.push(`security.txt فیلد ضروری ندارد: ${field}`);
  }
}
const securityExpiry = securityText.match(/^Expires:\s*(.+)$/m)?.[1];
if (!securityExpiry || new Date(securityExpiry).valueOf() <= Date.now()) {
  errors.push('تاریخ Expires در security.txt معتبر یا آینده نیست.');
}

const redirectFile = path.join(distRoot, 'ai', 'index.html');
if (
  !fs.existsSync(redirectFile) ||
  !fs.readFileSync(redirectFile, 'utf8').includes('/apps/')
) {
  errors.push('تغییر مسیر /ai/ به /apps/ درست ساخته نشده است.');
}

for (const legacyRedirect of [
  'ai/tools/chatgpt/index.html',
  'ai/learn/choose-ai-assistant/index.html',
  'ai/today/research-modes-verified-2026-08-13/index.html',
]) {
  const redirectPath = path.join(distRoot, legacyRedirect);
  if (
    !fs.existsSync(redirectPath) ||
    !fs.readFileSync(redirectPath, 'utf8').includes('/apps/')
  ) {
    errors.push(`انتقال مسیر قدیمی درست ساخته نشده است: ${legacyRedirect}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(
  `Static audit passed: ${htmlFiles.length} HTML files, ${imageCount} images, ${internalReferenceCount} internal references.`,
);
