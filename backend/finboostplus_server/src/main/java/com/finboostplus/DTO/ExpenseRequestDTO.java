package com.finboostplus.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.finboostplus.model.Expense;

import java.time.LocalDateTime;

public record ExpenseRequestDTO(String title, String description, String value,
                                @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")LocalDateTime deadlineDate,
                                @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")LocalDateTime creatAt) {




    public Expense expDToToExpense(){


        Expense exp = new Expense();
        exp.setTitle(title);
        exp.setDescription(description);
        exp.setValue(Double.parseDouble(value));
        exp.setDeadlineDate(deadlineDate);
        exp.setCreatAt(creatAt);
        return exp;
    }
}
