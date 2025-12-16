require('./tracing');  // Import tracing for OpenTelemetry

const express = require("express");
const morgan = require("morgan");
const winston = require("winston");
const path = require("path");

const mappingRoute = require("./routes/mapping.route");
const userRoute = require("./routes/user.route");
const { metricsExporter } = require("./middlewares/metrics");
const { port } = require("./config/awsSecretsManager");
require("dotenv").config();

const app = express();

// --- ตั้ง logger ด้วย Winston ---
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()   // ใช้ JSON format (structured log)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join("logs","app.log") })
  ]
});

// --- ใช้ Morgan เป็น HTTP request logger + bind กับ Winston ---
// สร้าง custom stream ให้ Morgan ส่ง log ไปยัง Winston
app.use(morgan("combined", {
  stream: {
    write: message => logger.info(message.trim())
  }
}));

// --- (ถ้าต้องการ) ใช้ custom middleware ก่อน route เพื่อ log request details ---
// แต่วิธีด้านบนด้วย Morgan — พอแล้วสำหรับ HTTP request

app.use(metricsExporter);
app.use(express.json());

app.use(mappingRoute);
app.use(userRoute);

app.get("/health", (req, res) => {
  logger.info("Health check endpoint called");
  res.send("The application is healthy");
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
