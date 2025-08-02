# 📚 Guía de Monitoreo Continuo y Mantenimiento

## 🎯 Descripción General

Este sistema proporciona monitoreo continuo y mantenimiento automatizado para tu portafolio web, asegurando su integridad, seguridad y rendimiento óptimo.

## 🛠️ Herramientas Incluidas

### 1. **monitor.sh** - Script de Monitoreo
**Función:** Verificación completa del estado del portafolio
**Frecuencia recomendada:** Diario

**Verificaciones incluidas:**
- ✅ Integridad de archivos críticos
- ✅ Validación de sintaxis HTML
- ✅ Enlaces internos y externos
- ✅ Headers de seguridad
- ✅ Rendimiento y tamaño de archivos
- ✅ Información de licencias
- ✅ Backup automático

**Uso:**
```bash
./monitor.sh
```

### 2. **update.sh** - Script de Actualización
**Función:** Mantenimiento y optimización automatizada
**Frecuencia recomendada:** Semanal

**Actualizaciones incluidas:**
- 🔄 Headers de seguridad
- 🔄 Copyright y fechas
- 🔄 Optimización de HTML
- 🔄 Verificación de enlaces
- 🔄 Actualización de robots.txt
- 🔄 Generación de sitemap
- 🔄 Limpieza de archivos temporales

**Uso:**
```bash
./update.sh
```

### 3. **admin_panel.html** - Panel de Control Web
**Función:** Interfaz visual para monitoreo y control
**Acceso:** Navegador web

**Características:**
- 📊 Dashboard de estado en tiempo real
- ⚡ Acciones rápidas
- 📈 Métricas de rendimiento
- 🔒 Estado de seguridad
- 📋 Visualización de logs

**Uso:**
Abre `admin_panel.html` en tu navegador

## 🚀 Configuración Inicial

### Paso 1: Permisos de Ejecución
```bash
chmod +x monitor.sh update.sh
```

### Paso 2: Prueba Manual
```bash
# Ejecutar monitoreo
./monitor.sh

# Ejecutar actualización
./update.sh
```

### Paso 3: Configurar Automatización (Opcional)
```bash
# Editar crontab
crontab -e

# Agregar tareas automatizadas (ver cron_setup.txt)
```

## 📋 Archivos Generados

| Archivo | Descripción | Frecuencia |
|---------|-------------|------------|
| `monitoring.log` | Log de monitoreo | Diario |
| `update.log` | Log de actualizaciones | Semanal |
| `errors.log` | Registro de errores | Cuando ocurren |
| `status_report.html` | Reporte visual de estado | Cada monitoreo |
| `sitemap.xml` | Mapa del sitio actualizado | Cada actualización |
| `backups/` | Copias de seguridad | Automático |

## 🔧 Personalización

### Modificar Frecuencias de Verificación
Edita las variables en los scripts:

**monitor.sh:**
```bash
# Cambiar directorio de backups
BACKUP_DIR="mis_backups"

# Modificar archivos críticos a verificar
critical_files=("index.html" "mi_archivo.html")
```

**update.sh:**
```bash
# Cambiar URLs a verificar
external_urls=("https://mi-url.com")
```

### Configurar Notificaciones por Email
```bash
# En cron_setup.txt, descomentar y configurar:
0 8 * * * cd /ruta/a/tu/portafolio && if [ -s errors.log ]; then tail -n 10 errors.log | mail -s "Errores en Portafolio" tu-email@ejemplo.com; fi
```

## 🚨 Resolución de Problemas

### Problema: Scripts no ejecutan
**Solución:**
```bash
chmod +x monitor.sh update.sh
```

### Problema: Permisos de escritura
**Solución:**
```bash
# Verificar propietario
ls -la

# Cambiar permisos si es necesario
chmod 755 .
```

### Problema: Enlaces rotos detectados
**Solución:**
1. Revisar `errors.log`
2. Corregir URLs en archivos HTML
3. Re-ejecutar `./monitor.sh`

### Problema: Backup falló
**Solución:**
```bash
# Verificar espacio en disco
df -h

# Crear directorio de backup manualmente
mkdir -p backups
```

## 📈 Mejores Prácticas

### 1. **Monitoreo Regular**
- Ejecuta `monitor.sh` semanalmente como mínimo
- Revisa logs mensualmente
- Verifica backups trimestralmente

### 2. **Mantenimiento Preventivo**
- Ejecuta `update.sh` antes de cada despliegue
- Limpia logs antiguos mensualmente
- Actualiza dependencias externas

### 3. **Seguridad**
- Cambia URLs por defecto en configuraciones
- No expongas `admin_panel.html` en producción
- Protege directorios de logs y backups

### 4. **Rendimiento**
- Monitorea tamaño de archivos
- Optimiza imágenes regularmente
- Revisa velocidad de carga

## 🔮 Funcionalidades Avanzadas

### 1. **Integración con Git**
```bash
# Agregar al final de update.sh
git add .
git commit -m "Actualización automática $(date)"
git push origin main
```

### 2. **Notificaciones Slack/Discord**
```bash
# Webhook notification
curl -X POST -H 'Content-type: application/json' \
--data '{"text":"Portafolio actualizado ✅"}' \
YOUR_WEBHOOK_URL
```

### 3. **Análisis de Logs**
```bash
# Estadísticas de errores
grep "ERROR" *.log | wc -l

# Últimos errores
tail -n 50 errors.log
```

## 📞 Soporte y Contacto

- 📧 Email: alligator9339@protonmail.com
- 📚 Documentación: SECURITY.md
- 🐛 Reportar bugs: Revisar logs y crear issue

---

**Última actualización:** 2 de agosto de 2025  
**Versión:** 1.0  
**Autor:** Marcos
