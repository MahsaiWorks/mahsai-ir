import path from 'node:path';
import QRCode from 'qrcode';

const bazaarUrl = 'https://cafebazaar.ir/app/ir.fileryar.amlakyar';
const outputPath = path.resolve('public/images/apps/metrazh/bazaar-qr.png');

await QRCode.toFile(outputPath, bazaarUrl, {
  errorCorrectionLevel: 'M',
  margin: 2,
  width: 512,
  color: {
    dark: '#071b33',
    light: '#ffffff',
  },
});

console.log(`Generated the official Metrazh Bazaar QR at ${outputPath}.`);
