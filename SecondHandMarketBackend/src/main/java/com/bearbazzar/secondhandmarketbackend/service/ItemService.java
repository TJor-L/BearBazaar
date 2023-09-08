package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.model.Item;
import com.bearbazzar.secondhandmarketbackend.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository itemRepository;
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }
    public List<Item> GetUnsoldItem() {
        return null;
    }
    public Item GetItemById() {
          return itemRepository.findById(1L).orElse(null);
    }
    public void placeItem(Item item) {
          itemRepository.save(item);
    }
    public void UpdateItem(Item item) {
          if(!itemRepository.existsById(item.getId())) {
                throw new IllegalStateException("Item with id " + item.getId() + " does not exist");
          }
          Optional<Item> optionalItem = itemRepository.findById(item.getId());
          if(optionalItem.isPresent()){
                Item existItem = optionalItem.get();
                existItem.setName(item.getName());
                existItem.setCategory(item.getCategory());
                existItem.setDescription(item.getDescription());
                existItem.setStatus(item.getStatus());
                itemRepository.save(existItem);
          }

    }
}
