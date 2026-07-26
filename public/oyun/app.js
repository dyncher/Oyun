/* ==========================================================================
   CHOOK ZEKA DÜNYASI - OYUN VE ETKİLEŞİM MOTORU (app.js)
   Açıklama: Hafıza kartı oyunu algoritması, bilgi yarışması mantığı, skor 
   sistemi, tema değiştirici ve marka yönlendirmeli ara geçişleri yönetir.
   ========================================================================== */

// 1. SORU HAVUZU (Eğitici, faydalı ve eğlenceli Chook Temiz soruları)
const TRIVIA_QUESTIONS = [
    {
        category: "Chook Temiz - Pratik Bilgiler",
        question: "Mikrofiber temizlik bezlerinin normal bezlerden farkı nedir?",
        options: [
            "Daha ağır ve geç kuruyan yapılardır",
            "Tozu ve kiri saç telleri kadar ince lifleriyle hapsedip deterjansız bile temizlik sağlar",
            "Sadece cam yüzeylerde kullanılabilir, çabuk yıpranır",
            "Hiçbir farkı yoktur, sadece bir pazarlama terimidir"
        ],
        answer: 1, // B şıkkı
        tip: "Chook Temiz mikrofiber bezleri, saç telinin 100'de biri incelikteki lifleriyle tozu adeta bir mıknatıs gibi çeker ve su lekelerini tamamen yok eder!"
    },
    {
        category: "Chook Temiz - Mutfak Hijyeni",
        question: "Mutfakta yemek hazırlarken kesme tahtaları gibi gıdayla temas eden alanlar nasıl temizlenmelidir?",
        options: [
            "Ağır kimyasal temizleyiciler dökülüp saatlerce bekletilmelidir",
            "Sadece kuru bezle silinip geçilmelidir",
            "Sıcak suyla yıkanıp, gıdaya uygun ve kolay durulanan neşeli Chook hijyen ürünleriyle temizlenmelidir",
            "Hiç temizlenmemeli, tahta kendi kendini temizler"
        ],
        answer: 2, // C şıkkı
        tip: "Chook Temiz hijyen çözümleri, mutfak ve banyo gibi hassas yüzeylerde kalıntı bırakmadan neşeli temizlik sunar!"
    },
    {
        category: "Chook Temiz - Çamaşır Bakımı",
        question: "Renkli çamaşırların renklerinin solmasını engellemek için neye dikkat edilmelidir?",
        options: [
            "Çamaşırları her zaman en yüksek derecede (90 derece) yıkamak",
            "Çamaşırları ters çevirip, düşük ısıda ve doğru renk koruyucu deterjanla yıkamak",
            "Hepsini çamaşır suyuyla yıkamak",
            "Çamaşırları deterjan kullanmadan yıkamak"
        ],
        answer: 1, // B şıkkı
        tip: "Chook Temiz deterjanları renkleri korur, düşük ısılarda bile çamaşırlarınızın ilk günkü gibi canlı kalmasını sağlar."
    },
    {
        category: "Chook Temiz - Doğa Dostu Temizlik",
        question: "Elde bulaşık yıkarken su tasarrufu sağlamak ve doğayı korumak için en doğru yöntem hangisidir?",
        options: [
            "Suyu sürekli sonuna kadar açık bırakarak yıkamak",
            "Bulaşıkları bir kapta biriken sabunlu suda ovalayıp ardından temiz su dolu ayrı bir kapta durulamak",
            "Bulaşıkları hiç durulamadan rafa dizmek",
            "Bulaşıkları çamaşır makinesinde yıkamak"
        ],
        answer: 1, // B şıkkı
        tip: "Bulaşıkları akan su yerine sabunlu kapta ovalamak ev bütçenize ve doğaya binlerce litre su kazandırır. Chook Temiz bulaşık sıvıları azıcık miktar ile bol köpük üretir!"
    },
    {
        category: "Chook Temiz - Ev Düzeni",
        question: "Evde toz alırken tozların havaya uçuşup tekrar yüzeylere konmasını engellemek için en doğru teknik nedir?",
        options: [
            "Kuru toz alma bezleriyle çok hızlı sallayarak silmek",
            "Hafif nemli bir mikrofiber bez kullanarak yukarıdan aşağıya doğru silmek",
            "Pencereleri kapatıp oda havasızken süpürmek",
            "Toz almaya en alt yüzeylerden başlayıp yukarı çıkmak"
        ],
        answer: 1, // B şıkkı
        tip: "Her zaman yukarıdan aşağıya doğru hafif nemli bezle toz almak yerçekimi sayesinde havaya kalkan tozların en son zeminde toplanmasını sağlar. Chook Temiz ile eviniz daha uzun süre toz tutmaz!"
    },
    {
        category: "Chook Temiz - Neşeli Temizlik",
        question: "Ferah ve huzurlu bir ev temizliği deneyimi için nasıl kokular tercih edilmelidir?",
        options: [
            "Sentetik, aşırı keskin ve geniz yakan yapay kokular",
            "Chook Temiz'in doğadan ilham alan lavanta, limon ve taze çiçek özlü neşeli kokuları",
            "Hiç kokusu olmayan, kokusuz temizleyiciler",
            "Sadece parfüm sıkarak temizlik havası yaratmak"
        ],
        answer: 1, // B şıkkı
        tip: "Chook Temiz temizleyicileri, doğadan ilham alan ferahlık özleriyle evinize hem hijyen hem de neşeli bir mutluluk getirir!"
    }
];

