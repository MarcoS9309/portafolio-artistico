# Portafolio Artístico - Vinicio

Un portafolio web profesional diseñado para mostrar trabajos artísticos, reflexiones personales y facilitar el contacto con potenciales colaboradores.

## 🎨 Características

### Páginas Principales
- **Inicio**: Presentación general con trabajos destacados
- **Galería**: Colección completa de obras con filtros por categoría
- **Sobre Mí**: Historia personal y filosofía artística
- **Blog**: Reflexiones y proceso creativo documentado
- **Contacto**: Formulario funcional y información de contacto

### Funcionalidades Técnicas
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Navegación suave entre secciones
- ✅ Galería interactiva con filtros
- ✅ Modal de vista detallada para obras
- ✅ Formulario de contacto con validación
- ✅ Animaciones CSS y efectos hover
- ✅ SEO optimizado
- ✅ Accesibilidad mejorada

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y flexbox/grid
- **JavaScript**: Interactividad y funcionalidades dinámicas
- **Diseño**: Mobile-first, responsive design

## 📁 Estructura del Proyecto

```
portafolio-artistico/
├── index.html              # Página principal
├── galeria.html            # Galería de trabajos
├── sobre-mi.html           # Información personal
├── blog.html               # Blog/Diario personal
├── contacto.html           # Página de contacto
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   ├── main.js             # JavaScript principal
│   ├── galeria.js          # Funcionalidad de galería
│   └── contacto.js         # Formulario de contacto
├── images/
│   ├── portfolio/          # Imágenes de trabajos
│   └── profile/            # Fotos de perfil
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🎯 Cómo Usar

### Desarrollo Local
1. Clona o descarga el proyecto
2. Abre cualquier archivo HTML en tu navegador
3. ¡Listo! El sitio es completamente estático

### Para Desarrolladores
```bash
# Navega al directorio del proyecto
cd portafolio-artistico

# Abre con un servidor local (opcional)
python -m http.server 8000
# o
npx serve .
```

### Personalización
1. **Contenido**: Edita los archivos HTML con tu información
2. **Estilos**: Modifica `css/styles.css` para cambiar colores y diseño
3. **Imágenes**: Reemplaza los placeholders en `images/` con tus obras
4. **Configuración**: Actualiza variables CSS en `:root` para cambios globales

## 🎨 Personalización de Colores

Las variables CSS te permiten cambiar fácilmente la paleta de colores:

```css
:root {
    --primary-color: #2c3e50;    /* Color principal */
    --secondary-color: #3498db;  /* Color secundario */
    --accent-color: #e74c3c;     /* Color de acento */
    --text-color: #333;          /* Color de texto */
    --background-light: #fafafa; /* Fondo claro */
}
```

## 📱 Características Responsive

- **Desktop**: Layout completo con todas las funcionalidades
- **Tablet**: Adaptación de grid y navegación
- **Móvil**: Diseño optimizado para pantallas pequeñas

## 🔧 Funcionalidades Avanzadas

### Galería
- Filtros por categoría (Digital, Tradicional, Experimental)
- Vista modal ampliada
- Navegación con teclado
- Animaciones suaves

### Formulario de Contacto
- Validación en tiempo real
- Mensajes de error informativos
- Contador de caracteres
- Auto-guardado de borradores
- Simulación de envío (listo para integrar servicios reales)

### Blog
- Contenido personal auténtico
- Navegación temporal
- Diseño centrado en la lectura

## 🌐 Despliegue

### GitHub Pages
1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama principal
4. Tu sitio estará disponible en `username.github.io/repository-name`

### Netlify
1. Arrastra la carpeta del proyecto a netlify.com
2. Tu sitio estará live instantáneamente

### Vercel
```bash
npx vercel --prod
```

## 📧 Integración de Formulario

Para hacer funcional el formulario de contacto, puedes usar:

### Formspree (Recomendado)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Netlify Forms
```html
<form netlify>
```

### EmailJS
```javascript
// Configurar en js/contacto.js
emailjs.send('service_id', 'template_id', data);
```

## 🎨 Agregando Tus Obras

1. **Imágenes**: Coloca tus imágenes en `images/portfolio/`
2. **HTML**: Actualiza `galeria.html` con las rutas reales
3. **Información**: Añade títulos, descripciones y detalles técnicos

Ejemplo:
```html
<div class="gallery-item" data-category="digital">
    <img src="images/portfolio/mi-obra.jpg" alt="Mi Obra de Arte">
    <div class="gallery-overlay">
        <div>
            <h4>Título de la Obra</h4>
            <p>Descripción breve</p>
        </div>
    </div>
</div>
```

## 🎯 Próximas Mejoras

- [ ] Modo oscuro/claro
- [ ] Internacionalización (ES/EN)
- [ ] Compresión automática de imágenes
- [ ] PWA (Progressive Web App)
- [ ] Integración con redes sociales
- [ ] Sistema de comentarios en el blog
- [ ] Analytics integrado

## 🤝 Contribuciones

Este es un proyecto personal, pero sugerencias y mejoras son bienvenidas:

1. Fork del proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para detalles.

## 👨‍🎨 Autor

**Vinicio** - Artista y Creativo

- Blog: [Ver reflexiones](blog.html)
- Galería: [Ver trabajos](galeria.html)
- Contacto: [Conectar](contacto.html)

---

*Construido con 💛 y dedicación para compartir arte auténtico*
