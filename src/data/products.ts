import { Product } from '../types';

export const STORE_PHONE = '8770690143';
export const STORE_PHONE_INTL = '+918770690143';
export const STORE_ADDRESS = 'N73 Nandlalpura Near Ranipura Indore M.P.';
export const STORE_PINCODE = '452007';
export const STORE_NAME = 'AHILYA FOOTWEAR';
export const STORE_TAGLINE = 'Kicks For Your Clicks 👟';

export const PRODUCTS: Product[] = [
  {
    id: 'ah-snk-01',
    name: 'Air Velocity Retro Court Sneaker',
    category: 'sneakers',
    categoryLabel: 'Sneakers',
    gender: 'unisex',
    price: 1899,
    originalPrice: 3299,
    discountPercent: 42,
    rating: 4.9,
    reviewCount: 312,
    image: '/src/assets/images/hero_sneaker_showcase_1793001987243.jpg',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Cobalt Blue & White', 'Pure White', 'Midnight Blue'],
    description: 'Our iconic signature court sneaker crafted with premium high-density milled leather and royal cobalt accents. Engineered with dual-density cushioned insole for day-long street style and comfort.',
    features: [
      'Dual-density shock absorbent cupsole',
      'Anti-crease soft milled faux-leather upper',
      'Breathable perforated toe-box design',
      'High-traction gum rubber perimeter sole'
    ],
    soleMaterial: 'Vulcanized Anti-Skid Rubber',
    upperMaterial: 'Premium Full-Grain Synthetic Leather & Navy Suede',
    inStock: true,
    stockCount: 24,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'ah-spr-02',
    name: 'Pro-Stride HyperMesh Running Shoes',
    category: 'sports',
    categoryLabel: 'Sports & Running',
    gender: 'men',
    price: 1599,
    originalPrice: 2899,
    discountPercent: 45,
    rating: 4.8,
    reviewCount: 248,
    image: '/src/assets/images/sport_running_sneakers_1793001988313.jpg',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Navy Blue / Silver', 'Charcoal Neon', 'Deep Ocean'],
    description: 'Built for runners, gym workouts, and daily jogging across Indian roads. Features an ultra-breathable mesh weave with torsional arch support and high-rebound EVA foam damping.',
    features: [
      'Ultra-light 280g featherweight chassis',
      'Reflective 3M night safety accents',
      'High rebound responsive phylon midsole',
      'Padded ankle collar prevents chafing'
    ],
    soleMaterial: 'Energy Return Phylon & Grip Rubber',
    upperMaterial: 'Engineered High-Ventilation Air Mesh',
    inStock: true,
    stockCount: 38,
    isBestSeller: true
  },
  {
    id: 'ah-frm-03',
    name: 'Artisan Handcrafted Tan Oxford Brogues',
    category: 'formal',
    categoryLabel: 'Formal Footwear',
    gender: 'men',
    price: 2499,
    originalPrice: 4499,
    discountPercent: 44,
    rating: 4.9,
    reviewCount: 194,
    image: '/src/assets/images/formal_leather_oxford_1793001988773.jpg',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Burnished Tan', 'Classic Black', 'Rich Walnut'],
    description: 'Refined gentleman craftsmanship straight from our Indore workshop. Features classic medallion wingtip brogue detailing, burnished toe caps, and memory foam inner bed for long wedding & boardroom hours.',
    features: [
      'Hand-burnished artisanal deep patina finish',
      'Reinforced welt stitching for years of wear',
      'Orthopedic memory foam footbed with heel cup',
      'Waxed cotton round laces with metal aglets'
    ],
    soleMaterial: 'Multi-Layer Resin Sheet with Anti-Slip Rubber Heel',
    upperMaterial: 'Export-Grade Burnished PU Calfskin Leather',
    inStock: true,
    stockCount: 18,
    isBestSeller: true
  },
  {
    id: 'ah-cst-04',
    name: 'Urban Classic Streetwear Court Kicks',
    category: 'sneakers',
    categoryLabel: 'Casual & Sneakers',
    gender: 'unisex',
    price: 1499,
    originalPrice: 2599,
    discountPercent: 42,
    rating: 4.7,
    reviewCount: 186,
    image: '/src/assets/images/casual_court_sneakers_1793001989766.jpg',
    sizes: [6, 7, 8, 9, 10],
    colors: ['White / Royal Blue', 'White / Crimson', 'Black / White'],
    description: 'Everyday lifestyle kicks inspired by vintage 90s tennis courts. Looks razor-sharp with relaxed denim, cargo pants, or shorts. Lightweight, stain-resistant, and easy to wipe clean.',
    features: [
      'Easy wipe-clean protective outer coat',
      'Flexible herringbone tread for smooth walk',
      'Sweat-absorbing anti-microbial fabric lining',
      'Youthful clean low-top profile'
    ],
    soleMaterial: 'Lightweight Thermoplastic Rubber (TPR)',
    upperMaterial: 'High-Density Matte Eco-Leather',
    inStock: true,
    stockCount: 42,
    isNewArrival: true
  },
  {
    id: 'ah-loa-05',
    name: 'Royal Heritage Navy Suede Tassel Loafer',
    category: 'casual',
    categoryLabel: 'Loafers & Casuals',
    gender: 'men',
    price: 1799,
    originalPrice: 3199,
    discountPercent: 43,
    rating: 4.8,
    reviewCount: 162,
    image: '/src/assets/images/ethnic_mojari_loafer_1793001989873.jpg',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Royal Navy Blue', 'Charcoal Slate', 'Rich Olive'],
    description: 'Exquisite slip-on loafers boasting hand-cut double tassels and contrast saddle stitching. Perfect pairing for linen trousers, casual blazers, or festive kurtas.',
    features: [
      'Velvety microfiber suede that resists water spots',
      'Elasticated side gusset for slip-on ease',
      'Chiseled apron moc-toe construction',
      'Shock-absorbing crepe effect low heel'
    ],
    soleMaterial: 'Flexible TPR Crepe Sole',
    upperMaterial: 'Premium Micro-Suede with Soft Leather Trim',
    inStock: true,
    stockCount: 19,
    isBestSeller: true
  },
  {
    id: 'ah-eth-06',
    name: 'Indori Shahi Embroidered Wedding Mojari',
    category: 'ethnic',
    categoryLabel: 'Ethnic & Traditional',
    gender: 'men',
    price: 1399,
    originalPrice: 2299,
    discountPercent: 39,
    rating: 4.9,
    reviewCount: 145,
    image: '/src/assets/images/formal_leather_oxford_1793001988773.jpg',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Royal Blue Zari', 'Golden Ivory', 'Maroon Velvet'],
    description: 'Authentic royal traditional footwear handcrafted in Indore with intricate Zari and resham embroidery. Padded insole specifically engineered so you dance all night at baraats without foot fatigue.',
    features: [
      'Indore Ranipura artisan gold thread needlework',
      'Cushioned arch pad prevents shoe bites',
      'Traditional curbed tip (Nokra) design',
      'Fits standard Indian foot widths'
    ],
    soleMaterial: 'Genuine Pressed Leather Sheet Sole',
    upperMaterial: 'Raw Silk & Fine Velvet with Zari Work',
    inStock: true,
    stockCount: 29
  },
  {
    id: 'ah-bot-07',
    name: 'Rugged Nomad Chelsea Ankle Boots',
    category: 'boots',
    categoryLabel: 'Boots',
    gender: 'men',
    price: 2199,
    originalPrice: 3899,
    discountPercent: 43,
    rating: 4.8,
    reviewCount: 118,
    image: '/src/assets/images/casual_court_sneakers_1793001989766.jpg',
    sizes: [7, 8, 9, 10, 11],
    colors: ['Deep Navy', 'Sand Suede', 'Smokey Black'],
    description: 'Timeless Chelsea boot styling with heavy-duty side stretch gores and durable pull loops. Designed for biker rides, winter evenings, and modern weekend outings.',
    features: [
      'Double-stitched elastic side panels for quick wear',
      'Lugged commando tread for superior road grip',
      'Reinforced heel counter keeps ankle stable',
      'Weather-shield exterior treatment'
    ],
    soleMaterial: 'Heavy Duty Lugged Rubber TPR',
    upperMaterial: 'Brushed Nubuck Leatherette',
    inStock: true,
    stockCount: 16
  },
  {
    id: 'ah-sld-08',
    name: 'CloudFloat Ergonomic Recovery Slides',
    category: 'slides',
    categoryLabel: 'Slides & Comfort',
    gender: 'unisex',
    price: 699,
    originalPrice: 1299,
    discountPercent: 46,
    rating: 4.7,
    reviewCount: 220,
    image: '/src/assets/images/sport_running_sneakers_1793001988313.jpg',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Electric Blue', 'Jet Black', 'Bone White'],
    description: 'Ultra-cushioned one-piece EVA sliders designed for post-workout recovery, casual house lounging, and poolside comfort. Waterproof, ultra-light, and deeply contoured.',
    features: [
      '4cm thick deep-cushion platform bed',
      'Waterproof and quick drying in minutes',
      'Anti-slip textured diamond footbed',
      'Deep heel cup with arch cradle support'
    ],
    soleMaterial: 'One-Piece High Elastic EVA',
    upperMaterial: 'Seamless Molded High-Grade EVA',
    inStock: true,
    stockCount: 50,
    isBestSeller: true
  }
];

