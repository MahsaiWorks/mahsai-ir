export const movieAssets = '/assets/ai-series-mobile';
export const movieCheckoutUrl =
  'https://android-pay.mahsai.ir/account/academy/series-mobile';
export const movieInstagramUrl = 'https://www.instagram.com/mahsaimovie/';
export const moviePriceLabel = '۱ میلیون تومان';

export const persianNumber = (value: number): string =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)] ?? digit);

// Short cover analyses and suggested exercises, not a claim about the tools or
// production steps used for these episodes or a recorded episode breakdown.
const episodeFrameTeaching = [
  {
    title: 'شخصیت در فضای شب',
    text: 'نور گرم و خیابان تیره، چهره را از فضای اطراف جدا می‌کنند. تمرین کن شخصیتت در نمای شب، از پس‌زمینه واضح‌تر دیده شود.',
  },
  {
    title: 'پیش‌زمینه و پس‌زمینه',
    text: 'چهرهٔ نزدیک و عمارتِ دور، دو لایهٔ متفاوت در تصویر ساخته‌اند. تمرین کن هم شخصیت دیده شود و هم نشانه‌ای از مکان داستان.',
  },
  {
    title: 'عمق‌دادن به یک قاب ساده',
    text: 'میز در جلو و فضای اداری در عقب، به تصویر عمق می‌دهند. تمرین کن چهرهٔ شخصیت میان این لایه‌ها همچنان نقطهٔ توجه بماند.',
  },
  {
    title: 'قاب دونفره و خط نگاه',
    text: 'دو چهره و جهت نگاهشان، توجه را به رابطهٔ میان آن‌ها می‌برند. تمرین کن جای شخصیت‌ها و خط نگاهشان در قاب هماهنگ باشد.',
  },
  {
    title: 'یک شیء، یک نشانهٔ داستانی',
    text: 'قاب عکس در دست شخصیت، یک نشانهٔ قابل‌دیدن به تصویر اضافه می‌کند. تمرین کن با یک شیء ساده، بخشی از قصه را نشان بدهی.',
  },
  {
    title: 'احساس صحنه در دست‌ها',
    text: 'فاصلهٔ کم، حالت چهره و گرفتن دست، حس تنش را به قاب می‌آورند. تمرین کن احساس شخصیت‌ها را با ژست بدن هم منتقل کنی.',
  },
  {
    title: 'اندازهٔ نما و حس حضور',
    text: 'چهرهٔ نزدیک و بدنِ رو به دوربین، حضور شخصیت را پررنگ کرده‌اند. تمرین کن با تغییر اندازهٔ نما، حس نزدیکی به شخصیت را عوض کنی.',
  },
  {
    title: 'جای شخصیت‌ها در قاب',
    text: 'نگاه رو به بالای یک شخصیت و ورود دیگری از کنار قاب، ارتباطشان را روشن می‌کند. تمرین کن زاویه و جهت نگاه هر دو با جای بدنشان هماهنگ باشد.',
  },
  {
    title: 'پالت رنگ منسجم',
    text: 'لباس زرشکی و نور گرم، رنگ‌های قاب را به هم نزدیک کرده‌اند. تمرین کن برای لباس، فضا و نور، یک پالت محدود و هماهنگ انتخاب کنی.',
  },
  {
    title: 'روایت با یک حرکت کوچک',
    text: 'در این نمای نزدیک، حرکت انگشت و حالت چهره‌ها مرکز توجه‌اند. تمرین کن یک کنش کوچک و خوانا را جایگزین شلوغ‌کردن صحنه کنی.',
  },
  {
    title: 'خواناییِ کنش در قاب',
    text: 'کشیده‌شدن لباس و جهت بدن‌ها، کنش اصلی را در تصویر مشخص می‌کنند. تمرین کن در یک قاب پرتنش، نگاه مخاطب به اتفاق اصلی هدایت شود.',
  },
  {
    title: 'بافت، قطره و نور',
    text: 'قطره‌های آب و نور روی پوست و کاشی، بافت‌های متفاوتی ساخته‌اند. تمرین کن جزئیات سطح‌ها با جهت و شدت نور هماهنگ بمانند.',
  },
  {
    title: 'روایت با جزئیات روزمره',
    text: 'فنجان و میز صبحانه، موقعیت روزمرهٔ شخصیت را نشان می‌دهند. تمرین کن با انتخاب چند وسیله، فضا را بدون توضیح طولانی معرفی کنی.',
  },
  {
    title: 'انتخاب لحظهٔ کنجکاوی',
    text: 'دست روی دستگیره و نگاه به پشت، یک لحظهٔ ناتمام را نشان می‌دهند. تمرین کن قابی انتخاب کنی که مخاطب بخواهد اتفاق بعدی را ببیند.',
  },
  {
    title: 'معرفی مکان با جزئیات',
    text: 'دمبل و تجهیزات پس‌زمینه، مکان صحنه را قابل‌شناسایی می‌کنند. تمرین کن وسایل، لباس و جزئیات محیط با موقعیت داستانت هماهنگ باشند.',
  },
  {
    title: 'روایت در چند لایه',
    text: 'دو شخصیت در جلو و چهرهٔ سوم در عقب، چند نقطهٔ توجه ساخته‌اند. تمرین کن با چیدن شخصیت‌ها در عمق، اطلاعات بیشتری در یک قاب بدهی.',
  },
] as const;

