# TerraPulse — Project Summary

> A living atlas. Hover the planet, watch a city rise.
> Built for a design-a-thon, May 2026.

---

## What it is

**TerraPulse** is a spatial travel atlas. The user opens the page and is
greeted by a 3D earth. Hovering a city pin causes it to rise out of the
surface with a small photo + label. Clicking it grows a column of warm
light from the city, which then unfolds into a *travel-magazine cover*
floating above the planet. From the cover, five large section tiles drop
the visitor into climate-themed "pages" of the city — landmarks, trends,
food, weather, voices from the community — and tapping any landmark photo
lifts a postcard above the page with the full story.

The goal: an entry into a place should *not* feel like clicking a modal.
It should feel like flying in.

---

## The four spatial layers

| # | Layer | What it is |
|---|---|---|
| **1** | The globe (entry) | 3D earth, custom GLSL atmosphere, mouse-driven pin rise, ambient spin until the cursor settles. |
| **2** | The cover | A magazine cover floats up from the chosen city. Photo backdrop, climate-tinted wash, huge editorial title, 5 BIG section tiles at the bottom. |
| **3** | The section page | Tap a tile and a glass page zooms in from the tile position. Inside, five section tabs let the visitor turn pages without going back to the cover — each switch is a soft `rotateY` page-flip. |
| **4** | The postcard | Tap any landmark photo — a soft-glass postcard lifts above the page with photo on the left and story on the right. Click outside / ESC to drift back down. |

Each transition is *physical*, not modal:

- pin rise: HTML stem grows + photo ring scales + breathing
- pillar grow: GLSL cylinder with upward energy flow + sparkle noise
- camera lerp: Three.js push-in + tilt, globe recedes in Z
- cover unfold: scale 0.04 → 1 with rotateX 28° → 0° + blur 8px → 0
- section zoom: scale 1.06 → 1 with `rotateY -14° → 0` + blur 10px → 0
- postcard lift: translateY 20 → 0 + scale 0.96 → 1 + backdrop blur

---

## The climate-adaptive palette system

The most distinctive design move. Every city auto-detects one of five
climates from its region, weather condition, country, and latitude. Each
climate carries its own light cream-based palette + accent colour:

| Climate | Background tones | Accent | Example cities |
|---|---|---|---|
| **Coastal** | `#faf7f1` cream · `#f1f4f6` mist · `#e7edf1` pale sky | `#6f99b8` mist blue | Cape Town · Sydney · Lisbon |
| **Tropical** | `#fdf7ec` warm cream · `#fbeedd` faint peach · `#f5e3cf` sand | `#d28b66` sunset peach | Bangkok · Bali · Singapore · Rio |
| **Mountain** | `#f4f5ef` dew · `#ebeee6` fog · `#dde4dc` moss | `#759983` muted green | Cusco · Kigali · Queenstown |
| **Warm sun** | `#fcf5e9` apricot · `#f8e9d5` honey · `#f0d9bd` pale gold | `#c98655` warm amber | Marrakech · Cairo · Austin · Petra |
| **Urban** | `#f6f5f7` silver · `#efedf1` pearl · `#e3e0e8` lilac mist | `#8b80b3` lilac | Tokyo · Seoul · New York · Berlin |

The palette drives **everything** inside the cover & section pages:
background wash, accent strokes, section icon tint, country italic colour,
hover states, divider gradients. The visual system stays unified across
all cities — only the *undertone* shifts.

Detection lives in `panels.jsx` → `climateFor(city)` and is purely
keyword+coordinate heuristic; no external API call.

---

## Type system

- **Display: Fraunces** — variable font with `opsz` (optical sizing) and
  `SOFT` axes. Used at three settings:
  - Cover title: `opsz 144, SOFT 35` — high contrast, sharp serifs
  - Section title: `opsz 144, SOFT 50` — slightly softer
  - Italic accents (country, eyebrows): `opsz 36, SOFT 60–80` — rounded
- **Body: Inter** — clean sans for short descriptive paragraphs
- **Mono: Geist Mono** — labels, eyebrows, coordinates, meta lines

---

## Motion language