// 2. HAFIZA KART DETAYLARI (Chook Temiz Maskotları ve Ev Temizlik Emojileri - 16 Benzersiz Kart)
const CARD_ITEMS = [
    { type: "spray_bottle", image: "assets/cute_spray_bottle.png", isEmoji: false },
    { type: "soap_bar", image: "assets/cute_soap_bar.png", isEmoji: false },
    { type: "emoji_soap", symbol: "🧼", isEmoji: true },
    { type: "emoji_bubbles", symbol: "🫧", isEmoji: true },
    { type: "emoji_shampoo", symbol: "🧴", isEmoji: true },
    { type: "emoji_sparkles", symbol: "✨", isEmoji: true },
    { type: "emoji_sponge", symbol: "🧽", isEmoji: true },
    { type: "emoji_water", symbol: "💧", isEmoji: true },
    { type: "emoji_broom", symbol: "🧹", isEmoji: true },
    { type: "emoji_bucket", symbol: "🪣", isEmoji: true },
    { type: "emoji_shirt", symbol: "👕", isEmoji: true },
    { type: "emoji_flower", symbol: "🌸", isEmoji: true },
    { type: "emoji_glove", symbol: "🧤", isEmoji: true },
    { type: "emoji_lemon", symbol: "🍋", isEmoji: true },
    { type: "emoji_house", symbol: "🏠", isEmoji: true },
    { type: "emoji_leaf", symbol: "🍃", isEmoji: true }
];

// 2B. 15 SEVİYELİ AŞAMALI ZORLUK YAPILANDIRMASI
const MEMORY_LEVELS = [
    { level: 1, grid: { r: 2, c: 2 }, timer: 25, movesLimit: null, title: "Isınma Turu", desc: "Zihnini temizliğe hazırla! 4 kartı hızlıca eşleştir." },
    { level: 2, grid: { r: 2, c: 3 }, timer: 30, movesLimit: null, title: "Mikrofiber Dokunuş", desc: "6 kart. Chook mikrofiber bezler gibi pratik ve hızlı ol!" },
    { level: 3, grid: { r: 2, c: 4 }, timer: 35, movesLimit: null, title: "Limon Ferahlığı", desc: "8 kart. Limon kokusuyla zihnini tazeleyip eşleri bul." },
    { level: 4, grid: { r: 3, c: 4 }, timer: 45, movesLimit: null, title: "Bulaşık Köpüğü", desc: "12 kart. Köpüklerin ardındaki eşleri bul." },
    { level: 5, grid: { r: 3, c: 4 }, timer: 40, movesLimit: 22, title: "Hamle Sınırı!", desc: "12 kart. Dikkat et, hamle sınırın başladı!" },
    { level: 6, grid: { r: 4, c: 4 }, timer: 60, movesLimit: 32, title: "Pratik Hijyen", desc: "16 kart. Chook Temiz ile pırıl pırıl bir hafıza antrenmanı." },
    { level: 7, grid: { r: 4, c: 4 }, timer: 50, movesLimit: 26, title: "Mutfak Parlaklığı", desc: "16 kart. Süre daralıyor, hamleler çok kıymetli!" },
    { level: 8, grid: { r: 4, c: 5 }, timer: 75, movesLimit: 38, title: "Banyo Işıltısı", desc: "20 kart. Lekesiz bir zeka gösterisi!" },
    { level: 9, grid: { r: 4, c: 5 }, timer: 60, movesLimit: 32, title: "Hassas Çamaşır", desc: "20 kart. Chook renk koruyucu gibi odaklan!" },
    { level: 10, grid: { r: 4, c: 6 }, timer: 90, movesLimit: 48, title: "Doğa Dostu", desc: "24 kart. Ekolojik ve akıllıca hamleler yap!" },
    { level: 11, grid: { r: 4, c: 6 }, timer: 75, movesLimit: 40, title: "Cam Gibi Berrak", desc: "24 kart. Kusursuz bir berraklıkla zihnini odakla." },
    { level: 12, grid: { r: 4, c: 6 }, timer: 60, movesLimit: 34, title: "Leke Savar", desc: "24 kart. Hızlı ol, zaman gittikçe daralıyor!" },
    { level: 13, grid: { r: 5, c: 6 }, timer: 120, movesLimit: 60, title: "Zeka Köpüğü", desc: "30 kart. Dev bir ızgara! En yüksek odaklanma." },
    { level: 14, grid: { r: 5, c: 6 }, timer: 100, movesLimit: 52, title: "Kusursuz Temizlik", desc: "30 kart. Adeta Chook Temiz gibi kusursuz bir hafıza." },
    { level: 15, grid: { r: 5, c: 6 }, timer: 80, movesLimit: 44, title: "Chook Şampiyonu", desc: "30 kart. Zirvedesin! Hafıza şampiyonluk kupasını kaldır." }
];

