import { clinica } from './clinica.js';

const { useState, useEffect, Fragment } = React;

function App() {
  const [, setVersion] = useState(0);
  const [segundos, setSegundos] = useState(10);
  const refrescar = () => setVersion((v) => v + 1);

  useEffect(() => {
    const rotacion = setInterval(() => {
      clinica.rotarMedico();
      setSegundos(10);
      setVersion((v) => v + 1);
    }, 10000);

    const reloj = setInterval(() => {
      setSegundos((s) => (s > 1 ? s - 1 : 10));
    }, 1000);

    return () => {
      clearInterval(rotacion);
      clearInterval(reloj);
    };
  }, []);

  return (
    <div>
      <Encabezado />
      <main className="tablero">
        <PanelEspera refrescar={refrescar} />
        <PanelMedicos segundos={segundos} refrescar={refrescar} />
        <PanelComite refrescar={refrescar} />
        <PanelHistorial />
      </main>
    </div>
  );
}

function Encabezado() {
  const actual = clinica.medicos.medicoActual();
  return (
    <header>
      <div>
        <h1> Clínica San Rafael</h1>
        <p>Sistema de turnos, historial de atención y rotación de guardias</p>
      </div>
      <div className="badge-guardia">
        <small>Médico de guardia</small>
        <strong>{actual ? actual.nombre : 'Sin médicos registrados'}</strong>
      </div>
    </header>
  );
}

