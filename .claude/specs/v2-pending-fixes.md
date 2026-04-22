---
title: v2 small user-feedback fixes
created: 2026-04-23
status: applied
applied-in-commit: 5353309 (on newfold-farm-crew-v2 branch) — "fix(v2): per-phone disclaimer on Kids' Corner + center QR children"
---

# Pending fixes — user-feedback from live smoke test

These are small patches identified during the user's visual review of the
v2 build at http://localhost:8080. They are NOT yet applied — the advisory
session is waiting for the /make builder + reviewer loop in the main
session to go fully idle before touching the v2 worktree, to avoid merge
conflicts.

## 1. Per-phone disclaimer for Kids' Corner

**Issue**: users may assume Nature Bingo cards and Squelch-o-Meter state
sync between parents' phones. localStorage is strictly per-device per-
browser — no sync. The site doesn't currently make this explicit.

**Fix**: add a small, obvious, explicit note at the top of the Kids'
Corner tab. Proposed copy:

> 📱 **One phone, one game.** Bingo cards and welly ratings live on this
> device only — they don't sync between parents. Pass the phone around
> if you're playing together.

Placement: inside `#panel-kids`, above the bingo section. Styled as a
muted info card (amber border or `--stone` background), so it reads as
guidance not marketing.

**Also consider**: a smaller, softer version of the same idea at the top
of the Kit List tab — tick state is also per-device. Single sentence:
"Ticks stay on this phone."

## 2. QR code centering

**Issue**: in the Photos tab's "Share with another parent" card, the QR
canvas is left-aligned. Visually it should be centered.

**Fix**: CSS-only — `#qr-canvas` or its container gets `margin: 0 auto`
(if it's a block element) or the parent card gets `text-align: center`
/ `display: flex; justify-content: center`.

## 3. Deferred to v3 (not this pass)

- **Shared group state** for Bingo / Squelch-o-Meter across devices.
  Requires a backend (Supabase / Cloudflare KV) + auth. User explicitly
  decided: NOT worth it for a 3-day trip with 5 families. Revisit if v3
  is ever scoped.

## How to apply

When /make's main session goes idle (no new commits, no file writes for
5+ min on `newfold-farm-crew-v2` branch):

1. Read this file to re-confirm scope
2. Edit `text-config.js` to add `kidsCorner.disclaimer` string (and
   optionally `kit.disclaimer`)
3. Edit `app.js` to render it at the top of the Kids' Corner panel
4. Edit `styles.css` to add `.inline-note` class + QR centering
5. Commit with message:
   ```
   fix(v2): per-phone disclaimer on Kids' Corner + center QR
   ```
6. The commit joins the `newfold-farm-crew-v2` branch; it will be
   squash-merged to main alongside the builder's work
