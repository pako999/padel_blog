import { SUPPORTED_LANGS, type Lang } from '@/lib/blog';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://marbellapadel.com';
  return {
    title: 'Privacy Policy | MarbellapadEL',
    description: 'Our privacy policy explains what data we collect, why we collect it, and how you can control it.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/privacy`,
      languages: {
        ...Object.fromEntries(SUPPORTED_LANGS.map(l => [l, `${BASE_URL}/${l}/privacy`])),
        'x-default': `${BASE_URL}/en/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  return (
    <main className="page-content" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}><strong>Last updated:</strong> March 2026 · <strong>Applies to:</strong> marbellapadel.com</p>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        MarbellapadEL ("we", "us", "our") is committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how you can control it.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>What Data We Collect</h2>
      <ul style={{ marginBottom: '1.5rem', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
        <li><strong>Automatically collected:</strong> Pages visited, browser type, device type, and country (via analytics). Language preference cookie (`preferred_lang`) — stored for 1 year.</li>
        <li><strong>Voluntarily provided:</strong> Name and email address when you contact us, or club information if you submit a listing request.</li>
      </ul>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Cookies</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        We use a single functional cookie (`preferred_lang`) to remember your language choice. We do not use advertising or tracking cookies. Our analytics tool is configured to anonymise IP addresses.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Your Rights (EU/EEA Users)</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Under GDPR you have the right to access, correct, or delete your personal data. Contact us at <strong>privacy@marbellapadel.com</strong> and we will respond within 30 days.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem' }}>Third Parties</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        We embed images from Google Maps and Unsplash. These services may set their own cookies. We do not sell or share your personal data with third parties for marketing purposes.
      </p>
    </main>
  );
}
