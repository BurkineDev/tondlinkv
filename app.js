/* ============================================================
   TONDLINK — Main JavaScript
   ============================================================ */

// ── Navbar hamburger ────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');
const navClose   = document.getElementById('navClose');

if (menuToggle) {
  menuToggle.addEventListener('click', () => mobileNav.classList.add('open'));
}
if (navClose) {
  navClose.addEventListener('click', () => mobileNav.classList.remove('open'));
}
if (mobileNav) {
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) mobileNav.classList.remove('open');
  });
}

// ── Toast helper ─────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Hero search ──────────────────────────────────────────────
function doHeroSearch() {
  const q = document.getElementById('heroSearch')?.value.trim();
  if (q) {
    window.location.href = `marche.html?q=${encodeURIComponent(q)}`;
  } else {
    window.location.href = 'marche.html';
  }
}

const heroSearchInput = document.getElementById('heroSearch');
if (heroSearchInput) {
  heroSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') doHeroSearch();
  });
}

// ── Homepage offer chips filter ──────────────────────────────
const filterChips = document.querySelectorAll('.filter-chip[data-filter]');
filterChips.forEach(chip => {
  chip.addEventListener('click', function () {
    filterChips.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    const f = this.dataset.filter;
    document.querySelectorAll('#offersGrid .offer-card').forEach(card => {
      card.style.display = (f === 'all' || card.dataset.cat === f) ? 'block' : 'none';
    });
  });
});

