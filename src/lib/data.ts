export type PropertyStatus = "available" | "reserved" | "sold" | "launching-soon";
export type PropertyType = "villa" | "mansion" | "townhouse" | "apartment" | "penthouse" | "branded-villa";

export const SITE_URL = "https://www.thegrandpolo.com";
export const SITE_NAME = "Grand Polo Club & Resort";
export const PHONE_NUMBER = "+971 52 691 9169";
export const WHATSAPP_LINK = "https://wa.me/971526919169";
export const EMAIL = "info@thegrandpolo.com";
export const ADDRESS = "Grand Polo Club & Resort, Near Al Maktoum International Airport, Dubai, UAE";

// ======== NAV LINKS ========
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/projects" },
  { label: "Masterplan", href: "/masterplan" },
  { label: "Brochures", href: "/brochures" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ======== SOCIAL LINKS ========
export const socialLinks = {
  facebook: "https://facebook.com/grandpoloclub",
  instagram: "https://instagram.com/grandpoloclub",
  twitter: "https://twitter.com/grandpoloclub",
  linkedin: "https://linkedin.com/company/grandpoloclub",
  youtube: "https://youtube.com/@grandpoloclub",
};

// ======== HELPER FUNCTIONS ========
export function formatPrice(price: number): string {
  if (price === 0) return "TBA";
  if (price >= 1000000) return `AED ${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 2)}M`;
  return `AED ${price.toLocaleString()}`;
}

export function getAvailableProjects(): Project[] {
  return projects.filter((p) => p.status !== "Launching Soon");
}

export function getLaunchingSoonProjects(): Project[] {
  return projects.filter((p) => p.status === "Launching Soon");
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectGallery(slug: string): GalleryImage[] {
  const prefixMap: Record<string, string[]> = {
    "chevalia-estate": ["ce1-render"],
    "chevalia-estate-2": ["ce2-render"],
    "chevalia-fields": ["cf-render"],
  };
  const prefixes = prefixMap[slug] || [];
  if (prefixes.length === 0) return [];
  return galleryImages.filter((img) => prefixes.some((prefix) => img.imageUrl.includes(prefix)));
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  type: PropertyType;
  tagline: string;
  description: string;
  bedrooms: string;
  startingPrice: number;
  areaRange: string;
  plotArea?: string;
  status: "Ready" | "Off-Plan" | "Launching Soon";
  handover: string;
  paymentPlan: string;
  features: string[];
  amenities: string[];
  imageGradient: string;
  imageUrl: string;
  clusterTag: string;
  driveFolderId?: string;
  driveFolderUrl?: string;
  subfolders: Record<string, string>;
  facts: {
    totalUnits: number;
    communitySize: string;
    poloFields: string;
    clubhouse: string;
    developer: string;
    location: string;
    goldenVisa: boolean;
  };
}

export interface PaymentMilestone {
  label: string;
  percentage: number;
  date: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  category: "Exterior" | "Interior" | "Amenities" | "Equestrian" | "Master Plan" | "Clubhouse";
  alt: string;
  imageUrl: string;
}

// ======== MASTERPLAN FACTS ========
export const masterPlanFacts = {
  totalArea: "5.54 Million SqM",
  openSpace: "1.59 Million SqM",
  poloFieldsStables: "340,000 SqM",
  clubhouseGFA: "5,600 SqM",
  mixedUseGFA: "1.56 Million SqM",
  residentialClusters: 22,
  totalResidences: 6661,
  estimatedPopulation: 26965,
  poloFields: 3,
  jumpingArenas: 3,
  minToAirport: 5,
  minToDowntown: 30,
  minToExpoCity: 10,
  developer: "Emaar Properties PJSC",
  location: "Near Al Maktoum International Airport, Dubai",
};

// ======== PROJECTS ========
export const projects: Project[] = [
  {
    id: "chevalia-estate",
    name: "Chevalia Estate",
    slug: "chevalia-estate",
    type: "villa",
    tagline: "Emerald Horizons — 5-Bedroom Estate Villas",
    description: "Chevalia Estate at Grand Polo Club & Resort is a bespoke collection of 5-bedroom villas inspired by equestrian elegance. Located at the periphery of the masterplan's Green Core, these homes blend contemporary style with stunning natural views. Sweeping views of the central green and sun-dappled meadows stretch like painted landscapes, offering families a canvas to create their story of cherishable moments. A regal home where exquisite architecture meets breathtaking views — a place where every sunrise sets the stage for an extraordinary equestrian way of life. A refined blend of opulence and intent — where polished marble and cascading natural light shape each room into a living masterpiece.",
    bedrooms: "5",
    startingPrice: 9000000,
    areaRange: "6,516 sqft",
    plotArea: "7,490 sqft",
    status: "Off-Plan",
    handover: "Q4 2028",
    paymentPlan: "10% Down + Installments",
    features: [
      "5-Bedroom Luxury Villas",
      "Green Core Views",
      "Polished Marble Finishes",
      "Cascading Natural Light",
      "Equestrian-Inspired Architecture",
      "Private Garden",
      "Covered Parking",
      "Maid's Room",
    ],
    amenities: [
      "Three Polo Fields",
      "Luxury Clubhouse",
      "Private Stables",
      "Galloping Fountain",
      "Art Pavilion",
      "Floral Garden",
      "Mounded Garden",
      "Riding Arenas",
      "Fitness Areas",
      "Cycling Paths",
    ],
    imageGradient: "from-emerald-900 via-emerald-700 to-teal-500",
    imageUrl: "/images/projects/chevalia-estate.webp",
    clusterTag: "Estate Villas",
    subfolders: {},
    facts: {
      totalUnits: 80,
      communitySize: "5.54M sqm",
      poloFields: "3 Fields (340,000 SqM)",
      clubhouse: "5,600 SqM",
      developer: "Emaar Properties PJSC",
      location: "Grand Polo Club & Resort, Dubai",
      goldenVisa: true,
    },
  },
  {
    id: "chevalia-estate-2",
    name: "Chevalia Estate 2",
    slug: "chevalia-estate-2",
    type: "villa",
    tagline: "Grandeur Estate Living — 4 & 5-Bedroom Villas",
    description: "Chevalia Estate 2 at Grand Polo Club & Resort is a luxury villa community with an expansive linear park, stables, riding arenas, and an exclusive clubhouse where elegance meets quintessential estate living. Inspired by the free spirit of horses and surrounded by picturesque landscapes and tranquil parks, the estate offers a blend of nature, sport, and refined luxury. Discover 4 and 5-bedroom villas designed with luxury in every detail, spaces that celebrate the grace of equestrian opulence, with experiences inspired by the free spirit of horses. Adorned with opulent marble, fine wood, and refined textures, where natural light enhances luxury and panoramic views.",
    bedrooms: "4 & 5",
    startingPrice: 7880000,
    areaRange: "4,168 - 8,635 sqft",
    plotArea: "5,794 - 9,149 sqft",
    status: "Off-Plan",
    handover: "Q2 2029",
    paymentPlan: "10% Down + Installments",
    features: [
      "4 & 5-Bedroom Luxury Villas",
      "Linear Park Views",
      "Stables & Riding Arenas",
      "Opulent Marble Finishes",
      "Fine Wood Textures",
      "Panoramic Views",
      "Private Garden",
      "Covered Parking",
    ],
    amenities: [
      "Three Polo Fields",
      "Luxury Clubhouse",
      "Private Stables",
      "Riding Arenas",
      "Yoga Hubs",
      "Cycling Paths",
      "Fitness Areas",
      "Expansive Linear Park",
      "Galloping Fountain",
      "Floral Garden",
    ],
    imageGradient: "from-amber-900 via-amber-700 to-yellow-600",
    imageUrl: "/images/projects/chevalia-estate-2.webp",
    clusterTag: "Estate Villas",
    subfolders: {},
    facts: {
      totalUnits: 120,
      communitySize: "5.54M sqm",
      poloFields: "3 Fields (340,000 SqM)",
      clubhouse: "5,600 SqM",
      developer: "Emaar Properties PJSC",
      location: "Grand Polo Club & Resort, Dubai",
      goldenVisa: true,
    },
  },
  {
    id: "chevalia-fields",
    name: "Chevalia Fields",
    slug: "chevalia-fields",
    type: "villa",
    tagline: "Spirit of Polo — 4 & 5-Bedroom Villas",
    description: "Chevalia Fields at Grand Polo Club & Resort blends equestrian heritage with luxurious living. Inspired by the spirit of the horse, it offers a harmonious balance of freedom, elegance, and nature. A collection of 4- and 5-bedroom villas, each a masterpiece of design inspired by equestrian grace and contemporary luxury. Set within emerald landscapes that evoke the spirit of polo, these homes invite you to live within nature's embrace and breathtaking vistas. Homes of grandeur, where architecture embodies the elegance of equestrian form, and golden light illuminates meticulously curated landscapes. Villas overlook meadows, polo fields, curated gardens, and private stables — where horses gallop and nature breathes.",
    bedrooms: "4 & 5",
    startingPrice: 7340000,
    areaRange: "4,166 - 5,873 sqft",
    plotArea: "5,584 - 7,013 sqft",
    status: "Off-Plan",
    handover: "Q1 2029",
    paymentPlan: "10% Down + Installments",
    features: [
      "4 & 5-Bedroom Luxury Villas",
      "Polo Field Views",
      "Emerald Landscapes",
      "Equestrian Grace Design",
      "Golden Light Interiors",
      "Private Garden",
      "Covered Parking",
      "Maid's Room",
    ],
    amenities: [
      "Three Polo Fields",
      "Luxury Clubhouse",
      "Private Stables",
      "Art Pavilion",
      "Floral Garden",
      "Mounded Garden",
      "Padel Courts",
      "Mini Golf",
      "Forest Walk",
      "Dog Park",
    ],
    imageGradient: "from-green-900 via-emerald-700 to-lime-500",
    imageUrl: "/images/projects/chevalia-fields.webp",
    clusterTag: "Field Villas",
    subfolders: {},
    facts: {
      totalUnits: 179,
      communitySize: "5.54M sqm",
      poloFields: "3 Fields (340,000 SqM)",
      clubhouse: "5,600 SqM",
      developer: "Emaar Properties PJSC",
      location: "Grand Polo Club & Resort, Dubai",
      goldenVisa: true,
    },
  },
  {
    id: "equestra",
    name: "Equestra",
    slug: "equestra",
    type: "villa",
    tagline: "Equestrian Elegance — Coming Soon",
    description: "Equestra at Grand Polo Club & Resort promises an exquisite collection of luxury residences inspired by the grace and power of equestrian sport. Positioned within the prestigious masterplan, Equestra will offer residents unparalleled access to polo fields, stables, and the exclusive clubhouse. Register your interest to be among the first to receive launch details and priority selection.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Equestrian-Inspired Design", "Polo Field Views", "Green Core Proximity", "Luxury Finishes"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Community Parks", "Fitness Areas"],
    imageGradient: "from-indigo-900 via-indigo-700 to-blue-500",
    imageUrl: "/images/projects/chevalia-fields.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: {
      totalUnits: 0,
      communitySize: "5.54M sqm",
      poloFields: "3 Fields (340,000 SqM)",
      clubhouse: "5,600 SqM",
      developer: "Emaar Properties PJSC",
      location: "Grand Polo Club & Resort, Dubai",
      goldenVisa: true,
    },
  },
  {
    id: "equitera",
    name: "Equitera",
    slug: "equitera",
    type: "villa",
    tagline: "The Spirit of the Horse — Coming Soon",
    description: "Equitera at Grand Polo Club & Resort will embody the spirit of the horse through architecture and design. These exclusive residences will offer a lifestyle where equestrian heritage meets contemporary luxury. Register your interest for priority access at launch.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Equestrian Heritage Design", "Premium Location", "Luxury Interiors", "Community Living"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Riding School", "Fitness Areas"],
    imageGradient: "from-violet-900 via-violet-700 to-purple-500",
    imageUrl: "/images/projects/chevalia-estate.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: {
      totalUnits: 0,
      communitySize: "5.54M sqm",
      poloFields: "3 Fields (340,000 SqM)",
      clubhouse: "5,600 SqM",
      developer: "Emaar Properties PJSC",
      location: "Grand Polo Club & Resort, Dubai",
      goldenVisa: true,
    },
  },
  {
    id: "equitera-2",
    name: "Equitera 2",
    slug: "equitera-2",
    type: "villa",
    tagline: "Legacy Continues — Coming Soon",
    description: "Equitera 2 at Grand Polo Club & Resort continues the equestrian legacy with a new collection of luxury villas. Set within the masterplan's green spaces, these residences will offer the finest in contemporary living with equestrian-inspired design. Register for launch details.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Equestrian Design", "Green Spaces", "Luxury Villas", "Premium Finishes"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Parks", "Sports Facilities"],
    imageGradient: "from-rose-900 via-rose-700 to-pink-500",
    imageUrl: "/images/projects/chevalia-estate-2.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: {
      totalUnits: 0,
      communitySize: "5.54M sqm",
      poloFields: "3 Fields (340,000 SqM)",
      clubhouse: "5,600 SqM",
      developer: "Emaar Properties PJSC",
      location: "Grand Polo Club & Resort, Dubai",
      goldenVisa: true,
    },
  },
  {
    id: "montura",
    name: "Montura",
    slug: "montura",
    type: "villa",
    tagline: "Saddle & Style — Coming Soon",
    description: "Montura at Grand Polo Club & Resort draws its name from the Spanish word for saddle, reflecting the equestrian heritage at the heart of this community. These luxury villas will offer refined living with direct connections to the polo lifestyle. Register your interest for priority access.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Equestrian Theme", "Polo Lifestyle", "Luxury Villas", "Community Living"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Parks", "Recreational Facilities"],
    imageGradient: "from-teal-900 via-teal-700 to-cyan-500",
    imageUrl: "/images/projects/chevalia-fields.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: {
      totalUnits: 0,
      communitySize: "5.54M sqm",
      poloFields: "3 Fields (340,000 SqM)",
      clubhouse: "5,600 SqM",
      developer: "Emaar Properties PJSC",
      location: "Grand Polo Club & Resort, Dubai",
      goldenVisa: true,
    },
  },
  {
    id: "montura-2",
    name: "Montura 2",
    slug: "montura-2",
    type: "villa",
    tagline: "The Next Chapter — Coming Soon",
    description: "Montura 2 continues the equestrian tradition at Grand Polo Club & Resort. A new phase of luxury villas designed for those who seek the perfect blend of polo heritage and contemporary living. Register for launch notifications.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Equestrian Heritage", "Contemporary Design", "Luxury Villas", "Green Spaces"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Community Centers", "Parks"],
    imageGradient: "from-sky-900 via-sky-700 to-blue-400",
    imageUrl: "/images/projects/chevalia-estate.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: {
      totalUnits: 0,
      communitySize: "5.54M sqm",
      poloFields: "3 Fields (340,000 SqM)",
      clubhouse: "5,600 SqM",
      developer: "Emaar Properties PJSC",
      location: "Grand Polo Club & Resort, Dubai",
      goldenVisa: true,
    },
  },
  {
    id: "montura-3",
    name: "Montura 3",
    slug: "montura-3",
    type: "villa",
    tagline: "Ride the Horizon — Coming Soon",
    description: "Montura 3 at Grand Polo Club & Resort offers the latest in equestrian-inspired luxury living. These villas will feature the finest finishes and unparalleled access to the community's world-class equestrian facilities. Register your interest today.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Equestrian Luxury", "World-Class Finishes", "Green Core Access", "Premium Living"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Riding School", "Sports Facilities"],
    imageGradient: "from-cyan-900 via-cyan-700 to-teal-400",
    imageUrl: "/images/projects/chevalia-estate-2.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: {
      totalUnits: 0,
      communitySize: "5.54M sqm",
      poloFields: "3 Fields (340,000 SqM)",
      clubhouse: "5,600 SqM",
      developer: "Emaar Properties PJSC",
      location: "Grand Polo Club & Resort, Dubai",
      goldenVisa: true,
    },
  },
  {
    id: "selvara-1",
    name: "Selvara 1",
    slug: "selvara-1",
    type: "villa",
    tagline: "Selvara Living — Premium Villas Coming Soon",
    description: "Selvara 1 at Grand Polo Club & Resort introduces the Selvara collection — a series of premium villa clusters set within the masterplan's most sought-after locations. Offering unparalleled access to polo fields, stables, and the luxury clubhouse, Selvara 1 promises residences defined by refined elegance and equestrian heritage. Register your interest for priority selection at launch.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Equestrian Design", "Polo Field Access", "Luxury Finishes", "Community Living"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Parks", "Sports Facilities"],
    imageGradient: "from-slate-900 via-slate-700 to-slate-400",
    imageUrl: "/images/projects/chevalia-estate.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: { totalUnits: 0, communitySize: "5.54M sqm", poloFields: "3 Fields (340,000 SqM)", clubhouse: "5,600 SqM", developer: "Emaar Properties PJSC", location: "Grand Polo Club & Resort, Dubai", goldenVisa: true },
  },
  {
    id: "selvara-2",
    name: "Selvara 2",
    slug: "selvara-2",
    type: "villa",
    tagline: "Selvara Elegance — Exclusive Residences Coming Soon",
    description: "Selvara 2 at Grand Polo Club & Resort continues the Selvara legacy with an exclusive collection of villas designed for those who seek the finest in equestrian luxury living. Nestled within lush landscapes and walking distance from the Green Core, these residences will embody sophistication and comfort. Register your interest for priority access.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Equestrian Design", "Green Core Proximity", "Premium Finishes", "Landscaped Gardens"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Riding Arenas", "Community Parks"],
    imageGradient: "from-zinc-900 via-zinc-700 to-zinc-400",
    imageUrl: "/images/projects/chevalia-estate-2.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: { totalUnits: 0, communitySize: "5.54M sqm", poloFields: "3 Fields (340,000 SqM)", clubhouse: "5,600 SqM", developer: "Emaar Properties PJSC", location: "Grand Polo Club & Resort, Dubai", goldenVisa: true },
  },
  {
    id: "selvara-3",
    name: "Selvara 3",
    slug: "selvara-3",
    type: "villa",
    tagline: "Selvara Prestige — Luxury Cluster Coming Soon",
    description: "Selvara 3 at Grand Polo Club & Resort elevates the Selvara offering with a collection of residences that blend contemporary architecture with the timeless spirit of the equestrian lifestyle. With panoramic views and curated amenities, these villas will set a new benchmark for community living in Dubai. Register your interest for launch details.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Contemporary Architecture", "Panoramic Views", "Curated Amenities", "Equestrian Access"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Fitness Areas", "Children's Play"],
    imageGradient: "from-stone-900 via-stone-700 to-stone-400",
    imageUrl: "/images/projects/chevalia-fields.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: { totalUnits: 0, communitySize: "5.54M sqm", poloFields: "3 Fields (340,000 SqM)", clubhouse: "5,600 SqM", developer: "Emaar Properties PJSC", location: "Grand Polo Club & Resort, Dubai", goldenVisa: true },
  },
  {
    id: "selvara-4",
    name: "Selvara 4",
    slug: "selvara-4",
    type: "villa",
    tagline: "Selvara Grandeur — Signature Villas Coming Soon",
    description: "Selvara 4 at Grand Polo Club & Resort represents the pinnacle of the Selvara collection. These signature villas will feature the most exclusive finishes, expansive layouts, and privileged positions within the masterplan. Designed for discerning homeowners who demand the extraordinary, Selvara 4 is the ultimate equestrian address. Register your interest for priority selection.",
    bedrooms: "TBA",
    startingPrice: 0,
    areaRange: "TBA",
    status: "Launching Soon",
    handover: "TBA",
    paymentPlan: "TBA",
    features: ["Signature Finishes", "Expansive Layouts", "Privileged Position", "Exclusive Address"],
    amenities: ["Three Polo Fields", "Luxury Clubhouse", "Private Stables", "Premium Parks", "Concierge Services"],
    imageGradient: "from-neutral-900 via-neutral-700 to-neutral-400",
    imageUrl: "/images/projects/chevalia-estate.webp",
    clusterTag: "Coming Soon",
    subfolders: {},
    facts: { totalUnits: 0, communitySize: "5.54M sqm", poloFields: "3 Fields (340,000 SqM)", clubhouse: "5,600 SqM", developer: "Emaar Properties PJSC", location: "Grand Polo Club & Resort, Dubai", goldenVisa: true },
  },
];

