package com.finboostplus.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_expense_division")
@AllArgsConstructor
@NoArgsConstructor
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
    private double parcialValue;

    private boolean isPaid;

    public UserExpenseDivisionId getId() {
        return id;
    }

    public void setId(UserExpenseDivisionId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Expense getExpense() {
        return expense;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }

    public double getParcialValue() {
        return parcialValue;
    }

    public void setParcialValue(double parcialValue) {
        this.parcialValue = parcialValue;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
    }
}
