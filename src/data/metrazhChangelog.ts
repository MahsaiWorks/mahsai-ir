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
    storeUpdatedAt: '2026-09-18',
    verifiedAt: '2026-09-18',
    summary:
      'نسخهٔ مستقیم ۱.۶.۷ با بازبینی ظاهر یادآوری‌ها، ثبت اطلاعات و نمایش وضعیت اشتراک.',
    verifiedCapabilities: [...metrazhDirectRelease.changes],
    evidence:
      'بستهٔ امضاشدهٔ ۱.۶.۷، شناسهٔ برنامه، کد نسخه و اثرانگشت فایل نصب پیش از انتشار بررسی شدند.',
  },
  {
    version: '1.6.6',
    status: 'public',
    channel: 'direct',
    storeUpdatedAt: '2026-09-08',
    verifiedAt: '2026-09-08',
    summary:
      'نسخهٔ مستقیم سایت با نمایش نام مالک در جزئیات ملک و خرید و بازیابی اشتراک از طریق شمارهٔ همراه.',
    verifiedCapabilities: [
      'انتخاب ماهانه و سالانه، حتی پس از خروج از درگاه، اصلاح شد؛ هر خرید قبلی همچنان قابل پیگیری است.',
      'نوع اشتراک فعال، تاریخ پایان و روزهای باقی‌مانده پس از تأیید خرید نمایش داده می‌شود.',
      'پرداخت با مراحل کمتر و پیگیری خرید از بالای صفحه؛ شرایط خرید پیش از پرداخت در دسترس است.',
      'بازیابی خرید و ارتقای پلن در نسخهٔ مستقیم در دسترس است.',
    ],
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
