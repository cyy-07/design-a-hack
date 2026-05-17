// TerraPulse — mock city atlas data
// 12 cities, each a self-contained "living entry" of a global travel map.

window.TERRA_CITIES = [
  {
    id: "tokyo",
    cityName: "Tokyo",
    countryName: "Japan",
    coordinates: [35.6762, 139.6503],
    region: "East Asia",
    shortDescription: "A vertical metropolis where neon alleys, quiet shrines, and 14-seat counter bars share the same five-minute walk.",
    visitorCount: "38.4M",
    trendScore: 94,
    bestSeason: "Mar – May",
    localTime: "+09:00",
    landmarks: [
      { name: "Senso-ji at Dusk", category: "Shrine", description: "Asakusa's lantern-lit gate; arrive 30 min before sunset for the empty courtyard.", rating: 4.8 },
      { name: "Shimokitazawa Backstreets", category: "Neighborhood", description: "Vintage shops, jazz cafés, and zero chain stores. Lose Google Maps on purpose.", rating: 4.7 },
      { name: "teamLab Planets", category: "Immersive", description: "Barefoot light installation. Book the first slot of the morning.", rating: 4.9 },
      { name: "Tsukiji Outer Market", category: "Food street", description: "Inner market moved — outer one still feeds 200,000 a day at dawn.", rating: 4.6 },
      { name: "Yanaka Cemetery walk", category: "Quiet", description: "Pre-war wooden houses, stray cats, the Tokyo nobody photographs.", rating: 4.7 }
    ],
    trending: [
      { tag: "kissaten revival", weight: 92, context: "Old-school cafés are the new third-wave coffee" },
      { tag: "natural wine bars", weight: 88 },
      { tag: "Yokohama day trip", weight: 76 },
      { tag: "depachika at 8pm", weight: 71, context: "Half-price bentos in the basement food halls" },
      { tag: "sento bathhouses", weight: 64 },
      { tag: "Showa-era arcades", weight: 58 }
    ],
    food: [
      { name: "Tonkatsu Maisen", category: "Tonkatsu", rating: 4.6, reviews: 12840, review: "Crackle that survives the walk home in the bento box." },
      { name: "Den", category: "Kaiseki", rating: 4.9, reviews: 980, review: "Two Michelin stars, zero formality — they bring you a salad shaped like the chef's garden." },
      { name: "Afuri Ramen", category: "Yuzu-shio ramen", rating: 4.5, reviews: 8210, review: "Citrus broth so clean it tastes like a deep breath." },
      { name: "Toraya Akasaka", category: "Wagashi", rating: 4.7, reviews: 2310, review: "A 500-year-old confectioner. Order the yokan, sit by the window, watch Roppongi." }
    ],
    weather: { now: 18, condition: "Clear", high: 22, low: 14, series: [14, 13, 14, 16, 19, 22, 21, 19, 17, 16, 15, 14] },
    forecast: [
      { day: "Mon", hi: 22, lo: 14, glyph: "sun" },
      { day: "Tue", hi: 24, lo: 15, glyph: "sun" },
      { day: "Wed", hi: 21, lo: 16, glyph: "cloud" },
      { day: "Thu", hi: 19, lo: 14, glyph: "rain" },
      { day: "Fri", hi: 22, lo: 13, glyph: "sun" }
    ],
    community: [
      { author: "Mei R.", initials: "MR", snippet: "Walked from Yanaka to Nezu shrine at 6am. Not a single tourist. Found a 90-year-old soba shop with a queue of three.", timestamp: "2h ago", reactions: 412 },
      { author: "Daniel K.", initials: "DK", snippet: "Tip: skip Shibuya crossing, ride Yurikamome line at night instead. It's a 30-minute floating city tour for ¥380.", timestamp: "5h ago", reactions: 287 },
      { author: "Priya S.", initials: "PS", snippet: "The depachika at Isetan after 8pm is the best food court in the world and somehow nobody talks about it.", timestamp: "1d ago", reactions: 1124 }
    ]
  },

  {
    id: "lisbon",
    cityName: "Lisbon",
    countryName: "Portugal",
    coordinates: [38.7223, -9.1393],
    region: "Iberia",
    shortDescription: "Seven hills, yellow trams, and a light so flat and warm photographers keep moving here and never leaving.",
    visitorCount: "7.1M",
    trendScore: 88,
    bestSeason: "Apr – Jun",
    localTime: "+00:00",
    landmarks: [
      { name: "Miradouro da Senhora do Monte", category: "Viewpoint", description: "The highest free viewpoint. Bring a bottle, watch the river turn pink.", rating: 4.8 },
      { name: "Tram 28, Graça to Estrela", category: "Transit ride", description: "The whole-city tour for €3. Board at the back, away from the cruise crowd.", rating: 4.5 },
      { name: "LX Factory", category: "Creative district", description: "Old industrial complex turned bookshops, ramen bars, rooftop gigs.", rating: 4.6 },
      { name: "Belém Tower at low tide", category: "Monument", description: "Walk out on the exposed rocks for a 16th-century photo nobody else has.", rating: 4.7 }
    ],
    trending: [
      { tag: "natural wine in Marvila", weight: 90 },
      { tag: "pastéis de nata pilgrimage", weight: 85, context: "Manteigaria is winning the Belém vs Manteigaria war" },
      { tag: "Sintra by motorbike", weight: 72 },
      { tag: "ginjinha in chocolate cups", weight: 67 },
      { tag: "Comporta weekend", weight: 61 }
    ],
    food: [
      { name: "Cervejaria Ramiro", category: "Seafood", rating: 4.7, reviews: 18900, review: "Order the prego sandwich for dessert. Trust the line." },
      { name: "Taberna da Rua das Flores", category: "Petiscos", rating: 4.8, reviews: 3200, review: "No menu. They tell you what's good. You eat it. You leave happy." },
      { name: "Manteigaria", category: "Pastéis de nata", rating: 4.8, reviews: 22100, review: "Watch them shape them through the window. €1.30. Eat two." },
      { name: "Prado", category: "New Portuguese", rating: 4.7, reviews: 2840, review: "Everything from within 200km of Lisbon. The bread alone is worth booking." }
    ],
    weather: { now: 21, condition: "Sunny", high: 24, low: 16, series: [16, 15, 16, 18, 21, 24, 24, 23, 21, 19, 17, 16] },
    forecast: [
      { day: "Mon", hi: 24, lo: 16, glyph: "sun" },
      { day: "Tue", hi: 25, lo: 17, glyph: "sun" },
      { day: "Wed", hi: 23, lo: 16, glyph: "sun" },
      { day: "Thu", hi: 21, lo: 15, glyph: "cloud" },
      { day: "Fri", hi: 24, lo: 16, glyph: "sun" }
    ],
    community: [
      { author: "Alex T.", initials: "AT", snippet: "Worked from a café in Príncipe Real for a month. The owner remembers your order on day two and your dog's name by day five.", timestamp: "1h ago", reactions: 521 },
      { author: "Sofia M.", initials: "SM", snippet: "If you only have one day: walk Alfama at sunrise, eat at Taberna da Rua das Flores at lunch, tram 28 at dusk. That's it.", timestamp: "8h ago", reactions: 1840 },
      { author: "Marcus L.", initials: "ML", snippet: "Surfed Costa da Caparica in the morning, was eating bacalhau in Bairro Alto by 2pm. The geography here is unfair.", timestamp: "2d ago", reactions: 612 }
    ]
  },

  {
    id: "marrakech",
    cityName: "Marrakech",
    countryName: "Morocco",
    coordinates: [31.6295, -7.9811],
    region: "North Africa",
    shortDescription: "Ochre walls, twelve kinds of tagine, and a square that turns into a city-sized open kitchen at dusk.",
    visitorCount: "3.2M",
    trendScore: 82,
    bestSeason: "Oct – Apr",
    localTime: "+01:00",
    landmarks: [
      { name: "Jardin Majorelle", category: "Garden", description: "Cobalt walls, bamboo grove, YSL's resting place. Go at opening or skip it.", rating: 4.6 },
      { name: "Jemaa el-Fnaa after sunset", category: "Square", description: "Snake charmers leave, food stalls arrive, storytellers stay all night.", rating: 4.7 },
      { name: "Ben Youssef Madrasa", category: "Architecture", description: "Sixteenth-century courtyard. Best at 11am when the light hits the zellige.", rating: 4.8 },
      { name: "Atlas Mountains day trip", category: "Excursion", description: "Imlil village, Berber lunch, snow on the peaks. Two hours from chaos to silence.", rating: 4.9 }
    ],
    trending: [
      { tag: "riad slow stays", weight: 86 },
      { tag: "hammam etiquette", weight: 78, context: "Locals-only baths in the Mellah are unbeatable" },
      { tag: "Ourika valley hike", weight: 71 },
      { tag: "concept stores in Gueliz", weight: 64 },
      { tag: "Berber rugs sourcing", weight: 59 }
    ],
    food: [
      { name: "Le Jardin", category: "Moroccan", rating: 4.6, reviews: 9200, review: "Tiled courtyard, slow lunch, mint tea poured from a meter up." },
      { name: "Nomad", category: "Modern Moroccan", rating: 4.7, reviews: 6100, review: "Rooftop in the medina. Spicy beef sliders and that view." },
      { name: "Café Clock", category: "Café / storytelling", rating: 4.5, reviews: 3400, review: "Camel burger if you must. Stay for Thursday-night storytellers." },
      { name: "Mechoui Alley", category: "Lamb pit", rating: 4.4, reviews: 880, review: "Five stalls, one menu: salt-rubbed lamb pulled from underground ovens." }
    ],
    weather: { now: 27, condition: "Sunny", high: 31, low: 14, series: [14, 14, 15, 19, 24, 28, 30, 31, 28, 23, 18, 15] },
    forecast: [
      { day: "Mon", hi: 31, lo: 14, glyph: "sun" },
      { day: "Tue", hi: 32, lo: 15, glyph: "sun" },
      { day: "Wed", hi: 30, lo: 14, glyph: "sun" },
      { day: "Thu", hi: 29, lo: 13, glyph: "sun" },
      { day: "Fri", hi: 31, lo: 14, glyph: "sun" }
    ],
    community: [
      { author: "Nadia H.", initials: "NH", snippet: "Got hopelessly lost in the souks. A spice seller walked me 15 minutes back to my riad. Wouldn't take a tip.", timestamp: "3h ago", reactions: 720 },
      { author: "Oliver B.", initials: "OB", snippet: "Tip: stay inside the medina, not outside it. Waking up to the call to prayer beats waking up to a hotel buffet.", timestamp: "1d ago", reactions: 950 },
      { author: "Yuki F.", initials: "YF", snippet: "The light here at 5pm is the reason every Moroccan film looks like that. It's not the grade.", timestamp: "3d ago", reactions: 418 }
    ]
  },

  {
    id: "reykjavik",
    cityName: "Reykjavík",
    countryName: "Iceland",
    coordinates: [64.1466, -21.9426],
    region: "North Atlantic",
    shortDescription: "A capital the size of a town, perched between volcanoes and the open ocean, where every street ends in a view.",
    visitorCount: "2.4M",
    trendScore: 76,
    bestSeason: "Jun – Aug · Feb",
    localTime: "+00:00",
    landmarks: [
      { name: "Hallgrímskirkja tower", category: "Viewpoint", description: "Concrete basalt tower. The elevator up costs less than your coffee.", rating: 4.6 },
      { name: "Sky Lagoon, late night", category: "Geothermal", description: "Open until midnight. The 7-step ritual after a long day is unreal.", rating: 4.8 },
      { name: "Reykjanes peninsula drive", category: "Lava field", description: "Fresh lava from 2023. You can walk to the edge. Bring sturdy boots.", rating: 4.9 },
      { name: "Harpa concert hall", category: "Architecture", description: "Honeycomb glass facade. Free to wander; the acoustics make you whisper.", rating: 4.7 }
    ],
    trending: [
      { tag: "northern lights forecast", weight: 91, context: "Solar maximum through 2026 — best aurora cycle in 20 years" },
      { tag: "hot dog pilgrimage", weight: 74 },
      { tag: "glacial lagoon kayaking", weight: 69 },
      { tag: "Westfjords road trip", weight: 64 },
      { tag: "thermal river hike", weight: 60 }
    ],
    food: [
      { name: "Dill", category: "New Nordic", rating: 4.8, reviews: 1620, review: "Michelin-starred, but the chef will still come tell you what's on the plate." },
      { name: "Bæjarins Beztu Pylsur", category: "Hot dogs", rating: 4.5, reviews: 14200, review: "Ask for 'eina með öllu' — one with everything. It's a sentence and a meal." },
      { name: "Matur og Drykkur", category: "Modern Icelandic", rating: 4.7, reviews: 1980, review: "Cod's head you didn't know you wanted, served with surprising elegance." }
    ],
    weather: { now: 7, condition: "Overcast", high: 9, low: 3, series: [3, 2, 3, 4, 6, 8, 9, 9, 8, 6, 5, 4] },
    forecast: [
      { day: "Mon", hi: 9, lo: 3, glyph: "cloud" },
      { day: "Tue", hi: 8, lo: 2, glyph: "rain" },
      { day: "Wed", hi: 6, lo: 1, glyph: "rain" },
      { day: "Thu", hi: 7, lo: 2, glyph: "cloud" },
      { day: "Fri", hi: 9, lo: 4, glyph: "sun" }
    ],
    community: [
      { author: "Erik T.", initials: "ET", snippet: "Drove the ring road in 8 days. By day 3 you stop photographing waterfalls. There are too many.", timestamp: "12h ago", reactions: 880 },
      { author: "Lena B.", initials: "LB", snippet: "Booked a 2am hot dog after the lights show. The guy at the cart had a queue of 40 and remembered everyone's order.", timestamp: "2d ago", reactions: 645 }
    ]
  },

  {
    id: "bangkok",
    cityName: "Bangkok",
    countryName: "Thailand",
    coordinates: [13.7563, 100.5018],
    region: "Southeast Asia",
    shortDescription: "A city that runs on motion, mango sticky rice, and the gravitational pull of street food carts after dark.",
    visitorCount: "22.8M",
    trendScore: 90,
    bestSeason: "Nov – Feb",
    localTime: "+07:00",
    landmarks: [
      { name: "Wat Arun at blue hour", category: "Temple", description: "Cross by ferry from Tha Tien. Climb the steep steps before the lights come on.", rating: 4.8 },
      { name: "Chatuchak weekend market", category: "Market", description: "15,000 stalls. Start at section 26 (vintage) and work outward.", rating: 4.6 },
      { name: "Khlong canal long-tail boat", category: "Boat tour", description: "Old Bangkok lives behind these wooden houses on stilts. Negotiate before you board.", rating: 4.7 },
      { name: "Jim Thompson House", category: "Museum", description: "The silk king's compound. Six teak houses, one mystery disappearance.", rating: 4.6 }
    ],
    trending: [
      { tag: "Michelin street food", weight: 95, context: "Jay Fai is the first hawker stall to keep her star for 7 years" },
      { tag: "café crawl Ari district", weight: 82 },
      { tag: "Talad Noi street art", weight: 71 },
      { tag: "muay thai at Rajadamnern", weight: 68 },
      { tag: "rooftop hopping Sukhumvit", weight: 64 }
    ],
    food: [
      { name: "Jay Fai", category: "Crab omelette", rating: 4.8, reviews: 6400, review: "Goggles, charcoal woks, a queue at 9am. The omelette is the size of your forearm." },
      { name: "Polo Fried Chicken", category: "Isaan", rating: 4.7, reviews: 9100, review: "Garlic the size of cherries, chicken with crackling skin. Bring tissues." },
      { name: "Err", category: "Modern Thai", rating: 4.7, reviews: 2200, review: "Old-Bangkok recipes, natural wine, the chef's mom's chili paste in the cabinet." },
      { name: "Thip Samai", category: "Pad thai", rating: 4.6, reviews: 18400, review: "Open since 1966. The 'wrapped in egg' version is the only one that matters." }
    ],
    weather: { now: 33, condition: "Humid", high: 35, low: 26, series: [26, 26, 27, 30, 33, 35, 34, 33, 31, 29, 28, 27] },
    forecast: [
      { day: "Mon", hi: 35, lo: 26, glyph: "sun" },
      { day: "Tue", hi: 34, lo: 26, glyph: "cloud" },
      { day: "Wed", hi: 33, lo: 25, glyph: "rain" },
      { day: "Thu", hi: 34, lo: 26, glyph: "sun" },
      { day: "Fri", hi: 35, lo: 27, glyph: "sun" }
    ],
    community: [
      { author: "Nat P.", initials: "NP", snippet: "Did a 6-hour food tour with @bkkbites. Ate at 11 places. Spent $22. I have never been so happy.", timestamp: "4h ago", reactions: 1210 },
      { author: "Ravi M.", initials: "RM", snippet: "Don't take the tuktuk to the grand palace. Take the metro to Sanam Chai, walk 4 minutes. You'll thank me.", timestamp: "1d ago", reactions: 840 }
    ]
  },

  {
    id: "newyork",
    cityName: "New York",
    countryName: "United States",
    coordinates: [40.7128, -74.006],
    region: "Northeast US",
    shortDescription: "Five boroughs, eight million negotiations a day, and a bagel argument you will never settle.",
    visitorCount: "61.8M",
    trendScore: 96,
    bestSeason: "Sep – Oct · Apr – May",
    localTime: "−05:00",
    landmarks: [
      { name: "The High Line, 14th to Hudson Yards", category: "Park", description: "Walk it north at golden hour. Skip the south end — it's been ruined by cruise crowds.", rating: 4.6 },
      { name: "Greenwood Cemetery", category: "Quiet", description: "478 acres in Brooklyn, parrots in the trees, Bernstein's grave, almost no one.", rating: 4.8 },
      { name: "Storm King Art Center", category: "Day trip", description: "500 acres of sculpture, 90 minutes from Penn. Rent a bike on arrival.", rating: 4.9 },
      { name: "Roosevelt Island tram", category: "Skyline view", description: "$2.90, four minutes, the cheapest helicopter ride in town.", rating: 4.5 }
    ],
    trending: [
      { tag: "Brooklyn natural wine", weight: 93 },
      { tag: "Korean BBQ on 32nd", weight: 86 },
      { tag: "small Broadway revivals", weight: 78 },
      { tag: "Lower East Side gallery hop", weight: 71 },
      { tag: "Rockaway surf weekend", weight: 64 }
    ],
    food: [
      { name: "Russ & Daughters Café", category: "Appetizing", rating: 4.7, reviews: 14800, review: "Sit at the counter. Order the Super Heebster. Don't bring a date — you'll only have eyes for the sturgeon." },
      { name: "Llama Inn", category: "Peruvian", rating: 4.7, reviews: 4100, review: "Williamsburg. The pisco sours stack up. So does the bill. Worth it." },
      { name: "Joe's Pizza, Carmine St", category: "Slice", rating: 4.6, reviews: 22300, review: "$3.75. Standing. Folded. That's the assignment." },
      { name: "Atomix", category: "Korean tasting", rating: 4.9, reviews: 980, review: "World's 50 Best for a reason. Reserve 6 weeks out." }
    ],
    weather: { now: 14, condition: "Crisp", high: 17, low: 8, series: [8, 7, 8, 10, 13, 16, 17, 16, 14, 12, 10, 9] },
    forecast: [
      { day: "Mon", hi: 17, lo: 8, glyph: "sun" },
      { day: "Tue", hi: 18, lo: 9, glyph: "sun" },
      { day: "Wed", hi: 15, lo: 10, glyph: "cloud" },
      { day: "Thu", hi: 14, lo: 9, glyph: "rain" },
      { day: "Fri", hi: 16, lo: 8, glyph: "sun" }
    ],
    community: [
      { author: "Jordan K.", initials: "JK", snippet: "Walked from Inwood to Battery in one Saturday. 13 miles, 4 boroughs of food, 1 blister. The greatest walk in America.", timestamp: "6h ago", reactions: 2340 },
      { author: "Hana C.", initials: "HC", snippet: "Met my favorite author at the Strand basement. He recommended a book. I bought it. He signed it. Tuesday afternoon.", timestamp: "2d ago", reactions: 1480 }
    ]
  },

  {
    id: "capetown",
    cityName: "Cape Town",
    countryName: "South Africa",
    coordinates: [-33.9249, 18.4241],
    region: "Southern Africa",
    shortDescription: "Where a flat-topped mountain falls into two oceans, and Sunday afternoons happen on a vineyard, a beach, or both.",
    visitorCount: "5.8M",
    trendScore: 84,
    bestSeason: "Nov – Mar",
    localTime: "+02:00",
    landmarks: [
      { name: "Table Mountain, Platteklip Gorge", category: "Hike", description: "Two-hour climb, panoramic top. Start at 6am to beat the sun and the cable-car queue.", rating: 4.9 },
      { name: "Kalk Bay harbour", category: "Seaside town", description: "Working fishing harbour, 12 cafés, three excellent bookshops, one resident seal.", rating: 4.7 },
      { name: "Constantia wine route", category: "Wine country", description: "Oldest vineyards in the southern hemisphere, 20 minutes from the city centre.", rating: 4.8 },
      { name: "Bo-Kaap streets", category: "Neighborhood", description: "Pastel houses, Cape Malay history. Eat samoosas. Don't pose for photos in people's doorways.", rating: 4.5 }
    ],
    trending: [
      { tag: "shark cage controversy", weight: 78 },
      { tag: "Stellenbosch tasting day", weight: 86 },
      { tag: "Sea Point promenade run", weight: 71 },
      { tag: "Cape Point penguin walk", weight: 67 },
      { tag: "Woodstock First Thursdays", weight: 64 }
    ],
    food: [
      { name: "FYN", category: "Japanese-South African", rating: 4.9, reviews: 1840, review: "Floor-to-ceiling glass, Table Mountain framed, world's 50 best. The koji prawns are unforgettable." },
      { name: "Kloof Street House", category: "Bistro", rating: 4.6, reviews: 8400, review: "Victorian house, fairy lights, a wine list that knows what it's doing." },
      { name: "Mariam's Kitchen", category: "Cape Malay", rating: 4.7, reviews: 2100, review: "Bo-Kaap home cooking. The bobotie is the one." }
    ],
    weather: { now: 22, condition: "Breezy", high: 26, low: 17, series: [17, 16, 17, 19, 22, 25, 26, 25, 23, 21, 19, 18] },
    forecast: [
      { day: "Mon", hi: 26, lo: 17, glyph: "sun" },
      { day: "Tue", hi: 28, lo: 18, glyph: "sun" },
      { day: "Wed", hi: 25, lo: 18, glyph: "cloud" },
      { day: "Thu", hi: 23, lo: 17, glyph: "cloud" },
      { day: "Fri", hi: 26, lo: 17, glyph: "sun" }
    ],
    community: [
      { author: "Sipho M.", initials: "SM", snippet: "Took the early hike up Lion's Head for the full moon. There were 200 of us at the top, all silent.", timestamp: "8h ago", reactions: 1640 },
      { author: "Tess J.", initials: "TJ", snippet: "Surfed Muizenberg at sunrise, oysters in Kalk Bay for lunch, vineyard sundowner by 6pm. South African Sundays are unfair.", timestamp: "3d ago", reactions: 980 }
    ]
  },

  {
    id: "istanbul",
    cityName: "Istanbul",
    countryName: "Türkiye",
    coordinates: [41.0082, 28.9784],
    region: "Western Asia / SE Europe",
    shortDescription: "Two continents, one ferry ride, and a breakfast that takes three hours and several centuries to arrive.",
    visitorCount: "17.5M",
    trendScore: 89,
    bestSeason: "Apr – May · Sep – Oct",
    localTime: "+03:00",
    landmarks: [
      { name: "Süleymaniye Mosque", category: "Mosque", description: "Quieter than the Blue Mosque, built by Sinan, the city's best terrace view from its garden.", rating: 4.9 },
      { name: "Kadıköy market & ferry back", category: "Asian side", description: "Cross at 4pm, eat fish at the market, ferry back at sunset with çay in hand.", rating: 4.8 },
      { name: "Basilica Cistern", category: "Underground", description: "336 columns, two Medusa heads, classical music playing in the dark.", rating: 4.6 },
      { name: "Pierre Loti hill cable car", category: "Viewpoint", description: "Golden Horn from above, then walk down through the cemetery.", rating: 4.5 }
    ],
    trending: [
      { tag: "Karaköy specialty coffee", weight: 84 },
      { tag: "Princes' Islands bike day", weight: 76 },
      { tag: "old-school baths in Çemberlitaş", weight: 73 },
      { tag: "Balat colorful houses", weight: 68 },
      { tag: "Bosphorus dinner cruises", weight: 62 }
    ],
    food: [
      { name: "Çiya Sofrası", category: "Anatolian", rating: 4.8, reviews: 5400, review: "200 regional dishes that rotate. Anchor of Kadıköy. Point at what you want." },
      { name: "Mikla", category: "New Anatolian", rating: 4.7, reviews: 1980, review: "Rooftop, Bosphorus on the horizon, dishes built around obscure Turkish farms." },
      { name: "Karaköy Lokantası", category: "Lokanta", rating: 4.7, reviews: 8200, review: "Turquoise tiles, lunch crowd of suits and tourists, fish stew that ruins all future fish stew." }
    ],
    weather: { now: 16, condition: "Mild", high: 19, low: 11, series: [11, 10, 11, 13, 16, 19, 18, 17, 15, 14, 12, 11] },
    forecast: [
      { day: "Mon", hi: 19, lo: 11, glyph: "sun" },
      { day: "Tue", hi: 20, lo: 12, glyph: "sun" },
      { day: "Wed", hi: 17, lo: 11, glyph: "cloud" },
      { day: "Thu", hi: 16, lo: 10, glyph: "rain" },
      { day: "Fri", hi: 18, lo: 11, glyph: "cloud" }
    ],
    community: [
      { author: "Aylin D.", initials: "AD", snippet: "Crossed the Bosphorus 11 times in 5 days. The light at 6pm on the European side is unbeatable.", timestamp: "9h ago", reactions: 720 },
      { author: "Tom W.", initials: "TW", snippet: "Got invited to a stranger's family breakfast on the Asian side. Three hours, six teapots, twenty plates.", timestamp: "4d ago", reactions: 2110 }
    ]
  },

  {
    id: "buenosaires",
    cityName: "Buenos Aires",
    countryName: "Argentina",
    coordinates: [-34.6037, -58.3816],
    region: "South America",
    shortDescription: "Late-night steak, longer-night tango, and a coffee culture that politely insists you sit for two hours.",
    visitorCount: "6.3M",
    trendScore: 81,
    bestSeason: "Mar – May · Oct – Nov",
    localTime: "−03:00",
    landmarks: [
      { name: "Recoleta Cemetery", category: "Necropolis", description: "Marble mausoleums in 100 alleys. Evita is here. So are the cats.", rating: 4.7 },
      { name: "Palermo Soho streets", category: "Neighborhood", description: "Murals every block, cafés every corner. Wear walking shoes.", rating: 4.6 },
      { name: "Teatro Colón backstage tour", category: "Opera house", description: "World-class acoustics, behind-the-scenes catwalks, ten-language tours.", rating: 4.9 },
      { name: "San Telmo Sunday fair", category: "Market", description: "Two kilometres of antiques, tango on every corner, finish with empanadas.", rating: 4.7 }
    ],
    trending: [
      { tag: "milonga reopenings", weight: 82 },
      { tag: "specialty parrillas under 40", weight: 79 },
      { tag: "Tigre delta weekend", weight: 68 },
      { tag: "natural wine in Chacarita", weight: 66 },
      { tag: "secret cocktail bars", weight: 64 }
    ],
    food: [
      { name: "Don Julio", category: "Parrilla", rating: 4.8, reviews: 14200, review: "World's 50 Best parrilla. Order the ojo de bife. Reservation 30 days out." },
      { name: "El Preferido de Palermo", category: "Bodegón", rating: 4.7, reviews: 3400, review: "Reopened classic. The matambre is the move. Sit at the counter." },
      { name: "Anchoita", category: "Modern Argentine", rating: 4.8, reviews: 2100, review: "Open kitchen, blind cellar, the chef will pour you the wine himself." }
    ],
    weather: { now: 19, condition: "Pleasant", high: 22, low: 12, series: [12, 11, 12, 15, 18, 22, 21, 20, 17, 15, 13, 12] },
    forecast: [
      { day: "Mon", hi: 22, lo: 12, glyph: "sun" },
      { day: "Tue", hi: 24, lo: 14, glyph: "sun" },
      { day: "Wed", hi: 20, lo: 13, glyph: "cloud" },
      { day: "Thu", hi: 18, lo: 11, glyph: "rain" },
      { day: "Fri", hi: 21, lo: 12, glyph: "sun" }
    ],
    community: [
      { author: "Diego R.", initials: "DR", snippet: "Went to a milonga in San Telmo at midnight. Stayed until 4am. Didn't dance once. Best night of the trip.", timestamp: "1d ago", reactions: 1240 }
    ]
  },

  {
    id: "kyoto",
    cityName: "Kyoto",
    countryName: "Japan",
    coordinates: [35.0116, 135.7681],
    region: "East Asia",
    shortDescription: "A thousand temples, slow morning fog over the river, and a tea ceremony that is also a 400-year-old performance.",
    visitorCount: "5.2M",
    trendScore: 87,
    bestSeason: "Late Mar · Nov",
    localTime: "+09:00",
    landmarks: [
      { name: "Fushimi Inari before dawn", category: "Shrine", description: "10,000 torii gates. At 5am you have the whole mountain to yourself.", rating: 4.9 },
      { name: "Philosopher's Path", category: "Walk", description: "2km canal walk in spring, eight little temples branching off. Lose an afternoon here.", rating: 4.8 },
      { name: "Nishiki Market", category: "Market", description: "'Kyoto's kitchen' for 400 years. Buy yuba, dashi packets, tsukemono to take home.", rating: 4.6 },
      { name: "Daitoku-ji moss gardens", category: "Zen garden", description: "Sub-temples open in rotation. Take your shoes off, sit, do nothing for 30 minutes.", rating: 4.8 }
    ],
    trending: [
      { tag: "wagashi workshops", weight: 81 },
      { tag: "Arashiyama bamboo at sunrise", weight: 86 },
      { tag: "kaiseki under ¥10k", weight: 74 },
      { tag: "tea farm day trip", weight: 68 },
      { tag: "Gion machiya stays", weight: 71 }
    ],
    food: [
      { name: "Kichisen", category: "Kaiseki", rating: 4.9, reviews: 740, review: "Three Michelin stars. Lunch is half the cost of dinner and just as transcendent." },
      { name: "Ippodo Tea Honten", category: "Tea house", rating: 4.7, reviews: 2200, review: "Hand-whisked matcha in a 300-year-old shop. They'll teach you how at the counter." },
      { name: "Issen Yoshoku", category: "Okonomiyaki", rating: 4.5, reviews: 1900, review: "One dish since 1924. Eat with strangers at a long communal counter." }
    ],
    weather: { now: 17, condition: "Mild", high: 21, low: 11, series: [11, 10, 11, 13, 17, 20, 21, 19, 17, 15, 13, 12] },
    forecast: [
      { day: "Mon", hi: 21, lo: 11, glyph: "sun" },
      { day: "Tue", hi: 23, lo: 12, glyph: "sun" },
      { day: "Wed", hi: 20, lo: 13, glyph: "cloud" },
      { day: "Thu", hi: 18, lo: 11, glyph: "rain" },
      { day: "Fri", hi: 20, lo: 11, glyph: "sun" }
    ],
    community: [
      { author: "Yuki F.", initials: "YF", snippet: "Stayed in a machiya in Higashiyama. Walking the lanes at 6am, hearing only the brooms — that's the real Kyoto.", timestamp: "5h ago", reactions: 1820 }
    ]
  },

  {
    id: "mexicocity",
    cityName: "Mexico City",
    countryName: "Mexico",
    coordinates: [19.4326, -99.1332],
    region: "North America",
    shortDescription: "Volcanoes on the horizon, mole on every corner, a city that turns out to be smarter and softer than its reputation.",
    visitorCount: "12.6M",
    trendScore: 92,
    bestSeason: "Oct – May",
    localTime: "−06:00",
    landmarks: [
      { name: "Frida Kahlo Casa Azul", category: "Museum", description: "Coyoacán. Buy timed tickets a week ahead. Stay for the garden.", rating: 4.7 },
      { name: "Chapultepec Bosque", category: "Park", description: "Twice the size of Central Park. Anthropology Museum is on the east side — the real one to see.", rating: 4.8 },
      { name: "Xochimilco trajineras", category: "Canal boats", description: "Float through floating gardens with a mariachi band that pulls alongside. Sunday only.", rating: 4.6 },
      { name: "Teotihuacán at dawn", category: "Day trip", description: "Climb the Pyramid of the Sun before the buses arrive. Hot-air balloon option above it.", rating: 4.9 }
    ],
    trending: [
      { tag: "Mexico's natural wine scene", weight: 88 },
      { tag: "Roma Norte coffee crawl", weight: 84 },
      { tag: "Oaxaca direct flights", weight: 76 },
      { tag: "mezcal bars under the radar", weight: 79 },
      { tag: "Lucha Libre Tuesday nights", weight: 68 }
    ],
    food: [
      { name: "Pujol", category: "Mexican tasting", rating: 4.8, reviews: 4200, review: "1,800-day mole. World's 50 Best. Book 60 days out, it's not optional." },
      { name: "Contramar", category: "Seafood", rating: 4.7, reviews: 9100, review: "Lunch institution. Order the half-half tuna tostadas. Negroni first." },
      { name: "El Turix", category: "Cochinita pibil", rating: 4.7, reviews: 3400, review: "Yucatecan pork on plastic plates. Five tacos, two beers, $6." },
      { name: "Rosetta", category: "Italian-Mexican", rating: 4.8, reviews: 2900, review: "Pre-revolution mansion. The guava-rosemary roll alone is a reason to fly here." }
    ],
    weather: { now: 21, condition: "Mild", high: 24, low: 12, series: [12, 11, 13, 17, 21, 23, 24, 23, 22, 19, 16, 14] },
    forecast: [
      { day: "Mon", hi: 24, lo: 12, glyph: "sun" },
      { day: "Tue", hi: 25, lo: 13, glyph: "sun" },
      { day: "Wed", hi: 23, lo: 13, glyph: "cloud" },
      { day: "Thu", hi: 22, lo: 12, glyph: "rain" },
      { day: "Fri", hi: 24, lo: 12, glyph: "sun" }
    ],
    community: [
      { author: "Camila V.", initials: "CV", snippet: "CDMX broke the 'is it safe?' question for me by simply being one of the friendliest cities on earth.", timestamp: "1d ago", reactions: 3120 }
    ]
  },

  {
    id: "copenhagen",
    cityName: "Copenhagen",
    countryName: "Denmark",
    coordinates: [55.6761, 12.5683],
    region: "Scandinavia",
    shortDescription: "A city designed around bicycles, daylight, and the radical idea that a chair should last forty years.",
    visitorCount: "10.4M",
    trendScore: 83,
    bestSeason: "May – Aug",
    localTime: "+01:00",
    landmarks: [
      { name: "Refshaleøen island", category: "Creative district", description: "Reffen street food, Noma, La Banchina swim dock. Bike everywhere.", rating: 4.7 },
      { name: "Christiania", category: "Free town", description: "Self-governed since 1971. Walk the lakes, eat at Morgenstedet, no photos on Pusher Street.", rating: 4.5 },
      { name: "Designmuseum Danmark", category: "Design history", description: "Wegner, Jacobsen, Wanscher. The chair-only room rewires your idea of furniture.", rating: 4.8 },
      { name: "Amager Bakke ski slope roof", category: "Architecture", description: "Power plant by Bjarke Ingels. Walk, ski, or climb the 90m green wall.", rating: 4.7 }
    ],
    trending: [
      { tag: "harbor swims at Islands Brygge", weight: 88 },
      { tag: "Reffen street food", weight: 81 },
      { tag: "Malmö day train", weight: 72 },
      { tag: "Nørrebro brunch", weight: 79 },
      { tag: "vintage Wegner hunting", weight: 64 }
    ],
    food: [
      { name: "Hart Bageri", category: "Bakery", rating: 4.8, reviews: 4100, review: "Tartine alum. The Saturday cardamom buns sell out by 9am." },
      { name: "Apollo Bar", category: "Bistro", rating: 4.7, reviews: 3200, review: "Inside the Royal Academy. Lunch under chandeliers, dinner that surprises you." },
      { name: "Noma", category: "Tasting", rating: 4.9, reviews: 1200, review: "Vegetable / seafood / game season. Book 90 days out the moment it opens." }
    ],
    weather: { now: 12, condition: "Cool", high: 15, low: 6, series: [6, 5, 6, 8, 11, 14, 15, 14, 12, 10, 8, 7] },
    forecast: [
      { day: "Mon", hi: 15, lo: 6, glyph: "cloud" },
      { day: "Tue", hi: 16, lo: 7, glyph: "sun" },
      { day: "Wed", hi: 14, lo: 8, glyph: "rain" },
      { day: "Thu", hi: 13, lo: 7, glyph: "cloud" },
      { day: "Fri", hi: 15, lo: 6, glyph: "sun" }
    ],
    community: [
      { author: "Liv H.", initials: "LH", snippet: "Rented a bike for €8 a day, never touched a car for a week. Why does every city not work like this?", timestamp: "10h ago", reactions: 1640 }
    ]
  },

  {
    id: "seoul",
    cityName: "Seoul",
    countryName: "South Korea",
    coordinates: [37.5665, 126.9780],
    region: "East Asia",
    shortDescription: "Twenty-four-hour cafés, mountain temples a subway away, and a skyline that keeps rewriting itself.",
    visitorCount: "11.2M", trendScore: 91, bestSeason: "Apr · Oct", localTime: "+09:00",
    landmarks: [
      { name: "Bukchon Hanok Village", category: "Heritage", description: "600-year-old houses sandwiched between palaces. Walk at 7am.", rating: 4.7 },
      { name: "Bukhansan Baegundae peak", category: "Hike", description: "Granite summit. 3 hours up, panoramic city below.", rating: 4.9 },
      { name: "Ikseon-dong alleys", category: "Neighborhood", description: "Hanok rooftops, indie cafés, vintage shops — peak Seoul cool.", rating: 4.6 },
      { name: "Leeum Museum", category: "Art", description: "Three architects, one collection. Free Wednesdays.", rating: 4.8 }
    ],
    trending: [
      { tag: "Seongsu-dong concept stores", weight: 92, context: "K-fashion's pop-up district" },
      { tag: "naengmyeon season", weight: 84 },
      { tag: "Han River picnic kits", weight: 78 },
      { tag: "noraebang at 4am", weight: 70 }
    ],
    food: [
      { name: "Mingles", category: "Modern Korean", rating: 4.9, reviews: 2200, review: "Two Michelin stars, four-hour tasting, surprisingly playful." },
      { name: "Gwangjang Market", category: "Street food", rating: 4.6, reviews: 18200, review: "Bindaetteok and mayak gimbap. Eat standing. Pay cash." },
      { name: "Onjium", category: "Royal cuisine", rating: 4.7, reviews: 980, review: "Recreating Joseon palace dishes. Only 10 seats." }
    ],
    weather: { now: 17, condition: "Crisp", high: 21, low: 9, series: [9,8,9,11,15,19,21,20,17,14,12,10] },
    forecast: [
      { day: "Mon", hi: 21, lo: 9, glyph: "sun" }, { day: "Tue", hi: 23, lo: 10, glyph: "sun" },
      { day: "Wed", hi: 19, lo: 11, glyph: "cloud" }, { day: "Thu", hi: 17, lo: 9, glyph: "rain" },
      { day: "Fri", hi: 20, lo: 9, glyph: "sun" }
    ],
    community: [
      { author: "Min-jun K.", initials: "MK", snippet: "Took a 24h trip: dawn at Bukhansan, lunch in Mangwon, dinner in Itaewon, jjimjilbang sleep. Best day of my year.", timestamp: "6h ago", reactions: 1820 },
      { author: "Sara L.", initials: "SL", snippet: "Seoul taught me what a 'walkable city' really means. Every alley has a café you want to live in.", timestamp: "2d ago", reactions: 740 }
    ]
  },

  {
    id: "singapore",
    cityName: "Singapore",
    countryName: "Singapore",
    coordinates: [1.3521, 103.8198],
    region: "Southeast Asia",
    shortDescription: "A city-state that runs on hawker stalls, tropical rain, and an obsession with what comes next.",
    visitorCount: "13.6M", trendScore: 87, bestSeason: "Feb – Apr", localTime: "+08:00",
    landmarks: [
      { name: "Gardens by the Bay", category: "Botanical", description: "Supertree Grove light show at 7:45 & 8:45pm. Free, no booking.", rating: 4.8 },
      { name: "Tiong Bahru estate", category: "Neighborhood", description: "Art-deco walkups, indie bakeries, the city's quietest streets.", rating: 4.6 },
      { name: "MacRitchie TreeTop Walk", category: "Rainforest", description: "11km loop with monkeys. Start at 7am, finish before the heat.", rating: 4.7 },
      { name: "National Gallery rooftop", category: "Art + view", description: "Old courthouses turned museum. Aura Sky for sundown.", rating: 4.7 }
    ],
    trending: [
      { tag: "Michelin hawker stalls", weight: 90, context: "Hawker Chan, Liao Fan, all under $5" },
      { tag: "Pulau Ubin day trip", weight: 71 },
      { tag: "third-wave kopi", weight: 76 },
      { tag: "Joo Chiat shophouses", weight: 68 }
    ],
    food: [
      { name: "Burnt Ends", category: "Modern Australian", rating: 4.7, reviews: 3200, review: "Wood-fired everything. The pulled pork sanger ruins all sandwiches." },
      { name: "Maxwell Hawker Centre", category: "Hawker", rating: 4.6, reviews: 12400, review: "Tian Tian chicken rice. The line is the assignment." },
      { name: "Odette", category: "French tasting", rating: 4.9, reviews: 1240, review: "Three Michelin, world's 50 Best. The langoustine alone is a milestone." }
    ],
    weather: { now: 29, condition: "Tropical", high: 32, low: 25, series: [25,25,26,28,30,32,32,31,30,28,27,26] },
    forecast: [
      { day: "Mon", hi: 32, lo: 25, glyph: "sun" }, { day: "Tue", hi: 31, lo: 26, glyph: "rain" },
      { day: "Wed", hi: 30, lo: 25, glyph: "rain" }, { day: "Thu", hi: 32, lo: 25, glyph: "sun" },
      { day: "Fri", hi: 31, lo: 26, glyph: "sun" }
    ],
    community: [
      { author: "Wei C.", initials: "WC", snippet: "Spent a Sunday eating my way down Joo Chiat road. 9 stops, 1 nap on the MRT, 0 regrets.", timestamp: "12h ago", reactions: 920 }
    ]
  },

  {
    id: "sydney",
    cityName: "Sydney",
    countryName: "Australia",
    coordinates: [-33.8688, 151.2093],
    region: "Oceania",
    shortDescription: "Harbour beaches, coastal walks, and a coffee scene that quietly out-snobs Milan.",
    visitorCount: "9.8M", trendScore: 85, bestSeason: "Sep – Nov · Mar – May", localTime: "+11:00",
    landmarks: [
      { name: "Bondi to Coogee coast walk", category: "Walk", description: "6km of cliffs, ocean pools, gelato. Best at 5pm.", rating: 4.9 },
      { name: "Inner West pub crawl", category: "Nightlife", description: "Newtown to Marrickville, schooner by schooner.", rating: 4.6 },
      { name: "Royal Botanic Garden", category: "Garden", description: "Lawns under the Opera House. Free yoga at 7am Sundays.", rating: 4.7 },
      { name: "Cockatoo Island", category: "Island", description: "Convict ruins + shipyards on a ferry-only island. Camp overnight.", rating: 4.5 }
    ],
    trending: [
      { tag: "winter Vivid festival", weight: 84 },
      { tag: "Bondi Icebergs swim", weight: 79 },
      { tag: "Marrickville natural wine", weight: 75 },
      { tag: "Manly ferry sunset", weight: 71 }
    ],
    food: [
      { name: "Sean's Bondi", category: "Coastal", rating: 4.8, reviews: 1800, review: "A 90s-style fish café that just keeps getting better." },
      { name: "Bourke Street Bakery", category: "Bakery", rating: 4.7, reviews: 9200, review: "Sausage roll. Ginger brûlée tart. That's the order." },
      { name: "Quay", category: "Tasting", rating: 4.9, reviews: 2100, review: "Snow egg dessert is on the cultural register. Book 60 days out." }
    ],
    weather: { now: 22, condition: "Sunny", high: 25, low: 16, series: [16,15,17,19,22,25,24,23,21,19,18,17] },
    forecast: [
      { day: "Mon", hi: 25, lo: 16, glyph: "sun" }, { day: "Tue", hi: 26, lo: 17, glyph: "sun" },
      { day: "Wed", hi: 24, lo: 17, glyph: "cloud" }, { day: "Thu", hi: 22, lo: 16, glyph: "cloud" },
      { day: "Fri", hi: 25, lo: 16, glyph: "sun" }
    ],
    community: [
      { author: "Hannah B.", initials: "HB", snippet: "Did the Bondi-to-Coogee walk at sunrise instead of sunset. Got the place to myself and an ocean swim at the end.", timestamp: "1d ago", reactions: 1140 }
    ]
  },

  {
    id: "berlin",
    cityName: "Berlin",
    countryName: "Germany",
    coordinates: [52.5200, 13.4050],
    region: "Central Europe",
    shortDescription: "Bauhaus on one corner, techno club on the next, currywurst at 4am — the city refuses to be polished.",
    visitorCount: "13.9M", trendScore: 86, bestSeason: "May – Sep", localTime: "+01:00",
    landmarks: [
      { name: "Tempelhof Field", category: "Park", description: "Decommissioned airport runways turned park. Kite, skate, picnic.", rating: 4.7 },
      { name: "Museum Island Pergamon", category: "Museum", description: "Gates from Babylon, indoors. Closed for renovation 2026 — see soon.", rating: 4.7 },
      { name: "Spree boat tour", category: "River", description: "Mitte from the water. Beats the bus by every metric.", rating: 4.5 },
      { name: "Berghain front door", category: "Club", description: "May or may not let you in. The walk back at noon is the real story.", rating: 4.4 }
    ],
    trending: [
      { tag: "Späti Friday nights", weight: 83 },
      { tag: "Treptower Park flea market", weight: 76 },
      { tag: "Markthalle Neun Streetfood Thursday", weight: 81 },
      { tag: "Wannsee swim Sundays", weight: 69 }
    ],
    food: [
      { name: "Mustafa's Gemüse Kebap", category: "Kebab", rating: 4.6, reviews: 18400, review: "30-minute line. €5 box. Worth every minute, possibly." },
      { name: "Nobelhart & Schmutzig", category: "New German", rating: 4.7, reviews: 1080, review: "10 courses, only ingredients from Berlin's hinterland. Strict." },
      { name: "Curry 36", category: "Currywurst", rating: 4.5, reviews: 9800, review: "Standing-room only. The mit darm version is the one." }
    ],
    weather: { now: 11, condition: "Cool", high: 14, low: 5, series: [5,4,6,8,11,13,14,13,11,9,8,6] },
    forecast: [
      { day: "Mon", hi: 14, lo: 5, glyph: "cloud" }, { day: "Tue", hi: 15, lo: 6, glyph: "sun" },
      { day: "Wed", hi: 12, lo: 6, glyph: "rain" }, { day: "Thu", hi: 11, lo: 5, glyph: "rain" },
      { day: "Fri", hi: 14, lo: 5, glyph: "cloud" }
    ],
    community: [
      { author: "Lukas W.", initials: "LW", snippet: "Berlin's only constant is the construction. Six months away and the entire skyline of Mitte has changed again.", timestamp: "2d ago", reactions: 540 }
    ]
  },

  {
    id: "rio",
    cityName: "Rio de Janeiro",
    countryName: "Brazil",
    coordinates: [-22.9068, -43.1729],
    region: "South America",
    shortDescription: "Mountains crashing into sea, samba leaking out of every bar, and a beach culture that runs the city.",
    visitorCount: "6.8M", trendScore: 84, bestSeason: "May – Oct", localTime: "−03:00",
    landmarks: [
      { name: "Pedra Bonita hike", category: "Hike + view", description: "Easier than Sugarloaf, twice the view. Hang gliders launch from the summit.", rating: 4.9 },
      { name: "Lapa Steps", category: "Art", description: "Escadaria Selarón — 2,000 mosaic tiles, one obsessed artist.", rating: 4.6 },
      { name: "Ipanema sunset at Arpoador", category: "Beach", description: "Locals applaud as the sun drops. They mean it.", rating: 4.8 },
      { name: "Santa Teresa tram", category: "Neighborhood", description: "Cobbled hills, faded mansions, samba bars at 9pm.", rating: 4.7 }
    ],
    trending: [
      { tag: "Carnaval bloco calendar", weight: 88 },
      { tag: "Vista Chinesa drive", weight: 73 },
      { tag: "Lapa Friday parties", weight: 81 },
      { tag: "Niterói boat ferry", weight: 68 }
    ],
    food: [
      { name: "Aprazível", category: "Brazilian", rating: 4.7, reviews: 3200, review: "Tree-house tables, Santa Teresa breeze, the moqueca is the move." },
      { name: "Confeitaria Colombo", category: "Café", rating: 4.6, reviews: 5400, review: "Belle-époque mirrors, century-old pastries, mid-morning crowd of locals." },
      { name: "Bar do Mineiro", category: "Boteco", rating: 4.5, reviews: 2400, review: "Feijoada on Saturdays. Caipirinha on every day." }
    ],
    weather: { now: 26, condition: "Warm", high: 28, low: 21, series: [21,20,22,24,26,28,27,26,24,23,22,21] },
    forecast: [
      { day: "Mon", hi: 28, lo: 21, glyph: "sun" }, { day: "Tue", hi: 29, lo: 22, glyph: "sun" },
      { day: "Wed", hi: 27, lo: 22, glyph: "rain" }, { day: "Thu", hi: 26, lo: 21, glyph: "cloud" },
      { day: "Fri", hi: 28, lo: 21, glyph: "sun" }
    ],
    community: [
      { author: "Camila S.", initials: "CS", snippet: "Stayed in Santa Teresa, not Copacabana. Best decision. Walked down to the beach via Lapa each morning.", timestamp: "8h ago", reactions: 820 }
    ]
  },

  {
    id: "dubai",
    cityName: "Dubai",
    countryName: "United Arab Emirates",
    coordinates: [25.2048, 55.2708],
    region: "Middle East",
    shortDescription: "A city that builds the future on weekends — desert at the edges, skyline of glass, and a souk that still bargains in gold.",
    visitorCount: "17.2M", trendScore: 89, bestSeason: "Nov – Mar", localTime: "+04:00",
    landmarks: [
      { name: "Al Fahidi historical district", category: "Heritage", description: "Wind-tower houses from the 1890s. Coffee at XVA art café, museum upstairs.", rating: 4.6 },
      { name: "Dubai Frame", category: "Architecture", description: "150m gold rectangle bridging old and new city. Best at sunrise.", rating: 4.5 },
      { name: "Desert dune-bashing + camp", category: "Day trip", description: "Skip the touristy ones; book Platinum Heritage for falconry + camel.", rating: 4.8 },
      { name: "Gold Souk", category: "Market", description: "Negotiate. 10 tonnes of gold on display. Look first, leave, return.", rating: 4.4 }
    ],
    trending: [
      { tag: "Hatta mountain weekends", weight: 79 },
      { tag: "Dubai design district pop-ups", weight: 77 },
      { tag: "Kite beach yoga", weight: 71 },
      { tag: "Tom Aikens at Modesto", weight: 74 }
    ],
    food: [
      { name: "Orfali Bros Bistro", category: "Levantine", rating: 4.8, reviews: 2400, review: "Three Syrian brothers. World's 50 Best. The wagyu manakeesh is unreal." },
      { name: "Al Ustad Special Kabab", category: "Iranian", rating: 4.6, reviews: 6400, review: "Hole-in-the-wall on Al Mussallah road. Five kinds of kebab, two of them perfect." },
      { name: "Pierchic", category: "Seafood", rating: 4.7, reviews: 3100, review: "Madinat Jumeirah pier. Sit at sunset, pretend you live there." }
    ],
    weather: { now: 34, condition: "Hot", high: 38, low: 26, series: [26,25,27,31,34,37,38,37,35,32,29,27] },
    forecast: [
      { day: "Mon", hi: 38, lo: 26, glyph: "sun" }, { day: "Tue", hi: 39, lo: 27, glyph: "sun" },
      { day: "Wed", hi: 37, lo: 26, glyph: "sun" }, { day: "Thu", hi: 36, lo: 25, glyph: "sun" },
      { day: "Fri", hi: 38, lo: 26, glyph: "sun" }
    ],
    community: [
      { author: "Aisha M.", initials: "AM", snippet: "Skipped the malls. Spent two days walking Al Seef and Al Fahidi instead. A completely different Dubai is hiding there.", timestamp: "5h ago", reactions: 920 }
    ]
  },

  {
    id: "mumbai",
    cityName: "Mumbai",
    countryName: "India",
    coordinates: [19.0760, 72.8777],
    region: "South Asia",
    shortDescription: "Twenty million stories an hour, a coastline that decides the day, and street food that earns Michelin shortlists.",
    visitorCount: "8.4M", trendScore: 83, bestSeason: "Nov – Feb", localTime: "+05:30",
    landmarks: [
      { name: "Banganga Tank", category: "Sacred", description: "1127 AD temple tank hidden in Malabar Hill. The quietest corner of the city.", rating: 4.7 },
      { name: "Sassoon Docks at dawn", category: "Market", description: "Fish-market chaos before sunrise. Take a wide lens.", rating: 4.6 },
      { name: "Kala Ghoda walking tour", category: "Art district", description: "Colonial buildings, indie bookshops, the country's best café-museum mix.", rating: 4.7 },
      { name: "Elephanta Caves boat", category: "Day trip", description: "1-hour ferry, 8th-century rock-cut temples. Pack lunch.", rating: 4.5 }
    ],
    trending: [
      { tag: "Bandra craft cocktails", weight: 82 },
      { tag: "Marine Drive 6am run", weight: 77 },
      { tag: "monsoon menu pop-ups", weight: 75 },
      { tag: "Worli Sea Link drive", weight: 70 }
    ],
    food: [
      { name: "Trishna", category: "Coastal Indian", rating: 4.7, reviews: 8400, review: "Butter-pepper-garlic crab is generational. Reserve early." },
      { name: "Bademiya", category: "Late-night kebabs", rating: 4.5, reviews: 11200, review: "Standing on the street outside Taj after midnight. The seekh roll. Always." },
      { name: "Bombay Canteen", category: "Modern Indian", rating: 4.8, reviews: 4200, review: "Regional Indian, rotating menu. Old-Bombay Eden in a converted mill." }
    ],
    weather: { now: 28, condition: "Humid", high: 31, low: 23, series: [23,22,24,26,28,31,31,30,28,26,25,24] },
    forecast: [
      { day: "Mon", hi: 31, lo: 23, glyph: "sun" }, { day: "Tue", hi: 32, lo: 24, glyph: "sun" },
      { day: "Wed", hi: 30, lo: 24, glyph: "cloud" }, { day: "Thu", hi: 29, lo: 23, glyph: "rain" },
      { day: "Fri", hi: 31, lo: 24, glyph: "sun" }
    ],
    community: [
      { author: "Rohan P.", initials: "RP", snippet: "Took the local train at 9am as a tourist. Survived. Got out at Dadar. The chai on the platform was the best of my life.", timestamp: "1d ago", reactions: 1840 }
    ]
  },

  {
    id: "edinburgh",
    cityName: "Edinburgh",
    countryName: "Scotland",
    coordinates: [55.9533, -3.1883],
    region: "British Isles",
    shortDescription: "Volcanic crags inside a capital, a 12th-century castle on the skyline, and pubs that close when you stop arguing.",
    visitorCount: "5.0M", trendScore: 79, bestSeason: "May – Sep", localTime: "+01:00",
    landmarks: [
      { name: "Arthur's Seat hike", category: "Hike", description: "Extinct volcano, 251m, an hour up. Sunrise climbs are quiet.", rating: 4.9 },
      { name: "Dean Village", category: "Village inside city", description: "Five-minute walk from Princes Street; feels 100 years away.", rating: 4.7 },
      { name: "Scottish National Gallery", category: "Art", description: "Free. Titians and a quiet café tucked into the rock.", rating: 4.7 },
      { name: "Royal Mile closes", category: "Heritage", description: "Skip the main drag, duck into the side closes — that's old Edinburgh.", rating: 4.6 }
    ],
    trending: [
      { tag: "Fringe Festival fringe", weight: 87, context: "The free shows are often the best ones" },
      { tag: "whisky tasting on the Royal Mile", weight: 74 },
      { tag: "South Queensferry day", weight: 68 }
    ],
    food: [
      { name: "Timberyard", category: "New Scottish", rating: 4.8, reviews: 1880, review: "Lichens, foraged everything, a converted timber yard. Quietly brilliant." },
      { name: "The Devil's Advocate", category: "Pub-bistro", rating: 4.6, reviews: 4100, review: "Old converted close, modern Scottish, the only menu you'll need." },
      { name: "Mary's Milk Bar", category: "Gelato", rating: 4.7, reviews: 2100, review: "Whisky-honey scoop. Queue down the Grassmarket." }
    ],
    weather: { now: 12, condition: "Drizzle", high: 14, low: 7, series: [7,6,7,9,11,13,14,13,11,10,8,7] },
    forecast: [
      { day: "Mon", hi: 14, lo: 7, glyph: "rain" }, { day: "Tue", hi: 13, lo: 7, glyph: "cloud" },
      { day: "Wed", hi: 15, lo: 8, glyph: "cloud" }, { day: "Thu", hi: 13, lo: 7, glyph: "rain" },
      { day: "Fri", hi: 14, lo: 6, glyph: "sun" }
    ],
    community: [
      { author: "Eilidh M.", initials: "EM", snippet: "Climbed Arthur's Seat for sunrise on my 30th. Five people, two dogs, one rainbow. Best birthday I've had.", timestamp: "3d ago", reactions: 1240 }
    ]
  },

  {
    id: "hanoi",
    cityName: "Hanoi",
    countryName: "Vietnam",
    coordinates: [21.0285, 105.8542],
    region: "Southeast Asia",
    shortDescription: "Five-thousand motorbikes, plastic stools on every corner, and a French-colonial bone structure under a thousand bowls of pho.",
    visitorCount: "5.8M", trendScore: 86, bestSeason: "Oct – Apr", localTime: "+07:00",
    landmarks: [
      { name: "Train Street", category: "Iconic", description: "Cafés inches from the tracks. Twice daily, the entire street holds its breath.", rating: 4.6 },
      { name: "Temple of Literature", category: "Heritage", description: "First university of Vietnam, 1070. Five courtyards, ancient stelae.", rating: 4.7 },
      { name: "West Lake sunset cycle", category: "Loop ride", description: "17km around. Stop at a bia hoi when you're done.", rating: 4.8 },
      { name: "Old Quarter at 6am", category: "Quarter", description: "Before the motorbikes wake up. The only time it's quiet.", rating: 4.7 }
    ],
    trending: [
      { tag: "egg coffee pilgrimages", weight: 88 },
      { tag: "Bat Trang pottery day", weight: 71 },
      { tag: "Hà Giang loop motorbike", weight: 84 },
      { tag: "bún chả Obama spot", weight: 73 }
    ],
    food: [
      { name: "Pho Gia Truyen", category: "Pho", rating: 4.7, reviews: 9400, review: "Family recipe since 1955. Open till sold out, usually 11am." },
      { name: "Bun Cha Huong Lien", category: "Bun cha", rating: 4.6, reviews: 8200, review: "The 'Obama set'. It is genuinely that good." },
      { name: "Cha Ca Thang Long", category: "Cha ca", rating: 4.5, reviews: 5800, review: "One dish, perfected. Turmeric fish, dill, peanuts, rice noodles." }
    ],
    weather: { now: 24, condition: "Mild", high: 27, low: 18, series: [18,17,18,21,24,27,26,25,23,21,20,19] },
    forecast: [
      { day: "Mon", hi: 27, lo: 18, glyph: "sun" }, { day: "Tue", hi: 28, lo: 19, glyph: "sun" },
      { day: "Wed", hi: 26, lo: 19, glyph: "cloud" }, { day: "Thu", hi: 24, lo: 18, glyph: "rain" },
      { day: "Fri", hi: 27, lo: 18, glyph: "sun" }
    ],
    community: [
      { author: "Linh T.", initials: "LT", snippet: "Crossed the street five times in Old Quarter without stopping. Locals laughed at me. Then they showed me how to do it slow.", timestamp: "10h ago", reactions: 1340 }
    ]
  },

  {
    id: "stockholm",
    cityName: "Stockholm",
    countryName: "Sweden",
    coordinates: [59.3293, 18.0686],
    region: "Scandinavia",
    shortDescription: "Fourteen islands stitched by bridges, ABBA in the soundtrack, and a coffee break — fika — built into the working day.",
    visitorCount: "7.1M", trendScore: 80, bestSeason: "Jun – Aug", localTime: "+01:00",
    landmarks: [
      { name: "Gamla Stan medieval streets", category: "Old town", description: "Cobbled, ochre-walled, photographed to death — still worth one slow loop.", rating: 4.7 },
      { name: "Fotografiska", category: "Photo museum", description: "Open till 11pm. Rooftop café with that harbor view.", rating: 4.8 },
      { name: "Archipelago boat to Vaxholm", category: "Day trip", description: "1 hour out, summer-house Sweden. Buy a strip card.", rating: 4.7 },
      { name: "Vasa Museum", category: "Museum", description: "17th-century warship intact. Sank on its maiden voyage. Stayed there for 333 years.", rating: 4.9 }
    ],
    trending: [
      { tag: "midsummer dancing", weight: 86 },
      { tag: "Söder vintage shops", weight: 78 },
      { tag: "bastu floating saunas", weight: 73 },
      { tag: "Djurgården picnic", weight: 70 }
    ],
    food: [
      { name: "Frantzén", category: "Tasting", rating: 4.9, reviews: 940, review: "Three Michelin stars. The bread course alone is a small life event." },
      { name: "Pelikan", category: "Husmanskost", rating: 4.6, reviews: 3400, review: "Old-Stockholm meatballs in a wood-panelled hall. Carlsberg, lingonberries, done." },
      { name: "Vete-Katten", category: "Konditori", rating: 4.7, reviews: 2800, review: "Princess cake. Fika institution since 1928." }
    ],
    weather: { now: 13, condition: "Crisp", high: 16, low: 6, series: [6,5,7,9,12,15,16,15,13,11,9,8] },
    forecast: [
      { day: "Mon", hi: 16, lo: 6, glyph: "sun" }, { day: "Tue", hi: 17, lo: 7, glyph: "sun" },
      { day: "Wed", hi: 14, lo: 8, glyph: "cloud" }, { day: "Thu", hi: 12, lo: 7, glyph: "rain" },
      { day: "Fri", hi: 15, lo: 6, glyph: "sun" }
    ],
    community: [
      { author: "Anna F.", initials: "AF", snippet: "Did fika three times in one day with three different friends. By the third I was vibrating, but somehow it counts as work-life balance here.", timestamp: "2d ago", reactions: 980 }
    ]
  }
];
