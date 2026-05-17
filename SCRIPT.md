# TerraPulse — 5-Minute Speaker Script

Roughly 25 seconds per slide. Speak slow, breathe between slides.
Bracketed lines are stage cues, not things to say.

---

## Slide 1 — Title  *(~20s)*

[Mini globe is spinning on the right.]

Hi, we're TerraPulse — a travel atlas built for this design-a-thon.

The idea is simple. Most travel sites today feel like spreadsheets with photos. We wanted to build something that feels more like a magazine. So we made a globe you walk into.

---

## Slide 2 — Where it fits  *(~30s)*

Quick look at what people use today when they're thinking about travel.

Google Maps tells you *how to get there* — once you've decided.

Instagram shows you *where someone else just was* — but it's a feed, not a map.

Booking sites tell you *how much and when* — once you've already chosen the city.

None of them help with the first question: *where should I even go?*

That's the gap we're filling.

---

## Slide 3 — The Approach  *(~30s)*

We had three rules.

One — *spatial entry*. Cities should rise out of the globe, not pop up in a modal.

Two — *a palette per city*. Marrakech should feel warm. Cusco should feel cool. You shouldn't even have to read the name.

Three — *image leads*. Let the photos do the talking. Keep the text behind a click.

---

## Slide 4 — Manifesto  *(~15s)*

[Pause. Let the quote breathe.]

One line guided everything we built:

> Open a city the way you'd open a window.

---

## Slide 5 — Four Layers  *(~40s)*

The whole product is four layers, and you can see them animating side by side here.

Layer one — the globe. You hover a city, a little light pillar rises with a photo.

Layer two — the cover. A full-screen magazine page with the city's name and five tabs at the bottom.

Layer three — the section. You tap a tab and the page flips up like a book.

Layer four — the postcard. Tap any photo and a small card floats up with the story behind it.

Four layers, one continuous motion.

---

## Slide 6 — Climates  *(~25s)*

Here's where it gets fun.

We designed five climate palettes — coastal, tropical, mountain, warm sun, urban. Every city in the atlas gets one automatically based on its region.

[Optionally click a swatch on the slide.]

Watch the preview on the right change as I click. Same layout — different mood every time.

---

## Slide 7 — Carousel  *(~20s)*

And here's the same system on five real cities.

Cape Town for coastal. Bali for tropical. Cusco for mountain. Marrakech for warm sun. Tokyo for urban.

Same components. Completely different feel. That's the climate system doing its job.

---

## Slide 8 — Interaction Rhythm  *(~25s)*

Quick recap of how a session feels.

You hover the planet — the city rises.
You click — the cover floats up.
You tap a tab — the page flips.
You tap a photo — the postcard lifts.

No hard transitions, no modals. You just drift between layers.

---

## Slide 9 — How It Should Feel  *(~25s)*

Three things we really wanted people to feel.

First — spatial. Like walking into a place, not opening a panel.

Second — atmospheric. Every city has its own mood.

Third — editorial. It reads like a magazine. Soft type, paper grain, photo first.

---

## Slide 10 — Under the Hood  *(~50s, the longest slide)*

On the technical side: three.js for the planet, React with in-browser Babel for the UI, plain CSS for the design system, and a curated atlas of 78 cities.

One thing I want to be clear about — the globe itself started from an open-source three.js earth. The blue-marble texture, the topology map. We didn't pretend to build the planet from zero.

But we did not use it as-is. We extended it in three ways.

First, **interaction**. We redesigned it from a static rotating globe into a city-driven system with hover elevation and light beams.

Second, **structure**. Cities are no longer just points on a sphere. They became entry points into a deeper spatial experience.

Third, **integration**. We unified the globe with everything downstream — covers, sections, postcards — so the whole thing reads as one continuous spatial narrative.

So instead of being just a globe component, it became a spatial interaction layer built on top of a globe engine.

---

## Slide 11 — Try It Live  *(~20s)*

And this is the actual product, running live, embedded right inside the slide.

Real cities. Real climate palettes. Real interactions.

If you want to play with it after, the link is at the top of our README.

---

## Slide 12 — Closing  *(~15s)*

That's TerraPulse.

78 cities. 5 climates. 4 layers.

Hover the planet — watch cities rise.

Thank you.

---

## Pacing notes

- Total reading time ≈ **4:50** at a calm pace (~125 wpm).
- The two longer slides are **Four Layers** and **Under the Hood** — those carry the design story and the open-source acknowledgment.
- If you run short on time, the easiest slides to cut are **Carousel** (visual already speaks for itself) and **Rhythm** (which restates Four Layers).
- If you run long, drop a beat in **Climates** — the visual on screen does most of the work.