Every animation follows a single grammar: **drift**, never *snap*.

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for almost everything
- Stagger: cover elements appear in cascade (0.15s → 1.10s)
- Breathing: side hazes & dust orbs pulse over 9–22 seconds
- Ken-burns: hero photos scale 1.02 → 1.14 over 28–34 seconds
- Line reveal: every divider paints itself from left to right
- Page flip: section content rotates `rotateY -14°` → `0°` on tab change

Nothing has a linear easing. Nothing snaps. Everything lerps.

---

## File map

```
terrapulse/
├── TerraPulse.html              entry point
├── presentation.html            ★ design-a-thon pitch deck (9 slides)
├── SUMMARY.md                   ← you are here
│
├── globe.js                     Three.js globe, atmosphere, pillar, camera
├── panels.jsx                   React city tab (Layer 2/3/4), climate logic
├── app.jsx                      app shell, pins layer, state machine
├── assistant.jsx                AI travel assistant (Layer 1 chrome)
│
├── data.js                      original 18 cities
├── cities-extra.js              60+ more (Africa / China / US heartland)
├── images.js                    hero / thumb resolution (manifest + fallback)
├── styles.css                   1900+ lines; design system v3 (light theme)
│
├── assets/
│   ├── image-manifest.js        Wikimedia Commons URLs per city + landmark
│   └── images/                  local fallbacks (~80 hero + thumbs)
└── scripts/
    └── image-pipeline/          tooling to refresh the manifest
```

---

## Stack

- **Three.js r128** — globe geometry, atmosphere fresnel shader, pillar
  shader (energy flow + noise spark), raycaster pin picking, camera lerp
- **React 18 + Babel standalone** — runs in-browser, no build step
- **CSS custom properties** — climate palettes via `data-climate`
  attribute on `.floating-tab`, cascading through all child components
- **Fraunces variable** — `wght 300–700` × `opsz 9–144` × `SOFT 0–100`
  driven from CSS `font-variation-settings`
- **Wikimedia Commons + local fallback** — real city photography wherever
  it could be sourced, never picsum noise

---

## What was hardest

1. **The grid layout collapse bug.** A blanket `position: relative` rule
   I added to fix z-index ordering ended up making `.tab-close` and the
   landmark lightbox eat grid cells, squashing the hero into a corner.
   Fixed by scoping the rule only to the two real content columns.

2. **Climate palette differentiation.** First pass was *too* unified —
   every city felt identical. The fix was giving each climate a strong
   accent colour that surfaces wherever there's an italic or a hover
   state (cover-country, chip hover, divider gradient, food review border).

3. **Layer separation.** Initial Landmarks-with-flip-card felt like
   Layer 2 and Layer 3 were the same surface. Moving the description into
   a **separate floating postcard** above everything gave a true
   four-layer depth: globe → cover → section page → postcard.

4. **Page-flip without a build step.** Re-keying the `<div>` on each
   section change works because React unmounts + remounts the subtree,
   re-running the CSS `@keyframes page-flip` from scratch every time.

---

## What the pitch deck (presentation.html) covers

1. **Title** — the headline + the three pillars (Spatial / Climate-adaptive / Travel-magazine soft)
2. **Problem** — why travel apps feel like spreadsheets
3. **Approach** — not-vs-is contrast
4. **Four layers** — the spatial entry diagram
5. **Climate atlas** — the 5 palettes with example cities
6. **Interaction rhythm** — the 4-step "drift, not click" sequence
7. **What makes it land** — three feelings: spatial / atmospheric / editorial
8. **Under the hood** — engine + data stack
9. **Closing** — stats + tagline

The deck is styled to match the product — cream paper backdrop, Fraunces
display type, soft dust orbs, breathing-pulse interactions. Keyboard
↑/↓ or mouse wheel to navigate; click the top-right pill to jump into
the live atlas.

---

## Future iterations

- **More climates**: `nordic` (cold blue-white), `vineyard` (rosé/wine), `desert-cool` (rose-quartz/sand)
- **Ambient sound**: per-climate environment loop on opt-in
- **Cursor blob**: a soft cream blend under the cursor inside layer 2/3 for extra "page" feel
- **Real data**: hook trending/community sections to a live source

Open `TerraPulse.html` to enter the atlas. Open `presentation.html`
for the pitch.

