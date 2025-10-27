package com.finboostplus.projection;

import java.time.Instant;

public interface GroupProjection {
	Long getId();

	String getName();

	String getDescription();

	String getAuthority();

	String getIcon();

	Instant getCreatedAt();

	Double getTotalExpenses();
}
