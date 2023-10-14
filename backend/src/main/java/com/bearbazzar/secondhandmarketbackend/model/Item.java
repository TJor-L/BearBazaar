package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "item")
@JsonDeserialize(builder = Item.Builder.class)
public class Item implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    @JoinColumn(name = "owner")
    private User owner;
    private String name;
    private String description;
    private String category;
    private Status status;// whether the item can be put on the market
    private Double price;
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> image;
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ask> asks = new ArrayList<>();
    public Item(Builder builder){
        this.id = builder.id;
        this.owner = builder.owner;
        this.name = builder.name;
        this.description = builder.description;
        this.category = builder.category;
        this.status = builder.status;
        this.price = builder.price;
        this.asks = new ArrayList<Ask>();
        this.image = builder.image;
    }
    public Item(){}
    public long getId() {
        return id;
    }
    public User getOwner() {
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
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status){
        this.status = status;
    }
    public Double getPrice() {
        return price;
    }
    public void setOwner(User owner){
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
    public void setPrice(Double price){
        this.price = price;
    }
    public List<Ask> getAsks(){
        return asks;
    }
    public void addAsk(Ask ask){
        asks.add(ask);
    }
    public void removeAsk(Ask ask){
        asks.remove(ask);
    }
    public List<Image> getImage(){
        return image;
    }
    public void setImage(List<Image> image){
        this.image = image;
    }
    public static class Builder{

        private long id;
        @JsonProperty("price")
        private Double price;
        @JsonProperty("owner")
        private User owner;
        @JsonProperty("name")
        private String name;
        @JsonProperty("description")
        private String description;
        @JsonProperty("category")
        private String category;
        @JsonProperty("status")
        private Status status;
        @JsonProperty("image")
        private List<Image> image;

        public Builder setImage(List<Image> image){
            this.image = image;
            return this;
        }
        public Builder setPrice(Double price){
            this.price = price;
            return this;
        }

        public Builder setId(long id){
            this.id = id;
            return this;
        }
        public Builder setOwner(User owner){
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
        public Builder setStatus(Status status){
            this.status = status;
            return this;
        }
        public Item build(){
            return new Item(this);
        }
    }
}
