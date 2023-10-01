package com.bearbazzar.secondhandmarketbackend.repository;

import com.bearbazzar.secondhandmarketbackend.model.Item;
import com.bearbazzar.secondhandmarketbackend.model.Status;
import com.bearbazzar.secondhandmarketbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {
    List<Item> findAllByStatus(Status status);
    List<Item> findAllByOwner(User owner);
    List<Item> findByPriceBetweenAndCategory(long minPrice, long maxPrice, String category);
}
