/** @type {import('next').NextConfig} */
const nextConfig = {
  // Support MDX files
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },

  // Internationalization — all routes under /[lang]
  // Supported locales match our 8 languages
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
