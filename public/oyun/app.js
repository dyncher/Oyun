/* ==========================================================================
   CHOOK ZEKA DÜNYASI - OYUN VE ETKİLEŞİM MOTORU (app.js)
   Açıklama: Hafıza kartı oyunu algoritması, bilgi yarışması mantığı, skor 
   sistemi, tema değiştirici ve marka yönlendirmeli ara geçişleri yönetir.
   ========================================================================== */

// Çok Dilli Dil Altyapısı ve Dinamik Değişkenler
let currentLanguage = localStorage.getItem("chook_lang") || "tr";
let TRIVIA_QUESTIONS = [];
let MEMORY_LEVELS = [];
let WORD_POOL = [];
let TRIVIA_LEVELS = [];

const I18N_DATA = {
    tr: {
        trivia_levels: [
            { level: 1, title: "Temizlik Başlangıcı & Pratik Hijyen", desc: "Ev ekonomisinin ve temel hijyenin en neşeli temellerini öğrenin!", difficulty: "Kolay", diffClass: "diff-easy", points: 50, startIndex: 0, endIndex: 5 },
            { level: 2, title: "Cilt Sağlığı & Kişisel Hijyen", desc: "Cildinizi korurken bütçenizi nasıl koruyacağınızı keşfedin!", difficulty: "Orta", diffClass: "diff-medium", points: 60, startIndex: 5, endIndex: 10 },
            { level: 3, title: "Akıllı Ev Ekonomisi & Ekoloji", desc: "Doğayı koruyarak ev bütçesinde binlerce liralık tasarruf etmenin sırları!", difficulty: "Orta-Zor", diffClass: "diff-medium-hard", points: 70, startIndex: 10, endIndex: 15 },
            { level: 4, title: "Kaliteli Ürün & Akıllı Tüketici", desc: "Kaliteli temizlik ürünlerinin neticede neden çok daha ucuza mal olduğunu görün!", difficulty: "Zor", diffClass: "diff-hard", points: 80, startIndex: 15, endIndex: 20 },
            { level: 5, title: "Chook Zeka Dünyası Şampiyonu", desc: "Mutfak hijyeninden akıllı finans yönetimine kadar en zor soruları çözün!", difficulty: "Uzman", diffClass: "diff-expert", points: 100, startIndex: 20, endIndex: 25 }
        ],
        trivia_questions: [
            // --- LEVEL 1: Kolay (Pratik Ev Hijyeni & Başlangıç) ---
            {
                category: "Pratik Hijyen (Kolay)",
                question: "Ev temizliğine başlarken hangi sırayla temizlik yapmak en tasarruflu ve doğrudur?",
                options: [
                    "Önce yerleri süpürüp silmek, ardından mobilyaların tozunu almak",
                    "Önce yukarıdaki yüzeylerin ve mobilyaların tozunu almak, en son yerleri süpürmek",
                    "Önce banyoyu temizlemek, ardından mutfak tezgahına geçmek",
                    "Sıranın hiçbir önemi yoktur, rastgele yapılmalıdır"
                ],
                answer: 1,
                tip: "Yerçekimi nedeniyle tozlar yukarıdan aşağıya süzülür. Önce toz alıp sonra süpürmek, yerleri ikinci kez temizleme zahmetinden ve enerjiden kurtarır!"
            },
            {
                category: "Ev Ekonomisi (Kolay)",
                question: "Evde elektrik tasarrufu sağlamak için çamaşır makinesini çalıştırırken en bütçe dostu yaklaşım hangisidir?",
                options: [
                    "Her üç-beş parça kirli biriktiğinde makineyi hemen çalıştırmak",
                    "Makineyi aşırı doldurmadan tam kapasiteye getirmek ve düşük sıcaklıkta (30°C) yıkamak",
                    "Çamaşırları her zaman en yüksek derecede (90°C) yıkamak",
                    "Çamaşırları deterjansız sadece sıcak suyla yıkamak"
                ],
                answer: 1,
                tip: "Makinelerin harcadığı enerjinin %90'ı suyu ısıtmak içindir. Chook Temiz gibi gelişmiş formüller 30°C'de bile kusursuz temizlik sunarak faturanızı düşürür!"
            },
            {
                category: "Cilt Sağlığı (Kolay)",
                question: "Bulaşık yıkarken ellerimizi yıpranmadan ve kimyasallardan korumanın en pratik yolu nedir?",
                options: [
                    "Ellere bolca yoğun nemlendirici krem sürüp yıkamak",
                    "Temizlik eldiveni kullanmak ve pH değeri ciltle uyumlu, bitkisel bazlı bulaşık sıvıları seçmek",
                    "Elleri çamaşır suyuyla dezenfekte etmek",
                    "Bulaşıkları çok sıcak suyla deterjansız ovalamak"
                ],
                answer: 1,
                tip: "Cilt bariyerini korumak, ileride oluşacak egzama gibi dermatolojik tedavi masraflarını önler. Chook bulaşık sıvıları bitkisel gliserin ile ellerinizi şefkatle korur."
            },
            {
                category: "Ev Ekonomisi (Kolay)",
                question: "Buzdolabının kapağını uzun süre açık bırakmak veya içine sıcak yemek koymak bütçemizi nasıl etkiler?",
                options: [
                    "Hiçbir etkisi olmaz, modern buzdolapları etkilenmez",
                    "Buzdolabının havasını tazeler, koku oluşumunu engeller",
                    "Kompresörün aşırı çalışmasına ve elektrik faturasının ciddi oranda yükselmesine sebep olur",
                    "Yemeklerin daha sağlıklı soğumasını sağlar"
                ],
                answer: 2,
                tip: "Buzdolabına sıcak yemek koymak iç ısıyı yükselterek cihazı motor arızası sınırına getirebilir. Yemekleri oda sıcaklığına getirip koymak elektrik tasarrufu sağlar!"
            },
            {
                category: "Pratik Hijyen (Kolay)",
                question: "Sevimli kedi maskotumuz CHOX'un da bildiği gibi; kediler dünyadaki en temiz hayvanlardan biridir. Sağlıklı bir kedi, gününün yaklaşık ne kadarını kendisini, yavrularını veya eşini temizlemeye ve tımar etmeye harcar?",
                options: [
                    "Gününün yaklaşık %10-15'ini",
                    "Gününün yaklaşık %30-50'sini (yani uyanık kaldığı sürenin neredeyse yarısını)",
                    "Gününün sadece %5'ini",
                    "Kediler kendilerini hiç temizlemez, sadece uyurlar"
                ],
                answer: 1,
                tip: "Kediler uyanık kaldıkları sürenin yarısını kendilerini ve sevdiklerini titizlikle temizleyerek geçirirler. Temizlik tutkunu maskotumuz CHOX da pırıl pırıl evlere ve oyunlara bayılır!"
            },
            // --- LEVEL 2: Orta (Cilt Sağlığı & Hijyen) ---
            {
                category: "Cilt Sağlığı (Orta)",
                question: "Yüzümüzü sıradan el ve banyo sabunlarıyla yıkamak cilt sağlığımızı nasıl etkiler?",
                options: [
                    "Cildi kurutur, asidik pH dengesini bozarak erken kırışıklık ve akneye yol açar",
                    "Cildi derinlemesine nemlendirir ve pürüzsüzleştirir",
                    "Hiçbir etkisi yoktur, sabun sabundur",
                    "Yüzdeki tüm güneş lekelerini anında yok eder"
                ],
                answer: 0,
                tip: "El sabunlarının pH değeri yüksek ve alkalidir (pH 9-10). Yüzümüzün doğal koruyucu asit tabakası ise pH 5.5'tir. Yüz için her zaman ph uyumlu nazik temizleyiciler kullanılmalıdır."
            },
            {
                category: "Ev Hijyeni (Orta)",
                question: "Mutfakta kullanılan nemli süngerler kaç günde bir temizlenmeli veya değiştirilmelidir?",
                options: [
                    "Yılda bir kez değiştirilmesi yeterlidir",
                    "Sünger parçalanıp dağılana kadar aylarca kullanılmalıdır",
                    "Bakteri yuvası olmamaları için en fazla 1-2 haftada bir yenilenmeli veya dezenfekte edilmelidir",
                    "Süngerler gözenekli olduğu için bakteri barındıramaz"
                ],
                answer: 2,
                tip: "Mutfak süngerleri evdeki en kirli nesnelerden biridir. Süngeri her kullanımdan sonra iyice sıkıp kuru bırakmak ve sık sık yenilemek aile sağlığınızı korur!"
            },
            {
                category: "Ev Hijyeni (Orta)",
                question: "Çamaşır suyu gibi klorlu temizlik kimyasallarını diğer temizleyicilerle (tuz ruhu vb.) karıştırmak ne gibi bir risk taşır?",
                options: [
                    "Temizlik gücünü on kat artırarak üstün parlaklık sağlar",
                    "Çok yüksek bir sıcaklık oluşturur ancak tamamen zararsızdır",
                    "Aşırı derecede zehirli olan klor gazı açığa çıkararak ölümcül zehirlenmelere yol açabilir",
                    "Deterjanların gücünü azaltır"
                ],
                answer: 2,
                tip: "Çamaşır suyunu tuz ruhu, kireç çözücü veya sirke ile ASLA karıştırmayın! Oluşan klor gazı solunum yollarına kalıcı zarar verebilir. Temizlikte her zaman Chook güvenliğini seçin."
            },
            {
                category: "Cilt Sağlığı (Orta)",
                question: "Ucuz ve kalitesiz deterjanların içindeki petrol türevi sert kimyasalların ciltte yol açtığı en yaygın dermatolojik sorun hangisidir?",
                options: [
                    "Cildin canlanması ve hücre yenilenmesi",
                    "Alerjik temas egzaması, aşırı kuruluk, pullanma ve cilt bariyerinin bozulması",
                    "Cilt elastikiyetinin artması",
                    "Kalıcı güneş bronzluğu"
                ],
                answer: 1,
                tip: "Kimyasal kalıntılar cilt bariyerini incelterek dış etkenlere açık hale getirir. Chook Temiz, dermatolojik olarak test edilmiş, elleri kurutmayan bitkisel vegan formüllere sahiptir."
            },
            {
                category: "Pratik Hijyen (Orta)",
                question: "Mutfak tezgahlarındaki birikmiş yoğun ve katılaşmış yağ lekelerini en kolay ve çevre dostu şekilde nasıl temizleriz?",
                options: [
                    "Tel fırçayla kazıyarak ve üzerine saf çamaşır suyu dökerek",
                    "Doğal limon veya portakal yağları içeren, bitkisel bazlı bir yağ çözücü sıkıp mikrofiber bezle silerek",
                    "Pürmüzle yağı eritip bezle sıvayarak",
                    "Sirke döküp saatlerce kurumasını bekleyerek"
                ],
                answer: 1,
                tip: "Doğal sitrik özler yağ moleküllerini hızla parçalar. Chook Limonlu Yağ Çözücü, ağır kimyasal dumanı oluşturmadan bitkisel gücüyle yağları anında çözer!"
            },
            // --- LEVEL 3: Orta-Zor (Akıllı Ev Ekonomisi & Ekoloji) ---
            {
                category: "Akıllı Tasarruf (Orta-Zor)",
                question: "Ev temizliğinde çamaşır ve bulaşık deterjanlarında en yüksek uzun vadeli tasarrufu hangisi sağlar?",
                options: [
                    "Haftalık küçük ve tek kullanımlık paketler halinde satın almak",
                    "Çamaşırlar daha temiz olsun diye önerilen dozun iki katını kullanmak",
                    "Konsantre formüllü ürünleri yedek paket (refill) olarak alıp, ölçekli kapakla tam dozajında kullanmak",
                    "Ölçeksiz, en ucuz deterjanları bolca dökerek kullanmak"
                ],
                answer: 2,
                tip: "Chook yedek paket (refill) kültürü sayesinde şişenizi atmadan tekrar doldurup plastik atık yükünü azaltırken, paketleme maliyetinden %40'a varan tasarruf edersiniz!"
            },
            {
                category: "Akıllı Tasarruf (Orta-Zor)",
                question: "Çamaşırları 60°C yerine 30°C'de yıkamak elektrik faturasında ortalama ne kadar tasarruf sağlar?",
                options: [
                    "Hiç tasarruf sağlamaz, tüketim aynıdır",
                    "Yaklaşık %10 tasarruf sağlar",
                    "Elektrik tüketiminde yaklaşık %60'a varan ciddi bir tasarruf sağlar",
                    "Yalnızca %2 tasarruf sağlar"
                ],
                answer: 2,
                tip: "Düşük sıcaklıkta yıkama yapmak evdeki en büyük enerji tasarrufu adımlarından biridir! Chook Temiz'in özel enzimleri 30°C'de bile mükemmel hijyen sunar."
            },
            {
                category: "Ekoloji (Orta-Zor)",
                question: "Bir temizlik ürününde bulunan 'Vegan ve Cruelty-Free' logosu tam olarak neyi garanti eder?",
                options: [
                    "Ürünün tamamen kimyasalsız ot özlerinden yapıldığını",
                    "Formülde hiçbir hayvansal hammadde kullanılmadığını ve ürünün hayvanlar üzerinde test edilmediğini",
                    "Ürünün yenilebilir ve tamamen gıda ambalajı olduğunu",
                    "Sadece vegan kıyafetleri yıkamakta kullanılabileceğini"
                ],
                answer: 1,
                tip: "Chook Temiz, %100 Vegan ve Cruelty-free sertifikalıdır. Sevimli dostlarımızın hayatlarına saygı duyuyor, doğayı kirletmeden temizlik yapıyoruz!"
            },
            {
                category: "Akıllı Tasarruf (Orta-Zor)",
                question: "Çamaşır ve bulaşık makinelerinin düzenli olarak kireç temizliğinin ve bakımının yapılması faturayı nasıl etkiler?",
                options: [
                    "Boş çalıştığı için elektrik ve su faturasını artırır",
                    "Rezistansın kireç bağlamasını önleyerek ısı kaybını engeller, elektrik tüketimini düşürür ve makinenin ömrünü uzatır",
                    "Sadece makinenin kokusunu değiştirir, tüketime etkisi yoktur",
                    "Makinelerin daha yavaş çalışmasını sağlar"
                ],
                answer: 1,
                tip: "Kireç kaplı bir rezistans, suyu ısıtmak için %30 daha fazla elektrik harcar. Aylık Chook Bakım adımları rezistansı korur ve paranızı cebinizde tutar!"
            },
            {
                category: "Ekoloji (Orta-Zor)",
                question: "Lavaboya dökülen doğada parçalanmayan sentetik temizleyicilerin denizlere ve çevreye verdiği en büyük zarar nedir?",
                options: [
                    "Su borularının genleşmesine neden olmak",
                    "Deniz canlılarında birikerek ölümlerine sebep olmak ve balıklar aracılığıyla soframıza geri dönüp bizi zehirlemek",
                    "Suyun buharlaşmasını hızlandırmak",
                    "Yeraltı sularını köpüklü gazoz haline getirmek"
                ],
                answer: 1,
                tip: "Chook formülleri doğada %99 oranında kolayca çözünür, biyolojik olarak parçalanabilir. Denizleri ve geleceğimizi korumak Chook ile çok pratik!"
            },
            // --- LEVEL 4: Zor (Kaliteli Ürün Ekonomisi & Karşılaştırmalı Tasarruf) ---
            {
                category: "Kaliteli Ürün Ekonomisi (Zor)",
                question: "Yoğun konsantre temizlik ürünleri satın almak, ucuz ve sulandırılmış ürünlere kıyasla neden neticede daha ucuza mal olur?",
                options: [
                    "Sulandırılmış ürünler şişede uçup gittiği için",
                    "Konsantre ürünler az miktarda kullanımda bile tam güç sağlar, bir şişesi ucuz ürünlerden aylar daha uzun süre dayanır",
                    "Konsantre ürünler altın kaplama olduğu için değeri artar",
                    "Ucuz ürünler her zaman sahtedir"
                ],
                answer: 1,
                tip: "Ucuz deterjanların %80'i sudan ibarettir, hızla biter. Chook konsantre ürünleri ise yoğun etken maddeye sahiptir; damlası bile pırıl pırıl temizler!"
            },
            {
                category: "Kaliteli Ürün Ekonomisi (Zor)",
                question: "Doğru ve lif koruyucu kaliteli deterjanlar kullanmanın giysilerimiz ve gardırop bütçemiz üzerindeki etkisi nedir?",
                options: [
                    "Hiçbir etkisi yoktur, giysiler her deterjanla aynı hızda eskir",
                    "Kumaş liflerini yıpratmaz, renkleri solmaktan korur, böylece her ay yeni giysi alma masrafını sıfırlayarak binlerce lira tasarruf ettirir",
                    "Giysileri küçülterek gardıropta yer açar",
                    "Kıyafetlerin hepsini ipek kumaşa dönüştürür"
                ],
                answer: 1,
                tip: "Sert kimyasallar çamaşır liflerini kırarak tüylenmeye ve solmaya neden olur. Chook Hassas ve Renkli deterjanı giysileri ilk günkü yumuşaklığında tutar."
            },
            {
                category: "Kaliteli Ürün Ekonomisi (Zor)",
                question: "Çok amaçlı ve kaliteli bir sıvı Arap Sabunu kullanmanın ev bütçesine sağladığı doğrudan finansal getiri hangisidir?",
                options: [
                    "Parke, cam, halı ve koltuk için ayrı ayrı pahalı temizleyiciler satın alma zorunluluğunu ortadan kaldırarak bütçeyi korur",
                    "Elektrikli süpürgenin gücünü iki katına çıkarır",
                    "Ahşap mobilyaları doğrudan laminat kaplamaya dönüştürür",
                    "Evin kokusunu çikolata kokusuna çevirir"
                ],
                answer: 0,
                tip: "Geleneksel ve doğal Chook Sıvı Arap Sabunu tüm ev yüzeylerinde güvenle kullanılır. Tek ürünle camdan koltuğa kadar her yeri parlatıp tasarruf edin!"
            },
            {
                category: "Kaliteli Ürün Ekonomisi (Zor)",
                question: "Bulaşık makinesinde kaliteli parlatıcı ve özel tuz kullanılması uzun vadede hangi maliyetleri engeller?",
                options: [
                    "Makinenin sesli çalışmasını önler",
                    "Kireç lekelerini ve camların çizilip matlaşmasını önleyerek bardak ve tabakların eskiyip yenilenme masrafını ve rezistans arızalarını önler",
                    "Gereksiz bir lükstür, bütçeye yük getirir",
                    "Tabakları kendiliğinden beyaza boyar"
                ],
                answer: 1,
                tip: "Çizilmiş mat camlar ve tabaklar ev bütçesinde sessiz bir kayıptır. Chook Bulaşık Parlatıcısı camları pürüzsüz tutarak eşyalarınızın ömrünü korur."
            },
            {
                category: "Kaliteli Ürün Ekonomisi (Zor)",
                question: "Ucuz ve kalitesiz yüzey temizleyicilerin zeminlerde bıraktığı yapışkan tabaka faturamızı nasıl gizlice artırır?",
                options: [
                    "Yapışkan yüzey daha fazla toz tutar, daha sık temizlik yapmanıza, daha fazla su ve deterjan harcamanıza yol açar",
                    "Hiçbir etkisi yoktur, ucuz deterjan her zaman kazandırır",
                    "Zeminleri daha geniş gösterir",
                    "İnsanların evde daha hızlı uyumasını sağlar"
                ],
                answer: 0,
                tip: "Durulama gerektiren yapışkan kalıntılar adeta toz mıknatısıdır. Chook Yüzey Temizleyici durulama gerektirmez, iz bırakmaz, uzun süre temizlik sunar."
            },
            // --- LEVEL 5: Uzman (Chook Zeka Dünyası Şampiyonu) ---
            {
                category: "Sürdürülebilir Hijyen (Uzman)",
                question: "Mutfakta çiğ et kesilen ahşap tahtaların hijyeni ve çapraz bulaşmayı önlemek için en doğru yaklaşım nedir?",
                options: [
                    "Sadece ıslak süngerle üstten silmek",
                    "Sıcak su, tuz ve limonla ovalamak veya gıda temasına uygun bitkisel dezenfektanlarla arındırmak",
                    "Çamaşır yumuşatıcısına yatırıp bekletmek",
                    "Güneşin altında 5 dakika bekletmek"
                ],
                answer: 1,
                tip: "Çiğ et ciddi salmonella bakterileri barındırır. Tahtayı doğal asit (limon/tuz) veya Chook dezenfektanları ile temizlemek sağlığınızı tam korur."
            },
            {
                category: "Sürdürülebilir Hijyen (Uzman)",
                question: "Bulaşıkları elde yıkarken veya diş fırçalarken musluğu açık bırakmak dakikada yaklaşık ne kadar temiz suyu boşa harcar?",
                options: [
                    "En fazla 1 litre",
                    "Yaklaşık 2 litre",
                    "Yaklaşık 6 ila 12 litre arası temiz içme suyunu boşa akıtır",
                    "Tam 50 litre"
                ],
                answer: 2,
                tip: "Musluğu açık bırakmak yılda tonlarca su israfı demektir. Bulaşıkları Chook bulaşık sıvısı köpüğüyle ovalarken musluğu kapatmak aile bütçesine büyük katkıdır."
            },
            {
                category: "Sürdürülebilir Hijyen (Uzman)",
                question: "Chook yedek paket (refill) konseptinin ekoloji ve bütçeye en büyük birleşik yararı nedir?",
                options: [
                    "Çantada daha kolay taşınabilir olması",
                    "Plastik atık miktarını %75 azaltması ve pompasız paket olduğu için %40 daha ucuza gelerek bütçeyi ve doğayı koruması",
                    "Renklerinin daha canlı olması",
                    "İçinde sıvı şekerleme bulunması"
                ],
                answer: 1,
                tip: "Chook olarak yedek paket (refill) kültürünü destekliyoruz! Şişenizi atmayıp tekrar doldurarak hem doğadaki plastik yükünü azaltır hem de aile bütçenize büyük katkı sağlarsınız."
            },
            {
                category: "Sürdürülebilir Hijyen (Uzman)",
                question: "Doğru ve kaliteli temizlik ürünleri kullanmanın neticeleri itibariyle sağlığımız, evimiz ve bütçemiz üzerindeki en büyük birleşik getirisi nedir?",
                options: [
                    "Sadece temiz kokan bir eve sahip olmak",
                    "Sağlık harcamalarının azalması, eşyaların (kıyafet, tabak, mobilya) ömrünün uzaması, su ve elektrik tasarrufu sayesinde uzun vadede en kazançlı bütçeyi oluşturması",
                    "Evimizin değerini doğrudan iki katına çıkarması",
                    "Bizi tüm temizlik işlerinden tamamen kurtarması"
                ],
                answer: 1,
                tip: "Chook Temiz ile bilinçli temizlik yapmak; sağlığınızı korur, eşyalarınızın yıpranmasını önler, su/enerji faturalarınızı düşürür ve geleceğe tertemiz bir dünya bırakır!"
            },
            {
                category: "Chook Felsefesi (Uzman)",
                question: "Aşağıdeki değerlerden hangisi Chook Temiz markasının felsefesinin en temel odağını oluşturur?",
                options: [
                    "Kısa vadeli parlaklık için ağır ve kimyasal kokulu ürünler üretmek",
                    "Doğadan ilham alan, canlılara saygılı, vegan, cilde dost ve bütçe tasarrufu sunan neşeli temizlik çözümleri sağlamak",
                    "Sadece pahalı elektronik aletler satmak",
                    "Temizliği olabildiğince sıkıcı ve yorucu hale getirmek"
                ],
                answer: 1,
                tip: "Chook Temiz, temizliği zahmet olmaktan çıkarıp neşeli bir zihin antrenmanına dönüştürür! Evinize ferahlık, kalbinize doğa sevgisi aşılar."
            }
        ],
        memory_levels: [
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
        ],
        word_pool: [
            { word: "CHOX", hint: "Chook Temiz'in temizlik delisi, uyanık vaktinin yarısını tımarla geçiren sevimli kedi maskotu.", tip: "Kediler uyanık zamanlarının neredeyse %50'sini kendilerini, yavrularını ve eşlerini temizlemeye harcar. CHOX da tam bir temizlik uzmanıdır!" },
            { word: "TEMİZ", hint: "Evlerimizin hijyenik, lekesiz, ferah ve pırıl pırıl olma durumu.", tip: "Temiz bir ev, sakin bir zihnin en önemli destekçisidir." },
            { word: "SABUN", hint: "Geleneksel temizlikte sıvı Arap formuyla çok sevilen doğal köpüklü temizleyici.", tip: "Chook Sıvı Arap Sabunu, tüm yüzeylerde iz bırakmadan geleneksel temizlik ve parlaklık sunar." },
            { word: "KÖPÜK", hint: "Deterjanın suyla birleştiğinde oluşturduğu, temizliği hissettiren hafif beyaz baloncuklar.", tip: "Bol köpük neşeli temizlik demektir! Chook deterjanları az bir miktar ile bol köpürür." },
            { word: "HİJYEN", hint: "Bakteri ve mikroplardan arınmış, sağlığımızı koruyan kusursuz temizlik standardı.", tip: "Mutfak ve banyo gibi temasın yüksek olduğu alanlarda Chook hijyen çözümleri üstün koruma sağlar." },
            { word: "DOĞAL", hint: "Formüllerimizde sentetik kimyasallar yerine bitkisel ve saf özler tercih etmemiz.", tip: "Chook Temiz ürünleri, doğadan ilham alan doğal içerikleriyle evcil hayvanlarınız için güvenlidir." },
            { word: "ÇAMAŞIR", hint: "Mis kokulu yumuşatıcılar ve renk koruyucu deterjanlarla yıkadığımız giysilerimiz.", tip: "Çamaşırları yıkarken Chook deterjanları renklerin ilk günkü gibi canlı kalmasını sağlar." },
            { word: "PARLAK", hint: "Camların, aynaların ve zeminlerin tozsuz, lekesiz ve pürüzsüzce ışığı yansıtması.", tip: "Mikrofiber bez ile dairesel hareketlerle toz almak yüzeylerin uzun süre parlak kalmasını sağlar." },
            { word: "LAVANTA", hint: "Chook temizleyicilerinde bulunan, mor çiçekli bitkiden elde edilen dinlendirici koku özü.", tip: "Lavanta kokusu, temizlik sonrası evinizde stresi azaltan, huzurlu bir atmosfer yaratır." },
            { word: "TÜLLER", hint: "Pencerelerimizi süsleyen, dışarıdan gelen toz ve polenleri sünger gibi çeken örtüler.", tip: "Tülleri yıkarken Chook çamaşır deterjanı kullanmak, bembeyaz ve lekesiz görünüm sağlar!" },
            { word: "TASARRUF", hint: "Ev bütçesini korumak için suyu, elektriği ve deterjanı bilinçli kullanma eylemi.", tip: "Küçük tasarruflar birleşerek büyük ev bütçesi kazançlarına ve yeşil bir dünyaya dönüşür!" },
            { word: "BÜTÇE", hint: "Gelir ve giderlerimizi planlayarak ev ekonomisini dengede tutma sanatı.", tip: "Bütçe planlaması yapmak, gereksiz tüketimi önleyerek birikim yapmanızı kolaylaştırır." },
            { word: "LİMON", hint: "Chook yağ çözücülerinde bulunan, asidik gücüyle yağları söküp atan ferah meyve özü.", tip: "Limon kokusu zihni açar ve mutfaktaki ağır kokuları tamamen maskelemeden nötralize eder." },
            { word: "KİR", hint: "Yüzeylerde biriken, hijyeni bozan ve temizlenmesi gereken istenmeyen tabaka.", tip: "Biriken kirler mikrop kaynağıdır. Chook ile haftalık temizlik düzeni kirlerin birikmesini önler." },
            { word: "VEGAN", hint: "Ürünlerimizin formülünde hiçbir hayvansal hammadde ve hayvanda test kullanılmaması.", tip: "Chook ürünleri hayvan dostudur, doğanın dengesini bozmayan ekolojik içeriklerle doludur." },
            { word: "MİKROFİBER", hint: "Saç telinden 100 kat ince lifleriyle tozu deterjansız bile mükemmel çeken bez türü.", tip: "Mikrofiber bezlerin ömrünü uzatmak için onları yumuşatıcı kullanmadan yıkamalısınız!" },
            { word: "DURULAMA", hint: "Deterjan kalıntılarını gidermek için yüzeyleri veya çamaşırları temiz suyla arındırma.", tip: "Chook'un kolay durulanan formülü sayesinde su faturanızda %30'a yakın su tasarrufu sağlarsınız." },
            { word: "KİREÇ", hint: "Sert musluk sularının ısıtıcılarda ve yüzeylerde bıraktığı beyaz tortu.", tip: "Kireç tortularını temizlemek ısıtıcıların ömrünü uzatır ve enerji kaybını sıfıra indirir." },
            { word: "BAKIM", hint: "Makinelerimizin ömrünü uzatmak ve faturayı düşürmek için yapılan temizlik adımları.", tip: "Makine bakımı elektrik faturanızda ve teknik servis masraflarında büyük tasarruf sağlar." },
            { word: "SAĞLIK", hint: "Hijyenik ve temiz bir evde yaşayarak koruduğumuz en değerli varlığımız.", tip: "Beden sağlığı temiz bir çevre ve temiz bir solunum havası ile doğrudan ilişkilidir." },
            { word: "KONSANTRE", hint: "Az miktarda kullanımla çok yüksek temizlik sağlayan yoğun formüllü ürün.", tip: "Konsantre ürün kullanarak ambalaj atıklarını azaltır ve cebinizi korursunuz." },
            { word: "AMBALAJ", hint: "Chook yedek paketleriyle doğayı korumak için miktarını azalttığımız koruyucu kap.", tip: "Plastik ambalaj kullanımını azaltarak gelecek nesillere daha mavi denizler bırakıyoruz." },
            { word: "SÜNGER", hint: "Bulaşıkları yıkarken suyu ve deterjanı emen, sık sık yenilenmesi gereken gözenekli araç.", tip: "Süngerler nemli kaldıkça mikrop ürer. Süngerinizi her bulaşıktan sonra sıkarak kurutun." },
            { word: "FİLİZ", hint: "Doğanın uyanışını, yeşermeyi ve çevre dostu felsefemizi temsil eden taze sürgün.", tip: "Gelecek nesillere daha yeşil bir dünya bırakmak için Chook çevreye duyarlı felsefeyle üretilir." },
            { word: "EGZAMA", hint: "Sert kimyasalların ciltte yol açtığı kuruluk, kaşıntı ve deri hastalığı.", tip: "Gliserinli Chook bulaşık sıvısı ellerinizi korur, pH uyumuyla kuruluk ve egzamaya yol açmaz." }
        ]
    },
    en: {
        trivia_levels: [
            { level: 1, title: "Cleaning Start & Practical Hygiene", desc: "Learn the most joyful foundations of home economics and basic hygiene!", difficulty: "Easy", diffClass: "diff-easy", points: 50, startIndex: 0, endIndex: 5 },
            { level: 2, title: "Skin Health & Personal Hygiene", desc: "Discover how to protect your budget while protecting your skin!", difficulty: "Medium", diffClass: "diff-medium", points: 60, startIndex: 5, endIndex: 10 },
            { level: 3, title: "Smart Home Economy & Ecology", desc: "Unravel the secrets of saving thousands on the home budget while saving nature!", difficulty: "Medium-Hard", diffClass: "diff-medium-hard", points: 70, startIndex: 10, endIndex: 15 },
            { level: 4, title: "Quality Products & Smart Consumer", desc: "See why high-quality cleaning products ultimately cost much less!", difficulty: "Hard", diffClass: "diff-hard", points: 80, startIndex: 15, endIndex: 20 },
            { level: 5, title: "Chook Brain World Champion", desc: "Solve the toughest questions from kitchen hygiene to smart financial management!", difficulty: "Expert", diffClass: "diff-expert", points: 100, startIndex: 20, endIndex: 25 }
        ],
        trivia_questions: [
            // --- LEVEL 1: Easy (Practical Home Hygiene) ---
            {
                category: "Practical Hygiene (Easy)",
                question: "When starting home cleaning, which sequence is most budget-friendly and correct?",
                options: [
                    "Sweep and mop floors first, then dust furniture",
                    "Dust upper surfaces and furniture first, sweep floors last",
                    "Clean bathroom first, then kitchen counter",
                    "Sequence has no importance, do it randomly"
                ],
                answer: 1,
                tip: "Due to gravity, dust drifts from top to bottom. Dusting first and sweeping last saves you from extra work and energy!"
            },
            {
                category: "Home Economy (Easy)",
                question: "To save electricity when running the washing machine, which approach is most pocket-friendly?",
                options: [
                    "Run the machine immediately when a few dirty clothes pile up",
                    "Load to full capacity without overloading and wash at low temp (30°C)",
                    "Always wash clothes at the highest temperature (90°C)",
                    "Wash clothes with hot water only and no detergent"
                ],
                answer: 1,
                tip: "90% of a washing machine's energy goes to heating water. Chook's advanced formulas clean perfectly even at 30°C!"
            },
            {
                category: "Skin Health (Easy)",
                question: "What is the most practical way to protect our hands from wearing out and harsh chemicals while washing dishes?",
                options: [
                    "Wash dishes after applying plenty of heavy moisturizing cream",
                    "Use cleaning gloves and choose herbal dish soaps with pH compatible with skin",
                    "Disinfect hands with bleach",
                    "Scrub dishes with very hot water and no soap"
                ],
                answer: 1,
                tip: "Protecting your skin barrier prevents future eczema treatment expenses. Chook dish liquids care for your hands with plant glycerin."
            },
            {
                category: "Home Economy (Easy)",
                question: "How does leaving the refrigerator door open for too long or putting hot food inside affect our budget?",
                options: [
                    "It has no effect, modern refrigerators are not affected",
                    "It freshens the air inside and prevents odor",
                    "It causes the compressor to overwork and increases the electricity bill",
                    "It ensures healthier cooling of dishes"
                ],
                answer: 2,
                tip: "Putting hot food inside raises the temperature, forcing the compressor to work to its limit. Cooling food to room temperature first saves energy!"
            },
            {
                category: "Practical Hygiene (Easy)",
                question: "What is the correct dusting technique to prevent dust from flying into the air and settling back on surfaces?",
                options: [
                    "Dust with a dry feather duster very quickly",
                    "Wipe in one direction from top to bottom using a slightly damp microfiber cloth",
                    "Close windows and sweep when the room has no ventilation",
                    "Start dusting from the lowest surfaces and go up"
                ],
                answer: 1,
                tip: "A damp microfiber cloth traps dust in its fibers. Chook microfiber cloths catch dust like a magnet even without detergent!"
            },
            // --- LEVEL 2: Medium (Skin Health & Hygiene) ---
            {
                category: "Skin Health (Medium)",
                question: "How does washing our face with regular hand or body soaps affect skin health?",
                options: [
                    "It dries skin, disrupts acidic pH balance, causing early wrinkles and acne",
                    "It deeply moisturizes and smooths the skin",
                    "It has no effect, soap is soap",
                    "It immediately removes all sun spots from the face"
                ],
                answer: 0,
                tip: "Regular hand soaps are highly alkaline (pH 9-10). Our face's natural protective layer is pH 5.5. Always use ph-compatible face washes."
            },
            {
                category: "Home Hygiene (Medium)",
                question: "How often should kitchen sponges be cleaned or replaced to prevent germ accumulation?",
                options: [
                    "Replacing once a year is enough",
                    "Use for months until it breaks apart",
                    "Renew or disinfect at least every 1-2 weeks to avoid bacteria nests",
                    "Sponges cannot harbor bacteria due to their porous nature"
                ],
                answer: 2,
                tip: "Kitchen sponges are among the dirtiest items in a home. Squeezing it dry after every use and renewing it often protects family health!"
            },
            {
                category: "Home Hygiene (Medium)",
                question: "What risk does mixing chlorine bleach with other cleaning chemicals (acidic toilet cleaners, etc.) carry?",
                options: [
                    "It increases cleaning power tenfold for superior shine",
                    "It creates high temperature but is totally safe",
                    "It releases toxic chlorine gas, causing severe chemical poisoning",
                    "It dilutes bleach and renders it useless"
                ],
                answer: 2,
                tip: "NEVER mix bleach with other chemicals. Combining them releases toxic gas that is dangerous to inhale. Chook products protect you safely!"
            },
            {
                category: "Skin Health (Medium)",
                question: "Which of the following skin conditions is most commonly triggered by daily contact with cheap, synthetic, petroleum-based cleaning chemicals?",
                options: [
                    "Skin rejuvenation and cell renewal",
                    "Allergic contact eczema, excessive dryness, and skin scaling",
                    "Increased skin elasticity",
                    "Permanent skin bronzing"
                ],
                answer: 1,
                tip: "Synthetic chemicals can strip the skin's lipid barrier. Chook uses vegan, eco-friendly, dermatologically approved herbal formulas."
            },
            {
                category: "Practical Hygiene (Medium)",
                question: "What is the most effective and eco-friendly method to clean oil stains and grease from kitchen counters?",
                options: [
                    "Scrub with steel wool and pure bleach",
                    "Spray and wipe with an organic, plant-based degreaser containing natural lemon or orange oils",
                    "Melt grease using a blowtorch",
                    "Pour vinegar and wait for hours without wiping"
                ],
                answer: 1,
                tip: "Natural citrus extracts strip grease quickly. Chook Lemon Degreaser dissolves grease effortlessly with natural lemon power!"
            },
            // --- LEVEL 3: Medium-Hard (Smart Home Economy & Ecology) ---
            {
                category: "Smart Saving (Medium-Hard)",
                question: "Which of the following provides the highest long-term savings on laundry detergents?",
                options: [
                    "Buying single-use, small packages every week",
                    "Using double the recommended dosage for cleaner results",
                    "Buying concentrated formulas in refill packages and using the exact measured cap",
                    "Using cheap detergents without a measuring cap"
                ],
                answer: 2,
                tip: "Refilling existing bottles with Chook refill packs saves both plastic waste and cuts packaging costs up to 40%!"
            },
            {
                category: "Smart Saving (Medium-Hard)",
                question: "What percentage of energy is saved by washing clothes at 30°C instead of 60°C?",
                options: [
                    "No energy is saved, it is the same",
                    "Approximately 10% saving",
                    "Approximately 60% saving in electricity consumption",
                    "Only 2% saving"
                ],
                answer: 2,
                tip: "Lowering washing temperature is the biggest laundry energy saver! Chook's active enzymes clean brilliantly even in cold water."
            },
            {
                category: "Ecology (Medium-Hard)",
                question: "What does a 'Vegan and Cruelty-Free' logo on a cleaning product signify?",
                options: [
                    "The product is made entirely of chemical-free grass extracts",
                    "No animal-derived ingredients are used, and the product was never tested on animals",
                    "The product is edible and completely organic",
                    "The product is only for washing vegan clothes"
                ],
                answer: 1,
                tip: "Chook Clean is proud to be 100% vegan and cruelty-free. We protect animal lives and nature for a cleaner future!"
            },
            {
                category: "Smart Saving (Medium-Hard)",
                question: "How does periodic maintenance and descaling of a washing machine or dishwasher affect your home bills?",
                options: [
                    "It increases bills because maintenance runs the machine empty",
                    "It prevents limescale buildup on heaters, preserving energy efficiency and preventing costly repair bills",
                    "It only changes the smell of the machine",
                    "It makes machines work slower"
                ],
                answer: 1,
                tip: "Heaters covered in scale need up to 30% more energy to heat water. Descaling monthly saves appliance health and your wallet!"
            },
            {
                category: "Ecology (Medium-Hard)",
                question: "What is the primary ecological hazard of non-biodegradable synthetic cleaning chemicals when poured down the drain?",
                options: [
                    "They cause water pipes to expand",
                    "They accumulate in rivers and seas, killing aquatic life and poisoning the human food chain",
                    "They accelerate water evaporation",
                    "They turn groundwater into sparkling soda"
                ],
                answer: 1,
                tip: "Chook's formulas are rapidly biodegradable in nature, meaning they decompose harmlessly without hurting aquatic creatures."
            },
            // --- LEVEL 4: Hard (Quality Product Economics) ---
            {
                category: "Quality Economics (Hard)",
                question: "Why does buying high-quality, concentrated cleaning products ultimately cost less than cheap, diluted alternatives?",
                options: [
                    "Diluted products evaporate in the bottle, costing more",
                    "Concentrated products use less per wash, meaning one bottle lasts months longer than cheap, water-heavy ones",
                    "High-quality products are sold with gold coins",
                    "Cheap products are always fake"
                ],
                answer: 1,
                tip: "Cheap cleaning products are often diluted with up to 80% water. Concentrated Chook products require very small doses for full results!"
            },
            {
                category: "Quality Economics (Hard)",
                question: "How does using high-quality detergent affect the life cycle of your clothes and family wardrobe budget?",
                options: [
                    "It has no effect, clothes wear out at the same rate",
                    "It protects fabric fibers and colors, preventing clothes from fading and wearing out, saving thousands on shopping",
                    "It makes clothes shrink so you have to buy new ones",
                    "It turns all clothes into silk"
                ],
                answer: 1,
                tip: "Harsh, cheap detergents damage fabric fibers, causing piling and fading. Chook's color-safe gentle formula keeps clothes looking new."
            },
            {
                category: "Quality Economics (Hard)",
                question: "Which of the following is a direct financial benefit of using a high-quality, streak-free liquid Arabic soap for multi-surface cleaning?",
                options: [
                    "It eliminates the need for any other specialized floor, wood, and surface cleaners, saving money on buying multiple bottles",
                    "It doubles the speed of floor sweepers",
                    "It turns wood into laminate",
                    "It smells like chocolate"
                ],
                answer: 0,
                tip: "Traditional liquid Arabic soap is an all-in-one wonder! Chook Liquid Arabic Soap cleans parquet, tiles, and carpets flawlessly."
            },
            {
                category: "Quality Economics (Hard)",
                question: "How does using a high-quality rinse aid and salt in dishwashers affect long-term maintenance costs?",
                options: [
                    "It makes the dishwasher run louder",
                    "It prevents scale and glass clouding, avoiding costly replacement of glassware and heating elements",
                    "It is an unnecessary expense",
                    "It dyes plates white"
                ],
                answer: 1,
                tip: "Scale causes micro-scratches on glassware, ruining your expensive sets over time. Quality dishwasher salt protects your glass assets!"
            },
            {
                category: "Quality Economics (Hard)",
                question: "Which of the following represents the 'hidden cost' of using low-quality, residue-leaving cleaning detergents?",
                options: [
                    "Extra water and time spent rinsing residues off surfaces and clothes, raising bills and labor",
                    "None, cheap detergents have no hidden costs",
                    "They make rooms look larger",
                    "They make people sleep longer"
                ],
                answer: 0,
                tip: "Diluted detergents leave powdery white residues, forcing you to run extra rinse cycles. Chook cleans cleanly and rinses off in one go."
            },
            // --- LEVEL 5: Expert (Chook Champion) ---
            {
                category: "Home Hygiene (Expert)",
                question: "What is the most hygienic way to sanitize cutting boards used for raw meat in the kitchen?",
                options: [
                    "Wipe with a damp sponge only",
                    "Scrub with hot water, salt, and lemon, or use a food-safe botanical disinfectant to prevent cross-contamination",
                    "Soak in laundry fabric softener",
                    "Leave under sunlight for five minutes"
                ],
                answer: 1,
                tip: "Raw meat harbors salmonella bacteria. Cleaning meat-boards with natural lemon and salt or safe disinfectants keeps food prep areas safe."
            },
            {
                category: "Smart Saving (Expert)",
                question: "How much water is saved per minute by turning off the tap while scrubbing dishes or brushing teeth?",
                options: [
                    "Less than 1 liter",
                    "About 2 liters",
                    "Between 6 and 12 liters of clean water per minute",
                    "Exactly 50 liters"
                ],
                answer: 2,
                tip: "Running taps waste thousands of liters of clean water yearly. Turning off the tap while scrubbing is a simple, massive saving."
            },
            {
                category: "Ecology (Expert)",
                question: "What is the primary benefit of Chook's hyper-concentrated 'refill' (spare bag) concept?",
                options: [
                    "Refills are easier to carry in a handbag",
                    "They reduce plastic waste by up to 75% and are 40% cheaper because you do not pay for a new plastic pump and bottle",
                    "They look more colorful",
                    "They contain liquid candy"
                ],
                answer: 1,
                tip: "Refill packs use minimal plastic and zero heavy pumps. By reusing your original Chook spray bottle, you save both money and the planet!"
            },
            {
                category: "Quality Economics (Expert)",
                question: "What is the long-term compounding benefit of choosing non-toxic, eco-friendly cleaning products for your household?",
                options: [
                    "It only saves a few pennies a year",
                    "It protects family health, extends the lifespan of home surfaces and appliances, saves energy, and leaves a clean future",
                    "It ensures you never have to clean your house again",
                    "It makes your house glow in the dark"
                ],
                answer: 1,
                tip: "Choosing Chook Clean is a holistic win-win. You invest in family health, preserve your home assets, and save water/energy."
            },
            {
                category: "Chook Philosophy (Expert)",
                question: "Which of the following values lies at the very heart of the Chook Temiz brand philosophy?",
                options: [
                    "Creating heavy, chemical-scented products for short-term gloss",
                    "Providing joyful, nature-inspired, skin-safe, and highly concentrated eco-friendly cleaning for a sustainable future",
                    "Selling expensive electronic appliances",
                    "Making cleaning as boring and tiring as possible"
                ],
                answer: 1,
                tip: "Chook Clean is your happy, eco-friendly cleaning partner! We believe cleaning should be joyful, safe, and kind to all living beings."
            }
        ],
        memory_levels: [
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
        ],
        word_pool: [
            { word: "CHOOK", hint: "Doğadan ilham alan, her yeri ışıl ışıl parıldatan neşeli temizlik markamız.", tip: "Chook Temiz, doğaya ve geleceğe değer veren vegan formülleriyle evinizi neşeyle parlatır!" },
            { word: "TEMİZ", hint: "Evlerimizin hijyenik, lekesiz, ferah ve pırıl pırıl olma durumu.", tip: "Temiz bir ev, sakin bir zihnin en önemli destekçisidir." },
            { word: "SABUN", hint: "Geleneksel temizlikte sıvı Arap formuyla çok sevilen doğal köpüklü temizleyici.", tip: "Chook Sıvı Arap Sabunu, tüm yüzeylerde iz bırakmadan geleneksel temizlik ve parlaklık sunar." },
            { word: "KÖPÜK", hint: "Deterjanın suyla birleştiğinde oluşturduğu, temizliği hissettiren hafif beyaz baloncuklar.", tip: "Bol köpük neşeli temizlik demektir! Chook deterjanları az bir miktar ile bol köpürür." },
            { word: "HİJYEN", hint: "Bakteri ve mikroplardan arınmış, sağlığımızı koruyan kusursuz temizlik standardı.", tip: "Mutfak ve banyo gibi temasın yüksek olduğu alanlarda Chook hijyen çözümleri üstün koruma sağlar." },
            { word: "DOĞAL", hint: "Formüllerimizde sentetik kimyasallar yerine bitkisel ve saf özler tercih etmemiz.", tip: "Chook Temiz ürünleri, doğadan ilham alan doğal içerikleriyle evcil hayvanlarınız için güvenlidir." },
            { word: "ÇAMAŞIR", hint: "Mis kokulu yumuşatıcılar ve renk koruyucu deterjanlarla yıkadığımız giysilerimiz.", tip: "Çamaşırları yıkarken Chook deterjanları renklerin ilk günkü gibi canlı kalmasını sağlar." },
            { word: "PARLAK", hint: "Camların, aynaların ve zeminlerin tozsuz, lekesiz ve pürüzsüzce ışığı yansıtması.", tip: "Mikrofiber bez ile dairesel hareketlerle toz almak yüzeylerin uzun süre parlak kalmasını sağlar." },
            { word: "LAVANTA", hint: "Chook temizleyicilerinde bulunan, mor çiçekli bitkiden elde edilen dinlendirici koku özü.", tip: "Lavanta kokusu, temizlik sonrası evinizde stresi azaltan, huzurlu bir atmosfer yaratır." },
            { word: "TÜLLER", hint: "Pencerelerimizi süsleyen, dışarıdan gelen toz ve polenleri sünger gibi çeken örtüler.", tip: "Tülleri yıkarken Chook çamaşır deterjanı kullanmak, bembeyaz ve lekesiz görünüm sağlar!" },
            { word: "TASARRUF", hint: "Ev bütçesini korumak için suyu, elektriği ve deterjanı bilinçli kullanma eylemi.", tip: "Küçük tasarruflar birleşerek büyük ev bütçesi kazançlarına ve yeşil bir dünyaya dönüşür!" },
            { word: "BÜTÇE", hint: "Gelir ve giderlerimizi planlayarak ev ekonomisini dengede tutma sanatı.", tip: "Bütçe planlaması yapmak, gereksiz tüketimi önleyerek birikim yapmanızı kolaylaştırır." },
            { word: "LİMON", hint: "Chook yağ çözücülerinde bulunan, asidik gücüyle yağları söküp atan ferah meyve özü.", tip: "Limon kokusu zihni açar ve mutfaktaki ağır kokuları tamamen maskelemeden nötralize eder." },
            { word: "KİR", hint: "Yüzeylerde biriken, hijyeni bozan ve temizlenmesi gereken istenmeyen tabaka.", tip: "Biriken kirler mikrop kaynağıdır. Chook ile haftalık temizlik düzeni kirlerin birikmesini önler." },
            { word: "VEGAN", hint: "Ürünlerimizin formülünde hiçbir hayvansal hammadde ve hayvanda test kullanılmaması.", tip: "Chook ürünleri hayvan dostudur, doğanın dengesini bozmayan ekolojik içeriklerle doludur." },
            { word: "MİKROFİBER", hint: "Saç telinden 100 kat ince lifleriyle tozu deterjansız bile mükemmel çeken bez türü.", tip: "Mikrofiber bezlerin ömrünü uzatmak için onları yumuşatıcı kullanmadan yıkamalısınız!" },
            { word: "DURULAMA", hint: "Deterjan kalıntılarını gidermek için yüzeyleri veya çamaşırları temiz suyla arındırma.", tip: "Chook'un kolay durulanan formülü sayesinde su faturanızda %30'a yakın su tasarrufu sağlarsınız." },
            { word: "KİREÇ", hint: "Sert musluk sularının ısıtıcılarda ve yüzeylerde bıraktığı beyaz tortu.", tip: "Kireç tortularını temizlemek ısıtıcıların ömrünü uzatır ve energy kaybını sıfıra indirir." },
            { word: "BAKIM", hint: "Makinelerimizin ömrünü uzatmak ve faturayı düşürmek için yapılan temizlik adımları.", tip: "Makine bakımı elektrik faturanızda ve teknik servis masraflarında büyük tasarruf sağlar." },
            { word: "SAĞLIK", hint: "Hijyenik ve temiz bir evde yaşayarak koruduğumuz en değerli varlığımız.", tip: "Beden sağlığı temiz bir çevre ve temiz bir solunum havası ile doğrudan ilişkilidir." },
            { word: "KONSANTRE", hint: "Az miktarda kullanımla çok yüksek temizlik sağlayan yoğun formüllü ürün.", tip: "Konsantre ürün kullanarak ambalaj atıklarını azaltır ve cebinizi korursunuz." },
            { word: "AMBALAJ", hint: "Chook yedek paketleriyle doğayı korumak için miktarını azalttığımız koruyucu kap.", tip: "Plastik ambalaj kullanımını azaltarak gelecek nesillere daha mavi denizler bırakıyoruz." },
            { word: "SÜNGER", hint: "Bulaşıkları yıkarken suyu ve deterjanı emen, sık sık yenilenmesi gereken gözenekli araç.", tip: "Süngerler nemli kaldıkça mikrop ürer. Süngerinizi her bulaşıktan sonra sıkarak kurutun." },
            { word: "FİLİZ", hint: "Doğanın uyanışını, yeşermeyi ve çevre dostu felsefemizi temsil eden taze sürgün.", tip: "Gelecek nesillere daha yeşil bir dünya bırakmak için Chook çevreye duyarlı felsefeyle üretilir." },
            { word: "EGZAMA", hint: "Sert kimyasalların ciltte yol açtığı kuruluk, kaşıntı ve deri hastalığı.", tip: "Gliserinli Chook bulaşık sıvısı ellerinizi korur, pH uyumuyla kuruluk ve egzamaya yol açmaz." }
        ]
    },
    en: {
        trivia_levels: [
            { level: 1, title: "Cleaning Start & Practical Hygiene", desc: "Learn the most joyful foundations of home economics and basic hygiene!", difficulty: "Easy", diffClass: "diff-easy", points: 50, startIndex: 0, endIndex: 5 },
            { level: 2, title: "Skin Health & Personal Hygiene", desc: "Discover how to protect your budget while protecting your skin!", difficulty: "Medium", diffClass: "diff-medium", points: 60, startIndex: 5, endIndex: 10 },
            { level: 3, title: "Smart Home Economy & Ecology", desc: "Unravel the secrets of saving thousands on the home budget while saving nature!", difficulty: "Medium-Hard", diffClass: "diff-medium-hard", points: 70, startIndex: 10, endIndex: 15 },
            { level: 4, title: "Quality Products & Smart Consumer", desc: "See why high-quality cleaning products ultimately cost much less!", difficulty: "Hard", diffClass: "diff-hard", points: 80, startIndex: 15, endIndex: 20 },
            { level: 5, title: "Chook Brain World Champion", desc: "Solve the toughest questions from kitchen hygiene to smart financial management!", difficulty: "Expert", diffClass: "diff-expert", points: 100, startIndex: 20, endIndex: 25 }
        ],
        trivia_questions: [
            // --- LEVEL 1: Easy (Practical Home Hygiene) ---
            {
                category: "Practical Hygiene (Easy)",
                question: "When starting home cleaning, which sequence is most budget-friendly and correct?",
                options: [
                    "Sweep and mop floors first, then dust furniture",
                    "Dust upper surfaces and furniture first, sweep floors last",
                    "Clean bathroom first, then kitchen counter",
                    "Sequence has no importance, do it randomly"
                ],
                answer: 1,
                tip: "Due to gravity, dust drifts from top to bottom. Dusting first and sweeping last saves you from extra work and energy!"
            },
            {
                category: "Home Economy (Easy)",
                question: "To save electricity when running the washing machine, which approach is most pocket-friendly?",
                options: [
                    "Run the machine immediately when a few dirty clothes pile up",
                    "Load to full capacity without overloading and wash at low temp (30°C)",
                    "Always wash clothes at the highest temperature (90°C)",
                    "Wash clothes with hot water only and no detergent"
                ],
                answer: 1,
                tip: "90% of a washing machine's energy goes to heating water. Chook's advanced formulas clean perfectly even at 30°C!"
            },
            {
                category: "Skin Health (Easy)",
                question: "What is the most practical way to protect our hands from wearing out and harsh chemicals while washing dishes?",
                options: [
                    "Wash dishes after applying plenty of heavy moisturizing cream",
                    "Use cleaning gloves and choose herbal dish soaps with pH compatible with skin",
                    "Disinfect hands with bleach",
                    "Scrub dishes with very hot water and no soap"
                ],
                answer: 1,
                tip: "Protecting your skin barrier prevents future eczema treatment expenses. Chook dish liquids care for your hands with plant glycerin."
            },
            {
                category: "Home Economy (Easy)",
                question: "How does leaving the refrigerator door open for too long or putting hot food inside affect our budget?",
                options: [
                    "It has no effect, modern refrigerators are not affected",
                    "It freshens the air inside and prevents odor",
                    "It causes the compressor to overwork and increases the electricity bill",
                    "It ensures healthier cooling of dishes"
                ],
                answer: 2,
                tip: "Putting hot food inside raises the temperature, forcing the compressor to work to its limit. Cooling food to room temperature first saves energy!"
            },
            {
                category: "Practical Hygiene (Easy)",
                question: "What is the correct dusting technique to prevent dust from flying into the air and settling back on surfaces?",
                options: [
                    "Dust with a dry feather duster very quickly",
                    "Wipe in one direction from top to bottom using a slightly damp microfiber cloth",
                    "Close windows and sweep when the room has no ventilation",
                    "Start dusting from the lowest surfaces and go up"
                ],
                answer: 1,
                tip: "A damp microfiber cloth traps dust in its fibers. Chook microfiber cloths catch dust like a magnet even without detergent!"
            },
            // --- LEVEL 2: Medium (Skin Health & Hygiene) ---
            {
                category: "Skin Health (Medium)",
                question: "How does washing our face with regular hand or body soaps affect skin health?",
                options: [
                    "It dries skin, disrupts acidic pH balance, causing early wrinkles and acne",
                    "It deeply moisturizes and smooths the skin",
                    "It has no effect, soap is soap",
                    "It immediately removes all sun spots from the face"
                ],
                answer: 0,
                tip: "Regular hand soaps are highly alkaline (pH 9-10). Our face's natural protective layer is pH 5.5. Always use ph-compatible face washes."
            },
            {
                category: "Home Hygiene (Medium)",
                question: "How often should kitchen sponges be cleaned or replaced to prevent germ accumulation?",
                options: [
                    "Replacing once a year is enough",
                    "Use for months until it breaks apart",
                    "Renew or disinfect at least every 1-2 weeks to avoid bacteria nests",
                    "Sponges cannot harbor bacteria due to their porous nature"
                ],
                answer: 2,
                tip: "Kitchen sponges are among the dirtiest items in a home. Squeezing it dry after every use and renewing it often protects family health!"
            },
            {
                category: "Home Hygiene (Medium)",
                question: "What risk does mixing chlorine bleach with other cleaning chemicals (acidic toilet cleaners, etc.) carry?",
                options: [
                    "It increases cleaning power tenfold for superior shine",
                    "It creates high temperature but is totally safe",
                    "It releases toxic chlorine gas, causing severe chemical poisoning",
                    "It dilutes bleach and renders it useless"
                ],
                answer: 2,
                tip: "NEVER mix bleach with other chemicals. Combining them releases toxic gas that is dangerous to inhale. Chook products protect you safely!"
            },
            {
                category: "Skin Health (Medium)",
                question: "Which of the following skin conditions is most commonly triggered by daily contact with cheap, synthetic, petroleum-based cleaning chemicals?",
                options: [
                    "Skin rejuvenation and cell renewal",
                    "Allergic contact eczema, excessive dryness, and skin scaling",
                    "Increased skin elasticity",
                    "Permanent skin bronzing"
                ],
                answer: 1,
                tip: "Synthetic chemicals can strip the skin's lipid barrier. Chook uses vegan, eco-friendly, dermatologically approved herbal formulas."
            },
            {
                category: "Practical Hygiene (Medium)",
                question: "What is the most effective and eco-friendly method to clean oil stains and grease from kitchen counters?",
                options: [
                    "Scrub with steel wool and pure bleach",
                    "Spray and wipe with an organic, plant-based degreaser containing natural lemon or orange oils",
                    "Melt grease using a blowtorch",
                    "Pour vinegar and wait for hours without wiping"
                ],
                answer: 1,
                tip: "Natural citrus extracts strip grease quickly. Chook Lemon Degreaser dissolves grease effortlessly with natural lemon power!"
            },
            // --- LEVEL 3: Medium-Hard (Smart Home Economy & Ecology) ---
            {
                category: "Smart Saving (Medium-Hard)",
                question: "Which of the following provides the highest long-term savings on laundry detergents?",
                options: [
                    "Buying single-use, small packages every week",
                    "Using double the recommended dosage for cleaner results",
                    "Buying concentrated formulas in refill packages and using the exact measured cap",
                    "Using cheap detergents without a measuring cap"
                ],
                answer: 2,
                tip: "Refilling existing bottles with Chook refill packs saves both plastic waste and cuts packaging costs up to 40%!"
            },
            {
                category: "Smart Saving (Medium-Hard)",
                question: "What percentage of energy is saved by washing clothes at 30°C instead of 60°C?",
                options: [
                    "No energy is saved, it is the same",
                    "Approximately 10% saving",
                    "Approximately 60% saving in electricity consumption",
                    "Only 2% saving"
                ],
                answer: 2,
                tip: "Lowering washing temperature is the biggest laundry energy saver! Chook's active enzymes clean brilliantly even in cold water."
            },
            {
                category: "Ecology (Medium-Hard)",
                question: "What does a 'Vegan and Cruelty-Free' logo on a cleaning product signify?",
                options: [
                    "The product is made entirely of chemical-free grass extracts",
                    "No animal-derived ingredients are used, and the product was never tested on animals",
                    "The product is edible and completely organic",
                    "The product is only for washing vegan clothes"
                ],
                answer: 1,
                tip: "Chook Clean is proud to be 100% vegan and cruelty-free. We protect animal lives and nature for a cleaner future!"
            },
            {
                category: "Smart Saving (Medium-Hard)",
                question: "How does periodic maintenance and descaling of a washing machine or dishwasher affect your home bills?",
                options: [
                    "It increases bills because maintenance runs the machine empty",
                    "It prevents limescale buildup on heaters, preserving energy efficiency and preventing costly repair bills",
                    "It only changes the smell of the machine",
                    "It makes machines work slower"
                ],
                answer: 1,
                tip: "Heaters covered in scale need up to 30% more energy to heat water. Descaling monthly saves appliance health and your wallet!"
            },
            {
                category: "Ecology (Medium-Hard)",
                question: "What is the primary ecological hazard of non-biodegradable synthetic cleaning chemicals when poured down the drain?",
                options: [
                    "They cause water pipes to expand",
                    "They accumulate in rivers and seas, killing aquatic life and poisoning the human food chain",
                    "They accelerate water evaporation",
                    "They turn groundwater into sparkling soda"
                ],
                answer: 1,
                tip: "Chook's formulas are rapidly biodegradable in nature, meaning they decompose harmlessly without hurting aquatic creatures."
            },
            // --- LEVEL 4: Hard (Quality Product Economics) ---
            {
                category: "Quality Economics (Hard)",
                question: "Why does buying high-quality, concentrated cleaning products ultimately cost less than cheap, diluted alternatives?",
                options: [
                    "Diluted products evaporate in the bottle, costing more",
                    "Concentrated products use less per wash, meaning one bottle lasts months longer than cheap, water-heavy ones",
                    "High-quality products are sold with gold coins",
                    "Cheap products are always fake"
                ],
                answer: 1,
                tip: "Cheap cleaning products are often diluted with up to 80% water. Concentrated Chook products require very small doses for full results!"
            },
            {
                category: "Quality Economics (Hard)",
                question: "How does using high-quality detergent affect the life cycle of your clothes and family wardrobe budget?",
                options: [
                    "It has no effect, clothes wear out at the same rate",
                    "It protects fabric fibers and colors, preventing clothes from fading and wearing out, saving thousands on shopping",
                    "It makes clothes shrink so you have to buy new ones",
                    "It turns all clothes into silk"
                ],
                answer: 1,
                tip: "Harsh, cheap detergents damage fabric fibers, causing piling and fading. Chook's color-safe gentle formula keeps clothes looking new."
            },
            {
                category: "Quality Economics (Hard)",
                question: "Which of the following is a direct financial benefit of using a high-quality, streak-free liquid Arabic soap for multi-surface cleaning?",
                options: [
                    "It eliminates the need for any other specialized floor, wood, and surface cleaners, saving money on buying multiple bottles",
                    "It doubles the speed of floor sweepers",
                    "It turns wood into laminate",
                    "It smells like chocolate"
                ],
                answer: 0,
                tip: "Traditional liquid Arabic soap is an all-in-one wonder! Chook Liquid Arabic Soap cleans parquet, tiles, and carpets flawlessly."
            },
            {
                category: "Quality Economics (Hard)",
                question: "How does using a high-quality rinse aid and salt in dishwashers affect long-term maintenance costs?",
                options: [
                    "It makes the dishwasher run louder",
                    "It prevents scale and glass clouding, avoiding costly replacement of glassware and heating elements",
                    "It is an unnecessary expense",
                    "It dyes plates white"
                ],
                answer: 1,
                tip: "Scale causes micro-scratches on glassware, ruining your expensive sets over time. Quality dishwasher salt protects your glass assets!"
            },
            {
                category: "Quality Economics (Hard)",
                question: "Which of the following represents the 'hidden cost' of using low-quality, residue-leaving cleaning detergents?",
                options: [
                    "Extra water and time spent rinsing residues off surfaces and clothes, raising bills and labor",
                    "None, cheap detergents have no hidden costs",
                    "They make rooms look larger",
                    "They make people sleep longer"
                ],
                answer: 0,
                tip: "Diluted detergents leave powdery white residues, forcing you to run extra rinse cycles. Chook cleans cleanly and rinses off in one go."
            },
            // --- LEVEL 5: Expert (Chook Champion) ---
            {
                category: "Home Hygiene (Expert)",
                question: "What is the most hygienic way to sanitize cutting boards used for raw meat in the kitchen?",
                options: [
                    "Wipe with a damp sponge only",
                    "Scrub with hot water, salt, and lemon, or use a food-safe botanical disinfectant to prevent cross-contamination",
                    "Soak in laundry fabric softener",
                    "Leave under sunlight for five minutes"
                ],
                answer: 1,
                tip: "Raw meat harbors salmonella bacteria. Cleaning meat-boards with natural lemon and salt or safe disinfectants keeps food prep areas safe."
            },
            {
                category: "Smart Saving (Expert)",
                question: "How much water is saved per minute by turning off the tap while scrubbing dishes or brushing teeth?",
                options: [
                    "Less than 1 liter",
                    "About 2 liters",
                    "Between 6 and 12 liters of clean water per minute",
                    "Exactly 50 liters"
                ],
                answer: 2,
                tip: "Running taps waste thousands of liters of clean water yearly. Turning off the tap while scrubbing is a simple, massive saving."
            },
            {
                category: "Ecology (Expert)",
                question: "What is the primary benefit of Chook's hyper-concentrated 'refill' (spare bag) concept?",
                options: [
                    "Refills are easier to carry in a handbag",
                    "They reduce plastic waste by up to 75% and are 40% cheaper because you do not pay for a new plastic pump and bottle",
                    "They look more colorful",
                    "They contain liquid candy"
                ],
                answer: 1,
                tip: "Refill packs use minimal plastic and zero heavy pumps. By reusing your original Chook spray bottle, you save both money and the planet!"
            },
            {
                category: "Quality Economics (Expert)",
                question: "What is the long-term compounding benefit of choosing non-toxic, eco-friendly cleaning products for your household?",
                options: [
                    "It only saves a few pennies a year",
                    "It protects family health, extends the lifespan of home surfaces and appliances, saves energy, and leaves a clean future",
                    "It ensures you never have to clean your house again",
                    "It makes your house glow in the dark"
                ],
                answer: 1,
                tip: "Choosing Chook Clean is a holistic win-win. You invest in family health, preserve your home assets, and save water/energy."
            },
            {
                category: "Chook Philosophy (Expert)",
                question: "Which of the following values lies at the very heart of the Chook Temiz brand philosophy?",
                options: [
                    "Creating heavy, chemical-scented products for short-term gloss",
                    "Providing joyful, nature-inspired, skin-safe, and highly concentrated eco-friendly cleaning for a sustainable future",
                    "Selling expensive electronic appliances",
                    "Making cleaning as boring and tiring as possible"
                ],
                answer: 1,
                tip: "Chook Clean is your happy, eco-friendly cleaning partner! We believe cleaning should be joyful, safe, and kind to all living beings."
            }
        ],
        memory_levels: [
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
        ],
        word_pool: [
            { word: "CHOOK", hint: "Doğadan ilham alan, her yeri ışıl ışıl parıldatan neşeli temizlik markamız.", tip: "Chook Temiz, doğaya ve geleceğe değer veren vegan formülleriyle evinizi neşeyle parlatır!" },
            { word: "TEMİZ", hint: "Evlerimizin hijyenik, lekesiz, ferah ve pırıl pırıl olma durumu.", tip: "Temiz bir ev, sakin bir zihnin en önemli destekçisidir." },
            { word: "SABUN", hint: "Geleneksel temizlikte sıvı Arap formuyla çok sevilen doğal köpüklü temizleyici.", tip: "Chook Sıvı Arap Sabunu, tüm yüzeylerde iz bırakmadan geleneksel temizlik ve parlaklık sunar." },
            { word: "KÖPÜK", hint: "Deterjanın suyla birleştiğinde oluşturduğu, temizliği hissettiren hafif beyaz baloncuklar.", tip: "Bol köpük neşeli temizlik demektir! Chook deterjanları az bir miktar ile bol köpürür." },
            { word: "HİJYEN", hint: "Bakteri ve mikroplardan arınmış, sağlığımızı koruyan kusursuz temizlik standardı.", tip: "Mutfak ve banyo gibi temasın yüksek olduğu alanlarda Chook hijyen çözümleri üstün koruma sağlar." },
            { word: "DOĞAL", hint: "Formüllerimizde sentetik kimyasallar yerine bitkisel ve saf özler tercih etmemiz.", tip: "Chook Temiz ürünleri, doğadan ilham alan doğal içerikleriyle evcil hayvanlarınız için güvenlidir." },
            { word: "ÇAMAŞIR", hint: "Mis kokulu yumuşatıcılar ve renk koruyucu deterjanlarla yıkadığımız giysilerimiz.", tip: "Çamaşırları yıkarken Chook deterjanları renklerin ilk günkü gibi canlı kalmasını sağlar." },
            { word: "PARLAK", hint: "Camların, aynaların ve zeminlerin tozsuz, lekesiz ve pürüzsüzce ışığı yansıtması.", tip: "Mikrofiber bez ile dairesel hareketlerle toz almak yüzeylerin uzun süre parlak kalmasını sağlar." },
            { word: "LAVANTA", hint: "Chook temizleyicilerinde bulunan, mor çiçekli bitkiden elde edilen dinlendirici koku özü.", tip: "Lavanta kokusu, temizlik sonrası evinizde stresi azaltan, huzurlu bir atmosfer yaratır." },
            { word: "TÜLLER", hint: "Pencerelerimizi süsleyen, dışarıdan gelen toz ve polenleri sünger gibi çeken örtüler.", tip: "Tülleri yıkarken Chook çamaşır deterjanı kullanmak, bembeyaz ve lekesiz görünüm sağlar!" },
            { word: "TASARRUF", hint: "Ev bütçesini korumak için suyu, elektriği ve deterjanı bilinçli kullanma eylemi.", tip: "Küçük tasarruflar birleşerek büyük ev bütçesi kazançlarına ve yeşil bir dünyaya dönüşür!" },
            { word: "BÜTÇE", hint: "Gelir ve giderlerimizi planlayarak ev ekonomisini dengede tutma sanatı.", tip: "Bütçe planlaması yapmak, gereksiz tüketimi önleyerek birikim yapmanızı kolaylaştırır." },
            { word: "LİMON", hint: "Chook yağ çözücülerinde bulunan, asidik gücüyle yağları söküp atan ferah meyve özü.", tip: "Limon kokusu zihni açar ve mutfaktaki ağır kokuları tamamen maskelemeden nötralize eder." },
            { word: "KİR", hint: "Yüzeylerde biriken, hijyeni bozan ve temizlenmesi gereken istenmeyen tabaka.", tip: "Biriken kirler mikrop kaynağıdır. Chook ile haftalık temizlik düzeni kirlerin birikmesini önler." },
            { word: "VEGAN", hint: "Ürünlerimizin formülünde hiçbir hayvansal hammadde ve hayvanda test kullanılmaması.", tip: "Chook ürünleri hayvan dostudur, doğanın dengesini bozmayan ekolojik içeriklerle doludur." },
            { word: "MİKROFİBER", hint: "Saç telinden 100 kat ince lifleriyle tozu deterjansız bile mükemmel çeken bez türü.", tip: "Mikrofiber bezlerin ömrünü uzatmak için onları yumuşatıcı kullanmadan yıkamalısınız!" },
            { word: "DURULAMA", hint: "Deterjan kalıntılarını gidermek için yüzeyleri veya çamaşırları temiz suyla arındırma.", tip: "Chook'un kolay durulanan formülü sayesinde su faturanızda %30'a yakın su tasarrufu sağlarsınız." },
            { word: "KİREÇ", hint: "Sert musluk sularının ısıtıcılarda ve yüzeylerde bıraktığı beyaz tortu.", tip: "Kireç tortularını temizlemek ısıtıcıların ömrünü uzatır ve enerji kaybını sıfıra indirir." },
            { word: "BAKIM", hint: "Makinelerimizin ömrünü uzatmak ve faturayı düşürmek için yapılan temizlik adımları.", tip: "Makine bakımı elektrik faturanızda ve teknik servis masraflarında büyük tasarruf sağlar." },
            { word: "SAĞLIK", hint: "Hijyenik ve temiz bir evde yaşayarak koruduğumuz en değerli varlığımız.", tip: "Beden sağlığı temiz bir çevre ve temiz bir solunum havası ile doğrudan ilişkilidir." },
            { word: "KONSANTRE", hint: "Az miktarda kullanımla çok yüksek temizlik sağlayan yoğun formüllü ürün.", tip: "Konsantre ürün kullanarak ambalaj atıklarını azaltır ve cebinizi korursunuz." },
            { word: "AMBALAJ", hint: "Chook yedek paketleriyle doğayı korumak için miktarını azalttığımız koruyucu kap.", tip: "Plastik ambalaj kullanımını azaltarak gelecek nesillere daha mavi denizler bırakıyoruz." },
            { word: "SÜNGER", hint: "Bulaşıkları yıkarken suyu ve deterjanı emen, sık sık yenilenmesi gereken gözenekli araç.", tip: "Süngerler nemli kaldıkça mikrop ürer. Süngerinizi her bulaşıktan sonra sıkarak kurutun." },
            { word: "FİLİZ", hint: "Doğanın uyanışını, yeşermeyi ve çevre dostu felsefemizi temsil eden taze sürgün.", tip: "Gelecek nesillere daha yeşil bir dünya bırakmak için Chook çevreye duyarlı felsefeyle üretilir." },
            { word: "EGZAMA", hint: "Sert kimyasalların ciltte yol açtığı kuruluk, kaşıntı ve deri hastalığı.", tip: "Gliserinli Chook bulaşık sıvısı ellerinizi korur, pH uyumuyla kuruluk ve egzamaya yol açmaz." }
        ]
    },
    en: {
        trivia_levels: [
            { level: 1, title: "Cleaning Start & Practical Hygiene", desc: "Learn the most joyful foundations of home economics and basic hygiene!", difficulty: "Easy", diffClass: "diff-easy", points: 50, startIndex: 0, endIndex: 5 },
            { level: 2, title: "Skin Health & Personal Hygiene", desc: "Discover how to protect your budget while protecting your skin!", difficulty: "Medium", diffClass: "diff-medium", points: 60, startIndex: 5, endIndex: 10 },
            { level: 3, title: "Smart Home Economy & Ecology", desc: "Unravel the secrets of saving thousands on the home budget while saving nature!", difficulty: "Medium-Hard", diffClass: "diff-medium-hard", points: 70, startIndex: 10, endIndex: 15 },
            { level: 4, title: "Quality Products & Smart Consumer", desc: "See why high-quality cleaning products ultimately cost much less!", difficulty: "Hard", diffClass: "diff-hard", points: 80, startIndex: 15, endIndex: 20 },
            { level: 5, title: "Chook Brain World Champion", desc: "Solve the toughest questions from kitchen hygiene to smart financial management!", difficulty: "Expert", diffClass: "diff-expert", points: 100, startIndex: 20, endIndex: 25 }
        ],
        trivia_questions: [
            // --- LEVEL 1: Easy (Practical Home Hygiene) ---
            {
                category: "Practical Hygiene (Easy)",
                question: "When starting home cleaning, which sequence is most budget-friendly and correct?",
                options: [
                    "Sweep and mop floors first, then dust furniture",
                    "Dust upper surfaces and furniture first, sweep floors last",
                    "Clean bathroom first, then kitchen counter",
                    "Sequence has no importance, do it randomly"
                ],
                answer: 1,
                tip: "Due to gravity, dust drifts from top to bottom. Dusting first and sweeping last saves you from extra work and energy!"
            },
            {
                category: "Home Economy (Easy)",
                question: "To save electricity when running the washing machine, which approach is most pocket-friendly?",
                options: [
                    "Run the machine immediately when a few dirty clothes pile up",
                    "Load to full capacity without overloading and wash at low temp (30°C)",
                    "Always wash clothes at the highest temperature (90°C)",
                    "Wash clothes with hot water only and no detergent"
                ],
                answer: 1,
                tip: "90% of a washing machine's energy goes to heating water. Chook's advanced formulas clean perfectly even at 30°C!"
            },
            {
                category: "Skin Health (Easy)",
                question: "What is the most practical way to protect our hands from wearing out and harsh chemicals while washing dishes?",
                options: [
                    "Wash dishes after applying plenty of heavy moisturizing cream",
                    "Use cleaning gloves and choose herbal dish soaps with pH compatible with skin",
                    "Disinfect hands with bleach",
                    "Scrub dishes with very hot water and no soap"
                ],
                answer: 1,
                tip: "Protecting your skin barrier prevents future eczema treatment expenses. Chook dish liquids care for your hands with plant glycerin."
            },
            {
                category: "Home Economy (Easy)",
                question: "How does leaving the refrigerator door open for too long or putting hot food inside affect our budget?",
                options: [
                    "It has no effect, modern refrigerators are not affected",
                    "It freshens the air inside and prevents odor",
                    "It causes the compressor to overwork and increases the electricity bill",
                    "It ensures healthier cooling of dishes"
                ],
                answer: 2,
                tip: "Putting hot food inside raises the temperature, forcing the compressor to work to its limit. Cooling food to room temperature first saves energy!"
            },
            {
                category: "Practical Hygiene (Easy)",
                question: "As our cute cat mascot CHOX knows, cats are among the cleanest animals in the world. Approximately how much of their day does a healthy cat spend grooming and cleaning themselves, their kittens, or their mates?",
                options: [
                    "About 10-15% of their day",
                    "About 30-50% of their day (almost half of their waking hours)",
                    "Only 5% of their day",
                    "Cats never clean themselves, they only sleep"
                ],
                answer: 1,
                tip: "Cats spend nearly half of their waking hours meticulously cleaning themselves and their loved ones. Our cleanliness-loving mascot CHOX also loves sparkling homes and games!"
            },
            // --- LEVEL 2: Medium (Skin Health & Hygiene) ---
            {
                category: "Skin Health (Medium)",
                question: "How does washing our face with regular hand or body soaps affect skin health?",
                options: [
                    "It dries skin, disrupts acidic pH balance, causing early wrinkles and acne",
                    "It deeply moisturizes and smooths the skin",
                    "It has no effect, soap is soap",
                    "It immediately removes all sun spots from the face"
                ],
                answer: 0,
                tip: "Regular hand soaps are highly alkaline (pH 9-10). Our face's natural protective layer is pH 5.5. Always use ph-compatible face washes."
            },
            {
                category: "Home Hygiene (Medium)",
                question: "How often should kitchen sponges be cleaned or replaced to prevent germ accumulation?",
                options: [
                    "Replacing once a year is enough",
                    "Use for months until it breaks apart",
                    "Renew or disinfect at least every 1-2 weeks to avoid bacteria nests",
                    "Sponges cannot harbor bacteria due to their porous nature"
                ],
                answer: 2,
                tip: "Kitchen sponges are among the dirtiest items in a home. Squeezing it dry after every use and renewing it often protects family health!"
            },
            {
                category: "Home Hygiene (Medium)",
                question: "What risk does mixing chlorine bleach with other cleaning chemicals (acidic toilet cleaners, etc.) carry?",
                options: [
                    "It increases cleaning power tenfold for superior shine",
                    "It creates high temperature but is totally safe",
                    "It releases toxic chlorine gas, causing severe chemical poisoning",
                    "It dilutes bleach and renders it useless"
                ],
                answer: 2,
                tip: "NEVER mix bleach with other chemicals. Combining them releases toxic gas that is dangerous to inhale. Chook products protect you safely!"
            },
            {
                category: "Skin Health (Medium)",
                question: "Which of the following skin conditions is most commonly triggered by daily contact with cheap, synthetic, petroleum-based cleaning chemicals?",
                options: [
                    "Skin rejuvenation and cell renewal",
                    "Allergic contact eczema, excessive dryness, and skin scaling",
                    "Increased skin elasticity",
                    "Permanent skin bronzing"
                ],
                answer: 1,
                tip: "Synthetic chemicals can strip the skin's lipid barrier. Chook uses vegan, eco-friendly, dermatologically approved herbal formulas."
            },
            {
                category: "Practical Hygiene (Medium)",
                question: "What is the most effective and eco-friendly method to clean oil stains and grease from kitchen counters?",
                options: [
                    "Scrub with steel wool and pure bleach",
                    "Spray and wipe with an organic, plant-based degreaser containing natural lemon or orange oils",
                    "Melt grease using a blowtorch",
                    "Pour vinegar and wait for hours without wiping"
                ],
                answer: 1,
                tip: "Natural citrus extracts strip grease quickly. Chook Lemon Degreaser dissolves grease effortlessly with natural lemon power!"
            },
            // --- LEVEL 3: Medium-Hard (Smart Home Economy & Ecology) ---
            {
                category: "Smart Saving (Medium-Hard)",
                question: "Which of the following provides the highest long-term savings on laundry detergents?",
                options: [
                    "Buying single-use, small packages every week",
                    "Using double the recommended dosage for cleaner results",
                    "Buying concentrated formulas in refill packages and using the exact measured cap",
                    "Using cheap detergents without a measuring cap"
                ],
                answer: 2,
                tip: "Refilling existing bottles with Chook refill packs saves both plastic waste and cuts packaging costs up to 40%!"
            },
            {
                category: "Smart Saving (Medium-Hard)",
                question: "What percentage of energy is saved by washing clothes at 30°C instead of 60°C?",
                options: [
                    "No energy is saved, it is the same",
                    "Approximately 10% saving",
                    "Approximately 60% saving in electricity consumption",
                    "Only 2% saving"
                ],
                answer: 2,
                tip: "Lowering washing temperature is the biggest laundry energy saver! Chook's active enzymes clean brilliantly even in cold water."
            },
            {
                category: "Ecology (Medium-Hard)",
                question: "What does a 'Vegan and Cruelty-Free' logo on a cleaning product signify?",
                options: [
                    "The product is made entirely of chemical-free grass extracts",
                    "No animal-derived ingredients are used, and the product was never tested on animals",
                    "The product is edible and completely organic",
                    "The product is only for washing vegan clothes"
                ],
                answer: 1,
                tip: "Chook Clean is proud to be 100% vegan and cruelty-free. We protect animal lives and nature for a cleaner future!"
            },
            {
                category: "Smart Saving (Medium-Hard)",
                question: "How does periodic maintenance and descaling of a washing machine or dishwasher affect your home bills?",
                options: [
                    "It increases bills because maintenance runs the machine empty",
                    "It prevents limescale buildup on heaters, preserving energy efficiency and preventing costly repair bills",
                    "It only changes the smell of the machine",
                    "It makes machines work slower"
                ],
                answer: 1,
                tip: "Heaters covered in scale need up to 30% more energy to heat water. Descaling monthly saves appliance health and your wallet!"
            },
            {
                category: "Ecology (Medium-Hard)",
                question: "What is the primary ecological hazard of non-biodegradable synthetic cleaning chemicals when poured down the drain?",
                options: [
                    "They cause water pipes to expand",
                    "They accumulate in rivers and seas, killing aquatic life and poisoning the human food chain",
                    "They accelerate water evaporation",
                    "They turn groundwater into sparkling soda"
                ],
                answer: 1,
                tip: "Chook's formulas are rapidly biodegradable in nature, meaning they decompose harmlessly without hurting aquatic creatures."
            },
            // --- LEVEL 4: Hard (Quality Product Economics) ---
            {
                category: "Quality Economics (Hard)",
                question: "Why does buying high-quality, concentrated cleaning products ultimately cost less than cheap, diluted alternatives?",
                options: [
                    "Diluted products evaporate in the bottle, costing more",
                    "Concentrated products use less per wash, meaning one bottle lasts months longer than cheap, water-heavy ones",
                    "High-quality products are sold with gold coins",
                    "Cheap products are always fake"
                ],
                answer: 1,
                tip: "Cheap cleaning products are often diluted with up to 80% water. Concentrated Chook products require very small doses for full results!"
            },
            {
                category: "Quality Economics (Hard)",
                question: "How does using high-quality detergent affect the life cycle of your clothes and family wardrobe budget?",
                options: [
                    "It has no effect, clothes wear out at the same rate",
                    "It protects fabric fibers and colors, preventing clothes from fading and wearing out, saving thousands on shopping",
                    "It makes clothes shrink so you have to buy new ones",
                    "It turns all clothes into silk"
                ],
                answer: 1,
                tip: "Harsh, cheap detergents damage fabric fibers, causing piling and fading. Chook's color-safe gentle formula keeps clothes looking new."
            },
            {
                category: "Quality Economics (Hard)",
                question: "Which of the following is a direct financial benefit of using a high-quality, streak-free liquid Arabic soap for multi-surface cleaning?",
                options: [
                    "It eliminates the need for any other specialized floor, wood, and surface cleaners, saving money on buying multiple bottles",
                    "It doubles the speed of floor sweepers",
                    "It turns wood into laminate",
                    "It smells like chocolate"
                ],
                answer: 0,
                tip: "Traditional liquid Arabic soap is an all-in-one wonder! Chook Liquid Arabic Soap cleans parquet, tiles, and carpets flawlessly."
            },
            {
                category: "Quality Economics (Hard)",
                question: "How does using a high-quality rinse aid and salt in dishwashers affect long-term maintenance costs?",
                options: [
                    "It makes the dishwasher run louder",
                    "It prevents scale and glass clouding, avoiding costly replacement of glassware and heating elements",
                    "It is an unnecessary expense",
                    "It dyes plates white"
                ],
                answer: 1,
                tip: "Scale causes micro-scratches on glassware, ruining your expensive sets over time. Quality dishwasher salt protects your glass assets!"
            },
            {
                category: "Quality Economics (Hard)",
                question: "Which of the following represents the 'hidden cost' of using low-quality, residue-leaving cleaning detergents?",
                options: [
                    "Extra water and time spent rinsing residues off surfaces and clothes, raising bills and labor",
                    "None, cheap detergents have no hidden costs",
                    "They make rooms look larger",
                    "They make people sleep longer"
                ],
                answer: 0,
                tip: "Diluted detergents leave powdery white residues, forcing you to run extra rinse cycles. Chook cleans cleanly and rinses off in one go."
            },
            // --- LEVEL 5: Expert (Chook Champion) ---
            {
                category: "Home Hygiene (Expert)",
                question: "What is the most hygienic way to sanitize cutting boards used for raw meat in the kitchen?",
                options: [
                    "Wipe with a damp sponge only",
                    "Scrub with hot water, salt, and lemon, or use a food-safe botanical disinfectant to prevent cross-contamination",
                    "Soak in laundry fabric softener",
                    "Leave under sunlight for five minutes"
                ],
                answer: 1,
                tip: "Raw meat harbors salmonella bacteria. Cleaning meat-boards with natural lemon and salt or safe disinfectants keeps food prep areas safe."
            },
            {
                category: "Smart Saving (Expert)",
                question: "How much water is saved per minute by turning off the tap while scrubbing dishes or brushing teeth?",
                options: [
                    "Less than 1 liter",
                    "About 2 liters",
                    "Between 6 and 12 liters of clean water per minute",
                    "Exactly 50 liters"
                ],
                answer: 2,
                tip: "Running taps waste thousands of liters of clean water yearly. Turning off the tap while scrubbing is a simple, massive saving."
            },
            {
                category: "Ecology (Expert)",
                question: "What is the primary benefit of Chook's hyper-concentrated 'refill' (spare bag) concept?",
                options: [
                    "Refills are easier to carry in a handbag",
                    "They reduce plastic waste by up to 75% and are 40% cheaper because you do not pay for a new plastic pump and bottle",
                    "They look more colorful",
                    "They contain liquid candy"
                ],
                answer: 1,
                tip: "Refill packs use minimal plastic and zero heavy pumps. By reusing your original Chook spray bottle, you save both money and the planet!"
            },
            {
                category: "Quality Economics (Expert)",
                question: "What is the long-term compounding benefit of choosing non-toxic, eco-friendly cleaning products for your household?",
                options: [
                    "It only saves a few pennies a year",
                    "It protects family health, extends the lifespan of home surfaces and appliances, saves energy, and leaves a clean future",
                    "It ensures you never have to clean your house again",
                    "It makes your house glow in the dark"
                ],
                answer: 1,
                tip: "Choosing Chook Clean is a holistic win-win. You invest in family health, preserve your home assets, and save water/energy."
            },
            {
                category: "Chook Philosophy (Expert)",
                question: "Which of the following values lies at the very heart of the Chook Temiz brand philosophy?",
                options: [
                    "Creating heavy, chemical-scented products for short-term gloss",
                    "Providing joyful, nature-inspired, skin-safe, and highly concentrated eco-friendly cleaning for a sustainable future",
                    "Selling expensive electronic appliances",
                    "Making cleaning as boring and tiring as possible"
                ],
                answer: 1,
                tip: "Chook Clean is your happy, eco-friendly cleaning partner! We believe cleaning should be joyful, safe, and kind to all living beings."
            }
        ],
        memory_levels: [
            { level: 1, grid: { r: 2, c: 2 }, timer: 25, movesLimit: null, title: "Warm Up", desc: "Prepare your mind for cleaning! Quickly match 4 cards." },
            { level: 2, grid: { r: 2, c: 3 }, timer: 30, movesLimit: null, title: "Microfiber Touch", desc: "6 cards. Be as fast and practical as Chook microfiber cloths!" },
            { level: 3, grid: { r: 2, c: 4 }, timer: 35, movesLimit: null, title: "Lemon Freshness", desc: "8 cards. Refresh your mind with lemon scent and match pairs." },
            { level: 4, grid: { r: 3, c: 4 }, timer: 45, movesLimit: null, title: "Dish Foam", desc: "12 cards. Find the matching pairs hidden behind bubbles." },
            { level: 5, grid: { r: 3, c: 4 }, timer: 40, movesLimit: 22, title: "Moves Limit!", desc: "12 cards. Watch out, your move limit has started!" },
            { level: 6, grid: { r: 4, c: 4 }, timer: 60, movesLimit: 32, title: "Practical Hygiene", desc: "16 cards. A sparkling memory workout with Chook Clean." },
            { level: 7, grid: { r: 4, c: 4 }, timer: 50, movesLimit: 26, title: "Kitchen Radiance", desc: "16 cards. Time is shrinking, moves are very valuable!" },
            { level: 8, grid: { r: 4, c: 5 }, timer: 75, movesLimit: 38, title: "Bathroom Sparkle", desc: "20 cards. A spotless visual intelligence display!" },
            { level: 9, grid: { r: 4, c: 5 }, timer: 60, movesLimit: 32, title: "Sensitive Laundry", desc: "20 cards. Focus like Chook's color-protector detergent!" },
            { level: 10, grid: { r: 4, c: 6 }, timer: 90, movesLimit: 48, title: "Eco Friendly", desc: "24 cards. Make ecological and smart moves!" },
            { level: 11, grid: { r: 4, c: 6 }, timer: 75, movesLimit: 40, title: "Crystal Clear", desc: "24 cards. Focus your mind with flawless clarity." },
            { level: 12, grid: { r: 4, c: 6 }, timer: 60, movesLimit: 34, title: "Stain Remover", desc: "24 cards. Be fast, time is getting tighter!" },
            { level: 13, grid: { r: 5, c: 6 }, timer: 120, movesLimit: 60, title: "Brain Foam", desc: "30 cards. A giant grid! Maximum concentration." },
            { level: 14, grid: { r: 5, c: 6 }, timer: 100, movesLimit: 52, title: "Flawless Clean", desc: "30 cards. A flawless memory just like Chook Clean." },
            { level: 15, grid: { r: 5, c: 6 }, timer: 80, movesLimit: 44, title: "Chook Champion", desc: "30 cards. You are at the top! Raise the memory championship cup." }
        ],
        word_pool: [
            { word: "CHOX", hint: "Chook Clean's cute mascot cat obsessed with cleanliness, spending half her waking hours grooming.", tip: "Cats spend nearly 50% of their waking hours cleaning themselves, their kittens, and partners. Mascot CHOX is a true hygiene expert!" },
            { word: "CLEAN", hint: "The state of our homes being hygienic, spotless, fresh, and bright.", tip: "A clean home is one of the most important supporters of a calm mind." },
            { word: "SOAP", hint: "A natural foaming cleanser loved for its liquid Arabic soap form in traditional cleaning.", tip: "Chook Liquid Arabic Soap offers traditional cleaning and shine on all surfaces without leaving marks." },
            { word: "BUBBLE", hint: "Light white bubbles formed when detergent mixes with water, making you feel the cleanliness.", tip: "Plenty of bubbles means happy cleaning! Chook detergents foam richly with just a small amount." },
            { word: "HYGIENE", hint: "A flawless standard of cleanliness free from bacteria and germs, protecting our health.", tip: "In high-touch areas like kitchens and bathrooms, Chook hygiene solutions provide superior protection." },
            { word: "NATURAL", hint: "Our preference for herbal and pure extracts instead of synthetic chemicals in our formulas.", tip: "Chook Clean products, with their natural ingredients inspired by nature, are safe for your pets." },
            { word: "LAUNDRY", hint: "Our clothes that we wash with sweet-smelling softeners and color-protecting detergents.", tip: "When washing laundry, Chook detergents keep colors as vibrant as the very first day." },
            { word: "SHINE", hint: "Glasses, mirrors, and floors reflecting light without dust, stains, or roughness.", tip: "Wiping dust with a microfiber cloth in circular motions keeps surfaces shiny for a long time." },
            { word: "LAVENDER", hint: "The relaxing fragrance extract obtained from the purple flower plant found in Chook cleaners.", tip: "Lavender scent creates a relaxing, stress-reducing, peaceful atmosphere in your home after cleaning." },
            { word: "CURTAIN", hint: "Window covers that beautify our rooms but absorb dust and pollen like a sponge.", tip: "Using Chook laundry detergent when washing curtains provides a pristine white and stainless look!" },
            { word: "SAVING", hint: "The act of using water, electricity, and detergent consciously to protect the household budget.", tip: "Small savings combine into massive household budget gains and a greener world!" },
            { word: "BUDGET", hint: "The art of keeping home economics in balance by planning our income and expenses.", tip: "Making a budget plan prevents unnecessary consumption and makes it easier for you to build savings." },
            { word: "LEMON", hint: "The fresh fruit extract with acidic power that strips away grease in Chook degreasers.", tip: "Lemon scent sharpens the mind and neutralizes heavy odors in the kitchen instead of just masking them." },
            { word: "DIRT", hint: "Unwanted layer accumulated on surfaces that disrupts hygiene and must be cleaned.", tip: "Accumulated dirt is a source of germs. A weekly cleaning routine with Chook prevents dirt from building up." },
            { word: "VEGAN", hint: "The fact that no animal-derived raw materials or tests are used in our product formulas.", tip: "Chook products are animal-friendly, filled with ecological ingredients that do not disrupt nature's balance." },
            { word: "FIBER", hint: "Microfiber cloth with fibers 100 times thinner than hair that pulls dust perfectly even without detergent.", tip: "To extend the life of microfiber cloths, you should wash them without using fabric softeners!" },
            { word: "RINSE", hint: "Purifying surfaces or clothes with clean water to remove detergent residues.", tip: "Thanks to Chook's easy-rinsing formula, you save up to 30% on water bills by rinsing faster." },
            { word: "LIME", hint: "The white scale left by hard tap water on heating elements and surfaces.", tip: "Cleaning scale residues extends the life of heaters and reduces energy waste to zero." },
            { word: "MAINTENANCE", hint: "Monthly cleaning done to extend the life of our appliances and lower our energy bills.", tip: "Machine maintenance saves heavily on electricity bills and prevents costly technical service charges." },
            { word: "HEALTH", hint: "Our most valuable asset protected by living in a hygienic and clean home.", tip: "Physical health is directly related to a clean environment and clean air to breathe." },
            { word: "CONCENTRATE", hint: "A highly concentrated formula that provides extreme cleaning with very low dosage.", tip: "By using concentrated products, you reduce packaging waste and protect your wallet." },
            { word: "PACKAGING", hint: "Protective containers that we reduce in volume using Chook refill packs to save nature.", tip: "By reducing plastic packaging use, we leave bluer oceans to future generations." },
            { word: "SPONGE", hint: "A porous tool that absorbs water and detergent when washing dishes, which must be replaced often.", tip: "Germs multiply when sponges stay damp. Squeeze and dry your sponge after every dishwashing session." },
            { word: "SPROUT", hint: "A fresh shoot representing the awakening of nature, greening, and our eco-friendly philosophy.", tip: "To leave a greener world for future generations, Chook is produced with an environmentally conscious philosophy." },
            { word: "ECZEMA", hint: "Dryness, itching, and skin disease caused by ph-incompatible harsh chemicals on the skin.", tip: "Chook dish liquid with glycerin protects your hands; its ph compatibility does not cause dryness or eczema." }
        ]
    }
};

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

