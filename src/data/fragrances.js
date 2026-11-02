import rougeNoirImg from '../assets/rouge-noir.jpg'
import goldenHourImg from '../assets/golden-hour.jpg'
import roseEternelleImg from '../assets/rose-eternelle.jpg'
import ombreRoyaleImg from '../assets/ombre-royale.jpg'

export const FRAGRANCES = [
  {
    id: 'rouge-noir',
    name: 'Rouge Noir',
    subtitle: 'Extrait de Parfum',
    concentration: '32% Concentration • Pure Extrait',
    price: 285,
    rating: 4.9,
    reviewsCount: 142,
    tag: 'Bestseller',
    family: 'Amber & Gourmand',
    familySlug: 'amber',
    mood: 'Intimate & Sensual',
    occasion: 'Gala & Evening',
    image: rougeNoirImg,
    description: 'An intoxicating narcotic elixir blending sun-drenched black cherry, smoked damask rose, and smoldering bourbon vanilla in dark Madagascar ebony.',
    perfumerStory: 'Created in collaboration with Master Nez Jean-Claude Delacroix, Rouge Noir captures the whispered mysteries of midnight salons in Saint-Germain-des-Prés.',
    pyramid: {
      top: [
        { note: 'Black Cherry Morello', desc: 'Liqueur-soaked richness' },
        { note: 'Calabrian Bergamot', desc: 'Luminous solar burst' },
        { note: 'Pink Peppercorn', desc: 'Vibrant sparkling spice' }
      ],
      heart: [
        { note: 'Centifolia Rose Absolue', desc: 'Velvety May rose petals' },
        { note: 'Smoked Plum', desc: 'Sensual fruit nectar' },
        { note: 'Egyptian Jasmine', desc: 'Night-blooming intoxicating floral' }
      ],
      base: [
        { note: 'Madagascar Bourbon Vanilla', desc: 'Aged 18 months in oak barrels' },
        { note: 'Ambergris & Roasted Tonka', desc: 'Radiant warm skin sillage' },
        { note: 'Haitian Vetiver & Ebony', desc: 'Structured smoky wood foundation' }
      ]
    },
    specs: {
      longevity: '14+ Hours',
      sillage: 'Enveloping & Memorable',
      season: 'Autumn / Winter / Evening',
      gender: 'Gender-free Elegance'
    },
    accords: ['Warm Spicy', 'Amber', 'Fruity Balsamic', 'Woody Velvet'],
    sizes: [
      { ml: 50, price: 210 },
      { ml: 100, price: 285, default: true },
      { ml: 200, price: 420, refillable: true }
    ]
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    subtitle: 'Eau de Parfum Intense',
    concentration: '24% Concentration • High Sillage',
    price: 260,
    rating: 4.8,
    reviewsCount: 98,
    tag: 'Signature Solar',
    family: 'Fresh & Solar',
    familySlug: 'fresh',
    mood: 'Fresh & Radiant',
    occasion: 'Daily Signature',
    image: goldenHourImg,
    description: 'A radiant symphony of liquid amber, Kashmir saffron, golden neroli, and creamy Mysore sandalwood that captures the eternal glow of Parisian dusk.',
    perfumerStory: 'Inspired by the warm golden light slanting through tall Haussmannian windows overlooking the Tuileries gardens at 7 PM in July.',
    pyramid: {
      top: [
        { note: 'Italian Neroli', desc: 'Sparkling orange blossom nectar' },
        { note: 'Kashmir Saffron', desc: 'Precious golden red stigma thread' },
        { note: 'Sunlit Mandarin', desc: 'Zesty Mediterranean citrus' }
      ],
      heart: [
        { note: 'Golden Amber Resin', desc: 'Honeyed warmth and crystalline glow' },
        { note: 'Heliotrope Blossom', desc: 'Almond-faceted powder elegance' },
        { note: 'Cardamom Pods', desc: 'Subtle aromatic dry warmth' }
      ],
      base: [
        { note: 'Mysore Sandalwood', desc: 'Creamy sacred timber' },
        { note: 'White Cedarwood', desc: 'Airy architectural dry wood' },
        { note: 'Cashmere Musk', desc: 'Soft cocoon of second skin' }
      ]
    },
    specs: {
      longevity: '11+ Hours',
      sillage: 'Radiant & Welcoming',
      season: 'Spring / Summer / Golden Dusk',
      gender: 'Unisex Solar Harmony'
    },
    accords: ['Solar Amber', 'Warm Spice', 'Citrus Blossom', 'Creamy Sandalwood'],
    sizes: [
      { ml: 50, price: 195 },
      { ml: 100, price: 260, default: true },
      { ml: 200, price: 390, refillable: true }
    ]
  },
  {
    id: 'rose-eternelle',
    name: 'Rose Éternelle',
    subtitle: 'Extrait de Parfum',
    concentration: '30% Concentration • Hand-harvested',
    price: 295,
    rating: 5.0,
    reviewsCount: 164,
    tag: 'Haute Couture',
    family: 'Floral & Powdery',
    familySlug: 'floral',
    mood: 'Romantic & Timeless',
    occasion: 'Intimate Encounters',
    image: roseEternelleImg,
    description: 'An architectural tribute to the queen of flowers. Five thousand hand-harvested May roses distilled at dawn in Grasse, kissed by dew and crystallized orris.',
    perfumerStory: 'Our heritage formula preserved since 1912. Every flacon requires an entire basket of Rose de Mai harvested exclusively within three weeks of May bloom.',
    pyramid: {
      top: [
        { note: 'Rosewater Dew', desc: 'Crisp morning petal distillation' },
        { note: 'Lychee Nectar', desc: 'Juicy crystalline fruit spark' },
        { note: 'Pink Grapefruit', desc: 'Vibrant modern brightness' }
      ],
      heart: [
        { note: 'Grasse Rose de Mai', desc: 'Centifolia absolue harvested at 6 AM' },
        { note: 'Damask Rose Essence', desc: 'Honeyed, deep crimson petal depth' },
        { note: 'Florentine Orris Butter', desc: 'Aged 3-year noble violet powder' }
      ],
      base: [
        { note: 'Crystal White Musk', desc: 'Clean silken laundry softness' },
        { note: 'Santal Blanc', desc: 'Milky pale wood accord' },
        { note: 'Ambrette Seed', desc: 'Botanical musk with subtle leather facet' }
      ]
    },
    specs: {
      longevity: '12+ Hours',
      sillage: 'Airy yet Persistent',
      season: 'All Seasons / Floral Connoisseur',
      gender: 'Neo-Classical Floral'
    },
    accords: ['Centifolia Rose', 'Powdery Orris', 'Dewy Petals', 'Soft White Musk'],
    sizes: [
      { ml: 50, price: 220 },
      { ml: 100, price: 295, default: true },
      { ml: 200, price: 440, refillable: true }
    ]
  },
  {
    id: 'ombre-royale',
    name: 'Ombre Royale',
    subtitle: 'Pure Parfum Elixir',
    concentration: '35% Concentration • Aged Vintage',
    price: 340,
    rating: 4.9,
    reviewsCount: 87,
    tag: 'Collector Edition',
    family: 'Woody & Oriental',
    familySlug: 'woody',
    mood: 'Mysterious & Nocturnal',
    occasion: 'Gala & Regal Presence',
    image: ombreRoyaleImg,
    description: 'A regal cloak of smoked Royal Oud from Cambodia, silver frankincense tears, charred birch leather, and velvety dark cocoa nibs.',
    perfumerStory: 'Crafted for connoisseurs of extreme depth. Matured for six months in French charred oak barrels before being filtered and poured by hand.',
    pyramid: {
      top: [
        { note: 'Smoked Frankincense', desc: 'Sacred resin vapors from Oman' },
        { note: 'Coriander Seed', desc: 'Fresh aromatic spice punch' },
        { note: 'Bitter Bergamot Peel', desc: 'Dark citrus bitterness' }
      ],
      heart: [
        { note: 'Aged Cambodian Oud', desc: 'Rich balsamic animalic wood note' },
        { note: 'Leather Accord', desc: 'Soft saddlery and cured suede' },
        { note: 'Dark Cocoa Nibs', desc: 'Raw roasted bitter chocolate nuance' }
      ],
      base: [
        { note: 'Javanese Smoked Vetiver', desc: 'Earthy root darkness' },
        { note: 'Benzoin Siam', desc: 'Warm vanilla-resinous comfort' },
        { note: 'Atlas Cedar & Birch Tar', desc: 'Smoldering campfire nobility' }
      ]
    },
    specs: {
      longevity: '18+ Hours',
      sillage: 'Commanding & Unforgettable',
      season: 'Winter Nights / Formal Occasions',
      gender: 'Regal Dark Woody'
    },
    accords: ['Smoked Oud', 'Sacred Resins', 'Dark Leather', 'Earthy Woods'],
    sizes: [
      { ml: 50, price: 250 },
      { ml: 100, price: 340, default: true },
      { ml: 200, price: 490, refillable: true }
    ]
  }
]

