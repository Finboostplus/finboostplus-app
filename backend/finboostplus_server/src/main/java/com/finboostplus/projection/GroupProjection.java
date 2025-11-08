package com.finboostplus.projection;

import java.math.BigDecimal;
import java.time.Instant;

public interface GroupProjection {
	Long getGroupId();

	String getName();

	String getDescription();

	String getAuthority();

	String getIcon();

	Instant getCreatedAt();

	BigDecimal getPartial_total();

	BigDecimal getTotal();
}
