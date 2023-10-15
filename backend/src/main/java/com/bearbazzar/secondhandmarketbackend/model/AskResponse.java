package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AskResponse {
    private String user;
    private Long ask_id;
    private Long item_id;
    private String item_name;
    private Double price;
    private String message;

    public AskResponse(Long ask_id, String username, Long id, String item_name,Double priceOffered, String message) {
        this.ask_id = ask_id;
        this.user = username;
        this.item_id = id;
        this.item_name = item_name;
        this.price = priceOffered;
        this.message = message;
    }



    public void setPrice(Double priceOffered) {
        this.price = priceOffered;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    

    // Constructors, getters, and setters for the fields...
}
