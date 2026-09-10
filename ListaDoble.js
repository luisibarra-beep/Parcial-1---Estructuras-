export class NodoDoble {
  constructor(dato) {
    this.dato = dato;
    this.siguiente = null;
    this.anterior = null;
  }
}

export class ListaDoble {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.tamanio = 0;
  }

  agregarAlFinal(dato) {
    const nuevo = new NodoDoble(dato);
    if (!this.cabeza) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      this.cola.siguiente = nuevo;
      nuevo.anterior = this.cola;
      this.cola = nuevo;
    }
    this.tamanio++;
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

  toArrayInverso() {
    const arreglo = [];
    let actual = this.cola;
    while (actual) {
      arreglo.push(actual.dato);
      actual = actual.anterior;
    }
    return arreglo;
  }
}
