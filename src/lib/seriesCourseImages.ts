const assetRoot = '/assets/ai-series-mobile/';

/** Landing-only derivatives; original URLs remain available to other products. */
export const seriesImage = (
  source: string,
  variant: 'thumb' | 'story' = 'thumb',
): string =>
  source.startsWith(assetRoot) && source.endsWith('.jpg')
    ? `${assetRoot}optimized-r1/${variant}/${source.slice(assetRoot.length, -4)}.webp`
    : source;

export const seriesImageSet = (source: string): string => {
  const storyWidth = /\/scene-(?:closeup|car|driver)\.jpg$/.test(source)
    ? 714
    : 720;
  return `${seriesImage(source)} 384w, ${seriesImage(source, 'story')} ${storyWidth}w`;
};
