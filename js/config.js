/*
  Configuracion de la invitacion.
  TODO EL CONTENIDO EDITABLE VIVE AQUI. El HTML no lleva datos escritos a mano.

  ATENCION: los valores actuales son MARCADORES DE POSICION para la vista previa.
  Reemplazar con los datos reales cuando esten listos (ver datos-evento.md).
*/

const CONFIG = {
  // --- Ninos ---
  ninos: {
    nino: "Mateo",       // PLACEHOLDER
    nina: "Valentina",   // PLACEHOLDER
    iniciales: "MV",     // PLACEHOLDER: sello del sobre
  },

  // --- Fecha y hora del evento ---
  // Construir siempre con offset explicito -05:00 (America/Guayaquil).
  fechaISO: "2026-11-14T10:00:00-05:00", // PLACEHOLDER
  horaCeremonia: "10:00",                 // PLACEHOLDER
  horaRecepcion: "13:00",                 // PLACEHOLDER (vacio "" si no aplica)

  // --- Lugares ---
  // Se puede repetir la seccion por lugar (ceremonia y recepcion).
  lugares: [
    {
      tipo: "Ceremonia",
      nombre: "Iglesia de la Comunidad",        // PLACEHOLDER
      direccion: "Sector referencial, la ciudad", // PLACEHOLDER (sin direccion exacta de casa)
      lat: -0.180653,   // PLACEHOLDER (Quito centro)
      lng: -78.467834,  // PLACEHOLDER
    },
    {
      tipo: "Recepcion",
      nombre: "Salon de eventos",                // PLACEHOLDER
      direccion: "Sector referencial, la ciudad", // PLACEHOLDER
      lat: -0.176000,   // PLACEHOLDER
      lng: -78.480000,  // PLACEHOLDER
    },
  ],

  // --- Padrinos ---
  padrinos: {
    nino: "Padrino y madrina por confirmar",   // PLACEHOLDER
    nina: "Padrino y madrina por confirmar",   // PLACEHOLDER
  },

  // --- Confirmacion por WhatsApp ---
  whatsapp: {
    numero: "593999999999", // PLACEHOLDER: 593 + numero sin 0 inicial
    mensaje: "Hola, confirmo mi asistencia al bautizo de Mateo y Valentina.", // PLACEHOLDER
    fechaLimite: "7 de noviembre", // PLACEHOLDER
  },

  // --- Textos ---
  textos: {
    portada: "Bienvenidos a nuestro bautizo",
    firma: "Con carino, los papas", // PLACEHOLDER
    vestimenta: "",                  // PLACEHOLDER opcional; vacio para ocultar
  },

  // --- Musica (opcional) ---
  // Ruta al mp3 cuando este disponible; vacio "" oculta el control de audio.
  musica: "", // PLACEHOLDER: "./assets/musica/fondo.mp3"

  // --- Fotos ---
  // PLACEHOLDER: rutas a los SVG de marcador. Reemplazar por los WebP reales.
  fotos: {
    protagonistaNino: "./assets/img/placeholder/protagonista-nino.svg",
    protagonistaNina: "./assets/img/placeholder/protagonista-nina.svg",
    collage: [
      "./assets/img/placeholder/collage-01.svg",
      "./assets/img/placeholder/collage-02.svg",
      "./assets/img/placeholder/collage-03.svg",
      "./assets/img/placeholder/collage-04.svg",
      "./assets/img/placeholder/collage-05.svg",
      "./assets/img/placeholder/collage-06.svg",
      "./assets/img/placeholder/collage-07.svg",
      "./assets/img/placeholder/collage-08.svg",
      "./assets/img/placeholder/collage-09.svg",
      "./assets/img/placeholder/collage-10.svg",
      "./assets/img/placeholder/collage-11.svg",
      "./assets/img/placeholder/collage-12.svg",
    ],
  },
};
