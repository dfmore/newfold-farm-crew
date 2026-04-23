---
feature: newfold-farm-crew-v4
status: ready-to-implement
owner: daniel.moreira
created: 2026-04-23
target-budget: ~75 minutes
approach: holistic polish + two content follow-ups bundled in
skip-tdd: true
supersedes: null
companion: .claude/specs/newfold-farm-crew-v3.md (v3 shipped at commit 058e593, live)
references:
  - .claude/specs/v3-followups.md (Kit List generalise + Peak images — bundled into v4)
  - .claude/specs/newfold-farm-crew-v4-ideas.md (earlier brainstorm, superseded by this spec)
---

# Newfold Farm Crew — v4 polish

v3 is shipped, live at https://dfmore.github.io/newfold-farm-crew/, and
the filesystem is fully clean (one worktree, one branch). This v4 pass
addresses real user-visible issues that appear when you actually use
the site on a phone:

1. **Mobile tab scroll is invisible** — on 375px viewports only 3 of 6
   tabs are visible and there's no indicator that the row scrolls. Users
   miss Kit List / Kids' Corner / Photos entirely.
2. **Tab style feels "webby"** — pill buttons don't match the warm,
   editorial vibe of the rest of the site.
3. **Hero feels empty** — gradient alone with centered text doesn't
   carry enough visual weight. Feels unfinished.
4. **Kit List labels were transcribed too literally** — "3× tents",
   "Rain ×3" etc. are specific to one family's handwritten list.
5. **Peak cards are text-only** — images would help people preview
   what they're clicking.

## The big design decision — keep horizontal tabs

A vertical sidebar was considered. **Rejected.** Reasoning logged in
the advisory session:

- The primary surface is mobile (375–393px). Vertical tabs don't work
  at that width — we'd need a second nav pattern (bottom bar or
  hamburger) and maintain both.
- The actual bug on mobile is **scroll affordance**, not orientation.
  Users can't tell the row scrolls. Fix that and 90% of the "off"
  feeling is gone.
- Top-horizontal nav is the web's default muscle memory. Vertical
  sidebars are a dashboard pattern and feel out of place for a warm
  editorial trip page.
- The existing Grove-family aesthetic (user's own portfolio) uses
  top-nav. Consistency with the user's house style matters.

**Keep horizontal. Fix what's actually broken.**

## Scope — five discrete things

### 1. Tab nav redesign (core fix)

**Visual redesign — from pill buttons to editorial underline bar:**

- Remove rounded pill buttons. Inactive tabs: plain text with emoji,
  muted color (`--ink-muted`), no background, no border.
- Active tab: bolder text (`--ink`), **amber underline 3px**,
  optionally a very subtle cream background (same color as panel
  background so it just reads as "this one").
- Hover (desktop): text darkens to `--ink`, subtle underline preview.
- Tab bar has a thin `--stone` 1px rule underneath (marks the boundary
  between nav and content).

**Sticky positioning:**

- `position: sticky; top: 0; z-index: 10;` on the tab nav wrapper.
- Nav background: solid `--bg` (cream) — not transparent — so content
  doesn't bleed through when scrolling underneath.
- Add `backdrop-filter: blur(8px)` with a `background-color:
  rgba(251,249,243,0.92)` fallback for older browsers.

**Mobile scroll affordance (the decisive fix):**

On viewports ≤720px, if the tab row overflows:

- **Gradient fade on the right edge** — use a sibling `::after`
  pseudo-element (or wrap tabs in a container with the fade on its
  `::after`), `linear-gradient(to left, var(--bg), transparent)`,
  ~40px wide. This visually cues "there's more to the right".
- **A subtle right-pointing chevron** (›) on the fade, vertically
  centered.
- When the user has scrolled to the right end, hide the fade + chevron
  via a JS scroll listener toggling a `.at-end` class on the nav
  wrapper. Also add a mirrored fade on the LEFT when scrolled away
  from the start.
- Optional first-visit nudge: a 400ms shimmer animation pushing the
  tabs 15px right + back, only on first page load (gated by
  `newfold:seenTabHint` in localStorage). Skip if it feels gimmicky.
  The gradient + chevron should be enough without it.

**Active-tab style reinforcement:**

- Alongside the amber underline, **bold the active tab's label text**
  (font-weight 600 vs 400).
- Active tab's scroll position: on load, if the active tab is off-screen
  on mobile, smoothly scroll the nav so the active tab is visible.
  One-liner: `activeTabButton.scrollIntoView({ behavior: 'smooth',
  inline: 'center', block: 'nearest' })`.

**Accessibility**:

- Keep all `role="tab"` + `aria-selected` + `aria-controls` +
  `<section role="tabpanel">` semantics. Do not change any of these.
- Tap targets stay ≥44×44px.
- Focus ring: visible keyboard focus on tab buttons using
  `:focus-visible` outline.

### 2. Hero fix

**Typography bump**:

- h1 (`#hero-headline`): `font-size: clamp(2.2rem, 9vw, 5rem)`. More
  presence, still wraps cleanly at 375px.
- h1 letter-spacing: `-0.02em` for a tighter editorial feel.
- Subhead: keep at ~1.125rem, add `letter-spacing: 0.04em` to feel
  like a kicker.

**Background image**:

- Add a landscape Peak District / Edale photo as the hero background.
- Position: `object-fit: cover; object-position: center 60%;` (lean
  into the sky or ridge — leave room for the headline).
- **Overlay**: moss-green tint `linear-gradient(160deg,
  rgba(251,249,243,0.3), rgba(74,124,89,0.55))` so the text stays
  readable. Headline text color stays dark `--ink` (the top of the
  image is lighter after overlay).
- Lazy-load: use `<img loading="lazy">` OR CSS `background-image` on
  the hero container. **Prefer `<img>` + `aria-hidden="true"`** so we
  can set `loading="lazy"` and `fetchpriority="high"` appropriately.
  Actually for the hero: **`fetchpriority="high"`** because it's
  above-the-fold.
- Target file size <150KB. If the source Wikimedia image is larger,
  use their thumbnail path (`...thumb/.../1920px-...`).

**Candidate images** (verify with WebFetch before committing — the
builder should try them in order):

| # | URL | Why |
|---|---|---|
| 1 | `https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Edale_from_Ringing_Roger_-_geograph.org.uk_-_1326632.jpg/1920px-Edale_from_Ringing_Roger_-_geograph.org.uk_-_1326632.jpg` | Edale valley from above — most literal |
| 2 | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mam_Tor_from_the_Great_Ridge.jpg/1920px-Mam_Tor_from_the_Great_Ridge.jpg` | Mam Tor viewpoint |
| 3 | `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Kinder_Downfall.jpg/1920px-Kinder_Downfall.jpg` | Kinder Scout |

If none of the 3 resolve cleanly, fall back to enhanced gradient +
bigger type only. Document the outcome in the final report.

**Hero height**:

- With image, drop from 60svh to `min-height: 55svh` on mobile,
  `min-height: 60vh` on desktop. The image fills the space
  emotionally so we don't need as much literal space.

**Alt text**: `"Edale valley in the Peak District — rolling green
hills and a patchwork of fields."` (or similar descriptive sentence
for the chosen image).

