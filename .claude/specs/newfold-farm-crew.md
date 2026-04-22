---
feature: newfold-farm-crew
status: draft
owner: daniel.moreira
created: 2026-04-22
target-budget: ~2 hours
skip-tdd: true  # static site, visual verification via browser
---

# Newfold Farm Crew — camping trip site

A single-page static site for a Peak District camping trip at Newfold Farm Edale,
1–4 May 2026. Shared via an existing WhatsApp group chat. Light, green, easy,
Sheffield-flavoured. Built for outdoorsy families who want their phones out of
sight — so the site should work as a **prompt machine**, not a playground.

## Goals

1. Give the group a shared reference point (logistics, nearby activities, plan).
2. Gently nudge kids and adults *off* the phone and *into* the Peak District.
3. Seed a lightweight shared memory (Dropbox photo upload) without forcing
   anyone to sign up for anything.
4. Be delightful enough that the group chat screenshots it.
5. Ship in ~2 hours. Visual polish over feature breadth.

## Non-goals

- No RSVP, no guest list management, no user accounts (group chat handles this).
- No live/shared backend state for the kids' games (local-only per device).
- No interactive map / custom illustrations of hills (too expensive for v1).
- No on-site photo gallery (memory wall is a link-out to Dropbox, not an
  embedded feed).
- No custom domain in v1 (GitHub Pages default URL is fine).
- **Do not mention tent size or price anywhere.**

## Audience & constraints

- ~5–6 families, mixed ages. Adults drive, kids are the joy.
- Kids aged roughly 3–8.
- Mobile-first. Spotty signal in Edale — design for glance-and-go, not deep browsing.
- Outdoorsy vibe — phones stay in pockets. Any screen time is a liability.

## Starting point — copy from Grove

