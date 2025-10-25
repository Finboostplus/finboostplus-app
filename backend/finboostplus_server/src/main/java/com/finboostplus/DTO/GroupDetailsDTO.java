package com.finboostplus.DTO;

import java.util.List;

import com.finboostplus.projection.ExpenseProjection;

public record GroupDetailsDTO(Long id, String name, String icon, List<ExpenseProjection> expense) {
}
