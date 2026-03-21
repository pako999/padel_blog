/**
 * app/advertise/page.tsx
 * Club advertising / monetization page
 */

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise Your Padel Club | MarbellapadEL',
  description: 'List your Marbella padel club on the #1 padel guide. Reach thousands of players and tourists searching for courts every month. Featured listings from €99/month.',
};

const TIERS = [
  {
    name: 'Standard Listing',
    price: '€99',
    period: '/month',
    features: [
      'Club profile page',
      'Listed in comparison articles',
      'Booking link included',
      'Basic club details',
      'Analytics dashboard',
    ],
    cta: 'Get listed',
    highlight: false,
  },
  {
    name: 'Featured Listing',
    price: '€299',
    period: '/month',
    features: [
      'Everything in Standard',
      '"Best Club" badge on articles',
      'Top position in lists',
      'Priority in review content',
      'Booking CTA button',
      'Monthly performance report',
      'Social media mention',
    ],
    cta: 'Get featured',
    highlight: true,
  },
  {
    name: 'Sponsored Review',
    price: '€499',
    period: 'one-time',
    features: [
      '1,500-word expert review',
      'Permanent on-site article',
      'Full SEO optimization',
      'Photos + club description',
      'Translated to 2 languages',
      'Shared on social media',
    ],
    cta: 'Commission review',
    highlight: false,
  },
];

export default function AdvertisePage() {
  return (
    <main className="advertise-page">
      <section className="advertise-hero">
        <h1>Reach padel players from around the world</h1>
        <p>
          MarbellapadEL is becoming the #1 English, German, Swedish, and Dutch guide
          to padel in Marbella. Get your club in front of thousands of players
          searching for courts every month.
        </p>
        <div className="stat-row">
          <div className="stat"><strong>8</strong><span>languages</span></div>
          <div className="stat"><strong>30M+</strong><span>global padel players</span></div>
          <div className="stat"><strong>400+</strong><span>indexed articles</span></div>
        </div>
      </section>

      <section className="tiers">
        <h2>Choose your plan</h2>
        <div className="tier-grid">
          {TIERS.map(tier => (
            <div key={tier.name} className={`tier-card ${tier.highlight ? 'highlighted' : ''}`}>
              {tier.highlight && <div className="popular-badge">Most popular</div>}
              <h3>{tier.name}</h3>
              <div className="price">
                <span className="amount">{tier.price}</span>
                <span className="period">{tier.period}</span>
              </div>
              <ul>
                {tier.features.map(f => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="mailto:advertise@marbellapadel.com" className={`tier-cta ${tier.highlight ? 'primary' : 'secondary'}`}>
                {tier.cta} →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="why-advertise">
        <h2>Why advertise with us?</h2>
        <div className="reasons-grid">
          <div className="reason">
            <h3>Targeted traffic</h3>
            <p>Every visitor is actively searching for padel courts in Marbella. High purchase intent — these are players ready to book.</p>
          </div>
          <div className="reason">
            <h3>Northern European reach</h3>
            <p>German, Swedish, Dutch, and French content that no competitor has. Reach the tourists who travel to Costa del Sol most.</p>
          </div>
          <div className="reason">
            <h3>Permanent SEO value</h3>
            <p>Sponsored review articles rank permanently. Your club name appears in Google searches for years, not weeks.</p>
          </div>
          <div className="reason">
            <h3>Affiliate booking</h3>
            <p>We add direct booking links to your club. Players click through to your booking page or Playtomic listing.</p>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <h2>Ready to get listed?</h2>
        <p>Email us and we'll have your club live within 48 hours.</p>
        <a href="mailto:advertise@marbellapadel.com" className="cta-button large">
          advertise@marbellapadel.com
        </a>
        <p className="small-print">Free basic listing available for first 3 months while we grow.</p>
      </section>
    </main>
  );
}
