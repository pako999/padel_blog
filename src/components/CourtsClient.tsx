'use client';

import { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { Court } from '@/types';
import SearchInput from './SearchInput';
import FilterBar from './FilterBar';
import CourtCard from './CourtCard';

interface CourtsClientProps {
  courts: Court[];
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

export default function CourtsClient({ courts }: CourtsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArea, setActiveArea] = useState('');

  const areas = useMemo(
    () => Array.from(new Set(courts.map((c) => c.area))).sort(),
    [courts]
  );

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return courts.filter((court) => {
      const matchesSearch =
        !query ||
        court.name.toLowerCase().includes(query) ||
        court.area.toLowerCase().includes(query) ||
        court.description.toLowerCase().includes(query);
      const matchesArea = !activeArea || court.area === activeArea;
      return matchesSearch && matchesArea;
    });
  }, [courts, searchQuery, activeArea]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search clubs by name or area…"
          />
        </div>
      </div>

      <div className="mb-8">
        <FilterBar options={areas} activeFilter={activeArea} onChange={setActiveArea} />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-navy/40">
          <p className="text-lg font-medium">No courts found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((court) => (
            <motion.div key={court.slug} variants={itemVariants}>
              <CourtCard court={court} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
