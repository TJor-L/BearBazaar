package com.bearbazzar.secondhandmarketbackend.repository;

import com.bearbazzar.secondhandmarketbackend.model.Ask;
import com.bearbazzar.secondhandmarketbackend.model.Item;
import com.bearbazzar.secondhandmarketbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AskRepository extends JpaRepository<Ask, Long> {
    List<Ask> findByItem(Item item);

    List<Ask> findByUser(User user);
    // Add custom queries if needed
}
