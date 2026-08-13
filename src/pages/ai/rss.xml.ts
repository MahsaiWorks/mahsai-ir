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
      (a, b) =>
        b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf() ||
        b.data.priority - a.data.priority,
    );
  const guides = (await getCollection('aiGuides'))
    .filter((guide) => !guide.data.draft)
    .sort(
      (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
    );
  const base = 'https://mahsai.ir';
  const items = [
    ...updates.map((update) => ({
      title: update.data.title,
      description: `${update.data.description} کار پیشنهادی: ${update.data.action}`,
      publishedAt: update.data.publishedAt,
      url: `${base}/ai/today/${update.id}/`,
    })),
    ...guides.map((guide) => ({
      title: guide.data.title,
      description: guide.data.description,
      publishedAt: guide.data.publishedAt,
      url: `${base}/ai/learn/${guide.id}/`,
    })),
  ]
    .sort((a, b) => b.publishedAt.valueOf() - a.publishedAt.valueOf())
    .map((item) => {
      return `<item><title>${escapeXml(item.title)}</title><link>${item.url}</link><guid>${item.url}</guid><description>${escapeXml(item.description)}</description><pubDate>${item.publishedAt.toUTCString()}</pubDate></item>`;
    })
    .join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>هوش مصنوعی MAHSAI</title><link>${base}/ai/</link><description>رادار، راهنما و آموزش هوش مصنوعی به زبان ساده با منبع رسمی</description><language>fa-IR</language>${items}</channel></rss>`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
