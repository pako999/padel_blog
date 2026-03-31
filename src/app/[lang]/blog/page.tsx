/**
 * app/[lang]/blog/page.tsx
 * Blog index — Professional padel magazine layout
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllPosts, SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

interface MetaEntry {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  navBlog: string;
  navClubs: string;
  navAdvertise: string;
  footerTagline: string;
  footerCopyright: string;
  emptyTitle: string;
  emptyBody: string;
  advertiseTitle: string;
  advertiseBody: string;
  advertiseCta: string;
  latestLabel: string;
  featuredLabel: string;
}

const META: Record<Lang, MetaEntry> = {
  en: {
    title: 'Marbella Padel Guide — Best Clubs, Courts & Tips',
    description: 'The complete guide to padel in Marbella. Reviews of the best clubs, how to book courts, lessons, tournaments and tips for every level.',
    h1: 'The Padel Guide',
    subtitle: 'Expert reviews, club guides & tips for every level — in 8 languages.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Advertise',
    footerTagline: 'The #1 multilingual padel guide for Marbella. Discover best clubs, book courts, and expert tips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. All rights reserved.`,
    emptyTitle: 'Articles coming soon',
    emptyBody: "Our team is crafting expert guides on Marbella's best padel clubs, courts, and tournaments. Check back shortly.",
    advertiseTitle: 'Own a padel club in Marbella?',
    advertiseBody: 'Reach thousands of European players searching for courts every month.',
    advertiseCta: 'Get listed as a Featured Partner →',
    latestLabel: 'Latest Articles',
    featuredLabel: 'Featured',
  },
  de: {
    title: 'Padel Marbella Guide — Beste Clubs & Plätze',
    description: 'Der komplette Leitfaden für Padel in Marbella. Clubs, Buchung, Kurse und Tipps für jeden Level.',
    h1: 'Der Padel Guide',
    subtitle: 'Expertenrezensionen, Clubguides & Tipps für jedes Niveau — in 8 Sprachen.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Werben',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella. Die besten Clubs, Plätze buchen und Expertentipps.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle Rechte vorbehalten.`,
    emptyTitle: 'Artikel in Kürze',
    emptyBody: 'Unser Team erstellt Expertenratgeber zu den besten Padel-Clubs, Plätzen und Turnieren in Marbella.',
    advertiseTitle: 'Haben Sie einen Padel-Club in Marbella?',
    advertiseBody: 'Erreichen Sie tausende europäische Spieler, die jeden Monat nach Plätzen suchen.',
    advertiseCta: 'Als empfohlener Partner gelistet werden →',
    latestLabel: 'Neueste Artikel',
    featuredLabel: 'Empfohlen',
  },
  sv: {
    title: 'Padel Marbella Guide — Bästa Klubbar & Banor',
    description: 'Den kompletta guiden till padel i Marbella. Recensioner av de bästa klubbarna, bokningar och tips.',
    h1: 'Padelguiden',
    subtitle: 'Expertrecensioner, klubbguider & tips för alla nivåer — på 8 språk.',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    navAdvertise: 'Annonsera',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella. Hitta de bästa klubbarna, boka banor och läs experttips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alla rättigheter förbehållna.`,
    emptyTitle: 'Artiklar kommer snart',
    emptyBody: 'Vårt team skapar expertguider om Marbellas bästa padelklubbar, banor och turneringar.',
    advertiseTitle: 'Äger du en padelklubb i Marbella?',
    advertiseBody: 'Nå tusentals europeiska spelare som söker banor varje månad.',
    advertiseCta: 'Bli listad som utvald partner →',
    latestLabel: 'Senaste artiklarna',
    featuredLabel: 'Utvald',
  },
  nl: {
    title: 'Padel Marbella Gids — Beste Clubs & Banen',
    description: 'De complete gids voor padel in Marbella. Reviews van de beste clubs, boekingen en tips.',
    h1: 'De Padelgids',
    subtitle: 'Expertreviews, clubgidsen & tips voor elk niveau — in 8 talen.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Adverteren',
    footerTagline: 'De #1 gids voor padel in Marbella. Ontdek de beste clubs, boek banen en lees experttips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rechten voorbehouden.`,
    emptyTitle: 'Artikelen komen binnenkort',
    emptyBody: 'Ons team schrijft expertgidsen over de beste padelclubs, banen en toernooien in Marbella.',
    advertiseTitle: 'Heeft u een padelclub in Marbella?',
    advertiseBody: 'Bereik duizenden Europese spelers die elke maand banen zoeken.',
    advertiseCta: 'Geregistreerd worden als aanbevolen partner →',
    latestLabel: 'Laatste artikelen',
    featuredLabel: 'Uitgelicht',
  },
  fr: {
    title: 'Guide Padel Marbella — Meilleurs Clubs & Courts',
    description: 'Le guide complet du padel à Marbella. Avis sur les meilleurs clubs, réservations et conseils.',
    h1: 'Le Guide Padel',
    subtitle: "Avis d'experts, guides de clubs & conseils pour tous niveaux — en 8 langues.",
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Publicité',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella. Découvrez les meilleurs clubs, réservez des courts et lisez des conseils.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Tous droits réservés.`,
    emptyTitle: 'Articles bientôt disponibles',
    emptyBody: 'Notre équipe rédige des guides experts sur les meilleurs clubs, courts et tournois de padel à Marbella.',
    advertiseTitle: 'Vous avez un club de padel à Marbella?',
    advertiseBody: 'Touchez des milliers de joueurs européens qui recherchent des courts chaque mois.',
    advertiseCta: 'Devenir partenaire vedette →',
    latestLabel: 'Derniers articles',
    featuredLabel: 'À la une',
  },
  es: {
    title: 'Guía Padel Marbella — Mejores Clubs y Pistas',
    description: 'La guía completa del pádel en Marbella. Los mejores clubs, cómo reservar pistas y consejos.',
    h1: 'La Guía de Pádel',
    subtitle: 'Reseñas de expertos, guías de clubs y consejos para todos los niveles — en 8 idiomas.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Anunciarse',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella. Descubre los mejores clubs, reserva pistas y lee consejos de expertos.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Todos los derechos reservados.`,
    emptyTitle: 'Artículos próximamente',
    emptyBody: 'Nuestro equipo está creando guías expertas sobre los mejores clubs, pistas y torneos de pádel en Marbella.',
    advertiseTitle: '¿Tienes un club de pádel en Marbella?',
    advertiseBody: 'Llega a miles de jugadores europeos que buscan pistas cada mes.',
    advertiseCta: 'Aparecer como socio destacado →',
    latestLabel: 'Últimos artículos',
    featuredLabel: 'Destacado',
  },
  pl: {
    title: 'Padel Marbella Przewodnik — Najlepsze Kluby',
    description: 'Kompletny przewodnik po padlu w Marbelli. Recenzje najlepszych klubów, rezerwacje i porady.',
    h1: 'Przewodnik Padlowy',
    subtitle: 'Recenzje ekspertów, poradniki klubów i wskazówki dla każdego poziomu — w 8 językach.',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    navAdvertise: 'Reklama',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli. Odkryj najlepsze kluby, zarezerwuj korty i czytaj porady ekspertów.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Wszelkie prawa zastrzeżone.`,
    emptyTitle: 'Artykuły wkrótce',
    emptyBody: 'Nasz zespół tworzy eksperckie poradniki o najlepszych klubach padlowych, kortach i turniejach w Marbelli.',
    advertiseTitle: 'Masz klub padlowy w Marbelli?',
    advertiseBody: 'Dotrzyj do tysięcy europejskich graczy szukających kortów każdego miesiąca.',
    advertiseCta: 'Dołącz jako polecany partner →',
    latestLabel: 'Najnowsze artykuły',
    featuredLabel: 'Polecane',
  },
  no: {
    title: 'Padel Marbella Guide — Beste Klubber & Baner',
    description: 'Den komplette guiden til padel i Marbella. Anmeldelser av de beste klubbene, booking og tips.',
    h1: 'Padelguiden',
    subtitle: 'Ekspertanmeldelser, klubbguider & tips for alle nivåer — på 10 språk.',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    navAdvertise: 'Annonsere',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella. Finn de beste klubbene, book baner och les eksperttips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rettigheter reservert.`,
    emptyTitle: 'Artikler kommer snart',
    emptyBody: 'Teamet vårt lager ekspertguider om Marbellas beste padelklubber, baner og turneringer.',
    advertiseTitle: 'Eier du en padelklubb i Marbella?',
    advertiseBody: 'Nå tusenvis av europeiske spillere som søker etter baner hver måned.',
    advertiseCta: 'Bli listet som anbefalt partner →',
    latestLabel: 'Siste artikler',
    featuredLabel: 'Anbefalt',
  },
  sl: {
    title: 'Padel Marbella Vodič — Najboljši Klubi, Igrišča in Nasveti',
    description: 'Popoln vodič za padel v Marbelli. Ocene najboljših klubov, kako rezervirati igrišča, lekcije, turnirji in nasveti za vsak nivo.',
    h1: 'Padel Vodič',
    subtitle: 'Strokovne ocene, vodniki po klubih in nasveti za vse ravni — v 10 jezikih.',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    navAdvertise: 'Oglaševanje',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello. Odkrijte najboljše klube, rezervirajte igrišča in preberite nasvete.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Vse pravice pridržane.`,
    emptyTitle: 'Članki kmalu',
    emptyBody: 'Naša ekipa ustvarja strokovne vodnike o najboljših padel klubih, igriščih in turnirjih v Marbelli.',
    advertiseTitle: 'Imate padel klub v Marbelli?',
    advertiseBody: 'Dosezite tisoče evropskih igralcev, ki vsak mesec iščejo igrišča.',
    advertiseCta: 'Pridružite se kot izpostavljeni partner →',
    latestLabel: 'Najnovejši članki',
    featuredLabel: 'Izpostavljeno',
  },
  hr: {
    title: 'Padel Marbella Vodič — Najbolji Klubovi, Tereni i Savjeti',
    description: 'Potpuni vodič za padel u Marbelli. Recenzije najboljih klubova, kako rezervirati terene, lekcije, turniri i savjeti za svaku razinu.',
    h1: 'Padel Vodič',
    subtitle: 'Stručne recenzije, vodiči po klubovima i savjeti za sve razine — na 10 jezika.',
    navBlog: 'Blog',
    navClubs: 'Klubovi',
    navAdvertise: 'Oglašavanje',
    footerTagline: 'Vodič #1 za padel na više jezika za Marbello. Otkrijte najbolje klubove, rezervirajte terene i čitajte savjete.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Sva prava pridržana.`,
    emptyTitle: 'Članci uskoro',
    emptyBody: 'Naš tim stvara stručne vodiče o najboljim padel klubovima, terenima i turnirima u Marbelli.',
    advertiseTitle: 'Imate padel klub u Marbelli?',
    advertiseBody: 'Dosegnite tisuće europskih igrača koji svaki mjesec traže terene.',
    advertiseCta: 'Popisajte se kao istaknuti partner →',
    latestLabel: 'Najnoviji članci',
    featuredLabel: 'Istaknuto',
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
  const posts = getAllPosts(lang);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/blog`])),
        'x-default': `${BASE_URL}/en/blog`,
      },
    },
    ...(posts.length === 0 && { robots: { index: false, follow: true } }),
  };
}

function CategoryTag({ cluster }: { cluster: string }) {
  return (
    <span className="blog-cat-tag">
      {cluster.replace(/-/g, ' ')}
    </span>
  );
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

  const featuredPost = posts.find(p => p.featured) ?? posts[0];
  const gridPosts = posts.filter(p => p.slug !== featuredPost?.slug);

  return (
    <>
      <Navbar
        lang={lang}
        labels={{
          blog: meta.navBlog,
          clubs: meta.navClubs,
          advertise: meta.navAdvertise,
        }}
      />

      <main>
        {/* ── Editorial Header ── */}
        <div className="blog-mag-header">
          <div className="blog-mag-header-inner">
            <p className="blog-mag-eyebrow">
              <span className="blog-mag-eyebrow-dot" />
              Marbella · Costa del Sol · España
            </p>
            <h1 className="blog-mag-title">{meta.h1}</h1>
            <p className="blog-mag-subtitle">{meta.subtitle}</p>
            {posts.length > 0 && (
              <div className="blog-mag-stats">
                <div className="blog-mag-stat">
                  <span className="blog-mag-stat-num">{posts.length}</span>
                  <span className="blog-mag-stat-lbl">Articles</span>
                </div>
                <div className="blog-mag-stat-divider" />
                <div className="blog-mag-stat">
                  <span className="blog-mag-stat-num">8</span>
                  <span className="blog-mag-stat-lbl">Languages</span>
                </div>
                <div className="blog-mag-stat-divider" />
                <div className="blog-mag-stat">
                  <span className="blog-mag-stat-num">
                    {[...new Set(posts.map(p => p.cluster))].length}
                  </span>
                  <span className="blog-mag-stat-lbl">Topics</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="blog-mag-body">
          {posts.length === 0 ? (
            <div className="blog-empty-state">
              <div className="blog-empty-icon">🎾</div>
              <h2 className="blog-empty-title">{meta.emptyTitle}</h2>
              <p className="blog-empty-body">{meta.emptyBody}</p>
            </div>
          ) : (
            <>
              {/* ── Featured Post ── */}
              {featuredPost && (
                <Link
                  href={`/${lang}/blog/${featuredPost.slug}`}
                  className="blog-featured-card"
                >
                  {featuredPost.coverImage && (
                    <div className="blog-featured-card-image">
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 55vw"
                        priority
                      />
                      <div className="blog-featured-card-overlay" />
                    </div>
                  )}
                  <div className="blog-featured-card-body">
                    <div className="blog-featured-card-top">
                      <span className="blog-featured-badge">{meta.featuredLabel}</span>
                      <CategoryTag cluster={featuredPost.cluster} />
                    </div>
                    <h2 className="blog-featured-card-title">{featuredPost.title}</h2>
                    <p className="blog-featured-card-desc">{featuredPost.description}</p>
                    <div className="blog-featured-card-meta">
                      <span>
                        {new Date(featuredPost.publishedAt).toLocaleDateString(lang, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="blog-meta-dot" />
                      <span>{featuredPost.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* ── Article Grid ── */}
              {gridPosts.length > 0 && (
                <>
                  <div className="blog-section-divider">
                    <span className="blog-section-divider-label">{meta.latestLabel}</span>
                    <span className="blog-section-divider-line" />
                  </div>
                  <div className="blog-mag-grid">
                    {gridPosts.map(post => (
                      <Link
                        key={post.slug}
                        href={`/${lang}/blog/${post.slug}`}
                        className="blog-mag-card"
                      >
                        <div className="blog-mag-card-image">
                          {post.coverImage ? (
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              className="object-cover blog-mag-card-img"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="blog-mag-card-placeholder">
                              <span>🎾</span>
                            </div>
                          )}
                        </div>
                        <div className="blog-mag-card-body">
                          <CategoryTag cluster={post.cluster} />
                          <h3 className="blog-mag-card-title">{post.title}</h3>
                          <p className="blog-mag-card-desc">{post.description}</p>
                          <div className="blog-mag-card-meta">
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString(lang, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                            <span className="blog-meta-dot" />
                            <span>{post.readingTime} min</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* ── Advertise CTA ── */}
        <section className="advertise-section">
          <p className="section-label">Marbella</p>
          <h2 className="section-title">{meta.advertiseTitle}</h2>
          <p>{meta.advertiseBody}</p>
          <Link href={`/${lang}/advertise`} className="btn-primary">
            {meta.advertiseCta}
          </Link>
        </section>
      </main>

      <Footer
        lang={lang}
        labels={{
          blog: meta.navBlog,
          clubs: meta.navClubs,
          advertise: meta.navAdvertise,
          tagline: meta.footerTagline,
          copyright: meta.footerCopyright,
        }}
      />
    </>
  );
}
