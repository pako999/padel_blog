'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Court } from '@/types';

interface CourtCardProps {
  court: Court;
}

export default function CourtCard({ court }: CourtCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(13,27,42,0.15)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={court.image}
          alt={court.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Featured badge top-left */}
        {court.featured && (
          <div className="absolute top-3 left-3 bg-terracotta text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <span>★</span>
            <span>Featured</span>
          </div>
        )}

        {/* Indoor/outdoor badges top-right */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {court.indoor && (
            <span className="bg-teal-600/90 text-white text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
              Indoor
            </span>
          )}
          {court.outdoor && (
            <span className="bg-green-600/90 text-white text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
              Outdoor
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-heading text-lg font-bold text-navy leading-tight">
            {court.name}
          </h3>
          <span className="shrink-0 bg-navy/10 text-navy text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap">
            {court.courts} courts
          </span>
        </div>

        <p className="text-sm text-navy/50 mb-3">{court.area}</p>

        {/* Price range */}
        <p className="text-terracotta font-semibold text-sm mb-3">
          €{court.priceFrom}–€{court.priceTo}/hr
        </p>

        {/* Description (2 lines) */}
        <p className="text-sm text-navy/70 line-clamp-2 mb-4 flex-1">
          {court.description}
        </p>

        {/* Footer */}
        <Link
          href={`/courts/${court.slug}`}
          className="inline-flex items-center text-terracotta font-semibold text-sm hover:text-terracotta-dark transition-colors duration-200"
        >
          View Details
          <span className="ml-1.5" aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
