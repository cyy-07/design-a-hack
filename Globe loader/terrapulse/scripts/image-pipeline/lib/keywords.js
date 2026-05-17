/** @typedef {'hero' | 'landmark'} ImageKind */

const HERO_HINTS = [
  'city skyline panorama',
  'cityscape travel',
  'aerial city view',
  'downtown panorama',
  'city at golden hour',
];

const LANDMARK_HINTS = [
  'landmark exterior',
  'travel photography',
  'iconic view',
  'architecture',
];

function cleanLandmarkName(name) {
  return name
    .replace(/\s+at\s+(dusk|sunrise|sunset|night|low tide|golden hour)/gi, '')
    .replace(/,\s*.*$/, '')
    .replace(/\s*\(.*\)\s*/g, '')
    .trim();
}

/**
 * @param {{ cityName: string, countryName: string, region?: string }} city
 */
export function heroQueries(city) {
  const { cityName, countryName, region } = city;
  return [
    `${cityName} skyline panorama`,
    `${cityName} ${countryName} cityscape travel`,
    `${cityName} aerial view`,
    `${cityName} downtown ${HERO_HINTS[0]}`,
    region ? `${cityName} ${region} travel city` : `${cityName} travel destination`,
  ].map((q) => q.replace(/\s+/g, ' ').trim());
}

/**
 * @param {{ name: string, category?: string }} landmark
 * @param {{ cityName: string, countryName: string }} city
 */
export function landmarkQueries(landmark, city) {
  const core = cleanLandmarkName(landmark.name);
  const cat = landmark.category ? ` ${landmark.category}` : '';
  return [
    `${core} ${city.cityName}`,
    `${core} ${city.cityName} ${city.countryName}`,
    `${core} ${LANDMARK_HINTS[0]}`,
    `${landmark.name} ${city.cityName} travel`,
    `${core}${cat} ${city.countryName}`,
  ].map((q) => q.replace(/\s+/g, ' ').trim());
}

export function queriesFor(kind, city, landmark) {
  return kind === 'hero' ? heroQueries(city) : landmarkQueries(landmark, city);
}
