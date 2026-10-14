
document.addEventListener("DOMContentLoaded", () => {
  // 1. Sayfa içi bağlantılarda yumuşak kaydırma
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.getElementById(
        decodeURIComponent(href.slice(1))
      );

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

      // Mobil menüyü bağlantıya tıklandığında kapat
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
      const isOpen = mobileMenu.classList.toggle("is-open");

      mobileMenu.classList.toggle("hidden", !isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // 3. WhatsApp bağlantıları
  document.querySelectorAll("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Bağlantı zaten href içeriyorsa normal davranışı kullan
      const href = button.getAttribute("href");

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

  // 5. Dil seçicisi için erişilebilirlik
 document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language-select");

  if (!languageSelect) return;

  const path = window.location.pathname;

  if (path.startsWith("/en/")) {
    languageSelect.value = "en";
  } else if (path.startsWith("/de/")) {
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

    window.location.href = destinations[languageSelect.value];
  });
});
    });
  });
});
