# Invitación web de bautizo

Sitio estático de una sola página: invitación digital al bautizo de dos niños (un niño y una niña). Se comparte por WhatsApp y se abre casi siempre desde celular. Se aloja en GitHub Pages.

## Stack y restricciones

- HTML, CSS y JavaScript puros. Sin frameworks, sin bundlers, sin paso de build, sin Node en producción.
- Estructura: `index.html`, `css/styles.css`, `js/main.js`, `js/config.js`. Todo el contenido editable (nombres, fecha, lugar, coordenadas, padrinos, WhatsApp) vive en `js/config.js`; el HTML no debe tener datos del evento escritos a mano.
- Sin backend. Todo lo "dinámico" se resuelve con enlaces (Google Maps, Waze, Apple Maps, Google Calendar, WhatsApp) o archivos estáticos (`bautizo.ics`).
- Rutas relativas siempre (`./assets/...`). GitHub Pages distingue mayúsculas y minúsculas en los nombres de archivo: nombres en minúsculas, sin espacios ni tildes.
- Fuentes: Google Fonts permitidas, con pila de respaldo definida.
- Sin emojis en código, textos ni commits.
- Idioma de la interfaz: español (Ecuador). Zona horaria del evento: America/Guayaquil (UTC-5, sin horario de verano).

## Herramientas de desarrollo

- Python 3 + Pillow para optimizar fotos (`scripts/optimizar_fotos.py`).
- Servidor local: `python -m http.server 8000` y abrir `http://localhost:8000`. No abrir el HTML con doble clic: el iframe del mapa y algunas rutas se comportan distinto con `file://`.
- Git + GitHub Pages (rama `main`, carpeta raíz).
- Pruebas en DevTools con emulación de celular (360x800 y 390x844) además de escritorio.

## Estructura de la página (en orden)

1. **Sobre inicial**: pantalla completa con un sobre cerrado y un sello de lacre con las iniciales de los niños. Al tocar el sello, el sobre se abre con animación y revela la invitación. Este toque es la interacción del usuario que permite iniciar la música de fondo (opcional). Debe existir un botón accesible por teclado y un enlace "Saltar" discreto. Con `prefers-reduced-motion`, el sobre se abre con un fundido simple.
2. **Portada**: "Bienvenidos a nuestro bautizo" y los nombres de los dos niños.
3. **Protagonistas**: una foto destacada de cada niño, con su nombre.
4. **Fecha y hora**: fecha escrita en español, hora, y cuenta regresiva (días, horas, minutos). Cuando la fecha pase, la cuenta se reemplaza por un mensaje de agradecimiento.
5. **Lugar**: nombre de la iglesia/salón y dirección, mapa de Google embebido y tres botones: Google Maps, Waze, Apple Maps. Si hay ceremonia y recepción en lugares distintos, esta sección se repite por lugar.
6. **Padrinos**: nombres de los padrinos de cada niño.
7. **Confirmar asistencia**: botón que abre WhatsApp con mensaje prellenado. Botón "Agregar al calendario" (Google Calendar + descarga de `.ics`).
8. **Cierre**: mensaje final y firma de los padres.

**Fondo**: collage de fotos de los niños detrás de todo el contenido. En escritorio 3-4 columnas, en celular 2. Las columnas se desplazan a velocidades distintas con el scroll (parallax), de modo que al bajar aparecen fotos nuevas. El contenido va en paneles semitransparentes con `backdrop-filter: blur()` para garantizar legibilidad. Con `prefers-reduced-motion` el collage queda estático.

## Referencia técnica de enlaces (sin API keys)

Usar coordenadas `LAT,LNG` desde `config.js`:

- Mapa embebido: `<iframe src="https://www.google.com/maps?q=LAT,LNG&z=16&output=embed" loading="lazy">`. Alternativa: pegar el iframe de Google Maps > Compartir > Insertar un mapa.
- Google Maps (ruta): `https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`
- Waze: `https://waze.com/ul?ll=LAT,LNG&navigate=yes`
- Apple Maps: `https://maps.apple.com/?daddr=LAT,LNG`
- Google Calendar: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=YYYYMMDDTHHMMSS/YYYYMMDDTHHMMSS&ctz=America/Guayaquil&location=...&details=...` (todo con `encodeURIComponent`).
- WhatsApp: `https://wa.me/593XXXXXXXXX?text=` + `encodeURIComponent(mensaje)`. Número sin `+`, sin espacios, con código de país 593 y sin el 0 inicial.
- Cuenta regresiva: construir la fecha con offset explícito, p. ej. `new Date("2026-11-14T10:00:00-05:00")`, para que funcione igual en cualquier zona horaria.

## Rendimiento

