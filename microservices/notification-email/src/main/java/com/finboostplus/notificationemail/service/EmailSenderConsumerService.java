package com.finboostplus.notificationemail.service;

import email.ExpenseDueReminderMessage;
import email.ForgotPasswordMessage;
import email.RegistrationEmailMessage;
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
            containerFactory = "registrationKafkaListenerContainerFactory"
    )
    public void createRegisterEmail(RegistrationEmailMessage registrationEmailMessage) {
        String recipient = registrationEmailMessage.getEmail();
        String subject = "Conta criada com sucesso!";
        String message = "Olá " + registrationEmailMessage.getName() + ",\n\n" +
                "Seja bem-vindo(a) ao FinBoostPlus!\n\n" +
                "Para ativar sua conta, acesse o link abaixo:\n" +
                "http://localhost:8080/user/userValidate/" + registrationEmailMessage.getUuid() + "\n\n" +
                "Caso você não tenha solicitado este cadastro, por favor desconsidere este e-mail.\n\n" +
                "Atenciosamente,\n" +
                "Equipe FinBoostPlus";

        String response = emailService.sendTextEmail(recipient, subject, message);
        System.out.println(response + " UUID: "+registrationEmailMessage.getUuid());
    }

    @KafkaListener(
            topics = "${topic.message.consumer.forgot.password.email}",
            groupId = "${topic.api.consumer.group-id}",
            containerFactory = "forgotPasswordKafkaListenerContainerFactory"
    )
    public void createForgotPasswordEmail(ForgotPasswordMessage forgotPasswordMessage){
        String recipient = forgotPasswordMessage.getEmail();
        String subject = "Esqueceu sua senha?";
        String message = "Olá " + forgotPasswordMessage.getName() + ",\n\n" +
                "Conforme solicitado, sua nova senha é: " + forgotPasswordMessage.getPassword() + "\n\n" +
                "Recomendamos que você altere essa senha assim que acessar sua conta.\n\n" +
                "Atenciosamente,\n" +
                "Equipe FinBoostPlus";

        String response = emailService.sendTextEmail(recipient, subject, message);
        System.out.println("Forgot Password: "+response);
    }


    @KafkaListener(
            topics = "${topic.message.consumer.expense.due.reminder.email}",
            groupId = "${topic.api.consumer.group-id}",
            containerFactory = "expenseDueReminderKafkaListenerContainerFactory"
    )
    public void createExpenseDueReminderEmail(ExpenseDueReminderMessage expenseDueReminderMessage) {
        String recipient = expenseDueReminderMessage.getEmail();
        String subject = "Despesa próxima ao vencimento";

        String message = "Olá " + expenseDueReminderMessage.getUserName() + ",\n\n" +
                "Gostaríamos de informar que sua despesa intitulada \"" + expenseDueReminderMessage.getExpenseTitle() + "\" " +
                "vence em " + expenseDueReminderMessage.getDaysUntilExpiration() + " dia(s).\n\n" +
                "Atenciosamente,\n" +
                "Equipe FinBoostPlus";

        String response = emailService.sendTextEmail(recipient, subject, message);
        System.out.println("Expense Due Reminder: " + response);
    }

}
