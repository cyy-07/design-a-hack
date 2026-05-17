import fs from 'fs';
import vm from 'vm';
import { ROOT } from './paths.js';
import { slugify, landmarkSlug } from './slug.js';

export function loadCities() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(`${ROOT}/data.js`, 'utf8'), context);
  vm.runInContext(fs.readFileSync(`${ROOT}/cities-extra.js`, 'utf8'), context);
  const cities = context.window.TERRA_CITIES;
  for (const c of cities) {
    for (const l of c.landmarks || []) {
      l.slug = landmarkSlug(c.id, l.name);
    }
  }
  return cities;
}

export function climateFor(city) {
  const sig = `${city.region || ''} ${city.weather?.condition || ''} ${city.countryName || ''} ${city.cityName || ''}`.toLowerCase();
  if (/coast|caribbean|atlantic|pacific|mediterr|aegean|indian ocean|island|bay|gulf|baltic|nordic|fjord|cape|sydney|lisbon|reykjav|copenhagen|barcelona|stockholm|oslo|tel aviv|honolulu/.test(sig)) return 'coastal';
  if (/tropic|southeast|equator|amazon|subtropical|monsoon|humid subtrop|bali|phuket|maldiv|tahiti|fiji|bangkok|singapore|miami|cancun/.test(sig)) return 'tropical';
  if (/mount|highland|andean|alp|hill|stone|canyon|valley|cusco|katmandu|nepal|tibet|denver|aspen|queenstown|kigali|addis/.test(sig)) return 'mountain';
  if (/desert|sahara|north africa|west africa|middle east|savannah|arabia|dry|marrakech|cairo|dubai|petra|livingstone|tucson|santa fe|austin/.test(sig)) return 'warm';
  const lat = city.coordinates?.[0];
  if (typeof lat === 'number' && Math.abs(lat) < 23.5) return 'tropical';
  return 'urban';
}

export { slugify, landmarkSlug };
