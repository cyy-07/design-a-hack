import fs from 'fs';
import path from 'path';
import { ensureDir } from './paths.js';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  sharp = null;
}

const UA = 'TerraPulseImagePipeline/1.0';

/**
 * @param {string} url
 * @param {string} destPath
 * @param {{ width: number, height: number, fit?: 'cover' | 'inside' }} resize
 */
export async function downloadImage(url, destPath, resize) {
  ensureDir(path.dirname(destPath));
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Download failed ${res.status} ${url}`);

  const buf = Buffer.from(await res.arrayBuffer());
  let out = buf;

  if (sharp && resize) {
    out = await sharp(buf)
      .resize(resize.width, resize.height, { fit: resize.fit || 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
  } else if (sharp) {
    out = await sharp(buf).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  }

  const ext = '.jpg';
  const finalPath = destPath.replace(/\.(jpg|jpeg|png|webp)$/i, '') + ext;
  fs.writeFileSync(finalPath, out);
  return finalPath;
}
