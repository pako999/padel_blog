'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import LangSwitcher from '@/components/LangSwitcher';
import type { Lang } from '@/lib/blog';

interface NavbarProps {
  lang?: Lang;
  labels?: {
    blog: string;
    clubs: string;
    advertise: string;
  };
}

const defaultLabels = { blog: 'Blog', clubs: 'Clubs', advertise: 'Advertise' };

export default function Navbar({ lang = 'en', labels = defaultLabels }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${lang}/clubs`, label: labels.clubs },
    { href: `/${lang}/blog`, label: labels.blog },
    { href: `/${lang}/advertise`, label: labels.advertise },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-bottom border-black/5 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-9 h-9 lg:w-11 lg:h-11 bg-white rounded-xl shadow-sm overflow-hidden p-0.5 flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="MarbellapadEL Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span className={`text-[0.6rem] font-bold tracking-[0.2em] uppercase transition-colors ${
                scrolled || pathname !== `/${lang}` ? 'text-neutral-400' : 'text-white/60'
              }`}>
                MARBELLA
              </span>
              <span className={`font-heading text-lg lg:text-xl font-bold tracking-tight leading-none transition-colors ${
                scrolled || pathname !== `/${lang}` ? 'text-neutral-900' : 'text-white'
              }`}>
                pad<span className="text-terracotta">EL</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-terracotta'
                    : (scrolled 
                        ? 'text-neutral-600 hover:text-black' 
                        : (pathname === `/${lang}` ? 'text-white/80 hover:text-white' : 'text-neutral-600 hover:text-black'))
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-4 w-px bg-neutral-200 mx-2" />
            <LangSwitcher currentLang={lang} urlTemplate="/[lang]/blog" />
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 ${
              scrolled ? 'text-black' : (pathname === `/${lang}` ? 'text-white' : 'text-black')
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-current"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-current"
            />
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden overflow-hidden bg-white border-t border-neutral-100"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg font-bold transition-colors ${
                    pathname === link.href ? 'text-terracotta' : 'text-neutral-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-100">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Change Language</p>
                <LangSwitcher currentLang={lang} urlTemplate="/[lang]/blog" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
