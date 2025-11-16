package com.finboostplus.service;

import email.ExpenseDueReminderMessage;
import email.ForgotPasswordMessage;
import email.RegistrationEmailMessage;
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

    @Value("${topic.message.producer.forgot.password.email}")
    private String forgotPasswordTopic;

    @Value("${topic.message.producer.expense.due.reminder.email}")
    private String expenseDueReminderTopic;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    public void sendRegisterEmail(final RegistrationEmailMessage registrationEmailMessage) {
        try {
            kafkaTemplate.send(registrationEmailTopic, registrationEmailMessage);
        } catch (Exception e) {
            log.error("Erro ao produzir mensagem no Kafka para topico {}: {}", registrationEmailTopic, e.getMessage(), e);
        }
    }

    public void sendForgotPasswordEmail(final ForgotPasswordMessage forgotPasswordMessage) {
        try {
            kafkaTemplate.send(forgotPasswordTopic, forgotPasswordMessage);
        } catch (Exception e) {
            log.error("Erro ao produzir mensagem no Kafka para topico {}: {}", forgotPasswordTopic, e.getMessage(), e);
        }
    }

    public void sendExpenseNearExpirationMessage(final ExpenseDueReminderMessage expenseDueReminderMessage){
        try {
            kafkaTemplate.send(expenseDueReminderTopic, expenseDueReminderMessage);
        } catch (Exception e) {
            log.error("Erro ao produzir mensagem no Kafka para topico {}: {}", expenseDueReminderTopic, e.getMessage(), e);
        }
    }


}
