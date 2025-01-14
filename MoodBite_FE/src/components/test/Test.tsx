import React, {useState} from 'react';
import {ArrowLeft} from 'lucide-react';
import style from "../../style/test.module.scss";
import {TestStep} from "../../types/test";

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

                        <div className={style.sliderContainer}>
                            <div className={style.sliderWrapper}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={tiredScore}
                                    onChange={handleSliderChange}
                                    className={style.slider}
                                    onMouseDown={() => setIsDragging(true)}
                                    onMouseUp={() => setIsDragging(false)}
                                    onTouchStart={() => setIsDragging(true)}
                                    onTouchEnd={() => setIsDragging(false)}
                                />
                                <div className={style.sliderLabels}>
                                    <span>0</span>
                                    <span>50</span>
                                    <span>100</span>
                                </div>
                            </div>

                            <div className={`${style.scoreDisplay} ${isDragging ? style.active : ''}`}>
                                {tiredScore}
                            </div>

                            <div className={style.scoreDescription}>
                                {tiredScore <= 30 && "컨디션이 좋으시네요!"}
                                {tiredScore > 30 && tiredScore <= 70 && "적당히 피곤하시군요"}
                                {tiredScore > 70 && "무슨일이 있나요..?"}
                            </div>
                        </div>

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

                        <div className={style.sliderContainer}>
                            <div className={style.sliderWrapper}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={angerScore}
                                    onChange={handleSliderChange}
                                    className={style.slider}
                                    onMouseDown={() => setIsDragging(true)}
                                    onMouseUp={() => setIsDragging(false)}
                                    onTouchStart={() => setIsDragging(true)}
                                    onTouchEnd={() => setIsDragging(false)}
                                />
                                <div className={style.sliderLabels}>
                                    <span>0</span>
                                    <span>50</span>
                                    <span>100</span>
                                </div>
                            </div>

                            <div className={`${style.scoreDisplay} ${isDragging ? style.active : ''}`}>
                                {angerScore}
                            </div>

                            <div className={style.scoreDescription}>
                                {angerScore <= 30 && "컨디션이 좋은가봐요!"}
                                {angerScore > 30 && angerScore <= 70 && "나쁘지 않네요!"}
                                {angerScore > 70 && "폭발하기 직전이시네요..!"}
                            </div>
                        </div>

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

                        <div className={style.sliderContainer}>
                            <div className={style.sliderWrapper}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={stressScore}
                                    onChange={handleSliderChange}
                                    className={style.slider}
                                    onMouseDown={() => setIsDragging(true)}
                                    onMouseUp={() => setIsDragging(false)}
                                    onTouchStart={() => setIsDragging(true)}
                                    onTouchEnd={() => setIsDragging(false)}
                                />
                                <div className={style.sliderLabels}>
                                    <span>0</span>
                                    <span>50</span>
                                    <span>100</span>
                                </div>
                            </div>

                            <div className={`${style.scoreDisplay} ${isDragging ? style.active : ''}`}>
                                {stressScore}
                            </div>

                            <div className={style.scoreDescription}>
                                {stressScore <= 30 && "컨디션이 좋은가봐요!"}
                                {stressScore > 30 && stressScore <= 70 && "나쁘지 않네요!"}
                                {stressScore > 70 && "폭발하기 직전이시네요..!"}
                            </div>
                        </div>

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

                        <div className={style.sliderContainer}>
                            <div className={style.sliderWrapper}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={appetiteScore}
                                    onChange={handleSliderChange}
                                    className={style.slider}
                                    onMouseDown={() => setIsDragging(true)}
                                    onMouseUp={() => setIsDragging(false)}
                                    onTouchStart={() => setIsDragging(true)}
                                    onTouchEnd={() => setIsDragging(false)}
                                />
                                <div className={style.sliderLabels}>
                                    <span>0</span>
                                    <span>50</span>
                                    <span>100</span>
                                </div>
                            </div>

                            <div className={`${style.scoreDisplay} ${isDragging ? style.active : ''}`}>
                                {appetiteScore}
                            </div>

                            <div className={style.scoreDescription}>
                                {appetiteScore <= 30 && "몰래 뭐드셨어요?"}
                                {appetiteScore > 30 && appetiteScore <= 70 && "적당해보입니다!"}
                                {appetiteScore > 70 && "얼마나 굶은거에요..?"}
                            </div>
                        </div>

                        {renderButtons(TestStep.STEP4_APPETITE_DEGREE)}
                    </section>
                </main>
            )}
        </div>
    );
}