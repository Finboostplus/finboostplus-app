package com.finboostplus.projection;

import java.math.BigDecimal;

public interface UserExpenseDivisionProjection
{
    Long getUserId();
    String getUserName();
    BigDecimal getPartialValue();
    String getStatus();

}
