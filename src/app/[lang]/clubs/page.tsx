/**
 * app/[lang]/clubs/page.tsx
 * Clubs index page — all 9 Marbella padel clubs listed statically.
 *
 * NOTE: Client-side filtering (by tier, amenities, price etc.) can be added
 * later by extracting the club list into a Client Component and managing
 * filter state there, while keeping this Server Component as the shell.
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllClubs } from '@/lib/clubs';
import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

interface MetaEntry {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  navBlog: string;
  navClubs: string;
  premiumLabel: string;
  listedLabel: string;
  courtsLabel: string;
  footerTagline: string;
}

const META: Record<Lang, MetaEntry> = {
  en: {
    title: 'Best Padel Clubs in Marbella — All 9 Reviewed',
    description:
      'Complete guide to all 9 padel clubs in Marbella. Compare courts, facilities, prices and booking options. From luxury five-star resorts to friendly local clubs.',
    h1: 'Padel Clubs in Marbella',
    subtitle:
      'All 9 clubs reviewed — from award-winning flagship venues to hidden local gems.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumLabel: '★ Featured',
    listedLabel: 'Listed',
    courtsLabel: 'courts',
    footerTagline: 'The #1 multilingual padel guide for Marbella',
  },
  de: {
    title: 'Beste Padel-Clubs in Marbella — Alle 9 im Vergleich',
    description:
      'Vollständiger Überblick über alle 9 Padel-Clubs in Marbella. Vergleiche Plätze, Einrichtungen, Preise und Buchungsoptionen.',
    h1: 'Padel-Clubs in Marbella',
    subtitle:
      'Alle 9 Clubs bewertet — von preisgekrönten Topclubs bis zu lokalen Geheimtipps.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumLabel: '★ Empfohlen',
    listedLabel: 'Gelistet',
    courtsLabel: 'Plätze',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella',
  },
  sv: {
    title: 'Bästa Padelklubbar i Marbella — Alla 9 recenserade',
    description:
      'Komplett guide till alla 9 padelklubbar i Marbella. Jämför banor, faciliteter, priser och bokningsalternativ.',
    h1: 'Padelklubbar i Marbella',
    subtitle:
      'Alla 9 klubbar recenserade — från prisbelönta toppklubbar till lokala pärlor.',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    premiumLabel: '★ Utvald',
    listedLabel: 'Listad',
    courtsLabel: 'banor',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella',
  },
  nl: {
    title: 'Beste Padelclubs in Marbella — Alle 9 beoordeeld',
    description:
      'Complete gids voor alle 9 padelclubs in Marbella. Vergelijk banen, faciliteiten, prijzen en boekingsopties.',
    h1: 'Padelclubs in Marbella',
    subtitle:
      'Alle 9 clubs beoordeeld — van bekroonde topclubs tot verborgen lokale juweeltjes.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumLabel: '★ Aanbevolen',
    listedLabel: 'Vermeld',
    courtsLabel: 'banen',
    footerTagline: 'De #1 meertalige padelgids voor Marbella',
  },
  fr: {
    title: 'Meilleurs Clubs de Padel à Marbella — Les 9 évalués',
    description:
      'Guide complet des 9 clubs de padel à Marbella. Comparez les courts, les équipements, les prix et les options de réservation.',
    h1: 'Clubs de Padel à Marbella',
    subtitle:
      'Les 9 clubs évalués — des venues primées aux joyaux locaux méconnus.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumLabel: '★ En vedette',
    listedLabel: 'Répertorié',
    courtsLabel: 'courts',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella',
  },
  es: {
    title: 'Mejores Clubs de Pádel en Marbella — Los 9 analizados',
    description:
      'Guía completa de los 9 clubs de pádel en Marbella. Compara pistas, instalaciones, precios y opciones de reserva.',
    h1: 'Clubs de Pádel en Marbella',
    subtitle:
      'Los 9 clubs analizados — desde venues galardonados hasta joyas locales.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumLabel: '★ Destacado',
    listedLabel: 'Listado',
    courtsLabel: 'pistas',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella',
  },
  pl: {
    title: 'Najlepsze Kluby Padlowe w Marbelli — Wszystkie 9 recenzji',
    description:
      'Kompletny przewodnik po wszystkich 9 klubach padlowych w Marbelli. Porównaj korty, obiekty, ceny i opcje rezerwacji.',
    h1: 'Kluby Padlowe w Marbelli',
    subtitle:
      'Wszystkie 9 klubów zrecenzowanych — od nagradzanych aren po lokalne perełki.',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    premiumLabel: '★ Polecany',
    listedLabel: 'Wymieniony',
    courtsLabel: 'korty',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli',
  },
  no: {
    title: 'Beste Padelklubber i Marbella — Alle 9 anmeldt',
    description:
      'Komplett guide til alle 9 padelklubber i Marbella. Sammenlign baner, fasiliteter, priser og bestillingsalternativer.',
    h1: 'Padelklubber i Marbella',
    subtitle:
      'Alle 9 klubber anmeldt — fra prisbelønte toppklubber til skjulte lokale perler.',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    premiumLabel: '★ Anbefalt',
    listedLabel: 'Listet',
    courtsLabel: 'baner',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella',
  },
  sl: {
    title: 'Najboljši Padel Klubi v Marbelli — Vseh 9 ocenjenih',
    description:
      'Popoln vodič po vseh 9 padel klubih v Marbelli. Primerjajte igrišča, objekte, cene in možnosti rezervacije.',
    h1: 'Padel Klubi v Marbelli',
    subtitle:
      'Vseh 9 klubov ocenjenih — od nagrajenih vrhunskih objektov do skritih lokalnih draguljev.',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    premiumLabel: '★ Izpostavljeni',
    listedLabel: 'Na seznamu',
    courtsLabel: 'igrišč',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello',
  },
  hr: {
    title: 'Najbolji Padel Klubovi u Marbelli — Svih 9 recenziranih',
    description:
      'Potpuni vodič za svih 9 padel klubova u Marbelli. Usporedite terene, sadržaje, cijene i mogućnosti rezervacije.',
    h1: 'Padel Klubovi u Marbelli',
    subtitle:
      'Svih 9 klubova recenzirano — od nagrađenih vrhunskih objekata do skrivenih lokalnih dragulja.',
    navBlog: 'Blog',
    navClubs: 'Klubovi',
    premiumLabel: '★ Istaknuti',
    listedLabel: 'Popisani',
    courtsLabel: 'terena',
    footerTagline: 'Vodič #1 za padel na više jezika za Marbello',
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
      canonical: `${BASE_URL}/${lang}/clubs`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/clubs`])
      ),
    },
  };
}

export default async function ClubsPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang)) notFound();

  const meta = META[lang];
  const clubs = getAllClubs();

  return (
    <>
      {/* ── Navigation ── */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href={`/${lang}`} className="nav-logo">
            MarbellapadEL
          </Link>
          <div className="nav-links">
            <Link href={`/${lang}/clubs`} className="nav-link">
              {meta.navClubs}
            </Link>
            <Link href={`/${lang}/blog`} className="nav-link">
              {meta.navBlog}
            </Link>
          </div>
          <div className="lang-pills" aria-label="Language switcher">
            {SUPPORTED_LANGS.map(l => (
              <Link
                key={l}
                href={`/${l}/clubs`}
                className={`lang-pill${l === lang ? ' active' : ''}`}
                aria-label={l.toUpperCase()}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <div className="clubs-index">
          <div className="clubs-index-inner">
            <header className="clubs-page-header">
              <p className="section-label">Marbella · Costa del Sol</p>
              <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>
                {meta.h1}
              </h1>
              <p style={{ color: 'var(--color-muted)', fontSize: '1.0625rem', maxWidth: '600px' }}>
                {meta.subtitle}
              </p>
            </header>

            {/* NOTE: Client-side filtering (tier, price, amenities) can be added
                later by wrapping the grid in a Client Component with useState for
                active filters. The data is already available in the CLUBS array. */}

            <div className="club-grid">
              {clubs.map(club => (
                <Link
                  key={club.slug}
                  href={`/${lang}/clubs/${club.slug}`}
                  className="club-card"
                >
                  <div className="club-card-accent" />
                  <div className="club-card-body">
                    <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className={`badge badge-${club.tier}`}>
                        {club.tier === 'premium' ? meta.premiumLabel : meta.listedLabel}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: 'var(--color-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {club.priceRange}
                      </span>
                    </div>
                    <p className="club-card-name">{club.name}</p>
                    <p className="club-card-tagline">{club.tagline}</p>
                    <div className="club-card-meta">
                      <span className="court-badge">
                        {club.courts} {meta.courtsLabel}
                      </span>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {club.indoor && (
                          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-muted)' }}>Indoor</span>
                        )}
                        {club.outdoor && (
                          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-muted)' }}>Outdoor</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Link href={`/${lang}`} className="footer-logo">
              MarbellapadEL
            </Link>
            <p className="footer-tagline">{meta.footerTagline}</p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} MarbellapadEL. All rights reserved.
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href={`/${lang}/clubs`} className="footer-link">
              {meta.navClubs}
            </Link>
            <Link href={`/${lang}/blog`} className="footer-link">
              {meta.navBlog}
            </Link>
            {SUPPORTED_LANGS.map(l => (
              <Link key={l} href={`/${l}/clubs`} className="footer-link">
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
