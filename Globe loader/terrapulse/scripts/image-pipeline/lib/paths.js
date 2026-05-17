import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const ROOT = path.resolve(__dirname, '../../..');
export const ASSETS = path.join(ROOT, 'assets', 'images');
export const CACHE_DIR = path.join(ROOT, '.cache', 'image-pipeline');
export const CACHE_FILE = path.join(CACHE_DIR, 'state.json');
export const MANIFEST_JSON = path.join(ROOT, 'assets', 'image-manifest.json');
export const MANIFEST_JS = path.join(ROOT, 'assets', 'image-manifest.js');
export const OVERRIDES_JSON = path.join(ROOT, 'assets', 'image-overrides.json');
export const DATASETS_DIR = path.join(ROOT, 'assets', 'datasets');
export const DEFAULT_DATASET_MANIFEST = path.join(DATASETS_DIR, 'terrapulse-images.json');

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function relAsset(absPath) {
  return path.relative(ROOT, absPath).split(path.sep).join('/');
}
