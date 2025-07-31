import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { database, auth } from '../firebase';
import { onValue, push, ref, get } from 'firebase/database';

interface Mensaje {
  id: string;
  texto: string;
  remitente: string;
  timestamp: number;
  nombre_usuario?: string;
}

const Chat: React.FC = () => {
  const { id: emergenciaId } = useParams<{ id: string }>();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState<string>('');
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Función para cargar el nombre del usuario
    const loadUserName = async () => {
      // Prioridad 1: Si hay un usuario autenticado (voluntario registrado), buscar en Firebase
      if (auth.currentUser) {
        try {
          const userRef = ref(database, `usuarios/${auth.currentUser.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const nombreCompleto = `${userData.nombre} ${userData.apellidos || ''}`.trim();
            setNombreUsuario(nombreCompleto);
            console.log('👤 Usuario registrado encontrado:', nombreCompleto);
            return;
          }
        } catch (error) {
          console.error('❌ Error al cargar datos del usuario registrado:', error);
        }
      }

      // Prioridad 2: Si no hay usuario registrado, usar localStorage (solicitante de ayuda)
      const nombreGuardado = localStorage.getItem('usuario_nombre');
      if (nombreGuardado) {
        setNombreUsuario(nombreGuardado);
        console.log('👤 Nombre del solicitante desde localStorage:', nombreGuardado);
      }
    };

    loadUserName();

    if (!emergenciaId) return;

    const mensajesRef = ref(database, `chats/${emergenciaId}`);
    const unsubscribe = onValue(mensajesRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const mensajesArray = await Promise.all(
          Object.entries(data).map(async ([key, val]: [string, any]) => {
            let nombreParaMostrar = val.nombre_usuario || val.remitente;
            
            // Si el mensaje no tiene nombre_usuario y es un email, intentar obtener el nombre
            if (!val.nombre_usuario && val.remitente && val.remitente.includes('@')) {
              const nombreEncontrado = await getUserNameByEmail(val.remitente);
              if (nombreEncontrado !== val.remitente) {
                nombreParaMostrar = nombreEncontrado;
              }
            }
            
            return {
              id: key,
              texto: val.texto,
              remitente: val.remitente,
              timestamp: val.timestamp || 0,
              nombre_usuario: nombreParaMostrar,
            };
          })
        );
        
        mensajesArray.sort((a, b) => a.timestamp - b.timestamp);
        setMensajes(mensajesArray);
        scrollToBottom();
      } else {
        setMensajes([]);
      }
    });

    return () => unsubscribe();
  }, [emergenciaId]);

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !emergenciaId) return;

    // Determinar el nombre para mostrar
    let nombreParaMostrar = nombreUsuario;
    
    // Si no hay nombre guardado, usar el email del usuario autenticado o 'Anónimo'
    if (!nombreParaMostrar) {
      if (auth.currentUser?.email) {
        // Si es un usuario autenticado pero no tenemos su nombre, intentar cargarlo
        try {
          const userRef = ref(database, `usuarios/${auth.currentUser.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            const userData = snapshot.val();
            nombreParaMostrar = `${userData.nombre} ${userData.apellidos || ''}`.trim();
            setNombreUsuario(nombreParaMostrar);
          } else {
            nombreParaMostrar = auth.currentUser.email;
          }
        } catch (error) {
          console.error('❌ Error al cargar nombre del usuario:', error);
          nombreParaMostrar = auth.currentUser.email;
        }
      } else {
        nombreParaMostrar = 'Anónimo';
      }
    }

    const mensaje = {
      texto: nuevoMensaje,
      remitente: auth.currentUser?.email || 'Anónimo',
      nombre_usuario: nombreParaMostrar,
      timestamp: Date.now(),
    };

    const mensajesRef = ref(database, `chats/${emergenciaId}`);
    await push(mensajesRef, mensaje);
    setNuevoMensaje('');
  };

  // Función para obtener el nombre de un usuario por email
  const getUserNameByEmail = async (email: string): Promise<string> => {
    try {
      // Buscar en todos los usuarios registrados
      const usuariosRef = ref(database, 'usuarios');
      const snapshot = await get(usuariosRef);
      
      if (snapshot.exists()) {
        const usuarios = snapshot.val();
        
        // Buscar el usuario por email
        for (const [, userData] of Object.entries(usuarios) as [string, any][]) {
          if (userData.correo === email) {
            return `${userData.nombre} ${userData.apellidos || ''}`.trim();
          }
        }
      }
      
      // Si no se encuentra, devolver el email
      return email;
    } catch (error) {
      console.error('❌ Error al buscar usuario por email:', error);
      return email;
    }
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Chat de Emergencia: {emergenciaId}</h2>
      <div
        ref={chatRef}
        style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 16, padding: 8, backgroundColor: '#f9f9f9', borderRadius: 4 }}
      >
        {mensajes.length === 0 ? (
          <p>No hay mensajes aún.</p>
        ) : (
          mensajes.map((msg) => (
            <div key={msg.id} style={{ marginBottom: 8 }}>
              <strong>{msg.nombre_usuario || msg.remitente}:</strong> {msg.texto}
            </div>
          ))
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe tu mensaje"
          style={{ flexGrow: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          onKeyDown={(e) => { if (e.key === 'Enter') enviarMensaje(); }}
        />
        <button onClick={enviarMensaje} style={{ padding: '8px 16px' }}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
