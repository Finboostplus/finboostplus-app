package com.finboostplus.DTO;

import java.math.BigDecimal;

public record GroupDetailsDTO(Long id, String name, String description, String icon, String authorization,
		BigDecimal total) {
}
