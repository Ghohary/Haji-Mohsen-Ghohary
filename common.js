// ===========================
// COMMON JAVASCRIPT FOR ALL PAGES
// Shared functionality across the website
// ===========================

'use strict';

// ===========================
// Mobile Menu Toggle
// ===========================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===========================
// Refined Navbar Behavior
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add subtle shadow on scroll
    if (currentScroll > 50) {
        if (navbar) navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.06)';
    } else {
        if (navbar) navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Intersection Observer for Elegant Reveals
// ===========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements on page load
document.addEventListener('DOMContentLoaded', () => {
    // Sections to observe
    const elementsToFade = document.querySelectorAll(`
        .editorial-quote,
        .heritage-text,
        .heritage-image,
        .craft-item,
        .service-luxury,
        .contact-info-luxury,
        .contact-form-luxury,
        .page-header,
        .section-intro,
        .process-step,
        .timeline-item,
        .benefit-card
    `);

    elementsToFade.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.9s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1)';
        fadeInObserver.observe(el);
    });
});

// ===========================
// Contact Form Handling (for all forms)
// ===========================
const contactForms = document.querySelectorAll('form[id*="Form"], form.contact-form-luxury');

contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Create elegant modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 10, 0.92);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
            animation: fadeIn 0.4s ease-out;
        `;

        modal.innerHTML = `
            <div style="
                background: #FFFFFF;
                max-width: 500px;
                width: 100%;
                padding: 60px 50px;
                text-align: center;
                animation: slideUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
            ">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 2px solid #D4AF37;
                    border-radius: 50%;
                    margin: 0 auto 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    color: #D4AF37;
                ">✓</div>
                <h3 style="
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    color: #5C4033;
                    margin-bottom: 15px;
                    font-weight: 400;
                ">Request Received</h3>
                <p style="
                    font-family: 'Lora', serif;
                    font-size: 1.05rem;
                    color: #4A4A4A;
                    line-height: 1.8;
                    margin-bottom: 40px;
                ">Thank you for your interest in GHOHARY. Our atelier team will contact you within 24 hours to schedule your private consultation.</p>
                <button onclick="this.closest('[style*=fixed]').remove(); document.body.style.overflow = ''" style="
                    padding: 16px 40px;
                    background: #5C4033;
                    color: #FFFFFF;
                    border: none;
                    font-family: 'Bodoni Moda', serif;
                    font-size: 0.75rem;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#D4AF37'; this.style.color='#FFFFFF'"
                   onmouseout="this.style.background='#5C4033'; this.style.color='#FFFFFF'">Close</button>
            </div>
        `;

        // Add keyframe animations
        if (!document.getElementById('modal-animations')) {
            const style = document.createElement('style');
            style.id = 'modal-animations';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Reset form
        form.reset();

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });

        // Auto-close after 8 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 400);
            }
        }, 8000);
    });
});

// ===========================
// Luxury Loading State
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-out';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Console Signature
// ===========================
console.log('%cGHOHARY', 'font-family: Cinzel, serif; font-size: 28px; font-weight: 600; color: #D4AF37; letter-spacing: 4px;');
console.log('%cPARIS · EST. 1898', 'font-family: Bodoni Moda, serif; font-size: 11px; color: #8B7355; letter-spacing: 3px;');
console.log('%cWhere elegance is eternal', 'font-family: Lora, serif; font-size: 13px; color: #6B4423; font-style: italic; margin-top: 10px;');

// ===========================
// Disable Right Click on Images (Luxury Protection)
// ===========================
const luxuryImages = document.querySelectorAll('.luxury-image, .product-image');
luxuryImages.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===========================
// Page Transition Preparation
// ===========================
document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Only apply to internal links
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            e.preventDefault();

            document.body.style.transition = 'opacity 0.4s ease-out';
            document.body.style.opacity = '0';

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        }
    });
});
