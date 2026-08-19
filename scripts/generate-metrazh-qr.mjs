import path from 'node:path';
import fs from 'node:fs/promises';
import QRCode from 'qrcode';

const bazaarUrl = 'https://cafebazaar.ir/app/ir.fileryar.amlakyar';
const outputPath = path.resolve('public/images/apps/metrazh/bazaar-qr.png');
const campaignOutputPath = path.resolve(
  'public/images/campaigns/metrazh-instagram-qr.png',
);
await fs.mkdir(path.dirname(campaignOutputPath), { recursive: true });

await QRCode.toFile(outputPath, bazaarUrl, {
  errorCorrectionLevel: 'M',
  margin: 2,
  width: 512,
  color: {
    dark: '#071b33',
    light: '#ffffff',
  },
});

await QRCode.toFile(
  campaignOutputPath,
  'https://mahsai.ir/go/metrazh-instagram/?content=qr',
  {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 1024,
    color: {
      dark: '#071b33',
      light: '#ffffff',
    },
  },
);

console.log(
  `Generated the direct Bazaar QR at ${outputPath} and the Instagram campaign QR at ${campaignOutputPath}.`,
);
