const TOPIC = "message-thread";
const kafka = require('kafka-node');

const consumer = new kafka.Consumer(
  new kafka.KafkaClient({kafkaHost: 'localhost:9092'}),
  [{ topic: TOPIC }]
);

consumer.on('message', function (message) {
  console.log(message.value);
});