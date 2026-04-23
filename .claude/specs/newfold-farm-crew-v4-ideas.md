---
title: v4 ideas (not yet a spec — notes for the next /make pass)
created: 2026-04-23
status: backlog
owner: daniel.moreira
target-budget: TBD (~60 min estimate)
handoff: user will invoke /make in a fresh session in the morning
---

# v4 — layout and chrome pass

Two user-feedback items that emerged after v3 handoff. These are
structural enough that they deserve their own /make pass, not a quick
patch. User has indicated they'll give this to the other /make session
tomorrow.

## 1. Vertical tab navigation (desktop) — keep horizontal on mobile

**User feedback**: the horizontal tab bar at the top looks cramped; a
vertical sidebar on the left feels more natural for a "hub" style
site with 6 sections.

**Design direction** (to be refined in the v4 spec):

- **Desktop (≥720px)**: vertical left sidebar, ~180-220px wide, with
  icon + label for each tab. Sticky/fixed so it stays visible while
  scrolling within a panel. Content shifts right.
- **Mobile (<720px)**: keep current horizontal top scroll — vertical
  tabs on a narrow screen eat too much width.
- **Active state**: strong highlight (amber background + moss
  border-left indicator, or similar).
- **Same underlying logic**: still uses `initTabs()`, same
  `newfold:activeTab` localStorage key, same hash deep-linking. Only
  the chrome around the tabs changes.

**Risk**: some panel layouts (especially Kit List drill-down, Kids'
Corner grid) assume the full viewport width. Vertical tabs on desktop
shrink the content area by ~200px — need to verify the grids still
flow well.

**Rough estimate**: 45 min. Mostly CSS (media-query-gated sidebar
layout), minor HTML reshuffle, no JS changes.

## 2. Hero whitespace — too empty, wants visual weight

**User feedback**: the hero section reads as "too empty" with just the
gradient + headline + subhead. Wants either:

- Bigger typography (cheap)
- Background image related to the Edale/Peak District region (more
  visual impact)
- Both

**Design direction**:

### Option A — bigger type only (low effort)

- Bump the h1 `font-size` clamp upper bound (currently likely
  `clamp(1.6rem, 5.5vw, 3rem)` — try `clamp(2rem, 7vw, 4.5rem)`)
- Add generous letter-spacing on the headline for a more editorial feel
- Add a subtle decorative element (SVG rule, ornamental divider)
- ~10 min

### Option B — background image (higher effort, better payoff)

- Add a Peak District landscape photo as hero background
- Darken with a moss-green overlay so the headline stays legible
- Lazy-load, optimize to WebP <100KB
- Sources (verify before committing):
  - Wikimedia Commons: Edale valley, Kinder plateau, or Mam Tor
    silhouette
  - Attribution in footer (Wikimedia typically requires credit)
- Respect `prefers-reduced-motion` (no parallax even if tempted)
- ~30 min

### Recommended: do both

Bigger type (Option A) is cheap insurance — makes the hero feel more
deliberate even before the image lands. Background image (Option B)
closes the "empty" feedback completely. Combined effort: ~40 min.

**Image candidates** (verify URLs via WebFetch before committing):

- `https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Edale_from_Ringing_Roger_-_geograph.org.uk_-_1326632.jpg/1920px-Edale_from_Ringing_Roger_-_geograph.org.uk_-_1326632.jpg` (Edale valley from above)
- `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mam_Tor_from_the_Great_Ridge.jpg/1920px-Mam_Tor_from_the_Great_Ridge.jpg` (Mam Tor viewpoint)
- `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Kinder_Downfall.jpg/1920px-Kinder_Downfall.jpg` (Kinder Scout waterfall)

If none resolve, Unsplash has solid Peak District photography — the
builder can search there.

## Scope NOT to expand

- Don't re-open Kids' Corner disclaimer, bingo, squelch, Kit List
  drill-down, or anything from v1–v3
- Don't add new sections or features
- Don't touch OG meta / favicons / qrcode lib

## Handoff plan for v4

1. User starts a fresh `/make` session in the morning after v3 is verified.
2. User says: _"New spec for v4 at `.claude/specs/newfold-farm-crew-v4.md`.
   Two items: vertical tabs on desktop (keep horizontal on mobile) and
   hero whitespace fix (bigger type + Edale background image). Read
   the ideas file at `.claude/specs/newfold-farm-crew-v4-ideas.md` for
   design direction."_
3. The advisory session will promote this file into a proper v4 spec
   (numbered steps, acceptance criteria, non-negotiables) before
   /make runs — OR /make can read the ideas file directly if it feels
   concrete enough.

## Post-v4 parking lot

- Chestnut Centre / Rambler Inn card images (couldn't find clean
  free photos during v3 followups — revisit if v4 finds good sources)
- WhatsApp group chat link (user not admin, parked indefinitely)
- Shared state for Bingo / Squelch (would need backend — explicitly
  parked as v5+ if ever)
