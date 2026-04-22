/**
 * app.js — Newfold Farm Crew
 * All DOM binding + interactive features.
 * Reads from TEXT_CONFIG (text-config.js) exclusively.
 */

'use strict';

/* ============================================================
   UTILITIES
   ============================================================ */

function el(id) { return document.getElementById(id); }

function ls(key) {
  try { return localStorage.getItem(key); }
  catch (e) { return null; }
}

function lsSet(key, val) {
  try { localStorage.setItem(key, val); }
  catch (e) { /* storage unavailable */ }
}

function lsRemove(key) {
  try { localStorage.removeItem(key); }
  catch (e) { /* ignore */ }
}

/** Fisher-Yates shuffle, returns a NEW shuffled array */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Return today's date string as YYYY-MM-DD in LOCAL time */
function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/* ============================================================
   1. HERO
   ============================================================ */
function initHero() {
  const cfg = TEXT_CONFIG.hero;
  const h = el('hero-headline');
  const s = el('hero-subhead');
  if (h) h.textContent = cfg.headline;
  if (s) s.textContent = cfg.subhead;
}

/* ============================================================
   2. TODAY'S MISSION
   ============================================================ */
function initMission() {
  const cfg = TEXT_CONFIG.mission;
  const heading = el('mission-heading');
  const text = el('mission-text');

  if (heading) heading.textContent = cfg.heading;

  const today = todayKey();
  const tripStart = '2026-05-01';
  const tripEnd   = '2026-05-04';

  let message;
  if (today < tripStart) {
    message = cfg.before;
  } else if (today > tripEnd) {
    message = cfg.after;
  } else {
    message = cfg.days[today] || cfg.before;
  }

  if (text) text.textContent = message;
}

/* ============================================================
   3. GETTING THERE
   ============================================================ */
