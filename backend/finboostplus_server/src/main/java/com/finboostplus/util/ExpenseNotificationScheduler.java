package com.finboostplus.util;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.finboostplus.model.Expense;
import com.finboostplus.repository.ExpenseRepository;
import com.finboostplus.service.NotificationService;

@Component
@EnableScheduling
public class ExpenseNotificationScheduler {

        @Autowired
        private ExpenseRepository expenseRepository;

        @Autowired
        private NotificationService notificationService;

        @Scheduled(cron = "0 0 9 * * *")
        public void checkExpiringExpenses() {
                Instant today = Instant.now();
                LocalDate notificationDate = LocalDate.now().plusDays(3); // 3 dias antes

                List<Expense> expiringExpenses = expenseRepository
                                .findByExpirationDateBetween(today, notificationDate);

                for (Expense expense : expiringExpenses) {
                        notificationService.notifyExpenseExpiring(expense);
                }
        }
}
