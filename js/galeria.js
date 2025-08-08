// ===== FUNCIONALIDAD DE LA GALERÍA =====

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Funcionalidad de filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botones activos
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'var(--secondary-color)';
            });
            this.classList.add('active');
            this.style.background = 'var(--accent-color)';
            
            // Filtrar elementos
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    // Animación de aparición
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Mostrar notificación del filtro
            const filterName = {
                'all': 'Todas las obras',
                'digital': 'Arte Digital',
                'tradicional': 'Arte Tradicional',
                'experimental': 'Arte Experimental'
            };
            
            showNotification(`Mostrando: ${filterName[filter]}`, 'info');
        });
    });

    // Modal para vista detallada (implementación básica)
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openGalleryModal(this);
        });
    });

    // Efecto hover mejorado para elementos de galería
    addHoverEffect(
        galleryItems,
        item => {
            const overlay = item.querySelector('.gallery-overlay');
            item.style.transform = 'translateY(-5px) scale(1.02)';
            if (overlay) {
                overlay.style.opacity = '1';
            }
        },
        item => {
            const overlay = item.querySelector('.gallery-overlay');
            item.style.transform = 'translateY(0) scale(1)';
            if (overlay) {
                overlay.style.opacity = '0';
            }
        }
    );

    // Contador de obras por categoría
    updateWorkCount();
});

// ===== MODAL DE GALERÍA =====

function openGalleryModal(item) {
    const modal = createModal();
    const category = item.getAttribute('data-category');
    const title = item.querySelector('h4') ? item.querySelector('h4').textContent : 'Obra de Arte';
    const description = item.querySelector('p') ? item.querySelector('p').textContent : 'Descripción no disponible';
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            padding: 2rem;
            border-radius: var(--border-radius);
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        ">
            <button class="modal-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-muted);
            ">&times;</button>
            
            <div class="modal-image" style="
                width: 100%;
                height: 400px;
                background: linear-gradient(45deg, #3498db, #e74c3c);
                border-radius: var(--border-radius);
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
            ">
                Vista ampliada de la obra
            </div>
            
            <div class="modal-info">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <span style="
                        background: var(--secondary-color);
                        color: white;
                        padding: 0.25rem 0.75rem;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        text-transform: capitalize;
                    ">${category}</span>
                </div>
                
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">${title}</h2>
                <p style="color: var(--text-light); line-height: 1.6; margin-bottom: 1.5rem;">${description}</p>
                
                <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Detalles técnicos</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div>
                            <strong>Técnica:</strong><br>
                            <span style="color: var(--text-light);">${getTechniqueByCategory(category)}</span>
                        </div>
                        <div>
                            <strong>Año:</strong><br>
                            <span style="color: var(--text-light);">2025</span>
                        </div>
                        <div>
                            <strong>Estado:</strong><br>
                            <span style="color: var(--text-light);">Disponible para exhibición</span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 2rem; text-align: center;">
                    <a href="contacto.html" class="btn" style="margin-right: 1rem;">Consultar obra</a>
                    <button class="btn" style="background: var(--secondary-color);" onclick="shareArtwork('${title}')">Compartir</button>
                </div>
            </div>
        </div>
    `;
    
    // Cerrar modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', handleModalKeydown);
}

function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    }
    document.removeEventListener('keydown', handleModalKeydown);
}

function handleModalKeydown(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// ===== UTILIDADES DE GALERÍA =====

function getTechniqueByCategory(category) {
    const techniques = {
        'digital': 'Arte digital, software de diseño',
        'tradicional': 'Óleo, acrílico, carboncillo',
        'experimental': 'Técnica mixta, medios diversos'
    };
    return techniques[category] || 'Técnica mixta';
}

function shareArtwork(title) {
    if (navigator.share) {
        navigator.share({
            title: `${title} - Vinicio Arte`,
            text: `Echa un vistazo a esta obra de arte: ${title}`,
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Enlace copiado al portapapeles', 'success');
        }).catch(() => {
            showNotification('No se pudo copiar el enlace', 'error');
        });
    }
}

function updateWorkCount() {
    const categories = ['all', 'digital', 'tradicional', 'experimental'];
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    categories.forEach(category => {
        const button = document.querySelector(`[data-filter="${category}"]`);
        if (button) {
            let count;
            if (category === 'all') {
                count = galleryItems.length;
            } else {
                count = document.querySelectorAll(`[data-category="${category}"]`).length;
            }
            
            // Agregar contador al botón (opcional)
            const currentText = button.textContent;
            if (!currentText.includes('(')) {
                button.textContent = `${currentText} (${count})`;
            }
        }
    });
}

// ===== NAVEGACIÓN DE GALERÍA =====

// Funcionalidad para navegación con teclado
document.addEventListener('keydown', function(e) {
    if (!document.querySelector('.modal')) {
        // Solo si no hay modal abierto
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        const visibleItems = galleryItems.filter(item => 
            item.style.display !== 'none' && item.style.opacity !== '0'
        );
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            // Lógica para navegación con flechas (implementación futura)
        }
    }
});

// ===== BÚSQUEDA EN GALERÍA (FUNCIONALIDAD FUTURA) =====

function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar obras...';
    searchInput.className = 'form-input';
    searchInput.style.cssText = `
        max-width: 300px;
        margin: 0 auto 2rem;
        display: block;
    `;
    
    const filtersContainer = document.querySelector('.text-center.mb-3');
    if (filtersContainer) {
        filtersContainer.insertBefore(searchInput, filtersContainer.firstChild);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                const title = item.querySelector('h4') ? item.querySelector('h4').textContent.toLowerCase() : '';
                const description = item.querySelector('p') ? item.querySelector('p').textContent.toLowerCase() : '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Activar búsqueda si se necesita
// addSearchFunctionality();
