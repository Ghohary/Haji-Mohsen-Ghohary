// ===========================
// Mobile Menu Toggle
// ===========================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

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

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default if it's just '#'
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Product Filtering
// ===========================
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        productCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                // Trigger reflow for animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===========================
// Scroll Reveal Animation
// ===========================
const revealElements = () => {
    const reveals = document.querySelectorAll('.product-card, .testimonial-card, .stat, .about-text, .about-image');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('reveal', 'active');
        }
    });
};

// Initial check
revealElements();

// Check on scroll with throttling for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        revealElements();
    });
});

// ===========================
// Intersection Observer for Better Performance
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.product-card, .testimonial-card, .stat');
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
});

// ===========================
// Product Card Hover Effect (Enhanced for Touch)
// ===========================
productCards.forEach(card => {
    // For touch devices, add a tap to view effect
    card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    });

    card.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

// ===========================
// Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border: 2px solid var(--primary-color);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        max-width: 90%;
        width: 400px;
    `;

    successMessage.innerHTML = `
        <h3 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 15px; color: var(--secondary-color);">Thank You!</h3>
        <p style="margin-bottom: 25px; color: var(--text-light);">We'll contact you shortly to schedule your consultation.</p>
        <button onclick="this.parentElement.remove(); document.body.style.overflow = ''" style="padding: 12px 30px; background: var(--primary-color); color: var(--secondary-color); border: none; cursor: pointer; font-weight: 600; letter-spacing: 1px;">Close</button>
    `;

    document.body.appendChild(successMessage);
    document.body.style.overflow = 'hidden';

    // Reset form
    contactForm.reset();

    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(successMessage)) {
            successMessage.remove();
            document.body.style.overflow = '';
        }
    }, 5000);
});

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border: 2px solid var(--primary-color);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        max-width: 90%;
        width: 400px;
    `;

    successMessage.innerHTML = `
        <h3 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 15px; color: var(--secondary-color);">Welcome to Our Circle!</h3>
        <p style="margin-bottom: 25px; color: var(--text-light);">You've successfully subscribed to our newsletter.</p>
        <button onclick="this.parentElement.remove(); document.body.style.overflow = ''" style="padding: 12px 30px; background: var(--primary-color); color: var(--secondary-color); border: none; cursor: pointer; font-weight: 600; letter-spacing: 1px;">Close</button>
    `;

    document.body.appendChild(successMessage);
    document.body.style.overflow = 'hidden';

    // Reset form
    newsletterForm.reset();

    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(successMessage)) {
            successMessage.remove();
            document.body.style.overflow = '';
        }
    }, 5000);
});

// ===========================
// Parallax Effect for Hero (Subtle for mobile performance)
// ===========================
const hero = document.querySelector('.hero');
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
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
// Product Details Modal (Simple Implementation)
// ===========================
const viewDetailsButtons = document.querySelectorAll('.btn-secondary');

viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const card = this.closest('.product-card');
        const productName = card.querySelector('.product-name').textContent;
        const productPrice = card.querySelector('.product-price').textContent;
        const productDesc = card.querySelector('.product-description').textContent;
        const productImage = card.querySelector('.image-placeholder');
        const bgStyle = productImage.style.background;

        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
            overflow-y: auto;
        `;

        modal.innerHTML = `
            <div style="background: white; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; animation: slideUp 0.3s ease;">
                <div style="position: relative;">
                    <div style="background: ${bgStyle}; height: 400px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-family: var(--font-heading); font-size: 2.5rem; color: white; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); letter-spacing: 3px;">${productName.toUpperCase()}</span>
                    </div>
                    <button onclick="this.closest('[style*=fixed]').remove(); document.body.style.overflow = ''" style="position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; background: white; border: none; cursor: pointer; font-size: 1.5rem; display: flex; align-items: center; justify-content: center;">×</button>
                </div>
                <div style="padding: 40px;">
                    <h2 style="font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 10px; color: var(--secondary-color);">${productName}</h2>
                    <p style="font-size: 2rem; color: var(--primary-color); font-family: var(--font-heading); margin-bottom: 20px; font-weight: 600;">${productPrice}</p>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-light); margin-bottom: 30px;">${productDesc}</p>

                    <div style="margin-bottom: 30px;">
                        <h3 style="font-size: 1.3rem; margin-bottom: 15px; color: var(--secondary-color);">Details</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 10px 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between;">
                                <span style="color: var(--text-light);">Material</span>
                                <span style="font-weight: 500;">Premium Silk & Chiffon</span>
                            </li>
                            <li style="padding: 10px 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between;">
                                <span style="color: var(--text-light);">Craftsmanship</span>
                                <span style="font-weight: 500;">100% Handmade</span>
                            </li>
                            <li style="padding: 10px 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between;">
                                <span style="color: var(--text-light);">Delivery</span>
                                <span style="font-weight: 500;">4-6 Weeks</span>
                            </li>
                            <li style="padding: 10px 0; display: flex; justify-content: space-between;">
                                <span style="color: var(--text-light);">Customization</span>
                                <span style="font-weight: 500;">Available</span>
                            </li>
                        </ul>
                    </div>

                    <button onclick="alert('Consultation booking feature - Coming soon!'); this.closest('[style*=fixed]').remove(); document.body.style.overflow = ''" style="width: 100%; padding: 18px; background: var(--primary-color); color: var(--secondary-color); border: 2px solid var(--primary-color); cursor: pointer; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; font-size: 1rem; transition: all 0.3s;">Book Consultation</button>
                </div>
            </div>
        `;

        // Add modal to page
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
});

// ===========================
// Performance: Lazy Loading Images (if using real images)
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // If you add real images later, add data-src attribute and observe them
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===========================
// Add smooth transitions to all elements
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to elements that should animate
    const animatedElements = document.querySelectorAll('.product-card, .testimonial-card, .stat');
    animatedElements.forEach(el => {
        el.classList.add('reveal');
    });
});

// ===========================
// Touch Gestures for Mobile
// ===========================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    // You can add swipe functionality here if needed
    // For example: swipe to navigate between products
}

// ===========================
// Console Branding
// ===========================
console.log('%cNOIR ÉLÉGANCE', 'font-size: 24px; font-weight: bold; color: #d4af37;');
console.log('%cLuxury Evening Dresses', 'font-size: 14px; color: #666;');
console.log('%cWebsite designed with passion ✨', 'font-size: 12px; color: #999;');

// ===========================
// Analytics Ready
// ===========================
// Track page view
if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
}

// Track product views
viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.closest('.product-card').querySelector('.product-name').textContent;

        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_item', {
                items: [{
                    item_name: productName
                }]
            });
        }
    });
});
