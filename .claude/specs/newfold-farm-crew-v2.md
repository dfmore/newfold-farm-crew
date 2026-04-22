---
feature: newfold-farm-crew-v2
status: ready-to-implement
owner: daniel.moreira
created: 2026-04-22
target-budget: ~70 minutes
approach: REFACTOR (not rewrite) — ratified by a 3-agent debate (auditor + refactor + rewrite advocates)
skip-tdd: true  # static site, visual verification via browser
supersedes: null  # continues v1; does not replace
companion: .claude/specs/newfold-farm-crew.md (v1 canonical content spec)
references:
  - .claude/specs/the-peaks-research.md (Peaks content)
  - .claude/specs/master-camping-checklist.md (optional Kit List expansions)
---

# Newfold Farm Crew — v2 refactor

v1 shipped, pushed to GitHub Pages, works end-to-end. Audit scored HTML 8/10,
CSS 7/10, JS 8/10 — **no architectural debt**. What's broken is the
**presentation layer**: mobile cropping, overlapping hero titles, empty QR
canvas, single-scroll layout. Feature gap: no tabs. Cosmetic gap: visual
warmth on Peak cards and Getting There.

**This is a refactor, not a rewrite.** The behavioural code (bingo, squelch,
checklist, missions, memory wall wiring, OG meta) is proven and locked.
We rewrite only `index.html`, `styles.css`, and parts of `app.js` that
touch the presentation.

## Why refactor (addressing the "let's just rewrite" instinct)

The user's instinct to rewrite is understandable — they want the site to
*feel* fresh, not patched. The good news: **this plan delivers that feel
anyway.** Step 2 scraps v1's CSS entirely. Step 1 restructures the HTML
into tab panels. Only `app.js` gets patched surgically (tabs, QR fix, Kit
List drill-down). What the user *sees and touches* is effectively a
rebuild. What stays the same is the code they *don't see*: the
localStorage iteration patterns, the Fisher-Yates shuffle, the squelch
reveal logic — exactly the stuff that's easy to re-prove wrongly in a
from-scratch rewrite.

Think of it as: **"rebuild the visible layer, preserve the invisible
machinery."** The debate concluded this gets the same result in ~70 min
with lower risk than a 150-min full rewrite. Either path would leave
`text-config.js`, `assets/`, and the meta tags untouched — so the
visible difference between "refactor" and "rewrite" in this project is
minimal; the invisible difference is whether squelch/bingo/checklist
have new bugs on day one. Choose the path with fewer unknowns.

## What's LOCKED (preserve verbatim — do not touch)

These are **non-negotiable** — changing any of them regresses working
behaviour. When in doubt, `git show HEAD:<file>` and copy verbatim.

### localStorage keys (exact names, exact logic)

- Bingo: `newfold:bingo:card`, `newfold:bingo:marks` — Fisher-Yates shuffle
  from TEXT_CONFIG pool, marked-cell persistence, 9/9 triggers full-card
  banner, "Shake for a new 'un" reshuffles + clears marks
- Squelch-o-Meter: `newfold:kids:list` (array of `{id, name}`),
  `newfold:squelch:<date>:<kidId>` (1–5 welly rating)
- Checklist: `newfold:checklist:<itemId>` (boolean tick state), reset
  button clears all keys with that prefix
- Active tab (NEW in v2): `newfold:activeTab`

### Content (from v1 spec and `text-config.js`)

- All Yorkshire phrases (approved list in v1 spec — no "Howay")
- 18-item bingo pool
- 4 dated mission prompts + before/after states
- The Peaks list (Edale Circular, Grindsbrook, Mam Tor, Rambler Inn,
  Speedwell, Castleton, Chestnut Centre) — per
  `.claude/specs/the-peaks-research.md`
- Flavour snippets (Shivering Mountain, Water Valley etymology, Booths,
  fossils, Kinder Mass Trespass, 1928 mountain rescue)
- Dropbox File Request URL: `https://www.dropbox.com/request/8zhrdnjwh5h0sc3iz0ws`
- No mention of "Howay", "£117", or "tent size" anywhere

### Meta / assets (do not break)

- All 12 OG + Twitter meta tags — exact URLs, absolute not relative
- All favicon links (16, 32, 180, 192, 512) + `site.webmanifest`
- `assets/og-image.png` — the link-preview card image (already cached by
  Meta)
- `vendor/qrcode.min.js`
- `scripts/render-assets.js` + `package.json` + `package-lock.json`

## The 6-step plan (70 minutes)

### Step 1 — Tab scaffold + hero fix (15 min) · `index.html`

