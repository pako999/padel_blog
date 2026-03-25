/**
 * app/[lang]/page.tsx
 * Homepage — multilingual entry point for all 8 supported languages
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { getFeaturedPosts, SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { notFound } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';

interface MetaEntry {
  title: string;
  description: string;
  h1: string;
  heroHeadline: string;
  heroCta1: string;
  heroCta2: string;
  clubsLabel: string;
  clubsTitle: string;
  clubsLink: string;
  postsLabel: string;
  postsTitle: string;
  postsLink: string;
  whyLabel: string;
  whyTitle: string;
  advertiseTitle: string;
  advertiseBody: string;
  advertiseCta: string;
  navBlog: string;
  navClubs: string;
  statsPlayers: string;
  statsLanguages: string;
  statsArticles: string;
  statsClubs: string;
  why1Title: string;
  why1Body: string;
  why2Title: string;
  why2Body: string;
  why3Title: string;
  why3Body: string;
}

const META: Record<Lang, MetaEntry> = {
  en: {
    title: 'Marbella Padel Guide — Best Clubs, Courts & Tips',
    description:
      'The #1 multilingual guide to padel in Marbella. Discover the best clubs, book courts, find lessons and read expert tips — in English and 7 other languages.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nThe cradle of\npadel in Europe.',
    heroCta1: 'Explore clubs',
    heroCta2: 'Read guides',
    clubsLabel: 'Top rated',
    clubsTitle: 'Featured Padel Clubs',
    clubsLink: 'View all 9 clubs →',
    postsLabel: 'Latest guides',
    postsTitle: 'Expert Padel Advice',
    postsLink: 'Browse all articles →',
    whyLabel: 'Why us',
    whyTitle: 'The Marbella Padel Authority',
    advertiseTitle: 'Does your club belong in this guide?',
    advertiseBody:
      'Reach thousands of padel players from across Europe searching for courts in Marbella every month.',
    advertiseCta: 'Get listed as a Featured Partner →',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    statsPlayers: 'global padel players',
    statsLanguages: 'languages covered',
    statsArticles: 'expert articles',
    statsClubs: 'clubs reviewed',
    why1Title: 'Local expertise',
    why1Body:
      'Our writers live and play in Marbella. Every club review is based on first-hand court time, not press releases.',
    why2Title: 'Multilingual',
    why2Body:
      'All content in 8 languages — English, German, Swedish, Dutch, French, Spanish, Polish, and Norwegian.',
    why3Title: 'Always up to date',
    why3Body:
      'Club details, prices, and booking links are verified regularly so you always have accurate information.',
  },
  de: {
    title: 'Padel Marbella — Beste Clubs & Plätze',
    description:
      'Der ultimative deutschsprachige Ratgeber für Padel in Marbella. Die besten Clubs, Plätze buchen, Unterricht finden und Expertentipps lesen.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nDie Wiege des\nPadels in Europa.',
    heroCta1: 'Clubs entdecken',
    heroCta2: 'Ratgeber lesen',
    clubsLabel: 'Top bewertet',
    clubsTitle: 'Empfohlene Padel-Clubs',
    clubsLink: 'Alle 9 Clubs anzeigen →',
    postsLabel: 'Neueste Ratgeber',
    postsTitle: 'Expertenratgeber für Padel',
    postsLink: 'Alle Artikel durchsuchen →',
    whyLabel: 'Warum wir',
    whyTitle: 'Die Marbella Padel Autorität',
    advertiseTitle: 'Gehört Ihr Club in diesen Ratgeber?',
    advertiseBody:
      'Erreichen Sie tausende Padel-Spieler aus ganz Europa, die jeden Monat nach Plätzen in Marbella suchen.',
    advertiseCta: 'Als empfohlener Partner gelistet werden →',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    statsPlayers: 'Padel-Spieler weltweit',
    statsLanguages: 'Sprachen',
    statsArticles: 'Expertenartikel',
    statsClubs: 'Clubs bewertet',
    why1Title: 'Lokale Expertise',
    why1Body:
      'Unsere Autoren leben und spielen in Marbella. Jede Club-Bewertung basiert auf eigenem Spielerlebnis.',
    why2Title: 'Mehrsprachig',
    why2Body:
      'Alle Inhalte in 8 Sprachen — Englisch, Deutsch, Schwedisch, Niederländisch, Französisch, Spanisch, Polnisch und Norwegisch.',
    why3Title: 'Immer aktuell',
    why3Body:
      'Club-Details, Preise und Buchungslinks werden regelmäßig überprüft, damit Sie immer genaue Informationen haben.',
  },
  sv: {
    title: 'Padel Marbella Guide — Bästa Klubbar',
    description:
      'Den #1 svenska guiden till padel i Marbella. Hitta de bästa klubbarna, boka banor, hitta lektioner och läs experttips.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nEuropas vagga\nför padel.',
    heroCta1: 'Utforska klubbar',
    heroCta2: 'Läs guider',
    clubsLabel: 'Toppbetyg',
    clubsTitle: 'Utvalda Padelklubbar',
    clubsLink: 'Visa alla 9 klubbar →',
    postsLabel: 'Senaste guiderna',
    postsTitle: 'Expertguider för padel',
    postsLink: 'Bläddra bland alla artiklar →',
    whyLabel: 'Varför vi',
    whyTitle: 'Marbellas padelmyndighet',
    advertiseTitle: 'Hör din klubb hemma i den här guiden?',
    advertiseBody:
      'Nå tusentals padelspelare från hela Europa som varje månad söker banor i Marbella.',
    advertiseCta: 'Bli listad som utvald partner →',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    statsPlayers: 'padelspelare globalt',
    statsLanguages: 'språk',
    statsArticles: 'expertartiklar',
    statsClubs: 'klubbar recenserade',
    why1Title: 'Lokal expertis',
    why1Body:
      'Våra skribenter bor och spelar i Marbella. Varje klubbrecension baseras på eget spelande, inte pressmeddelanden.',
    why2Title: 'Flerspråkig',
    why2Body:
      'Allt innehåll på 8 språk — engelska, tyska, svenska, holländska, franska, spanska, polska och norska.',
    why3Title: 'Alltid uppdaterat',
    why3Body:
      'Klubbuppgifter, priser och bokningslänkar verifieras regelbundet så att du alltid har korrekt information.',
  },
  nl: {
    title: 'Padel Marbella Gids — Beste Clubs',
    description:
      'De #1 Nederlandstalige gids voor padel in Marbella. Ontdek de beste clubs, boek banen, vind lessen en lees experttips.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nDe bakermat van\npadel in Europa.',
    heroCta1: 'Ontdek clubs',
    heroCta2: 'Lees gidsen',
    clubsLabel: 'Topbeoordeeld',
    clubsTitle: 'Aanbevolen Padelclubs',
    clubsLink: 'Bekijk alle 9 clubs →',
    postsLabel: 'Laatste gidsen',
    postsTitle: 'Expertgidsen voor padel',
    postsLink: 'Blader door alle artikelen →',
    whyLabel: 'Waarom wij',
    whyTitle: 'De Marbella Padelautorit',
    advertiseTitle: 'Hoort jouw club in deze gids?',
    advertiseBody:
      'Bereik duizenden padelspelers uit heel Europa die elke maand banen in Marbella zoeken.',
    advertiseCta: 'Geregistreerd worden als aanbevolen partner →',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    statsPlayers: 'padelspelers wereldwijd',
    statsLanguages: 'talen',
    statsArticles: 'expertartikelen',
    statsClubs: 'clubs beoordeeld',
    why1Title: 'Lokale expertise',
    why1Body:
      'Onze schrijvers wonen en spelen in Marbella. Elke clubrecensie is gebaseerd op eigen speelervaringen.',
    why2Title: 'Meertalig',
    why2Body:
      'Alle inhoud in 8 talen — Engels, Duits, Zweeds, Nederlands, Frans, Spaans, Pools en Noors.',
    why3Title: 'Altijd actueel',
    why3Body:
      'Clubgegevens, prijzen en boekingslinks worden regelmatig geverifieerd zodat u altijd nauwkeurige informatie heeft.',
  },
  fr: {
    title: 'Guide Padel Marbella — Meilleurs Clubs',
    description:
      'Le guide #1 en français du padel à Marbella. Découvrez les meilleurs clubs, réservez des courts, trouvez des cours et lisez des conseils d\'experts.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nLe berceau du\npadel en Europe.',
    heroCta1: 'Explorer les clubs',
    heroCta2: 'Lire les guides',
    clubsLabel: 'Les mieux notés',
    clubsTitle: 'Clubs de Padel en Vedette',
    clubsLink: 'Voir les 9 clubs →',
    postsLabel: 'Derniers guides',
    postsTitle: 'Conseils d\'experts en padel',
    postsLink: 'Parcourir tous les articles →',
    whyLabel: 'Pourquoi nous',
    whyTitle: 'L\'autorité padel de Marbella',
    advertiseTitle: 'Votre club mérite-t-il sa place dans ce guide?',
    advertiseBody:
      'Touchez des milliers de joueurs de padel de toute l\'Europe qui recherchent des courts à Marbella chaque mois.',
    advertiseCta: 'Devenir partenaire vedette →',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    statsPlayers: 'joueurs de padel dans le monde',
    statsLanguages: 'langues couvertes',
    statsArticles: 'articles d\'experts',
    statsClubs: 'clubs évalués',
    why1Title: 'Expertise locale',
    why1Body:
      'Nos rédacteurs vivent et jouent à Marbella. Chaque avis de club est basé sur une expérience terrain personnelle.',
    why2Title: 'Multilingue',
    why2Body:
      'Tout le contenu en 8 langues — anglais, allemand, suédois, néerlandais, français, espagnol, polonais et norvégien.',
    why3Title: 'Toujours à jour',
    why3Body:
      'Les détails des clubs, les prix et les liens de réservation sont régulièrement vérifiés pour vous garantir des informations précises.',
  },
  es: {
    title: 'Guía Pádel Marbella — Mejores Clubs',
    description:
      'La guía #1 en español del pádel en Marbella. Descubre los mejores clubs, reserva pistas, encuentra clases y lee consejos de expertos.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nLa cuna del\npádel en Europa.',
    heroCta1: 'Explorar clubs',
    heroCta2: 'Leer guías',
    clubsLabel: 'Mejor valorados',
    clubsTitle: 'Clubs de Pádel Destacados',
    clubsLink: 'Ver los 9 clubs →',
    postsLabel: 'Últimas guías',
    postsTitle: 'Consejos de expertos en pádel',
    postsLink: 'Ver todos los artículos →',
    whyLabel: 'Por qué nosotros',
    whyTitle: 'La autoridad del pádel en Marbella',
    advertiseTitle: '¿Tu club merece estar en esta guía?',
    advertiseBody:
      'Llega a miles de jugadores de pádel de toda Europa que buscan pistas en Marbella cada mes.',
    advertiseCta: 'Aparecer como socio destacado →',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    statsPlayers: 'jugadores de pádel en el mundo',
    statsLanguages: 'idiomas',
    statsArticles: 'artículos de expertos',
    statsClubs: 'clubs analizados',
    why1Title: 'Experiencia local',
    why1Body:
      'Nuestros redactores viven y juegan en Marbella. Cada reseña de club se basa en experiencia propia en pista.',
    why2Title: 'Multilingüe',
    why2Body:
      'Todo el contenido en 8 idiomas — inglés, alemán, sueco, neerlandés, francés, español, polaco y noruego.',
    why3Title: 'Siempre actualizado',
    why3Body:
      'Los detalles de los clubs, precios y enlaces de reserva se verifican regularmente para que siempre tengas información precisa.',
  },
  pl: {
    title: 'Padel Marbella Przewodnik — Najlepsze Kluby',
    description:
      'Przewodnik #1 po padlu w Marbelli po polsku. Odkryj najlepsze kluby, zarezerwuj korty, znajdź lekcje i czytaj porady ekspertów.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nKolebka padla\nw Europie.',
    heroCta1: 'Odkryj kluby',
    heroCta2: 'Czytaj poradniki',
    clubsLabel: 'Najwyżej oceniane',
    clubsTitle: 'Polecane Kluby Padlowe',
    clubsLink: 'Zobacz wszystkie 9 klubów →',
    postsLabel: 'Najnowsze poradniki',
    postsTitle: 'Porady ekspertów padla',
    postsLink: 'Przeglądaj wszystkie artykuły →',
    whyLabel: 'Dlaczego my',
    whyTitle: 'Autorytet padla w Marbelli',
    advertiseTitle: 'Czy Twój klub zasługuje na miejsce w tym przewodniku?',
    advertiseBody:
      'Dotrzyj do tysięcy graczy padla z całej Europy szukających kortów w Marbelli każdego miesiąca.',
    advertiseCta: 'Dołącz jako polecany partner →',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    statsPlayers: 'graczy padla na świecie',
    statsLanguages: 'języki',
    statsArticles: 'artykuły ekspertów',
    statsClubs: 'ocenione kluby',
    why1Title: 'Lokalna wiedza',
    why1Body:
      'Nasi autorzy mieszkają i grają w Marbelli. Każda recenzja klubu opiera się na osobistym doświadczeniu na korcie.',
    why2Title: 'Wielojęzyczny',
    why2Body:
      'Wszystkie treści w 8 językach — angielskim, niemieckim, szwedzkim, niderlandzkim, francuskim, hiszpańskim, polskim i norweskim.',
    why3Title: 'Zawsze aktualne',
    why3Body:
      'Dane klubów, ceny i linki do rezerwacji są regularnie weryfikowane, abyś zawsze miał dokładne informacje.',
  },
  no: {
    title: 'Padel Marbella Guide — Beste Klubber',
    description:
      'Den #1 norske guiden til padel i Marbella. Finn de beste klubbene, book baner, finn timer og les eksperttips.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nVuggen til\npadel i Europa.',
    heroCta1: 'Utforsk klubber',
    heroCta2: 'Les guider',
    clubsLabel: 'Toppvurdert',
    clubsTitle: 'Utvalgte Padelklubber',
    clubsLink: 'Vis alle 9 klubber →',
    postsLabel: 'Siste guider',
    postsTitle: 'Ekspertguider for padel',
    postsLink: 'Bla gjennom alle artikler →',
    whyLabel: 'Hvorfor oss',
    whyTitle: 'Marbellas padelautoritet',
    advertiseTitle: 'Hører klubben din hjemme i denne guiden?',
    advertiseBody:
      'Nå tusenvis av padelspillere fra hele Europa som søker etter baner i Marbella hver måned.',
    advertiseCta: 'Bli listet som anbefalt partner →',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    statsPlayers: 'padelspillere globalt',
    statsLanguages: 'språk',
    statsArticles: 'ekspertartikler',
    statsClubs: 'klubber vurdert',
    why1Title: 'Lokal ekspertise',
    why1Body:
      'Skribentene våre bor og spiller i Marbella. Hver klubbanmeldelse er basert på egne erfaringer på banen.',
    why2Title: 'Flerspråklig',
    why2Body:
      'Alt innhold på 10 språk — engelsk, tysk, svensk, nederlandsk, fransk, spansk, polsk, norsk, slovensk og kroatisk.',
    why3Title: 'Alltid oppdatert',
    why3Body:
      'Klubbdetaljer, priser og bestillingslenker verifiseres jevnlig slik at du alltid har nøyaktig informasjon.',
  },
  sl: {
    title: 'Padel Marbella Vodič — Najboljši Klubi in Igrišča',
    description:
      'Vodič #1 v slovenščini za padel v Marbelli. Odkrijte najboljše klube, rezervirajte igrišča in preberite strokovne nasvete.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nZibka padla\nv Evropi.',
    heroCta1: 'Odkrijte klube',
    heroCta2: 'Preberite vodnike',
    clubsLabel: 'Najboljše ocenjeni',
    clubsTitle: 'Izpostavljeni Padel Klubi',
    clubsLink: 'Oglejte si vseh 9 klubov →',
    postsLabel: 'Najnovejši vodniki',
    postsTitle: 'Strokovni nasveti za padel',
    postsLink: 'Prebrskajte vse članke →',
    whyLabel: 'Zakaj mi',
    whyTitle: 'Marbellska padel avtoriteta',
    advertiseTitle: 'Ali vaš klub spada v ta vodič?',
    advertiseBody:
      'Dosezite tisoče padel igralcev iz vse Evrope, ki vsak mesec iščejo igrišča v Marbelli.',
    advertiseCta: 'Pridružite se kot izpostavljeni partner →',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    statsPlayers: 'padel igralcev po svetu',
    statsLanguages: 'jezikov',
    statsArticles: 'strokovnih člankov',
    statsClubs: 'ocenjenih klubov',
    why1Title: 'Lokalna strokovnost',
    why1Body:
      'Naši avtorji živijo in igrajo v Marbelli. Vsaka ocena kluba temelji na osebnih izkušnjah na igrišču.',
    why2Title: 'Večjezično',
    why2Body:
      'Vsa vsebina v 10 jezikih — angleščina, nemščina, švedščina, nizozemščina, francoščina, španščina, poljščina, norveščina, slovenščina in hrvaščina.',
    why3Title: 'Vedno posodobljeno',
    why3Body:
      'Podatki o klubih, cene in povezave za rezervacije se redno preverjajo, tako da imate vedno natančne informacije.',
  },
  hr: {
    title: 'Padel Marbella Vodič — Najbolji Klubovi i Tereni',
    description:
      'Vodič #1 na hrvatskom za padel u Marbelli. Otkrijte najbolje klubove, rezervirajte terene i čitajte stručne savjete.',
    h1: 'MarbellapadEL',
    heroHeadline: 'Marbella.\nColijevka padela\nu Europi.',
    heroCta1: 'Istražite klubove',
    heroCta2: 'Čitajte vodiče',
    clubsLabel: 'Najbolje ocijenjeni',
    clubsTitle: 'Istaknuti Padel Klubovi',
    clubsLink: 'Pogledajte svih 9 klubova →',
    postsLabel: 'Najnoviji vodiči',
    postsTitle: 'Stručni savjeti za padel',
    postsLink: 'Pregledajte sve članke →',
    whyLabel: 'Zašto mi',
    whyTitle: 'Marbellski padel autoritet',
    advertiseTitle: 'Pripada li vaš klub ovom vodiču?',
    advertiseBody:
      'Dosegnite tisuće padel igrača iz cijele Europe koji svaki mjesec traže terene u Marbelli.',
    advertiseCta: 'Pridružite se kao istaknuti partner →',
    navBlog: 'Blog',
    navClubs: 'Klubovi',
    statsPlayers: 'padel igrača globalno',
    statsLanguages: 'jezika',
    statsArticles: 'stručnih članaka',
    statsClubs: 'ocijenjenih klubova',
    why1Title: 'Lokalna stručnost',
    why1Body:
      'Naši autori žive i igraju u Marbelli. Svaka recenzija kluba temelji se na osobnom iskustvu na terenu.',
    why2Title: 'Višejezično',
    why2Body:
      'Sav sadržaj na 10 jezika — engleski, njemački, švedski, nizozemski, francuski, španjolski, poljski, norveški, slovenski i hrvatski.',
    why3Title: 'Uvijek ažurirano',
    why3Body:
      'Podaci o klubovima, cijene i veze za rezervacije redovito se provjeravaju kako biste uvijek imali točne informacije.',
  },
};

// Featured clubs for the homepage (hardcoded slugs; data is inlined for speed)
const FEATURED_CLUBS = [
  {
    slug: 'nac-nueva-alcantara',
    name: 'NAC Nueva Alcántara',
    tagline: "World's best padel club 2024 & 2025",
    courts: 16,
    tier: 'premium' as const,
    priceRange: '€€€' as const,
  },
  {
    slug: 'puente-romano',
    name: 'Puente Romano Beach Resort',
    tagline: 'Luxury resort padel on the Golden Mile',
    courts: 8,
    tier: 'premium' as const,
    priceRange: '€€€€' as const,
  },
  {
    slug: 'real-club-padel-marbella',
    name: 'Real Club Padel Marbella',
    tagline: 'The historic heart of Marbella padel',
    courts: 10,
    tier: 'premium' as const,
    priceRange: '€€€' as const,
  },
];

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
      canonical: `${BASE_URL}/${lang}`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}`])
      ),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang)) notFound();

  const meta = META[lang];
  const posts = getFeaturedPosts(lang, 6);

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
                href={`/${l}`}
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
        {/* ── Hero ── */}
        <section className="hero">
          {/* Decorative SVG padel court lines */}
          <div className="court-lines-bg" aria-hidden="true">
            <svg
              viewBox="0 0 400 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Outer court rectangle */}
              <rect x="40" y="40" width="320" height="520" stroke="#1A1A18" strokeWidth="6" />
              {/* Center line */}
              <line x1="40" y1="300" x2="360" y2="300" stroke="#1A1A18" strokeWidth="4" />
              {/* Service box left */}
              <line x1="200" y1="40" x2="200" y2="560" stroke="#1A1A18" strokeWidth="3" />
              {/* Service box top left */}
              <line x1="40" y1="170" x2="360" y2="170" stroke="#1A1A18" strokeWidth="2" />
              {/* Service box top right */}
              <line x1="40" y1="430" x2="360" y2="430" stroke="#1A1A18" strokeWidth="2" />
              {/* Net */}
              <line x1="40" y1="300" x2="360" y2="300" stroke="#1A1A18" strokeWidth="8" />
            </svg>
          </div>

          <div className="hero-inner">
            <div className="hero-content">
              <p className="hero-label">Marbella · Costa del Sol · España</p>
              <h1 className="hero-headline">{meta.heroHeadline}</h1>
              <hr className="hero-rule" />
              <p className="hero-body">{meta.description}</p>
              <div className="hero-ctas">
                <Link href={`/${lang}/clubs`} className="btn-primary">
                  {meta.heroCta1}
                </Link>
                <Link href={`/${lang}/blog`} className="btn-outline">
                  {meta.heroCta2}
                </Link>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">30M+</span>
                <span className="stat-label">{meta.statsPlayers}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10</span>
                <span className="stat-label">{meta.statsLanguages}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">400+</span>
                <span className="stat-label">{meta.statsArticles}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">9</span>
                <span className="stat-label">{meta.statsClubs}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Strip ── */}
        <div className="why-strip">
          <div className="section-label" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            {meta.whyLabel}
          </div>
          <h2
            className="section-title"
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          >
            {meta.whyTitle}
          </h2>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon" aria-hidden="true">🎾</div>
              <p className="why-title">{meta.why1Title}</p>
              <p className="why-body">{meta.why1Body}</p>
            </div>
            <div className="why-card">
              <div className="why-icon" aria-hidden="true">🌍</div>
              <p className="why-title">{meta.why2Title}</p>
              <p className="why-body">{meta.why2Body}</p>
            </div>
            <div className="why-card">
              <div className="why-icon" aria-hidden="true">✅</div>
              <p className="why-title">{meta.why3Title}</p>
              <p className="why-body">{meta.why3Body}</p>
            </div>
          </div>
        </div>

        {/* ── Featured Clubs ── */}
        <section className="section">
          <div className="section-inner">
            <div className="section-header">
              <div className="section-header-text">
                <p className="section-label">{meta.clubsLabel}</p>
                <h2 className="section-title">{meta.clubsTitle}</h2>
              </div>
              <Link href={`/${lang}/clubs`} className="btn-outline">
                {meta.clubsLink}
              </Link>
            </div>

            <div className="club-grid">
              {FEATURED_CLUBS.map(club => (
                <Link
                  key={club.slug}
                  href={`/${lang}/clubs/${club.slug}`}
                  className="club-card"
                >
                  <div className="club-card-accent" />
                  <div className="club-card-body">
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span className={`badge badge-${club.tier}`}>
                        {club.tier === 'premium' ? '★ Featured' : 'Listed'}
                      </span>
                    </div>
                    <p className="club-card-name">{club.name}</p>
                    <p className="club-card-tagline">{club.tagline}</p>
                    <div className="club-card-meta">
                      <span className="court-badge">{club.courts} courts</span>
                      <span className="court-badge">{club.priceRange}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats Banner ── */}
        <div className="stats-banner">
          <div className="stats-banner-inner">
            <div className="banner-stat">
              <span className="banner-stat-number">30M+</span>
              <span className="banner-stat-label">{meta.statsPlayers}</span>
            </div>
            <div className="banner-stat">
              <span className="banner-stat-number">8</span>
              <span className="banner-stat-label">{meta.statsLanguages}</span>
            </div>
            <div className="banner-stat">
              <span className="banner-stat-number">400+</span>
              <span className="banner-stat-label">{meta.statsArticles}</span>
            </div>
            <div className="banner-stat">
              <span className="banner-stat-number">9</span>
              <span className="banner-stat-label">{meta.statsClubs}</span>
            </div>
          </div>
        </div>

        {/* ── Latest Posts ── */}
        <section className="section">
          <div className="section-inner">
            <div className="section-header">
              <div className="section-header-text">
                <p className="section-label">{meta.postsLabel}</p>
                <h2 className="section-title">{meta.postsTitle}</h2>
              </div>
              <Link href={`/${lang}/blog`} className="btn-outline">
                {meta.postsLink}
              </Link>
            </div>

            {posts.length > 0 ? (
              <div className="post-list">
                {posts.map((post, i) => (
                  <div key={post.slug} className="post-list-item">
                    <span className="post-num">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="post-cluster-tag">{post.cluster}</span>
                      <Link
                        href={`/${lang}/blog/${post.slug}`}
                        className="post-title"
                      >
                        {post.title}
                      </Link>
                      <p className="post-description">{post.description}</p>
                    </div>
                    <span className="post-reading-time">{post.readingTime} min</span>
                  </div>
                ))}
              </div>
            ) : (
              /* Skeleton fallback when no posts exist yet */
              <div className="post-list">
                {[1, 2, 3].map(n => (
                  <div key={n} className="skeleton-post-item">
                    <span className="skeleton skeleton-num" />
                    <div className="skeleton-content">
                      <span className="skeleton skeleton-tag" />
                      <span className="skeleton skeleton-title" />
                      <span className="skeleton skeleton-desc" />
                    </div>
                    <span className="skeleton skeleton-time" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Advertise CTA ── */}
        <section className="advertise-section">
          <p className="section-label">{meta.whyLabel}</p>
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
            <Link href={`/${lang}`} className="footer-logo">
              MarbellapadEL
            </Link>
            <p className="footer-tagline">The #1 multilingual padel guide for Marbella</p>
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
            <Link href="/advertise" className="footer-link">
              Advertise
            </Link>
            {SUPPORTED_LANGS.map(l => (
              <Link key={l} href={`/${l}`} className="footer-link">
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
