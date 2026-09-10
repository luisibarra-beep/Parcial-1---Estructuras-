export class NodoCircularDoble {
  constructor(dato) {
    this.dato = dato;
    this.siguiente = null;
    this.anterior = null;
  }
}

export class ListaCircularDoble {
  constructor() {
    this.inicio = null;  
    this.actual = null;  
    this.tamanio = 0;
  }

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

  siguiente() {
    if (this.actual) {
      this.actual = this.actual.siguiente;
    }
    return this.miembroActual();
  }

  
  anterior() {
    if (this.actual) {
      this.actual = this.actual.anterior;
    }
    return this.miembroActual();
  }

  miembroActual() {
    return this.actual ? this.actual.dato : null;
  }

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
