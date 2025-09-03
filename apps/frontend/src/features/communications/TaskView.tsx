import React, { useEffect, useState } from 'react';

interface Task {
  title: string;
  completed: boolean;
}

export const TaskView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      ws.send(JSON.stringify({ channel: 'tasks', payload: {} }));
    };
    ws.onmessage = event => {
      const { channel, data } = JSON.parse(event.data);
      if (channel === 'tasks') {
        setTasks(data);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((t, idx) => (
          <li key={idx}>{t.title} {t.completed ? '✔️' : ''}</li>
        ))}
      </ul>
    </div>
  );
};
