/**
 * app/[lang]/blog/[slug]/page.tsx
 * Individual blog post — Mediterranean luxury editorial design
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  getPost,
  getPostSlugs,
  getHreflangAlternates,
  SUPPORTED_LANGS,
  type Lang,
} from '@/lib/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

interface UiStrings {
  blog: string;
  clubs: string;
  backToBlog: string;
  ctaTitle: string;
  ctaBody: string;
  ctaBtn: string;
  footerTagline: string;
}

const UI: Record<Lang, UiStrings> = {
  en: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Back to guide',
    ctaTitle: 'Own a padel club in Marbella?',
    ctaBody: 'Get featured on the #1 Marbella padel guide. Reach thousands of players searching for courts every month.',
    ctaBtn: 'List your club →',
    footerTagline: 'The #1 multilingual padel guide for Marbella',
  },
  de: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Zurück zum Ratgeber',
    ctaTitle: 'Haben Sie einen Padel-Club in Marbella?',
    ctaBody: 'Erscheinen Sie im #1 Marbella Padel-Ratgeber. Erreichen Sie tausende Spieler jeden Monat.',
    ctaBtn: 'Club eintragen →',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella',
  },
  sv: {
    blog: 'Blogg',
    clubs: 'Klubbar',
    backToBlog: '← Tillbaka till guiden',
    ctaTitle: 'Äger du en padelklubb i Marbella?',
    ctaBody: 'Bli presenterad i den #1 padelguiden för Marbella. Nå tusentals spelare varje månad.',
    ctaBtn: 'Lista din klubb →',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella',
  },
  nl: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Terug naar gids',
    ctaTitle: 'Heeft u een padelclub in Marbella?',
    ctaBody: 'Word gepresenteerd in de #1 Marbella padelgids. Bereik duizenden spelers elke maand.',
    ctaBtn: 'Uw club vermelden →',
    footerTagline: 'De #1 meertalige padelgids voor Marbella',
  },
  fr: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Retour au guide',
    ctaTitle: 'Vous avez un club de padel à Marbella?',
    ctaBody: "Soyez présenté dans le guide padel #1 de Marbella. Touchez des milliers de joueurs chaque mois.",
    ctaBtn: 'Lister votre club →',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella',
  },
  es: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Volver a la guía',
    ctaTitle: '¿Tienes un club de pádel en Marbella?',
    ctaBody: 'Aparece en la guía de pádel #1 de Marbella. Llega a miles de jugadores cada mes.',
    ctaBtn: 'Listar tu club →',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella',
  },
  pl: {
    blog: 'Blog',
    clubs: 'Kluby',
    backToBlog: '← Powrót do przewodnika',
    ctaTitle: 'Masz klub padlowy w Marbelli?',
    ctaBody: 'Zaistniej w przewodniku padlowym #1 dla Marbelli. Dotrzyj do tysięcy graczy każdego miesiąca.',
    ctaBtn: 'Dodaj swój klub →',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli',
  },
  no: {
    blog: 'Blogg',
    clubs: 'Klubber',
    backToBlog: '← Tilbake til guiden',
    ctaTitle: 'Eier du en padelklubb i Marbella?',
    ctaBody: 'Bli presentert i den #1 padelguiden for Marbella. Nå tusenvis av spillere hver måned.',
    ctaBtn: 'List klubben din →',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella',
  },
};

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const params: { lang: Lang; slug: string }[] = [];
  for (const lang of SUPPORTED_LANGS) {
    const slugs = getPostSlugs(lang);
    slugs.forEach(slug => params.push({ lang, slug }));
  }
  return params;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(lang, slug);
  if (!post) return {};

  const hreflang = getHreflangAlternates(slug, BASE_URL);
  const canonicalUrl = `${BASE_URL}/${lang}/blog/${slug}`;

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
      locale: lang,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      ...(post.coverImage && { images: [{ url: post.coverImage, width: 1200, height: 630 }] }),
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getPost(lang, slug);
  if (!post) notFound();

  const hreflang = getHreflangAlternates(slug, BASE_URL);
  const ui = UI[lang];

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
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en/blog/${slug}`} />

      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      )}

      {/* ── Navigation ── */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href={`/${lang}`} className="nav-logo">
            MarbellapadEL
          </Link>
          <div className="nav-links">
            <Link href={`/${lang}/clubs`} className="nav-link">{ui.clubs}</Link>
            <Link href={`/${lang}/blog`} className="nav-link">{ui.blog}</Link>
          </div>
          <div className="lang-pills" aria-label="Language switcher">
            {SUPPORTED_LANGS.map(l => (
              <Link
                key={l}
                href={`/${l}/blog/${slug}`}
                className={`lang-pill${l === lang ? ' active' : ''}`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <article className="article-page">

          {/* Hero image */}
          {post.coverImage && (
            <div className="article-hero-image">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="article-hero-overlay" />
            </div>
          )}

          {/* Breadcrumb */}
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${lang}`}>MarbellapadEL</Link>
            <span className="article-breadcrumb-sep">/</span>
            <Link href={`/${lang}/blog`}>{ui.blog}</Link>
            <span className="article-breadcrumb-sep">/</span>
            <span>{post.cluster.replace(/-/g, ' ')}</span>
          </nav>

          {/* Article header */}
          <header className="article-header">
            <div className="article-meta-bar">
              <span className="article-cluster-tag">
                {post.cluster.replace(/-/g, ' ')}
              </span>
              <time className="article-date" dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(lang, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="article-reading-time">{post.readingTime} min</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-description">{post.description}</p>
          </header>

          {/* MDX content with full prose styles */}
          <div className="prose">
            <MDXRemote source={post.content} />
          </div>

          {/* End CTA */}
          <div className="article-end-cta">
            <h3>{ui.ctaTitle}</h3>
            <p>{ui.ctaBody}</p>
            <Link href="/advertise" className="btn-primary">{ui.ctaBtn}</Link>
          </div>

          {/* Back link */}
          <Link href={`/${lang}/blog`} className="article-back-link">
            {ui.backToBlog}
          </Link>

        </article>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Link href={`/${lang}`} className="footer-logo">MarbellapadEL</Link>
            <p className="footer-tagline">{ui.footerTagline}</p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} MarbellapadEL. All rights reserved.
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href={`/${lang}/clubs`} className="footer-link">{ui.clubs}</Link>
            <Link href={`/${lang}/blog`} className="footer-link">{ui.blog}</Link>
            <Link href="/advertise" className="footer-link">Advertise</Link>
            {SUPPORTED_LANGS.map(l => (
              <Link key={l} href={`/${l}/blog/${slug}`} className="footer-link">
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
