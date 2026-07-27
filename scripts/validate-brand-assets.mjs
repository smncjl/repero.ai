import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outputDir = path.join(root, 'public/brand/generated');
const expectedPngs = new Map([
  ['favicon-16x16.png', [16, 16]],
  ['favicon-32x32.png', [32, 32]],
  ['apple-touch-icon-180x180.png', [180, 180]],
  ['pwa-icon-192x192.png', [192, 192]],
  ['pwa-icon-512x512.png', [512, 512]],
  ['pwa-icon-maskable-512x512.png', [512, 512]],
  ['notification-badge-96x96.png', [96, 96]]
]);

function readIcoSizes(buffer) {
  if (buffer.readUInt16LE(0) !== 0 || buffer.readUInt16LE(2) !== 1) {
    throw new Error('favicon.ico is not a valid ICO file');
  }
  const count = buffer.readUInt16LE(4);
  const sizes = [];
  for (let i = 0; i < count; i += 1) {
    const offset = 6 + i * 16;
    const width = buffer.readUInt8(offset) || 256;
    const height = buffer.readUInt8(offset + 1) || 256;
    sizes.push(`${width}x${height}`);
  }
  return sizes;
}

for (const [file, [width, height]] of expectedPngs) {
  const metadata = await sharp(path.join(outputDir, file)).metadata();
  if (metadata.width !== width || metadata.height !== height || metadata.format !== 'png') {
    throw new Error(`${file}: expected PNG ${width}x${height}, got ${metadata.format} ${metadata.width}x${metadata.height}`);
  }
  console.log(`OK ${file}: ${metadata.width}x${metadata.height}`);
}

const icoBuffer = await readFile(path.join(outputDir, 'favicon.ico'));
const icoSizes = readIcoSizes(icoBuffer).sort();
const expectedIcoSizes = ['16x16', '32x32'];
if (JSON.stringify(icoSizes) !== JSON.stringify(expectedIcoSizes)) {
  throw new Error(`favicon.ico: expected ${expectedIcoSizes.join(', ')}, got ${icoSizes.join(', ')}`);
}
console.log(`OK favicon.ico: ${icoSizes.join(', ')}`);
