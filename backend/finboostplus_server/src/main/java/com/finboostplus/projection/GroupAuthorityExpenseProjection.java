package com.finboostplus.projection;

import java.math.BigDecimal;

public interface GroupAuthorityExpenseProjection extends GroupExpenseProjection {
	BigDecimal getTotal();

	BigDecimal getRemainingValue();
}
