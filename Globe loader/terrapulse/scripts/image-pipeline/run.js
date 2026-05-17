#!/usr/bin/env node
import { loadCities } from './lib/load-cities.js';
import { loadCache, saveCache, isCached, markDone } from './lib/cache.js';
import { acquireImage } from './lib/fetch-image.js';
import { isOpenDatasetEnabled } from './lib/sources/index.js';
import { generateAllFallbacks, buildManifest } from './lib/manifest.js';
import fs from 'fs';
import path from 'path';
import { ensureDir, ASSETS } from './lib/paths.js';
import { landmarkSlug } from './lib/slug.js';

const args = process.argv.slice(2);
const cmd = args[0] || 'help';

const flags = {
  city: argValue('--city'),
  limit: parseInt(argValue('--limit') || '0', 10) || 0,
  offset: parseInt(argValue('--offset') || '0', 10) || 0,
  force: args.includes('--force'),
  heroesOnly: args.includes('--heroes-only'),
  landmarksOnly: args.includes('--landmarks-only'),
  verbose: args.includes('--verbose') || args.includes('-v'),
  dryRun: args.includes('--dry-run'),
};

function argValue(name) {
  const eq = args.find((a) => a.startsWith(`${name}=`));
  if (eq) return eq.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
}

function help() {
  console.log(`
TerraPulse image pipeline

  npm run fallbacks          Generate climate SVG placeholders for all cities/landmarks
  npm run fetch [opts]       Fetch hero + landmark photos (Commons + optional APIs + dataset)
  npm run manifest           Rebuild assets/image-manifest.json + image-manifest.js
  node run.js retry-missing  Re-fetch landmarks that still have no .jpg on disk

Options (fetch):
  --city=tokyo               Only one city
  --limit=5                  Stop after N cities
  --offset=10                Skip first N cities (batch runs)
  --heroes-only              Skip landmarks
  --landmarks-only           Skip city heroes
  --force                    Re-download even if cached
  --dry-run                  Print plan only
  -v, --verbose              Log search queries

Env (optional):
  UNSPLASH_ACCESS_KEY        Unsplash API
  PEXELS_API_KEY             Pexels API
  TERRA_USE_OPEN_DATASET=1   Use assets/datasets/terrapulse-images.json (or TERRA_DATASET_*)
  TERRA_DATASET_PATH         Local manifest JSON (default: assets/datasets/terrapulse-images.json)
  TERRA_DATASET_URL          Remote manifest JSON (e.g. hosted copy of Unsplash-Lite extract)
`);
}

async function runFallbacks() {
  ensureDir(ASSETS);
  const cities = loadCities();
  console.log(`Generating fallbacks for ${cities.length} cities…`);
  generateAllFallbacks(cities);
  buildManifest();
  console.log('Done — fallbacks + manifest written.');
}

async function runFetch() {
  ensureDir(ASSETS);
  let cities = loadCities();
  if (flags.city) {
    cities = cities.filter((c) => c.id === flags.city || c.cityName.toLowerCase() === flags.city.toLowerCase());
    if (!cities.length) {
      console.error(`City not found: ${flags.city}`);
      process.exit(1);
    }
  }
  if (flags.offset > 0) cities = cities.slice(flags.offset);
  if (flags.limit > 0) cities = cities.slice(0, flags.limit);

  const cache = loadCache();
  let heroesOk = 0;
  let heroesFail = 0;
  let lmOk = 0;
  let lmFail = 0;

  const sources = ['Commons'];
  if (isOpenDatasetEnabled()) sources.push('open-dataset');
  if (process.env.UNSPLASH_ACCESS_KEY) sources.push('Unsplash');
  if (process.env.PEXELS_API_KEY) sources.push('Pexels');
  console.log(`Fetching images for ${cities.length} cities (${sources.join(' + ')})…`);

  for (const c of cities) {
    console.log(`\n▸ ${c.cityName} (${c.id})`);

    if (!flags.landmarksOnly) {
      const heroKey = c.id;
      if (!flags.force && isCached(cache, heroKey, 'hero')) {
        if (flags.verbose) console.log('  hero: cached');
      } else if (flags.dryRun) {
        console.log('  hero: would fetch');
      } else {
        try {
          const r = await acquireImage('hero', c, null, { verbose: flags.verbose });
          if (r.ok) {
            markDone(cache, heroKey, 'hero', {
              path: r.heroImage,
              source: r.source,
              query: r.query,
              title: r.title,
            });
            heroesOk++;
            console.log(`  hero: ✓ ${r.source} (score ${r.score})`);
          } else {
            heroesFail++;
            console.log('  hero: ✗ no suitable image (fallback on manifest)');
          }
        } catch (e) {
          heroesFail++;
          console.log(`  hero: ✗ ${e.message}`);
        }
        saveCache(cache);
        await sleep(1500);
      }
    }

    if (!flags.heroesOnly) {
      for (const l of c.landmarks || []) {
        const slug = l.slug || landmarkSlug(c.id, l.name);
        const lmKey = `${c.id}/${slug}`;
        if (!flags.force && isCached(cache, lmKey, 'landmark')) {
          if (flags.verbose) console.log(`  ${l.name}: cached`);
          continue;
        }
        if (flags.dryRun) {
          console.log(`  ${l.name}: would fetch`);
          continue;
        }
        try {
          const r = await acquireImage('landmark', c, l, { verbose: flags.verbose });
          if (r.ok) {
            markDone(cache, lmKey, 'landmark', {
              path: r.image,
              source: r.source,
              query: r.query,
              title: r.title,
            });
            lmOk++;
            console.log(`  ${l.name}: ✓ ${r.source}`);
          } else {
            lmFail++;
            console.log(`  ${l.name}: ✗ no match`);
          }
        } catch (e) {
          lmFail++;
          console.log(`  ${l.name}: ✗ ${e.message}`);
        }
        saveCache(cache);
        await sleep(1500);
      }
    }
  }

  buildManifest();
  console.log(`\nSummary — heroes: ${heroesOk} ok / ${heroesFail} miss | landmarks: ${lmOk} ok / ${lmFail} miss`);
  console.log('Manifest updated.');
}