export const CATEGORIES: { id: Product['category']; label: string; count: number }[] = [
  { id: 'all', label: 'All Footwear', count: 8 },
  { id: 'sneakers', label: 'Sneakers & Kicks', count: 2 },
  { id: 'sports', label: 'Sports & Running', count: 2 },
  { id: 'formal', label: 'Formal Shoes', count: 1 },
  { id: 'casual', label: 'Loafers & Casual', count: 1 },
  { id: 'ethnic', label: 'Indori Ethnic & Mojari', count: 1 },
  { id: 'boots', label: 'Boots', count: 1 },
  { id: 'slides', label: 'Slides & Comfort', count: 1 }
];

export const SIZES_AVAILABLE = [6, 7, 8, 9, 10, 11];

export const SIZE_CHART = [
  { uk: 6, eu: 40, us: 7, cm: 24.5 },
  { uk: 7, eu: 41, us: 8, cm: 25.4 },
  { uk: 8, eu: 42, us: 9, cm: 26.2 },
  { uk: 9, eu: 43, us: 10, cm: 27.1 },
  { uk: 10, eu: 44, us: 11, cm: 27.9 },
  { uk: 11, eu: 45, us: 12, cm: 28.8 }
];

export const COUPONS: Record<string, { code: string; discountAmount?: number; discountPercent?: number; description: string; minOrder: number }> = {
  'AHILYA100': {
    code: 'AHILYA100',
    discountAmount: 100,
    description: 'Flat ₹100 OFF on your order',
    minOrder: 999
  },
  'KICKS10': {
    code: 'KICKS10',
    discountPercent: 10,
    description: '10% OFF on all sneakers & shoes',
    minOrder: 1499
  },
  'INDORESPECIAL': {
    code: 'INDORESPECIAL',
    discountAmount: 200,
    description: 'Special ₹200 OFF celebrating Indore Ranipura store',
    minOrder: 1999
  }
};

export const INDIAN_STATES = [
  'Madhya Pradesh',
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'Delhi NCR',
  'Uttar Pradesh',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'West Bengal',
  'Punjab',
  'Haryana',
  'Bihar',
  'Kerala',
  'Odisha',
  'Assam',
  'Jharkhand',
  'Chhattisgarh',
  'Uttarakhand',
  'Goa',
  'Himachal Pradesh',
  'Andhra Pradesh',
  'Jammu & Kashmir'
];