export const movieEpisodes = episodeFrameTeaching.map((teaching, index) => ({
  number: index + 1,
  label: `قسمت ${persianNumber(index + 1)}`,
  image: `${movieAssets}/episodes/episode-${String(index + 1).padStart(2, '0')}.jpg`,
  teachingTitle: teaching.title,
  teachingText: teaching.text,
}));

export interface MovieStorySlide {
  kind?: 'card' | 'image';
  image?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  buttonLabel?: string;
  href?: string;
}

export interface MovieStoryGroup {
  id: string;
  label: string;
  cover: string;
  slides: MovieStorySlide[];
}

export const movieStoryGroups: MovieStoryGroup[] = [
  {
    id: 'course',
    label: 'آموزش',
    cover: `${movieAssets}/highlights/course.jpg`,
    slides: [
      {
        image: `${movieAssets}/scene-closeup.jpg`,
        eyebrow: 'آموزش موجود · شخصیت‌سازی',
        title: 'شخصیت مجازی بساز.',
        text: 'ساخت شخصیت از صفر و افزایش ثبات چهره؛ همراه با مثال عملیِ شخصیت در ویدیوی بازدید ملک.',
      },
      {
        image: `${movieAssets}/scene-car.jpg`,
        eyebrow: 'آموزش موجود · تصویر و ویدیو',
        title: 'از تصویر، ویدیو بساز.',
        text: 'تولید ویدیو با هوش مصنوعی را با مثال‌های عملی مثل قبل‌و‌بعد ویلا و بازسازی تمرین کن.',
      },
      {
        image: `${movieAssets}/scene-driver.jpg`,
        eyebrow: 'آموزش موجود · کیفیت ویدیو',
        title: 'ویدیوی طبیعی‌تر بساز.',
        text: 'اصول طبیعی‌ترشدن ویدیو و دلایل خطاهای رایج هوش مصنوعی را بشناس؛ همراه با مثال عملی.',
      },
      {
        image: `${movieAssets}/highlights/samples.jpg`,
        eyebrow: 'آموزش موجود · روایت چندقسمتی',
        title: 'محتوای سریالی طراحی کن.',
        text: 'الگوهای موفق محتوا را تحلیل کن و با طراحی محتوای سریالی و رشته‌استوری بلاگری آشنا شو.',
      },
      {
        image: `${movieAssets}/highlights/series.jpg`,
        eyebrow: 'آموزش موجود · موسیقی',
        title: 'موسیقی باکلام و بی‌کلام بساز.',
        text: 'ساخت موسیقی با هوش مصنوعی را برای همراه‌کردن با ویدیوها و محتوایت تمرین کن.',
      },
      {
        image: `${movieAssets}/highlights/course.jpg`,
        eyebrow: 'آموزش موجود · ابزارها',
        title: 'ابزار مناسب را انتخاب کن.',
        text: 'تنظیم ChatGPT برای تولید محتوا، نکته‌های کار با Flow و Gemini و حل مشکلات رایج ابزارها.',
      },
      {
        image: `${movieAssets}/highlights/enrol.jpg`,
        eyebrow: 'ثبت‌نام آموزش',
        title: moviePriceLabel,
        text: '۱۵ ویدیوی ضبط‌شده، با مجموع ۱ ساعت و ۴۰ دقیقه و ۲۴ ثانیه آموزش. دسترسی آنلاین در حساب شخصی؛ هزینهٔ ابزارها جداست.',
        buttonLabel: 'خرید دوره',
        href: movieCheckoutUrl,
      },
    ],
  },
  {
    id: 'samples',
    label: 'نمونه‌ها',
    cover: `${movieAssets}/highlights/samples.jpg`,
    slides: [
      {
        kind: 'image',
        image: `${movieAssets}/scene-rain.jpg`,
        title: 'خانه پدری',
        text: 'قابی از سریال؛ نمونه‌کار سازندهٔ دوره',
      },
      {
        kind: 'image',
        image: `${movieAssets}/scene-office.jpg`,
        title: 'شخصیت‌ها در یک جهان داستانی',
        text: 'نمونه‌کار سازندهٔ دوره',
      },
      {
        kind: 'image',
        image: `${movieAssets}/scene-car.jpg`,
        title: 'روایت، موقعیت و رابطه',
        text: 'نمونه‌کار سازندهٔ دوره',
      },
    ],
  },
  {
    id: 'faq',
    label: 'سوالات',
    cover: `${movieAssets}/highlights/faq.jpg`,
    slides: [
      {
        image: `${movieAssets}/highlights/phone.jpg`,
        eyebrow: 'سوال ۱',
        title: 'با گوشی می‌توانم شروع کنم؟',
        text: 'بله. برای شروع تمرین‌ها، گوشی، اینترنت و حساب ابزارهای مورد استفاده را لازم داری. تمرین بخش مهم یادگیری است.',
      },
      {
        image: `${movieAssets}/highlights/faq.jpg`,
        eyebrow: 'سوال ۲',
        title: 'هزینهٔ ابزارها داخل شهریه است؟',
        text: 'شهریه برای آموزش است. هزینهٔ اشتراک یا اعتبار ابزارهای هوش مصنوعی جداگانه پرداخت می‌شود.',
      },
      {
        image: `${movieAssets}/teacher.jpg`,
        eyebrow: 'سوال ۳',
        title: 'بعد از خرید، درس‌ها کجاست؟',
        text: 'ویدیوهای خریداری‌شده را آنلاین در حساب شخصی خودت می‌بینی؛ با دسترسی دائمی به محتوای خریداری‌شده.',
      },
      {
        image: `${movieAssets}/highlights/enrol.jpg`,
        eyebrow: 'سوال ۴',
        title: 'قبل از پرداخت چه می‌بینم؟',
        text: 'نام دوره، مبلغ نهایی و شرایط خرید را در پنل ثبت‌نام می‌بینی و سپس به پرداخت می‌رسی.',
        buttonLabel: 'ورود به ثبت‌نام',
        href: movieCheckoutUrl,
      },
    ],
  },
  {
    id: 'phone',
    label: 'با گوشی',
    cover: `${movieAssets}/highlights/phone.jpg`,
    slides: [
      {
        image: `${movieAssets}/highlights/phone.jpg`,
        eyebrow: 'شروع ساده',
        title: 'گوشی، اینترنت، یک ایده.',
        text: 'برای شروع، لازم نیست دوربین یا تجهیزات فیلم‌برداری بخری. روی ایده، کار با ابزارها و تمرین تمرکز کن.',
      },
      {
        image: `${movieAssets}/teacher.jpg`,
        eyebrow: 'آموزش همراه با تمرین',
        title: 'ببین؛ همان موقع امتحان کن.',
        text: 'درس‌ها را به‌ترتیب جلو برو و آموخته‌ها را برای شخصیت و داستان خودت به کار بگیر.',
      },
    ],
  },
  {
    id: 'behind',
    label: 'مسیر ساخت',
    cover: `${movieAssets}/highlights/behind.jpg`,
    slides: [
      {
        image: `${movieAssets}/scene-closeup.jpg`,
        eyebrow: '۰۱ · شخصیت',
        title: 'از شخصیت شروع کن.',
        text: 'چهره، ظاهر و حس شخصیت، نقطهٔ شروع یک دنیای داستانی هستند.',
      },
      {
        image: `${movieAssets}/scene-office.jpg`,
        eyebrow: '۰۲ · موقعیت',
        title: 'برای شخصیتت یک جهان بساز.',
        text: 'فضا، نور و رابطهٔ شخصیت‌ها را کنار هم بچین تا هر تصویر بخشی از یک داستان باشد.',
      },
      {
        image: `${movieAssets}/scene-rain.jpg`,
        eyebrow: '۰۳ · روایت',
        title: 'به قسمت بعد فکر کن.',
        text: 'یک موقعیت داستانی بساز که ادامه‌اش برای مخاطب جذاب باشد؛ برای سرگرمی یا روایت برندت.',
      },
    ],
  },
  {
    id: 'episodes',
    label: 'خانه پدری',
    cover: `${movieAssets}/highlights/series.jpg`,
    slides: movieEpisodes.map((episode) => ({
      kind: 'image',
      image: episode.image,
      eyebrow: 'نکتهٔ ساخت این قاب',
      title: `${episode.label} · ${episode.teachingTitle}`,
      text: episode.teachingText,
      buttonLabel: 'تماشای سریال در پیج',
      href: movieInstagramUrl,
    })),
  },
  {
    id: 'enrol',
    label: 'ثبت‌نام',
    cover: `${movieAssets}/highlights/enrol.jpg`,
    slides: [
      {
        image: `${movieAssets}/highlights/enrol.jpg`,
        eyebrow: 'آموزش ساخت سریال با هوش مصنوعی',
        title: moviePriceLabel,
        text: 'وارد حساب خودت شو، شرایط خرید را ببین و ثبت‌نام را کامل کن.',
        buttonLabel: 'خرید دوره',
        href: movieCheckoutUrl,
      },
    ],
  },
];

// The owner will add actual, permissioned feedback screenshots later.
// No testimonial group is rendered until those original files are supplied.
