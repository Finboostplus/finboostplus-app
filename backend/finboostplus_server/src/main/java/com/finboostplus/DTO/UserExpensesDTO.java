package com.finboostplus.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Value;

public interface UserExpensesDTO {
	Long getId();

	String getTitle();

	BigDecimal getPartialValue();

	String getDescription();

	@Value("#{T(java.time.LocalDate).ofInstant(target.created_at, T(java.time.ZoneId).of('America/Sao_Paulo'))}")
	LocalDate getCreatedAt();

	@Value("#{T(java.time.LocalDate).ofInstant(target.created_at, T(java.time.ZoneId).of('America/Sao_Paulo'))}")
	LocalDate getDeadlineDate();

	String getStatus();

	String getCategory();
}
