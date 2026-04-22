# Newfold Farm Crew

Static site for the Peak District camping trip at Newfold Farm, Edale — 1–4 May 2026.

Shared via WhatsApp. Mobile-first. Light, green, warm.

## Edit content

All user-facing text lives in **`text-config.js`** — edit that file, not `index.html`.

Key items to update:
- `memoryWall.dropboxUrl` — paste your Dropbox File Request URL when ready.

## Development

Open `index.html` directly in a browser, or serve locally:

```
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Build assets (favicons + OG image)

```
npm install
npm run build:assets
```

This renders `assets/og-source.svg` and `assets/favicon-source.svg` into all required PNG/ICO formats and writes `assets/site.webmanifest`.

## Deployment

GitHub Pages from the `main` branch root. Push to `main` → Pages publishes in ~2 minutes.

The deployed URL is: `https://dfmore.github.io/newfold-farm-crew/`

To set up GitHub Pages on a new repo:
1. Push this code to `dfmore/newfold-farm-crew`.
2. Go to **Settings → Pages → Source: Deploy from branch → Branch: main / root**.
3. Wait ~2 min, then paste the URL into WhatsApp.

## File structure

```
index.html          Main page (single-page scroll)
styles.css          All styles — light/green palette
text-config.js      All copy — edit here only
app.js              Interactive JS (bingo, squelch, checklist, QR)
assets/             SVG sources + rendered PNGs/ICO/manifest
scripts/            Build scripts (sharp-based asset pipeline)
vendor/             Client-side QR library (offline-reliable)
```
