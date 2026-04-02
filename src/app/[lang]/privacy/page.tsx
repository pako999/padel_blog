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
    title: 'Privacy Policy | MarbellapadEL',
    description: 'Our privacy policy explains what data we collect, why we collect it, and how you can control it.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Advertise',
    footerTagline: 'The #1 multilingual padel guide for Marbella. Discover best clubs, book courts, and expert tips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. All rights reserved.`,
  },
  de: {
    title: 'Datenschutz | MarbellapadEL',
    description: 'Unsere Datenschutzerklärung erklärt, welche Daten wir sammeln und warum.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Werben',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle Rechte vorbehalten.`,
  },
  sv: {
    title: 'Integritetspolicy | MarbellapadEL',
    description: 'Vår integritetspolicy förklarar vilken data vi samlar in och varför.',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    navAdvertise: 'Annonsera',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alla rättigheter förbehållna.`,
  },
  nl: {
    title: 'Privacybeleid | MarbellapadEL',
    description: 'Ons privacybeleid legt uit welke gegevens we verzamelen en waarom.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Adverteren',
    footerTagline: 'De #1 meertalige padelgids voor Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rechten voorbehouden.`,
  },
  fr: {
    title: 'Politique de confidentialité | MarbellapadEL',
    description: 'Notre politique de confidentialité explique quelles données nous collectons et pourquoi.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Publicité',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Tous droits réservés.`,
  },
  es: {
    title: 'Política de Privacidad | MarbellapadEL',
    description: 'Nuestra política de privacidad explica qué datos recopilamos y por qué.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Anunciarse',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Todos los derechos reservados.`,
  },
  pl: {
    title: 'Polityka prywatności | MarbellapadEL',
    description: 'Nasza polityka prywatności wyjaśnia, jakie dane zbierame i dlaczego.',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    navAdvertise: 'Reklama',
    footerTagline: 'Wielojęzyczny przewodnik padlowy #1 dla Marbelli.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Wszelkie prawa zastrzeżone.`,
  },
  no: {
    title: 'Personvernregler | MarbellapadEL',
    description: 'Våre personvernregler forklarer hvilke data vi samler inn og hvorfor.',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    navAdvertise: 'Annonsere',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rettigheter reservert.`,
  },
  sl: {
    title: 'Pravilnik o zasebnosti | MarbellapadEL',
    description: 'Naš pravilnik o zasebnosti pojasnjuje, katere podatke zbiramo in zakaj.',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    navAdvertise: 'Oglaševanje',
    footerTagline: 'Vodič #1 za padel v večih jezikih za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Vse pravice pridržane.`,
  },
  hr: {
    title: 'Pravila privatnosti | MarbellapadEL',
    description: 'Naša pravila privatnosti objašnjavaju koje podatke prikupljamo i zašto.',
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
      canonical: `${BASE_URL}/${lang}/privacy`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/privacy`])),
        'x-default': `${BASE_URL}/en/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: Lang }> }) {
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
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-400 mb-12">
            <strong>Last updated:</strong> March 2026 · <strong>Applies to:</strong> marbellapadel.com
          </p>
          
          <div className="prose prose-neutral prose-lg prose-terracotta">
            <p className="text-xl text-neutral-600 leading-relaxed mb-12">
              MarbellapadEL ("we", "us", "our") is committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how you can control it.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">What Data We Collect</h2>
            <ul className="space-y-4 text-neutral-600 mb-8 list-disc pl-6">
              <li><strong>Automatically collected:</strong> Pages visited, browser type, device type, and country (via analytics). Language preference cookie (`preferred_lang`) — stored for 1 year.</li>
              <li><strong>Voluntarily provided:</strong> Name and email address when you contact us, or club information if you submit a listing request.</li>
            </ul>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">Cookies</h2>
            <p className="text-neutral-600 mb-8">
              We use a single functional cookie (`preferred_lang`) to remember your language choice. We do not use advertising or tracking cookies. Our analytics tool is configured to anonymise IP addresses.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">Your Rights (EU/EEA Users)</h2>
            <p className="text-neutral-600 mb-8">
              Under GDPR you have the right to access, correct, or delete your personal data. Contact us at <strong>privacy@marbellapadel.com</strong> and we will respond within 30 days.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">Third Parties</h2>
            <p className="text-neutral-600 mb-12">
              We embed images from Google Maps and Unsplash. These services may set their own cookies. We do not sell or share your personal data with third parties for marketing purposes.
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
