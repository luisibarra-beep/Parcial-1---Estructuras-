export class NodoCircular {
  constructor(dato) {
    this.dato = dato;
    this.siguiente = null;
  }
}

export class ListaCircular {
  constructor() {
    this.cola = null;    
    this.actual = null;  
    this.tamanio = 0;
  }


  agregar(dato) {
    const nuevo = new NodoCircular(dato);
    if (!this.cola) {
      nuevo.siguiente = nuevo; 
      this.cola = nuevo;
      this.actual = nuevo;
    } else {
      nuevo.siguiente = this.cola.siguiente; 
      this.cola.siguiente = nuevo;
      this.cola = nuevo;
    }
    this.tamanio++;
  }

  
  rotar() {
    if (this.actual) {
      this.actual = this.actual.siguiente;
    }
    return this.medicoActual();
  }

  medicoActual() {
    return this.actual ? this.actual.dato : null;
  }

  
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
