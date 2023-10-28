package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.exception.SellerErrorException;
import com.bearbazzar.secondhandmarketbackend.exception.TransactionNoFoundException;
import com.bearbazzar.secondhandmarketbackend.model.Transaction;
import com.bearbazzar.secondhandmarketbackend.model.TransactionState;
import com.bearbazzar.secondhandmarketbackend.model.User;
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
    public TransactionController(TransactionService transactionService, ItemService itemService) {
        this.transactionService = transactionService;
        this.itemService = itemService;
    }
    @PostMapping()
    public void createTransaction(@RequestParam("buyer") String buyer,
                                  @RequestParam("seller") String seller,
                                  @RequestParam("item") Long item_id,
                                  @RequestParam("price") Double price) {
        User buyerEntity = new User.Builder().setUsername(buyer).build();
        User sellerEntity = new User.Builder().setUsername(seller).build();
        if(!itemService.GetItemById(item_id).getOwner().getUsername().equals(seller)) {
            throw new SellerErrorException("The seller is not the owner of the item" + item_id.toString());
        }
        Transaction transaction = new Transaction.Builder()
                .setBuyer(buyerEntity)
                .setSeller(sellerEntity)
                .setItem(item_id)
                .setPrice(price)
                .setStatus(TransactionState.PENDING)
                .build();
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