export const COMPLIMENTARY_SAMPLES = [
  { id: 's-rouge', name: 'Rouge Noir (2ml)', desc: 'Black Cherry, Rose & Bourbon Vanilla' },
  { id: 's-golden', name: 'Golden Hour (2ml)', desc: 'Solar Amber, Saffron & Sandalwood' },
  { id: 's-rose', name: 'Rose Éternelle (2ml)', desc: 'Grasse May Rose & Florentine Orris' },
  { id: 's-ombre', name: 'Ombre Royale (2ml)', desc: 'Smoked Cambodian Oud & Royal Resins' }
]

export const QUIZ_QUESTIONS = [
  {
    id: 'mood',
    title: 'What olfactory aura do you wish to project?',
    subtitle: 'Choose the emotional resonance of your signature scent.',
    options: [
      { label: 'Intimate & Sensual', desc: 'Velvety sweetness, warm skin sillage, romantic depth', match: 'rouge-noir' },
      { label: 'Fresh & Radiant', desc: 'Golden sunlight, joyful sparkling blooms, uplifting warmth', match: 'golden-hour' },
      { label: 'Romantic & Timeless', desc: 'Noble May roses, aristocratic powder, classical grace', match: 'rose-eternelle' },
      { label: 'Mysterious & Nocturnal', desc: 'Smoked resins, rare oud, majestic dark charisma', match: 'ombre-royale' }
    ]
  },
  {
    id: 'occasion',
    title: 'Where will your fragrance accompany you most?',
    subtitle: 'Every flacon is formulated for different moments of life.',
    options: [
      { label: 'Gala & Evening Soirées', desc: 'Candlelit dining, private operas, unforgettable entrances', match: 'rouge-noir' },
      { label: 'Daily Signature Elegance', desc: 'Effortless luxury from morning meetings to sunset apéritifs', match: 'golden-hour' },
      { label: 'Intimate Encounters', desc: 'Close embraces, quiet whisper moments, sensory tenderness', match: 'rose-eternelle' },
      { label: 'Commanding Presence & Galas', desc: 'Leadership, high-power presence, regal nobility', match: 'ombre-royale' }
    ]
  },
  {
    id: 'accord',
    title: 'Which raw olfactory family stirs your senses?',
    subtitle: 'Our master nez categorizes by primal ingredient families.',
    options: [
      { label: 'Gourmand Amber & Dark Fruits', desc: 'Macerated black cherries, bourbon vanilla, tonka bean', match: 'rouge-noir' },
      { label: 'Solar Woods & Saffron', desc: 'Creamy Mysore sandalwood, sunlit neroli, golden amber', match: 'golden-hour' },
      { label: 'Aristocratic French Florals', desc: 'Cold-extracted Centifolia roses, iris butter, musk', match: 'rose-eternelle' },
      { label: 'Smoky Resins & Deep Ouds', desc: 'Aged wood timbers, frankincense tears, leather', match: 'ombre-royale' }
    ]
  }
]
