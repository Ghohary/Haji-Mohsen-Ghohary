// ===========================
// ULTRA-LUXURY JAVASCRIPT
// Refined interactions for haute couture experience
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
// Smooth Scrolling with Refined Easing
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
// Refined Navbar Behavior
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add subtle shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
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
        .contact-form-luxury
    `);

    elementsToFade.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.9s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.9s cubic-bezier(0.165, 0.84, 0.44, 1)';
        fadeInObserver.observe(el);
    });
});

// ===========================
// Product Image Hover Enhancement
// ===========================
const productItems = document.querySelectorAll('.product-item');

productItems.forEach(item => {
    const luxuryImage = item.querySelector('.luxury-image');

    if (luxuryImage) {
        // Subtle parallax effect on mouse move (desktop only)
        if (window.innerWidth > 1024) {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const percentX = (x - centerX) / centerX;
                const percentY = (y - centerY) / centerY;

                const imageContent = luxuryImage.querySelector('.image-content');
                if (imageContent) {
                    imageContent.style.transform = `scale(1.05) translate(${percentX * 5}px, ${percentY * 5}px)`;
                }
            });

            item.addEventListener('mouseleave', () => {
                const imageContent = luxuryImage.querySelector('.image-content');
                if (imageContent) {
                    imageContent.style.transform = '';
                }
            });
        }
    }
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
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
                    border: 2px solid #C9A961;
                    border-radius: 50%;
                    margin: 0 auto 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    color: #C9A961;
                ">✓</div>
                <h3 style="
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    color: #0A0A0A;
                    margin-bottom: 15px;
                    font-weight: 400;
                ">Request Received</h3>
                <p style="
                    font-family: 'Lora', serif;
                    font-size: 1.05rem;
                    color: #4A4A4A;
                    line-height: 1.8;
                    margin-bottom: 40px;
                ">Thank you for your interest in Maison Valmont. Our atelier team will contact you within 24 hours to schedule your private consultation.</p>
                <button onclick="this.closest('[style*=fixed]').remove(); document.body.style.overflow = ''" style="
                    padding: 16px 40px;
                    background: #0A0A0A;
                    color: #FFFFFF;
                    border: none;
                    font-family: 'Bodoni Moda', serif;
                    font-size: 0.75rem;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#C9A961'; this.style.color='#0A0A0A'"
                   onmouseout="this.style.background='#0A0A0A'; this.style.color='#FFFFFF'">Close</button>
            </div>
        `;

        // Add keyframe animations
        const style = document.createElement('style');
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

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Reset form
        contactForm.reset();

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
}

