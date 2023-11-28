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

    @Column(name = "send_date", length = 1000)
    private String send_date;


    public Message() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }
    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getSend_date() {
        return send_date;
    }


    public void setSend_date(String send_date) {
        this.send_date = send_date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }



}
