const express = require('express');
const pino = require('pino');
const pinoHttp = require('pino-http');
const client = require('prom-client');
const config = require('./config');

const app = express();
const logger = pino({ level: config.logLevel });
app.use(pinoHttp({ logger }));

// Prometheus metrics
client.collectDefaultMetrics();

app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get('/', (_req, res) => {
  res.json({ message: 'Hello world', secretToken: config.secretToken ? '***' : undefined });
});

app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});
