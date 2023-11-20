package com.bearbazzar.secondhandmarketbackend.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender")
    private String sender;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "content", length = 500)
    private String content;

    public Message() {
    }

    // Constructor: Full constructor
    public Message(String sender, String  receiver, String content) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSenderId(String senderId) {
        this.sender = senderId;
    }

    public String getReceiverId() {
        return receiver;
    }

    public void setReceiverId(String receiverId) {
        this.receiver = receiverId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }



}