// 3. GLOBAL DEĞİŞKENLER & DURUM (STATE)
let playerTotalScore = parseInt(localStorage.getItem("chook_score")) || 0;
let activeScreen = "dashboard";

// Seviye Sistemi Değişkenleri
let currentSelectedLevel = 1;
let unlockedLevel = parseInt(localStorage.getItem("chook_unlocked_level")) || 1;
let levelStars = JSON.parse(localStorage.getItem("chook_level_stars")) || {};

// Hafıza Oyunu Durumu
let memoryDeck = [];
let flippedCards = [];
let matchedPairsCount = 0;
let memoryMoves = 0;
let memoryTimerInterval = null;
let memoryTimeRemaining = 60;
let isBoardLocked = false;
let memoryComboCount = 0;
let lastMatchTime = 0;

// Bilgi Yarışması Durumu
let selectedTriviaQuestions = [];
let currentQuestionIndex = 0;
let triviaScore = 0;
let isTriviaLocked = false;

// 4. SAYFA YÜKLENİRKEN ÇALIŞACAK KODLAR
document.addEventListener("DOMContentLoaded", () => {
    initUI();
    setupEventListeners();
});

// Arayüz Başlangıç Ayarları
function initUI() {
    // Toplam skoru ekrana yaz
    document.getElementById("player-score").textContent = playerTotalScore;
    
    // Temayı yükle (LocalStorage'dan)
    const savedTheme = localStorage.getItem("chook_theme") || "lavender-theme";
    document.body.className = savedTheme;
}

// 5. ETKİNLİK DİNLEYİCİLERİ (EVENT LISTENERS)
function setupEventListeners() {
    // Tema Değiştirme Butonu
    document.getElementById("theme-toggle-btn").addEventListener("click", toggleTheme);

    // Dashboard -> Mod Girişleri
    document.getElementById("start-memory-btn").addEventListener("click", () => switchScreen("levels"));
    document.getElementById("start-trivia-btn").addEventListener("click", () => switchScreen("trivia"));

    // Logo Tıklama (Ana Sayfaya Dönüş)
    document.getElementById("logo-btn").addEventListener("click", () => switchScreen("dashboard"));

    // Geri Dönüş Butonları
    document.getElementById("levels-back-btn").addEventListener("click", () => switchScreen("dashboard"));
    document.getElementById("memory-back-btn").addEventListener("click", () => switchScreen("levels"));
    
    document.querySelectorAll(".back-to-dashboard-btn").forEach(btn => {
        btn.addEventListener("click", () => switchScreen("dashboard"));
    });

    // Modallardan Çıkış ve Menü Butonları
    document.getElementById("close-tip-btn").addEventListener("click", closeTipModal);
    document.getElementById("result-home-btn").addEventListener("click", () => {
        closeResultModal();
        switchScreen("dashboard");
    });
    document.getElementById("result-retry-btn").addEventListener("click", restartCurrentGame);
}

// 6. TEMA VE EKRAN DEĞİŞTİRME MANTIĞI
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains("lavender-theme")) {
        body.classList.replace("lavender-theme", "pastel-theme");
        localStorage.setItem("chook_theme", "pastel-theme");
    } else {
        body.classList.replace("pastel-theme", "lavender-theme");
        localStorage.setItem("chook_theme", "lavender-theme");
    }
    
    // Küçük bir tık hissi ve pırıltı efekti
    const btn = document.getElementById("theme-toggle-btn");
    btn.style.transform = "scale(0.9) rotate(20deg)";
    setTimeout(() => {
        btn.style.transform = "scale(1) rotate(0deg)";
    }, 150);
}

