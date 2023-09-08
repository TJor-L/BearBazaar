package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
