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
class TestService(
    private val openAiConfig: OpenAiConfig,

    ) {
    @Value("\${openai.model}")
    private lateinit var model: String

    @Value("\${openai.api.url}")
    private lateinit var url: String
    private val logger = KotlinLogging.logger {}

    fun getResult(dto: TestRequestDTO): String {

        val headers = openAiConfig.httpHeaders()

        val prompt = generateCommand(dto)

        // Create request
        val chatRequest = ChatRequest(model, prompt)

        // 통신을 위한 RestTemplate 구성하기
        val requestEntity = HttpEntity(chatRequest, headers)

        val restTemplate = RestTemplate()
        val response = restTemplate.postForObject(url, requestEntity, ChatResponse::class.java)

        return response?.choices?.firstOrNull()?.message?.content
            ?: throw RuntimeException("Failed to get response from OpenAI")
    }

    private fun generateCommand(
        dto: TestRequestDTO
    ) =  """
            Based on a person's current condition scores (0-100):
            - Tiredness Level: ${dto.tiredScore}/100
            - Anger Level: ${dto.angerScore}/100
            - Stress Level: ${dto.stressScore}/100
            - Appetite Level: ${dto.appetiteScore}/100
            
            Please recommend 3 foods or dishes that would be most beneficial for this person's current state. 
            Consider:
            - Foods that help with energy levels if they're tired
            - Calming foods if they're angry or stressed
            - Easy-to-eat options if their appetite is low
            - Comforting but healthy choices
            
            For each recommendation, please provide:
            1. The name of the food/dish
            2. Why it would be helpful for their current condition
            3. Key nutrients or benefits
            
            Please keep each recommendation concise and practical.
            """


}