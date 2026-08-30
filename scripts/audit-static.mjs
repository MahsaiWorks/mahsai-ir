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
  'apps/metrazh/download/index.html',
  'apps/metrazh/status/index.html',
  'apps/metrazh/changelog/index.html',
  'real-estate-software/index.html',
  'tools/index.html',
  'tools/follow-up-message/index.html',
  'tools/owner-call-checklist/index.html',
  'tools/buyer-needs-form/index.html',
  'tools/stale-file-decision/index.html',
  'tools/visit-planner/index.html',
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
  'images/apps/metrazh/metrazh-site-story-poster-v1.webp',
  'videos/metrazh-site-story-v1.mp4',
  'og-mahsai-metrazh-v2.jpg',
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
const canonicals = new Map();
let metrazhStructuredData;
let metrazhVideoStructuredData;
const structuredToolPages = new Set();

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
    if (canonical && relativeFile !== '404.html') {
      const routePath =
        relativeFile === 'index.html'
          ? '/'
          : `/${relativeFile.replace(/index\.html$/, '')}`;
      const expectedCanonical = new URL(
        routePath,
        'https://mahsai.ir',
      ).toString();
      if (canonical !== expectedCanonical) {
        errors.push(
          `${relativeFile}: canonical باید خودارجاع و برابر ${expectedCanonical} باشد.`,
        );
      }
      if (canonicals.has(canonical)) {
        errors.push(
          `${relativeFile}: canonical با ${canonicals.get(canonical)} تکراری است.`,
        );
      } else {
        canonicals.set(canonical, relativeFile);
      }
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
      if (relativeFile === 'apps/metrazh/index.html') {
        const structuredNodes = Array.isArray(data['@graph'])
          ? data['@graph']
          : [data];
        const softwareApplication = structuredNodes.find((node) => {
          const types = Array.isArray(node?.['@type'])
            ? node['@type']
            : [node?.['@type']];
          return types.includes('SoftwareApplication');
        });

        if (softwareApplication) {
          metrazhStructuredData = softwareApplication;
        }

        const videoObject = structuredNodes.find((node) => {
          const types = Array.isArray(node?.['@type'])
            ? node['@type']
            : [node?.['@type']];
          return types.includes('VideoObject');
        });

        if (videoObject) {
          metrazhVideoStructuredData = videoObject;
        }
      }

      if (
        relativeFile.startsWith('tools/') &&
        relativeFile !== 'tools/index.html'
      ) {
        const structuredNodes = Array.isArray(data['@graph'])
          ? data['@graph']
          : [data];
        const webApplication = structuredNodes.find((node) => {
          const types = Array.isArray(node?.['@type'])
            ? node['@type']
            : [node?.['@type']];
          return types.includes('WebApplication');
        });
        if (webApplication?.isAccessibleForFree === true) {
          structuredToolPages.add(relativeFile);
        }
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
    const source = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    const isOfficialEnamadBadge =
      source ===
        'https://trustseal.enamad.ir/logo.aspx?id=7506195&Code=OHQG1aXCXFqM3gYapj2Mb7b109YIqMOn' &&
      /\bcode=["']OHQG1aXCXFqM3gYapj2Mb7b109YIqMOn["']/i.test(tag);
    if (!/\balt(?:\s|=|>)/i.test(tag)) {
      errors.push(`${relativeFile}: تصویر بدون alt پیدا شد.`);
    }
    if (
      !isOfficialEnamadBadge &&
      (/\balt(?=\s|>)/i.test(tag) || /\balt=["']["']/i.test(tag)) &&
      !/\baria-hidden=["']true["']/i.test(tag) &&
      !/\brole=["'](?:presentation|none)["']/i.test(tag)
    ) {
      errors.push(
        `${relativeFile}: تصویر با alt خالی باید صریحاً تزئینی علامت‌گذاری شود.`,
      );
    }
    if (
      !isOfficialEnamadBadge &&
      (!/\bwidth=["']\d+["']/i.test(tag) || !/\bheight=["']\d+["']/i.test(tag))
    ) {
      errors.push(`${relativeFile}: تصویر بدون width و height صریح پیدا شد.`);
    }
    const width = Number(tag.match(/\bwidth=["'](\d+)["']/i)?.[1]);
    if (
      source?.startsWith('/images/') &&
      width >= 320 &&
      !/\bsrcset=["'][^"']+["']/i.test(tag)
    ) {
      errors.push(`${relativeFile}: تصویر بزرگ بدون srcset پیدا شد: ${source}`);
    }
  }

  for (const match of html.matchAll(
    /<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/gi,
  )) {
    const caption = match[1]
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (
      /^(این |در این )?(عکس|تصویر|ویدیو)( بالا| زیر| را می‌بینید| را نشان می‌دهد)?[.!؟]?$/.test(
        caption,
      )
    ) {
      errors.push(
        `${relativeFile}: کپشن بدیهی و بدون اطلاعات تازه پیدا شد: ${caption}`,
      );
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

  for (const forbidden of [
    'هوش مصنوعی',
    'Meyar',
    'MEYAR',
    'رادار',
    '1.6.1',
    '۱.۶.۱',
  ]) {
    if (
      forbidden === 'هوش مصنوعی' &&
      relativeFile === 'editorial-policy/index.html'
    ) {
      continue;
    }
    if (html.includes(forbidden)) {
      errors.push(`${relativeFile}: عبارت ممنوع عمومی پیدا شد: ${forbidden}`);
    }
  }

  for (const genericCopy of [
    'در دنیای امروز',
    'راهکار جامع و هوشمند',
    'تحول دیجیتال',
    'به سطح بعدی ببرید',
    'تجربه‌ای بی‌نظیر',
  ]) {
    if (html.includes(genericCopy)) {
      errors.push(
        `${relativeFile}: عبارت تبلیغاتی آماده و غیرطبیعی پیدا شد: ${genericCopy}`,
      );
    }
  }
}

if (structuredToolPages.size !== 5) {
  errors.push(
    `پنج ابزار رایگان باید WebApplication معتبر داشته باشند؛ فعلاً ${structuredToolPages.size} صفحه تأیید شد.`,
  );
}

for (const property of [
  'name',
  'description',
  'thumbnailUrl',
  'uploadDate',
  'duration',
  'contentUrl',
]) {
  if (!metrazhVideoStructuredData?.[property]) {
    errors.push(`دادهٔ VideoObject متراژ ویژگی ضروری داخلی ندارد: ${property}`);
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
