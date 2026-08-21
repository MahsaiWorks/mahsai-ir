export type PracticalToolKind =
  'follow-up' | 'owner-call' | 'buyer-needs' | 'stale-file' | 'visit-planner';

export interface PracticalToolOption {
  value: string;
  label: string;
}

export interface PracticalToolField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'time' | 'number';
  placeholder?: string;
  help?: string;
  required?: boolean;
  options?: PracticalToolOption[];
}

export interface PracticalToolDefinition {
  slug: string;
  kind: PracticalToolKind;
  title: string;
  shortTitle: string;
  description: string;
  seoDescription: string;
  kicker: string;
  cover: string;
  coverAlt: string;
  fields: PracticalToolField[];
  submitLabel: string;
  resultTitle: string;
  relatedArticle: {
    href: string;
    label: string;
  };
  metrazhTitle: string;
  metrazhDescription: string;
}

export const practicalRealEstateTools: PracticalToolDefinition[] = [
  {
    slug: 'follow-up-message',
    kind: 'follow-up',
    title: 'سازندهٔ متن پیگیری مشتری املاک',
    shortTitle: 'متن پیگیری مشتری',
    description:
      'موضوع گفت‌وگوی قبلی را وارد کنید و یک پیام کوتاه، محترمانه و مرتبط برای پیگیری بعد از معرفی یا بازدید بسازید.',
    seoDescription:
      'پیام پیگیری مشتری املاک را بر اساس گفت‌وگوی قبلی بسازید؛ رایگان، بدون ثبت‌نام و بدون ارسال اطلاعات.',
    kicker: 'یک پیام مرتبط، نه «تصمیم گرفتید؟»',
    cover: '/images/editorial/client-matching.webp',
    coverAlt: 'یادداشت پیگیری مشتری کنار فایل‌های ملکی مرتب',
    fields: [
      {
        id: 'property_label',
        label: 'نام یا نشانهٔ کوتاه فایل',
        type: 'text',
        placeholder: 'مثلاً آپارتمان دوخواب جنت‌آباد',
        help: 'نام مالک، شماره تماس یا نشانی دقیق ننویسید.',
        required: true,
      },
      {
        id: 'liked',
        label: 'مشتری چه چیزی را پسندید؟',
        type: 'text',
        placeholder: 'مثلاً نور خانه و نقشهٔ آشپزخانه',
        required: true,
      },
      {
        id: 'concern',
        label: 'دربارهٔ چه چیزی تردید داشت؟',
        type: 'text',
        placeholder: 'مثلاً شرایط پرداخت یا زمان تحویل',
        required: true,
      },
      {
        id: 'next_step',
        label: 'قدم بعدی پیشنهادی شما چیست؟',
        type: 'select',
        required: true,
        options: [
          { value: 'answer', label: 'گرفتن جواب یک سؤال مشخص' },
          { value: 'option', label: 'فرستادن یک گزینهٔ نزدیک‌تر' },
          { value: 'call', label: 'هماهنگی زمان تماس' },
          { value: 'second_visit', label: 'هماهنگی بازدید دوباره' },
        ],
      },
      {
        id: 'timing',
        label: 'زمان مناسب پیگیری',
        type: 'text',
        placeholder: 'مثلاً امروز عصر یا فردا ساعت ۱۱',
        required: true,
      },
    ],
    submitLabel: 'ساختن متن پیگیری',
    resultTitle: 'متن پیشنهادی شما',
    relatedArticle: {
      href: '/articles/real-estate-client-follow-up/',
      label: 'راهنمای کامل پیگیری بعد از بازدید',
    },
    metrazhTitle: 'پیگیری را کنار همان مشتری نگه دارید',
    metrazhDescription:
      'در متراژ نتیجهٔ تماس، فایل‌های دیده‌شده و زمان پیگیری بعدی کنار پروندهٔ مشتری می‌ماند تا هر بار گفت‌وگو از اول شروع نشود.',
  },
  {
    slug: 'owner-call-checklist',
    kind: 'owner-call',
    title: 'چک‌لیست تماس اول با مالک',
    shortTitle: 'تماس اول با مالک',
    description:
      'اطلاعات پایهٔ یک فایل را با ترتیب ثابت جمع کنید و در پایان یک برگهٔ مرتب برای ثبت در پرونده بگیرید.',
    seoDescription:
      'فرم تماس اول با مالک برای جمع‌کردن مشخصات فایل و گرفتن خروجی قابل کپی یا چاپ؛ رایگان و بدون ثبت‌نام.',
    kicker: 'قبل از تمام‌شدن تماس، جای خالی‌ها را ببینید',
    cover: '/images/editorial/property-workflow-light.webp',
    coverAlt: 'برگهٔ فایل‌گیری و تلفن روی میز کار مشاور املاک',
    fields: [
      {
        id: 'transaction',
        label: 'نوع معامله',
        type: 'select',
        required: true,
        options: [
          { value: 'فروش', label: 'فروش' },
          { value: 'رهن و اجاره', label: 'رهن و اجاره' },
          { value: 'پیش‌فروش', label: 'پیش‌فروش' },
        ],
      },
      {
        id: 'property_type',
        label: 'نوع ملک',
        type: 'text',
        placeholder: 'مثلاً آپارتمان یا دفتر کار',
        required: true,
      },
      {
        id: 'area',
        label: 'محله و محدودهٔ قابل معرفی',
        type: 'text',
        placeholder: 'نشانی دقیق لازم نیست',
        required: true,
      },
      {
        id: 'basics',
        label: 'مشخصات پایه',
        type: 'textarea',
        placeholder: 'متراژ، خواب، طبقه، سن بنا، آسانسور، پارکینگ و موارد مهم',
        required: true,
      },
      {
        id: 'financial',
        label: 'قیمت و شرایط مالی',
        type: 'textarea',
        placeholder: 'مبلغ و شرایط قابل مذاکره را روشن بنویسید',
        required: true,
      },
      {
        id: 'visit',
        label: 'شرایط و زمان بازدید',
        type: 'text',
        placeholder: 'مثلاً با هماهنگی یک ساعت قبل',
        required: true,
      },
      {
        id: 'next_action',
        label: 'کار بعدی',
        type: 'text',
        placeholder: 'مثلاً دریافت عکس‌ها تا فردا',
        required: true,
      },
    ],
    submitLabel: 'ساختن برگهٔ فایل',
    resultTitle: 'خلاصهٔ تماس با مالک',
    relatedArticle: {
      href: '/articles/complete-property-file/',
      label: 'چک‌لیست کامل فایل‌گیری املاک',
    },
    metrazhTitle: 'اطلاعات تماس را مستقیم وارد پروندهٔ فایل کنید',
    metrazhDescription:
      'در متراژ مشخصات، قیمت، عکس‌ها، مالک و کار بعدی در بخش‌های جدا ثبت می‌شوند تا فایل وسط تماس بعدی سریع پیدا شود.',
  },
  {
    slug: 'buyer-needs-form',
    kind: 'buyer-needs',
    title: 'فرم نیازسنجی خریدار یا مستأجر',
    shortTitle: 'فرم نیازسنجی مشتری',
    description:
      'شرط‌های قطعی، بودجه، محدوده و زمان تصمیم را از ترجیح‌های قابل مذاکره جدا کنید و یک خلاصهٔ قابل استفاده بسازید.',
    seoDescription:
      'فرم رایگان نیازسنجی خریدار یا مستأجر؛ بودجه، محله، شرط‌های قطعی و قدم بعدی را در یک خلاصه مرتب کنید.',
    kicker: 'قبل از فرستادن فایل، نیاز واقعی را روشن کنید',
    cover: '/images/editorial/female-consultant-matching.webp',
    coverAlt: 'مشاور املاک در حال مرتب‌کردن نیازهای مشتری',
    fields: [
      {
        id: 'deal_type',
        label: 'نوع درخواست',
        type: 'select',
        required: true,
        options: [
          { value: 'خرید', label: 'خرید' },
          { value: 'رهن و اجاره', label: 'رهن و اجاره' },
        ],
      },
      {
        id: 'budget',
        label: 'بودجه و شکل پرداخت',
        type: 'text',
        placeholder: 'عددها و دامنهٔ قابل مذاکره',
        required: true,
      },
      {
        id: 'areas',
        label: 'محدودهٔ اصلی و جایگزین',
        type: 'text',
        placeholder: 'مثلاً پونک؛ جنت‌آباد هم قابل بررسی است',
        required: true,
      },
      {
        id: 'move_time',
        label: 'زمان تصمیم یا جابه‌جایی',
        type: 'text',
        placeholder: 'مثلاً تا پایان ماه',
        required: true,
      },
      {
        id: 'must_haves',
        label: 'شرط‌های قطعی',
        type: 'textarea',
        placeholder: 'مواردی که بدون آن‌ها فایل رد می‌شود',
        required: true,
      },
      {
        id: 'flexible',
        label: 'موارد قابل مذاکره',
        type: 'textarea',
        placeholder: 'مثلاً چند متر کمتر یا یک محلهٔ نزدیک',
        required: true,
      },
      {
        id: 'next_step',
        label: 'قدم بعدی توافق‌شده',
        type: 'text',
        placeholder: 'مثلاً ارسال سه فایل تا فردا',
        required: true,
      },
    ],
    submitLabel: 'ساختن خلاصهٔ نیاز مشتری',
    resultTitle: 'خلاصهٔ نیاز مشتری',
    relatedArticle: {
      href: '/articles/qualify-real-estate-client/',
      label: 'هفت سؤال مهم پیش از معرفی ملک',
    },
    metrazhTitle: 'نیاز مشتری را کنار پیگیری‌های بعدی نگه دارید',
    metrazhDescription:
      'در متراژ بودجه، محله، اولویت‌ها و نتیجهٔ هر معرفی کنار همان مشتری ثبت می‌شود و برای پیدا کردن فایل مناسب دوباره در دسترس است.',
  },
  {
    slug: 'stale-file-decision',
    kind: 'stale-file',
    title: 'تصمیم‌گیر فایل‌های قدیمی املاک',
    shortTitle: 'تصمیم برای فایل قدیمی',
    description:
      'تازگی اطلاعات، پاسخ مالک و کامل‌بودن پرونده را بررسی کنید تا فایل بین «فعال»، «نیازمند تأیید» و «بایگانی» گم نشود.',
    seoDescription:
      'فایل قدیمی املاک را با تازگی اطلاعات و پاسخ مالک بسنجید و برای تأیید، اصلاح یا بایگانی تصمیم بگیرید.',
    kicker: 'فایل قدیمی را عجولانه حذف نکنید',
    cover: '/images/editorial/property-workflow.webp',
    coverAlt: 'پرونده‌های ملکی در حال بازبینی و دسته‌بندی',
    fields: [
      {
        id: 'file_label',
        label: 'نام یا کد غیرمحرمانهٔ فایل',
        type: 'text',
        placeholder: 'مثلاً F-104 یا فروش پونک دوخواب',
        required: true,
      },
      {
        id: 'last_confirmed',
        label: 'آخرین تأیید اطلاعات چه زمانی بوده؟',
        type: 'select',
        required: true,
        options: [
          { value: 'recent', label: 'در هفت روز گذشته' },
          { value: 'month', label: 'بین هشت تا سی روز' },
          { value: 'old', label: 'بیشتر از سی روز' },
          { value: 'unknown', label: 'معلوم نیست' },
        ],
      },
      {
        id: 'owner_response',
        label: 'نتیجهٔ آخرین تماس با مالک',
        type: 'select',
        required: true,
        options: [
          { value: 'active', label: 'فعال و قابل معرفی است' },
          { value: 'changed', label: 'قیمت یا شرایط تغییر کرده' },
          { value: 'no_answer', label: 'هنوز پاسخ نگرفته‌ام' },
          { value: 'closed', label: 'معامله شده یا دیگر فعال نیست' },
        ],
      },
      {
        id: 'completeness',
        label: 'پرونده برای معرفی کامل است؟',
        type: 'select',
        required: true,
        options: [
          { value: 'complete', label: 'بله، اطلاعات لازم کامل است' },
          { value: 'missing', label: 'خیر، بخشی از اطلاعات کم است' },
        ],
      },
      {
        id: 'next_action',
        label: 'اقدام یا زمان پیگیری بعدی',
        type: 'text',
        placeholder: 'مثلاً تماس دوباره دوشنبه صبح',
        required: true,
      },
    ],
    submitLabel: 'پیشنهاد وضعیت فایل',
    resultTitle: 'وضعیت پیشنهادی این فایل',
    relatedArticle: {
      href: '/articles/stale-property-files/',
      label: 'راهنمای کامل به‌روزرسانی فایل‌های قدیمی',
    },
    metrazhTitle: 'وضعیت و موعد تماس بعدی را کنار خود فایل نگه دارید',
    metrazhDescription:
      'در متراژ می‌توانید فایل‌های فعال را از موارد نیازمند پیگیری یا بایگانی جدا کنید و نتیجهٔ تماس بعدی را همان‌جا ثبت کنید.',
  },
  {
    slug: 'visit-planner',
    kind: 'visit-planner',
    title: 'برنامه‌ریز بازدید ملک',
    shortTitle: 'برنامه‌ریز بازدید',
    description:
      'تا سه بازدید را با ساعت، ترتیب، زمان حائل و کار بعدی روی یک برگهٔ ساده و قابل چاپ بچینید.',
    seoDescription:
      'تا سه بازدید ملک را با ساعت، زمان حائل و پیگیری بعدی بچینید و برنامه را رایگان چاپ یا کپی کنید.',
    kicker: 'برای مسیر، تأخیر و جمع‌بندی جا بگذارید',
    cover: '/images/editorial/visit-route-planning.webp',
    coverAlt: 'تقویم و نقشه برای چیدن چند بازدید ملک',
    fields: [
      {
        id: 'visit_date',
        label: 'تاریخ بازدیدها',
        type: 'date',
        required: true,
      },
      {
        id: 'visit_one',
        label: 'بازدید اول',
        type: 'text',
        placeholder: 'ساعت و نام یا کد کوتاه فایل',
        required: true,
      },
      {
        id: 'visit_two',
        label: 'بازدید دوم',
        type: 'text',
        placeholder: 'ساعت و نام یا کد کوتاه فایل',
        required: true,
      },
      {
        id: 'visit_three',
        label: 'بازدید سوم؛ اختیاری',
        type: 'text',
        placeholder: 'ساعت و نام یا کد کوتاه فایل',
      },
      {
        id: 'buffer',
        label: 'زمان حائل میان قرارها',
        type: 'number',
        placeholder: 'مثلاً ۳۰',
        help: 'برحسب دقیقه و متناسب با مسیر واقعی شهر.',
        required: true,
      },
      {
        id: 'focus',
        label: 'نکته‌ای که مشتری باید مقایسه کند',
        type: 'textarea',
        placeholder: 'مثلاً نور، آسانسور و شکل پرداخت',
        required: true,
      },
      {
        id: 'follow_up',
        label: 'زمان جمع‌بندی و پیگیری',
        type: 'text',
        placeholder: 'مثلاً همان روز ساعت ۱۹',
        required: true,
      },
    ],
    submitLabel: 'ساختن برنامهٔ بازدید',
    resultTitle: 'برنامهٔ آمادهٔ بازدید',
    relatedArticle: {
      href: '/articles/plan-property-visits/',
      label: 'راهنمای چیدن چند بازدید بدون آشفتگی',
    },
    metrazhTitle: 'بازدیدها را به فایل و مشتری مربوط وصل کنید',
    metrazhDescription:
      'در متراژ می‌توانید قرار بازدید، مسیر و نتیجهٔ پیگیری را کنار همان فایل و مشتری نگه دارید تا برنامه بعد از تمام‌شدن قرار گم نشود.',
  },
];

export const getPracticalRealEstateTool = (slug: string) =>
  practicalRealEstateTools.find((tool) => tool.slug === slug);
