import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { ref, onValue, push, set } from 'firebase/database';
import { useAuth } from '../context/AuthContext'; // asumo que tienes auth

interface Mensaje {
  id: string;
  texto: string;
  creadoEn: number;
  usuarioId: string;
  usuarioNombre: string;
}

function Chat() {
  const { emergenciaId } = useParams<{ emergenciaId: string }>();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!emergenciaId) return;
    const chatRef = ref(database, `chats/${emergenciaId}`);

    // Escuchar cambios en mensajes
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val() || {};
      const mensajesArray = Object.entries(data).map(([key, val]: any) => ({
        id: key,
        ...val,
      }));
      // Ordenar por fecha
      mensajesArray.sort((a, b) => a.creadoEn - b.creadoEn);
      setMensajes(mensajesArray);
    });
  }, [emergenciaId]);

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !user) return;
    const chatRef = ref(database, `chats/${emergenciaId}`);
    const newMsgRef = push(chatRef);
    await set(newMsgRef, {
      texto: nuevoMensaje,
      creadoEn: Date.now(),
      usuarioId: user.uid,
      usuarioNombre: user.displayName || user.email,
    });
    setNuevoMensaje('');
  };

  return (
    <div>
      <h2>Chat Emergencia {emergenciaId}</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {mensajes.map((msg) => (
          <div key={msg.id}>
            <b>{msg.usuarioNombre}:</b> {msg.texto}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}

export default Chat;
