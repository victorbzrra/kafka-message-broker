package com.example.broker.service;

import com.example.broker.model.Message;
import com.example.broker.producer.KafkaProducer;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.logging.Logger;

@CrossOrigin(
    origins = "*",
    methods = {
                RequestMethod.OPTIONS,
                RequestMethod.GET,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.POST
})
@RestController
@RequestMapping("/msg")
public class ProducerService {
    private static final Logger logger = Logger.getLogger(ProducerService.class.getSimpleName());
    private final List<KafkaProducer> producers;
    public ProducerService(List<KafkaProducer> producers) {
        this.producers = producers;
    }

    @PostMapping("/send/{producerId}")
    public void sendMessage(@PathVariable int producerId, @RequestBody Message message) {
        if (Objects.isNull(message.getContent())) {
            throw new IllegalArgumentException("Empty message!");
        }

        if (producerId >= 0 && producerId < producers.size()) {
            KafkaProducer producer = producers.get(producerId);

            message.setSender("Producer " + producerId);
            producer.sendMessage(message);

            logger.info(String.format("%s %s: %s", producer.getClass().getSimpleName(), producerId, message.getContent()));

            return;
        }

        throw new IllegalArgumentException("Invalid producerId: " + producerId);
    }
}