/**
 * lib/blog.ts
 * Utilities for loading and parsing MDX blog posts from the filesystem
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

export const SUPPORTED_LANGS = ['en', 'de', 'sv', 'nl', 'fr', 'es', 'pl', 'no'] as const;
export type Lang = typeof SUPPORTED_LANGS[number];

export interface PostMeta {
  title: string;
  description: string;
  slug: string;
  lang: Lang;
  publishedAt: string;
  updatedAt: string;
  keywords: string[];
  cluster: string;
  audience: string;
  featured: boolean;
  readingTime: number;
  coverImage?: string;
  schema?: string;
}

export interface Post extends PostMeta {
  content: string;
}

/** Get all post slugs for a given language (used for static generation) */
export function getPostSlugs(lang: Lang): string[] {
  const dir = path.join(CONTENT_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));
}

/** Load a single post by slug + language */
export function getPost(lang: Lang, slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, lang, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    ...(data as PostMeta),
    slug,
    lang,
    content,
  };
}

/** Get all posts for a language, sorted by date (newest first) */
export function getAllPosts(lang: Lang): Post[] {
  const slugs = getPostSlugs(lang);
  const posts = slugs.map(slug => getPost(lang, slug)).filter(Boolean) as Post[];
  return posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** Get featured posts across all languages (for homepage) */
export function getFeaturedPosts(lang: Lang, limit = 6): Post[] {
  return getAllPosts(lang).slice(0, limit);
}

/** Get posts by cluster/category */
export function getPostsByCluster(lang: Lang, cluster: string): Post[] {
  return getAllPosts(lang).filter(p => p.cluster === cluster);
}

/** Get all slugs across all languages (for sitemap) */
export function getAllSlugsForSitemap(): { lang: Lang; slug: string }[] {
  const result: { lang: Lang; slug: string }[] = [];
  for (const lang of SUPPORTED_LANGS) {
    const slugs = getPostSlugs(lang);
    slugs.forEach(slug => result.push({ lang, slug }));
  }
  return result;
}

/** Get hreflang alternates for a given slug */
export function getHreflangAlternates(slug: string, baseUrl: string) {
  return SUPPORTED_LANGS
    .filter(lang => fs.existsSync(path.join(CONTENT_DIR, lang, `${slug}.mdx`)))
    .map(lang => ({
      lang,
      url: `${baseUrl}/${lang}/blog/${slug}`,
    }));
}
