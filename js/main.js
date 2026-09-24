/* Logica de la invitacion. Lee CONFIG desde config.js y arma la pagina. */
(function () {
  "use strict";

  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    rellenarTextos();
    construirProtagonistas();
    construirFecha();
    construirLugares();
    construirPadrinos();
    construirConfirmacion();
    construirCollage();
    iniciarSobre();
    iniciarMusica();
    iniciarParallax();
  });

  // ---------- Utilidades ----------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function setTexto(sel, valor) {
    document.querySelectorAll(sel).forEach(function (el) { el.textContent = valor; });
  }

  // ---------- Textos base ----------
  function rellenarTextos() {
    setTexto("[data-nino]", CONFIG.ninos.nino);
    setTexto("[data-nina]", CONFIG.ninos.nina);
    setTexto('[data-texto="portada"]', CONFIG.textos.portada);

    const sello = $("#selloIniciales");
    if (sello) sello.textContent = CONFIG.ninos.iniciales;

    const firma = $("#firma");
    if (firma) firma.textContent = CONFIG.textos.firma;

    // "Del <nombre>" en la seccion de padrinos
    document.querySelectorAll(".padrino-de[data-nino]").forEach(function (el) {
      el.textContent = "De " + CONFIG.ninos.nino;
    });
    document.querySelectorAll(".padrino-de[data-nina]").forEach(function (el) {
      el.textContent = "De " + CONFIG.ninos.nina;
    });
  }

  // ---------- Protagonistas ----------
  function construirProtagonistas() {
    const p = CONFIG.fotos.protagonistas;
    setImg("#fotoNinoAntes", p.nino.antes, CONFIG.ninos.nino + " de bebe");
    setImg("#fotoNinoAhora", p.nino.ahora, CONFIG.ninos.nino);
    setImg("#fotoNinaAntes", p.nina.antes, CONFIG.ninos.nina + " de bebe");
    setImg("#fotoNinaAhora", p.nina.ahora, CONFIG.ninos.nina);
    iniciarToggleTiempo();
  }

  function setImg(sel, src, alt) {
    const el = $(sel);
    if (el) { el.src = src; el.alt = "Foto de " + alt; }
  }

  // Switch Antes / Ahora: alterna las fotos con un crossfade (via CSS).
  function iniciarToggleTiempo() {
    const btn = $("#switchTiempo");
    const grid = $("#protagonistasGrid");
    const etqAntes = $("#etqAntes");
    const etqAhora = $("#etqAhora");
    if (!btn || !grid) return;

    function aplicar(tiempo) {
      grid.setAttribute("data-tiempo", tiempo);
      const esAhora = tiempo === "ahora";
      btn.setAttribute("aria-checked", String(esAhora));
      if (etqAhora) etqAhora.classList.toggle("activa", esAhora);
      if (etqAntes) etqAntes.classList.toggle("activa", !esAhora);
    }

    btn.addEventListener("click", function () {
      aplicar(grid.getAttribute("data-tiempo") === "ahora" ? "antes" : "ahora");
    });
    if (etqAntes) etqAntes.addEventListener("click", function () { aplicar("antes"); });
    if (etqAhora) etqAhora.addEventListener("click", function () { aplicar("ahora"); });
  }

  // ---------- Fecha y cuenta regresiva ----------
  function construirFecha() {
    const fecha = new Date(CONFIG.fechaISO);
    const larga = new Intl.DateTimeFormat("es-EC", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }).format(fecha);
    setTexto("#fechaLarga", larga);

    let horaTxt = "Ceremonia " + CONFIG.horaCeremonia;
    if (CONFIG.horaRecepcion) horaTxt += " - Recepcion " + CONFIG.horaRecepcion;
    setTexto("#horaTexto", horaTxt);

    const cuenta = $("#cuenta");
    const cuentaFin = $("#cuentaFin");

    function actualizar() {
      const restante = fecha.getTime() - Date.now();
      if (restante <= 0) {
        if (cuenta) cuenta.hidden = true;
        if (cuentaFin) cuentaFin.hidden = false;
        return true;
      }
      const dias = Math.floor(restante / 86400000);
      const horas = Math.floor((restante % 86400000) / 3600000);
      const min = Math.floor((restante % 3600000) / 60000);
      setTexto("#cDias", dias);
      setTexto("#cHoras", horas);
      setTexto("#cMin", min);
      return false;
    }

    if (!actualizar()) {
      const id = setInterval(function () { if (actualizar()) clearInterval(id); }, 30000);
    }
  }

  // ---------- Lugares ----------
  function construirLugares() {
    const cont = $("#lugaresContenedor");
    if (!cont) return;

    CONFIG.lugares.forEach(function (lugar) {
      const ll = lugar.lat + "," + lugar.lng;
      const bloque = document.createElement("div");
      bloque.className = "lugar";
      bloque.innerHTML =
        '<p class="lugar-tipo"></p>' +
        '<p class="lugar-nombre"></p>' +
        '<p class="lugar-direccion"></p>' +
        '<iframe class="mapa" loading="lazy" title="Mapa del lugar"></iframe>' +
        '<div class="botones">' +
          '<a class="boton" target="_blank" rel="noopener" data-gmaps>Google Maps</a>' +
          '<a class="boton" target="_blank" rel="noopener" data-waze>Waze</a>' +
          '<a class="boton" target="_blank" rel="noopener" data-apple>Apple Maps</a>' +
        '</div>';

      $(".lugar-tipo", bloque).textContent = lugar.tipo;
      $(".lugar-nombre", bloque).textContent = lugar.nombre;
      $(".lugar-direccion", bloque).textContent = lugar.direccion;
      $(".mapa", bloque).src = "https://www.google.com/maps?q=" + ll + "&z=16&output=embed";
      $("[data-gmaps]", bloque).href = "https://www.google.com/maps/dir/?api=1&destination=" + ll;
      $("[data-waze]", bloque).href = "https://waze.com/ul?ll=" + ll + "&navigate=yes";
      $("[data-apple]", bloque).href = "https://maps.apple.com/?daddr=" + ll;

      cont.appendChild(bloque);
    });
  }

  // ---------- Padrinos ----------
  function construirPadrinos() {
    setTexto("#padrinosNino", CONFIG.padrinos.nino);
    setTexto("#padrinosNina", CONFIG.padrinos.nina);
  }

  // ---------- Confirmacion, calendario e ICS ----------
  function construirConfirmacion() {
    const w = CONFIG.whatsapp;
    const btnW = $("#btnWhatsapp");
    if (btnW) btnW.href = "https://wa.me/" + w.numero + "?text=" + encodeURIComponent(w.mensaje);

    const texto = $("#confirmarTexto");
    if (texto && w.fechaLimite) {
      texto.textContent = "Agradecemos confirmar antes del " + w.fechaLimite + ".";
    }

    const inicio = new Date(CONFIG.fechaISO);
    const fin = new Date(inicio.getTime() + 3 * 3600000); // duracion estimada 3 h
    const titulo = "Bautizo de " + CONFIG.ninos.nino + " y " + CONFIG.ninos.nina;
    const lugar = CONFIG.lugares[0] ? CONFIG.lugares[0].nombre + ", " + CONFIG.lugares[0].direccion : "";

    const btnCal = $("#btnCalendar");
    if (btnCal) {
      const url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
        "&text=" + encodeURIComponent(titulo) +
        "&dates=" + fechaGoogle(inicio) + "/" + fechaGoogle(fin) +
        "&ctz=America/Guayaquil" +
        "&location=" + encodeURIComponent(lugar) +
        "&details=" + encodeURIComponent("Nuestro bautizo");
      btnCal.href = url;
    }

    const btnIcs = $("#btnIcs");
    if (btnIcs) {
      const ics = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//bautizo//ES",
        "BEGIN:VEVENT",
        "UID:" + Date.now() + "@bautizo",
        "DTSTART:" + fechaIcs(inicio),
        "DTEND:" + fechaIcs(fin),
        "SUMMARY:" + titulo,
        "LOCATION:" + lugar.replace(/,/g, "\\,"),
        "DESCRIPTION:Nuestro bautizo",
        "END:VEVENT", "END:VCALENDAR",
      ].join("\r\n");
      btnIcs.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
    }
  }

  function pad(n) { return String(n).padStart(2, "0"); }
  // Google Calendar: UTC en formato YYYYMMDDTHHMMSSZ
  function fechaGoogle(d) {
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) +
      "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + "Z";
  }
  function fechaIcs(d) { return fechaGoogle(d); }

  // ---------- Collage con columnas ----------
  function construirCollage() {
    const cont = $("#collage");
    if (!cont) return;
    const fotos = CONFIG.fotos.collage || [];
    const nCols = window.matchMedia("(min-width: 720px)").matches ? 4 : 2;

    const cols = [];
    for (let i = 0; i < nCols; i++) {
      const col = document.createElement("div");
      col.className = "collage-col";
      cont.appendChild(col);
      cols.push(col);
    }

    // Duplicamos la lista para cubrir columnas largas
    const lista = fotos.concat(fotos);
    lista.forEach(function (src, i) {
      const fig = document.createElement("div");
      fig.className = "polaroid";
      const rot = ((i * 37) % 9) - 4; // rotacion fija entre -4 y 4 grados
      fig.style.transform = "rotate(" + rot + "deg)";
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      img.width = 800; img.height = 800;
      fig.appendChild(img);
      cols[i % nCols].appendChild(fig);
    });
  }

  // ---------- Parallax por columnas ----------
  function iniciarParallax() {
    if (reducido) return;
    const cols = Array.prototype.slice.call(document.querySelectorAll(".collage-col"));
    if (!cols.length) return;
    const factores = cols.map(function (_, i) { return 0.12 + i * 0.06; });
    let ticking = false;

    function render() {
      const y = window.scrollY || window.pageYOffset;
      cols.forEach(function (col, i) {
        col.style.transform = "translateY(" + (-y * factores[i]) + "px)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(render); ticking = true; }
    }, { passive: true });
    render();
  }

  // ---------- Sobre inicial ----------
  function iniciarSobre() {
    const pantalla = $("#sobrePantalla");
    const sobre = $("#sobre");
    const sello = $("#selloBtn");
    const saltar = $("#saltarLink");
    if (!pantalla || !sobre) return;

    let abierto = false;
    function abrir() {
      if (abierto) return;
      abierto = true;
      reproducirMusica(); // el toque del usuario habilita el audio
      if (!reducido) sobre.classList.add("abriendo");
      const espera = reducido ? 0 : 700;
      setTimeout(function () {
        pantalla.classList.add("abierto");
        setTimeout(function () { pantalla.style.display = "none"; }, 600);
      }, espera);
    }

    if (sello) sello.addEventListener("click", abrir);
    if (saltar) saltar.addEventListener("click", function (e) { e.preventDefault(); abrir(); });
  }

  // ---------- Musica opcional ----------
  let audio, musicaBtn, quiereMusica = false;
  function iniciarMusica() {
    if (!CONFIG.musica) return; // sin archivo: no se muestra el control
    audio = $("#audioFondo");
    musicaBtn = $("#musicaBtn");
    if (!audio || !musicaBtn) return;
    audio.src = CONFIG.musica;
    musicaBtn.hidden = false;
    quiereMusica = true;
    musicaBtn.addEventListener("click", function () {
      if (audio.paused) { audio.play(); musicaBtn.setAttribute("aria-pressed", "true"); }
      else { audio.pause(); musicaBtn.setAttribute("aria-pressed", "false"); }
    });
  }
  function reproducirMusica() {
    if (quiereMusica && audio) {
      audio.play().then(function () {
        musicaBtn.setAttribute("aria-pressed", "true");
      }).catch(function () { /* el navegador puede bloquear; el boton queda disponible */ });
    }
  }
})();
