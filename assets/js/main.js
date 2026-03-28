/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $main = $("#main");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Nav.
  var $nav = $("#nav");

  if ($nav.length > 0) {
    // Shrink effect.
    $main.scrollex({
      mode: "top",
      enter: function () {
        $nav.addClass("alt");
      },
      leave: function () {
        $nav.removeClass("alt");
      },
    });

    // Links.
    var $nav_a = $nav.find("a");

    $nav_a
      .scrolly({
        speed: 1000,
        offset: function () {
          return $nav.height();
        },
      })
      .on("click", function () {
        var $this = $(this);

        // External link? Bail.
        if ($this.attr("href").charAt(0) != "#") return;

        // Deactivate all links.
        $nav_a.removeClass("active").removeClass("active-locked");

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
        $this.addClass("active").addClass("active-locked");
      })
      .each(function () {
        var $this = $(this),
          id = $this.attr("href"),
          $section = $(id);

        // No section for this link? Bail.
        if ($section.length < 1) return;

        // Scrollex.
        $section.scrollex({
          mode: "middle",
          initialize: function () {
            // Deactivate section.
            if (browser.canUse("transition")) $section.addClass("inactive");
          },
          enter: function () {
            // Activate section.
            $section.removeClass("inactive");

            // No locked links? Deactivate all links and activate this section's one.
            if ($nav_a.filter(".active-locked").length == 0) {
              $nav_a.removeClass("active");
              $this.addClass("active");
            }

            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass("active-locked"))
              $this.removeClass("active-locked");
          },
        });
      });
  }

  // Scrolly.
  $(".scrolly").scrolly({
    speed: 1000,
  });
})(jQuery);

// ============================================
// ANIMATION DES COMPTEURS NOVARES
// ============================================
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value.toLocaleString("fr-FR");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Observer pour les compteurs
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        const element = entry.target;
        const endValue = parseInt(element.getAttribute("data-value"));
        element.classList.add("animated");
        animateCounter(element, 0, endValue, 2000);
        counterObserver.unobserve(element);
      }
    });
  },
  { threshold: 0.5 },
);

// ============================================
// ANIMATION FADE-IN POUR LES ÉLÉMENTS
// ============================================
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 },
);

// ============================================
// LIGHTBOX POUR LES CERTIFICATIONS
// ============================================
function openCertificate(src) {
  const viewer = document.getElementById("certificate-viewer");
  const img = document.getElementById("certificate-image");

  if (!viewer || !img) {
    console.error("Éléments de la lightbox non trouvés");
    return;
  }

  img.src = src;
  viewer.style.display = "block";

  setTimeout(() => {
    viewer.classList.add("is-open");
  }, 10);

  document.body.style.overflow = "hidden";
}

function closeCertificate() {
  const viewer = document.getElementById("certificate-viewer");
  const img = document.getElementById("certificate-image");

  viewer.classList.remove("is-open");

  setTimeout(() => {
    viewer.style.display = "none";
    if (img) img.src = "";
  }, 180);

  document.body.style.overflow = "auto";
}

function closeCertificateOnBackground(e) {
  if (e.target && e.target.id === "certificate-viewer") {
    closeCertificate();
  }
}

// ============================================
// GESTION DE LA MODALE RGPD
// ============================================
function openRgpdModal() {
  document.getElementById("rgpd-modal").style.display = "flex";
}

function closeRgpdModal() {
  document.getElementById("rgpd-modal").style.display = "none";
}

// ============================================
// INITIALISATION AU CHARGEMENT DU DOM
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialiser les compteurs
  document.querySelectorAll("[data-value]").forEach((el) => {
    counterObserver.observe(el);
  });

  // 2. Initialiser les éléments fade-in
  document.querySelectorAll(".fade-in").forEach((el) => {
    fadeObserver.observe(el);
  });

  // 3. Ajouter l'écouteur ESC pour la lightbox
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const viewer = document.getElementById("certificate-viewer");
      if (viewer && viewer.style.display !== "none") {
        closeCertificate();
      }
    }
  });

  // 4. Ajouter l'écouteur pour fermeture au clic sur overlay RGPD
  const rgpdModal = document.getElementById("rgpd-modal");
  if (rgpdModal) {
    rgpdModal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeRgpdModal();
      }
    });
  }
});
// ============================================
// ANIMATIONS AU SCROLL - AJOUTÉ PAR AURÉLIEN
// ============================================

(function () {
  "use strict";

  // Attendre que la page soit complètement chargée
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimations);
  } else {
    initAnimations();
  }

  function initAnimations() {
    // 1. Animation des sections au scroll
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ajouter la classe 'visible' à la section
            entry.target.classList.add("visible");

            // Animation spécifique pour les cartes dans cette section
            const cards = entry.target.querySelectorAll(
              ".cert-card, .project-card",
            );
            cards.forEach((card, index) => {
              card.style.transitionDelay = index * 0.1 + "s";
              card.classList.add("animated");
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    // Préparer les sections
    sections.forEach((section) => {
      section.classList.add("scroll-animation");
      observer.observe(section);
    });

    // 2. Animation au survol des cartes
    const cards = document.querySelectorAll(".cert-card, .project-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });

    // 3. Animation des compétences au survol
    const skillTags = document.querySelectorAll(".skill-tag");
    skillTags.forEach((tag) => {
      tag.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.05)";
      });

      tag.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });
    });

    console.log("Animations chargées avec succès !");
  }
})();
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const certCards = document.querySelectorAll(".cert-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Ajouter la classe active au bouton cliqué
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Filtrer les cartes
      certCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block";
        } else {
          const categories = card.getAttribute("data-category").split(" ");
          if (categories.includes(filterValue)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  console.log("Script de filtrage chargé");

  const filterButtons = document.querySelectorAll(".filter-btn");
  const certCards = document.querySelectorAll(".cert-card");

  console.log("Boutons trouvés:", filterButtons.length);
  console.log("Cartes trouvées:", certCards.length);

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Bouton cliqué:", this.textContent);

      // Retirer la classe active de tous les boutons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Ajouter la classe active au bouton cliqué
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");
      console.log("Filtre sélectionné:", filterValue);

      // Filtrer les cartes
      certCards.forEach((card) => {
        const categories = card.getAttribute("data-category");
        console.log(
          "Carte:",
          card.querySelector("h4").textContent,
          "Catégories:",
          categories,
        );

        if (filterValue === "all") {
          card.classList.remove("hidden");
          console.log("Afficher toutes les cartes");
        } else {
          if (categories && categories.includes(filterValue)) {
            card.classList.remove("hidden");
            console.log("Afficher la carte");
          } else {
            card.classList.add("hidden");
            console.log("Cacher la carte");
          }
        }
      });
    });
  });

  // Vérifier que les cartes ont bien l'attribut data-category
  certCards.forEach((card, index) => {
    if (!card.hasAttribute("data-category")) {
      console.warn(
        "Carte sans data-category:",
        index,
        card.querySelector("h4").textContent,
      );
    }
  });
});
// ========== FILTRES RÉALISATIONS TECHNIQUES ==========
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));

    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    document.querySelectorAll("#experiences .cert-card").forEach((card) => {
      const categories = card.getAttribute("data-category") || "";

      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
// ========== BOUTON PROJETS PRINCIPAUX ==========
window.addEventListener("DOMContentLoaded", () => {
    filterSelection("top"); // Montre seulement les cartes top au départ
});
