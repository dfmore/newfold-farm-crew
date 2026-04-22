# TODO — newfold-farm-crew

User inputs needed for the build. `/make` will wire these in as they land.

## 🎯 Critical references for /make

- **GitHub remote (already created, empty):**
  ```
  git remote add origin https://github.com/dfmore/newfold-farm-crew.git
  ```
  Push target is `main` branch, root. Pages is NOT yet enabled — will be
  enabled by the advisory session after the first push lands.

- **Dropbox upload URL** (for Memory Wall button):
  ```
  https://www.dropbox.com/request/8zhrdnjwh5h0sc3iz0ws
  ```

- **"The Peaks" content** — curated scout research available at
  `.claude/specs/the-peaks-research.md`. The main spec section 6 has been
  updated with the canonical list (Edale Circular / Grindsbrook /
  Mam Tor + Rambler Inn + Speedwell + Castleton + flavour snippets).

## Blocking

_(all blockers resolved)_

## Happens on the day (no prep needed)

- Kids' names for the Squelch-o-Meter are added **inline on the site** when
  you arrive at the campsite. No config editing.

## Review after first preview

- [x] "The Peaks" starter list (walks / pub / kid-friendly spots) <!-- completed 2026-04-22 -->
- [ ] Nature Bingo 18-item pool
- [ ] Today's Mission copy (one prompt per day)
- [ ] Yorkshire phrase placements (keep sparse)

## v2 shipping

- [x] Visual verification of v2 build at http://localhost:8080 (live-server) <!-- completed 2026-04-23 -->
- [x] Squash-merge newfold-farm-crew-v2 → main, push (done by /make: commit e786a54) <!-- completed 2026-04-23 -->
- [ ] Remove newfold-farm-crew-v2 worktree + delete branch post-merge
- [ ] Investigate + clean up newfold-farm-crew-refactor worktree (has uncommitted Step 1 false-start)
- [ ] Final Facebook Sharing Debugger pre-warm before WhatsApp post

## v3 (new /make workflow)

- [ ] Write v3 spec at .claude/specs/newfold-farm-crew-v3.md <!-- added 2026-04-23 -->
- [ ] v3 tasks: more prominent tabs on mobile + carry 5353309 onto main + full worktree/branch cleanup + final debugger pre-warm <!-- added 2026-04-23 -->
- [ ] Read /make's session transcript to brief v3 spec accurately <!-- added 2026-04-23 -->
- [ ] Hand v3 spec to /make with a fresh invocation <!-- added 2026-04-23 -->
- [ ] Final WhatsApp post to group chat <!-- added 2026-04-23 -->

## Done

- ✅ **Dropbox File Request URL** — received 2026-04-22:
  ```
  DROPBOX_UPLOAD_URL = "https://www.dropbox.com/request/8zhrdnjwh5h0sc3iz0ws"
  ```
- ✅ v2 feat commit: `5b7ee91 feat(v2): refactor to tabbed UI + CSS reboot + drillable Kit List` <!-- 2026-04-23 -->
- ✅ v2 fix commit: `09de49d fix(v2): raise welly + squelch-remove tap targets to 44x44` (from /make reviewer) <!-- 2026-04-23 -->
- ✅ v2 fix commit: `5353309 fix(v2): per-phone disclaimer on Kids' Corner + center QR children` <!-- 2026-04-23 -->
