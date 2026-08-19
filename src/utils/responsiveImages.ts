const responsiveWidths = [240, 320, 480, 720] as const;
const responsiveVersion = 'v1';

export function getResponsiveImageSrcSet(
  source: string,
  intrinsicWidth: number,
) {
  if (!source.startsWith('/images/') || source.endsWith('.svg')) return;

  const cleanSource = source.split(/[?#]/, 1)[0] ?? source;
  const extensionIndex = cleanSource.lastIndexOf('.');
  if (extensionIndex < 0) return;

  const relativeBase = cleanSource
    .slice('/images/'.length, extensionIndex)
    .replaceAll('\\', '/');
  const outputExtension = /^(?:editorial|home|stock)\//.test(relativeBase)
    ? 'avif'
    : 'webp';
  const widths = responsiveWidths.filter((width) => width <= intrinsicWidth);
  if (widths.length === 0) return;

  return widths
    .map(
      (width) =>
        `/images/responsive/${responsiveVersion}/${relativeBase}-${width}.${outputExtension} ${width}w`,
    )
    .join(', ');
}
