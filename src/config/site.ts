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
  title: 'آموزش هوش مصنوعی و ابزارهای فارسی',
  biography:
    'مهسای آموزش عملی ساخت محتوا با هوش مصنوعی و ابزارهای فارسی برای کار روزانه ارائه می‌کند؛ از دورهٔ ابر مشاور در آکادمی مهسای تا آموزش‌های رایگان و اپلیکیشن متراژ.',
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
    title: 'مهسای | آموزش هوش مصنوعی، دوره‌ها و اپلیکیشن‌ها',
    description:
      'آکادمی مهسای؛ دورهٔ ابر مشاور برای ساخت عکس، ویدیو و استوری با هوش مصنوعی، در کنار آموزش‌های رایگان، ابزارهای فارسی و اپلیکیشن متراژ.',
    image: '/og-mahsai-metrazh-v2.jpg',
  },
};
