/**
 * app/[lang]/blog/page.tsx
 * Blog listing page — SEO-optimized index for each language
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts, SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

const PAGE_META: Record<Lang, { title: string; description: string; h1: string }> = {
  en: {
    title: 'Marbella Padel Guide — Best Clubs, Courts & Tips',
    description: 'The complete guide to padel in Marbella. Reviews of the best clubs, how to book courts, lessons, tournaments and tips for every level.',
    h1: 'Marbella Padel Guide',
  },
  de: {
    title: 'Padel Marbella Guide — Beste Clubs & Plätze',
    description: 'Der komplette Leitfaden für Padel in Marbella. Clubs, Buchung, Kurse und Tipps für jeden Level.',
    h1: 'Padel in Marbella — Ihr Guide',
  },
  sv: {
    title: 'Padel Marbella Guide — Bästa Klubbar & Banor',
    description: 'Den kompletta guiden till padel i Marbella. Recensioner av de bästa klubbarna, bokningar och tips.',
    h1: 'Padel i Marbella — Din Guide',
  },
  nl: {
    title: 'Padel Marbella Gids — Beste Clubs & Banen',
    description: 'De complete gids voor padel in Marbella. Reviews van de beste clubs, boekingen en tips.',
    h1: 'Padel Marbella Gids',
  },
  fr: {
    title: 'Guide Padel Marbella — Meilleurs Clubs & Courts',
    description: 'Le guide complet du padel à Marbella. Avis sur les meilleurs clubs, réservations et conseils.',
    h1: 'Guide Padel Marbella',
  },
  es: {
    title: 'Guía Padel Marbella — Mejores Clubs y Pistas',
    description: 'La guía completa del pádel en Marbella. Los mejores clubs, cómo reservar pistas y consejos.',
    h1: 'Guía de Pádel en Marbella',
  },
  pl: {
    title: 'Padel Marbella Przewodnik — Najlepsze Kluby',
    description: 'Kompletny przewodnik po padlu w Marbelli. Recenzje najlepszych klubów, rezerwacje i porady.',
    h1: 'Padel w Marbelli — Przewodnik',
  },
  no: {
    title: 'Padel Marbella Guide — Beste Klubber & Baner',
    description: 'Den komplette guiden til padel i Marbella. Anmeldelser av de beste klubbene, booking og tips.',
    h1: 'Padel i Marbella — Din Guide',
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang)) return {};
  const meta = PAGE_META[lang];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/blog`])
      ),
    },
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang)) notFound();

  const posts = getAllPosts(lang);
  const meta = PAGE_META[lang];

  const clusters = [...new Set(posts.map(p => p.cluster))];

  return (
    <main className="blog-index">
      <header className="blog-index-header">
        <h1>{meta.h1}</h1>
        <p>{meta.description}</p>
      </header>

      {/* Language switcher */}
      <nav className="lang-switcher" aria-label="Language">
        {SUPPORTED_LANGS.map(l => (
          <Link key={l} href={`/${l}/blog`} className={l === lang ? 'active' : ''}>
            {l.toUpperCase()}
          </Link>
        ))}
      </nav>

      {/* Posts by cluster */}
      {clusters.map(cluster => {
        const clusterPosts = posts.filter(p => p.cluster === cluster);
        return (
          <section key={cluster} className="cluster-section">
            <h2 className="cluster-title">{cluster.replace(/-/g, ' ')}</h2>
            <div className="post-grid">
              {clusterPosts.map(post => (
                <article key={post.slug} className="post-card">
                  <Link href={`/${lang}/blog/${post.slug}`}>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <div className="post-card-meta">
                      <span>{post.readingTime} min</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* Advertise CTA */}
      <section className="advertise-banner">
        <h2>Advertise your padel club</h2>
        <p>Reach thousands of players searching for courts in Marbella every month.</p>
        <Link href="/advertise" className="cta-button">Get listed →</Link>
      </section>
    </main>
  );
}
