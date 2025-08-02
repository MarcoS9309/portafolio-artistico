#!/bin/bash

# 🚀 Script de Organización para GitHub Pages
# Este script ayuda a preparar tu portafolio para funcionar correctamente en GitHub Pages

echo "🚀 ORGANIZANDO PORTAFOLIO PARA GITHUB PAGES"

# Verificar estructura actual
echo "📁 Estructura actual:"
ls -la

# Función para verificar si GitHub Pages está funcionando
function test_github_pages() {
    echo ""
    echo "🔍 VERIFICANDO CONFIGURACIÓN ACTUAL"
    
    # Verificar archivos principales
    if [ -f "index.html" ]; then
        echo "✅ index.html encontrado"
    else
        echo "❌ index.html NO encontrado"
    fi
    
    if [ -d "css" ] && [ -f "css/styles.css" ]; then
        echo "✅ CSS encontrado en css/styles.css"
    else
        echo "❌ CSS NO encontrado"
    fi
    
    if [ -d "js" ] && [ -f "js/main.js" ]; then
        echo "✅ JavaScript encontrado en js/main.js"
    else
        echo "❌ JavaScript NO encontrado"
    fi
}

# Función para crear estructura GitHub Pages optimizada
function setup_github_pages() {
    echo ""
    echo "⚙️ CONFIGURANDO PARA GITHUB PAGES"
    
    # Crear archivo .nojekyll para deshabilitar Jekyll si hay problemas
    touch .nojekyll
    echo "✅ .nojekyll creado (deshabilita Jekyll)"
    
    # Verificar y corregir rutas relativas
    echo "🔧 Verificando rutas relativas..."
    
    # Lista de archivos HTML a verificar
    html_files=("index.html" "galeria.html" "blog.html" "sobre-mi.html" "contacto.html")
    
    for file in "${html_files[@]}"; do
        if [ -f "$file" ]; then
            # Verificar si las rutas CSS son correctas
            if grep -q 'href="css/styles.css"' "$file"; then
                echo "✅ $file - Ruta CSS correcta"
            else
                echo "⚠️ $file - Verificar ruta CSS"
            fi
            
            # Verificar si las rutas JS son correctas
            if grep -q 'src="js/main.js"' "$file"; then
                echo "✅ $file - Ruta JS correcta"
            else
                echo "⚠️ $file - Verificar ruta JS"
            fi
        fi
    done
}

# Función para generar archivo de configuración específico para tu caso
function create_deployment_info() {
    echo ""
    echo "📋 GENERANDO INFORMACIÓN DE DEPLOYMENT"
    
    cat > DEPLOYMENT_INFO.md << 'EOF'
# 🚀 Información de Deployment

## URLs de tu Portafolio

Dependiendo de cómo configures GitHub Pages, tu sitio estará disponible en:

### Si tu repositorio se llama "portafolio-artistico":
- **URL principal:** `https://TU_USUARIO.github.io/portafolio-artistico/`
- **Con subcarpeta:** `https://TU_USUARIO.github.io/portafolio-artistico/Portafolio-art/`

### Si tu repositorio se llama "TU_USUARIO.github.io":
- **URL principal:** `https://TU_USUARIO.github.io/`

## Configuración en GitHub

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "main"
5. Folder: "/" (raíz) o "/Portafolio-art" si es subcarpeta

## Tiempo de Propagación
- **Primer deployment:** 5-10 minutos
- **Actualizaciones:** 1-3 minutos

## Si no funciona:

### Opción 1: Verificar configuración
- Revisa Settings → Pages
- Asegúrate que Branch sea "main"
- Verifica que index.html esté en la ruta correcta

### Opción 2: Forzar rebuild
```bash
git commit --allow-empty -m "Force GitHub Pages rebuild"
git push origin main
```

### Opción 3: Mover archivos a la raíz
Si todo está en "Portafolio-art/", mover a la raíz:
```bash
mv Portafolio-art/* .
mv Portafolio-art/.* . 2>/dev/null || true
rmdir Portafolio-art
git add .
git commit -m "Move files to root for GitHub Pages"
git push origin main
```

## Verificación
Una vez configurado, visita tu URL y verifica:
- [x] La página carga correctamente
- [x] Los estilos CSS se aplican
- [x] La navegación funciona
- [x] Las imágenes cargan

EOF

    echo "✅ DEPLOYMENT_INFO.md creado"
}

# Función para verificar problemas comunes
function check_common_issues() {
    echo ""
    echo "🔍 VERIFICANDO PROBLEMAS COMUNES"
    
    # Verificar archivos de configuración problemáticos
    if [ -f "_config.yml" ]; then
        echo "⚠️ _config.yml encontrado - Puede interferir con GitHub Pages"
        echo "   Considera renombrarlo si hay problemas"
    fi
    
    # Verificar archivos que pueden causar problemas
    if [ -f "CNAME" ]; then
        echo "⚠️ CNAME encontrado - Solo usar si tienes dominio personalizado"
    fi
    
    # Verificar estructura de directorios
    if [ ! -d "css" ]; then
        echo "❌ Directorio 'css' no encontrado"
    fi
    
    if [ ! -d "js" ]; then
        echo "❌ Directorio 'js' no encontrado"
    fi
    
    # Verificar tamaño de archivos grandes
    echo "📊 Archivos grandes que pueden afectar velocidad:"
    find . -name "*.html" -o -name "*.css" -o -name "*.js" | xargs ls -lh | awk '$5 > 100000 {print $9 " - " $5}'
}

# Ejecutar todas las funciones
test_github_pages
setup_github_pages
create_deployment_info
check_common_issues

echo ""
echo "✅ ORGANIZACIÓN COMPLETADA"
echo ""
echo "📝 PRÓXIMOS PASOS:"
echo "1. Commit y push de los cambios:"
echo "   git add ."
echo "   git commit -m 'Configurar para GitHub Pages'"
echo "   git push origin main"
echo ""
echo "2. Configurar GitHub Pages:"
echo "   Settings → Pages → Source: Deploy from branch → main → /"
echo ""
echo "3. Esperar 5-10 minutos y visitar tu URL"
echo ""
echo "4. Si no funciona, revisa DEPLOYMENT_INFO.md para soluciones"
