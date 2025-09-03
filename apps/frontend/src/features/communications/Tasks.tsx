import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === 'task') {
        setTasks(prev => [...prev, data.payload]);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.completed} readOnly /> {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
