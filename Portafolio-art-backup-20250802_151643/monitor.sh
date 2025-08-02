#!/bin/bash

# ===============================================
# SISTEMA DE MONITOREO CONTINUO DEL PORTAFOLIO
# ===============================================
# Autor: Marcos
# Fecha: 2 de agosto de 2025
# Descripción: Script para monitoreo y mantenimiento automatizado

# Configuración
LOG_FILE="monitoring.log"
ERROR_LOG="errors.log"
BACKUP_DIR="backups"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Función para logging
log_message() {
    echo "[$DATE] $1" >> $LOG_FILE
    echo "[$DATE] $1"
}

# Función para errores
log_error() {
    echo "[$DATE] ERROR: $1" >> $ERROR_LOG
    echo "[$DATE] ERROR: $1"
}

# 1. VERIFICACIÓN DE INTEGRIDAD DE ARCHIVOS
check_file_integrity() {
    log_message "=== VERIFICANDO INTEGRIDAD DE ARCHIVOS ==="
    
    # Archivos críticos que deben existir
    critical_files=("index.html" "galeria.html" "sobre-mi.html" "blog.html" "contacto.html" "LICENSE" "robots.txt" ".htaccess")
    
    for file in "${critical_files[@]}"; do
        if [ -f "$file" ]; then
            log_message "✅ $file - OK"
        else
            log_error "❌ $file - FALTANTE"
        fi
    done
}

# 2. VERIFICACIÓN DE SINTAXIS HTML
validate_html() {
    log_message "=== VALIDANDO SINTAXIS HTML ==="
    
    for html_file in *.html; do
        if [ -f "$html_file" ]; then
            # Verificar estructura básica
            if grep -q "<!DOCTYPE html>" "$html_file" && \
               grep -q "<html" "$html_file" && \
               grep -q "</html>" "$html_file" && \
               grep -q "<head>" "$html_file" && \
               grep -q "</head>" "$html_file" && \
               grep -q "<body>" "$html_file" && \
               grep -q "</body>" "$html_file"; then
                log_message "✅ $html_file - Estructura válida"
            else
                log_error "❌ $html_file - Estructura HTML inválida"
            fi
        fi
    done
}

# 3. VERIFICACIÓN DE ENLACES INTERNOS
check_internal_links() {
    log_message "=== VERIFICANDO ENLACES INTERNOS ==="
    
    # Extraer enlaces internos y verificar que existan
    for html_file in *.html; do
        if [ -f "$html_file" ]; then
            links=$(grep -o 'href="[^"]*\.html"' "$html_file" | sed 's/href="//g' | sed 's/"//g')
            for link in $links; do
                if [ -f "$link" ]; then
                    log_message "✅ $html_file -> $link - OK"
                else
                    log_error "❌ $html_file -> $link - ENLACE ROTO"
                fi
            done
        fi
    done
}

# 4. VERIFICACIÓN DE HEADERS DE SEGURIDAD
check_security_headers() {
    log_message "=== VERIFICANDO HEADERS DE SEGURIDAD ==="
    
    security_headers=("X-Content-Type-Options" "X-Frame-Options" "X-XSS-Protection")
    
    for html_file in *.html; do
        if [ -f "$html_file" ]; then
            for header in "${security_headers[@]}"; do
                if grep -q "$header" "$html_file"; then
                    log_message "✅ $html_file - $header presente"
                else
                    log_error "❌ $html_file - $header faltante"
                fi
            done
        fi
    done
}

# 5. BACKUP AUTOMATIZADO
create_backup() {
    log_message "=== CREANDO BACKUP AUTOMATIZADO ==="
    
    # Crear directorio de backup si no existe
    mkdir -p $BACKUP_DIR
    
    # Crear nombre de backup con timestamp
    backup_name="backup_$(date '+%Y%m%d_%H%M%S').tar.gz"
    
    # Crear backup excluyendo logs y backups previos
    tar -czf "$BACKUP_DIR/$backup_name" \
        --exclude="$BACKUP_DIR" \
        --exclude="*.log" \
        --exclude="node_modules" \
        --exclude=".git" \
        .
    
    if [ $? -eq 0 ]; then
        log_message "✅ Backup creado: $backup_name"
        
        # Mantener solo los últimos 5 backups
        cd $BACKUP_DIR
        ls -t backup_*.tar.gz | tail -n +6 | xargs rm -f
        cd ..
        
        log_message "✅ Backups antiguos limpiados"
    else
        log_error "❌ Error al crear backup"
    fi
}

