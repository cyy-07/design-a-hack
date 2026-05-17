const API = 'https://api.pexels.com/v1/search';

/**
 * @param {string} query
 * @param {number} perPage
 */
export async function searchPexels(query, perPage = 5) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return [];

  const url = new URL(API);
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('orientation', 'landscape');

  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) return [];

  const data = await res.json();
  return (data.photos || []).map((p) => ({
    source: 'pexels',
    title: p.alt || query,
    description: p.photographer ? `Photo by ${p.photographer}` : '',
    url: p.src?.large2x || p.src?.large || p.src?.original,
    width: p.width,
    height: p.height,
    mime: 'image/jpeg',
    attribution: p.photographer,
    license: 'Pexels License',
  }));
}
