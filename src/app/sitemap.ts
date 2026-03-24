import { getAllSlugsForSitemap } from '@/lib/blog';
import courtsData from '../../data/courts.json';
import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://padel-blog.vercel.app';
const LANGS = ['en','de','sv','nl','fr','es','pl','no'];
const courts = courtsData as { slug: string }[];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Court pages
  const courtUrls: MetadataRoute.Sitemap = courts.map(c => ({
    url: `${BASE}/courts/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Auto-generated MDX blog posts (multilingual)
  const mdxPosts = getAllSlugsForSitemap().map(({ lang, slug }) => ({
    url: `${BASE}/${lang}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Static pages per language
  const langPages: MetadataRoute.Sitemap = LANGS.flatMap(lang => [
    { url: `${BASE}/${lang}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/${lang}/blog`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.85 },
    { url: `${BASE}/${lang}/clubs`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
  ]);

  // Core pages
  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/courts`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/advertise`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  return [...core, ...courtUrls, ...langPages, ...mdxPosts];
}
