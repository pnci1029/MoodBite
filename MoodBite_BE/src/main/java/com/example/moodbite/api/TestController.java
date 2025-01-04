package com.example.moodbite.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestController {

    @Value("${openai.api.key}")
    private String apiKey;

    @GetMapping("/")
    public String test() {

        System.out.println("apiKey = " + apiKey);

        return "12312";
    }
}
