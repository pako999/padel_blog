'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { value: '9', label: 'clubs reviewed' },
  { value: '300+', label: 'sunny days/year' },
  { value: 'Est. 1974', label: 'padel heritage' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&q=80&auto=format&fit=crop')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/60" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 flex-1 flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow label */}
          <motion.p
            variants={itemVariants}
            className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-6"
          >
            Costa del Sol · España
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold italic text-white leading-tight mb-6"
          >
            The Best Padel Courts
            <br />
            in Marbella
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Discover and book the finest padel clubs on the Costa del Sol.
            Expert reviews, pricing, and everything you need to play your best game in the sunshine.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/courts"
              className="bg-terracotta hover:bg-terracotta-dark text-white font-semibold px-8 py-4 rounded-md transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-terracotta/30"
            >
              Explore Courts
            </Link>
            <Link
              href="/blog"
              className="border-2 border-white/60 hover:border-white text-white font-semibold px-8 py-4 rounded-md transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
            >
              Read the Blog
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-white">
                <div className="font-heading text-2xl font-bold text-sand">{stat.value}</div>
                <div className="text-xs text-white/60 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
