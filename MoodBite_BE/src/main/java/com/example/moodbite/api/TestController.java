package com.example.moodbite.api;

import com.example.moodbite.api.executed.dto.ChatRequest;
import com.example.moodbite.api.executed.dto.ChatResponse;
import com.example.moodbite.config.OpenAiConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;



@RestController @RequiredArgsConstructor
public class TestController {

    private final OpenAiConfig openAiConfig;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String url;


    @GetMapping("/")
    public String test(@RequestParam String prompt) {
        System.out.println("prompt = " + prompt);
        HttpHeaders headers = openAiConfig.httpHeaders();

        // Create request
        ChatRequest chatRequest = new ChatRequest(model, prompt);

        // 통신을 위한 RestTemplate 구성하기
        HttpEntity<ChatRequest> requestEntity = new HttpEntity<>(chatRequest, headers);

        RestTemplate restTemplate = new RestTemplate();
        ChatResponse response = restTemplate.postForObject(url, requestEntity, ChatResponse.class);

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            throw new RuntimeException();
        }

        return response.getChoices().get(0).getMessage().getContent();
    }
}
