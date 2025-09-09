package com.finboostplus.exception;

public class MemberHasPendingExpensesException extends RuntimeException{
    public MemberHasPendingExpensesException(String message) {
        super(message);
    }
}
