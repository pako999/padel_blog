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

export const metadata: Metadata = {
  title: { default: 'Padel Marbella — Courts, Clubs & Guide', template: '%s | Padel Marbella' },
  description: 'Find the best padel courts and clubs in Marbella. Reviews, booking info, and the complete guide to padel on the Costa del Sol.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body bg-white antialiased">{children}</body>
    </html>
  );
}
