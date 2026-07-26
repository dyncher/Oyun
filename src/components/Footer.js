export function renderFooter() {
  return `
    <footer style="background-color: var(--chook-dark); color: var(--white); padding: 4rem 0 2rem 0; margin-top: 4rem; border-radius: 2rem 2rem 0 0;">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; margin-bottom: 3rem;">
          
          <!-- Brand Info -->
          <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
              <i class="fas fa-leaf" style="color: var(--chook-neon); font-size: 2rem;"></i>
              <span style="font-size: 2rem; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">
                CHOOK <span class="italic" style="color: var(--chook-mid);">TEMİZ</span>
              </span>
            </div>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 1rem;">
              Endüstriyel temizlik alanında neşeli, güvenilir ve yenilikçi çözüm ortağınız. Bir Uçbeyi Gıda markasıdır.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 style="color: var(--chook-neon); margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">Hızlı Bağlantılar</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem; padding: 0;">
              <li><a href="/" data-link style="color: var(--white); text-decoration: none; opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">Anasayfa</a></li>
              <li><a href="/siparis" data-link style="color: var(--white); text-decoration: none; opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">Tüm Ürünler</a></li>
              <li><a href="/kvkk" data-link style="color: var(--white); text-decoration: none; opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">Mesafeli Satış İptal Sözleşmesi</a></li>
              <li><a href="/kvkk" data-link style="color: var(--white); text-decoration: none; opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">KVKK & Gizlilik Politikası</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 style="color: var(--chook-neon); margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">Bize Ulaşın</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem; padding: 0; color: rgba(255,255,255,0.8);">
              <li style="display: flex; gap: 1rem; align-items: flex-start;">
                <i class="fas fa-map-marker-alt" style="margin-top: 4px; color: var(--chook-light);"></i>
                <span>Siteler Mh. Yalova İzmit Karayolu Cd. No: 199 Çiftlikköy / YALOVA</span>
              </li>
              <li style="display: flex; gap: 1rem; align-items: center;">
                <i class="fas fa-phone-alt" style="color: var(--chook-light);"></i>
                <span>+90 (226) 353 38 06</span>
              </li>
              <li style="display: flex; gap: 1rem; align-items: center;">
                <i class="fab fa-whatsapp" style="color: var(--chook-neon); font-size: 1.2rem;"></i>
                <a href="https://wa.me/905400024665" style="color: var(--white); text-decoration: none; font-weight: bold; font-style: italic;">0540 002 46 65</a>
              </li>
            </ul>
          </div>
          
        </div>
        
        <!-- Copyright -->
        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: rgba(255,255,255,0.5); flex-wrap: wrap; gap: 1rem;">
          <p>© 2026 Chook Temiz. Tüm Hakları Saklıdır.</p>
          <div style="display: flex; gap: 1rem; font-size: 1.2rem;">
            <a href="#" style="color: rgba(255,255,255,0.5);"><i class="fab fa-instagram"></i></a>
            <a href="#" style="color: rgba(255,255,255,0.5);"><i class="fab fa-facebook"></i></a>
            <a href="#" style="color: rgba(255,255,255,0.5);"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
