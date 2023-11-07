package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.model.Email;
import com.bearbazzar.secondhandmarketbackend.service.EmailVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email-verification")
public class EmailVerificationController {
    EmailVerificationService emailVerificationService;
    public EmailVerificationController(EmailVerificationService emailVerificationService) {
        this.emailVerificationService = emailVerificationService;
    }
    @PostMapping("/send-code")
    public ResponseEntity<String> sendVerificationCode(@RequestParam("email") String email,@RequestParam("code") String code) {
        boolean isSent = emailVerificationService.sendEmail(email, code);
        if (isSent) {
            return ResponseEntity.ok("Verification code sent successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Failed to send verification code.");
        }
    }
}
