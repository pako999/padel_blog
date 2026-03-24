import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourtsClient from '@/components/CourtsClient';
import courtsData from '../../../data/courts.json';
import type { Court } from '@/types';

const courts = courtsData as Court[];

export const metadata: Metadata = {
  title: 'Find Padel Courts in Marbella — 12 Clubs Reviewed',
  description: 'Browse all 12 padel clubs in Marbella and the Costa del Sol. Compare facilities, prices and locations. Filter by area and book instantly via Playtomic.',
  openGraph: {
    title: 'Find Padel Courts in Marbella — 12 Clubs Reviewed | Padel Marbella',
    description: 'Browse all 12 padel clubs in Marbella. Compare facilities, prices and locations.',
    images: [{ url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://padel-blog.vercel.app/courts' },
};

export default function CourtsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section className="bg-navy py-24 pt-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="text-white/40 text-sm mb-6 flex gap-2">
              <a href="/" className="hover:text-white/70 transition-colors">Home</a>
              <span>/</span>
              <span className="text-white/70">Courts</span>
            </nav>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold italic text-white mb-4">
              Find Your Court
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Browse all {courts.length} padel clubs on the Costa del Sol. Compare facilities,
              prices, and locations to find the perfect court for your game.
            </p>
          </div>
        </section>

        <CourtsClient courts={courts} />
      </main>
      <Footer />
    </>
  );
}
