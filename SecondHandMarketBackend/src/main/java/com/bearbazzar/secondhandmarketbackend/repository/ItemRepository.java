package com.bearbazzar.secondhandmarketbackend.repository;

import com.bearbazzar.secondhandmarketbackend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
