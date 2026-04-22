---
feature: newfold-farm-crew-v3
status: ready-to-implement
owner: daniel.moreira
created: 2026-04-23
target-budget: ~50 minutes
approach: targeted enhancements + cleanup (post-ship polish)
skip-tdd: true
supersedes: null
companion: .claude/specs/newfold-farm-crew-v2.md (v2 shipped and live at https://dfmore.github.io/newfold-farm-crew/)
references:
  - .claude/specs/v2-pending-fixes.md (disclaimer + QR fix already applied on v2 branch, not yet on main)
---

# Newfold Farm Crew — v3 polish + cleanup

v2 is **shipped, pushed to main, and already posted to the WhatsApp group
chat.** The Facebook link preview is working fine — nothing needs
fixing on the OG/meta side.

v3 is a short polish pass driven by two things:

1. **User feedback**: the tab nav at the top doesn't look prominent
   enough on mobile — people might miss it and think it's a plain scroll
   page.
2. **A loose end**: an advisory session applied a small fix on the
   `newfold-farm-crew-v2` branch (commit `5353309` — per-phone disclaimer
   on Kids' Corner + QR-child centering) **after** /make had already
   squash-merged v2 to main. So main is currently missing these two
   small improvements.

Plus: a full filesystem cleanup so the repo is tidy by the end of this
pass.

## Context — what v2 shipped

Summary from /make's own completion report:

- **6 tabs × 6 panels**: 🏕️ Home / 🗺️ Getting There / ⛰️ The Peaks /
  🎒 Kit List / 🎮 Kids' Corner / 📸 Photos
- **Tab logic** via `initTabs()`: hash deep-links, `newfold:activeTab`
  localStorage, `history.replaceState` on click, aria-selected toggles
- **Mobile-first CSS reboot**: 930 lines, 3 breakpoints max, `clamp()`
  headings, 60svh hero, tap targets ≥ 44×44
- **QR fix**: `new QRCode(div, {...})` replacing broken `.toCanvas()`
- **Kit List drill-down**: 7 categories with live count badges
- **Google Maps iframe** in Getting There
- **Tap targets**: welly + squelch-remove raised from 36/32px to 44×44
  per reviewer feedback

Known dead weight noted by /make's builder:

- `TEXT_CONFIG.checklist.groups` (128 lines) is unused — v2's Kit List
  reads from `TEXT_CONFIG.kitCategories` only. Kept in for rollback
  reference. Safe to delete in v3 if we're confident.

Current live site: https://dfmore.github.io/newfold-farm-crew/ (commit
`e786a54` squashed on main).

## v3 scope — four discrete things

### 1. More prominent tab navigation on mobile (primary goal)

**Problem**: users on phones aren't noticing the tab nav — it looks
like a decorative element above the content rather than the primary
navigation. They might assume it's a single long page and miss Kit
List / Kids' Corner / Photos entirely.

**Design constraint**: still no framework, still mobile-first, still
single-page, still 3 breakpoints max. Enhancement, not redesign.

**Proposed techniques** — pick the combination that works best:

- **Sticky nav**: make the tab row `position: sticky; top: 0` with a
  warm background (cream + amber underline) so it stays visible while
  scrolling within a panel. Currently it probably scrolls away.
- **Stronger active state**: bolder underline, different background, or
  pill shape for the active tab. Current state may be too subtle.
- **Inactive tab hint**: the inactive tabs should feel clickable —
  slightly larger tap targets, clearer affordance (border? soft
  background?).
- **First-visit nudge** (OPTIONAL): on first load, show a small
  transient toast _"Tap the tabs at the top to explore →"_ that dismisses
  on any tab click or after 4 seconds. Use `newfold:seenTabHint`
  localStorage to show once per device. Skip if it feels gimmicky.
- **Scroll indicators**: if the tab row overflows horizontally on 375px,
  hint with a soft gradient fade on the right edge + small arrow.

Implementer judgment call: which of the above actually solve the
problem with least CSS cost. Aim for **high clarity, low cleverness**.
The simplest fix (sticky + stronger active state) is probably enough.

**Acceptance**:
- [ ] Tab nav is visible at all times on mobile (375px + 393px) while
      scrolling any panel
- [ ] Active tab is unambiguously distinguishable from inactive tabs
      at a glance (no squinting)
- [ ] Inactive tabs look obviously tappable (affordance cue)
- [ ] Tab row still scrolls horizontally if it overflows; no wrap, no
      hamburger
- [ ] Works at 375px without layout shift or clipping

### 2. Carry the stranded fix onto main

Commit `5353309` on `newfold-farm-crew-v2` branch contains two
user-feedback patches that never made it to main:

**a. Per-phone disclaimer on Kids' Corner**:
- Copy: _"📱 One phone, one game. Bingo cards and welly ratings live on
  this device only — they don't sync between parents. Pass the phone
  around if you're playing together."_
- Placement: amber-accent `.disclaimer-note` card between the section
  heading and the bingo/squelch grid in `#panel-kids`.
- Stored in `TEXT_CONFIG.kidsCorner.disclaimer` for easy tuning.
- CSS class `.disclaimer-note` added (amber left border, cream
  background, `max-width: 640px; margin: 0 auto`).

**b. QR centering for inner children**:
- `qrcode.js` library creates `<img>` / `<canvas>` / `<table>` inside
  the `#qr-canvas` container. Those inner elements weren't centered.
- Fix: add `text-align: center` to `#qr-canvas` plus an explicit
  `margin: 0 auto; display: block` rule on `#qr-canvas img`,
  `#qr-canvas canvas`, `#qr-canvas table`.

**Execution**: cherry-pick `5353309` from `newfold-farm-crew-v2` onto
`main` should work cleanly (same file state post-squash). If the
cherry-pick has conflicts, re-apply the diff manually — the original
patch only touched 4 files and added +25 lines.

### 3. Plan section refresh (content + small structural tweak)

Two drivers:

**A. Fresh intel from the WhatsApp group** (Luke, 2026-04-23, 23:17):

> _"Pizza on Saturday night does sound pretty great Laina — count us in
> (so long as no saplings are harmed). Pasta night on Friday sounds good
> too — me and Saul can make us all some sauce and we can bring it with
> us ready made for Friday if people are keen. If anyone else is keen
> just let us know any dietary requirements and we will rustle something
> up for everyone if that sounds good."_

**B. User feedback on v2**: Saturday + Sunday descriptions felt too
prescriptive. The current "pizza night" for Sat eve IS confirmed and
can stay. Sat day + Sun day should be looser. The existing
_"Plans may evolve — check the group chat."_ caption is too subtle
to carry the point.

**Update `TEXT_CONFIG.plan.days`** — **compressed to 4 entries**:

- **Friday evening**:
  - Arrive from ~5pm, pitch up.
  - Pasta night: **Luke and Saul are pre-making the sauce and bringing
    it ready** (fresh pasta + toms + cheese + sweetcorn, everyone piles
    in). _Any dietary bits? Flag them in the group chat._
- **Saturday**:
  - See how the day goes — walks, mooching, river, whatever takes.
    **Pizza night** in the evening at the long table by the pizza oven.
    Adults drink, kids play (no destroying saplings).
- **Sunday**:
  - Another day in the Peaks — long walks if the weather plays ball,
    quiet one if not. Mam Tor is there if people fancy it.
- **Monday**:
  - Lazy breakfast, pack up, leave the pitch cleaner than we found it.

**Add two new fields in `TEXT_CONFIG.plan`:**

- `prelude` — prominent amber-accent note ABOVE the days:
  _"Rough plan. Most of it will evolve — the group chat is the source
  of truth."_
- `caveatFooter` — prominent amber-accent note BELOW the days (same
  styling as prelude, mirrored position):
  _"Anything's likely to change — keep an eye on the group chat."_

**No clickable chat link.** User confirmed they don't have admin access
to the WhatsApp group and skipping is fine — the existing group members
already have the chat on their phone. The two prominent notes above +
below the days are enough to steer people.

**Rendering updates in `app.js` → `initPlan()`**:

1. Render `prelude` in an amber-accent note ABOVE the
   `<ul class="plan-list">`.
2. Render `caveatFooter` in a matching amber-accent note BELOW the
   list (same class — `.disclaimer-note` or a shared `.plan-caveat`).
3. Both notes should stand out more than the v2 subtle caption —
   visual weight of the existing `.disclaimer-note` pattern is about
   right. Plain text, no links, no buttons.

**Tone constraint**: keep dialect light (at most one Yorkshire phrase
in the whole Plan block, per v1 spec's voice rules).

**Scope discipline**: this is text-config + render-wiring only.
- Do NOT add a dietary form/input — the group chat handles that.
- Do NOT add live WhatsApp integration — a link to the chat is enough.
- Do NOT add the chat link anywhere else on the site (Footer, Memory
  Wall, etc.) — Plan section only, where it's contextual.

### 4. Cleanup pass (worktrees + branches + dead weight)

After v3's code changes are committed and pushed:

**Delete `TEXT_CONFIG.checklist.groups`** — 128 unused lines. v2's
Kit List only reads `checklist.heading` and `checklist.resetLabel`.
Verify with a grep that nothing else references it, then remove the
`groups:` array.

**Worktrees to remove** (from parent repo at
`C:/Users/moreird/GitHub/newfold-farm-crew`):

| Worktree | Branch | State | Action |
|---|---|---|---|
| `../newfold-farm-crew` | `main` | Active | **Keep** |
| `../newfold-farm-crew-v2` | `newfold-farm-crew-v2` | Post-squash; has 1 commit ahead (`5353309`) — will be captured in step 2 | `git worktree remove ../newfold-farm-crew-v2` + `git branch -D newfold-farm-crew-v2` |
| `../newfold-farm-crew-refactor` | `refactor-v2` | Stale false-start at `ffd0fdd`, has uncommitted Step 1 work (doubled titles diff) | Verify uncommitted diff is superseded by v2 on main (it is). Then `git restore .` in worktree, `git worktree remove ../newfold-farm-crew-refactor`, `git branch -D refactor-v2` |

**Branches to delete**:

- `newfold-farm-crew-tweaks` — local-only, from v1 tweaks. Already
  merged via squash. Delete with `git branch -D newfold-farm-crew-tweaks`.
- `newfold-farm-crew-v2` — after step 2 above.
- `refactor-v2` — after worktree cleanup.

## What's explicitly OUT of scope for v3

- **No changes to OG / Twitter meta / favicons** — these are already
  working on WhatsApp. Don't touch.
- **No changes to bingo pool, missions, peaks content, yorkshire
  phrases** — content has been reviewed and is shipping.
- **No Facebook Sharing Debugger step** — user confirmed WhatsApp
  preview works; skip the pre-warm.
- **No new features** — no shared-state backend, no new tabs, no new
  sections. Polish only.
- **No accessibility re-audit** — reviewer already did a tap-target
  pass in v2.
- **No Lighthouse rerun** — unless the tab nav changes visibly
  degrade perf, which is unlikely.
- **Do not touch `og-image.png`, `favicon.ico`, `scripts/render-assets.js`,
  or `vendor/qrcode.min.js`**.
- **Do not re-run `npm run build:assets`**.

## Non-negotiables

- No "Howay". No tent size / £117. No RSVP / WhatsApp invite.
- Preserve all localStorage keys exactly: `newfold:bingo:*`,
  `newfold:squelch:*`, `newfold:checklist:*`, `newfold:activeTab`,
  `newfold:kit:activeCategory`, `newfold:kids:list`.
- Preserve all OG + Twitter meta tags unchanged.
- Do not rename `TEXT_CONFIG` keys.

## Execution plan (for /make)

Budget: ~45 minutes total.

1. **Read these before starting**:
   - This spec
   - `.claude/specs/newfold-farm-crew-v2.md` (v2 canonical — content,
     locked behaviours, voice rules)
   - `.claude/specs/v2-pending-fixes.md` (describes the stranded
     `5353309` fix)
   - `.claude/specs/newfold-farm-crew.md` (v1 canonical content)

2. **Work on a new branch from `main`**: `git checkout -b v3-polish`
   or use a worktree: `git worktree add ../newfold-farm-crew-v3 v3-polish`

3. **Step A — Carry the stranded fix (10 min)**:
   - `git cherry-pick 5353309` (onto v3-polish branch)
   - If conflicts, apply the 4-file diff manually from
     `.claude/specs/v2-pending-fixes.md` description
   - Verify: grep for `disclaimer-note`, grep for
     `#qr-canvas img` in styles.css

4. **Step B1 — Plan content refresh (3 min)**:
   - Edit `TEXT_CONFIG.plan.days` in `text-config.js` per section 3 above
   - Verify render on local serve (Plan section in Home panel)

5. **Step B — Tab prominence (20 min)**:
   - Inspect current tab nav CSS + HTML in main
   - Apply chosen techniques (sticky + stronger active + affordance)
   - Test at 375px and 393px in DevTools
   - Serve locally and eyeball

6. **Step C — Cleanup (10 min)**:
   - Delete `TEXT_CONFIG.checklist.groups` (verify no other reference
     first)
   - Commit C changes: `refactor(v3): drop unused checklist.groups`

7. **Step D — Squash-merge to main + push (3 min)**:
   - Commit v3 work as a squash onto main
   - Push to origin/main
   - Pages redeploys in ~2 min

8. **Step E — Worktree + branch cleanup (2 min)**:
   - `git worktree remove ../newfold-farm-crew-v2`
   - `git worktree remove ../newfold-farm-crew-refactor` (after
     `git restore .` in that worktree)
   - `git branch -D newfold-farm-crew-v2 refactor-v2 newfold-farm-crew-tweaks v3-polish` (or whatever was used)
   - `git worktree list` should show ONLY the main worktree

9. **Final smoke test**:
   - `python -m http.server` or `live-server` locally
   - Tab nav prominent at 375px (the primary v3 goal)
   - Kids' Corner shows disclaimer card above bingo/squelch
   - QR code is centered in its card
   - All locked behaviours still work (bingo shuffle + mark, squelch
     add kid + tap welly, checklist tick, memory wall link)
   - Smoke-test commands:
     ```bash
     grep -c "disclaimer-note" styles.css index.html app.js text-config.js
     grep -c "position: sticky" styles.css
     grep -c "QRCode.toCanvas" app.js   # MUST be 0
     grep -c "TEXT_CONFIG.checklist.groups" app.js index.html   # MUST be 0 if step C done
     ```

10. **Reporting**:
   - One short report: steps A-E status, smoke-test numbers, anything
     skipped
   - No need to re-run Facebook Sharing Debugger

## Advisory-session handoff context

You (this `/make` session) already built v1 AND v2. The advisory session
applied `5353309` on the v2 branch after you squash-merged to main. You
did not see that commit because it never reached main.

This v3 pass closes both loops (bring the fix home, tidy the tree) AND
addresses new user feedback on the tab visibility. It is a small pass —
do not re-open v2's decisions, do not re-debate rewrite vs refactor, do
not re-audit content. Polish + cleanup.

When done, the advisory session will verify the live site, confirm
cleanup state, and update the TODO.md.
