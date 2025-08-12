# 🎨 Guía para Agregar Tu Contenido Personal

## 📸 **Paso 1: Preparar tus Imágenes**

### Ubicación de archivos:
- Copia tus imágenes a: `images/portfolio/`
- Organízalas en subcarpetas si quieres:
  ```
  images/portfolio/
  ├── digital/
  ├── tradicional/
  ├── experimental/
  └── (o directamente en portfolio/)
  ```

### Requisitos técnicos:
- **Formato**: JPG (recomendado) o PNG
- **Resolución**: 1200px mínimo en el lado más largo
- **Peso**: Menos de 500KB por imagen
- **Nombres**: Sin espacios, usa guiones (ej: `mi-obra-digital-1.jpg`)

## 🔧 **Paso 2: Actualizar la Galería**

Edita el archivo `galeria.html` y reemplaza los gradientes con tus imágenes reales:

### Cambiar esto:
```html
<div class="artwork-frame" style="height: 280px; background: linear-gradient(135deg, #8b4513, #daa520); ...">
```

### Por esto:
```html
<div class="artwork-frame" style="height: 280px; position: relative; overflow: hidden;">
    <img src="images/portfolio/tu-imagen.jpg" alt="Título de tu obra" 
         style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

## 📝 **Paso 3: Personalizar Información**

### En cada obra, actualiza:
- **Título**: Cambia "Exploración Digital I" por el título real
- **Descripción**: Escribe sobre tu proceso creativo
- **Detalles técnicos**: Año, técnica, dimensiones
- **Categoría**: Asegúrate que `data-category` sea correcta

### Ejemplo completo:
```html
<div class="gallery-item vintage-border" data-category="digital">
    <div class="artwork-frame" style="height: 280px; position: relative; overflow: hidden;">
        <img src="images/portfolio/mi-pintura-digital.jpg" alt="Reflexiones Nocturnas" 
             style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="gallery-overlay">
        <div class="text-center">
            <h4 style="font-family: var(--font-display);">Reflexiones Nocturnas</h4>
            <p style="font-family: var(--font-elegant); font-style: italic;">
                Una exploración de la introspección en colores profundos
            </p>
            <div style="font-size: 0.9rem; opacity: 0.8;">
                2025 • Arte Digital • 3000x2400px
            </div>
            <button class="btn" style="margin-top: 1rem;">🔍 Ver Detalles</button>
        </div>
    </div>
</div>
```

## 🏠 **Paso 4: Actualizar Página Principal**

Edita `index.html` en la sección "Trabajos Destacados":
- Reemplaza las imágenes placeholder
- Actualiza títulos y descripciones
- Cambia los enlaces si es necesario

## 📖 **Paso 5: Personalizar Blog**

En `blog.html` puedes:
- Cambiar las fechas a reales
- Escribir tus reflexiones genuinas
- Añadir más entradas siguiendo el mismo formato

## 👤 **Paso 6: Actualizar "Sobre Mí"**

En `sobre-mi.html`:
- Cambia "Vinicio" por tu nombre real (si es diferente)
- Actualiza tu biografía y experiencias
- Modifica las redes sociales en el footer

## 📧 **Paso 7: Configurar Contacto**

En `contacto.html`:
- Cambia el email de ejemplo por el tuyo real
- Actualiza los enlaces de redes sociales
- Personaliza los tipos de colaboración

## 🎨 **Herramientas Recomendadas**

### Para optimizar imágenes:
- **Online**: TinyPNG.com, Squoosh.app
- **Software**: GIMP (gratis), Photoshop
- **Comandos**: `ffmpeg` para conversión masiva

### Para encontrar paletas de colores:
- Coolors.co
- Adobe Color
- Extrae colores de tus propias obras

### Documentación y buenas prácticas:
- [MDN Web Docs](https://developer.mozilla.org/es/)
- [W3C WAI](https://www.w3.org/WAI/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE](https://wave.webaim.org/) para evaluar accesibilidad

## 🚀 **Después de Subir Contenido**

1. **Prueba todo**: Navega por todas las páginas
2. **Verifica filtros**: Los botones de categoría funcionan
3. **Revisa responsive**: Ve cómo se ve en móvil
4. **Optimiza SEO**: Actualiza meta descriptions con tu info

## 💡 **Tips Extra**

- **Backing up**: Haz copias de seguridad antes de cambios grandes
- **Versionado**: Considera usar Git para track changes
- **Performance**: Usa WebP si tu audiencia lo soporta
- **Accesibilidad**: Siempre incluye texto alternativo en imágenes

---

## 📂 **Estado Actual - Marco Vinicio**

✅ **COMPLETADO:**
- Blog actualizado con tus entradas reales de write.as y blogspot
- Diseño profesional sin emojis infantiles
- Página "Sobre Mí" con información formal
- Títulos de galería basados en tus reflexiones ("Reflexiones Nocturnas", "Estética Musical")
- Contenido auténtico de tu trabajo en salud, humanidades y educación

🎯 **PRÓXIMOS PASOS:**
1. **Subir tus imágenes** a `images/portfolio/`
2. **Reemplazar gradientes** en galería con tus obras reales
3. **Personalizar información de contacto**

## 🖼️ **Galería Lista para tus Imágenes**

### Títulos preparados basados en tus escritos:
- "Reflexiones Nocturnas" (digital)
- "Estética Musical" (experimental) 
- "Narrativa Educativa" (tradicional)
- "Simbolismo Teológico" (experimental)

### Para agregar tus imágenes:
```html
<!-- Cambiar esto: -->
<div class="artwork-frame" style="background: linear-gradient(135deg, #2c3e50, #34495e);">

<!-- Por esto: -->
<div class="artwork-frame" style="height: 280px; position: relative; overflow: hidden;">
    <img src="images/portfolio/tu-imagen.jpg" alt="Título descriptivo" 
         style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

¿Quieres que te ayude a:
1. 🖼️ **Preparar más espacios para imágenes específicas**
2. 🎨 **Crear categorías adicionales** basadas en tu trabajo  
3. 🛠️ **Automatizar la integración** cuando tengas las imágenes listas
4. 📧 **Actualizar la información de contacto** con tus datos reales
