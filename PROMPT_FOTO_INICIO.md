# Prompt para transformar NINIOS_INICIO

Objetivo: a partir de la foto real `fotos/originales/NINIOS_INICIO.jpg` (los dos
ninos), generar una version ilustrada para bautizo donde:

- La nina lleva un vestido blanco y sostiene un paraguas dorado.
- El nino viste un traje de marinero (tipico de bautizo).

Es una edicion imagen-a-imagen: hay que **conservar los rostros, edades, tono de
piel y la identidad de cada nino**. Solo cambian la vestimenta, el paraguas y el
ambiente. Sube la foto original como imagen de referencia en la herramienta.

---

## Prompt (espanol)

> Edita esta foto de los dos ninos conservando exactamente sus rostros, rasgos,
> edades y tono de piel; que sigan siendo reconocibles. Cambia solo la vestimenta
> y el entorno. Vistelos con ropa elegante de bautizo: la nina con un vestido
> blanco de encaje suave, hasta la rodilla, sosteniendo un paraguas (sombrilla)
> dorado abierto sobre ella; el nino con un traje de marinero clasico de bautizo,
> blanco con cuello marinero azul marino y detalles dorados. Fondo suave estilo
> acuarela con un degradado de cielo celeste a rosa palido y hojas de eucalipto
> difuminadas en las esquinas. Iluminacion natural, suave y calida; estetica
> serena, tierna y elegante. Composicion vertical, cuerpo completo, ambos ninos
> centrados. Alta calidad, sin texto ni marcas de agua.

## Prompt (ingles, suele dar mejores resultados)

> Edit this photo of the two children, keeping their faces, features, ages and
> skin tone exactly the same and clearly recognizable. Change only the clothing
> and setting. Dress them in elegant baptism outfits: the girl in a soft white
> lace dress at knee length, holding an open golden parasol (umbrella) above her;
> the boy in a classic baptism sailor suit, white with a navy-blue sailor collar
> and subtle gold details. Soft watercolor background with a gentle sky gradient
> from light blue to pale pink and blurred eucalyptus leaves in the corners.
> Natural, soft, warm lighting; serene, tender and elegant aesthetic. Vertical
> full-body composition, both children centered. High quality, no text, no
> watermark.

## Negative prompt (si la herramienta lo permite)

> caras distorsionadas, cambiar la identidad, rasgos diferentes, texto, letras,
> marca de agua, manos deformes, dedos extra, baja calidad, distorsion, ruido.

---

## Que hacer con el resultado

1. Guarda la imagen generada como `fotos/originales/NINIOS_INICIO.jpg`
   (reemplaza la actual) o con un nombre nuevo que empiece por `NINIOS`.
2. Ejecuta de nuevo `python scripts/optimizar_fotos.py`.
   Se regenera `assets/img/inicio.webp` (lado mayor 1200 px).
3. Avisa si quieres que la use como imagen destacada en la portada; hoy la
   portada es solo texto, y `inicio.webp` queda lista para ese uso.
