export interface HomeTrustSignal {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

export const homeTrustSignals: HomeTrustSignal[] = [
  {
    number: '۰۱',
    eyebrow: 'حریم داده',
    title: 'اطلاعات اصلی روی دستگاه می‌ماند.',
    description:
      'فایل‌ها، متقاضیان و پیگیری‌ها به‌صورت اصلی روی دستگاه نگهداری می‌شوند؛ قابلیت‌های آنلاین فقط جایی وارد می‌شوند که به نقشه، خرید اشتراک یا سرویس‌های دیگر نیاز باشد.',
    href: '/privacy/',
    linkLabel: 'جزئیات حریم خصوصی',
  },
  {
    number: '۰۲',
    eyebrow: 'تجربه فارسی',
    title: 'راست‌به‌چپ، از ابتدا.',
    description:
      'چیدمان، جست‌وجو و مسیرهای کاری متراژ برای زبان فارسی و الگوهای راست‌به‌چپ طراحی شده‌اند تا کار روزانه سریع و قابل فهم بماند.',
  },
  {
    number: '۰۳',
    eyebrow: 'پشتیبانی رسمی',
    title: 'یک مسیر روشن برای پیگیری.',
    description:
      'گزارش مشکل، پیشنهاد و پرسش‌های محصول از صفحه پشتیبانی رسمی دریافت می‌شوند تا هر درخواست مسیر مشخصی برای ادامه داشته باشد.',
    href: '/support/',
    linkLabel: 'رفتن به پشتیبانی',
  },
];
