export function renderProductCard(barkod, p, isGrid, discount = 1) {
  // Resim mantığı: Eğer resim özel tanımlanmamışsa veya yoksa, barkodun son 5 hanesini al.
  let cardImg = "https://resim.chooktemiz.com/stoklar/ChookShirin.png";
  if (p.gorsel && p.gorsel !== "ChookShirin.png" && p.gorsel.length > 5) {
    cardImg = p.gorsel.startsWith('http') ? p.gorsel : `https://resim.chooktemiz.com/stoklar/${p.gorsel}`;
  } else if (barkod) {
    const sonBes = barkod.toString().slice(-5);
    cardImg = `https://resim.chooktemiz.com/stoklar/${sonBes}.jpg`;
  }

  const price = (p.fiyat * discount).toFixed(2);
  const isOutOfStock = (!p.stok || p.stok <= 0);
  
  if (isGrid) {
    return `
      <div class="glass-panel" style="display: flex; flex-direction: column; overflow: hidden; transition: var(--transition-bounce); ${isOutOfStock ? 'opacity: 0.6; filter: grayscale(0.8);' : ''}" 
           onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='var(--shadow-lg)'" 
           onmouseout="this.style.transform='none'; this.style.boxShadow='var(--shadow-sm)'">
        
        <div style="position: relative; background: var(--white); padding: 1.5rem; text-align: center; cursor: pointer; height: 200px; display: flex; align-items: center; justify-content: center;"
             onclick="window.location.href='/urun?id=${barkod}'">
          <img src="${cardImg}" onerror="this.onerror=null; this.src='https://resim.chooktemiz.com/stoklar/ChookShirin.png'" 
               style="max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.3s;"
               onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
          ${isOutOfStock ? `<span style="position: absolute; top: 1rem; left: 1rem; background: #ef4444; color: white; padding: 0.2rem 0.6rem; border-radius: 1rem; font-size: 0.7rem; font-weight: 800; letter-spacing: 1px;">STOKTA YOK</span>` : ''}
        </div>
        
        <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column; background: var(--white); border-top: 1px solid var(--glass-border);">
          <h3 style="font-size: 0.95rem; line-height: 1.3; margin-bottom: 1rem; flex: 1; font-weight: 800; cursor: pointer; color: var(--text-dark); transition: color 0.2s;"
              onclick="window.location.href='/urun?id=${barkod}'" onmouseover="this.style.color='var(--chook-mid)'" onmouseout="this.style.color='var(--text-dark)'">
            ${p.aciklama}
          </h3>
          
          <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 1rem;">
            <div>
              <span style="font-size: 0.65rem; color: rgba(0,45,38,0.5); font-weight: 800; letter-spacing: 1px;">FİYAT</span>
              <div style="font-size: 1.3rem; font-weight: 900; color: var(--chook-dark); font-family: monospace; letter-spacing: -1px;">
                ${price} ₺
              </div>
            </div>
            
            ${!isOutOfStock ? `
              <button onclick="window.addToCart('${barkod}')" style="background: var(--chook-dark); color: white; border: none; width: 40px; height: 40px; border-radius: 0.75rem; cursor: pointer; transition: var(--transition-bounce);"
                      title="Sepete Ekle"
                      onmouseover="this.style.background='var(--chook-mid)'; this.style.transform='scale(1.1) rotate(5deg)'"
                      onmouseout="this.style.background='var(--chook-dark)'; this.style.transform='none'">
                <i class="fas fa-plus"></i>
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  } else {
    // List View
    return `
      <div class="glass-panel" style="display: flex; align-items: center; padding: 1rem; background: var(--white); transition: var(--transition-fast); margin-bottom: 1rem; ${isOutOfStock ? 'opacity: 0.6; filter: grayscale(0.8);' : ''}"
           onmouseover="this.style.transform='translateX(5px)'; this.style.boxShadow='var(--shadow-sm)'" 
           onmouseout="this.style.transform='none'; this.style.boxShadow='none'">
        
        <div style="width: 100px; height: 100px; padding: 0.5rem; background: var(--bg-color); border-radius: 1rem; cursor: pointer; flex-shrink: 0;"
             onclick="window.location.href='/urun?id=${barkod}'">
          <img src="${cardImg}" onerror="this.onerror=null; this.src='https://resim.chooktemiz.com/stoklar/ChookShirin.png'" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        
        <div style="flex: 1; padding: 0 1.5rem; display: flex; flex-direction: column;">
          ${isOutOfStock ? `<span style="align-self: flex-start; background: #ef4444; color: white; padding: 0.2rem 0.5rem; border-radius: 1rem; font-size: 0.6rem; font-weight: 800; margin-bottom: 0.5rem;">STOKTA YOK</span>` : ''}
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.25rem; color: var(--text-dark); cursor: pointer;" onclick="window.location.href='/urun?id=${barkod}'">
            ${p.aciklama}
          </h3>
          <span style="font-size: 0.75rem; color: rgba(0,45,38,0.5);">${barkod}</span>
        </div>
        
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem; border-left: 1px dashed rgba(0,0,0,0.1); padding-left: 1.5rem;">
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--chook-dark); font-family: monospace;">
            ${price} ₺
          </div>
          ${!isOutOfStock ? `
            <button onclick="window.addToCart('${barkod}')" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem; border-radius: 0.5rem;">
              <i class="fas fa-cart-plus"></i> SEPETE EKLE
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }
}
