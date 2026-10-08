export const approvedBrandBiography =
  'مهسای آموزش عملی ساخت محتوا با هوش مصنوعی و ابزارهای فارسی برای کار روزانه ارائه می‌کند؛ از دورهٔ ابر مشاور در آکادمی مهسای تا آموزش‌های رایگان و اپلیکیشن متراژ.';
export const approvedBrandDescription =
  'آکادمی مهسای؛ دورهٔ ابر مشاور برای ساخت عکس، ویدیو و استوری با هوش مصنوعی، در کنار آموزش‌های رایگان، ابزارهای فارسی و اپلیکیشن متراژ.';

const approvedEducationPages = new Set([
  'index.html',
  'about/index.html',
  'support/index.html',
  'editorial-policy/index.html',
  'academy/index.html',
  'academy/courses/ai-content-real-estate/index.html',
]);

function removeApprovedStructuredDescriptions(data) {
  const nodes = Array.isArray(data)
    ? data
    : Array.isArray(data?.['@graph'])
      ? data['@graph']
      : [data];
  for (const node of nodes) {
    if (!node || typeof node !== 'object') continue;
    const types = Array.isArray(node['@type'])
      ? node['@type']
      : [node['@type']];
    if (
      (types.length === 1 &&
        types.includes('Organization') &&
        node.description === approvedBrandBiography) ||
      (types.length === 1 &&
        types.includes('WebSite') &&
        node.description === approvedBrandDescription)
    ) {
      delete node.description;
    }
  }
}

export function copyForPublicAiAudit(html) {
  // The shared brand footer introduces the real Academy on every route.
  // Product features, page metadata and other footers remain in this check.
  return html
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, (footer) => {
      const classes = footer.match(/^<footer\b[^>]*\bclass=["']([^"']*)["']/i);
      return classes?.[1].split(/\s+/).includes('mahsai-footer') ? '' : footer;
    })
    .replace(/<meta\b[^>]*>/gi, (tag) => {
      const attributes = Object.fromEntries(
        [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map((match) => [
          match[1].toLowerCase(),
          match[3],
        ]),
      );
      const kind = attributes.name || attributes.property;
      return ['description', 'og:description', 'twitter:description'].includes(
        kind,
      ) && attributes.content === approvedBrandDescription
        ? ''
        : tag;
    })
    .replace(
      /(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
      (script, opening, content, closing) => {
        try {
          const data = JSON.parse(content);
          removeApprovedStructuredDescriptions(data);
          return `${opening}${JSON.stringify(data)}${closing}`;
        } catch {
          return script;
        }
      },
    );
}

export function hasUnapprovedPublicAiCopy(relativeFile, html) {
  return (
    !approvedEducationPages.has(relativeFile) &&
    copyForPublicAiAudit(html).includes('هوش مصنوعی')
  );
}
