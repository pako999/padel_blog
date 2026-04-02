import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MetaEntry {
  title: string;
  description: string;
  navBlog: string;
  navClubs: string;
  navAdvertise: string;
  footerTagline: string;
  footerCopyright: string;
}

const META: Record<Lang, MetaEntry> = {
  en: {
    title: 'About MarbellapadEL — The Multilingual Padel Authority',
    description: 'Learn who we are, why we built MarbellapadEL, and how our team of local writers covers padel in Marbella.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Advertise',
    footerTagline: 'The #1 multilingual padel guide for Marbella. Discover best clubs, book courts, and expert tips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. All rights reserved.`,
  },
  de: {
    title: 'Über MarbellapadEL — Die mehrsprachige Padel-Autorität',
    description: 'Erfahren Sie, wer wir sind, warum wir MarbellapadEL entwickelt haben und wie unser Team über Padel in Marbella berichtet.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Werben',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle Rechte vorbehalten.`,
  },
  sv: {
    title: 'Om MarbellapadEL — Den flerspråkiga padelmyndigheten',
    description: 'Lär dig vilka vi är, varför vi byggde MarbellapadEL och hur vårt team täcker padel i Marbella.',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    navAdvertise: 'Annonsera',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alla rättigheter förbehållna.`,
  },
  nl: {
    title: 'Over MarbellapadEL — De meertalige padelautoriteit',
    description: 'Leer wie we zijn, waarom we MarbellapadEL hebben gebouwd en hoe ons team padel in Marbella dakt.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Adverteren',
    footerTagline: 'De #1 meertalige padelgids voor Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rechten voorbehouden.`,
  },
  fr: {
    title: 'À propos de MarbellapadEL — L\'autorité padel multilingue',
    description: 'Découvrez qui nous sommes, pourquoi nous avons créé MarbellapadEL et comment notre équipe couvre le padel à Marbella.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Publicité',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Tous droits réservés.`,
  },
  es: {
    title: 'Sobre MarbellapadEL — La autoridad del pádel multilingüe',
    description: 'Conoce quiénes somos, por qué creamos MarbellapadEL y cómo nuestro equipo cubre el pádel en Marbella.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Anunciarse',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Todos los derechos reservados.`,
  },
  pl: {
    title: 'O MarbellapadEL — Wielojęzyczny autorytet padla',
    description: 'Dowiedz się, kim jesteśmy, dlaczego stworzyliśmy MarbellapadEL i jak nasz zespół zajmuje się padlem w Marbelli.',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    navAdvertise: 'Reklama',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Wszelkie prawa zastrzeżone.`,
  },
  no: {
    title: 'Om MarbellapadEL — Den flerspråklige padelautoriteten',
    description: 'Lær hvem vi er, hvorfor vi bygde MarbellapadEL og hvordan teamet vårt dekker padel i Marbella.',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    navAdvertise: 'Annonsere',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rettigheter reservert.`,
  },
  sl: {
    title: 'O MarbellapadEL — Večjezična padel avtoriteta',
    description: 'Spoznajte, kdo smo, zakaj smo ustvarili MarbellapadEL in kako naša ekipa pokriva padel v Marbelli.',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    navAdvertise: 'Oglaševanje',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Vse pravice pridržane.`,
  },
  hr: {
    title: 'O MarbellapadEL — Višejezični padel autoritet',
    description: 'Saznajte tko smo, zašto smo stvorili MarbellapadEL i kako naš tim pokriva padel u Marbelli.',
    navBlog: 'Blog',
    navClubs: 'Klubovi',
    navAdvertise: 'Oglašavanje',
    footerTagline: 'Vodič #1 za padel na više jezika za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Sva prava pridržana.`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';
  const meta = META[lang] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/about`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/about`])),
        'x-default': `${BASE_URL}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Lang }> }) {
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
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-8 leading-tight">
            About MarbellapadEL
          </h1>
          
          <div className="prose prose-neutral prose-lg prose-terracotta">
            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
              MarbellapadEL is the #1 multilingual padel guide dedicated to Marbella and the Costa del Sol. We were built by padel players, for padel players — with one simple goal: help every European traveller find the perfect court, club, or lesson in Marbella, no matter what language they speak.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">Who We Are</h2>
            <p className="text-neutral-600 mb-8">
              Our team is made up of resident players, club reviewers, and padel coaches who live and breathe padel on the Costa del Sol. Every club listed on this site has been personally visited. Every review reflects real court time — not a press release or a paid placement.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">Why 10 Languages?</h2>
            <p className="text-neutral-600 mb-8">
              Marbella is genuinely pan-European. On any given weekend you'll find Swedish families booking courts at NAC, Dutch couples playing at Puente Romano, and Polish groups discovering Real Club Padel Marbella for the first time. We publish every guide in English, German, Swedish, Dutch, French, Spanish, Polish, Norwegian, Slovenian, and Croatian so that no player is left navigating a foreign-language website.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">What We Cover</h2>
            <ul className="space-y-4 text-neutral-600 mb-12 list-disc pl-6">
              <li><strong>Club reviews</strong> — honest assessments of courts, facilities, pricing, and atmosphere</li>
              <li><strong>Beginner guides</strong> — everything from rules to racket buying advice</li>
              <li><strong>Event coverage</strong> — World Padel Tour stops, local tournaments, and club leagues</li>
              <li><strong>Gear guides</strong> — the best padel rackets, shoes, and bags tested in Marbella conditions</li>
            </ul>
          </div>
        </div>
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
