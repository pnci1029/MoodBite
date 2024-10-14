package com.example.moodbite.api.executed;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequiredArgsConstructor
public class TestExecutedController {
    private final TestExecutedService testExecutedService;

}
