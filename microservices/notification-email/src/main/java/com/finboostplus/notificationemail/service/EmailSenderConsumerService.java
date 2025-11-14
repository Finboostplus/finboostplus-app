package com.finboostplus.notificationemail.service;

import email.RegistrationEmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;


@Service
public class EmailSenderConsumerService {

    @Autowired
    private EmailService emailService;

    @KafkaListener(
            topics = "${topic.message.consumer.signup.email}",
            groupId = "${topic.api.consumer.group-id}",
            containerFactory = "messageKafkaListenerContainerFactory"
    )
    public void createRegisterEmail(RegistrationEmailSender registrationEmailSender) {
        String recipient = registrationEmailSender.getEmail();
        String subject = "Conta criada com sucesso!";
        String message = "Seja bem vindo(a) " + registrationEmailSender.getName() + " ao FinboostPlus!\n" +
                "Para ativar sua conta, acesse o link: http://localhost:8080/user/userValidate/" // Futuramente:
                // https://finboostplus.com.br ou algo assim
                + registrationEmailSender.getUuid();
        String response = emailService.sendTextEmail(recipient, subject, message);
        System.out.println(response + " UUID: "+registrationEmailSender.getUuid());
    }
}
