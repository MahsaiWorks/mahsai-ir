import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const host = 'mahsai.ir';
const origin = `https://${host}`;
const key = '39a45add06d6bd42dad5f9e9164a98be033d3835';
const keyLocation = `${origin}/${key}.txt`;

const sitemapFiles = (await readdir('dist')).filter((file) =>
  /^sitemap-\d+\.xml$/.test(file),
);

if (sitemapFiles.length === 0) {
  throw new Error('ابتدا سایت را بسازید؛ فایل sitemap در پوشه dist پیدا نشد.');
}

const liveKey = (await (await fetch(keyLocation)).text()).trim();
if (liveKey !== key) {
  throw new Error('فایل کلید IndexNow هنوز روی نسخه زنده در دسترس نیست.');
}

const urlList = [];
for (const file of sitemapFiles) {
  const xml = await readFile(path.join('dist', file), 'utf8');
  for (const match of xml.matchAll(
    /<loc>(https:\/\/mahsai\.ir\/[^<]*)<\/loc>/g,
  )) {
    urlList.push(match[1]);
  }
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (![200, 202].includes(response.status)) {
  throw new Error(
    `IndexNow پاسخ ${response.status} برگرداند: ${await response.text()}`,
  );
}

console.log(
  `IndexNow ${urlList.length} نشانی را با پاسخ ${response.status} پذیرفت.`,
);
