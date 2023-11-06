package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.model.Email;
import com.bearbazzar.secondhandmarketbackend.service.EmailVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email-verification")
public class EmailVerificationController {
    EmailVerificationService emailVerificationService;
    public EmailVerificationController(EmailVerificationService emailVerificationService) {
        this.emailVerificationService = emailVerificationService;
    }
    @PostMapping ("/token")
    public void updateToken(@RequestParam("token") String token, @RequestParam("address") String email) {
        emailVerificationService.updateToken(token,email);
    }
    @PostMapping("/verify")
    public void verifyEmail(@RequestParam("address") String email,@RequestParam("token") String token) {
        emailVerificationService.verifyEmail(email,token);
    }
}
