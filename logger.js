const winston = require('winston');
const pino = require('pino-loki');

const transport = pino.transport({
  target: "pino-loki",
  options: {
    batching: true,
    interval: 5,
    host: 'http://loki:3100', // ถ้ารัน local ผ่าน docker compose
    basicAuth: {
      username: "username",
      password: "password",
    },
  },
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    transport,
    new winston.transports.Console(),
  ],
});
