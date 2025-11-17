package com.finboostplus.notificationemail.service;

import email.ExpenseCreatedNotificationMessage;
import email.ExpenseDueReminderMessage;
import email.ForgotPasswordMessage;
import email.RegistrationEmailMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;



@Service
public class EmailSenderConsumerService {

    @Autowired
    private EmailService emailService;

    @KafkaListener(
            topics = "${topic.message.consumer.signup.email}",
            groupId = "${topic.api.consumer.group-id}",
            containerFactory = "registrationKafkaListenerContainerFactory"
    )
    public void createRegisterEmail(RegistrationEmailMessage msg) {
        String recipient = msg.getEmail();
        String subject = "Conta criada com sucesso!";
        String message = "Olá " + msg.getName() + ",\n\n" +
                "Seja bem-vindo(a) ao FinBoostPlus!\n\n" +
                "Para ativar sua conta, acesse o link abaixo:\n" +
                "http://localhost:8080/user/userValidate/" + msg.getUuid() + "\n\n" +
                "Caso você não tenha solicitado este cadastro, por favor desconsidere este e-mail.\n\n" +
                "Atenciosamente,\n" +
                "Equipe FinBoostPlus";

        String response = emailService.sendTextEmail(recipient, subject, message);
        System.out.println(response + " UUID: "+msg.getUuid());
    }

    @KafkaListener(
            topics = "${topic.message.consumer.forgot.password.email}",
            groupId = "${topic.api.consumer.group-id}",
            containerFactory = "forgotPasswordKafkaListenerContainerFactory"
    )
    public void createForgotPasswordEmail(ForgotPasswordMessage msg){
        String recipient = msg.getEmail();
        String subject = "Esqueceu sua senha?";
        String message = "Olá " + msg.getName() + ",\n\n" +
                "Conforme solicitado, sua nova senha é: " + msg.getPassword() + "\n\n" +
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
    public void createExpenseDueReminderEmail(ExpenseDueReminderMessage msg) {
        String recipient = msg.getEmail();
        String subject = "Despesa próxima ao vencimento";

        String message = "Olá " + msg.getUserName() + ",\n\n" +
                "Gostaríamos de informar que sua despesa intitulada \"" + msg.getExpenseTitle() + "\" " +
                "vence em " + msg.getDaysUntilExpiration() + " dia(s).\n\n" +
                "Atenciosamente,\n" +
                "Equipe FinBoostPlus";

        String response = emailService.sendTextEmail(recipient, subject, message);
        System.out.println("Expense Due Reminder: " + response);
    }

    @KafkaListener(
            topics = "${topic.message.consumer.expense.created.notification.email}",
            groupId = "${topic.api.consumer.group-id}",
            containerFactory = "expenseCreatedNotificationKafkaListenerContainerFactory"
    )
    public void createExpenseCreatedNotificationEmail(ExpenseCreatedNotificationMessage msg) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        String recipient = msg.getEmail();
        String subject = "Nova despesa criada";

        String message =
                "Olá " + msg.getUserName() + ",\n\n" +
                        "Informamos que uma nova despesa intitulada \"" + msg.getExpenseTitle() + "\" " +
                        "foi criada no grupo \"" + msg.getGroupName() + "\". " +
                        "O vencimento está previsto para o dia " + msg.getDeadlineDate().format(formatter) + " e " +
                        "o valor registrado é de R$ " + msg.getValue() + ".\n\n" +
                        "Esta despesa já está associada ao seu perfil.\n\n" +
                        "Atenciosamente,\n" +
                        "Equipe FinBoostPlus";

        String response = emailService.sendTextEmail(recipient, subject, message);
        System.out.println("Expense Created Notification: " + response);
    }
}