Copy these files from `C:\Users\moreird\GitHub\40th-birthday-party-grove\` as
the foundation:

- `index.html` → adapt sections
- `styles.css` → reskin to light/green palette
- `text-config.js` → rewrite content, keep pattern
- `README.md` → rewrite for this project
- `.gitignore` (if present)

**Strip out:**
- `server.js` (Grove's local dev server — not needed; just open `index.html` or use `python -m http.server`)
- All RSVP / Airtable / Google Apps Script integration (entire RSVP section + scripts folder if it's Apps-Script-specific)
- Grove-specific copy, logos, fonts that don't fit the new vibe

**Re-use:**
- The `text-config.js` centralisation pattern (everything user-facing lives there)
- Section structure in `index.html` as scaffolding
- Image-optimisation script if present (useful for hero photo later)

## Design system

### Palette (light, green, warm)

```
--bg        : #fbf9f3   /* warm off-white / cream */
--surface   : #ffffff
--ink       : #1f2a22   /* deep forest for body text */
--ink-muted : #586760
--moss      : #4a7c59   /* primary: mossy Yorkshire green */
--moss-dark : #355c42
--amber     : #d98e3a   /* accent: warm sunset for buttons / highlights */
--stone     : #c9c2b1   /* subtle dividers, card borders */
```

### Typography

- **Body**: Inter or Public Sans (clean humanist sans, widely supported)
- **Headline**: Fraunces (or Recoleta / DM Serif Display) — one warm serif for
  personality, used sparingly
- Google Fonts via `<link>`; no build step required
- Generous line-height, no tight tracking — this site should feel relaxed

### Voice

Plain, warm English **with occasional Yorkshire dialect sprinkles** — 
**curated, correct, and sparse**. Do not overdo it. Most copy stays normal.

**Approved phrases** (verified Yorkshire, not Geordie or other dialects):

- "Ey up" — hello / greeting ✅
- "Nowt" — nothing ✅
- "Owt" — anything ✅
- "Summat" — something ✅
- "Reet" — very / right ✅
- "Grand" — excellent ✅
- "Chuffed" — pleased ✅
- "Proper" — very ✅
- "Chuck" — throw / put ✅
- "Shake for a new 'un" — casual "get a new one" ✅

**Explicitly banned** (wrong region):
- "Howay" — this is **Geordie** (Newcastle), NOT Yorkshire/Sheffield. Do not
  use.

Use each phrase at most once in the site. If the copy feels twee or like it's
trying too hard, it is — dial back.

## Sections (single page, scroll order)

### 1. Hero

- Headline: "Ey up — we're off to Edale"
- Subhead: "Newfold Farm · 1–4 May 2026 · Grouse Field"
- Background: **no photograph**. Use a warm cream → moss-green gradient with
  the illustrated SVG from section 12a layered on top (same illustration
  drives the OG image + favicon — unifies the visual identity).
- No CTA (this isn't a commercial site).

### 2. Today's Mission (featured card, prominent, right under hero)

- Auto-detects the day via `new Date()` and shows that day's mission.
- Missions (editable in `text-config.js`):
  - **Fri 1 May** — "Find a Y-shaped stick."
  - **Sat 2 May** — "Build a tiny cairn by the stream."
  - **Sun 3 May** — "Spot something older than Grandad."
  - **Mon 4 May** — "Leave the pitch cleaner than we found it."
- **Before 1 May**: "Mission briefing starts Friday."
- **After 4 May**: "Mission complete. See you in the group chat."

### 3. Getting there

- Campsite: Newfold Farm Edale
- Address: (fill from newfoldfarmedale.com — Edale, Hope Valley, S33)
- Pitch: Grouse Field
- Arrival: from ~5pm Friday
- Links: campsite website, Google Maps deep link
- Optional: What3Words for the Grouse Field entrance if findable

### 4. Weather

- Headline: "Check before you pack"
- Simple link(s) to Met Office Edale forecast + BBC Weather Edale
- No live API embed (avoids API keys / runtime errors in the woods)

### 5. The Plan

Rough itinerary from the group chat (confirmed Apr 22):

- **Fri eve** — Arrive ~5pm, pitch up. **Mass pasta cookout** on Luke's double
  gas hob — fresh pasta + toms + cheese + sweetcorn, "chuck in" style for the
  group.
- **Sat** — Free day. Walks / mooching / river.
- **Sat eve** — **Pizza night** at the long table by the campsite's pizza
  oven. Adults eat + drink beer and wine. Kids play around (and don't destroy
  any saplings).
- **Sun** — Big walk day (Mam Tor ridge if weather holds).
- **Mon** — Lazy breakfast, pack up, leave clean.

### 6. The Peaks — nearby worth doing

Curated cards, each with name, 1-line description, and link. **Starter set**
(user can edit):

**Walks**
- Mam Tor ridge — 2h, great views, kid-manageable
- Kinder Scout low loop — 2–3h from Edale village
- Jacob's Ladder — classic Pennine Way start

**Pub**
- Old Nag's Head — the literal start of the Pennine Way, Edale village

**Kid-friendly**
- Chestnut Centre Wildlife Park — otters, owls
- Blue John Cavern — Castleton
- Castleton village — ice cream, river paddle

**Small flavour snippets** (not their own sections, just one-liners
interspersed):
- **Fossil tip**: "Peep at the dry stone walls — many stones hide 300-million-
  year-old crinoid fossils (little disc shapes). Free paleontology."
- **Trespass note**: "In 1932, walkers marched up Kinder Scout to claim the
  right to roam these moors. You're enjoying the dividend."

### 7. Gear & Food checklist

- Digitised from Daniel's handwritten master list (photo provided)
- Grouped sections: **Tents & Camping / Clothes / Kids / Food & Kitchen / Fun**
  (football, cricket, guitar live in Fun)
- Tick-boxes persist per device via `localStorage` (keyed
  `newfold:checklist:<itemId>`)
- "Reset list" button

**Items to include (from the photo):**

Tents & Camping: 3× tents, 3× airmats, 6× sleep bags, 3× pillows, 2× duvets,
3× lights, tent brush, mallet, pans, bowls+cups+cutlery, water carrier,
2× tables, 3× chairs, washing-up liquid, bowl for washing up, lighter, towels ×2,
tea towel

Clothes: rain ×3, puffa ×3, wellies, pants+socks, fleece ×3, t-shirts,
shorts+leggings, gloves, caps ×3, wooly hats ×3, trunks, sun cream, sunglasses

Kids: books ×3, teddies ×2, phone+charger

Food & Kitchen: fresh pasta, tinned tomatoes+corn, mozzarella, beans,
bread+marg, bananas, apples, granola, tea bags, milk, bacon, Pringles, juice
cartons, lager, coke

Fun: football, cricket, guitar

### 8. Kids' Corner — three mechanics

#### 8a. Nature Bingo

- 3×3 grid, tap a square to mark. localStorage keyed `newfold:bingo:<cardId>`.
- **Pool of items** (randomly draw 9 per card):
  - 🐑 A sheep with a black face (Swaledale)
  - 🧱 A dry stone wall
  - 💦 A proper muddy puddle
  - 🟡 Gorse flowers (yellow, smell like coconut)
  - 🌿 Cotton grass (white fluff on stalks)
  - 🪨 A trig point
  - 🚪 A kissing gate
  - 🪜 A stile
  - 🌊 A stream crossing
  - ☁️ A cloud shaped like something
  - 🦅 A bird of prey
  - 🐄 A cow (stay chill, don't get close)
  - 🌲 A tree older than you think
  - 🥾 Someone else's muddy boot
  - 🗺️ A trail signpost
  - 🏔️ Mam Tor (the big one)
  - 🔥 A real campfire
  - 🌙 The moon before bedtime
- **"Shake for a new 'un"** button — re-randomises card
- **Full card**: banner reads "Grand! Full card." + tiny celebration animation
- **Empty state**: "Nowt spotted yet — eyes peeled."
- No photo attachment (removed on purpose — keeps the phone closed).

#### 8b. Squelch-o-Meter

- **Kid names are managed on-page**, not in config. User adds/removes kids
  from the UI on arrival (because who's actually coming won't be known till
  the day).
- **Empty state**: single input field + "Add a camper" button. Copy:
  _"Add the kids once you know who's turned up."_
- **Active state**: each kid is a row with their name, five tappable welly
  icons for yesterday's rating, and a tiny ✕ to remove the row.
- Add a new camper at any time via the same input field at the bottom.
- Tap wellies to set yesterday's mud rating (1–5); tally accumulates silently.
- **Monday morning reveal**: card shows "🏆 Muddiest Camper: <name>, <N>
  welly points" — auto-computed from max tally. Only shown on/after Monday
  or when every kid has at least 3 entries.
- **Storage**:
  - `newfold:kids:list` → `[{id, name}]`
  - `newfold:squelch:<date>:<kidId>` → `1..5`

#### 8c. Today's Mission

Already surfaced at the top of the page (section 2). Don't duplicate here — in
the Kids' Corner, add a small note "See today's mission at the top ↑".

### 9. Memory Wall

- Big primary button: "📸 Chuck yer photos in here" → Dropbox File Request URL
  (user will provide — env var or text-config value)
- Subtitle: "No sign-up needed. Just pop your name and upload."
- Copy: _"Best bits, worst bits, muddiest bits. Photos and videos both
  welcome."_
- **No QR code in this section** (per user feedback — QR is for sharing the
  site, not the upload link).

### 10. Share the Site (QR code card)

- Small card near the footer: **"Share with another parent →"**
- QR code renders client-side from the site's own URL (e.g. via
  `qrcode.min.js` or the `qrious` lib — whichever is smaller)
- Text: _"Point a phone camera at this to send someone the site."_
- QR encodes `window.location.origin + window.location.pathname`.

### 11. Footer

- WhatsApp group invite link (user will supply; placeholder in `text-config.js`)
- Campsite phone / website link
- Small wink: _"Built for t' group chat."_ (Yorkshire-adjacent, low-key)
- NO "Howay" anywhere.

### 12. Link preview (Open Graph) + Favicons

**Goal:** when someone pastes the site URL into WhatsApp, iMessage, or Slack, a
rich preview card appears with the trip illustration, title, and subtitle.
**Get this right first time** — WhatsApp caches previews aggressively.

#### 12a. Creative direction

Single illustrated SVG at 1200×630. Flat, warm, light. Palette matches the
site exactly (cream `#fbf9f3`, moss `#4a7c59`, amber `#d98e3a`, deep ink
`#1f2a22`).

