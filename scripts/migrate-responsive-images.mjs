import fs from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve('src');
const componentPath = path.join(
  sourceRoot,
  'components',
  'ResponsiveImage.astro',
);

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(entryPath)));
    else if (entry.name.endsWith('.astro')) files.push(entryPath);
  }
  return files;
}

let changed = 0;
for (const file of await walk(sourceRoot)) {
  if (file === componentPath) continue;
  const source = await fs.readFile(file, 'utf8');
  if (!/<img(?:\s|>)/.test(source)) continue;

  const relativeImport = path
    .relative(path.dirname(file), componentPath)
    .replaceAll('\\', '/')
    .replace(/\.astro$/, '');
  const importPath = relativeImport.startsWith('.')
    ? relativeImport
    : `./${relativeImport}`;
  const importLine = `import ResponsiveImage from '${importPath}.astro';\n`;
  let next = source.replace(/<img(?=\s|>)/g, '<ResponsiveImage');

  if (!next.includes("import ResponsiveImage from '")) {
    const frontmatter = next.indexOf('---');
    if (frontmatter < 0) {
      throw new Error(`Astro frontmatter not found: ${file}`);
    }
    const insertionPoint = next.indexOf('\n', frontmatter) + 1;
    next = `${next.slice(0, insertionPoint)}${importLine}${next.slice(insertionPoint)}`;
  }

  await fs.writeFile(file, next);
  changed += 1;
}

console.log(`Migrated ${changed} Astro files to ResponsiveImage.`);
