package com.finboostplus.DTO;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Value;

public record GroupDTO(
		Long id,

		String name,

		String description,

		String icon,

		Instant createdAt) {
}
