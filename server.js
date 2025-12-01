require('./tracing');  // Import the tracing 

const express = require("express");
const mappingRoute = require("./routes/mapping.route");
const userRoute = require("./routes/user.route");
const { metricsExporter } = require("./middlewares/metrics");
const { port } = require("./config/awsSecretsManager");
const winston = require("winston");

// ----------------------
// Logger configuration
// ----------------------
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // log ลง console
    new winston.transports.File({ filename: "logs/app.log" }) // log ลงไฟล์
  ]
});

const app = express();

app.use(metricsExporter);
app.use(express.json());

// Log ทุก request
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use(mappingRoute);
app.use(userRoute);

// Health check
app.get("/health", (req, res) => {
  logger.info("Health check accessed");
  res.send("The application is healthy");
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
