package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.exception.ItemNoExistException;
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
        return itemRepository.findAllByStatus("Available");
    }
    public Item GetItemById(Long id) {
          return itemRepository.findById(id).orElse(null);
    }
    public void placeItem(Item item) {
          itemRepository.save(item);
    }
    public Item UpdateItem(Long id,Item item) {
          if(!itemRepository.existsById(id)){
                throw new ItemNoExistException("Item does not exists");
          }
          Optional<Item> optionalItem = itemRepository.findById(id);
          if(optionalItem.isPresent()){
                Item existItem = optionalItem.get();
                existItem.setName(item.getName());
                existItem.setCategory(item.getCategory());
                existItem.setDescription(item.getDescription());
                existItem.setStatus(item.getStatus());
                existItem.setPrice(item.getPrice());
                return itemRepository.save(existItem);
          }
          return null;
    }
    public void deleteItem(Long id) {
          itemRepository.deleteById(id);
    }
}
