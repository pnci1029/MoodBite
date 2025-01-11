package com.example.moodbite.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.web.client.RestTemplate

@Configuration
class OpenAiConfig {
    @Value("\${openai.api.key}")
    private lateinit var secretKey: String

    @Bean
    fun restTemplate(): RestTemplate {
        return RestTemplate()
    }

    @Bean
    fun httpHeaders(): HttpHeaders {
        return HttpHeaders().apply {
            set("Authorization", "Bearer $secretKey")
            contentType = MediaType.APPLICATION_JSON
        }
    }
}