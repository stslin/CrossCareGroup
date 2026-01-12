/**
 * Cross Care Group - Human Depth Interactive Engine
 * Focus: Sophisticated motion, premium fluid reveals, and clinical authority.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fluid Reveal Engine V3 (Staggered)
    const revealItems = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        // Filter and sort entries that are intersecting to apply stagger
        const intersectingEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

        intersectingEntries.forEach((entry, index) => {
            // Add a small delay for staggered appearance
            setTimeout(() => {
                entry.target.classList.add('is-revealed');
            }, index * 150);
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(el => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });

    // 2. Kinetic Interaction Engine V4 (Proximity & Parallax)
    document.querySelectorAll('.card, .btn, .path-card, .process-card, .service-grid-card-premium').forEach(target => {
        target.addEventListener('mousemove', (e) => {
            const rect = target.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            target.style.setProperty('--mouse-x', `${x}%`);
            target.style.setProperty('--mouse-y', `${y}%`);

            // Subtle tilt for high-end feel
            if (target.classList.contains('card') || target.classList.contains('path-card') || target.classList.contains('process-card') || target.classList.contains('service-grid-card-premium')) {
                const tiltX = (y - 50) / 12;
                const tiltY = (x - 50) / -12;
                target.style.transform = `translateY(-12px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                target.style.zIndex = "50";
            }
        });

        target.addEventListener('mouseleave', () => {
            if (target.classList.contains('card') || target.classList.contains('path-card') || target.classList.contains('process-card') || target.classList.contains('service-grid-card-premium')) {
                target.style.transform = '';
                target.style.zIndex = "";
            }
        });
    });

    // Parallax Orbs
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelectorAll('.glow-orb').forEach((orb, index) => {
            const speed = (index + 1) * 0.15;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // 4. Form Handling moved to forms.js
    // 5. Sticky Header Resize on Scroll
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        });
    }
});
