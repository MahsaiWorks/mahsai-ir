import { getCollection } from 'astro:content';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export async function GET() {
  const updates = (await getCollection('aiUpdates'))
    .filter((update) => !update.data.draft)
    .sort(
      (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
    );
  const base = 'https://mahsai.ir';
  const items = updates
    .map((update) => {
      const url = `${base}/ai/today/${update.id}/`;
      return `<item><title>${escapeXml(update.data.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(update.data.description)}</description><pubDate>${update.data.publishedAt.toUTCString()}</pubDate></item>`;
    })
    .join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>رادار هوش مصنوعی MAHSAI</title><link>${base}/ai/today/</link><description>گزارش‌های تأییدشدهٔ هوش مصنوعی با منبع رسمی</description><language>fa-IR</language>${items}</channel></rss>`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
