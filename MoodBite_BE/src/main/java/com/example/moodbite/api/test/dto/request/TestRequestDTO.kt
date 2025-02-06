package com.example.moodbite.api.test.dto.request

import com.example.moodbite.api.test.domain.enums.Dining

data class TestRequestDTO(
    val tiredScore: Int,
    val angerScore: Int,
    val stressScore: Int,
    val appetiteScore: Int,
    val dining: Dining,
    val budget: Int,
    val mealTime: String,

)