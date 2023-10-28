package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.model.Transaction;
import com.bearbazzar.secondhandmarketbackend.model.TransactionState;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
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
        Transaction transaction = transactionRepository.findById(id).orElse(null);
        if(transaction != null) {
            transaction.setStatus(status);
            transactionRepository.save(transaction);
        }
        return transaction;
    }
}