// ======== PAYMENT PLANS ========
export const paymentPlans: Record<string, PaymentMilestone[]> = {
  "chevalia-estate": [
    { label: "Down Payment", percentage: 10, date: "On Booking" },
    { label: "1st Instalment", percentage: 10, date: "Jul 2025" },
    { label: "2nd Instalment", percentage: 10, date: "Feb 2026" },
    { label: "3rd Instalment", percentage: 10, date: "Aug 2026" },
    { label: "4th Instalment", percentage: 10, date: "Feb 2027" },
    { label: "5th Instalment", percentage: 10, date: "Aug 2027" },
    { label: "6th Instalment", percentage: 10, date: "Feb 2028" },
    { label: "7th Instalment", percentage: 10, date: "Aug 2028" },
    { label: "8th Instalment", percentage: 20, date: "On Completion" },
  ],
  "chevalia-estate-2": [
    { label: "Down Payment", percentage: 10, date: "On Booking" },
    { label: "1st Instalment", percentage: 10, date: "Nov 2025" },
    { label: "2nd Instalment", percentage: 10, date: "May 2026" },
    { label: "3rd Instalment", percentage: 10, date: "Nov 2026" },
    { label: "4th Instalment", percentage: 10, date: "May 2027" },
    { label: "5th Instalment", percentage: 10, date: "Oct 2027" },
    { label: "6th Instalment", percentage: 10, date: "Feb 2028" },
    { label: "7th Instalment", percentage: 10, date: "Aug 2028" },
    { label: "8th Instalment", percentage: 20, date: "Jun 2029" },
  ],
  "chevalia-fields": [
    { label: "Down Payment", percentage: 10, date: "On Booking" },
    { label: "1st Instalment", percentage: 10, date: "Jul 2025" },
    { label: "2nd Instalment", percentage: 10, date: "Jan 2026" },
    { label: "3rd Instalment", percentage: 10, date: "Jun 2026" },
    { label: "4th Instalment", percentage: 10, date: "Jan 2027" },
    { label: "5th Instalment", percentage: 10, date: "Jun 2027" },
    { label: "6th Instalment", percentage: 10, date: "Feb 2028" },
    { label: "7th Instalment", percentage: 10, date: "May 2028" },
    { label: "8th Instalment", percentage: 20, date: "Apr 2029" },
  ],
};

