package com.finboostplus.DTO;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Value;

public interface UserExpensesDTO {
	Long getExpenseId();

	String getTitle();

	Instant getCreatedAt();

	LocalDate getDeadlineDate();

	String getCategory();

	BigDecimal getPartialValue();

	String getDescription();

	String getStatus();

	Long getGroupId();

	String getGroupName();
}
