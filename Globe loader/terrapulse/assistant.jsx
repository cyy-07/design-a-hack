// TerraPulse — AI Assistant ("Compass")
// Travel-intent helper. Suggests cities, jumps to sections, answers free-form Qs.
// Uses optional Gemini + ElevenLabs config from assets/api-config.js.
// Falls back to window.claude.complete when available.

const { useState: useStateA, useRef: useRefA, useEffect: useEffectA } = React;

function Assistant({ cities, currentCityId, onSelectCity, onJumpSection }) {
  const [open, setOpen] = useStateA(false);
  const [msgs, setMsgs] = useStateA([
    {
      role: 'bot',
      text: "I'm Compass. Tell me what you're after — a city, a vibe, a mood — and I'll point the globe at it. Or jump straight into the city you've already opened."
    }
  ]);
  const [input, setInput] = useStateA('');
  const [thinking, setThinking] = useStateA(false);
  const bodyRef = useRefA(null);

  const currentCity = cities.find((c) => c.id === currentCityId);

  useEffectA(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, thinking, open]);

  // Listen for /toggle event from the FAB
  useEffectA(() => {
    const fn = () => setOpen((o) => !o);
    window.addEventListener('terra:toggle-assistant', fn);
    return () => window.removeEventListener('terra:toggle-assistant', fn);
  }, []);

  function pushMsg(role, text) {
    setMsgs((m) => [...m, { role, text }]);
  }

  function apiConfig() {
    return window.TERRA_API_CONFIG || {};
  }

  async function completeWithGemini(text) {
    const cfg = apiConfig();
    if (!cfg.googleApiKey) return null;
    const model = cfg.googleModel || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(cfg.googleApiKey)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
        contents: [{ role: 'user', parts: [{ text }] }],
        generationConfig: {
          temperature: 0.75,
          maxOutputTokens: 180,
        },
      }),
    });
    if (!res.ok) throw new Error(`Gemini ${res.status}`);
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim() || null;
  }

  async function completeTravelReply(text) {
    const geminiReply = await completeWithGemini(text);
    if (geminiReply) return geminiReply;
    if (window.claude?.complete) {
      return window.claude.complete({
        messages: [{ role: 'user', content: text }],
        system: buildSystemPrompt(),
      });
    }
    throw new Error('No assistant provider configured');
  }

  async function speakWithElevenLabs(text) {
    const cfg = apiConfig();
    if (!cfg.elevenLabsApiKey || !cfg.elevenLabsVoiceId || !text) return;
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(cfg.elevenLabsVoiceId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': cfg.elevenLabsApiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.42, similarity_boost: 0.72 },
      }),
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const audio = new Audio(URL.createObjectURL(blob));
    audio.play().catch(() => {});
  }

  // The system prompt: gives Claude an inventory of cities + a strict response format
  function buildSystemPrompt() {
    const inventory = cities.map((c) =>
      `  - id: "${c.id}", city: "${c.cityName}, ${c.countryName}", region: "${c.region}", trend: ${c.trendScore}, vibe: ${JSON.stringify(c.shortDescription)}`
    ).join('\n');

    return `You are "Compass", the AI navigator inside TerraPulse — a 3D travel atlas.

You answer in a warm, concise, curated tone like a well-traveled friend (not a search engine, not a marketer). Keep replies to 2–4 short sentences. No bullet lists. No emoji.

When the user mentions a *vibe, mood, season, food, or activity*, recommend ONE city from this inventory that best fits, and end your reply with EXACTLY one tag of the form [open:CITY_ID]. CITY_ID must match one of the ids below.

When the user asks about the city they're currently exploring, do NOT use an [open:] tag — instead, if relevant, end with a [jump:SECTION] tag where SECTION is one of: landmarks, trending, food, weather, community.

Never use both tags in one reply. Never invent cities not in the inventory.

INVENTORY:
${inventory}

Current city open in the UI: ${currentCity ? `"${currentCity.cityName}" (id: ${currentCity.id})` : 'none'}`;
  }

  async function send(text) {
    if (!text.trim()) return;
    pushMsg('user', text);
    setInput('');
    setThinking(true);

    try {
      const reply = await completeTravelReply(text);

      // Parse out tags
      let displayText = reply;
      const openMatch = reply.match(/\[open:([a-zA-Z0-9_-]+)\]/);
      const jumpMatch = reply.match(/\[jump:(landmarks|trending|food|weather|community)\]/);

      displayText = displayText.replace(/\[(open|jump):[^\]]+\]/g, '').trim();
      pushMsg('bot', displayText);
      speakWithElevenLabs(displayText);

      if (openMatch && cities.some((c) => c.id === openMatch[1])) {
        setTimeout(() => onSelectCity(openMatch[1]), 350);
      } else if (jumpMatch) {
        setTimeout(() => onJumpSection(jumpMatch[1]), 250);
      }
    } catch (err) {
      pushMsg('bot', "I'm offline at the moment. Try a quick suggestion below.");
    } finally {
      setThinking(false);
    }
  }

  // Curated quick prompts — adapt to whether a city is open
  const quickPrompts = currentCity ? [
    'best food here',
    "what's trending",
    'weather this week',
    'show me posts'
  ] : [
    'somewhere warm in November',
    'underrated for design lovers',
    'best food cities right now',
    'great for solo travel'
  ];

  // Section-jump chips (only when a city is open)
  const jumps = [
    ['landmarks', 'Landmarks →'],
    ['food', 'Food →'],
    ['trending', 'Trending →'],
    ['weather', 'Weather →'],
    ['community', 'Community →'],
  ];

  return (
    <>
      <button className="assistant-fab" onClick={() => setOpen((o) => !o)} aria-label="Open assistant">
        <div className="spark" />
      </button>

      <div className={`assistant-panel ${open ? 'open' : ''}`} role="dialog" aria-label="Compass assistant">
        <div className="assistant-head">
          <div>
            <div className="title">Compass</div>
            <div className="sub">AI · travel navigator</div>
          </div>
          <button className="close-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>

        <div className="assistant-body" ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`assistant-msg ${m.role}`}>{m.text}</div>
          ))}

          {thinking && (
            <div className="assistant-msg bot">
              <span className="thinking-dots"><span /><span /><span /></span>
            </div>
          )}

          {/* Quick prompts */}
          <div className="suggest-row" style={{ marginTop: 14 }}>
            {quickPrompts.map((q) => (
              <button key={q} className="suggest-chip" onClick={() => send(q)}>
                {q}
              </button>
            ))}
          </div>

          {/* Section jumps (only when a city is open) */}
          {currentCity && (
            <>
              <div style={{
                fontFamily: 'var(--f-mono)', fontSize: 9,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#7a715f', margin: '18px 0 6px'
              }}>
                Jump in {currentCity.cityName}
              </div>
              <div className="jump-row">
                {jumps.map(([k, label]) => (
                  <button key={k}
                          className="jump-chip"
                          onClick={() => onJumpSection(k)}>
                    <span>{label.replace(' →', '')}</span>
                    <span className="arrow">→</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <form className="assistant-input"
              onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={currentCity ? `Ask about ${currentCity.cityName}…` : 'Where should I go next?'}
          />
          <button type="submit" disabled={!input.trim() || thinking}>Ask</button>
        </form>
      </div>
    </>
  );
}

window.Assistant = Assistant;
