# پیوندهای قابل سنجش کمپین متراژ

همهٔ پیوندها ابتدا وارد دامنهٔ خود MAHSAI می‌شوند، در sitemap نیستند و `noindex` دارند. مقصد فقط صفحهٔ رسمی متراژ در کافه‌بازار است.

| جایگاه                       | پیوند                                                   |
| ---------------------------- | ------------------------------------------------------- |
| بیوی اینستاگرام `@mahsaiapp` | `https://mahsai.ir/go/metrazh-instagram/?content=bio`   |
| کپشن پست                     | `https://mahsai.ir/go/metrazh-instagram/?content=post`  |
| استوری                       | `https://mahsai.ir/go/metrazh-instagram/?content=story` |
| رمزینهٔ چاپی/تصویری          | `https://mahsai.ir/go/metrazh-instagram/?content=qr`    |

پارامتر `content` فقط از فهرست بالا پذیرفته می‌شود. مقصد دارای `utm_source=instagram`، `utm_medium=social`، `utm_campaign=metrazh_install` و شناسهٔ محتوای متناظر است. مقدار ناشناخته به `bio` برمی‌گردد و امکان ساخت مقصد دلخواه ندارد.

فایل رمزینهٔ کمپین: `public/images/campaigns/metrazh-instagram-qr.png`.

رمزینهٔ داخل صفحهٔ محصول همچنان مستقیم به کافه‌بازار می‌رود تا نصب عادی به کمپین اینستاگرام نسبت داده نشود.