// NOT: MEMORY_LEVELS dizisi artık I18N_DATA içinden çok dilli olarak dinamik yüklenmektedir.

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

// Dinamik Oyun İçi Çeviri Sözlüğü
const GAME_STRINGS = {
    tr: {
        memory_level_badge: "Seviye {0} - {1}",
        memory_win_title: "Seviye {0} Tamamlandı!",
        memory_win_sub: "Zihniniz Chook Temiz gibi parıldıyor!",
        memory_win_seclabel: "Kalan Süre",
        memory_win_secval: "{0} sn",
        memory_retry_btn: '<i class="fas fa-redo"></i> Yeniden',
        memory_levels_btn: '<i class="fas fa-th"></i> Seviyeler',
        memory_gameover_title: "Süre Doldu!",
        memory_gameover_sub_moves: "Maksimum hamle sınırını aştınız. Pes etmek yok!",
        memory_gameover_sub_time: "Zaman sınırına takıldınız. Odaklanarak daha hızlı olabilirsiniz!",
        memory_gameover_seclabel: "Kullanılan Hamle",
        memory_gameover_promo: "Zaman ve hamle sınırları zihinsel çevikliği destekler. Bir sonrakinde Chook Temiz ferahlığıyla dene!",
        memory_gameover_retry_btn: '<i class="fas fa-redo"></i> Tekrar Dene',
        
        trivia_win_title: "Yarışma Bitti!",
        trivia_win_sub: "Tebrikler! Soruları yanıtlayarak harika bilgiler öğrendin.",
        trivia_win_seclabel: "Doğru Sayısı",
        trivia_win_secval: "{0}/5",
        trivia_win_promo: "Chook Temiz olarak evlerinize hijyen, pratiklik ve neşe katmaya devam ediyoruz. Bizi takipte kalın!",
        
        puzzle_badge: "Yapboz ({0}x{0})",
        puzzle_win_title: "Yapboz Çözüldü!",
        puzzle_win_sub: "Tebrikler! {0}x{0} yapbozu başarıyla tamamladın!",
        puzzle_win_seclabel: "Hamle Sayısı",
        puzzle_win_promo: "Yapboz çözmek zihinsel görselleştirme ve mekansal zeka becerilerini geliştirir. Chook Temiz ile parlamaya devam et!",
        
        word_badge: "Kelime Avı ({0}/{1})",
        word_win_title: "Kelime Bulundu!",
        word_win_sub: "<strong>{0}</strong> kelimesini başarıyla birleştirdiniz!",
        word_win_seclabel: "Geçen Süre",
        word_win_secval: "{0} sn",
        
        advice_prefix: "Tavsiye",
        level_card_play: "Oyna"
    },
    en: {
        memory_level_badge: "Level {0} - {1}",
        memory_win_title: "Level {0} Completed!",
        memory_win_sub: "Your mind sparkles like Chook Clean!",
        memory_win_seclabel: "Time Remaining",
        memory_win_secval: "{0} sec",
        memory_retry_btn: '<i class="fas fa-redo"></i> Retry',
        memory_levels_btn: '<i class="fas fa-th"></i> Levels',
        memory_gameover_title: "Time's Up!",
        memory_gameover_sub_moves: "You exceeded the maximum moves limit. Don't give up!",
        memory_gameover_sub_time: "You ran out of time. Focus and try to be faster!",
        memory_gameover_seclabel: "Moves Used",
        memory_gameover_promo: "Time and moves limits support mental agility. Try with Chook Clean freshness next time!",
        memory_gameover_retry_btn: '<i class="fas fa-redo"></i> Try Again',
        
        trivia_win_title: "Quiz Finished!",
        trivia_win_sub: "Congratulations! You learned great information by answering questions.",
        trivia_win_seclabel: "Correct Answers",
        trivia_win_secval: "{0}/5",
        trivia_win_promo: "As Chook Clean, we continue to bring hygiene, practical tips, and joy to your homes. Stay tuned!",
        
        puzzle_badge: "Puzzle ({0}x{0})",
        puzzle_win_title: "Puzzle Solved!",
        puzzle_win_sub: "Congratulations! You solved the {0}x{0} puzzle successfully!",
        puzzle_win_seclabel: "Moves Count",
        puzzle_win_promo: "Solving puzzles improves mental visualization and spatial intelligence. Keep sparkling with Chook Clean!",
        
        word_badge: "Word Connect ({0}/{1})",
        word_win_title: "Word Found!",
        word_win_sub: "You connected the word <strong>{0}</strong> successfully!",
        word_win_seclabel: "Time Elapsed",
        word_win_secval: "{0} sec",
        
        advice_prefix: "Advice",
        level_card_play: "Play"
    }
};

