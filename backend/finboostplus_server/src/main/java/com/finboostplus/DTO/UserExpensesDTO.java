package com.finboostplus.DTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Value;

public interface UserExpensesDTO {
	Long getExpenseId();

	String getTitle();

	Instant getCreatedAt();

	@Value("#{T(java.time.LocalDate).ofInstant(target.created_at, T(java.time.ZoneId).of('America/Sao_Paulo'))}")
	LocalDate getDeadlineDate();

	String getCategory();

	BigDecimal getPartialValue();

	String getDescription();

	String getStatus();

	Long getGroupId();

	String getGroupName();
}
