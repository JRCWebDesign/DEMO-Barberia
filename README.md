# Benja Barber

Sitio estático de Benja, barbero en Canelones, Uruguay. HTML, CSS y JavaScript sin compilación.

## Vista local

Desde esta carpeta ejecutar `python -m http.server 4190 --bind 127.0.0.1` y abrir http://127.0.0.1:4190.

## Diseño

- Poste de barbería en CSS con franjas animadas y terminaciones cromadas.
- Portada responsive, menú mobile y reserva fija en celulares.
- Loader breve y no bloqueante, entrada de títulos y secciones al desplazarse.
- Respeta movimiento reducido; permite pausar animaciones y pausa el poste fuera de pantalla.
- Reservas por enlaces directos a WhatsApp que funcionan sin JavaScript.
- Preguntas frecuentes con elementos nativos `details` / `summary`.
- Presenta a Benja como barbero en Canelones, sin referencias a un local físico.

## Contenido

Servicios, precios, horarios y enlaces se editan en `index.html`. Se conservaron los precios y horarios anteriores. Reservas: `59898267576`. Instagram: `benja__barber582`.

Google Fonts sirve las tipografías, con respaldo local. El poste y las ilustraciones tipográficas de servicios no requieren imágenes ni librerías. Las imágenes heredadas de `img/` se conservan, pero la portada ya no usa la imagen del salón de belleza.
