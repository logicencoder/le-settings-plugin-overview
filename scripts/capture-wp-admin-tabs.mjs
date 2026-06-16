#!/usr/bin/env node
/**
 * Capture LE Settings wp-admin tab screenshots for overview README.
 * Usage:
 *   WP_USER=email WP_PASS=secret node scripts/capture-wp-admin-tabs.mjs
 * Output: assets/*.png at 1920 viewport (deviceScaleFactor 2).
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'assets');
const base = 'https://logicencoder.com/wp-admin/admin.php?page=logic-encoder-settings';

const tabs = [
  ['telegram', 'tab-telegram'],
  ['protection', 'tab-protection'],
  ['seo-bots', 'tab-seo'],
  ['redirects', 'tab-redirects'],
  ['bot-log', 'tab-botlog'],
  ['visitor-log', 'tab-visitorlog'],
  ['security-log', 'tab-seclog'],
  ['debug', 'tab-debug'],
  ['status', 'tab-status'],
];

const user = process.env.WP_USER || process.env.LE_WP_USER;
const pass = process.env.WP_PASS || process.env.LE_WP_PASS;
if (!user || !pass) {
  console.error('Set WP_USER and WP_PASS (or LE_WP_USER / LE_WP_PASS).');
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
});

await page.goto('https://logicencoder.com/wp-login.php', { waitUntil: 'networkidle' });
await page.fill('#user_login', user);
await page.fill('#user_pass', pass);
await page.click('#wp-submit');
await page.waitForURL(/wp-admin/, { timeout: 60000 });

for (const [file, tabId] of tabs) {
  const url = `${base}&le_active_tab=${tabId}`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector('.le-wrap', { timeout: 30000 });
  await page.waitForTimeout(400);
  const target = path.join(outDir, `${file}.png`);
  await page.locator('.le-wrap').screenshot({ path: target });
  console.log('wrote', target);
}

await browser.close();
