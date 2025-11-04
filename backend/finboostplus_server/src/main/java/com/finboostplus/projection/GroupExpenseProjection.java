package com.finboostplus.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface GroupExpenseProjection {
        Long getExpenseId();

        String getTitle();

        BigDecimal getPartialValue();

	Long getCategoryId();

	String getCategoryName();

	Long getGroupId();

	String getGroupName();

        String getStatus();

        LocalDate getDeadlineDate();
}

