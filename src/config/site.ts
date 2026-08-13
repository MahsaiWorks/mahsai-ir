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

/**
 * EDIT THIS FILE FIRST.
 * Every value marked REPLACE is a placeholder and must be replaced before launch.
 */
export const siteConfig: SiteConfig = {
  brandName: 'MAHSAI',
  brandNameFa: 'مهسای',
  developerName: 'MAHSAI',
  title: 'مرجع عملی هوش مصنوعی و سازندهٔ محصولات دیجیتال',
  biography:
    'مهسای یک مرجع عملی و به‌روز هوش مصنوعی برای فارسی‌زبانان و سازندهٔ متراژ، دستیار فارسی مشاوران املاک است.',
  supportEmail: 'support@mahsai.ir',
  socialLinks: [], // REPLACE: e.g. { label: 'GitHub', url: 'https://...' }
  appStoreLinks: [], // REPLACE: real developer/store profile links only
  seoDefaults: {
    title: 'MAHSAI | هوش مصنوعی به زبان روشن',
    description:
      'رادار هوش مصنوعی، راهنمای ابزارها، آموزش رایگان و آزمایش فارسی با منبع رسمی؛ همراه معرفی و پشتیبانی اپلیکیشن متراژ.',
    image: '/og.png',
  },
};
