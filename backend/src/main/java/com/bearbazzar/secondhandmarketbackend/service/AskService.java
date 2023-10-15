package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.model.Ask;
import com.bearbazzar.secondhandmarketbackend.model.AskResponse;
import com.bearbazzar.secondhandmarketbackend.model.Item;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.repository.AskRepository;
import com.bearbazzar.secondhandmarketbackend.repository.ItemRepository;
import com.bearbazzar.secondhandmarketbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AskService {
    private final AskRepository askRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    @Autowired
    public AskService(AskRepository askRepository, UserRepository userRepository, ItemRepository itemRepository) {
        this.askRepository = askRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    public List<AskResponse> getItemAsks(Long id) {
        List<Ask> asks = askRepository.findByItem(new Item.Builder().setId(id).build());
        List<AskResponse> askResponses = asks.stream()
                .map(ask -> new AskResponse(
                        ask.getId(),
                        ask.getUser().getUsername(),
                        ask.getItem().getId(),
                        ask.getItem().getName(),
                        ask.getPriceOffered(),
                        ask.getMessage()))
                .collect(Collectors.toList());

        return askResponses;
    }

    public List<AskResponse> getUserAsks(String username) {
        List<Ask> asks = askRepository.findByUser(new User.Builder().setUsername(username).build());
        return asks.stream()
                .map(ask -> new AskResponse(
                        ask.getId(),
                        ask.getUser().getUsername(),
                        ask.getItem().getId(),
                        ask.getItem().getName(),
                        ask.getPriceOffered(),
                        ask.getMessage()))
                .collect(Collectors.toList());
    }

    public Ask createAsk(Ask ask){
        User user = ask.getUser();
        Item item = ask.getItem();
        user.addAsk(ask);
        item.addAsk(ask);
        return askRepository.save(ask);
    }
    public void removeAsk(Long askId) {
        Optional<Ask> optionalAsk = askRepository.findById(askId);
        if (optionalAsk.isPresent()) {
            Ask ask = optionalAsk.get();
            User user = ask.getUser();
            Item item = ask.getItem();

            // Remove the ask from user's ask list
            user.removeAsk(ask);

            // Remove the ask from item's ask list
            item.removeAsk(ask);

            // Save the updated user and item entities
            userRepository.save(user);
            itemRepository.save(item);

            // Delete the ask entity
            askRepository.deleteById(askId);
        }
    }
    public Ask updateAsk(Long askId, Double newPrice, String newMessage) {
        Optional<Ask> optionalAsk = askRepository.findById(askId);
        if (optionalAsk.isPresent()) {
            Ask existingAsk = optionalAsk.get();
            existingAsk.setPriceOffered(newPrice);
            existingAsk.setMessage(newMessage);
            return askRepository.save(existingAsk);
        }
        return null; // Handle the case when the ask with the given ID does not exist
    }

}
