package com.finboostplus.DTO;

import com.finboostplus.model.Category;

import java.math.BigDecimal;

public record ExpenseDTO(Long id, String title, String description, BigDecimal value) {
}