function PanelEspera({ refrescar }) {
  const [nombre, setNombre] = useState('');
  const [sintoma, setSintoma] = useState('');
  const pacientes = clinica.espera.toArray();

  const agregar = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    clinica.agregarPaciente(nombre.trim(), sintoma.trim() || 'Consulta general');
    setNombre('');
    setSintoma('');
    refrescar();
  };

  const atender = () => {
    clinica.atenderPaciente();
    refrescar();
  };

  return (
    <section className="panel ancho-completo">
      <h2>
         Pacientes en espera <span className="tag">Lista enlazada simple</span>
      </h2>

      <form className="formulario" onSubmit={agregar}>
        <input
          placeholder="Nombre del paciente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Motivo / síntoma"
          value={sintoma}
          onChange={(e) => setSintoma(e.target.value)}
        />
        <button className="btn btn-primario" type="submit">
          + Agregar a la cola
        </button>
        <button
          className="btn btn-exito"
          type="button"
          onClick={atender}
          disabled={pacientes.length === 0}
        >
           Atender siguiente
        </button>
      </form>

      {pacientes.length === 0 ? (
        <p className="vacio">No hay pacientes en espera.</p>
      ) : (
        <div className="cadena">
          {pacientes.map((p, i) => (
            <Fragment key={p.id}>
              {i > 0 && <span className="flecha">→</span>}
              <div className={i === 0 ? 'nodo nodo-frente' : 'nodo'}>
                <strong>{p.nombre}</strong>
                <span>{p.sintoma}</span>
                <small>
                  Turno #{p.id} · llegó {p.llegada}
                </small>
                {i === 0 && <em className="etiqueta-frente">Siguiente en ser atendido</em>}
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
}

function PanelMedicos({ segundos, refrescar }) {
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const medicos = clinica.medicos.toArray();
  const actual = clinica.medicos.medicoActual();

  const agregar = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    clinica.registrarMedico({
      nombre: nombre.trim(),
      especialidad: especialidad.trim() || 'Medicina general',
    });
    setNombre('');
    setEspecialidad('');
    refrescar();
  };

  return (
    <section className="panel">
      <h2>
        🩺 Rotación de médicos <span className="tag">Lista circular</span>
      </h2>

      <div className="guardia">
        <div>
          <small>De guardia ahora</small>
          <strong>{actual ? actual.nombre : '—'}</strong>
          <span>{actual ? actual.especialidad : ''}</span>
        </div>
        <div className="reloj-circular">{segundos}s</div>
      </div>

      <div className="barra">
        <div style={{ width: `${segundos * 10}%` }}></div>
      </div>
      <p className="nota">El médico de guardia cambia automáticamente cada 10 segundos.</p>

      <div className="cadena">
        {medicos.map((m, i) => (
          <Fragment key={m.nombre}>
            {i > 0 && <span className="flecha">→</span>}
            <div className={actual && m.nombre === actual.nombre ? 'nodo nodo-activo' : 'nodo'}>
              <strong>{m.nombre}</strong>
              <span>{m.especialidad}</span>
            </div>
          </Fragment>
        ))}
        {medicos.length > 0 && <span className="retorno"> vuelve al primero</span>}
      </div>

      <form className="formulario" style={{ marginTop: 14, marginBottom: 0 }} onSubmit={agregar}>
        <input
          placeholder="Nombre del médico"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
        />
        <button className="btn btn-primario" type="submit">
          + Agregar
        </button>
      </form>
    </section>
  );
}

function PanelComite({ refrescar }) {
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const miembros = clinica.comite.toArray();
  const actual = clinica.comite.miembroActual();

  const agregar = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    clinica.registrarMiembroComite({
      nombre: nombre.trim(),
      cargo: cargo.trim() || 'Miembro del comité',
    });
    setNombre('');
    setCargo('');
    refrescar();
  };

  return (
    <section className="panel">
      <h2>
         Comité administrativo <span className="tag">Lista circular doble</span>
      </h2>

      <div className="comite-nav">
        <button
          className="btn-nav"
          title="Miembro anterior"
          onClick={() => {
            clinica.comite.anterior();
            refrescar();
          }}
        >
          ◀
        </button>
        <div className="tarjeta-miembro">
          <strong>{actual ? actual.nombre : '—'}</strong>
          <span>{actual ? actual.cargo : ''}</span>
        </div>
        <button
          className="btn-nav"
          title="Miembro siguiente"
          onClick={() => {
            clinica.comite.siguiente();
            refrescar();
          }}
        >
          ▶
        </button>
      </div>

      <div className="cadena">
        {miembros.map((m, i) => (
          <Fragment key={m.nombre}>
            {i > 0 && <span className="flecha">⇄</span>}
            <div className={actual && m.nombre === actual.nombre ? 'nodo nodo-activo' : 'nodo'}>
              <strong>{m.nombre}</strong>
              <span>{m.cargo}</span>
            </div>
          </Fragment>
        ))}
        {miembros.length > 0 && <span className="retorno">↺ cicla en ambas direcciones</span>}
      </div>

      <form className="formulario" style={{ marginTop: 14, marginBottom: 0 }} onSubmit={agregar}>
        <input
          placeholder="Nombre del miembro"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />
        <button className="btn btn-primario" type="submit">
          + Agregar
        </button>
      </form>
    </section>
  );
}

function PanelHistorial() {
  const [recientesPrimero, setRecientesPrimero] = useState(true);
  const registros = recientesPrimero
    ? clinica.historial.toArrayInverso()
    : clinica.historial.toArray();

  return (
    <section className="panel ancho-completo">
      <h2>
        Historial de atención <span className="tag">Lista doblemente enlazada</span>
      </h2>

      <button className="btn btn-secundario" onClick={() => setRecientesPrimero((r) => !r)}>
        {recientesPrimero
          ? '⇅ Cambiar a recorrido hacia adelante (más antiguos primero)'
          : '⇅ Cambiar a recorrido hacia atrás (más recientes primero)'}
      </button>

      {registros.length === 0 ? (
        <p className="vacio">Aún no se ha atendido ningún paciente.</p>
      ) : (
        <div className="cadena">
          {registros.map((r, i) => (
            <Fragment key={r.id}>
              {i > 0 && <span className="flecha">⇄</span>}
              <div className="nodo">
                <strong>{r.nombre}</strong>
                <span>{r.sintoma}</span>
                <small>Atendió: {r.medico}</small>
                <small> {r.atencion}</small>
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
