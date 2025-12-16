const { metrics } = require("@opentelemetry/api");
const { MeterProvider, PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
const { OTLPMetricExporter } = require("@opentelemetry/exporter-metrics-otlp-grpc");
const PackageJson = require("../package.json");

// สร้าง OTLP Metric Exporter (ส่งไป OTEL Collector)
const metricExporter = new OTLPMetricExporter({
  url: "grpc://localhost:4319", // port OTLP gRPC ของ OTEL Collector ใน docker-compose
});

// สร้าง MeterProvider
const meterProvider = new MeterProvider();

// เชื่อมกับ PeriodicExportingMetricReader
meterProvider.addMetricReader(
  new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 1000, // export ทุก 1 วินาที
  })
);

// สร้าง Meter
const meter = meterProvider.getMeter(PackageJson.name);

// Metrics
const requestCounter = meter.createCounter("request_count", {
  description: "Count of HTTP requests",
});

const requestDuration = meter.createHistogram("request_duration", {
  description: "Duration of HTTP requests in milliseconds",
});

// Middleware สำหรับ Express
function metricsExporter(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const labels = {
      method: req.method,
      path: req.route?.path || req.path,
      status: res.statusCode,
    };
    requestCounter.add(1, labels);
    requestDuration.record(duration, labels);
  });
  next();
}

module.exports = {
  metricsExporter,
};
