# 🚀 Guía de Configuración para GitHub Pages

## 📁 Estructura Actual del Repositorio

Tu portafolio está organizado correctamente:

```
portafolio-artistico/
└── Portafolio-art/
    ├── index.html          ← Página principal
    ├── css/
    │   └── styles.css      ← Estilos
    ├── js/
    │   ├── main.js
    │   └── galeria.js
    ├── images/             ← Imágenes
    ├── galeria.html
    ├── blog.html
    ├── sobre-mi.html
    ├── contacto.html
    └── otros archivos...
```

## ⚙️ Configuración de GitHub Pages

### Opción 1: Configurar desde la carpeta Portafolio-art (Recomendado)

1. **Ir a Settings del repositorio**
2. **Scroll hasta "Pages"**
3. **En Source, seleccionar:**
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)` si todo el repositorio es Portafolio-art
   - O `Portafolio-art` si es una subcarpeta

### Opción 2: Mover archivos a la raíz del repositorio

Si quieres que funcione directamente desde la raíz:

```bash
# Mover todos los archivos de Portafolio-art a la raíz
mv Portafolio-art/* .
mv Portafolio-art/.* . 2>/dev/null || true
rmdir Portafolio-art
```

## 🔧 Archivos de Configuración Creados

### 1. `.github/workflows/deploy.yml`
- **Función:** Deployment automático
- **Beneficio:** Se actualiza automáticamente con cada push

### 2. `_config.yml` 
- **Función:** Configuración de Jekyll para GitHub Pages
- **Beneficio:** Optimización SEO y configuración automática

## 🌐 URLs Esperadas

Dependiendo de tu configuración:

- **Repositorio normal:** `https://usuario.github.io/repositorio/`
- **Subcarpeta:** `https://usuario.github.io/repositorio/Portafolio-art/`
- **Usuario.github.io:** `https://usuario.github.io/`

## 🛠️ Pasos para Resolver el Problema

### Paso 1: Verificar configuración de GitHub Pages
```bash
# En tu repositorio de GitHub:
# Settings → Pages → Source
# Asegúrate de que esté configurado correctamente
```

### Paso 2: Verificar que los archivos están en la ubicación correcta
```bash
# Tu estructura debería ser:
# Si usas subcarpeta: repo/Portafolio-art/index.html
# Si usas raíz: repo/index.html
```

### Paso 3: Forzar deployment
```bash
# Hacer un pequeño cambio y push
git add .
git commit -m "Force GitHub Pages rebuild"
git push origin main
```

### Paso 4: Verificar en GitHub Actions
- Ve a la pestaña **Actions** en tu repositorio
- Verifica que el deployment se ejecute sin errores

## 🚨 Posibles Problemas y Soluciones

### Problema 1: Página en blanco
**Causa:** Rutas incorrectas en GitHub Pages
**Solución:** 
- Verificar que `index.html` esté en la raíz configurada
- Comprobar que las rutas CSS/JS sean relativas

### Problema 2: CSS no carga
**Causa:** Rutas de archivos CSS incorrectas
**Solución:**
- Verificar que `css/styles.css` existe
- Confirmar que la ruta en HTML es correcta

### Problema 3: 404 en GitHub Pages
**Causa:** Configuración incorrecta en Settings
**Solución:**
- Ir a Settings → Pages
- Cambiar source si es necesario
- Esperar 5-10 minutos para propagación

## ✅ Lista de Verificación

- [ ] Los archivos están en la ubicación correcta
- [ ] GitHub Pages está configurado en Settings
- [ ] El workflow de GitHub Actions se ejecuta sin errores
- [ ] Las rutas en HTML son relativas (no absolutas)
- [ ] El archivo `index.html` está en la raíz configurada
- [ ] CSS y JS cargan correctamente en local

## 🔄 Si Nada Funciona

### Solución Alternativa: Reorganizar estructura
```bash
# Crear nueva estructura simplificada
mkdir temp
cp -r Portafolio-art/* temp/
rm -rf Portafolio-art
mv temp/* .
rmdir temp
```

Luego commit y push:
```bash
git add .
git commit -m "Reorganizar para GitHub Pages"
git push origin main
```

## 📞 Verificación Final

Una vez configurado, tu sitio debería estar disponible en:
`https://TU_USUARIO.github.io/TU_REPOSITORIO/`

**Tiempo de propagación:** 5-10 minutos después del push.

---

**💡 Tip:** Si tienes un dominio personalizado, puedes configurarlo en Settings → Pages → Custom domain.
