import { db, ref, onValue } from '../firebase.js';

let currentProduct = null;
let currentBarkod = null;

export function renderProductDetailPage() {
  return `
    <div class="container section-py">
      <div id="pd-loader" style="text-align: center; padding: 4rem;">
        <div class="spinner"></div>
      </div>
      
      <div id="pd-content" style="display: none; align-items: flex-start; gap: 4rem; flex-wrap: wrap;">
        
        <!-- Image Area -->
        <div style="flex: 1; min-width: 300px; background: var(--white); border-radius: 2rem; padding: 3rem; text-align: center; border: 1px solid var(--glass-border); box-shadow: var(--shadow-sm); position: relative;">
          <button onclick="history.back()" style="position: absolute; top: 1.5rem; left: 1.5rem; background: var(--bg-color); border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; color: var(--chook-dark); font-size: 1.2rem; transition: background 0.2s;" onmouseover="this.style.background='#e2f0ef'" onmouseout="this.style.background='var(--bg-color)'">
            <i class="fas fa-arrow-left"></i>
          </button>
          <img id="pd-image" src="" alt="Ürün" style="max-width: 100%; max-height: 400px; object-fit: contain;">
        </div>

        <!-- Details Area -->
        <div style="flex: 1.2; min-width: 300px; display: flex; flex-direction: column; gap: 1.5rem;">
          
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span id="pd-stock-badge" style="background: rgba(38, 166, 154, 0.1); color: var(--chook-mid); padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">Stokta Var</span>
            <span id="pd-barkod-badge" style="background: rgba(0,0,0,0.05); color: rgba(0,45,38,0.6); padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; font-family: monospace;"></span>
          </div>

          <h1 id="pd-title" style="font-size: 3rem; line-height: 1.1; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 0.5rem;"></h1>
          
          <div id="pd-price-area" style="padding-bottom: 2rem; border-bottom: 1px dashed var(--glass-border);">
            <span style="font-size: 0.8rem; font-weight: 800; color: rgba(0,45,38,0.4); text-transform: uppercase; letter-spacing: 2px;">Tavsiye Edilen Fiyat</span>
            <div id="pd-price" style="font-size: 3.5rem; font-weight: 900; color: var(--chook-dark); font-family: monospace; line-height: 1;">0.00 ₺</div>
          </div>

          <div>
            <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--chook-mid); margin-bottom: 1rem; letter-spacing: 1px;">Ürün Bilgisi</h4>
            <p id="pd-desc" style="color: rgba(0,45,38,0.7); line-height: 1.8; font-size: 1.05rem;"></p>
          </div>

          <div style="margin-top: 1rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button id="pd-add-btn" class="btn-primary" style="flex: 1; min-width: 200px; justify-content: center; padding: 1.5rem; font-size: 1.25rem; box-shadow: var(--shadow-sm);">
              <i class="fas fa-cart-plus"></i> SEPETE EKLE
            </button>
            <button onclick="navigator.clipboard.writeText(window.location.href); alert('Link Kopyalandı!')" style="background: var(--white); border: 2px solid var(--glass-border); width: 64px; border-radius: 100px; color: var(--chook-mid); font-size: 1.25rem; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='var(--bg-color)'" onmouseout="this.style.background='var(--white)'" title="Linki Kopyala">
              <i class="fas fa-share-alt"></i>
            </button>
          </div>

        </div>
      </div>
      
      <div id="pd-error" style="display: none; text-align: center; padding: 4rem;">
        <i class="fas fa-box-open" style="font-size: 4rem; color: rgba(0,45,38,0.2); margin-bottom: 1rem;"></i>
        <h2>Ürün Bulunamadı</h2>
        <p style="margin-bottom: 2rem;">İstediğiniz ürün mağazamızda mevcut değil veya kaldırılmış.</p>
        <a href="/siparis" data-link class="btn-primary">Kataloğa Dön</a>
      </div>

    </div>
  `;
}

export function initProductDetailLogic() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const loader = document.getElementById('pd-loader');
  const content = document.getElementById('pd-content');
  const errorBox = document.getElementById('pd-error');

  if (!productId) {
    loader.style.display = 'none';
    errorBox.style.display = 'block';
    return;
  }

  onValue(ref(db, 'stoklar/' + productId), (snapshot) => {
    loader.style.display = 'none';
    const data = snapshot.val();

    if (data) {
      currentProduct = data;
      currentBarkod = productId;

      content.style.display = 'flex';

      // Values
      document.getElementById('pd-title').innerText = data.aciklama;
      document.getElementById('pd-desc').innerText = data.detay || "Bu ürün hakkında teknik detay girilmemiş.";
      document.getElementById('pd-barkod-badge').innerText = `KOD: ${productId}`;
      document.getElementById('pd-price').innerText = `${parseFloat(data.fiyat || 0).toFixed(2)} ₺`;

      // Image
      let cardImg = "https://resim.chooktemiz.com/stoklar/ChookShirin.png";
      if (data.gorsel && data.gorsel !== "ChookShirin.png" && data.gorsel.length > 5) {
        cardImg = data.gorsel.startsWith('http') ? data.gorsel : `https://resim.chooktemiz.com/stoklar/${data.gorsel}`;
      } else {
        const sonBes = productId.toString().slice(-5);
        cardImg = `https://resim.chooktemiz.com/stoklar/${sonBes}.jpg`;
      }
      
      const imgEl = document.getElementById('pd-image');
      imgEl.src = cardImg;
      imgEl.onerror = () => { imgEl.src = 'https://resim.chooktemiz.com/stoklar/ChookShirin.png'; };

      // Stock
      const isOutOfStock = (!data.stok || data.stok <= 0);
      const stockBadge = document.getElementById('pd-stock-badge');
      const addBtn = document.getElementById('pd-add-btn');

      if (isOutOfStock) {
        stockBadge.innerText = 'STOKTA YOK';
        stockBadge.style.background = '#ef4444';
        stockBadge.style.color = '#ffffff';
        addBtn.style.opacity = '0.5';
        addBtn.style.pointerEvents = 'none';
        addBtn.innerText = 'TÜKENDİ';
      } else {
        addBtn.onclick = () => {
          if(window.addToCart) window.addToCart(productId);
        };
      }

    } else {
      errorBox.style.display = 'block';
    }
  });
}
