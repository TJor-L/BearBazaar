package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "email")
@JsonDeserialize(builder = Email.Builder.class)
public class Email {
    @Id
    private String address;
    @JsonIgnore
    private String token;
    private boolean verified;
    public Email(){}
    public Email(Builder builder){
        this.address = builder.email;
        this.token = builder.token;
        this.verified = builder.verified;
    }
    public String getAddress(){
        return address;
    }
    public String getToken(){
        return token;
    }
    public boolean getVerified(){
        return verified;
    }
    public void setVerified(boolean verified){
        this.verified = verified;
    }
    public void setToken(String token){
        this.token = token;
    }
    public void setEmail(String email){
        this.address = email;
        this.verified = false;
    }
    public static class Builder{
        private String email;
        private String token;
        private boolean verified;
        public Builder(){}
        public Builder email(String email){
            this.email = email;
            return this;
        }
        public Builder token(String token){
            this.token = token;
            return this;
        }
        public Builder verified(boolean verified){
            this.verified = verified;
            return this;
        }
        public Email build(){
            return new Email(this);
        }
    }

}
