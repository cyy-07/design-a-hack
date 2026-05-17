// TerraPulse — main app shell

const { useState: useStateApp, useEffect: useEffectApp, useRef: useRefApp, useMemo: useMemoApp } = React;

// great-circle distance in degrees
function gcDistDeg(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const sa = Math.sin(dLat / 2) ** 2
           + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * Math.atan2(Math.sqrt(sa), Math.sqrt(1 - sa)) * (180 / Math.PI);
}

// ---------------------------------------------------------------------------
// PinsLayer — one HTML pin per city, auto-risen based on globe depth.
// Cities on the front of the globe naturally stand up; the hovered/selected
// one rises fully with photo + label.
// ---------------------------------------------------------------------------
function PinsLayer({ cities, hoveredId, selectedId, onHover, onClick }) {
  const ref = useRefApp(null);
  const hoveredIdRef = useRefApp(hoveredId);
  const selectedIdRef = useRefApp(selectedId);

  // Keep latest refs available inside the RAF closure
  useEffectApp(() => { hoveredIdRef.current = hoveredId; }, [hoveredId]);
  useEffectApp(() => { selectedIdRef.current = selectedId; }, [selectedId]);

  // RAF loop — position pins + auto-rise the center-most one
  useEffectApp(() => {
    let raf;
    let stickyCenterId = null; // sticky to prevent jitter
    let stickyCenterDepth = 0;

    const tick = () => {
      const layer = ref.current;
      if (layer) {
        // First pass: gather projections + find the front-most city
        const projections = {};
        let bestId = null;
        let bestDepth = 0;
        cities.forEach((c) => {
          const p = window.TerraGlobe.projectCity(c.id);
          projections[c.id] = p;
          if (p && p.depth > bestDepth) {
            bestDepth = p.depth;
            bestId = c.id;
          }
        });

        // Sticky center: don't switch until the new contender beats the
        // current sticky by >5% depth margin. Prevents flicker between
        // cities that are equidistant. Auto-rise is the SOLE logic now —
        // mouse hover no longer competes with it.
        let centerId = null;
        if (bestId && bestDepth > 0.55) {
          if (!stickyCenterId || stickyCenterId === bestId) {
            stickyCenterId = bestId;
            stickyCenterDepth = bestDepth;
          } else {
            const cur = projections[stickyCenterId];
            if (!cur || cur.depth < 0.45 || bestDepth > stickyCenterDepth + 0.05) {
              stickyCenterId = bestId;
              stickyCenterDepth = bestDepth;
            }
          }
          centerId = stickyCenterId;
        } else {
          stickyCenterId = null;
        }

        // Second pass: write to DOM
        const nodes = layer.querySelectorAll('.pin');
        for (const node of nodes) {
          const id = node.dataset.cityId;
          const p = projections[id];
          if (!p) {
            node.style.opacity = '0';
            node.classList.remove('risen');
            continue;
          }

          const vis = Math.max(0, Math.min(1, (p.depth - 0.05) * 2.5));
          node.style.opacity = String(vis);
          if (vis < 0.02) {
            node.classList.remove('risen');
            continue;
          }

          node.style.left = `${p.x}px`;
          node.style.top  = `${p.y}px`;

          const isHover = id === hoveredIdRef.current;
          const isSel = id === selectedIdRef.current;
          // Mouse-driven rise: whatever pin the cursor hits stands up
          // (and the currently selected city stays standing).
          const risen = isHover || isSel;
          const rise = risen ? 1 : 0;

          node.style.setProperty('--rise', rise);
          node.style.setProperty('--depth', vis);
          node.style.setProperty('--label-vis', rise > 0.85 ? 1 : 0);
          node.classList.toggle('risen', risen);
          // Selected city remains marked so the transition system can
          // anchor the pillar to its DOM node.
          node.classList.toggle('selected', isSel);
          node.classList.toggle('intentional', isSel);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cities.length]);

  return (
    <div className="pins-layer" ref={ref}>
      {cities.map((c, i) => (
        <div className={`pin ${i % 5 === 0 ? 'label-anchor' : ''}`}
             key={c.id}
             data-city-id={c.id}>
          {/* always-on dot at globe surface */}
          <div className="pin-dot"
               onMouseEnter={() => onHover(c.id)}
               onMouseLeave={() => onHover(null)}
               onClick={() => onClick(c.id)}
               title={c.cityName} />
          {/* tiny always-visible city name next to the dot —
              scales with --depth so cities near the limb stay readable
              while ones on the edge shrink and fade away. */}
          <div className="pin-name">{c.cityName}</div>
          {/* risen state: stem + photo + label */}
          <div className="pin-rise">
            <div className="pin-stem" />
            <div className="pin-node"
                 onMouseEnter={() => onHover(c.id)}
                 onMouseLeave={() => onHover(null)}
                 onClick={() => onClick(c.id)}>
              <img src={c.heroThumb} alt="" loading="lazy" />
            </div>
            <div className="pin-node-label">
              {c.cityName}
              <span className="country">{c.countryName}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
function App() {
  const cities = window.TERRA_CITIES;
  const [selectedId, setSelectedId] = useStateApp(null);
  const [hoveredId, setHoveredId] = useStateApp(null);
  const [searchQuery, setSearchQuery] = useStateApp('');
  const [utc, setUtc] = useStateApp('');
  const [focusSection, setFocusSection] = useStateApp(null);
  const [introHidden, setIntroHidden] = useStateApp(false);
  // Spatial entry state machine:
  //   idle    → no city selected, globe is the world
  //   pillar  → click detected, light pillar growing on selected city
  //   open    → city interface unfolded
  //   closing → reverse — interface collapsing back to pillar then globe
  const [phase, setPhase] = useStateApp('idle');
  const [originPx, setOriginPx] = useStateApp(null); // {x, y} pillar-top screen pos
  const globeMountRef = useRefApp(null);
  const initRef = useRefApp(false);
  const phaseTimers = useRefApp([]);

  function clearPhaseTimers() {
    phaseTimers.current.forEach((t) => clearTimeout(t));
    phaseTimers.current = [];
  }

  // Init the globe once
  useEffectApp(() => {
    if (initRef.current) return;
    initRef.current = true;

    window.TerraGlobe.init({
      container: globeMountRef.current,
      cities
    });

    // The 3D raycaster also reports hover (for the small ember dot in 3D).
    // HTML pins forward their own hover events too — both feed setHoveredId.
    window.TerraGlobe.setHoverCallback((id) => {
      // only override if HTML pin isn't already hovered
      setHoveredId((prev) => prev || id);
    });

    window.TerraGlobe.setSelectCallback((id) => {
      if (id) {
        handleSelectCity(id);
      }
    });

    const loader = document.getElementById('loading');
    setTimeout(() => { loader && loader.classList.add('gone'); }, 600);
  }, []);

  // Notify the globe of selection. We deliberately DO NOT call focusOn —
  // the pillar must grow at the city's current 3D position so the click
  // feels instantaneous rather than "spin-the-planet-then-open".
  useEffectApp(() => {
    window.TerraGlobe.setSelected(selectedId);
  }, [selectedId]);

  // Track the pillar-top screen position so the city interface unfolds
  // from the exact 3D anchor point, not an arbitrary modal origin.
  useEffectApp(() => {
    if (phase === 'idle') { setOriginPx(null); return; }
    let raf;
    const tick = () => {
      if (selectedId && window.TerraGlobe.projectPillarTop) {
        const p = window.TerraGlobe.projectPillarTop(selectedId, 3.2);
        if (p) setOriginPx(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, selectedId]);

  // UTC clock
  useEffectApp(() => {
    const tick = () => {
      const t = new Date().toISOString().split('T')[1].split('.')[0];
      setUtc(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ESC closes the tab
  useEffectApp(() => {
    const fn = (e) => { if (e.key === 'Escape') handleCloseCity(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const [searchOpen, setSearchOpen] = useStateApp(false);

  const filteredCities = cities.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return c.cityName.toLowerCase().includes(q) || c.countryName.toLowerCase().includes(q);
  });

  const currentCity = cities.find((c) => c.id === selectedId);
  const hoverCity = cities.find((c) => c.id === hoveredId);

  function handleSelectCity(id) {
    if (!id) return;
    clearPhaseTimers();
    setSelectedId(id);
    setIntroHidden(true);
    setFocusSection(null);
    // Stage 1: pillar grows out of globe (700ms reserved for camera lock + pillar)
    setPhase('pillar');
    window.TerraGlobe.setEntering(id);
    // Stage 2: at ~1100ms the ring at the top of the pillar expands into the city panel
    phaseTimers.current.push(setTimeout(() => {
      setPhase('open');
    }, 1100));
  }

  function handleCloseCity() {
    if (phase === 'idle') return;
    clearPhaseTimers();
    setPhase('closing');
    // Panel collapses first, then the pillar retracts
    phaseTimers.current.push(setTimeout(() => {
      window.TerraGlobe.setEntering(null);
    }, 360));
    phaseTimers.current.push(setTimeout(() => {
      setSelectedId(null);
      setPhase('idle');
    }, 900));
  }

  function handleJumpSection(sec) {
    if (!currentCity) return;
    setFocusSection(sec);
    setTimeout(() => setFocusSection(null), 800);
  }

  return (
    <div className="app">
      {/* Soft cream/blue side hazes flanking the planet */}
      <div className="side-haze left" />
      <div className="side-haze right" />

      <div id="globe-mount" ref={globeMountRef} />

      {/* HTML pins overlay sits between globe and UI chrome.
          During spatial entry the layer takes a phase class so non-selected
          pins fade and the selected pin morphs its stem into the pillar. */}
      <div className={`pins-stage phase-${phase}`}>
        <PinsLayer
          cities={cities}
          hoveredId={hoveredId}
          selectedId={selectedId}
          onHover={setHoveredId}
          onClick={handleSelectCity}
        />
      </div>

      <div className="ui">
        {/* topbar */}
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark" />
            <div>
              <div className="brand-name">TerraPulse</div>
              <div className="brand-meta">A living atlas · v0.2</div>
            </div>
          </div>
          <div className="topbar-right">
            <span className="utc-clock">
              <span className="live-dot" />
              {utc} UTC
            </span>
          </div>
        </div>

        {/* left rail: compact pill search */}
        {!selectedId && (
          <div className="left-rail">
            <div className="rail-title">Open the atlas</div>
            <div className="rail-search-wrap">
              <svg className="rail-search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11l3 3" strokeLinecap="round" />
              </svg>
              <input
                className="rail-search"
                type="text"
                placeholder={`Search ${cities.length} cities…`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
              />
              <div className={`rail-list ${searchOpen ? 'open' : ''}`}>
                {filteredCities.map((c) => (
                  <div
                    key={c.id}
                    className={`rail-item ${selectedId === c.id ? 'active' : ''}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectCity(c.id);
                      setSearchOpen(false);
                    }}
                    onMouseEnter={() => setHoveredId(c.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <span className="rail-city">{c.cityName}</span>
                    <span className="rail-country">{c.countryName.slice(0, 3).toUpperCase()}</span>
                  </div>
                ))}
                {filteredCities.length === 0 && (
                  <div className="rail-empty">No match — try another spelling.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* intro hint */}
        {!selectedId && (
          <div className={`intro-overlay ${introHidden ? 'hidden' : ''}`}>
            <div className="eyebrow">A spatial travel atlas</div>
            <div className="headline">Hover the globe. Watch cities rise.</div>
          </div>
        )}

        {/* bottom keys + hover */}
        <div className="bottom-hint">
          <span><span className="kbd">DRAG</span>rotate</span>
          <span><span className="kbd">SCROLL</span>zoom</span>
          <span><span className="kbd">CLICK</span>open city</span>
          <span><span className="kbd">ESC</span>close</span>
        </div>
        <div className="live-coords">
          <span>HOVER</span>
          <span className="col-val">{hoverCity ? hoverCity.cityName : '—'}</span>
        </div>

        {/* floating city tab — only mounted once the pillar exists so the
            unfold genuinely originates from the city in 3D space */}
        <CityTab
          city={currentCity}
          open={phase === 'open'}
          closing={phase === 'closing'}
          phase={phase}
          originPx={originPx}
          onClose={handleCloseCity}
          focusSection={focusSection}
        />

        {/* AI assistant */}
        <Assistant
          cities={cities}
          currentCityId={selectedId}
          onSelectCity={handleSelectCity}
          onJumpSection={handleJumpSection}
        />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
