document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const glitchTitle = document.querySelector('.glitch');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastScrollY = window.scrollY;

    function updateHeader() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    }

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    }

    function addActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            createParticle(particlesContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 0, 0, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;

        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, (Math.random() * 10 + 10) * 1000);
    }

    function addGlitchEffect() {
        if (Math.random() < 0.1) {
            glitchTitle.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ff00,
                0 2px #0000ff,
                0 -2px #ffff00,
                0 0 10px rgba(255, 0, 0, 0.5),
                0 0 20px rgba(255, 0, 0, 0.3),
                0 0 40px rgba(255, 0, 0, 0.1)
            `;

            setTimeout(() => {
                glitchTitle.style.textShadow = `
                    0 0 10px var(--color-primary),
                    0 0 20px var(--color-primary),
                    0 0 40px var(--color-primary)
                `;
            }, 100);
        }
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }

    function initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        const animatedElements = document.querySelectorAll('.about-content, .music-content, .connect-content');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
            observer.observe(el);
        });
    }

    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', smoothScroll);
        }
    });

    window.addEventListener('scroll', () => {
        updateHeader();
        addActiveNavigation();
    });

    setInterval(addGlitchEffect, 3000);

    createParticles();
    initializeAnimations();

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }

        .nav-link.active {
            color: var(--color-primary);
            border-color: var(--color-primary);
            text-shadow: 0 0 10px var(--color-primary);
            box-shadow: inset 0 0 10px rgba(255, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
});