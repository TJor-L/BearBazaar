package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.model.*;
import com.bearbazzar.secondhandmarketbackend.service.ItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }
    @GetMapping
    public List<Item> GetUnsoldItem() {
        return itemService.GetUnsoldItem();
    }
    @GetMapping("/{id}")
    public Item GetItemById(@PathVariable("id") Long id) {
          return itemService.GetItemById(id);
    }
    @PostMapping
    public void placeItem(@RequestParam("owner") String owner,
                          @RequestParam("name") String name,
                          @RequestParam("category") String category,
                          @RequestParam("description") String description,
                          @RequestParam("price") Double price,
                          @RequestParam("images") MultipartFile[] images) {
        Item item = new Item.Builder()
                .setOwner(new User.Builder().setUsername(owner).build())
                .setName(name)
                .setCategory(category)
                .setDescription(description)
                .setPrice(price)
                .setStatus(Status.AVAILABLE)
                .build();
        itemService.placeItem(item,images);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable("id") long id,
                                           @RequestParam("name") String name,
                                           @RequestParam("category") String category,
                                           @RequestParam("description") String description,
                                           @RequestParam("price") Double price,
                                           @RequestParam("images") MultipartFile[] images){
        Item updatedItem = itemService.UpdateItem(id ,name,category,description,price,images);
        if (updatedItem != null) {
            return ResponseEntity.ok(updatedItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable("id") Long id) {
        itemService.deleteItem(id);
    }
    private static final Logger LOGGER = LoggerFactory.getLogger(ItemController.class);
    @GetMapping("/owner/{username}")
    public List<Item> listItemByOwner(@PathVariable("username") String username){
        return itemService.GetItemByOwner(new User.Builder().setUsername(username).build());
    }

    @PostMapping("/search")
    public List<Item> searchItem(@RequestBody Filter filter){
        return itemService.searchItem(filter);
    }

}
