const fs = require('node:fs');

const chromeCandidates =
  process.platform === 'win32'
    ? [
        process.env.CHROME_PATH,
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      ]
    : [
        process.env.CHROME_PATH,
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium',
      ];
const chromePath = chromeCandidates.find(
  (candidate) => candidate && fs.existsSync(candidate),
);

module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        'http://localhost/',
        'http://localhost/apps/metrazh/',
        'http://localhost/tools/',
        'http://localhost/real-estate-software/',
        'http://localhost/articles/complete-property-file/',
      ],
      numberOfRuns: 3,
      chromePath,
      settings: {
        chromeFlags: '--headless=new --no-sandbox --disable-gpu',
        maxWaitForLoad: 90000,
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'uses-responsive-images': ['error', { maxLength: 0 }],
        'uses-optimized-images': ['error', { maxLength: 0 }],
        'resource-summary:document:size': ['error', { maxNumericValue: 65000 }],
        'resource-summary:stylesheet:size': [
          'error',
          { maxNumericValue: 120000 },
        ],
        'resource-summary:script:size': ['error', { maxNumericValue: 80000 }],
        'resource-summary:font:size': ['error', { maxNumericValue: 250000 }],
        'resource-summary:image:size': ['error', { maxNumericValue: 900000 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 1300000 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './outputs/lighthouse',
    },
  },
};
