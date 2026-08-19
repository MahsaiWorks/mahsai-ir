# کش، سرآیندهای امنیتی و سلامت ایمیل MAHSAI

تاریخ بررسی: ۲۸ مرداد ۱۴۰۵ / ۱۹ اوت ۲۰۲۶

این سند وضعیت واقعاً اعمال‌شده را از کارهای پیشنهادی یا نیازمند بررسی انسانی جدا می‌کند. رمز، کد یک‌بارمصرف، شناسهٔ حساب یا کلید خصوصی نباید وارد مخزن شود.

## وضعیت زندهٔ مشاهده‌شده

در ۲۸ مرداد ۱۴۰۵ این وضعیت روی پاسخ عمومی دامنه تأیید شد:

- چهار رکورد `A` دامنهٔ اصلی و رکورد `CNAME` مربوط به `www` در Cloudflare پروکسی شدند؛ رکوردهای ایمیل و تأیید مالکیت دست‌نخورده و در حالت DNS only ماندند.
- هر چهار مبدأ GitHub Pages پیش از تغییر، جداگانه با HTTPS و گواهی معتبر `mahsai.ir` پاسخ `200` دادند.
- حالت رمزنگاری Cloudflare روی `Full (strict)`، اجبار HTTPS روشن، حداقل TLS برابر 1.2 و TLS 1.3 فعال است.
- `https://mahsai.ir/` از Cloudflare پاسخ `200` می‌دهد و `https://www.mahsai.ir/` با `301` به دامنهٔ اصلی می‌رود.
- HSTS مبدأ GitHub با `max-age=31556952` همچنان در پاسخ عمومی حاضر است.
- سرآیندهای امنیتی این سند در پاسخ زنده مشاهده شدند.
- Web Analytics برای دامنه فعال است؛ در لحظهٔ فعال‌سازی پروکسی هنوز خط مبنای بازدید وجود نداشت.

## قانون کش فعال در Cloudflare

قانون فعال `MAHSAI hashed code assets` فقط نشانی‌های `https://mahsai.ir/_astro/*` را شامل می‌شود و برای Edge و مرورگر TTL سی‌روزه دارد. پاسخ نخست یک فایل CSS با `cf-cache-status: MISS` و درخواست دوم همان فایل با `cf-cache-status: HIT` تأیید شد.

HTML، sitemap، robots، security.txt، لوگو و کارت‌های اجتماعی عمداً وارد این قانون نشدند تا محتوای تازه یا اصلاح برند پشت کش طولانی نماند. افزودن `/images/responsive/v1/*` و `/fonts/*` به کش طولانی‌تر فقط پس از تثبیت قرارداد نسخه‌گذاری انجام می‌شود.

مسیر تصاویر واکنش‌گرا عمداً با `v1` نسخه‌گذاری شده است. هر تغییر ناسازگار در فایل‌های تولیدشده باید با `v2` منتشر شود.

## سرآیندهای امنیتی فعال

این مقدارها با یک Response Header Transform Rule سراسری فعال شدند:

```text
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' mailto:; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com; upgrade-insecure-requests
```

وجود `'unsafe-inline'` در `script-src` فعلاً برای داده‌های ساختاریافتهٔ JSON-LD و چند رفتار سبک سمت مرورگر لازم است. این یک محدودیت ثبت‌شده است؛ حذف آن نیازمند nonce یا نگهداری hash جداگانه برای دادهٔ ساختاریافتهٔ هر صفحه است.

پاسخ خانه، انتقال HTTP، انتقال `www`، مسیر قدیمی `/ai/*` و کش فایل نسخه‌دار پس از فعال‌سازی با درخواست شبکه کنترل شدند. بازبینی کامل صفحه‌های نسخهٔ تازه نیز بخشی از کنترل پس از انتشار است.

## security.txt

فایل استاندارد گزارش امنیتی در `public/.well-known/security.txt` افزوده شده است. تاریخ انقضای آن پیش از ۲۸ مرداد ۱۴۰۶ باید تمدید شود.

## سلامت دامنهٔ ایمیل

رکوردهای عمومی مشاهده‌شده:

- MX: `mc.mailfa.com` و `mx-gw.mailfa.com`؛
- SPF: `v=spf1 mx ip4:194.62.17.204 ~all`؛
- DMARC: سیاست `quarantine` برای دامنهٔ اصلی، هم‌ترازی سخت‌گیرانه و گزارش به ایمیل پشتیبانی؛
- DKIM: رکورد عمومی در `dkim._domainkey` وجود دارد؛ تحویل واقعی ایمیل از ابتدا تا انتها در این کار آزموده نشده است.

تغییر SPF، DKIM یا DMARC بدون تأیید سرویس‌دهندهٔ ایمیل انجام نمی‌شود تا ارسال ایمیل مختل نشود. کلید خصوصی یا اطلاعات ورود هرگز نباید ارسال یا ذخیره شود.

## دروازه‌های بیرونی باقی‌مانده

- تأیید وضعیت مالکیت موجود در Google Search Console و ثبت sitemap؛
- افزودن دامنه به Bing Webmaster Tools؛
- ثبت خط مبنای Web Analytics پس از جمع‌شدن دادهٔ واقعی؛
- آزمون ارسال و دریافت ایمیل دامنه توسط مالک یا سرویس‌دهنده؛
- بازبینی حقوقی ایرانی برای شرایط استفاده، حریم خصوصی، تعهد پاسخ‌گویی و متن دوره‌های پولی پیش از فروش.
