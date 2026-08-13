export const benchmarkRunVersion = '0.1';
export const benchmarkRunDate = '2026-08-13';

export const benchmarkScoring = [
  {
    key: 'criteria',
    label: 'معیارهای عینی هر آزمون',
    weight: 60,
    description: 'نام، عدد، تاریخ، واقعیت و شرط‌های قابل بررسی.',
  },
  {
    key: 'format',
    label: 'رعایت دقیق دستور و قالب',
    weight: 25,
    description: 'تعداد خط، جدول، JSON خام و محدودیت طول.',
  },
  {
    key: 'usability',
    label: 'روانی و قابل‌استفاده‌بودن',
    weight: 15,
    description: 'فارسی طبیعی یا خروجی ماشین‌خوان تمیز و بی‌نیاز از اصلاح.',
  },
] as const;

export const benchmarkSystems = [
  {
    id: 'chatgpt-gpt-5-6-sol',
    product: 'ChatGPT',
    model: 'GPT-5.6 Sol',
    mode: 'Pro · گفت‌وگوی موقت',
    surface: 'chatgpt.com',
    captureNote:
      'نام مدل و حالت از منوی قابل مشاهده ثبت شد. هر آزمون در گفت‌وگوی موقت و جدا اجرا شد.',
    results: [
      {
        caseId: 'FA-WR-01',
        response:
          'سلام، یادآوری می‌کنم جلسهٔ بررسی قرارداد در تاریخ ۲۸ مرداد ساعت ۱۰ برگزار می‌شود. لطفاً نسخهٔ نهایی فایل شمارهٔ ۱۴۷ را تا پایان روز ۲۶ مرداد برای خانم نادری ارسال کنید. سپاسگزارم.',
        score: { criteria: 60, format: 24, usability: 14, total: 98 },
        note: 'همهٔ واقعیت‌ها حفظ شد؛ «یادآوری می‌کنم» کمی زمینهٔ تازه به متن افزود.',
      },
      {
        caseId: 'FA-RC-01',
        response:
          'تصمیم: ادامهٔ نمونهٔ دوم\nمسئول و موعد: سارا — آماده‌کردن پیش‌نویس صفحه تا دوشنبه\nموضوع باز: بودجه هنوز تصمیم‌گیری نشده است',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'سه خط، سه برچسب و همهٔ اطلاعات لازم دقیق ماند.',
      },
      {
        caseId: 'FA-ST-01',
        response:
          '{\n"product": "چراغ مطالعه آریا",\n"color": "سبز زیتونی",\n"price_toman": 1850000,\n"stock": 7\n}',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'متن خام مستقیماً با JSON.parse قابل پردازش است.',
      },
      {
        caseId: 'FA-UN-01',
        response:
          'طبق متن داده‌شده، نام محصولات و ماه عرضهٔ آن‌ها ذکر نشده است. بنابراین فقط می‌توان جدول خالی از اطلاعات موجود را ارائه کرد:\nنام محصولماه عرضهذکر نشدهذکر نشدهذکر نشدهذکر نشدهذکر نشدهذکر نشده',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'در صفحه یک جدول سه‌ردیفی نمایش داده شد؛ استخراج متن مرورگر سلول‌ها را پشت سر هم ثبت کرد. هیچ نام یا ماهی ساخته نشد.',
      },
      {
        caseId: 'FA-TR-01',
        response: 'لطفاً در اولین فرصت مستندات موردنیاز را ارسال کنید.',
        score: { criteria: 60, format: 25, usability: 13, total: 98 },
        note: 'درست و محترمانه است، اما هنوز کمی رسمی‌تر از پیام روزمره به نظر می‌رسد.',
      },
      {
        caseId: 'FA-SM-01',
        response:
          'شنبه تا چهارشنبه ۹ تا ۱۹، پنجشنبه ۹ تا ۱۴، جمعه تعطیل. سفارش‌های ثبت‌شده تا ساعت ۱۲ همان روز ارسال می‌شوند.',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'همهٔ روزها، ساعت‌ها و قانون ارسال در کمتر از ۳۵ کلمه حفظ شد.',
      },
    ],
  },
  {
    id: 'gemini-3-6-flash',
    product: 'Google Gemini',
    model: '3.6 Flash',
    mode: 'Flash · گپ موقت',
    surface: 'gemini.google.com',
    captureNote:
      'دکمهٔ اجرا Flash و گزینهٔ منوی قابل مشاهده 3.6 Flash بود. هر آزمون در گپ موقت و جدا اجرا شد.',
    results: [
      {
        caseId: 'FA-WR-01',
        response:
          'سلام! جلسهٔ بررسی قرارداد ۲۸ مرداد ساعت ۱۰ برگزار می‌شود. لطفاً زحمت بکشید نسخهٔ نهایی فایل شمارهٔ ۱۴۷ را تا پایان روز ۲۶ مرداد برای خانم نادری بفرستید. پیشاپیش ممنون از همکاری‌تان!',
        score: { criteria: 60, format: 23, usability: 14, total: 97 },
        note: 'واقعیت‌ها دقیق ماند؛ جمله کمی بیش از نیاز تعارف دارد.',
      },
      {
        caseId: 'FA-RC-01',
        response:
          'تصمیم: ادامه دادن نمونهٔ دوم\nمسئول و موعد: سارا، آماده کردن پیش‌نویس صفحه تا دوشنبه\nموضوع باز: تصمیم‌گیری دربارهٔ بودجه',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'کوتاه، کامل و دقیقاً در سه خط خواسته‌شده.',
      },
      {
        caseId: 'FA-ST-01',
        response:
          '{\n  "product": "چراغ مطالعه آریا",\n  "color": "سبز زیتونی",\n  "price_toman": 1850000,\n  "stock": 7\n}',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'JSON خام معتبر و آمادهٔ پردازش.',
      },
      {
        caseId: 'FA-UN-01',
        response:
          'با توجه به متن ورودی ارائه شده، **نام محصولات و ماه عرضه آن‌ها ذکر نشده است**.\n\nاطلاعات موجود در متن تنها به تعداد محصولات اشاره دارد:\n\n| نام محصول | ماه عرضه |\n| --- | --- |\n| ذکر نشده در متن | ذکر نشده در متن |\n\n> **نکته:** طبق دستور شما مبنی بر استفاده‌ی «صرفاً از متن داده‌شده»، امکان ارائه نام یا زمان عرضه محصولات وجود ندارد.',
        score: { criteria: 60, format: 20, usability: 15, total: 95 },
        note: 'حدس نزد و جدول داد؛ به‌جای سه ردیف فقط یک ردیف جای‌نگهدار ساخت.',
      },
      {
        caseId: 'FA-TR-01',
        response: 'ممنون می‌شم مدارک لازم رو در اولین فرصت برام بفرستید.',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'صمیمی، محترمانه، یک‌جمله‌ای و مناسب پیام کاری روزمره.',
      },
      {
        caseId: 'FA-SM-01',
        response:
          'ساعت کاری فروشگاه: شنبه تا چهارشنبه ۹ تا ۱۹، پنجشنبه‌ها ۹ تا ۱۴ و جمعه تعطیل است. سفارش‌های ثبت‌شده تا ساعت ۱۲، همان روز ارسال می‌شوند.',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'خلاصهٔ کامل، روان و زیر سقف ۳۵ کلمه.',
      },
    ],
  },
  {
    id: 'gemini-3-1-pro',
    product: 'Google Gemini',
    model: '3.1 Pro',
    mode: 'Pro · گپ موقت',
    surface: 'gemini.google.com',
    captureNote:
      'مدل از گزینهٔ قابل مشاهدهٔ 3.1 Pro انتخاب شد. هر آزمون در گپ موقت و جدا اجرا شد.',
    results: [
      {
        caseId: 'FA-WR-01',
        response:
          'سلام! جلسهٔ بررسی قرارداد روز ۲۸ مرداد ساعت ۱۰ برگزار می‌شود. بی‌زحمت نسخهٔ نهایی فایل شمارهٔ ۱۴۷ را تا پایان روز ۲۶ مرداد برای خانم نادری ارسال کنید. ممنون از همکاری‌تون!',
        score: { criteria: 60, format: 23, usability: 14, total: 97 },
        note: 'واقعیت‌ها حفظ شد؛ لحن بین رسمی و محاوره‌ای جابه‌جا می‌شود.',
      },
      {
        caseId: 'FA-RC-01',
        response:
          'تصمیم: ادامهٔ نمونهٔ دوم\nمسئول و موعد: سارا (تا دوشنبه برای پیش‌نویس صفحه)\nموضوع باز: تصمیم‌گیری دربارهٔ بودجه',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'همهٔ اطلاعات لازم با قالب درست استخراج شد.',
      },
      {
        caseId: 'FA-ST-01',
        response:
          '```json\n{\n  "product": "چراغ مطالعه آریا",\n  "color": "سبز زیتونی",\n  "price_toman": 1850000,\n  "stock": 7\n}\n\n```',
        score: { criteria: 45, format: 10, usability: 10, total: 65 },
        note: 'مقادیر درست‌اند، اما حصار Markdown باعث می‌شود کل پاسخ خام JSON معتبر نباشد و پیش از پردازش نیاز به پاک‌سازی داشته باشد.',
      },
      {
        caseId: 'FA-UN-01',
        response:
          'در متن داده‌شده، نام محصولات و ماه عرضهٔ آن‌ها ذکر نشده است. از آنجا که درخواست کرده‌اید **فقط از متن داده‌شده** استفاده کنم، اطلاعات جدول به شکل زیر (نامشخص) خواهد بود:\n\n| نام محصول | ماه عرضه |\n| --- | --- |\n| نامشخص در متن | نامشخص در متن |\n| نامشخص در متن | نامشخص در متن |\n| نامشخص در متن | نامشخص در متن |',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'کمبود اطلاعات را شفاف گفت و سه ردیف بدون دادهٔ ساختگی ارائه کرد.',
      },
      {
        caseId: 'FA-TR-01',
        response: '**ممنون می‌شوم در اولین فرصت، مدارک لازم را بفرستید.**',
        score: { criteria: 60, format: 25, usability: 11, total: 96 },
        note: 'درست است، اما لحن و قالب Markdown از یک پیام کاری ساده رسمی‌تر است.',
      },
      {
        caseId: 'FA-SM-01',
        response:
          'ساعت کاری جدید: شنبه تا چهارشنبه ۹ تا ۱۹، پنجشنبه ۹ تا ۱۴ و جمعه تعطیل است. سفارش‌های ثبت‌شده تا ساعت ۱۲، همان روز ارسال می‌شوند.',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'همهٔ زمان‌ها و قانون ارسال دقیق و کوتاه ماند.',
      },
    ],
  },
  {
    id: 'qwen-3-7-plus-arena',
    product: 'Qwen در Arena',
    model: 'Qwen 3.7 Plus',
    mode: 'Direct · گفت‌وگوی تازه',
    surface: 'arena.ai',
    captureNote:
      'مدل ثابت qwen3.7-plus در حالت Direct انتخاب شد. فقط پاسخ نهایی ثبت شد و متن فرایند داخلی وارد داده نشد.',
    results: [
      {
        caseId: 'FA-WR-01',
        response:
          'سلام! جلسهٔ بررسی قرارداد ۲۸ مرداد ساعت ۱۰ برگزار می‌شه. بی‌زحمت نسخهٔ نهایی فایل شمارهٔ ۱۴۷ رو تا پایان روز ۲۶ مرداد برای خانم نادری بفرستید. پیشاپیش ممنون از لطفتون!',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'همهٔ واقعیت‌ها حفظ شد و لحن به‌شکل طبیعی صمیمی شد.',
      },
      {
        caseId: 'FA-RC-01',
        response:
          'تصمیم: ادامهٔ نمونهٔ دوم\nمسئول و موعد: سارا، تا دوشنبه\nموضوع باز: بودجه',
        score: { criteria: 60, format: 23, usability: 14, total: 97 },
        note: 'برچسب‌ها و نکته‌های اصلی درست‌اند، اما اقدام «پیش‌نویس صفحه» حذف شد.',
      },
      {
        caseId: 'FA-ST-01',
        response:
          '{\n"product": "چراغ مطالعه آریا",\n"color": "سبز زیتونی",\n"price_toman": 1850000,\n"stock": 7\n}',
        score: { criteria: 60, format: 25, usability: 15, total: 100 },
        note: 'JSON خام معتبر و دقیق.',
      },
      {
        caseId: 'FA-UN-01',
        response:
          'در متن داده‌شده، نام محصولات و ماه عرضهٔ آن‌ها ذکر نشده است. بنابراین امکان تکمیل جدول وجود ندارد.',
        score: { criteria: 60, format: 5, usability: 13, total: 78 },
        note: 'حدس نزد و پاسخ صادقانه بود، اما جدول خواسته‌شده را نساخت.',
      },
      {
        caseId: 'FA-TR-01',
        response: 'ممنون می‌شم در اولین فرصت مدارک رو برام بفرستی.',
        score: { criteria: 60, format: 25, usability: 13, total: 98 },
        note: 'روان و کوتاه است؛ خطاب مفرد برای همهٔ محیط‌های کاری مناسب نیست.',
      },
      {
        caseId: 'FA-SM-01',
        response:
          'شنبه تا چهارشنبه ۹ تا ۱۹، پنجشنبه ۹ تا ۱۴ و جمعه تعطیل است. سفارش‌های تا ساعت ۱۲ همان روز ارسال می‌شوند.',
        score: { criteria: 60, format: 25, usability: 7, total: 92 },
        note: 'همهٔ داده‌ها حفظ شد، اما حذف «ثبت‌شده» جملهٔ پایانی را ناهماهنگ کرد.',
      },
    ],
  },
] as const;

