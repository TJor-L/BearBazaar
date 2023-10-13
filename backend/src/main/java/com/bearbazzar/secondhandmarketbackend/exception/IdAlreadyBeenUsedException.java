package com.bearbazzar.secondhandmarketbackend.exception;

public class IdAlreadyBeenUsedException extends RuntimeException{
    public IdAlreadyBeenUsedException(String message) {
        super(message);
    }
}
