import { metrazhDirectRelease } from './metrazhDirectRelease';

export interface MetrazhChangelogEntry {
  version: string;
  status: 'public';
  channel?: 'direct' | 'bazaar';
  storeUpdatedAt: string;
  verifiedAt: string;
  summary: string;
  verifiedCapabilities: string[];
  evidence: string;
}

export const metrazhChangelog: MetrazhChangelogEntry[] = [
  {
    version: metrazhDirectRelease.version,
    status: 'public',
    channel: 'direct',
    storeUpdatedAt: '2026-09-08',
    verifiedAt: '2026-09-08',
    summary:
      'نسخهٔ مستقیم سایت با نمایش نام مالک در جزئیات ملک و خرید و بازیابی اشتراک از طریق شمارهٔ همراه.',
    verifiedCapabilities: [...metrazhDirectRelease.changes],
    evidence:
      'فایل نصب رسمی اندروید از صفحهٔ دانلود سایت در دسترس است. به‌روزرسانی را روی برنامهٔ فعلی نصب کنید تا اطلاعات ثبت‌شده حفظ شوند.',
  },
  {
    version: '1.0.4',
    status: 'public',
    storeUpdatedAt: '2026-08-11',
    verifiedAt: '2026-08-18',
    summary:
      'نسخهٔ عمومی فعلی متراژ برای مدیریت شخصی کار روزانهٔ مشاور املاک روی اندروید.',
    verifiedCapabilities: [
      'ثبت و جست‌وجوی فایل و متقاضی',
      'بازدید، یادآوری و پیگیری اقدام بعدی',
      'تطبیق فایل با نیاز مشتری و ساخت متن پیشنهادی آگهی',
      'خروجی‌های کاری و پشتیبان‌گیری به فایل',
    ],
    evidence:
      'شماره نسخه، تاریخ بازار، صفحهٔ عمومی کافه‌بازار و فایل امضاشدهٔ انتشار بررسی شدند.',
  },
];