Elements, roughly foreground → background:
- Three small tent silhouettes in moss/amber, staggered
- A dry stone wall line (dashed or block pattern)
- Soft hill curves — foreground mossy, middle ground darker green, background
  lighter green (suggest Mam Tor + Kinder silhouettes, not literal)
- One or two cream cloud blobs in a warm cream sky
- Typography: **"Newfold Farm Crew"** in Fraunces (or fallback serif)
  + small subtitle **"1–4 May 2026 · Edale"** in Inter

No photography. Fully vector — scales cleanly for hero background reuse and
sharpens favicon crops.

#### 12b. File layout

```
assets/
  og-source.svg          # 1200×630 master
  favicon-source.svg     # simplified mark (3 tents on moss circle)
  og-image.png           # rendered, <300KB, committed
  favicon-16x16.png
  favicon-32x32.png
  favicon.ico            # multi-resolution, legacy
  apple-touch-icon.png   # 180×180
  android-chrome-192x192.png
  android-chrome-512x512.png
  site.webmanifest       # PWA manifest
scripts/
  render-assets.js       # SVG → PNG pipeline via `sharp`
```

#### 12c. Render pipeline

- Dev dep only: `sharp` (`npm i -D sharp`)
- `scripts/render-assets.js` reads both SVGs, renders all PNG sizes, writes
  `favicon.ico` via a small helper (or use `png-to-ico` dep)
