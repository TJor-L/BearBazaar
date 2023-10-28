package com.bearbazzar.secondhandmarketbackend.exception;

public class TransactionStateException extends RuntimeException{
    public TransactionStateException(String message) {
        super(message);
    }
    public TransactionStateException() {
        super("Transaction state error");
    }
    public TransactionStateException(String message, Throwable cause) {
        super(message, cause);
    }
    public TransactionStateException(Throwable cause) {
        super(cause);
    }
    public TransactionStateException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
