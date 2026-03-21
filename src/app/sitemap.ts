/**
 * app/sitemap.ts
 * Dynamically generates sitemap.xml for all blog posts across all languages
 * Next.js will serve this at /sitemap.xml
 */

import { getAllSlugsForSitemap } from '@/lib/blog';
import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllSlugsForSitemap();

  const postUrls = posts.map(({ lang, slug }) => ({
    url: `${BASE_URL}/${lang}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/en/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/en/clubs`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/de`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/sv`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/nl`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/fr`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/es`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/pl`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/no`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/advertise`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];

  return [...staticUrls, ...postUrls];
}
