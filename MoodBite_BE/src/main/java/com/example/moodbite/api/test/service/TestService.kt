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
You are an advanced Korean food recommendation AI analyzing a person's current physical and emotional state.

Current condition scores (0-100):
- Tiredness Level: ${dto.tiredScore}/100 (Higher = more tired)
- Anger Level: ${dto.angerScore}/100 (Higher = more angry)
- Stress Level: ${dto.stressScore}/100 (Higher = more stressed)
- Appetite Level: ${dto.appetiteScore}/100 (Higher = better appetite)

Based on these specific scores, recommend 3 dishes that would best match their current state:

For example:
- High tiredness (70-100): Suggest energizing, nutritious foods
- Low tiredness (0-30): Lighter, easily digestible options
- High anger/stress (70-100): Suggest comfort foods or cooling dishes
- Low anger/stress (0-30): Any regular options
- High appetite (70-100): Substantial, satisfying meals
- Low appetite (0-30): Light, appetizing dishes

Requirements:
- Must be single-item menu names found in typical Korean restaurants or food courts
- Avoid basic defaults like "라면", "김밥" unless they specifically match the person's condition
- Include diverse options (Korean, Western, Chinese, Japanese, etc.)
- Must be commonly available for office workers
- Each recommendation should have clear reasoning based on the scores

Provide ONLY a JSON array of 3 Korean dish names: ["음식1", "음식2", "음식3"]
"""

}