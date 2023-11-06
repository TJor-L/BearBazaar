package com.bearbazzar.secondhandmarketbackend.repository;

import com.bearbazzar.secondhandmarketbackend.model.Email;
import com.bearbazzar.secondhandmarketbackend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EmailRepository extends JpaRepository<Email, String>, JpaSpecificationExecutor<Item> {
    Email getEmailByAddress(String address);
}
