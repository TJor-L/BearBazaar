package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties;

import javax.persistence.*;
import java.nio.Buffer;

@Entity
@Table(name = "ask")
@JsonDeserialize(builder = Ask.Builder.class)
public class Ask {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    private Double priceOffered;
    public Ask() {}
    public Ask(Builder builder){
        this.id = builder.id;
        this.user = builder.user;
        this.item = builder.item;
        this.priceOffered = builder.priceOffered;
    }
    public Long getId() {
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
    public void setPriceOffered(Double priceOffered){
        this.priceOffered = priceOffered;
    }

    static class Builder{
        private Long id;
        @JsonProperty("user")
        private User user;
        @JsonProperty("item")
        private Item item;
        @JsonProperty("priceOffered")
        private Double priceOffered;

        public Builder setId(Long id){
            this.id = id;
            return this;
        }

        public Builder setUser(User user){
            this.user = user;
            return this;
        }

        public Builder setItem(Item item){
            this.item = item;
            return this;
        }

        public Builder setPriceOffered(Double priceOffered){
            this.priceOffered = priceOffered;
            return this;
        }

        public Ask build(){
            return new Ask(this);
        }
    }
}
