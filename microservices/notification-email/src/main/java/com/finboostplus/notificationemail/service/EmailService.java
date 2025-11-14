package com.finboostplus.notificationemail.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    /*@PostConstruct
    public void testEnv() {
        System.out.println("EMAIL ENV = " + System.getenv("MENSAGERIE_EMAIL"));
        System.out.println("PASSWORD ENV = " + System.getenv("MENSAGERIE_PASSWORD"));
    }*/

    public String sendTextEmail(String recipient, String subject, String message) {

        logger.info("Preparing to send email");
        logger.debug("Sender: {}", sender);
        logger.debug("Recipient: {}", recipient);
        logger.debug("Subject: {}", subject);
        logger.debug("Message: {}", message);

        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(sender);
            simpleMailMessage.setTo(recipient);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(message);

            javaMailSender.send(simpleMailMessage);

            logger.info("Email successfully sent to {}", recipient);
            return "Email sent successfully";

        } catch (Exception e) {
            logger.error("Email error: ", e);
            return "Error while trying to send email: " + e.getMessage();
        }
    }
}

