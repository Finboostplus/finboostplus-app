package com.finboostplus.DTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import com.finboostplus.enums.Status;
import com.finboostplus.projection.UserExpenseDivisionProjection;

public record UserExpenseDivisionDTO(Long id, String title, String description, Long groupId, String groupName, Status status, BigDecimal total, Instant createdAt, List<UserExpenseDivisionProjection> memberList) {
}
