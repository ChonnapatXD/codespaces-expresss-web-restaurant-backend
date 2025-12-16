require("dotenv").config();
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { diag, DiagConsoleLogger, DiagLogLevel, trace } = require("@opentelemetry/api");
const { resourceFromAttributes } = require("@opentelemetry/resources");
const grpc = require("@grpc/grpc-js");

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

let sdk;

const initOpenTelemetry = async () => {
    if (sdk) return;


    const traceExporter = new OTLPTraceExporter({
    url: process.env.TEMPO_URL, // เช่น http://localhost:4318/v1/traces
    });
    sdk = new NodeSDK({
        traceExporter,
        instrumentations: [getNodeAutoInstrumentations()],
        resource: resourceFromAttributes({
            "service.name": "apps/core",
        }),
    });

    try {
        await sdk.start();
        console.log("✔ OTEL started. Exporting traces to:", process.env.TEMPO_URL);
    } catch (err) {
        console.error("❌ OTEL failed to start", err);
    }

    setInterval(() => {
        try {
            const tracer = trace.getTracer("core");
            const span = tracer.startSpan("test-span");
            span.end();
        } catch (err) {
            console.error("❌ Failed to create test span:", err);
        }
    }, 3000);
};

module.exports = { initOpenTelemetry };