function switchScreen(screenName, levelNum = null) {
    // Önceki ekranların zamanlayıcılarını ve durumlarını temizle
    stopMemoryTimer();
    
    // Tüm ekranları gizle
    document.querySelectorAll(".game-screen").forEach(screen => {
        screen.classList.remove("active");
    });

    // İstenen ekranı göster
    const targetScreen = document.getElementById(`screen-${screenName}`);
    if (targetScreen) {
        targetScreen.classList.add("active");
        activeScreen = screenName;
    }

    // Seçilen ekrana göre oyunu sıfırla ve başlat
    if (screenName === "levels") {
        renderLevelsScreen();
    } else if (screenName === "memory") {
        startMemoryGame(levelNum || currentSelectedLevel);
    } else if (screenName === "trivia") {
        startTriviaGame();
    }
}

// 7. HAFIZA SEVİYE SEÇİM EKRANI VE OYUN MOTORU (YENİLENDİ)

// Seviye Seçim Ekranını Oluştur
function renderLevelsScreen() {
    // Toplam skoru ekrana yaz
    document.getElementById("player-score").textContent = playerTotalScore;

    const gridContainer = document.getElementById("levels-grid-container");
    gridContainer.innerHTML = "";

    MEMORY_LEVELS.forEach(lvl => {
        const isLocked = lvl.level > unlockedLevel;
        const isCompleted = lvl.level < unlockedLevel || (levelStars[lvl.level] !== undefined);
        const isCurrent = lvl.level === unlockedLevel;

        const card = document.createElement("div");
        card.classList.add("level-card");

        if (isLocked) {
            card.classList.add("locked");
            card.innerHTML = `
                <span class="level-num">${lvl.level}</span>
                <i class="fas fa-lock"></i>
            `;
        } else {
            card.classList.add("unlocked");
            if (isCurrent) card.classList.add("current");
            if (isCompleted) card.classList.add("completed");

            let statusHTML = "";
            if (isCompleted) {
                const starsCount = levelStars[lvl.level] || 3;
                let starsHTML = "";
                for (let i = 0; i < 3; i++) {
                    starsHTML += i < starsCount ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
                }
                statusHTML = `
                    <div class="level-stars">${starsHTML}</div>
                    <i class="fas fa-check-circle level-check"></i>
                `;
            } else {
                statusHTML = `<span class="level-status">Oyna</span>`;
            }

            card.innerHTML = `
                <span class="level-num">${lvl.level}</span>
                ${statusHTML}
            `;

            // Tıklayınca Seviyeyi Başlat
            card.addEventListener("click", () => {
                switchScreen("memory", lvl.level);
            });
        }

        gridContainer.appendChild(card);
    });
}

