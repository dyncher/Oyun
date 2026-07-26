import '../game.css';

// 1. BİLGİ YARIŞMASI SORULARI VE MARKA İPUÇLARI (İçerik Besleme Havuzu - 6 Soru)
const TRIVIA_QUESTIONS = [
    {
        category: "Chook Temiz - Pratik Bilgiler",
        question: "Mikrofiber temizlik bezlerinin normal bezlerden en büyük farkı nedir?",
        options: [
            "Mikro lifleriyle toz ve bakterileri mıknatıs gibi çekmesi",
            "Daha renkli ve kokulu olması",
            "Daha geç kuruması ve sertleşmesi",
            "Sadece deterjanla çalışabilmesi"
        ],
        answer: 0,
        tip: "Chook Temiz mikrofiber bezleri, insan saç telinin 100'de biri incelikteki lifleriyle tozu, kiri og ve statik elektriği adeta bir mıknatıs gibi çeker ve su lekesi bırakmaz!"
    },
    {
        category: "Chook Temiz - Elde Bulaşık",
        question: "Bulaşıkları yıkarken aşırı köpürme sağlamak için ne yapılmalıdır?",
        options: [
            "Sünger yerine doğrudan beze dökülmeli",
            "Chook Elde Bulaşık Sıvısı süngere sıkılıp ılık suyla hafifçe köpürtülmeli",
            "Soğuk suda yarım saat bekletilmeli",
            "Bol miktarda tuz eklenmeli"
        ],
        answer: 1,
        tip: "Chook Elde Bulaşık Sıvısı, konsantre bitkisel formülü sayesinde tek bir damlasıyla dahi yağları anında sökerek pırıl pırıl, lekesiz bulaşıklar sağlar."
    },
    {
        category: "Chook Temiz - Hassas Yüzeyler",
        question: "Cam ve ayna yüzeylerde lekesiz berraklık sağlamak için en doğru yöntem hangisidir?",
        options: [
            "Gazete kağıdı ve su ile dairesel ovalamak",
            "Chook Cam ve Yüzey Temizleyici ile mikrofiber bezle silmek",
            "Çamaşır suyu ile fırçalamak",
            "Yüzeyi deterjanlı bırakıp kurumaya bırakmak"
        ],
        answer: 1,
        tip: "Chook Cam ve Yüzey Temizleyici, özel iz bırakmayan formülüyle cam, ayna ve tüm parlak yüzeyleri tozdan arındırır ve cam gibi berrak bir parlaklık kazandırır."
    },
    {
        category: "Chook Temiz - Çevre Dostu",
        question: "Chook Temiz ürünlerinin ambalajları ve içerikleriyle ilgili çevre politikası nasıldır?",
        options: [
            "Kimyasal içerikli ve tek kullanımlıktır",
            "Formülleri doğada çözünebilir, ambalajları geri dönüştürülebilir yapıdadır",
            "Ambalajları doğada yok olmaz",
            "Sadece laboratuvarda saklanmalıdır"
        ],
        answer: 1,
        tip: "Chook Temiz, çevre dostu felsefesiyle formüllerinde biyolojik olarak parçalanabilir aktif maddeler kullanır ve doğaya zarar vermeyen ambalajları tercih eder."
    },
    {
        category: "Chook Temiz - Kireç Çözücü",
        question: "Banyo ve mutfak bataryalarında biriken kireç lekelerinden en hızlı nasıl kurtuluruz?",
        options: [
            "Sıcak suyla durulayarak beklemek",
            "Chook Kireç ve Pas Sökücü püskürtüp, hafifçe silip durulayarak",
            "Yüzeyi metal telle ovarak sürtmek",
            "Üzerine pudra dökerek silmek"
        ],
        answer: 1,
        tip: "Chook Kireç ve Pas Sökücü, batarya ve fayanslardaki inatçı kireç ve pas lekelerini yüzeyi çizmeden saniyeler içinde çözer ve durulama sonrası ilk günkü parlaklığına kavuşturur."
    },
    {
        category: "Chook Temiz - Oda Kokusu",
        question: "Evde uzun süreli, ferahlatıcı ve kalıcı bir temizlik kokusu sağlamak için ne yapılmalıdır?",
        options: [
            "Tüm pencereleri kapalı tutmak",
            "Chook Parfümlü Oda ve Kumaş Spreyi'ni havaya ve perdelere püskürterek",
            "Sadece yerleri suyla paspaslamak",
            "Evde çiçek bulundurmak"
        ],
        answer: 1,
        tip: "Chook Oda ve Kumaş Spreyi, kumaş dokularına tutunarak gün boyu esintiyle yayılan limon, lavanta ve okyanus ferahlığını evinize taşır."
    }
];

