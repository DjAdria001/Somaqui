import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

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
  fecha_envio?: string;
}

const TablaFirebase: React.FC = () => {
  const [datos, setDatos] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const emergenciasRef = ref(database, 'Emergencias');
    const unsubscribe = onValue(emergenciasRef, snapshot => {
      const list: FormData[] = [];
      snapshot.forEach(child => {
        const item = child.val() as FormData;
        list.push(item);
      });
      setDatos(list);
      setLoading(false);
    }, error => {
      console.error('Error leyendo Firebase:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!datos.length) return <p>No hay registros aún.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Solicitudes de ayuda desde Firebase</h2>
      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Ubicación</th>
            <th>Personas</th><th>Urgencia</th><th>Ayuda solicitada</th><th>Otros detalles</th><th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((s, idx) => (
            <tr key={idx}>
              <td>{s.nombre}</td>
              <td>{s.correo}</td>
              <td>{s.telefono}</td>
              <td>{s.ubicacion} ({s.desc_ubic})</td>
              <td>{s.personales}</td>
              <td>{s.tiempo}</td>
              <td>{s.tags?.join(', ')}</td>
              <td>{s.otros_detalle}</td>
              <td>{s.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaFirebase;
