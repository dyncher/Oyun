export function renderCartDrawer() {
  return `
    <div id="cart-drawer-overlay" style="position: fixed; inset: 0; background: rgba(0, 45, 38, 0.6); backdrop-filter: blur(4px); z-index: 999; display: none; opacity: 0; transition: opacity 0.3s;"></div>
    
    <div id="cart-drawer" style="position: fixed; top: 0; right: -450px; width: 100%; max-width: 450px; height: 100vh; background: var(--bg-color); z-index: 1000; box-shadow: -10px 0 30px rgba(0,0,0,0.1); display: flex; flex-direction: column; transition: right 0.4s cubic-bezier(0.25, 1, 0.5, 1); border-left: 2px solid var(--glass-border);">
      
      <!-- Drawer Header -->
      <div style="padding: 1.5rem 2rem; background: var(--white); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--glass-border);">
        <h3 style="display: flex; align-items: center; gap: 0.75rem; text-transform: uppercase; font-size: 1.25rem;">
          <i class="fas fa-shopping-basket" style="color: var(--chook-mid);"></i> Sepetim
        </h3>
        <button id="close-cart-btn" style="background: rgba(0,0,0,0.05); border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; color: var(--text-dark); transition: background 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.1)'" onmouseout="this.style.background='rgba(0,0,0,0.05)'">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Drawer Body (Items) -->
      <div id="cart-items-container" style="flex: 1; overflow-y: auto; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
        <!-- Javascript will inject items here -->
        <div style="text-align: center; color: rgba(0,45,38,0.5); font-style: italic; margin-top: 3rem;">
          <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
          <p>Sepetiniz şu an boş görünüyor.<br>Katalogdan ürün ekleyebilirsiniz.</p>
        </div>
      </div>

      <!-- Drawer Footer -->
      <div style="background: var(--white); padding: 2rem; border-top: 1px solid var(--glass-border); box-shadow: 0 -10px 20px rgba(0,0,0,0.02);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <span style="font-size: 0.9rem; font-weight: 800; color: rgba(0,45,38,0.5); text-transform: uppercase;">Toplam Tutar</span>
          <span id="cart-total" style="font-size: 1.75rem; font-weight: 900; color: var(--chook-dark); font-family: monospace;">0.00 ₺</span>
        </div>
        <button onclick="window.location.href='/checkout'; history.pushState(null, null, '/checkout'); window.dispatchEvent(new Event('popstate'));" id="init-checkout-btn" class="btn-primary" style="width: 100%; display: flex; justify-content: center; font-size: 1.1rem; padding: 1.2rem; box-shadow: 0 10px 20px rgba(0,137,123,0.3);">
          SİPARİŞİ TAMAMLA <i class="fas fa-arrow-right"></i>
        </button>
      </div>

    </div>
  `;
}

export function initCartEvents() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  const closeBtn = document.getElementById('close-cart-btn');

  function openCart() {
    drawer.style.right = '0';
    overlay.style.display = 'block';
    setTimeout(() => overlay.style.opacity = '1', 10);
  }

  function closeCart() {
    drawer.style.right = '-450px';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 300);
  }

  document.addEventListener('toggleCart', () => {
    if (drawer.style.right === '0px') closeCart();
    else openCart();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);
}
