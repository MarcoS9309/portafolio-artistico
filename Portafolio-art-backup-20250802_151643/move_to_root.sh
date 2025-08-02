#!/bin/bash

# 🚀 Script para MOVER archivos a la raíz del repositorio
# Esto solucionará el problema de GitHub Pages

echo "🚀 REORGANIZANDO REPOSITORIO PARA GITHUB PAGES"
echo "Problema identificado: GitHub Pages muestra README.md en lugar del portafolio"
echo ""

# Mostrar estructura actual
echo "📁 Estructura actual:"
pwd
ls -la

echo ""
echo "🔍 Verificando que estamos en Portafolio-art..."

# Verificar que estamos en el directorio correcto
if [ ! -f "index.html" ]; then
    echo "❌ ERROR: No se encuentra index.html en el directorio actual"
    echo "Por favor, ejecuta este script desde la carpeta Portafolio-art"
    exit 1
fi

echo "✅ Correcto: Estamos en Portafolio-art con index.html"

# Ir al directorio padre (portafolio-artistico)
echo ""
echo "📂 Subiendo al directorio padre..."
cd ..
echo "Ahora en: $(pwd)"

# Verificar estructura del repositorio
echo ""
echo "📋 Estructura del repositorio:"
ls -la

# Verificar que existe la carpeta Portafolio-art
if [ ! -d "Portafolio-art" ]; then
    echo "❌ ERROR: No se encuentra la carpeta Portafolio-art"
    exit 1
fi

echo ""
echo "🔄 INICIANDO REORGANIZACIÓN..."

# Crear backup por seguridad
echo "💾 Creando backup..."
cp -r Portafolio-art Portafolio-art-backup-$(date +%Y%m%d_%H%M%S)

# Mover archivos HTML y directorios principales de Portafolio-art a la raíz
echo "📦 Moviendo archivos principales..."

# Archivos HTML
mv Portafolio-art/*.html . 2>/dev/null
echo "✅ Archivos HTML movidos"

# Directorios CSS, JS, e images
mv Portafolio-art/css . 2>/dev/null
mv Portafolio-art/js . 2>/dev/null  
mv Portafolio-art/images . 2>/dev/null
echo "✅ Directorios css/, js/, images/ movidos"

# Archivos de configuración importantes
mv Portafolio-art/.htaccess . 2>/dev/null
mv Portafolio-art/robots.txt . 2>/dev/null
mv Portafolio-art/LICENSE . 2>/dev/null
mv Portafolio-art/_config.yml . 2>/dev/null
mv Portafolio-art/.nojekyll . 2>/dev/null
echo "✅ Archivos de configuración movidos"

# Directorios del sistema de monitoreo (opcional)
mv Portafolio-art/.github . 2>/dev/null
mv Portafolio-art/backups . 2>/dev/null
echo "✅ Sistema de monitoreo movido"

# Scripts y documentación
mv Portafolio-art/*.sh . 2>/dev/null
mv Portafolio-art/*.md . 2>/dev/null
mv Portafolio-art/*.log . 2>/dev/null
mv Portafolio-art/*.txt . 2>/dev/null
echo "✅ Scripts y documentación movidos"

# Verificar que Portafolio-art está vacío o casi vacío
echo ""
echo "📂 Contenido restante en Portafolio-art:"
ls -la Portafolio-art/

# Si está vacío, eliminar la carpeta
if [ -z "$(ls -A Portafolio-art 2>/dev/null)" ]; then
    echo "🗑️ Eliminando carpeta Portafolio-art vacía..."
    rmdir Portafolio-art
    echo "✅ Carpeta eliminada"
else
    echo "⚠️ La carpeta Portafolio-art no está completamente vacía"
    echo "Contenido restante:"
    ls -la Portafolio-art/
fi

# Actualizar README.md para evitar conflictos
echo ""
echo "📝 Actualizando README.md..."

cat > README.md << 'EOF'
# 🎨 Portafolio Artístico - Marcos

## 🌐 Sitio Web en Vivo
[**Ver Portafolio →** https://marcos9309.github.io/portafolio-artistico/](https://marcos9309.github.io/portafolio-artistico/)

## 📖 Descripción
Portafolio personal que integra creaciones digitales, escritos reflexivos y proyectos tecnológicos. Un espacio donde la tecnología, filosofía y experiencia personal convergen en un diálogo creativo.

## 🛠️ Tecnologías
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Diseño:** Responsive, accesible, optimizado para SEO
- **Fuentes:** Google Fonts (Playfair Display, Lato, Crimson Text)
- **Deployment:** GitHub Pages

## 📂 Estructura
```
├── index.html              # Página principal
├── galeria.html           # Creaciones y proyectos
├── blog.html              # Artículos y reflexiones
├── sobre-mi.html          # Información personal
├── contacto.html          # Formulario de contacto
├── css/
│   └── styles.css         # Estilos principales
├── js/
│   ├── main.js           # JavaScript principal
│   └── galeria.js        # Funcionalidad de galería
└── images/               # Recursos visuales
```

## 🚀 Desarrollo Local
```bash
# Clonar repositorio
git clone https://github.com/MarcoS9309/portafolio-artistico.git
cd portafolio-artistico

# Servidor local
python3 -m http.server 8000
# Visitar: http://localhost:8000
```

## 📜 Licencia
- **Código:** MIT License
- **Contenido creativo:** © 2025 Marcos

## 📧 Contacto
- **Email:** alligator9339@protonmail.com
- **GitHub:** [@MarcoS9309](https://github.com/MarcoS9309)

---
*"Individuación y creación - Valorando la tecnología como herramienta de creación y manifestación en un mundo virtual."*
EOF

echo "✅ README.md actualizado"

# Mostrar nueva estructura
echo ""
echo "🎉 REORGANIZACIÓN COMPLETADA"
echo ""
echo "📁 Nueva estructura del repositorio:"
ls -la

echo ""
echo "✅ VERIFICACIONES FINALES:"

# Verificar archivos principales
if [ -f "index.html" ]; then
    echo "✅ index.html está en la raíz"
else
    echo "❌ index.html NO encontrado en la raíz"
fi

if [ -d "css" ] && [ -f "css/styles.css" ]; then
    echo "✅ CSS está en la raíz (css/styles.css)"
else
    echo "❌ CSS NO encontrado en la raíz"
fi

if [ -d "js" ] && [ -f "js/main.js" ]; then
    echo "✅ JavaScript está en la raíz (js/main.js)"
else
    echo "❌ JavaScript NO encontrado en la raíz"
fi

echo ""
echo "🚀 PRÓXIMOS PASOS:"
echo "1. Hacer commit de los cambios:"
echo "   git add ."
echo "   git commit -m 'Move portfolio files to root for GitHub Pages'"
echo "   git push origin main"
echo ""
echo "2. Esperar 5-10 minutos para que GitHub Pages se actualice"
echo ""
echo "3. Visitar: https://marcos9309.github.io/portafolio-artistico/"
echo ""
echo "✨ Tu portafolio ahora debería cargar correctamente!"