function getGameStr(key, ...args) {
    const lang = currentLanguage || "tr";
    let str = (GAME_STRINGS[lang] && GAME_STRINGS[lang][key]) || (GAME_STRINGS["tr"] && GAME_STRINGS["tr"][key]) || "";
    args.forEach((val, idx) => {
        str = str.replace(`{${idx}}`, val);
    });
    return str;
}

// Dinamik Dil Değiştirme ve Çeviri Fonksiyonları
function applyLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("chook_lang", lang);

    // Global veri havuzlarını güncelle
    TRIVIA_QUESTIONS = I18N_DATA[lang].trivia_questions;
    MEMORY_LEVELS = I18N_DATA[lang].memory_levels;
    WORD_POOL = I18N_DATA[lang].word_pool;
    TRIVIA_LEVELS = I18N_DATA[lang].trivia_levels;

    // HTML dil özniteliğini güncelle
    document.documentElement.lang = lang;

    const langText = document.getElementById("current-lang-text");
    if (langText) {
        langText.textContent = lang.toUpperCase();
    }

    // data-i18n öznitelikli elemanları çevir
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (I18N_DATA[lang].ui && I18N_DATA[lang].ui[key] !== undefined) {
            el.innerHTML = I18N_DATA[lang].ui[key];
        }
    });

    // Eğer şu an "levels" ekranındaysak, seviye seçme ekranını yenileyelim
    if (activeScreen === "levels") {
        renderLevelsScreen();
    }
    
    // Yapboz kurulum ekranındaysak, kurulum ayarlarını yenileyelim
    if (activeScreen === "puzzle-setup") {
        initPuzzleSetupScreen();
    }
}

