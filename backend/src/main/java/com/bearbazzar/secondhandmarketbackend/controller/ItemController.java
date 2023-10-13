package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.model.Ask;
import com.bearbazzar.secondhandmarketbackend.model.Filter;
import com.bearbazzar.secondhandmarketbackend.model.Item;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public void placeItem(@RequestBody Item item) {
          itemService.placeItem(item);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable("id") long id, @RequestBody Item item) {
        Item updatedItem = itemService.UpdateItem(id ,item);
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
    @PostMapping("/owner")
    public List<Item> listItemByOwner(@RequestBody User owner){
        return itemService.GetItemByOwner(owner);
    }
    @PostMapping("/search")
    public List<Item> searchItem(@RequestBody Filter filter){
        return itemService.searchItem(filter);
    }
    @PostMapping("/ask")
    public void askItem(@RequestBody Ask ask){
        //TODO: check if the asker is the owner
    }
}
