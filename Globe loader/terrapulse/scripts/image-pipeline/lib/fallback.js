import fs from 'fs';
import path from 'path';
import { ASSETS, ensureDir, relAsset } from './paths.js';
import { climateFor } from './load-cities.js';
import { CLIMATE_PALETTES } from './climate-palettes.js';

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hashText(text) {
  let h = 2166136261;
  for (const ch of String(text)) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick(seed, min, max) {
  return min + (seed % 1000) / 1000 * (max - min);
}

/**
 * @param {{ width: number, height: number, label: string, sublabel?: string, climate: string }} opts
 */
export function buildFallbackSvg({ width, height, label, sublabel, climate }) {
  const p = CLIMATE_PALETTES[climate] || CLIMATE_PALETTES.urban;
  const w = width;
  const h = height;
  const seed = hashText(`${label}-${sublabel || ''}-${climate}`);
  const horizon = Math.round(h * pick(seed, 0.44, 0.62));
  const ridge1 = Math.round(h * pick(seed >>> 4, 0.13, 0.24));
  const ridge2 = Math.round(h * pick(seed >>> 8, 0.2, 0.34));
  const glowX = Math.round(w * pick(seed >>> 12, 0.56, 0.82));
  const glowY = Math.round(h * pick(seed >>> 16, 0.14, 0.34));
  const textureOpacity = climate === 'urban' ? 0.08 : 0.065;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <linearGradient id="sky" x1="12%" y1="0%" x2="88%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}"/>
      <stop offset="48%" stop-color="${p.bg2}"/>
      <stop offset="100%" stop-color="${p.bg3}" stop-opacity="0.72"/>
    </linearGradient>
    <linearGradient id="ground" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg2}"/>
      <stop offset="65%" stop-color="${p.bg3}" stop-opacity="0.76"/>
      <stop offset="100%" stop-color="${p.ink}" stop-opacity="0.22"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.46"/>
      <stop offset="100%" stop-color="${p.accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wash" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${p.ink}" stop-opacity="0.24"/>
      <stop offset="46%" stop-color="${p.accent}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.3"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${Math.round(Math.min(w, h) * 0.035)}"/>
    </filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="${seed % 997}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 ${textureOpacity}"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#sky)"/>
  <circle cx="${glowX}" cy="${glowY}" r="${Math.round(Math.min(w, h) * 0.28)}" fill="url(#glow)" filter="url(#soft)"/>
  <path d="M0 ${horizon} C ${Math.round(w * 0.18)} ${horizon - ridge1}, ${Math.round(w * 0.34)} ${horizon + ridge1}, ${Math.round(w * 0.5)} ${horizon - ridge2} S ${Math.round(w * 0.82)} ${horizon + ridge1}, ${w} ${horizon - Math.round(ridge2 * 0.45)} L ${w} ${h} L 0 ${h} Z" fill="url(#ground)" opacity="0.82"/>
  <path d="M0 ${Math.round(h * 0.72)} C ${Math.round(w * 0.22)} ${Math.round(h * 0.62)}, ${Math.round(w * 0.45)} ${Math.round(h * 0.8)}, ${Math.round(w * 0.67)} ${Math.round(h * 0.68)} S ${Math.round(w * 0.88)} ${Math.round(h * 0.6)}, ${w} ${Math.round(h * 0.7)} L ${w} ${h} L 0 ${h} Z" fill="${p.ink}" opacity="0.1"/>
  <rect width="100%" height="100%" fill="url(#wash)" opacity="0.72"/>
  <rect width="100%" height="100%" filter="url(#grain)" opacity="1"/>
  <rect x="${Math.round(w * 0.04)}" y="${Math.round(h * 0.05)}" width="${Math.round(w * 0.92)}" height="${Math.round(h * 0.9)}" rx="${Math.round(Math.min(w, h) * 0.035)}" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="${Math.max(1, Math.round(Math.min(w, h) * 0.004))}"/>
</svg>`;
}

export function cityHeroFallbackPath(cityId) {
  return path.join(ASSETS, 'fallbacks', 'cities', cityId, 'hero.svg');
}

export function cityThumbFallbackPath(cityId) {
  return path.join(ASSETS, 'fallbacks', 'cities', cityId, 'thumb.svg');
}

export function landmarkFallbackPath(cityId, landmarkSlug) {
  return path.join(ASSETS, 'fallbacks', 'landmarks', cityId, `${landmarkSlug}.svg`);
}

export function writeCityFallbacks(city) {
  const climate = climateFor(city);
  const heroDir = path.join(ASSETS, 'fallbacks', 'cities', city.id);
  ensureDir(heroDir);
  const heroPath = cityHeroFallbackPath(city.id);
  const thumbPath = cityThumbFallbackPath(city.id);
  const heroSvg = buildFallbackSvg({
    width: 800,
    height: 500,
    label: city.cityName,
    sublabel: city.countryName,
    climate,
  });
  const thumbSvg = buildFallbackSvg({
    width: 200,
    height: 200,
    label: city.cityName,
    climate,
  });
  fs.writeFileSync(heroPath, heroSvg);
  fs.writeFileSync(thumbPath, thumbSvg);
  return { heroPath, thumbPath };
}

export function writeLandmarkFallback(city, landmark) {
  const climate = climateFor(city);
  const dir = path.join(ASSETS, 'fallbacks', 'landmarks', city.id);
  ensureDir(dir);
  const out = landmarkFallbackPath(city.id, landmark.slug);
  const svg = buildFallbackSvg({
    width: 600,
    height: 400,
    label: landmark.name,
    sublabel: city.cityName,
    climate,
  });
  fs.writeFileSync(out, svg);
  return out;
}

export function fallbackManifestEntry(city, kind, landmark) {
  if (kind === 'hero') {
    return {
      heroImage: relAsset(cityHeroFallbackPath(city.id)),
      heroThumb: relAsset(cityThumbFallbackPath(city.id)),
      source: 'fallback',
      fallback: true,
    };
  }
  const key = `${city.id}/${landmark.slug}`;
  return {
    key,
    image: relAsset(landmarkFallbackPath(city.id, landmark.slug)),
    source: 'fallback',
    fallback: true,
  };
}
