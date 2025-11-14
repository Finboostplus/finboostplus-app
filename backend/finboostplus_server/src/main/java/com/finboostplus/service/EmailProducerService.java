package com.finboostplus.service;

import email.RegistrationEmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailProducerService {
    private static final Logger log = LoggerFactory.getLogger(EmailProducerService.class);

    @Value("${topic.message.producer.signup.email}")
    private String registrationEmailTopic;


    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    public void sendRegisterEmail(final RegistrationEmailSender registrationEmailSender) {
        try {
            kafkaTemplate.send(registrationEmailTopic, registrationEmailSender);
        } catch (Exception e) {
            log.error("Erro ao produzir mensagem no Kafka para topico {}: {}", registrationEmailTopic, e.getMessage(), e);
        }
    }


}
