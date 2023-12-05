import Kafka from 'kafka-node';
import express from 'express'
import { getHTML } from './html.js'

const TOPIC = "message-thread";

// {content: string, sender: string}[]
const app = express()
const port = 3000

var messagesMapped = [];

const consumer = new Kafka.Consumer(
  new Kafka.KafkaClient({kafkaHost: 'localhost:9092'}),
  [{ topic: TOPIC }]
);

consumer.on('message', function (message) {
  messagesMapped.push({...JSON.parse(message.value), date: new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit'})})
});

app.get('/producer1', (req, res) => {
  const HTMLToSend = getHTML(messagesMapped, undefined, 0)

  res.send(HTMLToSend)
})

app.get('/remote/producer1', (req, res) => {
  const HTMLToSend = getHTML(messagesMapped, 'http://192.168.137.1:8080/msg/send/0', 0)

  res.send(HTMLToSend)
})

app.get('/producer2', (req, res) => {
  const HTMLToSend = getHTML(messagesMapped, undefined, 1)

res.send(HTMLToSend)
})

app.get('/remote/producer2', (req, res) => {
  const HTMLToSend = getHTML(messagesMapped, 'http://192.168.137.1:8080/msg/send/1', 1)

res.send(HTMLToSend)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})