import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imageRoot = path.resolve('public/images');
const responsiveRoot = path.join(imageRoot, 'responsive');
const outputRoot = path.join(responsiveRoot, 'v1');
const widths = [240, 320, 480, 720];
const rasterPattern = /\.(?:png|jpe?g|webp|avif)$/i;

if (path.relative(imageRoot, responsiveRoot) !== 'responsive') {
  throw new Error(
    `Refusing to clear unexpected output path: ${responsiveRoot}`,
  );
}
await fs.rm(responsiveRoot, { recursive: true, force: true });

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'responsive') continue;
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(entryPath)));
    else if (rasterPattern.test(entry.name)) files.push(entryPath);
  }
  return files;
}

const sourceFiles = await walk(imageRoot);
let webpCount = 0;
let avifCount = 0;

for (const sourcePath of sourceFiles) {
  const extension = path.extname(sourcePath);
  const relativePath = path.relative(imageRoot, sourcePath);
  if (relativePath.replaceAll('\\', '/') === 'stores/cafebazaar-icon-48.webp') {
    continue;
  }
  const relativeBase = relativePath.slice(0, -extension.length);

  if (/\.jpe?g$/i.test(extension)) {
    const webpSibling = path.join(
      path.dirname(sourcePath),
      `${path.basename(sourcePath, extension)}.webp`,
    );
    try {
      await fs.access(webpSibling);
      continue;
    } catch {
      // The JPEG is the only source and must be processed.
    }
  }

  const metadata = await sharp(sourcePath).metadata();
  if (!metadata.width) continue;
  const targetWidths = widths.filter((width) => width <= metadata.width);
  if (targetWidths.length === 0) continue;

  const outputDirectory = path.join(outputRoot, path.dirname(relativeBase));
  await fs.mkdir(outputDirectory, { recursive: true });
  const isPhoto = /^(?:editorial|home|stock)[\\/]/i.test(relativeBase);

  for (const width of targetWidths) {
    const baseOutput = path.join(
      outputDirectory,
      `${path.basename(relativeBase)}-${width}`,
    );
    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, smartSubsample: true })
      .toFile(`${baseOutput}.webp`);
    webpCount += 1;

    if (isPhoto) {
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 58, effort: 5 })
        .toFile(`${baseOutput}.avif`);
      avifCount += 1;
    }
  }
}

for (const socialImage of [
  ['source-assets/social-originals/og.png', 'public/og.jpg'],
  [
    'source-assets/social-originals/og-metrazh-display-v1.png',
    'public/og-metrazh-display-v1.jpg',
  ],
]) {
  await sharp(path.resolve(socialImage[0]))
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(path.resolve(socialImage[1]));
}

await sharp(path.join(imageRoot, 'stores/cafebazaar-icon.png'))
  .resize({ width: 48, height: 48, fit: 'contain' })
  .webp({ quality: 88, lossless: true })
  .toFile(path.join(imageRoot, 'stores/cafebazaar-icon-48.webp'));

console.log(
  `Generated ${webpCount} responsive WebP files, ${avifCount} AVIF photo files, 2 optimized social cards, and 1 compact store icon.`,
);
