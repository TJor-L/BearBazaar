package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponse {
    private final Token token;
    private final Long userId;
    public LoginResponse(Token token, Long userId){
        this.userId = userId;
        this.token = token;
    }
}
