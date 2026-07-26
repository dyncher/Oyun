import { db, ref, onValue } from '../firebase.js';
import { renderProductCard } from '../components/ProductCard.js';

let allProducts = {};
let allCategories = {};
let activeCatCode = "Hepsi";
let isGridView = true;
let searchTerm = "";

export function renderCatalogPage() {
  return `
    <div class="container section-py">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 style="font-size: 2.5rem; text-transform: uppercase;">Dijital Katalog</h2>
          <p style="color: rgba(0,45,38,0.6); max-width: 600px; margin-top: 0.5rem;">İhtiyacınıza uygun ürünleri kategorilerden seçebilir veya isme göre hızlı arama yapabilirsiniz.</p>
        </div>
        
        <!-- Search -->
        <div style="background: var(--white); padding: 0.5rem; border-radius: 100px; border: 1px solid var(--glass-border); box-shadow: var(--shadow-sm); display: flex; align-items: center; width: 300px; max-width: 100%;">
          <i class="fas fa-search" style="color: var(--chook-light); margin-left: 1rem;"></i>
          <input type="text" id="catalog-search" placeholder="Ürün Ara..." style="border: none; background: transparent; outline: none; padding: 0.5rem 1rem; width: 100%; color: var(--text-dark); font-family: inherit;">
        </div>
      </div>

      <div style="display: flex; gap: 2rem; align-items: flex-start; flex-direction: row; flex-wrap: wrap;">
        
        <!-- Sidebar: Categories -->
        <aside style="width: 250px; background: var(--white); border-radius: 1.5rem; padding: 1.5rem; border: 1px solid var(--glass-border); box-shadow: var(--shadow-sm); position: sticky; top: 120px; flex-shrink: 0;">
          <h4 style="color: var(--chook-dark); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--glass-border);">Kategoriler</h4>
          <div id="category-list" style="display: flex; flex-direction: column; gap: 0.25rem;">
            <div class="spinner" style="width: 20px; height: 20px; border-width: 2px;"></div>
          </div>
        </aside>

        <!-- Main Product Area -->
        <div style="flex: 1; min-width: 300px;">
          <!-- Controls -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.5); border-radius: 1rem;">
            <span id="product-count" style="font-weight: 800; font-size: 0.8rem; color: var(--chook-mid); letter-spacing: 1px; text-transform: uppercase;">Yükleniyor...</span>
            <div style="display: flex; gap: 0.5rem; background: var(--white); border-radius: 0.75rem; padding: 0.25rem; border: 1px solid var(--glass-border);">
              <button id="view-grid-btn" style="border: none; background: var(--chook-dark); color: white; width: 36px; height: 36px; border-radius: 0.5rem; cursor: pointer; transition: 0.2s;"><i class="fas fa-th-large"></i></button>
              <button id="view-list-btn" style="border: none; background: transparent; color: var(--text-dark); width: 36px; height: 36px; border-radius: 0.5rem; cursor: pointer; transition: 0.2s;"><i class="fas fa-list"></i></button>
            </div>
          </div>
          
          <!-- Products Grid/List -->
          <div id="products-container" style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));">
            <div style="grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; height: 300px;">
               <div class="spinner"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function initCatalogLogic() {
  const catListEl = document.getElementById('category-list');
  const prodContainerEl = document.getElementById('products-container');
  const countEl = document.getElementById('product-count');
  const searchInput = document.getElementById('catalog-search');
  const gridBtn = document.getElementById('view-grid-btn');
  const listBtn = document.getElementById('view-list-btn');

  onValue(ref(db, 'kategoriler'), (snapshot) => {
    allCategories = snapshot.val() || {};
    renderCategories();
  });

  onValue(ref(db, 'stoklar'), (snapshot) => {
    allProducts = snapshot.val() || {};
    renderProducts();
  });

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value.toLowerCase().trim();
    renderProducts();
  });

  gridBtn.addEventListener('click', () => {
    isGridView = true;
    updateViewButtons();
    renderProducts();
  });

  listBtn.addEventListener('click', () => {
    isGridView = false;
    updateViewButtons();
    renderProducts();
  });

  window.catalogSelectCategory = (code) => {
    activeCatCode = code;
    renderCategories();
    renderProducts();
  };

  function updateViewButtons() {
    if (isGridView) {
      gridBtn.style.background = 'var(--chook-dark)';
      gridBtn.style.color = 'white';
      listBtn.style.background = 'transparent';
      listBtn.style.color = 'var(--text-dark)';
      prodContainerEl.style.display = 'grid';
      prodContainerEl.style.gridTemplateColumns = 'repeat(auto-fill, minmax(240px, 1fr))';
    } else {
      listBtn.style.background = 'var(--chook-dark)';
      listBtn.style.color = 'white';
      gridBtn.style.background = 'transparent';
      gridBtn.style.color = 'var(--text-dark)';
      prodContainerEl.style.display = 'block';
    }
  }

  function renderCategories() {
    let html = `<div onclick="catalogSelectCategory('Hepsi')" style="padding: 0.75rem 1rem; border-radius: 0.75rem; cursor: pointer; font-weight: ${activeCatCode === 'Hepsi' ? '900' : '600'}; background: ${activeCatCode === 'Hepsi' ? 'var(--bg-color)' : 'transparent'}; color: ${activeCatCode === 'Hepsi' ? 'var(--chook-dark)' : 'var(--text-dark)'}; transition: 0.2s;">✨ Tüm Ürünler</div>`;
    
    for (let code in allCategories) {
      const name = allCategories[code];
      const isActive = activeCatCode === code;
      html += `<div onclick="catalogSelectCategory('${code}')" style="padding: 0.75rem 1rem; border-radius: 0.75rem; cursor: pointer; font-weight: ${isActive ? '900' : '600'}; background: ${isActive ? 'var(--bg-color)' : 'transparent'}; color: ${isActive ? 'var(--chook-dark)' : 'var(--text-dark)'}; transition: 0.2s;">${name}</div>`;
    }
    catListEl.innerHTML = html;
  }

  function renderProducts() {
    if (!prodContainerEl) return;
    let filteredProducts = [];

    for (const barkod in allProducts) {
      const p = allProducts[barkod];
      const matchSearch = p.aciklama.toLowerCase().includes(searchTerm);
      
      let matchCat = false;
      let sortOrder = 999999;

      if (activeCatCode === 'Hepsi') {
        matchCat = true;
      } else if (p.grup) {
        const regex = new RegExp(activeCatCode + "(\\d*)");
        const match = p.grup.toString().match(regex);
        if (match) {
          matchCat = true;
          if (match[1] !== "") {
            sortOrder = parseInt(match[1], 10);
          }
        }
      }

      if (matchSearch && matchCat) {
        filteredProducts.push({ barkod, ...p, sortOrder });
      }
    }

    filteredProducts.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
         return a.sortOrder - b.sortOrder;
      }
      return a.aciklama.localeCompare(b.aciklama);
    });

    countEl.innerText = `${filteredProducts.length} ÜRÜN BULUNDU`;

    if (filteredProducts.length === 0) {
      prodContainerEl.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: rgba(0,45,38,0.4); font-style: italic;">
        <i class="fas fa-wind" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <p>Aradığınız kritere uygun ürün bulunamadı.</p>
      </div>`;
      return;
    }

    let html = "";
    filteredProducts.forEach(p => {
      html += renderProductCard(p.barkod, p, isGridView, 1);
    });

    prodContainerEl.innerHTML = html;
  }
}
