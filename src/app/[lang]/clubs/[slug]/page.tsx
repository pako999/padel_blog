/**
 * app/[lang]/clubs/[slug]/page.tsx
 * Individual club profile page — fully static, generated for all lang × slug combos.
 */

import Link from 'next/link';
import LangSwitcher from '@/components/LangSwitcher';
import type { Metadata } from 'next';
import { getClub, getClubSlugs, getRelatedClubs } from '@/lib/clubs';
import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

// ── Static UI strings per language ──────────────────────────────────────────

interface UiStrings {
  navBlog: string;
  navClubs: string;
  premiumBadge: string;
  standardBadge: string;
  courtsLabel: string;
  indoorLabel: string;
  outdoorLabel: string;
  restaurantLabel: string;
  gymLabel: string;
  lessonsLabel: string;
  highlightsTitle: string;
  bookBtn: string;
  websiteBtn: string;
  addressLabel: string;
  mapsLink: string;
  upsellText: string;
  upsellCta: string;
  relatedTitle: string;
  footerTagline: string;
}

const UI: Record<Lang, UiStrings> = {
  en: {
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumBadge: '★ Featured Partner',
    standardBadge: 'Listed Club',
    courtsLabel: 'courts',
    indoorLabel: 'Indoor',
    outdoorLabel: 'Outdoor',
    restaurantLabel: 'Restaurant',
    gymLabel: 'Gym',
    lessonsLabel: 'Lessons',
    highlightsTitle: 'Why play here',
    bookBtn: 'Book via Playtomic',
    websiteBtn: 'Visit website',
    addressLabel: 'Address',
    mapsLink: 'View on Google Maps →',
    upsellText: 'Is this your club? Upgrade to Featured Partner and reach thousands of players.',
    upsellCta: 'Upgrade to Featured Partner →',
    relatedTitle: 'More Clubs in Marbella',
    footerTagline: 'The #1 multilingual padel guide for Marbella',
  },
  de: {
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumBadge: '★ Empfohlener Partner',
    standardBadge: 'Gelisteter Club',
    courtsLabel: 'Plätze',
    indoorLabel: 'Indoor',
    outdoorLabel: 'Outdoor',
    restaurantLabel: 'Restaurant',
    gymLabel: 'Fitnessstudio',
    lessonsLabel: 'Unterricht',
    highlightsTitle: 'Warum hier spielen',
    bookBtn: 'Über Playtomic buchen',
    websiteBtn: 'Website besuchen',
    addressLabel: 'Adresse',
    mapsLink: 'Auf Google Maps ansehen →',
    upsellText: 'Ist das Ihr Club? Werden Sie Empfohlener Partner und erreichen Sie tausende Spieler.',
    upsellCta: 'Zum Empfohlenen Partner werden →',
    relatedTitle: 'Weitere Clubs in Marbella',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella',
  },
  sv: {
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    premiumBadge: '★ Utvald partner',
    standardBadge: 'Listad klubb',
    courtsLabel: 'banor',
    indoorLabel: 'Inomhus',
    outdoorLabel: 'Utomhus',
    restaurantLabel: 'Restaurang',
    gymLabel: 'Gym',
    lessonsLabel: 'Lektioner',
    highlightsTitle: 'Varför spela här',
    bookBtn: 'Boka via Playtomic',
    websiteBtn: 'Besök webbplats',
    addressLabel: 'Adress',
    mapsLink: 'Visa på Google Maps →',
    upsellText: 'Är detta din klubb? Uppgradera till Utvald Partner och nå tusentals spelare.',
    upsellCta: 'Bli utvald partner →',
    relatedTitle: 'Fler klubbar i Marbella',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella',
  },
  nl: {
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumBadge: '★ Aanbevolen partner',
    standardBadge: 'Vermelde club',
    courtsLabel: 'banen',
    indoorLabel: 'Binnen',
    outdoorLabel: 'Buiten',
    restaurantLabel: 'Restaurant',
    gymLabel: 'Gym',
    lessonsLabel: 'Lessen',
    highlightsTitle: 'Waarom hier spelen',
    bookBtn: 'Boeken via Playtomic',
    websiteBtn: 'Bezoek website',
    addressLabel: 'Adres',
    mapsLink: 'Bekijk op Google Maps →',
    upsellText: 'Is dit jouw club? Word Aanbevolen Partner en bereik duizenden spelers.',
    upsellCta: 'Word aanbevolen partner →',
    relatedTitle: 'Meer clubs in Marbella',
    footerTagline: 'De #1 meertalige padelgids voor Marbella',
  },
  fr: {
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumBadge: '★ Partenaire vedette',
    standardBadge: 'Club répertorié',
    courtsLabel: 'courts',
    indoorLabel: 'Couvert',
    outdoorLabel: 'Extérieur',
    restaurantLabel: 'Restaurant',
    gymLabel: 'Salle de sport',
    lessonsLabel: 'Cours',
    highlightsTitle: 'Pourquoi jouer ici',
    bookBtn: 'Réserver via Playtomic',
    websiteBtn: 'Visiter le site',
    addressLabel: 'Adresse',
    mapsLink: 'Voir sur Google Maps →',
    upsellText: "C'est votre club ? Devenez Partenaire Vedette et touchez des milliers de joueurs.",
    upsellCta: 'Devenir partenaire vedette →',
    relatedTitle: "Plus de clubs à Marbella",
    footerTagline: 'Le guide padel multilingue #1 pour Marbella',
  },
  es: {
    navBlog: 'Blog',
    navClubs: 'Clubs',
    premiumBadge: '★ Socio destacado',
    standardBadge: 'Club listado',
    courtsLabel: 'pistas',
    indoorLabel: 'Interior',
    outdoorLabel: 'Exterior',
    restaurantLabel: 'Restaurante',
    gymLabel: 'Gimnasio',
    lessonsLabel: 'Clases',
    highlightsTitle: 'Por qué jugar aquí',
    bookBtn: 'Reservar en Playtomic',
    websiteBtn: 'Visitar web',
    addressLabel: 'Dirección',
    mapsLink: 'Ver en Google Maps →',
    upsellText: '¿Es este tu club? Conviértete en Socio Destacado y llega a miles de jugadores.',
    upsellCta: 'Convertirse en socio destacado →',
    relatedTitle: 'Más clubs en Marbella',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella',
  },
  pl: {
    navBlog: 'Blog',
    navClubs: 'Kluby',
    premiumBadge: '★ Polecany partner',
    standardBadge: 'Wymieniony klub',
    courtsLabel: 'korty',
    indoorLabel: 'Hala',
    outdoorLabel: 'Outdoor',
    restaurantLabel: 'Restauracja',
    gymLabel: 'Siłownia',
    lessonsLabel: 'Lekcje',
    highlightsTitle: 'Dlaczego tu grać',
    bookBtn: 'Zarezerwuj przez Playtomic',
    websiteBtn: 'Odwiedź stronę',
    addressLabel: 'Adres',
    mapsLink: 'Zobacz na Google Maps →',
    upsellText: 'To Twój klub? Zostań Polecanym Partnerem i dotrzyj do tysięcy graczy.',
    upsellCta: 'Zostań polecanym partnerem →',
    relatedTitle: 'Więcej klubów w Marbelli',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli',
  },
  no: {
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    premiumBadge: '★ Anbefalt partner',
    standardBadge: 'Listet klubb',
    courtsLabel: 'baner',
    indoorLabel: 'Innendørs',
    outdoorLabel: 'Utendørs',
    restaurantLabel: 'Restaurant',
    gymLabel: 'Treningssenter',
    lessonsLabel: 'Timer',
    highlightsTitle: 'Hvorfor spille her',
    bookBtn: 'Bestill via Playtomic',
    websiteBtn: 'Besøk nettsted',
    addressLabel: 'Adresse',
    mapsLink: 'Se på Google Maps →',
    upsellText: 'Er dette klubben din? Bli anbefalt partner og nå tusenvis av spillere.',
    upsellCta: 'Bli anbefalt partner →',
    relatedTitle: 'Flere klubber i Marbella',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella',
  },
  sl: {
    navBlog: 'Blog',
    navClubs: 'Klubi',
    premiumBadge: '★ Izpostavljeni partner',
    standardBadge: 'Vpisani klub',
    courtsLabel: 'igrišč',
    indoorLabel: 'Pokrito',
    outdoorLabel: 'Na prostem',
    restaurantLabel: 'Restavracija',
    gymLabel: 'Telovadnica',
    lessonsLabel: 'Lekcije',
    highlightsTitle: 'Zakaj igrati tukaj',
    bookBtn: 'Rezerviraj prek Playtomika',
    websiteBtn: 'Obišči spletno stran',
    addressLabel: 'Naslov',
    mapsLink: 'Oglejte si na Google Zemljevidih →',
    upsellText: 'Je to vaš klub? Nadgradite na Izpostavljenega partnerja in dosezite tisoče igralcev.',
    upsellCta: 'Postanite izpostavljeni partner →',
    relatedTitle: 'Več klubov v Marbelli',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello',
  },
  hr: {
    navBlog: 'Blog',
    navClubs: 'Klubovi',
    premiumBadge: '★ Istaknuti partner',
    standardBadge: 'Popisani klub',
    courtsLabel: 'terena',
    indoorLabel: 'Zatvoreno',
    outdoorLabel: 'Otvoreno',
    restaurantLabel: 'Restoran',
    gymLabel: 'Teretana',
    lessonsLabel: 'Lekcije',
    highlightsTitle: 'Zašto igrati ovdje',
    bookBtn: 'Rezerviraj putem Playtomika',
    websiteBtn: 'Posjetite web stranicu',
    addressLabel: 'Adresa',
    mapsLink: 'Pogledajte na Google kartama →',
    upsellText: 'Je li ovo vaš klub? Nadogradite na Istaknutog partnera i dosegnite tisuće igrača.',
    upsellCta: 'Postanite istaknuti partner →',
    relatedTitle: 'Više klubova u Marbelli',
    footerTagline: 'Vodič #1 za padel na više jezika za Marbello',
  },
};

// ── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams(): Promise<{ lang: string; slug: string }[]> {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of SUPPORTED_LANGS) {
    for (const slug of getClubSlugs()) {
      params.push({ lang, slug });
    }
  }
  return params;
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const club = getClub(slug);
  if (!club || !SUPPORTED_LANGS.includes(lang)) return {};

  return {
    title: `${club.name} — ${club.tagline}`,
    description: club.description.slice(0, 160),
    alternates: {
      canonical: `${BASE_URL}/${lang}/clubs/${slug}`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/clubs/${slug}`])
      ),
    },
  };
}

// ── Page component ───────────────────────────────────────────────────────────

export default async function ClubProfilePage({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!SUPPORTED_LANGS.includes(lang)) notFound();

  const club = getClub(slug);
  if (!club) notFound();

  const relatedClubs = getRelatedClubs(slug, 3);
  const ui = UI[lang];

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(club.address)}`;

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
              {ui.navClubs}
            </Link>
            <Link href={`/${lang}/blog`} className="nav-link">
              {ui.navBlog}
            </Link>
          </div>
          <LangSwitcher currentLang={lang} urlTemplate={`/[lang]/clubs/${slug}`} />
        </div>
      </nav>

      <main>
        {/* ── Club Hero ── */}
        <div className="club-profile-hero">
          <div className="club-profile-header">
            <div className="club-badges" style={{ marginBottom: '1rem' }}>
              <span className={`badge badge-${club.tier}`}>
                {club.tier === 'premium' ? ui.premiumBadge : ui.standardBadge}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-muted)',
                }}
              >
                {club.priceRange} · {club.courts} {ui.courtsLabel}
              </span>
            </div>
            <h1 className="club-name">{club.name}</h1>
            <p className="club-tagline">{club.tagline}</p>
          </div>
        </div>

        {/* ── Quick Facts Bar ── */}
        <div className="quick-facts">
          <div className="quick-facts-inner">
            {club.indoor && (
              <div className="fact-item">
                <span className="fact-check">✓</span>
                <span>{ui.indoorLabel}</span>
              </div>
            )}
            {club.outdoor && (
              <div className="fact-item">
                <span className="fact-check">✓</span>
                <span>{ui.outdoorLabel}</span>
              </div>
            )}
            <div className="fact-item">
              {club.restaurant ? (
                <span className="fact-check">✓</span>
              ) : (
                <span className="fact-cross">✗</span>
              )}
              <span>{ui.restaurantLabel}</span>
            </div>
            <div className="fact-item">
              {club.gym ? (
                <span className="fact-check">✓</span>
              ) : (
                <span className="fact-cross">✗</span>
              )}
              <span>{ui.gymLabel}</span>
            </div>
            <div className="fact-item">
              {club.lessons ? (
                <span className="fact-check">✓</span>
              ) : (
                <span className="fact-cross">✗</span>
              )}
              <span>{ui.lessonsLabel}</span>
            </div>
          </div>
        </div>

        {/* ── Club Body ── */}
        <article className="club-body">
          <p className="club-description">{club.description}</p>

          <h2 className="club-highlights-title">{ui.highlightsTitle}</h2>
          <ul className="club-highlights">
            {club.highlights.map(h => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          {/* Book & Contact */}
          <div className="booking-section">
            <a
              href={club.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {ui.bookBtn}
            </a>
            <a
              href={club.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {ui.websiteBtn}
            </a>
          </div>

          <div className="club-address">
            <strong>{ui.addressLabel}:</strong> {club.address}
            {' · '}
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {ui.mapsLink}
            </a>
          </div>

          {/* Upsell banner — only for non-premium clubs */}
          {club.tier !== 'premium' && (
            <div className="upsell-banner">
              <p>{ui.upsellText}</p>
              <Link href="/advertise" className="btn-primary">
                {ui.upsellCta}
              </Link>
            </div>
          )}
        </article>

        {/* ── Related Clubs ── */}
        <section className="related-clubs">
          <div className="related-clubs-inner">
            <p className="section-label">Marbella</p>
            <h2 className="section-title">{ui.relatedTitle}</h2>
            <div className="club-grid" style={{ marginTop: '2rem' }}>
              {relatedClubs.map(related => (
                <Link
                  key={related.slug}
                  href={`/${lang}/clubs/${related.slug}`}
                  className="club-card"
                >
                  <div className="club-card-accent" />
                  <div className="club-card-body">
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span className={`badge badge-${related.tier}`}>
                        {related.tier === 'premium'
                          ? ui.premiumBadge
                          : ui.standardBadge}
                      </span>
                    </div>
                    <p className="club-card-name">{related.name}</p>
                    <p className="club-card-tagline">{related.tagline}</p>
                    <div className="club-card-meta">
                      <span className="court-badge">
                        {related.courts} {ui.courtsLabel}
                      </span>
                      <span className="court-badge">{related.priceRange}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Link href={`/${lang}`} className="footer-logo">
              MarbellapadEL
            </Link>
            <p className="footer-tagline">{ui.footerTagline}</p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} MarbellapadEL. All rights reserved.
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href={`/${lang}/clubs`} className="footer-link">
              {ui.navClubs}
            </Link>
            <Link href={`/${lang}/blog`} className="footer-link">
              {ui.navBlog}
            </Link>
            {SUPPORTED_LANGS.map(l => (
              <Link key={l} href={`/${l}/clubs/${slug}`} className="footer-link">
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
