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
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

interface UiStrings {
  blog: string;
  clubs: string;
  backToBlog: string;
  ctaTitle: string;
  ctaBody: string;
  ctaBtn: string;
  navClubs: string;
  navAdvertise: string;
  footerTagline: string;
  footerCopyright: string;
}

const UI: Record<Lang, UiStrings> = {
  en: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Back to guide',
    ctaTitle: 'Own a padel club in Marbella?',
    ctaBody: 'Get featured on the #1 Marbella padel guide. Reach thousands of players searching for courts every month.',
    ctaBtn: 'List your club →',
    navClubs: 'Clubs',
    navAdvertise: 'Advertise',
    footerTagline: 'The #1 multilingual padel guide for Marbella. Discover best clubs, book courts, and expert tips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. All rights reserved.`,
  },
  de: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Zurück zum Ratgeber',
    ctaTitle: 'Haben Sie einen Padel-Club in Marbella?',
    ctaBody: 'Erscheinen Sie im #1 Marbella Padel-Ratgeber. Erreichen Sie tausende Spieler jeden Monat.',
    ctaBtn: 'Club eintragen →',
    navClubs: 'Clubs',
    navAdvertise: 'Werben',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle Rechte vorbehalten.`,
  },
  sv: {
    blog: 'Blogg',
    clubs: 'Klubbar',
    backToBlog: '← Tillbaka till guiden',
    ctaTitle: 'Äger du en padelklubb i Marbella?',
    ctaBody: 'Bli presenterad i den #1 padelguiden för Marbella. Nå tusentals spelare varje månad.',
    ctaBtn: 'Lista din klubb →',
    navClubs: 'Klubbar',
    navAdvertise: 'Annonsera',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alla rättigheter förbehållna.`,
  },
  nl: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Terug naar gids',
    ctaTitle: 'Heeft u een padelclub in Marbella?',
    ctaBody: 'Word gepresenteerd in de #1 Marbella padelgids. Bereik duizenden spelers elke maand.',
    ctaBtn: 'Uw club vermelden →',
    navClubs: 'Clubs',
    navAdvertise: 'Adverteren',
    footerTagline: 'De #1 meertalige padelgids voor Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rechten voorbehouden.`,
  },
  fr: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Retour au guide',
    ctaTitle: 'Vous avez un club de padel à Marbella?',
    ctaBody: "Soyez présenté dans le guide padel #1 de Marbella. Touchez des milliers de joueurs chaque mois.",
    ctaBtn: 'Lister votre club →',
    navClubs: 'Clubs',
    navAdvertise: 'Publicité',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Tous droits réservés.`,
  },
  es: {
    blog: 'Blog',
    clubs: 'Clubs',
    backToBlog: '← Volver a la guía',
    ctaTitle: '¿Tienes un club de pádel en Marbella?',
    ctaBody: 'Aparece en la guía de pádel #1 de Marbella. Llega a miles de jugadores cada mes.',
    ctaBtn: 'Listar tu club →',
    navClubs: 'Clubs',
    navAdvertise: 'Anunciarse',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Todos los derechos reservados.`,
  },
  pl: {
    blog: 'Blog',
    clubs: 'Kluby',
    backToBlog: '← Powrót do przewodnika',
    ctaTitle: 'Masz klub padlowy w Marbelli?',
    ctaBody: 'Zaistniej w przewodniku padlowym #1 dla Marbelli. Dotrzyj do tysięcy graczy każdego miesiąca.',
    ctaBtn: 'Dodaj swój klub →',
    navClubs: 'Kluby',
    navAdvertise: 'Reklama',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Wszelkie prawa zastrzeżone.`,
  },
  no: {
    blog: 'Blogg',
    clubs: 'Klubber',
    backToBlog: '← Tilbake til guiden',
    ctaTitle: 'Eier du en padelklubb i Marbella?',
    ctaBody: 'Bli presentert i den #1 padelguiden for Marbella. Nå tusenvis av spillere hver måned.',
    ctaBtn: 'List klubben din →',
    navClubs: 'Klubber',
    navAdvertise: 'Annonsere',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rettigheter reservert.`,
  },
  sl: {
    blog: 'Blog',
    clubs: 'Klubi',
    backToBlog: '← Nazaj na vodič',
    ctaTitle: 'Imate padel klub v Marbelli?',
    ctaBody: 'Bodite predstavljeni v vodiču #1 za padel v Marbelli. Dosezite tisoče igralcev vsak mesec.',
    ctaBtn: 'Dodajte vaš klub →',
    navClubs: 'Klubi',
    navAdvertise: 'Oglaševanje',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Vse pravice pridržane.`,
  },
  hr: {
    blog: 'Blog',
    clubs: 'Klubovi',
    backToBlog: '← Natrag na vodič',
    ctaTitle: 'Imate padel klub u Marbelli?',
    ctaBody: 'Budite predstavljeni u vodiču #1 za padel u Marbelli. Dosegnite tisuće igrača svaki mjesec.',
    ctaBtn: 'Dodajte vaš klub →',
    navClubs: 'Klubovi',
    navAdvertise: 'Oglašavanje',
    footerTagline: 'Vodič #1 za padel na više jezika za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Sva prava pridržana.`,
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image: post.coverImage || `${BASE_URL}/logo.png`,
    url: `${BASE_URL}/${lang}/blog/${slug}`,
    inLanguage: lang,
    author: post.author ? {
      '@type': 'Person',
      name: post.author,
      description: post.authorBio,
    } : {
      '@type': 'Organization',
      name: 'MarbellapadEL',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MarbellapadEL',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    keywords: post.keywords?.join(', '),
  };

  return (
    <>
      {/* Hreflang tags */}
      {hreflang.map(h => (
        <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en/blog/${slug}`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      )}

      <Navbar 
        lang={lang} 
        labels={{
          blog: ui.blog,
          clubs: ui.navClubs,
          advertise: ui.navAdvertise
        }} 
      />

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

          {/* Author bio */}
          {post.author && (
            <div className="article-author-box">
              <div className="article-author-avatar">{post.author.charAt(0)}</div>
              <div className="article-author-info">
                <span className="article-author-name">{post.author}</span>
                {post.authorBio && (
                  <span className="article-author-bio">{post.authorBio}</span>
                )}
              </div>
            </div>
          )}

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

      <Footer 
        lang={lang} 
        labels={{
          blog: ui.blog,
          clubs: ui.navClubs,
          advertise: ui.navAdvertise,
          tagline: ui.footerTagline,
          copyright: ui.footerCopyright
        }} 
      />
    </>
  );
}
