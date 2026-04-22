#!/usr/bin/env node
/**
 * render-assets.js — Newfold Farm Crew
 *
 * Renders SVG sources → all PNG sizes, favicon.ico, and site.webmanifest.
 * Run: npm run build:assets
 *
 * Outputs (all in assets/):
 *   og-image.png            1200×630, <300KB target
 *   favicon-32x32.png
 *   favicon-16x16.png
 *   apple-touch-icon.png    180×180
 *   android-chrome-192x192.png
 *   android-chrome-512x512.png
 *   favicon.ico             multi-res ICO
 *   site.webmanifest
 */

'use strict';

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'assets');

const OG_SOURCE  = path.join(ASSETS, 'og-source.svg');
const FAV_SOURCE = path.join(ASSETS, 'favicon-source.svg');

async function renderPng(src, dest, width, height, opts = {}) {
  const pipeline = sharp(src, { density: 300 })
    .resize(width, height, { fit: 'fill', ...opts });

  if (dest.endsWith('.png')) {
    await pipeline.png({ quality: 90, compressionLevel: 9 }).toFile(dest);
  } else {
    await pipeline.toFile(dest);
  }

  const size = fs.statSync(dest).size;
  console.log(`  ✓  ${path.basename(dest)} (${width}x${height}) — ${(size / 1024).toFixed(1)} KB`);
  return { dest, size };
}

async function main() {
  // Ensure assets dir exists
  if (!fs.existsSync(ASSETS)) fs.mkdirSync(ASSETS, { recursive: true });

  console.log('\n=== Newfold Farm Crew — Asset Pipeline ===\n');

  // --- OG image (1200×630) ---
  console.log('OG image:');
  const { size: ogSize } = await renderPng(
    OG_SOURCE,
    path.join(ASSETS, 'og-image.png'),
    1200, 630
  );
  if (ogSize > 300 * 1024) {
    console.warn(`  ⚠  og-image.png is ${(ogSize / 1024).toFixed(0)}KB — target is <300KB`);
    // Retry with palette compression
    console.log('  ↳ Retrying with PNG8 palette…');
    await sharp(OG_SOURCE, { density: 300 })
      .resize(1200, 630, { fit: 'fill' })
      .png({ quality: 80, compressionLevel: 9, palette: true })
      .toFile(path.join(ASSETS, 'og-image.png'));
    const size2 = fs.statSync(path.join(ASSETS, 'og-image.png')).size;
    console.log(`  ✓  og-image.png retried — ${(size2 / 1024).toFixed(1)} KB`);
  }

  // --- Favicon PNGs ---
  console.log('\nFavicon PNGs:');
  await renderPng(FAV_SOURCE, path.join(ASSETS, 'favicon-32x32.png'), 32, 32);
  await renderPng(FAV_SOURCE, path.join(ASSETS, 'favicon-16x16.png'), 16, 16);

  // --- Apple touch icon ---
  console.log('\nApple touch icon:');
  await renderPng(FAV_SOURCE, path.join(ASSETS, 'apple-touch-icon.png'), 180, 180);

  // --- Android chrome ---
  console.log('\nAndroid chrome icons:');
  await renderPng(FAV_SOURCE, path.join(ASSETS, 'android-chrome-192x192.png'), 192, 192);
  await renderPng(FAV_SOURCE, path.join(ASSETS, 'android-chrome-512x512.png'), 512, 512);

  // --- favicon.ico (multi-res: 16, 32) ---
  console.log('\nfavicon.ico:');
  try {
    const pngToIco = require('png-to-ico');
    const ico = await pngToIco([
      path.join(ASSETS, 'favicon-16x16.png'),
      path.join(ASSETS, 'favicon-32x32.png'),
    ]);
    fs.writeFileSync(path.join(ASSETS, 'favicon.ico'), ico);
    const icoSize = fs.statSync(path.join(ASSETS, 'favicon.ico')).size;
    console.log(`  ✓  favicon.ico — ${(icoSize / 1024).toFixed(1)} KB`);
  } catch (err) {
    // Fallback: copy 32×32 PNG as .ico (browsers accept this)
    console.warn('  ⚠  png-to-ico failed, using PNG fallback:', err.message);
    fs.copyFileSync(
      path.join(ASSETS, 'favicon-32x32.png'),
      path.join(ASSETS, 'favicon.ico')
    );
    console.log('  ✓  favicon.ico (PNG fallback)');
  }

  // --- site.webmanifest ---
  console.log('\nsite.webmanifest:');
  const manifest = {
    name: 'Newfold Farm Crew',
    short_name: 'Farm Crew',
    description: 'Camping at Newfold Farm, Edale — 1–4 May 2026',
    start_url: '/newfold-farm-crew/',
    display: 'standalone',
    background_color: '#fbf9f3',
    theme_color: '#4a7c59',
    icons: [
      { src: '/newfold-farm-crew/assets/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/newfold-farm-crew/assets/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
  fs.writeFileSync(
    path.join(ASSETS, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('  ✓  site.webmanifest');

  console.log('\n=== All assets rendered successfully ===\n');
}

main().catch(err => {
  console.error('\n✗ Asset pipeline failed:', err.message);
  process.exit(1);
});
