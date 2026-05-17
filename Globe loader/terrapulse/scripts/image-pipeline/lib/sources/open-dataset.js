/**
 * Optional bulk image manifest (local file or remote URL).
 *
 * Compatible upstream sources (convert to terrapulse-images.json yourself):
 *   - unsplash/datasets Lite photos.csv — photo_location_city + ai_primary_landmark_name
 *     (Lite: commercial OK; Full dataset: non-commercial only)
 *   - cvdfoundation/google-landmark train.csv — url + landmark_id (map ids to city/landmark slugs)
 *   - Wikidata/Commons extracts (e.g. HuggingFace vel_commons_wikidata, en_wikidata_5M_entities)
 *     — verify per-image license on Commons (often CC-BY-SA)
 *   - Custom JSON/CSV you maintain under assets/datasets/
 *
 * Enable:
 *   TERRA_USE_OPEN_DATASET=1
 *   and/or drop assets/datasets/terrapulse-images.json
 *   and/or TERRA_DATASET_PATH=/path/to/manifest.json
 *   and/or TERRA_DATASET_URL=https://…/terrapulse-images.json
 *
 * Disable auto-detect: TERRA_USE_OPEN_DATASET=0
 *
 * Manifest license field is copied into candidate.license; you are responsible for compliance.
 */
import fs from 'fs';
import path from 'path';
import { DATASETS_DIR, DEFAULT_DATASET_MANIFEST } from '../paths.js';
import { slugify } from '../slug.js';

const MANIFEST_NAMES = ['terrapulse-images.json', 'cities-images.json', 'dataset.json'];

let manifestPromise = null;
let manifestCache = null;

function truthy(v) {
  return v === '1' || v === 'true' || v === 'yes';
}

function falsy(v) {
  return v === '0' || v === 'false' || v === 'no';
}

export function isOpenDatasetEnabled() {
  if (falsy(process.env.TERRA_USE_OPEN_DATASET)) return false;
  if (truthy(process.env.TERRA_USE_OPEN_DATASET)) return true;
  if (process.env.TERRA_DATASET_URL) return true;
  if (process.env.TERRA_DATASET_PATH) return true;
  if (fs.existsSync(DEFAULT_DATASET_MANIFEST)) return true;
  if (fs.existsSync(DATASETS_DIR)) {
    return MANIFEST_NAMES.some((n) => fs.existsSync(path.join(DATASETS_DIR, n)));
  }
  return false;
}

function resolveManifestPath() {
  if (process.env.TERRA_DATASET_PATH) return process.env.TERRA_DATASET_PATH;
  if (fs.existsSync(DEFAULT_DATASET_MANIFEST)) return DEFAULT_DATASET_MANIFEST;
  for (const n of MANIFEST_NAMES) {
    const p = path.join(DATASETS_DIR, n);
    if (fs.existsSync(p)) return p;
  }
  return DEFAULT_DATASET_MANIFEST;
}

async function loadManifest() {
  if (manifestCache) return manifestCache;
  if (manifestPromise) return manifestPromise;

  manifestPromise = (async () => {
    let raw;
    const url = process.env.TERRA_DATASET_URL;
    if (url) {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'TerraPulseImagePipeline/1.0 (open-dataset manifest)' },
      });
      if (!res.ok) throw new Error(`TERRA_DATASET_URL fetch failed: ${res.status}`);
      raw = await res.text();
    } else {
      const filePath = resolveManifestPath();
      if (!fs.existsSync(filePath)) {
        manifestCache = null;
        return null;
      }
      raw = fs.readFileSync(filePath, 'utf8');
    }
    const data = JSON.parse(raw);
    manifestCache = normalizeManifest(data);
    return manifestCache;
  })();

  try {
    return await manifestPromise;
  } catch (e) {
    manifestPromise = null;
    throw e;
  }
}

function normalizeManifest(data) {
  const license = data.license || data.meta?.license || 'See manifest';
  const attribution = data.attribution || data.meta?.attribution || data.source || 'open-dataset';
  const sourceTag = data.source || data.meta?.name || 'open-dataset';

  const byCityId = new Map();
  const aliases = new Map();

  if (data.cities && typeof data.cities === 'object') {
    for (const [key, entry] of Object.entries(data.cities)) {
      const id = slugify(key);
      byCityId.set(id, entry);
      aliases.set(slugify(key), id);
      if (entry.cityName) aliases.set(slugify(entry.cityName), id);
      if (entry.cityId) aliases.set(slugify(entry.cityId), id);
    }
  }

  if (Array.isArray(data.aliases)) {
    for (const [alias, id] of data.aliases) {
      aliases.set(slugify(alias), slugify(id));
    }
  } else if (data.aliases && typeof data.aliases === 'object') {
    for (const [alias, id] of Object.entries(data.aliases)) {
      aliases.set(slugify(alias), slugify(id));
    }
  }

  const entries = [];
  if (Array.isArray(data.entries)) {
    for (const e of data.entries) {
      entries.push({
        cityId: slugify(e.cityId || e.city || ''),
        landmarkSlug: e.landmarkSlug ? slugify(e.landmarkSlug) : e.landmark ? slugify(e.landmark) : null,
        kind: e.kind === 'landmark' ? 'landmark' : 'hero',
        ...pickImageFields(e),
      });
    }
  }

  return { license, attribution, sourceTag, byCityId, aliases, entries };
}

