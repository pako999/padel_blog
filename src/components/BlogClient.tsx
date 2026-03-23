'use client';

import { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { Post } from '@/types';
import FilterBar from './FilterBar';
import BlogCard from './BlogCard';

interface BlogClientProps {
  posts: Post[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function BlogClient({ posts }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState('');

  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category))).sort(),
    [posts]
  );

  const filtered = useMemo(
    () => (!activeCategory ? posts : posts.filter((p) => p.category === activeCategory)),
    [posts, activeCategory]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filter bar */}
      <div className="mb-6">
        <FilterBar options={categories} activeFilter={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Post count */}
      <p className="text-sm text-navy/50 mb-8">
        Showing {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        {activeCategory ? ` in ${activeCategory}` : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-navy/40">
          <p className="text-lg font-medium">No articles found</p>
          <p className="text-sm mt-1">Try selecting a different category</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((post) => (
            <motion.div key={post.slug} variants={itemVariants} className="flex">
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
