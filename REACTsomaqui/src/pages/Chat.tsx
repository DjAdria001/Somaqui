import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { database, auth } from '../firebase';
import { onValue, push, ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

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

  // UseEffect para manejar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔄 Estado de autenticación cambió:', user ? user.email : 'No autenticado');
      
      if (user) {
        // Usuario autenticado, cargar su nombre
        loadUserNameFromFirebase(user.uid);
      } else {
        // No hay usuario autenticado, intentar cargar desde localStorage
        loadUserNameFromLocalStorage();
      }
    });

    return () => unsubscribe();
  }, []);

  // Función para cargar nombre desde Firebase (usuarios registrados)
  const loadUserNameFromFirebase = async (uid: string) => {
    console.log('🔍 Cargando nombre desde Firebase para UID:', uid);
    try {
      const userRef = ref(database, `usuarios/${uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log('🔍 Datos del usuario desde Firebase:', userData);
        const nombreCompleto = `${userData.nombre} ${userData.apellidos || ''}`.trim();
        setNombreUsuario(nombreCompleto);
        console.log('👤 Usuario registrado encontrado:', nombreCompleto);
      } else {
        console.log('⚠️ No se encontraron datos del usuario en Firebase para UID:', uid);
        // Fallback a localStorage
        loadUserNameFromLocalStorage();
      }
    } catch (error) {
      console.error('❌ Error al cargar datos del usuario registrado:', error);
      loadUserNameFromLocalStorage();
    }
  };

  // Función para cargar nombre desde localStorage (solicitantes)
  const loadUserNameFromLocalStorage = () => {
    console.log('🔍 Cargando nombre desde localStorage...');
    const nombreGuardado = localStorage.getItem('usuario_nombre');
    if (nombreGuardado) {
      setNombreUsuario(nombreGuardado);
      console.log('👤 Nombre del solicitante desde localStorage:', nombreGuardado);
    } else {
      console.log('⚠️ No se encontró nombre en localStorage');
    }
  };

  // UseEffect para cargar mensajes
  useEffect(() => {
    if (!emergenciaId) return;

    console.log('🔍 Cargando mensajes para emergencia:', emergenciaId);

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

    console.log('📤 Enviando mensaje...');
    console.log('👤 Nombre de usuario actual:', nombreUsuario);
    console.log('🔐 Usuario autenticado:', auth.currentUser?.email);

    // Determinar el nombre para mostrar
    let nombreParaMostrar = nombreUsuario;
    
    // Si no hay nombre guardado, intentar obtenerlo
    if (!nombreParaMostrar) {
      console.log('⚠️ No hay nombre guardado, intentando obtenerlo...');
      
      if (auth.currentUser?.uid) {
        // Si es un usuario autenticado, intentar cargar desde Firebase
        try {
          const userRef = ref(database, `usuarios/${auth.currentUser.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            const userData = snapshot.val();
            nombreParaMostrar = `${userData.nombre} ${userData.apellidos || ''}`.trim();
            setNombreUsuario(nombreParaMostrar);
            console.log('👤 Nombre obtenido desde Firebase:', nombreParaMostrar);
          } else {
            console.log('⚠️ Usuario no encontrado en Firebase, usando email');
            nombreParaMostrar = auth.currentUser.email || 'Usuario';
          }
        } catch (error) {
          console.error('❌ Error al cargar nombre del usuario:', error);
          nombreParaMostrar = auth.currentUser.email || 'Usuario';
        }
      } else {
        // No hay usuario autenticado, usar localStorage o 'Anónimo'
        const nombreLocalStorage = localStorage.getItem('usuario_nombre');
        nombreParaMostrar = nombreLocalStorage || 'Anónimo';
        console.log('👤 Usando nombre desde localStorage o Anónimo:', nombreParaMostrar);
      }
    }

    console.log('📤 Enviando mensaje con nombre:', nombreParaMostrar);

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
      <h2>Chat de Emergencia</h2>
      {nombreUsuario && (
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: 16 }}>
          Conectado como: <strong>{nombreUsuario}</strong>
        </p>
      )}
      <div
        ref={chatRef}
        style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 16, padding: 8, backgroundColor: '#f9f9f9', borderRadius: 4 }}
      >
        {mensajes.length === 0 ? (
          <p>No hay mensajes aún. ¡Sé el primero en escribir!</p>
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
          placeholder={nombreUsuario ? `Escribe como ${nombreUsuario}...` : "Escribe tu mensaje..."}
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