- Insert `<nav role="tablist" aria-label="Site sections">` with 6
  `<button role="tab" aria-selected="true|false" aria-controls="<panel-id>">`
  buttons at the top of `<body>`. Tab labels (final):
  1. 🏕️ **Home** — Hero + Today's Mission + The Plan
  2. 🗺️ **Getting There** — address, links, map, weather
  3. ⛰️ **The Peaks** — walks, pub, kid spots, flavour
  4. 🎒 **Kit List** — gear & food checklist
  5. 🎮 **Kids' Corner** — Nature Bingo + Squelch-o-Meter
  6. 📸 **Photos** — Memory Wall + Share QR
- Wrap existing sections as `<section role="tabpanel" id="panel-<slug>"
  aria-labelledby="tab-<slug>" hidden>`.
- **Fix the hero**: delete the `<img src="assets/og-source.svg" ...>`
  layered inside `#hero`. Keep the moss-green gradient only. Single
  `<h1>` + single `<p>` subhead. No other text.
- Keep the tab nav visible on all panels (sticky top on mobile, fixed top
  on desktop).

### Step 2 — Mobile-first CSS reboot (25 min) · `styles.css`

This step absorbs the biggest architectural friction — do it carefully.

- **Scrap v1 CSS entirely.** Start from zero. Don't try to patch.
- **Base: 375px-first.** Single column everywhere. Use `clamp()` on all
  headings: e.g. `font-size: clamp(1.6rem, 5.5vw, 3rem)` — 5.5vw caps at
  375px = ~20px so no cropping.
- `max-width: 100%` and `overflow-wrap: break-word` on text nodes. No
  horizontal overflow on any element at any viewport.
- **One breakpoint upward**: `@media (min-width: 720px)` for
  multi-column grids. Add a second at `(min-width: 1024px)` only if
  Peak cards need 3-across.
- **Three breakpoints total** maximum. No more.
- Tap targets: min `44px` height + width on any interactive element.
- Tab nav: horizontally scrollable via `overflow-x: auto; scrollbar-width:
  none` on mobile if it overflows. Do NOT wrap. Do NOT hamburger.
- Hero: gradient only, `min-height: 60svh` on mobile (not 100), enough to
  breathe but not dominate.

### Step 3 — Tab logic + deep-linking (15 min) · `app.js`

- Write `initTabs()`:
  - Read `newfold:activeTab` from localStorage
  - If URL has `#<slug>`, override with that
  - Default to `home`
  - Bind click handlers: on click, set `aria-selected`, reveal matching
    panel, hide others, save to localStorage, push `#<slug>` to the URL
    (via `history.replaceState` — no page reload)
- Keep existing `init*()` functions for each section. They run once; tab
  switching just toggles panel visibility.
- **Fix the QR bug while you're in `app.js`**: v1 called
  `QRCode.toCanvas()` which does not exist on the bundled lib (line ~623).
  Replace with:
  ```js
  const canvas = document.getElementById('qr-canvas');
  if (canvas && typeof QRCode !== 'undefined') {
    new QRCode(canvas, {
      text: window.location.origin + window.location.pathname,
      width: 200, height: 200,
      colorDark: '#1f2a22', colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });
  }
  ```
  Verify afterwards: inspect the canvas — it must have drawn pixels.

### Step 4 — Port behaviours + drillable Kit List (17 min) · `app.js`

Copy verbatim from v1's `app.js`. Do not improve, do not simplify, do
not rename. Just port.

- Bingo: `initBingo()`, `bingoNewCard()`, shuffle, render, mark toggle,
  full-card banner
- Squelch: `initSquelch()`, add/remove kid row, welly tap, reveal logic,
  key iteration by prefix
- Mission: `renderMission()` with date-keyed lookup + before/after states
- Memory Wall: button → `TEXT_CONFIG.memoryWall.dropboxUrl` in new tab

**Kit List — NEW drill-down UX** (replaces the flat grouped list):

The Kit List becomes **category-first, drillable**:

1. Entry state: show a grid of **7 category cards** with emoji + title +
   item-count badge (e.g. "Gear · 28 items"). Tap any card to open it.
2. Category view: show that category's items as tickboxes, plus a
   **"← All categories"** back button at top.
3. Selection persists in `newfold:kit:activeCategory` (so reload returns
   to the last-open category, or empty = grid view).
4. Tick state uses the existing `newfold:checklist:<itemId>` keys — no
   migration needed. Pre-existing ticks from v1 carry over if itemId is
   stable.
5. Category count badge updates live as items are ticked:
   `"Gear · 8 / 28"` when some are ticked, `"Gear · 28 items"` when none.
6. Reset button remains at the top of the Kit List tab — clears ALL
   checklist keys, not just current category.

**Categories** (from `.claude/specs/master-camping-checklist.md` — use the
full Trello list as the base, merged with the handwritten trip list):

