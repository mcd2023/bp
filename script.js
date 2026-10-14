document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

Mevcut script.js dosyanı çok dilli SEO altyapısı ve müşteri kazanımı hedefin için geliştirebiliriz. Mevcut kodun yumuşak kaydırma özelliğini koruyarak dil seçimi, mobil menü ve iletişim dönüşümleri için JavaScript ekleyebiliriz.

Ancak önemli bir ayrım var: Dil seçimi ve SEO için kalıcı /tr/ ve /en/ URL'leri oluşturmak yalnızca JavaScript ile tamamlanmaz. Her dil için ayrı HTML sayfaları ve doğru SEO etiketleri de gerekir.

1. Güncellenmiş script.js

Aşağıdaki kod, mevcut kodunun yerine geçebilir. Sayfada bulunmayan bir özelliği kullanmaya çalışmaz; ilgili HTML öğesi varsa çalışır.


document.addEventListener("DOMContentLoaded", () => {
  // 1. Sayfa içi bağlantılarda yumuşak kaydırma
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Mobil menü açıksa bağlantıya tıklanınca kapat
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  // 2. Mobil menü
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");

      mobileMenuBtn.setAttribute(
        "aria-expanded",
        String(!isHidden)
      );
    });
  }

  // 3. WhatsApp iletişim bağlantıları
  document.querySelectorAll("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", () => {
      const message =
        "Merhaba Bahar, web tasarım hizmetleriniz hakkında bilgi almak istiyorum.";

      const whatsappUrl =
        "https://wa.me/905078747215?text=" +
        encodeURIComponent(message);

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  });

  // 4. Yıl bilgisini otomatik güncelle
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
2. HTML'de yapılacak küçük değişiklikler

Mobil menü düğmene şu erişilebilirlik niteliğini ekle:

<button
  id="mobile-menu-btn"
  aria-label="Menüyü aç veya kapat"
  aria-controls="mobile-menu"
  aria-expanded="false"
>
  ☰
</button>

WhatsApp bağlantına otomatik mesaj özelliği eklemek istersen:

<a
  href="https://wa.me/905078747215"
  data-whatsapp
  target="_blank"
  rel="noopener noreferrer"
>
  WhatsApp'tan Ulaş
</a>

Footer'daki yılı otomatik yapmak için:

<span>© <span id="current-year">2026</span> Bahar Pala · Web Tasarım & Front-End</span>
3. SEO için sonraki adım

Öncelikle sitenin Türkçe ve İngilizce sürümlerini ayrı dosyalarla hazırlamanı öneriyorum:

/
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── tr/
│   └── index.html
└── en/
    └── index.html

Böylece /tr/ ve /en/ adresleri için ayrı başlıklar, açıklamalar, canonical URL'ler ve karşılıklı hreflang etiketleri kullanılabilir. Diğer dilleri içerikleri hazır olduğunda ekleyebilirsin.

