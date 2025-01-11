package com.example.moodbite.api.test.controller

import com.example.moodbite.api.executed.dto.ChatRequest
import com.example.moodbite.api.executed.dto.ChatResponse
import com.example.moodbite.api.test.service.TestService
import com.example.moodbite.config.OpenAiConfig
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate

@RestController
class TestController(
    private val openAiConfig: OpenAiConfig,
    private val testService: TestService
) {
    @Value("\${openai.model}")
    private lateinit var model: String

    @Value("\${openai.api.url}")
    private lateinit var url: String

//    @PostMapping("/result")
//    fun getTestResult(
//        @RequestBody
//    ): String {
//        testService.getResult()
//        return ""
//    }

    @GetMapping("/")
    fun test(@RequestParam prompt: String): String {
        println("prompt = $prompt")
        val headers = openAiConfig.httpHeaders()

        // Create request
        val chatRequest = ChatRequest(model, prompt)

        // 통신을 위한 RestTemplate 구성하기
        val requestEntity = HttpEntity(chatRequest, headers)

        val restTemplate = RestTemplate()
        val response = restTemplate.postForObject(url, requestEntity, ChatResponse::class.java)

        return response?.choices?.firstOrNull()?.message?.content
            ?: throw RuntimeException("Failed to get response from OpenAI")
    }
}