- Target: `og-image.png` < 300KB (use `sharp` with quality 85 + optional
  `palette: true` for PNG8 fallback if needed)
- One command: `npm run build:assets`. Commit outputs to repo so GitHub Pages
  serves them directly (no CI needed).

#### 12d. Meta tags (required, in `<head>`, near the top)

```html
<!-- Primary meta -->
<title>Newfold Farm Crew · 1–4 May 2026</title>
<meta name="description" content="Ey up. Three days camping at Newfold Farm, Edale. Walks, pizza, muddy kids, and the odd sheep." />

<!-- Favicons -->
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
<link rel="manifest" href="/assets/site.webmanifest" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://dfmore.github.io/newfold-farm-crew/" />
<meta property="og:title" content="Newfold Farm Crew · 1–4 May 2026" />
<meta property="og:description" content="Ey up. Three days camping at Newfold Farm, Edale. Walks, pizza, muddy kids, and the odd sheep." />
<meta property="og:image" content="https://dfmore.github.io/newfold-farm-crew/assets/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Newfold Farm Crew · 1–4 May 2026" />
<meta name="twitter:description" content="Ey up. Three days camping at Newfold Farm, Edale. Walks, pizza, muddy kids, and the odd sheep." />
<meta name="twitter:image" content="https://dfmore.github.io/newfold-farm-crew/assets/og-image.png" />
```

If the site lands on a custom domain later, replace the URLs everywhere (the
`og:image` and `og:url` values must be **absolute** — WhatsApp drops relative
paths silently).

#### 12e. Acceptance — link preview smoke test

Before declaring done, verify:

