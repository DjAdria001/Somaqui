import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

const Chat = () => {
  const { id } = useParams(); // ID de la emergencia
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const db = getDatabase();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const messagesRef = ref(db, `Chats/${id}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.entries(data).map(([key, val]: any) => ({
          id: key,
          ...val,
        }));
        setMessages(loadedMessages.sort((a, b) => a.timestamp - b.timestamp));
      } else {
        setMessages([]);
      }
    });
  }, [id, user]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageRef = ref(db, `Chats/${id}`);
    await push(messageRef, {
      text: newMessage,
      sender: user?.email || 'Anónimo',
      timestamp: Date.now(),
    });
    setNewMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Chat de Emergencia</h2>
      <div className="bg-gray-100 p-4 rounded h-96 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <p className="text-sm text-gray-600">{msg.sender}</p>
            <div className="bg-white p-2 rounded shadow">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          placeholder="Escribe tu mensaje"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
