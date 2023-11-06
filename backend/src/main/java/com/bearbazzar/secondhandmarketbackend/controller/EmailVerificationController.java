package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.service.EmailVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email-verification")
public class EmailVerificationController {

    @Autowired
    private EmailVerificationService emailVerificationService;

    @PostMapping("/check")
    public ResponseEntity<String> checkEmail(@RequestParam("email") String email) {
        boolean isVerified = emailVerificationService.checkEmail(email);
        return ResponseEntity.ok(isVerified ? "Verified" : "Not Verified");
    }

//    @PostMapping("/verify")
//    public ResponseEntity<String> verifyEmail(@RequestParam String email) {
//        boolean verificationInitiated = emailVerificationService.verifyEmail(email);
//        return ResponseEntity.ok(verificationInitiated ? "Verification Initiated" : "Verification Failed");
//    }
}
