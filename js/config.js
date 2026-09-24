/*
  Configuracion de la invitacion.
  TODO EL CONTENIDO EDITABLE VIVE AQUI. El HTML no lleva datos escritos a mano.

  Datos reales cargados. Quedan PENDIENTES marcados abajo (recepcion, WhatsApp,
  firma de los papas, fecha limite). Ver datos-evento.md.
*/

const CONFIG = {
  // --- Ninos ---
  // Solo nombres de pila por privacidad (no publicar apellidos de menores).
  ninos: {
    nino: "Omar",
    nina: "Scarleth",
    iniciales: "OS",     // sello del sobre
  },

  // --- Fecha y hora del evento ---
  // Construir siempre con offset explicito -05:00 (America/Guayaquil).
  fechaISO: "2026-10-31T19:00:00-05:00", // sabado 31 de octubre de 2026, 19:00
  horaCeremonia: "19:00",
  horaRecepcion: "20:00", // vacio "" si no aplica

  // --- Lugares ---
  // Se puede repetir la seccion por lugar (ceremonia y recepcion).
  lugares: [
    {
      tipo: "Ceremonia",
      nombre: "Iglesia de San Jacinto del Bua",
      direccion: "Frente al Parque Central San Jacinto del Bua, Santo Domingo",
      lat: -0.1477155,
      lng: -79.3937788,
    },
    // PENDIENTE: lugar de la recepcion (nombre, direccion y coordenadas).
    // Descomentar y completar cuando se confirme:
    // {
    //   tipo: "Recepcion",
    //   nombre: "",
    //   direccion: "",
    //   lat: 0,
    //   lng: 0,
    // },
  ],

  // --- Padrinos ---
  padrinos: {
    nino: "Andrea Jazmin Bonilla Chicaiza",
    nina: "Ana Cristina Morales Chicaiza",
  },

  // --- Confirmacion por WhatsApp ---
  whatsapp: {
    numero: "593999999999", // PENDIENTE: 593 + numero sin 0 inicial
    mensaje: "Hola, confirmo mi asistencia al bautizo de Omar y Scarleth.",
    fechaLimite: "", // PENDIENTE: p. ej. "24 de octubre" (vacio oculta la nota)
  },

  // --- Textos ---
  textos: {
    portada: "Bienvenidos a nuestro bautizo",
    firma: "Con carino, los papas", // PENDIENTE: nombres de los papas
    vestimenta: "",                  // opcional; vacio para ocultar
  },

  // --- Musica (opcional) ---
  // Ruta al mp3 cuando este disponible; vacio "" oculta el control de audio.
  musica: "", // PLACEHOLDER: "./assets/musica/fondo.mp3"

  // --- Fotos ---
  // WebP generados por scripts/optimizar_fotos.py desde fotos/originales/.
  fotos: {
    protagonistaNino: "./assets/img/protagonista-nino.webp",
    protagonistaNina: "./assets/img/protagonista-nina.webp",
    collage: [
      "./assets/img/collage-01.webp",
      "./assets/img/collage-02.webp",
      "./assets/img/collage-03.webp",
      "./assets/img/collage-04.webp",
      "./assets/img/collage-05.webp",
      "./assets/img/collage-06.webp",
      "./assets/img/collage-07.webp",
      "./assets/img/collage-08.webp",
      "./assets/img/collage-09.webp",
      "./assets/img/collage-10.webp",
      "./assets/img/collage-11.webp",
      "./assets/img/collage-12.webp",
      "./assets/img/collage-13.webp",
      "./assets/img/collage-14.webp",
      "./assets/img/collage-15.webp",
      "./assets/img/collage-16.webp",
      "./assets/img/collage-17.webp",
      "./assets/img/collage-18.webp",
      "./assets/img/collage-19.webp",
    ],
  },
};
