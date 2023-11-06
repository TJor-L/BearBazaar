package com.bearbazzar.secondhandmarketbackend.exception;

public class SellerErrorException extends RuntimeException{
    public SellerErrorException(String message) {
        super(message);
    }
    public SellerErrorException() {
        super("Seller error");
    }
    public SellerErrorException(String message, Throwable cause) {
        super(message, cause);
    }
    public SellerErrorException(Throwable cause) {
        super(cause);
    }
    public SellerErrorException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
