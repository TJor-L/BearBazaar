package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;

@Entity
@Table(name = "Ask")
@JsonDeserialize(builder = Item.Builder.class)
public class Ask {
    @OneToOne(cascade = CascadeType.ALL)
    User asker;
    @ManyToOne
    @JoinColumn(name = "item",referencedColumnName = "id")
    Item item;
    Double price;

    @Id
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    public Ask(){}
    public Ask(Builder builder){
        this.asker = builder.asker;
        this.item = builder.item;
        this.price = builder.price;
    }
    public User getAsker() {
        return asker;
    }
    public Item getItem() {
        return item;
    }
    public Double getPrice() {
        return price;
    }
    public void setAsker(User asker){
        this.asker = asker;
    }
    public void setItem(Item item){
        this.item = item;
    }
    public void setPrice(Double price){
        this.price = price;
    }
    public static class Builder {
        @JsonProperty("asker")
        private User asker;
        @JsonProperty("item")
        private Item item;
        @JsonProperty("price")
        private Double price;
        public Builder(){}
        public Builder asker(User asker) {
            this.asker = asker;
            return this;
        }
        public Builder item(Item item) {
            this.item = item;
            return this;
        }
        public Builder price(Double price) {
            this.price = price;
            return this;
        }
        public Ask build() {
            return new Ask(this);
        }
    }
}
