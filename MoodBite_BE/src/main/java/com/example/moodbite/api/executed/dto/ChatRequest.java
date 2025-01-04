package com.example.moodbite.api.executed.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
public class ChatRequest {

    private String model;
    private List<ChatMessage> messages;
    private int n;

    public ChatRequest(String model, String prompt) {

        this.model = model;
        this.messages = new ArrayList<ChatMessage>();
        this.messages.add(new ChatMessage("user", prompt));

        this.n = 1;
    }
}