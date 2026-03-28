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
// ============================================
// FILTRES RÉALISATIONS TECHNIQUES — implémentation unique
// ============================================
(function () {
  function applyFilter(filterValue) {
    const cards = document.querySelectorAll("#experiences .cert-card");
    cards.forEach(function (card) {
      var show;
      if (filterValue === "all") {
        show = true;
      } else if (filterValue === "top") {
        show = card.classList.contains("top");
      } else {
        var categories = (card.getAttribute("data-category") || "").split(" ");
        show = categories.indexOf(filterValue) !== -1;
      }
      card.style.display = show ? "" : "none";
    });
  }
  function initFilters() {
    var filterButtons = document.querySelectorAll("#experiences .filter-btn");
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        applyFilter(btn.getAttribute("data-filter"));
      });
    });
    applyFilter("top");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFilters);
  } else {
    initFilters();
  }
})();

// ============================================
// BARRES DE COMPÉTENCES — couleurs selon % + animation
// ============================================
(function () {

  function getColor(pct) {
    if (pct <= 60) return "linear-gradient(90deg, #38bdf8, #0ea5e9)";  // bleu
    if (pct <= 75) return "linear-gradient(90deg, #8b5cf6, #7c3aed)";  // violet
    return                "linear-gradient(90deg, #34d399, #10b981)";  // vert
  }

  function animateBars(section) {
    section.querySelectorAll(".skill-progress").forEach(function (bar, i) {
      var pct = parseInt(bar.getAttribute("data-target")) || 0;
      setTimeout(function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            bar.style.setProperty("transition", "width 1.2s cubic-bezier(0.34, 1.1, 0.64, 1)", "important");
            bar.style.setProperty("width", pct + "%", "important");
          });
        });
      }, i * 200);
    });
  }

  function initSkillBars() {
    document.querySelectorAll(".skill-progress").forEach(function (bar) {
      // Lire le % depuis le span — FIABLE même si le CSS écrase le style inline
      var span = bar.querySelector(".skill-percent");
      var pct = span ? parseInt(span.textContent) : 0;

      bar.setAttribute("data-target", pct);
      bar.style.setProperty("width", "0%", "important");
      bar.style.setProperty("transition", "none", "important");
      bar.style.setProperty("background", getColor(pct), "important");
    });

    var section = document.getElementById("competences");
    if (!section) return;

    var rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(function () { animateBars(section); }, 300);
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateBars(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      observer.observe(section);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSkillBars);
  } else {
    initSkillBars();
  }

})();
