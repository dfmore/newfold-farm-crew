/**
 * fetch-peak-images.js
 * Downloads 5 Wikimedia Commons originals, resizes to 640px + 1280px JPGs,
 * writes them to assets/peaks/, and generates CREDITS.md.
 *
 * Run via: npm run fetch:images
 */

'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'peaks');

const manifest = [
  {
    slug: 'vale-of-edale',
    commonsFilename: 'Vale_of_Edale_from_Hollins_Cross.jpg',
    creditAuthor: 'Donnchadh H',
    creditLicense: 'CC BY 2.0',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Vale_of_Edale_from_Hollins_Cross.jpg',
  },
  {
    slug: 'grindsbrook-clough',
    commonsFilename: 'Grindsbrook_Clough_-_geograph.org.uk_-_1898755.jpg',
    creditAuthor: 'Jonathan Clitheroe',
    creditLicense: 'CC BY-SA 2.0',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Grindsbrook_Clough_-_geograph.org.uk_-_1898755.jpg',
  },
  {
    slug: 'mam-tor',
    commonsFilename: 'Mam_Tor_Castleton.jpg',
    creditAuthor: 'Rob Bendall (Highfields)',
    creditLicense: 'Attribution',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Mam_Tor_Castleton.jpg',
  },
  {
    slug: 'speedwell-cavern',
    commonsFilename: 'Castleton,_Entrance_to_Speedwell_Cavern_-_geograph.org.uk_-_3989703.jpg',
    creditAuthor: 'David Dixon',
    creditLicense: 'CC BY-SA 2.0',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Castleton,_Entrance_to_Speedwell_Cavern_-_geograph.org.uk_-_3989703.jpg',
  },
  {
    slug: 'castleton-village',
    commonsFilename: 'Castleton,_Derbyshire_-_geograph.org.uk_-_682874.jpg',
    creditAuthor: 'Phillip Perry',
    creditLicense: 'CC BY-SA 2.0',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Castleton,_Derbyshire_-_geograph.org.uk_-_682874.jpg',
  },
];

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function processEntry(entry) {
  const apiUrl =
    'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=File:' +
    encodeURIComponent(entry.commonsFilename);

  console.log(`[${entry.slug}] Querying Commons API…`);
  const apiRes = await fetch(apiUrl);
  const apiData = await apiRes.json();
  const page = Object.values(apiData.query.pages)[0];
  const originalUrl = page.imageinfo[0].url;

  console.log(`[${entry.slug}] Downloading original from ${originalUrl}`);
  const buf = await downloadBuffer(originalUrl);

  // Produce 640px and 1280px wide JPGs
  const sizes = [
    { suffix: '640', width: 640, quality: 82 },
    { suffix: '1280', width: 1280, quality: 85 },
  ];

  for (const { suffix, width, quality } of sizes) {
    const outFile = path.join(OUT_DIR, `${entry.slug}-${suffix}.jpg`);
    await sharp(buf)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality })
      .toFile(outFile);

    const stats = fs.statSync(outFile);
    const kb = Math.round(stats.size / 1024);
    const warn = kb > 300 ? ' ⚠️  EXCEEDS 300KB' : '';
    console.log(`  → ${path.basename(outFile)} (${kb} KB)${warn}`);
  }
}

async function writeCreditsMd(entries) {
  const rows = entries.map(e =>
    `| \`${e.slug}-640.jpg\` / \`${e.slug}-1280.jpg\` | ${e.creditAuthor} | ${e.creditLicense} | [Commons](${e.creditUrl}) |`
  );

  const md = [
    '# Peak Image Credits',
    '',
    'All images sourced from Wikimedia Commons. Attributions required by license.',
    '',
    '| File | Photographer | License | Source |',
    '|------|-------------|---------|--------|',
    ...rows,
    '',
  ].join('\n');

  const creditsPath = path.join(OUT_DIR, 'CREDITS.md');
  fs.writeFileSync(creditsPath, md, 'utf8');
  console.log(`\nCredits written to ${creditsPath}`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const entry of manifest) {
    await processEntry(entry);
  }

  await writeCreditsMd(manifest);
  console.log('\nDone.');
}

main().catch(err => {
  console.error('fetch-peak-images failed:', err);
  process.exit(1);
});