// 2. HAFIZA KART DETAYLARI (16 Benzersiz Ürün ve Emoji Kartı)
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

// 3. GLOBAL DURUM DEĞİŞKENLERİ
let playerTotalScore = parseInt(localStorage.getItem("chook_score")) || 0;
let activeScreen = "dashboard";

// Seviye Sistemi Durumları
let currentSelectedLevel = 1;
let unlockedLevel = parseInt(localStorage.getItem("chook_unlocked_level")) || 1;
let levelStars = JSON.parse(localStorage.getItem("chook_level_stars")) || {};
let lastMemoryGameSuccess = false;

// Hafıza Oyunu Durumları
let memoryDeck = [];
let flippedCards = [];
let matchedPairsCount = 0;
let memoryMoves = 0;
let memoryTimerInterval = null;
let memoryTimeRemaining = 60;
let isBoardLocked = false;
let memoryComboCount = 0;
let lastMatchTime = 0;

// Bilgi Yarışması Durumları
let selectedTriviaQuestions = [];
let currentQuestionIndex = 0;
let triviaScore = 0;
let isTriviaLocked = false;

// 4. SAYFA GÖRÜNÜM ŞABLONU (ROUTER İÇİN)
export function renderGamePage() {
    return `
    <div class="app-container">
        <!-- Arka Plan Efektleri (Parıldayan Küreler) -->
        <div class="bg-glow bg-glow-1"></div>
        <div class="bg-glow bg-glow-2"></div>

        <!-- HEADER -->
        <header class="app-header">
            <div class="header-logo" id="logo-btn">
                <span class="logo-emoji">✨</span>
                <span class="logo-text">Chook <span class="accent-text">Zeka</span></span>
            </div>
            <div class="header-stats">
                <div class="stat-badge coin-badge">
                    <i class="fas fa-crown gold-crown"></i>
                    <span id="player-score">0</span>
                </div>
                <button id="theme-toggle-btn" class="icon-btn" aria-label="Tema Değiştir">
                    <i class="fas fa-magic"></i>
                </button>
            </div>
        </header>

        <!-- MAIN CONTENT AREA -->
        <main class="main-content">
            
            <!-- 1. DASHBOARD / GİRİŞ EKRANI -->
            <section id="screen-dashboard" class="game-screen active">
                <div class="dashboard-hero animate-fade-in">
                    <h1 class="hero-title">Zihnini Eğit, <br><span class="gradient-text">Eğlenerek Öğren!</span></h1>
                    <p class="hero-subtitle">Sizin için özel olarak tasarlanmış, Chook Temiz dünyasıyla hafıza antrenmanı.</p>
                </div>

                <!-- Mod Seçim Kartları -->
                <div class="modes-grid">
                    <!-- Mod 1: Hafıza Eşleştirme -->
                    <div class="mode-card card-memory" id="start-memory-btn">
                        <div class="mode-card-badge">SEVİMLİ</div>
                        <div class="mode-icon-wrapper">
                            <i class="fas fa-brain"></i>
                        </div>
                        <h2 class="mode-title">Hafıza Eşleştirme</h2>
                        <p class="mode-desc">Ürünlerimizin sevimli çizgi karakterleriyle kartları eşleştir, hafızanı güçlendir!</p>
                        <div class="mode-play-btn">
                            Hemen Başla <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>

                    <!-- Mod 2: Bilgi Yarışması -->
                    <div class="mode-card card-trivia" id="start-trivia-btn">
                        <div class="mode-card-badge text-green">EĞİTİCİ</div>
                        <div class="mode-icon-wrapper">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <h2 class="mode-title">Bilgi Yarışması</h2>
                        <p class="mode-desc">Ev hijyeni, neşeli temizlik ipuçları ve profesyonel çözümler üzerine eğlenceli bilgiler öğren!</p>
                        <div class="mode-play-btn">
                            Soruya Geç <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>

                <!-- Marka Tanıtım Şeridi -->
                <footer class="brands-footer" style="justify-content: center; margin-top:2rem;">
                    <div class="brand-item">
                        <span class="brand-logo purple">Chook Temiz</span>
                        <p class="brand-text">Profesyonel Temizlik Çözümleri</p>
                    </div>
                </footer>
            </section>

            <!-- 1B. SEVİYE SEÇİM EKRANI -->
            <section id="screen-levels" class="game-screen">
                <div class="game-control-bar">
                    <button id="levels-back-btn" class="text-btn">
                        <i class="fas fa-chevron-left"></i> Ana Menü
                    </button>
                    <div class="screen-title-badge">Hafıza Seviyeleri</div>
                    <div style="width: 50px;"></div>
                </div>

                <div class="levels-container animate-fade-in">
                    <h2 class="section-title">Temizlik Basamakları</h2>
                    <p class="section-subtitle">Chook Temiz ile zihnini parlat, seviyeleri birer birer aş!</p>
                    
                    <div class="levels-grid" id="levels-grid-container">
                        <!-- Seviye butonları dinamik yüklenecek -->
                    </div>
                </div>
            </section>

            <!-- 2. HAFIZA KART EŞLEŞTİRME EKRANI -->
            <section id="screen-memory" class="game-screen">
                <div class="game-control-bar">
                    <button id="memory-back-btn" class="text-btn">
                        <i class="fas fa-chevron-left"></i> Seviyeler
                    </button>
                    <div class="screen-title-badge" id="memory-level-badge">Seviye 1/15</div>
                    <div class="game-timer">
                        <i class="far fa-clock"></i> <span id="memory-timer">60</span>s
                    </div>
                </div>

                <!-- Oyun İçi Skor ve Hamle Sınırı -->
                <div class="game-stats-subbar">
                    <div class="stat-item">
                        <span class="stat-label">Hamle:</span>
                        <span class="stat-value" id="memory-moves">0</span><span id="memory-moves-limit-container" class="hidden">/<span id="memory-moves-limit">15</span></span>
                    </div>
                    <div class="stat-item combo-badge hidden" id="memory-combo">
                        <i class="fas fa-fire"></i> <span id="combo-multiplier">2x</span> Kombo!
                    </div>
                </div>

                <!-- Hafıza Kartı Izgarası -->
                <div class="memory-grid-container">
                    <div class="memory-grid" id="memory-board">
                        <!-- Kartlar dinamik yüklenecek -->
                    </div>
                </div>
            </section>

            <!-- 3. BİLGİ YARIŞMASI EKRANI -->
            <section id="screen-trivia" class="game-screen">
                <div class="game-control-bar">
                    <button class="back-to-dashboard-btn text-btn">
                        <i class="fas fa-chevron-left"></i> Geri
                    </button>
                    <div class="trivia-progress">
                        Soru: <span id="current-question-num">1</span>/5
                    </div>
                    <div class="trivia-score">
                        Skor: <span id="trivia-points">0</span>
                    </div>
                </div>

                <!-- İlerleme Çubuğu -->
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" id="trivia-progress-bar"></div>
                </div>

                <!-- Soru Kartı -->
                <div class="trivia-container">
                    <div class="question-card">
                        <div class="trivia-category" id="trivia-category-badge">Chook Temiz</div>
                        <h2 class="question-text" id="trivia-question">...</h2>
                    </div>

                    <!-- Şıklar -->
                    <div class="options-list" id="trivia-options">
                        <!-- Şıklar dinamik yüklenecek -->
                    </div>
                </div>
            </section>
        </main>

        <!-- MODALLAR & BİLGİ KARTLARI -->

        <!-- 1. Marka İpucu / Eğitici Ara Geçiş Modalı -->
        <div class="modal-overlay" id="tip-modal">
            <div class="modal-content glass-modal animate-scale-in">
                <div class="modal-header">
                    <div class="tip-icon-wrapper purple-glow">
                        <i class="fas fa-magic"></i>
                    </div>
                    <h3 class="modal-title">Chook İpucu!</h3>
                </div>
                <div class="modal-body">
                    <div class="tip-image-placeholder" id="tip-brand-badge">Chook Temiz</div>
                    <p class="tip-text" id="tip-content-text">...</p>
                </div>
                <div class="modal-footer">
                    <button id="close-tip-btn" class="primary-btn">Anladım, Devam Et!</button>
                </div>
            </div>
        </div>

        <!-- 2. Tebrikler / Oyun Sonu Modalı -->
        <div class="modal-overlay" id="result-modal">
            <div class="modal-content glass-modal animate-scale-in">
                <div class="confetti-container" id="confetti-effect"></div>
                <div class="result-header">
                    <div class="trophy-wrapper">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <h3 class="modal-title" id="result-title">Tebrikler!</h3>
                    <p class="result-subtitle" id="result-subtitle">Harika bir oyun çıkardın!</p>
                </div>
                <div class="modal-body result-stats-grid">
                    <div class="result-stat-box">
                        <span class="stat-label">Kazanılan Skor</span>
                        <span class="stat-value" id="result-score-val">+150</span>
                    </div>
                    <div class="result-stat-box" id="result-secondary-box">
                        <span class="stat-label" id="result-secondary-label">Hamle Sayısı</span>
                        <span class="stat-value" id="result-secondary-val">12</span>
                    </div>
                </div>
                <!-- Eğitici Bilgi Bloğu -->
                <div class="result-brand-promo" id="result-promo-box">
                    <i class="fas fa-magic" style="color: var(--text-accent);"></i>
                    <p class="promo-text" id="result-promo-text">...</p>
                </div>
                <div class="modal-footer horizontal">
                    <button id="result-retry-btn" class="secondary-btn"><i class="fas fa-redo"></i> Yeniden</button>
                    <button id="result-home-btn" class="primary-btn"><i class="fas fa-home"></i> Ana Menü</button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// 5. OYUN MANTIĞININ BAŞLATILMASI
export function initGameLogic() {
    // Skor, kilit ve yıldız yüklemeleri
    playerTotalScore = parseInt(localStorage.getItem("chook_score")) || 0;
    unlockedLevel = parseInt(localStorage.getItem("chook_unlocked_level")) || 1;
    levelStars = JSON.parse(localStorage.getItem("chook_level_stars")) || {};

    initUI();
    setupEventListeners();
}

// Arayüz Başlangıç Ayarları
function initUI() {
    document.getElementById("player-score").textContent = playerTotalScore;
    
    // Temayı yükle (LocalStorage'dan)
    const savedTheme = localStorage.getItem("chook_theme") || "lavender-theme";
    document.body.className = savedTheme;
    document.body.classList.add("game-page-active");
}

// ETKİNLİK DİNLEYİCİLERİ
function setupEventListeners() {
    // Tema Değiştirme
    document.getElementById("theme-toggle-btn").addEventListener("click", toggleTheme);

    // Dashboard Yönlendirmeleri
    document.getElementById("start-memory-btn").addEventListener("click", () => switchScreen("levels"));
    document.getElementById("start-trivia-btn").addEventListener("click", () => switchScreen("trivia"));

    // Logo Tıklama (Giriş Ekranına Dönüş)
    document.getElementById("logo-btn").addEventListener("click", () => switchScreen("dashboard"));

    // Geri Dönüş Butonları
    document.getElementById("levels-back-btn").addEventListener("click", () => switchScreen("dashboard"));
    document.getElementById("memory-back-btn").addEventListener("click", () => switchScreen("levels"));
    
    document.querySelectorAll(".back-to-dashboard-btn").forEach(btn => {
        btn.addEventListener("click", () => switchScreen("dashboard"));
    });

    // Modal Butonları
    document.getElementById("close-tip-btn").addEventListener("click", closeTipModal);
    
    document.getElementById("result-home-btn").addEventListener("click", () => {
        closeResultModal();
        if (activeScreen === "memory") {
            switchScreen("levels");
        } else {
            switchScreen("dashboard");
        }
    });

    document.getElementById("result-retry-btn").addEventListener("click", () => {
        closeResultModal();
        if (activeScreen === "memory") {
            if (lastMemoryGameSuccess && currentSelectedLevel < 15) {
                startMemoryGame(currentSelectedLevel + 1);
            } else {
                startMemoryGame(currentSelectedLevel);
            }
        } else if (activeScreen === "trivia") {
            startTriviaGame();
        }
    });
}

// TEMA VE EKRAN DEĞİŞTİRME MANTIĞI
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains("lavender-theme")) {
        body.classList.replace("lavender-theme", "pastel-theme");
        localStorage.setItem("chook_theme", "pastel-theme");
    } else {
        body.classList.replace("pastel-theme", "lavender-theme");
        localStorage.setItem("chook_theme", "lavender-theme");
    }
    
    const btn = document.getElementById("theme-toggle-btn");
    btn.style.transform = "scale(0.9) rotate(20deg)";
    setTimeout(() => { btn.style.transform = "scale(1) rotate(0deg)"; }, 150);
}

function switchScreen(screenName, levelNum = null) {
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

    if (screenName === "levels") {
        renderLevelsScreen();
    } else if (screenName === "memory") {
        startMemoryGame(levelNum || currentSelectedLevel);
    } else if (screenName === "trivia") {
        startTriviaGame();
    }
}

// HAFIZA SEVİYE SEÇİM EKRANI VE OYUN MOTORU

function renderLevelsScreen() {
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

            card.addEventListener("click", () => {
                switchScreen("memory", lvl.level);
            });
        }

        gridContainer.appendChild(card);
    });
}

function startMemoryGame(levelNum) {
    currentSelectedLevel = levelNum;
    lastMemoryGameSuccess = false;

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
    document.getElementById("memory-timer").textContent = memoryTimeRemaining;
    document.getElementById("memory-combo").classList.add("hidden");
    document.getElementById("memory-level-badge").textContent = `Seviye ${lvlCfg.level} - ${lvlCfg.title}`;

    const movesLimitContainer = document.getElementById("memory-moves-limit-container");
    const movesDisplay = document.getElementById("memory-moves");
    movesDisplay.classList.remove("warning");

    if (lvlCfg.movesLimit) {
        movesLimitContainer.classList.remove("hidden");
        document.getElementById("memory-moves-limit").textContent = lvlCfg.movesLimit;
    } else {
        movesLimitContainer.classList.add("hidden");
    }

    const numPairs = (lvlCfg.grid.r * lvlCfg.grid.c) / 2;
    const selectedItems = CARD_ITEMS.slice(0, numPairs);
    const doubleItems = [...selectedItems, ...selectedItems];
    memoryDeck = shuffleArray(doubleItems);

    const board = document.getElementById("memory-board");
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${lvlCfg.grid.c}, 1fr)`;

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

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-face", "card-back");
        const logoPlaceholder = document.createElement("div");
        logoPlaceholder.classList.add("card-logo-placeholder");
        logoPlaceholder.innerHTML = "✨";
        cardBack.appendChild(logoPlaceholder);

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

    startMemoryTimer();
}

