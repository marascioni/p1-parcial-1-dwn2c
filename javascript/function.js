/**
 * Valida texto ingresado y en caso de error devuelve el mensaje
 * @param {String} dato Texto a validar
 * @param {String} msg Mensaje de error
 */
const validarTexto = (dato, msg) => {
  if (dato.trim().length === 0) {
    alert(msg);
    return 1;
  }
  return 0;
};

/**
 * Valida número ingresado y en caso de error devuelve el rango de valores permitidos
 * @param {Number} dato Número a validar
 * @param {Number} inf Límite inferior
 * @param {Number} sup Límite superior
 */
const validarNumero = (dato, inf, sup) => {
  if (isNaN(dato) || dato < inf || dato > sup) {
    alert(`El valor debe estar entre ${inf} y ${sup}`);
    return 1;
  }
  return 0;
};

/**
 * Ingreso de nombre de disco y autor
 * @param {String} msg Leyenda del dato pedido
 */
const cargarNombre = (msg) => {
  let flag, nombre;
  do {
    nombre = prompt(msg);
    flag = validarTexto(
      nombre,
      "El campo es obligatorio, no puede estar vacío"
    );
  } while (flag);
  return nombre;
};

/**
 * Ingreso de número de pista
 * @param {Number} inf Límite inferior
 * @param {Number} sup Límite superior
 * @param {String} msg Leyenda del dato pedido
 */
const cargarNumero = (rangoMenor, rangoMayor, msg) => {
  let flag, numero;
  do {
    numero = parseInt(prompt(`${msg} (${rangoMenor},${rangoMayor})`));
    flag = validarNumero(numero, rangoMenor, rangoMayor);
  } while (flag);
  return numero;
};

/**
 * Muestra en pantalla hasta 3 discos
 * @param {Number} indice Elemento inicial a mostrar
 */
const carrusel = (indice) => {
  var cont = 0;
  var html = [];
  document.getElementById("disco1").innerHTML = "";
  document.getElementById("disco2").innerHTML = "";
  document.getElementById("disco3").innerHTML = "";
  for (let i = indice; i <= indice + 2; i++) {
    html[cont] = discografica[i].mostrarDisco();
    cont++;
  }
  document.getElementById("disco1").innerHTML = html[0];
  document.getElementById("disco2").innerHTML = html[1];
  document.getElementById("disco3").innerHTML = html[2];
};

/**
 * Funcionamiento del carrusel
 * @param {String} direccion Dirección para que lado mover los discos
 */
const moverCarrusel = (direccion = null) => {
  var inicio,
    disco,
    html = "";
  deshabilitaImg();
  if (direccion === null) {
    if (discografica.length <= 3) {
      document.getElementById("arrowL").style.display = "none";
      document.getElementById("arrowR").style.display = "none";
      /*Muestro todos los discos cargados que son menor o igual a 3*/
      for (disco of discografica) {
        html += disco.mostrarDisco();
      }
      document.getElementById("info").innerHTML = html;
    } else {
      if (posicionCarrusel == 0) {
        document.getElementById("arrowL").style.display = "none";
        document.getElementById("arrowR").style.display = "block";
        /*Muestro los primeros 3 discos*/
        inicio = 0;
      }
      for (let i = inicio; i < inicio + 3; i++) {
        html += discografica[i].mostrarDisco();
      }
      document.getElementById("info").innerHTML = html;
    }
  } else {
    document.getElementById("info").innerHTML =
      '<div id="disco1" ></div> <div id="disco2" ></div> <div id="disco3" ></div>';
    /* document.getElementById("info").innerHTML =
      '<div id="disco1" class="cajaMostrarDisco"></div> <div id="disco2" class="cajaMostrarDisco"></div> <div id="disco3" class="cajaMostrarDisco"></div>'; */
    document.getElementById("disco1").style.display = "inline-block";
    document.getElementById("disco2").style.display = "inline-block";
    document.getElementById("disco3").style.display = "inline-block";
  }

  if (direccion === "Left") {
    if (posicionCarrusel > 0) {
      posicionCarrusel--;
      document.getElementById("arrowR").style.display = "block";
    }
    if (posicionCarrusel == 0) {
      document.getElementById("arrowL").style.display = "none";
    }
    carrusel(posicionCarrusel);
  } else if (direccion === "Right") {
    if (posicionCarrusel + 2 < discografica.length - 1) {
      posicionCarrusel++;
      document.getElementById("arrowL").style.display = "block";
    }
    if (posicionCarrusel + 2 == discografica.length - 1) {
      document.getElementById("arrowR").style.display = "none";
    }
    carrusel(posicionCarrusel);
  }
};

/**
 * Estadísticas de los discos y pistas en forma general
 *
 */
const mostrarEstadistica = () => {
  document.getElementById("infoDiscos").innerHTML = "";
  document.getElementById("infoPistas").innerHTML = "";
  var duracionDiscos = 0,
    cantPistasTotales = 0,
    disco,
    promedio = 0;
  var mayorDisco = 0,
    codMayDisc = 0,
    mayorPista = 0,
    nomMayPist = 0,
    codDiscPist = 0;
  for (disco of discografica) {
    duracionDiscos += disco.duracionDisco;
    cantPistasTotales += disco.cantPistas;
    if (mayorDisco < disco.duracionDisco) {
      mayorDisco = disco.duracionDisco;
      codMayDisc = disco.codigo;
    }
    for (pista of disco.listarPistas()) {
      if (mayorPista < pista.duracion) {
        mayorPista = pista.duracion;
        nomMayPist = pista.getNombre;
        codDiscPist = disco.codigo;
      }
    }
  }
  isNaN((duracionDiscos / cantPistasTotales).toFixed(2))
    ? (promedio = 0)
    : (promedio = (duracionDiscos / cantPistasTotales).toFixed(2));

  document.getElementById("infoDiscos").innerHTML += `'<h3>Info Discos</h3>
  <p>Cantidad cargados: ${discografica.length}</p>'`;

  isNaN((duracionDiscos / discografica.length).toFixed(2))
    ? (promedio = 0)
    : (promedio = (duracionDiscos / discografica.length).toFixed(2));
  document.getElementById(
    "infoDiscos"
  ).innerHTML += `'<p>Promedio duración: ${promedio} seg. </p>'`;
  document.getElementById(
    "infoDiscos"
  ).innerHTML += `'<p>+ duración: ${mayorDisco} seg. (Cod: ${codMayDisc}) </p>'`;

  isNaN((cantPistasTotales / discografica.length).toFixed(2))
    ? (promedio = 0)
    : (promedio = (cantPistasTotales / discografica.length).toFixed(2));

  document.getElementById("infoPistas").innerHTML += `'<h3>Info Pistas</h3>
  <p>Cantidad Promedio por disco: ${promedio}</p>'`;

  
  isNaN((duracionDiscos / cantPistasTotales).toFixed(2))
  ? (promedio = 0)
  : (promedio = (duracionDiscos / cantPistasTotales).toFixed(2));

  document.getElementById(
    "infoPistas"
  ).innerHTML += `'<p>Promedio duración: ${promedio} seg. </p>'`;
  document.getElementById(
    "infoPistas"
  ).innerHTML += `'<p>+ duración: ${mayorPista} seg. (Nom: ${nomMayPist} - Cod: ${codDiscPist})  </p>'`;
};
