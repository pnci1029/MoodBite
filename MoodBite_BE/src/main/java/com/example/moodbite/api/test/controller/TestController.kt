package com.example.moodbite.api.test.controller

import com.example.moodbite.api.test.service.TestService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController(
    private val testService: TestService,
) {

    @GetMapping("/")
    fun test(@RequestParam prompt: String): String {
        return testService.getResult(prompt)

    }
}