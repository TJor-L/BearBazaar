package com.bearbazzar.secondhandmarketbackend.controller;

import com.bearbazzar.secondhandmarketbackend.model.Message;
import org.springframework.data.repository.query.Param;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.logging.Logger;

@Controller
public class chatController {
    Logger logger = Logger.getLogger(chatController.class.getName());
    /**
     * This method is used to send message to the chat space
     * @param sender
     * @param receiver
     * @param content
     * @return
     * @throws Exception
     */
    @MessageMapping("/send")
    @SendTo("/topic/chatspace")
    public Message send(@Param("sender")String sender,@Param("receiver") String receiver,@Param("content") String content) throws Exception {
        return new Message(sender, receiver, content);
    }
}