- Fotos en WebP: collage a 800 px de lado mayor, protagonistas a 1200 px, calidad ~80. Objetivo: peso total de imágenes bajo 3 MB.
- `loading="lazy"` en todas las imágenes salvo las de la portada. `width`/`height` declarados para evitar saltos de layout.
- Animaciones solo con `transform` y `opacity`. El parallax con `requestAnimationFrame`, nunca con cálculos pesados en el evento `scroll`.

## Vista previa en WhatsApp

Incluir etiquetas Open Graph en `<head>`: `og:title`, `og:description`, `og:image` (URL absoluta de GitHub Pages, imagen 1200x630 en JPG, `assets/img/og.jpg`), `og:type=website`. Sin esto, el enlace se comparte sin imagen.

## Privacidad

Son fotos de menores en un sitio público. Incluir `<meta name="robots" content="noindex, nofollow">` y un `robots.txt` que bloquee todo, para que no aparezca en buscadores. No publicar apellidos completos ni la dirección de la casa. Las fotos originales (`fotos/originales/`) no se suben al repositorio.

## Diseño (aprobado)

Concepto: combinación de tres ideas. "El sobre" es la entrada y el único momento protagonista. "Cielo de dos colores" define el fondo, las fotos protagonistas y el collage. "Botánico sereno" define la tipografía, los títulos y los detalles decorativos.

### Paleta (variables CSS en `:root`)

- `--cielo-celeste: #D6E8F4` (degradado de fondo, arriba)
- `--cielo-rosa: #F7DDE4` (degradado de fondo, abajo)
- `--lino: #F1E8DA` (sobre y paneles de contenido)
- `--oliva: #6B7445` (títulos y sello de lacre; solo texto grande, 24 px o más)
- `--eucalipto: #9FAE8C` (hojas, líneas, detalles)
- `--tinta: #3A3F2E` (texto de párrafos y datos)

El fondo de la página es un degradado vertical de cielo celeste a cielo rosa. No usar fondo crema liso ni acentos terracota.

### Tipografía

- **Fraunces** (Google Fonts, variable): títulos y nombres. Eje `SOFT` al máximo (100). Nombres de los niños en cursiva. Respaldo: `Georgia, "Times New Roman", serif`.
- **Figtree** (Google Fonts): datos prácticos (hora, dirección, botones, cuenta regresiva). Respaldo: `system-ui, sans-serif`.
- Escala tipográfica clara, texto centrado, líneas de menos de 60 caracteres en celular. Sin mayúsculas sostenidas en etiquetas, sin etiquetas sobre cada título, sin resaltar una sola palabra del título en otro color.

### Elementos

- **Sobre**: color lino, solapa triangular, sello de lacre circular en oliva con las iniciales de los niños en Fraunces cursiva y una ramita de eucalipto. Fondo detrás del sobre: el degradado de cielo. Texto bajo el sobre: "Toca el sello para abrir la invitación". Secuencia al tocar: el sello se levanta, la solapa gira (rotateX), la carta sube y se expande hasta convertirse en la página. Duración total aproximada: 2 a 2,5 s.
- **Portada**: paloma pequeña (SVG de línea en oliva) sobre "Bienvenidos a nuestro bautizo"; debajo, los dos nombres unidos por "&". Hojas de eucalipto en las esquinas.
- **Protagonistas**: dos fotos lado a lado (también en celular) en marcos con forma de arco de iglesia (`border-radius` superior de 50% del ancho), con el nombre debajo de cada una y "&" al centro.
- **Collage de fondo**: polaroids con borde blanco (más grueso abajo), sombra suave y rotación aleatoria fija entre -4 y 4 grados, sobre el degradado de cielo. Parallax por columnas como se describe arriba.
- **Paneles de contenido**: lino con opacidad aproximada de 0,85 y `backdrop-filter: blur(8px)`, esquinas suaves. Verificar contraste AA del texto sobre el panel con fotos detrás.
- **Separadores**: una ramita de eucalipto SVG pequeña entre secciones. Sin números ni viñetas decorativas.
- **Ilustraciones**: dibujar la paloma, las ramitas y las hojas como SVG propios, con trazos y rellenos suaves (opacidad para simular acuarela). Si se usan PNG de acuarela externos, deben tener licencia de uso libre y quedar registrados en un comentario del HTML.

### Movimiento

- Animación automática solo en la apertura del sobre.
- Después, el único movimiento es el parallax de las polaroids (responde al scroll).
- No agregar fundidos de entrada por sección ni efectos hover en todo.
- Con `prefers-reduced-motion`: sobre con fundido simple y collage estático.

Principio general: una sola pieza protagonista (el sobre); lo demás, sobrio. Antes de dar por terminada una fase visual, revisar y quitar un adorno.

## Forma de trabajo

- Trabajar por fases de `PLAN.md` y marcar las casillas al completarlas.
- Tras cada fase, levantar el servidor local y revisar en vista de celular antes de seguir.
- Commits pequeños en español, en imperativo: "Agrega sección de padrinos".
