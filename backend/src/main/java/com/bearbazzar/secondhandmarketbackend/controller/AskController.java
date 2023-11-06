package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.model.Ask;
import com.bearbazzar.secondhandmarketbackend.model.AskResponse;
import com.bearbazzar.secondhandmarketbackend.model.Item;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.service.AskService;
import com.bearbazzar.secondhandmarketbackend.service.ItemService;
import com.bearbazzar.secondhandmarketbackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asks")
public class    AskController {
    ItemService itemService;
    UserService userService;
    AskService askService;
    public AskController(ItemService itemService, UserService userService, AskService askService){
        this.itemService = itemService;
        this.userService = userService;
        this.askService = askService;
    }
    @PostMapping
    public ResponseEntity<String> createAsk(
            @RequestParam("item_id") Long itemId,
            @RequestParam("buyer") String buyerUsername,
            @RequestParam("price") Double price,
            @RequestParam("message") String message) {

        // Retrieve the item and user from their respective services
        Item item = itemService.GetItemById(itemId);
        User user = userService.getUserByUsername(buyerUsername);

        // Check if the item and user exist
        if (item == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Item not found");
        }
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }

        // Create a new Ask entity
        Ask ask = new Ask.Builder()
                .setUser(user)
                .setItem(item)
                .setPriceOffered(price)
                .setMessage(message)
                .build();

        // Save the ask entity
        askService.createAsk(ask);

        return ResponseEntity.status(HttpStatus.CREATED).body("Ask created successfully");
    }

    @GetMapping("/item/{id}")
    public List<AskResponse> getItemAsks(@PathVariable("id") Long id){
        return askService.getItemAsks(id);
    }
    @GetMapping("/user/{username}")
    public List<AskResponse> getUserAsks(@PathVariable("username") String username){
        return askService.getUserAsks(username);
    }
    @DeleteMapping("/{id}")
    public void deleteAsk(@PathVariable("id") Long id){
        askService.removeAsk(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Ask> updateAsk(@PathVariable("id") Long id, @RequestParam("price") Double price, @RequestParam("message") String message){
        Ask ask = askService.updateAsk(id, price, message);
        if (ask != null) {
            return ResponseEntity.ok(ask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
