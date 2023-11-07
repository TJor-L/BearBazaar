package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.exception.ItemNoExistException;
import com.bearbazzar.secondhandmarketbackend.model.*;
import com.bearbazzar.secondhandmarketbackend.repository.ItemRepository;
import com.bearbazzar.secondhandmarketbackend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import java.util.*;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final ItemRepository itemRepository;
    public TransactionService(TransactionRepository transactionRepository, ItemRepository itemRepository) {
        this.transactionRepository = transactionRepository;
        this.itemRepository = itemRepository;
    }
    public void createTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }
    public List<Transaction> getAllTransaction() {
        return transactionRepository.findAll();
    }
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }
    public List<Transaction> getTransactionByBuyer(String buyer) {
        User buyerEntity = new User.Builder().setUsername(buyer).build();
        return transactionRepository.findByBuyer(buyerEntity);
    }
    public List<Transaction> getTransactionBySeller(String seller) {
        User sellerEntity = new User.Builder().setUsername(seller).build();
        return transactionRepository.findBySeller(sellerEntity);
    }
    public void deleteTransactionById(Long id) {
        transactionRepository.deleteById(id);
    }
    public Transaction updateTransactionById(Long id, TransactionState status) {
        System.out.println("updateTransactionById called with id: " + id + " and status: " + status);
        Transaction transaction = transactionRepository.findById(id).orElse(null);

        if(transaction != null) {
            System.out.println("Transaction found with id: " + id);
            transaction.setStatus(status);
            if(status == TransactionState.Completed) {
                System.out.println("Transaction status is Completed, checking for item existence");
                if(!itemRepository.existsById(transaction.getItem())) {
                    System.out.println("No item found with id: " + id);
                    throw new ItemNoExistException("Item does not exists");
                }
                Optional<Item> optionalItem = itemRepository.findById(transaction.getItem());
                if(optionalItem.isPresent()) {
                    Item existItem = optionalItem.get();
                    System.out.println("Setting item status to SOLD for item id: " + transaction.getItem());
                    existItem.setStatus(Status.SOLD);
                    itemRepository.save(existItem);
                } else {
                    System.out.println("Found no item to mark as SOLD for id: " + transaction.getItem());
                }
            }
            transactionRepository.save(transaction);
        } else {
            System.out.println("No transaction found with id: " + id);
        }

        return transaction;
    }

}
