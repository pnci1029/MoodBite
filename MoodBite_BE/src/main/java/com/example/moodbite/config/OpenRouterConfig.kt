package com.example.moodbite.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType

@Configuration
class OpenRouterConfig {
    @Value("\${openrouter.api.key}")
    private lateinit var secretKey: String

    @Bean
    fun httpHeaders(): HttpHeaders {
        return HttpHeaders().apply {
            set("Authorization", "Bearer $secretKey")
            contentType = MediaType.APPLICATION_JSON
        }
    }
}