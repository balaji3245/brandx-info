document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursorRing = document.getElementById('cursor-ring');
    const cursorDot = document.getElementById('cursor-dot');

    document.addEventListener('mousemove', (e) => {
        cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Hover effects on interactive elements
    const interactives = document.querySelectorAll('a, button, input, .interactive-tile, .accordion-header');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // 2. Parallax Particles
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning and animation delay
        const xPos = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 15;
        const size = Math.random() * 2 + 2;

        particle.style.left = `${xPos}vw`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particlesContainer.appendChild(particle);
    }

    // Parallax effect on scroll for background particles
    document.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        particlesContainer.style.transform = `translateY(${scrollY * 0.3}px)`;
    });

    // 3. Staggered Letter Reveal for Hero Title
    const title = document.getElementById('staggered-title');
    if (title) {
        const text = title.innerText;
        title.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.innerText = char;
            }
            span.classList.add('char');
            span.style.animationDelay = `${index * 0.05}s`;
            title.appendChild(span);
        });
    }

    // 4. Expanding Services Cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Close others
            serviceCards.forEach(c => {
                if (c !== card) c.classList.remove('expanded');
            });
            card.classList.toggle('expanded');
        });
    });

    // 5. Scroll Animations (Fade in / Slide up)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const trustItems = document.querySelectorAll('.trust-item');
    trustItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // 6. FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            accordionItems.forEach(acc => acc.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