**Attribution**: add a small line in the site footer: _"Hero photo:
<author name>, via Wikimedia Commons, CC BY-SA 2.0"_. If the image is
public domain, drop the "CC BY-SA" bit.

### 3. Kit List generalise (from v3-followups)

Edit `text-config.js` → `kitCategories` → each item `label`. Preserve
all item `id` values so existing tick-state carries over.

| Current label | New label |
|---|---|
| 3× tents | Tent |
| 3× airmats | Sleep mat (per person) |
| 6× sleep bags | Sleep bag (per person) |
| 3× pillows | Pillow |
| 2× duvets | Duvet or extra blanket |
| 3× lights | Lantern / torch |
| Rain ×3 | Waterproof jacket |
| Puffa ×3 | Warm jacket |
| Fleece ×3 | Fleece / mid layer |
| Caps ×3 | Sun hat / cap |
| Wooly hats ×3 | Wooly hat |
| Towels ×2 | Towel |
| Books ×3 | Books |
| Teddies ×2 | Teddy |

Other labels stay as-is.

### 4. Peak card images (from v3-followups)

For each peak in `text-config.js` → `peaks.*`, try to add an `image`
field. The v2 builder already wired `initPeaks()` to render
`<img loading="lazy">` when the field is present.

Candidate URLs — verify each with WebFetch (expect 200 + content-type
`image/*`) before committing:

| Peak | Candidate URL |
|---|---|
| Edale Circular | `https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Edale_from_Ringing_Roger_-_geograph.org.uk_-_1326632.jpg/640px-Edale_from_Ringing_Roger_-_geograph.org.uk_-_1326632.jpg` |
| Grindsbrook Clough | `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Grindsbrook_Clough_-_geograph.org.uk_-_5131856.jpg/640px-Grindsbrook_Clough_-_geograph.org.uk_-_5131856.jpg` |
| Mam Tor | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mam_Tor_from_the_Great_Ridge.jpg/640px-Mam_Tor_from_the_Great_Ridge.jpg` |
| Rambler Inn | skip (no clean free photo) |
| Speedwell Cavern | `https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Speedwell_Cavern_Entrance.jpg/640px-Speedwell_Cavern_Entrance.jpg` |
| Castleton | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Castleton_village.jpg/640px-Castleton_village.jpg` |
| Chestnut Centre | skip (private park) |

Accept **partial success**. If at least 3 of 7 resolve, ship them.

**Image styling**: aspect-ratio 16:10, `max-height: 180px` on mobile,
`object-fit: cover`, `border-radius` matches existing peak card
radius. No drop-shadow (keep flat to match the warm/relaxed vibe).

