import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

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
    title: 'Contact Us | MarbellapadEL',
    description: 'Have a question about padel in Marbella? Want to list your club, correct a review, or partner with us? Get in touch.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Advertise',
    footerTagline: 'The #1 multilingual padel guide for Marbella. Discover best clubs, book courts, and expert tips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. All rights reserved.`,
  },
  de: {
    title: 'Kontakt | MarbellapadEL',
    description: 'Fragen zu Padel in Marbella? Möchten Sie Ihren Club auflisten oder Partner werden? Kontaktieren Sie uns.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Werben',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle Rechte vorbehalten.`,
  },
  sv: {
    title: 'Kontakta oss | MarbellapadEL',
    description: 'Har du frågor om padel i Marbella? Vill du lista din klubb eller samarbeta med oss? Kontakta oss.',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    navAdvertise: 'Annonsera',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alla rättigheter förbehållna.`,
  },
  nl: {
    title: 'Contact | MarbellapadEL',
    description: 'Vragen over padel in Marbella? Wil je jouw club aanmelden of met ons samenwerken? Neem contact op.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Adverteren',
    footerTagline: 'De #1 meertalige padelgids voor Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rechten voorbehouden.`,
  },
  fr: {
    title: 'Contact | MarbellapadEL',
    description: 'Une question sur le padel à Marbella? Vous voulez lister votre club ou devenir partenaire? Contactez-nous.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Publicité',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Tous droits réservés.`,
  },
  es: {
    title: 'Contacto | MarbellapadEL',
    description: '¿Tienes alguna pregunta sobre el pádel en Marbella? ¿Quieres anunciar tu club? Ponte en contacto.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Anunciarse',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Todos los derechos reservados.`,
  },
  pl: {
    title: 'Kontakt | MarbellapadEL',
    description: 'Masz pytania o padel w Marbelli? Chcesz dodać swój klub lub współpracować? Skontaktuj się z nami.',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    navAdvertise: 'Reklama',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Wszelkie prawa zastrzeżone.`,
  },
  no: {
    title: 'Kontakt oss | MarbellapadEL',
    description: 'Har du spørsmål om padel i Marbella? Vil du liste klubben din eller samarbeide? Kontakt oss.',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    navAdvertise: 'Annonsere',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rettigheter reservert.`,
  },
  sl: {
    title: 'Kontakt | MarbellapadEL',
    description: 'Imate vprašanja o padlu v Marbelli? Želite uvrstiti svoj klub ali sodelovati? Stopite v stik.',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    navAdvertise: 'Oglaševanje',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Vse pravice pridržane.`,
  },
  hr: {
    title: 'Kontakt | MarbellapadEL',
    description: 'Imate pitanja o padelu u Marbelli? Želite uvrstiti svoj klub ili surađivati? Stupite u kontakt.',
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
      canonical: `${BASE_URL}/${lang}/contact`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/contact`])),
        'x-default': `${BASE_URL}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Lang }> }) {
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
            Contact MarbellapadEL
          </h1>
          
          <div className="prose prose-neutral prose-lg prose-terracotta">
            <p className="text-xl text-neutral-600 leading-relaxed mb-12">
              Have a question about padel in Marbella? Want to list your club, correct a review, or partner with us? We'd love to hear from you.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">Get in Touch</h2>
            <div className="bg-sand/30 p-8 rounded-2xl border border-sand mb-12">
              <p className="text-neutral-700 mb-6 font-medium">
                Whether you're a padel enthusiast looking for court recommendations, a club owner interested in a featured listing, or a journalist wanting to collaborate — this is the right place.
              </p>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Email us at:</span>
                  <a href="mailto:hello@marbellapadel.com" className="text-2xl font-bold text-terracotta hover:text-terracotta-dark transition-colors">
                    hello@marbellapadel.com
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Response time:</span>
                  <span className="text-neutral-600">We typically reply within 1–2 business days.</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">For Club Owners — Get Listed</h2>
            <p className="text-neutral-600 mb-8">
              MarbellapadEL attracts thousands of padel players from across Europe every month. If your club is not yet in our guide, reach out to us with your club's name, address, number of courts, and a booking link.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">Report Outdated Information</h2>
            <p className="text-neutral-600 mb-12">
              Padel clubs in Marbella open, close, and change their pricing regularly. If you notice that any club data is out of date, please let us know. We'll verify and update within 48 hours.
            </p>
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
