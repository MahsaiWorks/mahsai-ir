import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  approvedBrandBiography,
  approvedBrandDescription,
  hasUnapprovedPublicAiCopy,
} from './audit-public-ai-policy.mjs';

const route = 'apps/metrazh/index.html';
const actualMetrazh = fs.readFileSync(
  new URL('../dist/apps/metrazh/index.html', import.meta.url),
  'utf8',
);
const feature = '<p>متراژ با هوش مصنوعی قیمت ملک را محاسبه می‌کند.</p>';
const jsonLd = (node) =>
  `<script type="application/ld+json">${JSON.stringify(node)}</script>`;
const checks = [];
function check(name, html, expected, file = route) {
  assert.equal(hasUnapprovedPublicAiCopy(file, html), expected, name);
  checks.push(name);
}

check(
  'Actual Metrazh page accepts only its shared approved Academy identity',
  actualMetrazh,
  false,
);
check(
  'Injected AI product feature in actual Metrazh main is rejected',
  actualMetrazh.replace('</main>', `${feature}</main>`),
  true,
);
check(
  'Shared footer is exempt but an AI feature outside it is rejected',
  `${actualMetrazh}${feature}`,
  true,
);
check(
  'Ordinary footer cannot hide an unapproved AI feature',
  `<footer>${feature}</footer>`,
  true,
);
check(
  'Footer with a lookalike class cannot hide an AI feature',
  `<footer class="mahsai-footer-product">${feature}</footer>`,
  true,
);
check(
  'Exact approved Organization biography is accepted',
  jsonLd({ '@type': 'Organization', description: approvedBrandBiography }),
  false,
);
check(
  'Changed Organization claim is rejected',
  jsonLd({
    '@type': 'Organization',
    description: `${approvedBrandBiography} متراژ با هوش مصنوعی کار می‌کند.`,
  }),
  true,
);
check(
  'Exact approved WebSite description is accepted',
  jsonLd({ '@type': 'WebSite', description: approvedBrandDescription }),
  false,
);
check(
  'SoftwareApplication AI feature is rejected',
  jsonLd({
    '@type': 'SoftwareApplication',
    description: 'متراژ با هوش مصنوعی قیمت ملک را محاسبه می‌کند.',
  }),
  true,
);
check(
  'Combined Organization and software types cannot inherit the exemption',
  jsonLd({
    '@type': ['Organization', 'SoftwareApplication'],
    description: approvedBrandBiography,
  }),
  true,
);
check(
  'Exact approved brand metadata is accepted',
  `<meta name="description" content="${approvedBrandDescription}">`,
  false,
);
check(
  'AI product claim in metadata is rejected',
  '<meta name="description" content="قیمت‌گذاری ملک با هوش مصنوعی در متراژ">',
  true,
);
check(
  'New Academy introduction on home is accepted',
  `<p>${approvedBrandDescription}</p>`,
  false,
  'index.html',
);
check(
  'Education claim elsewhere still requires a reviewed route',
  `<p>${approvedBrandDescription}</p>`,
  true,
  'guides/index.html',
);

console.log(
  JSON.stringify(
    { policyTests: checks.length, passed: checks.length, checks },
    null,
    2,
  ),
);
