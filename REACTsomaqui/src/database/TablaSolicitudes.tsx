// import React from 'react'; // Not needed with React 17+ and new JSX transform

interface FormData {
  ubicacion: string;
  desc_ubic: string;
  nombre: string;
  correo: string;
  telefono: string;
  personales: string;
  tiempo: string;
  tags: string[];
  otros_detalle: string;
  descripcion: string;
  activo?: boolean; // Campo opcional para indicar si la solicitud está activa
}

const datosEjemplo: Record<string, FormData> = {
  sol_001: {
    ubicacion: "Barcelona",
    desc_ubic: "Barrio Gótico, cerca de la Catedral",
    nombre: "Laura Pérez",
    correo: "laura@email.com",
    telefono: "612345678",
    personales: "3 personas",
    tiempo: "Urgente",
    tags: ["comida", "ropa", "refugio"],
    otros_detalle: "Sin trabajo desde hace meses",
    descripcion: "Necesitamos comida y abrigo, vivimos sin calefacción",
    activo: true // Por defecto, la solicitud está activa
  },
  sol_002: {
    ubicacion: "Girona",
    desc_ubic: "Parc de la Devesa",
    nombre: "Joan Torres",
    correo: "joan@email.com",
    telefono: "698745632",
    personales: "1 persona",
    tiempo: "Flexible",
    tags: ["acompañamiento"],
    otros_detalle: "Se siente solo desde hace tiempo",
    descripcion: "Busca alguien que lo acompañe a caminar o hablar",
    activo: true // Por defecto, la solicitud está activa
  }
};

const TablaSolicitudes: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Solicitudes registradas</h2>
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Ubicación</th>
            <th>¿Cuántas personas?</th>
            <th>Urgencia</th>
            <th>Ayuda solicitada</th>
            <th>Otros detalles</th>
            <th>Descripción del problema</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(datosEjemplo).map(([id, s]) => (
            <tr key={id}>
              <td>{s.nombre}</td>
              <td>{s.correo}</td>
              <td>{s.telefono}</td>
              <td>{s.ubicacion} ({s.desc_ubic})</td>
              <td>{s.personales}</td>
              <td>{s.tiempo}</td>
              <td>{s.tags.join(', ')}</td>
              <td>{s.otros_detalle}</td>
              <td>{s.descripcion}</td>
              <td>{s.activo ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaSolicitudes;
