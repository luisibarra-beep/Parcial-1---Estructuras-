// ============================================================
// LISTA DOBLEMENTE ENLAZADA
// Uso: historial de atención. Cada nodo conoce al siguiente
// y al anterior, así se puede recorrer en ambas direcciones:
// null ← n1 ⇄ n2 ⇄ n3 → null
// ============================================================

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

  // Agrega un registro de atención al final del historial
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

  // Recorrido hacia adelante: del más antiguo al más reciente
  toArray() {
    const arreglo = [];
    let actual = this.cabeza;
    while (actual) {
      arreglo.push(actual.dato);
      actual = actual.siguiente;
    }
    return arreglo;
  }

  // Recorrido hacia atrás: del más reciente al más antiguo
  // (demuestra el uso del puntero "anterior")
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
