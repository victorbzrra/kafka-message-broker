import Kafka from 'kafka-node';
import { MongoClient } from "mongodb";

const TOPIC = "message-thread";
const CON_STRING_MONGO = "mongodb+srv://Rapha:1234ufc@mensagens-sd-final.dkwslmf.mongodb.net";

const client = new MongoClient(CON_STRING_MONGO)

const insert = async (message) => {
  await client.connect();

  const dbMessage = client.db("SD-Final")

  const messageCol = dbMessage.collection('Messages')

  await messageCol.insertOne(message);

  client.close()
}

const consumer = new Kafka.Consumer(
  new Kafka.KafkaClient({kafkaHost: 'localhost:9092'}),
  [{ topic: TOPIC }]
);

consumer.on('message', function (message) {
  insert({...JSON.parse(message.value), dt: new Date()})
});