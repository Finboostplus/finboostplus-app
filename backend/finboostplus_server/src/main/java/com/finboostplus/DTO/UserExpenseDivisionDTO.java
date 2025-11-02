package com.finboostplus.DTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import com.finboostplus.enums.Status;
import com.finboostplus.projection.UserExpenseDivisionProjection;

public record UserExpenseDivisionDTO(Long expenseId, String title, String description, Long groupId, String groupName,
		Status status, BigDecimal total, Long categoryId, String categoryName, Instant createdAt, List<UserExpenseDivisionProjection> memberList) {
}