Alt text: sensible descriptive sentences per peak. Example:
_"View of Edale valley from Ringing Roger ridge."_

### 5. Preserve everything else

v3's wins all stay:

- Per-phone disclaimer on Kids' Corner (don't delete the amber card)
- QR centering (don't break the `text-align: center` rule)
- Plan refresh copy (Luke + Saul pasta, compressed Saturday, amber
  prelude + caveat notes)
- Tab logic (`initTabs()`, hash deep-links, localStorage) — ONLY the
  style/CSS changes, not the behaviour
- OG meta / favicons / webmanifest — don't touch
- localStorage keys — all immutable

## What's OUT of scope

- **Vertical tabs** — explicitly rejected, see reasoning above
- **Dark mode**
- **Hamburger / bottom-bar mobile nav**
- **New sections / content / Yorkshire phrases**
- **Backend / shared state / accounts**
- **Cross-browser compat testing beyond Chrome DevTools mobile preview**
- **Lighthouse re-audit** (only if tab or hero changes obviously
  regress perf)
- **Modifying `og-image.png`, favicons, qrcode lib, render-assets.js**

## Non-negotiables

- No "Howay"
- No £117 / tent size anywhere
- No RSVP / WhatsApp invite reintroduced
- Preserve all localStorage keys exactly
- Preserve all 12 OG + Twitter meta tags unchanged
- Don't rename `TEXT_CONFIG` keys

## Execution plan (suggested)

~75 min total. Work in a fresh worktree: `git worktree add
../newfold-farm-crew-v4 v4-polish` from main.

1. **Read** this spec + `.claude/specs/newfold-farm-crew.md` (v1
   canonical voice rules) + current `index.html`, `styles.css`,
   `app.js`, `text-config.js`. (5 min)
2. **Step A — Tab redesign** (25 min):
   - Restyle tab buttons in CSS (pill → underline editorial)
   - Add `position: sticky` on nav wrapper + backdrop blur
   - Add mobile scroll affordance (gradient fade + chevron)
   - Add scroll listener for `.at-start` / `.at-end` classes
   - Scroll active tab into view on load
3. **Step B — Hero fix** (20 min):
   - Bump typography (clamp + letter-spacing)
   - WebFetch candidate image URLs, pick the first that resolves
   - Add `<img>` background + moss-green overlay
   - Footer attribution line
4. **Step C — Kit List generalise** (5 min):
   - Edit `text-config.js` label table per §3
5. **Step D — Peak images** (10 min):
   - WebFetch each candidate, add `image:` field for each that 200s
   - Minor CSS for image within peak card (aspect-ratio, radius)
6. **Step E — Smoke test** (5 min):
   - Serve locally, resize Chrome DevTools 375px + 1040px
   - Click each tab, verify all 6 accessible on mobile (scroll with
     affordance)
   - Verify bingo shuffle, squelch add kid, kit list drill-down,
     memory wall link, QR renders centered
   - Hero: headline visible over image, no layout shift
   - Smoke greps:
     ```
     grep -c "position: sticky" styles.css              # expect >=1 (nav)
     grep -c "kitCategories" text-config.js             # expect >=1
     grep -c "hero-illustration" index.html styles.css  # expect 0 (v1 leftover)
     grep -ci "howay" index.html styles.css app.js text-config.js   # expect 0
     ```
7. **Squash-merge** v4-polish → main, push. Pages redeploys in ~2 min.
8. **Cleanup**: remove the v4 worktree, delete the v4 branch. Only
   main remains.
9. **Report** outcomes: which image made it to hero, how many peak
   images shipped, any checks skipped.

## Design references (for the builder's reference — not to copy)

When redesigning the tab style, lean toward editorial/newspaper
aesthetics:
- Linear-style top nav (clean, underline active, minimal)
- Vercel Blog / Substack site nav (no pill chrome, just text +
  underline)
- Kinfolk / Apartment Therapy (warm serifs + quiet nav)

Avoid:
- Material-design pill tabs (too bubbly for this vibe)
- Bottom-bar mobile nav (too app-like)
- Hamburger menu (user explicitly rejected)
- Sidebar/vertical tabs (breaks mobile model, complexity)

## Advisory-session handoff context

You (this `/make` session) have built v1, v2, and v3 across multiple
passes. v3 landed cleanly at commit `058e593` on main, and the
advisory session has been running the live site through Playwright to
inform v4's design. The screenshots confirmed:

- Desktop: 6 tabs visible but pill style feels "webby" for the site's
  relaxed editorial tone
- Mobile (375px): only 3 of 6 tabs visible with NO scroll affordance —
  this is the core UX bug

v4 keeps horizontal top nav (vertical rejected with written reasoning)
and focuses on solving the affordance + aesthetic concerns while
bundling the two content follow-ups from v3 (Kit List generalise +
Peak images).

Do not re-debate the layout direction. Execute the plan above.
