#!/usr/bin/env node
/**
 * translate-posts.js
 * Takes an English MDX post and translates it to TARGET_LANG
 * Preserves all frontmatter, schema, and MDX structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const TARGET_LANG = process.env.TARGET_LANG;
const SOURCE_FILES = process.env.SOURCE_FILES || '';

if (!ANTHROPIC_API_KEY || !TARGET_LANG) {
  console.error('❌ ANTHROPIC_API_KEY and TARGET_LANG must be set');
  process.exit(1);
}

const LANG_META = {
  de: { name: 'German', searchEngineNote: 'German tourists searching for padel in Marbella', culturalNote: 'Germans are the #1 tourist group in Costa del Sol. Write for someone planning a 2-week holiday.' },
  sv: { name: 'Swedish', searchEngineNote: 'Swedish padel enthusiasts — Sweden has one of the highest padel participation rates in Europe', culturalNote: 'Swedes travel to Costa del Sol in large numbers. Mention that Sweden is a top padel nation.' },
  nl: { name: 'Dutch', searchEngineNote: 'Dutch padel players looking for courts in Marbella', culturalNote: 'Netherlands had 200k+ new padel players in 2023-24. Many Dutch expats live in Marbella.' },
  fr: { name: 'French', searchEngineNote: 'French padel players and tourists visiting Marbella', culturalNote: 'France is one of the fastest-growing padel markets in Europe.' },
  es: { name: 'Spanish', searchEngineNote: 'Spanish padel players from outside Andalusia visiting Marbella', culturalNote: 'Spain is the birthplace of padel in Europe. Write with authority and local pride.' },
  pl: { name: 'Polish', searchEngineNote: 'Polish tourists discovering padel in Marbella', culturalNote: 'Poland is a growing padel market. Many Polish tourists visit Marbella.' },
  no: { name: 'Norwegian', searchEngineNote: 'Norwegian padel enthusiasts vacationing in Marbella', culturalNote: 'Norway has a fast-growing padel scene. Norwegians frequently holiday in southern Spain.' },
};

function buildTranslationPrompt(content, targetLang) {
  const meta = LANG_META[targetLang];

  return `You are a professional translator and SEO specialist who is also a padel expert.

Translate the following English MDX blog post into ${meta.name}.

TRANSLATION RULES:
1. Do NOT translate literally — adapt culturally for: ${meta.culturalNote}
2. Translate ALL text content (headings, body, FAQ questions and answers)
3. Do NOT translate: JSON-LD schema values (keep in English), URL slugs, code blocks
4. ADAPT the primary keyword naturally into ${meta.name} — find the ${meta.searchEngineNote}
5. Update the frontmatter:
   - "lang" field: change to "${targetLang}"
   - "title": translate and optimize for ${meta.name} speakers
   - "description": translate and optimize for ${meta.name} speakers
   - "keywords": translate all keywords to ${meta.name} equivalents
   - Keep "slug" as-is (URL stays the same)
   - Keep all dates as-is
6. The translation must sound natural, written by a native ${meta.name} speaker
7. Maintain all MDX structure: frontmatter, headings (H2, H3), paragraphs, FAQ format
8. Keep the same word count approximately (1,100-1,300 words)

Return ONLY the translated MDX content, nothing else.

ENGLISH SOURCE:
---
${content}
---`;
}

async function translatePost(content, targetLang) {
  const prompt = buildTranslationPrompt(content, targetLang);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4500,
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

async function main() {
  const sourceFiles = SOURCE_FILES.split(',').filter(Boolean);

  if (sourceFiles.length === 0) {
    console.log('No source files to translate.');
    process.exit(0);
  }

  for (const sourceFile of sourceFiles) {
    const filePath = path.join(ROOT, sourceFile.trim());

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}`);
      continue;
    }

    console.log(`\n🌍 Translating ${path.basename(filePath)} → ${TARGET_LANG}`);

    const content = fs.readFileSync(filePath, 'utf8');

    try {
      const translated = await translatePost(content, TARGET_LANG);

      const outputDir = path.join(ROOT, 'src', 'content', 'blog', TARGET_LANG);
      fs.mkdirSync(outputDir, { recursive: true });

      const outputFile = path.join(outputDir, path.basename(filePath));
      fs.writeFileSync(outputFile, translated, 'utf8');
      console.log(`  ✅ Saved: ${outputFile}`);

      await new Promise(r => setTimeout(r, 2000));
    } catch (err) {
      console.error(`  ❌ Translation failed:`, err.message);
    }
  }

  console.log('\n🏁 Translation run complete.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
