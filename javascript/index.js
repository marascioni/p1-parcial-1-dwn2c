"use strict";

/*
 * Saurrales, Carolina | Rascioni, Miguel
 */
// Discos:
var discografica = [];

// Variable global para posicionamiendo en el carrusel
var posicionCarrusel;
// Eventos click sobre los botones del carrusel
document.getElementById("arrowL").addEventListener("click", function () {
  moverCarrusel("Left");
});
document.getElementById("arrowR").addEventListener("click", function () {
  moverCarrusel("Right");
});

// Función Cargar:
const Cargar = () => {
  var nombreDisco, nombreAutor, numeroDisco;
  var discoUnidad;
  var flag,
    html = "";
  Limpiar();
  document.getElementById("carga").innerHTML = "";
  /* Líneas para deshabiliar los div de carga e info*/
  document.getElementById("info").style.display = "none";
  /*-------------------------------------------------*/
  setTimeout(() => {
    nombreDisco = cargarNombre("Ingrese el nombre del disco");
    nombreAutor = cargarNombre("Ingrese el nombre del autor/banda");
    do {
      flag = 0;
      numeroDisco = cargarNumero(
        1,
        999,
        "Ingrese el código númerico asociado al disco"
      );
      for (discoUnidad of discografica) {
        if (numeroDisco == discoUnidad.getCodigo) {
          flag = 1;
          alert(
            `El código ${numeroDisco} ya fue cargado anteriormente. Use otro código`
          );
          break;
        }
      }
    } while (flag);
    document.getElementById("discoPortada").style.display = "none";
    var disco = new Disco(nombreDisco, nombreAutor, numeroDisco);
    /*Líneas para mostrar dentro del HTML             */
    html = disco.htmlCabecera("cajaCargarDisco", "./img/cargando.jpg");    
    document.getElementById("carga").style.display = "block";
    document.getElementById("carga").innerHTML = html;
    /*-------------------------------------------------*/
    setTimeout(() => {
      disco.cargarPista(html); 
      mostrarEstadistica();           
    }, 10);
    discografica.push(disco);
    mostrarEstadistica();
  }, 10);
  
};

// Función Mostrar:
const Mostrar = () => {
  if (discografica.length > 0) {
    posicionCarrusel = 0;
    moverCarrusel();
  }
};

//Busca un disco por código
const BuscarCodigo = () => {
  var flag = 1;
  var discoUnidad;
  Limpiar();
  if (discografica.length) {
    setTimeout(() => {
      var numeroDisco = cargarNumero(
        1,
        999,
        "Ingrese el código númerico asociado al disco"
      );
      for (discoUnidad of discografica) {
        if (numeroDisco == discoUnidad.getCodigo) {
          flag = 0;
          deshabilitaImg();
          document.getElementById("info").innerHTML =
            discoUnidad.mostrarDisco();
          break;
        }
      }
      if (flag) {
        alert(`El código ${numeroDisco} no se encuentra cargado`);
      }
    }, 10);
  }
};

//Deshabilita div para mostrar la información de los discos
const deshabilitaImg = () => {
  document.getElementById("discoPortada").style.display = "none";
  document.getElementById("carga").style.display = "none";
  document.getElementById("info").style.display = "block";
};

//Limpia la pantalla de discos
const Limpiar = () => {
  document.getElementById("carga").style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("discoPortada").style.display = "block";
  document.getElementById("arrowL").style.display = "none";
  document.getElementById("arrowR").style.display = "none";
};
