// Little Whispers - Interactive Elements

// Parallax effect on scroll
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.band-name, .tagline');

    parallaxElements.forEach(element => {
        const speed = element.classList.contains('band-name') ? 0.5 : 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });

    ticking = false;
}

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background opacity on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const maxScroll = 300;
    const opacity = Math.min(scrolled / maxScroll, 1);
    header.style.background = `linear-gradient(to bottom, rgba(26, 22, 18, ${0.9 + opacity * 0.1}), transparent)`;
});

// Staggered animation for show cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Apply observer to show cards
document.addEventListener('DOMContentLoaded', () => {
    const showCards = document.querySelectorAll('.show-card');
    showCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Random atmospheric effect for background overlay - DISABLED to prevent darkening
// const backgroundOverlay = document.querySelector('.background-overlay');
// let atmosphereInterval;

// function createAtmosphericEffect() {
//     const effects = [
//         'rgba(26, 22, 18, 0.7)',
//         'rgba(26, 22, 18, 0.75)',
//         'rgba(26, 22, 18, 0.8)',
//         'rgba(26, 22, 18, 0.85)'
//     ];

//     atmosphereInterval = setInterval(() => {
//         const randomEffect = effects[Math.floor(Math.random() * effects.length)];
//         backgroundOverlay.style.background = `linear-gradient(to bottom, ${randomEffect} 0%, rgba(26, 22, 18, 0.85) 50%, rgba(26, 22, 18, 0.95) 100%)`;
//     }, 5000);
// }

// createAtmosphericEffect();

// Audio visualization placeholder (for future implementation)
class AudioVisualizer {
    constructor() {
        this.isPlaying = false;
    }

    init() {
        // Placeholder for audio visualization
        console.log('Audio visualizer ready for implementation');
    }
}

// Track list hover effect with sound wave animation
const trackItems = document.querySelectorAll('.track-list li');
trackItems.forEach(track => {
    track.addEventListener('mouseenter', function() {
        this.style.borderBottomColor = 'rgba(196, 181, 160, 0.5)';
    });

    track.addEventListener('mouseleave', function() {
        this.style.borderBottomColor = 'rgba(196, 181, 160, 0.2)';
    });
});

// CTA button ripple effect
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.querySelectorAll('.btn-primary, .btn-secondary, .btn-ticket').forEach(button => {
    button.addEventListener('click', createRipple);
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
});

// Add ripple animation style
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Logo rotation on hover with momentum
const logo = document.querySelector('.logo');
let rotationMomentum = 0;
let isHovering = false;

logo.addEventListener('mouseenter', () => {
    isHovering = true;
    rotationMomentum = 360;
});

logo.addEventListener('mouseleave', () => {
    isHovering = false;
});

function animateLogo() {
    if (!isHovering && rotationMomentum > 0) {
        rotationMomentum -= 5;
        logo.style.transform = `rotate(${rotationMomentum}deg)`;
    }
    requestAnimationFrame(animateLogo);
}

animateLogo();

// Typewriter effect for tagline
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typewriter effect when tagline comes into view
const taglineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.typed) {
            const text = entry.target.textContent;
            typewriterEffect(entry.target, text);
            entry.target.dataset.typed = 'true';
        }
    });
}, { threshold: 0.5 });

const tagline = document.querySelector('.tagline');
if (tagline) {
    taglineObserver.observe(tagline);
}

console.log('AMNEAJYNX - Little Whispers website loaded');