function handleCardClick(card, lvlCfg) {
    if (isBoardLocked) return;
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        memoryMoves++;
        const movesDisplay = document.getElementById("memory-moves");
        movesDisplay.textContent = memoryMoves;

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
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairsCount++;

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

        if (matchedPairsCount === numPairs) {
            stopMemoryTimer();
            setTimeout(winMemoryGame, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
            isBoardLocked = false;

            memoryComboCount = 0;
            document.getElementById("memory-combo").classList.add("hidden");

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

function winMemoryGame() {
    lastMemoryGameSuccess = true;
    const lvlCfg = MEMORY_LEVELS.find(l => l.level === currentSelectedLevel);

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

    const prevStars = levelStars[currentSelectedLevel] || 0;
    levelStars[currentSelectedLevel] = Math.max(prevStars, starsAwarded);
    localStorage.setItem("chook_level_stars", JSON.stringify(levelStars));

    if (currentSelectedLevel === unlockedLevel && unlockedLevel < 15) {
        unlockedLevel++;
        localStorage.setItem("chook_unlocked_level", unlockedLevel);
    }

    const levelBonus = currentSelectedLevel * 20;
    const timeBonus = memoryTimeRemaining * 5;
    const totalWinPoints = 100 + levelBonus + timeBonus;

    updatePlayerTotalScore(totalWinPoints);

    const randomTip = getRandomBrandTip();

    const retryBtn = document.getElementById("result-retry-btn");
    const homeBtn = document.getElementById("result-home-btn");

    if (currentSelectedLevel < 15) {
        retryBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Sıradaki Seviye';
    } else {
        retryBtn.innerHTML = '<i class="fas fa-redo"></i> Seviye 15\'i Tekrar Et';
    }
    homeBtn.innerHTML = '<i class="fas fa-th"></i> Seviyeler';

    let starsHTML = "";
    for (let i = 0; i < 3; i++) {
        starsHTML += i < starsAwarded 
            ? '<i class="fas fa-star" style="color: #fbbf24; font-size: 1.4rem; margin: 0 4px; filter: drop-shadow(0 0 4px rgba(251,191,36,0.5));"></i>' 
            : '<i class="far fa-star" style="color: rgba(255,255,255,0.2); font-size: 1.4rem; margin: 0 4px;"></i>';
    }

    showTipModal(randomTip, () => {
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

function gameOverMemoryGame() {
    lastMemoryGameSuccess = false;
    const lvlCfg = MEMORY_LEVELS.find(l => l.level === currentSelectedLevel);

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

// BİLGİ YARIŞMASI MOTORU
function startTriviaGame() {
    currentQuestionIndex = 0;
    triviaScore = 0;
    isTriviaLocked = false;

    selectedTriviaQuestions = shuffleArray([...TRIVIA_QUESTIONS]).slice(0, 5);
    renderTriviaQuestion();
}

function renderTriviaQuestion() {
    isTriviaLocked = false;
    const currentQuestion = selectedTriviaQuestions[currentQuestionIndex];

    document.getElementById("current-question-num").textContent = currentQuestionIndex + 1;
    document.getElementById("trivia-points").textContent = triviaScore;

    const progressPercent = ((currentQuestionIndex + 1) / 5) * 100;
    document.getElementById("trivia-progress-bar").style.width = `${progressPercent}%`;

    document.getElementById("trivia-category-badge").textContent = currentQuestion.category;
    document.getElementById("trivia-question").textContent = currentQuestion.question;

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
        clickedBtn.classList.add("correct");
        triviaScore += 50;
        document.getElementById("trivia-points").textContent = triviaScore;
    } else {
        clickedBtn.classList.add("incorrect");
        buttons[correctIndex].classList.add("correct");
    }

    setTimeout(() => {
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

    showResultModal({
        title: "Yarışma Bitti!",
        subtitle: "Tebrikler! Soruları yanıtlayarak harika bilgiler öğrendin.",
        score: `+${triviaScore}`,
        secLabel: "Doğru Sayısı",
        secVal: `${triviaScore / 50}/5`,
        promo: "Chook Temiz olarak evlerinize hijyen, pratiklik ve neşe katmaya devam ediyoruz. Bizi takipte kalın!"
    });
}

// MODAL YÖNETİMİ
function showTipModal(contentObj, onCloseCallback) {
    const tipModal = document.getElementById("tip-modal");
    
    document.getElementById("tip-brand-badge").textContent = contentObj.category.split(" - ")[0];
    document.getElementById("tip-content-text").textContent = contentObj.tip;

    const badge = document.getElementById("tip-brand-badge");
    badge.style.background = "var(--grad-chook)";

    tipModal.classList.add("active");

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

    if (config.score !== "+0") {
        triggerConfetti();
    }
}

function closeResultModal() {
    document.getElementById("result-modal").classList.remove("active");
    const confettiContainer = document.getElementById("confetti-effect");
    confettiContainer.innerHTML = "";
}

function updatePlayerTotalScore(pointsToAdd) {
    playerTotalScore += pointsToAdd;
    localStorage.setItem("chook_score", playerTotalScore);

    const scoreEl = document.getElementById("player-score");
    if (!scoreEl) return;
    
    let start = playerTotalScore - pointsToAdd;
    const duration = 800;
    const stepTime = Math.max(Math.floor(duration / pointsToAdd), 15);
    
    const timer = setInterval(() => {
        start += Math.ceil(pointsToAdd / 20);
        if (start >= playerTotalScore) {
            start = playerTotalScore;
            clearInterval(timer);
        }
        scoreEl.textContent = start;
    }, stepTime);

    const crown = document.querySelector(".gold-crown");
    if (crown) {
        crown.style.transform = "scale(1.4) rotate(-15deg)";
        setTimeout(() => { crown.style.transform = "scale(1) rotate(0deg)"; }, 300);
    }
}

// YARDIMCI ALGORİTMALAR
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomBrandTip() {
    const randomIndex = Math.floor(Math.random() * TRIVIA_QUESTIONS.length);
    return TRIVIA_QUESTIONS[randomIndex];
}

function triggerConfetti() {
    const container = document.getElementById("confetti-effect");
    if (!container) return;
    container.innerHTML = "";

    const colors = ["#10b981", "#fbbf24", "#3b82f6", "#ef4444", "#8b5cf6"];
    const confettiCount = 60;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = `${Math.random() * 8 + 5}px`;
        confetti.style.height = `${Math.random() * 8 + 5}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
        
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * -20}%`;
        
        container.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const drift = (Math.random() - 0.5) * 100;
        
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
