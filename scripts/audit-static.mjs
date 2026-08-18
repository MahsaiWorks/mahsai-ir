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
  'academy/index.html',
  'articles/index.html',
  'articles/rss.xml',
  'about/index.html',
  'support/index.html',
  'privacy/index.html',
  'terms/index.html',
  'robots.txt',
  'og.png',
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

for (const file of htmlFiles) {
  const relativeFile = path.relative(distRoot, file).replaceAll('\\', '/');
  const html = fs.readFileSync(file, 'utf8');
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (relativeFile !== 'ai/index.html' && h1Count !== 1) {
    errors.push(
      `${relativeFile}: تعداد h1 باید دقیقاً یک باشد؛ فعلاً ${h1Count} است.`,
    );
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
    if (!/\balt=["'][^"']*["']/i.test(tag)) {
      errors.push(`${relativeFile}: تصویر بدون alt پیدا شد.`);
    }
    if (
      !/\bwidth=["']\d+["']/i.test(tag) ||
      !/\bheight=["']\d+["']/i.test(tag)
    ) {
      errors.push(`${relativeFile}: تصویر بدون width و height صریح پیدا شد.`);
    }
  }

  for (const forbidden of ['هوش مصنوعی', 'Meyar', 'MEYAR', 'رادار']) {
    if (html.includes(forbidden)) {
      errors.push(`${relativeFile}: عبارت ممنوع عمومی پیدا شد: ${forbidden}`);
    }
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

const redirectFile = path.join(distRoot, 'ai', 'index.html');
if (
  !fs.existsSync(redirectFile) ||
  !fs.readFileSync(redirectFile, 'utf8').includes('/apps/')
) {
  errors.push('تغییر مسیر /ai/ به /apps/ درست ساخته نشده است.');
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(
  `Static audit passed: ${htmlFiles.length} HTML files, ${imageCount} images, ${internalReferenceCount} internal references.`,
);
