// Regenerates the web-sized images in public/images/web from the originals.
// Run after adding or replacing a source image: `npm run images`.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-source';
const OUT = 'public/images/web';

const jobs = [
  { src: 'ab-logo-white-transparent.png', out: 'logo-dark.webp', width: 256, alpha: true },
  { src: 'ab-logo-black-transparent.png', out: 'logo-light.webp', width: 256, alpha: true },
  { src: 'The Get Back - Cover 1.jpeg', out: 'the-get-back.webp', width: 640 },
  { src: 'abafana_youtube_banner_mobilesafe_2560x1440.png', out: 'podcast-banner.webp', width: 1600 },
  { src: 'abafana_youtube_banner_mobilesafe_2560x1440.png', out: 'podcast-banner-sm.webp', width: 800 },
  ...['king-fergo', 'structure', 'sab', 'assign'].flatMap(slug => {
    const ext = slug === 'sab' ? 'jpg' : 'JPG';
    const src = `artists/${slug}-ab-profile-photo.${ext}`;
    return [
      { src, out: `artists/${slug}.webp`, width: 720, square: true },
      { src, out: `artists/${slug}-sm.webp`, width: 360, square: true },
    ];
  }),
];

const ICON_SRC = path.join(SRC, '64058f4f-59c0-4ddb-8649-b082d04a4149.jpg');

const icons = [
  { out: 'favicon-32.png', size: 32 },
  { out: 'apple-touch-icon.png', size: 180 },
  { out: 'icon-192.png', size: 192 },
  { out: 'icon-512.png', size: 512 },
];

await mkdir(path.join(OUT, 'artists'), { recursive: true });

for (const { src, out, width, square, alpha } of jobs) {
  await sharp(path.join(SRC, src))
    .rotate()
    .resize(square ? { width, height: width, fit: 'cover', position: 'attention' } : { width, withoutEnlargement: true })
    // Logos keep their transparency; quality must stay high or edges band.
    .webp(alpha ? { quality: 90, alphaQuality: 100 } : { quality: 78 })
    .toFile(path.join(OUT, out));
}

// Black-on-white logo reads best at small sizes and on both browser themes.
for (const { out, size } of icons) {
  await sharp(ICON_SRC)
    .resize(size, size)
    .png()
    .toFile(path.join(OUT, out));
}

// Google Search only shows a favicon that is square and a multiple of 48px,
// and falls back to /favicon.ico, so ship one there with a 48px frame.
const icoSizes = [16, 32, 48];
const frames = await Promise.all(icoSizes.map((size) => sharp(ICON_SRC).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((png, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(icoSizes[i], entry);
  header.writeUInt8(icoSizes[i], entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...frames]));

// 1200x630 is the size WhatsApp, Facebook and X all crop link previews to.
await sharp(path.join(SRC, 'fb9a3bbb-3559-4926-8317-7e59d5913691.jpg'))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, 'og-image.jpg'));

console.log(`Wrote ${jobs.length + icons.length + 1} images to ${OUT}, plus public/favicon.ico`);
