// ===== FUNCIONALIDADES PRINCIPALES =====

// Navegación responsive
document.addEventListener('DOMContentLoaded', function() {
    // Agregar clase activa al enlace de navegación actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Scroll suave para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto parallax ligero en el hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Animación de aparición para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar observador a las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Efecto hover mejorado para elementos interactivos
    const interactiveElements = document.querySelectorAll('.btn, .card, .gallery-item');
    addHoverEffect(
        interactiveElements,
        el => {
            el.style.transform = 'translateY(-2px)';
        },
        el => {
            el.style.transform = 'translateY(0)';
        }
    );
});

// ===== UTILIDADES =====

// Agrega efectos hover personalizados a una lista de elementos
function addHoverEffect(elements, onEnter, onLeave) {
    elements.forEach(element => {
        element.addEventListener('mouseenter', () => onEnter(element));
        element.addEventListener('mouseleave', () => onLeave(element));
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Colores según el tipo
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para formatear fecha
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
}

// ===== NAVEGACIÓN MÓVIL =====

// Menú hamburguesa para móviles (opcional para futura implementación)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        // Crear botón hamburguesa si no existe
        let hamburger = document.querySelector('.hamburger');
        if (!hamburger) {
            hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-color);
                cursor: pointer;
                display: block;
            `;
            
            const navContainer = document.querySelector('.nav-container');
            navContainer.appendChild(hamburger);
            
            // Funcionalidad del menú
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('mobile-active');
            });
        }
    }
}

// Ejecutar al cargar y redimensionar
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// ===== PERFORMANCE =====

// Lazy loading para imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);
