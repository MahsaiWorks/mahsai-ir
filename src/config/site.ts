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
  title: 'خانهٔ اپلیکیشن‌های فارسی برای کار واقعی',
  biography:
    'MAHSAI خانهٔ محصولات فارسیِ کاربردی است؛ هر محصول فقط پس از انتشار رسمی معرفی می‌شود و آموزش‌های مرتبط با همان حوزه را کنار خود دارد.',
  supportEmail: 'support@mahsai.ir',
  // Only verified, public profiles belong in these lists.
  socialLinks: [],
  appStoreLinks: [],
  seoDefaults: {
    title: 'MAHSAI | اپلیکیشن‌های فارسی برای کار واقعی',
    description:
      'وب‌سایت رسمی MAHSAI؛ معرفی و پشتیبانی اپلیکیشن متراژ برای مشاوران املاک، همراه آموزش‌های رایگان و کاربردی بازار املاک ایران.',
    image: '/og.png',
  },
};
