// ===== EVENT HANDLERS FOR REMOVING INLINE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // Handle navigation hover effects
    const navLinks = document.querySelectorAll('.nav-link-custom');
    navLinks.forEach(link => {
        if (!link.classList.contains('nav-link-active')) {
            link.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
                this.style.transform = 'translateY(-1px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.transform = '';
            });
        }
    });
    
    // Handle button hover effects
    const buttons = document.querySelectorAll('.btn-gradient');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 12px 35px rgba(139, 69, 19, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.3)';
        });
    });
    
    // Handle chatbot toggle
    const chatbotToggle = document.getElementById('chatbot-toggle');
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            if (typeof toggleChatbot === 'function') {
                toggleChatbot();
            }
        });
    }
    
    // Handle chatbot input
    const chatbotInput = document.getElementById('chatbot-input');
    if (chatbotInput) {
        chatbotInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                if (typeof sendMessage === 'function') {
                    sendMessage();
                }
            }
        });
    }
    
    // Handle chatbot send button
    const chatbotSend = document.getElementById('chatbot-send');
    if (chatbotSend) {
        chatbotSend.addEventListener('click', function() {
            if (typeof sendMessage === 'function') {
                sendMessage();
            }
        });
    }
    
    // Handle close button
    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (typeof toggleChatbot === 'function') {
                toggleChatbot();
            }
        });
    });
    
    // Add focus states for better accessibility
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--secondary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
});

// ===== FORM VALIDATION IMPROVEMENTS =====

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(inputElement, message) {
    // Remove existing error
    const existingError = inputElement.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '0.5rem';
    errorElement.textContent = message;
    
    inputElement.parentNode.appendChild(errorElement);
    inputElement.style.borderColor = '#e74c3c';
    inputElement.setAttribute('aria-invalid', 'true');
}

function clearFormError(inputElement) {
    const errorElement = inputElement.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    inputElement.style.borderColor = '';
    inputElement.removeAttribute('aria-invalid');
}

// ===== PERFORMANCE IMPROVEMENTS =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE IMPROVEMENTS =====

// Enhanced lazy loading with Intersection Observer
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => img.classList.add('loaded'));
    }
}

// Optimize scroll handler with requestAnimationFrame
let ticking = false;

function updateParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Reduced intensity for better performance
        hero.style.transform = `translate3d(0, ${rate}px, 0)`; // Use translate3d for hardware acceleration
    }
    ticking = false;
}

const optimizedScrollHandler = function() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
};

// Replace existing scroll listener
window.removeEventListener('scroll', optimizedScrollHandler);
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('🚀 Performance Metrics:');
                    console.log(`  DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`);
                    console.log(`  Load Complete: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
                }
            }, 0);
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    logPerformanceMetrics();
    
    // Add skip link for accessibility
    const body = document.body;
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Saltar al contenido principal';
    body.insertBefore(skipLink, body.firstChild);
    
    // Add main content ID if not present
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }
    
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('✅ Service Worker registered successfully:', registration.scope);
                })
                .catch(function(error) {
                    console.log('❌ Service Worker registration failed:', error);
                });
        });
    }
});