// TerraPulse — CityTab (full-screen two-column edition)
// Left: large hero image (swappable via landmark thumbs)
// Right: sticky tab nav + active section content

const { useState, useEffect, useRef } = React;

// ---------------------------------------------------------------------------
// climateFor(city) → 'coastal' | 'tropical' | 'mountain' | 'warm' | 'urban'
// Drives a per-city palette shift in the floating tab. The goal isn't precise
// meteorology — it's *atmosphere*: each city should feel slightly different
// (a hint of sea, of desert sun, of stone) while the visual system stays
// unified, light and travel-magazine soft across the board.
// ---------------------------------------------------------------------------
function climateFor(city) {
  const sig = `${city.region || ''} ${city.weather?.condition || ''} ${city.countryName || ''} ${city.cityName || ''}`.toLowerCase();
  if (/coast|caribbean|atlantic|pacific|mediterr|aegean|indian ocean|island|bay|gulf|baltic|nordic|fjord|cape|sydney|lisbon|reykjav|copenhagen|barcelona|stockholm|oslo|tel aviv|honolulu/.test(sig)) return 'coastal';
  if (/tropic|southeast|equator|amazon|subtropical|monsoon|humid subtrop|bali|phuket|maldiv|tahiti|fiji|bangkok|singapore|miami|cancun/.test(sig)) return 'tropical';
  if (/mount|highland|andean|alp|hill|stone|canyon|valley|cusco|katmandu|nepal|tibet|denver|aspen|queenstown|kigali|addis/.test(sig)) return 'mountain';
  if (/desert|sahara|north africa|west africa|middle east|savannah|arabia|dry|marrakech|cairo|dubai|petra|livingstone|tucson|santa fe|austin/.test(sig)) return 'warm';
  // coordinate fallback — within the tropics → tropical, near coastal lat → coastal
  const lat = city.coordinates?.[0];
  if (typeof lat === 'number' && Math.abs(lat) < 23.5) return 'tropical';
  return 'urban';
}

