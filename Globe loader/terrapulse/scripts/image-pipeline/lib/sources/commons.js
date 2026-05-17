const API = 'https://commons.wikimedia.org/w/api.php';
const UA = 'TerraPulseImagePipeline/1.0 (DesignVerse 2026; educational travel atlas)';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function wikiGet(params, attempt = 0) {
  const url = new URL(API);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (res.status === 429 && attempt < 5) {
    const wait = 2000 * Math.pow(2, attempt);
    await sleep(wait);
    return wikiGet(params, attempt + 1);
  }
  if (!res.ok) throw new Error(`Commons API ${res.status}`);
  return res.json();
}

let lastCall = 0;
async function rateLimitedGet(params) {
  const minGap = 1100;
  const now = Date.now();
  const wait = minGap - (now - lastCall);
  if (wait > 0) await sleep(wait);
  lastCall = Date.now();
  return wikiGet(params);
}

/**
 * @param {string} query
 * @param {number} limit
 */
export async function searchCommons(query, limit = 5) {
  const data = await rateLimitedGet({
    action: 'query',
    list: 'search',
    srsearch: query,
    srnamespace: '6',
    srlimit: String(limit),
    format: 'json',
    origin: '*',
  });
  const titles = (data.query?.search || []).map((r) => r.title).filter(Boolean);
  if (!titles.length) return [];

  const info = await rateLimitedGet({
    action: 'query',
    titles: titles.join('|'),
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: '1600',
    format: 'json',
    origin: '*',
  });

  const pages = info.query?.pages || {};
  const out = [];
  for (const p of Object.values(pages)) {
    const ii = p.imageinfo?.[0];
    if (!ii?.url) continue;
    const ext = ii.extmetadata || {};
    const desc = ext.ImageDescription?.value || ext.ObjectName?.value || '';
    out.push({
      source: 'commons',
      title: p.title?.replace(/^File:/, '') || query,
      description: stripHtml(desc),
      url: ii.thumburl || ii.url,
      width: ii.thumbwidth || ii.width,
      height: ii.thumbheight || ii.height,
      mime: ii.mime,
    });
  }
  return out;
}

function stripHtml(s) {
  return String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
