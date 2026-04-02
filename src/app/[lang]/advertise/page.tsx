import type { Metadata } from 'next';
import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TIERS = [
  {
    name: 'Standard Listing',
    price: '€99',
    period: '/month',
    features: [
      'Club profile page',
      'Listed in comparison articles',
      'Booking link included',
      'Basic club details',
      'Analytics dashboard',
    ],
    cta: 'Get listed',
    highlight: false,
  },
  {
    name: 'Featured Listing',
    price: '€299',
    period: '/month',
    features: [
      'Everything in Standard',
      '"Best Club" badge on articles',
      'Top position in lists',
      'Priority in review content',
      'Booking CTA button',
      'Monthly performance report',
      'Social media mention',
    ],
    cta: 'Get featured',
    highlight: true,
  },
  {
    name: 'Sponsored Review',
    price: '€499',
    period: 'one-time',
    features: [
      '1,500-word expert review',
      'Permanent on-site article',
      'Full SEO optimization',
      'Photos + club description',
      'Translated to 2 languages',
      'Shared on social media',
    ],
    cta: 'Commission review',
    highlight: false,
  },
];

interface MetaEntry {
  title: string;
  description: string;
  navBlog: string;
  navClubs: string;
  navAdvertise: string;
  footerTagline: string;
  footerCopyright: string;
  heroTitle: string;
  heroSub: string;
  statsLangs: string;
  statsPlayers: string;
  statsArticles: string;
  tiersTitle: string;
  whyTitle: string;
  contactTitle: string;
  contactSub: string;
  contactSmall: string;
}

