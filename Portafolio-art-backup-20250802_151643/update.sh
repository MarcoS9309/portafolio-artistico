#!/bin/bash

# ===============================================
# SISTEMA DE ACTUALIZACIÓN AUTOMATIZADA
# ===============================================
# Autor: Marcos
# Fecha: 2 de agosto de 2025
# Descripción: Script para mantener el portafolio actualizado

# Configuración
UPDATE_LOG="update.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Función para logging
log_update() {
    echo "[$DATE] $1" >> $UPDATE_LOG
    echo "[$DATE] $1"
}

# 1. ACTUALIZAR HEADERS DE SEGURIDAD
update_security_headers() {
    log_update "=== ACTUALIZANDO HEADERS DE SEGURIDAD ==="
    
    for html_file in *.html; do
        if [ -f "$html_file" ] && [ "$html_file" != "404.html" ] && [ "$html_file" != "status_report.html" ]; then
            # Verificar si ya tiene headers de seguridad
            if ! grep -q "X-Content-Type-Options" "$html_file"; then
                log_update "🔄 Agregando headers de seguridad a $html_file"
                
                # Crear archivo temporal con headers de seguridad
                temp_file=$(mktemp)
                
                # Insertar headers después de la línea de theme-color
                sed '/meta name="theme-color"/a\
    <meta name="robots" content="index, follow">\
    \
    <!-- Security headers -->\
    <meta http-equiv="X-Content-Type-Options" content="nosniff">\
    <meta http-equiv="X-Frame-Options" content="DENY">\
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
' "$html_file" > "$temp_file" && mv "$temp_file" "$html_file"
                
                log_update "✅ Headers actualizados en $html_file"
            else
                log_update "✅ $html_file ya tiene headers de seguridad"
            fi
        fi
    done
}

# 2. ACTUALIZAR COPYRIGHT Y FECHAS
update_copyright() {
    log_update "=== ACTUALIZANDO COPYRIGHT Y FECHAS ==="
    
    current_year=$(date +%Y)
    
    for html_file in *.html; do
        if [ -f "$html_file" ] && [ "$html_file" != "404.html" ] && [ "$html_file" != "status_report.html" ]; then
            # Actualizar año en copyright
            if grep -q "© 20[0-9][0-9]" "$html_file"; then
                sed -i.bak "s/© 20[0-9][0-9]/© $current_year/g" "$html_file"
                rm -f "$html_file.bak"
                log_update "✅ Copyright actualizado en $html_file"
            fi
        fi
    done
}

# 3. OPTIMIZAR ARCHIVOS HTML
optimize_html() {
    log_update "=== OPTIMIZANDO ARCHIVOS HTML ==="
    
    for html_file in *.html; do
        if [ -f "$html_file" ] && [ "$html_file" != "404.html" ] && [ "$html_file" != "status_report.html" ]; then
            # Eliminar líneas vacías excesivas
            sed -i.bak '/^$/N;/^\n$/d' "$html_file"
            rm -f "$html_file.bak"
            
            # Eliminar espacios al final de líneas
            sed -i.bak 's/[[:space:]]*$//' "$html_file"
            rm -f "$html_file.bak"
            
            log_update "✅ $html_file optimizado"
        fi
    done
}

# 4. VERIFICAR Y ACTUALIZAR ENLACES
check_and_update_links() {
    log_update "=== VERIFICANDO Y ACTUALIZANDO ENLACES ==="
    
    # Lista de URLs externas a verificar
    external_urls=(
        "https://github.com/MarcoS9309"
        "https://mastodon.social/@marcosv"
        "https://marcos9309.github.io/desktop-tutorial/game.html"
    )
    
    for url in "${external_urls[@]}"; do
        if command -v curl > /dev/null 2>&1; then
            if curl -s --head "$url" | head -n 1 | grep -q "200 OK"; then
                log_update "✅ $url - Accesible"
            else
                log_update "⚠️ $url - Posible problema de acceso"
            fi
        else
            log_update "ℹ️ curl no disponible, saltando verificación de URLs"
            break
        fi
    done
}

# 5. ACTUALIZAR ROBOTS.TXT
update_robots() {
    log_update "=== ACTUALIZANDO ROBOTS.TXT ==="
    
    if [ -f "robots.txt" ]; then
        # Agregar fecha de última actualización
        if ! grep -q "# Last updated:" robots.txt; then
            echo "" >> robots.txt
            echo "# Last updated: $DATE" >> robots.txt
            log_update "✅ Fecha de actualización agregada a robots.txt"
        else
            sed -i.bak "s/# Last updated:.*/# Last updated: $DATE/" robots.txt
            rm -f robots.txt.bak
            log_update "✅ Fecha de actualización actualizada en robots.txt"
        fi
    fi
}

# 6. GENERAR SITEMAP BÁSICO
generate_sitemap() {
    log_update "=== GENERANDO SITEMAP ==="
    
    cat > sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

    for html_file in *.html; do
        if [ -f "$html_file" ] && [ "$html_file" != "404.html" ] && [ "$html_file" != "status_report.html" ]; then
            cat >> sitemap.xml << EOF
    <url>
        <loc>https://tu-dominio.com/$html_file</loc>
        <lastmod>$(date '+%Y-%m-%d')</lastmod>
        <changefreq>weekly</changefreq>
        <priority>$([ "$html_file" = "index.html" ] && echo "1.0" || echo "0.8")</priority>
    </url>
EOF
        fi
    done

    cat >> sitemap.xml << EOF
</urlset>
EOF

    log_update "✅ Sitemap generado: sitemap.xml"
}

# 7. LIMPIAR ARCHIVOS TEMPORALES
cleanup_temp_files() {
    log_update "=== LIMPIANDO ARCHIVOS TEMPORALES ==="
    
    # Eliminar archivos de backup temporales
    find . -name "*.bak" -delete 2>/dev/null
    find . -name "*~" -delete 2>/dev/null
    find . -name ".DS_Store" -delete 2>/dev/null
    
    # Limpiar logs antiguos (mantener últimos 10)
    if [ -f "$UPDATE_LOG" ]; then
        tail -n 1000 "$UPDATE_LOG" > "${UPDATE_LOG}.tmp" && mv "${UPDATE_LOG}.tmp" "$UPDATE_LOG"
    fi
    
    log_update "✅ Archivos temporales limpiados"
}

# 8. VALIDAR DESPUÉS DE ACTUALIZACIONES
validate_after_update() {
    log_update "=== VALIDANDO DESPUÉS DE ACTUALIZACIONES ==="
    
    # Ejecutar script de monitoreo para verificar integridad
    if [ -f "monitor.sh" ]; then
        bash monitor.sh > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            log_update "✅ Validación post-actualización exitosa"
        else
            log_update "⚠️ Errores detectados en validación post-actualización"
        fi
    fi
}

# FUNCIÓN PRINCIPAL
main() {
    log_update "🔄 INICIANDO PROCESO DE ACTUALIZACIÓN AUTOMATIZADA"
    
    update_security_headers
    update_copyright
    optimize_html
    check_and_update_links
    update_robots
    generate_sitemap
    cleanup_temp_files
    validate_after_update
    
    log_update "✅ PROCESO DE ACTUALIZACIÓN COMPLETADO"
    
    # Mostrar resumen
    echo ""
    echo "📋 RESUMEN DE ACTUALIZACIONES:"
    echo "================================"
    tail -n 20 $UPDATE_LOG | grep "✅\|⚠️\|❌"
}

# Ejecutar si se llama directamente
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    main "$@"
fi
