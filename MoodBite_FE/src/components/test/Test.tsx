import React, {useState} from 'react';
import {ArrowLeft} from 'lucide-react';
import style from "../../style/test.module.scss";
import {TestStep} from "../../types/test";

interface TestProps {
    onBack: () => void;
    onNext: (score: number) => void;
}

export function Test({ onBack, onNext }: TestProps) {
    const [tiredScore, setTiredScore] = useState(50);
    const [angerScore, setAngerScore] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [testStep, setTestStep] = useState(TestStep.STEP1_TIREDNESS)

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (testStep) {
            case TestStep.STEP1_TIREDNESS:
                return setTiredScore(Number(e.target.value));
            case TestStep.STEP2_ANGER:
                return setAngerScore(Number(e.target.value));

        }

    };

    const handleNextScore = (currentStep: TestStep) =>{
        switch (currentStep) {
            case TestStep.STEP1_TIREDNESS:
                return setTestStep(TestStep.STEP2_ANGER);
            case TestStep.STEP2_ANGER:
                return setTestStep(TestStep.STEP3_NERVOUS);
        }
    }

    return (
        <div className={style.container}>
            {/* 상단 헤더 */}
            <header className={style.header}>
                <div className={style.headerContent}>
                    <button
                        className={style.backButton}
                        onClick={onBack}
                    >
                        <ArrowLeft size={24} />
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

                    <button
                        className={style.nextButton}
                        // onClick={() => onNext(tiredScore)}
                        onClick={() => handleNextScore(TestStep.STEP1_TIREDNESS)}
                    >
                        다음
                    </button>
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

                        <button
                            className={style.nextButton}
                            onClick={() => onNext(angerScore)}
                        >
                            다음
                        </button>
                    </section>
                </main>
            )}
        </div>
    );
}