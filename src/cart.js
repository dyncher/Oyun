import { db, ref, push, set } from './firebase.js';

let cart = JSON.parse(localStorage.getItem('chook_cart_v2')) || [];
let productsCache = {};

// Helper to keep products up to date for pricing
export function updateCartProductCache(products) {
  productsCache = { ...productsCache, ...products };
  renderCart();
}

export function addToCart(barkod) {
  if (!productsCache[barkod]) return; // Error case

  const existingIdx = cart.findIndex(i => i.id === barkod);
  if (existingIdx > -1) {
    cart[existingIdx].qty += 1;
  } else {
    cart.push({ id: barkod, qty: 1 });
  }

  saveAndRender();
  // Open drawer automatically
  document.getElementById('cart-drawer').style.right = '0';
  document.getElementById('cart-drawer-overlay').style.display = 'block';
  document.getElementById('cart-drawer-overlay').style.opacity = '1';
}

export function updateQty(barkod, delta) {
  const existingIdx = cart.findIndex(i => i.id === barkod);
  if (existingIdx === -1) return;

  cart[existingIdx].qty += delta;
  
  if (cart[existingIdx].qty <= 0) {
    cart.splice(existingIdx, 1);
  }

  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('chook_cart_v2', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const badge = document.getElementById('cart-badge');
  const totalEl = document.getElementById('cart-total');

  if (!container || !badge || !totalEl) return;

  let totalNum = 0;
  let itemCount = 0;
  let html = "";

  cart.forEach(item => {
    const p = productsCache[item.id];
    if (!p) return; // Might be loading

    const price = parseFloat(p.fiyat || 0);
    totalNum += (price * item.qty);
    itemCount += item.qty;

    // Image fallback
    let cardImg = "https://resim.chooktemiz.com/stoklar/ChookShirin.png";
    if (p.gorsel && p.gorsel !== "ChookShirin.png" && p.gorsel.length > 5) {
      cardImg = p.gorsel.startsWith('http') ? p.gorsel : `https://resim.chooktemiz.com/stoklar/${p.gorsel}`;
    } else {
      const sonBes = item.id.toString().slice(-5);
      cardImg = `https://resim.chooktemiz.com/stoklar/${sonBes}.jpg`;
    }

    html += `
      <div style="display: flex; gap: 1rem; align-items: center; background: var(--white); padding: 1rem; border-radius: 1rem; border: 1px solid var(--glass-border); position: relative;">
                         
        <div style="width: 60px; height: 60px; background: var(--bg-color); border-radius: 0.5rem; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden;">
          <img src="${cardImg}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-size: 0.85rem; margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-dark);">${p.aciklama}</h4>
          <div style="font-weight: 900; font-family: monospace; color: var(--chook-dark);">${price.toFixed(2)} ₺</div>
        </div>

        <div style="display: flex; align-items: center; background: var(--bg-color); border-radius: 100px; padding: 0.2rem; border: 1px solid var(--glass-border);">
          <button onclick="window.updateCartQty('${item.id}', -1)" style="width: 24px; height: 24px; border: none; background: white; border-radius: 50%; cursor: pointer; color: var(--text-dark); font-weight: bold;">-</button>
          <span style="width: 30px; text-align: center; font-size: 0.8rem; font-weight: 800;">${item.qty}</span>
          <button onclick="window.updateCartQty('${item.id}', 1)" style="width: 24px; height: 24px; border: none; background: white; border-radius: 50%; cursor: pointer; color: var(--text-dark); font-weight: bold;">+</button>
        </div>
      </div>
    `;
  });

  if (cart.length === 0) {
    html = `
      <div style="text-align: center; color: rgba(0,45,38,0.5); font-style: italic; margin-top: 3rem;">
        <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
        <p>Sepetiniz şu an boş görünüyor.<br>Katalogdan ürün ekleyebilirsiniz.</p>
      </div>
    `;
  }

  container.innerHTML = html;
  badge.innerText = itemCount;
  badge.style.display = itemCount > 0 ? "flex" : "none";
  totalEl.innerText = totalNum.toFixed(2) + " ₺";

  // Check if we need to show checkout setup
  const checkoutBtn = document.getElementById('init-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.style.opacity = cart.length > 0 ? '1' : '0.5';
    checkoutBtn.style.pointerEvents = cart.length > 0 ? 'auto' : 'none';
  }
}

// Attach to window so innerHTML onclick handlers can reach it
window.addToCart = addToCart;
window.updateCartQty = updateQty;
