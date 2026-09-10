// ============================================================
// LÓGICA DE LA CLÍNICA
// Clase que conecta las 4 estructuras de datos y define las
// operaciones del sistema de turnos. Es el "intermediario"
// entre las listas enlazadas y el panel de React.
// ============================================================

import { ListaSimple } from './estructuras/ListaSimple.js';
import { ListaDoble } from './estructuras/ListaDoble.js';
import { ListaCircular } from './estructuras/ListaCircular.js';
import { ListaCircularDoble } from './estructuras/ListaCircularDoble.js';

export class Clinica {
  constructor() {
    this.espera = new ListaSimple();            // pacientes en espera
    this.historial = new ListaDoble();          // historial de atención
    this.medicos = new ListaCircular();         // rotación de guardias
    this.comite = new ListaCircularDoble();     // comité administrativo
    this.contadorPacientes = 0;
  }

  registrarMedico(medico) {
    this.medicos.agregar(medico);
  }

  registrarMiembroComite(miembro) {
    this.comite.agregar(miembro);
  }

  // El paciente entra a la cola de espera (lista simple)
  agregarPaciente(nombre, sintoma) {
    const paciente = {
      id: ++this.contadorPacientes,
      nombre,
      sintoma,
      llegada: new Date().toLocaleTimeString('es-CO'),
    };
    this.espera.insertarAlFinal(paciente);
    return paciente;
  }

  // Atender = eliminar de la lista simple + agregar al historial (lista doble),
  // guardando qué médico estaba de guardia en ese momento
  atenderPaciente() {
    const paciente = this.espera.eliminarAlFrente();
    if (!paciente) return null;

    const medico = this.medicos.medicoActual();
    const registro = {
      ...paciente,
      medico: medico ? medico.nombre : 'Sin médico de guardia',
      atencion: new Date().toLocaleTimeString('es-CO'),
    };
    this.historial.agregarAlFinal(registro);
    return registro;
  }

  // La rotación automática cada 10 segundos llama este método
  rotarMedico() {
    return this.medicos.rotar();
  }
}

// Instancia única que comparte toda la aplicación
export const clinica = new Clinica();

// ------------------------------------------------------------
// Datos de ejemplo para que el panel no arranque vacío
// ------------------------------------------------------------
clinica.registrarMedico({ nombre: 'Dra. Valentina Torres', especialidad: 'Pediatría' });
clinica.registrarMedico({ nombre: 'Dr. Andrés Ramírez', especialidad: 'Medicina general' });
clinica.registrarMedico({ nombre: 'Dra. Camila López', especialidad: 'Urgencias' });
clinica.registrarMedico({ nombre: 'Dr. Julián Castro', especialidad: 'Cirugía general' });

clinica.registrarMiembroComite({ nombre: 'María Fernanda Ruiz', cargo: 'Directora administrativa' });
clinica.registrarMiembroComite({ nombre: 'Carlos Gómez', cargo: 'Jefe de enfermería' });
clinica.registrarMiembroComite({ nombre: 'Luisa Herrera', cargo: 'Coordinadora de calidad' });
clinica.registrarMiembroComite({ nombre: 'Óscar Delgado', cargo: 'Director financiero' });

clinica.agregarPaciente('Juan Pérez', 'Fiebre y dolor de cabeza');
clinica.agregarPaciente('Ana Morales', 'Control de presión arterial');
clinica.agregarPaciente('Pedro Sánchez', 'Dolor abdominal');
