export function renderHomePage() {
  return `
    <!-- Hero Section -->
    <section style="position: relative; overflow: hidden; padding: 6rem 0; background: linear-gradient(135deg, var(--chook-dark) 0%, var(--chook-mid) 100%); color: var(--white); border-radius: 0 0 3rem 3rem; margin-top: -2rem;">
      <div class="container" style="position: relative; z-index: 10;">
        <div style="max-width: 600px;">
          <span style="display: inline-block; background: rgba(255,255,255,0.1); padding: 0.5rem 1rem; border-radius: 100px; font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.2);">
            Sektörel Hijyen Standartları
          </span>
          <h1 style="font-size: 4.5rem; color: var(--white); letter-spacing: -2px; margin-bottom: 1.5rem; text-transform: uppercase;">
            Temizliğin <br><span class="italic text-accent">Doğal Formülü</span>
          </h1>
          <p style="font-size: 1.1rem; color: rgba(255,255,255,0.8); margin-bottom: 3rem; border-left: 4px solid var(--chook-light); padding-left: 1rem; font-weight: 600;">
            Uçbeyi Gıda güvencesiyle, profesyonel temizliğe neşeli ve dinamik bir dokunuş. İşletmeniz için en uygun endüstriyel hijyen ürünlerini keşfedin.
          </p>
          <a href="/siparis" data-link class="btn-primary" style="background: var(--white); color: var(--chook-dark); padding: 1.25rem 2.5rem; font-size: 1.1rem;">
            Kataloğu İncele <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <!-- Background Dekorasyon -->
      <div style="position: absolute; right: -100px; bottom: -100px; width: 600px; height: 600px; border: 60px solid rgba(255,255,255,0.05); border-radius: 50%; border-style: dashed; animation: spin 60s infinite linear; pointer-events: none;"></div>
    </section>

    <!-- Info Section -->
    <section class="section-py container">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h2 style="font-size: 2.5rem; text-transform: uppercase;">Neden Chook Temiz?</h2>
        <p style="color: rgba(0,45,38,0.6); max-width: 600px; margin: 1rem auto 0;">Kurumsallığın yorucu soğukluğu yerine, enerjik, güvenilir ve yüksek performanslı temizlik yaklaşımı.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        <!-- Card 1 -->
        <div class="glass-panel" style="padding: 2.5rem; text-align: center; background: var(--white); transition: var(--transition-bounce);" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='none'">
          <div style="width: 80px; height: 80px; background: rgba(38,166,154,0.1); border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 1.5rem; color: var(--chook-mid); font-size: 2rem;">
            <i class="fas fa-flask"></i>
          </div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Güçlü Formül</h3>
          <p style="color: rgba(0,45,38,0.6); font-size: 0.95rem;">Zorlu endüstriyel lekeler için özel geliştirilmiş kimyasal ve doğal karışımlar.</p>
        </div>

        <!-- Card 2 -->
        <div class="glass-panel" style="padding: 2.5rem; text-align: center; background: var(--white); transition: var(--transition-bounce);" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='none'">
          <div style="width: 80px; height: 80px; background: rgba(38,166,154,0.1); border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 1.5rem; color: var(--chook-mid); font-size: 2rem;">
            <i class="fas fa-hand-sparkles"></i>
          </div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Garantili Hijyen</h3>
          <p style="color: rgba(0,45,38,0.6); font-size: 0.95rem;">İşletmenizdeki tüm yüzeylerde kanıtlanmış virüs ve bakteri kalkanı.</p>
        </div>

        <!-- Card 3 -->
        <div class="glass-panel" style="padding: 2.5rem; text-align: center; background: var(--white); transition: var(--transition-bounce);" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='none'">
          <div style="width: 80px; height: 80px; background: rgba(38,166,154,0.1); border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 1.5rem; color: var(--chook-mid); font-size: 2rem;">
            <i class="fas fa-truck-fast"></i>
          </div>
          <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Hızlı Teslimat</h3>
          <p style="color: rgba(0,45,38,0.6); font-size: 0.95rem;">Siparişleriniz güvenle ve tam zamanında kapınıza gelir. Stok derdi yok.</p>
        </div>
      </div>
    </section>
  `;
}
