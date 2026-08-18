import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://mahsai.ir');
  const articles = (await getCollection('articles'))
    .filter((article) => !article.data.draft)
    .sort(
      (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
    );

  const items = articles
    .map((article) => {
      const url = new URL(`/articles/${article.id}/`, base).toString();
      return `<item><title>${escapeXml(article.data.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(article.data.description)}</description><pubDate>${article.data.publishedAt.toUTCString()}</pubDate></item>`;
    })
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>مجلهٔ املاک MAHSAI</title><link>${new URL('/articles/', base)}</link><description>راهنماهای ساده و کاربردی برای مشاوران املاک ایران</description><language>fa-IR</language>${items}</channel></rss>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
