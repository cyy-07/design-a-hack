import fs from 'fs';
import path from 'path';
import { CACHE_DIR, CACHE_FILE, ROOT, ensureDir } from './paths.js';

function resolvePath(p) {
  if (!p) return null;
  return path.isAbsolute(p) ? p : path.join(ROOT, p.replace(/\//g, path.sep));
}

export function loadCache() {
  ensureDir(CACHE_DIR);
  if (!fs.existsSync(CACHE_FILE)) return { heroes: {}, landmarks: {} };
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch {
    return { heroes: {}, landmarks: {} };
  }
}

export function saveCache(cache) {
  ensureDir(CACHE_DIR);
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

export function isCached(cache, key, kind) {
  const bucket = kind === 'hero' ? cache.heroes : cache.landmarks;
  const entry = bucket[key];
  const fp = resolvePath(entry?.path);
  return entry?.status === 'done' && fp && fs.existsSync(fp);
}

export function markDone(cache, key, kind, meta) {
  const bucket = kind === 'hero' ? cache.heroes : cache.landmarks;
  bucket[key] = { status: 'done', ...meta, at: new Date().toISOString() };
}
