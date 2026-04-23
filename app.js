/**
 * app.js — Newfold Farm Crew v2
 * All DOM binding + interactive features.
 * Reads from TEXT_CONFIG (text-config.js) exclusively.
 *
 * Locked behaviours (bingo, squelch, checklist, mission) copied verbatim from v1.
 * New in v2: initTabs(), initKitList(), fixed initQR().
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
   TAB NAVIGATION (new in v2)
   localStorage key: newfold:activeTab
   ============================================================ */
const ACTIVE_TAB_KEY = 'newfold:activeTab';
const KNOWN_SLUGS = ['home', 'getting-there', 'peaks', 'kit', 'kids', 'photos'];

function initTabs() {
  // Determine active tab: hash > localStorage > default 'home'
  let active = 'home';
  const hash = (window.location.hash || '').replace('#', '');
  if (KNOWN_SLUGS.includes(hash)) {
    active = hash;
  } else {
    const saved = ls(ACTIVE_TAB_KEY);
    if (saved && KNOWN_SLUGS.includes(saved)) active = saved;
  }

  function updateNavScrollState() {
    const wrap = document.querySelector('.tab-nav-wrap');
    const nav = document.querySelector('.tab-nav');
    if (!wrap || !nav) return;
    const left = nav.scrollLeft;
    const max = nav.scrollWidth - nav.clientWidth;
    wrap.classList.toggle('not-at-start', left > 4);
    wrap.classList.toggle('at-end', left >= max - 4);
  }

  function switchTab(slug) {
    KNOWN_SLUGS.forEach(s => {
      const btn = el('tab-' + s);
      const panel = el('panel-' + s);
      const isActive = s === slug;
      if (btn) btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (panel) {
        if (isActive) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      }
    });
    lsSet(ACTIVE_TAB_KEY, slug);
    history.replaceState(null, '', '#' + slug);
    updateNavScrollState();
  }

  // Bind click handlers
  KNOWN_SLUGS.forEach(slug => {
    const btn = el('tab-' + slug);
    if (btn) {
      btn.addEventListener('click', () => switchTab(slug));
    }
  });

  // Apply initial state
  switchTab(active);

  // Scroll active tab into view on mobile
  requestAnimationFrame(() => {
    const activeBtn = document.querySelector('.tab-btn[aria-selected="true"]');
    if (activeBtn && typeof activeBtn.scrollIntoView === 'function') {
      activeBtn.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
    }
    updateNavScrollState();
  });

  // Scroll + resize listeners for fade state
  const navEl = document.querySelector('.tab-nav');
  if (navEl) {
    navEl.addEventListener('scroll', updateNavScrollState, { passive: true });
  }
  window.addEventListener('resize', updateNavScrollState, { passive: true });
}

/* ============================================================
   1. HERO
   ============================================================ */
