import { metrazhDirectRelease } from './metrazhDirectRelease';

export interface ReleaseCheckpoint {
  status: 'ready' | 'review' | 'pending';
  eyebrow: string;
  title: string;
  description: string;
}

export const getReleaseCheckpoints = (version: string): ReleaseCheckpoint[] => [
  {
    status: 'ready',
    eyebrow: 'دانلود مستقیم سایت',
    title: `متراژ ${metrazhDirectRelease.versionFa}`,
    description:
      'نسخهٔ مستقیم اندروید با ورود پیامکی، خرید از زیبال و بازیابی اشتراک با شمارهٔ همراه از صفحهٔ دانلود سایت قابل دریافت است.',
  },
  {
    status: 'ready',
    eyebrow: 'آماده در نسخه فعلی',
    title: 'هسته مدیریت کار روزانه',
    description:
      'ثبت فایل و متقاضی، بازدید، پیگیری، یادآوری، محاسبات و خروجی‌های کاری در نسخه فعلی پروژه پیاده‌سازی شده‌اند.',
  },
  {
    status: 'ready',
    eyebrow: 'منتشرشده',
    title: `نسخه عمومی ${version}`,
    description:
      'نسخه عمومی متراژ از صفحه رسمی کافه‌بازار قابل دریافت است و لینک مستقیم آن در سایت قرار دارد.',
  },
  {
    status: 'review',
    eyebrow: 'در انتظار تأیید بازار',
    title: 'به‌روزرسانی بعدی',
    description:
      'نسخه بعدی پس از پایان بررسی کافه‌بازار و قابل‌دریافت‌شدن برای کاربران به‌عنوان نسخه عمومی جدید معرفی می‌شود.',
  },
];

export const releasePrinciples = [
  'شماره نسخه و وضعیت انتشار از داده رسمی محصول خوانده می‌شوند.',
  'دانلود از فایل رسمی سایت و صفحه رسمی متراژ در کافه‌بازار در دسترس است.',
  'محصول و به‌روزرسانی فقط پس از انتشار رسمی در سایت معرفی می‌شوند.',
];
