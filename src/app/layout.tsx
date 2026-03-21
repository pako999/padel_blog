import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'MarbellapadEL — The Padel Guide', template: '%s | MarbellapadEL' },
  description: 'The #1 multilingual guide to padel in Marbella. Club reviews, court booking, lessons and tips in 8 languages.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
