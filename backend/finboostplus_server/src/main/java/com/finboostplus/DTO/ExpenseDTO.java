package com.finboostplus.DTO;

import com.finboostplus.model.Category;

public record ExpenseDTO(Long id, String title, String description, Double value) {
}
