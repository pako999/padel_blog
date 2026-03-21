# MarbellapadEL — SEO Autopilot

The #1 multilingual padel guide for Marbella. 8 languages, autopilot blog engine, club advertising revenue model.

## Stack
- **Next.js 15** (App Router, MDX, static generation)
- **Vercel** (auto-deploy on every push)
- **GitHub Actions** (blog autopilot cron + multilingual translation)
- **Claude API** (content generation + translation)
- **Unsplash API** (free images with auto alt-text)

---

## Quick Start

```bash
git clone https://github.com/yourname/marbella-padel
cd marbella-padel
npm install
npm run dev
```

---

## GitHub Secrets Required

Go to **Settings → Secrets → Actions** and add:

| Secret | Value |
|--------|-------|
| `ANTHROPIC_API_KEY` | Your Claude API key |
| `UNSPLASH_ACCESS_KEY` | Unsplash API key (free) |
| `SITE_URL` | `https://marbellapadel.com` |
| `GSC_SERVICE_ACCOUNT_KEY` | Google Service Account JSON (optional, for GSC ping) |

---

## Autopilot Workflow

### Blog generation (daily at 06:00 UTC)
```
keywords.json → GitHub Action → Claude API → MDX commit → Vercel deploy → GSC ping
```

- Generates 3 posts/day automatically
- Reads keywords in priority order from `keywords.json`
- Marks each keyword as `published` after generation
- Triggers Vercel redeploy automatically via git push

### Multilingual translation (triggers on new EN posts)
```
New EN post committed → Translation Action → 7 language versions → Committed
```

- Runs in parallel for all 7 target languages
- Adapts culturally, not just literal translation
- Updates frontmatter with correct lang + translated keywords

### Manual generation
```bash
# Generate 5 posts now
POSTS_PER_RUN=5 ANTHROPIC_API_KEY=your-key node scripts/generate-posts.js

# Generate only German posts
LANGUAGE_FILTER=de node scripts/generate-posts.js

# Translate a specific file
TARGET_LANG=de SOURCE_FILES=src/content/blog/en/best-padel-clubs-marbella.mdx node scripts/translate-posts.js
```

---

## Adding Keywords

Edit `keywords.json` and add entries:

```json
{
  "id": 31,
  "keyword": "padel court booking marbella",
  "lang": "en",
  "cluster": "local-commercial",
  "priority": 1,
  "audience": "tourists",
  "status": "pending"
}
```

Clusters: `local-commercial`, `club-review`, `travel`, `educational`, `local-info`, `events`
Status: `pending` → `published`

---

## Revenue Model

See `OUTREACH-EMAILS.md` for the full club outreach strategy.

| Tier | Price | Target |
|------|-------|--------|
| Standard listing | €99/mo | All 9 clubs |
| Featured listing | €299/mo | NAC, Puente Romano |
| Sponsored review | €499 one-time | Luxury clubs |
| Affiliate booking | 5-15% | All clubs via Playtomic |

**Target MRR at 9 clubs:** €1,491/month

---

## URL Structure

```
marbellapadel.com/en/blog/best-padel-clubs-marbella
marbellapadel.com/de/blog/beste-padel-clubs-marbella
marbellapadel.com/sv/blog/basta-padel-marbella
marbellapadel.com/nl/blog/beste-padel-clubs-marbella
marbellapadel.com/fr/blog/meilleurs-clubs-padel-marbella
marbellapadel.com/es/blog/mejor-club-padel-marbella
marbellapadel.com/pl/blog/najlepsze-kluby-padel-marbella
marbellapadel.com/no/blog/beste-padel-klubber-marbella
```

---

## Vercel Setup

1. Import repo to Vercel
2. Framework: Next.js
3. Add env var: `NEXT_PUBLIC_SITE_URL=https://marbellapadel.com`
4. Deploy — every push auto-deploys

---

## 90-Day Target

- **Month 1:** 63 EN posts live, GSC indexed, clubs contacted
- **Month 2:** 63 posts × 7 languages = 441 pages total
- **Month 3:** First paid club listings, €500+ MRR
