// TerraPulse — extra cities (30+)
// Compact entries that expand to full city objects. Same schema as data.js,
// but using small helpers to generate the weather series + 5-day forecast.

(function () {
  const series = (lo, hi) => {
    const mid = (lo + hi) / 2;
    return [lo, lo - 1, lo, lo + 2, mid - 1, mid + 1, hi, hi - 1, mid + 1, mid - 1, lo + 1, lo];
  };
  const fc = (hi, lo, glyphs = ['sun','sun','cloud','rain','sun']) => glyphs.map((g, i) => ({
    day: ['Mon','Tue','Wed','Thu','Fri'][i],
    hi: hi + [0, 1, -2, -1, 0][i],
    lo: lo + [0, 0, 1, -1, 0][i],
    glyph: g
  }));

  const cities = [
    // ===== EUROPE =====
    {
      id: 'rome', cityName: 'Rome', countryName: 'Italy',
      coordinates: [41.9028, 12.4964], region: 'Mediterranean',
      shortDescription: "Ancient ruins on every block, two-hour lunches, and a coffee bar culture you'll move home for.",
      visitorCount: '10.1M', trendScore: 92, bestSeason: 'Apr – Jun', localTime: '+01:00',
      landmarks: [
        { name: 'Pantheon at sunrise', category: 'Ancient', description: '7am is the only time it feels like a temple. No tickets.', rating: 4.9 },
        { name: 'Trastevere alleys', category: 'Neighborhood', description: 'Aperitivo, vine-strung walls, the only Rome without scooters.', rating: 4.7 },
        { name: 'Galleria Borghese', category: 'Museum', description: '2-hour timed slots. Bernini\'s marble that looks like skin.', rating: 4.9 },
        { name: 'Aventine Hill keyhole', category: 'View', description: 'St Peter\'s dome perfectly framed through an old gate. Free.', rating: 4.7 }
      ],
      trending: [
        { tag: 'cacio e pepe pilgrimage', weight: 91, context: 'Felice a Testaccio still wins' },
        { tag: 'EUR district modernism', weight: 76 },
        { tag: 'Roman thermal baths', weight: 70 },
        { tag: 'Sunday at Porta Portese flea', weight: 74 }
      ],
      food: [
        { name: 'Roscioli', category: 'Salumeria + dining', rating: 4.8, reviews: 6800, review: 'Carbonara of legend. The wine list reads like a love letter.' },
        { name: 'Pizzarium', category: 'Pizza al taglio', rating: 4.7, reviews: 9200, review: 'Bonci\'s slices by weight, you point, they cut. €5 lunch.' },
        { name: 'La Tavernaccia', category: 'Roman', rating: 4.6, reviews: 2100, review: 'Brick-oven everything. Order the porchetta and don\'t share.' }
      ],
      weatherT: { now: 22, condition: 'Sunny', hi: 25, lo: 13 },
      community: [
        { author: 'Marco F.', initials: 'MF', snippet: "Walked the Appian Way at 7am Sunday. Empty road, 2,000-year-old paving, herd of sheep crossing.", timestamp: '4h ago', reactions: 1120 }
      ]
    },

    {
      id: 'madrid', cityName: 'Madrid', countryName: 'Spain',
      coordinates: [40.4168, -3.7038], region: 'Iberia',
      shortDescription: "Dinner at 10, last drink at 4, sunlight that makes everyone look better. A city that refuses to slow down.",
      visitorCount: '11.3M', trendScore: 87, bestSeason: 'Apr – Jun · Sep – Oct', localTime: '+01:00',
      landmarks: [
        { name: 'Retiro park rowboats', category: 'Park', description: '€6 for 45 minutes. The locals\' summer afternoon.', rating: 4.7 },
        { name: 'Prado Goyas wing', category: 'Museum', description: 'Skip the Velázquez crowd; the black paintings are devastating.', rating: 4.9 },
        { name: 'Lavapiés tapas walk', category: 'Neighborhood', description: 'Ten plates, ten countries, in three blocks.', rating: 4.6 },
        { name: 'Mercado de San Miguel', category: 'Market', description: 'Glass-and-iron, packed by 8pm. Best vermouth pour in town.', rating: 4.5 }
      ],
      trending: [
        { tag: 'cocido madrileño revival', weight: 81 },
        { tag: 'rooftop verbenas', weight: 78 },
        { tag: 'Toledo day-train', weight: 72 },
        { tag: 'Malasaña record stores', weight: 70 }
      ],
      food: [
        { name: 'Casa Botín', category: 'Castilian', rating: 4.5, reviews: 11200, review: 'Oldest restaurant in the world per Guinness. Cochinillo, end of story.' },
        { name: 'Sala de Despiece', category: 'Modern Spanish', rating: 4.7, reviews: 3800, review: 'Counter-only, the menu is a butcher\'s diagram. Inventive.' },
        { name: 'Chocolatería San Ginés', category: 'Churros', rating: 4.6, reviews: 18400, review: 'Churros con chocolate at 4am after a long night. Tradition.' }
      ],
      weatherT: { now: 21, condition: 'Sunny', hi: 25, lo: 11 },
      community: [
        { author: 'Lucía R.', initials: 'LR', snippet: "Drinks at 11pm, dinner at midnight, dancing until 5am, churros for breakfast. Madrid runs on its own clock.", timestamp: '12h ago', reactions: 820 }
      ]
    },

    {
      id: 'barcelona', cityName: 'Barcelona', countryName: 'Spain',
      coordinates: [41.3851, 2.1734], region: 'Catalonia',
      shortDescription: "Gaudí curves, beach in 20 minutes, vermut at noon, a city that walks faster than it talks.",
      visitorCount: '14.2M', trendScore: 89, bestSeason: 'May · Sep – Oct', localTime: '+01:00',
      landmarks: [
        { name: 'Sagrada Família at evening', category: 'Architecture', description: 'Buy timed entry, go 1 hour before close. Western light through stained glass.', rating: 4.9 },
        { name: 'Bunkers del Carmel', category: 'Viewpoint', description: '360° of the city, free. Bring a beer at sunset.', rating: 4.8 },
        { name: 'Gràcia neighborhood', category: 'Neighborhood', description: 'Plaças, not boulevards. The Barcelona locals defend.', rating: 4.7 },
        { name: 'Park Güell — back path', category: 'Park', description: 'Avoid the paid monumental zone; the upper hills are free and quieter.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Poble-sec pinchos crawl', weight: 86 },
        { tag: 'Costa Brava day-trip', weight: 79 },
        { tag: 'vermut Sundays', weight: 84 },
        { tag: 'Sant Antoni Sunday market', weight: 72 }
      ],
      food: [
        { name: 'Disfrutar', category: 'Modern tasting', rating: 4.9, reviews: 2400, review: 'Three Michelin, world\'s 50 Best #1 in 2024. Ex-El Bulli wizardry.' },
        { name: 'Bar del Pla', category: 'Tapas', rating: 4.7, reviews: 5800, review: 'Born neighborhood, no pretension, perfect bombas.' },
        { name: 'La Cova Fumada', category: 'Bombas inventors', rating: 4.6, reviews: 4200, review: 'The original bomba. Cash only. Closes when they run out.' }
      ],
      weatherT: { now: 21, condition: 'Sunny', hi: 24, lo: 14 },
      community: [
        { author: 'Marc P.', initials: 'MP', snippet: "Beach at 9am, lunch in El Born, gallery in Raval, dinner in Gràcia. One day in Barcelona is four cities.", timestamp: '6h ago', reactions: 1340 }
      ]
    },

    {
      id: 'amsterdam', cityName: 'Amsterdam', countryName: 'Netherlands',
      coordinates: [52.3676, 4.9041], region: 'Western Europe',
      shortDescription: "Bikes everywhere, canals that catch light differently each hour, brown cafés you stay too long in.",
      visitorCount: '20.1M', trendScore: 84, bestSeason: 'May – Sep', localTime: '+01:00',
      landmarks: [
        { name: 'Jordaan canal walk', category: 'Neighborhood', description: 'Skip the red light district; this is the Amsterdam you remember.', rating: 4.8 },
        { name: 'Rijksmuseum library', category: 'Museum', description: 'World\'s most beautiful reading room. Free with museum ticket.', rating: 4.9 },
        { name: 'Vondelpark Sunday', category: 'Park', description: 'Free outdoor theatre + 47 picnic blankets per square meter.', rating: 4.7 },
        { name: 'NDSM-werf ferry', category: 'Creative quarter', description: 'Free ferry from Centraal. Industrial canvas, street art, cafés.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Noord renaissance', weight: 82 },
        { tag: 'café-with-cat circuit', weight: 71 },
        { tag: 'tulip-season day-trips', weight: 85 },
        { tag: 'kibbeling at fish carts', weight: 67 }
      ],
      food: [
        { name: 'Choux', category: 'Modern Dutch', rating: 4.8, reviews: 1840, review: 'Local ingredients, surprising plates, no menu — you trust them.' },
        { name: 'De Kas', category: 'Greenhouse', rating: 4.7, reviews: 2800, review: 'Working greenhouse + restaurant. They grew most of dinner.' },
        { name: 'Foodhallen Oud-West', category: 'Food hall', rating: 4.6, reviews: 9200, review: 'Old tram depot, 20 stalls, Bitterballen Royale is the start.' }
      ],
      weatherT: { now: 14, condition: 'Cool', hi: 16, lo: 8 },
      community: [
        { author: 'Sanne K.', initials: 'SK', snippet: "Borrowed a bike for two weeks. Crashed exactly once (gracefully, into a canal-side café\'s flowerpot). I now think every city should ban cars.", timestamp: '1d ago', reactions: 940 }
      ]
    },

    {
      id: 'prague', cityName: 'Prague', countryName: 'Czechia',
      coordinates: [50.0755, 14.4378], region: 'Central Europe',
      shortDescription: "Gothic spires, Cubist façades, beer that costs less than water, and absurdist humor in the bones.",
      visitorCount: '8.0M', trendScore: 82, bestSeason: 'Apr – Jun · Sep', localTime: '+01:00',
      landmarks: [
        { name: 'Charles Bridge at 5am', category: 'Bridge', description: 'Before the tour groups. Mist rising off the Vltava. A photograph life.', rating: 4.9 },
        { name: 'Letná Beer Garden', category: 'Viewpoint', description: 'Hilltop pivnice with the whole old town below.', rating: 4.8 },
        { name: 'Strahov Library', category: 'Library', description: 'Two Baroque rooms, mostly unchanged since 1670s.', rating: 4.7 },
        { name: 'Vyšehrad fortress', category: 'Citadel', description: 'The local\'s Prague Castle. Sunsets, runners, no crowds.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Holešovice galleries', weight: 76 },
        { tag: 'tankové pivo (tank beer)', weight: 84 },
        { tag: 'Karlín brunch crawl', weight: 71 },
        { tag: 'Český Krumlov weekend', weight: 70 }
      ],
      food: [
        { name: 'Lokál Dlouhááá', category: 'Pivnice', rating: 4.6, reviews: 4400, review: 'Old-school beer hall, freshly-tapped Pilsner, schnitzel that fills the plate.' },
        { name: 'Eska', category: 'Modern Czech', rating: 4.7, reviews: 2200, review: 'Bakery + restaurant in old Karlín factory. Sourdough doctorate.' },
        { name: 'Sisters Bistro', category: 'Open sandwiches', rating: 4.5, reviews: 3100, review: 'Chlebíčky reinvented. Cuisine of grandmothers, with a wink.' }
      ],
      weatherT: { now: 14, condition: 'Cool', hi: 17, lo: 6 },
      community: [
        { author: 'Jakub N.', initials: 'JN', snippet: "Got the keys to a 14th-century building Airbnb. Heating was iffy. Worth it.", timestamp: '2d ago', reactions: 640 }
      ]
    },

    {
      id: 'vienna', cityName: 'Vienna', countryName: 'Austria',
      coordinates: [48.2082, 16.3738], region: 'Central Europe',
      shortDescription: "Habsburg formality, coffeehouse philosophy, and a public transit system that runs to the minute.",
      visitorCount: '8.8M', trendScore: 81, bestSeason: 'May – Sep', localTime: '+01:00',
      landmarks: [
        { name: 'Belvedere Klimt room', category: 'Museum', description: 'The Kiss, smaller in person than you\'d expect. Still leveling.', rating: 4.9 },
        { name: 'Naschmarkt Saturday', category: 'Market', description: 'Levantine spices, Austrian pickles, flea market spills onto the street.', rating: 4.7 },
        { name: 'MAK design museum', category: 'Design', description: 'Wiener Werkstätte. Quiet, free first Tuesdays.', rating: 4.7 },
        { name: 'Wienerwald hike', category: 'Forest day', description: 'Tram terminus to vineyard taverns in 90 minutes.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Heuriger wine taverns', weight: 80 },
        { tag: 'Karlsplatz hot wine winter', weight: 74 },
        { tag: 'Albertina graphic shows', weight: 70 },
        { tag: 'jazz at Porgy & Bess', weight: 68 }
      ],
      food: [
        { name: 'Steirereck', category: 'Modern Austrian', rating: 4.9, reviews: 1640, review: 'Stadtpark setting, two Michelin, the trout-in-beeswax is iconic.' },
        { name: 'Figlmüller', category: 'Schnitzel', rating: 4.6, reviews: 14800, review: 'Schnitzel bigger than the plate. Hammer-thinned. Crackling.' },
        { name: 'Café Sperl', category: 'Coffeehouse', rating: 4.7, reviews: 3400, review: 'Marble tables, billiards, newspapers on poles since 1880.' }
      ],
      weatherT: { now: 15, condition: 'Mild', hi: 18, lo: 8 },
      community: [
        { author: 'Hannah W.', initials: 'HW', snippet: "Spent two hours alone in a corner of Café Sperl, three coffees, one novel. Nobody hurried me. Vienna gets it.", timestamp: '2d ago', reactions: 780 }
      ]
    },

    {
      id: 'budapest', cityName: 'Budapest', countryName: 'Hungary',
      coordinates: [47.4979, 19.0402], region: 'Central Europe',
      shortDescription: "Two cities split by the Danube, ruin bars in pre-war courtyards, thermal baths older than your country.",
      visitorCount: '9.4M', trendScore: 83, bestSeason: 'May – Sep', localTime: '+01:00',
      landmarks: [
        { name: 'Széchenyi thermal baths', category: 'Baths', description: '18 pools, neo-baroque palace. Open until 10pm; go at 8.', rating: 4.8 },
        { name: 'Gellért Hill at dusk', category: 'View', description: 'Climb 30 min, descend with the river lit up below.', rating: 4.7 },
        { name: 'Szimpla Kert ruin bar', category: 'Bar', description: 'Crumbling courtyard, mismatched chairs, accidental icon.', rating: 4.6 },
        { name: 'Great Market Hall', category: 'Market', description: 'Three floors. Paprika strings by the kilo on the ground level.', rating: 4.5 }
      ],
      trending: [
        { tag: 'District VII farm-to-bar', weight: 78 },
        { tag: 'Memento Park communist statues', weight: 71 },
        { tag: 'Margit-sziget cycling', weight: 73 },
        { tag: 'kürtőskalács street oven', weight: 67 }
      ],
      food: [
        { name: 'Stand', category: 'Modern Hungarian', rating: 4.8, reviews: 1400, review: 'Michelin two-star, the country\'s most ambitious kitchen. Gulyás reimagined.' },
        { name: 'Bors Gasztrobár', category: 'Street food', rating: 4.7, reviews: 6200, review: 'Tiny bar in District VII. Soups in bread bowls, baguettes the size of swords.' }
      ],
      weatherT: { now: 18, condition: 'Mild', hi: 21, lo: 9 },
      community: [
        { author: 'Eszter K.', initials: 'EK', snippet: "Did the morning thermal bath ritual three days in a row. Came home recalibrated.", timestamp: '8h ago', reactions: 880 }
      ]
    },

    {
      id: 'athens', cityName: 'Athens', countryName: 'Greece',
      coordinates: [37.9838, 23.7275], region: 'Eastern Mediterranean',
      shortDescription: "Five-thousand-year-old marble on a hill, café culture in every neighborhood, the sea at the metro\'s end.",
      visitorCount: '6.4M', trendScore: 84, bestSeason: 'Apr – Jun · Sep – Oct', localTime: '+02:00',
      landmarks: [
        { name: 'Acropolis at opening', category: 'Ancient', description: '8am gate, before tour buses. The Parthenon to yourself for 30 minutes.', rating: 4.9 },
        { name: 'Anafiotika', category: 'Cycladic enclave', description: 'A village hiding under the Acropolis. White cubes, alley cats.', rating: 4.7 },
        { name: 'National Archaeological Museum', category: 'Museum', description: 'World\'s greatest Greek collection. Don\'t skip Cycladic figurines.', rating: 4.8 },
        { name: 'Cape Sounion sunset', category: 'Day trip', description: '2hr bus south, Poseidon temple on the cliff at sunset.', rating: 4.8 }
      ],
      trending: [
        { tag: 'Plaka after-hours', weight: 76 },
        { tag: 'Aegina pistachio day-ferry', weight: 71 },
        { tag: 'wine tavernas in Exarchia', weight: 79 },
        { tag: 'Lycabettus midnight climb', weight: 68 }
      ],
      food: [
        { name: 'Diporto', category: 'Old taverna', rating: 4.7, reviews: 3200, review: 'Basement bar, no menu, two tables, century-old recipes.' },
        { name: 'Funky Gourmet', category: 'Modern Greek', rating: 4.8, reviews: 1100, review: 'Michelin star, the gianduja olive is a wonder.' },
        { name: 'Karamanlidika tou Fani', category: 'Pastrami house', rating: 4.6, reviews: 4400, review: 'Constantinople recipes. Order the meze board with strangers.' }
      ],
      weatherT: { now: 23, condition: 'Sunny', hi: 27, lo: 16 },
      community: [
        { author: 'Niko V.', initials: 'NV', snippet: "Spent a whole afternoon walking from Monastiraki to Filopappou. Forty minutes, forty centuries.", timestamp: '11h ago', reactions: 1100 }
      ]
    },

    {
      id: 'porto', cityName: 'Porto', countryName: 'Portugal',
      coordinates: [41.1579, -8.6291], region: 'Iberia',
      shortDescription: "Tiled façades, fortified wine, a river that breaks the city into postcards, and dinners that taste of fog and salt.",
      visitorCount: '4.5M', trendScore: 81, bestSeason: 'May – Sep', localTime: '+00:00',
      landmarks: [
        { name: 'Livraria Lello', category: 'Bookstore', description: 'The spiral staircase. Buy a timed ticket; arrive when it opens.', rating: 4.7 },
        { name: 'Ribeira waterfront', category: 'Riverside', description: 'Drink a vinho verde with the bridge looming over you.', rating: 4.8 },
        { name: 'Serralves contemporary art', category: 'Museum', description: 'Pink villa, art deco, garden paths through woodland.', rating: 4.7 },
        { name: 'Foz crashing-waves walk', category: 'Coastal walk', description: 'Tram 1 to where the river meets the Atlantic. Loud and wild.', rating: 4.6 }
      ],
      trending: [
        { tag: 'natural ports in Gaia', weight: 82 },
        { tag: 'Bolhão renovated market', weight: 74 },
        { tag: 'Aveiro & Costa Nova day', weight: 70 },
        { tag: 'francesinha sandwich tour', weight: 79 }
      ],
      food: [
        { name: 'Casa Guedes', category: 'Pork sandwiches', rating: 4.7, reviews: 8200, review: 'Slow-roasted pork on a roll for €4. Forty-year line.' },
        { name: 'Antiqvvm', category: 'Modern Portuguese', rating: 4.8, reviews: 1280, review: 'Michelin star, garden setting, the Douro just there.' },
        { name: 'Cervejaria Brasão', category: 'Beer house', rating: 4.6, reviews: 5400, review: 'Order the francesinha, then nap until dinner.' }
      ],
      weatherT: { now: 17, condition: 'Mild', hi: 20, lo: 12 },
      community: [
        { author: 'Inês T.', initials: 'IT', snippet: "Lisbon's loud sister with better wine. Spent three weeks here and didn't repeat a tasca.", timestamp: '14h ago', reactions: 720 }
      ]
    },

    {
      id: 'dublin', cityName: 'Dublin', countryName: 'Ireland',
      coordinates: [53.3498, -6.2603], region: 'British Isles',
      shortDescription: "Georgian doorways, literary pubs, and a sky that changes weather every twenty minutes.",
      visitorCount: '6.1M', trendScore: 78, bestSeason: 'May – Sep', localTime: '+01:00',
      landmarks: [
        { name: 'Trinity Long Room', category: 'Library', description: 'Book of Kells underneath; the room itself is the headliner.', rating: 4.8 },
        { name: 'Howth Cliff Walk', category: 'Coastal hike', description: '40-minute train from city. 6km loop, lighthouse, seal colonies.', rating: 4.8 },
        { name: 'Iveagh Gardens', category: 'Hidden park', description: 'Walled garden behind the National Concert Hall. Locals\' secret.', rating: 4.7 },
        { name: 'Kilmainham Gaol', category: 'History', description: 'The story of the Irish state, in one limestone wing.', rating: 4.7 }
      ],
      trending: [
        { tag: 'GAA match Saturdays', weight: 72 },
        { tag: 'Drumcondra brunch crawl', weight: 70 },
        { tag: 'whiskey distillery tours', weight: 76 }
      ],
      food: [
        { name: 'Chapter One', category: 'Modern Irish', rating: 4.9, reviews: 1340, review: 'Two Michelin in a Georgian basement. The bread course is a chapter itself.' },
        { name: 'Mr. Fox', category: 'Bistro', rating: 4.7, reviews: 2200, review: 'Underrated, tucked in Parnell Sq, the chocolate dessert nobody shuts up about.' }
      ],
      weatherT: { now: 12, condition: 'Drizzle', hi: 14, lo: 7 },
      community: [
        { author: 'Aoife B.', initials: 'AB', snippet: "Three sessions, four pints, two singalongs in one night. That\'s Friday in Dublin.", timestamp: '3d ago', reactions: 840 }
      ]
    },

    // ===== ASIA =====
    {
      id: 'hongkong', cityName: 'Hong Kong', countryName: 'Hong Kong SAR',
      coordinates: [22.3193, 114.1694], region: 'East Asia',
      shortDescription: "Skyline meets jungle, dim sum at dawn, hike to a beach the same afternoon.",
      visitorCount: '24.8M', trendScore: 88, bestSeason: 'Oct – Dec', localTime: '+08:00',
      landmarks: [
        { name: 'Dragon\'s Back ridge', category: 'Hike', description: '90-min trail, then bus to Shek O beach. The classic HK day.', rating: 4.9 },
        { name: 'Mong Kok night markets', category: 'Market', description: 'Temple Street + Ladies\'. Goldfish street is real.', rating: 4.6 },
        { name: 'Peak Tram alternative', category: 'View', description: 'Skip the line — take the 15 bus up. Same view, no wait.', rating: 4.7 },
        { name: 'Yim Tin Tsai', category: 'Island', description: 'Ferry from Sai Kung. Hakka village frozen in 1990s.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Sham Shui Po dai pai dong', weight: 89 },
        { tag: 'wet markets re-discovered', weight: 76 },
        { tag: 'New Territories cycling', weight: 71 },
        { tag: 'rooftop speakeasies', weight: 75 }
      ],
      food: [
        { name: 'Tim Ho Wan', category: 'Dim sum', rating: 4.5, reviews: 24400, review: 'Cheapest Michelin star in the world. Char siu bao is the move.' },
        { name: 'Yardbird', category: 'Japanese yakitori', rating: 4.8, reviews: 4800, review: 'No reservations, two-hour wait, every skewer worth it.' },
        { name: 'Mak\'s Noodle', category: 'Wonton noodles', rating: 4.6, reviews: 9200, review: 'Tiny bowls, shrimp wontons, a Wan Chai institution.' }
      ],
      weatherT: { now: 24, condition: 'Pleasant', hi: 27, lo: 19 },
      community: [
        { author: 'Wai C.', initials: 'WC', snippet: "Hiked the Dragon\'s Back in the morning, dim sum at noon, ferry to Lamma for sunset. HK in one day.", timestamp: '9h ago', reactions: 1380 }
      ]
    },

    {
      id: 'taipei', cityName: 'Taipei', countryName: 'Taiwan',
      coordinates: [25.0330, 121.5654], region: 'East Asia',
      shortDescription: "Night markets that run until dawn, mountains rising out of the metro, and bubble tea perfected at the source.",
      visitorCount: '8.4M', trendScore: 86, bestSeason: 'Oct – Apr', localTime: '+08:00',
      landmarks: [
        { name: 'Elephant Mountain hike', category: 'Hike + view', description: '20-minute climb for the Taipei 101 photograph everyone has.', rating: 4.7 },
        { name: 'Beitou hot springs', category: 'Onsen', description: 'Public bath under MRT line. ¥40NT for an evening soak.', rating: 4.8 },
        { name: 'Dadaocheng heritage row', category: 'Old quarter', description: 'Qing-era shophouses, tea merchants, modern indie cafés moving in.', rating: 4.7 },
        { name: 'Maokong gondola + tea', category: 'Day trip', description: 'Cable car up tea-terraced hills. Family-run teahouses at the top.', rating: 4.7 }
      ],
      trending: [
        { tag: 'craft beef noodle wars', weight: 84 },
        { tag: 'Tamsui sunset ferry', weight: 72 },
        { tag: 'hand-shaken tea revival', weight: 81 },
        { tag: 'Songshan Cultural Park', weight: 73 }
      ],
      food: [
        { name: 'Din Tai Fung (Xinyi)', category: 'Xiao long bao', rating: 4.8, reviews: 32100, review: 'World HQ of the soup dumpling. 18 folds. Worth the line.' },
        { name: 'Raohe night market', category: 'Night market', rating: 4.7, reviews: 18900, review: 'Pepper buns at the gate. Stinky tofu deeper in. Eat at a stand.' },
        { name: 'Mountain & Sea House', category: 'Modern Taiwanese', rating: 4.7, reviews: 2400, review: 'Old Japanese-era house, modern menu, hidden in Da\'an.' }
      ],
      weatherT: { now: 24, condition: 'Humid', hi: 27, lo: 19 },
      community: [
        { author: 'Jia-Hui L.', initials: 'JL', snippet: "Did all four night markets in one weekend. Slept for 12 hours after.", timestamp: '1d ago', reactions: 760 }
      ]
    },

    {
      id: 'bali', cityName: 'Bali (Ubud)', countryName: 'Indonesia',
      coordinates: [-8.5069, 115.2625], region: 'Southeast Asia',
      shortDescription: "Rice-terrace mornings, temple offerings on every doorstep, and a yoga scene that quietly funds half the island.",
      visitorCount: '6.3M', trendScore: 88, bestSeason: 'Apr – Oct', localTime: '+08:00',
      landmarks: [
        { name: 'Tegalalang rice terraces dawn', category: 'Landscape', description: '6am only — by 9 the crowds arrive. Walk the lower path, free.', rating: 4.8 },
        { name: 'Campuhan Ridge walk', category: 'Walk', description: 'Easy 4km loop through green. Best after morning rain.', rating: 4.7 },
        { name: 'Goa Gajah elephant cave', category: 'Heritage', description: '9th-century carved cave + bathing pool. Sarong required.', rating: 4.6 },
        { name: 'Tirta Empul cleansing', category: 'Temple', description: 'Spring-fed pools, locals queue first. Bring a sarong and intention.', rating: 4.8 }
      ],
      trending: [
        { tag: 'plant-based long-stays', weight: 83 },
        { tag: 'Mt Batur sunrise hike', weight: 86 },
        { tag: 'Sidemen alternative', weight: 81, context: 'Ubud without the Ubud crowds' },
        { tag: 'Canggu surf-cafés', weight: 79 }
      ],
      food: [
        { name: 'Locavore NXT', category: 'Modern Indonesian', rating: 4.8, reviews: 2100, review: 'World\'s 50 Best, fully local sourcing, mind-bending tastings.' },
        { name: 'Ibu Oka', category: 'Babi guling', rating: 4.6, reviews: 8400, review: 'Suckling pig for 80 years. Sit on the floor.' },
        { name: 'Hujan Locale', category: 'Indonesian regional', rating: 4.7, reviews: 3200, review: 'Tropical bistro in a converted house. The corn fritters are dangerous.' }
      ],
      weatherT: { now: 27, condition: 'Tropical', hi: 30, lo: 23 },
      community: [
        { author: 'Sari D.', initials: 'SD', snippet: "Three weeks in Ubud and I forgot what shoes were. Just sandals. Just rice paddies.", timestamp: '2d ago', reactions: 1120 }
      ]
    },

    {
      id: 'beijing', cityName: 'Beijing', countryName: 'China',
      coordinates: [39.9042, 116.4074], region: 'East Asia',
      shortDescription: "Hutong courtyards, dynasty-old gates, art districts in tank factories — a capital made of layers.",
      visitorCount: '10.4M', trendScore: 85, bestSeason: 'Sep – Oct · Apr – May', localTime: '+08:00',
      landmarks: [
        { name: 'Jiankou wild Great Wall', category: 'Day hike', description: '2hr drive. Unrestored, steep, almost no one. Bring a guide.', rating: 4.9 },
        { name: '798 art district', category: 'Art', description: 'East-German Bauhaus factory turned gallery quarter.', rating: 4.7 },
        { name: 'Houhai lakes evening', category: 'Lakeside', description: 'Rent a small wooden rowboat at sundown.', rating: 4.6 },
        { name: 'Temple of Heaven park morning', category: 'Park', description: 'Tai chi, fan dancers, retired men with playing cards. Real Beijing.', rating: 4.8 }
      ],
      trending: [
        { tag: 'Songzhuang artist villages', weight: 75 },
        { tag: 'Beihai paddleboats', weight: 71 },
        { tag: 'specialty coffee in Dongcheng', weight: 80 },
        { tag: 'roast duck rivalries', weight: 88 }
      ],
      food: [
        { name: 'Da Dong', category: 'Peking duck', rating: 4.7, reviews: 12400, review: 'Lacquered skin, paper-thin pancakes, a duck pageant.' },
        { name: 'Siji Minfu', category: 'Peking duck', rating: 4.6, reviews: 11200, review: 'Locals\' pick over Quanjude. Skin first, dipped in sugar.' },
        { name: 'Najia Xiaoguan', category: 'Manchu cuisine', rating: 4.7, reviews: 2800, review: 'Imperial dishes in a converted courtyard. Reserve.' }
      ],
      weatherT: { now: 19, condition: 'Crisp', hi: 23, lo: 9 },
      community: [
        { author: 'Wei Z.', initials: 'WZ', snippet: "Walked from Jingshan park hill at sunset. The Forbidden City below, gold roofs catching the light. Speechless.", timestamp: '14h ago', reactions: 1640 }
      ]
    },

    {
      id: 'shanghai', cityName: 'Shanghai', countryName: 'China',
      coordinates: [31.2304, 121.4737], region: 'East Asia',
      shortDescription: "Art Deco bones, future skyline, and an espresso scene that\'s outpaced Milan in five years.",
      visitorCount: '8.3M', trendScore: 87, bestSeason: 'Sep – Nov · Mar – May', localTime: '+08:00',
      landmarks: [
        { name: 'Bund at blue hour', category: 'Skyline', description: 'Both sides. Walk the colonial bank facades, ferry across, watch Pudong glow.', rating: 4.9 },
        { name: 'French Concession plane trees', category: 'Walking', description: 'Wukang Mansion to Yongkang Lu. The world\'s most photographed shade.', rating: 4.8 },
        { name: 'M50 art galleries', category: 'Art', description: 'Old textile mill, 100 studios, free.', rating: 4.6 },
        { name: 'Yuyuan garden at opening', category: 'Garden', description: '400-year-old Ming garden. Tea pavilion at the center.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Anfu Lu micro-brands', weight: 84 },
        { tag: 'wet market shanghainese', weight: 80 },
        { tag: 'Suzhou Creek industrial walks', weight: 76 },
        { tag: 'specialty kopi-style coffee', weight: 88 }
      ],
      food: [
        { name: 'Jia Jia Tang Bao', category: 'Soup dumplings', rating: 4.6, reviews: 7400, review: 'Cash only, 9am queue, the only xiao long bao that matters.' },
        { name: 'Ultraviolet', category: 'Tasting', rating: 4.9, reviews: 380, review: 'Paul Pairet\'s sensorial theatre. Ten guests per night.' },
        { name: 'Lao Zhengxing', category: 'Old Shanghai', rating: 4.5, reviews: 3200, review: 'Sweet-soy river fish, century-old recipe, no English menu.' }
      ],
      weatherT: { now: 20, condition: 'Mild', hi: 23, lo: 12 },
      community: [
        { author: 'Yan L.', initials: 'YL', snippet: "Walked the entire former French Concession in one Saturday. Twelve cafés, two haircuts, three exhibitions. Coming back.", timestamp: '6h ago', reactions: 1240 }
      ]
    },

    // ===== AMERICAS =====
    {
      id: 'sanfrancisco', cityName: 'San Francisco', countryName: 'United States',
      coordinates: [37.7749, -122.4194], region: 'West Coast US',
      shortDescription: "Forty-nine hills, fog you can taste, the Pacific in your face, and one of the world\'s great food scenes.",
      visitorCount: '24.5M', trendScore: 88, bestSeason: 'Sep – Oct', localTime: '−08:00',
      landmarks: [
        { name: 'Lands End Trail', category: 'Coastal walk', description: 'Pacific cliffs, Golden Gate, ruined Sutro Baths. 6km loop.', rating: 4.9 },
        { name: 'Ferry Building Saturday', category: 'Market', description: 'Farmer\'s market on the water; oyster bar inside the hall.', rating: 4.7 },
        { name: 'Mission District murals', category: 'Street art', description: 'Balmy + Clarion alleys. Pop into Tartine for the morning bun.', rating: 4.7 },
        { name: 'Mt Tam summit drive', category: 'Day trip', description: '40 min from city. The whole Bay Area below the redwoods.', rating: 4.8 }
      ],
      trending: [
        { tag: 'Inner Sunset noodle row', weight: 78 },
        { tag: 'natural wine Mission', weight: 82 },
        { tag: 'Bay Area surf weekends', weight: 71 },
        { tag: 'live AI demos at SoMa', weight: 79 }
      ],
      food: [
        { name: 'Tartine Manufactory', category: 'Bakery + bistro', rating: 4.7, reviews: 12400, review: 'Sourdough that re-defined American bread. Morning bun is a religion.' },
        { name: 'Burma Superstar', category: 'Burmese', rating: 4.7, reviews: 9800, review: 'Tea leaf salad. The line moves. Trust it.' },
        { name: 'State Bird Provisions', category: 'New American', rating: 4.8, reviews: 6200, review: 'Dim sum cart format, James Beard, no two visits the same.' }
      ],
      weatherT: { now: 17, condition: 'Foggy AM', hi: 19, lo: 12 },
      community: [
        { author: 'Jordan A.', initials: 'JA', snippet: "Biked across the Golden Gate at 6am. No traffic, fog burning off, Marin headlands appearing slowly. Free therapy.", timestamp: '10h ago', reactions: 1480 }
      ]
    },

    {
      id: 'chicago', cityName: 'Chicago', countryName: 'United States',
      coordinates: [41.8781, -87.6298], region: 'Midwest US',
      shortDescription: "Architecture as a civic religion, a lakefront that runs forever, and a deep-dish vs thin-crust war that won\'t end.",
      visitorCount: '52.1M', trendScore: 84, bestSeason: 'May – Sep', localTime: '−06:00',
      landmarks: [
        { name: 'Chicago Architecture boat tour', category: 'River cruise', description: '90 minutes, no other city tells its skyline like this.', rating: 4.9 },
        { name: 'Art Institute Modern Wing', category: 'Museum', description: 'Pull a Ferris Bueller — Seurat\'s dots, in person.', rating: 4.8 },
        { name: 'Lakefront Trail northbound', category: 'Run / bike', description: '29km of waterfront with no cross-streets.', rating: 4.7 },
        { name: 'Hyde Park bookstores', category: 'Bookshops', description: 'Powell\'s, Seminary Co-op. Browse for half a day.', rating: 4.6 }
      ],
      trending: [
        { tag: 'West Loop fine-dining boom', weight: 86 },
        { tag: 'Pilsen mural Sundays', weight: 74 },
        { tag: 'craft cocktail revival', weight: 80 }
      ],
      food: [
        { name: 'Lou Mitchell\'s', category: 'Diner', rating: 4.6, reviews: 8200, review: 'Greek diner near Union Station. Free donut holes for the line.' },
        { name: 'Alinea', category: 'Tasting', rating: 4.9, reviews: 2100, review: 'Three Michelin, edible balloons, the most theatrical 4 hours in dining.' },
        { name: 'Pequod\'s', category: 'Pan pizza', rating: 4.7, reviews: 5600, review: 'Caramelized crust ring. Beats the deep-dish chains, full stop.' }
      ],
      weatherT: { now: 15, condition: 'Crisp', hi: 18, lo: 7 },
      community: [
        { author: 'Maya R.', initials: 'MR', snippet: "Watched the sun set over the lake from a boat with deep dish in my lap. Chicago can be perfect.", timestamp: '1d ago', reactions: 980 }
      ]
    },

    {
      id: 'neworleans', cityName: 'New Orleans', countryName: 'United States',
      coordinates: [29.9511, -90.0715], region: 'Gulf South US',
      shortDescription: "Brass bands on the street, oysters on every corner, and a sense of time slow enough to enjoy any of it.",
      visitorCount: '18.6M', trendScore: 82, bestSeason: 'Nov – Apr', localTime: '−06:00',
      landmarks: [
        { name: 'French Quarter at 6am', category: 'Walk', description: 'Before the bars open, after they close. Cobblestones, fog off the river.', rating: 4.7 },
        { name: 'Frenchmen St music', category: 'Live music', description: 'Not Bourbon. Real bands every night, $10 cover.', rating: 4.8 },
        { name: 'Magazine St boutiques', category: 'Shopping walk', description: 'Six miles of Creole cottages turned shops + restaurants.', rating: 4.6 },
        { name: 'Lafayette Cemetery No 1', category: 'Above-ground graves', description: 'Garden District. Quiet, photogenic, free.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Treme jazz brunch', weight: 81 },
        { tag: 'sno-ball pop-ups summer', weight: 71 },
        { tag: 'Mardi Gras off-season', weight: 76 },
        { tag: 'second-line Sundays', weight: 84 }
      ],
      food: [
        { name: 'Commander\'s Palace', category: 'Creole', rating: 4.8, reviews: 5400, review: 'Turtle soup, 25¢ martinis at lunch. White-tablecloth jazz.' },
        { name: 'Cochon', category: 'Cajun', rating: 4.7, reviews: 4400, review: 'Donald Link\'s pig palace. The boudin alone is worth the trip.' },
        { name: 'Café du Monde', category: 'Café', rating: 4.6, reviews: 22400, review: '24/7 beignets and chicory coffee. Sit, eat, repeat at 3am.' }
      ],
      weatherT: { now: 26, condition: 'Warm', hi: 28, lo: 17 },
      community: [
        { author: 'Devon W.', initials: 'DW', snippet: "Stumbled into a wedding second-line on Royal Street. Got handed a beer. Joined the parade. New Orleans, in essence.", timestamp: '4h ago', reactions: 1860 }
      ]
    },

    {
      id: 'montreal', cityName: 'Montreal', countryName: 'Canada',
      coordinates: [45.5017, -73.5673], region: 'Quebec',
      shortDescription: "Bagels argued over louder than hockey, French rolling into English mid-sentence, and a festival every weekend.",
      visitorCount: '11.1M', trendScore: 80, bestSeason: 'Jun – Sep', localTime: '−05:00',
      landmarks: [
        { name: 'Mt Royal lookout', category: 'View', description: 'The Tam-Tams drum circle at the base every Sunday. Climb up after.', rating: 4.8 },
        { name: 'Mile End', category: 'Neighborhood', description: 'Bagel war HQ, indie bookshops, ungentrified-but-cool.', rating: 4.7 },
        { name: 'Old Port + Centre des Sciences', category: 'Waterfront', description: 'Cobblestone, free outdoor films in summer, ferris wheel.', rating: 4.6 },
        { name: 'Marché Jean-Talon', category: 'Market', description: 'North America\'s best farmer\'s market. Cidre de glace samples.', rating: 4.8 }
      ],
      trending: [
        { tag: 'Schwartz\'s vs Lester\'s', weight: 77 },
        { tag: 'St-Laurent dive bars', weight: 73 },
        { tag: 'Eastern Townships day-trip', weight: 71 }
      ],
      food: [
        { name: 'Joe Beef', category: 'Hearty bistro', rating: 4.9, reviews: 3200, review: 'Lobster spaghetti, Quebec excess, a perfect bottle of natural wine.' },
        { name: 'Schwartz\'s Deli', category: 'Smoked meat', rating: 4.6, reviews: 11800, review: 'Medium-fat brisket, rye, mustard. A six-decade ritual.' },
        { name: 'Olive et Gourmando', category: 'Café-bakery', rating: 4.7, reviews: 4200, review: 'Old Montréal sandwiches, kouign-amann, the best brunch coffee.' }
      ],
      weatherT: { now: 12, condition: 'Cool', hi: 15, lo: 5 },
      community: [
        { author: 'Antoine D.', initials: 'AD', snippet: "Snowstorm in March, sundress weather by May. Montreal compresses three climates into a year.", timestamp: '3d ago', reactions: 540 }
      ]
    },

    {
      id: 'havana', cityName: 'Havana', countryName: 'Cuba',
      coordinates: [23.1136, -82.3666], region: 'Caribbean',
      shortDescription: "1950s Buicks, son cubano leaking out of windows, and a Malecón that becomes everyone\'s living room at night.",
      visitorCount: '4.0M', trendScore: 79, bestSeason: 'Nov – Apr', localTime: '−05:00',
      landmarks: [
        { name: 'Malecón at sunset', category: 'Seawall', description: 'Walk the curve, share a bottle. Salt spray on a warm Caribbean night.', rating: 4.9 },
        { name: 'Habana Vieja', category: 'Old quarter', description: 'Four squares, restored mansions, cigar shops, no chain logos.', rating: 4.8 },
        { name: 'Callejón de Hamel', category: 'Afro-Cuban alley', description: 'Sunday rumba sessions starting noon. Real, not for tourists.', rating: 4.7 },
        { name: 'Fusterlandia', category: 'Mosaic neighborhood', description: 'Suburb entirely covered in trencadís mosaic. Genius and odd.', rating: 4.6 }
      ],
      trending: [
        { tag: 'paladar private restaurants', weight: 84 },
        { tag: 'Viñales tobacco day-trip', weight: 78 },
        { tag: 'casa particular stays', weight: 81 }
      ],
      food: [
        { name: 'La Guarida', category: 'Paladar', rating: 4.8, reviews: 4200, review: 'Crumbling mansion staircase, rooftop tables, Strawberry & Chocolate was filmed here.' },
        { name: 'San Cristóbal', category: 'Paladar', rating: 4.7, reviews: 2400, review: 'The Obamas ate here. Lobster, roast pork, mojito.' }
      ],
      weatherT: { now: 27, condition: 'Warm', hi: 29, lo: 22 },
      community: [
        { author: 'Yolanda R.', initials: 'YR', snippet: "No Wi-Fi at the casa. Spent four hours reading a book on a balcony. Forgotten how that felt.", timestamp: '5d ago', reactions: 1640 }
      ]
    },

    {
      id: 'cusco', cityName: 'Cusco', countryName: 'Peru',
      coordinates: [-13.5320, -71.9675], region: 'Andean South America',
      shortDescription: "Inca foundations under Spanish churches, llamas on the street, and a sky bluer than altitude should allow.",
      visitorCount: '3.0M', trendScore: 86, bestSeason: 'Apr – Oct', localTime: '−05:00',
      landmarks: [
        { name: 'Sacsayhuamán fortress', category: 'Ruins', description: 'Walking distance from Plaza de Armas. Massive Inca stonework.', rating: 4.8 },
        { name: 'San Pedro Market', category: 'Market', description: 'Juices, fresh trout, dried alpaca. Locals upstairs eat the soups.', rating: 4.7 },
        { name: 'Sacred Valley by collectivo', category: 'Day loop', description: 'Pisac, Chinchero, Ollantaytambo. Less than $10 to do it.', rating: 4.9 },
        { name: 'Rainbow Mountain hike', category: 'High-altitude trek', description: 'Acclimatize first; 5,000m peak after 3-hour climb. Worth it once.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Salkantay over Inca Trail', weight: 82 },
        { tag: 'ceviche above 3,000m', weight: 71 },
        { tag: 'Choquequirao alt-trek', weight: 76 }
      ],
      food: [
        { name: 'Cicciolina', category: 'Andean fusion', rating: 4.7, reviews: 4200, review: 'Tapas-y, upstairs, second-floor windows on a colonial alley.' },
        { name: 'Chicha por Gastón', category: 'Modern Peruvian', rating: 4.8, reviews: 3100, review: 'Acurio\'s Cusco outpost. Cuy if you dare. Try the alpaca anticucho.' }
      ],
      weatherT: { now: 14, condition: 'Crisp', hi: 19, lo: 4 },
      community: [
        { author: 'Maria T.', initials: 'MT', snippet: "Drank coca tea on a balcony at 3,400m and watched llamas walk past. That sentence still feels invented.", timestamp: '4d ago', reactions: 720 }
      ]
    },

    {
      id: 'cartagena', cityName: 'Cartagena', countryName: 'Colombia',
      coordinates: [10.3910, -75.4794], region: 'Caribbean Coast',
      shortDescription: "Colonial walls in tropical heat, bougainvillea cascading off every balcony, salsa starting at 9pm sharp.",
      visitorCount: '3.5M', trendScore: 85, bestSeason: 'Dec – Apr', localTime: '−05:00',
      landmarks: [
        { name: 'Old Walled City wall walk', category: 'Walk', description: '4km loop on top of the walls at sunset. Cocktail vendors operate up there.', rating: 4.9 },
        { name: 'Getsemaní street art', category: 'Neighborhood', description: 'The cool barrio. Murals, salsa bars, plaza nights.', rating: 4.8 },
        { name: 'Islas del Rosario day-boat', category: 'Beach day', description: '45 min by speedboat to clear water and fried plantains.', rating: 4.7 },
        { name: 'San Felipe fortress', category: 'Castle', description: 'Hilltop colonial fort. Tunnels you can crawl through.', rating: 4.6 }
      ],
      trending: [
        { tag: 'natural wine in Getsemaní', weight: 78 },
        { tag: 'Palenque cultural tours', weight: 73 },
        { tag: 'Bocagrande rooftops', weight: 70 }
      ],
      food: [
        { name: 'La Cevichería', category: 'Ceviche', rating: 4.7, reviews: 6400, review: 'Anthony Bourdain visited. Hasn\'t lost a step.' },
        { name: 'Carmen', category: 'Modern Colombian', rating: 4.8, reviews: 1980, review: 'Garden setting in an old house. Tasting menu of the country.' }
      ],
      weatherT: { now: 30, condition: 'Hot', hi: 32, lo: 25 },
      community: [
        { author: 'Sebastian C.', initials: 'SC', snippet: "Salsa class at 7pm, ceviche at 9pm, rooftop until 2am. Cartagena programs your week.", timestamp: '2d ago', reactions: 840 }
      ]
    },

    // ===== MIDDLE EAST / AFRICA =====
    {
      id: 'telaviv', cityName: 'Tel Aviv', countryName: 'Israel',
      coordinates: [32.0853, 34.7818], region: 'Eastern Mediterranean',
      shortDescription: "Beach culture next to Bauhaus, hummus arguments older than the state, a nightlife that never quite ends.",
      visitorCount: '3.6M', trendScore: 84, bestSeason: 'Apr – May · Sep – Oct', localTime: '+02:00',
      landmarks: [
        { name: 'Jaffa flea market', category: 'Old quarter', description: '4,000-year-old port. Vintage shops, hookah bars, the city before the city.', rating: 4.7 },
        { name: 'Tel Aviv promenade', category: 'Beach walk', description: '14km of beach + bike path. Locals run it at 6am, drink at 6pm.', rating: 4.8 },
        { name: 'Rothschild Boulevard Bauhaus', category: 'Architecture', description: '4,000 White City buildings. Walking tour available free Saturdays.', rating: 4.6 },
        { name: 'Carmel Market Friday', category: 'Market', description: 'The chaos before Shabbat. Falafel, fresh herbs, citrus piles.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Florentin nightlife', weight: 85 },
        { tag: 'Jerusalem day-train', weight: 78 },
        { tag: 'specialty hummusiyas', weight: 88 }
      ],
      food: [
        { name: 'OCD', category: 'Tasting', rating: 4.8, reviews: 1200, review: 'Counter-only, 12 seats, the city\'s most ambitious kitchen.' },
        { name: 'Miznon', category: 'Pita street food', rating: 4.7, reviews: 9200, review: 'Stuffed pitas, ratatouille, fast and brilliant.' },
        { name: 'Abu Hassan', category: 'Hummus', rating: 4.6, reviews: 14800, review: 'Jaffa, opens 8am, sold out by 1pm. Mussabaha is the move.' }
      ],
      weatherT: { now: 25, condition: 'Mediterranean', hi: 28, lo: 18 },
      community: [
        { author: 'Yael R.', initials: 'YR', snippet: "Beach breakfast, market lunch, gallery afternoon, rooftop dinner, club at 2am. A regular Friday in TLV.", timestamp: '8h ago', reactions: 1140 }
      ]
    },

    {
      id: 'petra', cityName: 'Petra (Wadi Musa)', countryName: 'Jordan',
      coordinates: [30.3285, 35.4444], region: 'Middle East',
      shortDescription: "A city carved into rose-red sandstone in the 4th century BC, with light that changes every hour.",
      visitorCount: '1.1M', trendScore: 88, bestSeason: 'Mar – May · Sep – Nov', localTime: '+03:00',
      landmarks: [
        { name: 'The Siq + Treasury', category: 'Ancient', description: 'Walk the 1.2km canyon at first light. The reveal at the end is unbeatable.', rating: 5.0 },
        { name: 'Monastery (Ad Deir)', category: 'Hike', description: '800 steps up. Almost no one comes here. Larger than the Treasury.', rating: 4.9 },
        { name: 'Wadi Rum overnight', category: 'Desert', description: 'Bedouin camp 90 min south. Mars-red sand, infinity stars.', rating: 4.9 },
        { name: 'Little Petra (Beidha)', category: 'Alt site', description: 'Free, walkable, 4,000-year-old neolithic carved homes.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Petra-by-Night candle walk', weight: 82, context: 'Mon/Wed/Thu, 8:30pm' },
        { tag: 'Bedouin homestays', weight: 75 },
        { tag: 'Dana Biosphere hike', weight: 71 }
      ],
      food: [
        { name: 'My Mom\'s Recipe', category: 'Jordanian', rating: 4.7, reviews: 1800, review: 'Family kitchen. The mansaf is generational.' },
        { name: 'Beit al-Barakah', category: 'Bedouin lunch', rating: 4.6, reviews: 980, review: 'Open fire, zarb (underground roast), tea poured from height.' }
      ],
      weatherT: { now: 22, condition: 'Dry', hi: 26, lo: 11 },
      community: [
        { author: 'Hala A.', initials: 'HA', snippet: "Climbed to the High Place of Sacrifice at sunrise. Watched a cat watch me. Petra is full of cats.", timestamp: '5d ago', reactions: 1420 }
      ]
    },

    {
      id: 'cairo', cityName: 'Cairo', countryName: 'Egypt',
      coordinates: [30.0444, 31.2357], region: 'North Africa',
      shortDescription: "Pyramids in the distance, the Nile in the middle, a city of 22 million negotiating space every minute.",
      visitorCount: '13.6M', trendScore: 80, bestSeason: 'Oct – Apr', localTime: '+02:00',
      landmarks: [
        { name: 'Giza pyramids at opening', category: 'Wonder of the world', description: '7am gate, before the bus tours. You can be alone with the Sphinx.', rating: 4.9 },
        { name: 'Khan el-Khalili souk', category: 'Bazaar', description: '14th-century market. Tea at El Fishawi, open 24h since 1797.', rating: 4.7 },
        { name: 'Coptic Cairo', category: 'Quarter', description: 'Hanging Church, ancient walls, Ben Ezra synagogue. Quiet, layered.', rating: 4.6 },
        { name: 'Felucca on the Nile sunset', category: 'Sail', description: '£300EGP for a private hour, captain included.', rating: 4.8 }
      ],
      trending: [
        { tag: 'Grand Egyptian Museum opening', weight: 92, context: 'Tutankhamun finally all in one place' },
        { tag: 'Zamalek café streets', weight: 75 },
        { tag: 'oasis weekend Siwa', weight: 76 }
      ],
      food: [
        { name: 'Abou Tarek', category: 'Koshary', rating: 4.7, reviews: 9400, review: '60 years on, still the city\'s favorite single-dish restaurant.' },
        { name: 'Felfela', category: 'Egyptian', rating: 4.5, reviews: 5800, review: 'Downtown classic. Foul medames, taameya, mango juice.' }
      ],
      weatherT: { now: 26, condition: 'Dry', hi: 30, lo: 18 },
      community: [
        { author: 'Omar S.', initials: 'OS', snippet: "Watched the call to prayer echo across the Pyramids at sunset. A moment that gets you, no matter where you\'re from.", timestamp: '2d ago', reactions: 1980 }
      ]
    },

    {
      id: 'nairobi', cityName: 'Nairobi', countryName: 'Kenya',
      coordinates: [-1.2921, 36.8219], region: 'East Africa',
      shortDescription: "A capital where you can see lions in the morning and watch the country\'s tech scene incubate by afternoon.",
      visitorCount: '2.1M', trendScore: 82, bestSeason: 'Jun – Oct · Jan – Mar', localTime: '+03:00',
      landmarks: [
        { name: 'Nairobi National Park dawn', category: 'Safari in the city', description: 'Skyline backdrop, real lions. Half-day drive, $50 entry.', rating: 4.9 },
        { name: 'David Sheldrick elephant orphanage', category: 'Conservation', description: '11am visitor hour. Adopt one for $50 — get monthly updates.', rating: 4.8 },
        { name: 'Karen Blixen Museum', category: 'House museum', description: 'Out of Africa, in person. Coffee farm grounds intact.', rating: 4.6 },
        { name: 'Karura Forest', category: 'Urban forest', description: 'Bike rentals, waterfalls, café in the middle of the city.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Kenyan single-origin coffee', weight: 84 },
        { tag: 'Nairobi tech meetups', weight: 79 },
        { tag: 'Maasai Mara fly-in', weight: 86 }
      ],
      food: [
        { name: 'Talisman', category: 'Pan-African', rating: 4.8, reviews: 2200, review: 'Karen district, garden tables, the country\'s most-loved restaurant.' },
        { name: 'Carnivore', category: 'Nyama choma', rating: 4.6, reviews: 8400, review: 'Game meats on swords. Touristy, but the experience justifies it once.' }
      ],
      weatherT: { now: 22, condition: 'Mild', hi: 25, lo: 14 },
      community: [
        { author: 'Wanjiku N.', initials: 'WN', snippet: "Lion spotted on the morning game drive at 7am. Coffee meeting in Westlands at 10am. Nairobi runs on contrast.", timestamp: '1d ago', reactions: 1280 }
      ]
    },

    {
      id: 'zanzibar', cityName: 'Zanzibar (Stone Town)', countryName: 'Tanzania',
      coordinates: [-6.1659, 39.2026], region: 'East Africa',
      shortDescription: "Carved wooden doors, spice market chaos, dhow boats catching the trade wind, an Indian Ocean perfume.",
      visitorCount: '0.6M', trendScore: 81, bestSeason: 'Jun – Oct · Dec – Feb', localTime: '+03:00',
      landmarks: [
        { name: 'Stone Town alleys', category: 'Old quarter', description: 'A maze designed against invaders. Get lost on purpose.', rating: 4.8 },
        { name: 'Forodhani Gardens night food', category: 'Night market', description: 'Sunset seafood grilled on the waterfront. Pizza Zanzibari is the order.', rating: 4.7 },
        { name: 'Spice farm tour', category: 'Day trip', description: 'Vanilla, clove, cinnamon — taste them off the vine.', rating: 4.7 },
        { name: 'Prison Island tortoises', category: 'Day boat', description: '20-min boat. 150-year-old giant tortoises you can pet.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Mnemba reef snorkel', weight: 84 },
        { tag: 'Paje kitesurfing', weight: 79 },
        { tag: 'sunset dhow cruises', weight: 81 }
      ],
      food: [
        { name: 'Emerson Spice', category: 'Rooftop fine dining', rating: 4.8, reviews: 880, review: 'Restored merchant\'s house. Six courses, candlelit, on a tower above the harbor.' },
        { name: 'The Tea House', category: 'Modern Swahili', rating: 4.7, reviews: 1100, review: 'Tapas-style Zanzibari, vegetarian-friendly, the chickpea curry sings.' }
      ],
      weatherT: { now: 28, condition: 'Tropical', hi: 30, lo: 24 },
      community: [
        { author: 'Amina R.', initials: 'AR', snippet: "Ate grilled prawns on a beach with no shoes, no phone, no plan. That was the whole evening.", timestamp: '5d ago', reactions: 1820 }
      ]
    },

    // ===== OCEANIA =====
    {
      id: 'melbourne', cityName: 'Melbourne', countryName: 'Australia',
      coordinates: [-37.8136, 144.9631], region: 'Oceania',
      shortDescription: "Laneways with hidden bars, third-wave coffee at every corner, four seasons in one day.",
      visitorCount: '9.5M', trendScore: 86, bestSeason: 'Sep – Apr', localTime: '+11:00',
      landmarks: [
        { name: 'Hosier Lane street art', category: 'Lanes', description: 'Ever-changing murals. Best at golden hour.', rating: 4.7 },
        { name: 'Queen Victoria Market', category: 'Market', description: 'Sat night summer hawker series. Best of the country\'s produce.', rating: 4.8 },
        { name: 'Great Ocean Road weekend', category: 'Road trip', description: '12 Apostles, koalas in trees, fish & chips at Apollo Bay.', rating: 4.9 },
        { name: 'St Kilda penguins', category: 'Wildlife', description: 'Free, on the pier, after dark. Bring a friend.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Footscray noodle district', weight: 81 },
        { tag: 'Mornington wine bus', weight: 75 },
        { tag: 'AFL Saturday rituals', weight: 79 }
      ],
      food: [
        { name: 'Attica', category: 'Tasting', rating: 4.9, reviews: 1840, review: 'Native Australian ingredients pushed to the front. World\'s 50 Best.' },
        { name: 'Tipo 00', category: 'Pasta bar', rating: 4.7, reviews: 4200, review: 'Hand-rolled, no menu, the only place pasta hipsters agree on.' },
        { name: 'Patricia Coffee Brewers', category: 'Café', rating: 4.7, reviews: 2200, review: 'Standing room, no seats, the city\'s best cup most days.' }
      ],
      weatherT: { now: 19, condition: 'Mild', hi: 22, lo: 11 },
      community: [
        { author: 'Liam P.', initials: 'LP', snippet: "Coffee crawl through Fitzroy + Collingwood. Seven flat whites. Lost feeling in my fingers but found enlightenment.", timestamp: '12h ago', reactions: 720 }
      ]
    },

    {
      id: 'queenstown', cityName: 'Queenstown', countryName: 'New Zealand',
      coordinates: [-45.0312, 168.6626], region: 'Oceania',
      shortDescription: "A lake surrounded by mountains called The Remarkables — for once, the name fits.",
      visitorCount: '3.2M', trendScore: 84, bestSeason: 'Dec – Mar · Jun – Aug', localTime: '+13:00',
      landmarks: [
        { name: 'Ben Lomond hike', category: 'Mountain', description: 'Tough 6-8 hour climb. Glacier-blue lake below the whole way.', rating: 4.9 },
        { name: 'Fergburger', category: 'Burger pilgrimage', description: 'The line is real. Three patties later you understand.', rating: 4.7 },
        { name: 'Glenorchy drive', category: 'Scenic drive', description: '45 min around the lake. Lord of the Rings shots every turn.', rating: 4.9 },
        { name: 'Skippers Canyon jet boat', category: 'Adventure', description: 'Local jet-boat inventor\'s native canyon. Wild ride.', rating: 4.8 }
      ],
      trending: [
        { tag: 'Cardrona ski season', weight: 86, context: 'July peak — book in May' },
        { tag: 'Gibbston Valley wine bikes', weight: 80 },
        { tag: 'Milford Sound day-fly', weight: 84 }
      ],
      food: [
        { name: 'Rata', category: 'Modern NZ', rating: 4.8, reviews: 2400, review: 'Local lamb, foraged greens, the chef\'s garden visible from the table.' },
        { name: 'Bespoke Kitchen', category: 'Café-bistro', rating: 4.6, reviews: 1800, review: 'All-day brunch + bowl food, fuel before a hike.' }
      ],
      weatherT: { now: 14, condition: 'Cool', hi: 17, lo: 4 },
      community: [
        { author: 'Pip K.', initials: 'PK', snippet: "Bungee at 10am, vineyard lunch at 1pm, hot tub overlooking the lake at 9pm. Queenstown doesn\'t do half-days.", timestamp: '6d ago', reactions: 1140 }
      ]
    },

    // ===== PACIFIC / INDIAN OCEAN ISLANDS =====
    {
      id: 'honolulu', cityName: 'Honolulu', countryName: 'Hawaii, USA',
      coordinates: [21.3099, -157.8581], region: 'Pacific Islands',
      shortDescription: "Surf at sunrise, shave ice at noon, sunset cocktails on Waikīkī. A city that runs on saltwater.",
      visitorCount: '6.1M', trendScore: 85, bestSeason: 'Apr – May · Sep – Nov', localTime: '−10:00',
      landmarks: [
        { name: 'Diamond Head crater', category: 'Hike', description: '1-hour ascent for 360° of O\'ahu. Book online; lot fills early.', rating: 4.8 },
        { name: 'Lanikai Pillbox sunrise', category: 'Hike + beach', description: '20-min uphill, Pacific catching first light. Continue to the beach below.', rating: 4.9 },
        { name: 'Bishop Museum', category: 'Polynesian history', description: 'Native Hawaiian artifacts, Pacific exploration. The under-told story of the islands.', rating: 4.7 },
        { name: 'North Shore surf circuit', category: 'Day drive', description: 'Banzai Pipeline, shrimp trucks, Haleʻiwa town. Winter swell only for watching.', rating: 4.8 }
      ],
      trending: [
        { tag: 'farm-to-table on Oʻahu', weight: 84 },
        { tag: 'sea turtle ethics tour', weight: 78 },
        { tag: 'Kapahulu plate lunch crawl', weight: 72 }
      ],
      food: [
        { name: "Helena's Hawaiian Food", category: 'Local Hawaiian', rating: 4.8, reviews: 2400, review: 'James Beard, 70 years strong. Pipikaula short ribs are the move.' },
        { name: 'Marugame Udon', category: 'Udon', rating: 4.6, reviews: 4800, review: 'Hand-pulled at the counter. $7 lunch under the noodle clouds.' },
        { name: 'Side Street Inn', category: 'Bar food', rating: 4.5, reviews: 5100, review: 'Pork chops + fried rice. Local chefs eat here after their shifts.' }
      ],
      weatherT: { now: 27, condition: 'Trade winds', hi: 29, lo: 22 },
      community: [
        { author: 'Kaimana P.', initials: 'KP', snippet: "Watched the pros surf Pipeline. Sat at a shrimp truck for two hours. Realized I never wanted to leave the North Shore.", timestamp: '7h ago', reactions: 1620 }
      ]
    },

    {
      id: 'jeju', cityName: 'Jeju', countryName: 'South Korea',
      coordinates: [33.4996, 126.5312], region: 'East Asia Islands',
      shortDescription: "A volcanic island where haenyeo grandmothers free-dive for abalone and tangerine groves run to the sea.",
      visitorCount: '14.0M', trendScore: 82, bestSeason: 'Apr – Jun · Sep – Oct', localTime: '+09:00',
      landmarks: [
        { name: 'Hallasan crater hike', category: 'Volcano', description: "1,950m. South Korea\'s tallest. 8-hour return; permit required for ridge.", rating: 4.9 },
        { name: 'Seongsan Ilchulbong sunrise', category: 'Tuff cone', description: 'Climb 30 min before sunrise; volcanic crater facing the sea.', rating: 4.8 },
        { name: 'Manjanggul lava tube', category: 'Cave', description: '13km lava tunnel, 1km open to walk. Year-round cool.', rating: 4.7 },
        { name: 'Olle Trail #7', category: 'Coastal walk', description: 'Famous of 21 walking trails. Pebble beaches, fishing villages.', rating: 4.8 }
      ],
      trending: [
        { tag: 'haenyeo women diver tours', weight: 81 },
        { tag: 'black-pig BBQ', weight: 86 },
        { tag: 'tangerine farm stays', weight: 73 },
        { tag: 'Udo island bike day', weight: 79 }
      ],
      food: [
        { name: 'Donsadon', category: 'Heuk-dwaeji (black pig)', rating: 4.7, reviews: 5200, review: 'The Jeju specialty BBQ. Cured belly, raw garlic, hot stone.' },
        { name: 'Myeongjin Jeonbok', category: 'Abalone porridge', rating: 4.6, reviews: 3400, review: 'Caught by haenyeo that morning. Worth the queue.' }
      ],
      weatherT: { now: 18, condition: 'Mild', hi: 21, lo: 12 },
      community: [
        { author: 'Hye-Jin P.', initials: 'HP', snippet: "Hiked Hallasan in October. Crater rim was empty. Ate pork BBQ that night, fell asleep at 9pm. Best weekend.", timestamp: '4d ago', reactions: 740 }
      ]
    },

    {
      id: 'phuket', cityName: 'Phuket', countryName: 'Thailand',
      coordinates: [7.8804, 98.3923], region: 'Andaman Sea',
      shortDescription: "Limestone karsts rising from emerald water, long-tail boats clattering at dawn, and the most photographed sunsets in Asia.",
      visitorCount: '12.0M', trendScore: 84, bestSeason: 'Nov – Apr', localTime: '+07:00',
      landmarks: [
        { name: 'Phi Phi Islands day-boat', category: 'Islands', description: 'Maya Bay (now timed-ticketed), Monkey Beach, snorkel at Bamboo Island.', rating: 4.8 },
        { name: 'Old Phuket Town walking', category: 'Sino-Portuguese', description: 'Shophouses in pastel, kopi cafés, street art alley.', rating: 4.6 },
        { name: 'Big Buddha at sunset', category: 'Viewpoint', description: '45m marble, hilltop, the whole south of the island below.', rating: 4.7 },
        { name: 'Wat Chalong morning', category: 'Temple', description: 'Most revered on the island. Quietest before 9am.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Phang Nga kayak day', weight: 86 },
        { tag: 'Layan beach quiet north', weight: 81 },
        { tag: 'muay thai morning training', weight: 73 }
      ],
      food: [
        { name: 'Raya Restaurant', category: 'Southern Thai', rating: 4.8, reviews: 4400, review: "Crab in yellow curry. Don\'t leave without it." },
        { name: 'One Chun', category: 'Phuket Town', rating: 4.7, reviews: 6200, review: 'Hokkien noodles, mu hong pork, sino-Portuguese tile floors.' }
      ],
      weatherT: { now: 30, condition: 'Tropical', hi: 32, lo: 25 },
      community: [
        { author: 'Niran S.', initials: 'NS', snippet: "Skipped Patong, stayed near Layan. Different island entirely. Sunset swims, no clubs, lots of stars.", timestamp: '1d ago', reactions: 920 }
      ]
    },

    {
      id: 'male', cityName: 'Malé', countryName: 'Maldives',
      coordinates: [4.1755, 73.5093], region: 'Indian Ocean',
      shortDescription: "The smallest capital in Asia, built on coral, surrounded by water so blue it looks edited.",
      visitorCount: '1.9M', trendScore: 83, bestSeason: 'Dec – Apr', localTime: '+05:00',
      landmarks: [
        { name: 'Hulhumalé beach evenings', category: 'Beach', description: "Reclaimed island, locals\' weekend escape. Public, free, swimmable.", rating: 4.6 },
        { name: 'Sea-plane atoll tour', category: 'Air tour', description: '30 minutes over rings of turquoise. Worth the splurge.', rating: 4.9 },
        { name: 'Fish Market', category: 'Market', description: 'Tuna landings at dawn. Negotiate, gawk, leave with curry-cut tuna.', rating: 4.5 }
      ],
      trending: [
        { tag: 'remote-island house reefs', weight: 88 },
        { tag: 'overwater villa season pricing', weight: 82 },
        { tag: 'whale-shark snorkel Maafushi', weight: 84 }
      ],
      food: [
        { name: 'Sea House Maldives', category: 'Modern Maldivian', rating: 4.6, reviews: 1880, review: 'Rooftop view of the harbor. Mas huni breakfast is the local hug.' },
        { name: 'Symphony Restaurant', category: 'Tuna specialties', rating: 4.7, reviews: 1200, review: 'Tuna five ways. Bones-and-all freshness.' }
      ],
      weatherT: { now: 29, condition: 'Tropical', hi: 31, lo: 26 },
      community: [
        { author: 'Aiman R.', initials: 'AR', snippet: "Snorkeled with a manta ray that was larger than my dinghy. The Maldives keeps making you say 'unreal' until you give up.", timestamp: '5h ago', reactions: 2120 }
      ]
    },

    {
      id: 'mauritius', cityName: 'Port Louis', countryName: 'Mauritius',
      coordinates: [-20.1609, 57.5012], region: 'Indian Ocean',
      shortDescription: "Volcanic peaks, sugarcane fields, Creole cooking — French, Indian, African all on one plate.",
      visitorCount: '1.4M', trendScore: 79, bestSeason: 'May – Dec', localTime: '+04:00',
      landmarks: [
        { name: 'Le Morne Brabant hike', category: 'UNESCO peak', description: '4 hours, ridges into ocean, the symbol of Maroon escape.', rating: 4.9 },
        { name: 'Chamarel seven-colour earths', category: 'Geology', description: 'Volcanic mineral sand-dunes in literal pastel layers.', rating: 4.6 },
        { name: 'Pamplemousses Botanical', category: 'Garden', description: 'Centuries-old, giant water lilies, talipot palms, free guided tours.', rating: 4.7 }
      ],
      trending: [
        { tag: 'kitesurf in Le Morne lagoon', weight: 81 },
        { tag: 'dolphin swims Tamarin', weight: 76 },
        { tag: 'street dholl puri', weight: 84 }
      ],
      food: [
        { name: 'Chez Tante Athalie', category: 'Creole', rating: 4.7, reviews: 1340, review: 'Old plantation house, vintage car museum, family-recipe vindaye.' },
        { name: 'Le Capitaine', category: 'Seafood', rating: 4.6, reviews: 1820, review: 'Caudan waterfront, palm-heart salad, octopus rougaille.' }
      ],
      weatherT: { now: 24, condition: 'Mild tropical', hi: 27, lo: 19 },
      community: [
        { author: 'Yannick D.', initials: 'YD', snippet: "Inland mountains, beach, French bakery, Indian temple, Creole BBQ — all before dinner. Mauritius does layered.", timestamp: '3d ago', reactions: 580 }
      ]
    },

    {
      id: 'galapagos', cityName: 'Puerto Ayora', countryName: 'Galápagos, Ecuador',
      coordinates: [-0.7406, -90.3140], region: 'Pacific Islands',
      shortDescription: "Sea lions on the dock, blue-footed boobies on the trail, an island laboratory Darwin built his theory on.",
      visitorCount: '0.2M', trendScore: 87, bestSeason: 'Jun – Dec', localTime: '−06:00',
      landmarks: [
        { name: 'Tortuga Bay walk', category: 'Beach', description: '2.5km path to a wild beach. Marine iguanas warming on lava.', rating: 4.9 },
        { name: 'Charles Darwin Research Station', category: 'Conservation', description: "Giant tortoise nursery + Lonesome George\'s legacy. $10.", rating: 4.7 },
        { name: 'Los Tuneles snorkel', category: 'Snorkel', description: 'Isabela Island lava arches + sea turtles + reef sharks. Half-day boat.', rating: 4.9 },
        { name: 'Sierra Negra volcano rim', category: 'Volcano', description: '8-hour ride + hike. Second-largest caldera on earth.', rating: 4.8 }
      ],
      trending: [
        { tag: 'last-minute live-aboard cruises', weight: 84 },
        { tag: 'island-hopping by ferry', weight: 81 },
        { tag: 'land-based ecotours', weight: 79, context: 'cheaper than cruises, getting better' }
      ],
      food: [
        { name: 'Almar', category: 'Modern Galapagueño', rating: 4.8, reviews: 920, review: 'Yellowfin sashimi, coconut ceviche, a chef who fishes his own ingredients.' },
        { name: 'Charles Binford street kitchens', category: 'Street food', rating: 4.6, reviews: 1640, review: 'Open-air dinner row. Grilled lobster after 7pm.' }
      ],
      weatherT: { now: 24, condition: 'Pleasant', hi: 26, lo: 21 },
      community: [
        { author: 'Sofia E.', initials: 'SE', snippet: "Sat next to a sea lion at a dock café. Neither of us moved. It was the best lunch I\'ve had.", timestamp: '6d ago', reactions: 2840 }
      ]
    },

    {
      id: 'easterisland', cityName: 'Hanga Roa', countryName: 'Rapa Nui, Chile',
      coordinates: [-27.1127, -109.3497], region: 'Pacific Islands',
      shortDescription: "Eight hundred moai facing inland, the most remote inhabited island on earth, sky too clear for words.",
      visitorCount: '0.1M', trendScore: 88, bestSeason: 'Oct – Apr', localTime: '−05:00',
      landmarks: [
        { name: 'Rano Raraku moai quarry', category: 'Archaeology', description: 'Where the moai were carved. Hundreds still embedded in the slope.', rating: 5.0 },
        { name: 'Ahu Tongariki sunrise', category: 'Moai row', description: '15 restored moai at dawn. Show up at 6am, leave changed.', rating: 5.0 },
        { name: 'Anakena beach', category: 'Beach', description: 'Coconut palms, white sand, moai presiding. Where the first settlers landed.', rating: 4.8 },
        { name: 'Orongo ceremonial village', category: 'Ruins', description: 'Stone houses at the edge of a volcano crater. Birdman cult site.', rating: 4.9 }
      ],
      trending: [
        { tag: 'cultural festival Tapati', weight: 82 },
        { tag: 'horseback to roadless coast', weight: 76 },
        { tag: 'astrophotography nights', weight: 80 }
      ],
      food: [
        { name: 'Te Moana', category: 'Rapa Nui', rating: 4.8, reviews: 980, review: 'Earth-oven curanto. Tuna ceviche so fresh it bites back.' }
      ],
      weatherT: { now: 22, condition: 'Pacific breeze', hi: 24, lo: 17 },
      community: [
        { author: 'Manu T.', initials: 'MT', snippet: "Spent three days on the island. Saw fifteen tourists total. Felt like the world had paused.", timestamp: '8d ago', reactions: 1980 }
      ]
    },

    {
      id: 'tahiti', cityName: 'Papeete', countryName: 'French Polynesia',
      coordinates: [-17.5316, -149.5598], region: 'Pacific Islands',
      shortDescription: "Volcanic peaks rising out of lagoons, vanilla on the breeze, and a market that defines Polynesian comfort food.",
      visitorCount: '0.3M', trendScore: 86, bestSeason: 'May – Oct', localTime: '−10:00',
      landmarks: [
        { name: 'Marché de Papeete dawn', category: 'Market', description: 'Open 5am Sundays. Pareos, vanilla, fish wrapped in banana leaves.', rating: 4.7 },
        { name: 'Mount Aorai trek', category: 'Mountain', description: '2,066m two-day hike. Cabin overnight, sunrise above the clouds.', rating: 4.9 },
        { name: 'Te Pari cliffs boat tour', category: 'Coastline', description: 'Only-by-boat coastline of Tahiti Iti. Whale season Jul-Oct.', rating: 4.8 }
      ],
      trending: [
        { tag: "Mo'orea day-ferry", weight: 87 },
        { tag: 'whale-swim season', weight: 89 },
        { tag: 'pension family stays', weight: 82 }
      ],
      food: [
        { name: "L'O à la Bouche", category: 'French-Polynesian', rating: 4.7, reviews: 880, review: 'Mahi-mahi in lime, taro purée, garden setting in Pirae.' },
        { name: 'Les Roulottes', category: 'Food trucks', rating: 4.6, reviews: 4200, review: 'Pop-up dinner trucks on the Vaiete waterfront every night.' }
      ],
      weatherT: { now: 28, condition: 'Tropical', hi: 30, lo: 23 },
      community: [
        { author: 'Vaiana M.', initials: 'VM', snippet: "Drove around Tahiti Nui in one day. Twelve waterfalls. Lost count of black sand beaches. Polynesia is generous.", timestamp: '11d ago', reactions: 1140 }
      ]
    },

    {
      id: 'fiji', cityName: 'Suva', countryName: 'Fiji',
      coordinates: [-18.1248, 178.4501], region: 'Pacific Islands',
      shortDescription: "Mountain rainforest behind a colonial capital, kava ceremonies at sunset, and 333 islands within a ferry ride.",
      visitorCount: '0.9M', trendScore: 80, bestSeason: 'May – Oct', localTime: '+12:00',
      landmarks: [
        { name: 'Colo-i-Suva rainforest', category: 'Rainforest', description: '10km from city. Natural pools, rope swings, jungle birds.', rating: 4.7 },
        { name: 'Suva Municipal Market', category: 'Market', description: 'Tropical fruit, dalo root, the kava bundles upstairs.', rating: 4.5 },
        { name: 'Bouma waterfall day-flight', category: 'Outer island', description: 'Taveuni island, three waterfalls, swim under all of them.', rating: 4.9 }
      ],
      trending: [
        { tag: 'Yasawa island-hopping', weight: 84 },
        { tag: 'Tavuni Hill Fort tours', weight: 71 },
        { tag: 'Mamanuca surf seasons', weight: 79 }
      ],
      food: [
        { name: 'Maya Dhaba', category: 'Indo-Fijian', rating: 4.6, reviews: 1340, review: 'Indo-Fijian thali. Lamb curry, dahl, fresh roti.' },
        { name: "Tiko's Floating Restaurant", category: 'Seafood', rating: 4.5, reviews: 1280, review: 'On the harbor at sunset. Walu in coconut sauce.' }
      ],
      weatherT: { now: 26, condition: 'Tropical', hi: 28, lo: 22 },
      community: [
        { author: 'Joseva K.', initials: 'JK', snippet: "Joined a kava ceremony in a village outside Suva. Clapped three times, drank, clapped once. Time slowed down.", timestamp: '2d ago', reactions: 1340 }
      ]
    },

    {
      id: 'azores', cityName: 'Ponta Delgada', countryName: 'Azores, Portugal',
      coordinates: [37.7394, -25.6681], region: 'North Atlantic',
      shortDescription: "Nine volcanic islands in the middle of the Atlantic, hydrangea-lined roads, geothermal springs hidden in the green.",
      visitorCount: '0.7M', trendScore: 82, bestSeason: 'May – Sep', localTime: '−01:00',
      landmarks: [
        { name: 'Sete Cidades twin lakes', category: 'Caldera', description: 'Blue and green crater lakes. Walk the rim, then descend.', rating: 4.9 },
        { name: 'Furnas geothermal valley', category: 'Hot springs', description: 'Cozido cooked in volcanic earth. Public pools to soak after.', rating: 4.8 },
        { name: 'Pico mountain summit', category: 'Volcano peak', description: "Portugal\'s highest. 7-hour pre-dawn climb to a 2,351m crater.", rating: 4.9 }
      ],
      trending: [
        { tag: 'whale-watching season', weight: 88, context: 'Sperm + blue + fin whales pass annually' },
        { tag: 'natural pool swims', weight: 81 },
        { tag: 'Faial blue volcano', weight: 76 }
      ],
      food: [
        { name: 'Tasca', category: 'Modern Azorean', rating: 4.7, reviews: 1820, review: 'Pineapple-marinated tuna, raw cheese boards, perfect setting.' },
        { name: "Restaurante Tony's", category: 'Cozido', rating: 4.6, reviews: 1340, review: 'Volcano-baked stew, six meats + vegetables, in Furnas.' }
      ],
      weatherT: { now: 18, condition: 'Mild Atlantic', hi: 20, lo: 14 },
      community: [
        { author: 'Henrique F.', initials: 'HF', snippet: "Hiked Pico for the sunrise. Above the clouds, sea on every side. Geographically and emotionally, this was the highest point of the year.", timestamp: '14d ago', reactions: 1640 }
      ]
    },

    {
      id: 'bermuda', cityName: 'Hamilton', countryName: 'Bermuda',
      coordinates: [32.2949, -64.7834], region: 'North Atlantic',
      shortDescription: "Pastel houses on a fishhook-shaped island, pink sand beaches, and the British accent of the Atlantic.",
      visitorCount: '0.7M', trendScore: 76, bestSeason: 'May – Oct', localTime: '−03:00',
      landmarks: [
        { name: 'Horseshoe Bay pink sand', category: 'Beach', description: 'Coral grains tint the sand pink. Cove walks to find emptier coves.', rating: 4.8 },
        { name: 'Crystal Cave', category: 'Cave', description: 'Walk a boardwalk over a glass-clear underground lake.', rating: 4.7 },
        { name: 'Royal Naval Dockyard', category: 'Historic port', description: '19th-century British fort, ferry from Hamilton, glass-blowing studio.', rating: 4.6 }
      ],
      trending: [
        { tag: 'wreck snorkel circuit', weight: 80 },
        { tag: "rum-swizzle bar crawl", weight: 75 },
        { tag: 'Railway Trail bike', weight: 71 }
      ],
      food: [
        { name: "Mickey's Beach Bistro", category: 'Beachfront', rating: 4.7, reviews: 1840, review: "Lobster sandwich + Dark \'n\' Stormy. Bermuda in two items." }
      ],
      weatherT: { now: 23, condition: 'Subtropical', hi: 26, lo: 19 },
      community: [
        { author: 'James W.', initials: 'JW', snippet: "Spent a week in shorts and a blazer. Bermuda has its own dress code. Worked.", timestamp: '20d ago', reactions: 360 }
      ]
    },

    {
      id: 'antananarivo', cityName: 'Antananarivo', countryName: 'Madagascar',
      coordinates: [-18.8792, 47.5079], region: 'Indian Ocean',
      shortDescription: "A capital climbing twelve hills, lemur reserves an hour away, and a cuisine that mixes Africa, Asia, and France in every bowl.",
      visitorCount: '0.4M', trendScore: 77, bestSeason: 'Apr – Oct', localTime: '+03:00',
      landmarks: [
        { name: 'Andasibe-Mantadia day-trip', category: 'Rainforest', description: '3-hour drive. See indri lemurs (the singers) and chameleons.', rating: 4.9 },
        { name: 'Rova royal palace', category: 'Heritage', description: "Hilltop Merina queens\' palace. Re-opened after a long restoration.", rating: 4.6 },
        { name: 'Analakely Friday market', category: 'Market', description: 'Spices, vanilla pods, raffia baskets. Bargain hard.', rating: 4.5 }
      ],
      trending: [
        { tag: 'baobab avenue road trip', weight: 84 },
        { tag: 'Nosy Be off-grid stays', weight: 79 },
        { tag: 'vanilla farm tours', weight: 73 }
      ],
      food: [
        { name: 'La Varangue', category: 'Modern Malagasy', rating: 4.7, reviews: 1640, review: "Colonial villa, vanilla-based desserts, ze\'bu (zebu beef) tartare." }
      ],
      weatherT: { now: 21, condition: 'Mild', hi: 24, lo: 14 },
      community: [
        { author: 'Hery R.', initials: 'HR', snippet: "Heard indri lemurs sing at sunrise. Loud as foghorns, beautiful as opera. Will never forget.", timestamp: '16d ago', reactions: 1240 }
      ]
    },

    {
      id: 'saipan', cityName: 'Saipan', countryName: 'Northern Mariana Islands',
      coordinates: [15.1850, 145.7467], region: 'Pacific Islands',
      shortDescription: "Coral lagoons, WWII memorials, and the slow rhythm of an island most travelers never reach.",
      visitorCount: '0.4M', trendScore: 74, bestSeason: 'Dec – Mar', localTime: '+10:00',
      landmarks: [
        { name: 'Banzai Cliff', category: 'WWII memorial', description: 'Northern point. A sobering, beautiful spot at sunset.', rating: 4.7 },
        { name: 'Managaha snorkel boat', category: 'Island day', description: '15-min boat to an offshore islet. Coral, kayaks, fish-feeding.', rating: 4.8 },
        { name: 'Grotto cave dive', category: 'Cave dive', description: 'Famously beautiful underwater limestone cavern. Advanced cert.', rating: 4.9 }
      ],
      trending: [
        { tag: 'Rota island flights', weight: 71 },
        { tag: 'forbidden island hike', weight: 76 }
      ],
      food: [
        { name: "Shirley's Coffee Shop", category: 'Chamorro', rating: 4.6, reviews: 720, review: 'Pancit, chicken kelaguen, the place locals point to.' }
      ],
      weatherT: { now: 28, condition: 'Tropical', hi: 30, lo: 24 },
      community: [
        { author: 'Marcus C.', initials: 'MC', snippet: "Spent an afternoon at the Last Command Post in silence. Then ate kelaguen on a beach. That\'s Saipan.", timestamp: '30d ago', reactions: 280 }
      ]
    },

    // ===== AFRICA =====
    {
      id: 'lagos', cityName: 'Lagos', countryName: 'Nigeria',
      coordinates: [6.5244, 3.3792], region: 'West Africa',
      shortDescription: "Afrobeats capital of the world — galleries on the lagoon, Sunday jollof at every house, and a creative scene the rest of the planet now imports from.",
      visitorCount: '1.6M', trendScore: 89, bestSeason: 'Nov – Feb', localTime: '+01:00',
      landmarks: [
        { name: 'Nike Art Gallery', category: 'Art', description: 'Five floors of contemporary West African work. Free entry, owner often there.', rating: 4.8 },
        { name: 'Lekki Conservation Centre canopy walk', category: 'Nature', description: 'Africa\'s longest canopy walkway through a Lagos rainforest pocket.', rating: 4.6 },
        { name: 'Freedom Park', category: 'Heritage', description: 'Colonial-era prison turned open-air culture park. Live music most weekends.', rating: 4.5 },
        { name: 'Tarkwa Bay boat ride', category: 'Beach', description: '15-min speedboat from Mainland. Calm water, beach bars, no cars.', rating: 4.7 }
      ],
      trending: [
        { tag: 'detty December', weight: 95, context: 'The diaspora returns and the city does not sleep for 31 days' },
        { tag: 'Afrobeats listening bars', weight: 88 },
        { tag: 'Lekki–Ikoyi bridge runs at dawn', weight: 74 }
      ],
      food: [
        { name: 'Yellow Chilli', category: 'Modern Nigerian', rating: 4.7, reviews: 3200, review: 'Jollof rice + suya prawns. Where locals take visiting friends.' },
        { name: 'Terra Kulture', category: 'Buffet + culture', rating: 4.6, reviews: 2400, review: 'Egusi soup, plays in the theatre next door, bookshop attached.' }
      ],
      weatherT: { now: 29, condition: 'Tropical', hi: 32, lo: 24 },
      community: [
        { author: 'Tunde A.', initials: 'TA', snippet: "Friday night at New Afrika Shrine. Femi Kuti played for three hours. The drummers never stopped smiling.", timestamp: '6h ago', reactions: 980 }
      ]
    },

    {
      id: 'accra', cityName: 'Accra', countryName: 'Ghana',
      coordinates: [5.6037, -0.1870], region: 'West Africa',
      shortDescription: "The Gulf of Guinea capital — kente in the markets, jazz in the courtyards, and a coast that taught the rest of the region the rhythm of a Saturday.",
      visitorCount: '1.1M', trendScore: 84, bestSeason: 'Nov – Mar', localTime: '+00:00',
      landmarks: [
        { name: 'Jamestown lighthouse walk', category: 'Heritage', description: 'Colonial-era fishing quarter. Climb the lighthouse for the harbour view.', rating: 4.6 },
        { name: 'Makola Market', category: 'Market', description: 'Endless stalls — kente, palm oil, snails, smoked fish. Bring small bills.', rating: 4.5 },
        { name: 'W. E. B. Du Bois Centre', category: 'Memorial', description: 'The pan-Africanist\'s last home + library. Quiet, moving, free.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Year of Return aftershock', weight: 86 },
        { tag: 'Osu beach jazz Sundays', weight: 79 },
        { tag: 'Cape Coast castle day trip', weight: 82, context: 'Three hours west — a hard, necessary visit' }
      ],
      food: [
        { name: 'Buka', category: 'Pan-African', rating: 4.7, reviews: 2100, review: 'Jollof, grilled tilapia, banku. The bar to compare every other West African meal to.' },
        { name: 'Coco Lounge', category: 'Modern Ghanaian', rating: 4.5, reviews: 1480, review: 'Rooftop, sea breeze, a pepper soup that re-orders your priorities.' }
      ],
      weatherT: { now: 28, condition: 'Coastal', hi: 31, lo: 24 },
      community: [
        { author: 'Ama O.', initials: 'AO', snippet: "Sunset jazz at +233 on a Wednesday. Locals, expats, and one trumpet player who closed the place at 2am.", timestamp: '2d ago', reactions: 540 }
      ]
    },

    {
      id: 'addisababa', cityName: 'Addis Ababa', countryName: 'Ethiopia',
      coordinates: [9.0320, 38.7421], region: 'East African Highlands',
      shortDescription: "A 2,300m capital with coffee cooler than its altitude, the oldest hominid in storage, and a cuisine that turns a single shared platter into an evening.",
      visitorCount: '1.0M', trendScore: 82, bestSeason: 'Oct – Mar', localTime: '+03:00',
      landmarks: [
        { name: 'National Museum (Lucy)', category: 'Museum', description: 'The 3.2 million-year-old Australopithecus. The room is smaller than you think.', rating: 4.7 },
        { name: 'Mercato', category: 'Market', description: 'Largest open-air market in Africa. Spice alleys are the calmest section.', rating: 4.4 },
        { name: 'Entoto hill viewpoint', category: 'Mountain', description: '3,200m peak above the city. Eucalyptus forest + first emperor\'s church.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Lalibela weekend flights', weight: 80 },
        { tag: 'Tomoca coffee pilgrimage', weight: 87, context: 'The 1953 roaster locals still queue for' },
        { tag: 'Simien Mountains trek', weight: 75 }
      ],
      food: [
        { name: 'Yod Abyssinia', category: 'Cultural restaurant', rating: 4.6, reviews: 2780, review: 'Doro wat + injera, live azmari music, eskista dancing by the third course.' },
        { name: 'Tomoca', category: 'Coffee bar', rating: 4.8, reviews: 5600, review: 'Stand at the counter, drink it black, leave changed. €0.40.' }
      ],
      weatherT: { now: 18, condition: 'Highland temperate', hi: 22, lo: 11 },
      community: [
        { author: 'Selam B.', initials: 'SB', snippet: "Did a proper jebena coffee ceremony at a family\'s house. Forty minutes of incense, popcorn, and three rounds. I will never drink coffee the same way.", timestamp: '5d ago', reactions: 720 }
      ]
    },

    {
      id: 'kigali', cityName: 'Kigali', countryName: 'Rwanda',
      coordinates: [-1.9706, 30.1044], region: 'East Africa',
      shortDescription: "A capital of clean streets and steep hills, an honest memorial, and rolling country roads leading to mountain gorillas two hours north.",
      visitorCount: '0.7M', trendScore: 81, bestSeason: 'Jun – Sep · Dec – Feb', localTime: '+02:00',
      landmarks: [
        { name: 'Kigali Genocide Memorial', category: 'Memorial', description: 'Free, devastating, essential. Plan two hours and a quiet afternoon after.', rating: 4.9 },
        { name: 'Volcanoes National Park trek', category: 'Wildlife', description: '2-hour drive north. Mountain gorilla permit required — book months ahead.', rating: 5.0 },
        { name: 'Inema Arts Center', category: 'Art', description: 'Working studios, Thursday-night drum jams, contemporary Rwandan work.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Lake Kivu road trip', weight: 78 },
        { tag: 'Nyungwe canopy walk', weight: 74 },
        { tag: 'Made-in-Rwanda fashion week', weight: 71 }
      ],
      food: [
        { name: 'Repub Lounge', category: 'Modern Rwandan', rating: 4.7, reviews: 1320, review: 'Brochettes, ibirayi, hillside terrace. Locals\' favourite for visitors.' },
        { name: 'Question Coffee', category: 'Specialty coffee', rating: 4.8, reviews: 2100, review: 'Women-grown beans, perfect espresso. The bourbon variety from Huye is unreal.' }
      ],
      weatherT: { now: 22, condition: 'Mild', hi: 26, lo: 16 },
      community: [
        { author: 'Eric M.', initials: 'EM', snippet: "Spent an hour with a silverback two metres away. He yawned, ate bamboo, ignored us. Then we hiked out and didn\'t talk for a long time.", timestamp: '12d ago', reactions: 2240 }
      ]
    },

    {
      id: 'livingstone', cityName: 'Livingstone (Victoria Falls)', countryName: 'Zambia',
      coordinates: [-17.8419, 25.8543], region: 'Southern Africa',
      shortDescription: "Mosi-oa-Tunya — the smoke that thunders. A small town beside one of the seven natural wonders, and a launch pad for hippos, sunsets, and the Devil\'s Pool.",
      visitorCount: '0.4M', trendScore: 86, bestSeason: 'Jun – Oct', localTime: '+02:00',
      landmarks: [
        { name: 'Victoria Falls (Zambia side)', category: 'Waterfall', description: '1.7 km wide. Walk Knife-Edge Bridge for a soaking and a rainbow.', rating: 4.9 },
        { name: 'Devil\'s Pool swim', category: 'Adventure', description: 'Swim to the literal edge of the falls (dry season only). Guide mandatory.', rating: 4.9 },
        { name: 'Zambezi sunset cruise', category: 'River', description: 'Hippos, elephants on the bank, sundowner G&Ts. Two-hour boat.', rating: 4.7 }
      ],
      trending: [
        { tag: 'microlight over the falls', weight: 83 },
        { tag: 'Chobe NP day-trip', weight: 79, context: '90-min drive, four-country viewpoint, lion-thick park' }
      ],
      food: [
        { name: 'Olga\'s Italian Corner', category: 'Pizza + project', rating: 4.7, reviews: 1640, review: 'Funds a youth training school. Wood-fired pizza, courtyard, kids learn the trade.' }
      ],
      weatherT: { now: 26, condition: 'Dry savannah', hi: 30, lo: 18 },
      community: [
        { author: 'Chipo M.', initials: 'CM', snippet: "Did the Devil\'s Pool at sunrise. Standing on the edge, water at your throat, looking down 100m of white air. Worth every kwacha.", timestamp: '8d ago', reactions: 1880 }
      ]
    },

    // ===== MAINLAND CHINA =====
    {
      id: 'chengdu', cityName: 'Chengdu', countryName: 'China',
      coordinates: [30.5728, 104.0668], region: 'Sichuan',
      shortDescription: "Tea-house pace, panda research base, and a numbing-spicy cuisine the rest of China keeps trying to imitate. The slow capital of a fast country.",
      visitorCount: '6.8M', trendScore: 88, bestSeason: 'Mar – May · Sep – Nov', localTime: '+08:00',
      landmarks: [
        { name: 'Chengdu Panda Research Base', category: 'Wildlife', description: 'Arrive at 8am for the feeding window. Cubs in the nursery if you\'re lucky.', rating: 4.8 },
        { name: 'Renmin Park tea house', category: 'Culture', description: 'Bamboo chairs, 1 yuan ear-cleaners, mahjong clatter. Sit for half a day.', rating: 4.7 },
        { name: 'Jinli + Wuhou Shrine', category: 'Old town', description: 'Pedestrianised lanes, Three Kingdoms memorial, dan-dan noodles every 5m.', rating: 4.5 },
        { name: 'Mt Qingcheng day-trip', category: 'Mountain', description: '90-min drive. Taoist mountain with mist, monkeys, and pavilions.', rating: 4.7 }
      ],
      trending: [
        { tag: 'hotpot rivalry: Lao Ma vs Shu Jiu Xiang', weight: 92 },
        { tag: 'panda volunteer programmes', weight: 78 },
        { tag: 'Leshan Giant Buddha day-trip', weight: 80 }
      ],
      food: [
        { name: 'Chen Mapo Tofu', category: 'Sichuan canonical', rating: 4.7, reviews: 8800, review: 'The original 1862 shop. Numbing-spicy tofu that doubles as a religious experience.' },
        { name: 'Long Chao Shou', category: 'Wontons', rating: 4.6, reviews: 4200, review: 'Twelve regional snacks on one tray for ¥38. Locals eat here before the bullet train.' }
      ],
      weatherT: { now: 17, condition: 'Misty', hi: 21, lo: 12 },
      community: [
        { author: 'Xiao Wei L.', initials: 'XL', snippet: "Spent four hours in a Renmin Park tea house. Read a book, watched grandparents play mahjong, paid ¥20. Best afternoon of the trip.", timestamp: '3d ago', reactions: 920 }
      ]
    },

    {
      id: 'xian', cityName: "Xi'an", countryName: 'China',
      coordinates: [34.3416, 108.9398], region: 'Shaanxi',
      shortDescription: "Eastern end of the Silk Road — 6,000 terracotta soldiers, a Muslim Quarter that smells like cumin lamb at midnight, and city walls you can bike around at dawn.",
      visitorCount: '4.5M', trendScore: 87, bestSeason: 'Mar – May · Sep – Oct', localTime: '+08:00',
      landmarks: [
        { name: 'Terracotta Army (Pit 1)', category: 'Archaeology', description: '6,000 unique soldiers. Get there at opening for the long shot from the back wall.', rating: 4.9 },
        { name: 'City Wall night bike', category: 'Wall', description: '13.7 km loop on a 14th-century wall. Rent at South Gate after sunset.', rating: 4.8 },
        { name: 'Muslim Quarter food walk', category: 'Food street', description: 'Hand-pulled biang biang noodles, lamb skewers, pomegranate juice. Loud and good.', rating: 4.7 },
        { name: 'Big Wild Goose Pagoda', category: 'Buddhist', description: 'Tang-dynasty pagoda. Climb for the city view; come back at night for the fountain.', rating: 4.6 }
      ],
      trending: [
        { tag: "Tang-dynasty hanfu rentals", weight: 84, context: 'Costume photos in the Muslim Quarter dominate Xiaohongshu' },
        { tag: "Huashan plank-walk hike", weight: 81 },
        { tag: 'biangbiang noodle map', weight: 77 }
      ],
      food: [
        { name: 'Lao Sun Jia', category: 'Yangrou paomo', rating: 4.6, reviews: 6100, review: 'Tear your own flatbread into the lamb broth. 120-year-old recipe.' },
        { name: 'Wei Jia Liang Pi', category: 'Cold noodles', rating: 4.7, reviews: 4900, review: 'Cumin, chilli oil, gluten cubes. ¥10. The Xi\'an snack to compare every other to.' }
      ],
      weatherT: { now: 16, condition: 'Dry continental', hi: 22, lo: 9 },
      community: [
        { author: 'Wang Lei.', initials: 'WL', snippet: "Cycled the city walls at 6am. Sun rose behind the Bell Tower. Empty except for one tai-chi class.", timestamp: '5d ago', reactions: 1240 }
      ]
    },

    {
      id: 'hangzhou', cityName: 'Hangzhou', countryName: 'China',
      coordinates: [30.2741, 120.1551], region: 'Zhejiang',
      shortDescription: "West Lake on one side, tea terraces on the other, and a song-dynasty heritage every poet of the millennium has tried to describe.",
      visitorCount: '5.4M', trendScore: 85, bestSeason: 'Mar – May · Sep – Nov', localTime: '+08:00',
      landmarks: [
        { name: 'West Lake (Su causeway)', category: 'Lake', description: 'Walk or bike the 2.8 km tree-lined causeway. Best at sunrise or after rain.', rating: 4.9 },
        { name: 'Longjing tea fields', category: 'Tea', description: 'Walk the terraces in Meijiawu. Pick April for the harvest, drink Mingqian green.', rating: 4.7 },
        { name: 'Lingyin Temple', category: 'Buddhist', description: 'Cliff-side carvings + active monastery. Skip the cable car, walk the back path.', rating: 4.7 },
        { name: 'Wuzhen water town', category: 'Day-trip', description: 'One-hour east. A canal town that\'s actually lived in. Stay overnight for the empty mornings.', rating: 4.6 }
      ],
      trending: [
        { tag: 'Asia Games legacy parks', weight: 79 },
        { tag: 'Longjing pre-Qingming harvest', weight: 86, context: 'Spring 2026 first-flush hype' },
        { tag: 'electric scooter West Lake loop', weight: 73 }
      ],
      food: [
        { name: 'Lou Wai Lou', category: 'Hangzhou classical', rating: 4.5, reviews: 7400, review: 'Beggar\'s chicken + West Lake fish in vinegar. 1848 establishment on the lake.' },
        { name: 'Green Tea Restaurant', category: 'Modern Zhejiang', rating: 4.6, reviews: 5200, review: 'Tea-smoked duck, bamboo shoot soup. The chain that started here.' }
      ],
      weatherT: { now: 18, condition: 'Misty', hi: 23, lo: 12 },
      community: [
        { author: 'Lin Jie.', initials: 'LJ', snippet: "Rented a boat for two hours on West Lake. Just me and an old man rowing slowly. The fog made it feel like a Song-dynasty painting.", timestamp: '7d ago', reactions: 780 }
      ]
    },

    {
      id: 'guilin', cityName: 'Guilin (Yangshuo)', countryName: 'China',
      coordinates: [25.2736, 110.2907], region: 'Guangxi',
      shortDescription: "Karst peaks rising out of rice paddies along the Li River — the landscape on the back of the ¥20 note, and the cycling-and-bamboo-raft afternoon to match.",
      visitorCount: '2.3M', trendScore: 83, bestSeason: 'Apr – Oct', localTime: '+08:00',
      landmarks: [
        { name: 'Li River bamboo raft', category: 'River', description: 'From Yangdi to Xingping — 4 hours past the ¥20 view. Quieter than the big cruises.', rating: 4.9 },
        { name: 'Longji rice terraces', category: 'Mountain', description: '2-hour drive. Two-thousand-year-old Zhuang terraces. Stay one night in Ping\'an village.', rating: 4.8 },
        { name: 'Moon Hill bike + climb', category: 'Karst', description: 'Cycle 8 km from Yangshuo, climb 800 steps to a natural arch. Sunset is the move.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Yangshuo climbing routes', weight: 80, context: 'World-class limestone, 1000+ routes' },
        { tag: 'Liu Sanjie light show', weight: 76 },
        { tag: 'misty-morning karst photography', weight: 84 }
      ],
      food: [
        { name: 'Pulan beer fish', category: 'Local specialty', rating: 4.6, reviews: 2100, review: 'River fish cooked in Liquan beer, tomato, peppers. Yangshuo\'s defining dish.' }
      ],
      weatherT: { now: 22, condition: 'Humid subtropical', hi: 27, lo: 17 },
      community: [
        { author: 'Chen Yu.', initials: 'CY', snippet: "Cycled the Yulong River valley at dawn. Buffalo in the river, fishermen with cormorants, mist on every peak. Nothing has ever looked more like a painting.", timestamp: '11d ago', reactions: 1640 }
      ]
    },

    // ===== CONTINENTAL US =====
    {
      id: 'losangeles', cityName: 'Los Angeles', countryName: 'United States',
      coordinates: [34.0522, -118.2437], region: 'West Coast US',
      shortDescription: "A city of micro-neighbourhoods stitched by freeways — taco trucks in Boyle Heights, surfers in Malibu, and a sunset over the Pacific somebody put on every postcard for a reason.",
      visitorCount: '49M', trendScore: 90, bestSeason: 'Mar – May · Oct – Nov', localTime: '−08:00',
      landmarks: [
        { name: 'Griffith Observatory at dusk', category: 'View', description: 'Free planetarium, free city view, free public telescope. Arrive 6pm, leave at 10.', rating: 4.8 },
        { name: 'Getty Center', category: 'Museum', description: 'Cable car up the hill, garden and Old Masters, no admission fee. Park $20.', rating: 4.8 },
        { name: 'Venice canals walk', category: 'Neighbourhood', description: '100-year-old replica of Venice canals. 30-minute loop, locals sit on the bridges.', rating: 4.6 },
        { name: 'Grand Central Market', category: 'Food hall', description: 'A century-old hall — 40 stalls, eat your way from breakfast to lunch.', rating: 4.7 }
      ],
      trending: [
        { tag: 'natural wine in Highland Park', weight: 87 },
        { tag: 'taco map of East LA', weight: 91, context: 'King Taco vs Mariscos Jalisco — pick a side' },
        { tag: 'Topanga + Malibu canyon hikes', weight: 76 }
      ],
      food: [
        { name: 'Bestia', category: 'Italian', rating: 4.8, reviews: 11400, review: 'Charcuterie + pasta + a wood oven. Book a month out.' },
        { name: 'Sushi Note', category: 'Sushi', rating: 4.8, reviews: 1980, review: 'Sherman Oaks omakase + wine pairings. The bar seat is the move.' },
        { name: 'Guisados', category: 'Tacos', rating: 4.7, reviews: 6400, review: 'Stewed-meat tacos on hand-pressed tortillas. Try the sampler.' }
      ],
      weatherT: { now: 22, condition: 'Sunny', hi: 25, lo: 15 },
      community: [
        { author: 'Diana V.', initials: 'DV', snippet: "Drove PCH from Santa Monica to Trestles at 6am. Empty. Stopped at every overlook. Ate breakfast burritos in Malibu. Best Saturday in years.", timestamp: '4h ago', reactions: 1620 }
      ]
    },

    {
      id: 'seattle', cityName: 'Seattle', countryName: 'United States',
      coordinates: [47.6062, -122.3321], region: 'Pacific Northwest US',
      shortDescription: "A city of rain, coffee, and a volcano on every clear horizon. Pike Place at dawn, Ballard at golden hour, ferries running through everything.",
      visitorCount: '40M', trendScore: 82, bestSeason: 'Jul – Sep', localTime: '−08:00',
      landmarks: [
        { name: 'Pike Place Market at 7am', category: 'Market', description: 'Watch the fish thrown, the first flowers laid out, the original Starbucks empty. Beat the cruise crowds.', rating: 4.7 },
        { name: 'Discovery Park lighthouse loop', category: 'Park', description: '7 km loop — forest, bluff, beach, lighthouse, no city sounds. Free.', rating: 4.8 },
        { name: 'Chihuly Garden + Glass', category: 'Art', description: 'Below the Space Needle. Glass sculptures so large they\'re architecture.', rating: 4.7 },
        { name: 'Bainbridge Island ferry', category: 'Boat', description: '$9 round trip, 35-minute crossing, best city skyline in the country. Bring a coffee.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Ballard Sunday farmers', weight: 80 },
        { tag: 'Mount Rainier wildflower hikes', weight: 84, context: 'Skyline Trail peak bloom mid-July' },
        { tag: 'third-wave coffee crawl', weight: 78 }
      ],
      food: [
        { name: 'Canlis', category: 'PNW fine dining', rating: 4.9, reviews: 2240, review: 'A 1950 institution with a mountain view. Worth dressing up for.' },
        { name: 'Paseo', category: 'Cuban sandwich', rating: 4.7, reviews: 4800, review: 'Caramelised onions, garlic aioli, slow-roasted pork. Cash only.' }
      ],
      weatherT: { now: 14, condition: 'Mild cloudy', hi: 18, lo: 9 },
      community: [
        { author: 'Erin K.', initials: 'EK', snippet: "Drove up to Paradise on Rainier at 5am. Whole mountain pink, no one else around. Drove back, got a flat white, opened the laptop. Best meeting prep ever.", timestamp: '1d ago', reactions: 540 }
      ]
    },

    {
      id: 'austin', cityName: 'Austin', countryName: 'United States',
      coordinates: [30.2672, -97.7431], region: 'Texas',
      shortDescription: "Live music every night of the week, smoked brisket queues that start at 8am, and a Hill Country sunset that ends every weekend you spend here.",
      visitorCount: '32M', trendScore: 85, bestSeason: 'Mar – May · Oct – Nov', localTime: '−06:00',
      landmarks: [
        { name: 'Congress Bridge bats', category: 'Wildlife', description: '1.5 million Mexican free-tailed bats emerge at dusk Mar–Oct. Bring a kayak.', rating: 4.7 },
        { name: 'Barton Springs Pool', category: 'Swimming', description: 'Spring-fed, 20°C year-round, 300m long. The closest Austin has to a religion.', rating: 4.8 },
        { name: 'South Congress walk', category: 'Neighbourhood', description: 'Vintage shops, boot makers, food trucks, and the original Continental Club.', rating: 4.6 }
      ],
      trending: [
        { tag: 'East 6th honky-tonks', weight: 82 },
        { tag: 'brisket pilgrimage queue', weight: 91, context: 'Franklin opens at 11am. Be there at 9.' },
        { tag: 'Hamilton Pool reservations', weight: 78 }
      ],
      food: [
        { name: 'Franklin Barbecue', category: 'BBQ', rating: 4.9, reviews: 13200, review: 'Brisket that has converted vegetarians. Cash, 2-3 hour line, worth every minute.' },
        { name: 'Uchi', category: 'Japanese', rating: 4.8, reviews: 5400, review: 'Tyson Cole\'s flagship. Hama chili and machi cure — both 20-year menu staples.' },
        { name: 'Veracruz All Natural', category: 'Tacos', rating: 4.7, reviews: 6700, review: 'Migas taco at 8am from a trailer. Best $4 you spend in Texas.' }
      ],
      weatherT: { now: 24, condition: 'Warm sunny', hi: 28, lo: 17 },
      community: [
        { author: 'Marcus H.', initials: 'MH', snippet: "Floated the Comal in San Marcos with a tube and a 12-pack of Topo Chico. Six hours, two sunburns, met three different birthday parties. Texas summer encapsulated.", timestamp: '3d ago', reactions: 720 }
      ]
    },

    {
      id: 'boston', cityName: 'Boston', countryName: 'United States',
      coordinates: [42.3601, -71.0589], region: 'New England US',
      shortDescription: "A walkable colonial city in a country full of car ones — red-brick rowhouses, an Atlantic harbour, and the densest concentration of university students on the planet.",
      visitorCount: '23M', trendScore: 83, bestSeason: 'May – Oct', localTime: '−05:00',
      landmarks: [
        { name: 'Freedom Trail', category: 'History', description: '4 km of red brick from Boston Common to Bunker Hill. Free, 17 stops, self-guided.', rating: 4.7 },
        { name: 'Isabella Stewart Gardner Museum', category: 'Art', description: 'A Venetian palazzo in Boston. Skip the audio guide; wander.', rating: 4.8 },
        { name: 'Cambridge bookshop crawl', category: 'Books', description: 'Harvard Square: Harvard Book Store + Grolier (poetry, since 1927) + Raven.', rating: 4.6 },
        { name: 'North End cannoli walk', category: 'Food', description: 'Mike\'s vs Modern. Buy from both. Decide on a bench in Christopher Columbus Park.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Salem day-trip in October', weight: 87 },
        { tag: 'Seaport pop-up oyster shucks', weight: 76 },
        { tag: 'Cape Cod long weekend', weight: 81 }
      ],
      food: [
        { name: 'Neptune Oyster', category: 'New England seafood', rating: 4.8, reviews: 8900, review: 'Hot-buttered lobster roll. No reservations, queue is part of it.' },
        { name: 'Giulia', category: 'Italian', rating: 4.7, reviews: 2700, review: 'Hand-rolled pasta on a marble table you can watch them work. Book 30 days out.' }
      ],
      weatherT: { now: 16, condition: 'Cool clear', hi: 21, lo: 10 },
      community: [
        { author: 'Sarah O.', initials: 'SO', snippet: "Walked the Freedom Trail in light rain. Empty graveyards, the Old North Church organ, a Sam Adams in a 1795 tavern. Felt like 1773.", timestamp: '6d ago', reactions: 480 }
      ]
    },

    {
      id: 'miami', cityName: 'Miami', countryName: 'United States',
      coordinates: [25.7617, -80.1918], region: 'Southeast US',
      shortDescription: "Art-deco pastels on Ocean Drive, Cuban coffee at every corner, and a Caribbean-meets-skyline that\'s become the new American downtown.",
      visitorCount: '24M', trendScore: 86, bestSeason: 'Dec – Apr', localTime: '−05:00',
      landmarks: [
        { name: 'Wynwood Walls', category: 'Street art', description: 'Open-air warehouse-mural district. Walk it once at noon, again at dusk.', rating: 4.7 },
        { name: 'Vizcaya Museum + Gardens', category: 'Estate', description: 'A 1916 industrialist\'s Italian Renaissance villa on Biscayne Bay. Time it for low tide.', rating: 4.8 },
        { name: 'Little Havana on a Friday', category: 'Neighbourhood', description: 'Calle Ocho — domino park, cigar rollers, the Versailles bakery line.', rating: 4.6 },
        { name: 'Everglades airboat (sunrise)', category: 'Wildlife', description: '45 min drive west. Alligators within arm\'s reach, fewer crowds before 9am.', rating: 4.7 }
      ],
      trending: [
        { tag: 'Edgewater high-rise residences', weight: 78 },
        { tag: 'Art Basel December chaos', weight: 88 },
        { tag: 'colada at 3pm', weight: 84, context: 'Cuban espresso, communal cup, the Miami afternoon ritual' }
      ],
      food: [
        { name: 'Joe\'s Stone Crab', category: 'Seafood', rating: 4.6, reviews: 11900, review: 'Stone crab claws Oct–May. No reservations, the line is the price.' },
        { name: 'Versailles', category: 'Cuban', rating: 4.5, reviews: 9800, review: 'Ropa vieja + medianoche. The walk-up window pours the best colada in town.' }
      ],
      weatherT: { now: 27, condition: 'Subtropical', hi: 30, lo: 22 },
      community: [
        { author: 'Camila R.', initials: 'CR', snippet: "Took the 10am boat to Stiltsville. Wooden houses on stilts in the bay, dolphins underneath. Felt like a Miami nobody on Instagram has found yet.", timestamp: '2d ago', reactions: 690 }
      ]
    }
  ];

  // Expand compact weather + push to global atlas
  cities.forEach((c) => {
    const w = c.weatherT;
    c.weather = {
      now: w.now,
      condition: w.condition,
      high: w.hi,
      low: w.lo,
      series: series(w.lo, w.hi)
    };
    c.forecast = fc(w.hi, w.lo);
    delete c.weatherT;
    window.TERRA_CITIES.push(c);
  });
})();
