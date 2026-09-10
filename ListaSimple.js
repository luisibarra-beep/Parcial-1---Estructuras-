export class NodoSimple {
  constructor(dato) {
    this.dato = dato;
    this.siguiente = null;
  }
}

export class ListaSimple {
  constructor() {
    this.cabeza = null;
    this.tamanio = 0;
  }

  insertarAlFinal(dato) {
    const nuevo = new NodoSimple(dato);
    if (!this.cabeza) {
      this.cabeza = nuevo;
    } else {
      let actual = this.cabeza;
      while (actual.siguiente) {
        actual = actual.siguiente;
      }
      actual.siguiente = nuevo;
    }
    this.tamanio++;
  }

  eliminarAlFrente() {
    if (!this.cabeza) return null;
    const eliminado = this.cabeza;
    this.cabeza = this.cabeza.siguiente;
    this.tamanio--;
    return eliminado.dato;
  }

  estaVacia() {
    return this.cabeza === null;
  }

  toArray() {
    const arreglo = [];
    let actual = this.cabeza;
    while (actual) {
      arreglo.push(actual.dato);
      actual = actual.siguiente;
    }
    return arreglo;
  }
}
