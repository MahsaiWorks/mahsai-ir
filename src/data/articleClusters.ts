export interface ArticleCluster {
  id: 'files' | 'clients' | 'marketing' | 'legal';
  number: string;
  title: string;
  description: string;
}

export const articleClusters: ArticleCluster[] = [
  {
    id: 'files',
    number: '01',
    title: 'فایل و داده',
    description:
      'از ثبت کامل فایل تا سنجش کیفیت، تازه نگه‌داشتن اطلاعات و پشتیبان‌گیری امن.',
  },
  {
    id: 'clients',
    number: '02',
    title: 'مشتری، بازدید و پیگیری',
    description:
      'شناخت متقاضی، ساخت فهرست کوتاه، برنامه‌ریزی بازدید و تعیین اقدام بعدی.',
  },
  {
    id: 'marketing',
    number: '03',
    title: 'معرفی و بازاریابی ملک',
    description:
      'تبدیل اطلاعات درست و تصویر خوب به آگهی شفاف برای جذب متقاضی مرتبط.',
  },
  {
    id: 'legal',
    number: '04',
    title: 'دانش حقوقی عمومی',
    description:
      'مرور احتیاطی موضوعات رسمی با تأکید بر استعلام از منابع معتبر و به‌روز.',
  },
];
