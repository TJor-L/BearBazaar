package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;

@Entity
@Table(name = "item")
@JsonDeserialize(builder = Item.Builder.class)
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String owner;
    private String name;
    private String description;
    private String category;
    private String status;// whether the item can be put on the market
    private long price;
    public Item(Builder builder){
        this.id = builder.id;
        this.owner = builder.owner;
        this.name = builder.name;
        this.description = builder.description;
        this.category = builder.category;
        this.status = builder.status;
        this.price = builder.price;
    }
    public Item(){}
    public long getId() {
        return id;
    }
    public String getOwner() {
        return owner;
    }
    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }
    public String getCategory() {
        return category;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status){
        this.status = status;
    }
    public long getPrice() {
        return price;
    }
    public void setOwner(String owner){
        this.owner = owner;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public void setCategory(String category){
        this.category = category;
    }
    public void setPrice(long price){
        this.price = price;
    }
    static class Builder{

        private long id;
        @JsonProperty("price")
        private long price;
        @JsonProperty("owner")
        private String owner;
        @JsonProperty("name")
        private String name;
        @JsonProperty("description")
        private String description;
        @JsonProperty("category")
        private String category;
        @JsonProperty("status")
        private String status;
        public Builder setId(long id){
            this.id = id;
            return this;
        }
        public Builder setOwner(String owner){
            this.owner = owner;
            return this;
        }
        public Builder setName(String name){
            this.name = name;
            return this;
        }
        public Builder setDescription(String description){
            this.description = description;
            return this;
        }
        public Builder setCategory(String category){
            this.category = category;
            return this;
        }
        public Builder setStatus(String status){
            this.status = status;
            return this;
        }
        public Item build(){
            return new Item(this);
        }
    }
}
