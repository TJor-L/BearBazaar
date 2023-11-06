package com.bearbazzar.secondhandmarketbackend.service;

import com.neverbounce.api.client.NeverbounceClient;
import com.neverbounce.api.model.Result;
import com.neverbounce.api.model.SingleCheckResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailVerificationService {

    private final NeverbounceClient neverbounceClient;

    @Autowired
    public EmailVerificationService(NeverbounceClient neverbounceClient) {
        this.neverbounceClient = neverbounceClient;
    }

    public boolean checkEmail(String email) {
        SingleCheckResponse response = neverbounceClient
                .prepareSingleCheckRequest()
                .withEmail(email)
                .withAddressInfo(true)
                .withCreditsInfo(true)
                .withTimeout(20)
                .build()
                .execute();

        // Interpret the response and return the verification status
        // You may need to adjust this logic based on the response structure from Neverbounce
        if (response.getResult() == Result.VALID) {  // Assuming 4 represents a verified status
            return true;
        } else {
            return false;
        }
    }

//    public String verifyEmail(String email) {
//        // Logic for verifying an email
//        // This will depend on how Neverbounce handles the verification process
//        // For this example, let's assume it's similar to checking an email
//
//    }
}
