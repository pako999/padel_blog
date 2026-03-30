import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';
  return {
    title: 'Thank You | MarbellapadEL',
    description: 'Thanks for contacting us at MarbellapadEL.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/thank-you`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/thank-you`])),
        'x-default': `${BASE_URL}/en/thank-you`,
      },
    },
  };
}

export default async function ThankYouPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return (
    <main className="page-content" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Thank You!</h1>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
        Your message has been received. A member of the MarbellapadEL team will get back to you within 1–2 business days.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>While You Wait — Explore Marbella Padel</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        We've put together the most useful guides to help you plan your padel in Marbella:
      </p>

      <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Top Clubs</h3>
      <ul style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
        <li><Link href={`/${lang}/clubs/nac-nueva-alcantara`} style={{ color: '#0066cc', textDecoration: 'none' }}>NAC Nueva Alcántara</Link> — World's best padel club 2024 & 2025</li>
        <li><Link href={`/${lang}/clubs/puente-romano`} style={{ color: '#0066cc', textDecoration: 'none' }}>Puente Romano Beach Resort</Link> — Luxury resort padel on the Golden Mile</li>
        <li><Link href={`/${lang}/clubs/real-club-padel-marbella`} style={{ color: '#0066cc', textDecoration: 'none' }}>Real Club Padel Marbella</Link> — The historic heart of Marbella padel</li>
      </ul>

      <h3 style={{ fontSize: '1.3rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Essential Reading</h3>
      <ul style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
        <li><Link href={`/${lang}/blog/beginners-guide-padel-marbella`} style={{ color: '#0066cc', textDecoration: 'none' }}>Beginner's Guide to Padel in Marbella</Link> — Start here if you're new to the sport</li>
        <li><Link href={`/${lang}/blog/padel-racket-guide-2026`} style={{ color: '#0066cc', textDecoration: 'none' }}>Best Padel Rackets 2026</Link> — Find the right racket for your level</li>
        <li><Link href={`/${lang}/blog/world-padel-tour-marbella-2026`} style={{ color: '#0066cc', textDecoration: 'none' }}>World Padel Tour Marbella 2026</Link> — Watch the pros live</li>
      </ul>
      
      <div style={{ marginTop: '3rem' }}>
        <Link href={`/${lang}`} style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#000', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          &larr; Return to Homepage
        </Link>
      </div>
    </main>
  );
}
