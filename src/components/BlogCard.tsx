'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Post } from '@/types';

interface BlogCardProps {
  post: Post;
}

const categoryColors: Record<string, string> = {
  'Tips & Tricks': 'bg-blue-600',
  'Events': 'bg-terracotta',
  'Club Reviews': 'bg-navy',
  'Gear': 'bg-green-600',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogCard({ post }: BlogCardProps) {
  const colorClass = categoryColors[post.category] ?? 'bg-navy';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-52 w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category chip */}
        <div className={`absolute top-3 left-3 ${colorClass} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-navy/50 mb-3">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime} min read</span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-navy leading-snug mb-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-navy/70 line-clamp-2 flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-navy/50">{post.author}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="text-terracotta font-semibold text-sm hover:text-terracotta-dark transition-colors duration-200 flex items-center gap-1"
          >
            Read more
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
