package com.finboostplus.DTO;

import com.finboostplus.projection.UserExpenseDivisionProjection;

import java.math.BigDecimal;
import java.util.List;

public record UserExpenseDivisionDTO(Long id, String title, String description, com.finboostplus.enums.Status status, BigDecimal total, List<UserExpenseDivisionProjection> listaUser) {
}
