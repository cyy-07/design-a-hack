import path from 'path';
import { ASSETS, relAsset } from './paths.js';
import { queriesFor } from './keywords.js';
import { fetchCandidates, isOpenDatasetEnabled } from './sources/index.js';
import { lookupOpenDataset } from './sources/open-dataset.js';
import { pickBest } from './scorer.js';
import { downloadImage } from './download.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * @param {'hero' | 'landmark'} kind
 * @param {object} city
 * @param {object} [landmark]
 * @param {{ force?: boolean, verbose?: boolean }} opts
 */
export async function acquireImage(kind, city, landmark, opts = {}) {
  const queries = queriesFor(kind, city, landmark);
  const destBase =
    kind === 'hero'
      ? path.join(ASSETS, 'cities', city.id, 'hero')
      : path.join(ASSETS, 'landmarks', city.id, landmark.slug);

  let allCandidates = [];

  if (isOpenDatasetEnabled()) {
    const ds = await lookupOpenDataset(kind, city, landmark);
    if (ds.length && opts.verbose) console.log(`    dataset: ${ds.length} manifest hit(s)`);
    allCandidates.push(...ds.map((c) => ({ ...c, query: queries[0] })));
  }

  for (let i = 0; i < queries.slice(0, 3).length; i++) {
    const q = queries[i];
    if (opts.verbose) console.log(`    search: ${q}`);
    const batch = await fetchCandidates(q, {
      perSource: 3,
      delayMs: 1200,
      city,
      landmark,
      kind,
      includeDataset: i === 0 && allCandidates.length === 0,
    });
    allCandidates.push(...batch.map((c) => ({ ...c, query: q })));
    if (allCandidates.length >= 8) break;
    await sleep(1200);
  }

  const best = pickBest(allCandidates, { kind, query: queries[0] });
  if (!best) {
    return { ok: false, reason: 'no_match', queries };
  }

  const sizes =
    kind === 'hero'
      ? { main: { w: 800, h: 500 }, thumb: { w: 200, h: 200 } }
      : { main: { w: 600, h: 400 } };

  const mainPath = await downloadImage(best.url, `${destBase}.jpg`, {
    width: sizes.main.w,
    height: sizes.main.h,
    fit: 'cover',
  });

  let thumbPath = null;
  if (kind === 'hero') {
    thumbPath = await downloadImage(best.url, path.join(ASSETS, 'cities', city.id, 'thumb.jpg'), {
      width: sizes.thumb.w,
      height: sizes.thumb.h,
      fit: 'cover',
    });
  }

  return {
    ok: true,
    heroImage: kind === 'hero' ? relAsset(mainPath) : undefined,
    heroThumb: thumbPath ? relAsset(thumbPath) : undefined,
    image: kind === 'landmark' ? relAsset(mainPath) : undefined,
    source: best.source,
    title: best.title,
    query: best.query,
    score: best.score,
    attribution: best.attribution,
    license: best.license,
    fallback: false,
  };
}
