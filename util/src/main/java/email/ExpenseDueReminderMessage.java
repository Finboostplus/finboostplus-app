package email;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDueReminderMessage implements Serializable {
    private String userName;
    private String email;
    private String expenseTitle;
    private Long daysUntilExpiration;

}
