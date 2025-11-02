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
// FONCTION POUR AFFICHER LES CERTIFICATS
// ============================================
function showCertificate(imagePath, event) {
    if (event) {
        event.preventDefault();
    }
    
    // Créer ou récupérer la modale
    let modal = document.getElementById('certModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'certModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <span class="close">&times;</span>
            <img class="modal-content" id="certImage" alt="Certificat">
        `;
        document.body.appendChild(modal);
        
        // Fermer au clic sur X
        modal.querySelector('.close').onclick = function() {
            modal.style.display = 'none';
        };
        
        // Fermer au clic en dehors de l'image
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Fermer avec la touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    // Afficher l'image
    const img = document.getElementById('certImage');
    img.src = imagePath;
    modal.style.display = 'block';
    
    // Empêcher le scroll du body quand la modale est ouverte
    document.body.style.overflow = 'hidden';
    
    // Rétablir le scroll quand on ferme
    modal.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
}


