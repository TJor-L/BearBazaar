package com.bearbazzar.secondhandmarketbackend.model;

import org.springframework.data.jpa.domain.Specification;

public class ItemSpecifications {

    public static Specification<Item> priceBetween(Double minPrice, Double maxPrice) {
        return (root, query, criteriaBuilder) -> {
            if (minPrice == null || maxPrice == null) return null;
            return criteriaBuilder.between(root.get("price"), minPrice, maxPrice);
        };
    }

    public static Specification<Item> hasCategory(String category) {
        return (root, query, criteriaBuilder) -> {
            if (category == null) return null;
            return criteriaBuilder.equal(root.get("category"), category);
        };
    }

    public static Specification<Item> descriptionContains(String description) {
        return (root, query, criteriaBuilder) -> {
            if (description == null || description.isEmpty()) return null;
            return criteriaBuilder.like(root.get("description"), "%" + description + "%");
        };
    }
    public static Specification<Item> nameContains(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) return null;
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };
    }
}