// ======== CHEVALIA ESTATE 2 UNIT TYPES ========
export const unitTypes = {
  "chevalia-estate-2": [
    { type: "4 Bed Luxury", units: 74, avgBUA: 4168, avgPlot: 5794, startingPrice: 7880000 },
    { type: "5 Bed Ultra Luxury", units: 24, avgBUA: 5046, avgPlot: 6057, startingPrice: 10030000 },
    { type: "5 Bed Equestrian Luxury", units: 22, avgBUA: 8635, avgPlot: 9149, startingPrice: 17610000 },
  ],
  "chevalia-estate": [
    { type: "5 Bedroom", units: 80, avgBUA: 6516, avgPlot: 7490, startingPrice: 9000000 },
  ],
  "chevalia-fields": [
    { type: "4 Bedroom", units: 72, avgBUA: 4166, avgPlot: 5584, startingPrice: 7340000 },
    { type: "5 Bedroom", units: 107, avgBUA: 5873, avgPlot: 7013, startingPrice: 9190000 },
  ],
};

// ======== FAQS ========
export const faqs: FAQ[] = [
  {
    question: "What is Grand Polo Club & Resort?",
    answer: "Grand Polo Club & Resort is Emaar Properties' flagship equestrian-themed masterplan community in Dubai. Spanning 5.54 million square metres, it features three polo fields, a luxury clubhouse, private stables, and 22 residential clusters with a total of 6,661 residences. The community is designed to strike a fine balance between lifestyle principles of leisure, nature, connectivity, wellness, and recreation.",
  },
  {
    question: "Where is Grand Polo Club & Resort located?",
    answer: "Grand Polo Club & Resort is strategically located near Al Maktoum International Airport in Dubai, just 5 minutes from the airport, 10 minutes from Expo City, and 30 minutes from Downtown Dubai. The community is also near The Oasis by Emaar, Arabian Ranches, and Emirates Road, providing excellent connectivity across Dubai.",
  },
  {
    question: "What property types are available at Grand Polo?",
    answer: "Grand Polo offers a range of luxury villas across multiple clusters. The first phase includes Chevalia Estate (5-bedroom villas from AED 9M), Chevalia Estate 2 (4 and 5-bedroom villas from AED 7.88M), and Chevalia Fields (4 and 5-bedroom villas from AED 7.34M). Additional clusters including Equestra, Equitera, Montura, and Selvara are launching soon with more villa options.",
  },
  {
    question: "What are the starting prices at Grand Polo?",
    answer: "Prices start from AED 7.34 million for a 4-bedroom villa in Chevalia Fields, AED 7.88 million for a 4-bedroom villa in Chevalia Estate 2, and AED 9 million for a 5-bedroom villa in Chevalia Estate. Premium equestrian luxury villas in Chevalia Estate 2 start from AED 17.61 million. All prices are set by the developer, Emaar Properties.",
  },
  {
    question: "What payment plans are available?",
    answer: "All clusters offer a flexible 10% down payment with instalment structure. After the 10% down payment on booking, the remaining amount is paid through instalments of 10% each at various construction milestones, with the final 20% due on completion. This structure allows buyers to spread payments over the construction period without excessive upfront costs.",
  },
  {
    question: "Is Grand Polo eligible for the Golden Visa?",
    answer: "Yes, all properties at Grand Polo Club & Resort priced above AED 2 million qualify for the UAE Golden Visa, which grants 10-year residency for the property owner and their family members. Given that all villas start from AED 7.34 million, every buyer is eligible for the Golden Visa.",
  },
  {
    question: "What amenities does Grand Polo offer?",
    answer: "Grand Polo offers 23 world-class amenities including three polo fields, a luxury clubhouse (5,600 SqM), private stables with riding arenas, a galloping fountain, art pavilion, padel courts, football courts, basketball half court, mini golf, fitness areas, forest walk, dog park, floral garden, mounded garden, playgrounds, pump track, mosque, and community centres.",
  },
  {
    question: "Who is the developer of Grand Polo?",
    answer: "Grand Polo Club & Resort is developed by Emaar Properties PJSC, one of the world's most valuable real estate development companies and the developer of iconic Dubai landmarks including the Burj Khalifa, Dubai Mall, and Dubai Marina. Emaar has a proven track record of delivering world-class masterplan communities.",
  },
  {
    question: "When is the handover for Grand Polo properties?",
    answer: "Handover dates vary by cluster. Chevalia Fields is expected in Q1 2029, Chevalia Estate 2 in Q2 2029, and Chevalia Estate in Q4 2028. As with all Emaar off-plan developments, construction milestones are tracked and instalment payments are linked to these milestones.",
  },
  {
    question: "How does Grand Polo compare to The Oasis by Emaar?",
    answer: "Both are Emaar masterplan communities, but they offer distinctly different lifestyles. The Oasis features a 3.5km crystal lagoon and waterfront living with 9 clusters and 7,000+ residences. Grand Polo focuses on equestrian luxury with polo fields, stables, and a clubhouse at its heart across 22 clusters with 6,661 residences. Grand Polo is closer to Al Maktoum International Airport (5 mins), while The Oasis is closer to central Dubai via Hessa Street.",
  },
];

