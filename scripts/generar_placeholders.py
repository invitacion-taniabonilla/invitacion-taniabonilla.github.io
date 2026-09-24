"""Genera imagenes de marcador de posicion para la vista previa.

Crea SVG livianos para el collage y los protagonistas, y un og.jpg 1200x630.
Se reemplazan por las fotos reales cuando esten listas (ver optimizar_fotos.py).
Uso: python scripts/generar_placeholders.py
"""

from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "assets" / "img" / "placeholder"

CELESTE = "#D6E8F4"
ROSA = "#F7DDE4"
LINO = "#F1E8DA"
OLIVA = "#6B7445"
EUCALIPTO = "#9FAE8C"
TINTA = "#3A3F2E"

# Pares de color (arriba, abajo) para variar el degradado de cada polaroid.
PARES = [
    (CELESTE, ROSA),
    (ROSA, CELESTE),
    (CELESTE, EUCALIPTO),
    (LINO, CELESTE),
    (ROSA, LINO),
    (EUCALIPTO, ROSA),
]


def svg_foto(ancho, alto, arriba, abajo, etiqueta):
    """Devuelve un SVG con degradado suave, marco de polaroid y una etiqueta."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{ancho}" height="{alto}" viewBox="0 0 {ancho} {alto}" role="img" aria-label="{etiqueta}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{arriba}"/>
      <stop offset="1" stop-color="{abajo}"/>
    </linearGradient>
  </defs>
  <rect width="{ancho}" height="{alto}" fill="url(#g)"/>
  <g fill="none" stroke="{OLIVA}" stroke-opacity="0.35" stroke-width="6" stroke-linecap="round">
    <path d="M{ancho*0.5} {alto*0.28} q -60 -70 -120 -10 q -50 55 120 130 q 170 -75 120 -130 q -60 -60 -120 10 z"/>
  </g>
  <text x="50%" y="{alto*0.72}" text-anchor="middle" font-family="Georgia, serif" font-size="{max(16, ancho//14)}" fill="{TINTA}" fill-opacity="0.55">{etiqueta}</text>
</svg>
"""


def main():
    DESTINO.mkdir(parents=True, exist_ok=True)

    # Collage: 12 polaroids cuadradas de 800 px.
    for i in range(1, 13):
        arriba, abajo = PARES[(i - 1) % len(PARES)]
        (DESTINO / f"collage-{i:02d}.svg").write_text(
            svg_foto(800, 800, arriba, abajo, "Foto"), encoding="utf-8"
        )

    # Protagonistas: 2 verticales de 1200 px de alto.
    (DESTINO / "protagonista-nino.svg").write_text(
        svg_foto(900, 1200, CELESTE, LINO, "Foto del nino"), encoding="utf-8"
    )
    (DESTINO / "protagonista-nina.svg").write_text(
        svg_foto(900, 1200, ROSA, LINO, "Foto de la nina"), encoding="utf-8"
    )

    # og.jpg 1200x630 para la vista previa en WhatsApp.
    try:
        from PIL import Image, ImageDraw, ImageFont

        og = Image.new("RGB", (1200, 630), CELESTE)
        px = og.load()
        c1 = tuple(int(CELESTE[j:j + 2], 16) for j in (1, 3, 5))
        c2 = tuple(int(ROSA[j:j + 2], 16) for j in (1, 3, 5))
        for y in range(630):
            t = y / 629
            fila = tuple(int(c1[k] + (c2[k] - c1[k]) * t) for k in range(3))
            for x in range(1200):
                px[x, y] = fila
        d = ImageDraw.Draw(og)
        try:
            fuente = ImageFont.truetype("georgia.ttf", 64)
        except OSError:
            fuente = ImageFont.load_default()
        texto = "Nuestro bautizo"
        caja = d.textbbox((0, 0), texto, font=fuente)
        d.text(((1200 - (caja[2] - caja[0])) / 2, 270), texto, fill=TINTA, font=fuente)
        (RAIZ / "assets" / "img" / "og.jpg").parent.mkdir(parents=True, exist_ok=True)
        og.save(RAIZ / "assets" / "img" / "og.jpg", quality=82)
    except ImportError:
        print("Pillow no disponible: se omite og.jpg")

    print("Placeholders generados en", DESTINO)


if __name__ == "__main__":
    main()
