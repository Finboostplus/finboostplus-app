package com.finboostplus.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface GroupExpenseProjection {
        Long getId();

        String getTitle();

        BigDecimal getValue();

	Long getGroupId();

	String getGroupName();

        String getStatus();

        LocalDate getDeadlineDate();
}