function landmarkJpgPath(cityId, slug) {
  return path.join(ASSETS, 'landmarks', cityId, `${slug}.jpg`);
}

function heroJpgPath(cityId) {
  return path.join(ASSETS, 'cities', cityId, 'hero.jpg');
}

/** Only landmarks (and optional heroes) still missing a real photo file. */
async function runRetryMissing() {
  ensureDir(ASSETS);
  let cities = loadCities();
  if (flags.city) {
    cities = cities.filter((c) => c.id === flags.city || c.cityName.toLowerCase() === flags.city.toLowerCase());
  }
  if (flags.offset > 0) cities = cities.slice(flags.offset);
  if (flags.limit > 0) cities = cities.slice(0, flags.limit);

  const cache = loadCache();
  let lmOk = 0;
  let lmFail = 0;
  let heroesOk = 0;

  for (const c of cities) {
    if (!flags.landmarksOnly && !fs.existsSync(heroJpgPath(c.id))) {
      console.log(`\n▸ ${c.cityName} — hero missing`);
      try {
        const r = await acquireImage('hero', c, null, { verbose: flags.verbose });
        if (r.ok) {
          markDone(cache, c.id, 'hero', { path: r.heroImage, source: r.source, query: r.query });
          heroesOk++;
          console.log(`  hero: ✓`);
        }
      } catch (e) {
        console.log(`  hero: ✗ ${e.message}`);
      }
      saveCache(cache);
      await sleep(1500);
    }

    for (const l of c.landmarks || []) {
      const s = l.slug || landmarkSlug(c.id, l.name);
      if (fs.existsSync(landmarkJpgPath(c.id, s))) continue;
      console.log(`  ${l.name}: retry…`);
      const lmKey = `${c.id}/${s}`;
      try {
        const r = await acquireImage('landmark', c, l, { verbose: flags.verbose });
        if (r.ok) {
          markDone(cache, lmKey, 'landmark', { path: r.image, source: r.source, query: r.query });
          lmOk++;
          console.log(`  ${l.name}: ✓ ${r.source}`);
        } else {
          lmFail++;
          console.log(`  ${l.name}: ✗ no match`);
        }
      } catch (e) {
        lmFail++;
        console.log(`  ${l.name}: ✗ ${e.message}`);
      }
      saveCache(cache);
      await sleep(1800);
    }
  }

  buildManifest();
  console.log(`\nRetry done — heroes: ${heroesOk} | landmarks: ${lmOk} ok / ${lmFail} still missing`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

(async () => {
  switch (cmd) {
    case 'fallbacks':
      await runFallbacks();
      break;
    case 'fetch':
      await runFetch();
      break;
    case 'manifest':
      buildManifest();
      console.log('Manifest rebuilt.');
      break;
    case 'retry-missing':
      await runRetryMissing();
      break;
    case 'help':
    default:
      help();
      if (cmd !== 'help') process.exit(1);
  }
})();
