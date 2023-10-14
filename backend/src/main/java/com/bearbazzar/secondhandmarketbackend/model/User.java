package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@JsonDeserialize(builder = User.Builder.class)
public class User {
    @Id
    private String username;
    private Long studentId;
    @JsonIgnore
    private String password;
    private String email;
    private String phone;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ask> asks = new ArrayList<>();
    private boolean enabled = false;//later used to determine if the user is admin
    private User(Builder builder) {
        this.studentId = builder.studentId;
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
    public Long getStudentId(){
        return studentId;
    }
    public void setStudentId(Long studentId){
        this.studentId = studentId;
    }
    public List<Ask> getAsks() {
        return asks;
    }
    public void addAsk(Ask ask){
        asks.add(ask);
    }
    public void removeAsk(Ask ask){
        asks.remove(ask);
    }
    public static class Builder{
        @JsonProperty("studentId")
        Long studentId;
        @JsonProperty("username")
        String username;
        @JsonProperty("password")
        String password;
        @JsonProperty("email")
        String email;
        @JsonProperty("phoneNumber")
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
        public Builder setStudentId(Long studentId){
            this.studentId = studentId;
            return this;
        }
        public User build(){
            return new User(this);
        }
    }
}
