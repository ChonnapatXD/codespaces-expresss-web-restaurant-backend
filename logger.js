const pino = require("pino");

// สร้าง transport สำหรับ Loki
const transport = pino.transport({
  target: "pino-loki",
  options: {
    host: process.env.LOKI_URL || "http://localhost:3100",
    batching: false,      // ส่ง log เป็น batch
    interval: 5000,         // ทุก 5 วินาที
    labels: { job: "apps/core" },
    // ถ้า Loki ใช้ basic auth ให้ใส่ username/password
    // basicAuth: { username: "user", password: "pass" },
  },
});

// สร้าง logger
const logger = pino(
  {
    level: "info",
    base: { service: "apps/core" }, // label เพิ่มเติม
  },
  transport
);

module.exports = logger;
