import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const reviewRoot = path.resolve(process.argv[2] || '');
if (!process.argv[2])
  throw new Error('Pass the existing Android review directory');
const sourceRoot = path.join(reviewRoot, 'bazaar-assets-20260906');
const manifest = JSON.parse(
  await fs.readFile(path.join(sourceRoot, 'market-v4-manifest.json'), 'utf8'),
);
if (!manifest.screenshotsUnedited || manifest.device.ephemeral !== true)
  throw new Error('Capture provenance is not verified');
const names = [
  'workspace',
  'property-details',
  'matching',
  'smart-entry',
  'ad-assistant',
  'visits',
];
const sources = [
  '01-daily-desk',
  '02-property-files',
  '03-smart-matching',
  '04-smart-entry',
  '05-smart-ad',
  '06-visits',
];
const captures = sources.map((source, i) => {
  const row = manifest.rows.find((row) => row.id === source);
  if (!row) throw new Error(`Missing capture ${source}`);
  return {
    name: names[i],
    file: path.join(sourceRoot, 'source-v4', source + '.png'),
    expectedSha: row.screenshot.sha256,
    capturedAt: manifest.at,
    sourceKind: 'app-with-fictional-data',
  };
});
captures.push({
  name: 'subscription',
  file: path.join(
    reviewRoot,
    'android-direct-20260908',
    'release24-yearly.png',
  ),
  sourceKind: 'release-1.6.6-24',
});
const output = path.resolve('public/images/apps/metrazh/current');
const responsive = path.resolve(
  'public/images/responsive/v1/apps/metrazh/current',
);
await fs.mkdir(output, { recursive: true });
await fs.mkdir(responsive, { recursive: true });
const report = [];
for (const capture of captures) {
  const input = await fs.readFile(capture.file);
  const sha = crypto.createHash('sha256').update(input).digest('hex');
  if (capture.expectedSha && sha !== capture.expectedSha)
    throw new Error(`Capture changed: ${capture.name}`);
  const dimensions = await sharp(input).metadata();
  if (dimensions.width !== 1080 || ![2400, 2460].includes(dimensions.height))
    throw new Error('Unexpected capture dimensions');
  await sharp(input)
    .webp({ quality: 93, smartSubsample: true, effort: 6 })
    .toFile(path.join(output, capture.name + '.webp'));
  for (const width of [240, 260, 320, 340, 460, 480, 720])
    await sharp(input)
      .resize({ width })
      .webp({ quality: 90, smartSubsample: true, effort: 6 })
      .toFile(path.join(responsive, `${capture.name}-${width}.webp`));
  report.push({
    name: capture.name,
    sourceSha256: sha,
    width: dimensions.width,
    height: dimensions.height,
    sourceKind: capture.sourceKind,
    capturedAt: capture.capturedAt,
    cropped: false,
    uiRetouched: false,
    webpBytes: (await fs.stat(path.join(output, capture.name + '.webp'))).size,
  });
}
const reportPath = path.join(
  reviewRoot,
  'mahsai-brand-pages-20260909',
  'screenshot-provenance.json',
);
await fs.mkdir(path.dirname(reportPath), { recursive: true });
await fs.writeFile(
  reportPath,
  JSON.stringify(
    { createdAt: new Date().toISOString(), captures: report },
    null,
    2,
  ) + '\n',
);
console.log(
  JSON.stringify({
    captures: report.length,
    sourceHashesVerified: true,
    totalWebpBytes: report.reduce((total, row) => total + row.webpBytes, 0),
  }),
);
