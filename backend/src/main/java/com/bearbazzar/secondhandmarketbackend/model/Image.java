package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "image")
public class Image {
    @Id
    private String url;
    @ManyToOne
    @JoinColumn(name = "item_id")
    @JsonIgnore
    private Item item;
    public Image(){}
    public Image(String url,Item item){
        this.url = url;
        this.item = item;
    }
    public String getUrl(){
        return url;
    }
    public Item getItem(){
        return item;
    }
    public void setItem(Item item){
        this.item = item;
    }
    public void setUrl(String url){
        this.url = url;
    }
}
