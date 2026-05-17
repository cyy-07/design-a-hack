# TerraPulse / DesignVerse 2026

TerraPulse is a DesignVerse 2026 travel / community / globe exploration project.

The experience is a layered travel atlas:

- Layer 1: a 3D globe as the spatial entry point
- Layer 2: a soft city cover stage with climate-aware atmosphere
- Layer 3: large tab-driven content sections
- Layer 4: landmark postcard lightboxes

## Open Locally

The main page is:

```text
Globe loader/terrapulse/TerraPulse.html
```

For the most reliable local preview, run a static server from `Globe loader/terrapulse`:

```powershell
cd "Globe loader/terrapulse"
python -m http.server 8765
```

Then open:

```text
http://localhost:8765/TerraPulse.html
```

## API Config

Optional Google Gemini and ElevenLabs keys live in:

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

For a public production deployment, use a backend proxy instead of exposing real API keys in frontend JavaScript.

## Vercel Deployment

1. Push this repository to GitHub.
2. Go to Vercel and choose **Add New Project**.
3. Import `cyy-07/design-a-hack`.
4. Use these settings:
   - Framework Preset: **Other**
   - Build Command: leave empty
   - Output Directory: leave empty
   - Install Command: leave empty
5. Deploy.

The root route `/` redirects to:

```text
/Globe%20loader/terrapulse/TerraPulse.html
```

That redirect is configured in `vercel.json`.
