# Plan de trabajo

## Fase 0 - Datos
- [ ] Completar `datos-evento.md` (Ethan) -- faltan: recepcion, WhatsApp, firma, fecha limite
- [x] Copiar fotos originales a `fotos/originales/` (Ethan)
- [x] Pasar los datos a `js/config.js` (parcial: pendientes marcados con PENDIENTE)

## Fase 1 - Diseño
- [x] Concepto aprobado: sobre + cielo de dos colores + botánico (ver CLAUDE.md, sección Diseño)
- [ ] Proponer wireframe ASCII de escritorio y validar con Ethan

## Fase 2 - Base
- [x] `index.html` semántico con todas las secciones, contenido leído desde `config.js`
- [x] `css/styles.css` con variables de diseño, responsive desde 360 px
- [x] Meta tags: viewport, Open Graph, robots noindex; `robots.txt`

> Vista previa armada con datos y fotos de marcador (placeholders). Reemplazar
> por el material real al completar Fase 0.

## Fase 3 - Fotos
- [x] `scripts/optimizar_fotos.py`: lee `fotos/originales/`, corrige orientación EXIF, exporta WebP a `assets/img/` (collage 800 px, protagonistas 1200 px) y genera `assets/img/og.jpg` 1200x630
- [x] Generar lista de fotos del collage en `config.js` (o JSON)

## Fase 4 - Sobre inicial
- [x] Sobre cerrado a pantalla completa con sello de iniciales
- [x] Animación de apertura y revelado; enlace "Saltar"; teclado y reduced-motion
- [ ] Música opcional que arranca al abrir, con botón para silenciar (listo en código; falta el mp3)

## Fase 5 - Collage de fondo
- [x] Columnas con parallax a distintas velocidades (rAF)
- [x] Paneles de contenido con blur y contraste suficiente
- [x] 2 columnas en celular; estático con reduced-motion

## Fase 6 - Funcionalidad
- [x] Cuenta regresiva con zona America/Guayaquil y mensaje post-evento
- [x] Mapa embebido + botones Google Maps, Waze, Apple Maps
- [x] Confirmación por WhatsApp con mensaje prellenado
- [x] Google Calendar + `bautizo.ics` descargable

## Fase 7 - Revisión
- [ ] Probar en Android (Chrome) e iPhone (Safari) reales
- [ ] Revisar peso total y velocidad con datos móviles (DevTools, throttling "Fast 4G")
- [ ] Revisar ortografía y tildes de todos los textos

## Fase 8 - Publicación
- [ ] Crear repo en GitHub (cuenta Ethan-Taipe), push a `main`
- [ ] Settings > Pages > Deploy from a branch > `main` / root
- [ ] Verificar URL final y actualizar `og:image` con URL absoluta
- [ ] Probar la vista previa pegando el enlace en un chat de WhatsApp