// Belirli Bir Seviyede Oyunu Başlat
function startMemoryGame(levelNum) {
    currentSelectedLevel = levelNum;
    lastMemoryGameSuccess = false;

    // Seviye yapılandırmasını bul
    const lvlCfg = MEMORY_LEVELS.find(l => l.level === levelNum);
    if (!lvlCfg) return;

    matchedPairsCount = 0;
    memoryMoves = 0;
    memoryTimeRemaining = lvlCfg.timer;
    flippedCards = [];
    isBoardLocked = false;
    memoryComboCount = 0;
    lastMatchTime = 0;

    // DOM Güncellemeleri
    document.getElementById("memory-moves").textContent = "0";
    document.getElementById("memory-timer").textContent = lvlCfg.timer;
    document.getElementById("memory-combo").classList.add("hidden");
    document.getElementById("memory-level-badge").textContent = `Seviye ${lvlCfg.level} - ${lvlCfg.title}`;

    // Hamle sınırı kontrolü ve sıfırlanması
    const movesLimitContainer = document.getElementById("memory-moves-limit-container");
    const movesDisplay = document.getElementById("memory-moves");
    movesDisplay.classList.remove("warning");

    if (lvlCfg.movesLimit) {
        movesLimitContainer.classList.remove("hidden");
        document.getElementById("memory-moves-limit").textContent = lvlCfg.movesLimit;
    } else {
        movesLimitContainer.classList.add("hidden");
    }

    // Kartların oluşturulması (Seviye boyutuna göre dinamik çift sayısı)
    const numPairs = (lvlCfg.grid.r * lvlCfg.grid.c) / 2;
    // Benzersiz kartları seç ve çoğalt
    const selectedItems = CARD_ITEMS.slice(0, numPairs);
    const doubleItems = [...selectedItems, ...selectedItems];
    memoryDeck = shuffleArray(doubleItems);

    // Tahta özellikleri ve sütun yapısı
    const board = document.getElementById("memory-board");
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${lvlCfg.grid.c}, 1fr)`;

    // Sütun sayısı 5 veya daha fazlaysa kompakt boyutlandırmayı aktifleştir
    if (lvlCfg.grid.c >= 5) {
        board.classList.add("compact");
    } else {
        board.classList.remove("compact");
    }

    memoryDeck.forEach((item, index) => {
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("card-wrapper");
        cardWrapper.dataset.index = index;
        cardWrapper.dataset.type = item.type;

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        // Kartın arkası
        const cardBack = document.createElement("div");
        cardBack.classList.add("card-face", "card-back");
        const logoPlaceholder = document.createElement("div");
        logoPlaceholder.classList.add("card-logo-placeholder");
        logoPlaceholder.innerHTML = "✨";
        cardBack.appendChild(logoPlaceholder);

        // Kartın önü (Resim veya Emoji)
        const cardFront = document.createElement("div");
        cardFront.classList.add("card-face", "card-front");

        if (item.isEmoji) {
            const emojiSpan = document.createElement("span");
            emojiSpan.classList.add("card-emoji");
            emojiSpan.textContent = item.symbol;
            cardFront.appendChild(emojiSpan);
        } else {
            const img = document.createElement("img");
            img.classList.add("card-img");
            img.src = item.image;
            img.alt = item.type;
            img.onerror = () => {
                img.style.display = "none";
                const fallback = document.createElement("span");
                fallback.classList.add("card-emoji");
                fallback.textContent = item.type === "spray_bottle" ? "🧴" : "🧼";
                cardFront.appendChild(fallback);
            };
            cardFront.appendChild(img);
        }

        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);
        cardWrapper.appendChild(cardInner);

        cardWrapper.addEventListener("click", () => handleCardClick(cardWrapper, lvlCfg));

        board.appendChild(cardWrapper);
    });

    // Süre Sayacını Başlat
    startMemoryTimer();
}

function handleCardClick(card, lvlCfg) {
    if (isBoardLocked) return;
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

    // Kartı döndür
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        memoryMoves++;
        const movesDisplay = document.getElementById("memory-moves");
        movesDisplay.textContent = memoryMoves;

        // Hamle Sınırı uyarısı (son 3 hamlede kırmızı yanıp sönsün)
        if (lvlCfg.movesLimit) {
            const remainingMoves = lvlCfg.movesLimit - memoryMoves;
            if (remainingMoves <= 3) {
                movesDisplay.classList.add("warning");
            }
        }

        checkMemoryMatch(lvlCfg);
    }
}

function checkMemoryMatch(lvlCfg) {
    isBoardLocked = true;
    const [card1, card2] = flippedCards;
    const type1 = card1.dataset.type;
    const type2 = card2.dataset.type;

    const numPairs = (lvlCfg.grid.r * lvlCfg.grid.c) / 2;

    if (type1 === type2) {
        // Eşleşme Başarılı!
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairsCount++;

        // Kombo Sistemi
        const now = Date.now();
        if (lastMatchTime > 0 && (now - lastMatchTime) < 4000) {
            memoryComboCount++;
            showComboBadge();
        } else {
            memoryComboCount = 1;
            document.getElementById("memory-combo").classList.add("hidden");
        }
        lastMatchTime = now;

        flippedCards = [];
        isBoardLocked = false;

        // Tüm Çiftler Eşleşti mi?
        if (matchedPairsCount === numPairs) {
            stopMemoryTimer();
            setTimeout(winMemoryGame, 500);
        }
    } else {
        // Eşleşme Başarısız, kartları geri kapat
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
            isBoardLocked = false;

            // Komboyu sıfırla
            memoryComboCount = 0;
            document.getElementById("memory-combo").classList.add("hidden");

            // Hamle sınırından dolayı yenildi mi kontrolü (kartlar kapandıktan sonra)
            if (lvlCfg.movesLimit && memoryMoves >= lvlCfg.movesLimit) {
                stopMemoryTimer();
                gameOverMemoryGame();
            }
        }, 1000);
    }
}

function showComboBadge() {
    const comboBadge = document.getElementById("memory-combo");
    const multiplier = document.getElementById("combo-multiplier");
    
    if (memoryComboCount > 1) {
        multiplier.textContent = `${memoryComboCount}x`;
        comboBadge.classList.remove("hidden");
        
        comboBadge.style.transform = "scale(1.2)";
        setTimeout(() => { comboBadge.style.transform = "scale(1)"; }, 150);
    }
}

function startMemoryTimer() {
    stopMemoryTimer();
    memoryTimerInterval = setInterval(() => {
        memoryTimeRemaining--;
        document.getElementById("memory-timer").textContent = memoryTimeRemaining;

        if (memoryTimeRemaining <= 0) {
            stopMemoryTimer();
            gameOverMemoryGame();
        }
    }, 1000);
}

function stopMemoryTimer() {
    if (memoryTimerInterval) {
        clearInterval(memoryTimerInterval);
        memoryTimerInterval = null;
    }
}

// Seviyeyi Kazanma Durumu
function winMemoryGame() {
    lastMemoryGameSuccess = true;
    const lvlCfg = MEMORY_LEVELS.find(l => l.level === currentSelectedLevel);

    // Yıldız hesaplama
    let starsAwarded = 1;
    if (lvlCfg.movesLimit) {
        const movesRatio = memoryMoves / lvlCfg.movesLimit;
        if (movesRatio <= 0.6) starsAwarded = 3;
        else if (movesRatio <= 0.85) starsAwarded = 2;
    } else {
        const timeRatio = memoryTimeRemaining / lvlCfg.timer;
        if (timeRatio >= 0.5) starsAwarded = 3;
        else if (timeRatio >= 0.2) starsAwarded = 2;
    }

    // Yıldız durumunu kaydet
    const prevStars = levelStars[currentSelectedLevel] || 0;
    levelStars[currentSelectedLevel] = Math.max(prevStars, starsAwarded);
    localStorage.setItem("chook_level_stars", JSON.stringify(levelStars));

    // Sonraki seviyenin kilidini aç
    if (currentSelectedLevel === unlockedLevel && unlockedLevel < 15) {
        unlockedLevel++;
        localStorage.setItem("chook_unlocked_level", unlockedLevel);
    }

    // Puan hesaplama (Taban 100 puan + Seviye * 20 puan + kalan her saniye için +5 puan)
    const levelBonus = currentSelectedLevel * 20;
    const timeBonus = memoryTimeRemaining * 5;
    const totalWinPoints = 100 + levelBonus + timeBonus;

    updatePlayerTotalScore(totalWinPoints);

    // Tip Modalı ve marka neşesi ipucu
    const randomTip = getRandomBrandTip();

    // Sonuç butonlarını dinamik olarak özelleştir
    const retryBtn = document.getElementById("result-retry-btn");
    const homeBtn = document.getElementById("result-home-btn");

    if (currentSelectedLevel < 15) {
        retryBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Sıradaki Seviye';
    } else {
        retryBtn.innerHTML = '<i class="fas fa-redo"></i> Seviye 15\'i Tekrar Et';
    }
    homeBtn.innerHTML = '<i class="fas fa-th"></i> Seviyeler';

    // Yıldız ikonlarını hazırla
    let starsHTML = "";
    for (let i = 0; i < 3; i++) {
        starsHTML += i < starsAwarded 
            ? '<i class="fas fa-star" style="color: #fbbf24; font-size: 1.4rem; margin: 0 4px; filter: drop-shadow(0 0 4px rgba(251,191,36,0.5));"></i>' 
            : '<i class="far fa-star" style="color: rgba(255,255,255,0.2); font-size: 1.4rem; margin: 0 4px;"></i>';
    }

    showTipModal(randomTip, () => {
        // Tip kapatıldığında Sonuç Ekranını Aç
        showResultModal({
            title: `Seviye ${currentSelectedLevel} Tamamlandı!`,
            subtitle: `<div style="margin-bottom: 8px;">Zihniniz Chook Temiz gibi parıldıyor!</div><div class="stars-display" style="display:flex; justify-content:center; align-items:center; margin-top:8px;">${starsHTML}</div>`,
            score: `+${totalWinPoints}`,
            secLabel: "Kalan Süre",
            secVal: `${memoryTimeRemaining} sn`,
            promo: randomTip.tip
        });
    });
}

// Oyunu Kaybetme / Süre-Hamle Dolma Durumu
function gameOverMemoryGame() {
    lastMemoryGameSuccess = false;
    const lvlCfg = MEMORY_LEVELS.find(l => l.level === currentSelectedLevel);

    // Sonuç butonlarını sıfırla
    const retryBtn = document.getElementById("result-retry-btn");
    const homeBtn = document.getElementById("result-home-btn");

    retryBtn.innerHTML = '<i class="fas fa-redo"></i> Tekrar Dene';
    homeBtn.innerHTML = '<i class="fas fa-th"></i> Seviyeler';

    showResultModal({
        title: "Süre Doldu!",
        subtitle: lvlCfg.movesLimit && memoryMoves >= lvlCfg.movesLimit 
            ? "Maksimum hamle sınırını aştınız. Pes etmek yok!" 
            : "Zaman sınırına takıldınız. Odaklanarak daha hızlı olabilirsiniz!",
        score: "+0",
        secLabel: "Kullanılan Hamle",
        secVal: `${memoryMoves}`,
        promo: "Zaman ve hamle sınırları zihinsel çevikliği destekler. Bir sonrakinde Chook Temiz ferahlığıyla dene!"
    });
}

// 8. BİLGİ YARIŞMASI MOTORU
function startTriviaGame() {
    currentQuestionIndex = 0;
    triviaScore = 0;
    isTriviaLocked = false;

    // Soru havuzundan rastgele 5 soru seç
    selectedTriviaQuestions = shuffleArray([...TRIVIA_QUESTIONS]).slice(0, 5);

    renderTriviaQuestion();
}

function renderTriviaQuestion() {
    isTriviaLocked = false;
    const currentQuestion = selectedTriviaQuestions[currentQuestionIndex];

    // İlerleme çubuğunu ve metinleri güncelle
    document.getElementById("current-question-num").textContent = currentQuestionIndex + 1;
    document.getElementById("trivia-points").textContent = triviaScore;

    const progressPercent = ((currentQuestionIndex + 1) / 5) * 100;
    document.getElementById("trivia-progress-bar").style.width = `${progressPercent}%`;

    // Kategori ve Soru Metni
    document.getElementById("trivia-category-badge").textContent = currentQuestion.category;
    document.getElementById("trivia-question").textContent = currentQuestion.question;

    // Şıkları Temizle ve Oluştur
    const optionsContainer = document.getElementById("trivia-options");
    optionsContainer.innerHTML = "";

    const letters = ["A", "B", "C", "D"];
    currentQuestion.options.forEach((optText, index) => {
        const optBtn = document.createElement("button");
        optBtn.classList.add("option-btn");
        
        const letterSpan = document.createElement("span");
        letterSpan.classList.add("option-letter");
        letterSpan.textContent = letters[index];

        const textSpan = document.createElement("span");
        textSpan.classList.add("option-text");
        textSpan.textContent = optText;

        optBtn.appendChild(letterSpan);
        optBtn.appendChild(textSpan);

        optBtn.addEventListener("click", () => handleOptionClick(index, optBtn));

        optionsContainer.appendChild(optBtn);
    });
}

function handleOptionClick(selectedIndex, clickedBtn) {
    if (isTriviaLocked) return;
    isTriviaLocked = true;

    const currentQuestion = selectedTriviaQuestions[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;

    const optionsContainer = document.getElementById("trivia-options");
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    if (selectedIndex === correctIndex) {
        // Doğru Cevap!
        clickedBtn.classList.add("correct");
        triviaScore += 50;
        document.getElementById("trivia-points").textContent = triviaScore;
    } else {
        // Yanlış Cevap
        clickedBtn.classList.add("incorrect");
        // Doğru olanı da yeşil yakarak göster
        buttons[correctIndex].classList.add("correct");
    }

    // 1.5 saniye bekle, ardından bir sonraki soruya veya marka ipucu ekranına geç
    setTimeout(() => {
        // Her 2 soruda bir veya son sorudan önce marka ipucu modalı çıkartalım (Öğretici içerik beslemesi)
        if (currentQuestionIndex === 1 || currentQuestionIndex === 3) {
            showTipModal(currentQuestion, () => {
                goToNextQuestion();
            });
        } else {
            goToNextQuestion();
        }
    }, 1500);
}

function goToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 5) {
        renderTriviaQuestion();
    } else {
        finishTriviaGame();
    }
}

function finishTriviaGame() {
    updatePlayerTotalScore(triviaScore);

    // Sonuç modalını göster
    showResultModal({
        title: "Yarışma Bitti!",
        subtitle: "Tebrikler! Soruları yanıtlayarak harika bilgiler öğrendin.",
        score: `+${triviaScore}`,
        secLabel: "Doğru Sayısı",
        secVal: `${triviaScore / 50}/5`,
        promo: "Chook Temiz olarak evlerinize hijyen, pratiklik ve neşe katmaya devam ediyoruz. Bizi takipte kalın!"
    });
}

// 9. MODAL YÖNETİMİ (Kılavuzlar ve Sonuçlar)
function showTipModal(contentObj, onCloseCallback) {
    const tipModal = document.getElementById("tip-modal");
    
    // İçeriği güncelle
    document.getElementById("tip-brand-badge").textContent = contentObj.category.split(" - ")[0];
    document.getElementById("tip-content-text").textContent = contentObj.tip;

    // Logoyu renklendir
    const badge = document.getElementById("tip-brand-badge");
    badge.style.background = "var(--grad-chook)";

    tipModal.classList.add("active");

    // Kapatma butonu dinleyicisi (Tek seferlik çalışması için once: true kullanılır)
    const closeBtn = document.getElementById("close-tip-btn");
    const handleClose = () => {
        closeTipModal();
        if (onCloseCallback) onCloseCallback();
        closeBtn.removeEventListener("click", handleClose);
    };
    closeBtn.addEventListener("click", handleClose);
}

function closeTipModal() {
    document.getElementById("tip-modal").classList.remove("active");
}

function showResultModal(config) {
    const modal = document.getElementById("result-modal");
    
    document.getElementById("result-title").textContent = config.title;
    document.getElementById("result-subtitle").innerHTML = config.subtitle;
    document.getElementById("result-score-val").textContent = config.score;
    document.getElementById("result-secondary-label").textContent = config.secLabel;
    document.getElementById("result-secondary-val").textContent = config.secVal;
    document.getElementById("result-promo-text").innerHTML = `<strong>Tavsiye:</strong> ${config.promo}`;

    modal.classList.add("active");

    // Eğer kazanılan puan varsa konfeti yağdır!
    if (config.score !== "+0") {
        triggerConfetti();
    }
}

function closeResultModal() {
    document.getElementById("result-modal").classList.remove("active");
    const confettiContainer = document.getElementById("confetti-effect");
    confettiContainer.innerHTML = ""; // Konfetileri temizle
}

function restartCurrentGame() {
    closeResultModal();
    if (activeScreen === "memory") {
        startMemoryGame();
    } else if (activeScreen === "trivia") {
        startTriviaGame();
    }
}

// 10. YARDIMCI ALGORİTMALAR VE EFEKTLER

// Toplam Skor Güncelleme & Animasyonu
function updatePlayerTotalScore(pointsToAdd) {
    playerTotalScore += pointsToAdd;
    localStorage.setItem("chook_score", playerTotalScore);

    const scoreEl = document.getElementById("player-score");
    
    // Sayı artma animasyonu simülasyonu
    let start = playerTotalScore - pointsToAdd;
    const duration = 800; // ms
    const stepTime = Math.max(Math.floor(duration / pointsToAdd), 15);
    
    const timer = setInterval(() => {
        start += Math.ceil(pointsToAdd / 20);
        if (start >= playerTotalScore) {
            start = playerTotalScore;
            clearInterval(timer);
        }
        scoreEl.textContent = start;
    }, stepTime);

    // Taç parlaması
    const crown = document.querySelector(".gold-crown");
    crown.style.transform = "scale(1.4) rotate(-15deg)";
    setTimeout(() => { crown.style.transform = "scale(1) rotate(0deg)"; }, 300);
}

// Dizi Karıştırma (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Rastgele Marka İpucu Getirici
function getRandomBrandTip() {
    const randomIndex = Math.floor(Math.random() * TRIVIA_QUESTIONS.length);
    return TRIVIA_QUESTIONS[randomIndex];
}

// Pürüzsüz Saf JS Konfeti Efekti
function triggerConfetti() {
    const container = document.getElementById("confetti-effect");
    container.innerHTML = "";

    const colors = ["#8b5cf6", "#ec4899", "#10b981", "#fbbf24", "#3b82f6"];
    const confettiCount = 60;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = `${Math.random() * 8 + 5}px`;
        confetti.style.height = `${Math.random() * 8 + 5}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        
        // Başlangıç konumları (üst ortadan saçılma)
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * -20}%`;
        
        container.appendChild(confetti);

        // Bağımsız animasyon kurgusu
        const duration = Math.random() * 3 + 2; // saniye
        const drift = (Math.random() - 0.5) * 100; // yatay sapma (px)
        
        confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(350px) translateX(${drift}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: "cubic-bezier(0.1, 0.8, 0.3, 1)",
            fill: "forwards"
        });
    }
}