export const benchmarkCaseWinners = [
  {
    caseId: 'FA-WR-01',
    useCase: 'بازنویسی دوستانه با حفظ عدد و تاریخ',
    winner: 'Qwen 3.7 Plus',
    score: 100,
    reason: 'طبیعی‌ترین بازنویسی این اجرا را بدون تغییر واقعیت داد.',
  },
  {
    caseId: 'FA-RC-01',
    useCase: 'استخراج تصمیم و مسئول',
    winner: 'ChatGPT · Gemini Flash · Gemini Pro',
    score: 100,
    reason: 'هر سه، ساختار و اطلاعات را کامل حفظ کردند.',
  },
  {
    caseId: 'FA-ST-01',
    useCase: 'JSON خام و ماشین‌خوان',
    winner: 'ChatGPT · Gemini Flash · Qwen',
    score: 100,
    reason: 'هر سه پاسخ خام قابل پردازش دادند؛ Gemini Pro دور JSON حصار گذاشت.',
  },
  {
    caseId: 'FA-UN-01',
    useCase: 'خودداری از حدس',
    winner: 'ChatGPT · Gemini Pro',
    score: 100,
    reason: 'کمبود اطلاعات را گفتند و قالب سه‌ردیفی را هم حفظ کردند.',
  },
  {
    caseId: 'FA-TR-01',
    useCase: 'لحن صمیمی و محترمانه',
    winner: 'Gemini 3.6 Flash',
    score: 100,
    reason: 'روان‌ترین پیام روزمره را با احترام مناسب نوشت.',
  },
  {
    caseId: 'FA-SM-01',
    useCase: 'خلاصهٔ دقیق با سقف کلمه',
    winner: 'ChatGPT · Gemini Flash · Gemini Pro',
    score: 100,
    reason: 'هر سه همهٔ روزها، ساعت‌ها و قانون ارسال را دقیق نگه داشتند.',
  },
] as const;

