package com.finboostplus.DTO;

import com.finboostplus.projection.ExpenseProjection;

import java.util.List;
import java.util.Set;

public record GroupDetailsDTO(Long id, String name, List<ExpenseProjection> expense) {
}
