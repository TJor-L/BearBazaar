package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.model.Ask;
import com.bearbazzar.secondhandmarketbackend.model.Token;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.service.AuthenticationService;
import com.bearbazzar.secondhandmarketbackend.service.UserService;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity register(@RequestBody User user) {
        UserService.addUser(user);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody User user) {
        Token token = authenticationService.authenticate(user);
        if(token == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(token);
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
