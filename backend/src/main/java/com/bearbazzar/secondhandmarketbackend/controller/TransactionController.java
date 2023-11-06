package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.exception.SellerErrorException;
import com.bearbazzar.secondhandmarketbackend.exception.TransactionNoFoundException;
import com.bearbazzar.secondhandmarketbackend.exception.TransactionStateException;
import com.bearbazzar.secondhandmarketbackend.model.Ask;
import com.bearbazzar.secondhandmarketbackend.model.Transaction;
import com.bearbazzar.secondhandmarketbackend.model.TransactionState;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.service.AskService;
import com.bearbazzar.secondhandmarketbackend.service.ItemService;
import com.bearbazzar.secondhandmarketbackend.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    private final TransactionService transactionService;
    private final ItemService itemService;
    private final AskService askService;
    public TransactionController(TransactionService transactionService, ItemService itemService,AskService askService) {
        this.transactionService = transactionService;
        this.itemService = itemService;
        this.askService = askService;
    }
    @PostMapping()
    public void createTransaction(@RequestParam("ask_id") Long ask_id) {
        Ask ask = askService.getAskById(ask_id);
        User buyerEntity = new User.Builder().setUsername(ask.getUser().getUsername()).build();
        User sellerEntity = new User.Builder().setUsername(ask.getItem().getOwner().getUsername()).build();
        Transaction transaction = new Transaction.Builder()
                .setBuyer(buyerEntity)
                .setSeller(sellerEntity)
                .setItem(ask.getItem().getId())
                .setPrice(ask.getPriceOffered())
                .setStatus(TransactionState.Confirmed)
                .build();
        askService.removeAsk(ask_id);
        transactionService.createTransaction(transaction);
    }
    @GetMapping("")
    public List<Transaction> getAllTransaction() {
        return transactionService.getAllTransaction();
    }
    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable Long id) {
        Transaction transaction = transactionService.getTransactionById(id);
        if(transaction == null) {
            throw new TransactionNoFoundException("Transaction not found");
        }
        return transaction;
    }
    @GetMapping("/buyer/{buyer}")
    public List<Transaction> getTransactionByBuyer(@PathVariable String buyer) {
        return transactionService.getTransactionByBuyer(buyer);
    }
    @GetMapping("/seller/{seller}")
    public List<Transaction> getTransactionBySeller(@PathVariable String seller) {
        return transactionService.getTransactionBySeller(seller);
    }
    @DeleteMapping("/{id}")
    public void deleteTransactionById(@PathVariable Long id) {
        Transaction transaction = transactionService.getTransactionById(id);
        if(transaction == null) {
            throw new TransactionNoFoundException("Transaction no exist");
        }
        if(transaction.getStatus() != TransactionState.Pending) {
            throw new TransactionStateException("Transaction already confirmed and cannot be deleted");
        }
        transactionService.deleteTransactionById(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransactionById(@PathVariable Long id,
                                                             @RequestParam("status") TransactionState status) {
        Transaction transaction = transactionService.getTransactionById(id);
        if(transaction == null) {
            throw new TransactionNoFoundException("Transaction not found");
        }
        return ResponseEntity.ok(transactionService.updateTransactionById(id, status));
    }
}