function pickImageFields(obj) {
  const url = obj.url || obj.image_url || obj.photo_image_url || obj.photo_url;
  return {
    url,
    title: obj.title || obj.name || obj.photo_description || obj.description || '',
    width: obj.width || obj.photo_width || 1600,
    height: obj.height || obj.photo_height || 1000,
    mime: obj.mime || 'image/jpeg',
    description: obj.description || '',
  };
}

function resolveCityId(manifest, city) {
  const candidates = [city.id, city.cityName, city.countryName && `${city.cityName}-${city.countryName}`]
    .filter(Boolean)
    .map(slugify);
  for (const c of candidates) {
    if (manifest.byCityId.has(c)) return c;
    if (manifest.aliases.has(c)) return manifest.aliases.get(c);
  }
  return null;
}

function toCandidate(fields, manifest, extra = {}) {
  if (!fields?.url) return null;
  return {
    source: manifest.sourceTag,
    title: fields.title || extra.title || '',
    description: fields.description || '',
    url: fields.url,
    width: fields.width || 1600,
    height: fields.height || 1000,
    mime: fields.mime || 'image/jpeg',
    attribution: manifest.attribution,
    license: manifest.license,
    dataset: true,
    ...extra,
  };
}

function landmarkKeys(landmark) {
  const keys = new Set();
  if (landmark.slug) keys.add(slugify(landmark.slug));
  keys.add(slugify(landmark.name));
  const core = landmark.name.replace(/\s+at\s+.*/i, '').replace(/,\s*.*$/, '');
  keys.add(slugify(core));
  return keys;
}

/**
 * Direct lookup by Terra city id + optional landmark (no search API).
 * @param {'hero' | 'landmark'} kind
 * @param {object} city
 * @param {object} [landmark]
 * @returns {Promise<object[]>}
 */
export async function lookupOpenDataset(kind, city, landmark) {
  if (!isOpenDatasetEnabled()) return [];
  const manifest = await loadManifest();
  if (!manifest) return [];

  const cityId = resolveCityId(manifest, city);
  const out = [];

  if (cityId) {
    const entry = manifest.byCityId.get(cityId);
    if (entry) {
      if (kind === 'hero' && entry.hero) {
        const c = toCandidate(pickImageFields(entry.hero), manifest, { title: entry.hero.title || `${city.cityName} skyline` });
        if (c) out.push(c);
      }
      if (kind === 'landmark' && landmark && entry.landmarks) {
        const lmMap = entry.landmarks;
        for (const key of landmarkKeys(landmark)) {
          const hit = lmMap[key] || lmMap[landmark.slug] || lmMap[slugify(landmark.name)];
          if (hit) {
            const c = toCandidate(pickImageFields(hit), manifest, { title: hit.title || landmark.name });
            if (c) out.push(c);
            break;
          }
        }
      }
    }
  }

  const wantSlug = kind === 'landmark' && landmark ? slugify(landmark.slug || landmark.name) : null;
  for (const e of manifest.entries) {
    if (e.kind !== kind) continue;
    if (slugify(city.id) !== e.cityId && resolveCityId(manifest, city) !== e.cityId) continue;
    if (kind === 'landmark' && wantSlug && e.landmarkSlug && e.landmarkSlug !== wantSlug) {
      if (!landmarkKeys(landmark).has(e.landmarkSlug)) continue;
    }
    const c = toCandidate(e, manifest);
    if (c) out.push(c);
  }

  return out;
}

/**
 * @param {string} query
 * @param {object} [ctx] — { kind, city, landmark }
 */
export async function searchOpenDataset(query, ctx = {}) {
  if (!isOpenDatasetEnabled()) return [];
  const direct = ctx.city ? await lookupOpenDataset(ctx.kind || (ctx.landmark ? 'landmark' : 'hero'), ctx.city, ctx.landmark) : [];
  if (direct.length) return direct;

  const manifest = await loadManifest();
  if (!manifest) return [];

  const q = query.toLowerCase();
  const out = [];
  for (const [cityKey, entry] of manifest.byCityId) {
    const name = (entry.cityName || cityKey).toLowerCase();
    if (!q.includes(name) && !name.split(/\s+/).some((w) => w.length > 3 && q.includes(w))) continue;
    if (ctx.kind !== 'landmark' && entry.hero) {
      const c = toCandidate(pickImageFields(entry.hero), manifest);
      if (c) out.push(c);
    }
    if (entry.landmarks) {
      for (const [lmKey, img] of Object.entries(entry.landmarks)) {
        if (q.includes(lmKey.replace(/-/g, ' ')) || q.includes(String(img.title || '').toLowerCase())) {
          const c = toCandidate(pickImageFields(img), manifest);
          if (c) out.push(c);
        }
      }
    }
  }
  return out.slice(0, 4);
}
