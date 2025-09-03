import React, { useEffect, useState } from 'react';

interface Message {
  id: number;
  senderId: number;
  content: string;
  createdAt: string;
}

export const Inbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages(prev => [...prev, data.payload]);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      <ul>
        {messages.map(m => (
          <li key={m.id}>
            <strong>{m.senderId}</strong>: {m.content}
          </li>
        ))}
      </ul>
    </div>
  );
};
