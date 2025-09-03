import { Server } from 'ws';

const wss = new Server({ port: 8080 });

export function broadcast(message: unknown) {
  const data = JSON.stringify(message);
  wss.clients.forEach(client => {
    // `OPEN` is a static property on WebSocket instances
    // but TypeScript may not know the exact type.
    // @ts-ignore
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  });
}

wss.on('connection', ws => {
  ws.send(JSON.stringify({ type: 'connected' }));
});
