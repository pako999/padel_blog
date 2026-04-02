import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { Metadata } from 'next';
import Link from 'next/link';
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
    title: 'Thank You | MarbellapadEL',
    description: 'Thanks for contacting us at MarbellapadEL.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Advertise',
    footerTagline: 'The #1 multilingual padel guide for Marbella. Discover best clubs, book courts, and expert tips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. All rights reserved.`,
  },
  de: {
    title: 'Vielen Dank | MarbellapadEL',
    description: 'Vielen Dank für Ihre Nachricht an MarbellapadEL.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Werben',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle Rechte vorbehalten.`,
  },
  sv: {
    title: 'Tack | MarbellapadEL',
    description: 'Tack för att du kontaktar oss på MarbellapadEL.',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    navAdvertise: 'Annonsera',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alla rättigheter förbehållna.`,
  },
  nl: {
    title: 'Bedankt | MarbellapadEL',
    description: 'Bedankt voor uw bericht aan MarbellapadEL.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Adverteren',
    footerTagline: 'De #1 meertalige padelgids voor Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rechten voorbehouden.`,
  },
  fr: {
    title: 'Merci | MarbellapadEL',
    description: 'Merci de nous avoir contactés chez MarbellapadEL.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Publicité',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Tous droits réservés.`,
  },
  es: {
    title: 'Gracias | MarbellapadEL',
    description: 'Gracias por ponerte en contacto con nosotros en MarbellapadEL.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Anunciarse',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Todos los derechos reservados.`,
  },
  pl: {
    title: 'Dziękujemy | MarbellapadEL',
    description: 'Dziękujemy za kontakt z MarbellapadEL.',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    navAdvertise: 'Reklama',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Wszelkie prawa zastrzeżone.`,
  },
  no: {
    title: 'Takk | MarbellapadEL',
    description: 'Takk for att du kontakter oss på MarbellapadEL.',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    navAdvertise: 'Annonsere',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rettigheter reservert.`,
  },
  sl: {
    title: 'Hvala | MarbellapadEL',
    description: 'Hvala, ker ste stopili v stik z nami.',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    navAdvertise: 'Oglaševanje',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Vse pravice pridržane.`,
  },
  hr: {
    title: 'Hvala | MarbellapadEL',
    description: 'Hvala što ste stupili u kontakt s nama.',
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
      canonical: `${BASE_URL}/${lang}/thank-you`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/thank-you`])),
        'x-default': `${BASE_URL}/en/thank-you`,
      },
    },
  };
}

export default async function ThankYouPage({ params }: { params: Promise<{ lang: Lang }> }) {
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
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-terracotta/10 text-terracotta rounded-full mb-8">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-6 leading-tight">
            Thank You!
          </h1>
          
          <p className="text-xl text-neutral-600 leading-relaxed mb-12">
            Your message has been received. A member of the MarbellapadEL team will get back to you within 1–2 business days.
          </p>

          <div className="bg-neutral-50 p-8 md:p-12 rounded-3xl border border-neutral-100 text-left">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">While You Wait — Explore Marbella Padel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4 text-left">Top Clubs</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href={`/${lang}/clubs/nac-nueva-alcantara`} className="group flex flex-col">
                      <span className="font-bold text-neutral-900 group-hover:text-terracotta transition-colors">NAC Nueva Alcántara</span>
                      <span className="text-sm text-neutral-500">World's best padel club 2024 & 2025</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/clubs/puente-romano`} className="group flex flex-col">
                      <span className="font-bold text-neutral-900 group-hover:text-terracotta transition-colors">Puente Romano Resort</span>
                      <span className="text-sm text-neutral-500">Luxury resort padel on the Golden Mile</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4 text-left">Latest Guides</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href={`/${lang}/blog/beginners-guide-padel-marbella`} className="group flex flex-col">
                      <span className="font-bold text-neutral-900 group-hover:text-terracotta transition-colors text-left">Beginner's Guide</span>
                      <span className="text-sm text-neutral-500 text-left">Everything you need to start playing</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/blog/padel-racket-guide-2026`} className="group flex flex-col">
                      <span className="font-bold text-neutral-900 group-hover:text-terracotta transition-colors text-left">Best Rackets 2026</span>
                      <span className="text-sm text-neutral-500 text-left">Find the right gear for your level</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Link href={`/${lang}`} className="btn-primary">
              &larr; Return to Homepage
            </Link>
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
