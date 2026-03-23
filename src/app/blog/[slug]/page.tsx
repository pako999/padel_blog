import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import postsData from '../../../../data/posts.json';
import type { Post } from '@/types';

const posts = postsData as Post[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 800, height: 500 }],
      type: 'article',
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

const authorBios: Record<string, string> = {
  'María González':
    'María is a certified padel coach and writer based in Marbella. She has been playing padel for over 12 years and regularly competes in regional tournaments on the Costa del Sol.',
  'Carlos Ramos':
    'Carlos is a sports journalist and padel enthusiast who has reviewed over 50 clubs across Spain. He lives in Puerto Banús and plays padel four times a week.',
  'Sofía Martín':
    'Sofía covers padel tournaments and sporting events on the Costa del Sol. A former competitive tennis player, she fell in love with padel during the World Padel Tour Marbella Master.',
  'David López':
    'David is a gear specialist and former pro shop manager with deep expertise in padel equipment. He tests and reviews rackets, shoes, and accessories for players of all levels.',
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const displayRelated = relatedPosts.length >= 1 ? relatedPosts : fallbackRelated;

  const authorBio = authorBios[post.author] ?? `${post.author} is a padel writer and enthusiast based on the Costa del Sol.`;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-36">
            <nav className="text-white/40 text-sm mb-6 flex gap-2">
              <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/70 line-clamp-1">{post.title}</span>
            </nav>

            <span className="inline-block bg-terracotta text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span>By {post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </section>

        {/* Article */}
        <article className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="prose prose-lg prose-navy max-w-none
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-navy/70 prose-p:leading-relaxed prose-p:mb-5
                prose-ul:text-navy/70 prose-li:mb-1
                prose-strong:text-navy prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author bio */}
            <div className="mt-16 pt-8 border-t border-navy/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-terracotta flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-navy">{post.author}</p>
                  <p className="text-sm text-navy/60 mt-1 leading-relaxed">{authorBio}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {displayRelated.length > 0 && (
          <section className="bg-sand-light py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl font-bold text-navy mb-8">
                {relatedPosts.length > 0 ? `More in ${post.category}` : 'You Might Also Like'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayRelated.map((p) => (
                  <BlogCard key={p.slug} post={p} />
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
