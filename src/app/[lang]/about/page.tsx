import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';
  return {
    title: 'About MarbellapadEL — The Multilingual Padel Authority',
    description: 'Learn who we are, why we built MarbellapadEL, and how our team of local writers covers padel in Marbella.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/about`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/about`])),
        'x-default': `${BASE_URL}/en/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return (
    <main className="page-content" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About MarbellapadEL</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        MarbellapadEL is the #1 multilingual padel guide dedicated to Marbella and the Costa del Sol. We were built by padel players, for padel players — with one simple goal: help every European traveller find the perfect court, club, or lesson in Marbella, no matter what language they speak.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Who We Are</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Our team is made up of resident players, club reviewers, and padel coaches who live and breathe padel on the Costa del Sol. Every club listed on this site has been personally visited. Every review reflects real court time — not a press release or a paid placement.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Why 10 Languages?</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Marbella is genuinely pan-European. On any given weekend you'll find Swedish families booking courts at NAC, Dutch couples playing at Puente Romano, and Polish groups discovering Real Club Padel Marbella for the first time. We publish every guide in English, German, Swedish, Dutch, French, Spanish, Polish, Norwegian, Slovenian, and Croatian so that no player is left navigating a foreign-language website.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>What We Cover</h2>
      <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
        <li><strong>Club reviews</strong> — honest assessments of courts, facilities, pricing, and atmosphere</li>
        <li><strong>Beginner guides</strong> — everything from rules to racket buying advice</li>
        <li><strong>Event coverage</strong> — World Padel Tour stops, local tournaments, and club leagues</li>
        <li><strong>Gear guides</strong> — the best padel rackets, shoes, and bags tested in Marbella conditions</li>
      </ul>
    </main>
  );
}
