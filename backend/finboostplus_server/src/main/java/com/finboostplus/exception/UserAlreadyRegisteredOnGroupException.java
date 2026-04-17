package com.finboostplus.exception;

public class UserAlreadyRegisteredOnGroupException extends RuntimeException{
    public UserAlreadyRegisteredOnGroupException(String message) {
        super(message);
    }
}
