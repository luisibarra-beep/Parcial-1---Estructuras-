// ============================================================
// LISTA CIRCULAR DOBLEMENTE ENLAZADA
// Uso: comité administrativo. Cada nodo apunta al siguiente
// y al anterior, y el último se conecta con el primero:
// n1 ⇄ n2 ⇄ n3, y n3 ⇄ n1 (ciclo en ambas direcciones).
// Permite navegar el comité con ◀ y ▶ sin llegar nunca a null.
// ============================================================

export class NodoCircularDoble {
  constructor(dato) {
    this.dato = dato;
    this.siguiente = null;
    this.anterior = null;
  }
}

export class ListaCircularDoble {
  constructor() {
    this.inicio = null;  // punto de partida fijo para recorrer
    this.actual = null;  // miembro seleccionado en el panel
    this.tamanio = 0;
  }

  // Agrega un miembro al final del círculo (antes del inicio)
  agregar(dato) {
    const nuevo = new NodoCircularDoble(dato);
    if (!this.inicio) {
      nuevo.siguiente = nuevo;
      nuevo.anterior = nuevo;
      this.inicio = nuevo;
      this.actual = nuevo;
    } else {
      const ultimo = this.inicio.anterior;
      nuevo.siguiente = this.inicio;
      nuevo.anterior = ultimo;
      ultimo.siguiente = nuevo;
      this.inicio.anterior = nuevo;
    }
    this.tamanio++;
  }

  // Navega al siguiente miembro (nunca sale del círculo)
  siguiente() {
    if (this.actual) {
      this.actual = this.actual.siguiente;
    }
    return this.miembroActual();
  }

  // Navega al miembro anterior (nunca sale del círculo)
  anterior() {
    if (this.actual) {
      this.actual = this.actual.anterior;
    }
    return this.miembroActual();
  }

  miembroActual() {
    return this.actual ? this.actual.dato : null;
  }

  // Recorre el círculo una sola vez, desde el inicio
  toArray() {
    const arreglo = [];
    if (!this.inicio) return arreglo;
    let nodo = this.inicio;
    do {
      arreglo.push(nodo.dato);
      nodo = nodo.siguiente;
    } while (nodo !== this.inicio);
    return arreglo;
  }
}
