/* ==========================================================================
   tema.js · Cambio entre tema oscuro y tema claro
   Resp∴ Log∴ José Hernández N° 75

   QUÉ HACE
   --------
   1. Carga solo, sin ayuda, el archivo tema.css que está a su lado.
   2. Se fija si el H∴ ya eligió un tema antes y lo aplica de entrada, antes
      de que la pantalla se dibuje (para que no haya un parpadeo oscuro).
   3. Inserta el botón de cambio al lado del botón "Cerrar sesión" / "Salir".
   4. Guarda la elección en el navegador: vale para todas las secciones y
      sigue ahí la próxima vez que entre, sin volver a tocarlo.

   CÓMO SE INSTALA
   ---------------
   Una sola línea en el <head> de cada página, justo después de la línea que
   ya carga shared/style.css. La ruta cambia según qué tan adentro esté la
   página:

     area-reservada/panel.html                      shared/tema.js
     area-reservada/legajos/index.html              ../shared/tema.js
     area-reservada/tesoreria/index.html            ../shared/tema.js
     area-reservada/biblioteca/index.html           ../shared/tema.js
     area-reservada/secretaria/index.html           ../shared/tema.js
     area-reservada/secretaria/actas/index.html     ../../shared/tema.js
     area-reservada/secretaria/admision/index.html  ../../shared/tema.js
     area-reservada/secretaria/boletines/index.html ../../shared/tema.js

   Por ejemplo, en panel.html:
     <script src="shared/tema.js"></script>

   No hace falta agregar nada más: ni la hoja de estilos, ni el botón, ni
   tocar el código que ya existe en cada pantalla.
   ========================================================================== */

(function () {
  'use strict';

  /* Si por algún motivo el archivo se carga dos veces, no duplica el botón. */
  if (window.__temaLogia) return;
  window.__temaLogia = true;

  var CLAVE = 'logia-tema';
  var raiz = document.documentElement;

  /* ---- 1. Cargar tema.css, que vive en la misma carpeta que este archivo -- */
  var yo = document.currentScript;
  if (yo && yo.src) {
    var hoja = document.createElement('link');
    hoja.rel = 'stylesheet';
    hoja.href = yo.src.replace(/tema\.js(\?.*)?$/, 'tema.css');
    (document.head || raiz).appendChild(hoja);
  }

  /* ---- 2. Memoria de la elección ---------------------------------------- */
  function leer() {
    try { return localStorage.getItem(CLAVE); } catch (e) { return null; }
  }
  function guardar(valor) {
    try { localStorage.setItem(CLAVE, valor); } catch (e) { /* modo privado */ }
  }

  var tema = (leer() === 'claro') ? 'claro' : 'oscuro';

  /* ---- 3. Los dos íconos ------------------------------------------------
     Se muestra el ícono de a dónde va, no el de dónde está: con tema oscuro
     puesto se ve un sol (tocar para aclarar), y al revés.                  */

  var SOL =
    '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" ' +
    'stroke="currentColor" stroke-width="1.5" stroke-linecap="round">' +
    '<circle cx="12" cy="12" r="4.2"/>' +
    '<path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2' +
    'M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6"/>' +
    '</svg>';

  var LUNA =
    '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" ' +
    'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" ' +
    'stroke-linejoin="round">' +
    '<path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a7.6 7.6 0 1 0 11.1 11.1z"/>' +
    '</svg>';

  /* ---- 4. Aplicar el tema ----------------------------------------------- */
  function pintar() {
    var claro = (tema === 'claro');

    if (claro) raiz.setAttribute('data-tema', 'claro');
    else raiz.removeAttribute('data-tema');

    /* La barra del navegador en el celular acompaña al tema. */
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', claro ? '#f3eee2' : '#071b14');

    var boton = document.getElementById('btn-tema');
    if (boton) {
      boton.innerHTML = claro ? LUNA : SOL;
      var texto = claro ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro';
      boton.title = texto;
      boton.setAttribute('aria-label', texto);
    }
  }

  /* ---- 5. Poner el botón en pantalla ------------------------------------ */
  function montar() {
    if (document.getElementById('btn-tema')) return;

    var boton = document.createElement('button');
    boton.type = 'button';
    boton.id = 'btn-tema';
    boton.className = 'btn-tema';
    boton.addEventListener('click', function () {
      tema = (tema === 'claro') ? 'oscuro' : 'claro';
      guardar(tema);
      pintar();
    });

    /* Todas las pantallas del área reservada tienen un botón de salir:
       el de tema se ubica justo antes. */
    var salir = document.getElementById('btn-salir');
    if (salir && salir.parentNode) {
      salir.parentNode.insertBefore(boton, salir);
    } else {
      boton.classList.add('suelto');
      document.body.appendChild(boton);
    }

    pintar();
  }

  /* Se aplica el color ya mismo, y el botón se arma cuando la página existe. */
  pintar();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montar);
  } else {
    montar();
  }
})();
