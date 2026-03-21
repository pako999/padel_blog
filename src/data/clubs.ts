/**
 * data/clubs.ts
 * Static data for all padel clubs in Marbella
 */

export type Tier = 'premium' | 'standard';

export interface Club {
  slug: string;
  name: string;
  tagline: string;
  courts: number;
  address: string;
  phone: string;
  website: string;
  tier: Tier;
  indoor: boolean;
  outdoor: boolean;
  restaurant: boolean;
  gym: boolean;
  lessons: boolean;
  priceRange: '€' | '€€' | '€€€' | '€€€€';
  bookingUrl: string;
  description: string;
  highlights: string[];
  coordinates: { lat: number; lng: number };
}

export const CLUBS: Club[] = [
  {
    slug: 'nac-nueva-alcantara',
    name: 'NAC Nueva Alcántara',
    tagline: "World's best padel club 2024 & 2025",
    courts: 16,
    address: 'Av. de Barcelona, 8, San Pedro Alcántara, Marbella',
    phone: '+34 639 77 93 15',
    website: 'https://nacclub.es',
    tier: 'premium',
    indoor: true,
    outdoor: true,
    restaurant: true,
    gym: true,
    lessons: true,
    priceRange: '€€€',
    bookingUrl: 'https://playtomic.io/club/nac',
    description:
      'NAC Nueva Alcántara stands as the pinnacle of European padel, claiming the World Padel Awards title for Best Club two years running in 2024 and 2025. With 16 glass-walled courts — a mix of indoor and outdoor — the club offers everything from social sessions to high-performance coaching. The on-site fine dining restaurant and physiotherapy centre make it a complete destination.',
    highlights: [
      'World Padel Awards winner 2024 & 2025',
      '16 glass-walled courts (indoor & outdoor)',
      'Fine dining restaurant on-site',
      'Professional physiotherapy centre',
      'World-class coaching academy',
    ],
    coordinates: { lat: 36.4785, lng: -4.9876 },
  },
  {
    slug: 'puente-romano',
    name: 'Puente Romano Beach Resort',
    tagline: 'Luxury resort padel on the Golden Mile',
    courts: 8,
    address: 'Bulevar Príncipe Alfonso de Hohenlohe, s/n, Marbella',
    phone: '+34 952 82 09 00',
    website: 'https://puenteRomano.com',
    tier: 'premium',
    indoor: false,
    outdoor: true,
    restaurant: true,
    gym: true,
    lessons: true,
    priceRange: '€€€€',
    bookingUrl: 'https://playtomic.io/club/puente-romano',
    description:
      "Set within one of the Costa del Sol's most celebrated five-star resorts, Puente Romano Padel combines world-class courts with unmatched Mediterranean luxury. Eight outdoor courts are set among lush gardens just steps from the beach. Resident pros offer private lessons while guests enjoy access to the resort's restaurants, spa, and beach club.",
    highlights: [
      '8 outdoor courts in tropical garden setting',
      'Five-star resort facilities included',
      'Resident professional coaching team',
      'Direct beach access',
      'Six on-site restaurants',
    ],
    coordinates: { lat: 36.5071, lng: -4.9234 },
  },
  {
    slug: 'real-club-padel-marbella',
    name: 'Real Club Padel Marbella',
    tagline: 'The historic heart of Marbella padel',
    courts: 10,
    address: 'Av. de las Naciones, Marbella',
    phone: '+34 952 77 62 30',
    website: 'https://realclubpadelMarbella.com',
    tier: 'premium',
    indoor: true,
    outdoor: true,
    restaurant: true,
    gym: false,
    lessons: true,
    priceRange: '€€€',
    bookingUrl: 'https://playtomic.io/club/real-club-marbella',
    description:
      "Real Club Padel Marbella has been the social hub for the town's padel community since the sport first took root on the Costa del Sol. With 10 courts covering indoor and outdoor options, it hosts the most competitive social ladder in the region. The club's central location and warm atmosphere make it the meeting point for local players and international visitors alike.",
    highlights: [
      'Established padel institution since the 1990s',
      '10 courts — indoor & outdoor',
      'Most competitive social ladder in Marbella',
      'Central location, easy parking',
      'Resident coaching staff',
    ],
    coordinates: { lat: 36.51, lng: -4.885 },
  },
  {
    slug: 'manolo-santana-racquets',
    name: 'Manolo Santana Racquets Club',
    tagline: 'Grand Slam legacy meets world-class padel',
    courts: 12,
    address: 'Urbanización Guadalmina Baja, San Pedro Alcántara',
    phone: '+34 952 88 22 11',
    website: 'https://manolosantana.com',
    tier: 'premium',
    indoor: true,
    outdoor: true,
    restaurant: true,
    gym: true,
    lessons: true,
    priceRange: '€€€',
    bookingUrl: 'https://playtomic.io/club/manolo-santana',
    description:
      "Named after Spain's legendary tennis champion and Wimbledon winner, Manolo Santana Racquets Club brings the prestige of Grand Slam heritage to the padel court. Twelve meticulously maintained courts sit alongside tennis and padbol facilities within a beautiful residential setting. The club's academy attracts serious players from across Europe.",
    highlights: [
      'Named after Wimbledon champion Manolo Santana',
      '12 courts with full academy programme',
      'Elite coaching for all levels',
      'Padbol and tennis also available',
      'Members-only social events',
    ],
    coordinates: { lat: 36.4694, lng: -5.0095 },
  },
  {
    slug: 'los-monteros-racket',
    name: 'Los Monteros Racket Club',
    tagline: "East Marbella's premier padel destination",
    courts: 7,
    address: 'Urb. Los Monteros, Marbella',
    phone: '+34 952 77 17 00',
    website: 'https://losmonteros.com',
    tier: 'standard',
    indoor: false,
    outdoor: true,
    restaurant: true,
    gym: true,
    lessons: true,
    priceRange: '€€€',
    bookingUrl: 'https://playtomic.io/club/los-monteros',
    description:
      "Nestled in the prestigious Los Monteros urbanisation east of Marbella's old town, this club pairs seven outdoor padel courts with the leisure facilities of a luxury hotel. The setting — surrounded by mature pine trees with sea glimpses — is among the most beautiful on the coast. Lessons are available from resident pros for all ages and abilities.",
    highlights: [
      '7 outdoor courts in pine forest setting',
      'Attached to Los Monteros Spa & Golf Resort',
      'Sea views from upper courts',
      'Junior academy programme',
      'Ideal for hotel guests and locals',
    ],
    coordinates: { lat: 36.5185, lng: -4.8416 },
  },
  {
    slug: 'el-mirador-padel',
    name: 'El Mirador Padel Club',
    tagline: 'Panoramic court play above Marbella',
    courts: 6,
    address: 'Urb. El Mirador, Marbella',
    phone: '+34 952 83 14 40',
    website: 'https://elmiradorpadel.com',
    tier: 'standard',
    indoor: false,
    outdoor: true,
    restaurant: false,
    gym: false,
    lessons: true,
    priceRange: '€€',
    bookingUrl: 'https://playtomic.io/club/el-mirador',
    description:
      'El Mirador Padel offers some of the most spectacular views of any padel club on the Costa del Sol, with six outdoor courts perched above Marbella looking out towards Gibraltar and the Atlas Mountains of Morocco. The club is known for its friendly community atmosphere and accessible pricing, making it a favourite for regular local players.',
    highlights: [
      'Panoramic views to Gibraltar and Morocco',
      '6 outdoor courts at altitude',
      'Friendly local community',
      'Accessible pricing',
      'Group and individual lessons',
    ],
    coordinates: { lat: 36.525, lng: -4.898 },
  },
  {
    slug: 'villa-padierna-padel',
    name: 'Villa Padierna Padel',
    tagline: 'Tuscan-style luxury padel in Benahavís',
    courts: 5,
    address: 'Ctra. de Cádiz, km 166, Benahavís',
    phone: '+34 952 88 91 50',
    website: 'https://villapadierna.com',
    tier: 'premium',
    indoor: false,
    outdoor: true,
    restaurant: true,
    gym: true,
    lessons: true,
    priceRange: '€€€€',
    bookingUrl: 'https://playtomic.io/club/villa-padierna',
    description:
      'Villa Padierna Palace, a five-star Relais & Châteaux property, houses five immaculately kept padel courts within its Italianate gardens. The setting is extraordinary: terracotta-roofed villas, olive groves, and mountain backdrops. Padel here is a curated experience — private lessons, luxury towels, and cold drinks delivered courtside.',
    highlights: [
      '5-star Relais & Châteaux resort setting',
      '5 outdoor courts in Italianate gardens',
      'Private coaching with world-ranked pros',
      'Courtside F&B service',
      'Golf & spa access for guests',
    ],
    coordinates: { lat: 36.485, lng: -5.025 },
  },
  {
    slug: 'itc-marbella',
    name: 'International Tennis Club Marbella',
    tagline: 'Multi-sport excellence since 1974',
    courts: 8,
    address: 'Urb. Lomas de Marbella Club, Marbella',
    phone: '+34 952 77 15 42',
    website: 'https://itcmarbella.com',
    tier: 'standard',
    indoor: false,
    outdoor: true,
    restaurant: true,
    gym: true,
    lessons: true,
    priceRange: '€€',
    bookingUrl: 'https://playtomic.io/club/itc-marbella',
    description:
      "Founded in 1974, the International Tennis Club Marbella was one of the first clubs in Spain to adopt padel as a core offering. Eight outdoor courts sit alongside 10 tennis courts, making it a true multi-sport destination. The club's long history means it has deep roots in the Marbella expat community, with players from the UK, Germany, Scandinavia, and beyond.",
    highlights: [
      "Founded 1974 — Marbella's original multi-sport club",
      '8 padel + 10 tennis courts',
      'Strong expat community (UK, German, Scandinavian)',
      'Competitive leagues and tournaments',
      'Annual Marbella Open qualifier event',
    ],
    coordinates: { lat: 36.508, lng: -4.938 },
  },
  {
    slug: 'racket-club-los-granados',
    name: 'Racket Club Los Granados',
    tagline: 'Benahavis valley padel retreat',
    courts: 4,
    address: 'Urb. Los Granados Golf, Benahavís',
    phone: '+34 952 93 55 10',
    website: 'https://racketclublosgranados.com',
    tier: 'standard',
    indoor: false,
    outdoor: true,
    restaurant: false,
    gym: false,
    lessons: true,
    priceRange: '€',
    bookingUrl: 'https://playtomic.io/club/los-granados',
    description:
      "Tucked into the Benahavís valley behind Puerto Banús, Racket Club Los Granados offers a relaxed, unpretentious padel experience amid mountain scenery. Four outdoor courts are well-maintained and bookable at very competitive prices — this is the locals' choice for regular play without the resort price tag.",
    highlights: [
      '4 outdoor courts in mountain valley setting',
      'Most affordable club on the coast',
      'No-frills, community-focused atmosphere',
      'Easy access from Puerto Banús',
      'Junior friendly',
    ],
    coordinates: { lat: 36.461, lng: -5.038 },
  },
];
