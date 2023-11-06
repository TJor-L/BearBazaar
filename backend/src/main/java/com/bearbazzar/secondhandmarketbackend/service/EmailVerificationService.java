package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.model.Email;
import com.bearbazzar.secondhandmarketbackend.model.Token;
import com.bearbazzar.secondhandmarketbackend.repository.EmailRepository;
import com.neverbounce.api.client.NeverbounceClient;
import com.neverbounce.api.model.Result;
import com.neverbounce.api.model.SingleCheckResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailVerificationService {

    private final EmailRepository emailRepository;
    public EmailVerificationService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }
    public void verifyEmail(String address, String Token){
        Email email = emailRepository.getEmailByAddress(address);
        if(email == null){
            return ;
        }
        if(email.getToken().equals(Token)){
            email.setVerified(true);
            emailRepository.save(email);
        }
    }
    public void updateToken(String token, String address){
        Email email = emailRepository.getEmailByAddress(address);
        email.setToken(token);
        emailRepository.save(email);
    }

}
