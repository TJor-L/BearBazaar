package com.bearbazzar.secondhandmarketbackend.exception;

public class ItemNoExistException extends RuntimeException {
    public ItemNoExistException(String message) {
        super(message);
    }
    public ItemNoExistException() {
        super("Item does not exist");
    }
    public ItemNoExistException(Long id) {
        super("Item with id " + id + " does not exist");
    }
    public ItemNoExistException(String message, Throwable cause) {
        super(message, cause);
    }
    public ItemNoExistException(Throwable cause) {
        super(cause);
    }
    public ItemNoExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

