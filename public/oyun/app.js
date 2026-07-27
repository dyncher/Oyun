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

// Yapboz Oyunu Durumu
let puzzleGridSize = 3;
let puzzleSelectedImg = "./assets/cute_spray_bottle.png";
let puzzlePieces = [];
let puzzleSelectedPieceIndex = null;
let puzzleMoves = 0;
let puzzleTimer = 0;
let puzzleTimerInterval = null;
let isPuzzleCompleted = false;

// Kelime Avı Durumu
let currentWordIndex = 0;
let activeWordObj = null;
let wordUserSelections = [];
let wordLetters = [];
let wordTimer = 0;
let wordTimerInterval = null;
let isWordCompleted = false;

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
    
    const startPuzzleBtn = document.getElementById("start-puzzle-btn");
    if (startPuzzleBtn) {
        startPuzzleBtn.addEventListener("click", () => switchScreen("puzzle-setup"));
    }
    
    const startWordBtn = document.getElementById("start-word-btn");
    if (startWordBtn) {
        startWordBtn.addEventListener("click", () => switchScreen("word"));
    }

    // Logo Tıklama (Ana Sayfaya Dönüş)
    document.getElementById("logo-btn").addEventListener("click", () => switchScreen("dashboard"));

    // Geri Dönüş Butonları
    document.getElementById("levels-back-btn").addEventListener("click", () => switchScreen("dashboard"));
    document.getElementById("memory-back-btn").addEventListener("click", () => switchScreen("levels"));
    
    const puzzleSetupBackBtn = document.getElementById("puzzle-setup-back-btn");
    if (puzzleSetupBackBtn) {
        puzzleSetupBackBtn.addEventListener("click", () => switchScreen("dashboard"));
    }
    
    const puzzleGameBackBtn = document.getElementById("puzzle-game-back-btn");
    if (puzzleGameBackBtn) {
        puzzleGameBackBtn.addEventListener("click", () => switchScreen("puzzle-setup"));
    }
    
    const wordGameBackBtn = document.getElementById("word-game-back-btn");
    if (wordGameBackBtn) {
        wordGameBackBtn.addEventListener("click", () => switchScreen("dashboard"));
    }

    document.querySelectorAll(".back-to-dashboard-btn").forEach(btn => {
        btn.addEventListener("click", () => switchScreen("dashboard"));
    });

    // Word Oyunu Kontrolleri
    const wordClearBtn = document.getElementById("word-clear-btn");
    if (wordClearBtn) {
        wordClearBtn.addEventListener("click", clearWordRound);
    }
    
    const wordShuffleBtn = document.getElementById("word-shuffle-btn");
    if (wordShuffleBtn) {
        wordShuffleBtn.addEventListener("click", shufflePoolLetters);
    }

    // Modallardan Çıkış ve Menü Butonları
    document.getElementById("close-tip-btn").addEventListener("click", closeTipModal);
    document.getElementById("result-home-btn").addEventListener("click", () => {
        closeResultModal();
        switchScreen("dashboard");
    });
    document.getElementById("result-retry-btn").addEventListener("click", restartCurrentGame);

    // Sonraki Seviye / Aşama Butonu (Açık ve Akıcı Otomatik Geçiş)
    const resultNextBtn = document.getElementById("result-next-btn");
    if (resultNextBtn) {
        resultNextBtn.addEventListener("click", () => {
            closeResultModal();
            if (activeScreen === "memory") {
                const nextLvl = currentSelectedLevel + 1;
                if (nextLvl <= 15) {
                    switchScreen("memory", nextLvl);
                }
            } else if (activeScreen === "word") {
                const nextWord = currentWordIndex + 1;
                if (nextWord < WORD_POOL.length) {
                    loadWordRound(nextWord);
                } else {
                    switchScreen("dashboard");
                }
            } else if (activeScreen === "puzzle") {
                switchScreen("puzzle-setup");
            }
        });
    }
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
    // Önceki tüm ekranların zamanlayıcılarını ve durumlarını temizle
    stopMemoryTimer();
    stopPuzzleTimer();
    stopWordTimer();
    
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
    } else if (screenName === "puzzle-setup") {
        initPuzzleSetupScreen();
    } else if (screenName === "puzzle") {
        startPuzzleGame();
    } else if (screenName === "word") {
        startWordGame();
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

    retryBtn.innerHTML = '<i class="fas fa-redo"></i> Yeniden';
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
            promo: randomTip.tip,
            hasNextLevel: currentSelectedLevel < 15
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

    // Sonraki Seviye Butonu Kontrolü
    const nextBtn = document.getElementById("result-next-btn");
    if (nextBtn) {
        if (config.hasNextLevel) {
            nextBtn.classList.remove("hidden");
        } else {
            nextBtn.classList.add("hidden");
        }
    }

    modal.classList.add("active");

    // Eğer kazanılan puan varsa konfeti yağdır!
    if (config.score !== "+0" && config.score !== "0") {
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
        startMemoryGame(currentSelectedLevel);
    } else if (activeScreen === "trivia") {
        startTriviaGame();
    } else if (activeScreen === "puzzle") {
        startPuzzleGame();
    } else if (activeScreen === "word") {
        loadWordRound(currentWordIndex);
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

// ==========================================================================
// YAPBOZ OYUN MOTORU (PUZZLE ENGINE)
// ==========================================================================

// Yapboz Kurulum Ekranını İlklendir
function initPuzzleSetupScreen() {
    // Zorluk butonu tıklamaları
    const diffButtons = document.querySelectorAll(".diff-btn");
    diffButtons.forEach(btn => {
        btn.onclick = (e) => {
            diffButtons.forEach(b => b.classList.remove("active"));
            const target = e.currentTarget;
            target.classList.add("active");
            puzzleGridSize = parseInt(target.getAttribute("data-grid"));
        };
    });

    // Görsel kartı tıklamaları
    const galleryCards = document.querySelectorAll(".gallery-card");
    galleryCards.forEach(card => {
        card.onclick = (e) => {
            galleryCards.forEach(c => c.classList.remove("active"));
            const target = e.currentTarget;
            target.classList.add("active");
            puzzleSelectedImg = target.getAttribute("data-img");
        };
    });

    // Yapbozu Başlat Butonu
    const startBtn = document.getElementById("start-puzzle-game-btn");
    if (startBtn) {
        startBtn.onclick = () => switchScreen("puzzle");
    }
}

// Yapbozu Başlat
function startPuzzleGame() {
    isPuzzleCompleted = false;
    puzzleMoves = 0;
    puzzleTimer = 0;
    puzzleSelectedPieceIndex = null;
    document.getElementById("puzzle-moves").textContent = puzzleMoves;
    document.getElementById("puzzle-timer").textContent = puzzleTimer;

    // Seviye başlığı güncelle
    document.getElementById("puzzle-title-badge").textContent = `Yapboz (${puzzleGridSize}x${puzzleGridSize})`;

    // Önizleme görselini güncelle
    document.getElementById("puzzle-preview-img").src = puzzleSelectedImg;

    // Zamanlayıcıyı Başlat
    stopPuzzleTimer();
    puzzleTimerInterval = setInterval(() => {
        puzzleTimer++;
        document.getElementById("puzzle-timer").textContent = puzzleTimer;
    }, 1000);

    // Parçaları oluştur ve karıştır
    initPuzzleBoard();

    // Önizleme ve İpucu Butonu Olayları
    setupPuzzleHintEvents();
}

// Zamanlayıcıyı durdur
function stopPuzzleTimer() {
    if (puzzleTimerInterval) {
        clearInterval(puzzleTimerInterval);
        puzzleTimerInterval = null;
    }
}

// Parçaları oluştur ve tahtaya çiz
function initPuzzleBoard() {
    const board = document.getElementById("puzzle-board");
    board.className = ""; // Eski sınıfları temizle
    board.style.gridTemplateColumns = `repeat(${puzzleGridSize}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${puzzleGridSize}, 1fr)`;
    board.innerHTML = "";

    const totalPieces = puzzleGridSize * puzzleGridSize;
    puzzlePieces = [];

    // Önce doğru sıralı parçaları üret
    for (let i = 0; i < totalPieces; i++) {
        puzzlePieces.push({
            correctIndex: i,
            currentIndex: i
        });
    }

    // Parçaları karıştır (En az üçte ikisinin yanlış yerde başlamasını garanti edelim ki çözme zevki yüksek olsun)
    let attempts = 0;
    let correctCount = totalPieces;
    
    while (correctCount > totalPieces / 3 && attempts < 100) {
        shuffleArray(puzzlePieces);
        correctCount = 0;
        for (let i = 0; i < totalPieces; i++) {
            if (puzzlePieces[i].correctIndex === i) {
                correctCount++;
            }
        }
        attempts++;
    }

    // Tahtaya çiz
    renderPuzzleBoard();
}

// Parçaları Tahtaya Render Et
function renderPuzzleBoard() {
    const board = document.getElementById("puzzle-board");
    board.innerHTML = "";

    puzzlePieces.forEach((piece, index) => {
        const div = document.createElement("div");
        div.classList.add("puzzle-piece");
        div.setAttribute("data-index", index);

        // CSS Arka Plan Dilimi Ayarla
        const r = Math.floor(piece.correctIndex / puzzleGridSize);
        const c = piece.correctIndex % puzzleGridSize;

        const sizePercent = puzzleGridSize * 100;
        const step = 100 / (puzzleGridSize - 1);
        const posX = (c * step).toFixed(4);
        const posY = (r * step).toFixed(4);

        div.style.backgroundImage = `url("${puzzleSelectedImg}")`;
        div.style.backgroundSize = `${sizePercent}% ${sizePercent}%`;
        div.style.backgroundPosition = `${posX}% ${posY}%`;

        // Kilitli (Doğru yerde) kontrolü
        const isCorrect = piece.correctIndex === index;

        if (isCorrect) {
            div.classList.add("locked");
            
            // Kilit simgesi yerleştir
            const lockIndicator = document.createElement("div");
            lockIndicator.classList.add("piece-lock-indicator");
            lockIndicator.innerHTML = '<i class="fas fa-check"></i>';
            div.appendChild(lockIndicator);
        } else if (puzzleSelectedPieceIndex === index) {
            div.classList.add("selected");
        }

        // Koordinat filigranını yerleştir (Beyaz boşluklardaki imkansızlık sorununu kusursuz çözer)
        const colLetter = String.fromCharCode(65 + c);
        const rowNum = r + 1;
        const coordSpan = document.createElement("span");
        coordSpan.classList.add("piece-coord");
        coordSpan.textContent = `${colLetter}${rowNum}`;
        div.appendChild(coordSpan);

        // Tıklama Olayı (Doğru yerdeki parça kilitlidir, tıklanamaz)
        if (!isCorrect) {
            div.onclick = () => handlePieceClick(index);
        }

        board.appendChild(div);
    });
}

// Parça Tıklama İşleme (Takas Mantığı)
function handlePieceClick(index) {
    if (isPuzzleCompleted) return;

    // Kilitli bir parça seçilemez veya taşınamaz
    const clickedPiece = puzzlePieces[index];
    if (clickedPiece.correctIndex === index) return;

    if (puzzleSelectedPieceIndex === null) {
        // İlk parçayı seç
        puzzleSelectedPieceIndex = index;
        renderPuzzleBoard();
    } else {
        if (puzzleSelectedPieceIndex === index) {
            // Aynı parçaya tıklandı, seçimi iptal et
            puzzleSelectedPieceIndex = null;
            renderPuzzleBoard();
            return;
        }

        const firstIndex = puzzleSelectedPieceIndex;
        const secondIndex = index;

        // Her ihtimale karşı her iki parçanın da kilitli olmadığını garanti edelim
        if (puzzlePieces[firstIndex].correctIndex === firstIndex || puzzlePieces[secondIndex].correctIndex === secondIndex) {
            puzzleSelectedPieceIndex = null;
            renderPuzzleBoard();
            return;
        }

        // İki parçayı takas et!
        const temp = puzzlePieces[firstIndex];
        puzzlePieces[firstIndex] = puzzlePieces[secondIndex];
        puzzlePieces[secondIndex] = temp;

        puzzleMoves++;
        document.getElementById("puzzle-moves").textContent = puzzleMoves;

        puzzleSelectedPieceIndex = null; // Seçimi temizle
        renderPuzzleBoard();

        // Çözüldü mü kontrol et
        checkPuzzleCompletion();
    }
}

// Yapboz Tamamlandı mı Kontrol Et
function checkPuzzleCompletion() {
    let allCorrect = true;
    for (let i = 0; i < puzzlePieces.length; i++) {
        if (puzzlePieces[i].correctIndex !== i) {
            allCorrect = false;
            break;
        }
    }

    if (allCorrect) {
        isPuzzleCompleted = true;
        stopPuzzleTimer();

        setTimeout(() => {
            const basePoints = puzzleGridSize === 3 ? 100 : (puzzleGridSize === 4 ? 200 : 350);
            const timeBonus = Math.max(0, 120 - puzzleTimer);
            const moveBonus = Math.max(0, 50 - puzzleMoves) * 2;
            const pointsEarned = basePoints + timeBonus + moveBonus;

            playerTotalScore += pointsEarned;
            localStorage.setItem("chook_score", playerTotalScore);
            document.getElementById("player-score").textContent = playerTotalScore;

            showResultModal({
                title: "Yapboz Çözüldü!",
                subtitle: `<div style="margin-bottom: 8px;">Tebrikler! ${puzzleGridSize}x${puzzleGridSize} yapbozu başarıyla tamamladın!</div>`,
                score: `+${pointsEarned}`,
                secLabel: "Hamle Sayısı",
                secVal: `${puzzleMoves}`,
                promo: "Yapboz çözmek zihinsel görselleştirme ve mekansal zeka becerilerini geliştirir. Chook Temiz ile parlamaya devam et!",
                hasNextLevel: true // Tekrar oynamak üzere kuruluma geçiş butonunu gösterecektir
            });
        }, 800);
    }
}

// İpucu Butonu Olayları (Basılı tutunca resmi göster)
function setupPuzzleHintEvents() {
    const hintBtn = document.getElementById("puzzle-hint-btn");
    const previewOverlay = document.getElementById("puzzle-preview-overlay");

    if (hintBtn && previewOverlay) {
        const showHint = () => {
            previewOverlay.classList.remove("hidden");
            previewOverlay.style.opacity = "1";
        };

        const hideHint = () => {
            previewOverlay.style.opacity = "0";
            setTimeout(() => {
                if (previewOverlay.style.opacity === "0") {
                    previewOverlay.classList.add("hidden");
                }
            }, 300);
        };

        // Desktop
        hintBtn.onmousedown = showHint;
        hintBtn.onmouseup = hideHint;
        hintBtn.onmouseleave = hideHint;

        // Mobile
        hintBtn.ontouchstart = (e) => {
            e.preventDefault();
            showHint();
        };
        hintBtn.ontouchend = hideHint;
    }
}

// ==========================================================================
// KELİME AVI OYUN MOTORU (WORD CONNECT ENGINE)
// ==========================================================================

const WORD_POOL = [
    {
        word: "CHOOK",
        hint: "Doğadan ilham alan, her yeri ışıl ışıl parıldatan neşeli temizlik markamız.",
        tip: "Chook Temiz, doğaya ve geleceğe değer veren vegan formülleriyle evinizi neşeyle parlatır!"
    },
    {
        word: "TEMİZ",
        hint: "Evlerimizin hijyenik, lekesiz, ferah ve pırıl pırıl olma durumu.",
        tip: "Temiz bir ev, sakin bir zihnin en önemli destekçisidir."
    },
    {
        word: "SABUN",
        hint: "Geleneksel temizlikte sıvı Arap formuyla çok sevilen doğal köpüklü temizleyici.",
        tip: "Chook Sıvı Arap Sabunu, tüm yüzeylerde iz bırakmadan geleneksel temizlik ve parlaklık sunar."
    },
    {
        word: "KÖPÜK",
        hint: "Deterjanın suyla birleştiğinde oluşturduğu, temizliği hissettiren hafif beyaz baloncuklar.",
        tip: "Bol köpük neşeli temizlik demektir! Chook deterjanları az bir miktar ile bol köpürür."
    },
    {
        word: "HİJYEN",
        hint: "Bakteri ve mikroplardan arınmış, sağlığımızı koruyan kusursuz temizlik standardı.",
        tip: "Mutfak ve banyo gibi temasın yüksek olduğu alanlarda Chook hijyen çözümleri üstün koruma sağlar."
    },
    {
        word: "DOĞAL",
        hint: "Formüllerimizde sentetik kimyasallar yerine bitkisel ve saf özler tercih etmemiz.",
        tip: "Chook Temiz ürünleri, doğadan ilham alan doğal içerikleriyle evcil hayvanlarınız için güvenlidir."
    },
    {
        word: "ÇAMAŞIR",
        hint: "Mis kokulu yumuşatıcılar ve renk koruyucu deterjanlarla yıkadığımız giysilerimiz.",
        tip: "Çamaşırları yıkarken Chook deterjanları renklerin ilk günkü gibi canlı kalmasını sağlar."
    },
    {
        word: "PARLAK",
        hint: "Camların, aynaların ve zeminlerin tozsuz, lekesiz ve pürüzsüzce ışığı yansıtması.",
        tip: "Mikrofiber bez ile dairesel hareketlerle toz almak yüzeylerin uzun süre parlak kalmasını sağlar."
    },
    {
        word: "LAVANTA",
        hint: "Chook temizleyicilerinde bulunan, mor çiçekli bitkiden elde edilen dinlendirici koku özü.",
        tip: "Lavanta kokusu, temizlik sonrası evinizde stresi azaltan, huzurlu bir atmosfer yaratır."
    },
    {
        word: "FİLİZ",
        hint: "Doğanın uyanışını, yeşermeyi ve çevre dostu felsefemizi temsil eden taze sürgün.",
        tip: "Gelecek nesillere daha yeşil bir dünya bırakmak için Chook olarak çevreye duyarlı ambalajlar kullanıyoruz."
    }
];

// Kelime Avı Oyununu Başlat
function startWordGame() {
    currentWordIndex = 0;
    isWordCompleted = false;
    loadWordRound(0);
}

// Zamanlayıcıyı Durdur
function stopWordTimer() {
    if (wordTimerInterval) {
        clearInterval(wordTimerInterval);
        wordTimerInterval = null;
    }
}

// Belirli bir kelime turunu yükle
function loadWordRound(index) {
    if (index < 0 || index >= WORD_POOL.length) {
        switchScreen("dashboard");
        return;
    }

    currentWordIndex = index;
    activeWordObj = WORD_POOL[index];
    wordUserSelections = [];
    isWordCompleted = false;
    wordTimer = 0;

    // Arayüz Değerleri
    document.getElementById("word-title-badge").textContent = `Kelime Avı (${index + 1}/${WORD_POOL.length})`;
    document.getElementById("word-hint-desc").textContent = activeWordObj.hint;
    document.getElementById("word-timer").textContent = wordTimer;

    // Timer Başlat
    stopWordTimer();
    wordTimerInterval = setInterval(() => {
        wordTimer++;
        document.getElementById("word-timer").textContent = wordTimer;
    }, 1000);

    // Harfleri diziye böl, karıştır
    const wordStr = activeWordObj.word.toUpperCase();
    const charsArray = wordStr.split("");
    
    // Karıştırma işlemi
    let shuffledChars = [...charsArray];
    let attempts = 0;
    while (shuffledChars.join("") === wordStr && attempts < 10) {
        shuffleArray(shuffledChars);
        attempts++;
    }

    // Harf nesnelerini oluştur
    wordLetters = shuffledChars.map((char, idx) => ({
        char: char,
        poolIndex: idx,
        isUsed: false
    }));

    // Ekranı Çiz
    renderWordSlots();
    renderLettersPool();
}

// Boş Yuvaları Çiz
function renderWordSlots() {
    const slotsContainer = document.getElementById("word-slots");
    slotsContainer.innerHTML = "";

    const correctWord = activeWordObj.word;

    for (let i = 0; i < correctWord.length; i++) {
        const slotDiv = document.createElement("div");
        slotDiv.classList.add("word-slot");
        slotDiv.setAttribute("data-slot-index", i);

        // Eğer bu yuvada bir harf seçilmişse göster
        if (i < wordUserSelections.length) {
            const poolIndex = wordUserSelections[i];
            slotDiv.textContent = wordLetters[poolIndex].char;
            slotDiv.classList.add("filled");

            // Tıklayınca bu harfi iptal etsin (Geri alsın)
            slotDiv.onclick = () => handleSlotClick(i);
        }

        slotsContainer.appendChild(slotDiv);
    }
}

// Harf Havuzunu Çiz
function renderLettersPool() {
    const poolContainer = document.getElementById("word-letters-pool");
    poolContainer.innerHTML = "";

    wordLetters.forEach((letterObj) => {
        const letterDiv = document.createElement("div");
        letterDiv.classList.add("word-letter");
        letterDiv.textContent = letterObj.char;
        letterDiv.setAttribute("data-pool-index", letterObj.poolIndex);

        if (letterObj.isUsed) {
            letterDiv.classList.add("used");
        } else {
            letterDiv.onclick = () => handlePoolLetterClick(letterObj.poolIndex);
        }

        poolContainer.appendChild(letterDiv);
    });
}

// Havuzdaki Harfe Tıklama
function handlePoolLetterClick(poolIndex) {
    if (isWordCompleted) return;

    const letterObj = wordLetters[poolIndex];
    if (letterObj.isUsed) return;

    if (wordUserSelections.length < activeWordObj.word.length) {
        letterObj.isUsed = true;
        wordUserSelections.push(poolIndex);

        renderWordSlots();
        renderLettersPool();

        // Kelime tamamlandı mı kontrol et
        if (wordUserSelections.length === activeWordObj.word.length) {
            checkWordSuccess();
        }
    }
}

// Hedef Slot'a Tıklayarak Harfi Geri Alma
function handleSlotClick(slotIndex) {
    if (isWordCompleted) return;

    if (slotIndex < wordUserSelections.length) {
        const poolIndex = wordUserSelections[slotIndex];
        wordLetters[poolIndex].isUsed = false;
        wordUserSelections.splice(slotIndex, 1);

        renderWordSlots();
        renderLettersPool();
    }
}

// Harfleri Karıştır Butonu
function shufflePoolLetters() {
    if (isWordCompleted) return;

    // Sadece kullanılmamış harfleri karıştır
    const unusedLetters = wordLetters.filter(l => !wordUserSelections.includes(l.poolIndex));
    const unusedIndices = unusedLetters.map(l => l.poolIndex);

    let shuffledIndices = [...unusedIndices];
    shuffleArray(shuffledIndices);

    const newLetters = [...wordLetters];
    unusedIndices.forEach((oldIdx, i) => {
        newLetters[oldIdx] = wordLetters[shuffledIndices[i]];
    });

    wordLetters = newLetters;
    renderLettersPool();
}

// Temizle Butonu
function clearWordRound() {
    if (isWordCompleted) return;

    wordLetters.forEach(l => l.isUsed = false);
    wordUserSelections = [];

    renderWordSlots();
    renderLettersPool();
}

// Kelimenin Doğruluğunu Kontrol Et
function checkWordSuccess() {
    const userWord = wordUserSelections.map(idx => wordLetters[idx].char).join("").toUpperCase();
    const correctWord = activeWordObj.word.toUpperCase();

    if (userWord === correctWord) {
        isWordCompleted = true;
        stopWordTimer();

        setTimeout(() => {
            const lengthBonus = correctWord.length * 25;
            const timeBonus = Math.max(0, 45 - wordTimer) * 2;
            const pointsEarned = lengthBonus + timeBonus;

            playerTotalScore += pointsEarned;
            localStorage.setItem("chook_score", playerTotalScore);
            document.getElementById("player-score").textContent = playerTotalScore;

            const isLastRound = currentWordIndex === WORD_POOL.length - 1;

            showResultModal({
                title: "Kelime Bulundu!",
                subtitle: `<div style="margin-bottom: 8px;"><strong>${correctWord}</strong> kelimesini başarıyla birleştirdiniz!</div>`,
                score: `+${pointsEarned}`,
                secLabel: "Geçen Süre",
                secVal: `${wordTimer} sn`,
                promo: activeWordObj.tip,
                hasNextLevel: !isLastRound
            });
        }, 600);
    } else {
        const slots = document.querySelectorAll(".word-slot");
        slots.forEach(slot => {
            slot.style.borderColor = "#ef4444";
            slot.style.color = "#ef4444";
            slot.animate([
                { transform: "translateX(0)" },
                { transform: "translateX(-6px)" },
                { transform: "translateX(6px)" },
                { transform: "translateX(-4px)" },
                { transform: "translateX(4px)" },
                { transform: "translateX(0)" }
            ], {
                duration: 400,
                easing: "ease-in-out"
            });
        });

        setTimeout(() => {
            slots.forEach(slot => {
                slot.style.borderColor = "";
                slot.style.color = "";
            });
        }, 1000);
    }
}

