export interface ReleaseCheckpoint {
  status: 'ready' | 'review' | 'pending';
  eyebrow: string;
  title: string;
  description: string;
}

export const getReleaseCheckpoints = (version: string): ReleaseCheckpoint[] => [
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
  'دانلود فقط به صفحه رسمی متراژ در کافه‌بازار هدایت می‌شود.',
  'محصول و به‌روزرسانی فقط پس از انتشار رسمی در سایت معرفی می‌شوند.',
];
