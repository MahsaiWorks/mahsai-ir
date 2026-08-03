export interface ReleaseCheckpoint {
  number: string;
  status: 'ready' | 'review' | 'pending';
  eyebrow: string;
  title: string;
  description: string;
}

export const releaseCheckpoints: ReleaseCheckpoint[] = [
  {
    number: '۰۱',
    status: 'ready',
    eyebrow: 'آماده در نسخه فعلی',
    title: 'هسته مدیریت کار روزانه',
    description:
      'ثبت فایل و متقاضی، بازدید، پیگیری، یادآوری، محاسبات و خروجی‌های کاری در نسخه فعلی پروژه پیاده‌سازی شده‌اند.',
  },
  {
    number: '۰۲',
    status: 'review',
    eyebrow: 'در حال کنترل نهایی',
    title: 'آماده‌سازی انتشار عمومی',
    description:
      'نسخه پیش‌انتشار در مرحله بررسی‌های نهایی انتشار قرار دارد. وضعیت این مرحله فقط پس از تأیید واقعی در همین صفحه تغییر می‌کند.',
  },
  {
    number: '۰۳',
    status: 'pending',
    eyebrow: 'پس از تأیید انتشار',
    title: 'لینک دانلود رسمی',
    description:
      'تا زمانی که لینک عمومی تأیید نشده باشد، هیچ دکمه دانلودی نمایش داده نمی‌شود. لینک معتبر فقط از همین سایت و کانال رسمی اعلام خواهد شد.',
  },
];

export const releasePrinciples = [
  'شماره نسخه و وضعیت انتشار از داده رسمی محصول خوانده می‌شوند.',
  'لینک دانلود تأییدنشده یا فایل غیررسمی در سایت قرار نمی‌گیرد.',
  'تغییرات مهم نسخه‌ها پس از نهایی‌شدن در همین صفحه ثبت می‌شوند.',
];
