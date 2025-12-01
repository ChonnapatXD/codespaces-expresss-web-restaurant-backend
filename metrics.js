const { metrics } = require("@opentelemetry/api");
const PackageJson = require("../package.json");

const meter = metrics.getMeter(PackageJson.name);
const requestCounter = meter.createCounter("request_count", {
  description: "Count of HTTP requests",
});
const requestDuration = meter.createHistogram("request_duration", {
  description: "Duration of HTTP requests in milliseconds",
});

function metricsExporter(req, res, next){
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const labels = {
            method: req.method,
            path: req.route?.path,
            status: res.statusCode,
        };
        requestCounter.add(1, labels);
        requestDuration.record(duration, labels);
    });
    next();
};

module.exports = {
    metricsExporter
};