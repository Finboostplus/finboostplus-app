package email;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCreatedNotificationMessage implements Serializable {
    private String userName;
    private String email;
    private String expenseTitle;
    private String groupName;
    private BigDecimal value;
    private LocalDate deadlineDate;
}
