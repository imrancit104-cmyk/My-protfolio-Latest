// Portfolio Script - Modern with Ripple Animation
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Mobile Navigation
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // About card flip functionality
    const aboutCard = document.querySelector('.about-card');
    const flipButtons = document.querySelectorAll('.flip-btn');
    
    if (aboutCard && flipButtons.length > 0) {
        flipButtons.forEach(button => {
            button.addEventListener('click', () => {
                aboutCard.classList.toggle('flipped');
            });
        });
        
        // Auto flip back on mobile when scrolling away
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && aboutCard.classList.contains('flipped')) {
                    aboutCard.classList.remove('flipped');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(aboutCard);
    }

    // Initialize EmailJS
    (function() {
        emailjs.init("CnXL296taH980pNNM");
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                emailjs.sendForm(
                    "imranali",  
                    "template_qyn6yxp",  
                    this
                )
                .then(function() {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                    
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        showNotification('✅ Message sent successfully!', 'success');
                    }, 3000);
                })
                .catch(function(error) {
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Try Again';
                    submitBtn.disabled = false;
                    showNotification('❌ Failed to send message. Please try again.', 'error');
                    console.log("EmailJS Error:", error);
                });
            });
        }
    })();

    // Notification system
    function showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--card-bg);
                border-left: 4px solid ${type === 'success' ? '#2ecc71' : '#e74c3c'};
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                transform: translateX(150%);
                transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                max-width: 350px;
                border: 1px solid var(--border-color);
            }
            .notification.show { transform: translateX(0); }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text-color);
            }
            .notification-content i {
                font-size: 1.2rem;
                color: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
            }
            .notification-content span { font-size: 0.95rem; }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 500);
        }, 5000);
    }

    // Animate elements on scroll
    function initScrollAnimations() {
        const elements = document.querySelectorAll(
            '.skill-card, .project-card, .interest-card, .timeline-item'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    // Animate progress bars
                    if (entry.target.classList.contains('skill-card')) {
                        const progressFill = entry.target.querySelector('.progress-fill');
                        if (progressFill) {
                            const width = progressFill.style.width;
                            progressFill.style.width = '0%';
                            setTimeout(() => {
                                progressFill.style.width = width;
                            }, 300);
                        }
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.1)';
            observer.observe(el);
        });
    }

    // Hero section animations
    function initHeroAnimations() {
        // Ripple animation is already in CSS
        // Text animations are handled by CSS classes
        
        // Add interactive ripple on click
        document.addEventListener('click', function(e) {
            if (e.target.closest('.hero-section')) {
                createInteractiveRipple(e.clientX, e.clientY);
            }
        });
    }
    
    // Create interactive ripple effect
    function createInteractiveRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'interactive-ripple';
        
        const size = Math.random() * 100 + 50;
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x - size/2}px`;
        ripple.style.top = `${y - size/2}px`;
        ripple.style.background = `radial-gradient(circle, rgba(231, 76, 60, 0.2) 0%, transparent 70%)`;
        ripple.style.position = 'fixed';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '100';
        ripple.style.animation = 'rippleExpand 1s ease-out forwards';
        
        document.body.appendChild(ripple);
        
        // Add animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleExpand {
                0% {
                    transform: scale(0);
                    opacity: 0.5;
                }
                100% {
                    transform: scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove after animation
        setTimeout(() => {
            ripple.remove();
            style.remove();
        }, 1000);
    }

    // Update current year in footer
    function updateCurrentYear() {
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    // Initialize everything
    function initPortfolio() {
        initScrollAnimations();
        initHeroAnimations();
        updateCurrentYear();
        
        console.log('Portfolio with ripple animation initialized!');
    }

    // Initialize on load
    initPortfolio();
});