Not: SEO etiketleri tek başına Google'da ilk sırayı garanti etmez. Özgün hizmet sayfaları, teknik kalite ve gerçek müşteri projeleri de önemlidir.

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:Inter,sans-serif;color:#17151a;background:#fbfaf9;line-height:1.6}.header{height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 7%;position:sticky;top:0;z-index:20;background:rgba(15,18,27,.94);backdrop-filter:blur(15px);color:#fff}.logo{font-size:26px;font-weight:800;color:#ffb0aa;text-decoration:none}.header nav{display:flex;gap:28px}.header nav a{color:#eee;text-decoration:none;font-size:14px}.cv-btn,.btn{border-radius:12px;padding:12px 20px;text-decoration:none;font-weight:600}.cv-btn{background:#ffaaa3;color:#17151a;font-size:14px}.hero{min-height:640px;padding:90px 7%;display:grid;grid-template-columns:1fr 1fr;align-items:center;background:radial-gradient(circle at 80% 20%,#373141,#0e1119 60%);color:#fff;overflow:hidden}.hero-content{max-width:650px}.eyebrow{color:#ffaaa3;font-size:13px;font-weight:700;letter-spacing:3px}.hero h1{font-size:clamp(48px,6vw,78px);line-height:1.03;margin:18px 0}.hero h1 span{font-family:"Playfair Display",serif;color:#ffb4ae}.hero p{font-size:18px;color:#d6d3d7;max-width:620px}.hero-actions{display:flex;gap:14px;margin-top:32px}.primary{background:#ffaaa3;color:#17151a}.secondary{border:1px solid #777;color:#fff}.hero-card{display:flex;justify-content:center}.code-window{width:min(520px,100%);min-height:300px;border-radius:22px;padding:55px 32px 30px;background:linear-gradient(145deg,#202331,#10131c);box-shadow:0 30px 80px rgba(0,0,0,.45);border:1px solid #3c3e4a;transform:rotate(2deg)}.window-top{display:flex;gap:8px;position:absolute;top:22px}.window-top i{width:11px;height:11px;border-radius:50%;background:#777}.code-line{font-family:monospace;font-size:17px;color:#ddd;margin:18px 0}.code-line span{color:#ffaaa3}.code-line.accent{color:#8dd4b2}.section{padding:95px 7%;max-width:1400px;margin:auto}.section-title{display:flex;align-items:center;gap:15px;margin-bottom:45px}.section-title span{color:#e58c84;font-weight:800}.section-title h2{font-size:38px}.about-grid{display:grid;grid-template-columns:1.3fr .7fr;gap:70px}.lead{font-size:23px;font-weight:600;margin-bottom:18px}.contact-mini{display:flex;gap:24px;flex-wrap:wrap;margin-top:30px;font-size:14px}.contact-mini a{color:#b05d56}.stats{display:grid;grid-template-columns:1fr 1fr;gap:14px}.stats div{padding:25px;border-radius:18px;background:#fff1ef;border:1px solid #f2d5d0}.stats strong{display:block;font-size:26px}.stats span{font-size:13px;color:#666}.skills{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.skill{padding:25px;background:#fff;border:1px solid #e9e5e3;border-radius:18px;transition:.25s}.skill:hover,.project:hover{transform:translateY(-5px);box-shadow:0 15px 35px rgba(20,15,20,.08)}.skill b{font-size:20px;display:block}.skill span{font-size:13px;color:#777}.project-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}.project{background:#fff;border:1px solid #e7e3e1;border-radius:20px;overflow:hidden;transition:.25s}.project-image{height:220px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:30px;font-weight:800}.chefco{background:linear-gradient(135deg,#171717,#7b3d2e)}.merci{background:linear-gradient(135deg,#2d2018,#9b6237)}.piano{background:linear-gradient(135deg,#10131c,#40577c)}.alka{background:linear-gradient(135deg,#203b44,#bd7f65)}.project-info{padding:22px}.project-info h3{font-size:21px}.project-info p{color:#666}.project-info span{font-size:12px;color:#a35e57}.contact{background:#11141d;color:#fff;max-width:none;padding-left:7%;padding-right:7%}.contact .section-title h2{color:#fff}.contact .lead{color:#ddd}.contact-buttons{display:flex;gap:18px;margin-top:28px}.contact-card{display:flex;align-items:center;gap:16px;padding:18px 24px;border-radius:15px;text-decoration:none;color:#fff;border:1px solid #454855;min-width:280px}.contact-card span{display:flex;flex-direction:column}.contact-card small{color:#aaa}.whatsapp{border-color:#3d9d70}.email{border-color:#b96f68}footer{padding:30px 7%;background:#0b0d13;color:#aaa;display:flex;justify-content:space-between;align-items:center;font-size:13px}footer strong{color:#ffaaa3;font-size:22px}footer a{color:#fff;text-decoration:none}@media(max-width:800px){.header{padding:0 5%}.header nav{display:none}.hero{grid-template-columns:1fr;padding:70px 6%;min-height:auto}.hero-card{margin-top:45px}.hero h1{font-size:50px}.section{padding:70px 6%}.about-grid,.project-grid{grid-template-columns:1fr}.skills{grid-template-columns:1fr 1fr}.contact-buttons{flex-direction:column}.contact-card{min-width:0}footer{flex-direction:column;gap:12px;text-align:center}}@media(max-width:480px){.skills{grid-template-columns:1fr}.hero-actions{flex-direction:column}.hero-actions .btn{text-align:center}.cv-btn{display:none}}

Bu CSS dosyan mevcut portfolyonun tasarımını oluşturuyor. Koyu lacivert arka plan, mercan pembe vurgular, kart tasarımları ve mobil uyumluluk korunmalı. SEO ve uluslararası müşteri kazanımı için CSS tarafında birkaç iyileştirme yapabiliriz.

1. Mevcut CSS kodunun en altına ekle

Bu eklemeler mobil kullanım, erişilebilirlik, bağlantılar ve sayfa içi gezinmeyi iyileştirir. Mevcut tasarımı baştan yazman gerekmez.


