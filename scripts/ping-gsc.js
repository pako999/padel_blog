#!/usr/bin/env node
/**
 * ping-gsc.js
 * Pings Google Search Console Indexing API for newly published posts
 * Requires a Google Service Account with Indexing API enabled
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SITE_URL = process.env.SITE_URL || 'https://marbellapadel.com';
const GSC_KEY = process.env.GSC_KEY; // JSON string of service account key

if (!GSC_KEY) {
  console.log('ℹ️  GSC_KEY not set — skipping Google Search Console ping');
  process.exit(0);
}

async function getAccessToken(serviceAccountKey) {
  const key = JSON.parse(serviceAccountKey);
  const now = Math.floor(Date.now() / 1000);

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');

  // Sign with RS256 — using Node.js crypto
  const { createSign } = await import('crypto');
  const sign = createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(key.private_key, 'base64url');

  const jwt = `${header}.${payload}.${signature}`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

async function pingUrl(url, accessToken) {
  const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      url,
      type: 'URL_UPDATED',
    }),
  });

  if (response.ok) {
    console.log(`  ✅ Pinged: ${url}`);
  } else {
    const err = await response.text();
    console.warn(`  ⚠️  Failed to ping ${url}: ${err}`);
  }
}

async function main() {
  // Find recently committed blog posts
  const blogDir = path.join(ROOT, 'src', 'content', 'blog');
  const urls = [];

  const langs = fs.readdirSync(blogDir).filter(d =>
    fs.statSync(path.join(blogDir, d)).isDirectory()
  );

  for (const lang of langs) {
    const langDir = path.join(blogDir, lang);
    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.mdx'));

    // Only ping files modified in the last 24 hours
    const recentFiles = files.filter(f => {
      const stat = fs.statSync(path.join(langDir, f));
      const ageMs = Date.now() - stat.mtimeMs;
      return ageMs < 24 * 60 * 60 * 1000;
    });

    for (const file of recentFiles) {
      const slug = file.replace('.mdx', '');
      const url = `${SITE_URL}/${lang}/blog/${slug}`;
      urls.push(url);
    }
  }

  if (urls.length === 0) {
    console.log('No recently modified files to ping.');
    return;
  }

  console.log(`\n🔔 Pinging ${urls.length} URL(s) to Google Search Console...`);

  try {
    const accessToken = await getAccessToken(GSC_KEY);

    for (const url of urls) {
      await pingUrl(url, accessToken);
      await new Promise(r => setTimeout(r, 500));
    }
  } catch (err) {
    console.error('GSC ping failed:', err.message);
  }
}

main();
