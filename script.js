// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Service Cards Hover Animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 25px 70px rgba(37, 99, 235, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
    });
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + (target > 1000 ? 'k+' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCounter();
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Trigger counter animation when hero stats come into view
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-card, .about-content, .gallery-grid, .contact-content, .hero-stats').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Gallery Hover Effects
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    const overlay = item.querySelector('.overlay');

    item.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
        overlay.style.transform = 'scale(1)';
        item.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.8)';
        item.style.transform = 'scale(1)';
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Form animation
    const btn = this.querySelector('button');
    const originalText = btn.textContent;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Reset form
        this.reset();
        btn.textContent = 'Message Sent! ✅';
        btn.style.background = '#10b981';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 2000);
    }, 1500);

    // Show success message
    showNotification('Thank you! Your message has been sent successfully!', 'success');
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const fullText = heroTitle.textContent;
    typeWriter(heroTitle, fullText, 80);

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // You can add a progress bar element if needed
    // document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

// Button Hover Effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Active Navigation Highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
});

// Preloader (Optional - Add this if you want loading screen)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// WhatsApp Floating Button
function createWhatsAppButton() {
    const waBtn = document.createElement('a');
    waBtn.href = 'https://wa.me/919876543210?text=Hello!%20CSC%20services%20ke%20baare%20mein%20jaanna%20chahta%20hun';
    waBtn.className = 'whatsapp-float';
    waBtn.target = '_blank';
    waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(waBtn);
}

createWhatsAppButton();

// Back to Top Button
function createBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    document.body.appendChild(btn);
}

createBackToTop();

////////////// gallary /////////////////////////
// Premium Gallery Filter & Animations
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filter Functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(50px)';

                    // Trigger animation
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('animate');
                }
            });
        });
    });

    // Staggered Animation on Load
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 150);
    });

    // Load More Functionality (Demo)
    const loadMoreBtn = document.querySelector('.load-more');
    let loadCount = 0;

    loadMoreBtn.addEventListener('click', () => {
        loadCount++;
        showNotification(`Loading more photos... (${loadCount})`, 'info');

        // Simulate loading
        setTimeout(() => {
            showNotification('More photos loaded successfully!', 'success');
        }, 1000);
    });
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);

// contact section //
// Premium Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const phone = formData.get('phone');

        // WhatsApp Integration
        const message = `New Enquiry from CSC Website!%0A%0AName: ${name}%0APhone: ${phone}%0A%0AService Required...`;
        const whatsappUrl = `https://wa.me/919876543210?text=${message}`;

        // Simulate processing
        setTimeout(() => {
            // Reset form
            form.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Success notification
            showNotification('✅ Message sent successfully! We will contact you within 5 minutes on WhatsApp!', 'success');

            // Open WhatsApp (optional)
            window.open(whatsappUrl, '_blank');

        }, 2000);
    });

    // Input focus animations
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Quick action buttons hover
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initContactForm);



// about section //
// Premium About Section Animations
function initAboutSection() {
    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    if (target === 5000) counter.textContent += '+';
                    if (target === 100) counter.textContent += '+';
                }
            };

            // Start animation when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    // Feature Items Hover
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1) rotateY(180deg)';
        });

        item.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotateY(0deg)';
        });
    });

    // Video Placeholder Click
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function () {
            showNotification('📹 Video coming soon! Stay tuned.', 'info');
        });
    }

    // Image Hover Parallax
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        imageContainer.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // Initialize counters
    animateCounters();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initAboutSection);


////////////////////// footer ////////////////////////////



// Premium Footer Animations
function initFooter() {
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input').value;

            // Animate button
            const btn = this.querySelector('.newsletter-btn');
            const icon = btn.querySelector('i');
            icon.classList.add('fa-shake');

            setTimeout(() => {
                icon.classList.remove('fa-shake');
                showNotification('✅ Thank you for subscribing! Welcome aboard!', 'success');
                this.reset();
            }, 1500);
        });
    }

    // Footer Links Hover Animation
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.color = '#2563eb';
        });

        link.addEventListener('mouseleave', function () {
            this.style.color = '';
        });
    });

    // Social Links Entrance Animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';

        setTimeout(() => {
            link.style.transition = 'all 0.6s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Current Year
    const currentYear = document.querySelector('.current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Scroll Reveal for Footer Sections
    const footerSections = document.querySelectorAll('.footer-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    footerSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
}

// Initialize footer
document.addEventListener('DOMContentLoaded', initFooter);
