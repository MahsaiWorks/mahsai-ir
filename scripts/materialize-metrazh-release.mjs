import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const digest = (data) => createHash('sha256').update(data).digest('hex');
const releases = [
  {
    directory: '1.6.6-24',
    filename: 'metrazh-1.6.6-24.apk',
    bytes: 17793381,
    sha256: '87960d4840e10c8e960540ad7f1e0316d226fa7487e04a22397ddfc130c295dd',
  },
  {
    directory: '1.6.7-25',
    filename: 'metrazh-1.6.7-25.apk',
    bytes: 16733943,
    sha256: '64721ca9a8f890c8e36cf5adce70ea717940ded903e81ecd5c8f22541401697c',
  },
];

for (const release of releases) {
  const releaseDir = path.join(root, 'releases', 'metrazh', release.directory);
  const manifest = JSON.parse(
    await readFile(path.join(releaseDir, 'manifest.json'), 'utf8'),
  );
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.filename, release.filename);
  assert.equal(manifest.bytes, release.bytes);
  assert.equal(manifest.sha256, release.sha256);
  assert.ok(
    Array.isArray(manifest.parts) &&
      manifest.parts.length > 0 &&
      manifest.parts.length <= 32,
  );
  const parts = [];
  const names = new Set();
  for (const part of manifest.parts) {
    assert.match(part.name, /^part-\d{2}\.bin$/);
    assert.ok(!names.has(part.name), 'Duplicate release part');
    names.add(part.name);
    assert.ok(Number.isSafeInteger(part.bytes) && part.bytes > 0);
    assert.match(part.sha256, /^[0-9a-f]{64}$/);
    const bytes = await readFile(path.join(releaseDir, part.name));
    assert.equal(
      bytes.length,
      part.bytes,
      `Release part length mismatch: ${part.name}`,
    );
    assert.equal(
      digest(bytes),
      part.sha256,
      `Release part checksum mismatch: ${part.name}`,
    );
    parts.push(bytes);
  }
  const apk = Buffer.concat(parts);
  assert.equal(apk.length, manifest.bytes, 'APK length mismatch');
  assert.equal(
    digest(apk),
    manifest.sha256,
    'APK differs from the device-tested signed release',
  );
  const downloads = path.join(root, 'public', 'downloads');
  await mkdir(downloads, { recursive: true });
  const checksumFile = await readFile(
    path.join(downloads, manifest.filename + '.sha256'),
    'utf8',
  );
  assert.equal(checksumFile.trim(), `${manifest.sha256}  ${manifest.filename}`);
  const destination = path.join(downloads, manifest.filename);
  try {
    const existing = await readFile(destination);
    assert.equal(
      digest(existing),
      manifest.sha256,
      'Refusing to overwrite an existing different APK',
    );
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await writeFile(destination, apk, { flag: 'wx' });
  }
  console.log(
    `Metrazh ${manifest.filename}: ${manifest.bytes} bytes; all ${parts.length} parts and the signed APK checksum verified.`,
  );
}
