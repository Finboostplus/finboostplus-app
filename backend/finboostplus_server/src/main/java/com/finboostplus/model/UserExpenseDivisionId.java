package com.finboostplus.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserExpenseDivisionId {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "expense_id")
    private Long expenseId;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass())
            return false;
        UserExpenseDivisionId that = (UserExpenseDivisionId) o;
        return Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(userId);
    }
}