export const benchmarkExcludedRuns = [
  {
    tool: 'Claude (سایت رسمی)',
    reason: 'نشست وارد حساب نبود؛ بدون ورود تازه اجرا نشد.',
  },
  {
    tool: 'Perplexity و Microsoft Copilot',
    reason:
      'صفحهٔ راستی‌آزمایی یا مسدودسازی Cloudflare اجازهٔ اجرای پایدار نداد.',
  },
  {
    tool: 'Claude Sonnet 4.5 در Arena',
    reason:
      'پنج پاسخ ثبت شد، اما آزمون ششم به محدودیت نرخ خورد؛ اجرای ناقص رتبه نگرفت.',
  },
  {
    tool: 'Qwen Studio مهمان',
    reason:
      'پیش از تکمیل شش آزمون، اجازهٔ ورود Google خواست؛ مجوز تازه داده نشد.',
  },
  {
    tool: 'GLM 5.1 و Kimi در Arena',
    reason:
      'GLM خطای تولید داد و Kimi پیش از پاسخ CAPTCHA نشان داد؛ هیچ نتیجه‌ای ساخته نشد.',
  },
] as const;

export const benchmarkResultFiles = {
  json: '/ai/persian-benchmark-results-v0.1.json',
  csv: '/ai/persian-benchmark-results-v0.1.csv',
} as const;

export const getBenchmarkAverage = (
  system: (typeof benchmarkSystems)[number],
) =>
  Math.round(
    (system.results.reduce((sum, item) => sum + item.score.total, 0) /
      system.results.length) *
      10,
  ) / 10;

export const benchmarkRanking = benchmarkSystems
  .map((system) => ({
    id: system.id,
    product: system.product,
    model: system.model,
    average: getBenchmarkAverage(system),
  }))
  .sort((a, b) => b.average - a.average);
