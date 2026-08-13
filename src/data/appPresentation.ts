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

export const getAppStatusLabel = (
  status: AppStatus,
  storeLinks: readonly AppStoreLink[] = [],
) => {
  if (status === 'available' && getCafeBazaarLink(storeLinks)) {
    return 'منتشرشده در کافه‌بازار';
  }

  return appStatusLabels[status];
};
