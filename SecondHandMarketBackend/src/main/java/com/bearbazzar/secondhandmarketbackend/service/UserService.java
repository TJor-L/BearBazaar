package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.exception.UserAlreadyExistException;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Transactional
    public String addUser(User user) {
        if (userRepository.existsById(user.getUsername())) {
            throw new UserAlreadyExistException("User already exists");
        }
        if(userRepository.existsByStudentId(user.getStudentId())){
            throw new UserAlreadyExistException("This Student Id already have an account");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Registration success";
    }
    @Transactional
    public User updateUser(User user) {
        if (!userRepository.existsById(user.getUsername())) {
            throw new UserAlreadyExistException("User does not exists");
        }
        Optional<User> optionalUser = userRepository.findById(user.getUsername());
        if(optionalUser.isPresent()){
            User existUser = optionalUser.get();
            existUser.setPhone(user.getPhone());
            existUser.setEmail(user.getEmail());
            return userRepository.save(existUser);

        }
        return null;
    }

}
