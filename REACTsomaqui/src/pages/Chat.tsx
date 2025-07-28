import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { database, auth } from '../firebase';
import { onValue, push, ref } from 'firebase/database';

interface Mensaje {
  id: string;
  texto: string;
  remitente: string;
  timestamp: number;
}

const Chat: React.FC = () => {
  const { id: emergenciaId } = useParams<{ id: string }>();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!emergenciaId) return;

    const mensajesRef = ref(database, `chats/${emergenciaId}`);
    const unsubscribe = onValue(mensajesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const mensajesArray = Object.entries(data).map(([key, val]: [string, any]) => ({
          id: key,
          texto: val.texto,
          remitente: val.remitente,
          timestamp: val.timestamp || 0,
        }));
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
    if (!nuevoMensaje.trim() || !auth.currentUser || !emergenciaId) return;

    const mensaje = {
      texto: nuevoMensaje,
      remitente: auth.currentUser.email || 'Anónimo',
      timestamp: Date.now(),
    };

    const mensajesRef = ref(database, `chats/${emergenciaId}`);
    await push(mensajesRef, mensaje);
    setNuevoMensaje('');
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
              <strong>{msg.remitente}:</strong> {msg.texto}
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
