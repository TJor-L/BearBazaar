package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(builder = Filter.Builder.class)
public class Filter {
    Double minPrice;
    Double maxPrice;
    String category;
    String content;
    public Filter() {}
    private Filter(Builder builder) {
        this.minPrice = builder.minPrice;
        this.maxPrice = builder.maxPrice;
        this.category = builder.category;
        this.content = builder.content;
    }

    public Double getMinPrice() {
        return minPrice;
    }
    public Double getMaxPrice() {
        return maxPrice;
    }
    public String getCategory() {
        return category;
    }
    public String getContent() {
        return content;
    }
    public static class Builder {
        @JsonProperty("minPrice")
        private Double minPrice;
        @JsonProperty("maxPrice")
        private Double maxPrice;
        @JsonProperty("category")
        private String category;
        @JsonProperty("content")
        private String content;
        public Builder() {}
        public Builder minPrice(Double minPrice) {
            this.minPrice = minPrice;
            return this;
        }
        public Builder maxPrice(Double maxPrice) {
            this.maxPrice = maxPrice;
            return this;
        }
        public Builder category(String category) {
            this.category = category;
            return this;
        }
        public Builder content(String content) {
            this.content = content;
            return this;
        }
        public Filter build() {
            return new Filter(this);
        }
    }
}