const META: Record<Lang, MetaEntry> = {
  en: {
    title: 'Advertise Your Padel Club | MarbellapadEL',
    description: 'List your Marbella padel club on the #1 padel guide. Reach thousands of players and tourists searching for courts every month.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Advertise',
    footerTagline: 'The #1 multilingual padel guide for Marbella. Discover best clubs, book courts, and expert tips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. All rights reserved.`,
    heroTitle: 'Reach padel players from around the world',
    heroSub: 'MarbellapadEL is the #1 multilingual guide to padel in Marbella. Get your club in front of thousands of players searching for courts every month.',
    statsLangs: 'languages',
    statsPlayers: 'global players',
    statsArticles: 'indexed articles',
    tiersTitle: 'Choose your plan',
    whyTitle: 'Why advertise with us?',
    contactTitle: 'Ready to get listed?',
    contactSub: 'Email us and we\'ll have your club live within 48 hours.',
    contactSmall: 'Free basic listing available for first 3 months while we grow.',
  },
  de: {
    title: 'Padel-Club bewerben | MarbellapadEL',
    description: 'Listen Sie Ihren Padel-Club in Marbella im #1 Padel-Ratgeber auf.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Werben',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle Rechte vorbehalten.`,
    heroTitle: 'Erreichen Sie Padel-Spieler weltweit',
    heroSub: 'MarbellapadEL ist der führende mehrsprachige Ratgeber für Padel in Marbella. Präsentieren Sie Ihren Club tausenden Spielern.',
    statsLangs: 'Sprachen',
    statsPlayers: 'Spieler weltweit',
    statsArticles: 'Artikel',
    tiersTitle: 'Wählen Sie Ihren Plan',
    whyTitle: 'Warum bei uns werben?',
    contactTitle: 'Bereit für den Eintrag?',
    contactSub: 'Kontaktieren Sie uns per E-Mail, wir schalten Ihren Club innerhalb von 48 Stunden live.',
    contactSmall: 'Kostenloser Basiseintrag für die ersten 3 Monate verfügbar.',
  },
  sv: {
    title: 'Annonsera din padelklubb | MarbellapadEL',
    description: 'Lista din padelklubb i Marbella i den ledande padelguiden.',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    navAdvertise: 'Annonsera',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alla rättigheter förbehållna.`,
    heroTitle: 'Nå padelspelare från hela världen',
    heroSub: 'MarbellapadEL är den ledande flerspråkiga guiden till padel i Marbella. Visa din klubb för tusentals spelare.',
    statsLangs: 'språk',
    statsPlayers: 'spelare globalt',
    statsArticles: 'artiklar',
    tiersTitle: 'Välj din plan',
    whyTitle: 'Varför annonsera hos oss?',
    contactTitle: 'Redo att listas?',
    contactSub: 'Mejla oss så har vi din klubb live inom 48 timmar.',
    contactSmall: 'Gratis baslistning tillgänglig de första 3 månaderna.',
  },
  nl: {
    title: 'Adverteer uw padelclub | MarbellapadEL',
    description: 'Vermeld uw padelclub in Marbella in de #1 padelgids.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Adverteren',
    footerTagline: 'De #1 meertalige padelgids voor Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rechten voorbehouden.`,
    heroTitle: 'Bereik padelspelers van over de hele wereld',
    heroSub: 'MarbellapadEL is de leidende meertalige gids voor padel in Marbella. Presenteer uw club aan duizenden spelers.',
    statsLangs: 'talen',
    statsPlayers: 'spelers wereldwijd',
    statsArticles: 'artikelen',
    tiersTitle: 'Kies uw plan',
    whyTitle: 'Waarom bij ons adverteren?',
    contactTitle: 'Klaar om vermeld te worden?',
    contactSub: 'Stuur ons een e-mail en we zetten uw club binnen 48 uur live.',
    contactSmall: 'Gratis basisvermelding beschikbaar voor de eerste 3 maanden.',
  },
  fr: {
    title: 'Publiez votre club de padel | MarbellapadEL',
    description: 'Répertoriez votre club de padel à Marbella sur le guide #1.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Publicité',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Tous droits réservés.`,
    heroTitle: 'Touchez des joueurs de padel du monde entier',
    heroSub: 'MarbellapadEL est le guide multilingue de référence pour le padel à Marbella. Présentez votre club à des milliers de joueurs.',
    statsLangs: 'langues',
    statsPlayers: 'joueurs mondiaux',
    statsArticles: 'articles',
    tiersTitle: 'Choisissez votre forfait',
    whyTitle: 'Pourquoi choisir MarbellapadEL ?',
    contactTitle: 'Prêt à être listé ?',
    contactSub: 'Envoyez-nous un e-mail et votre club sera en ligne sous 48h.',
    contactSmall: 'Inscription de base gratuite pendant les 3 premiers mois.',
  },
  es: {
    title: 'Anuncia tu club de pádel | MarbellapadEL',
    description: 'Anuncia tu club de pádel en Marbella en la guía líder.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Anunciarse',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Todos los derechos reservados.`,
    heroTitle: 'Llega a jugadores de pádel de todo el mundo',
    heroSub: 'MarbellapadEL es la guía multilingüe nº 1 de pádel en Marbella. Pon tu club frente a miles de jugadores cada mes.',
    statsLangs: 'idiomas',
    statsPlayers: 'jugadores globales',
    statsArticles: 'artículos',
    tiersTitle: 'Elige tu plan',
    whyTitle: '¿Por qué anunciarse con nosotros?',
    contactTitle: '¿Listo para aparecer?',
    contactSub: 'Envíanos un correo y tu club estará activo en 48 horas.',
    contactSmall: 'Anuncio básico gratuito disponible los primeros 3 meses.',
  },
  pl: {
    title: 'Reklamuj swój klub padlowy | MarbellapadEL',
    description: 'Dodaj swój klub padlowy w Marbelli do przewodnika nr 1.',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    navAdvertise: 'Reklama',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Wszelkie prawa zastrzeżone.`,
    heroTitle: 'Dotrzyj do graczy padla z całego świata',
    heroSub: 'MarbellapadEL to wiodący wielojęzyczny przewodnik po padlu w Marbelli. Pokaż swój klub tysiącom graczy.',
    statsLangs: 'języków',
    statsPlayers: 'graczy na świecie',
    statsArticles: 'artykułów',
    tiersTitle: 'Wybierz swój plan',
    whyTitle: 'Dlaczego warto się u nas reklamować?',
    contactTitle: 'Gotowy na wpis?',
    contactSub: 'Napisz do nas, a Twój klub będzie widoczny w ciągu 48 godzin.',
    contactSmall: 'Darmowy wpis podstawowy dostępny przez pierwsze 3 miesiące.',
  },
  no: {
    title: 'Annonser din padelklubb | MarbellapadEL',
    description: 'List din padelklubb i Marbella i den ledende padelguiden.',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    navAdvertise: 'Annonsere',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rettigheter reservert.`,
    heroTitle: 'Nå padelspillere fra hele verden',
    heroSub: 'MarbellapadEL er den ledende flerspråklige guiden til padel i Marbella. Vis klubben din til tusenvis av spillere.',
    statsLangs: 'språk',
    statsPlayers: 'spillere globalt',
    statsArticles: 'artikler',
    tiersTitle: 'Velg din plan',
    whyTitle: 'Hvorfor annonsere hos oss?',
    contactTitle: 'Klar for å bli listet?',
    contactSub: 'Send oss en e-post, så er klubben din live innen 48 timer.',
    contactSmall: 'Gratis basisoppføring tilgjengelig de første 3 månedene.',
  },
  sl: {
    title: 'Oglašujte svoj padel klub | MarbellapadEL',
    description: 'Vpišite svoj padel klub v Marbelli v vodič št. 1.',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    navAdvertise: 'Oglaševanje',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Vse pravice pridržane.`,
    heroTitle: 'Dosezite igralce padla z vsega sveta',
    heroSub: 'MarbellapadEL je vodilni večjezični vodič za padel v Marbelli. Predstavite svoj klub tisočem igralcev.',
    statsLangs: 'jeziki',
    statsPlayers: 'igralcev po svetu',
    statsArticles: 'člankov',
    tiersTitle: 'Izberite svoj plan',
    whyTitle: 'Zakaj oglaševati pri nas?',
    contactTitle: 'Ste pripravljeni na vpis?',
    contactSub: 'Pišite nam in vaš klub bo objavljen v 48 urah.',
    contactSmall: 'Brezplačen osnovni vpis na voljo prve 3 mesece.',
  },
  hr: {
    title: 'Oglašavajte svoj padel klub | MarbellapadEL',
    description: 'Uvrstite svoj padel klub u Marbelli u vodič br. 1.',
    navBlog: 'Blog',
    navClubs: 'Klubovi',
    navAdvertise: 'Oglašavanje',
    footerTagline: 'Vodič #1 za padel na više jezika za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Sva prava pridržana.`,
    heroTitle: 'Dosegnite igrače padela iz cijelog svijeta',
    heroSub: 'MarbellapadEL je vodeći višejezični vodič za padel u Marbelli. Predstavite svoj klub tisućama igrača.',
    statsLangs: 'jezici',
    statsPlayers: 'igrača diljem svijeta',
    statsArticles: 'članaka',
    tiersTitle: 'Odaberite svoj plan',
    whyTitle: 'Zašto oglašavati kod nas?',
    contactTitle: 'Spremni za objavu?',
    contactSub: 'Pošaljite nam e-mail i vaš će klub biti aktivan u roku od 48 sati.',
    contactSmall: 'Besplatan osnovni upis dostupan prva 3 mjeseca.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';
  const meta = META[lang] || META.en;
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/advertise`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map((l) => [l, `${BASE_URL}/${l}/advertise`])),
        'x-default': `${BASE_URL}/en/advertise`,
      },
    },
  };
}


export default async function AdvertisePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  if (!SUPPORTED_LANGS.includes(lang)) return null;
  const meta = META[lang];

  return (
    <>
      <Navbar 
        lang={lang} 
        labels={{
          blog: meta.navBlog,
          clubs: meta.navClubs,
          advertise: meta.navAdvertise
        }} 
      />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 bg-neutral-950 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-8 leading-tight">
              {meta.heroTitle}
            </h1>
            <p className="text-xl text-neutral-400 mb-12 leading-relaxed">
              {meta.heroSub}
            </p>
            <div className="flex flex-wrap justify-center gap-12 mt-16">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-terracotta">10</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mt-2">{meta.statsLangs}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-terracotta">30M+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mt-2">{meta.statsPlayers}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-terracotta">60</span>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mt-2">{meta.statsArticles}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{meta.tiersTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TIERS.map(tier => (
                <div key={tier.name} className={`relative p-8 rounded-3xl border ${tier.highlight ? 'border-terracotta bg-white shadow-2xl scale-105 z-10' : 'border-neutral-100 bg-neutral-50'}`}>
                  {tier.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-terracotta text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                      Most popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-4">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-neutral-500">{tier.period}</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-neutral-600">
                        <svg className="w-5 h-5 text-terracotta flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="mailto:advertise@marbellapadel.com" 
                    className={`btn-full text-center py-4 rounded-xl font-bold transition-all ${tier.highlight ? 'bg-terracotta text-white shadow-lg hover:shadow-xl' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}
                  >
                    {tier.cta} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Advertise Section */}
        <section className="py-24 px-6 bg-sand/10 border-y border-sand/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">{meta.whyTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Targeted traffic</h3>
                <p className="text-neutral-600 leading-relaxed">Every visitor is actively searching for padel courts in Marbella. High purchase intent — these are players ready to book.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Northern European reach</h3>
                <p className="text-neutral-600 leading-relaxed">German, Swedish, Dutch, and French content that no competitor has. Reach the tourists who travel to Costa del Sol most.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Permanent SEO value</h3>
                <p className="text-neutral-600 leading-relaxed">Sponsored review articles rank permanently. Your club name appears in Google searches for years, not weeks.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Affiliate booking</h3>
                <p className="text-neutral-600 leading-relaxed">We add direct booking links to your club. Players click through to your booking page or Playtomic listing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-neutral-950 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{meta.contactTitle}</h2>
            <p className="text-xl text-neutral-400 mb-12">{meta.contactSub}</p>
            <a href="mailto:advertise@marbellapadel.com" className="inline-block text-2xl md:text-4xl font-bold text-terracotta border-b-2 border-terracotta/30 pb-2 hover:border-terracotta transition-all">
              advertise@marbellapadel.com
            </a>
            <p className="mt-12 text-sm text-neutral-600 italic">
              {meta.contactSmall}
            </p>
          </div>
        </section>
      </main>
      <Footer 
        lang={lang} 
        labels={{
          blog: meta.navBlog,
          clubs: meta.navClubs,
          advertise: meta.navAdvertise,
          tagline: meta.footerTagline,
          copyright: meta.footerCopyright
        }} 
      />
    </>
  );
}
