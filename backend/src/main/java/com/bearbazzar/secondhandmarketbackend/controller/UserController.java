package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.model.Token;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.service.AuthenticationService;
import com.bearbazzar.secondhandmarketbackend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.notFound;

@RestController
public class UserController {
   UserService UserService;
   AuthenticationService authenticationService;
    public UserController(UserService registerService, AuthenticationService authenticationService) {
        this.UserService = registerService;
        this.authenticationService = authenticationService;
    }
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return UserService.addUser(user);
    }
    @PostMapping("/login")
    public Token login(@RequestBody User user) {
        return authenticationService.authenticate(user);
    }

    @PutMapping ("/update")
    public ResponseEntity<User> update(@RequestBody User user) {
        User updatedUser = UserService.updateUser(user);
        if(updatedUser == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }

}
