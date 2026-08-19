import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const daysArgument = process.argv.find((arg) => arg.startsWith('--days='));
const thresholdDays = Number(daysArgument?.split('=')[1] || 90);
const strict = process.argv.includes('--strict');
if (!Number.isFinite(thresholdDays) || thresholdDays < 1) {
  throw new Error('--days must be a positive number.');
}

const now = Date.now();
const dayMs = 86_400_000;
const articleDirectory = resolve('src/content/articles');
const files = (await readdir(articleDirectory)).filter((file) =>
  file.endsWith('.md'),
);
const stale = [];

for (const file of files) {
  const content = await readFile(resolve(articleDirectory, file), 'utf8');
  if (/^draft:\s*true\s*$/m.test(content)) continue;
  const title = content.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] ?? file;
  const dateValue =
    content.match(/^updatedAt:\s*["']?([0-9-]+)["']?\s*$/m)?.[1] ??
    content.match(/^publishedAt:\s*["']?([0-9-]+)["']?\s*$/m)?.[1];
  if (!dateValue) {
    stale.push({ file, title, date: 'نامشخص', age: '—', reason: 'بدون تاریخ' });
    continue;
  }
  const age = Math.floor((now - new Date(`${dateValue}T12:00:00Z`)) / dayMs);
  if (age >= thresholdDays) {
    stale.push({
      file,
      title,
      date: dateValue,
      age,
      reason: `بیش از ${thresholdDays} روز`,
    });
  }
}

const app = JSON.parse(
  await readFile(resolve('src/content/apps/metrazh.json'), 'utf8'),
);
const storeAge = Math.floor(
  (now - new Date(`${app.storeCheckedAt}T12:00:00Z`)) / dayMs,
);

console.log('# گزارش تازگی محتوای MAHSAI\n');
console.log(`- آستانهٔ مقاله: ${thresholdDays} روز`);
console.log(
  `- بازبینی کافه‌بازار: ${app.storeCheckedAt} (${Math.max(0, storeAge)} روز قبل)`,
);
console.log(`- مقالهٔ نیازمند بازبینی: ${stale.length}\n`);

if (stale.length > 0) {
  console.log('| فایل | عنوان | آخرین تاریخ | سن | دلیل |');
  console.log('| --- | --- | --- | ---: | --- |');
  for (const item of stale) {
    console.log(
      `| ${item.file} | ${item.title.replaceAll('|', '\\|')} | ${item.date} | ${item.age} | ${item.reason} |`,
    );
  }
} else {
  console.log('هیچ مقالهٔ منتشرشده‌ای از آستانه عبور نکرده است.');
}

if (storeAge > 14) {
  console.log('\nهشدار: تاریخ بررسی کافه‌بازار بیش از ۱۴ روز قدیمی است.');
  if (strict) process.exitCode = 1;
}
if (strict && stale.length > 0) process.exitCode = 1;
