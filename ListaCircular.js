// ============================================================
// LISTA CIRCULAR SIMPLE
// Uso: rotación automática de médicos de guardia.
// El último nodo apunta de nuevo al primero, así que la
// rotación nunca se acaba: n1 → n2 → n3 → (vuelve a n1)
// ============================================================

export class NodoCircular {
  constructor(dato) {
    this.dato = dato;
    this.siguiente = null;
  }
}

export class ListaCircular {
  constructor() {
    this.cola = null;    // último nodo; cola.siguiente es siempre el primero
    this.actual = null;  // puntero al médico que está de guardia
    this.tamanio = 0;
  }

  // Agrega un médico al final del círculo de rotación
  agregar(dato) {
    const nuevo = new NodoCircular(dato);
    if (!this.cola) {
      nuevo.siguiente = nuevo; // un solo nodo se apunta a sí mismo
      this.cola = nuevo;
      this.actual = nuevo;
    } else {
      nuevo.siguiente = this.cola.siguiente; // el nuevo apunta al primero
      this.cola.siguiente = nuevo;
      this.cola = nuevo;
    }
    this.tamanio++;
  }

  // Avanza la guardia al siguiente médico del círculo
  rotar() {
    if (this.actual) {
      this.actual = this.actual.siguiente;
    }
    return this.medicoActual();
  }

  medicoActual() {
    return this.actual ? this.actual.dato : null;
  }

  // Recorre el círculo una sola vez, desde el primero
  toArray() {
    const arreglo = [];
    if (!this.cola) return arreglo;
    const primero = this.cola.siguiente;
    let nodo = primero;
    do {
      arreglo.push(nodo.dato);
      nodo = nodo.siguiente;
    } while (nodo !== primero);
    return arreglo;
  }
}
