import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';
  return {
    title: 'Contact Us | MarbellapadEL',
    description: 'Have a question about padel in Marbella? Want to list your club, correct a review, or partner with us? Get in touch.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/contact`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/contact`])),
        'x-default': `${BASE_URL}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return (
    <main className="page-content" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Contact MarbellapadEL</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Have a question about padel in Marbella? Want to list your club, correct a review, or partner with us? We'd love to hear from you.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Get in Touch</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Whether you're a padel enthusiast looking for court recommendations, a club owner interested in a featured listing, or a journalist wanting to collaborate — this is the right place.
        <br/><br/>
        <strong>Email us at:</strong> <a href="mailto:hello@marbellapadel.com" style={{color: '#0066cc'}}>hello@marbellapadel.com</a>
        <br/>
        <strong>Response time:</strong> We typically reply within 1–2 business days.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>For Club Owners — Get Listed</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        MarbellapadEL attracts thousands of padel players from across Europe every month. If your club is not yet in our guide, reach out to us with your club's name, address, number of courts, and a booking link.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Report Outdated Information</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Padel clubs in Marbella open, close, and change their pricing regularly. If you notice that any club data is out of date, please let us know. We'll verify and update within 48 hours.
      </p>
    </main>
  );
}
