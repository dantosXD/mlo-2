import { WebSocketServer } from 'ws';
import { CHANNELS, Channel } from './channels';
import { handle } from './resolvers';

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on('connection', ws => {
  clients.add(ws);
  ws.on('message', message => {
    try {
      const { channel, payload } = JSON.parse(message.toString());
      if (CHANNELS.includes(channel as Channel)) {
        handle(channel as Channel, payload, ws, clients);
      }
    } catch (err) {
      ws.send(JSON.stringify({ error: 'Invalid message' }));
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

console.log('WebSocket server running on ws://localhost:8080');
