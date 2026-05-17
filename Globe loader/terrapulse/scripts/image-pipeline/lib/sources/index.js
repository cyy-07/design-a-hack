import { searchCommons } from './commons.js';
import { searchOpenDataset, isOpenDatasetEnabled } from './open-dataset.js';
import { searchPexels } from './pexels.js';
import { searchUnsplash } from './unsplash.js';

export { isOpenDatasetEnabled } from './open-dataset.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Fetch candidates from all configured sources (Commons always; APIs if keys set).
 * @param {string} query
 * @param {{ perSource?: number, delayMs?: number, city?: object, landmark?: object, kind?: 'hero'|'landmark', includeDataset?: boolean }} opts
 */
export async function fetchCandidates(query, opts = {}) {
  const perSource = opts.perSource ?? 4;
  const delayMs = opts.delayMs ?? 1200;
  const all = [];

  if (opts.includeDataset !== false && isOpenDatasetEnabled()) {
    const ds = await searchOpenDataset(query, {
      kind: opts.kind,
      city: opts.city,
      landmark: opts.landmark,
    });
    all.push(...ds);
  }

  const commons = await searchCommons(query, perSource);
  all.push(...commons);
  await sleep(delayMs);

  if (process.env.UNSPLASH_ACCESS_KEY) {
    all.push(...(await searchUnsplash(query, perSource)));
    await sleep(delayMs);
  }

  if (process.env.PEXELS_API_KEY) {
    all.push(...(await searchPexels(query, perSource)));
  }

  return all;
}
