export interface Court {
  slug: string;
  name: string;
  area: string;
  courts: number;
  indoor: boolean;
  outdoor: boolean;
  priceFrom: number;
  priceTo: number;
  surface: string;
  address: string;
  hours: string;
  description: string;
  amenities: string[];
  website: string;
  bookingUrl: string;
  featured: boolean;
  image: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  coverImage: string;
  content: string;
}
