import { Server } from 'ws';

interface MessageEvent {
  type: 'message' | 'note' | 'task';
  payload: any;
}

// Initialize WebSocket server for communications
export function initCommunicationWS(server: any) {
  const wss = new Server({ server, path: '/ws/communications' });

  wss.on('connection', socket => {
    socket.on('message', raw => {
      let event: MessageEvent;
      try {
        event = JSON.parse(raw.toString());
      } catch {
        return;
      }

      switch (event.type) {
        case 'message':
        case 'note':
        case 'task':
          broadcast(event);
          break;
        default:
          break;
      }
    });
  });

  function broadcast(event: MessageEvent) {
    const data = JSON.stringify(event);
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(data);
      }
    });
  }

  return wss;
}

// GraphQL-style resolvers for messages, notes and tasks
export const communicationsResolvers = {
  Query: {
    messages: async () => [],
    notes: async () => [],
    tasks: async () => []
  }
};
