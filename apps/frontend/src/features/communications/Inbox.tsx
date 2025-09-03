import React, { useEffect, useState } from 'react';

interface Message {
  senderId: number;
  content: string;
}

interface Note {
  note: string;
}

export const Inbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/ws/communications');
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages(m => [...m, data.payload]);
      }
      if (data.type === 'note') {
        setNotes(n => [...n, data.payload]);
      }
    };
    return () => socket.close();
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      <h3>Messages</h3>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m.senderId}: {m.content}</li>
        ))}
      </ul>
      <h3>Notes</h3>
      <ul>
        {notes.map((n, i) => (
          <li key={i}>{n.note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
