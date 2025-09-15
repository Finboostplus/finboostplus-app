package com.finboostplus.projection;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface ExpenseProjection {
    Long getId();
    String getTitle();
    String getDescription();
    String getCategoryName();
    BigDecimal getTotal();
}
