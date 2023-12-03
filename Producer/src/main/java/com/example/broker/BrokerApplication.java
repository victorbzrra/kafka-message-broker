package com.example.broker;

import com.example.broker.producer.KafkaProducer;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BrokerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrokerApplication.class, args);
	}

	@Bean
	public KafkaProducer producerOne() {
		return new KafkaProducer();
	}

	@Bean
	public KafkaProducer producerTwo() {
		return new KafkaProducer();
	}

	@Bean
	public NewTopic newTopic() {
		return new NewTopic("message-thread", 3, (short) 1);
	}
}
