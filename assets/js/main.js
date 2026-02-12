/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}
	
	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});
	
})(jQuery);

// ============================================
// ANIMATION DES CHIFFRES NOVARES
// ============================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString('fr-FR');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observer pour déclencher l'animation au scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const element = entry.target;
            const endValue = parseInt(element.getAttribute('data-value'));
            element.classList.add('animated');
            animateValue(element, 0, endValue, 2000);
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

// Initialiser l'observer quand le DOM est prêt
document.addEventListener('DOMContentLoaded', function() {
    // Observer tous les éléments avec data-value
    document.querySelectorAll('[data-value]').forEach(el => {
        statsObserver.observe(el);
    });
});

// ============================================
// LIGHTBOX CERTIFICAT - système unique
// ============================================

// Ouvre la lightbox
function openCertificate(src) {
  const viewer = document.getElementById("certificate-viewer");
  const img = document.getElementById("certificate-image");
  if (!viewer || !img) {
    console.error("certificate-viewer ou certificate-image introuvable dans le DOM.");
    return;
  }
  img.src = src;
  viewer.style.display = "block";
  document.body.style.overflow = "hidden"; // bloque le scroll en arrière-plan
}

// Ferme la lightbox
function closeCertificate() {
  const viewer = document.getElementById("certificate-viewer");
  const img = document.getElementById("certificate-image");
  if (!viewer) return;

  viewer.style.display = "none";
  if (img) img.src = "";                 // reset source (optionnel)
  document.body.style.overflow = "auto"; // rétablit le scroll
}

// Ferme au clic sur le fond noir (pas sur l'image)
function closeCertificateOnBackground(e) {
  if (e.target && e.target.id === "certificate-viewer") {
    closeCertificate();
  }
}

// Ferme avec la touche ESC (seulement si visible)
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const viewer = document.getElementById("certificate-viewer");
    if (viewer && viewer.style.display !== "none") {
      closeCertificate();
    }
  }
});







