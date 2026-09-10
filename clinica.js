import { ListaSimple } from './ListaSimple.js';
import { ListaDoble } from './ListaDoble.js';
import { ListaCircular } from './ListaCircular.js';
import { ListaCircularDoble } from './ListaCircularDoble.js';

export class Clinica {
  constructor() {
    this.espera = new ListaSimple();
    this.historial = new ListaDoble();
    this.medicos = new ListaCircular();
    this.comite = new ListaCircularDoble();
    this.contadorPacientes = 0;
  }

  registrarMedico(medico) {
    this.medicos.agregar(medico);
  }

  registrarMiembroComite(miembro) {
    this.comite.agregar(miembro);
  }

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

  rotarMedico() {
    return this.medicos.rotar();
  }
}

export const clinica = new Clinica();

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