// ===========================
// Product Modal on Image Click
// ===========================
productItems.forEach(item => {
    const productImage = item.querySelector('.luxury-image');
    const productName = item.querySelector('.product-name-luxury')?.textContent || 'Luxury Gown';
    const productPrice = item.querySelector('.product-price-luxury')?.textContent || '$0';
    const productDesc = item.querySelector('.product-desc-luxury')?.textContent || 'Exquisite craftsmanship';
    const productCat = item.querySelector('.product-cat')?.textContent || 'HAUTE COUTURE';

    if (productImage) {
        productImage.style.cursor = 'pointer';

        productImage.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 10, 0.95);
                backdrop-filter: blur(20px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: fadeIn 0.4s ease-out;
                overflow-y: auto;
            `;

            const imageHTML = productImage.querySelector('.image-content').outerHTML;

            modal.innerHTML = `
                <div style="
                    background: #FFFFFF;
                    max-width: 900px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                ">
                    <div style="position: relative;">
                        <div style="aspect-ratio: 3/4; overflow: hidden;">
                            ${imageHTML}
                        </div>
                        <button onclick="this.closest('[style*=fixed]').remove(); document.body.style.overflow = ''"
                            style="
                                position: absolute;
                                top: 20px;
                                right: 20px;
                                width: 45px;
                                height: 45px;
                                background: rgba(255, 255, 255, 0.95);
                                backdrop-filter: blur(10px);
                                border: none;
                                cursor: pointer;
                                font-size: 1.5rem;
                                color: #0A0A0A;
                                transition: all 0.3s ease;
                                z-index: 10;
                            "
                            onmouseover="this.style.background='#C9A961'; this.style.color='#FFFFFF'"
                            onmouseout="this.style.background='rgba(255, 255, 255, 0.95)'; this.style.color='#0A0A0A'"
                        >×</button>
                    </div>
                    <div style="padding: 50px 40px;">
                        <span style="
                            display: block;
                            font-family: 'Bodoni Moda', serif;
                            font-size: 0.65rem;
                            letter-spacing: 3px;
                            color: #8A8A8A;
                            margin-bottom: 15px;
                            text-transform: uppercase;
                        ">${productCat}</span>
                        <h2 style="
                            font-family: 'Playfair Display', serif;
                            font-size: clamp(2rem, 5vw, 3rem);
                            color: #0A0A0A;
                            margin-bottom: 15px;
                            font-weight: 400;
                        ">${productName}</h2>
                        <p style="
                            font-family: 'Playfair Display', serif;
                            font-size: clamp(1.8rem, 4vw, 2.5rem);
                            color: #C9A961;
                            margin-bottom: 30px;
                            font-weight: 500;
                        ">${productPrice}</p>
                        <p style="
                            font-family: 'Lora', serif;
                            font-size: 1.05rem;
                            line-height: 1.9;
                            color: #4A4A4A;
                            margin-bottom: 40px;
                        ">${productDesc}</p>

                        <div style="
                            padding: 40px 0;
                            border-top: 1px solid rgba(0, 0, 0, 0.08);
                            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                            margin-bottom: 40px;
                        ">
                            <h3 style="
                                font-family: 'Playfair Display', serif;
                                font-size: 1.3rem;
                                color: #0A0A0A;
                                margin-bottom: 25px;
                                font-weight: 500;
                            ">Details</h3>
                            <div style="display: grid; gap: 20px;">
                                <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                                    <span style="font-family: 'Bodoni Moda', serif; font-size: 0.75rem; letter-spacing: 2px; color: #8A8A8A; text-transform: uppercase;">Composition</span>
                                    <span style="font-family: 'Lora', serif; font-size: 0.95rem; color: #1A1A1A;">100% Silk Charmeuse</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                                    <span style="font-family: 'Bodoni Moda', serif; font-size: 0.75rem; letter-spacing: 2px; color: #8A8A8A; text-transform: uppercase;">Craftsmanship</span>
                                    <span style="font-family: 'Lora', serif; font-size: 0.95rem; color: #1A1A1A;">100% Handmade in Paris</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                                    <span style="font-family: 'Bodoni Moda', serif; font-size: 0.75rem; letter-spacing: 2px; color: #8A8A8A; text-transform: uppercase;">Lead Time</span>
                                    <span style="font-family: 'Lora', serif; font-size: 0.95rem; color: #1A1A1A;">12-16 Weeks</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                                    <span style="font-family: 'Bodoni Moda', serif; font-size: 0.75rem; letter-spacing: 2px; color: #8A8A8A; text-transform: uppercase;">Customization</span>
                                    <span style="font-family: 'Lora', serif; font-size: 0.95rem; color: #1A1A1A;">Available</span>
                                </div>
                            </div>
                        </div>

                        <button onclick="this.closest('[style*=fixed]').remove(); document.body.style.overflow = ''; document.getElementById('contactForm').scrollIntoView({ behavior: 'smooth' });"
                            style="
                                width: 100%;
                                padding: 20px 50px;
                                background: #0A0A0A;
                                color: #FFFFFF;
                                border: none;
                                font-family: 'Bodoni Moda', serif;
                                font-size: 0.75rem;
                                letter-spacing: 3px;
                                text-transform: uppercase;
                                cursor: pointer;
                                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                            "
                            onmouseover="this.style.background='#C9A961'; this.style.color='#0A0A0A'"
                            onmouseout="this.style.background='#0A0A0A'; this.style.color='#FFFFFF'"
                        >Request Private Appointment</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    }
});

// ===========================
// Subtle Parallax on Hero
// ===========================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;

    if (hero && scrolled < window.innerHeight) {
        const parallaxSpeed = 0.3;
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
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
// Featured Product Button Click
// ===========================
const featuredButton = document.querySelector('.featured-product .btn-outline');
if (featuredButton) {
    featuredButton.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===========================
// Console Signature
// ===========================
console.log('%cMAISON VALMONT', 'font-family: Cinzel, serif; font-size: 28px; font-weight: 600; color: #C9A961; letter-spacing: 4px;');
console.log('%cPARIS · EST. 1898', 'font-family: Bodoni Moda, serif; font-size: 11px; color: #8A8A8A; letter-spacing: 3px;');
console.log('%cWhere elegance is eternal', 'font-family: Lora, serif; font-size: 13px; color: #4A4A4A; font-style: italic; margin-top: 10px;');

// ===========================
// Disable Right Click on Images (Luxury Protection)
// ===========================
const luxuryImages = document.querySelectorAll('.luxury-image');
luxuryImages.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// ===========================
// Touch Device Enhancements
// ===========================
if ('ontouchstart' in window) {
    // Add active states for touch
    productItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        item.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
}

// ===========================
// Page Transition Preparation
// ===========================
document.querySelectorAll('a:not([href^="#"])').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Only apply to internal links
        if (href && !href.startsWith('http') && !href.startsWith('#')) {
            e.preventDefault();

            document.body.style.transition = 'opacity 0.4s ease-out';
            document.body.style.opacity = '0';

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        }
    });
});
