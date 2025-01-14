import {TestStep} from "../../../types/test";

export function useTestFunctions() {
    interface SliderLabel {
        min: string;
        mid: string;
        max: string;
    }

// Record 유틸리티 타입을 사용하여 타입 안전성 확보
    const sliderLabels: Record<TestStep, SliderLabel> = {
        [TestStep.STEP1_TIREDNESS]: {
            min: "전혀 피곤하지 않음",
            mid: "보통",
            max: "매우 피곤함"
        },
        [TestStep.STEP2_ANGER]: {
            min: "전혀 예민하지 않음",
            mid: "보통",
            max: "매우 예민함"
        },
        [TestStep.STEP3_STRESS_LEVEL]: {
            min: "스트레스 없음",
            mid: "보통",
            max: "스트레스 많음"
        },
        [TestStep.STEP4_APPETITE_DEGREE]: {
            min: "전혀 안고픔",
            mid: "보통",
            max: "매우 고픔"
        },
        [TestStep.STEP5_LAST_MEAL_MENU]: {
            min: "0",
            mid: "50",
            max: "100"
        },
        [TestStep.STEP6_LAST_MEAL_TIME]: {
            min: "0",
            mid: "50",
            max: "100"
        },
        [TestStep.STEP7_ALLERGY]: {
            min: "0",
            mid: "50",
            max: "100"
        }
    };

    const defaultLabel: SliderLabel = {
        min: "0",
        mid: "50",
        max: "100"
    };

    return{
        sliderLabels, defaultLabel
    }
}