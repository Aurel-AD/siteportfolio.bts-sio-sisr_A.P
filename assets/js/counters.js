// Compteurs animés pour Novares
document.addEventListener('DOMContentLoaded', function() {

    function animateCounter(element, target, duration = 2000, decimals = 0) {
        let start = 0;
        const stepTime = 16; // ~60 fps
        const steps = duration / stepTime;
        const increment = target / steps;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = target * progress;
            element.textContent = currentValue.toLocaleString('fr-FR', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('fr-FR', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                });
            }
        }

        requestAnimationFrame(updateCounter);
    }

    function initCounters() {
        const counters = document.querySelectorAll('#novares .counter');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimals = parseInt(counter.getAttribute('data-decimal') || '0', 10);
            animateCounter(counter, target, 2000, decimals);
        });
    }

    // Observer pour déclencher l'animation quand la section devient visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const novaresSection = document.getElementById('novares');
    if (novaresSection) {
        observer.observe(novaresSection);
    }
});
