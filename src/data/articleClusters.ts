export interface ArticleCluster {
  id: 'files' | 'clients' | 'marketing' | 'legal';
  title: string;
  description: string;
}

export const articleClusters: ArticleCluster[] = [
  {
    id: 'files',
    title: 'فایل و داده',
    description:
      'از ثبت کامل فایل تا سنجش کیفیت، تازه نگه‌داشتن اطلاعات و پشتیبان‌گیری امن.',
  },
  {
    id: 'clients',
    title: 'مشتری، بازدید و پیگیری',
    description:
      'شناخت متقاضی، ساخت فهرست کوتاه، برنامه‌ریزی بازدید و تعیین اقدام بعدی.',
  },
  {
    id: 'marketing',
    title: 'معرفی و بازاریابی ملک',
    description:
      'تبدیل اطلاعات درست و تصویر خوب به آگهی شفاف برای جذب متقاضی مرتبط.',
  },
  {
    id: 'legal',
    title: 'دانش حقوقی عمومی',
    description:
      'مرور احتیاطی موضوعات رسمی با تأکید بر استعلام از منابع معتبر و به‌روز.',
  },
];
