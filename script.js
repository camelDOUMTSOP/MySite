document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar avec Glassmorphism
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 50;

    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - 100) &&
            rect.bottom >= 0
        );
    };

    const handleScroll = () => {
        // Effet glass sur navbar
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Reveal Scroll Animations
        revealElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });

        // Parallax Effect Hero
        const heroSection = document.getElementById('hero');
        const scrollPosition = window.scrollY;
        heroSection.style.transform = `translateY(${scrollPosition * 0.4}px)`;

        const animationContainer = document.getElementById('hero-animation-container');
        if (animationContainer) {
            animationContainer.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 2. Initial Hero Fade-In
    const heroElements = document.querySelectorAll('.hero-content .fade-in-up');
    heroElements.forEach(el => {
        el.classList.add('visible');
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document
                .querySelector(this.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 3. Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success-message');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = (e) => {
        e.preventDefault();

        let isValid = true;

        // Name validation
        if (nameInput.value.trim().length < 3) {
            nameError.textContent = "Your name must be at least 3 characters.";
            isValid = false;
        } else {
            nameError.textContent = "";
        }

        // Email validation
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = "Enter a valid email.";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        // Message validation
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = "Your message must be at least 10 characters.";
            isValid = false;
        } else {
            messageError.textContent = "";
        }

        if (isValid) {
            successMessage.style.display = "block";
            contactForm.reset();

            setTimeout(() => {
                successMessage.style.display = "none";
            }, 4000);
        }
    };

    contactForm.addEventListener('submit', validateForm);
});
