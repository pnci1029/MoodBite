import { useState } from 'react';
import {MealTime, TestStep} from '../../../types/test';

interface Args {
    onComplete: (score: number) => void;
}
export function useTestNavigation(
    {onComplete}:Args
) {

    const [testStep, setTestStep] = useState(TestStep.STEP1_TIREDNESS);

    const handlePrevScore = (currentStep: TestStep) => {
        switch (currentStep) {
            case TestStep.STEP2_ANGER:
                return setTestStep(TestStep.STEP1_TIREDNESS);
            case TestStep.STEP3_STRESS_LEVEL:
                return setTestStep(TestStep.STEP2_ANGER);
            case TestStep.STEP4_APPETITE_DEGREE:
                return setTestStep(TestStep.STEP3_STRESS_LEVEL);
            case TestStep.STEP5_MEAL_TIME:
                return setTestStep(TestStep.STEP4_APPETITE_DEGREE);
        }
    };

    const handleNextScore = (
        currentStep: TestStep,
        scores: {
            tired: number;
            anger: number;
            stress: number;
            appetite: number;
        },
        selectedMealTime: MealTime | null
    ) => {
        switch (currentStep) {
            case TestStep.STEP1_TIREDNESS:
                return setTestStep(TestStep.STEP2_ANGER);
            case TestStep.STEP2_ANGER:
                return setTestStep(TestStep.STEP3_STRESS_LEVEL);
            case TestStep.STEP3_STRESS_LEVEL:
                return setTestStep(TestStep.STEP4_APPETITE_DEGREE);
            case TestStep.STEP4_APPETITE_DEGREE:
                return setTestStep(TestStep.STEP5_MEAL_TIME);
            case TestStep.STEP5_MEAL_TIME:
                if (selectedMealTime) {
                    const finalScore = calculateFinalScore(scores);
                    onComplete(finalScore);
                }
                return;
        }
    };

    const calculateFinalScore = (scores: {
        tired: number;
        anger: number;
        stress: number;
        appetite: number;
    }) => {
        const { tired, anger, stress, appetite } = scores;
        return (tired + anger + stress + appetite) / 4;
    };

    return {
        testStep,
        handlePrevScore,
        handleNextScore,
        isFirstStep: testStep === TestStep.STEP1_TIREDNESS,
        isLastStep: testStep === TestStep.STEP5_MEAL_TIME,
    };
};