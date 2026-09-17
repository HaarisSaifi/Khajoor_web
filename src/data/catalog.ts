import { Product, HeroSlide, Review, Coupon } from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-ajwa',
    variety: 'Ajwa',
    title: 'Ajwa Al-Madinah',
    tagline: 'The Holy Date of Madinah',
    eyebrow: 'Sacred Heritage • Harvest 2026',
    description: 'Revered for centuries for its profound heritage and gentle sweetness. Rich, soft, near-black texture infused with subtle hints of prune and caramel.',
    origin: 'Al-Madinah Al-Munawwarah, Saudi Arabia',
    sensoryMicrocopy: 'Deep, soft and distinct',
    accentColor: '#3B1A12',
    blobColor: '#E8D4B8',
    blobSvgPath: 'M45.5,-59.8C58.3,-50.7,67.8,-37.2,71.2,-22.3C74.6,-7.4,71.9,8.9,64.7,22.8C57.4,36.7,45.6,48.2,32,55.8C18.4,63.4,3,67.1,-11.9,64.8C-26.8,62.5,-41.2,54.2,-52.1,42.4C-63,30.6,-70.4,15.3,-71.4,-0.6C-72.4,-16.5,-67.1,-33,-56.3,-43.7C-45.5,-54.4,-29.2,-59.3,-13.6,-61.8C2,-64.3,32.7,-68.9,45.5,-59.8Z',
    productCutout: '/images/hero_ajwa_3d.webp',
    priceFrom: 75000, // ₹750
    rating: 4.98,
    reviews: 342,
    productSlug: 'ajwa-al-madinah'
  },
  {
    id: 'hero-medjool',
    variety: 'Medjool',
    title: 'Royal Medjool',
    tagline: 'The Undisputed King of Dates',
    eyebrow: 'Jumbo Size • Naturally Luscious',
    description: 'Exceptionally plump and succulent with amber-caramel glossy skin. Melts delightfully on the tongue with rich toffee sweetness and silky flesh.',
    origin: 'Jericho Valley & Jordan Basin',
    sensoryMicrocopy: 'Large, soft and naturally luscious',
    accentColor: '#B86B2B',
    blobColor: '#F7E3C8',
    blobSvgPath: 'M41.8,-53.4C53.3,-45.7,61.1,-32.8,65.3,-18.6C69.5,-4.4,70.1,11.1,64.4,24.7C58.7,38.3,46.7,50,33.1,57.1C19.5,64.2,4.3,66.7,-10.8,65C-25.9,63.3,-40.9,57.4,-52.1,47.1C-63.3,36.8,-70.7,22.1,-71.9,6.7C-73.1,-8.7,-68.1,-24.8,-58.5,-36.8C-48.9,-48.8,-34.7,-56.7,-20.9,-61.1C-7.1,-65.5,6.3,-66.4,20.3,-63.1C34.3,-59.8,40.3,-61.1,41.8,-53.4Z',
    productCutout: '/images/hero_medjool_3d.webp',
    priceFrom: 65000, // ₹650
    rating: 4.95,
    reviews: 418,
    productSlug: 'royal-medjool'
  },
  {
    id: 'hero-sukkari',
    variety: 'Sukkari',
    title: 'Golden Sukkari',
    tagline: 'The Honey of Al-Qassim',
    eyebrow: 'Golden Amber • Melts in Mouth',
    description: 'Crisp outer edge yielding to a soft, sugary golden center that dissolves like raw wild honey. The royal favorite for afternoon gatherings and Arabic gahwa.',
    origin: 'Al-Qassim Oasis, Saudi Arabia',
    sensoryMicrocopy: 'Golden, tender and delicately sweet',
    accentColor: '#D5A24B',
    blobColor: '#FDF0D5',
    blobSvgPath: 'M38.8,-48.9C51.6,-42.2,64.2,-31.8,68.9,-18.2C73.6,-4.6,70.4,12.2,62.8,25.6C55.2,39,43.2,49,29.9,56.1C16.6,63.2,2,67.4,-11.9,64.9C-25.8,62.4,-39,53.2,-48.9,41.4C-58.8,29.6,-65.4,15.2,-66.1,0.2C-66.8,-14.8,-61.6,-30.4,-51.9,-41.8C-42.2,-53.2,-28,-60.4,-13.7,-61.7C0.6,-63,26,-55.6,38.8,-48.9Z',
    productCutout: '/images/hero_sukkari_3d.webp',
    priceFrom: 52000, // ₹520
    rating: 4.92,
    reviews: 289,
    productSlug: 'golden-sukkari'
  },
  {
    id: 'hero-mabroom',
    variety: 'Mabroom',
    title: 'Mabroom Al-Ula',
    tagline: 'The Connoisseur’s Chewy Jewel',
    eyebrow: 'Slender Cut • Rich Toffee Notes',
    description: 'Characterized by its slender, elongated form, firm texture and chewy consistency. Non-sticky with pleasant deep notes of browned butter and toffee.',
    origin: 'Al-Ula Valley, Saudi Arabia',
    sensoryMicrocopy: 'Slender, chewy and refined',
    accentColor: '#723A2A',
    blobColor: '#EED9C4',
    blobSvgPath: 'M44.7,-56.9C57.4,-47.9,66.8,-33.5,69.5,-17.8C72.2,-2.1,68.2,14.9,59.9,28.7C51.6,42.5,39,53.1,24.6,59.8C10.2,66.5,-6,69.3,-20.9,65.3C-35.8,61.3,-49.4,50.5,-58.5,36.9C-67.6,23.3,-72.2,6.9,-70.3,-8.7C-68.4,-24.3,-60,-39.1,-48.2,-48.6C-36.4,-58.1,-21.2,-62.3,-3.8,-64.5C13.6,-66.7,32,-56,44.7,-56.9Z',
    productCutout: '/images/hero_mabroom_3d.webp',
    priceFrom: 59000, // ₹590
    rating: 4.89,
    reviews: 194,
    productSlug: 'mabroom-al-ula'
  },
  {
    id: 'hero-safawi',
    variety: 'Safawi',
    title: 'Safawi Al-Madinah',
    tagline: 'Deep Cocoa & Mineral Richness',
    eyebrow: 'Dark Texture • Pure Vitality',
    description: 'A prized Saudi date with intensely dark skin and a supple, moist body. Prized for wholesome iron and magnesium content, perfect for daily morning vitality.',
    origin: 'Al-Madinah Al-Munawwarah, Saudi Arabia',
    sensoryMicrocopy: 'Soft texture with deep cocoa flavour',
    accentColor: '#355B3E',
    blobColor: '#E2EBDC',
    blobSvgPath: 'M40.2,-49.4C52.7,-41.8,63.9,-29.6,68.4,-14.8C72.9,0,70.7,17.4,62.8,31.7C54.9,46,41.3,57.2,26.3,62.7C11.3,68.2,-5.1,68,-19.9,63.1C-34.7,58.2,-47.9,48.6,-57.4,35.7C-66.9,22.8,-72.7,6.6,-70.6,-8.6C-68.5,-23.8,-58.5,-38,-45.8,-46.3C-33.1,-54.6,-17.7,-57,-1.5,-55.1C14.7,-53.2,27.7,-57,40.2,-49.4Z',
    productCutout: '/images/hero_safawi_3d.webp',
    priceFrom: 48000, // ₹480
    rating: 4.88,
    reviews: 165,
    productSlug: 'safawi-al-madinah'
  },
  {
    id: 'hero-khudri',
    variety: 'Khudri',
    title: 'Classic Khudri',
    tagline: 'Everyday Wholesome Nourishment',
    eyebrow: 'Balanced Sweetness • Firm Bite',
    description: 'An affordable, nutrient-dense date with a moderate sweetness level and pleasant chewiness. Beloved as an all-day natural energy source and family snack.',
    origin: 'Central Arabian Peninsula',
    sensoryMicrocopy: 'Balanced texture for everyday enjoyment',
    accentColor: '#572A1D',
    blobColor: '#EADBC8',
    blobSvgPath: 'M42.3,-53.8C54.4,-44.6,63.5,-31.1,67.7,-16.1C71.9,-1.1,71.2,15.4,64.1,28.8C57,42.2,43.5,52.5,28.7,59.3C13.9,66.1,-2.2,69.4,-17.1,66C-32,62.6,-45.7,52.5,-56.1,39.6C-66.5,26.7,-73.6,11,-72.7,-4.8C-71.8,-20.6,-62.9,-36.5,-50.7,-46.4C-38.5,-56.3,-23,-60.2,-6.6,-61.7C9.8,-63.2,30.2,-63,42.3,-53.8Z',
    productCutout: '/images/hero_khudri_3d.webp',
    priceFrom: 38000, // ₹380
    rating: 4.82,
    reviews: 142,
    productSlug: 'classic-khudri'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-ajwa',
    slug: 'ajwa-al-madinah',
    name: 'Ajwa Al-Madinah (VIP Grade)',
    shortDescription: 'The revered black date of the Prophet’s city, tender, dark and exceptionally rich.',
    description: 'Sourced directly from certified heritage date palm orchards in Al-Madinah Al-Munawwarah. Every lot is hand-selected for pristine texture, deep near-black skin, and round plump form. Celebrated for its unique spiritual significance and scientifically verified antioxidant, flavonoid and polyphenol profile.',
    variety: 'Ajwa',
    origin: 'Al-Madinah, Saudi Arabia',
    texture: 'Soft & Moist',
    sweetness: 'Subtle & Natural',
    size: 'Medium',
    colorTone: '#2A120D',
    badge: 'Holy Origin',
    rating: 4.98,
    reviewCount: 342,
    images: ['/images/ajwa.webp', '/images/palm_grove.webp'],
    cutoutImage: '/images/ajwa_cutout.webp',
    featured: true,
    category: 'premium',
    pairingSuggestions: ['Fresh Camel or Almond Milk', 'Unsalted Pistachios', 'Traditional Arabic Gahwa'],
    harvestSeason: 'Autumn 2025/2026 Batch',
    nutritionalNotes: {
      caloriesPer100g: 277,
      potassiumMg: 696,
      fiberG: 7.1,
      naturalSugarsG: 66.5
    },
    variants: [
      { id: 'var-ajwa-250', sku: 'NKH-AJW-250', weightGrams: 250, label: '250g Gift Box', priceMinor: 75000, compareAtPriceMinor: 89000, inventoryQuantity: 45 },
      { id: 'var-ajwa-500', sku: 'NKH-AJW-500', weightGrams: 500, label: '500g Signature Box', priceMinor: 145000, compareAtPriceMinor: 165000, inventoryQuantity: 68, isPopular: true },
      { id: 'var-ajwa-1000', sku: 'NKH-AJW-1000', weightGrams: 1000, label: '1kg Royal Tin Pack', priceMinor: 280000, compareAtPriceMinor: 320000, inventoryQuantity: 30 }
    ]
  },
  {
    id: 'prod-medjool',
    slug: 'royal-medjool',
    name: 'Imperial Jumbo Medjool',
    shortDescription: 'The king of dates: enormous, succulent, luscious with natural toffee caramel notes.',
    description: 'Renowned globally as the "Jewel of Dates", our Imperial Jumbo Medjools are celebrated for their imposing size, thin translucent skin, and deeply satisfying fibrous chew. Harvested along the sun-drenched Jordan Rift Valley, these dates retain natural moisture and caramelize organically on the palm tree.',
    variety: 'Medjool',
    origin: 'Jordan Valley',
    texture: 'Lush & Melting',
    sweetness: 'Rich Toffee',
    size: 'Jumbo',
    colorTone: '#B86B2B',
    badge: 'Bestseller',
    rating: 4.95,
    reviewCount: 418,
    images: ['/images/medjool.webp', '/images/gift_box.webp'],
    cutoutImage: '/images/medjool_cutout.webp',
    featured: true,
    category: 'soft',
    pairingSuggestions: ['Blue Cheese or Aged Gouda', 'Roasted Walnuts', 'Espresso'],
    harvestSeason: 'Fresh Harvest 2026',
    nutritionalNotes: {
      caloriesPer100g: 282,
      potassiumMg: 650,
      fiberG: 6.7,
      naturalSugarsG: 63.4
    },
    variants: [
      { id: 'var-med-250', sku: 'NKH-MED-250', weightGrams: 250, label: '250g Box', priceMinor: 65000, compareAtPriceMinor: 75000, inventoryQuantity: 52 },
      { id: 'var-med-500', sku: 'NKH-MED-500', weightGrams: 500, label: '500g Royal Box', priceMinor: 120000, compareAtPriceMinor: 140000, inventoryQuantity: 84, isPopular: true },
      { id: 'var-med-1000', sku: 'NKH-MED-1000', weightGrams: 1000, label: '1kg Feast Box', priceMinor: 230000, compareAtPriceMinor: 260000, inventoryQuantity: 36 }
    ]
  },
  {
    id: 'prod-sukkari',
    slug: 'golden-sukkari',
    name: 'Golden Sukkari (Rutab & Soft)',
    shortDescription: 'Golden crisp dates that melt like raw honey on the palate.',
    description: 'Derived from "Sukkar" (sugar in Arabic), Sukkari dates are the undisputed crown jewels of Saudi hospitality. They boast a golden-amber conical silhouette and a rich, honeyed creaminess. Chilled before serving, they present a delicate crisp bite that instantly gives way to luscious natural sweetness.',
    variety: 'Sukkari',
    origin: 'Al-Qassim, Saudi Arabia',
    texture: 'Lush & Melting',
    sweetness: 'Honey Sweet',
    size: 'Large',
    colorTone: '#D5A24B',
    badge: 'Royal Grade',
    rating: 4.92,
    reviewCount: 289,
    images: ['/images/sukkari.webp', '/images/palm_grove.webp'],
    cutoutImage: '/images/sukkari_cutout.webp',
    featured: true,
    category: 'soft',
    pairingSuggestions: ['Cardamom Infused Gahwa', 'Heavy Cream / Clotted Cream', 'Tahini dip'],
    harvestSeason: 'Prime Selection 2026',
    nutritionalNotes: {
      caloriesPer100g: 290,
      potassiumMg: 610,
      fiberG: 5.9,
      naturalSugarsG: 68.2
    },
    variants: [
      { id: 'var-suk-250', sku: 'NKH-SUK-250', weightGrams: 250, label: '250g Box', priceMinor: 52000, compareAtPriceMinor: 60000, inventoryQuantity: 60 },
      { id: 'var-suk-500', sku: 'NKH-SUK-500', weightGrams: 500, label: '500g Box', priceMinor: 98000, compareAtPriceMinor: 115000, inventoryQuantity: 92, isPopular: true },
      { id: 'var-suk-1000', sku: 'NKH-SUK-1000', weightGrams: 1000, label: '1kg Storage Pack', priceMinor: 185000, compareAtPriceMinor: 210000, inventoryQuantity: 44 }
    ]
  },
  {
    id: 'prod-mabroom',
    slug: 'mabroom-al-ula',
    name: 'Mabroom Royal Al-Ula',
    shortDescription: 'Slender, elongated dates with satisfying chewiness and butter-toffee undertones.',
    description: 'Grown in the ancient red canyons and fertile oases of Al-Ula, Mabroom is a dry-to-semi-dry date favored by dates connoisseurs who dislike cloying stickiness. Its slender shape and firm fibrous bite provide an extended release of complex caramelized flavors without excessive sweetness.',
    variety: 'Mabroom',
    origin: 'Al-Ula, Saudi Arabia',
    texture: 'Chewy & Firm',
    sweetness: 'Balanced Caramel',
    size: 'Large',
    colorTone: '#723A2A',
    badge: 'New Harvest',
    rating: 4.89,
    reviewCount: 194,
    images: ['/images/mabroom.webp', '/images/palm_grove.webp'],
    cutoutImage: '/images/mabroom_cutout.webp',
    featured: true,
    category: 'semi-dry',
    pairingSuggestions: ['Black Ceylon Tea', 'Roasted Almonds', 'Dark Chocolate (70%+)'],
    harvestSeason: 'Certified Harvest 2026',
    nutritionalNotes: {
      caloriesPer100g: 280,
      potassiumMg: 670,
      fiberG: 7.5,
      naturalSugarsG: 61.8
    },
    variants: [
      { id: 'var-mab-250', sku: 'NKH-MAB-250', weightGrams: 250, label: '250g Box', priceMinor: 59000, compareAtPriceMinor: 69000, inventoryQuantity: 40 },
      { id: 'var-mab-500', sku: 'NKH-MAB-500', weightGrams: 500, label: '500g Box', priceMinor: 110000, compareAtPriceMinor: 130000, inventoryQuantity: 70, isPopular: true },
      { id: 'var-mab-1000', sku: 'NKH-MAB-1000', weightGrams: 1000, label: '1kg Value Box', priceMinor: 210000, compareAtPriceMinor: 240000, inventoryQuantity: 28 }
    ]
  },
  {
    id: 'prod-safawi',
    slug: 'safawi-al-madinah',
    name: 'Safawi Al-Madinah Dates',
    shortDescription: 'Rich dark cocoa hue, soft wrinkled skin, and deep restorative mineral profile.',
    description: 'Cultivated in Madinah alongside Ajwa, Safawi dates share the same sacred microclimate. They feature an oblong contour, deep purplish-black shade, and a delightfully chewy texture. Historically cherished as a wholesome post-fast restorative.',
    variety: 'Safawi',
    origin: 'Al-Madinah, Saudi Arabia',
    texture: 'Soft & Moist',
    sweetness: 'Deep Molasses',
    size: 'Medium',
    colorTone: '#355B3E',
    badge: 'Limited Stock',
    rating: 4.88,
    reviewCount: 165,
    images: ['/images/safawi.webp', '/images/palm_grove.webp'],
    cutoutImage: '/images/safawi_cutout.webp',
    featured: false,
    category: 'soft',
    pairingSuggestions: ['Ginger Cardamom Tea', 'Roasted Cashews', 'Warm Milk with Saffron'],
    harvestSeason: 'Fresh Harvest 2026',
    nutritionalNotes: {
      caloriesPer100g: 275,
      potassiumMg: 710,
      fiberG: 7.8,
      naturalSugarsG: 62.0
    },
    variants: [
      { id: 'var-saf-250', sku: 'NKH-SAF-250', weightGrams: 250, label: '250g Pack', priceMinor: 48000, compareAtPriceMinor: 55000, inventoryQuantity: 35 },
      { id: 'var-saf-500', sku: 'NKH-SAF-500', weightGrams: 500, label: '500g Pack', priceMinor: 89000, compareAtPriceMinor: 105000, inventoryQuantity: 55, isPopular: true },
      { id: 'var-saf-1000', sku: 'NKH-SAF-1000', weightGrams: 1000, label: '1kg Pack', priceMinor: 169000, compareAtPriceMinor: 195000, inventoryQuantity: 25 }
    ]
  },
  {
    id: 'prod-khudri',
    slug: 'classic-khudri',
    name: 'Everyday Classic Khudri',
    shortDescription: 'Uniformly sweet, chewy chestnut date perfect for daily energy and family snacking.',
    description: 'The reliable heart of Middle Eastern daily snacking. Khudri dates have a clean, pleasant sweetness that never overwhelms. Rich in iron, dietary fiber and natural potassium, making them ideal for pre-workout energy or natural dessert replacements.',
    variety: 'Khudri',
    origin: 'Central Arabian Peninsula',
    texture: 'Chewy & Firm',
    sweetness: 'Balanced Caramel',
    size: 'Medium',
    colorTone: '#572A1D',
    badge: undefined,
    rating: 4.82,
    reviewCount: 142,
    images: ['/images/khudri.webp', '/images/palm_grove.webp'],
    cutoutImage: '/images/khudri_cutout.webp',
    featured: false,
    category: 'everyday',
    pairingSuggestions: ['Oatmeal & Yogurt Bowls', 'Smoothies', 'Black Coffee'],
    harvestSeason: 'Annual Harvest 2026',
    nutritionalNotes: {
      caloriesPer100g: 272,
      potassiumMg: 660,
      fiberG: 7.2,
      naturalSugarsG: 64.0
    },
    variants: [
      { id: 'var-khu-250', sku: 'NKH-KHU-250', weightGrams: 250, label: '250g Pouch', priceMinor: 38000, compareAtPriceMinor: 45000, inventoryQuantity: 80 },
      { id: 'var-khu-500', sku: 'NKH-KHU-500', weightGrams: 500, label: '500g Pouch', priceMinor: 72000, compareAtPriceMinor: 85000, inventoryQuantity: 120, isPopular: true },
      { id: 'var-khu-1000', sku: 'NKH-KHU-1000', weightGrams: 1000, label: '1kg Family Pouch', priceMinor: 135000, compareAtPriceMinor: 160000, inventoryQuantity: 75 }
    ]
  },
  {
    id: 'prod-gift-emerald',
    slug: 'royal-emerald-gift-hamper',
    name: 'The Sultan’s Emerald & Gold Gift Box',
    shortDescription: 'Handcrafted rigid velvet box with gold foil calligraphy, filled with 4 assorted luxury varieties.',
    description: 'Designed for Ramadan, Eid, weddings, and distinguished corporate gifting. Encased in imperial emerald green with gold embossed Arabic calligraphy and a satin ribbon seal. Contains individual gold foil compartments with handpicked Ajwa, Imperial Medjool, Golden Sukkari, and Almond-Stuffed Mabroom.',
    variety: 'Ajwa',
    origin: 'Saudi Arabia Assortment',
    texture: 'Lush & Melting',
    sweetness: 'Rich Toffee',
    size: 'Jumbo',
    colorTone: '#355B3E',
    badge: 'Gift Pick',
    rating: 4.99,
    reviewCount: 210,
    images: ['/images/gift_box.webp', '/images/ajwa.webp', '/images/medjool.webp'],
    cutoutImage: '/images/gift_box.webp',
    featured: true,
    category: 'gifts',
    pairingSuggestions: ['Festive Arabic Gahwa', 'Saffron Tea', 'Pistachio Baklava'],
    harvestSeason: 'Limited Edition 2026',
    nutritionalNotes: {
      caloriesPer100g: 284,
      potassiumMg: 680,
      fiberG: 6.9,
      naturalSugarsG: 65.0
    },
    variants: [
      { id: 'var-gift-500', sku: 'NKH-GFT-500', weightGrams: 500, label: '500g Assorted Hamper', priceMinor: 185000, compareAtPriceMinor: 220000, inventoryQuantity: 30, isPopular: true },
      { id: 'var-gift-1000', sku: 'NKH-GFT-1000', weightGrams: 1000, label: '1kg Royal Deluxe Hamper', priceMinor: 345000, compareAtPriceMinor: 395000, inventoryQuantity: 20 }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-ajwa',
    author: 'Zafar H.',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: 'February 12, 2026',
    title: 'Authentic Madinah Ajwa - truly unmatched freshness',
    content: 'I have tried Ajwa from various importers in India, but Nakhla Dates is in a league of its own. The dates are soft, tender, and properly nitrogen-sealed. No dry crust at all. Will definitely be ordering the 1kg pack for Ramadan.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'prod-medjool',
    author: 'Ayesha Rahman',
    location: 'New Delhi',
    rating: 5,
    date: 'January 28, 2026',
    title: 'Huge size, tastes like rich toffee!',
    content: 'The Imperial Medjool is truly jumbo! Each date is practically the size of my palm and melts like caramel. Our guests were mesmerized when we served these with green tea. Packaging is 10/10.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'prod-gift-emerald',
    author: 'Vikramaditya S.',
    location: 'Bangalore, Karnataka',
    rating: 5,
    date: 'February 4, 2026',
    title: 'Perfect corporate festive gift',
    content: 'Ordered 15 boxes for our executive clients in Bangalore. The emerald green box with gold hot-stamping is stunning in person. Every recipient called to compliment the quality and presentation.',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'prod-sukkari',
    author: 'Imran Farooqui',
    location: 'Hyderabad, Telangana',
    rating: 5,
    date: 'February 19, 2026',
    title: 'Melts in mouth, authentic Al-Qassim taste',
    content: 'Sukkari Rutab served chilled with unsweetened Arabic coffee is bliss. These came fresh without any hardening. Delivery took only 48 hours to Hyderabad.',
    verifiedPurchase: true
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'NAKHLA10',
    description: '10% instant discount on your order',
    discountType: 'percentage',
    discountValue: 10,
    minSubtotalMinor: 99900 // ₹999
  },
  {
    code: 'RAMADAN',
    description: 'Flat ₹150 OFF on festive orders above ₹1,499',
    discountType: 'fixed',
    discountValue: 15000,
    minSubtotalMinor: 149900 // ₹1499
  },
  {
    code: 'ROYAL500',
    description: 'Flat ₹500 OFF on luxury orders above ₹3,000',
    discountType: 'fixed',
    discountValue: 50000,
    minSubtotalMinor: 300000 // ₹3000
  }
];