function initGettingThere() {
  const cfg = TEXT_CONFIG.gettingThere;
  const heading = el('getting-there-heading');
  if (heading) heading.textContent = cfg.heading;

  const grid = el('getting-there-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="info-item">
        <span class="info-label">Campsite</span>
        <span class="info-value">${esc(cfg.campsite)}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Pitch</span>
        <span class="info-value">${esc(cfg.pitch)}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Address</span>
        <span class="info-value">${esc(cfg.address)}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Arrival</span>
        <span class="info-value">${esc(cfg.arrival)}</span>
      </div>
    `;
  }

  const links = el('getting-there-links');
  if (links) {
    links.innerHTML = `
      <a href="${esc(cfg.campsiteUrl)}" target="_blank" rel="noopener" class="btn btn--outline btn--sm">${esc(cfg.campsiteLabel)}</a>
      <a href="${esc(cfg.mapsUrl)}" target="_blank" rel="noopener" class="btn btn--outline btn--sm">${esc(cfg.mapsLabel)}</a>
      <a href="${esc(cfg.w3wUrl)}" target="_blank" rel="noopener" class="btn btn--outline btn--sm">${esc(cfg.w3wLabel)}</a>
    `;
  }
}

/* ============================================================
   4. WEATHER
   ============================================================ */
function initWeather() {
  const cfg = TEXT_CONFIG.weather;
  const heading = el('weather-heading');
  const intro = el('weather-intro');
  const links = el('weather-links');

  if (heading) heading.textContent = cfg.heading;
  if (intro) intro.textContent = cfg.intro;
  if (links) {
    links.innerHTML = cfg.links.map(l =>
      `<a href="${esc(l.url)}" target="_blank" rel="noopener" class="btn btn--outline btn--sm">${esc(l.label)}</a>`
    ).join('');
  }
}

/* ============================================================
   5. THE PLAN
   ============================================================ */
function initPlan() {
  const cfg = TEXT_CONFIG.plan;
  const heading = el('plan-heading');
  const list = el('plan-list');

  if (heading) heading.textContent = cfg.heading;

  if (list) {
    list.innerHTML = cfg.days.map(d => {
      const details = d.items.map(i => `<span class="plan-detail">${esc(i)}</span>`).join('<br>');
      return `
        <li class="plan-item">
          <div class="plan-day">${esc(d.label)}</div>
          ${details}
        </li>
      `;
    }).join('');
  }
}

/* ============================================================
   6. THE PEAKS
   ============================================================ */
function initPeaks() {
  const cfg = TEXT_CONFIG.peaks;
  const heading = el('peaks-heading');
  const groups = el('peaks-groups');
  const flavour = el('peaks-flavour');

  if (heading) heading.textContent = cfg.heading;

  if (groups) {
    groups.innerHTML = cfg.groups.map(g => `
      <div class="peaks-group">
        <h3>${esc(g.label)}</h3>
        <div class="peaks-cards">
          ${g.items.map(item => `
            <a href="${esc(item.url)}" target="_blank" rel="noopener" class="peak-card">
              <strong>${esc(item.name)}</strong>
              <span>${esc(item.desc)}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  if (flavour && cfg.flavour) {
    flavour.innerHTML = `
      <div class="flavour-box">${cfg.flavour.fossil}</div>
      <div class="flavour-box">${cfg.flavour.trespass}</div>
    `;
  }
}

/* ============================================================
   7. CHECKLIST
   ============================================================ */
const CHECKLIST_PREFIX = 'newfold:checklist:';

function initChecklist() {
  const cfg = TEXT_CONFIG.checklist;
  const heading = el('checklist-heading');
  const resetBtn = el('checklist-reset');
  const groupsEl = el('checklist-groups');

  if (heading) heading.textContent = cfg.heading;
  if (resetBtn) {
    resetBtn.textContent = cfg.resetLabel;
    resetBtn.addEventListener('click', resetChecklist);
  }

  if (!groupsEl) return;

  groupsEl.innerHTML = cfg.groups.map(group => `
    <div class="checklist-group">
      <h3>${esc(group.label)}</h3>
      <ul class="checklist-items" role="list">
        ${group.items.map(item => {
          const checked = ls(CHECKLIST_PREFIX + item.id) === '1';
          return `
            <li class="checklist-item${checked ? ' checked' : ''}" data-id="${esc(item.id)}">
              <input type="checkbox" id="${esc(item.id)}" ${checked ? 'checked' : ''}
                     aria-label="${esc(item.label)}">
              <label for="${esc(item.id)}">${esc(item.label)}</label>
            </li>
          `;
        }).join('')}
      </ul>
    </div>
  `).join('');

  // Event delegation on the container
  groupsEl.addEventListener('change', function(e) {
    if (e.target.type !== 'checkbox') return;
    const li = e.target.closest('.checklist-item');
    if (!li) return;
    const id = li.dataset.id;
    if (e.target.checked) {
      lsSet(CHECKLIST_PREFIX + id, '1');
      li.classList.add('checked');
    } else {
      lsRemove(CHECKLIST_PREFIX + id);
      li.classList.remove('checked');
    }
  });
}

function resetChecklist() {
  const cfg = TEXT_CONFIG.checklist;
  cfg.groups.forEach(group => {
    group.items.forEach(item => lsRemove(CHECKLIST_PREFIX + item.id));
  });
  // Re-render
  const groupsEl = el('checklist-groups');
  if (!groupsEl) return;
  groupsEl.querySelectorAll('.checklist-item').forEach(li => {
    li.classList.remove('checked');
    const cb = li.querySelector('input[type="checkbox"]');
    if (cb) cb.checked = false;
  });
}

/* ============================================================
   8a. NATURE BINGO
   ============================================================ */
const BINGO_CARD_KEY = 'newfold:bingo:card';    // JSON array of item ids (current 9)
const BINGO_MARKS_KEY = 'newfold:bingo:marks';  // JSON array of marked item ids

let bingoCard = [];   // current 9 items [{id, label}]
let bingoMarks = new Set();

function bingoSave() {
  lsSet(BINGO_CARD_KEY, JSON.stringify(bingoCard.map(i => i.id)));
  lsSet(BINGO_MARKS_KEY, JSON.stringify([...bingoMarks]));
}

function bingoNewCard() {
  const cfg = TEXT_CONFIG.bingo;
  bingoCard = shuffle(cfg.pool).slice(0, 9);
  bingoMarks = new Set();
  bingoSave();
  renderBingo();
}

function renderBingo() {
  const cfg = TEXT_CONFIG.bingo;
  const grid = el('bingo-grid');
  const banner = el('bingo-banner');
  const reshuffleBtn = el('bingo-reshuffle');

  if (reshuffleBtn) {
    reshuffleBtn.textContent = cfg.reshuffleLabel;
    reshuffleBtn.onclick = bingoNewCard;
  }

  if (!grid) return;

  grid.innerHTML = bingoCard.map((item, idx) => {
    const marked = bingoMarks.has(item.id);
    // Show just the label text (emoji included)
    return `
      <div class="bingo-cell${marked ? ' marked' : ''}"
           role="gridcell"
           data-idx="${idx}"
           aria-label="${esc(item.label)}"
           aria-pressed="${marked}"
           tabindex="0">
        ${esc(item.label)}
      </div>
    `;
  }).join('');

  // Tap / keyboard to mark
  grid.querySelectorAll('.bingo-cell').forEach(cell => {
    cell.addEventListener('click', () => bingoToggle(parseInt(cell.dataset.idx)));
    cell.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        bingoToggle(parseInt(cell.dataset.idx));
      }
    });
  });

  // Full card banner
  const allMarked = bingoMarks.size >= 9;
  if (banner) {
    banner.style.display = allMarked ? 'block' : 'none';
    banner.textContent = cfg.fullCard;
  }
}

function bingoToggle(idx) {
  const item = bingoCard[idx];
  if (!item) return;
  if (bingoMarks.has(item.id)) {
    bingoMarks.delete(item.id);
  } else {
    bingoMarks.add(item.id);
  }
  bingoSave();
  renderBingo();
}

function initBingo() {
  const cfg = TEXT_CONFIG.bingo;
  const heading = el('bingo-heading');
  if (heading) heading.textContent = cfg.heading;

  // Restore or generate card
  const savedCardIds = ls(BINGO_CARD_KEY);
  const savedMarks = ls(BINGO_MARKS_KEY);

  if (savedCardIds) {
    try {
      const ids = JSON.parse(savedCardIds);
      bingoCard = ids.map(id => cfg.pool.find(p => p.id === id)).filter(Boolean);
    } catch (e) { bingoCard = []; }
  }
  if (bingoCard.length !== 9) {
    bingoCard = shuffle(cfg.pool).slice(0, 9);
  }

  if (savedMarks) {
    try {
      bingoMarks = new Set(JSON.parse(savedMarks));
    } catch (e) { bingoMarks = new Set(); }
  }

  bingoSave();
  renderBingo();
}

/* ============================================================
   8b. SQUELCH-O-METER
   ============================================================ */
const KIDS_LIST_KEY = 'newfold:kids:list';
const SQUELCH_PREFIX = 'newfold:squelch:';

let kidsList = [];  // [{id, name}]

function squelchLoad() {
  try {
    kidsList = JSON.parse(ls(KIDS_LIST_KEY) || '[]');
  } catch (e) { kidsList = []; }
}

function squelchSave() {
  lsSet(KIDS_LIST_KEY, JSON.stringify(kidsList));
}

function squelchDateKey() {
  // Rating is per calendar day in local time
  return todayKey();
}

function squelchGetRating(kidId) {
  const key = SQUELCH_PREFIX + squelchDateKey() + ':' + kidId;
  return parseInt(ls(key) || '0', 10);
}

function squelchSetRating(kidId, rating) {
  const key = SQUELCH_PREFIX + squelchDateKey() + ':' + kidId;
  lsSet(key, String(rating));
}

/** Total welly points across ALL days for a kid */
function squelchTotal(kidId) {
  let total = 0;
  try {
    const prefix = SQUELCH_PREFIX;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix) && k.endsWith(':' + kidId)) {
        total += parseInt(localStorage.getItem(k) || '0', 10);
      }
    }
  } catch (e) { /* ignore */ }
  return total;
}

/** Count of days a kid has an entry */
function squelchEntryCount(kidId) {
  let count = 0;
  try {
    const prefix = SQUELCH_PREFIX;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix) && k.endsWith(':' + kidId)) {
        const val = parseInt(localStorage.getItem(k) || '0', 10);
        if (val > 0) count++;
      }
    }
  } catch (e) { /* ignore */ }
  return count;
}

function shouldShowReveal() {
  if (kidsList.length === 0) return false;
  const today = todayKey();
  if (today >= '2026-05-04') return true;
  // Show if every kid has ≥3 entries
  return kidsList.every(k => squelchEntryCount(k.id) >= 3);
}

function renderSquelch() {
  const cfg = TEXT_CONFIG.squelch;
  const heading = el('squelch-heading');
  const subhead = el('squelch-subhead');
  const empty = el('squelch-empty');
  const kidsEl = el('squelch-kids');
  const reveal = el('squelch-reveal');
  const revealText = el('squelch-reveal-text');
  const revealScore = el('squelch-reveal-score');
  const nameInput = el('squelch-name-input');
  const addBtn = el('squelch-add-btn');

  if (heading) heading.textContent = cfg.heading;
  if (subhead) subhead.textContent = cfg.subhead;
  if (nameInput) nameInput.placeholder = cfg.addPlaceholder;
  if (addBtn) addBtn.textContent = cfg.addLabel;

  // Empty state
  if (empty) {
    empty.textContent = cfg.emptyPrompt;
    empty.style.display = kidsList.length === 0 ? 'block' : 'none';
  }

  // Monday reveal
  if (reveal && revealText && revealScore) {
    if (shouldShowReveal() && kidsList.length > 0) {
      // Find winner
      const totals = kidsList.map(k => ({ name: k.name, total: squelchTotal(k.id) }));
      totals.sort((a, b) => b.total - a.total);
      const winner = totals[0];
      revealText.textContent = `${cfg.revealHeading}: ${winner.name}`;
      revealScore.textContent = `${winner.total} welly point${winner.total !== 1 ? 's' : ''}`;
      reveal.style.display = 'block';
    } else {
      reveal.style.display = 'none';
    }
  }

  if (!kidsEl) return;

  kidsEl.innerHTML = kidsList.map(kid => {
    const rating = squelchGetRating(kid.id);
    const wellies = Array.from({ length: 5 }, (_, i) => {
      const active = i < rating;
      return `<button class="welly-btn${active ? ' active' : ''}"
                      data-kid="${esc(kid.id)}" data-val="${i + 1}"
                      aria-label="Rate ${esc(kid.name)} ${i + 1} welly${i !== 0 ? 's' : ''}"
                      aria-pressed="${active}">🥾</button>`;
    }).join('');

    return `
      <div class="squelch-row" data-kid="${esc(kid.id)}">
        <span class="squelch-name" title="${esc(kid.name)}">${esc(kid.name)}</span>
        <div class="squelch-wellies">${wellies}</div>
        <button class="squelch-remove" data-kid="${esc(kid.id)}"
                aria-label="Remove ${esc(kid.name)}">✕</button>
      </div>
    `;
  }).join('');

  // Welly rating clicks
  kidsEl.querySelectorAll('.welly-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const kidId = btn.dataset.kid;
      const val = parseInt(btn.dataset.val, 10);
      const current = squelchGetRating(kidId);
      // Clicking the same rating toggles off
      squelchSetRating(kidId, current === val ? 0 : val);
      renderSquelch();
    });
  });

  // Remove kid
  kidsEl.querySelectorAll('.squelch-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const kidId = btn.dataset.kid;
      kidsList = kidsList.filter(k => k.id !== kidId);
      squelchSave();
      renderSquelch();
    });
  });
}

function initSquelch() {
  squelchLoad();
  renderSquelch();

  const addBtn = el('squelch-add-btn');
  const nameInput = el('squelch-name-input');

  function addKid() {
    const name = (nameInput ? nameInput.value : '').trim();
    if (!name) return;
    const id = 'kid-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    kidsList.push({ id, name });
    squelchSave();
    if (nameInput) nameInput.value = '';
    renderSquelch();
  }

  if (addBtn) addBtn.addEventListener('click', addKid);
  if (nameInput) {
    nameInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); addKid(); }
    });
  }
}

/* ============================================================
   9. MEMORY WALL
   ============================================================ */
function initMemoryWall() {
  const cfg = TEXT_CONFIG.memoryWall;
  const heading = el('memory-wall-heading');
  const body = el('memory-wall-body');
  const subhead = el('memory-wall-subhead');
  const btn = el('memory-wall-btn');
  const pending = el('memory-wall-pending');

  if (heading) heading.textContent = cfg.heading;
  if (body) body.textContent = cfg.body;
  if (subhead) subhead.textContent = cfg.subhead;
  if (btn) btn.textContent = cfg.buttonLabel;

  if (cfg.dropboxUrl) {
    if (btn) btn.href = cfg.dropboxUrl;
    if (pending) pending.hidden = true;
  } else {
    // URL not yet set — button shows but explain it's pending
    if (btn) {
      btn.removeAttribute('href');
      btn.setAttribute('href', '#');
      btn.addEventListener('click', e => {
        e.preventDefault();
        alert(cfg.pendingNote);
      });
    }
    if (pending) {
      pending.textContent = cfg.pendingNote;
      pending.hidden = false;
    }
  }
}

/* ============================================================
   10. QR CODE
   ============================================================ */
function initQR() {
  const cfg = TEXT_CONFIG.share;
  const heading = el('share-heading');
  const body = el('share-body');
  const canvas = el('qr-canvas');

  if (heading) heading.textContent = cfg.heading;
  if (body) body.textContent = cfg.body;

  if (!canvas) return;

  const siteUrl = window.location.origin + window.location.pathname;

  // QRCode.js (vendored) — uses QRCode global
  if (typeof QRCode !== 'undefined') {
    try {
      QRCode.toCanvas(canvas, siteUrl, {
        width: 200,
        margin: 2,
        color: { dark: '#1f2a22', light: '#ffffff' },
      });
    } catch (e) {
      console.warn('QR render failed:', e);
    }
  } else {
    // Fallback: show text URL
    canvas.style.display = 'none';
    const p = document.createElement('p');
    p.style.wordBreak = 'break-all';
    p.style.fontSize = '0.8rem';
    p.textContent = siteUrl;
    canvas.parentNode.insertBefore(p, canvas.nextSibling);
  }
}

/* ============================================================
   11. FOOTER
   ============================================================ */
function initFooter() {
  const cfg = TEXT_CONFIG.footer;
  const campsiteEl = el('footer-campsite');
  const phoneEl = el('footer-phone');
  const winkEl = el('footer-wink');

  if (campsiteEl) {
    campsiteEl.innerHTML = `<a href="${esc(cfg.campsiteUrl)}" target="_blank" rel="noopener">${esc(cfg.campsiteLabel)}</a>`;
  }
  if (phoneEl) {
    phoneEl.innerHTML = `<a href="tel:${esc(cfg.campsitePhone)}">${esc(cfg.campsitePhone)}</a>`;
  }
  if (winkEl) winkEl.textContent = cfg.wink;
}

/* ============================================================
   ESCAPE HELPER (prevent XSS in innerHTML)
   ============================================================ */
function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof TEXT_CONFIG === 'undefined') {
    console.error('TEXT_CONFIG not found — check text-config.js is loaded');
    return;
  }

  initHero();
  initMission();
  initGettingThere();
  initWeather();
  initPlan();
  initPeaks();
  initChecklist();
  initBingo();
  initSquelch();
  initMemoryWall();
  initQR();
  initFooter();
});
