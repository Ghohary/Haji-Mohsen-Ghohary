// ===========================
// Component Includes - Header & Footer
// ===========================

// Load header and footer components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Load header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        try {
            const response = await fetch('header.html');
            const headerHTML = await response.text();
            headerContainer.innerHTML = headerHTML;

            // Reinitialize menu toggle after header is loaded
            initializeMenuToggle();
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        try {
            const response = await fetch('footer.html');
            const footerHTML = await response.text();
            footerContainer.innerHTML = footerHTML;
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
});

// Initialize menu toggle functionality
function initializeMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}
