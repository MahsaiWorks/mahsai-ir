import { seriesDesignedStories } from './seriesDesignedStories';

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
  kind?: 'card' | 'image' | 'designed';
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
  slides: readonly MovieStorySlide[];
}

export const movieStoryGroups: MovieStoryGroup[] = [
  {
    id: 'course',
    label: 'آموزش',
    cover: `${movieAssets}/highlights/course.jpg`,
    slides: seriesDesignedStories.course,
  },
  {
    id: 'samples',
    label: 'نمونه‌ها',
    cover: `${movieAssets}/highlights/samples.jpg`,
    slides: seriesDesignedStories.samples,
  },
  {
    id: 'faq',
    label: 'سوالات',
    cover: `${movieAssets}/highlights/faq.jpg`,
    slides: seriesDesignedStories.faq,
  },
  {
    id: 'phone',
    label: 'با گوشی',
    cover: `${movieAssets}/highlights/phone.jpg`,
    slides: seriesDesignedStories.phone,
  },
  {
    id: 'behind',
    label: 'مسیر ساخت',
    cover: `${movieAssets}/highlights/behind.jpg`,
    slides: seriesDesignedStories.behind,
  },
  {
    id: 'episodes',
    label: 'خانه پدری',
    cover: `${movieAssets}/highlights/series.jpg`,
    slides: seriesDesignedStories.episodes,
  },
  {
    id: 'enrol',
    label: 'ثبت‌نام',
    cover: `${movieAssets}/highlights/enrol.jpg`,
    slides: seriesDesignedStories.enrol,
  },
];

// The owner will add actual, permissioned feedback screenshots later.
// No testimonial group is rendered until those original files are supplied.
