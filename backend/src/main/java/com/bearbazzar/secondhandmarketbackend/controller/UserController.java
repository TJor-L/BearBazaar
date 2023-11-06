package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.exception.UserNotExistException;
import com.bearbazzar.secondhandmarketbackend.model.Ask;
import com.bearbazzar.secondhandmarketbackend.model.LoginResponse;
import com.bearbazzar.secondhandmarketbackend.model.Token;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.service.AuthenticationService;
import com.bearbazzar.secondhandmarketbackend.service.UserService;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        Token token = authenticationService.authenticate(user);
        if(token == null){
            return ResponseEntity.notFound().build();
        }
        Long userId = UserService.getUserByUsername(user.getUsername()).getStudentId();
        return ResponseEntity.ok(new LoginResponse(token,userId));
    }

    @PutMapping ("/update")
    public ResponseEntity<User> update(@RequestBody User user) {
        User updatedUser = UserService.updateUser(user);
        if(updatedUser == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedUser);
    }
    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        User user = UserService.getUserByUsername(username);
        if(user == null){
            throw new UserNotExistException("User No exist");
        }
        return user;
    }
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        User user = UserService.getUserByStudentId(id);
        if(user == null){
            throw new UserNotExistException("User No exist");
        }
        return user;
    }
    @GetMapping("/user/byname/{username}")
    public User getUserByUsername(@PathVariable String username) {
        User user = UserService.getUserByUsername(username);
        if(user == null){
            throw new UserNotExistException("User No exist");
        }
        return user;
    }
}
