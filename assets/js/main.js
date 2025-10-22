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

	// ============================================
// AMÉLIORATIONS JS À AJOUTER À VOTRE main.js
// Ajoutez ce code APRÈS votre code existant
// ============================================

(function() {
    'use strict';

    // === BARRE DE PROGRESSION DE SCROLL ===
    function createProgressBar() {
        var progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            var winScroll = document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // === BOUTON RETOUR EN HAUT ===
    function createBackToTop() {
        var backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === ANIMATIONS AU SCROLL ===
    function initScrollAnimations() {
        var elements = document.querySelectorAll('.features li, .spotlight, section > header, .statistics li, .box');
        
        elements.forEach(function(el, index) {
            el.classList.add('animate-on-scroll');
            
            // Alterne les animations
            if (index % 3 === 0) el.classList.add('fade-in-up');
            else if (index % 3 === 1) el.classList.add('fade-in-left');
            else el.classList.add('fade-in-right');
        });

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // === LOADING SCREEN ===
    function createLoadingScreen() {
        var overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '
';
        document.body.appendChild(overlay);

        window.addEventListener('load', function() {
            setTimeout(function() {
                overlay.classList.add('hidden');
                setTimeout(function() {
                    overlay.remove();
                }, 500);
            }, 500);
        });
    }

    // === PARALLAX SIMPLE POUR HEADER ===
    function initParallax() {
        var header = document.querySelector('#header.alt');
        if (header) {
            window.addEventListener('scroll', function() {
                var scrolled = window.pageYOffset;
                header.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
            });
        }
    }

    // === AJOUT DE DÉLAIS AUX ANIMATIONS ===
    function addAnimationDelays() {
        var animElements = document.querySelectorAll('.animate-on-scroll');
        animElements.forEach(function(el, index) {
            el.style.animationDelay = (index * 0.1) + 's';
        });
    }

    // === SMOOTH SCROLL POUR TOUS LES LIENS INTERNES ===
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // === INITIALISATION ===
    document.addEventListener('DOMContentLoaded', function() {
        createLoadingScreen();
        createProgressBar();
        createBackToTop();
        initScrollAnimations();
        initParallax();
        addAnimationDelays();
        initSmoothScroll();

        console.log('✨ Améliorations portfolio chargées avec succès !');
    });

})();


})(jQuery);
