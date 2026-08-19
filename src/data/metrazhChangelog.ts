export interface MetrazhChangelogEntry {
  version: string;
  status: 'public';
  storeUpdatedAt: string;
  verifiedAt: string;
  summary: string;
  verifiedCapabilities: string[];
  evidence: string;
}

export const metrazhChangelog: MetrazhChangelogEntry[] = [
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
