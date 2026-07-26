export function renderHeader() {
  return `
    <header class="glass-panel" style="position: sticky; top: 0; z-index: 100; border-radius: 0 0 1.5rem 1.5rem; margin-bottom: 2rem; border-top: none;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 2rem;">
        
        <!-- Logo -->
        <a href="/" data-link class="logo" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
          <div style="background: var(--chook-dark); padding: 0.5rem; border-radius: 0.75rem;">
            <i class="fas fa-leaf text-accent" style="font-size: 1.25rem;"></i>
          </div>
          <span style="font-size: 1.5rem; font-weight: 900; color: var(--chook-dark); letter-spacing: -0.5px;">
            CHOOK <span class="italic text-accent" style="padding-left: 0.2rem;">TEMİZ</span>
          </span>
        </a>

        <!-- Desktop Navigation -->
        <nav style="display: flex; align-items: center; gap: 2.5rem; font-weight: 800; font-size: 0.85rem; text-transform: uppercase;">
          <a href="/" data-link style="color: var(--text-dark); text-decoration: none; transition: var(--transition-fast);" onmouseover="this.style.color='var(--chook-mid)'" onmouseout="this.style.color='var(--text-dark)'">Kurumsal</a>
          <a href="/siparis" data-link style="color: var(--text-dark); text-decoration: none; transition: var(--transition-fast);" onmouseover="this.style.color='var(--chook-mid)'" onmouseout="this.style.color='var(--text-dark)'">Katalog & Sipariş</a>
          <a href="/oyun/" style="color: var(--text-dark); text-decoration: none; transition: var(--transition-fast);" onmouseover="this.style.color='var(--chook-mid)'" onmouseout="this.style.color='var(--text-dark)'"><i class="fas fa-gamepad" style="margin-right: 4px; color: var(--chook-light);"></i> Eğitici Oyun</a>
          
          <div style="width: 1px; height: 24px; background: var(--glass-border);"></div>
          
          <!-- User Profile & Cart -->
          <div style="display: flex; align-items: center; gap: 1rem;">
            <button class="icon-btn" title="Kullanıcı Girişi" style="background: transparent; border: none; font-size: 1.2rem; color: var(--chook-dark); cursor: pointer; transition: transform 0.2s;">
              <i class="fas fa-user-circle"></i>
            </button>
            <button id="toggle-cart-btn" class="icon-btn" title="Sepetim" style="background: var(--chook-light); border: none; width: 45px; height: 45px; border-radius: 12px; color: var(--white); cursor: pointer; position: relative; box-shadow: var(--shadow-sm); transition: var(--transition-bounce);">
              <i class="fas fa-shopping-basket"></i>
              <span id="cart-badge" style="position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; width: 22px; height: 22px; border-radius: 50%; font-size: 0.7rem; font-weight: 900; display: flex; align-items: center; justify-content: center; border: 2px solid white;">0</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  `;
}

export function initHeaderEvents() {
  const cartBtn = document.getElementById('toggle-cart-btn');
  if(cartBtn) {
    cartBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('toggleCart'));
    });
  }
}
