import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CourtCard from '@/components/CourtCard';
import BlogCard from '@/components/BlogCard';
import courtsData from '../../data/courts.json';
import postsData from '../../data/posts.json';
import type { Court } from '@/types';
import type { Post } from '@/types';

export const metadata: Metadata = {
  title: 'Best Padel Courts in Marbella 2026 | Padel Marbella',
  description: 'Find and book the best padel courts in Marbella. 12 clubs reviewed with real photos, prices, and direct booking links. The complete Costa del Sol padel guide.',
  alternates: { canonical: 'https://padel-blog.vercel.app' },
};

const courts = courtsData as Court[];
const posts = postsData as Post[];

const featuredCourts = courts.filter((c) => c.featured);
const latestPosts = posts.slice(0, 3);

const pageStats = [
  { value: '12', label: 'Clubs', sublabel: 'reviewed & rated' },
  { value: '300+', label: 'Sunny Days', sublabel: 'per year' },
  { value: '€10/hr', label: 'From', sublabel: 'court hire price' },
  { value: '7', label: 'Areas', sublabel: 'covered on the Costa' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <HeroSection />

        {/* Featured Courts */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-terracotta text-sm font-semibold uppercase tracking-widest mb-2">
                  Hand-picked
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
                  Featured Clubs
                </h2>
              </div>
              <Link
                href="/courts"
                className="text-terracotta font-semibold text-sm hover:text-terracotta-dark transition-colors duration-200 flex items-center gap-1 shrink-0 ml-4"
              >
                View all <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourts.map((court) => (
                <CourtCard key={court.slug} court={court} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-navy py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {pageStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-4xl font-bold text-sand mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white font-semibold text-sm">{stat.label}</div>
                  <div className="text-white/50 text-xs mt-0.5">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts */}
        <section className="bg-sand-light py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-terracotta text-sm font-semibold uppercase tracking-widest mb-2">
                  Stories & Guides
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
                  Latest from the Blog
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-terracotta font-semibold text-sm hover:text-terracotta-dark transition-colors duration-200 flex items-center gap-1 shrink-0 ml-4"
              >
                View all <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Advertise CTA */}
        <section className="bg-terracotta py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
              List Your Club
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Reach thousands of padel players visiting Marbella each year. Get your club featured
              on the Costa del Sol's most trusted padel directory.
            </p>
            <Link
              href="/advertise"
              className="inline-block bg-white text-terracotta font-bold px-10 py-4 rounded-md hover:bg-sand-light transition-colors duration-200 shadow-lg"
            >
              Get Listed Today
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
