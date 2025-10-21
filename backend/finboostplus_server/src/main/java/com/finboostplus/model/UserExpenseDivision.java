package com.finboostplus.model;

import java.math.BigDecimal;

import com.finboostplus.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_expense_divisions")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserExpenseDivision {
        @EmbeddedId
        private UserExpenseDivisionId id;

        @ManyToOne
        @MapsId("userId")
        @JoinColumn(name = "user_id")
        private User user;

        @ManyToOne
        @MapsId("expenseId")
        @JoinColumn(name = "expense_id")
        private Expense expense;

        @Column(name = "partial_value")
        private BigDecimal parcialValue;

        @Enumerated(EnumType.STRING)
        @Column(name = "status", nullable = false)
        private Status status;
}
