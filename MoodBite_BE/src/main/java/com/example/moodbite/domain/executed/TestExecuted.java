package com.example.moodbite.domain.executed;

import com.example.moodbite.domain.executed.enums.Gender;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity @Getter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TestExecuted {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int joyRate;
    private int nervousRate;
    private int angerRate;
    private int tirednessRate;
    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String mealTime; // lunch, dinner ...
    private String mealType; // snack, meal...
    private String lastMeal;


    //base entity
    @CreatedDate
    private LocalDateTime createdAt;
}
