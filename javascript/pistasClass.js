/**
 * Clase para representar una pista
 */
 class Pista {
    /* Propiedades privadas */
    #nombre;
    /* Propiedades pública */
    duracion;

    /**
     * Inicializador de instancia de clase
     * @param {String} nombre Nombre de la pista
     * @param {Number} duracion Duración de la pista
     */
    constructor(nombre, duracion) {
        /* Inicializo las propiedades privadas */
        this.#nombre = nombre;
        this.duracion = duracion;
    }

    /**
     * Setter para la propiedad nombre
     * @param {String} nombre Nombre de la pista
     */
    set setNombre(nombre) {
        /* Validar la lo que entra */
        this.#nombre = nombre;
        /* Se invoca como pista.setNombre = nombre */
    }

    /**
     * Getter para la propiedad nombre
     * @return Nombre de la pista
     */
    get getNombre() {
        /* Se invoca como pista.getNombre */
        return this.#nombre;
    }
}