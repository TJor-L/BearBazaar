package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;

@Entity
@Table(name = "transaction")
@JsonDeserialize(builder = Transaction.Builder.class)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;
    private Long item_id;
    private Double price;
    private TransactionState status;

    public Transaction(Builder builder) {
        this.id = builder.id;
        this.buyer = builder.buyer;
        this.seller = builder.seller;
        this.item_id = builder.item;
        this.price = builder.price;
        this.status = builder.status;
    }

    public Transaction() {}

    public long getId() {
        return id;
    }

    public User getBuyer() {
        return buyer;
    }

    public User getSeller() {
        return seller;
    }

    public Long getItem() {
        return item_id;
    }

    public Double getPrice() {
        return price;
    }

    public TransactionState getStatus() {
        return status;
    }

    public void setStatus(TransactionState status) {
        this.status = status;
    }

    public static class Builder {
        @JsonProperty("id")
        private long id;
        @JsonProperty("buyer")
        private User buyer;
        @JsonProperty("seller")
        private User seller;
        @JsonProperty("item_id")
        private Long item;
        @JsonProperty("price")
        private Double price;
        @JsonProperty("status")
        private TransactionState status;

        public Builder setId(long id) {
            this.id = id;
            return this;
        }

        public Builder setBuyer(User buyer) {
            this.buyer = buyer;
            return this;
        }

        public Builder setSeller(User seller) {
            this.seller = seller;
            return this;
        }

        public Builder setItem(Long item) {
            this.item = item;
            return this;
        }

        public Builder setPrice(Double price) {
            this.price = price;
            return this;
        }

        public Builder setStatus(TransactionState status) {
            this.status = status;
            return this;
        }

        public Transaction build() {
            return new Transaction(this);
        }
    }
}
