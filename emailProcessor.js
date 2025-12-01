require("./tracing")
const { EXCHANGES } = require("static_values");
const emailQueue = require("./controller/email.controller");
const Email = require("./util/email.util");
const emailService = new Email();
emailQueue.channel.consume(EXCHANGES.NOTIFICATION_EXCHANGE.QUEUES.MAIL_QUEUE.NAME, (msg) => {
  if (msg !== null) {
    const emailData = JSON.parse(msg.content.toString());
    emailService.send(emailData)
    emailQueue.channel.ack(msg);
  }
});