1. Pass the deployed URL through the **Facebook Sharing Debugger**
   (https://developers.facebook.com/tools/debug/) — should show title,
   description, and 1200×630 image with no errors. "Scrape Again" if it
   caches a stale version.
2. Pass through **Twitter Card Validator**
   (https://cards-dev.twitter.com/validator) if accessible.
3. Paste into a WhatsApp Web chat with yourself as a final check. Rich card
   should render with the illustration.
4. Tab icon visible in Chrome and Safari.
5. Safari "Add to Home Screen" uses the `apple-touch-icon.png`.

**If the WhatsApp preview is broken or stale**, the cache-buster trick:
append `?v=2` (or any query param) to the pasted URL once — that forces a
fresh fetch. Fix the underlying issue first so you don't burn through
`?v=N`.

## Deployment

- GitHub Pages from `main` branch root
- No custom domain for v1
- Add a deploy note to README: push to `main` → Pages publishes in ~2 min
- Initial commit should land on a new repo `dfmore/newfold-farm-crew` (user
  creates the remote; /make handles local init)

## Acceptance criteria — what "done" looks like

### Functional
- [ ] `index.html` renders all 11 sections in order (plus section 12 meta
      tags in `<head>`)
- [ ] All copy reads from `text-config.js` (no strings hard-coded in HTML)
- [ ] Today's Mission switches correctly based on the local date (manually
      verify by temporarily overriding `Date.now()` in devtools)
- [ ] Nature Bingo randomises 9 squares from the 18-item pool; tap toggles
      mark; full-card banner appears when all 9 are marked
- [ ] "Shake for a new 'un" re-randomises and clears previous marks
- [ ] Squelch-o-Meter writes + reads from localStorage; Monday reveal shows
      the max-total kid
- [ ] Checklist tick state persists on reload
- [ ] Memory Wall button opens the Dropbox URL in a new tab
- [ ] QR code renders and decodes to the site URL (verify by scanning with a
      phone camera)

### Visual
- [ ] Mobile-first: looks great on an iPhone SE width (375px) and an iPhone
      15 Pro width (393px)
- [ ] Colour palette matches spec; no leftover Grove dark theme bleeding
      through
- [ ] Yorkshire phrases are sparse (≤ one per section) and spelled correctly
- [ ] No mention of tent size, tent price, or £117 anywhere
- [ ] Hero works even without a background image (gradient fallback)

### Quality gates
- [ ] HTML validates (W3C validator)
- [ ] Runs via `python -m http.server 8000` with no console errors
- [ ] Lighthouse Performance > 90, Accessibility > 90 on mobile
- [ ] `og-image.png` is 1200×630 and < 300KB
- [ ] Facebook Sharing Debugger shows a valid preview card for the deployed
      URL
- [ ] WhatsApp Web smoke test: pasting the URL in a self-chat renders a rich
      preview with the illustration

## Open items — user parallel tasks

These are inputs the build needs but only the user can provide. Capture them
in TODO.md at the project root so /make can pick them up as they land.

1. **Dropbox File Request URL** — for Memory Wall button (only hard blocker)
2. **WhatsApp group invite link** — for footer (optional; only needed if the
   site might be shared outside the existing group)
3. ~~Hero image~~ — not needed. Illustrated SVG drives the hero.
4. ~~Kids' names~~ — managed inline in the site UI. No config input required.
5. **Confirm / tweak itinerary** — rough day-by-day plan (after first preview)
6. **Confirm / tweak "The Peaks" list** — user will review after first preview
7. **Review bingo items + missions** — user will review after first preview

## Out of scope for v1 (explicit parking lot)

- Live shared photo gallery
- Custom domain
- Interactive Peak District map with pins
- Fossil hunter standalone page
- Sheep Spotter mini-game
- Name-the-Hill illustrated panorama
- Trespasser's Trail full page
- Any backend (Airtable, Cloudflare Worker, Apps Script)
- Dark mode
- Internationalisation (site is English-only, Yorkshire-flavoured)
