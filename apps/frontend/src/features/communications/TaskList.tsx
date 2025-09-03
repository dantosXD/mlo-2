import React, { useEffect, useState } from 'react';

interface Task {
  title: string;
  completed: boolean;
}

export const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/ws/communications');
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === 'task') {
        setTasks(t => [...t, data.payload]);
      }
    };
    return () => socket.close();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            <input type="checkbox" checked={t.completed} readOnly /> {t.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
