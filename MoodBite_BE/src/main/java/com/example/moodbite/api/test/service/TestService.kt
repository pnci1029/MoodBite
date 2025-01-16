package com.example.moodbite.api.test.service

import com.example.moodbite.api.executed.dto.ChatRequest
import com.example.moodbite.api.executed.dto.ChatResponse
import com.example.moodbite.api.test.dto.request.TestRequestDTO
import com.example.moodbite.config.OpenAiConfig
import mu.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class TestService (
    private val openAiConfig: OpenAiConfig,

){
    @Value("\${openai.model}")
    private lateinit var model: String

    @Value("\${openai.api.url}")
    private lateinit var url: String
    private val logger = KotlinLogging.logger {}

    fun getResult(dto: TestRequestDTO):String {

        val headers = openAiConfig.httpHeaders()

        val prompt = ""

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