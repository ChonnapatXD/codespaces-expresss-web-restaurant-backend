// core-service/tracing.js and core-service/tracing.js
/*
Alternatively initOpenTelemetry function can be called in the top of the entry file of the server instead of importing the file
and can pass the serviceName to it so that single tracing.js can be used across the different services
*/

const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-grpc");
const { OTLPMetricExporter } = require("@opentelemetry/exporter-metrics-otlp-grpc");
const { diag, DiagConsoleLogger, DiagLogLevel, SpanKind, SpanStatusCode } = require("@opentelemetry/api");
const { PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
const pkg = require("@prisma/instrumentation")

const { PrismaInstrumentation } = pkg;

const initOpenTelemetry = () => {

    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);


    const traceExporter = new OTLPTraceExporter({
        url: process.env.TEMPO_URL
    });

    const metricsExporter = new OTLPMetricExporter({
        url: process.env.TEMPO_URL
    })


    class LoggingSpanExporter {
        export(spans, resultCallback) {
            traceExporter.export(spans, resultCallback);
        }

        shutdown() {
            return traceExporter.shutdown();
        }
    }

    const sdk = new NodeSDK({
        traceExporter: new LoggingSpanExporter(),
        metricReader: new PeriodicExportingMetricReader({
            exporter: metricsExporter,
            exportIntervalMillis: 5000 //export the metrics after every 5 seconds
        }),
        instrumentations: [
            new PrismaInstrumentation(),
            getNodeAutoInstrumentations({
                '@opentelemetry/instrumentation-http': {
                    enabled:true,
                    requestHook: (span, req)=>{
                        span.updateName(`${req.method} : ${req.url}`);
                    }
                },
                '@opentelemetry/instrumentation-ioredis': {
                    enabled: true,
                    responseHook: (span, cmd, arg, result) => {
                        span.setAttributes({
                            'db.argument': arg,
                            'db.result': result ? true : false
                        });
                        span.updateName(`ioredis:${cmd}`);
                        span.spanContext().kind = SpanKind.CLIENT;
                        span.setStatus({ code: result ? SpanStatusCode.OK : SpanStatusCode.ERROR });
                    },
                    dbStatementSerializer: (statement) => {
                        return statement;
                    }
                },
                '@opentelemetry/instrumentation-dns': {
                    enabled: false
                },
                '@opentelemetry/instrumentation-amqplib': {
                    enabled: true
                },
                '@opentelemetry/instrumentation-net': {
                    enabled: false
                }
            }),
        ],
        serviceName:"apps/core" //this will change as per the service. if using monolithic architecture then it will be same for microservices make sure to keep it different so that distributed tracing can be done across the services
    });

    // Start tracing
    sdk.start();

    // Graceful shutdown
    process.on("SIGTERM", async () => {
        await sdk.shutdown();
        console.log("Tracing terminated");
        process.exit(0);
    });
};
initOpenTelemetry()