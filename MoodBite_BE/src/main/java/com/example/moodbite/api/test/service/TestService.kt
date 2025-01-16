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
You are an AI analyzing specific condition scores to recommend appropriate dishes.
IMPORTANT: You MUST adjust your recommendations based on these exact scores - do not give generic recommendations!

Current state (0-100):
Tiredness: ${dto.tiredScore}/100
Anger: ${dto.angerScore}/100
Stress: ${dto.stressScore}/100
Appetite: ${dto.appetiteScore}/100

Strict recommendation rules:
1. If tiredness > 70:
  - Must include energy-rich foods like meat dishes, hearty soups
  - Avoid light meals like salads or cold dishes
2. If tiredness < 30:
  - Focus on light, refreshing options
  - Avoid heavy or greasy foods

3. If anger OR stress > 70:
  - Include cooling or comforting foods
  - Avoid spicy or heavy dishes

4. If appetite < 30:
  - Suggest light, easily digestible foods
  - No rich or heavy meals
5. If appetite > 70:
  - Recommend substantial, satisfying dishes
  - Avoid small portions or light meals

Required format: Respond ONLY with a JSON array containing three objects. Each object should have a food name and a reason based on the scores.

IMPORTANT MENU NAMING RULES:
- Use only the basic menu name without any modifiers
- Remove ingredient specifications from the menu name
Examples:
✅ Correct: "된장국", "스파게티", "김치찌개"
❌ Incorrect: "시금치 된장국", "스파게티 알리오올리오", "차돌박이 김치찌개"

Example response:
[
   {
       "food": "삼겹살",
       "reason": "피로도가 높고(${dto.tiredScore}) 식욕이 좋은(${dto.appetiteScore}) 상태이므로, 단백질이 풍부한 고기요리가 에너지 보충에 도움이 됩니다"
   },
   {
       "food": "냉면",
       "reason": "스트레스가 높은(${dto.stressScore}) 상태에서는 시원하고 깔끔한 음식이 정신을 맑게 하는데 도움이 됩니다"
   },
   {
       "food": "우동",
       "reason": "화가 난 상태(${dto.angerScore})에서는 따뜻하고 부드러운 면요리가 마음을 진정시키는데 도움이 됩니다"
   }
]

Remember:
- Each food must be the most basic menu name without any modifiers
- Each reason must reference the specific scores provided
- Recommendations must strictly follow the condition rules
- Explanations should be in Korean and relate to the person's current state
"""

}