const BAD_TITLE = /logo|icon|svg|diagram|map|chart|coat of arms|flag|seal|stamp|signature|portrait|selfie|license|qr|screenshot|thumbnail|sprite|pixel|clipart|drawing|illustration|vector|coat|emblem/i;

/**
 * @param {{ width: number, height: number, title?: string, mime?: string, query: string, kind: 'hero' | 'landmark' }} c
 */
export function scoreCandidate(c) {
  const { width, height, title = '', mime = '', query, kind } = c;
  if (!width || !height) return -1;
  if (width < (kind === 'hero' ? 640 : 400)) return -1;
  if (height < (kind === 'hero' ? 360 : 300)) return -1;
  if (BAD_TITLE.test(title)) return -1;
  if (/svg|gif|tiff|djvu|pdf|ogg|webm|mp3|mid|xcf|djvu/i.test(mime)) return -1;

  let score = 0;
  const ar = width / height;

  if (kind === 'hero') {
    if (ar >= 1.25 && ar <= 2.6) score += 35;
    else if (ar >= 1.1 && ar <= 3) score += 18;
    if (width >= 1400) score += 25;
    else if (width >= 1000) score += 15;
    else if (width >= 800) score += 8;
  } else {
    if (ar >= 0.75 && ar <= 1.85) score += 28;
    if (width >= 900) score += 20;
    else if (width >= 600) score += 12;
  }

  const qTokens = query.toLowerCase().split(/\W+/).filter((t) => t.length > 3);
  const titleL = title.toLowerCase();
  const hits = qTokens.filter((t) => titleL.includes(t)).length;
  score += Math.min(hits * 8, 32);

  if (/panorama|skyline|aerial|view|city|travel|landmark|exterior|architecture|building|tower|bridge|temple|church|mosque|palace|museum|market|square|harbor|beach|coast|sunset|dusk/i.test(title)) {
    score += 10;
  }

  if (/watermark|stock photo sample|getty|shutterstock|alamy/i.test(title)) score -= 40;

  return score;
}

export function pickBest(candidates, context) {
  let best = null;
  let bestScore = -1;
  for (const c of candidates) {
    const s = scoreCandidate({ ...c, ...context });
    if (s > bestScore) {
      bestScore = s;
      best = { ...c, score: s };
    }
  }
  return best;
}
