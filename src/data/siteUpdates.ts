export interface SiteUpdate {
  type: string;
  date: string;
  title: string;
  description: string;
  href: string;
  action: string;
}

export const siteUpdates: SiteUpdate[] = [
  {
    type: 'ابزار رایگان',
    date: '۳۰ مرداد ۱۴۰۵',
    title: 'پنج کار پرتکرار دفتر، حالا فرم آماده دارند',
    description:
      'پیام پیگیری، فرم تماس مالک، نیاز مشتری، برنامهٔ بازدید و تصمیم دربارهٔ فایل قدیمی را همان‌جا آماده و کپی کنید.',
    href: '/tools/',
    action: 'دیدن ابزارهای تازه',
  },
  {
    type: 'مقاله‌ها',
    date: '۳۰ مرداد ۱۴۰۵',
    title: 'راهنماها از حرف کلی فاصله گرفتند',
    description:
      'به هر مقاله یک موقعیت واقعی و یک فرم یا متن قابل کپی اضافه شده تا نتیجهٔ خواندن، همان روز قابل استفاده باشد.',
    href: '/articles/',
    action: 'انتخاب یک مقاله',
  },
  {
    type: 'انتخاب و نصب',
    date: '۳۰ مرداد ۱۴۰۵',
    title: 'مسیر انتخاب و دانلود متراژ روشن‌تر شد',
    description:
      'قبل از نصب می‌توانید نرم‌افزار را با چهار کار واقعی دفتر بسنجید و بعد مستقیم وارد صفحهٔ رسمی کافه‌بازار شوید.',
    href: '/real-estate-software/',
    action: 'دیدن راهنمای انتخاب',
  },
];
