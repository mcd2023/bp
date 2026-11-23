
document.addEventListener("DOMContentLoaded", () => {
  // 1. Sayfa içi bağlantılarda yumuşak kaydırma
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      let targetId;

      try {
        targetId = decodeURIComponent(href.slice(1));
      } catch {
        return;
      }

      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      // Mobil menüyü kapat
      const mobileMenu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("mobile-menu-btn");

      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("is-open");
      }

      if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  // 2. Mobil menü
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("is-open");

      mobileMenu.classList.toggle("is-open", isOpen);
      mobileMenu.classList.toggle("hidden", !isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // 3. WhatsApp bağlantıları
  document.querySelectorAll("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const href = button.getAttribute("href");

      // Geçerli bir WhatsApp bağlantısı varsa varsayılan davranışı koru
      if (href && href !== "#") return;

      event.preventDefault();

      const message =
        button.dataset.message ||
        "Merhaba Bahar, web tasarım hizmetleriniz hakkında bilgi almak istiyorum.";

      const whatsappUrl =
        "https://wa.me/905078747215?text=" +
        encodeURIComponent(message);

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  });

  // 4. Footer yılını otomatik güncelle
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 5. Dil seçimi ve sayfa yönlendirme
  const languageSelect = document.getElementById("language-select");

  if (languageSelect) {
    const path = window.location.pathname;

    // Açık olan sayının dilini seçicide göster
    if (/\/en(?:\/|\.html)?$/.test(path)) {
      languageSelect.value = "en";
    } else if (/\/de(?:\/|\.html)?$/.test(path)) {
      languageSelect.value = "de";
    } else {
      languageSelect.value = "tr";
    }

    languageSelect.addEventListener("change", () => {
      const destinations = {
        tr: "/",
        en: "/en/",
        de: "/de/"
      };

      const destination = destinations[languageSelect.value];

      if (destination) {
        window.location.assign(destination);
      }
    });
  }

  // Tanıtımı oturum başına bir kez göster. Açıldığında odak yerinde kalır.
  const promotion = document.querySelector("[data-promotion]");
  if (promotion) {
    const storageKey = "bahar-pala-promotion-seen";
    let seen = false;

    try {
      seen = sessionStorage.getItem(storageKey) === "1";
    } catch {
      // Depolama engellendiğinde tanıtım bu sayfada çalışmaya devam eder.
    }

    if (!seen) {
      const closeButton = promotion.querySelector("[data-promotion-close]");
      const closePromotion = () => {
        const hadFocus = promotion.contains(document.activeElement);
        promotion.hidden = true;

        if (hadFocus) {
          document.querySelector(".logo")?.focus({ preventScroll: true });
        }
      };

      closeButton.addEventListener("click", closePromotion);
      promotion.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closePromotion();
      });

      window.setTimeout(() => {
        promotion.hidden = false;

        try {
          sessionStorage.setItem(storageKey, "1");
        } catch {
          // Depolama erişimi tanıtımın görünmesini engellemez.
        }
      }, 4500);
    }
  }

  const reviews = document.querySelector("[data-review-carousel]");
  if (reviews) {
    const cards = Array.from(reviews.querySelectorAll(".review-card"));
    const controls = reviews.querySelector(".review-controls");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let manual = false;

    const show = (step) => {
      current = (current + step + cards.length) % cards.length;
      cards.forEach((card, index) => {
        card.hidden = index !== current;
      });
    };

    show(0);
    controls.hidden = false;
    controls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-review-step]");
      if (!button) return;
      manual = true;
      show(Number(button.dataset.reviewStep));
    });

    window.setInterval(() => {
      if (!manual && !motion.matches && !document.hidden &&
          !reviews.matches(":hover, :focus-within")) {
        show(1);
      }
    }, 6500);
  }
});
