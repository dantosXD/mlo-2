import React, { useEffect, useState } from 'react';

interface Message {
  sender: string;
  recipient: string;
  body: string;
}

export const InboxView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      ws.send(JSON.stringify({ channel: 'messages', payload: {} }));
    };
    ws.onmessage = event => {
      const { channel, data } = JSON.parse(event.data);
      if (channel === 'messages') {
        setMessages(data);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      <ul>
        {messages.map((m, idx) => (
          <li key={idx}><strong>{m.sender}:</strong> {m.body}</li>
        ))}
      </ul>
    </div>
  );
};
