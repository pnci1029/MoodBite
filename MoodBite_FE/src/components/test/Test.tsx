import React, {useState} from 'react';
import {ArrowLeft} from 'lucide-react';
import style from "../../style/test.module.scss";
import {TestStep} from "../../types/test";
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

// 타입 안전한 getter 함수
const getCurrentLabels = (step: TestStep): SliderLabel => {
    return sliderLabels[step] || defaultLabel;
};
interface TestProps {
    onBack: () => void;
    onNext: (score: number) => void;
}

export function Test({onBack, onNext}: TestProps) {
    const [testStep, setTestStep] = useState(TestStep.STEP1_TIREDNESS)
    const [tiredScore, setTiredScore] = useState(50);
    const [angerScore, setAngerScore] = useState(50);
    const [stressScore, setStressScore] = useState(50);
    const [appetiteScore, setAppetiteScore] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const getCurrentLabels = (step: TestStep) => {
        return sliderLabels[step] || {min: "0", mid: "50", max: "100"};
    };

    const renderSlider = (step: TestStep, value: number) => {
        const labels = getCurrentLabels(step);

        return (
            <div className={style.sliderContainer}>
                <div className={style.sliderWrapper}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={handleSliderChange}
                        className={style.slider}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onTouchStart={() => setIsDragging(true)}
                        onTouchEnd={() => setIsDragging(false)}
                    />
                    <div className={style.sliderLabels}>
                        <span className={style.minLabel}>{labels.min}</span>
                        <span className={style.midLabel}>{labels.mid}</span>
                        <span className={style.maxLabel}>{labels.max}</span>
                    </div>
                </div>

                <div className={`${style.scoreDisplay} ${isDragging ? style.active : ''}`}>
                    {value}
                </div>

                <div className={style.scoreIndicator}>
                    <span className={style.indicatorText}>
                        {value < 30 ? "낮음" : value < 70 ? "보통" : "높음"}
                    </span>
                </div>
            </div>
        );
    };

    console.log(testStep)
    console.log(tiredScore)
    console.log(angerScore)
    console.log(stressScore)
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (testStep) {
            case TestStep.STEP1_TIREDNESS:
                return setTiredScore(Number(e.target.value));
            case TestStep.STEP2_ANGER:
                return setAngerScore(Number(e.target.value));
            case TestStep.STEP3_STRESS_LEVEL:
                return setStressScore(Number(e.target.value));
            case TestStep.STEP4_APPETITE_DEGREE:
                return setAppetiteScore(Number(e.target.value));

        }

    };

    const handlePrevScore = (currentStep: TestStep) => {
        switch (currentStep) {
            case TestStep.STEP2_ANGER:
                return setTestStep(TestStep.STEP1_TIREDNESS);
            case TestStep.STEP3_STRESS_LEVEL:
                return setTestStep(TestStep.STEP2_ANGER);
            case TestStep.STEP4_APPETITE_DEGREE:
                return setTestStep(TestStep.STEP3_STRESS_LEVEL);
        }
    }

    const handleNextScore = (currentStep: TestStep) => {
        switch (currentStep) {
            case TestStep.STEP1_TIREDNESS:
                return setTestStep(TestStep.STEP2_ANGER);
            case TestStep.STEP2_ANGER:
                return setTestStep(TestStep.STEP3_STRESS_LEVEL);
            case TestStep.STEP3_STRESS_LEVEL:
                return setTestStep(TestStep.STEP4_APPETITE_DEGREE);
            case TestStep.STEP4_APPETITE_DEGREE:
                return setTestStep(TestStep.STEP4_APPETITE_DEGREE);
        }
    }

    const renderButtons = (currentStep: TestStep) => (
        <div className={style.buttonContainer}>
            {currentStep !== TestStep.STEP1_TIREDNESS && (
                <button
                    className={style.prevButton}
                    onClick={() => handlePrevScore(currentStep)}
                >
                    이전
                </button>
            )}
            <button
                className={style.nextButton}
                onClick={() => handleNextScore(currentStep)}
            >
                다음
            </button>
        </div>
    );

    return (
        <div className={style.container}>
            {/* 상단 헤더 */}
            <header className={style.header}>
                <div className={style.headerContent}>
                    <button
                        className={style.backButton}
                        onClick={onBack}
                    >
                        <ArrowLeft size={24}/>
                    </button>
                    <h1 className={style.pageTitle}>오늘 뭐먹을까?</h1>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            {testStep === TestStep.STEP1_TIREDNESS && (
                <main className={style.mainContent}>
                    <section className={style.testSection}>
                        <h2 className={style.questionTitle}>
                            얼마나 피곤하신가요?
                        </h2>
                        {renderSlider(TestStep.STEP1_TIREDNESS, tiredScore)}
                        {renderButtons(TestStep.STEP1_TIREDNESS)}
                    </section>
                </main>
            )}

            {testStep === TestStep.STEP2_ANGER && (
                <main className={style.mainContent}>
                    <section className={style.testSection}>
                        <h2 className={style.questionTitle}>
                            지금 예민한 상태인가요?
                        </h2>

                        {renderSlider(TestStep.STEP2_ANGER, angerScore)}
                        {renderButtons(TestStep.STEP2_ANGER)}
                    </section>
                </main>
            )}

            {testStep === TestStep.STEP3_STRESS_LEVEL && (
                <main className={style.mainContent}>
                    <section className={style.testSection}>
                        <h2 className={style.questionTitle}>
                            스트레스 정도를 평가해주세요.
                        </h2>
                        {renderSlider(TestStep.STEP3_STRESS_LEVEL, stressScore)}
                        {renderButtons(TestStep.STEP3_STRESS_LEVEL)}
                    </section>
                </main>
            )}

            {testStep === TestStep.STEP4_APPETITE_DEGREE && (
                <main className={style.mainContent}>
                    <section className={style.testSection}>
                        <h2 className={style.questionTitle}>
                            얼마나 배고프신가요?
                        </h2>
                        {renderSlider(TestStep.STEP4_APPETITE_DEGREE, appetiteScore)}
                        {renderButtons(TestStep.STEP4_APPETITE_DEGREE)}
                    </section>
                </main>
            )}
        </div>
    );
}