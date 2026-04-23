---
title: Post-v3 follow-ups (advisory session to execute after v3 lands)
created: 2026-04-23
status: queued — execute after v3 squash commit + worktree/branch cleanup verified
triggered-by: overnight monitoring cron on completion detection
---

# Post-v3 follow-ups

Two user asks that came in AFTER v3 spec was handed off to /make. The
advisory session should execute these once the v3 monitoring cron
detects completion.

## Task 1 — Generalise the Kit List (content-only, low risk)

**Problem**: the current Kit List was transcribed literally from a
photo of ONE family's handwritten list. Items like "3× tents" and
"Rain ×3" are person-specific quantities that don't make sense as
group-wide reminders.

**Fix**: edit `text-config.js` → `kitCategories` → each item label.

- Remove person-specific `×N` counts where N refers to that one
  family's kids
- Keep counts only where they make sense as 4-day trip guidance
  (e.g. "enough socks for 4 days" is fine, but not exact numbers)
- Each family plans their own quantities — the list is a **reminder**,
  not a shopping list

**Proposed relabels** (preserve item `id` values so existing tick
state carries over):

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
| Juice cartons | Juice |

Everything else stays as-is (e.g. "Fresh pasta", "Gas stove", "1st
aid kit" don't need changes).

Commit message:
```
fix(v3): generalise Kit List labels — remove person-specific quantities
```

## Task 2 — Add images to Peak cards (best-effort)

**Goal**: each Peak card (currently text-only with a name and link) has
a small thumbnail image so people see what they're clicking on.

**Rendering path**: /make's v2 builder already wired `initPeaks()` to
render an `<img loading="lazy">` above the card text IF the item has
an `image` field in config. So this is purely a data edit — add
`image: "..."` to each entry in `text-config.js` → `peaks.*`.

**Image sourcing strategy** (in order of preference):

1. **Wikimedia Commons** — stable URLs, public domain / CC BY-SA,
   no attribution required in thumbnails
2. **Unsplash Source** (direct photo URLs) — high quality, requires
   attribution in footer
3. **Skip individual cards** if no clean URL found — the renderer
   falls back to text-only for those

**Suggested candidates** (verify URLs resolve to 200 via WebFetch
HEAD before committing):

| Peak | Try this Wikimedia thumbnail URL first |
|---|---|
| Edale Circular | `https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Edale_from_Ringing_Roger_-_geograph.org.uk_-_1326632.jpg/640px-Edale_from_Ringing_Roger_-_geograph.org.uk_-_1326632.jpg` |
| Grindsbrook Clough | `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Grindsbrook_Clough_-_geograph.org.uk_-_5131856.jpg/640px-Grindsbrook_Clough_-_geograph.org.uk_-_5131856.jpg` |
| Mam Tor | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mam_Tor_from_the_Great_Ridge.jpg/640px-Mam_Tor_from_the_Great_Ridge.jpg` |
| The Rambler Inn | (may not find a free photo — skip if none) |
| Speedwell Cavern | `https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Speedwell_Cavern_Entrance.jpg/640px-Speedwell_Cavern_Entrance.jpg` |
| Castleton village | `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Castleton_village.jpg/640px-Castleton_village.jpg` |
| Chestnut Centre | (private wildlife park — skip if no free photo) |

**Important**: these are starting-point URL guesses based on typical
Wikimedia naming patterns. Many will NOT resolve. For each URL:

1. WebFetch the URL
2. If the response is an image (status 200, content-type image/*),
   add to text-config
3. If not, try an Unsplash search: `https://unsplash.com/s/photos/<query>`
   via WebFetch, extract a direct photo URL from the results
4. If neither works, skip that Peak (card stays text-only)

Accept **partial success** — even 3 of 7 cards with images is an
improvement over 0.

**Alt text**: each image needs an `alt` attribute describing the
scene. Use sensible defaults: "View of Edale valley from a hillside",
"Mam Tor ridge silhouette", "Castleton village street", etc.

Commit message:
```
feat(v3): add thumbnail images to Peak cards (partial — N of 7)
```

## Execution order on v3 completion

When the monitoring cron detects v3 has fully shipped (squash commit
on main, worktrees/branches cleaned, live site 200):

1. Run the monitor's original completion actions first (OG image
   check, TaskStop live-server, write v3-completion-report.md).
2. Then execute Task 1 (Kit List generalise) — edit, commit, push.
3. Then attempt Task 2 (Peak images) — edit, commit, push.
4. Update `v3-completion-report.md` to append outcomes of both
   follow-ups.
5. Self-delete the monitoring cron.

If any follow-up fails (cherry-pick conflict, no images found, etc.),
flag clearly in the completion report so the user knows to address
manually in the morning.

## What NOT to do

- Do not touch anything unrelated to these two tasks
- Do not re-open v3 decisions (tab prominence, disclaimer, etc.)
- Do not modify OG meta / favicons / qrcode lib
- Do not attempt to rename item `id` values in the Kit List — that
  would lose users' tick state
- Do not download images locally — reference them via CDN URLs only
