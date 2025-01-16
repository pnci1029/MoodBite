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

Please act as a sophisticated food recommendation system that has access to extensive data from various search engines (Google, DuckDuckGo, Naver, etc.) about popular dining options in Korea.

Please recommend 3 dishes that are:
- Easily accessible at local restaurants or convenience stores for office workers in Korea
- Must be standard, single-item menu names (e.g., "삼겹살" is good, but "소고기 김치볶음밥" are not)
- Can include ANY type of cuisine that's readily available (Korean, Western, Chinese, Japanese, Fusion, etc.)
- Must be common menu names that any restaurant would recognize
- Must be practical for lunch or dinner options

Based on your extensive search results and the person's condition scores, provide 3 carefully selected single-item dish recommendations.
Format the response as a JSON array with Korean names: ["음식1", "음식2", "음식3"]

Remember: Keep each menu item as a simple, single dish name that would appear on a typical restaurant menu.
Good examples: "삼겹살", "파스타", "마라탕", "우동", "피자"
Bad examples: "치즈불닭볶음면", "소고기 김치볶음밥", "삼겹살 김치전골"

Respond with ONLY the JSON array of 3 dish names in Korean, no additional explanation.
"""

}