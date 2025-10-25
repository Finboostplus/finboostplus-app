package com.finboostplus.DTO;

import com.finboostplus.projection.UserExpenseDivisionProjection;
import com.finboostplus.enums.Status;

import java.math.BigDecimal;
import java.util.List;

public record UserExpenseDivisionDTO(Long id, String title, String description, Long groupId, String groupName, Status status, BigDecimal total, List<UserExpenseDivisionProjection> memberList) {
}
