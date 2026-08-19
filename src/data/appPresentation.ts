export type AppStatus = 'development' | 'beta' | 'available' | 'archived';

export interface AppStoreLink {
  label: string;
  url: string;
}

const appStatusLabels: Record<AppStatus, string> = {
  development: 'در حال توسعه',
  beta: 'نسخه آزمایشی',
  available: 'منتشرشده',
  archived: 'بایگانی‌شده',
};

export const getCafeBazaarLink = <T extends AppStoreLink>(
  links: readonly T[],
) => links.find((link) => link.url.includes('cafebazaar.ir'));

export const getTrackedCafeBazaarUrl = (url: string, content: string) => {
  const safeContent = content
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 64);
  const target = new URL(url);

  target.searchParams.set('utm_source', 'mahsai.ir');
  target.searchParams.set('utm_medium', 'website');
  target.searchParams.set('utm_campaign', 'metrazh_install');
  target.searchParams.set('utm_content', safeContent || 'site');
  target.searchParams.set('ref', `mahsai_site_${safeContent || 'site'}`);

  return target.toString();
};

export const getAppStatusLabel = (
  status: AppStatus,
  storeLinks: readonly AppStoreLink[] = [],
) => {
  if (status === 'available' && getCafeBazaarLink(storeLinks)) {
    return 'منتشرشده در کافه‌بازار';
  }

  return appStatusLabels[status];
};
