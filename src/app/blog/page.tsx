import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogClient from '@/components/BlogClient';
import postsData from '../../../data/posts.json';
import type { Post } from '@/types';

const posts = postsData as Post[];

export const metadata: Metadata = {
  title: 'Padel Blog & Guides',
  description:
    'Tips, club reviews, tournament news, and gear guides for padel players on the Costa del Sol.',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const featuredPost = posts[0];
const remainingPosts = posts.slice(1);

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section className="bg-navy py-24 pt-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-white/40 text-sm mb-6 flex gap-2">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/70">Blog</span>
            </nav>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold italic text-white mb-4">
              Padel Stories & Guides
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Club reviews, tournament news, gear guides, and tips to improve your padel game
              on the Costa del Sol.
            </p>
          </div>
        </section>

        {/* Featured post */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-terracotta text-sm font-semibold uppercase tracking-widest mb-6">
              Featured Article
            </p>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 bg-sand-light rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-64 lg:h-auto lg:min-h-80">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-terracotta text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:py-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-navy/50 mb-4">
                    <span>{formatDate(featuredPost.date)}</span>
                    <span>·</span>
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy mb-4 group-hover:text-terracotta transition-colors duration-200">
                    {featuredPost.title}
                  </h2>
                  <p className="text-navy/70 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy/50">By {featuredPost.author}</span>
                    <span className="text-terracotta font-semibold text-sm flex items-center gap-1">
                      Read more <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Remaining posts */}
        <section className="bg-sand-light">
          <BlogClient posts={remainingPosts} />
        </section>
      </main>
      <Footer />
    </>
  );
}
