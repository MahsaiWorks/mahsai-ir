import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDirectory = path.resolve('public/images/apps/metrazh/bazaar');

const sourceFiles = (await readdir(sourceDirectory)).filter((entry) =>
  entry.endsWith('.jpg'),
);

for (const sourceFile of sourceFiles) {
  const sourcePath = path.join(sourceDirectory, sourceFile);
  const outputPath = path.join(
    sourceDirectory,
    sourceFile.replace('.jpg', '.webp'),
  );

  await sharp(sourcePath)
    .webp({ quality: 86, smartSubsample: true })
    .toFile(outputPath);
}

console.log(`Optimized ${sourceFiles.length} official Metrazh images.`);
