package com.finboostplus.DTO;

import java.math.BigDecimal;

public record UserMonthlyExpensesDTO(String month,
		BigDecimal total) {
}