// ---------------------------------------------------------------------------
// Counter — animates from 0 up to `value` over `duration` ms.
// Used for the inline trend / posts / spots stats in the hero. Re-runs from
// 0 whenever `value` changes so the count-up replays when the city changes.
// ---------------------------------------------------------------------------
function Counter({ value, duration = 1100, suffix }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (typeof value !== 'number') { setShown(value); return; }
    let raf;
    const t0 = performance.now();
    const tick = () => {
      const t = Math.min(1, (performance.now() - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{shown}{suffix}</>;
}

// ---------------------------------------------------------------------------
// CoordsDial — decorative circular SVG that reads the city's lat/lon. The
// outer ring rotates slowly; the inner needle locks to longitude. Pure
// chrome, no data semantics — but every design-comp deck needs a watch face.
// ---------------------------------------------------------------------------
function CoordsDial({ lat, lon }) {
  // Build 60 tick marks every 6° around the ring
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2;
    const r1 = i % 5 === 0 ? 36 : 38;
    const r2 = 42;
    ticks.push(
      <line key={i}
            x1={50 + Math.cos(a) * r1} y1={50 + Math.sin(a) * r1}
            x2={50 + Math.cos(a) * r2} y2={50 + Math.sin(a) * r2}
            stroke="var(--ink-1)"
            strokeOpacity={i % 5 === 0 ? 0.9 : 0.35}
            strokeWidth={i % 5 === 0 ? 1 : 0.5} />
    );
  }
  // Convert longitude to needle angle (0° lon = up)
  const lonDeg = ((lon + 360) % 360);
  return (
    <div className="coords-dial" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <g className="dial-ring">{ticks}</g>
        <circle cx="50" cy="50" r="34" fill="none" stroke="var(--line-strong)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="2 3" />
        {/* longitude needle */}
        <g transform={`rotate(${lonDeg} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="14" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="50" cy="14" r="2" fill="var(--accent)" />
        </g>
        {/* center cap */}
        <circle cx="50" cy="50" r="2.2" fill="var(--ink-0)" />
      </svg>
      <div className="coords-dial-readout">
        <span>{Math.abs(lat).toFixed(2)}°{lat >= 0 ? 'N' : 'S'}</span>
        <span>{Math.abs(lon).toFixed(2)}°{lon >= 0 ? 'E' : 'W'}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// weather glyphs
// ---------------------------------------------------------------------------
function WeatherGlyph({ kind }) {
  if (kind === 'sun') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
  if (kind === 'cloud') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A4 4 0 0 1 17 18z" strokeLinejoin="round" />
    </svg>
  );
  if (kind === 'rain') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M7 14a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A4 4 0 0 1 17 14z" strokeLinejoin="round" />
      <path d="M9 18l-1 2M13 18l-1 2M17 18l-1 2" strokeLinecap="round" />
    </svg>
  );
  return null;
}

// ---------------------------------------------------------------------------
// smooth weather chart
// ---------------------------------------------------------------------------
function WeatherChart({ series }) {
  const W = 600, H = 120, P = 4;
  const max = Math.max(...series), min = Math.min(...series);
  const range = Math.max(1, max - min);
  const stepX = (W - P * 2) / (series.length - 1);
  const pts = series.map((v, i) => [
    P + i * stepX,
    H - P - ((v - min) / range) * (H - P * 2 - 18)
  ]);
  const path = pts.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p[0]} ${p[1]}`;
    const prev = arr[i - 1];
    const cp1x = prev[0] + (p[0] - (arr[i - 2]?.[0] ?? prev[0])) / 5;
    const cp1y = prev[1] + (p[1] - (arr[i - 2]?.[1] ?? prev[1])) / 5;
    const cp2x = p[0] - ((arr[i + 1]?.[0] ?? p[0]) - prev[0]) / 5;
    const cp2y = p[1] - ((arr[i + 1]?.[1] ?? p[1]) - prev[1]) / 5;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p[0]} ${p[1]}`;
  }, '');
  const areaPath = `${path} L ${pts[pts.length - 1][0]} ${H - P} L ${pts[0][0]} ${H - P} Z`;
  return (
    <svg className="weather-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="wfill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g, i) => (
        <line key={i}
              x1={P} x2={W - P}
              y1={P + g * (H - P * 2)} y2={P + g * (H - P * 2)}
              stroke="var(--line)" strokeDasharray="2 4" />
      ))}
      <path d={areaPath} fill="url(#wfill)" />
      <path d={path} stroke="var(--accent)" strokeWidth="1.8" fill="none" />
      {['00', '06', '12', '18', ''].map((h, i) => (
        <text key={i}
              x={P + (i / 4) * (W - P * 2)} y={H - 2}
              fontSize="10" fontFamily="var(--f-mono)"
              fill="var(--ink-3)" textAnchor="middle" letterSpacing="0.1em">{h}</text>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// section blocks (rendered into the right column)
// ---------------------------------------------------------------------------

function Landmarks({ city, onOpenLightbox }) {
  // Layer-2 surface: image grid only, almost no text. Tapping a card
  // hands the index up to the tab-level lightbox (Layer 3).
  return (
    <>
      <h2 className="tab-section-title">Landmarks</h2>
      <div className="tab-section-eyebrow">{city.landmarks.length} places · tap for postcard</div>
      <div className="lm-grid">
        {city.landmarks.map((l, i) => (
          <div className="lm-card" key={i} role="button" tabIndex={0}
               onClick={(e) => { e.stopPropagation(); onOpenLightbox(i); }}
               onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenLightbox(i); } }}>
            <img src={l.image} alt="" loading="lazy" />
            <div className="lm-card-scrim" />
            <div className="lm-card-caption">
              <div className="cat">{l.category}</div>
              <div className="name">{l.name}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// LandmarkLightbox — Layer 3. A floating travel-postcard that lifts off
// above the tab when the visitor taps a landmark photo. Soft glass surface,
// big photo on the left, short story on the right. Click anywhere outside
// the card to drift back down.
// ---------------------------------------------------------------------------
function LandmarkLightbox({ city, idx, onClose }) {
  // ESC closes when open
  useEffect(() => {
    if (idx == null) return;
    const fn = (e) => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } };
    window.addEventListener('keydown', fn, true);
    return () => window.removeEventListener('keydown', fn, true);
  }, [idx, onClose]);

  const l = idx != null ? city.landmarks[idx] : null;
  return (
    <div className={`lm-lightbox ${l ? 'open' : ''}`} onClick={onClose} role="presentation">
      <div className="lm-lightbox-card"
           onClick={(e) => e.stopPropagation()}
           role="dialog"
           aria-modal="true"
           aria-labelledby={l ? 'lb-name' : undefined}>
        {l && (
          <>
            <div className={`lb-photo ${l.imageIsFallback ? 'is-fallback' : ''}`}>
              <img src={l.image} alt={l.name}
                   onError={(e) => {
                     if (l.imageFallback && e.currentTarget.src !== l.imageFallback) {
                       e.currentTarget.src = l.imageFallback;
                     }
                   }} />
            </div>
            <div className="lb-body">
              <div className="lb-cat">{l.category}</div>
              <h3 className="lb-name" id="lb-name">{l.name}</h3>
              <p className="lb-desc">{l.description}</p>
              <div className="lb-foot">
                <span className="lb-rating"><span className="star">★</span> {l.rating?.toFixed(1)}</span>
                {l.mapUrl && (
                  <a className="lb-map" href={l.mapUrl} target="_blank" rel="noopener">
                    Open in Maps →
                  </a>
                )}
              </div>
            </div>
            <button className="lb-close" onClick={onClose} aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.4">
                <path d="M2 2L12 12M12 2L2 12" strokeLinecap="round" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Trending({ city }) {
  return (
    <>
      <h2 className="tab-section-title">Trending now</h2>
      <div className="tab-section-eyebrow">what travellers are chasing</div>
      <div className="trend-list">
        {city.trending.map((t, i) => (
          <div className="trend-row" key={i}>
            <div className="trend-tag">
              {t.tag}
              {t.context && <span className="ctx">{t.context}</span>}
            </div>
            <div className="trend-bar"><div className="fill" style={{ width: `${t.weight}%` }} /></div>
            <div className="trend-score">{t.weight}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Food({ city }) {
  return (
    <>
      <h2 className="tab-section-title">Where to eat</h2>
      <div className="tab-section-eyebrow">four quick tables</div>
      <div className="food-grid">
        {city.food.map((f, i) => (
          <div className="food-card" key={i}>
            <div className="food-cat">{f.category}</div>
            <div className="food-name">{f.name}</div>
            <div className="food-rating">
              <span className="stars">{'★'.repeat(Math.round(f.rating))}</span>
              <span>{f.rating.toFixed(1)}</span>
              <span className="count">· {f.reviews.toLocaleString()} reviews</span>
            </div>
            <div className="food-review">"{f.review}"</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Weather({ city }) {
  return (
    <>
      <h2 className="tab-section-title">Weather</h2>
      <div className="tab-section-eyebrow">air, light, timing</div>
      <div className="weather-row">
        <div className="weather-now">
          {city.weather.now}<span className="deg">°C</span>
        </div>
        <div className="weather-meta">
          <div className="cond">{city.weather.condition}</div>
          <div>HI {city.weather.high}° · LO {city.weather.low}°</div>
        </div>
      </div>
      <WeatherChart series={city.weather.series} />
      <div className="weather-forecast">
        {city.forecast.map((d, i) => (
          <div className="forecast-day" key={i}>
            {d.day}
            <span className="glyph"><WeatherGlyph kind={d.glyph} /></span>
            <div className="hi">{d.hi}°</div>
            <div className="lo">{d.lo}°</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Community({ city }) {
  const passports = [
    { flag: '🇯🇵', place: 'Japan' },
    { flag: '🇧🇷', place: 'Brazil' },
    { flag: '🇫🇷', place: 'France' },
    { flag: '🇰🇪', place: 'Kenya' },
    { flag: '🇨🇦', place: 'Canada' },
    { flag: '🇮🇳', place: 'India' },
  ];
  return (
    <>
      <h2 className="tab-section-title">Community</h2>
      <div className="tab-section-eyebrow">voices from everywhere</div>
      <div className="post-list">
        {city.community.map((p, i) => {
          const passport = passports[i % passports.length];
          return (
          <div className="post" key={i}>
            <div className="avatar">{p.initials}</div>
            <div className="post-body">
              <div className="post-meta">
                <span className="author">{p.author}</span>
                <span className="passport">{passport.flag} {passport.place}</span>
                <span>·</span>
                <span>{p.timestamp}</span>
              </div>
              <div className="post-text">{p.snippet}</div>
              <div className="post-react">♡ {p.reactions.toLocaleString()} reactions</div>
            </div>
          </div>
        )})}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// main floating tab
// ---------------------------------------------------------------------------

// Section metadata — label + 1-line subtitle (read by Layer 2 BIG nav) +
// a small thin-stroked icon designed to read at any size on light glass.
function IconLandmarks(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" strokeLinejoin="round"/>
      <circle cx="12" cy="9" r="2.6"/>
    </svg>
  );
}
function IconTrending(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M4 17l5-6 4 4 7-9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 6h6v6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconFood(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M4 11c0 3 3 5 8 5s8-2 8-5" strokeLinecap="round"/>
      <path d="M3 11h18"/>
      <path d="M10 4c0 1.4-1 2-1 3M14 4c0 1.4-1 2-1 3M12 4c0 1.4-1 2-1 3" strokeLinecap="round"/>
      <path d="M5 19h14" strokeLinecap="round"/>
    </svg>
  );
}
function IconWeather(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <circle cx="9" cy="11" r="3.5"/>
      <path d="M14 18a4 4 0 0 0 0-8 5 5 0 0 0-9.6-.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 4v1M9 17v1M3 11h1M14 11h1M5.4 7.4l.7.7M12.6 7.4l-.7.7" strokeLinecap="round"/>
    </svg>
  );
}
function IconCommunity(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M5 16V10a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H10l-5 3z" strokeLinejoin="round"/>
      <path d="M9 12h6M9 10h4" strokeLinecap="round"/>
    </svg>
  );
}

const SECTIONS = [
  { key: 'landmarks', label: 'Landmarks', tag: 'Places',   Icon: IconLandmarks },
  { key: 'trending',  label: 'Trending',  tag: 'In the air', Icon: IconTrending  },
  { key: 'food',      label: 'Food',      tag: 'Eat here',  Icon: IconFood       },
  { key: 'weather',   label: 'Weather',   tag: 'Forecast',  Icon: IconWeather    },
  { key: 'community', label: 'Community', tag: 'Voices',    Icon: IconCommunity  },
];

function CityTab({ city, open, closing, phase, originPx, onClose, focusSection }) {
  // Layer-3 state: null = on the city cover, otherwise the zoomed section key.
  const [activeSection, setActiveSection] = useState(null);
  // Layer-4 state: landmark postcard lightbox
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Reset all layers when the city changes
  useEffect(() => {
    setActiveSection(null);
    setLightboxIdx(null);
  }, [city?.id]);

  // External jump from AI assistant
  useEffect(() => {
    if (focusSection && SECTIONS.some((s) => s.key === focusSection)) {
      setActiveSection(focusSection);
    }
  }, [focusSection]);

  // ESC handling: lightbox first, then section zoom, then tab close
  useEffect(() => {
    const fn = (e) => {
      if (e.key !== 'Escape') return;
      if (lightboxIdx != null) return;        // lightbox owns ESC
      if (activeSection) { setActiveSection(null); e.stopPropagation(); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [activeSection, lightboxIdx]);

  if (!city) return null;

  function sectionContent(key) {
    switch (key) {
      case 'landmarks': return <Landmarks city={city} onOpenLightbox={setLightboxIdx} />;
      case 'trending':  return <Trending city={city} />;
      case 'food':      return <Food city={city} />;
      case 'weather':   return <Weather city={city} />;
      case 'community': return <Community city={city} />;
      default: return null;
    }
  }

  // Anchor the unfold to the 3D pillar's screen position. While entering,
  // the panel scales / unfolds from this exact point so the interface feels
  // "projected out of the globe" rather than appearing as a modal.
  // Only reveal the holographic panel at phase 'open' onward; during 'pillar'
  // the pillar+ring are the only on-screen entry visuals.
  const isVisible = phase === 'open' || phase === 'closing';
  const stageStyle = originPx ? {
    '--origin-x': `${originPx.x}px`,
    '--origin-y': `${originPx.y}px`,
  } : {};
  const climate = climateFor(city);

  return (
    <>
      <div className={`tab-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`tab-stage ${isVisible ? 'visible' : ''} phase-${phase || 'idle'}`}
           aria-hidden={!open}
           style={stageStyle}>
        <div className={`floating-tab ${open ? 'open' : ''} ${closing ? 'closing' : ''} ${activeSection ? 'in-section' : ''}`}
             data-climate={climate}>
          {/* Atmospheric backdrop — a heavily blurred, low-opacity copy of
              the hero image sits behind everything so the panel feels like
              an "airy travel magazine page" rather than a dark modal. */}
          <div className="tab-atmos"
               style={{ backgroundImage: `url(${city.heroImage})` }} />
          <div className="tab-atmos-wash" />
          <button className="tab-close" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.4">
              <path d="M2 2L12 12M12 2L2 12" strokeLinecap="round" />
            </svg>
          </button>

          {/* === LAYER 2 — CITY COVER ===
              Three zones, top → bottom:
                ⒈ Meta bar (region · coords · UTC · season)        — top
                ⒉ Editorial cover (huge title, country, description) — center
                ⒊ Five BIG full-width section tabs                  — bottom
              Background is a multi-layered composition: photo, climate
              wash, decorative paper grain, soft corner light, and a
              subtle line frame — so the panel reads as a *designed page*,
              not "just one photo with text on it". */}
          <div className="city-cover">
            <div className="cover-photo"
                 style={{ backgroundImage: `url(${city.heroImage})` }} />
            <div className="cover-wash" />
            {/* Decorative frame + corner ornaments + paper grain */}
            <svg className="cover-corner tl" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M2 30 V2 H30" strokeLinecap="round" />
              <circle cx="2" cy="2" r="2.2" fill="currentColor" stroke="none" opacity="0.5" />
            </svg>
            <svg className="cover-corner tr" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M50 2 H78 V30" strokeLinecap="round" />
              <circle cx="78" cy="2" r="2.2" fill="currentColor" stroke="none" opacity="0.5" />
            </svg>
            <svg className="cover-corner bl" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M2 50 V78 H30" strokeLinecap="round" />
            </svg>
            <svg className="cover-corner br" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M50 78 H78 V50" strokeLinecap="round" />
            </svg>

            {/* TOP — meta bar */}
            <div className="cover-topbar">
              <div className="cover-meta">
                <span className="cover-meta-key">{city.region}</span>
                <span className="cover-meta-sep">/</span>
                <span>{city.coordinates[0].toFixed(2)}°, {city.coordinates[1].toFixed(2)}°</span>
                <span className="cover-meta-sep">/</span>
                <span>UTC {city.localTime}</span>
                <span className="cover-meta-sep">/</span>
                <span>Best · {city.bestSeason}</span>
              </div>
              <div className="cover-edition">
                Edition №&thinsp;{String(city.landmarks.length).padStart(2,'0')}
              </div>
            </div>

            {/* CENTER — editorial title block */}
            <div className="cover-inner">
              <div className="cover-eyebrow">A traveller's atlas</div>
              <h1 className="cover-title">{city.cityName}</h1>
              <div className="cover-country">{city.countryName}</div>
              <p className="cover-desc">{city.shortDescription}</p>
              <div className="cover-deck">
                <span>{city.visitorCount} visitors / yr</span>
                <span className="sep">·</span>
                <span>{city.landmarks.length + city.food.length} spots curated</span>
              </div>
            </div>

            {/* BOTTOM — five big section tiles */}
            <nav className="cover-tabs">
              {SECTIONS.map((s, i) => (
                <button key={s.key}
                        className="cover-tab"
                        style={{ '--i': i }}
                        onClick={() => setActiveSection(s.key)}>
                  <span className="cover-tab-icon"><s.Icon width="34" height="34" /></span>
                  <span className="cover-tab-label">{s.label}</span>
                  <span className="cover-tab-tag">{s.tag}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* === LAYER 3 — SECTION ZOOM ===
              Open as a glass overlay that ZOOMS in from the bottom tab strip.
              Inside, the visitor can switch between any of the 5 sections
              WITHOUT returning to the cover — each tab change triggers a
              page-flip (rotateY) micro-animation on the content body.   */}
          {activeSection && (
            <div className="section-zoom" data-section={activeSection}>
              <button className="zoom-back" onClick={() => setActiveSection(null)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M9 6H3M5 4L3 6l2 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{city.cityName} cover</span>
              </button>

              {/* Internal section nav — switch in-place with flip animation */}
              <nav className="zoom-tabs">
                {SECTIONS.map((s) => (
                  <button key={s.key}
                          className={`zoom-tab ${activeSection === s.key ? 'active' : ''}`}
                          onClick={() => setActiveSection(s.key)}>
                    <s.Icon width="18" height="18" />
                    <span>{s.label}</span>
                  </button>
                ))}
              </nav>

              {/* Page-flip wrapper. The `key` change unmounts/remounts
                  the body which re-runs the @keyframes flip-in animation. */}
              <div className="zoom-body" key={activeSection}>
                {sectionContent(activeSection)}
              </div>
            </div>
          )}

          {/* === LAYER 4 — LANDMARK POSTCARD === */}
          <LandmarkLightbox
            city={city}
            idx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        </div>
      </div>
    </>
  );
}
