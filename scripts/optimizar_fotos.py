"""Optimiza las fotos originales al formato que usa el sitio.

Lee de  fotos/originales/  y escribe en  assets/img/  :
  - protagonista-nino.webp / protagonista-nina.webp  (lado mayor 1200 px, WebP ~80)
  - inicio.webp                                       (lado mayor 1200 px, WebP ~80)
  - collage-01.webp ... collage-NN.webp              (lado mayor 800 px, WebP ~80)
  - og.jpg                                            (1200x630, recorte centrado, JPG ~82)

Corrige la orientacion EXIF. Los nombres de salida van en minusculas, sin
espacios ni tildes. Objetivo: peso total de imagenes por debajo de 3 MB.

Reconoce los originales por el inicio del nombre de archivo:
  NINO_...        -> protagonista del nino
  NINA_...        -> protagonista de la nina
  NINIOS...       -> foto de inicio (los dos ninos)
  IMG_OPENGRAPH.. -> imagen Open Graph (vista previa de WhatsApp)
  FOTO_COLLAGE_.. -> collage (ordenadas por su numero)

Uso: python scripts/optimizar_fotos.py
"""

import glob
import os
import re
from pathlib import Path

from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
ORIGENES = RAIZ / "fotos" / "originales"
DESTINO = RAIZ / "assets" / "img"

LADO_PROTAGONISTA = 1200
LADO_INICIO = 1200
LADO_COLLAGE = 800
OG_TAM = (1200, 630)
CALIDAD_WEBP = 80
CALIDAD_JPG = 82


def cargar(ruta):
    """Abre la imagen, aplica la orientacion EXIF y la pasa a RGB."""
    im = Image.open(ruta)
    im = ImageOps.exif_transpose(im)
    return im.convert("RGB")


def guardar_webp(im, lado_mayor, salida):
    """Redimensiona al lado mayor indicado (sin agrandar) y guarda como WebP."""
    im = im.copy()
    im.thumbnail((lado_mayor, lado_mayor), Image.LANCZOS)
    im.save(salida, "WEBP", quality=CALIDAD_WEBP, method=6)
    return salida


def guardar_og(im, salida):
    """Recorta centrado a la proporcion 1200x630 y guarda como JPG."""
    im = ImageOps.fit(im, OG_TAM, Image.LANCZOS, centering=(0.5, 0.5))
    im.save(salida, "JPEG", quality=CALIDAD_JPG, optimize=True)
    return salida


def numero_en(nombre):
    """Devuelve el primer numero del nombre para ordenar el collage."""
    m = re.search(r"(\d+)", nombre)
    return int(m.group(1)) if m else 0


def main():
    if not ORIGENES.exists():
        raise SystemExit("No existe " + str(ORIGENES))
    DESTINO.mkdir(parents=True, exist_ok=True)

    archivos = [p for p in ORIGENES.iterdir()
                if p.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")]
    collage = []
    generados = []

    for ruta in archivos:
        nombre = ruta.name.upper()
        if nombre.startswith("NINO"):
            generados.append(guardar_webp(cargar(ruta), LADO_PROTAGONISTA,
                                          DESTINO / "protagonista-nino.webp"))
        elif nombre.startswith("NINA"):
            generados.append(guardar_webp(cargar(ruta), LADO_PROTAGONISTA,
                                          DESTINO / "protagonista-nina.webp"))
        elif nombre.startswith("NINIOS"):
            generados.append(guardar_webp(cargar(ruta), LADO_INICIO,
                                          DESTINO / "inicio.webp"))
        elif nombre.startswith("IMG_OPENGRAPH"):
            generados.append(guardar_og(cargar(ruta), DESTINO / "og.jpg"))
        elif nombre.startswith("FOTO_COLLAGE"):
            collage.append(ruta)

    # Collage: renumerado secuencial segun el numero del original.
    collage.sort(key=lambda p: numero_en(p.name))
    rutas_collage = []
    for i, ruta in enumerate(collage, start=1):
        salida = DESTINO / ("collage-%02d.webp" % i)
        guardar_webp(cargar(ruta), LADO_COLLAGE, salida)
        generados.append(salida)
        rutas_collage.append("./assets/img/%s" % salida.name)

    # Resumen y lista lista para pegar en config.js
    total = sum(os.path.getsize(p) for p in generados)
    print("Generados %d archivos en %s" % (len(generados), DESTINO))
    for p in generados:
        print("  %-28s %6.1f KB" % (p.name, os.path.getsize(p) / 1024))
    print("Peso total: %.2f MB (objetivo < 3 MB)" % (total / 1024 / 1024))
    print("\nLista de collage para config.js:")
    print("    collage: [")
    for r in rutas_collage:
        print('      "%s",' % r)
    print("    ],")


if __name__ == "__main__":
    main()
