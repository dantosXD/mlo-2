import { WebSocket } from 'ws';
import { Channel } from './channels';

interface Message {
  sender: string;
  recipient: string;
  body: string;
}

interface Note {
  author: string;
  body: string;
}

interface Task {
  title: string;
  completed?: boolean;
}

type Payload = Message | Note | Task;

const store: Record<Channel, Payload[]> = {
  messages: [],
  notes: [],
  tasks: []
};

export function handle(channel: Channel, payload: any, ws: WebSocket, clients: Set<WebSocket>) {
  switch (channel) {
    case 'messages':
      store.messages.push(payload as Message);
      break;
    case 'notes':
      store.notes.push(payload as Note);
      break;
    case 'tasks':
      store.tasks.push(payload as Task);
      break;
  }

  const data = JSON.stringify({ channel, data: store[channel] });
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
