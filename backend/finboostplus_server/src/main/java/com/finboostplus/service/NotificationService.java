package com.finboostplus.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finboostplus.model.Expense;
import com.finboostplus.model.User;
import com.finboostplus.repository.UserExpenseDivisionRepository;

@Service
public class NotificationService {

        @Autowired
        private EmailService emailService;

        @Autowired
        private UserExpenseDivisionRepository userExpenseDivisionRepository;

        public void notifyExpenseExpiring(Expense expense) {
                List<User> users = userExpenseDivisionRepository.findByExpenseId(expense.getId());
                long daysUntilExpiration = ChronoUnit.DAYS.between(
                                LocalDate.now(),
                                expense.getDeadlineDate());

                for (User user : users) {
                        emailService.enviarEmailTexto(user.getEmail(), "Despesa perto de expirar", "Sua despesa "
                                        + expense.getTitle() + " vence em " + daysUntilExpiration + " dias");
                }
        }
}
