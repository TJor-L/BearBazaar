package com.bearbazzar.secondhandmarketbackend.exception;

public class TransactionNoFoundException extends RuntimeException {
    public TransactionNoFoundException(String message) {
        super(message);
    }
    public TransactionNoFoundException() {
        super("Transaction does not exist");
    }
    public TransactionNoFoundException(Long id) {
        super("Transaction with id " + id + " does not exist");
    }
    public TransactionNoFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    public TransactionNoFoundException(Throwable cause) {
        super(cause);
    }
    public TransactionNoFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

