export const metrazhScreenshots = [
  {
    id: 'workspace',
    title: 'میزکار روزانه',
    description: 'برنامه‌ها و پیگیری‌های امروز را کنار هم ببینید',
    source: '01-daily-desk',
    alt: 'میزکار متراژ با برنامهٔ بازدید و پیگیری‌های نمایشی',
  },
  {
    id: 'property-details',
    title: 'پروندهٔ کامل ملک',
    description: 'مشخصات، تصاویر و شرایط هر ملک در یک پرونده',
    source: '02-property-files',
    alt: 'پروندهٔ یک آپارتمان نمونه، شامل تصویر، قیمت و مشخصات ملک در متراژ',
  },
  {
    id: 'matching',
    title: 'پیشنهاد فایل و مشتری',
    description: 'گزینه‌های نزدیک به نیاز مشتری را بررسی کنید',
    source: '03-smart-matching',
    alt: 'پیشنهادهای تطبیق فایل و مشتری در متراژ با اطلاعات نمونه',
  },
  {
    id: 'smart-entry',
    title: 'ثبت اطلاعات از متن',
    description: 'اطلاعات تشخیص‌داده‌شده را بررسی و ثبت کنید',
    source: '04-smart-entry',
    alt: 'نتیجهٔ استخراج مشخصات یک ملک نمونه از متن در متراژ',
  },
  {
    id: 'ad-assistant',
    title: 'آماده‌سازی آگهی',
    description: 'از مشخصات ملک به متن قابل ویرایش آگهی برسید',
    source: '05-smart-ad',
    alt: 'متن پیشنهادی آگهی یک ملک نمونه در متراژ',
  },
  {
    id: 'visits',
    title: 'برنامهٔ بازدیدها',
    description: 'قرار بازدید، مسیریابی و نتیجهٔ آن را پیگیری کنید',
    source: '06-visits',
    alt: 'فهرست بازدیدهای نمونه در متراژ با زمان، مسیریابی و ثبت نتیجه',
  },
].map((shot) => ({
  ...shot,
  src: `/images/apps/metrazh/current/${shot.id}.webp`,
  width: 1080,
  height: 2460,
}));

export const metrazhSubscriptionScreenshot = {
  src: '/images/apps/metrazh/current/subscription.webp',
  width: 1080,
  height: 2400,
  alt: 'صفحهٔ واقعی انتخاب اشتراک ماهانه و سالانه در نسخهٔ مستقیم ۱٫۶٫۶ متراژ',
};
