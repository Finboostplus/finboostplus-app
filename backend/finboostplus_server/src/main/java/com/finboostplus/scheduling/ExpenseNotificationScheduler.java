package com.finboostplus.scheduling;

import java.time.LocalDate;
import java.util.List;

import com.finboostplus.enums.Status;
import com.finboostplus.repository.UserExpenseDivisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.finboostplus.model.Expense;
import com.finboostplus.repository.ExpenseRepository;
import com.finboostplus.service.NotificationService;

@Component
public class ExpenseNotificationScheduler {
        @Autowired
        private ExpenseRepository expenseRepository;

        @Autowired
        private NotificationService notificationService;

        @Autowired
        private UserExpenseDivisionRepository userExpenseDivisionRepository;


        @Scheduled(cron = "0 0 9 * * *") //Roda todos os dias às 9h
        public void checkExpiringExpenses() {

                LocalDate today = LocalDate.now();
                LocalDate notificationDate = LocalDate.now().plusDays(3); // 3 dias antes
                                List<Expense> expiringExpenses = expenseRepository
                                .findByExpirationDateBetween(today, notificationDate);
                for (Expense expense : expiringExpenses) {
                        notificationService.notifyExpenseExpiring(expense);
                }
        }

        @Scheduled(cron = "0 0 0 * * *")
        public void updateExpiredExpensesStatus() {

                LocalDate today = LocalDate.now();

                List<Expense> expiredExpenses =
                        expenseRepository.findByDeadlineDateBeforeAndStatus(
                                today, Status.PENDING
                        );

                for (Expense expense : expiredExpenses) {
                    expenseRepository.markExpenseAsUnpaid(expense.getId());
                    userExpenseDivisionRepository.markDivisionAsUnpaid(expense.getId());
                }
        }

}