// ======== GALLERY IMAGES ========
export const galleryImages: GalleryImage[] = [
  { id: "g1", category: "Equestrian", alt: "Grand Polo Club aerial view", imageUrl: "/images/gallery/polo-club.webp" },
  { id: "g2", category: "Equestrian", alt: "Dubai Polo and Equestrian Club", imageUrl: "/images/gallery/dubai-polo.webp" },
  { id: "g3", category: "Equestrian", alt: "The Stables at Grand Polo", imageUrl: "/images/gallery/stables-1.webp" },
  { id: "g4", category: "Equestrian", alt: "Stables interior courtyard", imageUrl: "/images/gallery/stables-2.webp" },
  { id: "g5", category: "Equestrian", alt: "Polo Fields panoramic view", imageUrl: "/images/gallery/polo-field-1.webp" },
  { id: "g6", category: "Clubhouse", alt: "The Clubhouse at Grand Polo", imageUrl: "/images/gallery/clubhouse-1.webp" },
  { id: "g7", category: "Exterior", alt: "Chevalia Estate 2 luxury villa", imageUrl: "/images/gallery/ce2-render-2.webp" },
  { id: "g8", category: "Exterior", alt: "Chevalia Estate 2 facade", imageUrl: "/images/gallery/ce2-render-3.webp" },
  { id: "g9", category: "Exterior", alt: "Chevalia Estate 2 evening render", imageUrl: "/images/gallery/ce2-render-4.webp" },
  { id: "g10", category: "Exterior", alt: "Chevalia Estate 2 garden view", imageUrl: "/images/gallery/ce2-render-7.webp" },
  { id: "g11", category: "Exterior", alt: "Chevalia Estate 2 pool area", imageUrl: "/images/gallery/ce2-render-8.webp" },
  { id: "g12", category: "Exterior", alt: "Chevalia Estate villa exterior", imageUrl: "/images/gallery/ce1-render-1.webp" },
  { id: "g13", category: "Exterior", alt: "Chevalia Estate facade detail", imageUrl: "/images/gallery/ce1-render-2.webp" },
  { id: "g14", category: "Exterior", alt: "Chevalia Estate garden", imageUrl: "/images/gallery/ce1-render-4.webp" },
  { id: "g15", category: "Exterior", alt: "Chevalia Fields villa render", imageUrl: "/images/gallery/cf-render-1.webp" },
  { id: "g16", category: "Exterior", alt: "Chevalia Fields facade", imageUrl: "/images/gallery/cf-render-2.webp" },
  { id: "g17", category: "Equestrian", alt: "Polo villa lifestyle", imageUrl: "/images/gallery/polo-villa.webp" },
  { id: "g18", category: "Equestrian", alt: "Polo field evening", imageUrl: "/images/gallery/polo-field-2.webp" },
];

