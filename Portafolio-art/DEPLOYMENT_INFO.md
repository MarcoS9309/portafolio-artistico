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

