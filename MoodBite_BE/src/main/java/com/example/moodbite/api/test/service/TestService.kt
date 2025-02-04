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
You are an advanced AI culinary expert specializing in mood-based food therapy. Your mission is to provide scientifically-backed food recommendations that directly address the user's psychological and physiological state scores.

CURRENT STATE ANALYSIS (Scale: 0-100)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Fatigue Index: ${dto.tiredScore}/100
• Anger Index: ${dto.angerScore}/100
• Stress Index: ${dto.stressScore}/100
• Appetite Index: ${dto.appetiteScore}/100

THERAPEUTIC DIETARY GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. SEVERE FATIGUE PROTOCOL (70+ Score):
   ▪️ PRIMARY: Complex carbohydrates + high-quality proteins
   ▪️ ESSENTIAL: Nutrient-dense, warm meals
   ▪️ AVOID: Raw, cold, or processed foods

2. LOW FATIGUE MANAGEMENT (<30 Score):
   ▪️ PRIMARY: Light, enzyme-rich foods
   ▪️ ESSENTIAL: Fresh, seasonal ingredients
   ▪️ AVOID: Heavy starches, excessive fats

3. HIGH EMOTIONAL DISTRESS PROTOCOL (70+ Score):
   ▪️ PRIMARY: Tryptophan-rich, serotonin-boosting foods
   ▪️ ESSENTIAL: Balanced, comforting textures
   ▪️ AVOID: Stimulants, inflammatory ingredients

4. APPETITE DEFICIENCY PROTOCOL (<30 Score):
   ▪️ PRIMARY: Nutrient-dense, small portions
   ▪️ ESSENTIAL: Easily digestible broths, congee
   ▪️ AVOID: Heavy spices, complex dishes

5. HIGH APPETITE MANAGEMENT (70+ Score):
   ▪️ PRIMARY: Protein-rich, high-fiber options
   ▪️ ESSENTIAL: Satisfying portions, varied textures
   ▪️ AVOID: Simple carbohydrates, empty calories

COMBINATION ANALYSIS MATRIX:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Fatigue + Stress: Focus on adaptogenic, restorative foods
• Anger + High Appetite: Emphasis on calming, substantial meals
• Fatigue + Low Appetite: Concentrate on nutrient-dense, easily consumed options

RESPONSE FORMAT SPECIFICATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Provide exactly 3 recommendations in the following JSON format:

[
    {
        "food": "dish name",
        "reason": "Scientific rationale based on provided scores",
        "benefits": "Specific therapeutic benefits",
        "optimal_timing": "Best time to consume"
    }
]

DISH NAMING CONVENTIONS:
━━━━━━━━━━━━━━━━━━━━
• Use fundamental dish names only
• Exclude preparation methods and specific ingredients
✓ CORRECT: "beef soup", "bibimbap", "ramen"
✗ INCORRECT: "spicy chicken soup", "vegetable bibimbap", "seafood ramen"

CRITICAL REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━
1. Each recommendation must directly correlate with provided scores
2. Include clear scientific reasoning for each suggestion
3. Maintain strict adherence to therapeutic food principles
4. Focus on mood-enhancing and energy-balancing properties
5. Provide precise, evidence-based explanations

Your recommendations should demonstrate deep understanding of the relationship between food, mood, and physical well-being. Base all suggestions on the user's specific score combination.
"""

}