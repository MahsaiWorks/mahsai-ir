import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const [source, name, reportDirectory] = process.argv.slice(2);
if (!source || !/^[a-z][a-z0-9-]*$/.test(name ?? '') || !reportDirectory) {
  throw new Error(
    'Usage: node scripts/import-brand-editorial.mjs <generated-image> <asset-name> <review-directory>',
  );
}
const input = await fs.readFile(source);
const metadata = await sharp(input).metadata();
if (!metadata.width || !metadata.height || metadata.width < 1200) {
  throw new Error(
    'Expected a high-resolution generated landscape illustration',
  );
}
const outputDirectory = path.resolve('public/images/brand/editorial');
const responsiveDirectory = path.resolve(
  'public/images/responsive/v1/brand/editorial',
);
await fs.mkdir(outputDirectory, { recursive: true });
await fs.mkdir(responsiveDirectory, { recursive: true });
await fs.mkdir(reportDirectory, { recursive: true });
await fs.copyFile(source, path.join(reportDirectory, `${name}-source.png`));
await sharp(input)
  .webp({ quality: 85, effort: 6 })
  .toFile(path.join(outputDirectory, `${name}.webp`));
for (const width of [240, 320, 480, 720]) {
  await sharp(input)
    .resize({ width })
    .webp({ quality: 83, effort: 6 })
    .toFile(path.join(responsiveDirectory, `${name}-${width}.webp`));
}
const record = {
  name,
  sourcePath: path.resolve(source),
  sourceSha256: crypto.createHash('sha256').update(input).digest('hex'),
  width: metadata.width,
  height: metadata.height,
  src: `/images/brand/editorial/${name}.webp`,
  bytes: (await fs.stat(path.join(outputDirectory, `${name}.webp`))).size,
  generatedWith: 'built-in image_gen',
  cropped: false,
  outputPurpose:
    'Fictional brand illustration; not a product screenshot or real customer photo',
};
await fs.writeFile(
  path.join(reportDirectory, `${name}-asset.json`),
  JSON.stringify(record, null, 2) + '\n',
);
console.log(JSON.stringify(record));
