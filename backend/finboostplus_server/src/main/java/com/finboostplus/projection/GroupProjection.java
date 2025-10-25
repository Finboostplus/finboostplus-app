package com.finboostplus.projection;

import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Value;

public interface GroupProjection {
	Long getId();

	String getName();

	String getDescription();

	String getAuthority();

	String getIcon();

	@Value("#{T(java.time.LocalDate).ofInstant(target.created_at, T(java.time.ZoneId).of('America/Sao_Paulo'))}")
	LocalDate getCreatedAt();

	Double getTotalExpenses();
}
