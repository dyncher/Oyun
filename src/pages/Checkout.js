import { db, ref, push, set } from '../firebase.js';

export function renderCheckoutPage() {
  return `
    <div class="container section-py">
      <div style="max-width: 800px; margin: 0 auto;">
        
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="font-size: 2.5rem; text-transform: uppercase;">Güvenli Ödeme</h2>
          <p style="color: rgba(0,45,38,0.6);">Siparişinizi tamamlamak için bilgilerinizi giriniz.</p>
        </div>

        <div style="display: grid; gap: 2rem; grid-template-columns: 1fr;">
          
          <!-- Bilgiler Formu -->
          <div class="glass-panel" style="padding: 2.5rem; background: var(--white);">
            <h4 style="color: var(--chook-dark); font-size: 1.1rem; text-transform: uppercase; margin-bottom: 1.5rem; border-bottom: 2px solid var(--bg-color); padding-bottom: 0.5rem;">Teslimat ve İletişim Bilgileri</h4>
            
            <form id="checkout-form" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <input type="text" id="co-name" placeholder="Ad Soyad veya Firma Ünvanı" required style="flex: 1; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--glass-border); background: var(--bg-color); color: var(--text-dark); outline: none;">
                <input type="tel" id="co-phone" placeholder="Telefon Numarası" required style="flex: 1; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--glass-border); background: var(--bg-color); color: var(--text-dark); outline: none;">
              </div>
              <input type="email" id="co-email" placeholder="E-Posta Adresi" required style="padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--glass-border); background: var(--bg-color); color: var(--text-dark); outline: none;">
              <textarea id="co-address" placeholder="Tam Teslimat Adresi" required rows="3" style="padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--glass-border); background: var(--bg-color); color: var(--text-dark); outline: none; resize: vertical;"></textarea>

              <h4 style="color: var(--chook-dark); font-size: 1.1rem; text-transform: uppercase; margin-top: 1.5rem; margin-bottom: 0.5rem; border-bottom: 2px solid var(--bg-color); padding-bottom: 0.5rem;">Kargo Seçimi</h4>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <label style="flex: 1; padding: 1rem; border: 1px solid var(--chook-light); border-radius: 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 1rem; font-weight: 600;">
                  <input type="radio" name="kargo" value="Yurtiçi Kargo" checked> Yurtiçi Kargo
                </label>
                <label style="flex: 1; padding: 1rem; border: 1px solid var(--chook-light); border-radius: 0.75rem; cursor: pointer; display: flex; align-items: center; gap: 1rem; font-weight: 600;">
                  <input type="radio" name="kargo" value="Aras Kargo"> Aras Kargo
                </label>
              </div>

              <!-- Sözleşmeler -->
              <div style="margin-top: 2rem; background: var(--bg-color); padding: 1.5rem; border-radius: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
                <label style="display: flex; gap: 0.75rem; align-items: flex-start; cursor: pointer; font-size: 0.85rem; color: rgba(0,45,38,0.8);">
                  <input type="checkbox" id="co-kvkk" required style="margin-top: 2px;">
                  <span><a href="#" style="color: var(--chook-mid);">KVKK Aydınlatma Metnini</a> okudum ve kabul ediyorum.</span>
                </label>
                <label style="display: flex; gap: 0.75rem; align-items: flex-start; cursor: pointer; font-size: 0.85rem; color: rgba(0,45,38,0.8);">
                  <input type="checkbox" id="co-mesafeli" required style="margin-top: 2px;">
                  <span><a href="#" style="color: var(--chook-mid);">Mesafeli Satış Sözleşmesini</a> okudum ve onaylıyorum.</span>
                </label>
              </div>

              <!-- İleriki Aşama Kredi Kartı Uyarısı -->
              <div style="margin-top: 1rem; padding: 1rem; background: rgba(38,166,154,0.1); border-left: 4px solid var(--chook-mid); font-size: 0.8rem; font-weight: 600; color: var(--chook-dark);">
                <i class="fas fa-info-circle" style="color: var(--chook-mid); margin-right: 0.5rem;"></i> Kredi Kartı ile güvenli ödeme altyapısı entegrasyon aşamasındadır. Ödemenizi teslimatta veya EFT/Havale yoluyla gerçekleştirebilirsiniz. Sipariş işlemi başarıyla tamamlandıktan sonra bilgilendirme yapılacaktır.
              </div>

              <button type="submit" id="co-submit-btn" class="btn-primary" style="margin-top: 1rem; padding: 1.25rem; font-size: 1.25rem; justify-content: center;">
                SİPARİŞİ ONAYLA <i class="fas fa-check-circle"></i>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  `;
}

export function initCheckoutLogic() {
  const form = document.getElementById('checkout-form');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Sepet verisini localStorage'dan alıyoruz
    const cart = JSON.parse(localStorage.getItem('chook_cart_v2') || "[]");
    
    if(cart.length === 0) {
      alert("Sepetiniz boş. Ürün eklemeden sipariş veremezsiniz.");
      return;
    }

    const submitBtn = document.getElementById('co-submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İŞLENİYOR...';
    submitBtn.style.pointerEvents = 'none';

    // Form değerlerini oku
    const name = document.getElementById('co-name').value;
    const phone = document.getElementById('co-phone').value;
    const email = document.getElementById('co-email').value;
    const address = document.getElementById('co-address').value;
    const kargo = document.querySelector('input[name="kargo"]:checked').value;

    const siparisData = {
      tarih: new Date().toISOString(),
      musteri: {
        ad: name,
        telefon: phone,
        email: email,
        adres: address
      },
      kargo: kargo,
      durum: "Bekliyor", // Yeni sipariş
      urunler: cart,
    };

    try {
      // Firebase push
      const siparisRef = ref(db, 'siparisler');
      const newSiparisRef = push(siparisRef);
      await set(newSiparisRef, siparisData);

      // Başarılı olursa sepeti boşalt
      localStorage.removeItem('chook_cart_v2');
      
      form.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <div style="width: 80px; height: 80px; background: rgba(38,166,154,0.2); color: var(--chook-mid); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1.5rem;">
            <i class="fas fa-check"></i>
          </div>
          <h3 style="font-size: 2rem; color: var(--chook-dark); margin-bottom: 1rem;">Siparişiniz Alındı!</h3>
          <p style="color: rgba(0,45,38,0.7); font-size: 1.1rem; margin-bottom: 2rem;">Sipariş Numaranız: <strong style="font-family: monospace;">#${newSiparisRef.key.slice(-6).toUpperCase()}</strong></p>
          <p style="margin-bottom: 2rem; font-size: 0.9rem;">Kargo işlemleriniz ve ödeme detayları hakkında sizinle iletişime geçeceğiz.</p>
          <a href="/" data-link class="btn-primary">Anasayfaya Dön</a>
        </div>
      `;

      // Update badge by triggering renderCart workaround
      document.dispatchEvent(new Event('popstate'));
      
    } catch (err) {
      console.error("Sipariş Hata:", err);
      alert("Bir hata oluştu, lütfen daha sonra tekrar deneyiniz.");
      submitBtn.innerHTML = 'SİPARİŞİ ONAYLA <i class="fas fa-check-circle"></i>';
      submitBtn.style.pointerEvents = 'auto';
    }
  });
}
