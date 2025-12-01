import './tracing.js';
import amqp from 'amqplib';

async function startConsumer() {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();
  await ch.assertQueue("notify");

  ch.consume("notify", msg => {
    console.log("Received message:", msg.content.toString());
    ch.ack(msg);
  });
}

startConsumer();
