import Link from 'next/link';
import Image from 'next/image';
import type { Lang } from '@/lib/blog';

interface FooterProps {
  lang?: Lang;
  labels?: {
    blog: string;
    clubs: string;
    advertise: string;
    tagline: string;
    copyright: string;
  };
}

const defaultLabels = {
  blog: 'Blog',
  clubs: 'Clubs',
  advertise: 'Advertise',
  tagline: "Your guide to the best padel on the Costa del Sol.",
  copyright: `© ${new Date().getFullYear()} MarbellapadEL. All rights reserved.`,
};

export default function Footer({ lang = 'en', labels = defaultLabels }: FooterProps) {
  return (
    <footer className="bg-neutral-900 py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand and Logo */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
                <Image
                  src="/logo.png"
                  alt="MarbellapadEL Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="font-heading text-2xl font-bold text-white tracking-tight">
                Marbella<span className="text-terracotta">padEL</span>
              </span>
            </Link>
            <p className="text-neutral-400 max-w-sm text-sm leading-relaxed mb-6">
              {labels.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <nav className="flex flex-col gap-4">
              <Link href={`/${lang}/clubs`} className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">
                {labels.clubs}
              </Link>
              <Link href={`/${lang}/blog`} className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">
                {labels.blog}
              </Link>
              <Link href={`/${lang}/advertise`} className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">
                {labels.advertise}
              </Link>
            </nav>
          </div>

          {/* Language shortcuts */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Languages</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Link href="/en" className="text-neutral-400 hover:text-white transition-colors text-xs font-medium">English</Link>
              <Link href="/es" className="text-neutral-400 hover:text-white transition-colors text-xs font-medium">Español</Link>
              <Link href="/de" className="text-neutral-400 hover:text-white transition-colors text-xs font-medium">Deutsch</Link>
              <Link href="/sv" className="text-neutral-400 hover:text-white transition-colors text-xs font-medium">Svenska</Link>
              <Link href="/nl" className="text-neutral-400 hover:text-white transition-colors text-xs font-medium">Nederlands</Link>
              <Link href="/fr" className="text-neutral-400 hover:text-white transition-colors text-xs font-medium">Français</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-xs">
            {labels.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/privacy`} className="text-neutral-500 hover:text-white transition-colors text-xs">Privacy Policy</Link>
            <Link href={`/${lang}/terms`} className="text-neutral-500 hover:text-white transition-colors text-xs">Terms of Service</Link>
            <Link href={`/${lang}/contact`} className="text-neutral-500 hover:text-white transition-colors text-xs">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
