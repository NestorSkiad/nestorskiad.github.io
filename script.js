// Smooth scroll animations and intersection observer
document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all gallery items, about section, and contact section
    const animatedElements = document.querySelectorAll('.gallery-item, .about-container, .contact-container');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            hero.style.transform = `translateY(${parallax}px)`;
            
            // Fade out hero content as user scrolls
            const fadeStart = 100;
            const fadeEnd = 1250;
            const opacity = Math.max(0, 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart));
            
            if (heroContent) {
                heroContent.style.opacity = opacity;
            }
            if (scrollIndicator) {
                scrollIndicator.style.opacity = opacity;
            }
        });
    }

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Image lazy loading enhancement
    const images = document.querySelectorAll('.gallery-image img, .about-image img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease-in-out';
                
                // Simulate loading effect
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1
    });

    images.forEach(img => imageObserver.observe(img));

    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Add stagger animation to about stats
    const stats = document.querySelectorAll('.stat');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate number count-up
                    const numberElement = entry.target.querySelector('.stat-number');
                    const finalNumber = parseInt(numberElement.textContent);
                    const duration = 2000;
                    const steps = 60;
                    const increment = finalNumber / steps;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= finalNumber) {
                            numberElement.textContent = numberElement.textContent.includes('+') 
                                ? finalNumber + '+' 
                                : finalNumber;
                            clearInterval(timer);
                        } else {
                            numberElement.textContent = Math.floor(current);
                        }
                    }, duration / steps);
                    
                }, index * 100);
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    stats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        statsObserver.observe(stat);
    });

    // Mobile menu toggle (if needed for future enhancement)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Add loading class removal after page load
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Cursor effect (optional - uncomment if desired)
    /*
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .gallery-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    */
});