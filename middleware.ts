import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGS = ['en', 'de', 'sv', 'nl', 'fr', 'es', 'pl', 'no', 'sl', 'hr'];
const DEFAULT_LANG = 'en';
const COOKIE_NAME = 'preferred_lang';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Country code → language code mapping
const COUNTRY_TO_LANG: Record<string, string> = {
  // Spanish-speaking
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es', VE: 'es',
  CL: 'es', EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es',
  HN: 'es', PY: 'es', SV: 'es', NI: 'es', CR: 'es', PA: 'es',
  UY: 'es', GQ: 'es',
  // German-speaking
  DE: 'de', AT: 'de', CH: 'de', LI: 'de', LU: 'de',
  // Swedish-speaking
  SE: 'sv',
  // Dutch-speaking
  NL: 'nl', BE: 'nl', SR: 'nl',
  // French-speaking
  FR: 'fr', MC: 'fr', SN: 'fr', CI: 'fr', CM: 'fr', MG: 'fr',
  // Polish
  PL: 'pl',
  // Norwegian
  NO: 'no',
  // Slovenian
  SI: 'sl',
  // Croatian
  HR: 'hr',
};

function detectLangFromAcceptHeader(header: string): string {
  // Parse Accept-Language header: "sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7"
  const langs = header
    .split(',')
    .map(part => {
      const [code, q] = part.trim().split(';q=');
      return { code: code.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1.0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of langs) {
    if (SUPPORTED_LANGS.includes(code)) return code;
  }
  return DEFAULT_LANG;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept the bare root path
  if (pathname !== '/') return NextResponse.next();

  // 1. Check if user already has a language preference cookie
  const cookieLang = request.cookies.get(COOKIE_NAME)?.value;
  if (cookieLang && SUPPORTED_LANGS.includes(cookieLang)) {
    return NextResponse.redirect(new URL(`/${cookieLang}`, request.url));
  }

  // 2. Try Vercel's geo detection (country-based)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const country = ((request as any).geo?.country ?? '').toUpperCase();
  const geoLang = COUNTRY_TO_LANG[country];
  if (geoLang) {
    const res = NextResponse.redirect(new URL(`/${geoLang}`, request.url));
    res.cookies.set(COOKIE_NAME, geoLang, { maxAge: COOKIE_MAX_AGE, path: '/' });
    return res;
  }

  // 3. Fall back to Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? '';
  const detectedLang = acceptLang ? detectLangFromAcceptHeader(acceptLang) : DEFAULT_LANG;

  const res = NextResponse.redirect(new URL(`/${detectedLang}`, request.url));
  res.cookies.set(COOKIE_NAME, detectedLang, { maxAge: COOKIE_MAX_AGE, path: '/' });
  return res;
}

export const config = {
  matcher: ['/'],
};