// ======== AMENITIES ========
export const amenities = [
  { name: "Grand Polo Club Estate", icon: "Crown" },
  { name: "Community Centres", icon: "Building2" },
  { name: "Galloping Fountain", icon: "Waves" },
  { name: "Art Pavilion", icon: "Palette" },
  { name: "Open Lawn", icon: "TreePine" },
  { name: "Football Courts", icon: "CircleDot" },
  { name: "MUGA Court", icon: "Target" },
  { name: "Basketball Half Court", icon: "Circle" },
  { name: "Padel Courts", icon: "Swords" },
  { name: "Volleyball Sand Court", icon: "Sun" },
  { name: "Mini Golf", icon: "Flag" },
  { name: "Bounce Playground", icon: "Baby" },
  { name: "Fitness Area", icon: "Dumbbell" },
  { name: "Dog Park", icon: "Dog" },
  { name: "Forest Walk", icon: "Trees" },
  { name: "Picnic Area", icon: "UtensilsCrossed" },
  { name: "Floral Garden", icon: "Flower2" },
  { name: "Mounded Garden", icon: "Mountain" },
  { name: "Resting Areas", icon: "Armchair" },
  { name: "Playground", icon: "Gamepad2" },
  { name: "Pump Track", icon: "Bike" },
  { name: "Mosque", icon: "Landmark" },
  { name: "Entrance & Guard House", icon: "Shield" },
];
