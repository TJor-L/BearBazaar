package com.bearbazzar.secondhandmarketbackend.repository;

import com.bearbazzar.secondhandmarketbackend.model.Transaction;
import com.bearbazzar.secondhandmarketbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByBuyer(User buyer);
    List<Transaction> findBySeller(User seller);
}
