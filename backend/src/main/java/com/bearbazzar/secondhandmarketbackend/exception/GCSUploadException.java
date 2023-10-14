package com.bearbazzar.secondhandmarketbackend.exception;

public class GCSUploadException extends RuntimeException{
    public GCSUploadException(String message){
        super(message);
    }
}
