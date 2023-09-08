package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
@JsonDeserialize(builder = User.Builder.class)
public class User {
    @Id
    private String username;
    @JsonIgnore
    private String password;
    private String email;
    private String phone;
    private boolean enabled = false;//later used to determine if the user is admin
    private User(Builder builder) {
        this.username = builder.username;
        this.password = builder.password;
        this.email = builder.email;
        this.phone = builder.phone;
    }
    public User(){}
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public String getEmail(){
        return email;
    }
    public String getPhone(){
        return phone;
    }

    public  void setPassword(String password){
        this.password = password;
    }
    public  void setEmail(String email){
        this.email = email;
    }
    public  void setPhone(String phone){
        this.phone = phone;
    }

    public static class Builder{
        @JsonProperty("username")
        String username;
        @JsonProperty("password")
        String password;
        @JsonProperty("email")
        String email;
        @JsonProperty("phone")
        String phone;
        public Builder setUsername(String username){
            this.username = username;
            return this;
        }
        public Builder setPassword(String password){
            this.password = password;
            return this;
        }
        public Builder setEmail(String email){
            this.email = email;
            return this;
        }
        public Builder setPhone(String phone){
            this.phone = phone;
            return this;
        }
        public User build(){
            return new User(this);
        }
    }
}