| Emoji | Category | Example items |
|---|---|---|
| 🏕️ | Tent stuff | Tents, sleeping bags, mattresses, pillows, lights, hammer, gaffer tape, wind break, fairy lights |
| 🛠️ | Gear & practical | Head torch, phone charger, 1st aid kit, paracetamol, ibuprofen, powerbank, camera, knife, lighter, batteries |
| 👕 | Clothes | Base layer, waterproofs, socks, walking boots, wooly jumper, sun hat |
| 🍴 | Food | Fresh pasta, chorizo, eggs, bread, bananas, tea, milk, lager, Pringles |
| 🍳 | Kitchen | Gas stove, pans, cutlery, plates, cups, washing up liquid, grill, BBQ utensils, ziplock bags |
| 🧼 | Toiletry | Shampoo, toothbrush, toilet paper, sun cream, insect repellant, wet wipes |
| 🎮 | Kids' gear | Books, teddies, football, cricket, frisbee, kite, toy cars |

**Important:** rename Trello's "Arthur" category to "Kids' gear" — generic
works better for the group site.

The audit confirmed the behaviours (shuffle, reveal, persistence) are
clean and decoupled from DOM structure. They'll work inside tab panels
without modification.

### Step 5 — Section copy → panel content (5 min) · both

- Make sure each panel contains its existing section(s) unchanged.
- Order within the Home panel: hero → Today's Mission → The Plan.
- The Plan section: simplify each day to ONE short line + add caption
  _"Plans may evolve — check the group chat."_
- Add subtle _"Generated <date>"_ footer if useful, or skip.

### Step 6 — Visual additions + verification (8 min) · mixed

**Peak card images** (optional; include if time allows, otherwise defer):
- Source 3–4 curated Unsplash photos (Edale valley, Mam Tor, Rambler
  Inn-style pub, a cavern). Save as WebP under `assets/peaks/<slug>.webp`,
  max 100KB each, aspect-ratio 16:10.
- Modify `initPeaks()` to render an `<img>` above the card text when
  TEXT_CONFIG provides an `image` field. Fallback to no image otherwise
  (so adding images later is additive).
- Attribution line in footer: _"Peak District photos via Unsplash"_.

**Getting There map** (required):
- In the Getting There panel, add a Google Maps iframe:
  ```html
  <iframe
    src="https://www.google.com/maps?q=Newfold+Farm+Edale+S33+7ZD&output=embed"
    width="100%" height="280" style="border:0; border-radius:12px;"
    loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    aria-label="Map of Newfold Farm, Edale"
    title="Map of Newfold Farm, Edale"></iframe>
  ```
- No API key required. Keep existing Google Maps link as the primary CTA
  above or below the iframe.

**Verification smoke test:**
- `python -m http.server 8765`
- Resize DevTools to 375px width: confirm no horizontal scroll, no
  cropping, tabs scrollable
- Scan the QR with a phone camera: must resolve to live URL
- Bingo reshuffle/mark: marks persist across reload
- Squelch: add a kid, tap wellies, reload — state persists
- Checklist: tick items, reload — state persists
- Open in Chrome, Safari, Firefox (visual parity)

## Optional expansions (user opt-in after first preview)

- Add safety/health items from `.claude/specs/master-camping-checklist.md`
  to Kit List: 1st aid kit, paracetamol, ibuprofen, insect repellant,
  gaffer tape, powerbank, picnic blanket. User will pick which.
- Add _"Camera — reminder to take pictures!"_ flavour line near the
  Memory Wall button (from the Trello list).

## Acceptance criteria

### Mobile (375px width)

- [ ] No horizontal scroll on any tab
- [ ] Hero headline renders without cropping (use `clamp()` verified)
- [ ] Tab nav scrollable if it overflows; no wrapping, no hamburger
- [ ] All tap targets ≥ 44×44 px
- [ ] Hero max-height ≤ 60svh

### Desktop (≥ 1024px)

- [ ] Layout uses multi-column where it helps (Peak cards 2–3 per row,
      Getting There grid, checklist columns)
- [ ] Content centered with a max-width (~960px) so lines don't stretch

### Functional

- [ ] QR canvas draws a scannable QR (verify by scanning)
- [ ] Tabs switch without page reload, persist across reload, deep-link
      via `#hash`
- [ ] Existing localStorage behaviours (bingo, squelch, checklist) work
      identically to v1 — same keys, same semantics
- [ ] Kit List opens to a **7-category grid**; tapping a category reveals
      its items; back button returns to grid; selection persists
- [ ] Kit List category count badges update live (ticked / total)
- [ ] Google Maps iframe renders and shows Newfold Farm location
- [ ] OG image + favicons + webmanifest still load and reference
      correctly (no regression on link preview)

