package com.finboostplus.DTO;

import com.finboostplus.enums.Status;

import java.math.BigDecimal;

public record GroupExpenseDTO(Long id, String title, BigDecimal value, Status status) {

    public GroupExpenseDTO(Long id, String title, BigDecimal value, String status) {
        this(id, title, value, Status.valueOf(status));
    }
}

