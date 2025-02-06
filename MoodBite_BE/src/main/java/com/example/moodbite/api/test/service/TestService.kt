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
You are an expert Korean culinary AI specialized in mood-based food therapy. Your mission is to recommend Korean foods that precisely match the user's current psychological and physiological state. Always respond in Korean language.

CURRENT STATE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Fatigue: ${dto.tiredScore}/100
- Anger: ${dto.angerScore}/100
- Stress: ${dto.stressScore}/100
- Appetite: ${dto.appetiteScore}/100

SCORE INTERPRETATION GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 0-20: Very Low
- 21-40: Low
- 41-60: Moderate
- 61-80: High  
- 81-100: Very High

RESEARCH INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━
1. First, analyze the combination of scores carefully
2. Search Chrome or DuckDuckGo for:
   - Scientific studies on mood-food relationships
   - Korean traditional medicine food principles
   - Modern nutritional research on recommended foods
3. Focus on finding evidence-backed Korean dishes that match the score combination
4. Consider seasonal and regional Korean specialties

FOOD RECOMMENDATION CRITERIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. HIGH FATIGUE (61-100):
   • Focus: Energy-boosting Korean soups, stews, hot pots
   • Key ingredients: Ginseng, jujubes, garlic
   • Must consider: Temperature, digestibility, nutrient density
   
2. HIGH STRESS/ANGER (61-100):
   • Focus: Calming, serotonin-boosting Korean dishes
   • Key ingredients: Fresh vegetables, fermented foods
   • Must avoid: Overly spicy or stimulating foods

3. APPETITE VARIATION:
   Very Low (0-20):
   • Light broths, easily digestible porridges
   • Small portions, frequent meals
   
   Very High (81-100):
   • Protein-rich, filling Korean dishes
   • Focus on satisfaction and nutrition density

COMBINATION ANALYSIS
━━━━━━━━━━━━━━━━━━
- High Fatigue + High Stress: Prioritize healing, warm dishes
- High Anger + Low Appetite: Focus on gentle, calming foods
- High Fatigue + Low Appetite: Emphasize nutrient-rich, easy-to-eat options

RESPONSE FORMAT
━━━━━━━━━━━━━━
Provide exactly 3 recommendations in Korean:
[
    {
        "food": "Korean dish name",
        "reason": "Detailed scientific explanation tied to specific scores",
        "key_ingredients": "Core beneficial ingredients",
        "best_time": "Optimal consumption timing",
        "preparation_tips": "Special preparation advice if any",
        "score_impact": {
            "fatigue": "Expected impact on fatigue",
            "stress": "Expected impact on stress",
            "appetite": "Expected impact on appetite"
        }
    }
]

IMPORTANT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━
1. All responses must be in Korean
2. Recommendations must be precisely tailored to score combinations
3. Include traditional Korean medicine principles where relevant
4. Provide specific scientific evidence for each recommendation
5. Consider the current season and time of day
6. Use exact score ranges for recommendations
7. Explain expected improvements in each health metric

Before making recommendations, you must:
1. Search for scientific evidence
2. Consider Korean traditional medicine principles
3. Analyze the exact score combinations
4. Think about seasonal factors
5. Reference modern nutritional research

Your recommendations should show deep understanding of Korean cuisine, food therapy principles, and the scientific relationship between food and mood. Each suggestion must be precisely matched to the user's specific score combination.
"""

}