function initHero() {
  const cfg = TEXT_CONFIG.hero;
  const h = el('hero-headline');
  const s = el('hero-subtitle');
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
  const prelude = el('plan-prelude');
  const caveat = el('plan-caveat');

  if (heading) heading.textContent = cfg.heading;
  if (prelude) prelude.textContent = cfg.prelude || '';
  if (caveat) caveat.textContent = cfg.caveatFooter || '';

  if (list) {
    list.innerHTML = cfg.days.map(d => {
      const detail = (d.items || []).map(esc).join(' ');
      return `
        <li class="plan-item">
          <div class="plan-day">${esc(d.label)}</div>
          <span class="plan-detail">${detail}</span>
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
              <div class="peak-item">
                ${item.image ? `<img class="peak-image" loading="lazy" decoding="async" src="${esc(item.image)}" alt="${esc(item.imageAlt || '')}">` : ''}
                <strong>${esc(item.name)}</strong>
                <span>${esc(item.desc)}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  if (flavour && Array.isArray(cfg.flavour)) {
    flavour.innerHTML = cfg.flavour
      .map(line => `<div class="flavour-box">${esc(line).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</div>`)
      .join('');
  }
}

/* ============================================================
   7. KIT LIST — drillable UX (new in v2)
   localStorage key: newfold:kit:activeCategory
   Tick state: newfold:checklist:<itemId>  (same as v1)
   ============================================================ */
const CHECKLIST_PREFIX = 'newfold:checklist:';
const KIT_CATEGORY_KEY = 'newfold:kit:activeCategory';

function kitTickCount(cat) {
  let ticked = 0;
  cat.items.forEach(item => {
    if (ls(CHECKLIST_PREFIX + item.id) === '1') ticked++;
  });
  return ticked;
}

function renderKitGrid() {
  const cats = TEXT_CONFIG.kitCategories;
  const root = el('kit-root');
  if (!root || !cats) return;

  root.innerHTML = `
    <div class="kit-category-grid">
      ${cats.map(cat => {
        const total = cat.items.length;
        const ticked = kitTickCount(cat);
        const hasTicked = ticked > 0;
        const badgeText = hasTicked
          ? `${ticked} / ${total} packed`
          : `${total} items`;
        return `
          <button class="kit-category-card" data-cat-id="${esc(cat.id)}" aria-label="${esc(cat.title)}: ${esc(badgeText)}">
            <span class="kit-cat-emoji" aria-hidden="true">${cat.emoji}</span>
            <span class="kit-cat-title">${esc(cat.title)}</span>
            <span class="kit-cat-badge${hasTicked ? ' has-ticked' : ''}">${esc(badgeText)}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;

  root.querySelectorAll('.kit-category-card').forEach(btn => {
    btn.addEventListener('click', () => {
      lsSet(KIT_CATEGORY_KEY, btn.dataset.catId);
      renderKitCategory(btn.dataset.catId);
    });
  });
}

function renderKitCategory(catId) {
  const cats = TEXT_CONFIG.kitCategories;
  const cat = cats && cats.find(c => c.id === catId);
  const root = el('kit-root');
  if (!root || !cat) return;

  root.innerHTML = `
    <button class="kit-back-btn" id="kit-back">← All categories</button>
    <div class="kit-category-heading">${cat.emoji} ${esc(cat.title)}</div>
    <ul class="checklist-items" role="list">
      ${cat.items.map(item => {
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
  `;

  // Back button
  const backBtn = el('kit-back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      lsRemove(KIT_CATEGORY_KEY);
      renderKitGrid();
    });
  }

  // Tick handlers with live badge updates
  root.querySelectorAll('.checklist-item').forEach(li => {
    const cb = li.querySelector('input[type="checkbox"]');
    if (!cb) return;
    cb.addEventListener('change', () => {
      const id = li.dataset.id;
      if (cb.checked) {
        lsSet(CHECKLIST_PREFIX + id, '1');
        li.classList.add('checked');
      } else {
        lsRemove(CHECKLIST_PREFIX + id);
        li.classList.remove('checked');
      }
    });
  });
}

function initKitList() {
  const cfg = TEXT_CONFIG.checklist;
  const heading = el('checklist-heading');
  const resetBtn = el('checklist-reset');

  if (heading) heading.textContent = cfg.heading;
  if (resetBtn) {
    resetBtn.textContent = cfg.resetLabel;
    resetBtn.addEventListener('click', () => {
      // Clear ALL checklist keys (v1 keys + v2 kit keys)
      const keysToRemove = [];
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(CHECKLIST_PREFIX)) keysToRemove.push(k);
        }
      } catch (e) { /* ignore */ }
      keysToRemove.forEach(k => lsRemove(k));
      // Re-render current view
      const activeCat = ls(KIT_CATEGORY_KEY);
      if (activeCat) {
        renderKitCategory(activeCat);
      } else {
        renderKitGrid();
      }
    });
  }

  // Restore last open category or show grid
  const activeCat = ls(KIT_CATEGORY_KEY);
  if (activeCat && TEXT_CONFIG.kitCategories && TEXT_CONFIG.kitCategories.find(c => c.id === activeCat)) {
    renderKitCategory(activeCat);
  } else {
    renderKitGrid();
  }
}

/* ============================================================
   8a. NATURE BINGO — VERBATIM FROM v1
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

function initKidsCorner() {
  const cfg = TEXT_CONFIG.kidsCorner;
  if (!cfg) return;
  const heading = el('kids-corner-heading');
  if (heading) heading.textContent = cfg.heading;
  const disclaimer = el('kids-corner-disclaimer');
  if (disclaimer) disclaimer.textContent = cfg.disclaimer;
  const nudge = el('mission-nudge');
  if (nudge) nudge.textContent = cfg.missionNudge;
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
   8b. SQUELCH-O-METER — VERBATIM FROM v1
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
   9. MEMORY WALL — VERBATIM FROM v1
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
   10. QR CODE — FIXED in v2 (use new QRCode(el, opts) API)
   ============================================================ */
function initQR() {
  const canvas = document.getElementById('qr-canvas');
  const cfg = TEXT_CONFIG.share;
  const heading = document.getElementById('share-heading');
  const body = document.getElementById('share-body');
  if (heading) heading.textContent = cfg.heading;
  if (body) body.textContent = cfg.body;
  if (!canvas || typeof QRCode === 'undefined') return;
  new QRCode(canvas, {
    text: window.location.origin + window.location.pathname,
    width: 200, height: 200,
    colorDark: '#1f2a22', colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M,
  });
}

/* ============================================================
   11. FOOTER — VERBATIM FROM v1
   ============================================================ */
function initFooter() {
  const cfg = TEXT_CONFIG.footer;
  const campsiteEl = el('footer-campsite');
  const phoneEl = el('footer-phone');
  const winkEl = el('footer-wink');
  const heroCreditEl = el('footer-hero-credit');
  const peaksCreditEl = el('footer-peaks-credit');

  if (campsiteEl) {
    campsiteEl.innerHTML = `<a href="${esc(cfg.campsiteUrl)}" target="_blank" rel="noopener">${esc(cfg.campsiteLabel)}</a>`;
  }
  if (phoneEl) {
    phoneEl.innerHTML = `<a href="tel:${esc(cfg.campsitePhone)}">${esc(cfg.campsitePhone)}</a>`;
  }
  if (winkEl) winkEl.textContent = cfg.wink;
  if (heroCreditEl && cfg.heroCredit) heroCreditEl.textContent = cfg.heroCredit;
  if (peaksCreditEl && cfg.peaksCredit) peaksCreditEl.textContent = cfg.peaksCredit;
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof TEXT_CONFIG === 'undefined') {
    console.error('TEXT_CONFIG not found — check text-config.js is loaded');
    return;
  }

  // Tab wiring FIRST — establishes panel visibility before other inits run
  initTabs();

  initHero();
  initMission();
  initGettingThere();
  initWeather();
  initPlan();
  initPeaks();
  initKitList();
  initKidsCorner();
  initBingo();
  initSquelch();
  initMemoryWall();
  initQR();
  initFooter();
});
