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
    title: 'Terms of Service | MarbellapadEL',
    description: 'Terms of service for MarbellapadEL — the multilingual padel guide for Marbella and the Costa del Sol.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Advertise',
    footerTagline: 'The #1 multilingual padel guide for Marbella. Discover best clubs, book courts, and expert tips.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. All rights reserved.`,
  },
  de: {
    title: 'Nutzungsbedingungen | MarbellapadEL',
    description: 'Nutzungsbedingungen für MarbellapadEL — der mehrsprachige Padel-Ratgeber für Marbella.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Werben',
    footerTagline: 'Der #1 mehrsprachige Padel-Ratgeber für Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle Rechte vorbehalten.`,
  },
  sv: {
    title: 'Användarvillkor | MarbellapadEL',
    description: 'Användarvillkor för MarbellapadEL — den flerspråkiga padelguiden för Marbella.',
    navBlog: 'Blogg',
    navClubs: 'Klubbar',
    navAdvertise: 'Annonsera',
    footerTagline: 'Den #1 flerspråkiga padelguiden för Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alla rättigheter förbehållna.`,
  },
  nl: {
    title: 'Gebruiksvoorwaarden | MarbellapadEL',
    description: 'Gebruiksvoorwaarden voor MarbellapadEL — de meertalige padelgids voor Marbella.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Adverteren',
    footerTagline: 'De #1 meertalige padelgids voor Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rechten voorbehouden.`,
  },
  fr: {
    title: "Conditions d'utilisation | MarbellapadEL",
    description: "Conditions d'utilisation de MarbellapadEL — le guide padel multilingue pour Marbella.",
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Publicité',
    footerTagline: 'Le guide padel multilingue #1 pour Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Tous droits réservés.`,
  },
  es: {
    title: 'Términos de servicio | MarbellapadEL',
    description: 'Términos de servicio de MarbellapadEL — la guía de pádel multilingüe para Marbella.',
    navBlog: 'Blog',
    navClubs: 'Clubs',
    navAdvertise: 'Publicidad',
    footerTagline: 'La guía de pádel multilingüe #1 para Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Todos los derechos reservados.`,
  },
  pl: {
    title: 'Regulamin | MarbellapadEL',
    description: 'Regulamin korzystania z serwisu MarbellapadEL — wielojęzyczny przewodnik po padlu w Marbelli.',
    navBlog: 'Blog',
    navClubs: 'Kluby',
    navAdvertise: 'Reklama',
    footerTagline: 'Przewodnik #1 po padlu dla Marbelli w wielu językach.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Wszelkie prawa zastrzeżone.`,
  },
  no: {
    title: 'Vilkår for bruk | MarbellapadEL',
    description: 'Vilkår for bruk av MarbellapadEL — den flerspråklige padelguiden for Marbella.',
    navBlog: 'Blogg',
    navClubs: 'Klubber',
    navAdvertise: 'Annonsér',
    footerTagline: 'Den #1 flerspråklige padelguiden for Marbella.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Alle rettigheter forbeholdt.`,
  },
  sl: {
    title: 'Pogoji uporabe | MarbellapadEL',
    description: 'Pogoji uporabe za MarbellapadEL — večjezični padelski vodnik za Marbello.',
    navBlog: 'Blog',
    navClubs: 'Klubi',
    navAdvertise: 'Oglaševanje',
    footerTagline: 'Vodič #1 za padel v več jezikih za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Vse pravice pridržane.`,
  },
  hr: {
    title: 'Uvjeti korištenja | MarbellapadEL',
    description: 'Uvjeti korištenja za MarbellapadEL — višejezični vodič za padel u Marbelli.',
    navBlog: 'Blog',
    navClubs: 'Klubovi',
    navAdvertise: 'Oglašavanje',
    footerTagline: 'Vodič #1 za padel na više jezika za Marbello.',
    footerCopyright: `© ${new Date().getFullYear()} MarbellapadEL. Sva prava pridržana.`,
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.padelmarbella.org';
  const meta = META[lang] || META.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/terms`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/terms`])),
        'x-default': `${BASE_URL}/en/terms`,
      },
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: Lang }> }) {
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
          advertise: meta.navAdvertise,
        }}
      />
      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-4 leading-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-neutral-400 mb-12">
            <strong>Last updated:</strong> April 2026 · <strong>Applies to:</strong> padelmarbella.org
          </p>

          <div className="prose prose-neutral prose-lg prose-terracotta">
            <p className="text-xl text-neutral-600 leading-relaxed mb-12">
              By accessing or using padelmarbella.org ("the Site"), you agree to these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">1. About This Site</h2>
            <p className="text-neutral-600 mb-8">
              MarbellapadEL is an independent editorial guide to padel clubs, courts, and events on the Costa del Sol. We are not affiliated with, endorsed by, or acting as a booking agent for any club listed on this site. All club information is provided for reference only.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">2. Accuracy of Information</h2>
            <p className="text-neutral-600 mb-8">
              We make every effort to ensure that club details — including court counts, pricing, opening hours, and booking links — are accurate and up to date. However, this information can change without notice. Always confirm directly with the club before visiting. We accept no liability for losses arising from inaccurate or outdated information on this site.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">3. Editorial Independence and Commercial Relationships</h2>
            <p className="text-neutral-600 mb-8">
              Some clubs on this site pay for Featured Partner placement or Sponsored Review content. All paid placements are clearly marked. Our editorial rankings and reviews are based on independent assessment of court quality, facilities, and player experience. Commercial relationships do not influence our editorial opinions.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">4. Third-Party Links</h2>
            <p className="text-neutral-600 mb-8">
              This site contains links to third-party websites including club booking platforms (Playtomic, Taykus), club websites, and equipment manufacturers. We are not responsible for the content, privacy practices, or availability of these external sites.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">5. Intellectual Property</h2>
            <p className="text-neutral-600 mb-8">
              All original editorial content on this site is the property of MarbellapadEL and may not be reproduced without written permission. Images sourced from Wikimedia Commons are used under their respective Creative Commons licences. Google Maps imagery is used under Google's terms of service.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">6. Limitation of Liability</h2>
            <p className="text-neutral-600 mb-8">
              This site is provided on an "as is" basis. MarbellapadEL makes no warranties, express or implied, regarding the completeness, accuracy, or fitness for a particular purpose of the information provided. We are not liable for any direct, indirect, or consequential damages arising from your use of the site or reliance on information contained within it.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">7. Governing Law</h2>
            <p className="text-neutral-600 mb-12">
              These terms are governed by the laws of Spain. Any disputes shall be subject to the exclusive jurisdiction of the courts of Marbella, Málaga.
            </p>

            <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">8. Contact</h2>
            <p className="text-neutral-600 mb-12">
              Questions about these terms: <strong>hello@marbellapadel.com</strong>. We aim to respond within 2 business days.
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
          copyright: meta.footerCopyright,
        }}
      />
    </>
  );
}
