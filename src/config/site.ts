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
  title: 'راهنمای فارسی هوش مصنوعی و سازندهٔ محصولات کاربردی',
  biography:
    'مهسای یک مرجع عملی و به‌روز هوش مصنوعی برای فارسی‌زبانان و سازندهٔ متراژ، دستیار فارسی مشاوران املاک است.',
  supportEmail: 'support@mahsai.ir',
  socialLinks: [], // REPLACE: e.g. { label: 'GitHub', url: 'https://...' }
  appStoreLinks: [], // REPLACE: real developer/store profile links only
  seoDefaults: {
    title: 'MAHSAI | راهنمای فارسی و کاربردی هوش مصنوعی',
    description:
      'راهنماهای ساده و تصویری، مقایسهٔ ابزارها و تازه‌های مهم هوش مصنوعی برای کاربران ایرانی؛ همراه معرفی و پشتیبانی اپلیکیشن متراژ.',
    image: '/og.png',
  },
};
