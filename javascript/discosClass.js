/**
 * Clase para representar un Disco
 */
class Disco {
  /* Propiedad privada  */
  #pistas;
  /* Propiedad pública  */

  cantPistas;
  duracionDisco;
  promedioPistas;
  mayorDuracionPista;

  /**
   * Inicializador de instancia de clase
   * @param {String} nombre Nombre del disco
   * @param {String} autor Autor o interprete
   * @param {Number} codigo Código
   */
  constructor(nombre, autor, codigo) {
    /* Inicializo las propiedades publicas con los parametros que entran */
    this.nombre = nombre;
    this.autor = autor;
    this.codigo = codigo;
    /* Inicializo las propiedades */
    this.#pistas = [];
    this.cantPistas = 0;
    this.duracionDisco = 0;
    this.promedioPistas = 0;
    this.mayorDuracionPista = 0;
  }
  /**
   * Agrega una pista al disco
   * @param {Pista} pista
   */
  agregarPista(pista) {
    /* Pushea el objeto pista a la propiedad privada */
    this.#pistas.push(pista);
  }
  /**
   * Getter para la propiedad codigo
   * @return Propiedad codigo del objeto
   */
  get getCodigo() {
    return this.codigo;
  }

  /**
   * Actualiza las métricas del disco
   */
  actualizarMetricas() {
    this.cantPistas += 1;
    this.duracionDisco += this.#pistas[this.cantPistas - 1].duracion;
    if (this.mayorDuracionPista < this.#pistas[this.cantPistas - 1].duracion) {
      this.mayorDuracionPista = this.#pistas[this.cantPistas - 1].duracion;
    }
    this.promedioPistas = this.duracionDisco / this.cantPistas;
  }

  /**
   * Devuelve las pistas de un disco
   */
  listarPistas() {
    var listaPistas = [],
      pista;
    for (pista of this.#pistas) {
      listaPistas.push(pista);
    }
    return listaPistas;
  }

  /**
   * Crea cadena HTML para la cabecera del disco
   * @param {String} imagen Nombre del icono a mostrar
   */
  htmlCabecera(clase, imagen) {
    var html;
    html = `<div class="${clase}">`;
    html += `<img src="${imagen}" alt="cargando">`;
    html += `<h2>Disco: ${this.nombre}</h2>`;
    html += `<h3>Autor/Banda: ${this.autor}</h3>`;
    html += `<h4>Código: ${this.codigo}</h4>`;
    return html;
  }

  /**
   * Crea cadena HTML para las estadística del disco
   */
  htmlEstadistica() {
    var html;
    html = `<hr><h6>Total de pistas: ${this.cantPistas}</h6>`;
    html += `<h6>Duración total: ${this.duracionDisco} seg.</h6>`;
    html += `<h6>Duración promedio: ${this.promedioPistas.toFixed(2)} seg.</h6>`;    
    html += `<h6>Pista mayor duración: ${this.mayorDuracionPista} seg.</h6>`;
    return html;
  }

  /**
   * Carga una pista dentro del objeto Disco
   * @param {String} html Cadena de HTML a mostrar en pantalla
   */
  cargarPista(html) {
    var nombrePista, duracionPista;
    var pista, cadena, flag;
    html += `<h5>Pista y Duración</h5>`;
    do {
      nombrePista = cargarNombre("Ingrese el nombre de la pista");
      duracionPista = cargarNumero(0, 7200, "Ingrese la duración de la pista");
      pista = new Pista(nombrePista, duracionPista);
      this.agregarPista(pista);
      this.actualizarMetricas();
      if (duracionPista >= 180) {
        cadena = `<span>${duracionPista}</span>`;
      } else {
        cadena = duracionPista;
      }
      /*Líneas para mostrar dentro del HTML             */
      html += `<p>${nombrePista}  -  ${cadena} seg.</p>`;
      document.getElementById("discoPortada").style.display = "none";
      document.getElementById("carga").innerHTML = html;
    } while (confirm("Continua cargando pistas"));

    /*llamada al metodo para cargar las estadisticas del disco*/
    html += this.htmlEstadistica();
    document.getElementById("carga").innerHTML = html;
  }

  /**
   * Muestra el contenido completo del disco
   */
  mostrarDisco() {
    var pista,
      html = "";
    /*Líneas para mostrar dentro del HTML             */
    html += this.htmlCabecera("cajaMostrarDisco", "./img/disco.png");
    html += `<h5>Pista y Duración</h5>`;
    html += `<ul>`;
    for (pista of this.listarPistas()) {
      html += `<li> ${pista.getNombre} - `;
      if (pista.duracion >= 180) {
        html += `<span>${pista.duracion}</span>`;
      } else {
        html += `${pista.duracion}`;
      }
      html += ` seg. </li>`;
    }
    html += this.htmlEstadistica();
    html += `</ul></div>`;
    return html;
  }
}
