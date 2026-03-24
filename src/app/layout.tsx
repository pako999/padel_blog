import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://padel-blog.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Best Padel Courts in Marbella 2026 | Padel Marbella',
    template: '%s | Padel Marbella',
  },
  description: 'Find and book the best padel courts and clubs in Marbella. 12 clubs reviewed with prices, photos and direct booking links. Costa del Sol padel guide.',
  keywords: ['padel Marbella', 'padel courts Marbella', 'best padel clubs Marbella', 'Costa del Sol padel'],
  openGraph: {
    type: 'website',
    siteName: 'Padel Marbella',
    title: 'Best Padel Courts in Marbella 2026 | Padel Marbella',
    description: 'Find and book the best padel courts in Marbella. 12 clubs reviewed with prices, photos and booking links.',
    images: [{ url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80', width: 1200, height: 630, alt: 'Padel courts Marbella Costa del Sol' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Padel Courts in Marbella 2026',
    description: 'Find and book the best padel courts in Marbella. 12 clubs reviewed.',
    images: ['https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80'],
  },
  alternates: {
    canonical: BASE,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-white antialiased">{children}</body>
    </html>
  );
}
