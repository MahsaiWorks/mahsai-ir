import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((arg) => arg.startsWith('--') && arg.includes('='))
    .map((arg) => {
      const index = arg.indexOf('=');
      return [arg.slice(2, index), arg.slice(index + 1)];
    }),
);

if (process.argv.includes('--help')) {
  console.log(
    'pnpm content:new -- --slug=english-kebab-slug --title="عنوان فارسی" --description="توضیح روشن" --cluster=files|clients|marketing|legal',
  );
  process.exit(0);
}

const required = ['slug', 'title', 'description', 'cluster'];
for (const key of required) {
  if (!args[key]?.trim()) throw new Error(`Missing required --${key}= value.`);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(args.slug)) {
  throw new Error('Slug must be lowercase English kebab-case.');
}

const clusters = {
  files: {
    category: 'فایل‌گیری و مدیریت فایل',
    cover: '/images/editorial/property-workflow.webp',
    coverAlt: 'جریان منظم ثبت و پیگیری فایل‌های ملکی',
    accent: 'teal',
  },
  clients: {
    category: 'مشتری، بازدید و پیگیری',
    cover: '/images/editorial/client-matching.webp',
    coverAlt: 'بررسی نیاز مشتری و انتخاب فایل‌های مناسب',
    accent: 'navy',
  },
  marketing: {
    category: 'آگهی و معرفی ملک',
    cover: '/images/editorial/property-photography.webp',
    coverAlt: 'آماده‌سازی تصویر و اطلاعات برای معرفی یک ملک',
    accent: 'sand',
  },
  legal: {
    category: 'امنیت و نکات رسمی',
    cover: '/images/editorial/secure-real-estate-data.webp',
    coverAlt: 'حفاظت از اطلاعات و اسناد کاری املاک',
    accent: 'navy',
  },
};
const cluster = clusters[args.cluster];
if (!cluster) throw new Error(`Unknown cluster: ${args.cluster}`);

const articleDirectory = resolve('src/content/articles');
const outputPath = resolve(articleDirectory, `${args.slug}.md`);
try {
  await access(outputPath);
  throw new Error(`Article already exists: ${outputPath}`);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const existingFiles = (await readdir(articleDirectory)).filter((file) =>
  file.endsWith('.md'),
);
let seriesOrder = 1;
for (const file of existingFiles) {
  const content = await readFile(resolve(articleDirectory, file), 'utf8');
  const clusterMatch = content.match(/^cluster:\s*["']?([^\s"']+)/m);
  const orderMatch = content.match(/^seriesOrder:\s*(\d+)/m);
  if (clusterMatch?.[1] === args.cluster && orderMatch) {
    seriesOrder = Math.max(seriesOrder, Number(orderMatch[1]) + 1);
  }
}

const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Tehran',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());
const quote = (value) => JSON.stringify(value.trim());
const template = `---
title: ${quote(args.title)}
description: ${quote(args.description)}
category: ${quote(cluster.category)}
publishedAt: ${today}
updatedAt: ${today}
readingTime: "۸ دقیقه"
cover: ${quote(cluster.cover)}
coverWidth: 1536
coverHeight: 1024
coverAlt: ${quote(cluster.coverAlt)}
coverPosition: center
accent: ${cluster.accent}
cluster: ${args.cluster}
seriesOrder: ${seriesOrder}
related: []
takeaways:
  - "خروجی روشن اول"
  - "اقدام قابل اجرا دوم"
keywords:
  - ${quote(args.title)}
draft: true
featured: false
---

## مسئله دقیق چیست؟

پاسخ کوتاه و مستقیم را اینجا بنویسید.

## مسیر اجرا

مراحل را با مثال بدون اطلاعات واقعی مشتری توضیح دهید.

## اشتباه رایج و راه اصلاح

اشتباه را همراه نشانه و اقدام اصلاحی بنویسید.

## چک‌لیست نهایی

- [ ] مورد قابل کنترل اول
- [ ] مورد قابل کنترل دوم

## قدم بعدی

یک اقدام مشخص برای پایان مطلب بنویسید.
`;

await writeFile(outputPath, template, { encoding: 'utf8', flag: 'wx' });
console.log(`Created draft article: ${outputPath}`);
