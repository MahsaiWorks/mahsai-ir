export interface ExternalLink {
  label: string;
  url: string;
}

export interface SiteConfig {
  brandName: string;
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
  developerName: 'MAHSAI',
  title: 'توسعه‌دهنده اپلیکیشن',
  biography:
    'MAHSAI توسعه‌دهنده اپلیکیشن و سازنده متراژ، دستیار مشاوران املاک است.',
  supportEmail: 'support@mahsai.ir',
  socialLinks: [], // REPLACE: e.g. { label: 'GitHub', url: 'https://...' }
  appStoreLinks: [], // REPLACE: real developer/store profile links only
  seoDefaults: {
    title: 'MAHSAI | توسعه‌دهنده اپلیکیشن',
    description:
      'وب‌سایت رسمی MAHSAI؛ معرفی و پشتیبانی اپلیکیشن متراژ و مقالات آموزشی مشاوران املاک.',
    image: '/og.png',
  },
};
