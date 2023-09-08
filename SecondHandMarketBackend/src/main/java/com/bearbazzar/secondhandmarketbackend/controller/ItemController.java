package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.model.Item;
import com.bearbazzar.secondhandmarketbackend.service.ItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {
    private final ItemService itemService;
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }
    @GetMapping("/")
    public List<Item> GetUnsoldItem() {
        return itemService.GetUnsoldItem();
    }
    @GetMapping("/{id}")
    public Item GetItemById() {
          return itemService.GetItemById();
    }
    @PostMapping("/")
    public void placeItem(@RequestBody Item item) {
          itemService.placeItem(item);
    }
    @PostMapping("/{id}")
    public void updateItem(@RequestBody Item item) {
          itemService.UpdateItem(item);
    }

}
