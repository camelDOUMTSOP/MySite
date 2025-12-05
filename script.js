document.addEventListener('DOMContentLoaded', () => {
    
    // --- SÉLECTEURS ---
    const navbar = document.getElementById('navbar');
    const heroElements = document.querySelectorAll('.hero-content .fade-in-up');
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const contactForm = document.getElementById('contact-form');
    const scrollThreshold = 50;
    
    // Fonction pour vérifier si un élément est visible à l'écran
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 50 &&
            rect.bottom >= 0
        );
    };

    // --- FONCTION PRINCIPALE DE SCROLL ---
    const handleScroll = () => {
        // 1. Gestion de la Navbar (Devient foncée au scroll)
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 2. Gestion des Apparitions (Reveal on Scroll)
        revealElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });

        // J'AI SUPPRIMÉ LE PARALLAXE ICI POUR ÉVITER LES BUG D'AFFICHAGE
    };

    // --- ÉVÉNEMENTS ---
    window.addEventListener('scroll', handleScroll);
    
    // Force l'exécution une fois au chargement pour afficher les éléments déjà visibles
    handleScroll(); 

    // Affiche le Hero (Titre principal) immédiatement
    heroElements.forEach(el => {
        el.classList.add('visible');
    });

    // --- GESTION DU FORMULAIRE ---
    // (J'ai simplifié ici pour éviter les erreurs si la fonction validateForm manquait)
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulation d'envoi
            const successMsg = document.getElementById('form-success-message');
            if(successMsg) successMsg.style.display = 'block';
            contactForm.reset();
        });
    }

    // --- SCROLL DOUX POUR LES LIENS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcul pour compenser la hauteur de la navbar
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