/* SEO ve kullanıcı deneyimi iyileştirmeleri */

/* Sabit başlık altında kalan bölümleri görünür tut */
section[id] {
  scroll-margin-top: 90px;
}

/* Klavye ile gezinme için görünür odak */
a:focus-visible,
button:focus-visible {
  outline: 3px solid #ffaaa3;
  outline-offset: 4px;
}

/* Bağlantılarda yumuşak geçiş */
.header nav a,
.contact-card,
.cv-btn,
.btn {
  transition:
    color 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.header nav a:hover {
  color: #ffb4ae;
}

.contact-card:hover {
  border-color: #ffaaa3;
  transform: translateY(-3px);
}

/* Proje kartlarındaki bağlantıların görünürlüğü */
.project-image {
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.project-image:focus-visible {
  outline: 3px solid #ffaaa3;
  outline-offset: -5px;
}

/* Uzun e-posta adreslerinin mobilde taşmasını önle */
.contact-card,
.contact-mini a {
  overflow-wrap: anywhere;
}

/* Hareket azaltma tercihlerine uy */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Küçük mobil ekranlar */
@media (max-width: 360px) {
  .hero h1 {
    font-size: 42px;
  }

  .section-title h2 {
    font-size: 30px;
  }

  .contact-card {
    padding: 16px;
  }
}
2. SEO açısından önemli nokta

CSS, Google'da üst sıralara çıkmanı tek başına sağlamaz. Asıl önemli düzenlemeler HTML dosyasında yapılır:

Her sayfaya özgün title ve meta description.

Türkçe ve İngilizce sayfalar için doğru canonical ve hreflang.

Gerçek hizmetlerini açıklayan içerikler.

Proje bağlantılarının çalışması ve anlamlı bağlantı metinleri.

Görseller için açıklayıcı alt metinleri.

Mobil performans ve erişilebilirlik.

Google Fonts kullanımı da ilk yükleme performansını etkileyebilir. Daha iyi performans için fontları yerel olarak barındırmayı veya yalnızca kullanılan ağırlıkları yüklemeyi değerlendirebilirsin.

Önerim: Bir sonraki adımda index.html dosyanı SEO bakımından tamamlayalım; ardından /en/ İngilizce sayfasını, robots.txt ve sitemap.xml dosyalarını hazırlayalım. Böylece tasarımını koruyarak arama motorlarına yönelik asıl düzenlemeleri tamamlarız.

bana son hallerini ver

Aşağıda portfolyon için CSS dosyasının son hâlini, mevcut tasarımını koruyarak ve mobil uyumluluk, erişilebilirlik, hover efektleri ve sayfa içi gezinme iyileştirmeleri ekleyerek hazırladım.

style.css dosyanın içindeki eski kodları tamamen sil ve aşağıdaki kodun tamamını yapıştır.

1. style.css — Tam ve güncel sürüm

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');

/* ========================================
   1. GENEL AYARLAR
======================================== */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  font-family: 'Inter', sans-serif;
  color: #17151a;
  background: #fbfaf9;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  -webkit-tap-highlight-color: transparent;
}

button,
input,
textarea {
  font: inherit;
}

button,
a {
  touch-action: manipulation;
}

section[id] {
  scroll-margin-top: 90px;
}

/* Klavye ile gezinme */
a:focus-visible,
button:focus-visible {
  outline: 3px solid #ffaaa3;
  outline-offset: 4px;
}

/* ========================================
   2. ÜST MENÜ
======================================== */

.header {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 12px 7%;
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(15, 18, 27, 0.96);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  color: #fff;
}

.logo {
  font-size: 26px;
  font-weight: 800;
  color: #ffb0aa;
  text-decoration: none;
  flex-shrink: 0;
}

.header nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.header nav a {
  color: #eee;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.25s ease;
}

.header nav a:hover {
  color: #ffb4ae;
}

.cv-btn,
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 12px 20px;
  text-decoration: none;
  font-weight: 600;
  transition:
    color 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.cv-btn {
  background: #ffaaa3;
  color: #17151a;
  font-size: 14px;
  white-space: nowrap;
}

.cv-btn:hover,
.btn.primary:hover {
  background: #ffc2bc;
  transform: translateY(-2px);
}

/* ========================================
   3. ANA EKRAN
======================================== */

.hero {
  min-height: 640px;
  padding: 90px 7%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: 48px;
  background:
    radial-gradient(circle at 80% 20%, #373141, transparent 50%),
    linear-gradient(135deg, #0e1119, #171521);
  color: #fff;
  overflow: hidden;
}

.hero-content {
  max-width: 650px;
}

.eyebrow {
  color: #ffaaa3;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 3px;
}

.hero h1 {
  font-size: clamp(48px, 6vw, 78px);
  line-height: 1.08;
  margin: 18px 0;
  letter-spacing: -2px;
}

.hero h1 span {
  font-family: 'Playfair Display', serif;
  color: #ffb4ae;
}

.hero p {
  font-size: 18px;
  color: #d6d3d7;
  max-width: 620px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.primary {
  background: #ffaaa3;
  color: #17151a;
}

.secondary {
  border: 1px solid #777;
  color: #fff;
  background: transparent;
}

.secondary:hover {
  border-color: #ffaaa3;
  color: #ffb4ae;
}

/* Kod penceresi */

.hero-card {
  display: flex;
  justify-content: center;
  min-width: 0;
}

.code-window {
  position: relative;
  width: min(520px, 100%);
  min-height: 300px;
  border-radius: 22px;
  padding: 55px 32px 30px;
  background: linear-gradient(145deg, #202331, #10131c);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  border: 1px solid #3c3e4a;
  transform: rotate(2deg);
}

.window-top {
  display: flex;
  gap: 8px;
  position: absolute;
  top: 22px;
  left: 32px;
}

.window-top i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #777;
}

.code-line {
  font-family: monospace;
  font-size: 17px;
  color: #ddd;
  margin: 18px 0;
  overflow-wrap: anywhere;
}

.code-line span {
  color: #ffaaa3;
}

.code-line.accent {
  color: #8dd4b2;
}

/* ========================================
   4. ORTAK BÖLÜM AYARLARI
======================================== */

.section {
  padding: 95px 7%;
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 45px;
}

.section-title > span {
  color: #b45e56;
  font-weight: 800;
}

.section-title h2 {
  font-size: clamp(30px, 4vw, 38px);
  line-height: 1.2;
}

.lead {
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 18px;
  line-height: 1.45;
}

/* ========================================
   5. HAKKIMDA
======================================== */

.about-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
  gap: 70px;
}

.contact-mini {
  display: flex;
  gap: 16px 24px;
  flex-wrap: wrap;
  margin-top: 30px;
  font-size: 14px;
}

.contact-mini a {
  color: #974c45;
  overflow-wrap: anywhere;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.stats div {
  padding: 25px;
  border-radius: 18px;
  background: #fff1ef;
  border: 1px solid #f2d5d0;
}

.stats strong {
  display: block;
  font-size: 26px;
}

.stats span {
  font-size: 13px;
  color: #666;
}

/* ========================================
   6. YETENEKLER
======================================== */

.skills {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.skill {
  padding: 25px;
  background: #fff;
  border: 1px solid #e9e5e3;
  border-radius: 18px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.skill:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(20, 15, 20, 0.08);
}

.skill b {
  font-size: 20px;
  display: block;
}

.skill span {
  font-size: 13px;
  color: #666;
}

/* ========================================
   7. PROJELER
======================================== */

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.project {
  background: #fff;
  border: 1px solid #e7e3e1;
  border-radius: 20px;
  overflow: hidden;
  min-width: 0;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.project:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(20, 15, 20, 0.08);
}

.project-image {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #fff;
  font-size: 30px;
  font-weight: 800;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: filter 0.25s ease;
}

.project-image:hover {
  filter: brightness(1.12);
}

.chefco {
  background: linear-gradient(135deg, #171717, #7b3d2e);
}

.merci {
  background: linear-gradient(135deg, #2d2018, #9b6237);
}

.piano {
  background: linear-gradient(135deg, #10131c, #40577c);
}

.alka {
  background: linear-gradient(135deg, #203b44, #bd7f65);
}

.project-info {
  padding: 22px;
}

.project-info h3 {
  font-size: 21px;
}

.project-info p {
  color: #555;
}

.project-info span {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  color: #974c45;
}

/* ========================================
   8. İLETİŞİM
======================================== */

.contact {
  background: #11141d;
  color: #fff;
  max-width: none;
  padding-left: 7%;
  padding-right: 7%;
}

.contact .section-title h2 {
  color: #fff;
}

.contact .lead {
  color: #ddd;
}

.contact-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 28px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  border-radius: 15px;
  text-decoration: none;
  color: #fff;
  border: 1px solid #454855;
  min-width: 280px;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}

.contact-card:hover {
  border-color: #ffaaa3;
  transform: translateY(-3px);
}

.contact-card > span {
  display: flex;
  flex-direction: column;
  overflow-wrap: anywhere;
}

.contact-card small {
  color: #c4c4c9;
}

.whatsapp {
  border-color: #3d9d70;
}

.email {
  border-color: #b96f68;
}

/* ========================================
   9. ALT BİLGİ
======================================== */

footer {
  padding: 30px 7%;
  background: #0b0d13;
  color: #c4c4c9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  font-size: 13px;
}

footer strong {
  color: #ffaaa3;
  font-size: 22px;
}

footer a {
  color: #fff;
  text-decoration: none;
}

footer a:hover {
  color: #ffb4ae;
}

/* ========================================
   10. TABLET VE MOBİL
======================================== */

@media (max-width: 1000px) {
  .header {
    padding-left: 5%;
    padding-right: 5%;
  }

  .header nav {
    gap: 16px;
  }

  .header nav a {
    font-size: 13px;
  }

  .hero {
    gap: 30px;
  }

  .about-grid {
    gap: 35px;
  }
}

@media (max-width: 800px) {
  .header {
    min-height: 70px;
    padding: 12px 6%;
  }

  .header nav {
    display: none;
  }

  .hero {
    grid-template-columns: minmax(0, 1fr);
    padding: 70px 6%;
    min-height: auto;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-card {
    margin-top: 25px;
  }

  .code-window {
    transform: none;
  }

  .hero h1 {
    font-size: clamp(44px, 9vw, 58px);
  }

  .section {
    padding: 70px 6%;
  }

  .about-grid,
  .project-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .skills {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-buttons {
    flex-direction: column;
  }

  .contact-card {
    min-width: 0;
    width: 100%;
  }

  footer {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero {
    padding-top: 55px;
    padding-bottom: 55px;
  }

  .hero h1 {
    font-size: 44px;
    letter-spacing: -1px;
  }

  .hero p {
    font-size: 16px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-actions .btn {
    width: 100%;
    text-align: center;
  }

  .cv-btn {
    display: none;
  }

  .section {
    padding: 60px 6%;
  }

  .section-title {
    margin-bottom: 30px;
  }

  .section-title h2 {
    font-size: 30px;
  }

  .lead {
    font-size: 20px;
  }

  .skills {
    grid-template-columns: minmax(0, 1fr);
  }

  .stats div {
    padding: 18px;
  }

  .stats strong {
    font-size: 22px;
  }

  .code-window {
    padding: 50px 20px 24px;
  }

  .window-top {
    left: 20px;
  }

  .code-line {
    font-size: 14px;
  }

  .project-image {
    min-height: 180px;
    font-size: 26px;
  }

  .contact-card {
    padding: 16px;
  }
}

@media (max-width: 360px) {
  .hero h1 {
    font-size: 38px;
  }

  .section-title h2 {
    font-size: 27px;
  }

  .stats {
    gap: 10px;
  }

  .stats div {
    padding: 14px;
  }
}

/* ========================================
   11. HAREKETİ AZALTMA TERCİHİ
======================================== */

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
2. Proje dosyalarının son yapısı

GitHub Pages üzerinde şu yapıyı kullanabilirsin:

portfolio/
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── og-image.jpg
│   └── projects/
├── tr/
│   └── index.html
└── en/
    └── index.html

tr/ ve en/ sayfalarını, içerikleri hazırlandıktan sonra yayınla. Henüz mevcut olmayan sayfalara hreflang veya sitemap kaydı ekleme.

3. Yayınlamadan önce kontrol et
CSS dosyasını style.css adıyla kaydet.
HTML'deki <link rel="stylesheet" href="style.css"> bağlantısını koru.
Mobil ve masaüstü görünümlerini kontrol et.
Menü, e-posta ve WhatsApp bağlantılarını test et.
Gerçek alan adını, canonical adresini ve sitemap kayıtlarını doğrula.
Google Search Console üzerinden sayfanın dizine eklenmesini kontrol et.

Önemli: Bu CSS güncellemesi tasarım ve kullanılabilirlik içindir; SEO'nun tamamlanması için HTML meta etiketleri, dil sayfaları, canonical, hreflang, robots.txt ve sitemap.xml ayrıca düzenlenmelidir. CSS tek başına arama sıralaması sağlamaz.

Daha akıllı yanıtlar al, dosyalar ve görseller yükle ve daha fazlasını yap.
Oturum aç
Ücretsiz kaydol
