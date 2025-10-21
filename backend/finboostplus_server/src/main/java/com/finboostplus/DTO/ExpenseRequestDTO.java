package com.finboostplus.DTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.finboostplus.model.Expense;

import jakarta.validation.constraints.NotNull;

public record ExpenseRequestDTO(String title, String description, String value,
                @NotNull(message = "A data limite é obrigatória") @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate deadlineDate,
                @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") Instant createdAt) {
        public Expense expDToToExpense() {
                Expense exp = new Expense();
                exp.setTitle(title);
                exp.setDescription(description);
                exp.setValue(BigDecimal.valueOf(Double.parseDouble(value)));
                exp.setDeadlineDate(deadlineDate);
                exp.setCreatedAt(createdAt);
                return exp;
        }
}
