// TerraPulse — image augmentation
// Resolves hero + landmark URLs from image-manifest.js (local assets),
// with climate-aware SVG fallbacks and picsum as last resort.

(function () {
  const manifest = window.TERRA_IMAGE_MANIFEST || null;

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function assetUrl(path) {
    if (!path || /^https?:\/\//i.test(path)) return path || '';
    try {
      return new URL(path, document.baseURI).href;
    } catch {
      return path;
    }
  }
  const seedFor = (s) => `tp-${slug(s)}`;
  const picsumHero = (id) => `https://picsum.photos/seed/${seedFor(id)}/800/500`;
  const picsumThumb = (id) => `https://picsum.photos/seed/${seedFor(id)}/200/200`;

  const mapsUrl = (name, city) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${city}`)}`;

  function fallbackHero(c) {
    return `assets/images/fallbacks/cities/${c.id}/hero.svg`;
  }
  function fallbackThumb(c) {
    return `assets/images/fallbacks/cities/${c.id}/thumb.svg`;
  }
  function fallbackLandmark(c, l) {
    const s = l.slug || slug(`${c.id}-${l.name}`);
    return `assets/images/fallbacks/landmarks/${c.id}/${s}.svg`;
  }

  function cityHero(c) {
    const m = manifest?.cities?.[c.id];
    return m?.heroImage || fallbackHero(c) || picsumHero(c.id);
  }

  function cityThumb(c) {
    const m = manifest?.cities?.[c.id];
    return m?.heroThumb || m?.heroImage || fallbackThumb(c) || picsumThumb(c.id);
  }

  function landmarkManifestEntry(c, l) {
    const s = l.slug || slug(`${c.id}-${l.name}`);
    const keys = [`${c.id}/${s}`, s, `${c.id}-${s}`];
    for (const key of keys) {
      const m = manifest?.landmarks?.[key];
      if (m?.image) return { ...m, slug: s };
    }
    return { slug: s, image: null, fallback: true };
  }

  function landmarkImage(c, l) {
    const entry = landmarkManifestEntry(c, l);
    const url = entry.image || fallbackLandmark(c, l) || picsumThumb(entry.slug);
    return assetUrl(url);
  }

  window.TERRA_CITIES.forEach((c) => {
    c.heroImage = assetUrl(cityHero(c));
    c.heroThumb = assetUrl(cityThumb(c));
    c.mapUrl = mapsUrl(c.cityName + ' ' + c.countryName, '');

    c.landmarks.forEach((l) => {
      l.slug = slug(`${c.id}-${l.name}`);
      const lmEntry = landmarkManifestEntry(c, l);
      l.image = landmarkImage(c, l);
      l.imageFallback = assetUrl(fallbackLandmark(c, l));
      l.imageIsFallback =
        lmEntry.fallback === true || /\/fallbacks\//.test(lmEntry.image || '');
      l.mapUrl = mapsUrl(l.name, c.cityName);
    });

    c.food?.forEach((f) => {
      f.mapUrl = mapsUrl(f.name, c.cityName);
    });
  });
})();