### Quality

- [ ] No console errors or warnings
- [ ] Lighthouse mobile: Performance > 90, Accessibility > 90
- [ ] HTML validates (W3C)
- [ ] Git: squash commit onto main, push; Pages auto-deploys

## Out of scope for v2

- Full rewrite (explicitly rejected by debate — see `audit-debate-summary`
  below)
- Any backend / accounts / shared state
- Dark mode / PWA service worker
- Analytics / tracking
- Custom domain / DNS changes
- Interactive Peak District map (iframe is enough)
- Video / audio assets
- Framework / bundler / build step (stay static HTML)

## Non-negotiables (do NOT regress)

- Do not rename or restructure `TEXT_CONFIG` in `text-config.js`
- Do not change the OG:image URL (Meta may have cached it)
- Do not introduce "Howay" or any Geordie phrase
- Do not mention tent size or price (£117)
- Do not add RSVP or WhatsApp invite link
- Do not break the `render-assets.js` pipeline

## Debate summary (provenance)

The refactor vs rewrite decision was ratified by a 3-agent adversarial
debate:

- **Auditor** (read HTML/CSS/JS end-to-end): REFACTOR; 70 min; HTML 8/10,
  CSS 7/10, JS 8/10
- **Rewrite Advocate** (steel-manned rewrite, ~150 min estimate):
  initially REWRITE; CONCEDED after seeing the locked-pattern approach
- **Refactor Advocate** (6-step plan with explicit localStorage key
  locks): REFACTOR; 70 min; risk-adjusted winner

Consensus: known friction (CSS grid guards, visible) beats unknown risk
(re-proving localStorage iteration bugs from scratch, invisible). The
70-minute refactor is safer than a 150-minute rewrite even though the
rewrite looked cleaner on paper.

## Execution handoff — context for the /make session

**You are the same `/make` session that built v1** (commits
`afd078c` → `ffd0fdd`, finished 2026-04-22 22:06, site live at
https://dfmore.github.io/newfold-farm-crew/). You pushed to
`origin/main`, ran your own smoke test, flagged a worktree cleanup on
`newfold-farm-crew-tweaks`. Pages was enabled by a parallel session
after you went idle. **The site works and is live.** 

You are now doing a **v2 refactor** on top of what you already built.
The user saw the live site, loved some things, flagged real issues:

- Mobile cropping at narrow viewports
- Hero has two overlapping title blocks (the SVG you used as hero
  background contains its own "Newfold Farm Crew · 1–4 May 2026 · Edale"
  text that collides with the HTML headline)
- QR canvas renders empty (you called `QRCode.toCanvas()` but that
  method doesn't exist on the bundled lib — the fallback didn't hide
  the empty canvas)
- Single-scroll layout feels cramped; user wants tab navigation
- Kit List needs a category-first drill-down UX (see Step 4)
- Getting There needs a small embedded map
- Peak cards could use images

**Before starting, read these files end-to-end** (in order):

1. `.claude/specs/newfold-farm-crew-v2.md` — this spec (execution plan)
2. `.claude/specs/newfold-farm-crew.md` — v1 canonical spec (content,
   voice, Yorkshire rules — all still applies)
3. `.claude/specs/the-peaks-research.md` — curated Peak content
4. `.claude/specs/master-camping-checklist.md` — the personal Trello
   master list, source for the drill-down Kit List categories
5. `TODO.md` — Dropbox URL and any pending inputs

**Start by committing to the plan**, then execute the 6 steps in order.
Work on `main` directly or a new worktree — your choice; the user's prior
worktree is still cluttering the filesystem at
`C:\Users\moreird\GitHub\newfold-farm-crew-tweaks\` (Windows file lock;
user will clear it separately — not your concern).

**Do not redo the audit or debate the approach.** Both happened in a
parallel advisory session. The refactor path is ratified. The 6 steps
are the work.

**When done**, squash-commit to main, push, and report:
- Sections retained (all 6 tabs with content)
- QR verified scannable
- Mobile clean at 375px
- Kit List drill-down flow confirmed
- Any acceptance-criteria items that slipped, and why

### Reference — the advisory session that produced this spec

The advisory session (running in parallel to your build) did the
following on the user's behalf, so you have full context without
having to run them again:

- Inspected the live site with Playwright (confirmed QR bug, hero
  collision, mobile cropping)
- Spawned a 3-agent debate team (auditor + refactor + rewrite
  advocates) which concluded REFACTOR is the right call
- Scouted Peak District content (Peak-research spec)
- Received the user's personal master camping list (master-checklist
  spec)
- Enabled GitHub Pages on the live repo
- Tested Dropbox File Request end-to-end
- Wrote this v2 spec

You don't need to repeat any of that work. Just execute.
