import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourtCard from '@/components/CourtCard';
import courtsData from '../../../../data/courts.json';
import type { Court } from '@/types';

const courts = courtsData as Court[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courts.map((court) => ({ slug: court.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const court = courts.find((c) => c.slug === slug);
  if (!court) return {};
  return {
    title: court.name,
    description: court.description.slice(0, 160),
    openGraph: {
      images: [court.image],
    },
  };
}

const amenityIcons: Record<string, string> = {
  Parking: '🅿️',
  Showers: '🚿',
  Restaurant: '🍽️',
  Bar: '🍹',
  'Pro Shop': '🛒',
  'Racket Rental': '🎾',
  Physiotherapy: '🏥',
  Gym: '💪',
  'Swimming Pool': '🏊',
  Spa: '💆',
  Coaching: '👨‍🏫',
};

export default async function CourtDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const court = courts.find((c) => c.slug === slug);
  if (!court) notFound();

  const relatedCourts = courts
    .filter((c) => c.slug !== court.slug && c.area === court.area)
    .slice(0, 3);
  const fallbackRelated = courts.filter((c) => c.slug !== court.slug).slice(0, 3);
  const displayRelated = relatedCourts.length >= 1 ? relatedCourts : fallbackRelated;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: court.name,
    description: court.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: court.address,
      addressLocality: court.area,
      addressRegion: 'Málaga',
      addressCountry: 'ES',
    },
    openingHours: court.hours,
    url: court.website,
    image: court.image,
    priceRange: `€${court.priceFrom}–€${court.priceTo}`,
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Hero */}
        <section className="relative bg-navy overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={court.image}
              alt={court.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-36">
            <nav className="text-white/40 text-sm mb-6 flex gap-2">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/courts" className="hover:text-white/70 transition-colors">Courts</Link>
              <span>/</span>
              <span className="text-white/70">{court.name}</span>
            </nav>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                {court.area}
              </span>
              {court.indoor && (
                <span className="bg-teal-500/30 text-teal-200 text-xs font-medium px-3 py-1 rounded-full">
                  Indoor
                </span>
              )}
              {court.outdoor && (
                <span className="bg-green-500/30 text-green-200 text-xs font-medium px-3 py-1 rounded-full">
                  Outdoor
                </span>
              )}
              {court.featured && (
                <span className="bg-terracotta/40 text-orange-200 text-xs font-medium px-3 py-1 rounded-full">
                  ★ Featured
                </span>
              )}
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold italic text-white mb-4">
              {court.name}
            </h1>

            <div className="flex flex-wrap gap-6 text-white/80 text-sm">
              <span>{court.courts} courts</span>
              <span>€{court.priceFrom}–€{court.priceTo}/hr</span>
              <span>{court.surface}</span>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main column */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-10">
                <h2 className="font-heading text-2xl font-bold text-navy mb-4">About the Club</h2>
                <p className="text-navy/70 leading-relaxed">{court.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-10">
                <h2 className="font-heading text-2xl font-bold text-navy mb-4">Highlights</h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-navy/70">
                    <span className="text-terracotta mt-0.5">✓</span>
                    <span>{court.courts} {court.indoor && court.outdoor ? 'indoor and outdoor' : court.indoor ? 'indoor' : 'outdoor'} courts on {court.surface}</span>
                  </li>
                  <li className="flex items-start gap-3 text-navy/70">
                    <span className="text-terracotta mt-0.5">✓</span>
                    <span>Court hire from €{court.priceFrom}/hr — competitive Marbella pricing</span>
                  </li>
                  <li className="flex items-start gap-3 text-navy/70">
                    <span className="text-terracotta mt-0.5">✓</span>
                    <span>Open {court.hours}</span>
                  </li>
                  <li className="flex items-start gap-3 text-navy/70">
                    <span className="text-terracotta mt-0.5">✓</span>
                    <span>Located in {court.area}, Costa del Sol</span>
                  </li>
                </ul>
              </div>

              {/* Amenities */}
              <div className="mb-10">
                <h2 className="font-heading text-2xl font-bold text-navy mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {court.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 bg-sand-light rounded-lg px-4 py-3 text-sm text-navy/70"
                    >
                      <span>{amenityIcons[amenity] ?? '•'}</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={court.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-terracotta hover:bg-terracotta-dark text-white font-semibold px-8 py-4 rounded-md transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                >
                  Book via Playtomic
                </a>
                <a
                  href={court.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-4 rounded-md transition-all duration-200"
                >
                  Club Website
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-sand-light rounded-xl p-6 mb-6">
                <h3 className="font-heading text-lg font-bold text-navy mb-4">Club Info</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-navy/50 font-medium">Address</dt>
                    <dd className="text-navy/80 mt-0.5">{court.address}</dd>
                  </div>
                  <div>
                    <dt className="text-navy/50 font-medium">Opening Hours</dt>
                    <dd className="text-navy/80 mt-0.5">{court.hours}</dd>
                  </div>
                  <div>
                    <dt className="text-navy/50 font-medium">Price Range</dt>
                    <dd className="text-navy/80 mt-0.5">€{court.priceFrom}–€{court.priceTo} per hour</dd>
                  </div>
                  <div>
                    <dt className="text-navy/50 font-medium">Surface</dt>
                    <dd className="text-navy/80 mt-0.5">{court.surface}</dd>
                  </div>
                  <div>
                    <dt className="text-navy/50 font-medium">Courts</dt>
                    <dd className="text-navy/80 mt-0.5">{court.courts}</dd>
                  </div>
                </dl>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden mb-6 bg-navy/10 h-48 flex items-center justify-center text-navy/30 text-sm border border-navy/10">
                <div className="text-center">
                  <div className="text-2xl mb-2">📍</div>
                  <p>{court.area}</p>
                  <p className="text-xs mt-1">Map view</p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-navy rounded-xl p-6 text-white">
                <h3 className="font-heading text-lg font-bold mb-3">Book Now</h3>
                <p className="text-white/70 text-sm mb-4">
                  Secure your court online in seconds via Playtomic.
                </p>
                <a
                  href={court.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold text-sm text-center py-3 rounded-md transition-colors duration-200"
                >
                  Book on Playtomic →
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* Related courts */}
        {displayRelated.length > 0 && (
          <section className="bg-sand-light py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl font-bold text-navy mb-8">
                {relatedCourts.length > 0 ? `More Clubs in ${court.area}` : 'Other Clubs You Might Like'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayRelated.map((c) => (
                  <CourtCard key={c.slug} court={c} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
