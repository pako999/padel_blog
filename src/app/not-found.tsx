import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-page" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>404 — We Couldn't Find That Page</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#555' }}>
        Sorry, the page you're looking for doesn't exist or has been moved. But don't worry — Marbella's padel scene is still alive and well.
      </p>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Were You Looking for Padel in Marbella?</h2>
      <p style={{ marginBottom: '1rem' }}>Here is a quick guide to the most popular sections of this site:</p>
      
      <ul style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <li><Link href="/en/clubs" style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }}>Best Padel Clubs →</Link> - Reviews of all 9 top clubs in Marbella</li>
        <li><Link href="/en/blog/beginners-guide-padel-marbella" style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }}>Beginner's Guide →</Link> - How to start playing padel in Marbella</li>
        <li><Link href="/en/blog/padel-racket-guide-2026" style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }}>Racket Guide 2026 →</Link> - Best padel rackets tested this year</li>
        <li><Link href="/en/blog/world-padel-tour-marbella-2026" style={{ color: '#0066cc', textDecoration: 'none', fontWeight: 'bold' }}>World Padel Tour →</Link> - Upcoming WPT events in Marbella</li>
      </ul>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Find This Site in Your Language</h2>
      <p style={{ marginBottom: '1rem' }}>Don't speak English? Find the correct version for you:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
        <Link href="/en" style={{ color: '#0066cc', textDecoration: 'none' }}>🇬🇧 English</Link>
        <Link href="/de" style={{ color: '#0066cc', textDecoration: 'none' }}>🇩🇪 Deutsch</Link>
        <Link href="/sv" style={{ color: '#0066cc', textDecoration: 'none' }}>🇸🇪 Svenska</Link>
        <Link href="/nl" style={{ color: '#0066cc', textDecoration: 'none' }}>🇳🇱 Nederlands</Link>
        <Link href="/fr" style={{ color: '#0066cc', textDecoration: 'none' }}>🇫🇷 Français</Link>
        <Link href="/es" style={{ color: '#0066cc', textDecoration: 'none' }}>🇪🇸 Español</Link>
        <Link href="/pl" style={{ color: '#0066cc', textDecoration: 'none' }}>🇵🇱 Polski</Link>
        <Link href="/no" style={{ color: '#0066cc', textDecoration: 'none' }}>🇳🇴 Norsk</Link>
        <Link href="/sl" style={{ color: '#0066cc', textDecoration: 'none' }}>🇸🇮 Slovenščina</Link>
        <Link href="/hr" style={{ color: '#0066cc', textDecoration: 'none' }}>🇭🇷 Hrvatski</Link>
      </div>
    </div>
  );
}