// ── Cooperatives page filter ─────────────────────────────────
function filterCoops() {
  const search  = (document.getElementById('coopSearch')?.value || '').toLowerCase();
  const filiere = document.getElementById('filterFiliere')?.value || '';
  const region  = document.getElementById('filterRegion')?.value  || '';
  const contact = document.getElementById('filterContact')?.value || '';

  const cards = document.querySelectorAll('#coopsGrid .coop-card');
  let visible = 0;

  cards.forEach(card => {
    const name    = (card.dataset.name    || '').toLowerCase();
    const fili    = card.dataset.filiere  || '';
    const reg     = card.dataset.region   || '';
    const cont    = card.dataset.contact  || '';
    const text    = card.textContent.toLowerCase();

    const matchSearch  = !search  || text.includes(search) || name.includes(search);
    const matchFiliere = !filiere || fili === filiere;
    const matchRegion  = !region  || reg === region;
    const matchContact = !contact || cont.includes(contact);

    const show = matchSearch && matchFiliere && matchRegion && matchContact;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  const countEl = document.getElementById('coopCount');
  if (countEl) countEl.innerHTML = `Affichage de <strong>${visible} coopérative${visible !== 1 ? 's' : ''}</strong>`;

  const emptyEl = document.getElementById('coopEmpty');
  if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
}

function clearCoopFilters() {
  ['coopSearch', 'filterFiliere', 'filterRegion', 'filterContact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  filterCoops();
}

function sortCoops(val) {
  const grid = document.getElementById('coopsGrid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.coop-card')];
  cards.sort((a, b) => {
    if (val === 'name')   return (a.dataset.name || '').localeCompare(b.dataset.name || '');
    if (val === 'region') return (a.dataset.region || '').localeCompare(b.dataset.region || '');
    return 0;
  });
  cards.forEach(c => grid.appendChild(c));
}

// ── Buyers/Transformers page filter ─────────────────────────
let currentBuyerType = 'all';

function filterBuyers(type, btn) {
  currentBuyerType = type;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyBuyerFilters();
}

function applyBuyerFilters() {
  const search  = (document.getElementById('buyerSearch')?.value || '').toLowerCase();
  const filiere = document.getElementById('buyerFiliere')?.value || '';
  const region  = document.getElementById('buyerRegion')?.value  || '';

  const cards = document.querySelectorAll('#buyersGrid .buyer-card');
  let visible = 0;

  cards.forEach(card => {
    const type   = card.dataset.type  || '';
    const fili   = card.dataset.filiere || '';
    const reg    = card.dataset.region  || '';
    const name   = (card.dataset.name || '').toLowerCase();
    const text   = card.textContent.toLowerCase();

    const matchType    = currentBuyerType === 'all' || type === currentBuyerType;
    const matchSearch  = !search  || text.includes(search) || name.includes(search);
    const matchFiliere = !filiere || fili === filiere;
    const matchRegion  = !region  || reg === region;

    const show = matchType && matchSearch && matchFiliere && matchRegion;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  const countEl = document.getElementById('buyerCount');
  if (countEl) countEl.innerHTML = `Affichage de <strong>${visible} partenaire${visible !== 1 ? 's' : ''}</strong>`;

  const emptyEl = document.getElementById('buyerEmpty');
  if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
}

function clearBuyerFilters() {
  ['buyerSearch', 'buyerFiliere', 'buyerRegion', 'buyerVolume'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  currentBuyerType = 'all';
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const allTab = document.querySelector('.tab-btn[data-tab="all"]');
  if (allTab) allTab.classList.add('active');
  applyBuyerFilters();
}

// ── Marché page filter ───────────────────────────────────────
const marcheChips = document.querySelectorAll('.filter-chip[data-marche-filter]');
marcheChips.forEach(chip => {
  chip.addEventListener('click', function () {
    marcheChips.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    const cat = document.getElementById('marcheCategorie');
    if (cat) cat.value = this.dataset.marcheFilter === 'all' ? '' : this.dataset.marcheFilter;
    filterMarche();
  });
});

function filterMarche() {
  const search   = (document.getElementById('marcheSearch')?.value   || '').toLowerCase();
  const categorie= document.getElementById('marcheCategorie')?.value  || '';
  const region   = document.getElementById('marcheRegion')?.value    || '';
  const prixMax  = parseFloat(document.getElementById('marchePrix')?.value) || Infinity;

  const cards = document.querySelectorAll('#marcheGrid .offer-card');
  let visible = 0;

  cards.forEach(card => {
    const cat   = card.dataset.cat    || '';
    const reg   = card.dataset.region || '';
    const price = parseFloat(card.dataset.price) || 0;
    const text  = card.textContent.toLowerCase();

    const matchSearch = !search   || text.includes(search);
    const matchCat    = !categorie || cat === categorie;
    const matchReg    = !region   || reg === region;
    const matchPrice  = price <= prixMax;

    const show = matchSearch && matchCat && matchReg && matchPrice;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  const countEl = document.getElementById('marcheCount');
  if (countEl) countEl.innerHTML = `Affichage de <strong>${visible} offre${visible !== 1 ? 's' : ''}</strong>`;

  const emptyEl = document.getElementById('marcheEmpty');
  if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
}

function clearMarcheFilters() {
  ['marcheSearch', 'marcheCategorie', 'marcheRegion', 'marchePrix'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  marcheChips.forEach(c => c.classList.remove('active'));
  const allChip = document.querySelector('.filter-chip[data-marche-filter="all"]');
  if (allChip) allChip.classList.add('active');
  filterMarche();
}

// ── Handle ?q= on marché page ────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    const searchInput = document.getElementById('marcheSearch');
    if (searchInput) {
      searchInput.value = q;
      filterMarche();
    }
  }
});

// ── Contact form ─────────────────────────────────────────────
function submitContact(e) {
  e.preventDefault();
  showToast('Votre message a été envoyé ! Nous vous répondrons dans les 24h.');
  e.target.reset();
}

// ── FAQ toggle ────────────────────────────────────────────────
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    el.classList.add('open');
    answer.classList.add('open');
  }
}

// ── Load more (producteurs) ───────────────────────────────────
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', function () {
    showToast('Chargement de plus de coopératives en cours…');
    this.disabled = true;
    this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Chargement…';
    setTimeout(() => {
      this.innerHTML = '<i class="fa-solid fa-check"></i> Toutes les coopératives sont affichées';
      this.classList.add('btn-outline');
    }, 1500);
  });
}

// ── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Navbar scroll effect ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,.12)'
      : '0 1px 3px rgba(0,0,0,.08)';
  }
});
