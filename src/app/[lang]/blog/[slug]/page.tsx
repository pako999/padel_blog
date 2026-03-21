/**
 * app/[lang]/blog/[slug]/page.tsx
 * Individual blog post page — fully SEO-optimized
 * Handles all 8 languages via the [lang] dynamic segment
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPost, getPostSlugs, getHreflangAlternates, SUPPORTED_LANGS, type Lang } from '@/lib/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

// ─── Static params for build-time generation ──────────────────────────────────

export async function generateStaticParams() {
  const params = [];
  for (const lang of SUPPORTED_LANGS) {
    const slugs = getPostSlugs(lang);
    slugs.forEach(slug => params.push({ lang, slug }));
  }
  return params;
}

// ─── Metadata / SEO ──────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { lang: Lang; slug: string };
}): Promise<Metadata> {
  const post = getPost(params.lang, params.slug);
  if (!post) return {};

  const hreflang = getHreflangAlternates(params.slug, BASE_URL);
  const canonicalUrl = `${BASE_URL}/${params.lang}/blog/${params.slug}`;

  return {
    title: `${post.title} | MarbellapadEL`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: 'Marbella Padel Guide' }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: 'MarbellapadEL',
      locale: params.lang,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(hreflang.map(h => [h.lang, h.url])),
    },
  };
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function BlogPostPage({
  params,
}: {
  params: { lang: Lang; slug: string };
}) {
  const post = getPost(params.lang, params.slug);
  if (!post) notFound();

  const canonicalUrl = `${BASE_URL}/${params.lang}/blog/${params.slug}`;
  const hreflang = getHreflangAlternates(params.slug, BASE_URL);

  // Parse schema from frontmatter
  let schemaJson = null;
  try {
    if (post.schema) schemaJson = JSON.parse(post.schema);
  } catch {}

  return (
    <>
      {/* Hreflang tags */}
      {hreflang.map(h => (
        <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en/blog/${params.slug}`} />

      {/* JSON-LD Article schema */}
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      )}

      <article className="blog-post">
        <header className="post-header">
          <div className="post-meta">
            <span className="post-cluster">{post.cluster}</span>
            <span className="post-reading-time">{post.readingTime} min read</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(params.lang, {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </time>
          </div>
          <h1>{post.title}</h1>
          <p className="post-description">{post.description}</p>
        </header>

        <div className="post-content">
          <MDXRemote source={post.content} />
        </div>

        {/* Advertise CTA — shown on every post */}
        <div className="advertise-cta">
          <h3>Own a padel club in Marbella?</h3>
          <p>Get featured on the #1 Marbella padel guide. Reach thousands of players searching for courts every month.</p>
          <a href="/advertise" className="cta-button">
            List your club →
          </a>
        </div>
      </article>
    </>
  );
}
