package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.service.UserService;
import com.bearbazzar.secondhandmarketbackend.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
   UserService registerService;
    public UserController(UserService registerService) {
        this.registerService = registerService;
    }
    @PostMapping("/register")
    public String register() {

        return "register";
    }
}
