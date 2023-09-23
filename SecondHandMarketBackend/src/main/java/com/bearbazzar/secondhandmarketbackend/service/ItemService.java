package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.exception.ItemNoExistException;
import com.bearbazzar.secondhandmarketbackend.exception.UserNotExistException;
import com.bearbazzar.secondhandmarketbackend.model.*;
import com.bearbazzar.secondhandmarketbackend.repository.ItemRepository;
import com.bearbazzar.secondhandmarketbackend.repository.UserRepository;
import net.bytebuddy.asm.Advice;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    public ItemService(ItemRepository itemRepository,UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }
    public List<Item> GetUnsoldItem() {
        return itemRepository.findAllByStatus(Status.ONMARKET);
    }
    public Item GetItemById(Long id) {
          return itemRepository.findById(id).orElse(null);
    }
    public void placeItem(Item item) {
        if (!userRepository.existsByUsername(item.getOwner().getUsername())) {
            throw new UserNotExistException("user does not exist");
        }
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
        if(!itemRepository.existsById(id)) {
            throw new ItemNoExistException("Item does not exists");
        }
          itemRepository.deleteById(id);
    }
    public List<Item> GetItemByOwner(User owner){
        if(!userRepository.existsByUsername(owner.getUsername())){
            throw new UserNotExistException("user does not exist");
        }
        return itemRepository.findAllByOwner(owner);
    }
    public List<Item> searchItem(Filter filter){
        Specification<Item> spec = Specification
                .where(ItemSpecifications.priceBetween(filter.getMinPrice(), filter.getMaxPrice()))
                .and(ItemSpecifications.hasCategory(filter.getCategory()))
                .and(ItemSpecifications.descriptionContains(filter.getContent()))
                .and(ItemSpecifications.nameContains(filter.getContent()));
        return itemRepository.findAll(spec);
    }
}
