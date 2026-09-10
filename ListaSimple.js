// ============================================================
// LISTA ENLAZADA SIMPLE
// Uso: cola de pacientes en espera (el primero en llegar es
// el primero en ser atendido → comportamiento FIFO).
// Cada nodo solo conoce al siguiente: cabeza → n1 → n2 → null
// ============================================================

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

  // Inserta un paciente al final de la cola
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

  // Elimina y retorna el paciente del frente (el que se atiende)
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

  // Convierte la lista a un arreglo para que React la pinte
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
