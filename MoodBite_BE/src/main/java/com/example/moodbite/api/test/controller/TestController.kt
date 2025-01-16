package com.example.moodbite.api.test.controller

import com.example.moodbite.api.test.dto.request.TestRequestDTO
import com.example.moodbite.api.test.service.TestService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController(
    private val testService: TestService,
) {

    @GetMapping("/")
    fun test(@RequestBody dto: TestRequestDTO): String {
        return testService.getResult(dto)

    }
}