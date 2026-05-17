const API = 'https://api.unsplash.com/search/photos';

/**
 * @param {string} query
 * @param {number} perPage
 */
export async function searchUnsplash(query, perPage = 5) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return [];

  const url = new URL(API);
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('orientation', 'landscape');

  const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } });
  if (!res.ok) return [];

  const data = await res.json();
  return (data.results || []).map((p) => ({
    source: 'unsplash',
    title: p.alt_description || p.description || query,
    description: p.user?.name ? `Photo by ${p.user.name}` : '',
    url: p.urls?.regular || p.urls?.full,
    width: p.width,
    height: p.height,
    mime: 'image/jpeg',
    attribution: p.user?.name,
    license: 'Unsplash License',
  }));
}
