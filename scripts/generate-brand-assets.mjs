import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceSvg = path.join(root, 'public/brand/repero-icon.svg');
const outputDir = path.join(root, 'public/brand/generated');
const background = '#050A1C';
const maskableSafeZoneRatio = 0.8;

const outputs = [
  { file: 'favicon-16x16.png', width: 16, height: 16 },
  { file: 'favicon-32x32.png', width: 32, height: 32 },
  { file: 'apple-touch-icon-180x180.png', width: 180, height: 180 },
  { file: 'pwa-icon-192x192.png', width: 192, height: 192 },
  { file: 'pwa-icon-512x512.png', width: 512, height: 512 },
  { file: 'notification-badge-96x96.png', width: 96, height: 96 }
];

async function renderPng(svgBuffer, { file, width, height }) {
  const buffer = await sharp(svgBuffer)
    .resize(width, height, { fit: 'contain' })
    .png()
    .toBuffer();
  await writeFile(path.join(outputDir, file), buffer);
  return buffer;
}

async function renderMaskable(svgBuffer) {
  const size = 512;
  const iconSize = Math.round(size * maskableSafeZoneRatio);
  const icon = await sharp(svgBuffer)
    .resize(iconSize, iconSize, { fit: 'contain' })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background
    }
  })
    .composite([{ input: icon, gravity: 'center' }])
    .png()
    .toFile(path.join(outputDir, 'pwa-icon-maskable-512x512.png'));
}

function createIco(entries) {
  const headerSize = 6;
  const directorySize = entries.length * 16;
  let offset = headerSize + directorySize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const directories = [];
  for (const entry of entries) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(entry.width >= 256 ? 0 : entry.width, 0);
    dir.writeUInt8(entry.height >= 256 ? 0 : entry.height, 1);
    dir.writeUInt8(0, 2);
    dir.writeUInt8(0, 3);
    dir.writeUInt16LE(1, 4);
    dir.writeUInt16LE(32, 6);
    dir.writeUInt32LE(entry.buffer.length, 8);
    dir.writeUInt32LE(offset, 12);
    directories.push(dir);
    offset += entry.buffer.length;
  }

  return Buffer.concat([header, ...directories, ...entries.map((entry) => entry.buffer)]);
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
const svgBuffer = await readFile(sourceSvg);
const rendered = new Map();

for (const output of outputs) {
  rendered.set(output.file, await renderPng(svgBuffer, output));
}
await renderMaskable(svgBuffer);

const ico = createIco([
  { width: 16, height: 16, buffer: rendered.get('favicon-16x16.png') },
  { width: 32, height: 32, buffer: rendered.get('favicon-32x32.png') }
]);
await writeFile(path.join(outputDir, 'favicon.ico'), ico);

console.log(`Generated ${outputs.length + 2} brand assets in ${path.relative(root, outputDir)}`);
