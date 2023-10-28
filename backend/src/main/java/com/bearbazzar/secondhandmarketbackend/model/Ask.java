package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;

@Entity
@Table(name = "ask")
@JsonDeserialize(builder = Ask.Builder.class)
public class Ask {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "item_id")
    @JsonManagedReference
    private Item item;

    private Double priceOffered;
    private String message;

    public Ask(Builder builder) {
        this.id = builder.id;
        this.user = builder.user;
        this.item = builder.item;
        this.priceOffered = builder.priceOffered;
        this.message = builder.message;
    }

    public Ask() {}

    public long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Item getItem() {
        return item;
    }

    public Double getPriceOffered() {
        return priceOffered;
    }

    public String getMessage() {
        return message;
    }
    public void setItem(Item item){
        this.item = item;
    }
    public void setUser(User user){
        this.user = user;
    }
    public void setPriceOffered(Double priceOffered){
        this.priceOffered = priceOffered;
    }
    public void setMessage(String message){
        this.message = message;
    }

    public static class Builder {
        @JsonProperty("id")
        private long id;
        @JsonProperty("buyer")
        private User user;
        @JsonProperty("item")
        private Item item;
        @JsonProperty("priceOffered")
        private Double priceOffered;
        @JsonProperty("message")
        private String message;

        public Builder setId(long id) {
            this.id = id;
            return this;
        }

        public Builder setUser(User user) {
            this.user = user;
            return this;
        }

        public Builder setItem(Item item) {
            this.item = item;
            return this;
        }

        public Builder setPriceOffered(Double priceOffered) {
            this.priceOffered = priceOffered;
            return this;
        }

        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }

        public Ask build() {
            return new Ask(this);
        }
    }
}
