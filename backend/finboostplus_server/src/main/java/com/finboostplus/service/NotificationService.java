package com.finboostplus.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import email.ExpenseDueReminderMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finboostplus.model.Expense;
import com.finboostplus.model.User;
import com.finboostplus.repository.UserExpenseDivisionRepository;

@Service
public class NotificationService {

        @Autowired
        private UserExpenseDivisionRepository userExpenseDivisionRepository;

        @Autowired
        EmailProducerService emailProducerService;

        public void notifyExpenseExpiring(Expense expense) {
                List<User> users = userExpenseDivisionRepository.findUserByExpenseId(expense.getId());
                Long daysUntilExpiration = ChronoUnit.DAYS.between(
                                LocalDate.now(),
                                expense.getDeadlineDate());
                System.out.println("Chegou aqui!");
                for (User user : users) {
                    ExpenseDueReminderMessage expenseDueReminderMessage = new
                            ExpenseDueReminderMessage(user.getName(), user.getEmail(), expense.getTitle(), daysUntilExpiration);
                    emailProducerService.sendExpenseNearExpirationMessage(expenseDueReminderMessage);
                }
        }
}
