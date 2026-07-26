import { db } from './firebase.js';
import { renderHeader, initHeaderEvents } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { renderCartDrawer, initCartEvents } from './components/CartDrawer.js';

// Base application structure
document.querySelector('#app').innerHTML = `
  ${renderCartDrawer()}
  ${renderHeader()}
  <main id="main-content"></main>
  ${renderFooter()}
`;

// Simple SPA Router
import { renderCatalogPage, initCatalogLogic } from './pages/Catalog.js';
import { renderHomePage } from './pages/Home.js';
import { renderProductDetailPage, initProductDetailLogic } from './pages/ProductDetail.js';
import { renderCheckoutPage, initCheckoutLogic } from './pages/Checkout.js';
import { renderGamePage, initGameLogic } from './pages/Game.js';
import { updateCartProductCache } from './cart.js';
import { ref, onValue } from './firebase.js';

function router() {
  const path = window.location.pathname;
  const main = document.getElementById('main-content');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  
  // Clean up game-specific body classes on every route shift
  document.body.classList.remove('game-page-active', 'lavender-theme', 'pastel-theme');
  
  // IMMERSIVE FULLSCREEN MODE FOR GAME
  if (path.startsWith('/oyun')) {
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
  } else {
    if (header) header.style.display = 'flex';
    if (footer) footer.style.display = 'block';
  }
  
  if (path === '/' || path === '/index.html') {
    main.innerHTML = renderHomePage();
  } else if (path.startsWith('/siparis')) {
    main.innerHTML = renderCatalogPage();
    initCatalogLogic();
  } else if (path.startsWith('/urun')) {
    main.innerHTML = renderProductDetailPage();
    initProductDetailLogic();
  } else if (path.startsWith('/checkout')) {
    main.innerHTML = renderCheckoutPage();
    initCheckoutLogic();
  } else if (path.startsWith('/oyun')) {
    main.innerHTML = renderGamePage();
    initGameLogic();
  } else {
    main.innerHTML = `<div class="container section-py text-center">
      <img src="https://resim.chooktemiz.com/stoklar/ChookShirin.png" alt="Sayfa Bulunamadı" style="width:150px; margin-bottom: 2rem;">
      <h2>404 - Sayfa Bulunamadı</h2>
    </div>`;
  }
}

// Global Nav Clicks Handling (To prevent full page reload)
document.body.addEventListener('click', e => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState(null, null, e.target.href);
    router();
  }
});

// History Back/Forward
window.addEventListener('popstate', router);

// Render basic layout blocks (We will build these in Phase 3)
function initLayout() {
  initHeaderEvents();
  initCartEvents();
  // Start router
  router();

  // Load products once to hydrate cart globally
  onValue(ref(db, 'stoklar'), (snapshot) => {
    const products = snapshot.val() || {};
    updateCartProductCache(products);
  });
}

// Startup
initLayout();
