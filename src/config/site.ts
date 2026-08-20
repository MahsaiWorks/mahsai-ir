export interface ExternalLink {
  label: string;
  url: string;
}

export interface SiteConfig {
  brandName: string;
  brandNameFa: string;
  developerName: string;
  title: string;
  biography: string;
  supportEmail: string;
  socialLinks: ExternalLink[];
  appStoreLinks: ExternalLink[];
  seoDefaults: {
    title: string;
    description: string;
    image: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: 'MAHSAI',
  brandNameFa: 'مهسای',
  developerName: 'MAHSAI',
  title: 'ابزارهای فارسی برای کار مرتب‌تر',
  biography:
    'MAHSAI ابزارهای فارسی می‌سازد که اطلاعات پراکنده را جمع می‌کنند و کار بعدی را روشن نگه می‌دارند. هر محصول همراه آموزش و پشتیبانی مرتبط منتشر می‌شود.',
  supportEmail: 'support@mahsai.ir',
  // Only verified, public profiles belong in these lists.
  socialLinks: [
    {
      label: 'اینستاگرام اپلیکیشن‌های MAHSAI',
      url: 'https://www.instagram.com/mahsaiapp/',
    },
  ],
  appStoreLinks: [],
  seoDefaults: {
    title: 'MAHSAI | متراژ؛ مدیریت فایل و مشتری املاک',
    description:
      'وب‌سایت رسمی MAHSAI و متراژ؛ اپلیکیشن فارسی مدیریت فایل ملک، مشتری، بازدید و پیگیری برای مشاوران املاک ایران، همراه آموزش‌های رایگان و کاربردی.',
    image: '/og.jpg',
  },
};
