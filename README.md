# TerraPulse

TerraPulse is a DesignVerse 2026 project about travel, community, and globe exploration. It is not a conventional travel site or a flat map page. The core idea is to make discovery feel spatial: the visitor enters through a living 3D globe, opens a city like a glowing magazine cover, then flips into lightweight content sections shaped around places, food, weather, trends, and community voices.

## Live Site

[Open TerraPulse on Vercel](https://design-a-hack-git-main-cyy-07s-projects.vercel.app/Globe%20loader/terrapulse/TerraPulse)

## Experience

**Layer 1: Globe Entry**

The globe is the main entrance. Cities live on the surface as quiet markers; hovering a city raises it into a light pillar with a circular photo node. The interface avoids showing every city label at once so the planet keeps its atmosphere instead of becoming a cluttered map.

**Layer 2: City Cover Stage**

Clicking a city opens a soft travel-magazine cover. Each city uses its own image and climate-aware palette, with a large city title, country, short description, and five oversized tab cards along the bottom.

**Layer 3: Section Views**

The five tabs open into focused content views:

- Landmarks
- Trending
- Food
- Weather
- Community

The sections keep text light and visual rhythm high, using larger typography, image cards, soft glass surfaces, and page-flip style transitions.

**Layer 4: Landmark Postcards**

Landmark images open into postcard-style detail views. The image remains the main subject, with just enough supporting text to give context.

## API Config

Optional Google Gemini and ElevenLabs settings are in:

```text
Globe loader/terrapulse/assets/api-config.js
```

Edit these fields:

```js
window.TERRA_API_CONFIG = {
  googleApiKey: '',
  googleModel: 'gemini-1.5-flash',
  elevenLabsApiKey: '',
  elevenLabsVoiceId: '21m00Tcm4TlvDq8ikWAM',
};
```

For a public production deployment, do not expose real private API keys in frontend JavaScript. Use a backend proxy for Gemini and ElevenLabs if the project goes beyond demo mode.

## Local Preview

The main file is:

```text
Globe loader/terrapulse/TerraPulse.html
```

Run a static server from the TerraPulse folder:

```powershell
cd "Globe loader/terrapulse"
python -m http.server 8765
```

Then open:

```text
http://localhost:8765/TerraPulse.html
```

## Vercel Deployment

This is a static frontend project. Vercel can serve it without a build step.

Recommended Vercel settings:

- Framework Preset: `Other`
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: leave empty

The root route is configured in `vercel.json` to redirect into the TerraPulse page.

