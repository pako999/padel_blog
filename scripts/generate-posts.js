#!/usr/bin/env node
/**
 * generate-posts.js
 * Reads pending keywords from keywords.json, calls Claude API,
 * writes MDX files to src/content/blog/{lang}/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const POSTS_PER_RUN = parseInt(process.env.POSTS_PER_RUN || '3', 10);
const LANGUAGE_FILTER = process.env.LANGUAGE_FILTER || '';

if (!ANTHROPIC_API_KEY) {
  console.error('❌ ANTHROPIC_API_KEY is not set');
  process.exit(1);
}

// ─── Load keywords ────────────────────────────────────────────────────────────

const keywordsPath = path.join(ROOT, 'keywords.json');
const keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));

const pending = keywords.filter(k =>
  k.status === 'pending' &&
  (!LANGUAGE_FILTER || k.lang === LANGUAGE_FILTER)
).sort((a, b) => a.priority - b.priority);

const toProcess = pending.slice(0, POSTS_PER_RUN);

if (toProcess.length === 0) {
  console.log('✅ No pending keywords to process.');
  process.exit(0);
}

console.log(`🎾 Generating ${toProcess.length} blog post(s)...`);

// ─── Language config ──────────────────────────────────────────────────────────

const LANG_CONFIG = {
  en: { name: 'English', locale: 'en_GB' },
  de: { name: 'German', locale: 'de_DE' },
  sv: { name: 'Swedish', locale: 'sv_SE' },
  nl: { name: 'Dutch', locale: 'nl_NL' },
  fr: { name: 'French', locale: 'fr_FR' },
  es: { name: 'Spanish', locale: 'es_ES' },
  pl: { name: 'Polish', locale: 'pl_PL' },
  no: { name: 'Norwegian', locale: 'nb_NO' },
};

// ─── Build prompt ─────────────────────────────────────────────────────────────

function buildPrompt(kw) {
  const langName = LANG_CONFIG[kw.lang]?.name || 'English';
  const today = new Date().toISOString().split('T')[0];

  return `You are an expert SEO content writer and padel journalist. You know Marbella deeply — its clubs, culture, expat community, and the fact that it is the birthplace of padel in Europe.

Write a 1,200-word SEO-optimized blog post in ${langName} for the following:

PRIMARY KEYWORD: "${kw.keyword}"
TARGET AUDIENCE: ${kw.audience}
CONTENT CLUSTER: ${kw.cluster}

ARTICLE STRUCTURE (follow exactly):
1. MDX frontmatter block (see format below)
2. Introduction (120 words): Open with a compelling padel fact about Marbella. Naturally include the primary keyword in the first 100 words.
3. H2: Why Marbella is Europe's padel capital (150 words) — mention the 1974 first European padel court at Marbella Club, Alfonso de Hohenlohe, 300+ sunny days.
4. H2: [Cluster-specific section — adapt based on cluster type]:
   - "club-review": Deep dive into the specific club (courts, prices, atmosphere, booking)
   - "local-commercial": Top 3 clubs comparison with practical booking info
   - "travel": How to plan a padel holiday in Marbella (when to go, where to stay near courts)
   - "educational": Step-by-step guide for the target audience
   - "local-info": Practical guide with insider tips
   - "events": Tournament calendar, how to enter, spectator tips
5. H2: Tips for ${kw.audience} (150 words)
6. H2: How to book padel courts in Marbella (100 words) — mention Playtomic, direct booking, timing tips
7. FAQ section: 4 questions in People-Also-Ask format (Q: / A: format, 50 words each answer)
8. Closing paragraph (80 words): Wrap up + soft CTA to explore more clubs on the site
9. JSON-LD LocalBusiness schema (see format below)

SEO RULES:
- Primary keyword must appear in: H1 title, first 100 words, at least one H2, meta description
- Use 2-3 semantic variants naturally throughout
- Do NOT keyword stuff
- Write like a knowledgeable local, not a robot
- Include specific club names, addresses, prices where relevant (use realistic Marbella data)

OUTPUT FORMAT — return ONLY valid MDX, nothing else before or after:

---
title: "[Compelling title with primary keyword, max 60 chars]"
description: "[150-160 char meta description with primary keyword]"
slug: "[url-friendly-slug-from-keyword]"
lang: "${kw.lang}"
publishedAt: "${today}"
updatedAt: "${today}"
keywords: ["${kw.keyword}", "[variant 1]", "[variant 2]"]
cluster: "${kw.cluster}"
audience: "${kw.audience}"
featured: false
readingTime: 6
schema: |
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "[same as title]",
    "datePublished": "${today}",
    "dateModified": "${today}",
    "author": {"@type": "Organization", "name": "Marbella Padel Guide"},
    "publisher": {"@type": "Organization", "name": "MarbellapadEL", "url": "https://marbellapadel.com"},
    "inLanguage": "${LANG_CONFIG[kw.lang]?.locale || 'en_GB'}"
  }
---

[ARTICLE CONTENT HERE — do not include the JSON-LD inline, it goes in frontmatter above]`;
}

// ─── Fetch cover image from Unsplash ─────────────────────────────────────────

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80&auto=format&fit=crop';

async function fetchCoverImage(keyword) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    console.log('  ℹ️  No UNSPLASH_ACCESS_KEY — using fallback image');
    return FALLBACK_IMAGE;
  }

  // Try specific keyword first, then fall back to "padel marbella"
  const queries = [`${keyword} padel`, 'padel court marbella', 'padel tennis court'];
  for (const q of queries) {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=5&orientation=landscape&client_id=${key}`;
      const res = await fetch(url);
      if (!res.ok) break;
      const data = await res.json();
      if (data.results?.length > 0) {
        // Pick a random one from top 5 for variety
        const pick = data.results[Math.floor(Math.random() * data.results.length)];
        console.log(`  🖼️  Image: ${pick.urls.regular.slice(0, 60)}...`);
        return pick.urls.regular;
      }
    } catch (err) {
      console.warn(`  ⚠️  Unsplash failed for "${q}":`, err.message);
    }
  }
  return FALLBACK_IMAGE;
}

// ─── Call Claude API ──────────────────────────────────────────────────────────

async function generatePost(kw) {
  const prompt = buildPrompt(kw);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

// ─── Write MDX file ───────────────────────────────────────────────────────────

function slugify(keyword) {
  return keyword
    .toLowerCase()
    .replace(/[äáà]/g, 'a').replace(/[öóò]/g, 'o').replace(/[üúù]/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function writeMdxFile(kw, content) {
  const dir = path.join(ROOT, 'src', 'content', 'blog', kw.lang);
  fs.mkdirSync(dir, { recursive: true });

  const slug = slugify(kw.keyword);
  const filePath = path.join(dir, `${slug}.mdx`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ Written: ${filePath}`);
  return filePath;
}

// ─── Update keyword status ────────────────────────────────────────────────────

function markKeywordDone(kwId, slug) {
  const updated = keywords.map(k => {
    if (k.id === kwId) {
      return { ...k, status: 'published', slug, publishedAt: new Date().toISOString() };
    }
    return k;
  });
  fs.writeFileSync(keywordsPath, JSON.stringify(updated, null, 2), 'utf8');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  for (const kw of toProcess) {
    console.log(`\n📝 Generating: "${kw.keyword}" [${kw.lang}]`);

    try {
      const [content, coverImage] = await Promise.all([
        generatePost(kw),
        fetchCoverImage(kw.keyword),
      ]);

      // Inject coverImage into the MDX frontmatter (before closing ---)
      const mdxWithImage = content.replace(
        /^(---[\s\S]*?)(---)/m,
        `$1coverImage: "${coverImage}"\n$2`
      );

      const slug = slugify(kw.keyword);
      writeMdxFile(kw, mdxWithImage);
      markKeywordDone(kw.id, slug);

      // Rate limit: wait 2s between API calls
      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ❌ Failed for keyword "${kw.keyword}":`, err.message);
    }
  }

  console.log('\n🏁 Generation complete.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