function toggleLanguage() {
    const nextLang = currentLanguage === "tr" ? "en" : "tr";
    applyLanguage(nextLang);
}

// Arayüz Başlangıç Ayarları
function initUI() {
    // Toplam skoru ekrana yaz
    document.getElementById("player-score").textContent = playerTotalScore;
    
    // Temayı yükle (LocalStorage'dan)
    const savedTheme = localStorage.getItem("chook_theme") || "lavender-theme";
    document.body.className = savedTheme;

    // Dili yükle ve uygula
    applyLanguage(currentLanguage);
}

// 5. ETKİNLİK DİNLEYİCİLERİ (EVENT LISTENERS)
function setupEventListeners() {
    // Dil Değiştirme Butonu
    const langBtn = document.getElementById("lang-toggle-btn");
    if (langBtn) {
        langBtn.addEventListener("click", toggleLanguage);
    }

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
                statusHTML = `<span class="level-status">${getGameStr("level_card_play")}</span>`;
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
    document.getElementById("memory-level-badge").textContent = getGameStr("memory_level_badge", lvlCfg.level, lvlCfg.title);

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

    retryBtn.innerHTML = getGameStr("memory_retry_btn");
    homeBtn.innerHTML = getGameStr("memory_levels_btn");

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
            title: getGameStr("memory_win_title", currentSelectedLevel),
            subtitle: `<div style="margin-bottom: 8px;">${getGameStr("memory_win_sub")}</div><div class="stars-display" style="display:flex; justify-content:center; align-items:center; margin-top:8px;">${starsHTML}</div>`,
            score: `+${totalWinPoints}`,
            secLabel: getGameStr("memory_win_seclabel"),
            secVal: getGameStr("memory_win_secval", memoryTimeRemaining),
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

    retryBtn.innerHTML = getGameStr("memory_gameover_retry_btn");
    homeBtn.innerHTML = getGameStr("memory_levels_btn");

    showResultModal({
        title: getGameStr("memory_gameover_title"),
        subtitle: lvlCfg.movesLimit && memoryMoves >= lvlCfg.movesLimit 
            ? getGameStr("memory_gameover_sub_moves") 
            : getGameStr("memory_gameover_sub_time"),
        score: "+0",
        secLabel: getGameStr("memory_gameover_seclabel"),
        secVal: `${memoryMoves}`,
        promo: getGameStr("memory_gameover_promo")
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

    showResultModal({
        title: getGameStr("trivia_win_title"),
        subtitle: getGameStr("trivia_win_sub"),
        score: `+${triviaScore}`,
        secLabel: getGameStr("trivia_win_seclabel"),
        secVal: getGameStr("trivia_win_secval", triviaScore / 50),
        promo: getGameStr("trivia_win_promo")
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
    document.getElementById("result-promo-text").innerHTML = `<strong>${getGameStr("advice_prefix")}:</strong> ${config.promo}`;

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
    document.getElementById("puzzle-title-badge").textContent = getGameStr("puzzle_badge", puzzleGridSize);

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
                title: getGameStr("puzzle_win_title"),
                subtitle: `<div style="margin-bottom: 8px;">${getGameStr("puzzle_win_sub", puzzleGridSize)}</div>`,
                score: `+${pointsEarned}`,
                secLabel: getGameStr("puzzle_win_seclabel"),
                secVal: `${puzzleMoves}`,
                promo: getGameStr("puzzle_win_promo"),
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

// NOT: WORD_POOL dizisi artık I18N_DATA içinden çok dilli olarak dinamik yüklenmektedir.

// Kelime Avı Oyununu Başlat
function startWordGame() {
    // Kelime havuzunu orijinal dil verisinden kopyalayıp her yeni oyunda taze bir şekilde karıştır
    WORD_POOL = shuffleArray([...I18N_DATA[currentLanguage].word_pool]);
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
    document.getElementById("word-title-badge").textContent = getGameStr("word_badge", index + 1, WORD_POOL.length);
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
            const letterObj = wordLetters.find(l => l.poolIndex === poolIndex);
            slotDiv.textContent = letterObj ? letterObj.char : "";
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

function handlePoolLetterClick(poolIndex) {
    if (isWordCompleted) return;

    const letterObj = wordLetters.find(l => l.poolIndex === poolIndex);
    if (!letterObj || letterObj.isUsed) return;

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
        const letterObj = wordLetters.find(l => l.poolIndex === poolIndex);
        if (letterObj) letterObj.isUsed = false;
        wordUserSelections.splice(slotIndex, 1);

        renderWordSlots();
        renderLettersPool();
    }
}

// Harfleri Karıştır Butonu
function shufflePoolLetters() {
    if (isWordCompleted) return;

    // Sadece kullanılmamış harflerin dizi pozisyonlarını (indices) ve kendilerini alalım
    const unusedIndices = [];
    const unusedLetters = [];

    wordLetters.forEach((letter, index) => {
        if (!wordUserSelections.includes(letter.poolIndex)) {
            unusedIndices.push(index);
            unusedLetters.push(letter);
        }
    });

    if (unusedLetters.length <= 1) return; // Karıştıracak yeterli harf yoksa çık

    // Harfleri kendi aralarında karıştır
    let shuffledLetters = [...unusedLetters];
    let attempts = 0;
    while (attempts < 10) {
        shuffleArray(shuffledLetters);
        if (shuffledLetters.some((l, i) => l.poolIndex !== unusedLetters[i].poolIndex)) {
            break;
        }
        attempts++;
    }

    // Karıştırılan harfleri orijinal dizi pozisyonlarına yerleştir
    const newLetters = [...wordLetters];
    unusedIndices.forEach((arrayIdx, i) => {
        newLetters[arrayIdx] = shuffledLetters[i];
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
    const userWord = wordUserSelections.map(idx => {
        const letterObj = wordLetters.find(l => l.poolIndex === idx);
        return letterObj ? letterObj.char : "";
    }).join("").toUpperCase();
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
                title: getGameStr("word_win_title"),
                subtitle: `<div style="margin-bottom: 8px;">${getGameStr("word_win_sub", correctWord)}</div>`,
                score: `+${pointsEarned}`,
                secLabel: getGameStr("word_win_seclabel"),
                secVal: getGameStr("word_win_secval", wordTimer),
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

// ==========================================================================
// SOSYAL MEDYA PAYLAŞIM MANTIĞI (SOCIAL MEDIA SHARING ENGINE)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const shareFab = document.getElementById("social-share-fab");
    const shareTray = document.getElementById("social-share-tray");
    const shareClose = document.getElementById("social-share-close");
    const shareToast = document.getElementById("share-toast");

    if (!shareFab || !shareTray) return;

    // Menüyü Aç / Kapat
    shareFab.addEventListener("click", (e) => {
        e.stopPropagation();
        shareTray.classList.toggle("active");
    });

    shareClose.addEventListener("click", () => {
        shareTray.classList.remove("active");
    });

    // Dışarı tıklayınca tepsiyi kapat
    document.addEventListener("click", (e) => {
        if (!shareTray.contains(e.target) && e.target !== shareFab && !shareFab.contains(e.target)) {
            shareTray.classList.remove("active");
        }
    });

    // Paylaşım Bilgilerini Belirle (Skora ve aktif ekrana göre dinamik)
    function getShareData() {
        const url = "https://oyun.chooktemiz.com/?utm_source=share";
        let text = "Chook Temiz Zeka Dünyası'nda eğlenceli temizlik zeka oyunları oynuyorum! Sen de sevimli kedi CHOX ile yarışmaya katıl: " + url;
        
        // Eğer oyuncu bir oyundaysa veya skoru varsa metni zenginleştir
        if (playerTotalScore > 0) {
            text = `Chook Temiz Zeka Dünyası'nda sevimli kedi CHOX ile zeka oyunları oynuyorum! Toplamda ${playerTotalScore} puan kazandım! Sen de bana katıl ve zihnini test et: ${url}`;
        }
        
        return { url, text };
    }

    // WhatsApp Paylaş
    document.getElementById("share-whatsapp").addEventListener("click", () => {
        const { text } = getShareData();
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
        shareTray.classList.remove("active");
    });

    // Twitter/X Paylaş
    document.getElementById("share-twitter").addEventListener("click", () => {
        const { text } = getShareData();
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(twitterUrl, "_blank");
        shareTray.classList.remove("active");
    });

    // Facebook Paylaş
    document.getElementById("share-facebook").addEventListener("click", () => {
        const { url, text } = getShareData();
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        window.open(facebookUrl, "_blank");
        shareTray.classList.remove("active");
    });

    // Link Kopyala (Toast Bildirimli)
    document.getElementById("share-copy").addEventListener("click", () => {
        const { url } = getShareData();
        navigator.clipboard.writeText(url).then(() => {
            // Toast Bildirimi Göster
            shareToast.classList.add("active");
            setTimeout(() => {
                shareToast.classList.remove("active");
            }, 2500);
        }).catch(err => {
            console.error("Kopyalama hatası:", err);
        });
        shareTray.classList.remove("active");
    });
});