# 6. VERIFICACIÓN DE RENDIMIENTO
check_performance() {
    log_message "=== VERIFICANDO RENDIMIENTO ==="
    
    for html_file in *.html; do
        if [ -f "$html_file" ]; then
            size=$(du -h "$html_file" | cut -f1)
            log_message "📊 $html_file - Tamaño: $size"
            
            # Verificar si el archivo es muy grande (más de 100KB)
            size_bytes=$(stat -f%z "$html_file" 2>/dev/null || stat -c%s "$html_file" 2>/dev/null)
            if [ $size_bytes -gt 102400 ]; then
                log_error "⚠️ $html_file - Archivo grande ($size), considerar optimización"
            fi
        fi
    done
}

# 7. VERIFICACIÓN DE LICENCIAS
check_licenses() {
    log_message "=== VERIFICANDO INFORMACIÓN DE LICENCIAS ==="
    
    if grep -q "MIT" LICENSE 2>/dev/null; then
        log_message "✅ Licencia MIT presente"
    else
        log_error "❌ Licencia MIT no encontrada"
    fi
    
    # Verificar que los footers tengan información de licencia
    for html_file in *.html; do
        if grep -q "Licencia MIT" "$html_file"; then
            log_message "✅ $html_file - Información de licencia presente"
        else
            log_error "❌ $html_file - Información de licencia faltante"
        fi
    done
}

# 8. REPORTE FINAL
generate_report() {
    log_message "=== GENERANDO REPORTE FINAL ==="
    
    total_errors=$(wc -l < $ERROR_LOG 2>/dev/null || echo "0")
    
    if [ $total_errors -eq 0 ]; then
        log_message "🎉 MONITOREO COMPLETADO - Sin errores detectados"
        status="✅ SALUDABLE"
    else
        log_message "⚠️ MONITOREO COMPLETADO - $total_errors errores detectados"
        status="❌ REQUIERE ATENCIÓN"
    fi
    
    # Crear reporte resumido
    cat > "status_report.html" << EOF
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Estado del Portafolio</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #8b4513; color: white; padding: 20px; border-radius: 5px; }
        .status { padding: 20px; margin: 20px 0; border-radius: 5px; }
        .healthy { background: #d4edda; border: 1px solid #c3e6cb; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Reporte de Estado del Portafolio</h1>
        <p>Fecha: $DATE</p>
    </div>
    
    <div class="status $([ $total_errors -eq 0 ] && echo 'healthy' || echo 'warning')">
        <h2>Estado General: $status</h2>
        <p>Errores detectados: $total_errors</p>
    </div>
    
    <h3>Acciones Recomendadas:</h3>
    <ul>
        <li>Revisar el archivo errors.log para detalles específicos</li>
        <li>Verificar backups en el directorio backups/</li>
        <li>Ejecutar el script de monitoreo regularmente</li>
    </ul>
</body>
</html>
EOF

    log_message "📋 Reporte HTML generado: status_report.html"
}

# EJECUCIÓN PRINCIPAL
main() {
    log_message "🚀 INICIANDO MONITOREO CONTINUO DEL PORTAFOLIO"
    
    # Limpiar log de errores previo
    > $ERROR_LOG
    
    # Ejecutar todas las verificaciones
    check_file_integrity
    validate_html
    check_internal_links
    check_security_headers
    check_performance
    check_licenses
    create_backup
    generate_report
    
    log_message "✅ MONITOREO COMPLETADO"
}

# Ejecutar si se llama directamente
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi
