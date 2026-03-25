/**
 * app/[lang]/blog/page.tsx
 * Blog index — Mediterranean luxury editorial design
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllPosts, SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

interface MetaEntry {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  navBlog: string;
  navClubs: string;
  footerTagline: string;
  emptyTitle: string;
  emptyBody: string;
  advertiseTitle: string;
  advertiseBody: string;
  advertiseCta: string;
}

const META: Record<Lang, MetaEntry> = {
  en: {
    title: 'Marbella Padel Guide — Best Clubs, Courts & Tips',
    description: 'The complete guide to padel in Marbella. Reviews of the best clubs, how to book courts, lessons, tournaments and tips for every level.',
    h1: 'Marbella Padel Guide',
    subtitle: 'Expert reviews, club guides & tips for every level — in 8 languages.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    footerTagline: 'The #1 multilingual padel guide for Marbella',
    emptyTitle: 'Articles coming soon',
    emptyBody: "Our team is crafting expert guides on Marbella's best padel clubs, courts, and tournaments. Check back shortly.",
    advertiseTitle: 'Own a padel club in Marbella?',
    advertiseBody: 'Reach thousands of European players searching for courts every month.',
    advertiseCta: 'Get listed as a Featured Partner →',
  },
  de: {
    title: 'Padel Marbella Guide — Beste Clubs & Plätze',
    description: 'Der komplette Leitfaden für Padel in Marbella. Clubs, Buchung, Kurse und Tipps für jeden Level.',
    h1: 'Padel in Marbella — Ihr Guide',
    subtitle: 'Expertenrezensionen, Clubguides & Tipps für jedes Niveau — in 8 Sprachen.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella',
    emptyTitle: 'Artikel in Kürze',
    emptyBody: 'Unser Team erstellt Expertenratgeber zu den besten Padel-Clubs, Plätzen und Turnieren in Marbella.',
    advertiseTitle: 'Haben Sie einen Padel-Club in Marbella?',
    advertiseBody: 'Erreichen Sie tausende europäische Spieler, die jeden Monat nach Plätzen suchen.',
    advertiseCta: 'Als empfohlener Partner gelistet werden →',
  },
  sv: {
    title: 'Padel Marbella Guide — Bästa Klubbar & Banor',
    description: 'Den kompletta guiden till padel i Marbella. Recensioner av de bästa klubbarna, bokningar och tips.',
    h1: 'Padel i Marbella — Din Guide',
    subtitle: 'Expertrecensioner, klubbguider & tips för alla nivåer — på 8 språk.',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella',
    emptyTitle: 'Artiklar kommer snart',
    emptyBody: 'Vårt team skapar expertguider om Marbellas bästa padelklubbar, banor och turneringar.',
    advertiseTitle: 'Äger du en padelklubb i Marbella?',
    advertiseBody: 'Nå tusentals europeiska spelare som söker banor varje månad.',
    advertiseCta: 'Bli listad som utvald partner →',
  },
  nl: {
    title: 'Padel Marbella Gids — Beste Clubs & Banen',
    description: 'De complete gids voor padel in Marbella. Reviews van de beste clubs, boekingen en tips.',
    h1: 'Padel Marbella Gids',
    subtitle: 'Expertreviews, clubgidsen & tips voor elk niveau — in 8 talen.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    footerTagline: 'De #1 meertalige padelgids voor Marbella',
    emptyTitle: 'Artikelen komen binnenkort',
    emptyBody: 'Ons team schrijft expertgidsen over de beste padelclubs, banen en toernooien in Marbella.',
    advertiseTitle: 'Heeft u een padelclub in Marbella?',
    advertiseBody: 'Bereik duizenden Europese spelers die elke maand banen zoeken.',
    advertiseCta: 'Geregistreerd worden als aanbevolen partner →',
  },
  fr: {
    title: 'Guide Padel Marbella — Meilleurs Clubs & Courts',
    description: 'Le guide complet du padel à Marbella. Avis sur les meilleurs clubs, réservations et conseils.',
    h1: 'Guide Padel Marbella',
    subtitle: "Avis d'experts, guides de clubs & conseils pour tous niveaux — en 8 langues.",
    navBlog: 'Blog',
    navClubs: 'Clubs',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella',
    emptyTitle: 'Articles bientôt disponibles',
    emptyBody: 'Notre équipe rédige des guides experts sur les meilleurs clubs, courts et tournois de padel à Marbella.',
    advertiseTitle: 'Vous avez un club de padel à Marbella?',
    advertiseBody: 'Touchez des milliers de joueurs européens qui recherchent des courts chaque mois.',
    advertiseCta: 'Devenir partenaire vedette →',
  },
  es: {
    title: 'Guía Padel Marbella — Mejores Clubs y Pistas',
    description: 'La guía completa del pádel en Marbella. Los mejores clubs, cómo reservar pistas y consejos.',
    h1: 'Guía de Pádel en Marbella',
    subtitle: 'Reseñas de expertos, guías de clubs y consejos para todos los niveles — en 8 idiomas.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella',
    emptyTitle: 'Artículos próximamente',
    emptyBody: 'Nuestro equipo está creando guías expertas sobre los mejores clubs, pistas y torneos de pádel en Marbella.',
    advertiseTitle: '¿Tienes un club de pádel en Marbella?',
    advertiseBody: 'Llega a miles de jugadores europeos que buscan pistas cada mes.',
    advertiseCta: 'Aparecer como socio destacado →',
  },
  pl: {
    title: 'Padel Marbella Przewodnik — Najlepsze Kluby',
    description: 'Kompletny przewodnik po padlu w Marbelli. Recenzje najlepszych klubów, rezerwacje i porady.',
    h1: 'Padel w Marbelli — Przewodnik',
    subtitle: 'Recenzje ekspertów, poradniki klubów i wskazówki dla każdego poziomu — w 8 językach.',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli',
    emptyTitle: 'Artykuły wkrótce',
    emptyBody: 'Nasz zespół tworzy eksperckie poradniki o najlepszych klubach padlowych, kortach i turniejach w Marbelli.',
    advertiseTitle: 'Masz klub padlowy w Marbelli?',
    advertiseBody: 'Dotrzyj do tysięcy europejskich graczy szukających kortów każdego miesiąca.',
    advertiseCta: 'Dołącz jako polecany partner →',
  },
  no: {
    title: 'Padel Marbella Guide — Beste Klubber & Baner',
    description: 'Den komplette guiden til padel i Marbella. Anmeldelser av de beste klubbene, booking og tips.',
    h1: 'Padel i Marbella — Din Guide',
    subtitle: 'Ekspertanmeldelser, klubbguider & tips for alle nivåer — på 10 språk.',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella',
    emptyTitle: 'Artikler kommer snart',
    emptyBody: 'Teamet vårt lager ekspertguider om Marbellas beste padelklubber, baner og turneringer.',
    advertiseTitle: 'Eier du en padelklubb i Marbella?',
    advertiseBody: 'Nå tusenvis av europeiske spillere som søker etter baner hver måned.',
    advertiseCta: 'Bli listet som anbefalt partner →',
  },
  sl: {
    title: 'Padel Marbella Vodič — Najboljši Klubi, Igrišča in Nasveti',
    description: 'Popoln vodič za padel v Marbelli. Ocene najboljših klubov, kako rezervirati igrišča, lekcije, turnirji in nasveti za vsak nivo.',
    h1: 'Padel Marbella Vodič',
    subtitle: 'Strokovne ocene, vodniki po klubih in nasveti za vse ravni — v 10 jezikih.',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello',
    emptyTitle: 'Članki kmalu',
    emptyBody: 'Naša ekipa ustvarja strokovne vodnike o najboljših padel klubih, igriščih in turnirjih v Marbelli.',
    advertiseTitle: 'Imate padel klub v Marbelli?',
    advertiseBody: 'Dosezite tisoče evropskih igralcev, ki vsak mesec iščejo igrišča.',
    advertiseCta: 'Pridružite se kot izpostavljeni partner →',
  },
  hr: {
    title: 'Padel Marbella Vodič — Najbolji Klubovi, Tereni i Savjeti',
    description: 'Potpuni vodič za padel u Marbelli. Recenzije najboljih klubova, kako rezervirati terene, lekcije, turniri i savjeti za svaku razinu.',
    h1: 'Padel Marbella Vodič',
    subtitle: 'Stručne recenzije, vodiči po klubovima i savjeti za sve razine — na 10 jezika.',
    navBlog: 'Blog',
    navClubs: 'Klubovi',
    footerTagline: 'Vodič #1 za padel na više jezika za Marbello',
    emptyTitle: 'Članci uskoro',
    emptyBody: 'Naš tim stvara stručne vodiče o najboljim padel klubovima, terenima i turnirima u Marbelli.',
    advertiseTitle: 'Imate padel klub u Marbelli?',
    advertiseBody: 'Dosegnite tisuće europskih igrača koji svaki mjesec traže terene.',
    advertiseCta: 'Popisajte se kao istaknuti partner →',
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang)) return {};
  const meta = META[lang];
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog`,
      languages: Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/blog`])),
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang)) notFound();

  const meta = META[lang];
  const posts = getAllPosts(lang);
  const clusters = [...new Set(posts.map(p => p.cluster))];

  return (
    <>
      {/* ── Navigation ── */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href={`/${lang}`} className="nav-logo">
            MarbellapadEL
          </Link>
          <div className="nav-links">
            <Link href={`/${lang}/clubs`} className="nav-link">{meta.navClubs}</Link>
            <Link href={`/${lang}/blog`} className="nav-link">{meta.navBlog}</Link>
          </div>
          <div className="lang-pills" aria-label="Language switcher">
            {SUPPORTED_LANGS.map(l => (
              <Link
                key={l}
                href={`/${l}/blog`}
                className={`lang-pill${l === lang ? ' active' : ''}`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main>
        {/* ── Page Hero ── */}
        <div className="blog-hero">
          <div className="blog-hero-inner">
            <p className="blog-hero-label">Marbella · Costa del Sol · España</p>
            <h1 className="blog-hero-title">{meta.h1}</h1>
            <p className="blog-hero-subtitle">{meta.subtitle}</p>
          </div>
        </div>

        {/* ── Posts ── */}
        <div className="blog-content">
          {posts.length === 0 ? (
            <div className="blog-empty-state">
              <div className="blog-empty-icon">🎾</div>
              <h2 className="blog-empty-title">{meta.emptyTitle}</h2>
              <p className="blog-empty-body">{meta.emptyBody}</p>
            </div>
          ) : (
            clusters.map(cluster => {
              const clusterPosts = posts.filter(p => p.cluster === cluster);
              return (
                <section key={cluster} className="blog-cluster-section">
                  <p className="blog-cluster-label">{cluster.replace(/-/g, ' ')}</p>
                  {clusterPosts.map((post, i) => (
                    <Link
                      key={post.slug}
                      href={`/${lang}/blog/${post.slug}`}
                      className="blog-post-link"
                    >
                      {post.coverImage && (
                        <div className="blog-post-link-thumb">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        </div>
                      )}
                      <div className="blog-post-link-body">
                        <div className="blog-post-link-number">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className="blog-post-link-title">{post.title}</div>
                        <p className="blog-post-link-desc">{post.description}</p>
                        <div className="blog-post-link-meta">
                          <span>{post.readingTime} min</span>
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString(lang, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </section>
              );
            })
          )}
        </div>

        {/* ── Advertise CTA ── */}
        <section className="advertise-section">
          <p className="section-label">Marbella</p>
          <h2 className="section-title">{meta.advertiseTitle}</h2>
          <p>{meta.advertiseBody}</p>
          <Link href="/advertise" className="btn-primary">
            {meta.advertiseCta}
          </Link>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Link href={`/${lang}`} className="footer-logo">MarbellapadEL</Link>
            <p className="footer-tagline">{meta.footerTagline}</p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} MarbellapadEL. All rights reserved.
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href={`/${lang}/clubs`} className="footer-link">{meta.navClubs}</Link>
            <Link href={`/${lang}/blog`} className="footer-link">{meta.navBlog}</Link>
            <Link href="/advertise" className="footer-link">Advertise</Link>
            {SUPPORTED_LANGS.map(l => (
              <Link key={l} href={`/${l}/blog`} className="footer-link">
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
