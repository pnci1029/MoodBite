import React from "react";
import { TestStep } from "../../types/test";
import style from "../../style/common/sliderQuestion.module.scss"

interface Args {
    title: string;
    value: number;
    onChange: (value: number) => void;
    testStep: TestStep;
    labels: { min: string; mid: string; max: string };
}

export function SliderQuestion({title, value, onChange, testStep, labels}: Args) {
    const [isDragging, setIsDragging] = React.useState(false);

    const isBudgetStep = testStep === TestStep.STEP6_BUDGET;
    const minValue = isBudgetStep ? 1000 : 0;
    const maxValue = isBudgetStep ? 40000 : 100;

    const getDisplayValue = (value: number) => {
        if (isBudgetStep) {
            return `${value.toLocaleString()}원`;
        }
        return value;
    };

    const getIndicatorText = (value: number) => {
        if (isBudgetStep) {
            if (value < 10000) return "저예산";
            if (value < 25000) return "보통";
            return "고예산";
        }
        return value < 30 ? "낮음" : value < 70 ? "보통" : "높음";
    };

    return (
        <section className={style.testSection}>
            <h2 className={style.questionTitle}>{title}</h2>
            <div className={style.sliderContainer}>
                <div className={style.sliderWrapper}>
                    <input
                        type="range"
                        min={minValue}
                        max={maxValue}
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className={style.slider}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onTouchStart={() => setIsDragging(true)}
                        onTouchEnd={() => setIsDragging(false)}
                    />
                    <div className={style.sliderLabels}>
                        <span className={style.minLabel}>
                            {isBudgetStep ? "1,000원" : labels.min}
                        </span>
                        <span className={style.midLabel}>
                            {isBudgetStep ? "20,000원" : labels.mid}
                        </span>
                        <span className={style.maxLabel}>
                            {isBudgetStep ? "40,000원" : labels.max}
                        </span>
                    </div>
                </div>

                <div className={`${style.scoreDisplay} ${isDragging ? style.active : ''}`}>
                    {getDisplayValue(value)}
                </div>

                <div className={style.scoreIndicator}>
                    <span className={style.indicatorText}>
                        {getIndicatorText(value)}
                    </span>
                </div>
            </div>
        </section>
    );
}