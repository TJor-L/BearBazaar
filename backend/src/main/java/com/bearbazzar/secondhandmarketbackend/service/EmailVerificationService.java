package com.bearbazzar.secondhandmarketbackend.service;

//import com.bearbazzar.secondhandmarketbackend.model.Token;
//import com.bearbazzar.secondhandmarketbackend.repository.EmailRepository;
import org.springframework.stereotype.Service;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Content;
import java.io.IOException;

@Service
public class EmailVerificationService {

    private String sendGridApiKey = "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";

    public boolean sendEmail(String email, String code) {
        Email from = new Email("l.tingjun@wustl.edu"); // Replace with your email
        String subject = "Verification Code";
        Email to = new Email(email); // Get the destination email from the Email object
        Content content = new Content("text/plain", "Your verification code is: " + code);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);

            return response.getStatusCode() == 202;
        } catch (IOException ex) {
            // Log error
            return false;
        }
    }

}